import { useSEO } from '../hooks/useSEO';

const TermsPage = () => {
  useSEO({
    title: 'Terms of Service | Arcadia Photography',
    description: 'Terms of service for Arcadia Photography - professional photography services in Honolulu.',
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-ocean-blue dark:text-white mb-8">
          Terms of Service
        </h1>
        
        <div className="prose prose-lg max-w-none font-inter text-gray-600 dark:text-gray-300">
          <p className="text-sm text-gray-500 mb-8">Last updated: January 25, 2025</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-playfair font-bold text-ocean-blue dark:text-white mb-4">
              Photography Services
            </h2>
            <p className="mb-4">
              Arcadia Photography provides professional photography services including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Wedding photography and videography</li>
              <li>Real estate photography</li>
              <li>Family portrait sessions</li>
              <li>Event photography</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-playfair font-bold text-ocean-blue dark:text-white mb-4">
              Booking and Payment
            </h2>
            <p className="mb-4">
              To secure your photography session:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>A 50% deposit is required to book your session</li>
              <li>Full payment is due 24 hours before your session</li>
              <li>Cancellations made less than 48 hours in advance forfeit the deposit</li>
              <li>Weather-related cancellations will be rescheduled at no additional cost</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-playfair font-bold text-ocean-blue dark:text-white mb-4">
              Image Rights and Usage
            </h2>
            <p className="mb-4">
              Regarding the photographs taken during your session:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Clients receive high-resolution digital images for personal use</li>
              <li>Arcadia Photography retains copyright to all images</li>
              <li>We may use images for portfolio and marketing purposes</li>
              <li>Commercial use by clients requires separate licensing agreement</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-playfair font-bold text-ocean-blue dark:text-white mb-4">
              Delivery Timeline
            </h2>
            <p className="mb-4">
              Image delivery timelines:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Portrait sessions: 1-2 weeks</li>
              <li>Wedding photography: 4-6 weeks</li>
              <li>Real estate photography: 24-48 hours</li>
              <li>Rush delivery available for additional fee</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-playfair font-bold text-ocean-blue dark:text-white mb-4">
              Limitation of Liability
            </h2>
            <p className="mb-4">
              Arcadia Photography's liability is limited to the amount paid for services. We are not responsible for missed moments due to equipment failure, though we maintain backup equipment for all sessions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-playfair font-bold text-ocean-blue dark:text-white mb-4">
              Contact Information
            </h2>
            <p className="mb-4">
              For questions about these terms, contact us:
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p><strong>Email:</strong> info@arcadiaphotography.com</p>
              <p><strong>Phone:</strong> (808) 555-0123</p>
              <p><strong>Address:</strong> 123 Paradise Street, Honolulu, HI 96813</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;