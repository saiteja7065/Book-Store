import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';

interface BookCardProps {
  title: string;
  author: string;
  price: number;
  discountedPrice?: number;
  rating: number;
  image: string;
  onAddToCart: () => void;
}

const BookCard: React.FC<BookCardProps> = ({
  title,
  author,
  price,
  discountedPrice,
  rating,
  image,
  onAddToCart
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-64 object-cover" />
        {discountedPrice && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
            {Math.round(((price - discountedPrice) / price) * 100)}% OFF
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-gray-600 mb-2">{author}</p>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div>
            {discountedPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-gray-400 line-through">₹{price}</span>
                <span className="text-lg font-bold text-indigo-600">₹{discountedPrice}</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-indigo-600">₹{price}</span>
            )}
          </div>
          <button
            onClick={onAddToCart}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors"
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