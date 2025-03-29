import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, LogOut, Sun, Moon, Users, Trophy } from 'lucide-react';
import { useAuth } from './AuthContext';

export default function Header({ cartItemsCount = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout, darkMode, toggleDarkMode } = useAuth();
  const navigate = useNavigate();

  const navLinks = ['Home', 'Shop', 'Community', 'Challenges', 'About', 'Contact'];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out');
    }
  };

  return (
    <header className="w-full">
      <div className="bg-indigo-600 dark:bg-indigo-800 text-white py-2 px-4 text-center">
        <p className="text-sm">Buy now Get 50% Discount on all types of books</p>
      </div>

      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              BookVerse
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search books..."
                  className="pl-4 pr-10 py-2 border rounded-full focus:outline-none focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link}
                  to={link === 'Home' ? '/' : link.toLowerCase()}
                  className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                >
                  {link}
                </Link>
              ))}

              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? (
                  <Sun className="text-yellow-500" size={20} />
                ) : (
                  <Moon className="text-gray-600" size={20} />
                )}
              </button>

              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 dark:text-gray-300">
                    Hello, {currentUser.displayName || currentUser.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <div className="space-x-4">
                  <Link
                    to="/login"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                  >
                    Login/Sign Up
                  </Link>
                </div>
              )}

              <Link to="/cart" className="relative">
                <ShoppingCart className="text-gray-600 dark:text-gray-300" size={24} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>

            <button
              className="md:hidden text-gray-600 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4">
              {navLinks.map((link) => (
                <Link
                  key={link}
                  to={link === 'Home' ? '/' : link.toLowerCase()}
                  className="block py-2 text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                >
                  {link}
                </Link>
              ))}
              {!currentUser && (
                <Link
                  to="/login"
                  className="block py-2 text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                >
                  Login/Sign Up
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}