import { motion } from 'framer-motion';
import { Link } from 'wouter';

const Footer = () => {
  const footerLinks = {
    services: [
      { name: 'Wedding Photography', href: '/wedding-photography', type: 'link' },
      { name: 'Real Estate Photography', href: '/real-estate-photography', type: 'link' },
      { name: 'Family Portraits', href: '/family-photography', type: 'link' },
      { name: 'Commercial Photography', href: '/#services', type: 'scroll' },
      { name: 'Drone Photography', href: '/#services', type: 'scroll' },
    ],
    company: [
      { name: 'About Us', href: '/about', type: 'link' },
      { name: 'Portfolio', href: '/portfolio', type: 'link' },
      { name: 'Blog', href: '/blog', type: 'link' },
      { name: 'Contact', href: '/contact', type: 'link' },
      { name: 'FAQ', href: '/faq', type: 'link' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy', type: 'link' },
      { name: 'Terms of Service', href: '/terms', type: 'link' },
      { name: 'Cookie Policy', href: '/privacy#cookies', type: 'scroll' },
      { name: 'Licensing', href: '/terms#licensing', type: 'scroll' },
    ],
  };

  const socialLinks = [
    { icon: 'fab fa-instagram', href: '#', label: 'Instagram' },
    { icon: 'fab fa-facebook', href: '#', label: 'Facebook' },
    { icon: 'fab fa-pinterest', href: '#', label: 'Pinterest' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    // Handle navigation to home page sections
    if (href.startsWith('/#')) {
      const sectionId = href.substring(2);
      window.location.href = '/';
      // Use setTimeout to allow page to load before scrolling
      setTimeout(() => {
        const target = document.getElementById(sectionId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="bg-charcoal text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-camera text-2xl text-luxury-gold"></i>
              <span className="text-2xl font-playfair font-bold">Arcadia Photography</span>
            </div>
            <p className="text-gray-300 font-inter mb-4">
              Creating timeless memories in the heart of paradise. Professional photography services across Honolulu, Hawaii.
            </p>
            <div className="text-gray-400 text-sm">
              <p>Social media coming soon</p>
            </div>
            {/* Social media icons temporarily hidden */}
            <div className="hidden">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-300 hover:text-luxury-gold transition-colors"
                >
                  <i className={`${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-playfair font-bold mb-4">Services</h4>
            <ul className="space-y-2 font-inter text-gray-300">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  {link.type === 'link' ? (
                    <Link href={link.href} className="hover:text-luxury-gold transition-colors">
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="hover:text-luxury-gold transition-colors"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-playfair font-bold mb-4">Company</h4>
            <ul className="space-y-2 font-inter text-gray-300">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  {link.type === 'link' ? (
                    <Link href={link.href} className="hover:text-luxury-gold transition-colors">
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="hover:text-luxury-gold transition-colors"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-playfair font-bold mb-4">Legal</h4>
            <ul className="space-y-2 font-inter text-gray-300">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  {link.type === 'link' ? (
                    <Link href={link.href} className="hover:text-luxury-gold transition-colors">
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="hover:text-luxury-gold transition-colors"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 mt-8 pt-8 text-center"
        >
          <p className="text-gray-300 font-inter">
            © 2024 Arcadia Photography. All rights reserved. | Licensed & Insured in Hawaii
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;