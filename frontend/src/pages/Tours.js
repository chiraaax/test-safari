import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
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
      // Attempt to fetch from API
      const response = await getTours();
      setTours(response.data);
    } catch (error) {
      console.log('Using fallback data');
      
      // 🔥 FALLBACK DATA with Real Images
      setTours([
        {
          _id: '1',
          title: 'Yala Leopard Safari',
          image: 'https://images.unsplash.com/photo-1634547481136-193496c14170?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          description: 'Track the elusive leopards in their highest density kingdom. A thrilling 4x4 adventure through the thorny scrub jungle.',
          duration: 'Full Day',
          price: 15000,
          location: 'Yala National Park',
          difficulty: 'Easy',
          maxParticipants: 6,
          includes: ['Park Entry', 'Jeep', 'Lunch', 'Binoculars'],
          bestTime: 'Early Morning',
        },
        {
          _id: '2',
          title: 'Udawalawe Elephant Gathering',
          image: 'https://images.unsplash.com/photo-1581850518616-bcb8077a2536?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          description: 'Witness hundreds of Asian elephants in their natural habitat. Perfect for families and elephant lovers.',
          duration: 'Half Day',
          price: 8000,
          location: 'Udawalawe',
          difficulty: 'Easy',
          maxParticipants: 8,
          includes: ['Park Entry', 'Guide', 'Water'],
          bestTime: 'Afternoon',
        },
        {
          _id: '3',
          title: 'Sinharaja Rainforest Trek',
          image: 'https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          description: 'Walk through a UNESCO World Heritage site. Discover endemic birds, rare lizards, and the lush canopy of the rainforest.',
          duration: 'Full Day',
          price: 12000,
          location: 'Sinharaja',
          difficulty: 'Medium',
          maxParticipants: 10,
          includes: ['Leech Protection', 'Guide', 'Lunch'],
          bestTime: 'Morning',
        },
        {
          _id: '4',
          title: 'Wilpattu Lakes & Leopards',
          image: 'https://images.unsplash.com/photo-1541793855655-e46fa2d2a4c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          description: 'Explore Sri Lanka\'s largest park, known for its natural sand rimmed lakes (Willus) and high leopard activity.',
          duration: 'Full Day',
          price: 18000,
          location: 'Wilpattu',
          difficulty: 'Medium',
          maxParticipants: 6,
          includes: ['Full Board', 'Luxury Jeep', 'Guide'],
          bestTime: 'Full Day',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filters = ['all', 'easy', 'medium', 'hard'];
  const filteredTours = selectedFilter === 'all'
    ? tours
    : tours.filter((tour) => tour.difficulty.toLowerCase() === selectedFilter);

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
              src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
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
                    src={tour.image} 
                    alt={tour.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-6 left-6 flex gap-2">
                    <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {tour.location}
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border backdrop-blur-md
                      ${tour.difficulty === 'Easy' ? 'bg-green-500/80 border-green-400 text-white' : 
                        tour.difficulty === 'Medium' ? 'bg-yellow-500/80 border-yellow-400 text-white' : 
                        'bg-red-500/80 border-red-400 text-white'}`}
                    >
                      {tour.difficulty}
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
                      
                      {/* Features Icons */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        {tour.includes.slice(0, 3).map((item, idx) => (
                          <span key={idx} className="text-xs text-gray-300 bg-white/10 px-2 py-1 rounded border border-white/10">
                            ✓ {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Row */}
                    <div className="flex justify-between items-center mt-2 border-t border-white/20 pt-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase">Per Person</span>
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

          {filteredTours.length === 0 && (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🦁</div>
              <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400">No tours found</h3>
              <p className="text-gray-500">Try changing your filter settings</p>
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