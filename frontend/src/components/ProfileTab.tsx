import { useState, useEffect } from "react";

export default function ProfileTab() {
  const [user, setUser] = useState({ name: "", email: "", phone: "", address: "" });

  useEffect(() => {
    fetch("http://localhost:4000/users/profile")
      .then(response => response.json())
      .then(data => setUser(data.user))
      .catch(error => console.error("Error fetching user profile:", error));
  }, []);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p>Update your profile details here.</p>
      <form className="profile-form">
        <label>
          <span><b>Name (current): </b>{user.name}</span>
          <input type="text" placeholder="Enter your name" defaultValue={user.name} required />
        </label>
        <label>
          <span><b>Email (current):</b> {user.email}</span>
          <input type="email" placeholder="Enter your email" defaultValue={user.email} required />
        </label>
        <label>
          <span><b>Phone Number (current):</b> {user.phone}</span>
          <input type="tel" placeholder="Enter your phone number" defaultValue={user.phone} required />
        </label>
        <label>
          <span><b>Address (current):</b> {user.address}</span>
          <input type="text" placeholder="Enter your address" defaultValue={user.address} required />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}