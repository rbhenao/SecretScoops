import { Router, Request, Response } from "express";
import pool from "../utils/db";
import { sqs, QUEUE_URL } from "../utils/sqsClient";

const orderRoutes = Router();

interface MenuItem {
  id: number;
  name: string;
  price: number;
}

interface Order {
  id: number;
  items: MenuItem[];
  total: number;
  status: "Processing" | "Prepared" | "Out for Delivery" | "Delivered";
}

orderRoutes.post("/", async (req: Request, res: Response) => {
    const { name, address, paymentMethod, cart, total } = req.body;

    if (!name || !address || !paymentMethod || !cart.length || total <= 0) {
        res.status(400).json({ message: "Invalid order request." });
        return;
    }

    try {
        // Insert order into database
        const result = await pool.query(
            "INSERT INTO orders (customer_name, address, payment_method, items, total, status) VALUES ($1, $2, $3, $4, $5, 'Processing') RETURNING *",
            [name, address, paymentMethod, JSON.stringify(cart), total]
        );
        
        const newOrder = result.rows[0];

        let parsedItems: MenuItem[] = [];
        try {
          parsedItems = JSON.parse(newOrder.items) as MenuItem[];
          console.log("Json Parsed Items:", parsedItems);
        } catch (error) {
          console.error("Error parsing JSON for order items:", error);
        }

        // Send order to SQS queue
        const sqsMessage = {
            id: newOrder.id,
            items: parsedItems,
            total: newOrder.total,
            status: newOrder.status
        };

        const params = {
            QueueUrl: QUEUE_URL,
            MessageBody: JSON.stringify(sqsMessage),
        };

        await sqs.sendMessage(params).promise();
        console.log("Order added to queue:", sqsMessage);

        res.json({ message: "Order placed successfully and added to queue!", order: newOrder });
    } catch (error) {
        console.error("Database or SQS error:", error);
        res.status(500).json({ message: "Error processing order" });
    }
});

export default orderRoutes;
