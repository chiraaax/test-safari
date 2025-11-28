import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppButton = () => {
  // 1. Get number from .env file
  // We strip the '+' and spaces to ensure the URL format is correct
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "94772217970";
  const phoneNumber = rawNumber.replace(/[^0-9]/g, ''); 
  
  const message = "Hi Yala Travel Crew! I'm interested in a tour.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end">
      <AnimatePresence>
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0, rotate: 180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative group"
        >
          {/* Pulse Effect Rings (Green Liquid Ripple) */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
          
          {/* Main Button Container */}
          <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] border border-white/20 backdrop-blur-sm overflow-hidden">
            
            {/* Glass Shine Effect (Top half reflection) */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 rounded-t-full pointer-events-none" />

            {/* WhatsApp Icon */}
            <svg 
              viewBox="0 0 24 24" 
              className="w-8 h-8 md:w-9 md:h-9 fill-white drop-shadow-sm z-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.001.575 1.973.889 3.059.889l.005.001c3.181 0 5.768-2.587 5.768-5.766.001-3.184-2.575-5.773-5.766-5.773zm0 10.457c-.966 0-1.929-.251-2.772-.728l-.199-.112-2.026.531.541-1.974-.131-.209c-.581-.925-.892-2.005-.891-3.202.001-2.525 2.056-4.58 4.581-4.58 2.525 0 4.581 2.055 4.58 4.58 0 2.525-2.055 4.582-4.583 4.582zm2.522-3.428c-.138-.069-.817-.403-.943-.45-.126-.046-.217-.069-.308.069-.092.138-.354.446-.434.54-.08.092-.161.103-.299.034-.138-.069-.583-.215-1.111-.686-.411-.368-.689-.822-.769-.961-.08-.138-.009-.213.06-.282.062-.061.138-.161.207-.241.069-.08.092-.138.138-.23.046-.092.023-.172-.011-.241-.034-.069-.308-.742-.422-1.017-.111-.268-.224-.232-.308-.236-.08-.004-.172-.004-.264-.004-.092 0-.241.035-.368.173-.126.138-.482.472-.482 1.151 0 .68.495 1.336.564 1.428.069.092.973 1.485 2.358 2.083.329.142.586.227.785.291.331.106.632.091.872.055.268-.04 1.092-.446 1.092-1.044.001-.599-.446-1.045-.583-1.114z"/>
            </svg>
          </div>

          {/* Simple Tooltip on Hover */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-gray-800 dark:text-white px-4 py-2 rounded-xl shadow-xl border border-white/20 text-sm font-semibold">
              Chat with us
              {/* Tooltip Triangle */}
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white/90 dark:bg-gray-800/90 rotate-45 rounded-sm border-r border-t border-white/20"></div>
            </div>
          </div>
        </motion.a>
      </AnimatePresence>
    </div>
  );
};

export default WhatsAppButton;