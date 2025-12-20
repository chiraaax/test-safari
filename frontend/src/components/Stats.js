import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { number: '15+', label: 'Years Guiding Yala', detail: 'Seasoned, local expertise year-round.' },
    { number: '50K+', label: 'Guest Safaris Led', detail: 'Families, photographers, and luxury travelers.' },
    { number: '98%', label: 'Guest Happiness', detail: 'Post-trip surveys and repeat bookings.' },
    { number: '4.9/5', label: 'Average Reviews', detail: 'Verified ratings across major platforms.' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[-3rem] w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary-200/80 mb-3">Proof in the Tracks</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Outcomes Our Guests <span className="text-primary-400">Feel</span>
          </h2>
          <p className="text-lg text-gray-200/90 max-w-2xl mx-auto">
            Field-tested experience, consistent care, and data-backed guest happiness.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-lg shadow-black/20 hover:-translate-y-1 hover:border-primary-400/60 transition"
            >
              <div className="h-1 w-12 bg-gradient-to-r from-primary-400 to-emerald-400 rounded-full mb-4 group-hover:w-16 transition-all" />
              <motion.div
                className="text-4xl md:text-5xl font-extrabold mb-3 text-primary-200"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: index * 0.15, duration: 0.4 }}
              >
                {stat.number}
              </motion.div>
              <p className="text-lg font-semibold text-white mb-2">{stat.label}</p>
              <p className="text-sm text-gray-200/80 leading-relaxed">{stat.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;

