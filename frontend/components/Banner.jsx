import React from 'react';

const Banner = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if(element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="banner">
      <h1>Discover Your Signature Scent</h1>
      <p>Exclusive fragrances for the elegant soul.</p>
      <button onClick={scrollToProducts}>Shop Collection</button>
    </div>
  );
};

export default Banner;