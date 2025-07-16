import { useParams } from 'wouter';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useSEO } from '../hooks/useSEO';

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  useSEO('blog');

  // Sample blog post data - in a real app, this would come from an API
  const blogPosts = {
    '1': {
      title: 'Best Honolulu Wedding Venues for Your Elopement',
      content: `
        <p>Planning your dream wedding in Honolulu? Hawaii offers some of the most romantic and picturesque venues for your special day. From secluded beaches to luxury resorts, here are the top venues we recommend for your elopement.</p>
        
        <h3>1. Lanikai Beach</h3>
        <p>Known for its pristine white sand and turquoise waters, Lanikai Beach provides an intimate setting for your ceremony. The soft sand beneath your feet and the gentle sound of waves create the perfect romantic atmosphere.</p>
        
        <h3>2. Diamond Head Crater</h3>
        <p>For couples seeking dramatic backdrops, Diamond Head offers stunning panoramic views of Honolulu and the Pacific Ocean. The sunrise ceremonies here are particularly magical.</p>
        
        <h3>3. Turtle Bay Resort</h3>
        <p>This luxury resort on Oahu's North Shore combines elegance with natural beauty. Their beachfront ceremony locations offer both privacy and spectacular sunset views.</p>
        
        <h3>Photography Tips for Your Venue</h3>
        <p>Each venue requires different photography approaches. Beach weddings benefit from golden hour lighting, while resort venues offer more controlled lighting conditions. Our team knows exactly how to capture the beauty of each location.</p>
        
        <p>Ready to plan your perfect Honolulu wedding? Contact us today to discuss how we can capture your special day at any of these stunning venues.</p>
      `,
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80',
      date: 'March 15, 2024',
      readTime: '5 min read',
      category: 'Wedding Tips',
      author: 'John Arcadia'
    },
    '2': {
      title: 'Tips for Preparing Your Home for Real Estate Photos',
      content: `
        <p>First impressions matter in real estate, and professional photography can make the difference between a quick sale and a listing that sits on the market. Here are essential tips to prepare your property for our photo shoot.</p>
        
        <h3>Declutter and Depersonalize</h3>
        <p>Remove personal items, family photos, and excess furniture. Potential buyers need to envision themselves in the space, not be distracted by your personal belongings.</p>
        
        <h3>Deep Clean Everything</h3>
        <p>A spotless home photographs beautifully. Pay special attention to windows, mirrors, and surfaces that reflect light. Clean appliances will shine in photos.</p>
        
        <h3>Lighting is Key</h3>
        <p>Open all curtains and blinds. Turn on all lights, including lamps and overhead lighting. Good lighting makes spaces appear larger and more inviting.</p>
        
        <h3>Stage for Success</h3>
        <p>Arrange furniture to create natural pathways and showcase the room's functionality. Fresh flowers and plants can add life to the space.</p>
        
        <p>Following these simple steps will ensure your property looks its absolute best in our professional photographs, helping you attract more potential buyers and sell faster.</p>
      `,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
      date: 'March 10, 2024',
      readTime: '7 min read',
      category: 'Real Estate',
      author: 'Sarah Chen'
    },
    '3': {
      title: 'Top 5 Scenic Spots for Family Photos in Honolulu',
      content: `
        <p>Honolulu offers countless beautiful locations for family photography. Here are our top 5 recommendations for creating stunning family portraits that capture both your loved ones and Hawaii's natural beauty.</p>
        
        <h3>1. Waikiki Beach</h3>
        <p>The iconic Waikiki Beach provides a classic Hawaiian backdrop with Diamond Head in the distance. Early morning sessions offer the best lighting and fewer crowds.</p>
        
        <h3>2. Kapiolani Park</h3>
        <p>This spacious park offers lush green lawns and beautiful banyan trees. It's perfect for active families and children who need room to play naturally.</p>
        
        <h3>3. Tantalus Lookout</h3>
        <p>For families who love panoramic views, Tantalus offers breathtaking vistas of Honolulu and the ocean. The elevated location provides dramatic backdrops.</p>
        
        <h3>4. Koko Head District Park</h3>
        <p>This location offers diverse landscapes from sandy beaches to volcanic formations. The unique geology creates interesting textures and colors in photos.</p>
        
        <h3>5. Lyon Arboretum</h3>
        <p>For families who prefer lush, tropical settings, the arboretum provides beautiful botanical backgrounds with diverse plant life and peaceful pathways.</p>
        
        <p>Each location offers unique advantages for family photography. Contact us to discuss which location would work best for your family's style and preferences.</p>
      `,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80',
      date: 'March 5, 2024',
      readTime: '6 min read',
      category: 'Family Photography',
      author: 'John Arcadia'
    }
  };

  const post = id ? blogPosts[id as keyof typeof blogPosts] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-warm-white dark:bg-gray-900">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-playfair font-bold text-ocean-blue dark:text-white mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The blog post you're looking for doesn't exist or may have been moved.
          </p>
          <a
            href="/blog"
            className="bg-luxury-gold text-ocean-blue px-6 py-3 rounded-full font-inter font-semibold hover:bg-sunset-orange transition-colors duration-300"
          >
            Back to Blog
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-white dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage: `url('${post.image}')`
          }}
        />
        <div className="absolute inset-0 bg-ocean-blue/40 dark:bg-black/60" />
        <div className="relative z-10 text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-luxury-gold text-ocean-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-gray-300">
              <span>By {post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg max-w-none dark:prose-invert"
          >
            <div
              className="text-gray-700 dark:text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.article>
          
          {/* Back to Blog */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <a
              href="/blog"
              className="bg-luxury-gold text-ocean-blue px-8 py-4 rounded-full font-inter font-semibold hover:bg-sunset-orange transition-colors duration-300"
            >
              ← Back to All Posts
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPostPage;