import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingBag } from 'react-icons/fa';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const location = useLocation();

  // Helper to handle navigation: if on home, scroll; if not, go to home#hash
  const handleScroll = (id) => {
    setNav(false); // Close mobile menu if open
    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If on product page, navigate to home with hash
      window.location.href = `/#${id}`;
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo(0,0)} className="text-2xl font-serif font-bold text-primary tracking-widest">
            ESSENCE
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => handleScroll('home')} className="text-gray-700 py-2 px-3 hover:border-b-2  transition duration-300">
              Home
            </button>
            <button onClick={() => handleScroll('collections')} className="text-gray-700 py-2 px-3 hover:text-accent transition duration-300 hover:border-b-2 ">
              Collections
            </button>
            <button onClick={() => handleScroll('about')} className="text-gray-700 py-2 px-3 hover:text-accent transition duration-300 hover:border-b-2 ">
              About
            </button>
            <button className="text-primary hover:text-accent">
               <FaShoppingBag size={20} />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden z-10 cursor-pointer" onClick={() => setNav(!nav)}>
            {nav ? <FaTimes size={25} /> : <FaBars size={25} />}
          </div>

          {/* Mobile Menu */}
          {nav && (
            <div className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col justify-center items-center space-y-8 z-40">
              <button onClick={() => handleScroll('home')} className="text-2xl font-serif hover:text-accent">
                Home
              </button>
              <button onClick={() => handleScroll('collections')} className="text-2xl font-serif hover:text-accent">
                Collections
              </button>
              <button onClick={() => handleScroll('about')} className="text-2xl font-serif hover:text-accent">
                About
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;