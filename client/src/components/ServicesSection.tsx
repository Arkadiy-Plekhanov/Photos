import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import type { Service } from '../types';
import { Link } from 'wouter';
import { useState } from 'react';

const ServicesSection = () => {
  const [brokenImages, setBrokenImages] = useState<string[]>([]);
  const { ref, isIntersecting } = useIntersectionObserver();

  const services: Service[] = [
    {
      id: 'wedding',
      title: 'Wedding Photography',
      description: 'Capturing your love story in paradise with cinematic elegance and artistic vision',
      image: '/images/services/wedding.jpg',
      link: '/wedding-photography',
    },
    {
      id: 'real-estate',
      title: 'Real Estate Photography',
      description: 'Showcasing properties with professional architectural photography that sells',
      image: '/images/services/real-estate.jpg',
      link: '/real-estate-photography',
    },
    {
      id: 'family',
      title: 'Family Portraits',
      description: 'Cherishing your island memories with authentic family photography',
      image: '/images/services/family.jpg',
      link: '/family-photography',
    },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900" ref={ref}>
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-ocean-blue dark:text-white mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl font-inter text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Specializing in capturing life's most precious moments against the stunning backdrop of Honolulu
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-2xl shadow-2xl hover-scale bg-gray-100"
            >
              {!brokenImages.includes(service.image) ? (
                <img
                  src={service.image}
                  alt={service.title || ''}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  width={800}
                  height={600}
                  loading="lazy"
                  style={{ aspectRatio: '4/3', zIndex: 1, position: 'relative' }}
                  onError={(e) => {
                    console.log('Image failed to load:', service.image);
                    setBrokenImages((prev: string[]) => [...prev, service.image]);
                  }}
                  onLoad={() => console.log('Image loaded successfully:', service.image)}
                />
              ) : (
                <div className="w-full h-80 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                  <span className="text-gray-500 dark:text-gray-300">Image unavailable</span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-ocean-blue/60 via-transparent to-transparent pointer-events-none" style={{ zIndex: 2 }}></div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white pointer-events-auto" style={{ zIndex: 3 }}>
                <h3 className="text-2xl font-playfair font-bold mb-2">{service.title}</h3>
                <p className="font-inter opacity-90 mb-4">{service.description}</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link
                    href={service.link}
                    className="inline-flex items-center font-inter font-semibold hover:text-luxury-gold transition-colors"
                  >
                    Learn More <i className="fas fa-arrow-right ml-2" aria-hidden="true"></i>
                  </Link>
                  <Link
                    href="/checkout"
                    className="inline-flex items-center font-inter font-semibold bg-luxury-gold text-ocean-blue px-4 py-2 rounded-lg hover:bg-sunset-orange transition-colors"
                  >
                    Book Now <i className="fas fa-calendar-plus ml-2" aria-hidden="true"></i>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
