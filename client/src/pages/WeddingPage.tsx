import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useSEO } from '../hooks/useSEO';
import Gallery from '../components/Gallery';

const WeddingPage = () => {
  useSEO('wedding');
  const [activeTab, setActiveTab] = useState('beach');
  const packages = [
    {
      name: 'Elopement Package',
      duration: '2-3 hours',
      photos: '150+ edited photos',
      features: [
        'Location scouting assistance',
        'Online gallery with downloads',
        'Print release included',
        'Complimentary engagement session'
      ],
      price: 'Starting at $1,500'
    },
    {
      name: 'Standard Wedding',
      duration: '6 hours',
      photos: '400+ edited photos',
      features: [
        'Two photographers',
        'Online gallery with downloads',
        'Print release included',
        'Engagement session included',
        'Wedding timeline assistance'
      ],
      price: 'Starting at $3,500'
    },
    {
      name: 'Premium Wedding',
      duration: '8-10 hours',
      photos: '600+ edited photos',
      features: [
        'Two photographers',
        'Drone coverage included',
        'Premium album (40 pages)',
        'Online gallery with downloads',
        'Print release included',
        'Engagement session included',
        'Wedding timeline planning',
        'Second location coverage'
      ],
      price: 'Starting at $5,500'
    }
  ];

  const weddingGallery = [
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    'https://images.unsplash.com/photo-1605639253491-3c85b0ab8035?w=800&q=80',
    'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80',
    'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80',
  ];

  const testimonials = [
    {
      name: 'Sarah & Michael Chen',
      text: 'Arcadia Photography captured our special day perfectly! The attention to detail and artistic vision exceeded our expectations. We couldn\'t be happier with our wedding photos.',
      venue: 'Turtle Bay Resort'
    },
    {
      name: 'Emma & David Thompson',
      text: 'Professional, creative, and so easy to work with. They made us feel comfortable throughout the entire day and delivered stunning photos that we\'ll treasure forever.',
      venue: 'Ko Olina Beach'
    }
  ];

  return (
    <div className="min-h-screen bg-warm-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-ocean-blue/40" />
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-playfair font-bold mb-4"
          >
            Wedding & Elopement Photography
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-dancing mb-6"
          >
            Capturing Your Love Story in Paradise
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair mb-6">
            Your Wedding Day, Beautifully Preserved
          </h2>
          <p className="text-lg text-charcoal/80 leading-relaxed mb-8">
            Hawaii's natural beauty provides the perfect backdrop for your wedding celebration. 
            From intimate beach elopements to grand resort ceremonies, we specialize in capturing 
            the authentic emotions and stunning moments of your special day. Our documentary-style 
            approach ensures every laugh, tear, and tender moment is preserved for generations.
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-12">
            Our Wedding Photography Process
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Initial Consultation', desc: 'We discuss your vision, venue, and timeline to create the perfect plan.' },
              { step: '02', title: 'Planning & Preparation', desc: 'Location scouting, timeline creation, and coordination with your vendors.' },
              { step: '03', title: 'Your Wedding Day', desc: 'Capturing every moment with a blend of candid and guided photography.' },
              { step: '04', title: 'Editing & Delivery', desc: 'Professional editing and delivery of your photos within 4-6 weeks.' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-4xl font-playfair text-luxury-gold mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-charcoal/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-12">
            Wedding Portfolio
          </h2>
          <div className="w-full">
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-gray-100 rounded-lg p-1 gap-1">
                <button 
                  onClick={() => setActiveTab('beach')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === 'beach' 
                      ? 'bg-white text-ocean-blue shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Beach Weddings
                </button>
                <button 
                  onClick={() => setActiveTab('resort')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === 'resort' 
                      ? 'bg-white text-ocean-blue shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Resort Weddings
                </button>
                <button 
                  onClick={() => setActiveTab('garden')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === 'garden' 
                      ? 'bg-white text-ocean-blue shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Garden Weddings
                </button>
              </div>
            </div>
            {activeTab === 'beach' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {weddingGallery.slice(0, 3).map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="aspect-[4/5] overflow-hidden rounded-lg"
                  >
                    <img src={image} alt={`Beach wedding ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </motion.div>
                ))}
              </div>
            )}
            {activeTab === 'resort' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {weddingGallery.slice(3, 6).map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="aspect-[4/5] overflow-hidden rounded-lg"
                  >
                    <img src={image} alt={`Resort wedding ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </motion.div>
                ))}
              </div>
            )}
            {activeTab === 'garden' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {weddingGallery.slice(0, 3).map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="aspect-[4/5] overflow-hidden rounded-lg"
                  >
                    <img src={image} alt={`Garden wedding ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          <div className="text-center mt-8">
            <Link href="/portfolio">
              <Button size="lg" className="bg-luxury-gold hover:bg-sunset-orange">
                View Full Wedding Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-4">
            Wedding Photography Packages
          </h2>
          <p className="text-center text-lg text-charcoal/70 mb-12 max-w-3xl mx-auto">
            Choose the perfect package for your special day, or contact us for a custom quote
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-playfair mb-4">{pkg.name}</h3>
                <p className="text-3xl font-bold text-luxury-gold mb-6">{pkg.price}</p>
                <div className="space-y-2 mb-6">
                  <p className="text-charcoal/80">
                    <i className="fas fa-clock mr-2 text-ocean-blue"></i>
                    {pkg.duration}
                  </p>
                  <p className="text-charcoal/80">
                    <i className="fas fa-images mr-2 text-ocean-blue"></i>
                    {pkg.photos}
                  </p>
                </div>
                <ul className="space-y-2 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <i className="fas fa-check text-ocean-blue mr-2 mt-1"></i>
                      <span className="text-charcoal/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/checkout">
                  <Button className="w-full bg-ocean-blue hover:bg-ocean-blue/90">
                    Book This Package
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg text-charcoal/70 mb-4">
              All packages include professional editing and high-resolution digital files
            </p>
            <p className="text-charcoal/70">
              <strong>Add-ons available:</strong> Second shooter (+$500), Drone coverage (+$400), 
              Rush delivery (+$300), Additional hours (+$400/hour)
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-12">
            Happy Couples
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star text-luxury-gold"></i>
                  ))}
                </div>
                <p className="text-lg text-charcoal/80 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-charcoal/60">{testimonial.venue}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Do you travel to neighbor islands?',
                a: 'Yes! We love capturing weddings across all Hawaiian islands. Travel fees apply for neighbor island weddings.'
              },
              {
                q: 'How far in advance should we book?',
                a: 'We recommend booking 6-12 months in advance, especially for peak wedding season (April-October).'
              },
              {
                q: 'Do you help with timeline planning?',
                a: 'Absolutely! We provide timeline assistance to ensure we capture all important moments of your day.'
              },
              {
                q: 'What about permits for beach weddings?',
                a: 'We\'re familiar with permit requirements for popular venues and can guide you through the process.'
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-2">{faq.q}</h3>
                <p className="text-charcoal/70">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-ocean-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-playfair mb-6">
            Ready to Book Your Wedding Photography?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's create beautiful memories of your special day in paradise
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/checkout">
              <Button size="lg" className="bg-luxury-gold text-ocean-blue hover:bg-sunset-orange">
                <i className="fas fa-calendar-alt mr-2"></i>
                Book Now
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ocean-blue">
                <i className="fas fa-images mr-2"></i>
                View More Work
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Gallery items={weddingGallery} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WeddingPage;