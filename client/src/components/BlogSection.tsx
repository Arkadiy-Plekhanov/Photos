import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import type { BlogPost } from '../types';

const BlogSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver();

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Best Honolulu Wedding Venues for Your Elopement',
      excerpt: 'Discover the most romantic and picturesque wedding venues across Honolulu, from secluded beaches to luxury resorts, perfect for your intimate ceremony.',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300',
      date: 'March 15, 2024',
      readTime: '5 min read',
      slug: 'best-honolulu-wedding-venues',
    },
    {
      id: '2',
      title: 'Tips for Preparing Your Home for Real Estate Photos',
      excerpt: 'Learn the essential steps to prepare your property for professional photography, ensuring maximum appeal and faster sales in the competitive Honolulu market.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300',
      date: 'March 10, 2024',
      readTime: '7 min read',
      slug: 'real-estate-photo-prep-tips',
    },
    {
      id: '3',
      title: 'Top 5 Scenic Spots for Family Photos in Honolulu',
      excerpt: 'Explore the most beautiful and family-friendly locations across Honolulu for capturing memorable portraits, from hidden beaches to iconic landmarks.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300',
      date: 'March 5, 2024',
      readTime: '6 min read',
      slug: 'scenic-family-photo-spots-honolulu',
    },
  ];

  return (
    <section id="blog" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-ocean-blue mb-4">
            Latest <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-xl font-inter text-gray-600 max-w-3xl mx-auto">
            Photography tips, location guides, and behind-the-scenes stories from our adventures in paradise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover-scale"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <i className="fas fa-calendar-alt mr-2"></i>
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-playfair font-bold text-ocean-blue mb-3">
                  {post.title}
                </h3>

                <p className="text-gray-600 font-inter mb-4">{post.excerpt}</p>

                <a
                  href={`#blog/${post.slug}`}
                  className="inline-flex items-center font-inter font-semibold text-luxury-gold hover:text-sunset-orange transition-colors"
                >
                  Read More <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="#blog"
            className="bg-luxury-gold text-ocean-blue px-8 py-4 rounded-full font-inter font-semibold hover:bg-sunset-orange transition-colors duration-300 hover-scale"
          >
            View All Posts
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
