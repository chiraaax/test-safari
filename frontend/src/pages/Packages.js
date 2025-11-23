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
      setPackages([
        {
          _id: '1',
          name: 'Ultimate Wildlife Experience',
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
            <p className="text-gray-600 text-lg">Loading packages...</p>
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
      Luxury: 'bg-purple-100 text-purple-700',
      Family: 'bg-blue-100 text-blue-700',
      Budget: 'bg-green-100 text-green-700',
      Adventure: 'bg-orange-100 text-orange-700',
      Photography: 'bg-indigo-100 text-indigo-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
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
                  className="card-premium overflow-hidden group relative"
                >
                  <div
                    className={`relative h-64 bg-gradient-to-br ${getCategoryColor(
                      pkg.category
                    )} flex items-center justify-center overflow-hidden`}
                  >
                    <motion.div
                      className="text-8xl"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      📦
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <span
                      className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold ${getCategoryBadgeColor(
                        pkg.category
                      )}`}
                    >
                      {pkg.category}
                    </span>
                  </div>
                  <div className="p-8">
                    <h3 className="text-3xl font-bold mb-3 text-gray-800 group-hover:text-purple-600 transition-colors">
                      {pkg.name}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {pkg.description}
                    </p>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Duration:</span>
                        <span className="font-semibold text-gray-800">
                          {pkg.duration}
                        </span>
                      </div>
                      {pkg.destinations && pkg.destinations.length > 0 && (
                        <div>
                          <span className="text-gray-500 block mb-2">
                            Destinations:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {pkg.destinations.map((dest, index) => (
                              <span
                                key={index}
                                className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium"
                              >
                                {dest}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {pkg.highlights && pkg.highlights.length > 0 && (
                      <div className="mb-6 pb-6 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-700 mb-3">
                          Highlights:
                        </p>
                        <ul className="space-y-2">
                          {pkg.highlights.map((highlight, index) => (
                            <li
                              key={index}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <span className="text-green-500 mr-2">✓</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {pkg.includes && pkg.includes.length > 0 && (
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-gray-700 mb-3">
                          Includes:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {pkg.includes.map((item, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-xs"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                      <div>
                        <span className="text-sm text-gray-500">Starting from</span>
                        <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                          LKR {pkg.price.toLocaleString()}
                        </p>
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
      </div>
    </PageTransition>
  );
};

export default Packages;
