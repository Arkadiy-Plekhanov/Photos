import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'wouter';
import { useSEO } from '../hooks/useSEO';
import Gallery from '../components/Gallery';

const FamilyPage = () => {
  useSEO('family');
  const sessionTypes = [
    {
      title: 'Beach Sessions',
      description: 'Capture your family\'s joy against Honolulu\'s stunning beaches',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80'
    },
    {
      title: 'Park Sessions',
      description: 'Natural, relaxed photos in Honolulu\'s beautiful parks',
      image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&q=80'
    },
    {
      title: 'Urban Sessions',
      description: 'Modern family portraits in Honolulu\'s vibrant city spots',
      image: 'https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?w=600&q=80'
    }
  ];

  const packages = [
    {
      name: 'Mini Session',
      duration: '30 minutes',
      photos: '15+ edited photos',
      features: [
        'One location',
        'Online gallery',
        'Print release',
        'Basic retouching'
      ],
      price: '$299'
    },
    {
      name: 'Standard Session',
      duration: '1 hour',
      photos: '30+ edited photos',
      features: [
        'One or two locations',
        'Online gallery',
        'Print release',
        'Professional retouching',
        'Outfit changes allowed'
      ],
      price: '$499'
    },
    {
      name: 'Extended Session',
      duration: '2 hours',
      photos: '50+ edited photos',
      features: [
        'Multiple locations',
        'Online gallery',
        'Print release',
        'Professional retouching',
        'Multiple outfit changes',
        '11x14 print included'
      ],
      price: '$699'
    }
  ];

  const gallery = [
    'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80',
    'https://images.unsplash.com/photo-1602623352104-6ce6dd25a909?w=800&q=80',
    'https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?w=800&q=80',
    'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80',
    'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
  ];

  const tips = [
    {
      icon: 'fas fa-sun',
      title: 'Golden Hour Magic',
      description: 'Schedule sessions 1-2 hours before sunset for the best lighting'
    },
    {
      icon: 'fas fa-tshirt',
      title: 'Coordinate Outfits',
      description: 'Choose complementary colors that work well with beach and nature settings'
    },
    {
      icon: 'fas fa-child',
      title: 'Let Kids Be Kids',
      description: 'The best photos happen when children are relaxed and having fun'
    },
    {
      icon: 'fas fa-map-marked-alt',
      title: 'Location Variety',
      description: 'We know all the best family-friendly spots across Honolulu'
    }
  ];

  return (
    <div className="min-h-screen bg-warm-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=1920&q=80')`
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
            Family & Portrait Photography
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-dancing mb-6"
          >
            Cherish Your Island Memories
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair mb-6">
            Genuine Moments, Beautiful Memories
          </h2>
          <p className="text-lg text-charcoal/80 leading-relaxed mb-8">
            Your family's story deserves to be told beautifully. Whether it's a milestone celebration, 
            annual portraits, or just because, we capture the authentic connections and genuine joy 
            that make your family unique. With Honolulu's stunning landscapes as our backdrop, 
            we create timeless portraits you'll treasure for generations.
          </p>
        </div>
      </section>

      {/* Session Types */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-12">
            Popular Session Locations
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {sessionTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={type.image} 
                      alt={type.title} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                    <p className="text-charcoal/70">{type.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-12">
            Your Session Experience
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-ocean-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-comments text-2xl text-ocean-blue"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Consultation</h3>
              <p className="text-charcoal/70">We discuss your vision, preferred locations, and styling</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ocean-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-camera text-2xl text-ocean-blue"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Photo Session</h3>
              <p className="text-charcoal/70">Relaxed, fun session with guidance on posing</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ocean-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-edit text-2xl text-ocean-blue"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Professional Editing</h3>
              <p className="text-charcoal/70">Each image is carefully edited to perfection</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ocean-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-images text-2xl text-ocean-blue"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">4. Gallery Delivery</h3>
              <p className="text-charcoal/70">Online gallery ready within 2 weeks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-12">
            Family Portrait Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="aspect-square overflow-hidden rounded-lg"
              >
                <img 
                  src={image} 
                  alt={`Family portrait ${index + 1}`} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/portfolio">
              <Button size="lg" className="bg-luxury-gold hover:bg-sunset-orange">
                View Full Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-4">
            Family Session Packages
          </h2>
          <p className="text-center text-lg text-charcoal/70 mb-12 max-w-3xl mx-auto">
            Choose the perfect package for your family's needs
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-playfair mb-4">{pkg.name}</h3>
                <p className="text-3xl font-bold text-luxury-gold mb-6">{pkg.price}</p>
                <div className="space-y-2 mb-6">
                  <p className="text-charcoal/80">
                    <i className="fas fa-clock mr-2 text-ocean-blue"></i>
                    {pkg.duration}
                  </p>
                  <p className="text-charcoal/80">
                    <i className="fas fa-images mr-2 text-ocean-blue"></i>
                    {pkg.photos}
                  </p>
                </div>
                <ul className="space-y-2 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <i className="fas fa-check text-ocean-blue mr-2 mt-1"></i>
                      <span className="text-charcoal/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/checkout">
                  <Button className="w-full bg-ocean-blue hover:bg-ocean-blue/90">
                    Book This Session
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-12">
            Session Tips for Great Photos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <i className={`${tip.icon} text-4xl text-ocean-blue mb-4`}></i>
                <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                <p className="text-charcoal/70">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-12">
            Happy Families
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-luxury-gold"></i>
                ))}
              </div>
              <p className="text-lg text-charcoal/80 mb-4 italic">
                "Our family photos are absolutely beautiful! The photographer was patient with 
                our kids and captured their personalities perfectly. We'll treasure these forever."
              </p>
              <div>
                <p className="font-semibold">The Nakamura Family</p>
                <p className="text-sm text-charcoal/60">Annual Family Session</p>
              </div>
            </Card>
            <Card className="p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-luxury-gold"></i>
                ))}
              </div>
              <p className="text-lg text-charcoal/80 mb-4 italic">
                "Working with Arcadia Photography was such a joy! They made our maternity session 
                feel effortless and the photos are stunning. Highly recommend!"
              </p>
              <div>
                <p className="font-semibold">Rachel & James Park</p>
                <p className="text-sm text-charcoal/60">Maternity Session</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'What should we wear for our session?',
                a: 'I recommend coordinating (not matching) outfits in complementary colors. Avoid busy patterns and logos. Earth tones and pastels work beautifully with Honolulu\'s natural settings.'
              },
              {
                q: 'When is the best time for photos?',
                a: 'Golden hour (1-2 hours before sunset) provides the most flattering light. For families with young children, we can also schedule morning sessions.'
              },
              {
                q: 'What if my kids don\'t cooperate?',
                a: 'Don\'t worry! I\'m experienced with children of all ages and know how to make sessions fun. We\'ll take breaks as needed and capture natural moments.'
              },
              {
                q: 'Can we include our pet?',
                a: 'Absolutely! Pets are family too. Just let me know in advance so we can choose a pet-friendly location.'
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-2">{faq.q}</h3>
                <p className="text-charcoal/70">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-ocean-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-playfair mb-6">
            Ready to Create Beautiful Family Memories?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's capture your family's unique story in paradise
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/checkout">
              <Button size="lg" className="bg-luxury-gold text-ocean-blue hover:bg-sunset-orange">
                <i className="fas fa-calendar-alt mr-2"></i>
                Book Your Session
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ocean-blue">
                <i className="fas fa-images mr-2"></i>
                View Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FamilyPage;