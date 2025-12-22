import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, Target, Shield, Heart, Leaf, Award, 
  ChevronRight, CheckCircle2 
} from 'lucide-react';
import PageTransition from '../components/PageTransition';

const About = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <PageTransition>
      {/* FIX 1: Removed 'overflow-hidden' from this main wrapper. 
         If kept, it clips the image when we pull it up with negative margin. 
      */}
      <div className="min-h-screen bg-white dark:bg-gray-950">
        
        {/* ================= HERO SECTION ================= */}
        {/* FIX 2: Added '-mt-[80px]'. 
           This pulls the section up by 80px (standard navbar height) to go BEHIND the navbar.
           Adjust 80px if your navbar is taller/shorter.
        */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden -mt-[80px]">
          {/* Parallax Background */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/ultimate-wildlife.jpg" 
              alt="Safari Landscape" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-900/60 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
          </div>

          {/* Hero Content */}
          {/* FIX 3: Added 'pt-[100px]'. 
             This pushes the text down so it is visible below the navbar. 
          */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-[100px]"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium tracking-widest uppercase mb-4">
              Since 2010
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-400">The Crew</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed">
              More than just guides, we are storytellers, conservationists, and your partners in exploring the untamed beauty of Sri Lanka.
            </p>
          </motion.div>
        </section>

        {/* ================= MAIN CONTENT ================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
          
          {/* SECTION 1: OUR STORY */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32"
          >
            {/* Image Grid */}
            <motion.div variants={fadeInUp} className="relative">
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Rainforest" 
                  className="rounded-3xl shadow-2xl w-full h-64 object-cover transform translate-y-8"
                />
                 <img 
                  src="https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Jeep" 
                  className="rounded-3xl shadow-2xl w-full h-64 object-cover"
                />
              </div>
              {/* Decorative blobs */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />
            </motion.div>

            {/* Text Content */}
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold mb-4 uppercase tracking-wider text-sm">
                <Users className="w-5 h-5" /> Our Story
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                Born from a passion for the <span className="text-primary-600">Wild.</span>
              </h2>
              <div className="prose dark:prose-invert text-gray-600 dark:text-gray-300 space-y-6 text-lg leading-relaxed">
                <p>
                  Yala Safari Crew began with a simple mission: to show the world the untamed beauty of Sri Lanka without compromising the integrity of nature. 
                </p>
                <p>
                  What started as a single jeep and a dream has grown into a premier safari operator, trusted by thousands of travelers from across the globe. We believe a safari is more than a drive; it's a deep connection with the ecosystem.
                </p>
                
                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">15+</span>
                    <span className="text-sm text-gray-500">Years Experience</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">5k+</span>
                    <span className="text-sm text-gray-500">Safaris Conducted</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* SECTION 2: VALUES GRID */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-32"
          >
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Our Core <span className="text-primary-600">Values</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                We don't just drive you through the park; we guide you with principles that ensure a better experience for you and a better future for the animals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ValueCard 
                icon={Leaf} 
                title="Conservation" 
                desc="We actively contribute to habitat preservation and wildlife protection efforts."
                color="text-green-500"
                bg="bg-green-50 dark:bg-green-900/20"
              />
              <ValueCard 
                icon={Award} 
                title="Excellence" 
                desc="Top-tier service, from the quality of our vehicles to the knowledge of our guides."
                color="text-amber-500"
                bg="bg-amber-50 dark:bg-amber-900/20"
              />
              <ValueCard 
                icon={Shield} 
                title="Safety First" 
                desc="Rigorous vehicle maintenance and safety protocols for your peace of mind."
                color="text-blue-500"
                bg="bg-blue-50 dark:bg-blue-900/20"
              />
              <ValueCard 
                icon={Heart} 
                title="Passion" 
                desc="We do this because we love it. That enthusiasm shines through in every tour."
                color="text-red-500"
                bg="bg-red-50 dark:bg-red-900/20"
              />
            </div>
          </motion.div>

          {/* SECTION 3: WHY CHOOSE US (Dark Card) */}
          <motion.div
             variants={fadeInUp}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             className="relative rounded-[2.5rem] overflow-hidden"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
               <img src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover scale-105" alt="Background"/>
               <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm"></div>
            </div>

            <div className="relative z-10 p-8 md:p-20">
              <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-primary-400 font-bold mb-4 uppercase tracking-wider text-sm">
                    <Target className="w-5 h-5" /> The Difference
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    Why Travelers <br/>Choose <span className="text-primary-400">Yala Crew</span>
                  </h2>
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                    In a sea of safari options, we stand out by focusing on the details. 
                    We limit our group sizes, customize our routes, and ensure you aren't just a passenger, but an explorer.
                  </p>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300"
                  >
                    Start Your Journey <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>

                <div className="flex-1 w-full bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                  <div className="space-y-6">
                    <CheckItem text="Expert Naturalist Guides" />
                    <CheckItem text="Photography-Optimized Jeeps" />
                    <CheckItem text="Flexible Itineraries" />
                    <CheckItem text="Ethical Tracking Standards" />
                    <CheckItem text="24/7 Guest Support" />
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
};

// --- Sub Components ---

const ValueCard = ({ icon: Icon, title, desc, color, bg }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={`p-8 rounded-3xl ${bg} border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300`}
  >
    <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center mb-6 shadow-sm ${color}`}>
      <Icon className="w-7 h-7" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

const CheckItem = ({ text }) => (
  <div className="flex items-center gap-4">
    <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
      <CheckCircle2 className="w-5 h-5 text-primary-400" />
    </div>
    <span className="text-white font-medium text-lg">{text}</span>
  </div>
);

export default About;