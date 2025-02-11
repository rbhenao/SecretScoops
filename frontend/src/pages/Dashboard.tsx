import { useState } from "react";
import ProfileTab from "../components/ProfileTab";
import MenuTab from "../components/MenuTab";
import OrdersTab from "../components/OrdersTab";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("menu");

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="tabs">
        <button onClick={() => setActiveTab("menu")}>Menu</button>
        <button onClick={() => setActiveTab("orders")}>Orders</button>
        <button onClick={() => setActiveTab("profile")}>Profile</button>
      </div>
      <div className="tab-content">
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "menu" && <MenuTab />}
        {activeTab === "orders" && <OrdersTab />}
      </div>
    </div>
  );
}