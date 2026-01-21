import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaShareAlt } from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
        setActiveImg(res.data.images[0]);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this perfume: ${product.name}`,
        url: window.location.href,
      });
    } else {
      alert("Link copied to clipboard!");
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/products/${id}/reviews`, {
        user: "Guest User",
        rating,
        comment
      });
      // Refresh data
      const res = await axios.get(`/api/products/${id}`);
      setProduct(res.data);
      setComment('');
    } catch (err) {
      alert("Error submitting review");
    }
  };

  if (loading || !product) return <div className="text-center py-20">Loading details...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Top Section: Gallery & Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Gallery */}
        <div className="space-y-4">
          <div className="h-96 md:h-[500px] overflow-hidden rounded-lg shadow-lg bg-gray-100">
            <img src={activeImg} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <img 
                key={idx} 
                src={img} 
                alt="thumb" 
                onClick={() => setActiveImg(img)}
                className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${activeImg === img ? 'border-accent' : 'border-transparent'}`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
             <h1 className="text-4xl font-serif font-bold text-primary">{product.name}</h1>
             <button onClick={handleShare} className="text-gray-400 hover:text-accent transition">
                <FaShareAlt size={24} />
             </button>
          </div>
          
          <p className="text-2xl text-accent font-semibold">${product.price}</p>
          
          <p className="text-gray-600 leading-relaxed">
            {product.fullDesc}
          </p>

          <div>
            <span className="block font-semibold mb-2">Select Size:</span>
            <div className="flex space-x-3">
              {product.sizes.map((size) => (
                <button key={size} className="px-4 py-2 border border-gray-300 rounded hover:border-accent hover:text-accent transition">
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full bg-gray-700 text-white py-4 text-lg font-semibold rounded hover:bg-gray-900 transition shadow-lg">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-20">
        <h2 className="text-2xl font-serif font-bold mb-6 border-b pb-2">Customer Reviews</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Reviews List */}
          <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4">
             {product.reviews.length === 0 && <p className="text-gray-500">No reviews yet. Be the first!</p>}
             {product.reviews.map((rev, i) => (
               <div key={i} className="bg-gray-50 p-4 rounded border border-gray-100">
                 <div className="flex justify-between mb-2">
                    <span className="font-bold">{rev.user}</span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, index) => (
                         <FaStar key={index} className={index < rev.rating ? "text-yellow-400" : "text-gray-300"} />
                      ))}
                    </div>
                 </div>
                 <p className="text-gray-600 text-sm">{rev.comment}</p>
               </div>
             ))}
          </div>

          {/* Add Review Form */}
          <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
            <form onSubmit={submitReview} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Rating</label>
                <select 
                  value={rating} 
                  onChange={e => setRating(Number(e.target.value))}
                  className="w-full border p-2 rounded focus:outline-none focus:border-accent"
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Good</option>
                  <option value="3">3 - Average</option>
                  <option value="2">2 - Poor</option>
                  <option value="1">1 - Terrible</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Comment</label>
                <textarea 
                  rows="4" 
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  className="w-full border p-2 rounded focus:outline-none focus:border-accent"
                  placeholder="Share your thoughts..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="bg-accent text-white px-6 py-2 rounded hover:bg-yellow-600 transition">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;