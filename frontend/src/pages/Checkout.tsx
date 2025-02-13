import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

interface CheckoutRequest {
  name: string;
  address: string;
  paymentMethod: "credit" | "paypal";
  cart: { id: number; name: string; price: number }[];
  total: number;
}

interface MenuItem {
    id: number;
    name: string;
    price: number;
}

interface Order {
  id: number;
  items: string[];
  total: number;
  status: "Processing" | "Prepared" | "Out for Delivery" | "Delivered";
}
  
interface CartItem extends MenuItem {}

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, total } = location.state || { cart: [] as CartItem[], total: "0.00" };

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "paypal">("credit");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const checkoutData: CheckoutRequest = {
      name,
      address,
      paymentMethod,
      cart,
      total,
    };
    
    try {
      const response = await fetch("http://localhost:4000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      const data = await response.json();
      setSuccessMessage(data.message);
      setOrderDetails(data.order);
    } catch (error) {
      console.error("Error submitting order:", error);
      setErrorMessage("Failed to submit order. Please try again.");
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      {successMessage ? (
        <div className="success-message">
          <h2>{successMessage}</h2>
          <p><b>Order ID: # {orderDetails?.id}</b></p>
          <button onClick={() => navigate("/dashboard", { state: { activeTab: "orders" } })}>Go to Orders</button>
        </div>
      ) : (
        <>
          <h3>Order Summary</h3>
          <ul>
            {cart.map((item: CartItem, index: number) => (
              <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
            ))}
          </ul>
          <h3>Total: ${total}</h3>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="checkout-form-group">
              <label>
                Name:
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label>
                Address:
                <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} />
              </label>
              <label>
                Payment Method:
                <select required value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as "credit" | "paypal")}>
                  <option value="credit">Credit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </label>
              <button type="submit">Confirm Order</button>
            </div>
          </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </>
      )}
    </div>
  );
}
