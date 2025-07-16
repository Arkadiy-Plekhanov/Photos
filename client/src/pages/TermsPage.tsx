import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card } from '@/components/ui/card';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-warm-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[30vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-ocean-blue/60" />
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-playfair font-bold mb-4"
          >
            Terms & Conditions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl font-inter"
          >
            Last Updated: January 2024
          </motion.p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-playfair mb-4">1. Agreement to Terms</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  By accessing and using Arcadia Photography's services, you agree to be bound by these Terms and Conditions. 
                  If you disagree with any part of these terms, you may not access our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair mb-4">2. Photography Services</h2>
                <p className="text-charcoal/80 leading-relaxed mb-3">
                  Arcadia Photography provides professional photography services including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-charcoal/80">
                  <li>Wedding and elopement photography</li>
                  <li>Real estate and architectural photography</li>
                  <li>Family and portrait photography</li>
                  <li>Commercial photography</li>
                  <li>Drone photography services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-playfair mb-4">3. Booking and Payment</h2>
                <div className="space-y-3 text-charcoal/80">
                  <p className="leading-relaxed">
                    <strong>Deposit:</strong> A 50% non-refundable deposit is required to secure your booking date. 
                    The remaining balance is due 7 days before the photography session or event.
                  </p>
                  <p className="leading-relaxed">
                    <strong>Payment Methods:</strong> We accept payment via bank transfer, credit card, or PayPal. 
                    All prices are in USD unless otherwise specified.
                  </p>
                  <p className="leading-relaxed">
                    <strong>Travel Fees:</strong> Sessions outside of Central Oahu may incur additional travel fees. 
                    Neighbor island sessions require travel and accommodation expenses to be covered by the client.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-playfair mb-4">4. Cancellation and Rescheduling</h2>
                <div className="space-y-3 text-charcoal/80">
                  <p className="leading-relaxed">
                    <strong>Client Cancellation:</strong> Cancellations made more than 30 days before the session date 
                    will receive a full refund minus the deposit. Cancellations made within 30 days forfeit the full payment.
                  </p>
                  <p className="leading-relaxed">
                    <strong>Weather:</strong> In case of inclement weather, we will work together to reschedule at no additional charge. 
                    The decision to cancel due to weather will be made jointly.
                  </p>
                  <p className="leading-relaxed">
                    <strong>Photographer Cancellation:</strong> In the unlikely event that we must cancel, you will receive 
                    a full refund including the deposit, or the option to reschedule at your convenience.
                  </p>
                </div>
              </section>

              <section id="licensing">
                <h2 className="text-2xl font-playfair mb-4">5. Image Delivery and Usage Rights</h2>
                <div className="space-y-3 text-charcoal/80">
                  <p className="leading-relaxed">
                    <strong>Delivery Timeline:</strong> Wedding photos are delivered within 4-6 weeks. Real estate photos 
                    within 24-48 hours. Family portraits within 2-3 weeks.
                  </p>
                  <p className="leading-relaxed">
                    <strong>Format:</strong> Images are delivered digitally via private online gallery in high-resolution JPEG format.
                  </p>
                  <p className="leading-relaxed">
                    <strong>Usage Rights:</strong> Clients receive personal usage rights for all delivered images. 
                    Commercial usage requires additional licensing. Arcadia Photography retains copyright and may use 
                    images for portfolio and marketing purposes.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-playfair mb-4">6. Model Release</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  By engaging our services, you grant Arcadia Photography permission to use photographs containing your 
                  likeness for portfolio, website, social media, and marketing purposes. If you prefer to opt out, 
                  please notify us in writing before your session.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair mb-4">7. Liability</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  Arcadia Photography carries professional liability insurance. However, our liability is limited to the 
                  amount paid for services. We are not responsible for acts of nature, venue restrictions, or circumstances 
                  beyond our control that may impact the photography session.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair mb-4">8. Equipment and Backup</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  We use professional-grade equipment and maintain backups of all images for a minimum of one year. 
                  However, in the unlikely event of equipment failure or data loss, our liability is limited to a 
                  refund of amounts paid.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair mb-4">9. Privacy</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  We respect your privacy and will not share your personal information with third parties without 
                  your consent. Please refer to our Privacy Policy for detailed information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair mb-4">10. Governing Law</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  These terms shall be governed by and construed in accordance with the laws of the State of Hawaii. 
                  Any disputes arising from these terms shall be resolved in the courts of Honolulu County, Hawaii.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair mb-4">11. Contact Information</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  For questions about these Terms & Conditions, please contact us at:<br />
                  Email: legal@arcadiaphotography.com<br />
                  Phone: (808) 555-1234<br />
                  Address: Honolulu, Hawaii
                </p>
              </section>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsPage;