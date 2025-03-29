import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Clock, BookOpen, Heart, Share2, MessageCircle, Bookmark } from 'lucide-react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';
import { BOOKS_BY_GENRE } from '../data/books';

const BookDetails = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [readingProgress, setReadingProgress] = useState(0);

  // Find the book from all genres
  const book = Object.values(BOOKS_BY_GENRE)
    .flat()
    .find(b => b.id === id);

  if (!book) {
    return <div>Book not found</div>;
  }

  const handleBuyNow = () => {
    if (!currentUser) {
      toast.error('Please login to purchase');
      navigate('/login');
      return;
    }
    onAddToCart(book);
    navigate('/cart');
  };

  const handleAddToCart = () => {
    if (!currentUser) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }
    onAddToCart(book);
    toast.success('Added to cart!');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    toast.success('Review submitted successfully!');
    setShowReviewForm(false);
    setReview({ rating: 5, comment: '' });
  };

  const handleUpdateProgress = (progress) => {
    setReadingProgress(progress);
    toast.success(`Reading progress updated to ${progress}%`);
  };

  // Find similar books based on genre
  const getSimilarBooks = () => {
    const bookGenre = Object.entries(BOOKS_BY_GENRE)
      .find(([_, books]) => books.some(b => b.id === id))?.[0];

    if (!bookGenre || !BOOKS_BY_GENRE[bookGenre]) return [];

    return BOOKS_BY_GENRE[bookGenre]
      .filter(b => b.id !== id)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  };

  const similarBooks = getSimilarBooks();

  // Mock reviews
  const reviews = [
    {
      id: 1,
      user: "John Doe",
      rating: 5,
      comment: "Absolutely loved this book! The character development was exceptional.",
      date: "2 days ago"
    },
    {
      id: 2,
      user: "Jane Smith",
      rating: 4,
      comment: "Great read, though the ending could have been better.",
      date: "1 week ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Book Image and Basic Info */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <img 
                src={book.image} 
                alt={book.title} 
                className="w-full h-[500px] object-cover rounded-lg"
              />
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < book.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                    <span className="text-gray-600 dark:text-gray-400 ml-2">{book.rating} / 5</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleBookmark}
                      className={`text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 ${
                        isBookmarked ? 'text-indigo-600 dark:text-indigo-400' : ''
                      }`}
                    >
                      <Bookmark size={24} className={isBookmarked ? 'fill-current' : ''} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                    >
                      <Share2 size={24} />
                    </button>
                  </div>
                </div>

                {/* Reading Progress */}
                <div className="border-t dark:border-gray-700 pt-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Reading Progress
                  </h3>
                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full"
                        style={{ width: `${readingProgress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{readingProgress}% complete</span>
                      <button
                        onClick={() => handleUpdateProgress(Math.min(readingProgress + 10, 100))}
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Update Progress
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Book Details and Actions */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">by {book.author}</p>
              
              <div className="flex items-center gap-4 mb-6">
                {book.discountedPrice ? (
                  <div>
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      ₹{book.discountedPrice}
                    </span>
                    <span className="ml-2 text-lg text-gray-500 line-through">₹{book.price}</span>
                    <span className="ml-2 text-green-500">
                      {Math.round(((book.price - book.discountedPrice) / book.price) * 100)}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    ₹{book.price}
                  </span>
                )}
              </div>

              <div className="flex gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-100 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-200 transition-colors dark:bg-indigo-900 dark:text-indigo-400 dark:hover:bg-indigo-800"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  Buy Now
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">About the Book</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {book.description || `A captivating ${book.genre?.toLowerCase()} book that takes readers on an unforgettable journey. Written by the acclaimed author ${book.author}, this book promises to be an engaging read for all book lovers.`}
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Key Features</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Clock size={20} />
                      <span>5-6 hours read</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <BookOpen size={20} />
                      <span>300 pages</span>
                    </div>
                  </div>
                </div>

                {/* Reviews Section */}
                <div className="border-t dark:border-gray-700 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Reviews</h2>
                    <button
                      onClick={() => setShowReviewForm(true)}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Write a Review
                    </button>
                  </div>

                  {showReviewForm && (
                    <form onSubmit={handleSubmitReview} className="mb-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Rating
                        </label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReview({ ...review, rating: star })}
                              className="focus:outline-none"
                            >
                              <Star
                                size={24}
                                className={`${
                                  star <= review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Your Review
                        </label>
                        <textarea
                          value={review.comment}
                          onChange={(e) => setReview({ ...review, comment: e.target.value })}
                          rows={4}
                          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                          required
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          Submit Review
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowReviewForm(false)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b dark:border-gray-700 pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{review.user}</p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">{review .comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Books Section */}
            {similarBooks.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Similar Books</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {similarBooks.map(similar => (
                    <div 
                      key={similar.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => navigate(`/book/${similar.id}`)}
                    >
                      <img 
                        src={similar.image} 
                        alt={similar.title} 
                        className="w-full h-40 object-cover rounded-lg mb-2"
                      />
                      <h3 className="font-medium text-gray-900 dark:text-white">{similar.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{similar.author}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < similar.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;