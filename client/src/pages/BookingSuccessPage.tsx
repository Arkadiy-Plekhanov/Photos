import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const BookingSuccessPage = () => {
  return (
    <div className="min-h-screen bg-warm-white">
      <Navigation />
      <div className="pt-20 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-check text-2xl text-green-600"></i>
              </div>
              
              <h1 className="text-3xl font-playfair font-bold mb-4">
                Booking Confirmed!
              </h1>
              
              <p className="text-lg text-charcoal/70 mb-6">
                Thank you for choosing Arcadia Photography. Your booking has been successfully confirmed and payment processed.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-3">What's Next?</h3>
                <ul className="text-left space-y-2 text-charcoal/70">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-600 mr-2 mt-1"></i>
                    <span>You'll receive a confirmation email with all booking details</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-600 mr-2 mt-1"></i>
                    <span>Our team will contact you within 24 hours to discuss your session</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-600 mr-2 mt-1"></i>
                    <span>We'll work together to finalize location, timing, and any special requests</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-charcoal/60">
                  Have questions? Contact us at <a href="mailto:info@arcadiaphotography.com" className="text-ocean-blue hover:underline">info@arcadiaphotography.com</a> or call <a href="tel:+18085551234" className="text-ocean-blue hover:underline">(808) 555-1234</a>
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/">
                    <Button size="lg" className="bg-ocean-blue hover:bg-ocean-blue/90">
                      <i className="fas fa-home mr-2"></i>
                      Back to Home
                    </Button>
                  </Link>
                  <Link href="/portfolio">
                    <Button size="lg" variant="outline" className="border-ocean-blue text-ocean-blue hover:bg-ocean-blue hover:text-white">
                      <i className="fas fa-images mr-2"></i>
                      View Our Work
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingSuccessPage;