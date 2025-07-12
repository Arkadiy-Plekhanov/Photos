import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import type { Service } from '../types';
import { Link } from 'wouter';

const ServicesSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver();

  const services: Service[] = [
    {
      id: 'wedding',
      title: 'Wedding Photography',
      description: 'Capturing your love story in paradise with cinematic elegance and artistic vision',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
      link: '/wedding-photography',
    },
    {
      id: 'real-estate',
      title: 'Real Estate Photography',
      description: 'Showcasing properties with professional architectural photography that sells',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
      link: '/real-estate-photography',
    },
    {
      id: 'family',
      title: 'Family Portraits',
      description: 'Cherishing your island memories with authentic family photography',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
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
    <section id="services" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-ocean-blue mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl font-inter text-gray-600 max-w-3xl mx-auto">
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
              className="group relative overflow-hidden rounded-2xl shadow-2xl hover-scale"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-ocean-blue via-transparent to-transparent opacity-80"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-playfair font-bold mb-2">{service.title}</h3>
                <p className="font-inter opacity-90 mb-4">{service.description}</p>
                <Link
                  href={service.link}
                  className="inline-flex items-center font-inter font-semibold hover:text-luxury-gold transition-colors"
                >
                  Learn More <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
