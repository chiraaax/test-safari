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
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07"
              alt="Contact"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center"
          >
            <h1 className="text-5xl font-bold text-white">
              Get in <span className="text-green-400">Touch</span>
            </h1>
            <p className="text-gray-200 mt-3">
              We’d love to hear from you
            </p>
          </motion.div>
        </section>

        {/* ================= CONTENT ================= */}
        <div className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >

            {/* FORM */}
            <motion.div variants={itemVariants}>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl">
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
                    className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700"
                  />

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Your Message"
                    required
                    className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      type="button"
                      onClick={handleWhatsApp}
                      className="py-3 rounded-xl bg-green-600 text-white font-bold"
                    >
                      Send to WhatsApp
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      type="button"
                      onClick={handleEmail}
                      disabled={loading}
                      className="py-3 rounded-xl bg-blue-600 text-white font-bold disabled:opacity-50"
                    >
                      {loading ? 'Sending...' : 'Send Email'}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* INFO */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl">
                📞 <strong>WhatsApp:</strong> {whatsappNumber}
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl">
                📧 <strong>Email:</strong> info@yalatravelcrew.com
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl">
                📍 Tissamaharama, Sri Lanka
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
