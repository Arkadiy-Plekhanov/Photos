import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { useSEO } from '../hooks/useSEO';
import Gallery from '../components/Gallery';

const PortfolioPage = () => {
  useSEO('portfolio');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const portfolioItems = {
    wedding: [
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80',
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80',
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80',
    ],
    realEstate: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    ],
    family: [
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
      'https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?w=800&q=80',
      'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80',
    ],
  };

  const getAllImages = () => {
    return [...portfolioItems.wedding, ...portfolioItems.realEstate, ...portfolioItems.family];
  };

  const getFilteredImages = () => {
    if (selectedCategory === 'all') return getAllImages();
    return portfolioItems[selectedCategory as keyof typeof portfolioItems] || [];
  };

  return (
    <div className="min-h-screen bg-warm-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1920&q=80')`
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
            Our Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-inter"
          >
            A Showcase of Our Best Work
          </motion.p>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="portfolio" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-12">
              <TabsTrigger value="all" onClick={() => setSelectedCategory('all')}>
                All Work
              </TabsTrigger>
              <TabsTrigger value="wedding" onClick={() => setSelectedCategory('wedding')}>
                Weddings
              </TabsTrigger>
              <TabsTrigger value="realEstate" onClick={() => setSelectedCategory('realEstate')}>
                Real Estate
              </TabsTrigger>
              <TabsTrigger value="family" onClick={() => setSelectedCategory('family')}>
                Family
              </TabsTrigger>
            </TabsList>

            <Gallery items={getFilteredImages()} />
          </Tabs>
        </div>
      </section>

      {/* Portfolio Stats */}
      <div className="mt-20 text-center">
        <h2 className="text-3xl md:text-4xl font-playfair mb-12">
          Portfolio by Numbers
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
          <div>
            <div className="text-3xl font-bold text-luxury-gold">500+</div>
            <div className="text-sm text-charcoal/70">Weddings</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-luxury-gold">1000+</div>
            <div className="text-sm text-charcoal/70">Properties</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-luxury-gold">300+</div>
            <div className="text-sm text-charcoal/70">Families</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-luxury-gold">50+</div>
            <div className="text-sm text-charcoal/70">Awards</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-luxury-gold">12</div>
            <div className="text-sm text-charcoal/70">Years</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-luxury-gold">98%</div>
            <div className="text-sm text-charcoal/70">Happy Clients</div>
          </div>
        </div>
      </div>

      {/* Client Logos */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-12">
            Trusted By
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center opacity-60 hover:opacity-100 transition-opacity">
              <p className="text-xl font-semibold">Coldwell Banker</p>
            </div>
            <div className="text-center opacity-60 hover:opacity-100 transition-opacity">
              <p className="text-xl font-semibold">Four Seasons Resort</p>
            </div>
            <div className="text-center opacity-60 hover:opacity-100 transition-opacity">
              <p className="text-xl font-semibold">Turtle Bay Resort</p>
            </div>
            <div className="text-center opacity-60 hover:opacity-100 transition-opacity">
              <p className="text-xl font-semibold">Locations LLC</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-ocean-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-playfair mb-6">
            Let's Create Something Amazing Together
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Ready to add your story to our portfolio?
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-luxury-gold text-ocean-blue hover:bg-sunset-orange">
              <i className="fas fa-calendar-alt mr-2"></i>
              Book Your Session
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioPage;