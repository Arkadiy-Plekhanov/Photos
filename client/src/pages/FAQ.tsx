import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-700">
          This is the FAQ page. Here you can list common questions and answers.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
