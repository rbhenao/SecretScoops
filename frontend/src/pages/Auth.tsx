import { useState } from "react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <h1>{isLogin ? "Secret Scoops!" : "Sign Up"}</h1>
      <p>{isLogin ? "Welcome back! Please login." : "Create an account to order delicious ice cream."}</p>
      
      <form className="auth-form">
        {!isLogin && (
          <input type="text" placeholder="Full Name" required />
        )}
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
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