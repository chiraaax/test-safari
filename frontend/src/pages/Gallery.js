import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGallerys } from '../services/api';
import PageTransition from '../components/PageTransition';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const getImageUrl = (imagePath) => {
    return imagePath ? `${API_URL}${imagePath}` : 'https://via.placeholder.com/400x300?text=No+Image';
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getGallerys();
      setGalleryItems(response.data || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      setError('Failed to load gallery. Please try refreshing the page.');
      setGalleryItems([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="text-6xl"
          >
            🖼️
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        
        {/* ================= HERO SECTION ================= */}
        {/* FIXED: Added -mt-20 and pt-20 to pull image to top */}
        <section className="relative -mt-20 h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
              alt="Gallery Hero" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-gray-900 via-transparent to-black/30" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center px-4 pt-20"
          >
            <div className="backdrop-blur-md bg-white/10 dark:bg-black/30 border border-white/20 p-8 rounded-3xl shadow-2xl inline-block">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Diaries</span>
              </h1>
              <p className="text-lg text-gray-200">
                Capturing the soul of the Sri Lankan wilderness
              </p>
            </div>
          </motion.div>
        </section>

        {/* ================= GALLERY GRID ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {galleryItems.map((image) => (
                <motion.div
                  layout
                  key={image._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedImage(image)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <img 
                    src={getImageUrl(image.image)}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
                        {image.type}
                      </span>
                      <h3 className="text-2xl font-bold text-white">{image.title}</h3>
                      <p className="text-white/80 text-sm mt-2">Click to expand</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {galleryItems.length === 0 && !loading && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🖼️</div>
              <p className="text-gray-500 dark:text-gray-400">No images in the gallery yet.</p>
            </div>
          )}
        </section>

        {/* ================= LIGHTBOX MODAL ================= */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl w-full max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl"
              >
                <img 
                  src={getImageUrl(selectedImage.image)}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain max-h-[85vh] bg-black"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-2 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <span className="text-orange-400 font-bold text-sm uppercase tracking-wider">{selectedImage.type}</span>
                  <h3 className="text-3xl font-bold mt-1">{selectedImage.title}</h3>
                  <p className="text-white/80 text-sm mt-2 line-clamp-2">{selectedImage.description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= CTA SECTION ================= */}
        <section className="py-20 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto text-center px-4">
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Inspired by our adventures?</h2>
             <motion.a
               href="/tours"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="inline-block bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold py-4 px-10 rounded-full shadow-lg"
             >
               Book Your Own Safari
             </motion.a>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default Gallery;