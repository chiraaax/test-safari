import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import axios from 'axios';

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

        {/* ================= HERO ================= */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07"
              alt="Contact"
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
            <div className="backdrop-blur-md bg-white/10 dark:bg-black/40 border border-white/20 p-8 md:p-12 rounded-3xl shadow-2xl inline-block max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                Get in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                  Touch
                </span>
              </h1>
              <p className="text-lg text-gray-200">
                We’d love to hear from you
              </p>
            </div>
          </motion.div>
        </section>

        {/* ================= CONTENT ================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >

            {/* FORM */}
            <motion.div variants={itemVariants}>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                  Send a Message
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  WhatsApp or Email
                </p>

                <form className="space-y-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full p-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-300 border border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="w-full p-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-300 border border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Your Message"
                    required
                    className="w-full p-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-300 border border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      type="button"
                      onClick={handleWhatsApp}
                      className="py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg shadow-green-500/20"
                    >
                      Send to WhatsApp
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      type="button"
                      onClick={handleEmail}
                      disabled={loading}
                      className="py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold shadow-lg shadow-blue-500/20 disabled:opacity-50"
                    >
                      {loading ? 'Sending...' : 'Send Email'}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* INFO */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg">
                <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">WhatsApp</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">📞 {whatsappNumber}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg">
                <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Email</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">📧 info@yalatravelcrew.com</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg">
                <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Location</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">📍 Tissamaharama, Sri Lanka</div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
