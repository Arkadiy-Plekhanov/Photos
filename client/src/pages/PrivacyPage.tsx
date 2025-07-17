import React from 'react';
import { useSEO } from '../hooks/useSEO';

export default function PrivacyPage() {
  useSEO({
    title: 'Privacy Policy | Arcadia Photography',
    description: 'Our privacy policy explains how we collect, use, and protect your personal information.',
    keywords: 'privacy policy, data protection, photography services'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect information you provide directly to us, such as when you contact us, book a session, or subscribe to our newsletter.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>To provide and improve our photography services</li>
                <li>To communicate with you about bookings and services</li>
                <li>To send you marketing communications (with your consent)</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookie Policy</h2>
              <p className="text-gray-700 mb-4">
                We use cookies to enhance your experience on our website. These include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Essential cookies for website functionality</li>
                <li>Analytics cookies to understand website usage</li>
                <li>Preference cookies to remember your settings</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  Email: privacy@arcadiaphotography.com<br />
                  Phone: (808) 555-0123
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}