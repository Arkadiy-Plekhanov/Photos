import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { storage } from './server/storage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

console.log('🚀 Starting Arcadia Photography Production Server...');

// Create the full-featured HTML with inline styles and scripts
const createFullFeaturedHTML = () => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arcadia Photography - Professional Photography Services in Honolulu</title>
    <meta name="description" content="Arcadia Photography offers professional wedding, real estate, and family photography services in Honolulu, Hawaii. Capturing life's precious moments with artistic excellence.">
    <meta name="keywords" content="wedding photography, real estate photography, family portraits, Honolulu photographer, Hawaii photography">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Dancing+Script:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- PWA -->
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#1e3a8a">
    
    <!-- Open Graph -->
    <meta property="og:title" content="Arcadia Photography - Professional Photography Services">
    <meta property="og:description" content="Capturing life's precious moments with artistic excellence in Honolulu, Hawaii">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://arcadiaphotography.replit.app">
    <meta property="og:image" content="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&h=630&fit=crop">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              'ocean-blue': '#1e3a8a',
              'sunset-gold': '#f59e0b',
              'sand-beige': '#fef3c7',
              'coral-pink': '#fb7185'
            },
            fontFamily: {
              'playfair': ['Playfair Display', 'serif'],
              'inter': ['Inter', 'sans-serif'],
              'dancing': ['Dancing Script', 'cursive']
            }
          }
        }
      }
    </script>
    
    <style>
      /* Custom CSS */
      .glass-effect {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      }
      
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      
      .hero-overlay {
        background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6));
      }
      
      /* Dark mode styles */
      .dark {
        background-color: #0f172a;
        color: #f1f5f9;
      }
      
      .dark .glass-effect {
        background: rgba(15, 23, 42, 0.8);
      }
      
      /* Smooth scrolling */
      html {
        scroll-behavior: smooth;
      }
      
      /* Loading animation */
      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    </style>
