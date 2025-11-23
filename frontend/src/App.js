import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Tours from './pages/Tours';
import Rentals from './pages/Rentals';
import Packages from './pages/Packages';


// ✅ FIX 1: Wrap route transitions inside a separate component
// This prevents re-mount issues & scroll-lag caused by double-render.
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/packages" element={<Packages />} />
      </Routes>
    </AnimatePresence>
  );
}


function App() {
  return (
    <ThemeProvider>
      <Router>
        {/* FIX 2: Scroll restoration must be OUTSIDE components that re-render */}
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Navbar />

          {/* FIX 3: Keep transitions smooth, avoid conflicting height/layout shifts */}
          <main className="flex-grow pt-20">
            <AnimatedRoutes />
          </main>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
