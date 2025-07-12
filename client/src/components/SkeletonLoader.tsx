import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  className?: string;
}

export const SkeletonLoader = ({ 
  width = '100%', 
  height = '200px', 
  className = '' 
}: SkeletonLoaderProps) => {
  return (
    <motion.div 
      className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg ${className}`}
      style={{ width, height }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

export default SkeletonLoader;