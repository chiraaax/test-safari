import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getRentals } from '../services/api';
import PageTransition from '../components/PageTransition';

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const response = await getRentals();
      setRentals(response.data);
    } catch (error) {
      console.error('Error fetching rentals:', error);
      setRentals([
        {
          _id: '1',
          vehicleName: 'Toyota Land Cruiser',
          vehicleType: 'SUV',
          description: 'Perfect for safari adventures with excellent off-road capabilities. Spacious interior with comfortable seating for up to 7 passengers. Equipped with modern amenities.',
          pricePerDay: 12000,
          capacity: 7,
          features: ['4WD', 'AC', 'GPS Navigation', 'Comfortable Seats', 'Extra Storage', 'USB Charging'],
          available: true,
          year: '2022',
          fuel: 'Diesel',
        },
        {
          _id: '2',
          vehicleName: 'Mitsubishi Montero',
          vehicleType: 'SUV',
          description: 'Spacious and reliable vehicle for family safari trips. Excellent ground clearance and powerful engine for challenging terrains.',
          pricePerDay: 10000,
          capacity: 8,
          features: ['4WD', 'AC', 'GPS Navigation', 'Extra Storage', 'Child Seats Available'],
          available: true,
          year: '2021',
          fuel: 'Diesel',
        },
        {
          _id: '3',
          vehicleName: 'Toyota Hiace Van',
          vehicleType: 'Van',
          description: 'Ideal for large groups with comfortable seating and ample luggage space. Perfect for extended safari tours with multiple destinations.',
          pricePerDay: 15000,
          capacity: 12,
          features: ['AC', 'GPS Navigation', 'Spacious Interior', 'Luggage Space', 'Reclining Seats'],
          available: true,
          year: '2023',
          fuel: 'Diesel',
        },
        {
          _id: '4',
          vehicleName: 'Safari Open-Top Jeep',
          vehicleType: 'Jeep',
          description: 'Open-top jeep for the ultimate safari experience. Perfect for photography enthusiasts and wildlife viewing. Unobstructed views of nature.',
          pricePerDay: 8000,
          capacity: 6,
          features: ['Open Top', '4WD', 'Photography Friendly', 'Binoculars Included'],
          available: true,
          year: '2022',
          fuel: 'Diesel',
        },
        {
          _id: '5',
          vehicleName: 'Luxury Range Rover',
          vehicleType: 'Luxury',
          description: 'Premium luxury vehicle for discerning travelers. Ultimate comfort and style for your safari adventure with all modern amenities.',
          pricePerDay: 25000,
          capacity: 5,
          features: ['4WD', 'Premium AC', 'GPS', 'Leather Seats', 'Premium Sound System', 'WiFi'],
          available: true,
          year: '2023',
          fuel: 'Diesel',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const vehicleTypes = ['all', 'SUV', 'Van', 'Jeep', 'Luxury'];
  const filteredRentals = selectedType === 'all'
    ? rentals
    : rentals.filter(rental => rental.vehicleType.toLowerCase() === selectedType.toLowerCase());

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
              🚗
            </motion.div>
            <p className="text-gray-600 text-lg">Loading vehicles...</p>
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

  const getTypeColor = (type) => {
    const colors = {
      SUV: 'from-blue-500 to-cyan-600',
      Van: 'from-purple-500 to-pink-600',
      Jeep: 'from-orange-500 to-red-600',
      Luxury: 'from-amber-500 to-yellow-600',
    };
    return colors[type] || 'from-gray-500 to-gray-600';
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header Section */}
        <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-800 text-white py-28 overflow-hidden">
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
              Premium <span className="text-accent-300">Vehicle Rentals</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Reliable, comfortable, and well-maintained vehicles for your safari adventures.
              Choose from our modern fleet of 4WD vehicles, SUVs, and luxury options.
            </p>
          </motion.div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-20 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {vehicleTypes.map((type) => (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedType(type)}
                  className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                    selectedType === type
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Rentals Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredRentals.map((rental, index) => (
                <motion.div
                  key={rental._id}
                  variants={cardVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="card-premium overflow-hidden group bg-white dark:bg-gray-800/90 border-gray-200 dark:border-gray-700/50"
                >
                  <div className={`relative h-64 bg-gradient-to-br ${getTypeColor(rental.vehicleType)} flex items-center justify-center overflow-hidden`}>
                    <motion.div
                      className="text-8xl opacity-30"
                      whileHover={{ scale: 1.2, rotate: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      🚗
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute top-6 right-6 flex flex-col gap-2">
                      <span className="bg-white/95 text-blue-700 px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                        {rental.vehicleType}
                      </span>
                      {rental.available ? (
                        <span className="bg-green-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                          Available
                        </span>
                      ) : (
                        <span className="bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                          Unavailable
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                        {rental.vehicleName}
                      </h3>
                      <div className="flex items-center gap-3 text-white/90 text-xs">
                        <span>👥 {rental.capacity} Seats</span>
                        {rental.year && <span>📅 {rental.year}</span>}
                        {rental.fuel && <span>⛽ {rental.fuel}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {rental.description}
                    </p>
                    
                    {rental.features && rental.features.length > 0 && (
                      <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700/50">
                        <p className="text-xs font-bold text-gray-800 dark:text-white mb-2 uppercase tracking-wide">
                          Features
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {rental.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700/50">
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 block">Per Day</span>
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                          LKR {rental.pricePerDay.toLocaleString()}
                        </p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">+ taxes</span>
                      </div>
                      <motion.button
                        disabled={!rental.available}
                        whileHover={rental.available ? { scale: 1.05 } : {}}
                        whileTap={rental.available ? { scale: 0.95 } : {}}
                        className={`px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 ${
                          rental.available
                            ? `bg-gradient-to-r ${getTypeColor(rental.vehicleType)} text-white hover:shadow-xl`
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {rental.available ? 'Rent Now' : 'Unavailable'}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {filteredRentals.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-600 dark:text-gray-300 text-lg">No vehicles found for this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl mb-4">🛡️</div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-2">Fully Insured</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">All vehicles are fully insured for your peace of mind</p>
              </div>
              <div>
                <div className="text-5xl mb-4">🔧</div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-2">Well Maintained</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Regular maintenance ensures reliability and safety</p>
              </div>
              <div>
                <div className="text-5xl mb-4">📞</div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-2">24/7 Support</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Round-the-clock assistance during your rental period</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Rentals;
