import React, { useState, useMemo } from 'react';
import { BOOKS_BY_GENRE } from '../data/books';
import BookCard from './BookCard';
import GenreList from './GenreList';
import { Brain, BookOpen, Clock, Filter, Star, Heart, Bookmark, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const Shop = ({ onAddToCart }) => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [showPreferences, setShowPreferences] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState('featured');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [preferences, setPreferences] = useState({
    readingTime: 'medium',
    mood: 'relaxed',
    readingGoal: 'entertainment',
    timeOfDay: 'morning'
  });
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(false);
  const [isLoadingViewMode, setIsLoadingViewMode] = useState(false);

  const handleToggleWishlist = async (bookId) => {
    setIsLoadingWishlist(true);
    setWishlist((prev) => {
      const newWishlist = prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId];

      toast.success(
        prev.includes(bookId) ? 'Removed from wishlist' : 'Added to wishlist'
      );
      return newWishlist;
    });
    setTimeout(() => setIsLoadingWishlist(false), 500); // Simulate delay
  };

  const filteredBooks = useMemo(() => {
    let result = [];

    // Get initial books based on genre
    if (selectedGenre === 'All') {
      Object.values(BOOKS_BY_GENRE).forEach((genreBooks) => {
        result.push(...genreBooks);
      });
    } else {
      result = [...(BOOKS_BY_GENRE[selectedGenre] || [])];
    }
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      );
    }
    // Apply price filter
    result = result.filter((book) => {
      const price = book.discountedPrice || book.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    // Apply rating filter
    if (ratingFilter > 0) {
      result = result.filter((book) => book.rating >= ratingFilter);
    }
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort(
          (a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price)
        );
        break;
      case 'price-high':
        result.sort(
          (a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price)
        );
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => {
          const discountA = a.price - (a.discountedPrice || a.price);
          const discountB = b.price - (b.discountedPrice || b.price);
          return discountB - discountA;
        });
        break;
      default:
        // 'featured' - no additional sorting needed
        break;
    }
    return result;
  }, [selectedGenre, searchQuery, priceRange, ratingFilter, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <div className="md:w-1/4">
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
              </div>
              {/* Genre List */}
              <GenreList selectedGenre={selectedGenre} onSelectGenre={setSelectedGenre} />
              {/* Price Range Filter */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full"
                  />
                </div>
              </div>
              {/* Rating Filter */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setRatingFilter(rating)}
                      className={`flex items-center w-full p-2 rounded-lg ${
                        ratingFilter === rating
                          ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            size={16}
                            className={`$${
                              index < rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm">& up</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Main Content */}
          <div className="md:w-3/4">
            {/* Top Bar - Sort and View Options */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="discount">Biggest Discount</option>
                  </select>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsLoadingViewMode(true);
                        setViewMode('grid');
                        setTimeout(() => setIsLoadingViewMode(false), 500);
                      }}
                      className={`p-2 rounded-lg ${
                        viewMode === 'grid'
                          ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {isLoadingViewMode ? (
                        <div className="w-4 h-4 border-2 border-t-blue-400 animate-spin rounded-full"></div>
                      ) : (
                        <Filter size={20} />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setIsLoadingViewMode(true);
                        setViewMode('list');
                        setTimeout(() => setIsLoadingViewMode(false), 500);
                      }}
                      className={`p-2 rounded-lg ${
                        viewMode === 'list'
                          ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {isLoadingViewMode ? (
                        <div className="w-4 h-4 border-2 border-t-blue-400 animate-spin rounded-full"></div>
                      ) : (
                        <BookOpen size={20} />
                      )}
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {filteredBooks.length} results
                </p>
              </div>
            </div>
            {/* Books Grid/List */}
            {filteredBooks.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">No books found matching your criteria</p>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1'
                }`}
              >
                {filteredBooks.map((book) => (
                  <div key={book.id} className="relative">
                    <button
                      onClick={() => handleToggleWishlist(book.id)}
                      className="absolute top-2 right-2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:scale-110 transition-transform"
                    >
                      {isLoadingWishlist ? (
                        <div className="w-4 h-4 border-2 border-t-blue-400 animate-spin rounded-full"></div>
                      ) : (
                        <Heart
                          size={20}
                          className={
                            wishlist.includes(book.id)
                              ? 'text-red-500 fill-current'
                              : 'text-gray-400 dark:text-gray-500'
                          }
                        />
                      )}
                    </button>
                    <BookCard {...book} onAddToCart={() => onAddToCart(book)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;