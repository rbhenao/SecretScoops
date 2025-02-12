import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MenuTab() {
  const [menuItems, setMenuItems] = useState<{ id: number; name: string; price: number }[]>([]);
  const [cart, setCart] = useState<{ id: number; name: string; price: number }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/menu")
      .then(response => response.json())
      .then(data => setMenuItems(data.menu))
      .catch(error => console.error("Error fetching menu items:", error));
  }, []);

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

