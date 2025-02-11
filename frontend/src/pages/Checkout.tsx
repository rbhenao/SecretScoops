import { useLocation } from "react-router-dom";

interface CartItem {
  name: string;
  price: number;
}

export default function Checkout() {
  const location = useLocation();
  const { cart, total } = location.state || { cart: [] as CartItem[], total: "0.00" };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <h3>Order Summary</h3>
      <ul>
        {cart.map((item: CartItem, index: number) => (
          <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
        ))}
      </ul>
      <h3>Total: ${total}</h3>
      <form className="checkout-form">
        <div className="checkout-form-group">
            <label>
                Name:
                <input type="text" required />
            </label>
            <label>
                Address:
                <input type="text" required />
            </label>
            <label>
                Payment Method:
                <select required>
                    <option value="credit">Credit Card</option>
                    <option value="paypal">PayPal</option>
                </select>
            </label>
            <button type="submit">Confirm Order</button>
        </div>
      </form>
    </div>
  );
}
