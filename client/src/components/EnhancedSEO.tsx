import { useEffect } from 'react';
import { updateSEO, addPhotographyServiceStructuredData } from '@/lib/seo';

interface EnhancedSEOProps {
  title: string;
  description: string;
  keywords?: string[];
  imageUrl?: string;
  pageType?: 'website' | 'article' | 'service' | 'portfolio';
  service?: {
    name: string;
    price: number;
    description: string;
  };
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
  faqItems?: Array<{
    question: string;
    answer: string;
  }>;
}

export default function EnhancedSEO({
  title,
  description,
  keywords = [],
  imageUrl,
  pageType = 'website',
  service,
  breadcrumbs = [],
  faqItems = []
}: EnhancedSEOProps) {
  
  useEffect(() => {
    // Basic SEO update
    updateSEO({
      title,
      description,
      keywords: keywords.join(', '),
      image: imageUrl || '/hero-wedding.jpg',
      type: pageType === 'service' ? 'business' : pageType,
      structuredData: generateEnhancedStructuredData()
    });

    // Add service-specific structured data
    if (service && pageType === 'service') {
      addPhotographyServiceStructuredData(service.name, service.price);
    }

    // Add breadcrumb structured data
    if (breadcrumbs.length > 0) {
      addBreadcrumbStructuredData(breadcrumbs);
    }

    // Add FAQ structured data
    if (faqItems.length > 0) {
      addFAQStructuredData(faqItems);
    }

  }, [title, description, keywords, imageUrl, pageType, service, breadcrumbs, faqItems]);

  function generateEnhancedStructuredData() {
    const baseStructuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${window.location.origin}/#organization`,
          "name": "Arcadia Photography",
          "url": window.location.origin,
          "logo": {
            "@type": "ImageObject",
            "url": `${window.location.origin}/logo.png`,
            "width": 400,
            "height": 400
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-808-555-0123",
            "contactType": "Customer Service",
            "availableLanguage": ["English"],
            "areaServed": ["Hawaii", "Oahu", "Honolulu"]
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Honolulu",
            "addressRegion": "HI",
            "addressCountry": "US"
          },
          "sameAs": [
            "https://www.instagram.com/arcadiaphotography",
            "https://www.facebook.com/arcadiaphotography",
            "https://www.pinterest.com/arcadiaphotography"
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "247",
            "bestRating": "5",
            "worstRating": "1"
          }
        },
        {
          "@type": "LocalBusiness",
          "@id": `${window.location.origin}/#business`,
          "name": "Arcadia Photography",
          "description": "Professional photography services specializing in weddings, family portraits, and real estate photography in Oahu, Hawaii.",
          "url": window.location.origin,
          "telephone": "+1-808-555-0123",
          "priceRange": "$$-$$$",
          "paymentAccepted": ["Cash", "Credit Card", "PayPal"],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Honolulu",
            "addressRegion": "HI",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 21.3099,
            "longitude": -157.8581
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Saturday", "Sunday"],
              "opens": "08:00",
              "closes": "20:00"
            }
          ],
          "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": 21.3099,
              "longitude": -157.8581
            },
            "geoRadius": "50000"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Photography Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Wedding Photography",
                  "description": "Professional wedding photography services"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Family Photography",
                  "description": "Family portrait and lifestyle photography"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Real Estate Photography",
                  "description": "Professional real estate and property photography"
                }
              }
            ]
          }
        },
        {
          "@type": "WebSite",
          "@id": `${window.location.origin}/#website`,
          "url": window.location.origin,
          "name": "Arcadia Photography",
          "description": description,
          "publisher": {
            "@id": `${window.location.origin}/#organization`
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${window.location.origin}/portfolio?search={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        }
      ]
    };

    // Add page-specific structured data
    if (pageType === 'service' && service) {
      baseStructuredData["@graph"].push({
        "@type": "Service",
        "name": service.name,
        "description": service.description,
        "provider": {
          "@id": `${window.location.origin}/#organization`
        },
        "offers": {
          "@type": "Offer",
          "price": service.price,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      });
    }

    return baseStructuredData;
  }

  function addBreadcrumbStructuredData(breadcrumbs: Array<{name: string; url: string}>) {
    const breadcrumbStructuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": `${window.location.origin}${crumb.url}`
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(breadcrumbStructuredData);
    document.head.appendChild(script);
  }

  function addFAQStructuredData(faqItems: Array<{question: string; answer: string}>) {
    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqStructuredData);
    document.head.appendChild(script);
  }

  return null;
}