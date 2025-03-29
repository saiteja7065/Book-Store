import React, { useState } from 'react';
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

const App = () => {
  const [cartItems, setCartItems] = useState([]);

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

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen dark:bg-gray-900">
          <Header cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
          <main className="flex-grow">
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