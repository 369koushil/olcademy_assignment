import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('api/products');
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      
      {/* --- HERO SECTION (ID: home) --- */}
      <div 
        id="home"
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1920&q=80")' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl text-white font-serif font-bold mb-4 animate-fade-in-up">
            Scents of Elegance
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Discover our exclusive collection of premium fragrances designed to define your presence.
          </p>
          <a href="#collections" className="bg-accent border-amber-50 border-2 text-white px-8 py-3 font-semibold hover:bg-yellow-600 transition duration-300 uppercase tracking-wider">
            Shop Now
          </a>
        </div>
      </div>

      {/* --- COLLECTIONS SECTION (ID: collections) --- */}
      <div id="collections" className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-serif text-center font-bold mb-2 text-primary">Our Collections</h2>
        <div className="w-24 h-1 bg-accent mx-auto mb-12"></div>

        {loading ? (
          <div className="text-center text-gray-500 text-lg">Loading exquisite scents...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* --- ABOUT SECTION (ID: about) --- */}
      <div id="about" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* About Image - UPDATED VALID URL */}
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80" 
                alt="Perfume Crafting" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* About Text */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">About Essence</h2>
              <div className="w-16 h-1 bg-accent mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded in 2025, Essence Perfumery was born from a passion for the art of fragrance. We believe that a scent is more than just an accessory; it is a memory, an emotion, and a signature.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our perfumes are handcrafted using the rarest ingredients sourced from around the globe. Whether you prefer the deep mystery of oud or the fresh zest of citrus, Essence creates olfactory masterpieces that linger in the heart and mind.
              </p>
              <button className="text-accent font-semibold border-b-2 border-accent pb-1 hover:text-primary hover:border-primary transition">
                Read Our Full Story
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;