import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Testimonials from '../components/Testimonials';
import Stats from '../components/Stats';
import Newsletter from '../components/Newsletter';

const heroImages = [
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Elephant
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Leopard/Cat
  "https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Jeep Safari
  "https://images.unsplash.com/photo-1504221507732-5246c045949b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"  // Landscape
];

const Home = () => {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const featuresRef = useRef(null);
  
  const [currentSlide, setCurrentSlide] = useState(0);

  // Cycle through images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.2 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });

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
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="overflow-hidden">
      {/* ================= HERO SECTION ================= */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-20 pt-0"
      >
        {/* 1. Background Image Slider */}
        <div className="absolute inset-0 z-0 top-0">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
            />
          </AnimatePresence>
          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>

        {/* 2. Animated Blobs (Behind Glass) */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/30 rounded-full blur-[100px]"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/30 rounded-full blur-[100px]"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* 3. Liquid Glass Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex justify-center">
          {heroInView && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="w-full max-w-4xl"
            >
              {/* GLASS CARD START */}
              <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 shadow-2xl rounded-3xl p-8 md:p-12 text-center overflow-hidden relative">
                
                {/* Glossy Reflection Effect */}
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

                <motion.div variants={itemVariants}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-block mb-4 px-4 py-1 rounded-full border border-white/30 bg-white/5 backdrop-blur-md"
                  >
                    <span className="text-primary-100 text-sm md:text-base font-semibold tracking-widest uppercase drop-shadow-md">
                      Premium Wildlife Safari Experiences
                    </span>
                  </motion.div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <motion.h1
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    Discover Sri Lanka's
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-white filter drop-shadow-lg">
                      Wild Wonders
                    </span>
                  </motion.h1>
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  className="text-lg md:text-xl lg:text-2xl mb-10 text-gray-100 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md"
                >
                  Embark on unforgettable safari adventures with expert guides,
                  luxury accommodations, and exclusive wildlife encounters.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/tours"
                      className="btn-primary text-lg px-8 py-3 rounded-xl shadow-lg shadow-primary-900/50 border border-transparent hover:border-primary-400 transition-all"
                    >
                      Explore Our Tours
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/packages"
                      className="bg-white/10 backdrop-blur-md border border-white/40 text-white text-lg px-8 py-3 rounded-xl hover:bg-white/20 transition-all shadow-lg"
                    >
                      View Packages
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Trust Indicators inside Glass */}
                <motion.div
                  variants={itemVariants}
                  className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center items-center gap-6 md:gap-12 text-gray-200 text-sm font-medium"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-accent-300 text-xl">✓</span>
                    <span className="drop-shadow-sm">15+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent-300 text-xl">✓</span>
                    <span className="drop-shadow-sm">50K+ Happy Customers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent-300 text-xl">✓</span>
                    <span className="drop-shadow-sm">Expert Guides</span>
                  </div>
                </motion.div>
              </div> 
              {/* GLASS CARD END */}
            </motion.div>
          )}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm bg-black/10">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <Stats />

      {/* Features Section */}
      <section ref={servicesRef} className="section-padding bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
              Our <span className="text-gradient">Premium Services</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the best of Sri Lankan wildlife with our expertly curated services
            </p>
          </motion.div>

          {servicesInView && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
            >
              {[
                {
                  icon: '🦁',
                  title: 'Wildlife Safari Tours',
                  description:
                    'Discover amazing wildlife in their natural habitat with our expert guides and premium safari experiences. From leopards to elephants, witness nature\'s greatest spectacles.',
                  link: '/tours',
                  gradient: 'from-orange-500 to-red-600',
                  features: ['Expert Guides', 'Premium Vehicles', 'Guaranteed Sightings'],
                },
                {
                  icon: '🚗',
                  title: 'Luxury Car Rentals',
                  description:
                    'Comfortable and reliable transportation for your safari adventures with our modern fleet of 4WD vehicles, SUVs, and luxury jeeps.',
                  link: '/rentals',
                  gradient: 'from-blue-500 to-cyan-600',
                  features: ['4WD Vehicles', 'GPS Navigation', '24/7 Support'],
                },
                {
                  icon: '📦',
                  title: 'All-Inclusive Packages',
                  description:
                    'Comprehensive safari packages designed for the ultimate experience with luxury accommodations, meals, and exclusive wildlife encounters.',
                  link: '/packages',
                  gradient: 'from-purple-500 to-pink-600',
                  features: ['Luxury Stays', 'All Meals', 'Full Support'],
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="card-premium p-8 text-center group cursor-pointer h-full flex flex-col bg-white dark:bg-gray-800/90 border-gray-200 dark:border-gray-700/50"
                >
                  <motion.div
                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-5xl shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed flex-grow">
                    {service.description}
                  </p>
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Includes:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {service.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    to={service.link}
                    className="inline-flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors"
                  >
                    Learn More
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section ref={featuresRef} className="section-padding bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
              Why Choose <span className="text-gradient">Muthugala Tours?</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We provide exceptional experiences that create lasting memories
            </p>
          </motion.div>

          {featuresInView && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {[
                {
                  icon: '⭐',
                  title: 'Expert Guides',
                  description: 'Experienced wildlife experts with deep knowledge',
                  color: 'text-yellow-500',
                  bg: 'bg-yellow-50',
                },
                {
                  icon: '🛡️',
                  title: 'Safe & Secure',
                  description: 'Your safety is our top priority',
                  color: 'text-blue-500',
                  bg: 'bg-blue-50',
                },
                {
                  icon: '💰',
                  title: 'Best Prices',
                  description: 'Competitive pricing with no hidden costs',
                  color: 'text-green-500',
                  bg: 'bg-green-50',
                },
                {
                  icon: '❤️',
                  title: 'Memorable Experience',
                  description: 'Unforgettable adventures guaranteed',
                  color: 'text-red-500',
                  bg: 'bg-red-50',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`text-center p-8 rounded-2xl ${feature.bg} dark:bg-gray-800/70 border-2 border-transparent hover:border-primary-200 dark:hover:border-primary-600/50 hover:shadow-xl dark:hover:shadow-primary-900/20 transition-all duration-300`}
                >
                  <motion.div
                    className={`text-6xl mb-4 ${feature.color}`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready for Your Adventure?
            </h2>
            <p className="text-xl text-primary-100 dark:text-gray-200 mb-8 max-w-2xl mx-auto">
              Book your safari experience today and create memories that last a lifetime.
              Our expert team is ready to make your wildlife dreams come true.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="bg-white text-primary-600 px-10 py-4 rounded-lg font-semibold text-lg shadow-2xl hover:shadow-3xl inline-block transition-all duration-300"
                >
                  Get Started Now
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/tours"
                  className="bg-primary-800/50 backdrop-blur-sm text-white border-2 border-white/30 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-primary-800/70 inline-block transition-all duration-300"
                >
                  Browse Tours
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default Home;