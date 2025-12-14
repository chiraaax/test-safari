import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsAdminLoggedIn(!!token);
  }, []);

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300 relative overflow-hidden border-t border-green-900/30">

      {/* Safari-themed background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-green-700 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-900 rounded-full blur-3xl"></div>
      </div>

      {/* Safari pattern overlay - simplified */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
      }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand with Logo */}
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
                  className="relative w-28 h-28 object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-amber-400 bg-clip-text text-transparent">
                  Yala Travel Crew
                </h3>
                <p className="text-sm text-gray-400">Safari & Adventure Specialists</p>
              </div>
            </div>
            
            <p className="text-gray-400 leading-relaxed">
              Experience the wild like never before. We offer premium safari adventures, 
              wildlife tours, and bespoke travel experiences in Sri Lanka's most 
              breathtaking national parks.
            </p>

            {/* Social icons */}
            <div className="flex space-x-3">
              {[
                { icon: "📘", label: "Facebook" },
                { icon: "📷", label: "Instagram" },
                { icon: "▶️", label: "YouTube" },
                { icon: "💬", label: "WhatsApp" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href="#"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center text-xl hover:bg-gradient-to-br from-green-700 to-amber-700 hover:text-white transition-all duration-300 border border-gray-700/50 hover:border-green-500/50"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-lg font-semibold text-green-400 mb-6 pb-2 border-b border-green-900/50 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { path: "/", label: "🏠 Home", emoji: "→" },
                { path: "/about", label: "🌍 About Us", emoji: "→" },
                { path: "/tours", label: "🦁 Safari Tours", emoji: "→" },
                { path: "/vehicles", label: "🚙 Safari Jeeps", emoji: "→" },
                { path: "/gallery", label: "📸 Wildlife Gallery", emoji: "→" },
                { path: "/booking", label: "📅 Book Now", emoji: "→" },
              ].map((link) => (
                <motion.li 
                  key={link.path}
                  whileHover={{ x: 5 }}
                >
                  <Link 
                    className="flex items-center space-x-3 text-gray-400 hover:text-green-400 transition-colors duration-300 group"
                    to={link.path}
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-green-400">
                      {link.emoji}
                    </span>
                    <span className="group-hover:text-white">{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-lg font-semibold text-green-400 mb-6 pb-2 border-b border-green-900/50 inline-block">
              Our Services
            </h4>
            <ul className="space-y-4 text-gray-400">
              {[
                "🦁 Premium Safari Adventures",
                "🌅 Sunrise & Sunset Safaris",
                "📸 Wildlife Photography Tours",
                "🚁 Aerial Safari Tours",
                "🏕️ Camping & Glamping",
                "🎓 Educational Wildlife Tours",
                "👨‍👩‍👧‍👦 Family Safari Packages",
                "💎 VIP Private Safaris"
              ].map((service, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-3 hover:text-green-300 transition-colors duration-300"
                >
                  <span className="text-green-500 mt-1">•</span>
                  <span>{service}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h4 className="text-lg font-semibold text-green-400 mb-6 pb-2 border-b border-green-900/50 inline-block">
              Contact Us
            </h4>
            <ul className="space-y-6">
              {[
                {
                  icon: "📧",
                  title: "Email",
                  content: "safari@yalatravelcrew.com",
                  sub: "Response within 2 hours"
                },
                {
                  icon: "📞",
                  title: "Phone & WhatsApp",
                  content: "+94 71 707 7970",
                  sub: "24/7 Safari Hotline"
                },
                {
                  icon: "📍",
                  title: "Base Camp",
                  content: "Tissamaharama, Sri Lanka",
                  sub: "Near Yala National Park"
                }
              ].map((contact, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  className="group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-800/20 to-amber-800/20 rounded-lg flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                      {contact.icon}
                    </div>
                    <div>
                      <p className="font-medium text-green-300">{contact.title}</p>
                      <p className="text-gray-300">{contact.content}</p>
                      <p className="text-sm text-gray-500">{contact.sub}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Subscription
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-green-900/30"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Join Our Safari Club</h4>
              <p className="text-gray-400">Get exclusive safari offers, wildlife updates, and expert tips.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 bg-gray-900/70 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent flex-grow"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-amber-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-amber-700 transition-all duration-300 hover:scale-105 active:scale-95">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div> */}

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p>© {new Date().getFullYear()} <span className="text-green-400">Yala Travel Crew</span>. All Rights Reserved.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link 
              className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:underline"
              to="/privacy"
            >
              🛡️ Privacy Policy
            </Link>
            <Link 
              className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:underline"
              to="/terms"
            >
              📝 Terms & Conditions
            </Link>
            <Link 
              className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:underline"
              to="/safety"
            >
              🦺 Safety Guidelines
            </Link>
            <Link 
              className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:underline"
              to="/faq"
            >
              ❓ FAQ
            </Link>
            {/* Conditionally render Admin link */}
            {!isAdminLoggedIn && (
              <Link 
                className="text-gray-400 hover:text-amber-400 transition-colors duration-300 hover:underline"
                to="/admin/login"
              >
                🔐 Admin Portal
              </Link>
            )}
          </div>
        </motion.div>

        {/* Safari Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-gray-800/50">
          {[
            "🏆 Certified Safari Guides",
            "🌿 Eco-Friendly Tours",
            "🦁 Wildlife Experts",
            "⭐ 5-Star Rated",
            "🔐 Fully Insured"
          ].map((badge, index) => (
            <div 
              key={index}
              className="px-4 py-2 bg-gray-800/30 backdrop-blur-sm rounded-full text-sm text-gray-400 border border-gray-700/50"
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;