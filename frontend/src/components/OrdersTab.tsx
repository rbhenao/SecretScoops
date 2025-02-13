import { useState, useEffect } from "react";

interface MenuItem {
  id: number;
  name: string;
  price: number;
}

interface Order {
  id: number;
  items: MenuItem[];
  total: number;
  status: string;
}

const orderStatuses = ["Processing", "Preparing", "Out for Delivery", "Delivered"];

export default function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeOrders, setActiveOrders] = useState<boolean>(false);

  const fetchOrders = () => {
    fetch("http://localhost:4000/orders")
      .then(response => response.json())
      .then(data => {
        console.log("Fetched Orders:", data.orders);
        setOrders(data.orders);
        setActiveOrders(data.orders.some((order: Order) => order.status !== "Delivered"));
      })
      .catch(error => console.error("Error fetching orders:", error));
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  
  return (
    <div className="orders-tab">
      <h2>Orders</h2>
      <h3>Active Orders</h3>
      {activeOrders && (
        <button className="refresh-button" onClick={fetchOrders}>🔄 Refresh Orders</button>
      )}
      <ul className="active-orders">
        {orders.filter(order => order.status !== "Delivered").map((order,index) => (
          <li key={index}>
            <div className="order-summary">
              <strong>Order #{order.id}</strong> - {order.items.map(item => item.name).join(", ")} - ${order.total.toFixed(2)}
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
        {orders.filter(order => order.status === "Delivered").map((order, index) => (
          <li key={index}>
            <strong>Order #{order.id}</strong> - {order.items.map(item => item.name).join(", ")} - ${order.total.toFixed(2)} - <strong className="delivered-status">{order.status}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

