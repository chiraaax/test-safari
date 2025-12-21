import React from 'react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  // 1. Get number from .env file
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+94772217970";
  const phoneNumber = rawNumber.replace(/[^0-9]/g, ''); 
  
  const message = "Hi Yala Travel Crew! I'm interested in planning a safari.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const hoverSpring = {
    type: "spring",
    stiffness: 300,
    damping: 10,
  };

  // Adjusted fixed position for a more minimal feel (keeps bottom-right alignment)
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center justify-end"> 
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        // Creative Entry Animation: Pop and Wobble
        initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 150, 
          damping: 12, 
          delay: 0.5 
        }}
        // Minimal outer padding (p-1)
        className="relative group p-1 rounded-full shadow-[5px_5px_15px_#104035, -5px_-5px_15px_#3aff89] bg-[#25D366]/90 transition-all duration-300"
      >
        
        {/* ✨ Liquid Blob/Outer Glow Effect (slightly reduced spread) */}
        <motion.span
          className="absolute inset-0 rounded-full bg-green-400 opacity-60 group-hover:opacity-80 transition-opacity duration-300"
          animate={{
            scale: [1, 1.2, 1], // Inhale/Exhale effect
            opacity: [0.6, 0.4, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Main Button Container - smaller footprint */}
        <motion.div
          className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#25D366] shadow-xl border border-white/40"
          whileHover={{ 
            scale: 1.05, 
            rotate: 5, 
            boxShadow: "0 0 15px rgba(37, 211, 102, 0.8)",
            ...hoverSpring 
          }}
          whileTap={{ scale: 0.95, rotate: -5, ...hoverSpring }}
        >
          
          {/* WhatsApp Icon - compact */}
          <svg 
            className="w-5 h-5 md:w-6 md:h-6 fill-white drop-shadow-lg relative z-10"
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>

          {/* New Message Indicator - tiny dot */}
          <span className="absolute top-0.5 right-0.5 flex h-1 w-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1 w-1 bg-red-500 border border-white"></span>
          </span>
        </motion.div>

        {/* 💬 Minimal Tooltip (no layout shift) */}
        <motion.div 
          className="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 0, x: 10 }}
          transition={{ type: "tween", duration: 0.2 }}
        >
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-800 dark:text-white px-3 py-1 text-xs rounded-full shadow-lg border border-white/30 font-medium">
            Chat Safari 🐘
            {/* Tooltip Arrow */}
            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-white/90 dark:bg-gray-900/90 rotate-45 rounded-sm"></div>
          </div>
        </motion.div>
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;