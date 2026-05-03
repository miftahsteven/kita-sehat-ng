"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloatingButton() {
  const [isVisible, setIsVisible] = useState(false);
  const whatsappNumber = "6281234567890";
  const message = encodeURIComponent("Halo Kita-Sehat.id, saya ingin bertanya tentang...");

  useEffect(() => {
    // Show button after a short delay or scroll
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    // Initial check
    setTimeout(() => setIsVisible(true), 1000); 

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25d366] text-white rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110 active:scale-95 group ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-20 opacity-0 scale-50"
      }`}
      aria-label="Chat via WhatsApp"
    >
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-25 group-hover:hidden"></span>
      
      <MessageCircle className="w-7 h-7 fill-current" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-secondary text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap shadow-xl">
        Tanya Kami di WhatsApp
      </span>
    </a>
  );
}
