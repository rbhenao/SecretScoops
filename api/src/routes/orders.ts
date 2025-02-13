import { Router, Request, Response } from "express";
import pool from "../utils/db";

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

//const sampleOrders: Order[] = [
//  { id: 1, items: ["Vanilla Ice Cream", "Chocolate Ice Cream"], total: 2.98, status: "Delivered" },
//  { id: 2, items: ["Strawberry Ice Cream"], total: 1.99, status: "Out for Delivery" },
//  { id: 3, items: ["Mint Chocolate Chip"], total: 0.99, status: "Processing" }
//];

orderRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT id, items::text, total, status FROM orders ORDER BY created_at DESC");
    
    console.log("Fetched Orders from DB:", result.rows);
    
    const orders: Order[] = result.rows.map(order => {
      console.log("Processing Order Row:", order);
      let parsedItems: MenuItem[] = [];
      try {
        parsedItems = JSON.parse(order.items) as MenuItem[];
        console.log("Json Parsed Items:", parsedItems);
      } catch (error) {
        console.error("Error parsing JSON for order items:", error);
      }
      return {
        id: order.id,
        items: parsedItems,
        total: parseFloat(order.total),
        status: order.status
      };
    });
    
    res.json({ orders });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

export default orderRoutes;