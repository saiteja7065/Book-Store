import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Login from './components/Login';
import About from './components/About';
import Contact from './components/Contact';
import BookDetails from './components/BookDetails';
import Community from './components/Community';
import ReadingChallenges from './components/ReadingChallenges';
import Loader from './components/Loader';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const handleAddToCart = (book) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === book.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...book, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (bookId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== bookId));
  };

  const handleUpdateQuantity = (bookId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(bookId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === bookId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleNavigation = (callback) => {
    setLoading(true);
    setTimeout(() => {
      callback();
      setLoading(false);
    }, 1000); // Simulate loading time
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.example.com/books'); // Replace with actual API URL
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen dark:bg-gray-900">
          <Header cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
          <main className="flex-grow">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <Loader size={48} />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {books.map(book => (
                  <div key={book.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h3 className="text-lg font-bold">{book.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{book.author}</p>
                    <button
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => handleAddToCart(book)}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Protected Routes */}
              <Route path="/shop" element={
                <PrivateRoute>
                  <Shop onAddToCart={handleAddToCart} />
                </PrivateRoute>
              } />
              <Route path="/book/:id" element={
                <PrivateRoute>
                  <BookDetails onAddToCart={handleAddToCart} />
                </PrivateRoute>
              } />
              <Route path="/cart" element={
                <PrivateRoute>
                  <Cart 
                    items={cartItems} 
                    removeFromCart={handleRemoveFromCart}
                    updateQuantity={handleUpdateQuantity}
                  />
                </PrivateRoute>
              } />
              <Route path="/community" element={
                <PrivateRoute>
                  <Community />
                </PrivateRoute>
              } />
              <Route path="/challenges" element={
                <PrivateRoute>
                  <ReadingChallenges />
                </PrivateRoute>
              } />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;