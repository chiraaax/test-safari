import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // WhatsApp Config
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+94772217970";
  const formattedNumber = whatsappNumber.replace(/[^0-9]/g, '');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct WhatsApp Message
    const text = `*New Inquiry from Website*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Message:* ${formData.message}`;
    
    // Open WhatsApp
    window.open(`https://wa.me/${formattedNumber}?text=${text}`, '_blank');
    
    // Reset Form
    setFormData({ name: '', email: '', message: '' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
              alt="Contact Hero" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-black/30" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center px-4"
          >
            <div className="backdrop-blur-md bg-white/10 dark:bg-black/40 border border-white/20 p-8 md:p-12 rounded-3xl shadow-2xl inline-block">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Touch</span>
              </h1>
              <p className="text-lg text-gray-200">
                We'd love to hear from you. Start your journey today.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ================= CONTENT SECTION ================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            
            {/* LEFT: Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
                {/* Decorative Blur */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-green-500/20 transition-colors duration-500"></div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 relative z-10">Send a Message</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8 relative z-10">Directly via WhatsApp</p>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border-2 border-transparent focus:border-green-500 focus:bg-white dark:focus:bg-gray-600 transition-all outline-none text-gray-900 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border-2 border-transparent focus:border-green-500 focus:bg-white dark:focus:bg-gray-600 transition-all outline-none text-gray-900 dark:text-white"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border-2 border-transparent focus:border-green-500 focus:bg-white dark:focus:bg-gray-600 transition-all outline-none text-gray-900 dark:text-white resize-none"
                      placeholder="I'm interested in..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold text-lg shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all"
                  >
                    Send to WhatsApp
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* RIGHT: Info & Map */}
            <motion.div variants={itemVariants} className="space-y-8">
              
              {/* Contact Details Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-green-400 transition-colors">
                  <div className="text-4xl mb-4">📞</div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Phone / WhatsApp</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{whatsappNumber}</p>
                </div>

                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-green-400 transition-colors">
                  <div className="text-4xl mb-4">📧</div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">info@yalatravelcrew.com</p>
                </div>

                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-green-400 transition-colors md:col-span-2">
                  <div className="text-4xl mb-4">📍</div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Location</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Yala Travel Crew, Tissamaharama, Sri Lanka
                  </p>
                </div>
              </div>

              {/* Map Embed */}
              <div className="h-64 md:h-80 w-full rounded-3xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 relative">
                 <iframe 
                   title="Yala Map"
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63480.84090598818!2d81.24838708754877!3d6.288258079532588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae69c2885994f71%3A0xe744da5a570072b2!2sTissamaharama%2C%20Sri%20Lanka!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk" 
                   width="100%" 
                   height="100%" 
                   style={{border:0}} 
                   allowFullScreen="" 
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                   className="grayscale hover:grayscale-0 transition-all duration-700"
                 ></iframe>
                 {/* Map overlay gradient */}
                 <div className="absolute inset-0 pointer-events-none border-4 border-white/20 rounded-3xl"></div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-6">
                {['📷', '📘', '🐦'].map((icon, i) => (
                  <motion.a 
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="text-4xl bg-white dark:bg-gray-800 p-4 rounded-full shadow-md hover:shadow-xl transition-all"
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>

            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;