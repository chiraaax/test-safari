import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPackages } from '../services/api';
import PageTransition from '../components/PageTransition';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await getPackages();
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
      // 🔥 FALLBACK DATA (now includes images)
      setPackages([
        {
          _id: '1',
          name: 'Ultimate Wildlife Experience',
          image: '/images/ultimate-wildlife.jpg',
          description: 'A comprehensive 3-day package covering multiple national parks with luxury accommodation.',
          duration: '3 Days / 2 Nights',
          price: 45000,
          destinations: ['Yala', 'Udawalawe', 'Bundala'],
          category: 'Luxury',
          includes: [
            'Accommodation',
            'All Meals',
            'Park Entries',
            'Expert Guide',
            'Transportation',
          ],
          highlights: [
            'Leopard Spotting',
            'Elephant Herds',
            'Bird Watching',
            'Sunset Safari',
          ],
        },
        {
          _id: '2',
          name: 'Family Safari Adventure',
          image: '/images/family-safari.webp',
          description: 'Perfect family-friendly package with comfortable accommodations and kid-friendly activities.',
          duration: '2 Days / 1 Night',
          price: 30000,
          destinations: ['Udawalawe', 'Yala'],
          category: 'Family',
          includes: [
            'Family Accommodation',
            'Meals',
            'Park Entries',
            'Child-Friendly Guide',
            'Transportation',
          ],
          highlights: [
            'Elephant Watching',
            'Educational Tours',
            'Safe Safari Experience',
            'Family Activities',
          ],
        },
        {
          _id: '3',
          name: 'Budget Safari Explorer',
          image: '/images/budget-safari.jpg',
          description: 'Affordable package for budget-conscious travelers without compromising on the experience.',
          duration: '1 Day',
          price: 12000,
          destinations: ['Yala'],
          category: 'Budget',
          includes: ['Park Entry', 'Guide', 'Lunch', 'Transportation'],
          highlights: [
            'Full Day Safari',
            'Wildlife Spotting',
            'Photography',
            'Expert Guide',
          ],
        },
        {
          _id: '4',
          name: 'Photography Safari Package',
          image: '/images/photography-safari.jpg',
          description: 'Designed for photography enthusiasts with special access and timing for best shots.',
          duration: '2 Days / 1 Night',
          price: 35000,
          destinations: ['Yala', 'Bundala'],
          category: 'Photography',
          includes: [
            'Accommodation',
            'Meals',
            'Park Entries',
            'Photography Guide',
            'Transportation',
            'Early Morning Access',
          ],
          highlights: [
            'Golden Hour Access',
            'Best Photography Spots',
            'Professional Tips',
            'Wildlife Photography',
          ],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              📦
            </motion.div>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Loading packages...</p>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const getCategoryColor = (category) => {
    const colors = {
      Luxury: 'from-purple-500 to-pink-500',
      Family: 'from-blue-500 to-cyan-500',
      Budget: 'from-green-500 to-emerald-500',
      Adventure: 'from-orange-500 to-red-500',
      Photography: 'from-indigo-500 to-purple-500',
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  const getCategoryBadgeColor = (category) => {
    const colors = {
      Luxury: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
      Family: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      Budget: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      Adventure: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
      Photography: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
    };
    return colors[category] || 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300';
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header Section */}
        <section className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Safari <span className="text-accent-300">Packages</span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-2xl mx-auto">
              All-inclusive packages for the ultimate safari experience
            </p>
          </motion.div>
        </section>

        {/* Packages Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
            >
              {packages.map((pkg) => (
                <motion.div
                  key={pkg._id}
                  variants={cardVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="card-premium overflow-hidden group relative bg-white dark:bg-gray-800/90 border-gray-200 dark:border-gray-700/50 rounded-xl shadow-xl border"
                >
                  {/* 🔥 IMAGE SECTION - Updated with real images */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <span
                      className={`absolute top-6 right-6 px-4 py-2 rounded-full text-sm font-semibold ${getCategoryBadgeColor(
                        pkg.category
                      )}`}
                    >
                      {pkg.category}
                    </span>

                    {/* Package Info Overlay */}
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-3xl font-bold mb-1">{pkg.name}</h3>
                      <div className="flex gap-4 text-sm opacity-90">
                        <span>⏱️ {pkg.duration}</span>
                        {pkg.destinations && pkg.destinations.length > 0 && (
                          <span>📍 {pkg.destinations[0]}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-8">
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                      {pkg.description}
                    </p>

                    {/* Destinations */}
                    {pkg.destinations && pkg.destinations.length > 0 && (
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-gray-700 dark:text-white mb-3">
                          Destinations:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {pkg.destinations.map((dest, index) => (
                            <span
                              key={index}
                              className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-lg text-sm font-medium"
                            >
                              {dest}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Highlights */}
                    {pkg.highlights && pkg.highlights.length > 0 && (
                      <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700/50">
                        <p className="text-sm font-semibold text-gray-700 dark:text-white mb-3">
                          Highlights:
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {pkg.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center text-sm">
                              <span className="text-primary-600 mr-2">✓</span>
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Includes */}
                    {pkg.includes && pkg.includes.length > 0 && (
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-gray-700 dark:text-white mb-3">
                          Includes:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {pkg.includes.map((item, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 px-3 py-1 rounded text-xs"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Price + Button */}
                    <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700/50">
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Starting from</span>
                        <p className="text-4xl font-bold text-primary-600">
                          LKR {pkg.price.toLocaleString()}
                        </p>
                        <span className="text-xs opacity-70">per person</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`bg-gradient-to-r ${getCategoryColor(
                          pkg.category
                        )} text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                      >
                        Book Package
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
              <h2 className="text-5xl font-bold mb-6">Custom Package Needed?</h2>
              <p className="text-xl opacity-90 mb-10">
                Let us create a personalized safari package just for you.
              </p>
              <a
                href="/contact"
                className="bg-white text-purple-600 px-10 py-4 rounded-lg font-semibold inline-block shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Get Custom Quote
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Packages;