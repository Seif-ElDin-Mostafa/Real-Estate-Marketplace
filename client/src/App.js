import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Buy from './Buy';
import Sell from './Sell';
import AboutUs from './AboutUs';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/projects" element={<div>Projects Page</div>} />
        <Route path="/agents" element={<div>Agents Page</div>} />
        <Route path="/services" element={<div>Services Page</div>} />
        <Route path="/listings" element={<div>Listings Page</div>} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sale" element={<Sell />} />
      </Routes>
    </Router>
  );
}

export default App;