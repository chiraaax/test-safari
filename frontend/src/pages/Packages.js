import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPackages } from '../services/api';
import PageTransition from '../components/PageTransition';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // WhatsApp Config
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+94772217970";
  const formattedNumber = whatsappNumber.replace(/[^0-9]/g, '');

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await getPackages();
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
      setPackages([]); // fallback: empty array
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Luxury', 'Family', 'Budget', 'Photography'];
  const filteredPackages = selectedCategory === 'All'
    ? packages
    : packages.filter(pkg => pkg.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="text-6xl"
        >
          📦
        </motion.div>
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
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
              alt="Luxury Camping" 
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
            <div className="backdrop-blur-md bg-white/10 dark:bg-black/40 border border-white/20 p-8 md:p-12 rounded-3xl shadow-2xl inline-block">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Experiences</span>
              </h1>
              <p className="text-lg text-gray-200">
                All-inclusive safari packages tailored to your style
              </p>
            </div>
          </motion.div>
        </section>

        {/* ================= FILTER SECTION ================= */}
        <div className="sticky top-24 z-30 py-6 px-4 pointer-events-none">
          <div className="max-w-7xl mx-auto flex justify-center pointer-events-auto">
            <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 p-2 rounded-full shadow-lg flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                    selectedCategory === cat ? 'text-white' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {selectedCategory === cat && (
                    <motion.div
                      layoutId="activePackageFilter"
                      className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full shadow-md"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ================= PACKAGES GRID ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-4">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <AnimatePresence>
              {filteredPackages.map((pkg) => (
                <motion.div
                  key={pkg._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 flex flex-col"
                >
                  {/* Image Header */}
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={pkg.image} 
                      alt={pkg.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-80" />
                    
                    {/* Floating Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                        {pkg.category}
                      </span>
                    </div>

                    {/* Title & Duration */}
                    <div className="absolute bottom-4 left-6 text-white">
                      <h3 className="text-3xl font-bold mb-1 drop-shadow-md">{pkg.name}</h3>
                      <p className="flex items-center gap-2 text-sm opacity-90 font-medium">
                        <span>⏱️ {pkg.duration}</span>
                        <span>•</span>
                        <span>📍 {pkg.destinations.join(' & ')}</span>
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 flex-grow flex flex-col">
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {pkg.description}
                    </p>

                    {/* Grid of details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Includes */}
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">Includes</h4>
                        <ul className="space-y-2">
                          {pkg.includes.slice(0, 4).map((item, i) => (
                            <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                              <span className="text-purple-500 mr-2">✓</span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Highlights */}
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">Highlights</h4>
                        <ul className="space-y-2">
                          {pkg.highlights.slice(0, 3).map((item, i) => (
                            <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                              <span className="text-pink-500 mr-2">★</span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Footer / CTA */}
                    <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-400 uppercase tracking-wide">Total Price</span>
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          LKR {pkg.price.toLocaleString()}
                        </div>
                        <span className="text-xs text-gray-400">per person</span>
                      </div>

                      <a
                        href={`https://wa.me/${formattedNumber}?text=Hi, I'm interested in the "${pkg.name}" package.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-purple-500/30 transform hover:scale-105 transition-all"
                      >
                        Book Now
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredPackages.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📦</div>
              <p className="text-gray-500">No packages found for this category.</p>
            </div>
          )}
        </section>

        {/* ================= CTA SECTION ================= */}
        <section className="py-20 bg-gradient-to-br from-purple-900 to-gray-900 relative overflow-hidden">
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <div className="relative z-10 text-center px-4">
             <h2 className="text-4xl font-bold text-white mb-6">Need something unique?</h2>
             <p className="text-purple-100 mb-8 max-w-2xl mx-auto text-lg">
               We specialize in tailor-made itineraries. Tell us your requirements, and we'll craft the perfect safari for you.
             </p>
             <a
                href="/contact"
                className="inline-block bg-white text-purple-900 font-bold px-10 py-4 rounded-full shadow-2xl hover:bg-gray-100 transition-colors"
             >
               Get a Custom Quote
             </a>
           </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Packages;
