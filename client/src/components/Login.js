import React, { useState } from "react";
import "../styles/Login.css";

function Login() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username.length < 3) {
      alert("Please enter a valid username (at least 3 characters)");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      console.log("Login attempt with:", username, password);
      alert("Login submitted successfully!");
      setIsLoading(false);
      
    }, 1000);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="login-form">
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
        <button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
        </button>
        
      </div>
    </div>
  );
}

export default Login;