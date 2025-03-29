import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { CreditCard, Smartphone, Building2, Clock, Minus, Plus, BookOpen, Brain, BookMarked, Coffee, Moon, Sun } from 'lucide-react';
import toast from 'react-hot-toast';
import { BOOKS_BY_GENRE } from '../data/books';

export default function Cart({ items, removeFromCart, updateQuantity }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [readingTime, setReadingTime] = useState('medium');
  const [mood, setMood] = useState('relaxed');
  const [readingGoal, setReadingGoal] = useState('learning');
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const subtotal = items.reduce((sum, item) => 
    sum + (item.discountedPrice || item.price) * item.quantity, 0
  );
  
  const shippingCost = subtotal > 999 ? 0 : 99;
  const total = subtotal + shippingCost - appliedDiscount;

  const handleApplyCoupon = () => {
    // Simulate coupon validation
    if (couponCode.toUpperCase() === 'BOOKS50') {
      const discount = Math.min(subtotal * 0.1, 500); // 10% off up to ₹500
      setAppliedDiscount(discount);
      toast.success(`Coupon applied! You saved ₹${discount}`);
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const handleCheckout = () => {
    if (!currentUser) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }

    // Validate shipping address
    const requiredFields = ['fullName', 'address', 'city', 'state', 'pincode', 'phone'];
    const missingFields = requiredFields.filter(field => !shippingAddress[field]);
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all shipping details');
      return;
    }

    // Simulate payment processing
    toast.loading('Processing payment...', { duration: 2000 });
    
    setTimeout(() => {
      toast.success('Order placed successfully!');
      // Clear cart and navigate to order confirmation
      removeFromCart(items.map(item => item.id));
      navigate('/order-confirmation');
    }, 2000);
  };

  const getReadingTimeEstimate = (quantity) => {
    return `${quantity * 5} hours`;
  };

  const getRecommendations = () => {
    let recommendations = [];
    const allBooks = Object.values(BOOKS_BY_GENRE).flat();
    const purchasedGenres = new Set(items.map(item => {
      // Find the genre of the book
      for (const [genre, books] of Object.entries(BOOKS_BY_GENRE)) {
        if (books.find(book => book.id === item.id)) {
          return genre;
        }
      }
    }));

    // Mood-based recommendations
    const moodGenreMap = {
      relaxed: {
        morning: ['Comedy', 'Essays'],
        afternoon: ['Romance', 'Fiction'],
        evening: ['Fantasy', 'Novel']
      },
      focused: {
        morning: ['Educational', 'Dictionary'],
        afternoon: ['Mystery', 'Sci-Fi'],
        evening: ['Drama', 'Essays']
      },
      inspired: {
        morning: ['Educational', 'Novel'],
        afternoon: ['Sci-Fi', 'Fantasy'],
        evening: ['Fiction', 'Mystery']
      }
    };

    // Reading goal based recommendations
    const goalGenreMap = {
      learning: ['Educational', 'Dictionary', 'Essays'],
      entertainment: ['Fiction', 'Fantasy', 'Sci-Fi', 'Comedy'],
      personal_growth: ['Novel', 'Drama', 'Essays'],
      relaxation: ['Romance', 'Comedy', 'Fiction']
    };

    // Get recommended genres based on mood and time of day
    const moodBasedGenres = moodGenreMap[mood][timeOfDay] || [];
    const goalBasedGenres = goalGenreMap[readingGoal] || [];

    // Combine all recommendation factors
    const recommendedGenres = [...new Set([...moodBasedGenres, ...goalBasedGenres])];

    // Get specific book recommendations
    recommendedGenres.forEach(genre => {
      if (BOOKS_BY_GENRE[genre]) {
        const genreBooks = BOOKS_BY_GENRE[genre]
          .filter(book => !items.find(item => item.id === book.id)) // Exclude books already in cart
          .sort((a, b) => b.rating - a.rating) // Sort by rating
          .slice(0, 2); // Get top 2 rated books

        recommendations.push(...genreBooks.map(book => ({
          ...book,
          genre,
          reason: getRecommendationReason(genre, mood, timeOfDay, readingGoal)
        })));
      }
    });

    // Add similar books based on current cart items
    purchasedGenres.forEach(genre => {
      if (genre && BOOKS_BY_GENRE[genre]) {
        const similarBooks = BOOKS_BY_GENRE[genre]
          .filter(book => !items.find(item => item.id === book.id))
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 1);

        recommendations.push(...similarBooks.map(book => ({
          ...book,
          genre,
          reason: `Similar to books in your cart`
        })));
      }
    });

    // Remove duplicates and limit to 6 recommendations
    return Array.from(new Map(recommendations.map(book => [book.id, book])).values())
      .slice(0, 6);
  };

  const getRecommendationReason = (genre, mood, timeOfDay, goal) => {
    const reasons = {
      relaxed: {
        morning: 'Perfect for a calm morning read',
        afternoon: 'Great for a relaxing afternoon',
        evening: 'Ideal for winding down'
      },
      focused: {
        morning: 'Best for productive mornings',
        afternoon: 'Maintains afternoon concentration',
        evening: 'Engaging evening read'
      },
      inspired: {
        morning: 'Starts your day with inspiration',
        afternoon: 'Keeps creativity flowing',
        evening: 'Enriching evening material'
      }
    };

    const goalReasons = {
      learning: 'Supports your learning goals',
      entertainment: 'Provides great entertainment',
      personal_growth: 'Aids in personal development',
      relaxation: 'Perfect for relaxation'
    };

    return `${reasons[mood][timeOfDay]}. ${goalReasons[goal]}`;
  };

  const PaymentOption = ({ id, icon: Icon, title, description }) => (
    <label className="flex items-start p-4 border dark:border-gray-700 rounded-lg cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors">
      <input
        type="radio"
        name="payment"
        value={id}
        checked={paymentMethod === id}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="mt-1"
      />
      <div className="ml-4">
        <div className="flex items-center gap-2">
          <Icon size={20} className="text-indigo-600 dark:text-indigo-400" />
          <span className="font-medium dark:text-gray-200">{title}</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
      </div>
    </label>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8 dark:text-white">Your Cart</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Cart items section */}
          {items.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center">
              <p className="text-gray-600 dark:text-gray-400">Your cart is empty</p>
              <Link 
                to="/shop" 
                className="inline-block mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                  <div className="ml-4 flex-grow">
                    <h3 className="font-semibold dark:text-white">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{item.author}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Minus size={16} className="text-gray-600 dark:text-gray-400" />
                      </button>
                      <span className="mx-3 dark:text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Plus size={16} className="text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                    <p className="text-indigo-600 dark:text-indigo-400 font-bold mt-1">
                      ₹{(item.discountedPrice || item.price) * item.quantity}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock size={14} />
                      <span>Estimated reading time: {getReadingTimeEstimate(item.quantity)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 px-4"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Shipping Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Address
                  </label>
                  <textarea
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={2}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.pincode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {items.length > 0 && (
            <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Reading Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Available Reading Time
                  </label>
                  <select
                    value={readingTime}
                    onChange={(e) => setReadingTime(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="short">Short (1-2 hours)</option>
                    <option value="medium">Medium (2-4 hours)</option>
                    <option value="long">Long (4+ hours)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Mood
                  </label>
                  <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="relaxed">Relaxed</option>
                    <option value="focused">Focused</option>
                    <option value="inspired">Inspired</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Reading Goal
                  </label>
                  <select
                    value={readingGoal}
                    onChange={(e) => setReadingGoal(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="learning">Learning & Education</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="personal_growth">Personal Growth</option>
                    <option value="relaxation">Relaxation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preferred Reading Time
                  </label>
                  <select
                    value={timeOfDay}
                    onChange={(e) => setTimeOfDay(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                  </select>
                </div>
                <button
                  onClick={() => setShowRecommendations(true)}
                  className="w-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 py-2 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Brain size={18} />
                  Get Personalized Recommendations
                </button>
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost}`}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Discount</span>
                    <span>-₹{appliedDiscount}</span>
                  </div>
                )}
                <div className="pt-3 border-t dark:border-gray-700">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium dark:text-gray-200">Total:</span>
                    <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">₹{total}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Use code BOOKS50 for 10% off (up to ₹500)
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <PaymentOption
                  id="card"
                  icon={CreditCard}
                  title="Credit/Debit Card"
                  description="Pay securely with your card"
                />
                <PaymentOption
                  id="upi"
                  icon={Smartphone}
                  title="UPI"
                  description="Pay using any UPI app"
                />
                <PaymentOption
                  id="netbanking"
                  icon={Building2}
                  title="Net Banking"
                  description="Pay through your bank account"
                />
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors font-medium"
              >
                Proceed to Pay
              </button>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                Free delivery on orders above ₹999
              </p>
            </div>
          </div>
        )}
      </div>

      {showRecommendations && items.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Recommended for You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getRecommendations().map((book) => (
              <div key={book.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="flex items-start gap-4">
                  <img 
                    src={book.image} 
                    alt={book.title} 
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{book.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{book.author}</p>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">{book.genre}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">{book.reason}</p>
                    <button
                      onClick={() => {
                        const newBook = {
                          id: book.id,
                          title: book.title,
                          author: book.author,
                          price: book.price,
                          discountedPrice: book.discountedPrice,
                          image: book.image
                        };
                        handleAddToCart(newBook);
                      }}
                      className="mt-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full text-sm hover:bg-indigo-200 dark:hover:bg-indigo-800"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}