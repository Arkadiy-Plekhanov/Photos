import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card } from '@/components/ui/card';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-warm-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[30vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&q=80')`
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
            Privacy Policy
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

      {/* Privacy Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-playfair mb-4">Introduction</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  At Arcadia Photography, we are committed to protecting your privacy and personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you visit our website or use our photography services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair mb-4">Information We Collect</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
                    <p className="text-charcoal/80 leading-relaxed mb-2">
                      We may collect personal information that you voluntarily provide to us, including:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 text-charcoal/80">
                      <li>Name and contact information (email, phone, address)</li>
                      <li>Event details and preferences</li>
                      <li>Payment information</li>
                      <li>Photos and images from your sessions</li>
                      <li>Communication preferences</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Automatically Collected Information</h3>
                    <p className="text-charcoal/80 leading-relaxed mb-2">
                      When you visit our website, we may automatically collect:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 text-charcoal/80">
                      <li>IP address and browser type</li>
                      <li>Device information</li>
                      <li>Pages visited and time spent</li>
                      <li>Referring website addresses</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-playfair mb-4">How We Use Your Information</h2>
                <p className="text-charcoal/80 leading-relaxed mb-3">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-charcoal/80">
                  <li>Provide and manage our photography services</li>
                  <li>Process payments and maintain records</li>
                  <li>Communicate with you about your sessions</li>
                  <li>Send you updates, newsletters, and marketing materials (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                  <li>Protect against fraudulent or illegal activity</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-playfair mb-4">Information Sharing and Disclosure</h2>
                <p className="text-charcoal/80 leading-relaxed mb-3">
                  We do not sell, trade, or rent your personal information. We may share your information with:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-charcoal/80">
                  <li>Service providers who assist in our operations (e.g., payment processors, cloud storage)</li>
                  <li>Professional partners (with your consent, such as wedding planners or venues)</li>
                  <li>Legal authorities when required by law or to protect our rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-playfair mb-4">Data Security</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction. This includes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-charcoal/80 mt-3">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure cloud storage with regular backups</li>
                  <li>Limited access to personal information</li>
                  <li>Regular security assessments</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-playfair mb-4">Your Rights and Choices</h2>
                <p className="text-charcoal/80 leading-relaxed mb-3">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-charcoal/80">
                  <li>Access and receive a copy of your personal information</li>
                  <li>Update or correct your information</li>
                  <li>Request deletion of your information (subject to legal requirements)</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Restrict or object to certain processing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-playfair mb-4">Cookies and Tracking</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your browsing experience. 
                  You can control cookie preferences through your browser settings. Essential cookies 
                  required for website functionality cannot be disabled.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair mb-4">Children's Privacy</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  Our services are not directed to children under 13. We do not knowingly collect 
                  personal information from children under 13. If you believe we have collected 
                  information from a child under 13, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair mb-4">Third-Party Links</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for 
                  the privacy practices of these external sites. We encourage you to review their 
                  privacy policies before providing any personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair mb-4">California Privacy Rights</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  California residents have additional rights under the California Consumer Privacy Act (CCPA), 
                  including the right to know what personal information is collected, used, shared, or sold, 
                  and the right to request deletion of personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair mb-4">International Data Transfers</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  If you are accessing our services from outside the United States, please be aware that 
                  your information may be transferred to, stored, and processed in the United States where 
                  our servers are located.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair mb-4">Changes to This Policy</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair mb-4">Contact Us</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:<br /><br />
                  <strong>Arcadia Photography</strong><br />
                  Email: privacy@arcadiaphotography.com<br />
                  Phone: (808) 555-1234<br />
                  Address: Honolulu, Hawaii<br /><br />
                  For data protection inquiries: dpo@arcadiaphotography.com
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

export default PrivacyPage;