import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getTours } from '../services/api';
import PageTransition from '../components/PageTransition';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await getTours();
      setTours(response.data);
    } catch (error) {
      console.error('Error fetching tours:', error);
      setTours([
        {
          _id: '1',
          title: 'Yala National Park Safari',
          description: 'Experience the thrill of spotting leopards, elephants, and diverse bird species in Yala National Park. One of the best places in the world to see leopards in their natural habitat.',
          duration: 'Full Day',
          price: 15000,
          location: 'Yala',
          difficulty: 'Easy',
          maxParticipants: 6,
          includes: ['Park Entry', 'Expert Guide', 'Lunch', 'Transportation', 'Binoculars', 'Refreshments'],
          highlights: ['Leopard Spotting', 'Elephant Herds', 'Bird Watching', 'Photography'],
          bestTime: 'Early Morning / Evening',
        },
        {
          _id: '2',
          title: 'Udawalawe Elephant Safari',
          description: 'Witness majestic elephants in their natural habitat at Udawalawe National Park. Home to over 500 elephants, this park offers incredible opportunities for elephant watching.',
          duration: 'Half Day',
          price: 8000,
          location: 'Udawalawe',
          difficulty: 'Easy',
          maxParticipants: 8,
          includes: ['Park Entry', 'Expert Guide', 'Transportation', 'Refreshments'],
          highlights: ['Elephant Herds', 'Wildlife Photography', 'Scenic Views'],
          bestTime: 'Morning / Afternoon',
        },
        {
          _id: '3',
          title: 'Sinharaja Rainforest Tour',
          description: 'Explore the biodiversity hotspot of Sinharaja with guided nature walks. A UNESCO World Heritage Site with endemic species and pristine rainforest ecosystem.',
          duration: 'Full Day',
          price: 12000,
          location: 'Sinharaja',
          difficulty: 'Medium',
          maxParticipants: 10,
          includes: ['Park Entry', 'Nature Guide', 'Lunch', 'Transportation', 'Safety Equipment'],
          highlights: ['Endemic Birds', 'Rare Species', 'Nature Walks', 'Photography'],
          bestTime: 'Early Morning',
        },
        {
          _id: '4',
          title: 'Wilpattu Leopard Safari',
          description: 'Discover the largest national park in Sri Lanka, famous for its leopard population and natural lakes. Experience the wilderness in its purest form.',
          duration: 'Full Day',
          price: 18000,
          location: 'Wilpattu',
          difficulty: 'Medium',
          maxParticipants: 6,
          includes: ['Park Entry', 'Expert Guide', 'Lunch', 'Transportation', 'Binoculars'],
          highlights: ['Leopard Tracking', 'Natural Lakes', 'Wildlife Diversity'],
          bestTime: 'Early Morning',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filters = ['all', 'easy', 'medium', 'hard'];
  const filteredTours = selectedFilter === 'all' 
    ? tours 
    : tours.filter(tour => tour.difficulty.toLowerCase() === selectedFilter);

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
              🦁
            </motion.div>
            <p className="text-gray-600 text-lg">Loading amazing tours...</p>
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
        staggerChildren: 0.1,
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

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Header Section */}
        <section className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-28 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl"></div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Wildlife <span className="text-accent-300">Safari Tours</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Discover the wild beauty of Sri Lanka with our expert-guided safari experiences.
              From leopards to elephants, witness nature's greatest spectacles.
            </p>
          </motion.div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-white border-b border-gray-200 sticky top-20 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {filters.map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                    selectedFilter === filter
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Tours Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {filteredTours.map((tour, index) => (
                <motion.div
                  key={tour._id}
                  variants={cardVariants}
                  whileHover={{ y: -10, scale: 1.01 }}
                  className="card-premium overflow-hidden group"
                >
                  <div className="relative h-80 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 flex items-center justify-center overflow-hidden">
                    <motion.div
                      className="text-9xl opacity-20"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      🦁
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute top-6 right-6">
                      <span className="bg-white/95 text-primary-700 px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                        {tour.difficulty}
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                        {tour.title}
                      </h3>
                      <div className="flex items-center gap-4 text-white/90 text-sm">
                        <span className="flex items-center gap-1">
                          📍 {tour.location}
                        </span>
                        <span className="flex items-center gap-1">
                          ⏱️ {tour.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="text-gray-700 mb-6 leading-relaxed text-base">
                      {tour.description}
                    </p>
                    
                    {tour.highlights && tour.highlights.length > 0 && (
                      <div className="mb-6 pb-6 border-b border-gray-200">
                        <p className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
                          Tour Highlights
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {tour.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600">
                              <span className="text-primary-600 mr-2">✓</span>
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Best Time</p>
                        <p className="font-semibold text-gray-800">{tour.bestTime || 'All Day'}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Max Group Size</p>
                        <p className="font-semibold text-gray-800">{tour.maxParticipants} People</p>
                      </div>
                    </div>

                    {tour.includes && tour.includes.length > 0 && (
                      <div className="mb-6 pb-6 border-b border-gray-200">
                        <p className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
                          What's Included
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {tour.includes.map((item, idx) => (
                            <span
                              key={idx}
                              className="bg-primary-50 text-primary-700 px-3 py-1.5 rounded-lg text-xs font-medium"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-6">
                      <div>
                        <span className="text-sm text-gray-500 block">Starting from</span>
                        <p className="text-4xl font-bold text-primary-600">
                          LKR {tour.price.toLocaleString()}
                        </p>
                        <span className="text-xs text-gray-500">per person</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Book Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {filteredTours.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">No tours found for this filter.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Need a Custom Tour?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Contact us to create a personalized safari experience tailored to your preferences
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-600 px-10 py-4 rounded-lg font-semibold text-lg shadow-2xl hover:shadow-3xl inline-block transition-all duration-300"
              >
                Contact Us
              </motion.a>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Tours;
