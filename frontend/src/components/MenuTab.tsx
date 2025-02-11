import { useState } from "react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { id: 1, name: "Vanilla Ice Cream", price: 0.99 },
  { id: 2, name: "Chocolate Ice Cream", price: 1.99 },
  { id: 3, name: "Strawberry Ice Cream", price: 1.99 },
  { id: 4, name: "Mint Chocolate Chip", price: 0.99 }
];

export default function MenuTab() {
  const [cart, setCart] = useState<{ id: number; name: string; price: number }[]>([]);
  const navigate = useNavigate();

  const addToCart = (item: { id: number; name: string; price: number }) => {
    setCart([...cart, item]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const totalFormatted = total.toFixed(2);

  const handleCheckout = () => {
    navigate("/checkout", { state: { cart, total: totalFormatted } });
  };

  return (
    <div className="menu-tab">
      <h2>Menu</h2>
      <ul className="menu-items">
        {menuItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)}
            <button onClick={() => addToCart(item)}>Add</button>
          </li>
        ))}
      </ul>
      <h3>Cart ({cart.length} items)</h3>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
        ))}
      </ul>
      {total > 0 && 
        <div>
          <p><strong>Total: ${totalFormatted}</strong></p>
          <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
        </div>
      }
    </div>
  );
}
