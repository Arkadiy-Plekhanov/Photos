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
      
      // Main App Component
      const App = () => {
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
                h('a', { href: '#services', className: 'hover:text-ocean-blue transition' }, 'Services'),
                h('a', { href: '#portfolio', className: 'hover:text-ocean-blue transition' }, 'Portfolio'),
                h('a', { href: '#about', className: 'hover:text-ocean-blue transition' }, 'About'),
                h('a', { href: '#contact', className: 'hover:text-ocean-blue transition' }, 'Contact'),
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
              h('button', { className: 'md:hidden', onClick: () => alert('Mobile menu would open here') },
                h('i', { className: 'fas fa-bars text-2xl' })
              )
            )
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
                onClick: () => window.location.href = '#contact'
              }, 'Book Your Session'),
              h('button', { 
                className: 'border-2 border-white text-white hover:bg-white hover:text-ocean-blue px-8 py-4 rounded-full text-lg font-semibold transition',
                onClick: () => window.location.href = '#portfolio'
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
                  h('a', { href: '#contact', className: 'text-ocean-blue hover:underline' }, 'Learn More →')
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
                  h('a', { href: '#contact', className: 'text-ocean-blue hover:underline' }, 'Learn More →')
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
                  h('a', { href: '#contact', className: 'text-ocean-blue hover:underline' }, 'Learn More →')
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
                  h('p', {}, h('i', { className: 'fas fa-phone mr-2' }), '+1 (808) 555-0123'),
                  h('p', {}, h('i', { className: 'fas fa-envelope mr-2' }), 'hello@arcadiaphoto.com'),
                  h('p', {}, h('i', { className: 'fas fa-map-marker-alt mr-2' }), 'Honolulu, Hawaii')
                )
              ),
              h('div', {},
                h('h4', { className: 'text-lg font-semibold mb-4' }, 'Follow Us'),
                h('div', { className: 'flex gap-4' },
                  h('a', { href: '#', className: 'text-2xl hover:text-sunset-gold transition' }, 
                    h('i', { className: 'fab fa-instagram' })
                  ),
                  h('a', { href: '#', className: 'text-2xl hover:text-sunset-gold transition' }, 
                    h('i', { className: 'fab fa-facebook' })
                  ),
                  h('a', { href: '#', className: 'text-2xl hover:text-sunset-gold transition' }, 
                    h('i', { className: 'fab fa-pinterest' })
                  )
                )
              )
            ),
            h('div', { className: 'mt-8 pt-8 border-t border-blue-700 text-center text-blue-100' },
              '© 2024 Arcadia Photography. All rights reserved.'
            )
          )
        );
        
        // Assemble all sections
        container.appendChild(nav);
        container.appendChild(hero);
        container.appendChild(services);
        container.appendChild(portfolio);
        container.appendChild(about);
        container.appendChild(contact);
        container.appendChild(footer);
        
        return container;
      };
      
      // Initialize app when DOM is ready
      document.addEventListener('DOMContentLoaded', () => {
        const root = document.getElementById('root');
        if (root) {
          root.appendChild(App());
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