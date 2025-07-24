import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IndustryLazyImage from './IndustryLazyImage';
import { cn } from '@/lib/utils';

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface AccessibleGalleryProps {
  items: GalleryItem[];
  className?: string;
}

export const AccessibleGallery = ({ items, className }: AccessibleGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedIndex === null) return;

      switch (event.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          goToNext();
          break;
        case 'Home':
          event.preventDefault();
          setSelectedIndex(0);
          break;
        case 'End':
          event.preventDefault();
          setSelectedIndex(items.length - 1);
          break;
      }
    };

    if (selectedIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedIndex, items.length]);

  // Focus management
  useEffect(() => {
    if (selectedIndex !== null && lightboxRef.current) {
      lightboxRef.current.focus();
    }
  }, [selectedIndex]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = 'unset';
    // Return focus to gallery
    if (galleryRef.current) {
      const focusableElements = galleryRef.current.querySelectorAll('button[data-index]');
      const targetElement = focusableElements[focusedIndex] as HTMLElement;
      targetElement?.focus();
    }
  };

  const goToPrevious = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : items.length - 1);
  };

  const goToNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex < items.length - 1 ? selectedIndex + 1 : 0);
  };

  return (
    <>
      {/* Gallery Grid */}
      <div 
        ref={galleryRef}
        className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}
        role="region"
        aria-label="Photo gallery"
      >
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            data-index={index}
            onClick={() => {
              setFocusedIndex(index);
              openLightbox(index);
            }}
            className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-luxury-gold focus:ring-offset-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`View ${item.title || item.alt} in lightbox`}
          >
            <IndustryLazyImage
              src={item.src}
              alt={item.alt}
              className="w-full h-64 object-cover"
              width={600}
              height={400}
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
              <i className="fas fa-search-plus text-white text-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></i>
            </div>

            {/* Title overlay */}
            {item.title && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-semibold text-lg">{item.title}</h3>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
            onClick={closeLightbox}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-2xl hover:text-luxury-gold transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Close lightbox"
            >
              <i className="fas fa-times" aria-hidden="true"></i>
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-luxury-gold transition-colors focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Previous image"
            >
              <i className="fas fa-chevron-left" aria-hidden="true"></i>
            </button>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-luxury-gold transition-colors focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Next image"
            >
              <i className="fas fa-chevron-right" aria-hidden="true"></i>
            </button>

            {/* Main image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <IndustryLazyImage
                src={items[selectedIndex].src}
                alt={items[selectedIndex].alt}
                className="max-w-full max-h-full object-contain"
                priority={true}
                width={1200}
                height={800}
              />

              {/* Image info */}
              {(items[selectedIndex].title || items[selectedIndex].description) && (
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  {items[selectedIndex].title && (
                    <h2 className="text-xl font-bold mb-2">{items[selectedIndex].title}</h2>
                  )}
                  {items[selectedIndex].description && (
                    <p className="text-sm opacity-90">{items[selectedIndex].description}</p>
                  )}
                </div>
              )}
            </motion.div>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {selectedIndex + 1} of {items.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibleGallery;