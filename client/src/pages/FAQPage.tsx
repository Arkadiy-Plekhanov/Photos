import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQPage = () => {
  const faqCategories = {
    general: {
      title: 'General Questions',
      faqs: [
        {
          question: 'What areas of Honolulu do you serve?',
          answer: 'We serve all of Honolulu and the greater Oahu area. We\'re also available for neighbor island weddings with additional travel arrangements.'
        },
        {
          question: 'How far in advance should I book?',
          answer: 'For weddings, we recommend booking 6-12 months in advance, especially for peak season (April-October). For real estate and family sessions, 2-4 weeks notice is typically sufficient.'
        },
        {
          question: 'Do you travel to neighbor islands?',
          answer: 'Yes! We love capturing Hawaii\'s diverse beauty across all islands. Travel fees apply for neighbor island shoots.'
        },
        {
          question: 'What\'s your cancellation policy?',
          answer: 'Life happens! We offer flexible rescheduling options. Cancellations made more than 30 days before your session receive a full refund minus the deposit.'
        }
      ]
    },
    wedding: {
      title: 'Wedding Photography',
      faqs: [
        {
          question: 'What\'s included in wedding packages?',
          answer: 'All wedding packages include professional editing, high-resolution digital files, online gallery, and print release. Specific inclusions vary by package - see our wedding page for details.'
        },
        {
          question: 'Do you help with timeline planning?',
          answer: 'Absolutely! We provide timeline assistance for all wedding clients to ensure we capture every important moment of your day.'
        },
        {
          question: 'Can we add a second shooter?',
          answer: 'Yes! Second shooters are included in our Premium package and available as an add-on ($500) for other packages.'
        },
        {
          question: 'What about permits for beach weddings?',
          answer: 'We\'re familiar with permit requirements for all popular venues and can guide you through the process. Permit fees are separate from photography fees.'
        },
        {
          question: 'How many photos will we receive?',
          answer: 'You\'ll receive approximately 50-75 edited images per hour of coverage. For a 6-hour wedding, expect 300-450 beautifully edited photos.'
        }
      ]
    },
    realEstate: {
      title: 'Real Estate Photography',
      faqs: [
        {
          question: 'What\'s your turnaround time?',
          answer: 'Standard turnaround is 24 hours for all real estate packages. Same-day rush delivery is available for an additional fee.'
        },
        {
          question: 'Do you provide drone photography?',
          answer: 'Yes! We\'re FAA Part 107 certified. Drone photography is included in our Professional and Luxury packages, or available as an add-on.'
        },
        {
          question: 'Can you do virtual tours?',
          answer: 'We offer Matterport 3D virtual tours as an add-on service or included in our Luxury package.'
        },
        {
          question: 'What if the weather is bad?',
          answer: 'We monitor weather closely and will reschedule if needed. We can often work around light rain, but heavy rain or high winds require rescheduling.'
        },
        {
          question: 'Do you do twilight photography?',
          answer: 'Yes! Twilight shoots create stunning, dramatic images. They\'re available as an add-on or included in our Luxury package.'
        }
      ]
    },
    family: {
      title: 'Family Photography',
      faqs: [
        {
          question: 'What should we wear?',
          answer: 'We recommend coordinating (not matching) outfits in complementary colors. Avoid busy patterns and logos. Earth tones and pastels work beautifully with Hawaii\'s natural settings.'
        },
        {
          question: 'When is the best time for photos?',
          answer: 'Golden hour (1-2 hours before sunset) provides the most flattering light. For families with young children, we also offer morning sessions.'
        },
        {
          question: 'What if my kids won\'t cooperate?',
          answer: 'Don\'t worry! We\'re experienced with children of all ages. We make sessions fun and take breaks as needed. The best photos often happen between poses!'
        },
        {
          question: 'Can we include our pet?',
          answer: 'Absolutely! Pets are family too. Just let us know in advance so we can choose a pet-friendly location.'
        },
        {
          question: 'How many photos will we get?',
          answer: 'Mini sessions include 15+ edited photos, standard sessions 30+, and extended sessions 50+. You\'ll receive all the best images from your session.'
        }
      ]
    },
    technical: {
      title: 'Technical & Delivery',
      faqs: [
        {
          question: 'How are photos delivered?',
          answer: 'All photos are delivered via a private online gallery where you can view, download, and share your images. Galleries remain active for at least one year.'
        },
        {
          question: 'What format are the digital files?',
          answer: 'You\'ll receive high-resolution JPEG files suitable for printing up to 30x40 inches. RAW files are available for an additional fee.'
        },
        {
          question: 'Do you offer prints?',
          answer: 'Yes! We partner with professional labs to offer museum-quality prints, canvases, and albums at competitive prices.'
        },
        {
          question: 'Can we use the photos for marketing?',
          answer: 'All packages include usage rights for personal or business marketing. Extended commercial licenses are available if needed.'
        },
        {
          question: 'Do you backup our photos?',
          answer: 'Absolutely! We maintain multiple backups of all client photos for at least one year after delivery.'
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-warm-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1920&q=80')`
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
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-inter"
          >
            Everything you need to know about our services
          </motion.p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {Object.entries(faqCategories).map(([key, category], categoryIndex) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-playfair mb-6 text-ocean-blue">
                {category.title}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`${key}-${index}`}>
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="text-lg font-semibold pr-4">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-charcoal/70 leading-relaxed">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-playfair mb-6">
            Still Have Questions?
          </h2>
          <p className="text-lg text-charcoal/70 mb-8">
            We're here to help! Don't hesitate to reach out with any questions about our services.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Card className="p-6">
              <i className="fas fa-envelope text-3xl text-ocean-blue mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-charcoal/70 mb-4">Get a response within 24 hours</p>
              <a href="mailto:info@arcadiaphotography.com" className="text-ocean-blue hover:text-luxury-gold transition-colors">
                info@arcadiaphotography.com
              </a>
            </Card>
            <Card className="p-6">
              <i className="fas fa-phone text-3xl text-ocean-blue mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-charcoal/70 mb-4">Mon-Fri 9am-6pm HST</p>
              <a href="tel:+18085551234" className="text-ocean-blue hover:text-luxury-gold transition-colors">
                (808) 555-1234
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-playfair text-center mb-8">
            Quick Links
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <Link href="/wedding-photography">
              <Card className="p-6 hover:shadow-xl transition-shadow cursor-pointer">
                <i className="fas fa-heart text-3xl text-ocean-blue mb-4"></i>
                <h3 className="text-xl font-semibold">Wedding Packages</h3>
              </Card>
            </Link>
            <Link href="/real-estate-photography">
              <Card className="p-6 hover:shadow-xl transition-shadow cursor-pointer">
                <i className="fas fa-home text-3xl text-ocean-blue mb-4"></i>
                <h3 className="text-xl font-semibold">Real Estate Services</h3>
              </Card>
            </Link>
            <Link href="/family-photography">
              <Card className="p-6 hover:shadow-xl transition-shadow cursor-pointer">
                <i className="fas fa-users text-3xl text-ocean-blue mb-4"></i>
                <h3 className="text-xl font-semibold">Family Sessions</h3>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQPage;