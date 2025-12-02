import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Safe image handling
  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=400&q=80"; // Fallback image
  };

  return (
    <div className="group relative bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      
      {/* Image Container */}
      <div className="relative h-80 overflow-hidden bg-gray-100">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay on Hover - FIX: Use bg-transparent as base */}
        <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
             <Link 
              to={`/product/${product._id}`}
              className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 bg-white text-primary px-6 py-2 font-semibold transition-all duration-300 shadow-lg"
            >
              View Details
            </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-serif font-semibold text-primary mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2 truncate">{product.shortDesc}</p>
        <p className="text-accent font-bold text-lg">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;