import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getTours } from '../services/api';
import PageTransition from '../components/PageTransition';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [error, setError] = useState(null); // For error handling

  // Backend URL for images (Strip /api from API_URL for static files)
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const BASE_URL = API_URL.replace('/api', ''); // e.g., 'http://localhost:5000'
  const getImageUrl = (imagePath) => {
    return imagePath ? `${BASE_URL}${imagePath}` : 'https://via.placeholder.com/400x256?text=No+Image';
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      setError(null); // Clear previous errors
      console.log("Fetching tours from API..."); // Debug
      const response = await getTours();
      console.log("Tours fetched:", response.data); // Debug
      setTours(response.data || []);
    } catch (error) {
      console.error('Error fetching tours:', error);
      setError("Failed to load tours. Please try again later."); // User-friendly error
      setTours([]); // Empty state
    } finally {
      setLoading(false);
    }
  };

  // Filters based on duration
  const filters = ['all', 'Full Day', 'Half Day'];
  const filteredTours = selectedFilter === 'all'
    ? tours
    : tours.filter((tour) => tour.duration.toLowerCase().includes(selectedFilter.toLowerCase()));

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-t-4 border-green-500 border-solid rounded-full"
        />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1516426426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
              alt="Safari Hero" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
             <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-black/30" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center px-4"
          >
            <div className="backdrop-blur-md bg-white/10 dark:bg-black/40 border border-white/20 p-8 md:p-12 rounded-3xl shadow-2xl inline-block max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Adventures</span>
              </h1>
              <p className="text-lg text-gray-200">
                Choose your path through the wild heart of Sri Lanka
              </p>
            </div>
          </motion.div>
        </section>

        {/* ================= FILTER SECTION ================= */}
        <div className="sticky top-24 z-30 py-6 px-4 pointer-events-none">
          <div className="max-w-7xl mx-auto flex justify-center pointer-events-auto">
            <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 p-2 rounded-full shadow-lg flex gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`relative px-6 py-2 rounded-full text-sm font-semibold capitalize transition-colors duration-300 ${
                    selectedFilter === filter ? 'text-white' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {selectedFilter === filter && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-md"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{filter}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ================= TOURS GRID ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-4">
          {error && (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={fetchTours} 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Retry Fetch
              </button>
            </div>
          )}
          
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          >
            <AnimatePresence>
              {filteredTours.map((tour) => (
                <motion.div
                  key={tour._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative h-[500px] rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
                >
                  {/* Background Image */}
                  <img 
                    src={getImageUrl(tour.image)} // Fixed: Use getImageUrl for full path
                    alt={tour.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x256?text=No+Image'; // Fallback
                    }}
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-6 left-6 flex gap-2">
                    <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {tour.duration}
                    </span>
                  </div>

                  {/* Content Container (Bottom) */}
                  <div className="absolute bottom-0 left-0 w-full p-8 transform transition-transform duration-500">
                    <h2 className="text-3xl font-bold text-white mb-2 leading-tight">{tour.title}</h2>
                    
                    {/* Expandable Content */}
                    <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                       <p className="text-gray-300 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all">
                        {tour.description}
                      </p>
                      
                      {/* Features Icons - Use includes */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        {(tour.includes || []).slice(0, 3).map((item, idx) => (
                          <span key={idx} className="text-xs text-gray-300 bg-white/10 px-2 py-1 rounded border border-white/10">
                            ✓ {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Row - Updated to show Max Participants and Price (not per person) */}
                    <div className="flex justify-between items-center mt-2 border-t border-white/20 pt-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase">Max Participants</span>
                        <span className="text-lg font-bold text-green-400">{tour.maxParticipants}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-400 uppercase">Group Price</span>
                        <span className="text-2xl font-bold text-green-400">LKR {tour.price.toLocaleString()}</span>
                      </div>
                      
                      <Link to="/booking">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-white text-gray-900 px-6 py-2 rounded-xl font-bold text-sm hover:bg-green-400 transition-colors"
                        >
                          Book Now
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredTours.length === 0 && !loading && (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🦁</div>
              <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400">No tours found</h3>
              <p className="text-gray-500">Try changing your filter settings or add some tours in admin</p>
            </div>
          )}
        </section>

        {/* ================= CTA SECTION ================= */}
        <section className="relative py-24 overflow-hidden">
           <div className="absolute inset-0 bg-green-900">
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
           </div>
           
           <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
             <h2 className="text-4xl font-bold text-white mb-6">Need a Custom Experience?</h2>
             <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
               We can tailor a safari specifically to your interests, whether you're a photographer, bird watcher, or family group.
             </p>
             <Link 
               to="/contact"
               className="inline-block bg-white text-green-900 font-bold py-4 px-10 rounded-full shadow-2xl hover:scale-105 transition-transform"
             >
               Plan My Custom Tour
             </Link>
           </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Tours;