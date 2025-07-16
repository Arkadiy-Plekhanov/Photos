import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ImageLightbox } from './ImageLightbox';
import type { PortfolioItem } from '../types';

const PortfolioSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Фильтрация off-topic/placeholder изображений
  const offTopicImages = [
    'batman', 'ocean wave', 'placeholder', 'sample', 'test', 'dummy'
  ];
  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: 'Sunset Beach Wedding',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
      description: 'Beautiful sunset wedding ceremony at Waikiki Beach'
    },
    {
      id: 2,
      title: 'Luxury Villa Photography',
      category: 'real-estate',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      description: 'High-end real estate photography in Diamond Head'
    },
    {
      id: 3,
      title: 'Family Portrait Session',
      category: 'family',
      image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80',
      description: 'Joyful family moments captured at Hanauma Bay'
    },
    {
      id: 4,
      title: 'Tropical Wedding Ceremony',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
      description: 'Romantic tropical wedding in Lanikai'
    },
    {
      id: 5,
      title: 'Modern Condo Interior',
      category: 'real-estate',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      description: 'Contemporary condo with ocean views'
    },
    {
      id: 6,
      title: 'Beachside Family Fun',
      category: 'family',
      image: 'https://images.unsplash.com/photo-1602623352104-6ce6dd25a909?w=800&q=80',
      description: 'Candid family moments at Kailua Beach'
    },
    {
      id: 7,
      title: 'Garden Wedding Reception',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      description: 'Elegant garden reception at Lyon Arboretum'
    },
    {
      id: 8,
      title: 'Oceanfront Property',
      category: 'real-estate',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      description: 'Stunning oceanfront home in Kahala'
    },
    {
      id: 9,
      title: 'Maternity Beach Session',
      category: 'family',
      image: 'https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?w=800&q=80',
      description: 'Beautiful maternity photos at Sunset Beach'
    }
  ].filter(item => {
    // Фильтруем off-topic по title и image
    const lowerTitle = item.title.toLowerCase();
    const lowerImage = item.image?.toLowerCase() || '';
    return !offTopicImages.some(word => lowerTitle.includes(word) || lowerImage.includes(word));
  });

  const filters = [
    { key: 'all', label: 'All Work' },
    { key: 'wedding', label: 'Weddings' },
    { key: 'real-estate', label: 'Real Estate' },
    { key: 'family', label: 'Family' },
  ];

  // Пропуск сломанных изображений
  const [brokenImages, setBrokenImages] = useState<string[]>([]);
  const filteredItems = (activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter)
  ).filter(item => !brokenImages.includes(item.image));

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="portfolio" className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800" ref={ref}>
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-ocean-blue dark:text-white mb-4">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-xl font-inter text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
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
                    ? 'bg-luxury-gold text-ocean-blue dark:text-ocean-blue'
                    : 'bg-white dark:bg-gray-700 text-ocean-blue dark:text-white hover:bg-luxury-gold dark:hover:bg-luxury-gold'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] bg-white dark:bg-gray-800 cursor-pointer"
              onClick={() => {
                setLightboxIndex(index);
                setLightboxOpen(true);
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title || ''}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  onError={() => setBrokenImages(prev => [...prev, item.image])}
                />
                {/* ...existing code... */}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="/portfolio"
            className="bg-luxury-gold text-ocean-blue px-8 py-4 rounded-full font-inter font-semibold hover:bg-sunset-orange transition-colors duration-300 hover-scale"
          >
            View Full Portfolio
          </a>
        </motion.div>
        
        {/* Lightbox */}
        <ImageLightbox
          images={filteredItems.map(item => item.image)}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          initialIndex={lightboxIndex}
          aria-modal="true"
          role="dialog"
        />
      </div>
    </section>
  );
};

export default PortfolioSection;
