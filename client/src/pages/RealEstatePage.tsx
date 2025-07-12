import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RealEstatePage = () => {
  const services = [
    {
      icon: 'fas fa-home',
      title: 'Interior Photography',
      description: 'Showcase every room with professional lighting and composition'
    },
    {
      icon: 'fas fa-building',
      title: 'Exterior Photography',
      description: 'Capture curb appeal and architectural details'
    },
    {
      icon: 'fas fa-helicopter',
      title: 'Drone Photography',
      description: 'Aerial views showcasing property and neighborhood'
    },
    {
      icon: 'fas fa-cube',
      title: 'Virtual Tours',
      description: 'Interactive 3D tours with Matterport technology'
    },
    {
      icon: 'fas fa-map',
      title: 'Floor Plans',
      description: 'Accurate 2D and 3D floor plan renderings'
    },
    {
      icon: 'fas fa-moon',
      title: 'Twilight Photography',
      description: 'Dramatic evening shots that make properties glow'
    }
  ];

  const packages = [
    {
      name: 'Essential Package',
      size: 'Up to 2,000 sq ft',
      features: [
        '25-30 professional photos',
        'Interior & exterior shots',
        '24-hour turnaround',
        'MLS-ready sizing',
        'Basic photo editing'
      ],
      price: 'Starting at $299'
    },
    {
      name: 'Professional Package',
      size: 'Up to 3,500 sq ft',
      features: [
        '35-40 professional photos',
        'Interior & exterior shots',
        'Drone photography (5 images)',
        '24-hour turnaround',
        'Advanced editing',
        'Virtual tour add-on available'
      ],
      price: 'Starting at $449'
    },
    {
      name: 'Luxury Package',
      size: '3,500+ sq ft',
      features: [
        '50+ professional photos',
        'Complete property coverage',
        'Drone photography & video',
        'Twilight photography',
        'Virtual tour included',
        'Floor plans',
        'Same-day rush available'
      ],
      price: 'Starting at $799'
    }
  ];

  const portfolio = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
  ];

  const stats = [
    { number: '500+', label: 'Properties Photographed' },
    { number: '24hr', label: 'Average Turnaround' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '50+', label: 'Realtors Served' }
  ];

  return (
    <div className="min-h-screen bg-warm-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&q=80')`
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
            Real Estate Photography
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-inter mb-6"
          >
            Professional Property Marketing in Honolulu
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair mb-6">
            Showcase Properties at Their Best
          </h2>
          <p className="text-lg text-charcoal/80 leading-relaxed mb-8">
            In Honolulu's competitive real estate market, professional photography isn't just an option—it's essential. 
            Our expert real estate photography services help properties sell faster and for higher prices by showcasing 
            them in their best light. From cozy condos to luxury estates, we capture the unique features and lifestyle 
            that each property offers.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gray-50">
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

      {/* Services Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-12">
            Our Real Estate Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-xl transition-shadow h-full">
                  <i className={`${service.icon} text-4xl text-ocean-blue mb-4`}></i>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-charcoal/70">{service.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-12">
            Real Estate Portfolio
          </h2>
          <Tabs defaultValue="residential" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
              <TabsTrigger value="residential">Residential</TabsTrigger>
              <TabsTrigger value="commercial">Commercial</TabsTrigger>
              <TabsTrigger value="luxury">Luxury Estates</TabsTrigger>
            </TabsList>
            <TabsContent value="residential" className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {portfolio.slice(0, 3).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="aspect-[4/3] overflow-hidden rounded-lg shadow-lg"
                >
                  <img src={image} alt={`Residential property ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </motion.div>
              ))}
            </TabsContent>
            <TabsContent value="commercial" className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {portfolio.slice(3, 6).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="aspect-[4/3] overflow-hidden rounded-lg shadow-lg"
                >
                  <img src={image} alt={`Commercial property ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </motion.div>
              ))}
            </TabsContent>
            <TabsContent value="luxury" className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {portfolio.slice(0, 3).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="aspect-[4/3] overflow-hidden rounded-lg shadow-lg"
                >
                  <img src={image} alt={`Luxury property ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-4">
            Real Estate Photography Packages
          </h2>
          <p className="text-center text-lg text-charcoal/70 mb-12 max-w-3xl mx-auto">
            Fast turnaround, professional results, competitive pricing
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`p-8 hover:shadow-xl transition-shadow ${index === 1 ? 'border-2 border-luxury-gold' : ''}`}>
                {index === 1 && <div className="text-center text-luxury-gold font-semibold mb-4">MOST POPULAR</div>}
                <h3 className="text-2xl font-playfair mb-2">{pkg.name}</h3>
                <p className="text-charcoal/60 mb-4">{pkg.size}</p>
                <p className="text-3xl font-bold text-luxury-gold mb-6">{pkg.price}</p>
                <ul className="space-y-2 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <i className="fas fa-check text-ocean-blue mr-2 mt-1"></i>
                      <span className="text-charcoal/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-ocean-blue hover:bg-ocean-blue/90">
                  Get Started
                </Button>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg text-charcoal/70 mb-4">
              All packages include professional HDR editing and digital delivery
            </p>
            <p className="text-charcoal/70">
              <strong>Additional Services:</strong> Video tours (+$299), Virtual staging (+$35/photo), 
              Floor plans (+$99), Twilight photos (+$149)
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-12">
            Why Realtors Choose Arcadia Photography
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-playfair mb-6">Quick Turnaround</h3>
              <p className="text-charcoal/80 mb-4">
                We understand that time is money in real estate. That's why we guarantee 24-hour delivery 
                for all standard packages, with same-day rush options available.
              </p>
              <h3 className="text-2xl font-playfair mb-6 mt-8">Consistent Quality</h3>
              <p className="text-charcoal/80 mb-4">
                Every property receives the same high-quality treatment, ensuring your listings always 
                look professional and appealing to potential buyers.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-playfair mb-6">Technical Expertise</h3>
              <p className="text-charcoal/80 mb-4">
                FAA-certified drone pilots, HDR processing, and advanced editing techniques ensure 
                every property looks its absolute best.
              </p>
              <h3 className="text-2xl font-playfair mb-6 mt-8">Easy Booking</h3>
              <p className="text-charcoal/80 mb-4">
                Simple online scheduling, clear communication, and reliable service make working with 
                us effortless for busy real estate professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-12">
            What Realtors Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-luxury-gold"></i>
                ))}
              </div>
              <p className="text-lg text-charcoal/80 mb-4 italic">
                "Arcadia Photography has been instrumental in helping my listings sell faster. 
                Their attention to detail and quick turnaround time are unmatched. Highly recommend!"
              </p>
              <div>
                <p className="font-semibold">Jennifer Lee</p>
                <p className="text-sm text-charcoal/60">Coldwell Banker Realty</p>
              </div>
            </Card>
            <Card className="p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-luxury-gold"></i>
                ))}
              </div>
              <p className="text-lg text-charcoal/80 mb-4 italic">
                "Professional, reliable, and the photos always exceed expectations. They make 
                my properties stand out in a crowded market. Worth every penny!"
              </p>
              <div>
                <p className="font-semibold">Mark Tanaka</p>
                <p className="text-sm text-charcoal/60">Locations LLC</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-ocean-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-playfair mb-6">
            Ready to Elevate Your Listings?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Professional real estate photography that helps properties sell faster
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <Button size="lg" className="bg-luxury-gold text-ocean-blue hover:bg-sunset-orange">
                <i className="fas fa-calendar-check mr-2"></i>
                Schedule a Shoot
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ocean-blue">
                <i className="fas fa-building mr-2"></i>
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

export default RealEstatePage;