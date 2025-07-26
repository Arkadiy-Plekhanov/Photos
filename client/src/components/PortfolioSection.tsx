import { useState } from 'react';
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
      id: '1',
      title: 'Maui Beach Wedding',
      category: 'wedding' as const,
      image: '/images/portfolio/wedding-1.jpg',
    },
    {
      id: '2',
      title: 'Luxury Villa Photography', 
      category: 'real-estate' as const,
      image: '/images/portfolio/real-estate-1.jpg',
    },
    {
      id: '3',
      title: 'Family Portrait Session',
      category: 'family' as const, 
      image: '/images/portfolio/family-1.jpg',
    },
    {
      id: '4',
      title: 'Sunset Wedding Ceremony',
      category: 'wedding' as const,
      image: '/images/portfolio/wedding-2.jpg',
    },
    {
      id: '5',
      title: 'Diamond Head Wedding',
      category: 'wedding' as const,
      image: '/images/portfolio/wedding-3.jpg',
    },
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
                  style={{ aspectRatio: '4/3' }}
                  onError={(e) => {
                    console.log('Portfolio image failed to load:', item.image);
                    setBrokenImages(prev => [...prev, item.image]);
                  }}
                  onLoad={() => console.log('Portfolio image loaded:', item.image)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-playfair font-bold text-lg">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.category}</p>
                </div>
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
        />
      </div>
    </section>
  );
};

export default PortfolioSection;
