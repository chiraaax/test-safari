import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
              alt="Safari Landscape" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-black/30" />
          </div>

          {/* Glass Title Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-4xl mx-auto px-4 text-center"
          >
            <div className="backdrop-blur-md bg-white/10 dark:bg-black/30 border border-white/20 p-8 md:p-12 rounded-3xl shadow-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Yala Safari Crew</span>
              </h1>
              <p className="text-lg md:text-2xl text-gray-100 font-light max-w-2xl mx-auto drop-shadow-md">
                Crafting unforgettable wildlife journeys in the heart of Sri Lanka.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ================= MAIN CONTENT ================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          
          {/* Section 1: Our Story (Image Left, Text Right) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24"
          >
            {/* Image Side */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-600 to-green-600 rounded-2xl opacity-30 blur-lg group-hover:opacity-50 transition duration-500"></div>
              <img 
                src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Rainforest" 
                className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
            </motion.div>

            {/* Text Side */}
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Our <span className="text-primary-600 dark:text-primary-400">Story</span>
              </h2>
              <div className="prose dark:prose-invert text-lg text-gray-600 dark:text-gray-300 space-y-4">
                <p>
                  Yala Safari Crew began with a simple passion: to show the world the untamed beauty of Sri Lanka. What started as a small team of wildlife enthusiasts has grown into a premier safari operator.
                </p>
                <p>
                  We believe that a safari is more than just a drive; it's a connection with nature. From the majestic elephants of Udawalawe to the elusive leopards of Yala, we curate experiences that leave a lasting imprint on your soul.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Section 2: Our Mission (Text Left, Image Right) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24"
          >
            {/* Text Side - Order 2 on mobile, 1 on desktop */}
            <motion.div variants={itemVariants} className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Our <span className="text-primary-600 dark:text-primary-400">Mission</span>
              </h2>
              <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border-l-4 border-primary-500">
                <p className="text-xl italic text-gray-700 dark:text-gray-300">
                  "To provide sustainable, educational, and exhilarating wildlife adventures that foster a deep appreciation for conservation and the natural world."
                </p>
              </div>
            </motion.div>

            {/* Image Side - Order 1 on mobile, 2 on desktop */}
            <motion.div variants={itemVariants} className="relative group order-1 lg:order-2">
               <div className="absolute -inset-4 bg-gradient-to-l from-primary-600 to-green-600 rounded-2xl opacity-30 blur-lg group-hover:opacity-50 transition duration-500"></div>
              <img 
                src="https://images.unsplash.com/photo-1581850518616-bcb8077a2536?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Elephant" 
                className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Section 3: Values Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-24"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Core Values</h2>
              <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🌿', title: 'Conservation', desc: 'Protecting habitats for future generations.' },
                { icon: '⭐', title: 'Excellence', desc: 'Top-tier service in every interaction.' },
                { icon: '🛡️', title: 'Safety', desc: 'Rigorous standards for your peace of mind.' },
                { icon: '🤝', title: 'Integrity', desc: 'Honest pricing and ethical practices.' },
              ].map((val, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-8 rounded-2xl text-center shadow-lg hover:shadow-xl hover:border-primary-400 transition-all duration-300"
                >
                  <div className="text-5xl mb-4">{val.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{val.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{val.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Section 4: Why Choose Us (Dark Glass Section) */}
          <motion.div
             variants={containerVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, amount: 0.2 }}
             className="relative rounded-3xl overflow-hidden"
          >
            {/* Background for this section */}
            <div className="absolute inset-0">
               <img src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover" alt="Background"/>
               <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm"></div>
            </div>

            <div className="relative z-10 p-10 md:p-16">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                Why Travelers Choose Us
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: 'Expert Guides', desc: 'Our naturalists have decades of field experience.', color: 'text-yellow-400' },
                  { title: 'Premium Fleet', desc: 'Modified 4x4 jeeps designed for photography and comfort.', color: 'text-blue-400' },
                  { title: 'Tailored Packages', desc: 'Itineraries customized to your specific interests.', color: 'text-green-400' },
                  { title: '24/7 Support', desc: 'We are with you every step of the journey.', color: 'text-red-400' },
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className={`mt-1 text-2xl ${item.color}`}>✓</div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link 
                  to="/contact" 
                  className="inline-block bg-white text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-primary-50 hover:scale-105 transition-all duration-300"
                >
                  Start Your Journey
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
};

export default About;