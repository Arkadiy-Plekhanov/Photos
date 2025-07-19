import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
        <p className="text-lg text-gray-700">
          This is the Cookie Policy page. Here you can describe how cookies are used on your website.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
