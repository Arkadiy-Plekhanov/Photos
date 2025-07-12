import { motion } from 'framer-motion';
import { useScrollProgress } from '../hooks/useScrollProgress';

const ScrollProgress = () => {
  const scrollProgress = useScrollProgress();

  return (
    <motion.div
      className="scroll-progress"
      style={{
        scaleX: scrollProgress / 100,
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollProgress / 100 }}
      transition={{ duration: 0.1 }}
    />
  );
};

export default ScrollProgress;