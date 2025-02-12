import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import menuRoutes from "./routes/menu";
import orderRoutes from "./routes/orders";
import userRoutes from "./routes/users";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("Secret Scoops API is running!");
});

// App Routes
app.use("/menu", menuRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
