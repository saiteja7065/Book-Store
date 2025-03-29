import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const BookCard = ({
  id,
  title,
  author,
  price,
  discountedPrice,
  rating,
  image,
  onAddToCart
}) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!currentUser) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }
    onAddToCart();
    toast.success('Added to cart!');
  };

  return (
    <div 
      onClick={() => navigate(`/book/${id}`)}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
    >
      <div className="relative">
        <img src={image} alt={title} className="w-full h-64 object-cover" />
        {discountedPrice && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
            {Math.round(((price - discountedPrice) / price) * 100)}% OFF
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-2">{author}</p>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div>
            {discountedPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-gray-400 dark:text-gray-500 line-through">₹{price}</span>
                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">₹{discountedPrice}</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">₹{price}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;