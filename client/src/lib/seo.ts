export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile' | 'business';
  structuredData?: Record<string, any>;
  canonicalUrl?: string;
  author?: string;
  publishDate?: string;
  modifiedDate?: string;
}

export function updateSEO({
  title,
  description,
  keywords,
  image = '/placeholder-social.jpg',
  url = window.location.href,
  type = 'website',
  structuredData,
  canonicalUrl,
  author,
  publishDate,
  modifiedDate
}: SEOData) {
  // Update title with site name - add null checks
  const safeTitle = title || 'Arcadia Photography';
  const fullTitle = safeTitle.includes('Arcadia Photography') ? safeTitle : `${safeTitle} | Arcadia Photography`;
  document.title = fullTitle;

  // Update or create meta tags - add safe defaults
  const safeDescription = description || 'Professional photography services in Oahu, Hawaii specializing in weddings, family portraits, and real estate photography.';
  updateMetaTag('description', safeDescription);
  updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

  if (keywords) {
    updateMetaTag('keywords', keywords);
  }

  if (author) {
    updateMetaTag('author', author);
  }

  if (canonicalUrl) {
    updateLinkTag('canonical', canonicalUrl);
  }

  // Open Graph tags
  updateMetaTag('og:title', safeTitle, 'property');
  updateMetaTag('og:description', safeDescription, 'property');
  updateMetaTag('og:image', image, 'property');
  updateMetaTag('og:image:width', '1200', 'property');
  updateMetaTag('og:image:height', '630', 'property');
  updateMetaTag('og:url', url, 'property');
  updateMetaTag('og:type', type, 'property');
  updateMetaTag('og:site_name', 'Arcadia Photography', 'property');
  updateMetaTag('og:locale', 'en_US', 'property');

  // Twitter Card tags
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:site', '@ArcadiaPhotography');
  updateMetaTag('twitter:title', safeTitle);
  updateMetaTag('twitter:description', safeDescription);
  updateMetaTag('twitter:image', image);
  updateMetaTag('twitter:image:alt', `${safeTitle} - Professional Photography by Arcadia Photography`);

  // Article-specific meta tags
  if (type === 'article' && publishDate) {
    updateMetaTag('article:published_time', publishDate, 'property');
    updateMetaTag('article:author', author || 'Arcadia Photography', 'property');

    if (modifiedDate) {
      updateMetaTag('article:modified_time', modifiedDate, 'property');
    }
  }

  // Business-specific meta tags
  if (type === 'business') {
    updateMetaTag('business:contact_data:locality', 'Oahu', 'property');
    updateMetaTag('business:contact_data:region', 'Hawaii', 'property');
    updateMetaTag('business:contact_data:country_name', 'United States', 'property');
  }

  // Add structured data
  if (structuredData) {
    addStructuredData(structuredData);
  } else {
    // Default structured data for photography business
    addDefaultBusinessStructuredData(safeTitle, safeDescription, image, url);
  }
}

function updateMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

function addStructuredData(data: Record<string, any>) {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

function addDefaultBusinessStructuredData(title: string, description: string, image: string, url: string) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://arcadiaphotography.replit.app/#organization",
        "name": "Arcadia Photography",
        "url": "https://arcadiaphotography.replit.app/",
        "sameAs": [
          "https://www.instagram.com/arcadiaphotography",
          "https://www.facebook.com/arcadiaphotography"
        ],
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
          "availableLanguage": ["English"]
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Honolulu",
          "addressRegion": "HI",
          "addressCountry": "US"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://arcadiaphotography.replit.app/#business",
        "name": "Arcadia Photography",
        "description": "Professional photography services specializing in weddings, family portraits, and real estate photography in Oahu, Hawaii.",
        "url": "https://arcadiaphotography.replit.app/",
        "telephone": "+1-808-555-0123",
        "priceRange": "$$",
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
          "@type": "State",
          "name": "Hawaii"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://arcadiaphotography.replit.app/#website",
        "url": "https://arcadiaphotography.replit.app/",
        "name": "Arcadia Photography",
        "description": description,
        "publisher": {
          "@id": "https://arcadiaphotography.replit.app/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://arcadiaphotography.replit.app/portfolio?search={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  addStructuredData(structuredData);
}

// Enhanced SEO for specific page types
export function addPhotographyServiceStructuredData(serviceType: string, price: number) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${serviceType} Photography`,
    "description": `Professional ${serviceType.toLowerCase()} photography services in Oahu, Hawaii`,
    "provider": {
      "@type": "Organization",
      "@id": "https://arcadiaphotography.replit.app/#organization"
    },
    "areaServed": {
      "@type": "State",
      "name": "Hawaii"
    },
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  addStructuredData(structuredData);
}