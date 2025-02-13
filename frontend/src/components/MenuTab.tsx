import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends MenuItem {}

type Cart = CartItem[];

export default function MenuTab() {
  const [cart, setCart] = useState<Cart>([]);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/menu")
      .then(response => response.json())
      .then(data => setMenu(data.menu))
      .catch(error => console.error("Error fetching menu:", error));
  }, []);

  const addToCart = (item: MenuItem) => {
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
        {menu.map((item) => (
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
