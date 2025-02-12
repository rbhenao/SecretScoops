import { Router, Request, Response } from "express";
const menuRoutes = Router();

const menuItems = [
  { id: 1, name: "Vanilla Ice Cream", price: 0.99 },
  { id: 2, name: "Chocolate Ice Cream", price: 2.99 },
  { id: 3, name: "Strawberry Ice Cream", price: 1.99 },
  { id: 4, name: "Mint Chocolate Chip", price: 0.99 }
];

menuRoutes.get("/", (req: Request, res: Response) => {
  res.json({ menu: menuItems });
});

export default menuRoutes;