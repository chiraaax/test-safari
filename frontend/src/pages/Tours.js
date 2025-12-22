import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Users, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { getTours } from '../services/api';
import PageTransition from '../components/PageTransition';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API Config
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const BASE_URL = API_URL.replace('/api', '');
  
  const getImageUrl = (imagePath) => {
    return imagePath ? `${BASE_URL}${imagePath}` : 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80';
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      setError(null);
      const response = await getTours();
      setTours(response.data || []);
    } catch (error) {
      console.error('Error fetching tours:', error);
      setError("Unable to load experiences. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-t-2 border-primary-500 rounded-full"
          />
          <p className="text-gray-400 text-sm tracking-widest uppercase">Loading Adventures...</p>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        
        {/* ================= HERO SECTION ================= */}
        {/* FIXED: Removed h-[-6vh], added -mt-20 to ignore nav space, added h-[70vh] */}
        <section className="relative -mt-20 h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
              alt="Safari Hero" 
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-gray-50 dark:to-gray-950" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-4 pt-20" // pt-20 accounts for the navbar height
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Wilderness Awaits
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
              Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-400">Expeditions</span>
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
              From dawn safaris to full-day explorations, choose the perfect journey into the wild.
            </p>
          </motion.div>
        </section>

        {/* ================= TOURS GRID ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-16 relative z-20">
          
          {error && (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl mb-10">
              <AlertCircle className="w-10 h-10 text-red-500 mb-3" />
              <p className="text-gray-800 dark:text-gray-200 mb-4">{error}</p>
              <button 
                onClick={fetchTours} 
                className="px-6 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-full hover:bg-gray-800 transition"
              >
                Retry
              </button>
            </div>
          )}
          
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {tours.map((tour, index) => (
                <motion.div
                  key={tour._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-primary-900/10 dark:hover:shadow-primary-900/20 transition-all duration-500 cursor-pointer border border-gray-100 dark:border-gray-800"
                >
                  <Link to={`/tour/${tour._id}`} className="block h-full flex flex-col">
                    
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={getImageUrl(tour.image)}
                        alt={tour.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                      
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-1.5 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                          <Clock className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                          <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                            {tour.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-grow relative">
                      <div className="absolute inset-0 bg-primary-50/50 dark:bg-gray-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      <div className="relative z-10 flex flex-col h-full">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {tour.title}
                        </h2>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                          {tour.description}
                        </p>

                        <div className="flex items-end justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Price Per Person</p>
                            <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
                              LKR {tour.price.toLocaleString()}
                            </p>
                          </div>
                          
                          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-[-45deg]">
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>

                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {tours.length === 0 && !loading && !error && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Coming Soon</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We are currently curating new exclusive experiences. Check back shortly.
              </p>
            </div>
          )}
        </section>

        {/* ================= CTA SECTION ================= */}
        <section className="relative py-28 overflow-hidden bg-gray-900">
           <div className="absolute inset-0 opacity-40">
             <img 
               src="https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
               className="w-full h-full object-cover grayscale"
               alt="Background"
             />
           </div>
           <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/80 to-transparent" />
           
           <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
               Craft Your Own Path
             </h2>
             <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
               Looking for something specific? We specialize in bespoke photography tours, family adventures, and private camping experiences.
             </p>
             <Link 
               to="/contact"
               className="inline-flex items-center gap-3 bg-white text-gray-900 font-bold py-4 px-10 rounded-full shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform duration-300"
             >
               Plan Custom Tour <ArrowRight className="w-5 h-5" />
             </Link>
           </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default Tours;