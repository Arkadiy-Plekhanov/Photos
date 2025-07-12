import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const AboutSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver();

  const stats = [
    { number: '500+', label: 'Weddings Captured' },
    { number: '1000+', label: 'Properties Photographed' },
    { number: '10+', label: 'Years Experience' },
    { number: '98%', label: 'Client Satisfaction' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="about" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-ocean-blue mb-6">
              About <span className="gradient-text">Arcadia Photography</span>
            </h2>
            <p className="text-lg font-inter text-gray-600 mb-6 leading-relaxed">
              Founded in the heart of Honolulu, Arcadia Photography has been capturing the essence of paradise for over a decade. Our passion lies in creating timeless images that tell your unique story against the breathtaking backdrop of Hawaii.
            </p>
            <p className="text-lg font-inter text-gray-600 mb-6 leading-relaxed">
              From intimate elopements on secluded beaches to luxury real estate showcases, we bring an artistic eye and technical expertise to every project. Our approach is collaborative, ensuring that your vision comes to life in every frame.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-playfair font-bold text-luxury-gold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm font-inter text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              initial={{ opacity: 0, y: 30 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-luxury-gold text-ocean-blue px-8 py-4 rounded-full font-inter font-semibold hover:bg-sunset-orange transition-colors duration-300 hover-scale"
            >
              Get In Touch
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Professional photographer"
              className="rounded-2xl shadow-2xl w-full"
            />

            {/* Floating Achievement Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl"
            >
              <div className="flex items-center space-x-2">
                <i className="fas fa-award text-luxury-gold text-xl"></i>
                <div>
                  <div className="text-sm font-inter font-semibold text-ocean-blue">
                    Award Winner
                  </div>
                  <div className="text-xs text-gray-600">Hawaii Photography</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl"
            >
              <div className="flex items-center space-x-2">
                <i className="fas fa-certificate text-luxury-gold text-xl"></i>
                <div>
                  <div className="text-sm font-inter font-semibold text-ocean-blue">
                    FAA Certified
                  </div>
                  <div className="text-xs text-gray-600">Drone Operator</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
