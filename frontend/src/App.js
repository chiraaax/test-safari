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
import WhatsAppButton from './components/WhatsAppButton';
import AdminDashboard from "./pages/admin";
import AdminLogin from './pages/AdminLogin';
import PrivateRoute from './components/PrivateRoute';
import AdminTours from "./pages/AdminTours";
import AdminRentals from "./pages/AdminRentals";
import AdminPackages from "./pages/AdminPackages";
import AdminGallerys from "./pages/AdminGallerys"; // New import for AdminGallerys

// Animated routes
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
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<PrivateRoute> <AdminDashboard /> </PrivateRoute>}/>
        <Route path="/admin/tours" element={<PrivateRoute> <AdminTours /></PrivateRoute>  }/>
        <Route path="/admin/rentals" element={<PrivateRoute> <AdminRentals /></PrivateRoute> }/>
        <Route path="/admin/packages" element={<PrivateRoute> <AdminPackages /></PrivateRoute> }/>
        <Route path="/admin/gallery" element={<PrivateRoute> <AdminGallerys /></PrivateRoute> }/> {/* New route for AdminGallerys */}
      </Routes>
      <WhatsAppButton />
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <AppLayout />
      </Router>
    </ThemeProvider>
  );
}

function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main className={`flex-grow ${isHome ? 'pt-0' : 'pt-20'}`}>
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;