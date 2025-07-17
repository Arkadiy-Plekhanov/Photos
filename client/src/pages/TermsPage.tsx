import React from 'react';
import { useSEO } from '../hooks/useSEO';

export default function TermsPage() {
  useSEO({
    title: 'Terms of Service | Arcadia Photography',
    description: 'Our terms of service and licensing information for photography services.',
    keywords: 'terms of service, licensing, photography contracts'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Photography Services</h2>
              <p className="text-gray-700 mb-4">
                Arcadia Photography provides professional photography services including weddings, family portraits, real estate, and commercial photography in Oahu, Hawaii.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Booking and Payment</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>A deposit is required to secure your booking</li>
                <li>Full payment is due before or on the day of the session</li>
                <li>Cancellations must be made at least 48 hours in advance</li>
                <li>Weather-related postponements will be rescheduled at no additional cost</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Image Licensing and Usage Rights</h2>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Client License</h3>
                <p className="text-blue-800 mb-3">
                  Upon full payment, clients receive a personal, non-exclusive license to use the delivered images for:
                </p>
                <ul className="list-disc pl-6 text-blue-800 space-y-1">
                  <li>Personal use and enjoyment</li>
                  <li>Social media sharing</li>
                  <li>Printing for personal use</li>
                  <li>Wedding announcements and save-the-dates</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Photographer Rights</h3>
                <p className="text-gray-700 mb-3">
                  Arcadia Photography retains copyright and the right to use images for:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Portfolio and marketing purposes</li>
                  <li>Website and social media promotion</li>
                  <li>Competition entries and exhibitions</li>
                  <li>Professional development and education</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Commercial Licensing</h2>
              <p className="text-gray-700 mb-4">
                For commercial use of images (advertising, business promotion, etc.), separate licensing agreements and fees apply. Contact us for commercial licensing options.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                Our liability is limited to the amount paid for services. We are not responsible for lost or corrupted images due to equipment failure, though we maintain backup systems and insurance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For questions about licensing or these terms, please contact us:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  Email: licensing@arcadiaphotography.com<br />
                  Phone: (808) 555-0123<br />
                  Address: Honolulu, Hawaii
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}