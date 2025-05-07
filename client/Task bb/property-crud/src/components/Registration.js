import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Registration.css";

function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer"); 
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length < 3) {
      alert("Username must be at least 3 characters long");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long"); 
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email (ibrahim.hazim@msa.edu.eg)");
      return;
    }
    
    if (!["admin", "buyer", "seller"].includes(role)) {
      alert("Please select a valid role");
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      console.log("Registration attempt with:", { username, password, role, email, phone });
      alert("Registration submitted successfully!");
      setIsLoading(false);
      navigate("/welcome");
    }, 1000); 
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <div className="registration-form">
        <div className="form-group">
          <label><i className="fas fa-user"></i> Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label><i className="fas fa-lock"></i> Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-group">
          <label><i className="fas fa-briefcase"></i> Role: </label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="form-group">
          <label><i className="fas fa-envelope"></i> Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label><i className="fas fa-phone"></i> Phone: </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number (optional)"
          />
        </div>
        <button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
        </button>
      </div>
    </div>
  );
}

export default Registration;