export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export const SEO_CONFIG: Record<string, SEOData> = {
  home: {
    title: "Arcadia Photography - Professional Wedding, Real Estate & Portrait Photography in Oahu, Hawaii",
    description: "Capturing breathtaking moments in Oahu, Hawaii. Specializing in wedding, real estate, and family portrait photography with luxury service. Book your session today!",
    keywords: "Oahu photography, Honolulu wedding photographer, Hawaii photographer, real estate photography Hawaii, family portraits Oahu",
    ogTitle: "Arcadia Photography - Where Stories Meet Paradise",
    ogDescription: "Professional wedding, real estate, and family photography services in Honolulu, Hawaii. Capturing your story in paradise.",
    ogImage: "/api/placeholder/1200/630"
  },
  wedding: {
    title: "Wedding Photography in Oahu, Hawaii | Arcadia Photography",
    description: "Luxury wedding photography in Oahu, Hawaii. Capturing your special day with breathtaking beach venues, professional service, and timeless memories. View packages and book now!",
    keywords: "Oahu wedding photographer, Hawaii wedding photography, Honolulu wedding photographer, beach wedding photography, luxury wedding photography",
    ogTitle: "Wedding Photography in Paradise - Arcadia Photography",
    ogDescription: "Capturing love stories in Oahu's most stunning locations. Professional wedding photography with luxury service.",
    ogImage: "/api/placeholder/1200/630"
  },
  realestate: {
    title: "Real Estate Photography in Oahu, Hawaii | Arcadia Photography",
    description: "Professional real estate photography in Oahu and Honolulu. High-quality property photos that help homes sell faster. Serving real estate agents across Hawaii.",
    keywords: "Hawaii real estate photography, Oahu property photography, Honolulu real estate photographer, property marketing photos",
    ogTitle: "Real Estate Photography - Arcadia Photography",
    ogDescription: "Professional real estate photography in Oahu that helps properties sell faster with stunning visuals.",
    ogImage: "/api/placeholder/1200/630"
  },
  family: {
    title: "Family Portrait Photography in Oahu, Hawaii | Arcadia Photography",
    description: "Beautiful family portrait sessions in Oahu, Hawaii. Capturing precious moments with professional photography at stunning beach locations and scenic spots.",
    keywords: "Oahu family photographer, Hawaii family portraits, Honolulu family photography, beach family photos",
    ogTitle: "Family Portrait Photography - Arcadia Photography",
    ogDescription: "Creating beautiful family memories in Oahu's most picturesque locations with professional photography.",
    ogImage: "/api/placeholder/1200/630"
  },
  about: {
    title: "About Arcadia Photography - Professional Oahu Photographer",
    description: "Meet the team behind Arcadia Photography. Award-winning photographers specializing in weddings, real estate, and family portraits in Oahu, Hawaii.",
    keywords: "Oahu photographer, Hawaii photography team, professional photographer Honolulu",
    ogTitle: "About Arcadia Photography",
    ogDescription: "Award-winning photographers capturing life's precious moments in Oahu, Hawaii.",
    ogImage: "/api/placeholder/1200/630"
  },
  portfolio: {
    title: "Photography Portfolio | Arcadia Photography Oahu, Hawaii",
    description: "View our stunning photography portfolio featuring weddings, real estate, and family portraits shot in Oahu's most beautiful locations.",
    keywords: "photography portfolio Hawaii, Oahu photography gallery, wedding portfolio Hawaii",
    ogTitle: "Photography Portfolio - Arcadia Photography",
    ogDescription: "Stunning photography portfolio showcasing our work across Oahu, Hawaii.",
    ogImage: "/api/placeholder/1200/630"
  },
  blog: {
    title: "Photography Blog | Tips & Inspiration from Oahu | Arcadia Photography",
    description: "Photography tips, location guides, and inspiration from Oahu's premier photographers. Learn about the best photo spots and techniques in Hawaii.",
    keywords: "Hawaii photography tips, Oahu photo locations, wedding photography blog Hawaii",
    ogTitle: "Photography Blog - Arcadia Photography",
    ogDescription: "Photography tips and inspiration from Oahu's beautiful locations and our professional experiences.",
    ogImage: "/api/placeholder/1200/630"
  },
  contact: {
    title: "Contact Arcadia Photography | Book Your Oahu Photography Session",
    description: "Ready to capture your special moments? Contact Arcadia Photography to book your wedding, real estate, or family photography session in Oahu, Hawaii.",
    keywords: "book photographer Oahu, contact Hawaii photographer, photography inquiry Honolulu",
    ogTitle: "Contact Arcadia Photography",
    ogDescription: "Ready to capture your special moments in Oahu? Get in touch to book your photography session.",
    ogImage: "/api/placeholder/1200/630"
  },
  faq: {
    title: "Frequently Asked Questions | Arcadia Photography Oahu",
    description: "Get answers to common questions about our photography services in Oahu, Hawaii. Learn about pricing, packages, and what to expect.",
    keywords: "photography FAQ Hawaii, Oahu photographer questions, photography pricing Hawaii",
    ogTitle: "FAQ - Arcadia Photography",
    ogDescription: "Frequently asked questions about our photography services in Oahu, Hawaii.",
    ogImage: "/api/placeholder/1200/630"
  }
};

export function updateSEO(pageKey: string) {
  const seoData = SEO_CONFIG[pageKey];
  if (!seoData) return;

  // Update title
  document.title = seoData.title;

  // Update meta description
  updateMetaTag('description', seoData.description);

  // Update keywords if provided
  if (seoData.keywords) {
    updateMetaTag('keywords', seoData.keywords);
  }

  // Update Open Graph tags
  updateMetaTag('og:title', seoData.ogTitle || seoData.title, 'property');
  updateMetaTag('og:description', seoData.ogDescription || seoData.description, 'property');
  
  if (seoData.ogImage) {
    updateMetaTag('og:image', seoData.ogImage, 'property');
  }
}

function updateMetaTag(name: string, content: string, attribute: string = 'name') {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
}