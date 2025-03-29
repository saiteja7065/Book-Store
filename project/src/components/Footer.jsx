import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold text-white dark:text-gray-100 mb-4">BookVerse</h2>
            <p className="mb-4 dark:text-gray-400">Your one-stop destination for all types of books. Discover, learn, and explore with our vast collection.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Facebook /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram /></a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold text-white dark:text-gray-100 mb-4">Useful Links</h3>
            <ul className="space-y-2">
              {['About', 'Projects', 'News & Updates', 'Pricing', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white dark:text-gray-400 dark:hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white dark:text-gray-100 mb-4">Support</h3>
            <ul className="space-y-2">
              {['Privacy Policy', 'Support', 'Disclaimer', 'FAQ', 'Terms & Conditions'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white dark:text-gray-400 dark:hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white dark:text-gray-100 mb-4">Contact Us</h3>
            <div className="space-y-4 dark:text-gray-400">
              <p className="flex items-center gap-2">
                <MapPin size={18} />
                123 Book Street, Literary Lane
                Mumbai, India 400001
              </p>
              <p className="flex items-center gap-2">
                <Phone size={18} />
                +91 123 456 7890
              </p>
              <p className="flex items-center gap-2">
                <Mail size={18} />
                contact@bookverse.com
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} BookVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;