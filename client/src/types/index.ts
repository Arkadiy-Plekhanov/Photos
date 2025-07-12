export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'wedding' | 'real-estate' | 'family' | 'commercial';
  image: string;
  description?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  slug: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  eventDate?: string;
  message: string;
}

export interface ContactSubmission {
  id: string;
  formData: ContactFormData;
  submittedAt: string;
  status: 'pending' | 'contacted' | 'completed';
}
