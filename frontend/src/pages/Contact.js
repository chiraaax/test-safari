import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import axios from 'axios';
import { 
  Phone, Mail, MapPin, Send, MessageCircle, 
  Navigation, ArrowRight 
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  // WhatsApp Config
  const whatsappNumber = "+94772217970";
  const formattedNumber = whatsappNumber.replace(/[^0-9]/g, '');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= WHATSAPP ================= */
  const handleWhatsApp = (e) => {
    e.preventDefault();
    const text =
      `*New Inquiry from Website*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Message:* ${formData.message}`;

    window.open(`https://wa.me/${formattedNumber}?text=${text}`, '_blank');
  };

  /* ================= EMAIL ================= */
  const handleEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        'http://localhost:5000/api/contact/send-email',
        formData
      );
      alert('Email sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      alert('Failed to send email');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = () => {
    window.open("https://www.google.com/maps/dir/?api=1&destination=Tissamaharama,+Sri+Lanka", "_blank");
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

        {/* ================= HERO SECTION ================= */}
        {/* FIXED: Added -mt-20 to pull section up behind navbar and set proper height */}
        <section className="relative -mt-20 h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/yala.jpg"
              alt="Contact Hero"
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-gray-950 via-transparent to-black/30" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-4 pt-20" // pt-20 keeps text visible below nav
          >
            <div className="backdrop-blur-md bg-white/10 dark:bg-black/40 border border-white/20 p-8 md:p-12 rounded-[2rem] shadow-2xl inline-block max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Touch</span>
              </h1>
              <p className="text-lg text-gray-200 font-light">
                Ready to plan your adventure? We are here to help.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ================= MAIN CONTENT ================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >

            {/* LEFT COLUMN: CONTACT FORM */}
            <motion.div variants={fadeInUp}>
              <div className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                    Send a Message
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    We typically reply within 2 hours during business hours.
                  </p>
                </div>

                <form className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      required
                      className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Tell us about your trip..."
                      required
                      className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleWhatsApp}
                      className="flex items-center justify-center gap-2 py-4 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20"
                    >
                      <MessageCircle className="w-5 h-5" /> WhatsApp
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleEmail}
                      disabled={loading}
                      className="flex items-center justify-center gap-2 py-4 rounded-xl bg-gray-900 dark:bg-gray-700 text-white font-bold hover:bg-black dark:hover:bg-gray-600 transition-colors shadow-lg disabled:opacity-50"
                    >
                       {loading ? 'Sending...' : <><Send className="w-5 h-5" /> Send Email</>}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: INFO & MAP */}
            <motion.div variants={fadeInUp} className="space-y-8 flex flex-col h-full">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Call / WhatsApp</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{whatsappNumber}</p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Email Us</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">info@yalatravelcrew.com</p>
                </div>
              </div>

              <div className="flex-grow bg-white dark:bg-gray-900 p-2 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
                 <div className="relative w-full h-64 md:h-full min-h-[300px] rounded-3xl overflow-hidden">
                    <iframe 
                      title="Location Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63426.68783688126!2d81.26189565!3d6.2845672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae69c27278292c3%3A0x6735c34537160911!2sTissamaharama!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen="" 
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                    ></iframe>
                 </div>

                 <div className="p-6">
                    <div className="flex items-start justify-between">
                       <div>
                          <div className="flex items-center gap-2 mb-1">
                             <MapPin className="w-5 h-5 text-red-500" />
                             <h3 className="font-bold text-lg text-gray-900 dark:text-white">Yala Travel Crew</h3>
                          </div>
                          <p className="text-gray-500 dark:text-gray-400 text-sm ml-7">
                             Tissamaharama, Sri Lanka<br/>
                             <span className="text-xs opacity-70">Gateway to Yala National Park</span>
                          </p>
                       </div>

                       <motion.button
                         whileHover={{ scale: 1.05 }}
                         whileTap={{ scale: 0.95 }}
                         onClick={handleNavigate}
                         className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-lg hover:bg-blue-700 transition-colors"
                       >
                         <Navigation className="w-4 h-4" /> Navigate
                       </motion.button>
                    </div>
                 </div>
              </div>

            </motion.div>

          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;