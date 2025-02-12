import { useState, useEffect } from "react";

const sampleOrders = [
  { id: 1, items: ["Vanilla Ice Cream", "Chocolate Ice Cream"], total: 2.98, status: "Delivered" },
  { id: 2, items: ["Strawberry Ice Cream"], total: 1.99, status: "Out for Delivery" },
  { id: 3, items: ["Mint Chocolate Chip"], total: 0.99, status: "Processing" }
];

const orderStatuses = ["Processing", "Preparing", "Out for Delivery", "Delivered"];

export default function OrdersTab() {
  const [orders, setOrders] = useState(sampleOrders);

  useEffect(() => {
    fetch("http://localhost:4000/orders")
      .then(response => response.json())
      .then(data => setOrders(data.orders))
      .catch(error => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div className="orders-tab">
      <h2>Orders</h2>
      <h3>Active Orders</h3>
      <ul className="active-orders">
        {orders.filter(order => order.status !== "Delivered").map(order => (
          <li key={order.id}>
            <div className="order-summary">
              <strong>Order #{order.id}</strong> - {order.items.join(", ")} - ${order.total.toFixed(2)}
            </div>
            <div className="order-status-bar">
              {orderStatuses.map((status, index) => (
                <>
                  <span key={index} className={`status-step ${order.status === status ? "active" : orderStatuses.indexOf(order.status) > index ? "completed" : ""}`}>
                    {status}
                  </span>
                  {index < orderStatuses.length - 1 && <span className="arrow">➝</span>}
                </>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <h3>Past Orders</h3>
      <ul>
        {orders.filter(order => order.status === "Delivered").map(order => (
          <li key={order.id}>
            <strong>Order #{order.id}</strong> - {order.items.join(", ")} - ${order.total.toFixed(2)} - <strong className="delivered-status">{order.status}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
