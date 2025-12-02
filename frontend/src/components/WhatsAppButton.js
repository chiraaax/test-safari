import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppButton = () => {
  // 1. Get number from .env file
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+94772217970";
  const phoneNumber = rawNumber.replace(/[^0-9]/g, ''); 
  
  const message = "Hi Yala Travel Crew! I'm interested in planning a safari.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end">
      <AnimatePresence>
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative group"
        >
          {/* Pulse Effect (Outer Glow) */}
          <span className="absolute -inset-1 rounded-full bg-green-500 opacity-30 group-hover:opacity-50 blur-lg transition-opacity duration-500 animate-pulse" />
          
          {/* Main Button Container */}
          <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#25D366] to-[#075E54] shadow-2xl border border-white/20 backdrop-blur-md overflow-hidden">
            
            {/* Glass Shine Effect (Top Reflection) */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

            {/* WhatsApp Icon */}
            <svg 
              className="w-7 h-7 md:w-8 md:h-8 fill-white drop-shadow-md relative z-10"
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>

            {/* Notification Dot */}
            <span className="absolute top-3 right-3 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border border-white/50"></span>
            </span>
          </div>

          {/* Premium Glass Tooltip on Hover */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap">
            <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md text-gray-800 dark:text-white px-4 py-2 rounded-xl shadow-xl border border-white/20 text-sm font-semibold">
              Chat with us
              {/* Tooltip Arrow */}
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white/80 dark:bg-black/80 rotate-45 rounded-sm border-r border-t border-white/20"></div>
            </div>
          </div>
        </motion.a>
      </AnimatePresence>
    </div>
  );
};

export default WhatsAppButton;