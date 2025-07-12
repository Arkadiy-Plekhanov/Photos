import { motion } from 'framer-motion';

const TrustBadges = () => {
  const badges = [
    { icon: 'fas fa-shield-alt', text: 'Fully Insured', subtext: 'Licensed in Hawaii' },
    { icon: 'fas fa-award', text: '50+ Awards', subtext: 'Industry Recognition' },
    { icon: 'fas fa-calendar-check', text: 'Book with Confidence', subtext: '100% Refund Guarantee' },
    { icon: 'fas fa-clock', text: '24-48hr Delivery', subtext: 'Fast Turnaround' },
  ];

  return (
    <section className="py-6 bg-ocean-blue/5 border-y border-ocean-blue/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <i className={`${badge.icon} text-2xl md:text-3xl text-ocean-blue mb-2`}></i>
              <h3 className="font-semibold text-sm md:text-base text-charcoal">{badge.text}</h3>
              <p className="text-xs text-charcoal/60">{badge.subtext}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;