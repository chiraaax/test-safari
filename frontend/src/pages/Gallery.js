import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const Gallery = () => {
  const galleryImages = [
    {
      id: 1,
      title: 'Elephant Safari',
      category: 'Wildlife',
      gradient: 'from-orange-400 to-red-500',
    },
    {
      id: 2,
      title: 'Bird Watching',
      category: 'Wildlife',
      gradient: 'from-blue-400 to-cyan-500',
    },
    {
      id: 3,
      title: 'Jungle Adventure',
      category: 'Adventure',
      gradient: 'from-green-400 to-emerald-500',
    },
    {
      id: 4,
      title: 'Sunset Safari',
      category: 'Scenic',
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      id: 5,
      title: 'Leopard Spotting',
      category: 'Wildlife',
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      id: 6,
      title: 'Nature Photography',
      category: 'Photography',
      gradient: 'from-indigo-400 to-purple-500',
    },
    {
      id: 7,
      title: 'Safari Vehicle',
      category: 'Transport',
      gradient: 'from-gray-400 to-gray-600',
    },
    {
      id: 8,
      title: 'Wildlife Conservation',
      category: 'Conservation',
      gradient: 'from-teal-400 to-green-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Header Section */}
        <section className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-accent-300">Gallery</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-2xl mx-auto">
              Explore our amazing safari experiences
            </p>
          </motion.div>
        </section>

        {/* Gallery Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="card-premium overflow-hidden group cursor-pointer relative"
                >
                  <div
                    className={`h-64 bg-gradient-to-br ${image.gradient} flex items-center justify-center relative overflow-hidden`}
                  >
                    <motion.div
                      className="text-7xl"
                      whileHover={{ scale: 1.3, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      📸
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-bold text-lg mb-1">
                        {image.title}
                      </h3>
                      <p className="text-white/80 text-sm">{image.category}</p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 text-gray-700 px-2 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {image.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 text-center"
            >
              <p className="text-gray-600 mb-6 text-lg">
                Want to see more? Join us on one of our tours!
              </p>
              <motion.a
                href="/tours"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-10 py-4 inline-block"
              >
                Book a Tour
              </motion.a>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Gallery;
