import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Compass, Car, Map, ChevronRight, Star, ShieldCheck, 
  Zap, HeartHandshake, ArrowRight, Play 
} from 'lucide-react';
import Testimonials from '../components/Testimonials';
import Stats from '../components/Stats';
import Newsletter from '../components/Newsletter';

const heroImages = [
  "/images/safari%20jeep.jpg", 
  "/images/mirissabeach.jpg", 
  "/images/Lepord.jpeg", 
  "/images/9arch.jpg" 
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]); // Parallax effect

  // Cycle images automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Content Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="overflow-x-hidden bg-white dark:bg-gray-950" ref={containerRef}>
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[110vh] flex items-center justify-center overflow-hidden bg-black">
        
        {/* Background Slider with Smooth Fade & Scale (Restored) */}
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: "easeInOut" }} // Smooth, slow transition
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
            />
          </AnimatePresence>
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-gray-950 z-10" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mt-[-10vh]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="flex justify-center mb-6">
              <span className="px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-sm font-medium tracking-[0.2em] uppercase shadow-lg">
                The Ultimate Sri Lankan Safari
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight mb-8 tracking-tight">
              Wilderness <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-400">
                Reimagined
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-200 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience the untamed beauty of Yala National Park with bespoke luxury tours, expert guides, and premium comfort.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Link 
                to="/tours" 
                className="group relative px-8 py-4 bg-primary-600 text-white rounded-full font-bold text-lg overflow-hidden shadow-xl shadow-primary-900/30 transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  Explore Tours <Compass className="w-5 h-5" />
                </span>
              </Link>
              
              <Link 
                to="/gallery" 
                className="group px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                Watch Film
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* --- PREMIUM SLIDER NAVIGATION BUTTONS (KEPT NEW VERSION) --- */}
        <div className="absolute bottom-24 z-30 flex gap-4 transform -translate-x-1/2 left-1/2 items-center p-2 rounded-full bg-black/10 backdrop-blur-sm border border-white/5">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative rounded-full transition-all duration-500 ease-out focus:outline-none ${
                currentSlide === index 
                  ? "w-8 h-3 bg-primary-500 shadow-[0_0_15px_rgba(var(--primary-500),0.5)]" // Active: Long pill shape
                  : "w-2.5 h-2.5 bg-white/40 hover:bg-white hover:scale-125" // Inactive: Small dot
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
               {/* Subtle glow/ring for the active state */}
               {currentSlide === index && (
                 <motion.div 
                   layoutId="active-glow"
                   className="absolute inset-0 rounded-full ring-2 ring-primary-400 ring-offset-2 ring-offset-black/50 opacity-50"
                 />
               )}
            </button>
          ))}
        </div>

       
      </section>

      {/* ================= REST OF THE PAGE ================= */}
      <div className="relative z-20 -mt-20">
         <Stats />
      </div>

      <section className="relative py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Curated <span className="text-primary-600">Experiences</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We don't just offer tours; we craft journeys. Choose how you want to explore the wild.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Compass className="w-8 h-8" />}
              title="Yala Wildlife Safaris"
              desc="Expert-led expeditions into the heart of Yala to spot leopards and elephants."
              link="/tours"
              color="bg-amber-500"
              img="https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&q=80&w=800"
            />
            <ServiceCard 
              icon={<Car className="w-8 h-8" />}
              title="Car van Hire"
              desc="Premium 4x4 fleet tailored for comfort and photography during your ride."
              link="/rentals"
              color="bg-blue-600"
              img="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800"
            />
            <ServiceCard 
              icon={<Map className="w-8 h-8" />}
              title=" Packages"
              desc="All-inclusive itineraries featuring luxury stays and exclusive access."
              link="/packages"
              color="bg-emerald-600"
              img="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=800"
            />
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-gray-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-6">
                  <Star className="w-4 h-4 fill-current" /> Why Choose Us
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  We turn moments into <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
                    Memories.
                  </span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  With over 15 years of experience in Yala National Park, we prioritize safety, comfort, and ethical wildlife tracking to ensure you get the perfect shot without disturbing nature.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FeatureItem icon={ShieldCheck} title="100% Safe" desc="Certified guides & insured vehicles." />
                  <FeatureItem icon={HeartHandshake} title="Ethical Tours" desc="Respecting wildlife boundaries." />
                  <FeatureItem icon={Zap} title="Fast Booking" desc="Instant confirmation online." />
                  <FeatureItem icon={Star} title="Top Rated" desc="5-Star reviews on TripAdvisor." />
                </div>
              </motion.div>
            </div>
            <div className="lg:w-1/2 relative">
               <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
                 className="relative z-10"
               >
                 <div className="grid grid-cols-2 gap-4">
                   <img src="https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=600" alt="Jeep" className="rounded-3xl shadow-2xl w-full h-64 object-cover transform translate-y-12"/>
                   <img src="https://images.unsplash.com/photo-1629738012217-0639e763f036?auto=format&fit=crop&q=80&w=600" alt="Leopard" className="rounded-3xl shadow-2xl w-full h-64 object-cover"/>
                 </div>
                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl" />
                 <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gray-900">
          <img src="https://images.unsplash.com/photo-1518182170546-0766aa6f6b0f?auto=format&fit=crop&q=80&w=1920" alt="CTA Background" className="w-full h-full object-cover opacity-30"/>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            The Wild is Calling. <br/> Will You Answer?
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Seats fill up fast during the season. Secure your spot today for an adventure you'll never forget.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/contact" className="inline-flex items-center gap-3 bg-white text-gray-900 px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              Start Your Adventure <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
};

// --- SUB-COMPONENTS ---
const ServiceCard = ({ icon, title, desc, link, color, img }) => (
  <motion.div 
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    initial="hidden" whileInView="visible" viewport={{ once: true }}
    className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer"
  >
    <div className="absolute inset-0">
      <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
    </div>
    <div className="absolute inset-0 p-8 flex flex-col justify-end items-start text-white">
      <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-4 text-white shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-300 transition-colors">{title}</h3>
      <p className="text-gray-300 mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
        {desc}
      </p>
      <Link to={link} className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:gap-3 transition-all">
        View Details <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  </motion.div>
);

const FeatureItem = ({ icon: Icon, title, desc }) => (
  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 flex items-center justify-center">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h4 className="font-bold text-gray-900 dark:text-white">{title}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
    </div>
  </div>
);

export default Home;