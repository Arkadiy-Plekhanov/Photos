import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import AccessibleGallery from './AccessibleGallery';
import type { PortfolioItem } from '../types';

const PortfolioSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const portfolioItems: PortfolioItem[] = [
    {
      id: '1',
      title: 'Romantic Beach Wedding Ceremony',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
      description: 'Capturing the intimate moments of a beach wedding ceremony at sunset in Honolulu.'
    },
    {
      id: '2',
      title: 'Sunset Wedding Silhouette',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
      description: 'Dramatic silhouette photography showcasing the romance of golden hour in Hawaii.'
    },
    {
      id: '3',
      title: 'Intimate Wedding Vows',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
      description: 'Emotional documentary-style photography of wedding vows exchange.'
    },
    {
      id: '4',
      title: 'Luxury Kitchen Design',
      category: 'real-estate',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
      description: 'Professional architectural photography showcasing modern kitchen design.'
    },
    {
      id: '5',
      title: 'Ocean View Property',
      category: 'real-estate',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
      description: 'Stunning ocean view property photography highlighting Hawaii\'s natural beauty.'
    },
    {
      id: '6',
      title: 'Family Beach Portraits',
      category: 'family',
      image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
      description: 'Joyful family portrait session capturing authentic moments on Hawaiian beaches.'
    },
  ];

  const filters = [
    { key: 'all', label: 'All Work' },
    { key: 'wedding', label: 'Weddings' },
    { key: 'real-estate', label: 'Real Estate' },
    { key: 'family', label: 'Family' },
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="portfolio" className="py-12 sm:py-16 lg:py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-ocean-blue mb-4">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-xl font-inter text-gray-600 max-w-3xl mx-auto mb-8">
            A curated collection of our finest work capturing the beauty of Honolulu
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-3 rounded-full font-inter font-semibold transition-colors duration-300 ${
                  activeFilter === filter.key
                    ? 'bg-luxury-gold text-ocean-blue'
                    : 'bg-white text-ocean-blue hover:bg-luxury-gold'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <AccessibleGallery
          items={filteredItems.map(item => ({
            id: item.id,
            src: item.image,
            alt: item.title,
            title: item.title,
            description: item.description
          }))}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, '#contact')}
            className="bg-luxury-gold text-ocean-blue px-8 py-4 rounded-full font-inter font-semibold hover:bg-sunset-orange transition-colors duration-300 hover-scale"
          >
            View Full Portfolio
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
