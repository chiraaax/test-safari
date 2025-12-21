import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// Importing formal icons
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTiktok, 
  FaYoutube, 
  FaWhatsapp,
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope 
} from "react-icons/fa";
import { FiChevronRight, FiShield, FiExternalLink } from "react-icons/fi";
import { HiOutlineBadgeCheck } from "react-icons/hi";

const Footer = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsAdminLoggedIn(!!token);
  }, []);

  return (
    <footer className="bg-gray-50 text-gray-700 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-950 dark:text-gray-300 relative overflow-hidden border-t border-gray-200 dark:border-green-900/30 font-sans">

      {/* Safari-themed background elements - Subtle */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-green-400 dark:bg-green-700 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-400 dark:bg-amber-600 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* 1. Brand with Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src="/images/YalaTravelCrew3.png" 
                  alt="Yala Travel Crew Logo"
                  className="relative w-24 h-24 object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-amber-400 bg-clip-text text-transparent">
                  Yala Travel Crew
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider">Safari & Adventure</p>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Experience the wild like never before. Premium safari adventures and bespoke travel experiences in Sri Lanka's most breathtaking national parks.
            </p>

            {/* Social icons - Formal */}
            <div className="flex space-x-3">
              {[
                { icon: <FaFacebookF />, label: "Facebook", link: "https://www.facebook.com/share/17hbSU1V49/?mibextid=wwXIfr" },
                { icon: <FaInstagram />, label: "Instagram", link: "https://instagram.com" }, // Sample link
                { icon: <FaTiktok />, label: "TikTok", link: "https://tiktok.com" }, // Sample link
                { icon: <FaWhatsapp />, label: "WhatsApp", link: "https://wa.me/94775790029" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 hover:bg-green-600 hover:text-white transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-green-500"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* 2. Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-6 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { path: "/", label: "Home" },
                { path: "/about", label: "About Us" },
                { path: "/tours", label: "Safari Tours" },
                { path: "/vehicles", label: "Our Fleet" },
                { path: "/gallery", label: "Gallery" },
                { path: "/booking", label: "Book Now" },
              ].map((link) => (
                <motion.li 
                  key={link.path}
                  whileHover={{ x: 5 }}
                >
                  <Link 
                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300 group"
                    to={link.path}
                  >
                    <FiChevronRight className="text-green-600 opacity-0 group-hover:opacity-100 transition-opacity text-xs" />
                    <span>{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* 3. Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-6 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "Premium Safari Adventures",
                "Sunrise & Sunset Safaris",
                "Wildlife Photography",
                "Camping & Glamping",
                "Family Packages",
                "Private VIP Tours"
              ].map((service, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-300 transition-colors duration-300"
                >
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                  <span>{service}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* 4. Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-6 uppercase tracking-wider">
              Get in Touch
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start space-x-3 group">
                <FaMapMarkerAlt className="text-green-500 mt-1 flex-shrink-0 group-hover:text-green-400 transition-colors" />
                <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  <p>170 4th Lane,</p>
                  <p>Aluthgoda Road,</p>
                  <p>Tissamaharama 82600</p>
                </div>
              </li>
              
              <li className="flex items-center space-x-3 group">
                <FaPhoneAlt className="text-green-500 flex-shrink-0 group-hover:text-green-400 transition-colors" />
                <a href="tel:+94775790029" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  077 579 0029
                </a>
              </li>

              <li className="flex items-center space-x-3 group">
                <FaEnvelope className="text-green-500 flex-shrink-0 group-hover:text-green-400 transition-colors" />
                <a href="mailto:safari@yalatravelcrew.com" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  safari@yalatravelcrew.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-800 to-transparent my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          
          {/* Copyright */}
          <div className="text-gray-500 dark:text-gray-500 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} <span className="text-green-600 dark:text-green-500 font-medium">Yala Travel Crew</span>. All Rights Reserved.</p>
          </div>

          {/* Developer Credits - Updated */}
          <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-600 text-xs">
            <span>Developed by</span>
            <a 
              href="https://my-portfolio-alpha-six-73.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 transition-colors border-b border-dotted border-gray-400 dark:border-gray-600 hover:border-green-700 dark:hover:border-green-400"
            >
              Neth
            </a>
            <span>&</span>
            <a 
              href="#" // Placeholder for Chira
              className="text-gray-700 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 transition-colors border-b border-dotted border-gray-400 dark:border-gray-600 hover:border-green-700 dark:hover:border-green-400"
            >
              Chira
            </a>
          </div>

          {/* Admin & Legal Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500 dark:text-gray-500">
            <Link to="/privacy" className="hover:text-green-700 dark:hover:text-green-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-green-700 dark:hover:text-green-400 transition-colors">Terms of Service</Link>
            
            {!isAdminLoggedIn && (
              <Link 
                to="/admin/login" 
                className="flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
              >
                <FiShield /> Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;