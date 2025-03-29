import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShoppingCart, Users, Heart } from 'lucide-react';
import { FEATURED_BOOKS } from '../data/books';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative py-24 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to <span className="text-indigo-600 dark:text-indigo-400">BookVerse</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover a world of stories, knowledge, and imagination. Your next great read is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              <ShoppingCart className="mr-2" size={20} />
              Start Shopping
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-indigo-600 bg-white border-2 border-indigo-600 hover:bg-indigo-50 dark:bg-gray-800 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-gray-700"
            >
              <Users className="mr-2" size={20} />
              About Us
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 mb-4">
                <BookOpen className="text-indigo-600 dark:text-indigo-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Vast Collection</h3>
              <p className="text-gray-600 dark:text-gray-300">Over 1 million books across genres</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 mb-4">
                <ShoppingCart className="text-indigo-600 dark:text-indigo-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Easy Shopping</h3>
              <p className="text-gray-600 dark:text-gray-300">Simple and secure checkout process</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 mb-4">
                <Heart className="text-indigo-600 dark:text-indigo-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Personalized</h3>
              <p className="text-gray-600 dark:text-gray-300">Get recommendations you'll love</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 mb-4">
                <Users className="text-indigo-600 dark:text-indigo-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Community</h3>
              <p className="text-gray-600 dark:text-gray-300">Join our reading community</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Books Section */}
      <div className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Featured Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURED_BOOKS.map((book) => (
              <Link key={book.id} to={`/book/${book.id}`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform group-hover:scale-105">
                  <img src={book.image} alt={book.title} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 dark:text-white">{book.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{book.author}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 dark:text-gray-500 line-through">₹{book.price}</span>
                        <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                          ₹{book.discountedPrice}
                        </span>
                      </div>
                      <div className="text-yellow-400 flex items-center gap-1">
                        <span className="text-sm font-medium dark:text-gray-300">{book.rating}</span>
                        <span className="text-xs">★</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;