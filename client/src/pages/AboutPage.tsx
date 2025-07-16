import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'wouter';
import { useSEO } from '../hooks/useSEO';

const AboutPage = () => {
  useSEO('about');
  
  return (
    <div className="min-h-screen bg-warm-white">
      <Navigation />
      <main className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-playfair mb-6">About Us</h1>
          <p>About page content will go here.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;

const AboutPage = () => {
  useSEO('about');
  const awards = [
    { year: '2023', title: 'Hawaii Wedding Photographer of the Year' },
    { year: '2022', title: 'Best Real Estate Photography - Honolulu Magazine' },
    { year: '2021', title: 'Top 10 Family Photographers in Hawaii' }
  ];

  const stats = [
    { number: '1000+', label: 'Happy Clients' },
    { number: '12+', label: 'Years Experience' },
    { number: '500+', label: 'Weddings Captured' },
    { number: '98%', label: 'Client Satisfaction' }
  ];

  const teamMembers = [
    {
      name: 'John Arcadia',
      role: 'Lead Photographer & Founder',
      bio: 'With over 12 years of experience capturing Hawaii\'s beauty, John brings artistic vision and technical expertise to every shoot.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&q=80'
    },
    {
      name: 'Sarah Chen',
      role: 'Second Shooter & Editor',
      bio: 'Sarah\'s keen eye for detail and passion for storytelling ensures every moment is beautifully preserved.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-warm-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1610564667089-069b9153f613?w=1920&q=80')`
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
            About Arcadia Photography
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-dancing"
          >
            Capturing Hawaii's Beauty Since 2012
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-playfair mb-6">
              Our Story
            </h2>
            <p className="text-lg text-charcoal/80 mb-4 leading-relaxed">
              Founded in 2012, Arcadia Photography was born from a deep love for Hawaii's natural beauty 
              and a passion for capturing life's most precious moments. What started as a small operation 
              has grown into Honolulu's premier photography studio, specializing in weddings, real estate, 
              and family portraits.
            </p>
            <p className="text-lg text-charcoal/80 mb-4 leading-relaxed">
              Our name, Arcadia, represents the paradise we're blessed to call home and the idyllic 
              moments we strive to capture. Every photograph we take is infused with the spirit of 
              Aloha and the stunning beauty of the Hawaiian islands.
            </p>
            <p className="text-lg text-charcoal/80 leading-relaxed">
              We believe that photography is more than just taking pictures—it's about telling stories, 
              preserving memories, and creating art that will be treasured for generations. Our approach 
              combines technical excellence with genuine connection, ensuring every client feels 
              comfortable and every moment is authentically captured.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=800&q=80" 
              alt="Photographer at work" 
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-luxury-gold text-ocean-blue p-6 rounded-lg shadow-xl">
              <p className="text-2xl font-playfair font-bold">12+ Years</p>
              <p className="text-sm">of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-playfair mb-6">
            Our Philosophy
          </h2>
          <blockquote className="text-2xl font-dancing text-ocean-blue mb-8">
            "Every photograph should tell a story, capture an emotion, and preserve a moment forever."
          </blockquote>
          <p className="text-lg text-charcoal/80 leading-relaxed">
            We approach every shoot with a blend of artistic vision and technical precision. 
            Whether we're capturing the joy of a wedding day, showcasing a property's best features, 
            or preserving precious family moments, our goal is always the same: to create images 
            that exceed expectations and stand the test of time.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-luxury-gold mb-2">{stat.number}</div>
                <div className="text-charcoal/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-8 text-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-2xl font-playfair mb-2">{member.name}</h3>
                <p className="text-luxury-gold mb-4">{member.role}</p>
                <p className="text-charcoal/70">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-12">
            Awards & Recognition
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <i className="fas fa-award text-4xl text-luxury-gold mb-4"></i>
                <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
                <p className="text-charcoal/60">{award.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-12">
            Why Choose Arcadia Photography
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-ocean-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-map-marked-alt text-2xl text-ocean-blue"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
              <p className="text-charcoal/70">
                Deep knowledge of Honolulu's best photography locations and lighting conditions
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ocean-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-medal text-2xl text-ocean-blue"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Excellence</h3>
              <p className="text-charcoal/70">
                Award-winning photography with state-of-the-art equipment and techniques
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ocean-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-heart text-2xl text-ocean-blue"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personal Touch</h3>
              <p className="text-charcoal/70">
                Genuine care for every client and commitment to exceeding expectations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment & Technology */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-playfair mb-8">
            Professional Equipment & Technology
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="text-xl font-semibold mb-4">Camera Equipment</h3>
              <ul className="space-y-2 text-charcoal/70">
                <li><i className="fas fa-check text-ocean-blue mr-2"></i> Professional Canon & Sony mirrorless systems</li>
                <li><i className="fas fa-check text-ocean-blue mr-2"></i> Premium lenses for every situation</li>
                <li><i className="fas fa-check text-ocean-blue mr-2"></i> Professional lighting equipment</li>
                <li><i className="fas fa-check text-ocean-blue mr-2"></i> Backup equipment for reliability</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Technology & Services</h3>
              <ul className="space-y-2 text-charcoal/70">
                <li><i className="fas fa-check text-ocean-blue mr-2"></i> FAA-certified drone pilots</li>
                <li><i className="fas fa-check text-ocean-blue mr-2"></i> Matterport 3D virtual tours</li>
                <li><i className="fas fa-check text-ocean-blue mr-2"></i> Advanced editing software</li>
                <li><i className="fas fa-check text-ocean-blue mr-2"></i> Cloud backup & delivery</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-ocean-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-playfair mb-6">
            Let's Create Something Beautiful Together
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Ready to work with Honolulu's premier photography studio?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-luxury-gold text-ocean-blue hover:bg-sunset-orange">
                <i className="fas fa-envelope mr-2"></i>
                Get in Touch
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ocean-blue">
                <i className="fas fa-images mr-2"></i>
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;