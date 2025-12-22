import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRentals } from '../services/api';
import PageTransition from '../components/PageTransition';

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  // WhatsApp Config
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+94772217970";
  const formattedNumber = whatsappNumber.replace(/[^0-9]/g, '');

  // Backend URL for images
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const BASE_URL = API_URL.replace('/api', ''); 
  
  const getImageUrl = (imagePath) => {
    return imagePath ? `${BASE_URL}${imagePath}` : '/placeholder.jpg';
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const response = await getRentals();
      setRentals(response.data || []);
    } catch (error) {
      console.error("Error fetching rentals:", error);
      setRentals([]); 
    } finally {
      setLoading(false);
    }
  };

  const filteredRentals = rentals; 

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="text-6xl"
        >
          🚙
        </motion.div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        
        {/* ================= HERO SECTION ================= */}
        {/* FIXED: Added -mt-20 and h-[60vh] to start from the very top */}
        <section className="relative -mt-20 h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1506015391300-4802dc74de2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
              alt="Safari Vehicle Hero" 
              className="w-full h-full object-cover"
            />
            {/* Darker overlays for better navbar visibility */}
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-gray-900 via-transparent to-black/60" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center px-4 pt-20" // pt-20 pushes content down from under navbar
          >
            <div className="backdrop-blur-md bg-white/10 dark:bg-black/40 border border-white/20 p-8 md:p-12 rounded-3xl shadow-2xl inline-block max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Fleet</span>
              </h1>
              <p className="text-lg text-gray-200">
                Choose your perfect ride for the adventure of a lifetime
              </p>
            </div>
          </motion.div>
        </section>

        {/* ================= RENTALS GRID ================= */}
        {/* Adjusted padding and negative margin to pull grid slightly over hero if desired */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-16 relative z-20"> 
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredRentals.map((rental) => (
                <motion.div
                  key={rental._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
                >
                  {/* Image Area */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={getImageUrl(rental.image)} 
                      alt={rental.vehicleName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x256?text=No+Image';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-60" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                      <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {rental.vehicleType}
                      </span>
                      {rental.available ? (
                        <span className="bg-green-500/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          Available
                        </span>
                      ) : (
                        <span className="bg-red-500/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          Booked
                        </span>
                      )}
                    </div>

                    {/* Title on Image */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold drop-shadow-md">{rental.vehicleName}</h3>
                      <div className="flex items-center gap-3 text-xs opacity-90 mt-1 font-medium">
                        <span className="bg-black/30 px-2 py-1 rounded">👥 {rental.seats} Seats</span>
                        <span className="bg-black/30 px-2 py-1 rounded">⛽ {rental.fuel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {rental.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(rental.features || []).map((feature, idx) => ( 
                        <span key={idx} className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Ready to Rent</p>
                        <p className="text-xl font-bold text-green-600 dark:text-green-400">
                          {rental.available ? 'Available Now' : 'Check Availability'}
                        </p>
                      </div>

                      <a
                        href={`https://wa.me/${formattedNumber}?text=Hi, I am interested in renting the ${rental.vehicleName}. Is it available?`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-6 py-2 rounded-xl font-bold text-sm shadow-lg transition-all transform active:scale-95 ${
                          rental.available 
                            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/30"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                        onClick={(e) => !rental.available && e.preventDefault()}
                      >
                        {rental.available ? 'Rent Now' : 'Unavailable'}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredRentals.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🚙</div>
              <p className="text-gray-500">No vehicles found.</p>
            </div>
          )}
        </section>

      </div>
    </PageTransition>
  );
};

export default Rentals;