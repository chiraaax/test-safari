import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const location = useLocation();

  // WhatsApp Configuration
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+94772217970";
  const formattedNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${formattedNumber}?text=Hello! I am interested in booking a safari with Yala Travel Crew.`;

  // Handle Scroll Effect
  useEffect(() => {
    const onScroll = () => {
      // Trigger background change after scrolling 50px
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/tours', label: 'Tours' },
    { path: '/rentals', label: 'Rentals' },
    { path: '/packages', label: 'Packages' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
  ];

  // --- DYNAMIC STYLE LOGIC ---
  // 1. Text Color: White at top, Black/White when scrolled or menu open
  const textColorClass = (scrolled || isOpen) 
    ? "text-gray-900 dark:text-white" 
    : "text-white drop-shadow-md";

  // 2. Background Color: Transparent at top, White/Black Blur when scrolled
  const navBackgroundClass = (scrolled || isOpen)
    ? "bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-lg py-2 border-b border-gray-200/50 dark:border-gray-800/50"
    : "bg-transparent py-6"; // Taller padding at top for premium look

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${navBackgroundClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* ================= LEFT: LOGO ================= */}
          <Link to="/" className="relative z-50 group" onClick={() => setIsOpen(false)}>
            <div className="flex items-center gap-3">
              {/* Logo Image */}
              <img 
                src="/images/YalaTravelCrew3.png" 
                alt="Yala Travel Crew Logo" 
                className="h-12 w-auto object-contain filter drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
              />
              
              <div className="flex flex-col">
                <h1 className={`text-xl md:text-2xl font-extrabold tracking-tight transition-colors duration-300 ${textColorClass}`}>
                  Yala Travel Crew
                </h1>
                <span className={`text-[0.6rem] font-bold uppercase tracking-[0.25em] -mt-1 transition-colors duration-300
                   ${(scrolled || isOpen) ? "text-green-600 dark:text-green-400" : "text-gray-200"}
                `}>
                  Premium Tours
                </span>
              </div>
            </div>
          </Link>

          {/* ================= CENTER: DESKTOP MENU ================= */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onMouseEnter={() => setHoveredPath(link.path)}
                onMouseLeave={() => setHoveredPath(null)}
                className={`
                  relative px-4 py-2 rounded-lg text-sm font-bold transition-colors duration-300
                  ${isActive(link.path) 
                    ? "text-green-600 dark:text-green-400" // Active Color
                    : `${textColorClass} hover:opacity-80` // Normal Color
                  }
                `}
              >
                {/* Hover Pill Effect */}
                {(hoveredPath === link.path) && (
                  <motion.div
                    layoutId="navbar-pill"
                    className={`absolute inset-0 rounded-lg -z-10 
                      ${scrolled 
                        ? "bg-gray-100 dark:bg-white/10" 
                        : "bg-white/20 backdrop-blur-sm"
                      }
                    `}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {link.label}
              </Link>
            ))}

            {/* Divider */}
            <div className={`h-6 w-px mx-3 transition-colors duration-300 ${scrolled ? "bg-gray-300 dark:bg-gray-700" : "bg-white/30"}`}></div>

            {/* Theme Toggle */}
            {/* Force white text on toggle if we are at the top */}
            <div className={`${(!scrolled && !isOpen) ? "text-white" : ""}`}>
                <ThemeToggle />
            </div>

            {/* ================= RIGHT: WHATSAPP BUTTON ================= */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="ml-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all
                  ${scrolled
                    ? "bg-green-600 text-white hover:bg-green-700 shadow-green-500/30"
                    : "bg-white text-green-700 hover:bg-gray-100" // White button on transparent bg
                  }
                `}
              >
                <span>Book</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
            </motion.div>
          </div>

          {/* ================= RIGHT: MOBILE TOGGLE ================= */}
          <div className="md:hidden flex items-center gap-4">
             {/* Mobile Theme Toggle */}
            <div className={`transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}>
                <ThemeToggle />
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors z-50 relative
                ${isOpen 
                  ? "text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800" 
                  : `${textColorClass} ${!scrolled && "bg-black/20 backdrop-blur-sm"}`
                }
              `}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <motion.span 
                  animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-current rounded-full origin-left transition-all"
                />
                <motion.span 
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-0.5 bg-current rounded-full transition-all"
                />
                <motion.span 
                  animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-current rounded-full origin-left transition-all"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU OVERLAY ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 top-0 left-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur-2xl z-40 flex flex-col pt-24 px-6 md:hidden overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      block text-3xl font-bold tracking-tight py-2
                      ${isActive(link.path)
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-900 dark:text-gray-100"
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-8"
              >
                {/* WHATSAPP BUTTON (Mobile) */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-xl text-lg font-bold text-white bg-green-600 shadow-xl"
                >
                   <span>Book on WhatsApp</span>
                   <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;