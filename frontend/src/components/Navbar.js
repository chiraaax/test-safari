import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, MapPin, Car, Package, Image, 
  CalendarCheck, LogOut, Menu, X 
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // FIX 1: Initialize state directly from localStorage to prevent "Public Nav" flash on Admin pages
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return !!localStorage.getItem('adminToken');
  });

  const location = useLocation();

  const isHome = location.pathname === '/';
  const isHeroTransparent = (isHome || location.pathname === '/about' || location.pathname === '/tours' || location.pathname === '/rentals' || location.pathname === '/packages' || location.pathname === '/contact') && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync state if localStorage changes elsewhere (optional safety)
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
    { path: '/admin/tours', label: 'Tours', icon: MapPin },
    { path: '/admin/rentals', label: 'Rentals', icon: Car },
    { path: '/admin/packages', label: 'Packages', icon: Package },
    { path: '/admin/gallery', label: 'Gallery', icon: Image },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminLoggedIn(false); // Update state immediately
    window.location.href = '/admin/login';
  };

  // --- REUSABLE COMPONENT: BOOK NOW BUTTON ---
  const BookNowButton = ({ mobile = false, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={mobile ? "w-full mt-2" : ""}
    >
      <Link
        to="/booking"
        onClick={onClick}
        className={`relative flex items-center justify-center gap-2 px-5 py-2 text-sm font-bold text-white rounded-full overflow-hidden group shadow-lg shadow-green-500/20 ${
          mobile ? "w-full" : ""
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-300 group-hover:from-green-600 group-hover:to-emerald-700" />
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-[-15deg] group-hover:translate-x-[100%] transition-transform duration-700" />
        <CalendarCheck className="w-3.5 h-3.5 relative z-10" />
        <span className="relative z-10">Book Now</span>
      </Link>
    </motion.div>
  );

  // --- REUSABLE COMPONENT: LOGO ---
  const Logo = ({ isAdmin = false }) => (
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }} 
      className="flex items-center gap-3 relative group"
    >
      <Link to={isAdmin ? "/admin" : "/"} className="flex items-center gap-2">
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
          <motion.img
            src="/images/YalaTravelCrew3.png"
            alt="Yala Travel Crew"
            className="h-10 md:h-12 w-auto relative z-10 drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <div className="flex flex-col justify-center">
          <span
            className={`text-lg font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r transition-all duration-300 ${
              isAdmin 
                ? 'from-gray-900 to-gray-700 dark:from-white dark:to-gray-200' 
                : (isHeroTransparent
                  ? 'from-white to-gray-200 group-hover:from-primary-200 group-hover:to-white'
                  : 'from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 group-hover:from-primary-600 group-hover:to-primary-400')
            }`}
          >
            Yala Travel Crew
          </span>
          {isAdmin ? (
             <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary-600 dark:text-primary-400">
               Admin Panel
             </span>
          ) : (
            <span
              className={`text-[10px] uppercase tracking-[0.2em] font-medium hidden sm:block ${
                isHeroTransparent ? 'text-gray-200/90' : 'text-gray-500'
              }`}
            >
              Explore Sri Lanka
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );

  // ==========================================
  // 1. ADMIN NAVBAR (UPDATED - FIXED & SOLID)
  // ==========================================
  if (isAdminLoggedIn && location.pathname.startsWith('/admin')) {
    return (
      <nav
        // FIX: Removed 'motion' animation here to prevent layout shift on load
        // FIX: Added 'z-[100]' to ensure it sits above everything
        // FIX: Hardcoded bg-white/dark:bg-gray-950 (No transparency)
        className="fixed top-0 left-0 right-0 z-[100] h-20 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-sm flex items-center"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Admin Logo */}
            <Logo isAdmin={true} />

            {/* Admin Desktop Links */}
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center p-1 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                {adminLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        isActive(link.path)
                          ? 'bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mr-2 ${isActive(link.path) ? 'stroke-2' : 'stroke-[1.5]'}`} />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
              
              <div className="h-8 w-px bg-gray-200 dark:bg-gray-800 mx-2" />
              
              <ThemeToggle />
              
              <button 
                onClick={handleLogout} 
                className="ml-2 flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>

            {/* Admin Mobile Toggle */}
            <div className="md:hidden flex items-center gap-4">
               <ThemeToggle />
               <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
               >
                 {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
               </button>
            </div>
          </div>
        </div>
        
        {/* Admin Mobile Menu */}
        <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden absolute top-20 left-0 right-0 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden z-50"
              >
                <div className="px-4 py-6 space-y-2">
                  {adminLinks.map((link) => {
                    const Icon = link.icon;
                     return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all ${
                          isActive(link.path)
                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-900/30'
                            : 'text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                         <Icon className="w-5 h-5 mr-3" />
                         {link.label}
                      </Link>
                     )
                  })}
                   <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-4">
                      <button 
                        onClick={handleLogout} 
                        className="w-full flex items-center justify-center gap-2 py-3 text-red-600 dark:text-red-400 font-semibold bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-xl"
                      >
                        <LogOut className="w-5 h-5" />
                        Log Out
                      </button>
                   </div>
                </div>
              </motion.div>
            )}
        </AnimatePresence>
      </nav>
    );
  }

  // ==========================================
  // 2. PUBLIC NAVBAR (Customer View - UNCHANGED)
  // ==========================================
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/85 dark:bg-gray-950/85 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-800/20 py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center">
          
          <Logo isAdmin={false} />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${
                  isActive(link.path)
                    ? (isHeroTransparent
                      ? 'text-primary-200 bg-white/10'
                      : 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20')
                    : (isHeroTransparent
                      ? 'text-white hover:text-primary-200'
                      : 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400')
                }`}
              >
                {link.label}
                <span className="absolute bottom-1.5 left-1/2 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-1/2 group-hover:-translate-x-1/2" />
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <BookNowButton />
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full transition-colors ${
                isHeroTransparent 
                  ? 'bg-white/10 text-white backdrop-blur-md hover:bg-white/20' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive(link.path)
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-4">
                <BookNowButton mobile={true} onClick={() => setIsOpen(false)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;