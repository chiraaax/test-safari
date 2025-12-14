  import React, { useState, useEffect } from 'react';
  import { Link, useLocation } from 'react-router-dom';
  import { motion, AnimatePresence } from 'framer-motion';
  import { LayoutDashboard, MapPin, Car, Package, Image, Sparkles } from 'lucide-react';
  import ThemeToggle from './ThemeToggle';

  const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 20);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
      const token = localStorage.getItem('adminToken');
      setIsAdminLoggedIn(!!token);
    }, [location]);

    const isActive = (path) => location.pathname === path;

    const navLinks = [
      { path: '/', label: 'Home' },
      { path: '/about', label: 'About Us' },
      { path: '/tours', label: 'Tours' },
      { path: '/rentals', label: 'Car Rentals' },
      { path: '/packages', label: 'Packages' },
      { path: '/gallery', label: 'Gallery' },
      { path: '/contact', label: 'Contact' },
    ];

    const adminLinks = [
      { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/admin/tours', label: 'Manage Tours', icon: MapPin },
      { path: '/admin/rentals', label: 'Manage Rentals', icon: Car },
      { path: '/admin/packages', label: 'Manage Packages', icon: Package },
      { path: '/admin/gallery', label: 'Manage Gallery', icon: Image },
    ];

    const handleLogout = () => {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    };

    // Only show admin navbar if admin logged in AND on admin route
    if (isAdminLoggedIn && location.pathname.startsWith('/admin')) {
      return (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled
              ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl shadow-2xl dark:shadow-gray-950/50 border-b border-gray-200/30 dark:border-gray-700/30'
              : 'bg-white/70 dark:bg-gray-950/70 backdrop-blur-lg shadow-lg dark:shadow-gray-950/30'
          }`}
        >
          {/* Gradient overlay for premium effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-primary-500/5 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex justify-between items-center h-20">
              {/* Logo with Premium Glow Effect */}
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                className="flex items-center relative group"
              >
                <Link to="/" className="flex-shrink-0 relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary-400 to-primary-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
                  <motion.img
                    src="/images/YalaTravelCrew3.png"
                    alt="Yala Travel Crew"
                    className="h-14 w-auto relative z-10 drop-shadow-2xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                  {/* Sparkle effect on hover */}
                  <motion.div
                    className="absolute -top-1 -right-1 text-primary-500"
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sparkles className="h-4 w-4" />
                  </motion.div>
                </Link>
              </motion.div>

              {/* Desktop Navigation - Admin Links with Premium Effects */}
              <div className="hidden md:flex items-center">
                <div className="ml-10 flex items-baseline space-x-1">
                  {adminLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <motion.div 
                        key={link.path} 
                        initial={{ opacity: 0, y: -20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          to={link.path}
                          className={`relative flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group ${
                            isActive(link.path)
                              ? 'text-white dark:text-white'
                              : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                          }`}
                        >
                          <Icon className={`h-4 w-4 mr-2 transition-transform duration-300 ${
                            isActive(link.path) ? 'scale-110' : 'group-hover:scale-110'
                          }`} />
                          {link.label}
                          {isActive(link.path) && (
                            <>
                              <motion.div
                                layoutId="activeTabAdmin"
                                className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-500 dark:to-primary-600 rounded-xl shadow-lg shadow-primary-500/50"
                                initial={false}
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                              />
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 rounded-xl blur-md opacity-50"
                                initial={false}
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            </>
                          )}
                          <span className="relative z-10">{link.label}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="ml-6 flex items-center gap-4">
                  <ThemeToggle />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="relative px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl shadow-lg shadow-red-500/30 transition-all duration-300 overflow-hidden group"
                  >
                    <span className="relative z-10">Logout</span>
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </motion.button>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center gap-3">
                <ThemeToggle />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(!isOpen)}
                  className="relative inline-flex items-center justify-center p-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 bg-gray-100/50 dark:bg-gray-800/50 hover:bg-primary-50 dark:hover:bg-gray-800 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                >
                  <motion.svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {isOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </motion.svg>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation - Admin Links */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="md:hidden overflow-hidden"
              >
                <div className="px-4 pt-2 pb-4 space-y-2 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700 backdrop-blur-xl">
                  {adminLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <motion.div 
                        key={link.path} 
                        initial={{ opacity: 0, x: -30 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: index * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className={`relative block px-5 py-3.5 rounded-xl text-base font-medium transition-all duration-300 flex items-center overflow-hidden group ${
                            isActive(link.path)
                              ? 'bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-500 dark:to-primary-600 text-white shadow-lg shadow-primary-500/30'
                              : 'text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 hover:bg-primary-50 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400 backdrop-blur-sm'
                          }`}
                        >
                          <Icon className="h-5 w-5 mr-3 relative z-10" />
                          <span className="relative z-10">{link.label}</span>
                          {!isActive(link.path) && (
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                  <div className="pt-2">
                    <motion.button
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: adminLinks.length * 0.07, duration: 0.4 }}
                      onClick={handleLogout}
                      className="w-full text-left px-5 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl shadow-lg shadow-red-500/30 transition-all duration-300"
                    >
                      Logout
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      );
    }

    // Regular Top Navbar (non-admin or non-admin route)
    return (
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl shadow-2xl dark:shadow-gray-950/50 border-b border-gray-200/30 dark:border-gray-700/30'
            : 'bg-white/70 dark:bg-gray-950/70 backdrop-blur-lg shadow-lg dark:shadow-gray-950/30'
        }`}
      >
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-primary-500/5 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-20">
            {/* Logo with Premium Effects */}
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              className="flex items-center relative group"
            >
              <Link to="/" className="flex-shrink-0 relative">
                {/* Glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-primary-400 to-primary-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
                
                <motion.img
                  src="/images/YalaTravelCrew3.png"
                  alt="Yala Travel Crew"
                  className="h-16 w-auto relative z-10 drop-shadow-2xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                
                {/* Sparkle animation on hover */}
                <motion.div
                  className="absolute -top-1 -right-1 text-primary-500"
                  initial={{ opacity: 0, scale: 0, rotate: 0 }}
                  whileHover={{ opacity: 1, scale: 1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
              </Link>
            </motion.div>

            {/* Desktop Navigation with Premium Effects */}
            <div className="hidden md:flex items-center">
              <div className="ml-10 flex items-baseline space-x-1">
                {navLinks.map((link, index) => (
                  <motion.div 
                    key={link.path} 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={link.path}
                      className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group ${
                        isActive(link.path)
                          ? 'text-primary-600 dark:text-primary-400'
                          : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                      }`}
                    >
                      <span className="relative z-10">{link.label}</span>
                      {isActive(link.path) && (
                        <>
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-900/40 dark:to-primary-800/40 rounded-xl shadow-md"
                            initial={false}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-primary-200 to-primary-300 dark:from-primary-800/30 dark:to-primary-700/30 rounded-xl blur-sm"
                            initial={false}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </>
                      )}
                      {!isActive(link.path) && (
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="ml-6 flex items-center gap-4">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile menu button with premium styling */}
            <div className="md:hidden flex items-center gap-3">
              <ThemeToggle />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="relative inline-flex items-center justify-center p-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 bg-gray-100/50 dark:bg-gray-800/50 hover:bg-primary-50 dark:hover:bg-gray-800 focus:outline-none transition-all duration-300 backdrop-blur-sm"
              >
                <motion.svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </motion.svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation with Premium Effects */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-4 pt-2 pb-4 space-y-2 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700 backdrop-blur-xl">
                {navLinks.map((link, index) => (
                  <motion.div 
                    key={link.path} 
                    initial={{ opacity: 0, x: -30 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: index * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`relative block px-5 py-3.5 rounded-xl text-base font-medium transition-all duration-300 overflow-hidden group ${
                        isActive(link.path)
                          ? 'bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-500 dark:to-primary-600 text-white shadow-lg shadow-primary-500/30'
                          : 'text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 hover:bg-primary-50 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400 backdrop-blur-sm'
                      }`}
                    >
                      <span className="relative z-10">{link.label}</span>
                      {!isActive(link.path) && (
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    );
  };

  export default Navbar;