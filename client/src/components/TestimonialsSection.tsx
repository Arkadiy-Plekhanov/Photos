import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import type { Testimonial } from '../types';

const TestimonialsSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver();

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah & Michael',
      role: 'Wedding Clients',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100',
      rating: 5,
      text: "Arcadia Photography made our Oahu wedding absolutely magical. Every moment was captured with such artistry and emotion. We'll treasure these memories forever!",
    },
    {
      id: '2',
      name: 'Lisa Thompson',
      role: 'Real Estate Agent',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100',
      rating: 5,
      text: "The quality of their real estate photography is unmatched. Properties sell faster and for higher prices with their stunning visuals. Highly recommend!",
    },
    {
      id: '3',
      name: 'David Kim',
      role: 'Family Client',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100',
      rating: 5,
      text: "Our family vacation photos turned out better than we ever imagined. The team captured our joy and the beauty of Hawaii perfectly. Thank you for the memories!",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <i
        key={index}
        className={`fas fa-star ${index < rating ? 'text-luxury-gold' : 'text-gray-400'}`}
      ></i>
    ));
  };

  return (
    <section className="py-20 bg-ocean-blue relative overflow-hidden" ref={ref}>
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white dark:text-gray-100 mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-xl font-inter text-gray-300 dark:text-gray-300 max-w-3xl mx-auto">
            Stories of love, joy, and cherished memories captured in paradise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="testimonial-card glass-effect backdrop-blur-sm bg-white/10 dark:bg-gray-800/80 border border-white/20 dark:border-gray-600/30 rounded-2xl p-8 text-white dark:text-gray-100"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-playfair font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-gray-300 dark:text-gray-400 font-inter">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
              <p className="font-inter text-gray-200 dark:text-gray-300 leading-relaxed">{testimonial.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
