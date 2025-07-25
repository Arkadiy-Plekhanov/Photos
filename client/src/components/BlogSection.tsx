import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Link } from 'wouter';
import { useState } from 'react';

const BlogSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver();

  const [activeFilter, setActiveFilter] = useState<string>('all');

  const blogPosts = [
    {
      id: '1',
      title: 'Best Honolulu Wedding Venues for Your Elopement',
      excerpt: 'Discover the most romantic and picturesque wedding venues across Honolulu, from secluded beaches to luxury resorts, perfect for your intimate ceremony.',
      image: '/images/blog/blog-1.jpg',
      date: 'March 15, 2024',
      readTime: '5 min read',
      slug: 'best-honolulu-wedding-venues',
      category: 'wedding',
    },
    {
      id: '2',
      title: 'Tips for Preparing Your Home for Real Estate Photos',
      excerpt: 'Learn the essential steps to prepare your property for professional photography, ensuring maximum appeal and faster sales in the competitive Honolulu market.',
      image: '/images/blog/blog-2.jpg',
      date: 'March 10, 2024',
      readTime: '7 min read',
      slug: 'real-estate-photo-prep-tips',
      category: 'real-estate',
    },
    {
      id: '3',
      title: 'Top 5 Scenic Spots for Family Photos in Honolulu',
      excerpt: 'Explore the most beautiful and family-friendly locations across Honolulu for capturing memorable portraits, from hidden beaches to iconic landmarks.',
      image: '/images/blog/blog-3.jpg',
      date: 'March 5, 2024',
      readTime: '6 min read',
      slug: 'scenic-family-photo-spots-honolulu',
      category: 'family',
    },
  ];

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'wedding', label: 'Wedding Tips' },
    { key: 'real-estate', label: 'Real Estate' },
    { key: 'family', label: 'Family' },
  ];

  const filteredPosts = activeFilter === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeFilter);

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

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {filters.map(filter => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-3 rounded-full font-inter font-semibold transition-colors duration-300 ${
                  activeFilter === filter.key
                    ? 'bg-luxury-gold text-ocean-blue'
                    : 'bg-white text-ocean-blue hover:bg-luxury-gold'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow-lg overflow-hidden hover-scale"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <i className="fas fa-calendar-alt mr-2" aria-hidden="true"></i>
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-playfair font-bold text-ocean-blue dark:text-white mb-3">
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 font-inter mb-4">{post.excerpt}</p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center font-inter font-semibold text-luxury-gold hover:text-sunset-orange transition-colors"
                >
                  Read More <i className="fas fa-arrow-right ml-2" aria-hidden="true"></i>
                </Link>
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
          <Link
            href="/blog"
            className="bg-luxury-gold text-ocean-blue px-8 py-4 rounded-full font-inter font-semibold hover:bg-sunset-orange transition-colors duration-300 hover-scale"
          >
            View All Posts
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
