import { useState } from "react";
import { useLocation } from "react-router-dom";
import ProfileTab from "../components/ProfileTab";
import MenuTab from "../components/MenuTab";
import OrdersTab from "../components/OrdersTab";

export default function Dashboard() {
  const location = useLocation();
  const initialTab = location.state?.activeTab || "menu";
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="tabs">
        <button className={activeTab === "menu" ? "active-tab" : ""} 
          onClick={() => setActiveTab("menu")}>
          Menu
        </button>
        <button 
          className={activeTab === "orders" ? "active-tab" : ""} 
          onClick={() => setActiveTab("orders")}>
          Orders
        </button>
        <button 
          className={activeTab === "profile" ? "active-tab" : ""} 
          onClick={() => setActiveTab("profile")}>
          Profile
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "menu" && <MenuTab />}
        {activeTab === "orders" && <OrdersTab />}
      </div>
    </div>
  );
}