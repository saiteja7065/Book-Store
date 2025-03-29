import React from 'react';
import { Book, Truck, Headphones, CreditCard } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Book,
      title: 'Vast Collection',
      description: 'Access to over 1 million books across various genres and languages'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Free delivery within 2-3 business days across India'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you'
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Multiple secure payment options for your convenience'
    }
  ];

  return (
    <div className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About BookVerse</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Welcome to BookVerse, your premier destination for literary exploration. 
            Established in 2020, we've been dedicated to bringing the joy of reading 
            to book lovers across India. Our carefully curated collection features 
            everything from timeless classics to contemporary bestsellers.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            At BookVerse, we believe that books have the power to transform lives, 
            spark imagination, and foster lifelong learning. Our mission is to make 
            quality books accessible to everyone at affordable prices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="text-center p-6 bg-gray-800/5 dark:bg-gray-800 rounded-lg shadow-lg backdrop-blur-sm">
                <div className="inline-block p-4 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4">
                  <Icon size={24} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gray-800/5 dark:bg-gray-800 rounded-lg p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Quality</h3>
              <p className="text-gray-600 dark:text-gray-300">We ensure all our books meet the highest quality standards</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Affordability</h3>
              <p className="text-gray-600 dark:text-gray-300">Making books accessible through competitive pricing</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Customer First</h3>
              <p className="text-gray-600 dark:text-gray-300">Your satisfaction is our top priority</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}