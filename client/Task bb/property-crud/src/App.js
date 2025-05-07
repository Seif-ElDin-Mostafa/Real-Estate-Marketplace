import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/registration" className="nav-link">Register</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;