import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <h3 className="text-3xl font-bold text-primary-400 mb-4">
              Muthugala Tours
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Your trusted partner for unforgettable wildlife safari experiences
              in Sri Lanka. With over 15 years of experience, we provide premium
              safari tours, luxury accommodations, and expert guidance.
            </p>
            <div className="flex space-x-4">
              {['📘', '📷', '🐦', '📧'].map((icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 5, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-2xl hover:bg-primary-600 transition-colors duration-300"
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-primary-300">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About Us' },
                { path: '/tours', label: 'Wildlife Tours' },
                { path: '/rentals', label: 'Car Rentals' },
                { path: '/packages', label: 'Safari Packages' },
                { path: '/gallery', label: 'Gallery' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 dark:text-gray-500 hover:text-primary-400 dark:hover:text-primary-300 transition-colors duration-300 flex items-center group"
                  >
                    <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-primary-300">
              Our Services
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400 dark:text-gray-500">
                <span className="mr-2">🦁</span>
                Wildlife Safari Tours
              </li>
              <li className="flex items-center text-gray-400 dark:text-gray-500">
                <span className="mr-2">🚗</span>
                Premium Car Rentals
              </li>
              <li className="flex items-center text-gray-400 dark:text-gray-500">
                <span className="mr-2">📦</span>
                All-Inclusive Packages
              </li>
              <li className="flex items-center text-gray-400 dark:text-gray-500">
                <span className="mr-2">📸</span>
                Photography Tours
              </li>
              <li className="flex items-center text-gray-400 dark:text-gray-500">
                <span className="mr-2">🏨</span>
                Luxury Accommodations
              </li>
              <li className="flex items-center text-gray-400 dark:text-gray-500">
                <span className="mr-2">👨‍🏫</span>
                Expert Guides
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-primary-300">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-3 text-primary-400">📧</span>
                <div>
                  <p className="font-medium text-white">Email</p>
                  <p className="text-gray-400 dark:text-gray-500">info@muthugalatours.com</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-primary-400">📞</span>
                <div>
                  <p className="font-medium text-white">Phone</p>
                  <p className="text-gray-400 dark:text-gray-500">+94 XX XXX XXXX</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-primary-400">📍</span>
                <div>
                  <p className="font-medium text-white">Address</p>
                  <p className="text-gray-400 dark:text-gray-500">Sri Lanka</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-primary-400">🕒</span>
                <div>
                  <p className="font-medium text-white">Hours</p>
                  <p className="text-gray-400 dark:text-gray-500">Mon-Sun: 8AM-8PM</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 dark:text-gray-500 text-center md:text-left">
                &copy; {new Date().getFullYear()} Muthugala Tours. All rights reserved.
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 text-center md:text-left">
                Licensed Tour Operator | Registered with Sri Lanka Tourism
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 dark:text-gray-500">
              <Link to="/about" className="hover:text-primary-400 dark:hover:text-primary-300 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/about" className="hover:text-primary-400 dark:hover:text-primary-300 transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/contact" className="hover:text-primary-400 dark:hover:text-primary-300 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
