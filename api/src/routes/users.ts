import { Router, Request, Response } from "express";
const userRoutes = Router();

const sampleUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "123-456-7890",
  address: "123 Ice Cream St, Sweet City, SC"
};

userRoutes.get("/profile", (req: Request, res: Response) => {
  res.json({ user: sampleUser });
});

export default userRoutes;