</head>
<body class="font-inter">
    <div id="root"></div>
    
    <script>
      // Dark mode toggle
      const initDarkMode = () => {
        const stored = localStorage.getItem('theme');
        if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
        }
      };
      
      initDarkMode();
      
      // React-like component system
      const h = (tag, props, ...children) => {
        const element = document.createElement(tag);
        if (props) {
          for (const [key, value] of Object.entries(props)) {
            if (key === 'className') element.className = value;
            else if (key === 'onClick') element.onclick = value;
            else if (key.startsWith('data-')) element.setAttribute(key, value);
            else element[key] = value;
          }
        }
        children.forEach(child => {
          if (typeof child === 'string') element.appendChild(document.createTextNode(child));
          else if (child) element.appendChild(child);
        });
        return element;
      };
      
      // Simple routing system
      let currentPage = 'home';
      
      const navigate = (page) => {
        currentPage = page;
        const root = document.getElementById('root');
        root.innerHTML = '';
        root.appendChild(App());
        window.scrollTo(0, 0);
      };
      
      // Service Pages
      const WeddingPage = () => {
        return h('div', { className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800' },
          h('nav', { className: 'fixed top-0 w-full z-50 glass-effect' },
            h('div', { className: 'container mx-auto px-6 py-4' },
              h('div', { className: 'flex items-center justify-between' },
                h('a', { 
                  href: '#',
                  className: 'flex items-center space-x-2 cursor-pointer',
                  onclick: (e) => {
                    e.preventDefault();
                    navigate('home');
                  }
                },
                  h('i', { className: 'fas fa-camera text-2xl text-ocean-blue' }),
                  h('span', { className: 'text-2xl font-playfair font-bold' }, 'Arcadia Photography')
                ),
                h('button', { 
                  className: 'text-ocean-blue hover:underline',
                  onclick: () => navigate('home')
                }, '← Back to Home')
              )
            )
          ),
          h('div', { className: 'pt-24 px-6' },
            h('div', { className: 'container mx-auto max-w-6xl' },
              h('h1', { className: 'text-5xl font-playfair font-bold text-center mb-8' }, 'Wedding Photography'),
              h('div', { className: 'grid md:grid-cols-2 gap-12 items-center mb-16' },
                h('div', {},
                  h('h2', { className: 'text-3xl font-semibold mb-4' }, 'Capture Your Love Story'),
                  h('p', { className: 'text-gray-600 dark:text-gray-300 mb-6' }, 
                    'Your wedding day is one of the most important days of your life. Our experienced photographers specialize in capturing the emotion, beauty, and unique moments that tell your love story.'
                  ),
                  h('ul', { className: 'space-y-3 mb-8' },
                    h('li', { className: 'flex items-start' },
                      h('i', { className: 'fas fa-check text-green-500 mt-1 mr-3' }),
                      h('span', {}, '8-10 hours of coverage')
                    ),
                    h('li', { className: 'flex items-start' },
                      h('i', { className: 'fas fa-check text-green-500 mt-1 mr-3' }),
                      h('span', {}, 'Two professional photographers')
                    ),
                    h('li', { className: 'flex items-start' },
                      h('i', { className: 'fas fa-check text-green-500 mt-1 mr-3' }),
                      h('span', {}, '500+ edited high-resolution images')
                    ),
                    h('li', { className: 'flex items-start' },
                      h('i', { className: 'fas fa-check text-green-500 mt-1 mr-3' }),
                      h('span', {}, 'Online gallery with download rights')
                    )
                  ),
                  h('button', {
                    className: 'bg-ocean-blue hover:bg-blue-800 text-white px-8 py-4 rounded-full text-lg font-semibold transition',
                    onclick: () => navigate('checkout')
                  }, 'Book Your Wedding')
                ),
                h('div', {},
                  h('img', {
                    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop',
                    alt: 'Wedding Photography',
                    className: 'rounded-lg shadow-2xl'
                  })
                )
              ),
              h('div', { className: 'bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-16' },
                h('h3', { className: 'text-2xl font-semibold mb-6 text-center' }, 'Wedding Packages'),
                h('div', { className: 'grid md:grid-cols-3 gap-8' },
                  h('div', { className: 'text-center' },
                    h('h4', { className: 'text-xl font-semibold mb-2' }, 'Essential'),
                    h('p', { className: 'text-3xl font-bold text-ocean-blue mb-4' }, '$2,500'),
                    h('ul', { className: 'text-gray-600 dark:text-gray-300 space-y-2' },
                      h('li', {}, '6 hours coverage'),
                      h('li', {}, 'One photographer'),
                      h('li', {}, '300+ edited images'),
                      h('li', {}, 'Online gallery')
                    )
                  ),
                  h('div', { className: 'text-center border-x border-gray-200 dark:border-gray-700' },
                    h('h4', { className: 'text-xl font-semibold mb-2' }, 'Premium'),
                    h('p', { className: 'text-3xl font-bold text-ocean-blue mb-4' }, '$4,000'),
                    h('ul', { className: 'text-gray-600 dark:text-gray-300 space-y-2' },
                      h('li', {}, '8 hours coverage'),
                      h('li', {}, 'Two photographers'),
                      h('li', {}, '500+ edited images'),
                      h('li', {}, 'Engagement session included')
                    )
                  ),
                  h('div', { className: 'text-center' },
                    h('h4', { className: 'text-xl font-semibold mb-2' }, 'Luxury'),
                    h('p', { className: 'text-3xl font-bold text-ocean-blue mb-4' }, '$6,000'),
                    h('ul', { className: 'text-gray-600 dark:text-gray-300 space-y-2' },
                      h('li', {}, 'Full day coverage'),
                      h('li', {}, 'Two photographers + assistant'),
                      h('li', {}, '800+ edited images'),
                      h('li', {}, 'Premium album included')
                    )
                  )
                )
              )
            )
          )
        );
      };
      
      // Real Estate Page
      const RealEstatePage = () => {
        return h('div', { className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800' },
          h('nav', { className: 'fixed top-0 w-full z-50 glass-effect' },
            h('div', { className: 'container mx-auto px-6 py-4' },
              h('div', { className: 'flex items-center justify-between' },
                h('a', { 
                  href: '#',
                  className: 'flex items-center space-x-2 cursor-pointer',
                  onclick: (e) => {
                    e.preventDefault();
                    navigate('home');
                  }
                },
                  h('i', { className: 'fas fa-camera text-2xl text-ocean-blue' }),
                  h('span', { className: 'text-2xl font-playfair font-bold' }, 'Arcadia Photography')
                ),
                h('button', { 
                  className: 'text-ocean-blue hover:underline',
                  onclick: () => navigate('home')
                }, '← Back to Home')
              )
            )
          ),
          h('div', { className: 'pt-24 px-6' },
            h('div', { className: 'container mx-auto max-w-6xl' },
              h('h1', { className: 'text-5xl font-playfair font-bold text-center mb-8' }, 'Real Estate Photography'),
              h('div', { className: 'grid md:grid-cols-2 gap-12 items-center mb-16' },
                h('div', {},
                  h('h2', { className: 'text-3xl font-semibold mb-4' }, 'Showcase Properties at Their Best'),
                  h('p', { className: 'text-gray-600 dark:text-gray-300 mb-6' }, 
                    'Professional real estate photography that helps properties sell faster and for more money. We capture the unique features and atmosphere of each property.'
                  ),
                  h('ul', { className: 'space-y-3 mb-8' },
                    h('li', { className: 'flex items-start' },
                      h('i', { className: 'fas fa-check text-green-500 mt-1 mr-3' }),
                      h('span', {}, 'HDR photography for perfect exposure')
                    ),
                    h('li', { className: 'flex items-start' },
                      h('i', { className: 'fas fa-check text-green-500 mt-1 mr-3' }),
                      h('span', {}, '24-hour turnaround time')
                    ),
                    h('li', { className: 'flex items-start' },
                      h('i', { className: 'fas fa-check text-green-500 mt-1 mr-3' }),
                      h('span', {}, 'Virtual tours and 360° photography')
                    ),
                    h('li', { className: 'flex items-start' },
                      h('i', { className: 'fas fa-check text-green-500 mt-1 mr-3' }),
                      h('span', {}, 'Drone photography available')
                    )
                  ),
                  h('button', {
                    className: 'bg-ocean-blue hover:bg-blue-800 text-white px-8 py-4 rounded-full text-lg font-semibold transition',
                    onclick: () => navigate('checkout')
                  }, 'Schedule a Shoot')
                ),
                h('div', {},
                  h('img', {
                    src: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=600&h=400&fit=crop',
                    alt: 'Real Estate Photography',
                    className: 'rounded-lg shadow-2xl'
                  })
                )
              ),
              h('div', { className: 'bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-16' },
                h('h3', { className: 'text-2xl font-semibold mb-6 text-center' }, 'Real Estate Pricing'),
                h('div', { className: 'grid md:grid-cols-3 gap-8' },
                  h('div', { className: 'text-center' },
                    h('h4', { className: 'text-xl font-semibold mb-2' }, 'Standard Home'),
                    h('p', { className: 'text-3xl font-bold text-ocean-blue mb-4' }, '$350'),
                    h('ul', { className: 'text-gray-600 dark:text-gray-300 space-y-2' },
                      h('li', {}, 'Up to 3,000 sq ft'),
                      h('li', {}, '25-35 photos'),
                      h('li', {}, 'Basic editing'),
                      h('li', {}, 'MLS ready')
                    )
                  ),
                  h('div', { className: 'text-center border-x border-gray-200 dark:border-gray-700' },
                    h('h4', { className: 'text-xl font-semibold mb-2' }, 'Luxury Home'),
                    h('p', { className: 'text-3xl font-bold text-ocean-blue mb-4' }, '$550'),
                    h('ul', { className: 'text-gray-600 dark:text-gray-300 space-y-2' },
                      h('li', {}, '3,000-5,000 sq ft'),
                      h('li', {}, '40-60 photos'),
                      h('li', {}, 'Advanced editing'),
                      h('li', {}, 'Twilight shots included')
                    )
                  ),
                  h('div', { className: 'text-center' },
                    h('h4', { className: 'text-xl font-semibold mb-2' }, 'Estate'),
                    h('p', { className: 'text-3xl font-bold text-ocean-blue mb-4' }, '$850+'),
                    h('ul', { className: 'text-gray-600 dark:text-gray-300 space-y-2' },
                      h('li', {}, '5,000+ sq ft'),
                      h('li', {}, '60+ photos'),
                      h('li', {}, 'Drone photography'),
                      h('li', {}, 'Virtual tour included')
                    )
                  )
                )
              )
            )
          )
        );
      };
      
      // Checkout Page
      const CheckoutPage = () => {
        return h('div', { className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800' },
          h('nav', { className: 'fixed top-0 w-full z-50 glass-effect' },
            h('div', { className: 'container mx-auto px-6 py-4' },
              h('div', { className: 'flex items-center justify-between' },
                h('a', { 
                  href: '#',
                  className: 'flex items-center space-x-2 cursor-pointer',
                  onclick: (e) => {
                    e.preventDefault();
                    navigate('home');
                  }
                },
                  h('i', { className: 'fas fa-camera text-2xl text-ocean-blue' }),
                  h('span', { className: 'text-2xl font-playfair font-bold' }, 'Arcadia Photography')
                ),
                h('button', { 
                  className: 'text-ocean-blue hover:underline',
                  onclick: () => navigate('home')
                }, '← Back to Home')
              )
            )
          ),
          h('div', { className: 'pt-24 px-6' },
            h('div', { className: 'container mx-auto max-w-4xl' },
              h('h1', { className: 'text-4xl font-playfair font-bold text-center mb-12' }, 'Book Your Photography Session'),
              h('div', { className: 'grid md:grid-cols-2 gap-12' },
                // Booking Form
                h('div', { className: 'bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8' },
                  h('h2', { className: 'text-2xl font-semibold mb-6' }, 'Session Details'),
                  h('form', { id: 'booking-form' },
                    h('div', { className: 'space-y-4' },
                      h('div', { className: 'grid grid-cols-2 gap-4' },
                        h('div', {},
                          h('label', { className: 'block text-sm font-medium mb-2' }, 'First Name'),
                          h('input', { 
                            type: 'text',
                            name: 'firstName',
                            className: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-blue',
                            required: true
                          })
                        ),
                        h('div', {},
                          h('label', { className: 'block text-sm font-medium mb-2' }, 'Last Name'),
                          h('input', { 
                            type: 'text',
                            name: 'lastName',
                            className: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-blue',
                            required: true
                          })
                        )
                      ),
                      h('div', {},
                        h('label', { className: 'block text-sm font-medium mb-2' }, 'Email'),
                        h('input', { 
                          type: 'email',
                          name: 'email',
                          className: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-blue',
                          required: true
                        })
                      ),
                      h('div', {},
                        h('label', { className: 'block text-sm font-medium mb-2' }, 'Phone'),
                        h('input', { 
                          type: 'tel',
                          name: 'phone',
                          className: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-blue',
                          required: true
                        })
                      ),
                      h('div', {},
                        h('label', { className: 'block text-sm font-medium mb-2' }, 'Service Type'),
                        h('select', { 
                          name: 'service',
                          className: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-blue',
                          required: true
                        },
                          h('option', { value: '' }, 'Select a service...'),
                          h('option', { value: 'wedding' }, 'Wedding Photography'),
                          h('option', { value: 'real-estate' }, 'Real Estate Photography'),
                          h('option', { value: 'family' }, 'Family Portraits'),
                          h('option', { value: 'other' }, 'Other')
                        )
                      ),
                      h('div', {},
                        h('label', { className: 'block text-sm font-medium mb-2' }, 'Event Date'),
                        h('input', { 
                          type: 'date',
                          name: 'eventDate',
                          className: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-blue'
                        })
                      ),
                      h('div', {},
                        h('label', { className: 'block text-sm font-medium mb-2' }, 'Package'),
                        h('select', { 
                          name: 'package',
                          className: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-blue',
                          required: true
                        },
                          h('option', { value: '' }, 'Select a package...'),
                          h('option', { value: 'basic' }, 'Basic Package - $350'),
                          h('option', { value: 'standard' }, 'Standard Package - $550'),
                          h('option', { value: 'premium' }, 'Premium Package - $750'),
                          h('option', { value: 'luxury' }, 'Luxury Package - $1,000+')
                        )
                      ),
                      h('div', {},
                        h('label', { className: 'block text-sm font-medium mb-2' }, 'Special Requests'),
                        h('textarea', { 
                          name: 'message',
                          rows: 4,
                          className: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-blue',
                          placeholder: 'Tell us about your vision, special requirements, or any questions you have...'
                        })
                      )
                    )
                  )
                ),
                // Payment Section
                h('div', { className: 'bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8' },
                  h('h2', { className: 'text-2xl font-semibold mb-6' }, 'Payment'),
                  h('div', { className: 'space-y-4' },
                    h('div', { className: 'bg-gray-50 dark:bg-gray-700 rounded-lg p-4' },
                      h('h3', { className: 'font-semibold mb-2' }, 'Order Summary'),
                      h('div', { className: 'flex justify-between items-center' },
                        h('span', {}, 'Photography Session'),
                        h('span', { className: 'font-semibold' }, '$550.00')
                      ),
                      h('div', { className: 'flex justify-between items-center pt-2 border-t mt-2' },
                        h('span', { className: 'font-semibold' }, 'Total'),
                        h('span', { className: 'font-bold text-xl text-ocean-blue' }, '$550.00')
                      )
                    ),
                    h('div', { id: 'payment-element' },
                      h('div', { className: 'text-center text-gray-500 py-8' },
                        h('i', { className: 'fas fa-spinner fa-spin text-2xl mb-4' }),
                        h('p', {}, 'Loading payment form...')
                      )
                    ),
                    h('button', { 
                      id: 'submit-payment',
                      className: 'w-full bg-ocean-blue hover:bg-blue-800 text-white py-4 rounded-md font-semibold transition disabled:opacity-50',
                      disabled: true
                    }, 'Complete Booking')
                  )
                )
              )
            )
          )
        );
      };
      
      // Family Page
      const FamilyPage = () => {
        return h('div', { className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800' },
          h('nav', { className: 'fixed top-0 w-full z-50 glass-effect' },
            h('div', { className: 'container mx-auto px-6 py-4' },
              h('div', { className: 'flex items-center justify-between' },
                h('a', { 
                  href: '#',
                  className: 'flex items-center space-x-2 cursor-pointer',
                  onclick: (e) => {
                    e.preventDefault();
                    navigate('home');
                  }
                },
                  h('i', { className: 'fas fa-camera text-2xl text-ocean-blue' }),
                  h('span', { className: 'text-2xl font-playfair font-bold' }, 'Arcadia Photography')
                ),
                h('button', { 
                  className: 'text-ocean-blue hover:underline',
                  onclick: () => navigate('home')
                }, '← Back to Home')
              )
            )
          ),
          h('div', { className: 'pt-24 px-6' },
            h('div', { className: 'container mx-auto max-w-6xl' },
              h('h1', { className: 'text-5xl font-playfair font-bold text-center mb-8' }, 'Family Portrait Photography'),
              h('div', { className: 'grid md:grid-cols-2 gap-12 items-center mb-16' },
                h('div', {},
                  h('h2', { className: 'text-3xl font-semibold mb-4' }, 'Preserve Precious Moments'),
                  h('p', { className: 'text-gray-600 dark:text-gray-300 mb-6' }, 
                    'Create lasting memories with beautiful family portraits. Our relaxed approach ensures natural, authentic moments that showcase your family\'s unique personality.'
                  ),
                  h('ul', { className: 'space-y-3 mb-8' },
                    h('li', { className: 'flex items-start' },
                      h('i', { className: 'fas fa-check text-green-500 mt-1 mr-3' }),
                      h('span', {}, 'Beach, park, or studio sessions')
                    ),
                    h('li', { className: 'flex items-start' },
                      h('i', { className: 'fas fa-check text-green-500 mt-1 mr-3' }),
                      h('span', {}, 'Maternity and newborn specialty')
                    ),
                    h('li', { className: 'flex items-start' },
                      h('i', { className: 'fas fa-check text-green-500 mt-1 mr-3' }),
                      h('span', {}, 'All edited images included')
                    ),
                    h('li', { className: 'flex items-start' },
                      h('i', { className: 'fas fa-check text-green-500 mt-1 mr-3' }),
                      h('span', {}, 'Print packages available')
                    )
                  ),
                  h('button', {
                    className: 'bg-ocean-blue hover:bg-blue-800 text-white px-8 py-4 rounded-full text-lg font-semibold transition',
                    onclick: () => navigate('checkout')
                  }, 'Book Your Session')
                ),
                h('div', {},
                  h('img', {
                    src: 'https://images.unsplash.com/photo-1559308350-86697adc9c39?w=600&h=400&fit=crop',
                    alt: 'Family Photography',
                    className: 'rounded-lg shadow-2xl'
                  })
                )
              ),
              h('div', { className: 'bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-16' },
                h('h3', { className: 'text-2xl font-semibold mb-6 text-center' }, 'Family Session Packages'),
                h('div', { className: 'grid md:grid-cols-3 gap-8' },
                  h('div', { className: 'text-center' },
                    h('h4', { className: 'text-xl font-semibold mb-2' }, 'Mini Session'),
                    h('p', { className: 'text-3xl font-bold text-ocean-blue mb-4' }, '$350'),
                    h('ul', { className: 'text-gray-600 dark:text-gray-300 space-y-2' },
                      h('li', {}, '30 minute session'),
                      h('li', {}, '1 location'),
                      h('li', {}, '15+ edited images'),
                      h('li', {}, 'Online gallery')
                    )
                  ),
                  h('div', { className: 'text-center border-x border-gray-200 dark:border-gray-700' },
                    h('h4', { className: 'text-xl font-semibold mb-2' }, 'Standard Session'),
                    h('p', { className: 'text-3xl font-bold text-ocean-blue mb-4' }, '$550'),
                    h('ul', { className: 'text-gray-600 dark:text-gray-300 space-y-2' },
                      h('li', {}, '1 hour session'),
                      h('li', {}, 'Up to 2 locations'),
                      h('li', {}, '30+ edited images'),
                      h('li', {}, '5 prints included')
                    )
                  ),
                  h('div', { className: 'text-center' },
                    h('h4', { className: 'text-xl font-semibold mb-2' }, 'Extended Session'),
                    h('p', { className: 'text-3xl font-bold text-ocean-blue mb-4' }, '$750'),
                    h('ul', { className: 'text-gray-600 dark:text-gray-300 space-y-2' },
                      h('li', {}, '2 hour session'),
                      h('li', {}, 'Multiple locations'),
                      h('li', {}, '50+ edited images'),
                      h('li', {}, 'Premium album included')
                    )
                  )
                )
              )
            )
          )
        );
      };
      
      // Main App Component
      const App = () => {
        // Route to correct page
        if (currentPage === 'wedding') {
          return WeddingPage();
        }
        if (currentPage === 'real-estate') {
          return RealEstatePage();
        }
        if (currentPage === 'family') {
          return FamilyPage();
        }
        if (currentPage === 'checkout') {
          return CheckoutPage();
        }
        if (currentPage === 'booking-success') {
          return BookingSuccessPage();
        }
        
        // Default home page
        const container = h('div', { className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800' });
        
        // Navigation
        const nav = h('nav', { className: 'fixed top-0 w-full z-50 glass-effect' },
          h('div', { className: 'container mx-auto px-6 py-4' },
            h('div', { className: 'flex items-center justify-between' },
              h('div', { className: 'flex items-center space-x-2' },
                h('i', { className: 'fas fa-camera text-2xl text-ocean-blue' }),
                h('span', { className: 'text-2xl font-playfair font-bold' }, 'Arcadia Photography')
              ),
              h('div', { className: 'hidden md:flex items-center space-x-8' },
                h('a', { 
                  href: '#services', 
                  className: 'hover:text-ocean-blue transition',
                  onclick: (e) => {
                    if (currentPage !== 'home') {
                      e.preventDefault();
                      navigate('home');
                      setTimeout(() => {
                        document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }
                }, 'Services'),
                h('a', { 
                  href: '#portfolio', 
                  className: 'hover:text-ocean-blue transition',
                  onclick: (e) => {
                    if (currentPage !== 'home') {
                      e.preventDefault();
                      navigate('home');
                      setTimeout(() => {
                        document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }
                }, 'Portfolio'),
                h('a', { 
                  href: '#about', 
                  className: 'hover:text-ocean-blue transition',
                  onclick: (e) => {
                    if (currentPage !== 'home') {
                      e.preventDefault();
                      navigate('home');
                      setTimeout(() => {
                        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }
                }, 'About'),
                h('a', { 
                  href: '#contact', 
                  className: 'hover:text-ocean-blue transition',
                  onclick: (e) => {
                    if (currentPage !== 'home') {
                      e.preventDefault();
                      navigate('home');
                      setTimeout(() => {
                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }
                }, 'Contact'),
                h('button', { 
                  className: 'ml-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition',
                  onClick: () => {
                    document.documentElement.classList.toggle('dark');
                    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
                  }
                },
                  h('i', { className: 'fas fa-moon dark:hidden' }),
                  h('i', { className: 'fas fa-sun hidden dark:inline' })
                )
              ),
              h('button', { 
                className: 'md:hidden',
                onClick: () => {
                  const mobileMenu = document.getElementById('mobile-menu');
                  if (mobileMenu) {
                    mobileMenu.classList.toggle('hidden');
                  }
                },
                'aria-label': 'Toggle mobile menu'
              },
                h('i', { className: 'fas fa-bars text-2xl' })
              )
            )
          )
        );
        
        // Mobile Menu
        const mobileMenu = h('div', { 
          id: 'mobile-menu',
          className: 'hidden fixed top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-40'
        },
          h('div', { className: 'px-6 py-4 space-y-4' },
            h('a', { 
              href: '#services',
              className: 'block py-2 text-lg hover:text-ocean-blue transition',
              onclick: (e) => {
                document.getElementById('mobile-menu').classList.add('hidden');
                if (currentPage !== 'home') {
                  e.preventDefault();
                  navigate('home');
                  setTimeout(() => {
                    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }
            }, 'Services'),
            h('a', { 
              href: '#portfolio',
              className: 'block py-2 text-lg hover:text-ocean-blue transition',
              onclick: (e) => {
                document.getElementById('mobile-menu').classList.add('hidden');
                if (currentPage !== 'home') {
                  e.preventDefault();
                  navigate('home');
                  setTimeout(() => {
                    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }
            }, 'Portfolio'),
            h('a', { 
              href: '#about',
              className: 'block py-2 text-lg hover:text-ocean-blue transition',
              onclick: (e) => {
                document.getElementById('mobile-menu').classList.add('hidden');
                if (currentPage !== 'home') {
                  e.preventDefault();
                  navigate('home');
                  setTimeout(() => {
                    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }
            }, 'About'),
            h('a', { 
              href: '#contact',
              className: 'block py-2 text-lg hover:text-ocean-blue transition',
              onclick: (e) => {
                document.getElementById('mobile-menu').classList.add('hidden');
                if (currentPage !== 'home') {
                  e.preventDefault();
                  navigate('home');
                  setTimeout(() => {
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }
            }, 'Contact'),
            h('button', {
              className: 'w-full bg-sunset-gold hover:bg-amber-600 text-white py-3 rounded-full font-semibold transition',
              onclick: () => {
                document.getElementById('mobile-menu').classList.add('hidden');
                navigate('checkout');
              }
            }, 'Book Now')
          )
        );
        
        // Hero Section
        const hero = h('section', { className: 'relative min-h-screen flex items-center justify-center overflow-hidden' },
          h('div', { 
            className: 'absolute inset-0 bg-cover bg-center bg-no-repeat',
            style: 'background-image: url(https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop)'
          }),
          h('div', { className: 'hero-overlay absolute inset-0' }),
          h('div', { className: 'relative z-10 text-center text-white px-6' },
            h('h1', { className: 'text-5xl md:text-7xl font-playfair font-bold mb-6 animate-float' }, 
              'Love Stories in Paradise'
            ),
            h('p', { className: 'text-xl md:text-2xl mb-8 max-w-2xl mx-auto' },
              'Capturing your most precious moments with artistic excellence in Honolulu, Hawaii'
            ),
            h('div', { className: 'flex flex-col sm:flex-row gap-4 justify-center' },
              h('button', { 
                className: 'bg-sunset-gold hover:bg-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105',
                onClick: () => {
                  if (currentPage === 'home') {
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('checkout');
                  }
                }
              }, 'Book Your Session'),
              h('button', { 
                className: 'border-2 border-white text-white hover:bg-white hover:text-ocean-blue px-8 py-4 rounded-full text-lg font-semibold transition',
                onClick: () => {
                  if (currentPage === 'home') {
                    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('home');
                    setTimeout(() => {
                      document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }
              }, 'View Portfolio')
            )
          )
        );
        
        // Services Section
        const services = h('section', { id: 'services', className: 'py-20 px-6' },
          h('div', { className: 'container mx-auto' },
            h('h2', { className: 'text-4xl font-playfair font-bold text-center mb-12' }, 'Our Services'),
            h('div', { className: 'grid md:grid-cols-3 gap-8' },
              // Wedding Photography
              h('div', { className: 'bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition' },
                h('div', { 
                  className: 'h-64 bg-cover bg-center',
                  style: 'background-image: url(https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop)'
                }),
                h('div', { className: 'p-8' },
                  h('h3', { className: 'text-2xl font-semibold mb-4' }, 'Wedding Photography'),
                  h('p', { className: 'text-gray-600 dark:text-gray-300 mb-4' }, 
                    'Capture your special day with stunning imagery that tells your unique love story.'
                  ),
                  h('a', { 
                    href: '#',
                    className: 'text-ocean-blue hover:underline cursor-pointer',
                    onclick: (e) => {
                      e.preventDefault();
                      navigate('wedding');
                    }
                  }, 'Learn More →')
                )
              ),
              // Real Estate
              h('div', { className: 'bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition' },
                h('div', { 
                  className: 'h-64 bg-cover bg-center',
                  style: 'background-image: url(https://images.unsplash.com/photo-1560184897-ae75f418493e?w=400&h=300&fit=crop)'
                }),
                h('div', { className: 'p-8' },
                  h('h3', { className: 'text-2xl font-semibold mb-4' }, 'Real Estate Photography'),
                  h('p', { className: 'text-gray-600 dark:text-gray-300 mb-4' }, 
                    'Showcase properties in their best light with professional real estate photography.'
                  ),
                  h('a', { 
                    href: '#',
                    className: 'text-ocean-blue hover:underline cursor-pointer',
                    onclick: (e) => {
                      e.preventDefault();
                      navigate('real-estate');
                    }
                  }, 'Learn More →')
                )
              ),
              // Family Portraits
              h('div', { className: 'bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition' },
                h('div', { 
                  className: 'h-64 bg-cover bg-center',
                  style: 'background-image: url(https://images.unsplash.com/photo-1559308350-86697adc9c39?w=400&h=300&fit=crop)'
                }),
                h('div', { className: 'p-8' },
                  h('h3', { className: 'text-2xl font-semibold mb-4' }, 'Family Portraits'),
                  h('p', { className: 'text-gray-600 dark:text-gray-300 mb-4' }, 
                    'Preserve precious family moments with beautiful portraits in stunning locations.'
                  ),
                  h('a', { 
                    href: '#',
                    className: 'text-ocean-blue hover:underline cursor-pointer',
                    onclick: (e) => {
                      e.preventDefault();
                      navigate('family');
                    }
                  }, 'Learn More →')
                )
              )
            )
          )
        );
        
        // Portfolio Section with Lightbox
        const portfolio = (() => {
          const images = [
            'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1560184897-1d85eb3aeb8b?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1595220959878-d83c88b59fb5?w=1200&h=800&fit=crop'
          ];
          
          return h('section', { id: 'portfolio', className: 'py-20 px-6 bg-gray-100 dark:bg-gray-900' },
            h('div', { className: 'container mx-auto' },
              h('h2', { className: 'text-4xl font-playfair font-bold text-center mb-12' }, 'Portfolio'),
              h('div', { className: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' },
                ...images.map((src, index) => 
                  h('div', { 
                    className: 'relative overflow-hidden rounded-lg cursor-pointer group',
                    onclick: () => {
                      // Create lightbox
                      const lightbox = h('div', { 
                        className: 'fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center',
                        onclick: (e) => {
                          if (e.target === e.currentTarget) {
                            e.currentTarget.remove();
                          }
                        }
                      },
                        h('div', { className: 'relative max-w-7xl mx-auto px-4' },
                          h('img', { 
                            src,
                            alt: 'Portfolio image',
                            className: 'max-w-full max-h-[90vh] object-contain'
                          }),
                          h('button', {
                            className: 'absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition',
                            onclick: () => lightbox.remove()
                          }, '×'),
                          h('div', { className: 'absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white' },
                            `${index + 1} / ${images.length}`
                          )
                        )
                      );
                      document.body.appendChild(lightbox);
                    }
                  },
                    h('img', { 
                      src: src.replace('1200&h=800', '300&h=300'), 
                      alt: 'Portfolio thumbnail',
                      className: 'w-full h-full object-cover transform group-hover:scale-110 transition duration-500'
                    }),
                    h('div', { className: 'absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 flex items-center justify-center' },
                      h('i', { className: 'fas fa-search-plus text-white text-2xl opacity-0 group-hover:opacity-100 transition' })
                    )
                  )
                )
              )
            )
          );
        })();
        
        // About Section
        const about = h('section', { id: 'about', className: 'py-20 px-6' },
          h('div', { className: 'container mx-auto' },
            h('div', { className: 'grid md:grid-cols-2 gap-12 items-center' },
              h('div', {},
                h('h2', { className: 'text-4xl font-playfair font-bold mb-6' }, 'About Arcadia Photography'),
                h('p', { className: 'text-gray-600 dark:text-gray-300 mb-4' },
                  'With over 10 years of experience capturing life\'s most precious moments, Arcadia Photography has become Honolulu\'s premier photography service.'
                ),
                h('p', { className: 'text-gray-600 dark:text-gray-300 mb-6' },
                  'We specialize in wedding photography, real estate imagery, and family portraits, bringing artistic vision and technical excellence to every shoot.'
                ),
                h('div', { className: 'flex gap-8' },
                  h('div', { className: 'text-center' },
                    h('div', { className: 'text-3xl font-bold text-ocean-blue' }, '500+'),
                    h('div', { className: 'text-gray-600 dark:text-gray-300' }, 'Weddings')
                  ),
                  h('div', { className: 'text-center' },
                    h('div', { className: 'text-3xl font-bold text-ocean-blue' }, '1000+'),
                    h('div', { className: 'text-gray-600 dark:text-gray-300' }, 'Properties')
                  ),
                  h('div', { className: 'text-center' },
                    h('div', { className: 'text-3xl font-bold text-ocean-blue' }, '2000+'),
                    h('div', { className: 'text-gray-600 dark:text-gray-300' }, 'Happy Clients')
                  )
                )
              ),
              h('div', { className: 'relative' },
                h('img', { 
                  src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop',
                  alt: 'Photographer at work',
                  className: 'rounded-lg shadow-2xl'
                })
              )
            )
          )
        );
        
        // Contact Section
        const contact = h('section', { id: 'contact', className: 'py-20 px-6 bg-gray-100 dark:bg-gray-900' },
          h('div', { className: 'container mx-auto max-w-4xl' },
            h('h2', { className: 'text-4xl font-playfair font-bold text-center mb-12' }, 'Get In Touch'),
            h('form', { 
              className: 'bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8',
              id: 'contact-form',
              onsubmit: async (e) => {
                e.preventDefault();
                
                // Get form data
                const form = e.target;
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerText;
                
                // Show loading state
                submitBtn.disabled = true;
                submitBtn.innerText = 'Sending...';
                submitBtn.className = submitBtn.className + ' opacity-50 cursor-not-allowed';
                
                // Collect form data
                const formData = {
                  firstName: form.querySelector('input[name="firstName"]').value,
                  lastName: form.querySelector('input[name="lastName"]').value,
                  email: form.querySelector('input[name="email"]').value,
                  phone: form.querySelector('input[name="phone"]').value,
                  service: form.querySelector('select[name="service"]').value,
                  message: form.querySelector('textarea[name="message"]').value
                };
                
                try {
                  // Submit to API
                  const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                  });
                  
                  const result = await response.json();
                  
                  if (result.success) {
                    // Show success message
                    form.innerHTML = '<div class="text-center py-12"><i class="fas fa-check-circle text-5xl text-green-500 mb-4"></i><h3 class="text-2xl font-semibold mb-2">Thank You!</h3><p class="text-gray-600 dark:text-gray-300">' + result.message + '</p></div>';
                  } else {
                    // Show error
                    alert(result.error || 'There was an error. Please try again.');
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalText;
                    submitBtn.className = submitBtn.className.replace(' opacity-50 cursor-not-allowed', '');
                  }
                } catch (error) {
                  console.error('Form submission error:', error);
                  alert('There was an error submitting the form. Please try again.');
                  submitBtn.disabled = false;
                  submitBtn.innerText = originalText;
                  submitBtn.className = submitBtn.className.replace(' opacity-50 cursor-not-allowed', '');
                }
              }
            },
              h('div', { className: 'grid md:grid-cols-2 gap-6' },
                h('div', {},
                  h('label', { className: 'block text-sm font-semibold mb-2' }, 'First Name'),
                  h('input', { 
                    type: 'text', 
                    name: 'firstName',
                    required: true,
                    className: 'w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:border-ocean-blue'
                  })
                ),
                h('div', {},
                  h('label', { className: 'block text-sm font-semibold mb-2' }, 'Last Name'),
                  h('input', { 
                    type: 'text', 
                    name: 'lastName',
                    required: true,
                    className: 'w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:border-ocean-blue'
                  })
                ),
                h('div', {},
                  h('label', { className: 'block text-sm font-semibold mb-2' }, 'Email'),
                  h('input', { 
                    type: 'email', 
                    name: 'email',
                    required: true,
                    className: 'w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:border-ocean-blue'
                  })
                ),
                h('div', {},
                  h('label', { className: 'block text-sm font-semibold mb-2' }, 'Phone'),
                  h('input', { 
                    type: 'tel', 
                    name: 'phone',
                    className: 'w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:border-ocean-blue'
                  })
                )
              ),
              h('div', { className: 'mt-6' },
                h('label', { className: 'block text-sm font-semibold mb-2' }, 'Service'),
                h('select', { 
                  name: 'service',
                  required: true,
                  className: 'w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:border-ocean-blue'
                },
                  h('option', { value: '' }, 'Select a service'),
                  h('option', { value: 'wedding' }, 'Wedding Photography'),
                  h('option', { value: 'real-estate' }, 'Real Estate Photography'),
                  h('option', { value: 'family' }, 'Family Portraits'),
                  h('option', { value: 'other' }, 'Other')
                )
              ),
              h('div', { className: 'mt-6' },
                h('label', { className: 'block text-sm font-semibold mb-2' }, 'Message'),
                h('textarea', { 
                  name: 'message',
                  rows: 4,
                  className: 'w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:border-ocean-blue'
                })
              ),
              h('button', { 
                type: 'submit',
                className: 'mt-8 w-full bg-ocean-blue hover:bg-blue-800 text-white py-4 rounded-lg font-semibold text-lg transition transform hover:scale-105'
              }, 'Send Message')
            )
          )
        );
        
        // Footer
        const footer = h('footer', { className: 'bg-ocean-blue text-white py-12 px-6' },
          h('div', { className: 'container mx-auto' },
            h('div', { className: 'grid md:grid-cols-3 gap-8' },
              h('div', {},
                h('h3', { className: 'text-2xl font-playfair font-bold mb-4' }, 'Arcadia Photography'),
                h('p', { className: 'text-blue-100' }, 'Capturing love stories in paradise since 2014.')
              ),
              h('div', {},
                h('h4', { className: 'text-lg font-semibold mb-4' }, 'Contact Info'),
                h('div', { className: 'space-y-2 text-blue-100' },
                  h('p', {},
                    h('i', { className: 'fas fa-phone mr-2' }),
                    h('a', { href: 'tel:+18085550123', className: 'hover:text-sunset-gold transition' }, '+1 (808) 555-0123')
                  ),
                  h('p', {},
                    h('i', { className: 'fas fa-envelope mr-2' }),
                    h('a', { href: 'mailto:hello@arcadiaphoto.com', className: 'hover:text-sunset-gold transition' }, 'hello@arcadiaphoto.com')
                  ),
                  h('p', {},
                    h('i', { className: 'fas fa-map-marker-alt mr-2' }),
                    h('a', { 
                      href: 'https://maps.google.com/?q=Honolulu,Hawaii', 
                      target: '_blank', 
                      rel: 'noopener noreferrer',
                      className: 'hover:text-sunset-gold transition' 
                    }, 'Honolulu, Hawaii')
                  )
                )
              ),
              h('div', {},
                h('h4', { className: 'text-lg font-semibold mb-4' }, 'Follow Us'),
                h('div', { className: 'flex gap-4' },
                  h('a', { 
                    href: 'https://instagram.com/arcadiaphotography', 
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className: 'text-2xl hover:text-sunset-gold transition',
                    'aria-label': 'Follow us on Instagram'
                  }, 
                    h('i', { className: 'fab fa-instagram' })
                  ),
                  h('a', { 
                    href: 'https://facebook.com/arcadiaphotography', 
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className: 'text-2xl hover:text-sunset-gold transition',
                    'aria-label': 'Like us on Facebook'
                  }, 
                    h('i', { className: 'fab fa-facebook' })
                  ),
                  h('a', { 
                    href: 'https://pinterest.com/arcadiaphotography', 
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className: 'text-2xl hover:text-sunset-gold transition',
                    'aria-label': 'Follow us on Pinterest'
                  }, 
                    h('i', { className: 'fab fa-pinterest' })
                  )
                )
              )
            ),
            h('div', { className: 'mt-8 pt-8 border-t border-blue-700' },
              h('div', { className: 'flex flex-col md:flex-row justify-between items-center' },
                h('p', { className: 'text-blue-100 mb-4 md:mb-0' },
                  '© 2024 Arcadia Photography. All rights reserved.'
                ),
                h('div', { className: 'flex gap-6 text-sm' },
                  h('a', { 
                    href: '#',
                    className: 'text-blue-100 hover:text-sunset-gold transition',
                    onclick: (e) => {
                      e.preventDefault();
                      alert('Privacy Policy page would be shown here');
                    }
                  }, 'Privacy Policy'),
                  h('a', { 
                    href: '#',
                    className: 'text-blue-100 hover:text-sunset-gold transition',
                    onclick: (e) => {
                      e.preventDefault();
                      alert('Terms of Service page would be shown here');
                    }
                  }, 'Terms of Service'),
                  h('a', { 
                    href: '#',
                    className: 'text-blue-100 hover:text-sunset-gold transition',
                    onclick: (e) => {
                      e.preventDefault();
                      navigate('home');
                      setTimeout(() => {
                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }, 'Contact')
                )
              )
            )
          )
        );
        
        // Assemble all sections
        container.appendChild(nav);
        container.appendChild(mobileMenu);
        container.appendChild(hero);
        container.appendChild(services);
        container.appendChild(portfolio);
        container.appendChild(about);
        container.appendChild(contact);
        container.appendChild(footer);
        
        return container;
      };
      
      // Stripe Integration
      const initStripe = () => {
        if (currentPage === 'checkout') {
          const script = document.createElement('script');
          script.src = 'https://js.stripe.com/v3/';
          script.onload = () => {
            const stripe = Stripe('${process.env.STRIPE_PUBLISHABLE_KEY}');
            
            // Create booking and payment intent
            const form = document.getElementById('booking-form');
            const paymentElement = document.getElementById('payment-element');
            const submitButton = document.getElementById('submit-payment');
            
            let elements;
            let clientSecret;
            
            // Initialize Stripe Elements
            const initializePayment = async () => {
              try {
                // Create payment intent
                const response = await fetch('/api/create-payment-intent', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ amount: 55000 }) // $550.00 in cents
                });
                
                if (!response.ok) throw new Error('Failed to create payment intent');
                
                const { clientSecret: cs } = await response.json();
                clientSecret = cs;
                
                elements = stripe.elements({ clientSecret });
                
                const paymentEl = elements.create('payment');
                paymentEl.mount('#payment-element');
                
                submitButton.disabled = false;
                paymentElement.innerHTML = '';
                paymentElement.appendChild(paymentEl._element);
                
              } catch (error) {
                console.error('Payment initialization error:', error);
                paymentElement.innerHTML = 
                  '<div class="text-center text-red-500 py-8">' +
                  '<i class="fas fa-exclamation-triangle text-2xl mb-4"></i>' +
                  '<p>Payment system temporarily unavailable. Please try again later.</p>' +
                  '</div>';
              }
            };
            
            // Handle form submission
            const handleSubmit = async (event) => {
              event.preventDefault();
              
              if (!stripe || !elements) return;
              
              submitButton.disabled = true;
              submitButton.textContent = 'Processing...';
              
              try {
                // Get form data
                const formData = new FormData(form);
                const bookingData = {
                  firstName: formData.get('firstName'),
                  lastName: formData.get('lastName'),
                  email: formData.get('email'),
                  phone: formData.get('phone'),
                  service: formData.get('service'),
                  eventDate: formData.get('eventDate'),
                  package: formData.get('package'),
                  message: formData.get('message')
                };
                
                // Confirm payment
                const { error } = await stripe.confirmPayment({
                  elements,
                  confirmParams: {
                    return_url: window.location.origin + '/booking-success'
                  }
                });
                
                if (error) {
                  console.error('Payment error:', error);
                  alert('Payment failed: ' + error.message);
                  submitButton.disabled = false;
                  submitButton.textContent = 'Complete Booking';
                } else {
                  // Success - redirect handled by Stripe
                  navigate('booking-success');
                }
                
              } catch (error) {
                console.error('Booking error:', error);
                alert('Booking failed. Please try again.');
                submitButton.disabled = false;
                submitButton.textContent = 'Complete Booking';
              }
            };
            
            // Initialize payment when page loads
            initializePayment();
            
            // Attach event listener
            submitButton.addEventListener('click', handleSubmit);
          };
          
          document.head.appendChild(script);
        }
      };
      
      // Booking Success Page
      const BookingSuccessPage = () => {
        return h('div', { className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800' },
          h('nav', { className: 'fixed top-0 w-full z-50 glass-effect' },
            h('div', { className: 'container mx-auto px-6 py-4' },
              h('div', { className: 'flex items-center justify-between' },
                h('a', { 
                  href: '#',
                  className: 'flex items-center space-x-2 cursor-pointer',
                  onclick: (e) => {
                    e.preventDefault();
                    navigate('home');
                  }
                },
                  h('i', { className: 'fas fa-camera text-2xl text-ocean-blue' }),
                  h('span', { className: 'text-2xl font-playfair font-bold' }, 'Arcadia Photography')
                ),
                h('button', { 
                  className: 'text-ocean-blue hover:underline',
                  onclick: () => navigate('home')
                }, '← Back to Home')
              )
            )
          ),
          h('div', { className: 'pt-24 px-6' },
            h('div', { className: 'container mx-auto max-w-4xl text-center' },
              h('div', { className: 'bg-white dark:bg-gray-800 rounded-lg shadow-xl p-12' },
                h('i', { className: 'fas fa-check-circle text-6xl text-green-500 mb-6' }),
                h('h1', { className: 'text-4xl font-playfair font-bold mb-6' }, 'Booking Confirmed!'),
                h('p', { className: 'text-xl text-gray-600 dark:text-gray-300 mb-8' }, 
                  'Thank you for choosing Arcadia Photography. Your session has been successfully booked and payment confirmed.'
                ),
                h('div', { className: 'bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8' },
                  h('h2', { className: 'text-2xl font-semibold mb-4' }, 'What happens next?'),
                  h('ul', { className: 'text-left space-y-3' },
                    h('li', { className: 'flex items-start' },
                      h('i', { className: 'fas fa-envelope text-ocean-blue mt-1 mr-3' }),
                      h('span', {}, 'You will receive a confirmation email within 24 hours')
                    ),
                    h('li', { className: 'flex items-start' },
                      h('i', { className: 'fas fa-calendar text-ocean-blue mt-1 mr-3' }),
                      h('span', {}, 'Our team will contact you to finalize session details')
                    ),
                    h('li', { className: 'flex items-start' },
                      h('i', { className: 'fas fa-camera text-ocean-blue mt-1 mr-3' }),
                      h('span', {}, 'Get ready for an amazing photography experience!')
                    )
                  )
                ),
                h('div', { className: 'space-y-4' },
                  h('button', {
                    className: 'bg-ocean-blue hover:bg-blue-800 text-white px-8 py-3 rounded-full font-semibold transition mr-4',
                    onclick: () => navigate('home')
                  }, 'Return to Home'),
                  h('a', {
                    href: 'mailto:hello@arcadiaphoto.com',
                    className: 'inline-block border-2 border-ocean-blue text-ocean-blue hover:bg-ocean-blue hover:text-white px-8 py-3 rounded-full font-semibold transition'
                  }, 'Contact Us')
                )
              )
            )
          )
        );
      };
      
      // Initialize app when DOM is ready
      document.addEventListener('DOMContentLoaded', () => {
        const root = document.getElementById('root');
        if (root) {
          root.appendChild(App());
          initStripe();
        }
      });
    </script>
</body>
</html>`;
};

// Middleware
app.use(express.json());

// Serve static files if they exist
const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
}

// API Routes
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Contact form submission:', req.body);
    
    // Validate required fields
    const { firstName, lastName, email, service, message } = req.body;
    
    if (!firstName || !lastName || !email || !service) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please fill in all required fields' 
      });
    }
    
    // Save to database
    const submission = await storage.createContactSubmission({
      firstName,
      lastName,
      email,
      phone: req.body.phone || '',
      service,
      eventDate: req.body.eventDate,
      message: message || ''
    });
    
    console.log('Contact saved:', submission);
    
    res.json({ 
      success: true, 
      message: 'Thank you for your message. We will get back to you soon!',
      id: submission.id
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Sorry, there was an error processing your request. Please try again.' 
    });
  }
});

// Get all contact submissions (admin endpoint)
app.get('/api/contact/submissions', async (req, res) => {
  try {
    const submissions = await storage.getContactSubmissions();
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// Create payment intent
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount || amount < 50) {
      return res.status(400).json({ error: 'Invalid amount' });
    }
    
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card'],
      description: 'Arcadia Photography Session',
      metadata: {
        business: 'Arcadia Photography',
        type: 'photography_session'
      }
    });
    
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// Create booking
app.post('/api/bookings', async (req, res) => {
  try {
    const booking = await storage.createBooking({
      ...req.body,
      status: 'pending',
      paymentStatus: 'pending'
    });
    
    res.json(booking);
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    service: 'Arcadia Photography',
    timestamp: new Date().toISOString(),
    features: {
      database: !!process.env.DATABASE_URL,
      payments: !!process.env.STRIPE_SECRET_KEY
    }
  });
});

// Serve the full-featured HTML for all routes
app.get('*', (req, res) => {
  res.send(createFullFeaturedHTML());
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Arcadia Photography server running on port ${PORT}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`✨ Features: Full interactive site with all original functionality`);
});