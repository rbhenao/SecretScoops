import { Router, Request, Response } from "express";
const orderRoutes = Router();

const sampleOrders = [
  { id: 1, items: ["Vanilla Ice Cream", "Chocolate Ice Cream"], total: 2.98, status: "Delivered" },
  { id: 2, items: ["Strawberry Ice Cream"], total: 1.99, status: "Out for Delivery" },
  { id: 3, items: ["Mint Chocolate Chip"], total: 0.99, status: "Processing" }
];

orderRoutes.get("/", (req: Request, res: Response) => {
  res.json({ orders: sampleOrders });
});

orderRoutes.post("/", (req: Request, res: Response) => {
  res.json({ message: "Order placed successfully!", order: req.body });
});

export default orderRoutes;