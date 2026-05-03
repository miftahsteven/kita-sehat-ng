"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppCTA() {
  const whatsappNumber = "6281234567890"; // Dummy number
  const message = encodeURIComponent("Halo Kita-Sehat.id, saya ingin bertanya tentang...");

  return (
    <section
      className="rounded-2xl overflow-hidden shadow-lg"
      style={{
        background: "linear-gradient(135deg, #128c7e 0%, #25d366 100%)",
      }}
    >
      <div className="px-6 py-10 md:py-12 md:px-12 flex flex-col md:flex-row items-center gap-8">
        {/* Icon */}
        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-inner">
          <MessageCircle className="w-9 h-9 text-white fill-white/10" />
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">
            Konsultasi Kesehatan via WhatsApp
          </h2>
          <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-xl font-medium">
            Punya pertanyaan seputar kesehatan keluarga atau butuh tips harian? 
            Hubungi tim redaksi kami langsung melalui WhatsApp. Kami siap membantu Anda.
          </p>
        </div>

        {/* Action Button */}
        <div className="w-full md:w-auto flex-shrink-0">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#128c7e] font-bold text-base rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 shadow-lg shadow-black/10 group"
          >
            <MessageCircle className="w-5 h-5 fill-[#128c7e]/10 group-hover:scale-110 transition-transform" />
            Hubungi WhatsApp
          </a>
          <p className="text-white/60 text-[10px] mt-3 text-center md:text-right font-medium">
            Respon cepat di jam kerja (09:00 - 17:00 WIB)
          </p>
        </div>
      </div>
    </section>
  );
}
