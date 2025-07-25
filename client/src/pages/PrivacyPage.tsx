import { useSEO } from '../hooks/useSEO';

const PrivacyPage = () => {
  useSEO({
    title: 'Privacy Policy | Arcadia Photography',
    description: 'Privacy policy for Arcadia Photography - protecting your personal information and data.',
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-ocean-blue dark:text-white mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg max-w-none font-inter text-gray-600 dark:text-gray-300">
          <p className="text-sm text-gray-500 mb-8">Last updated: January 25, 2025</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-playfair font-bold text-ocean-blue dark:text-white mb-4">
              Information We Collect
            </h2>
            <p className="mb-4">
              At Arcadia Photography, we collect information you provide directly to us, such as when you:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Fill out our contact form</li>
              <li>Book a photography session</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us via email or phone</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-playfair font-bold text-ocean-blue dark:text-white mb-4">
              How We Use Your Information
            </h2>
            <p className="mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Respond to your inquiries and provide our services</li>
              <li>Schedule and manage photography sessions</li>
              <li>Send you important updates about your bookings</li>
              <li>Improve our website and services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-playfair font-bold text-ocean-blue dark:text-white mb-4">
              Information Sharing
            </h2>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-playfair font-bold text-ocean-blue dark:text-white mb-4">
              Data Security
            </h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-playfair font-bold text-ocean-blue dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
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

export default PrivacyPage;