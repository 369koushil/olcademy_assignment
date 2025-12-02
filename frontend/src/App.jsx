import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </main>
        <footer className="bg-primary text-white py-6 text-center text-sm">
          &copy; 2025 Essence Perfumery. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;