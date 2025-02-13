import { Order } from "./types";
import pool from "./db";

const orderStatuses = ["Processing", "Preparing", "Out for Delivery", "Delivered"];

const activityMessages: { [key in "Processing" | "Preparing" | "Out for Delivery" | "Delivered"]: string } = {
  "Processing": "Order is being confirmed and added to the system...",
  "Preparing": "Ice cream is being prepared and packed...",
  "Out for Delivery": "A delivery driver has been assigned and is on the way...",
  "Delivered": "Order has been delivered to the customer!"
};

export async function processOrder(order: Order) {
  console.log(`Processing Order #${order.id}...`);
  
  for (let i = 1; i < orderStatuses.length; i++) {
    const newStatus = orderStatuses[i];
    
    console.log(activityMessages[newStatus as "Processing" | "Preparing" | "Out for Delivery" | "Delivered"]);
    
    // Simulate processing time for each status transition
    await new Promise((resolve) => setTimeout(resolve, 15000));
    
    try {
      await pool.query("UPDATE orders SET status = $1 WHERE id = $2", [newStatus, order.id]);
      console.log(`Order #${order.id} status updated to '${newStatus}'.`);
    } catch (error) {
      console.error(`Database update error while updating Order #${order.id} to '${newStatus}':`, error);
      return; // Exit if DB update fails
    }
  }

  console.log(`Order #${order.id} has been successfully delivered!`);
}
