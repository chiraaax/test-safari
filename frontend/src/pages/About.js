import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
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
              About <span className="text-accent-300">Muthugala Tours</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-2xl mx-auto">
              Your trusted partner for unforgettable wildlife experiences
            </p>
          </motion.div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={itemVariants} className="card-premium p-10 mb-8">
                <h2 className="text-4xl font-bold mb-6 text-gray-800">
                  Our <span className="text-gradient">Story</span>
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                  Muthugala Tours is a premier wildlife safari company dedicated to
                  providing exceptional experiences in the heart of Sri Lanka's
                  natural wonders. With years of experience in the tourism industry,
                  we have established ourselves as a trusted name for wildlife
                  enthusiasts and adventure seekers.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                  Our passion for wildlife conservation and sustainable tourism
                  drives us to offer authentic safari experiences while respecting
                  and protecting the natural environment. We believe in creating
                  meaningful connections between our guests and the incredible
                  wildlife that calls Sri Lanka home.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="card-premium p-10 mb-8">
                <h2 className="text-4xl font-bold mb-6 text-gray-800">
                  Our <span className="text-gradient">Mission</span>
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To provide unforgettable wildlife safari experiences that inspire
                  appreciation for nature while promoting sustainable tourism
                  practices. We aim to be the leading safari tour operator in Sri
                  Lanka, known for our professionalism, safety standards, and
                  commitment to wildlife conservation.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="card-premium p-10 mb-8">
                <h2 className="text-4xl font-bold mb-8 text-gray-800">
                  Our <span className="text-gradient">Values</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: '🌿',
                      title: 'Conservation',
                      description:
                        'We are committed to protecting wildlife and their habitats through responsible tourism.',
                    },
                    {
                      icon: '⭐',
                      title: 'Excellence',
                      description:
                        'We strive for excellence in every aspect of our service, ensuring memorable experiences.',
                    },
                    {
                      icon: '🛡️',
                      title: 'Safety',
                      description:
                        'Your safety is our top priority. We maintain the highest safety standards.',
                    },
                    {
                      icon: '🤝',
                      title: 'Integrity',
                      description:
                        'We operate with honesty, transparency, and respect for our guests and the environment.',
                    },
                  ].map((value, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="text-5xl mb-4">{value.icon}</div>
                      <h3 className="text-xl font-bold mb-2 text-primary-600">
                        {value.title}
                      </h3>
                      <p className="text-gray-600">{value.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="card-premium p-10">
                <h2 className="text-4xl font-bold mb-8 text-gray-800">
                  Why Choose <span className="text-gradient">Us?</span>
                </h2>
                <ul className="space-y-4">
                  {[
                    {
                      title: 'Expert Guides',
                      description:
                        'Our team consists of experienced wildlife experts and naturalists who are passionate about sharing their knowledge.',
                    },
                    {
                      title: 'Quality Vehicles',
                      description:
                        'We maintain a fleet of well-equipped vehicles for comfortable and safe journeys.',
                    },
                    {
                      title: 'Customized Packages',
                      description:
                        'We offer flexible packages tailored to your preferences and budget.',
                    },
                    {
                      title: '24/7 Support',
                      description:
                        'Our customer service team is available round the clock to assist you.',
                    },
                    {
                      title: 'Best Value',
                      description:
                        'We offer competitive prices without compromising on quality.',
                    },
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start p-4 rounded-lg hover:bg-primary-50 transition-colors"
                    >
                      <span className="text-primary-600 mr-4 text-2xl">✓</span>
                      <div>
                        <span className="font-semibold text-gray-800 text-lg">
                          {item.title}:
                        </span>{' '}
                        <span className="text-gray-600">{item.description}</span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;
