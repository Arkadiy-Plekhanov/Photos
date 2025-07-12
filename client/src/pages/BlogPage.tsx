import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card } from '@/components/ui/card';
import { Link } from 'wouter';

const BlogPage = () => {
  const blogPosts = [
    {
      id: '1',
      title: 'Best Honolulu Wedding Venues for Your Elopement',
      excerpt: 'Discover the most romantic and picturesque wedding venues across Honolulu, from secluded beaches to luxury resorts.',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&q=80',
      date: 'March 15, 2024',
      readTime: '5 min read',
      category: 'Wedding Tips',
      author: 'John Arcadia'
    },
    {
      id: '2',
      title: 'Tips for Preparing Your Home for Real Estate Photos',
      excerpt: 'Learn the essential steps to prepare your property for professional photography.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&q=80',
      date: 'March 10, 2024',
      readTime: '7 min read',
      category: 'Real Estate',
      author: 'Sarah Chen'
    },
    {
      id: '3',
      title: 'Top 5 Scenic Spots for Family Photos in Honolulu',
      excerpt: 'Explore the most beautiful and family-friendly locations across Honolulu.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&q=80',
      date: 'March 5, 2024',
      readTime: '6 min read',
      category: 'Family Photography',
      author: 'John Arcadia'
    },
    {
      id: '4',
      title: 'Behind the Lens: A Day in the Life of a Wedding Photographer',
      excerpt: 'Get an inside look at what goes into capturing your special day.',
      image: 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=600&h=400&q=80',
      date: 'February 28, 2024',
      readTime: '8 min read',
      category: 'Behind the Scenes',
      author: 'John Arcadia'
    },
    {
      id: '5',
      title: 'Understanding Commercial Photography Usage Rights',
      excerpt: 'Everything you need to know about licensing and usage rights for commercial photography.',
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=400&q=80',
      date: 'February 20, 2024',
      readTime: '10 min read',
      category: 'Business',
      author: 'Sarah Chen'
    },
    {
      id: '6',
      title: 'Golden Hour Photography: Making the Most of Hawaii\'s Light',
      excerpt: 'Learn how to leverage Hawaii\'s stunning natural light for incredible photos.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&q=80',
      date: 'February 15, 2024',
      readTime: '5 min read',
      category: 'Photography Tips',
      author: 'John Arcadia'
    }
  ];

  const categories = ['All', 'Wedding Tips', 'Real Estate', 'Family Photography', 'Behind the Scenes', 'Business', 'Photography Tips'];

  return (
    <div className="min-h-screen bg-warm-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1920&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-ocean-blue/40" />
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-playfair font-bold mb-4"
          >
            Photography Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-inter"
          >
            Tips, Stories, and Insights from Arcadia Photography
          </motion.p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full border border-ocean-blue text-ocean-blue hover:bg-ocean-blue hover:text-white transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
                  <div className="aspect-[3/2] overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-sm text-charcoal/60 mb-3">
                      <span className="bg-ocean-blue/10 text-ocean-blue px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-xl font-playfair font-semibold mb-3">
                      {post.title}
                    </h2>
                    <p className="text-charcoal/70 mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-charcoal/60">
                        <p>{post.author}</p>
                        <p>{post.date}</p>
                      </div>
                      <button className="text-ocean-blue hover:text-luxury-gold transition-colors">
                        Read More <i className="fas fa-arrow-right ml-1"></i>
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-12">
            <button className="px-4 py-2 bg-ocean-blue text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
              2
            </button>
            <button className="px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
              3
            </button>
            <button className="px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-playfair mb-6">
            Stay Updated
          </h2>
          <p className="text-lg text-charcoal/70 mb-8">
            Subscribe to our newsletter for photography tips, location guides, and special offers
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-ocean-blue"
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-ocean-blue text-white rounded-lg hover:bg-ocean-blue/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;