import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = { email, password };
    navigate("/dashboard", { state: userData });
  };

  return (
    <div className="auth-container">
      <h1>{isLogin ? "Secret Scoops!" : "Sign Up"}</h1>
      <p>{isLogin ? "Welcome back! Please login." : "Create an account to order delicious ice cream."}</p>
      
      <form className="auth-form" onSubmit={handleSubmit}>
        {!isLogin && (
          <input type="text" 
            placeholder="Full Name" 
            required 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        )}
        <input type="email" 
          placeholder="Email" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password" 
          placeholder="Password" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>

      <p className="auth-footer">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button className="toggle-auth" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}