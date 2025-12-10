import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); // State to track admin login status

  // Effect to check admin login status from localStorage
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsAdminLoggedIn(!!token);
  }, []); // Run once on mount, as it doesn't depend on location changes

  return (
    <footer className="bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-300 relative overflow-hidden">

      {/* Beautiful green glowing background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-green-500 mb-4">
              muthugala Tours & Transport
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Trusted tour and transport partner in Sri Lanka. 
              We provide safari rides, airport drops, taxi service 
              and customized tours.
            </p>

            {/* Social icons */}
            <div className="flex space-x-4 mt-6">
              {["📘", "📷", "🐦", "📧"].map((icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2 }}
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center text-xl hover:bg-green-500 hover:text-white transition"
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
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-lg font-semibold text-green-500 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { path: "/", label: "Home" },
                { path: "/about", label: "About Us" },
                { path: "/tours", label: "Tour Packages" },
                { path: "/vehicles", label: "Vehicles" },
                { path: "/gallery", label: "Gallery" },
              ].map((link) => (
                <li key={link.path}>
                  <Link className="hover:text-green-500 transition" to={link.path}>
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-lg font-semibold text-green-500 mb-4">
              Our Services
            </h4>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>🦁 Yala Safari Tours</li>
              <li>🚗 Airport Pickup / Drop</li>
              <li>🛻 Taxi & Transport Service</li>
              <li>📸 Photography Tours</li>
              <li>🏨 Hotel Arrangements</li>
              <li>🌍 Customized Travel Plans</li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h4 className="text-lg font-semibold text-green-500 mb-4">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <p className="font-medium">📧 Email</p>
                <p className="text-gray-600 dark:text-gray-400">
                 tours@gmail.com
                </p>
              </li>

              <li>
                <p className="font-medium">📞 Phone</p>
                <p className="text-gray-600 dark:text-gray-400">
                  +94 71 707 7970
                </p>
              </li>

              <li>
                <p className="font-medium">📍 Location</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Tissamaharama, Sri Lanka
                </p>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 dark:border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} a Tours & Transport. All Rights Reserved.</p>

          <div className="flex space-x-6 mt-2 md:mt-0">
            <Link className="hover:text-green-500 transition" to="/privacy">
              Privacy Policy
            </Link>
            <Link className="hover:text-green-500 transition" to="/terms">
              Terms
            </Link>
            <Link className="hover:text-green-500 transition" to="/contact">
              Contact
            </Link>
            {/* Conditionally render Admin link only if not logged in */}
            {!isAdminLoggedIn && (
              <Link className="hover:text-green-500 transition" to="/admin/login">
                🔐 Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;