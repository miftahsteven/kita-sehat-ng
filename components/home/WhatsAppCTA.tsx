"use client";

export default function WhatsAppCTA() {
  const whatsappNumber = "6281234567890"; // Dummy number
  const message = encodeURIComponent("Halo Kita-Sehat.id, saya ingin bertanya tentang...");

  return (
    <section
      className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl relative"
      style={{
        background: "linear-gradient(145deg, #075E54 0%, #128C7E 45%, #25D366 100%)",
      }}
    >
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />

      {/* 
          Mobile: flex-col items-center py-12 (Original height/feel)
          Desktop: flex-row items-center py-8 justify-between (Reduced height, banner-like)
      */}
      <div className="relative px-6 py-10 md:py-8 md:px-12 flex flex-col md:flex-row items-center text-center md:text-left justify-between gap-6 md:gap-8">
        
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 flex-1">
          {/* Official WhatsApp Icon - Smaller on Desktop Banner */}
          <div className="w-16 h-16 md:w-14 md:h-14 flex-shrink-0 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
            <svg 
              viewBox="0 0 24 24" 
              className="w-10 h-10 md:w-8 md:h-8 fill-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </div>

          {/* Content */}
          <div className="max-w-xl">
            <h2 className="text-xl md:text-2xl font-black text-white mb-1 md:mb-2 tracking-tight leading-tight">
              Konsultasi Kesehatan via WhatsApp
            </h2>
            <p className="text-white/80 text-sm md:text-base leading-relaxed font-medium">
              Punya pertanyaan seputar kesehatan keluarga? Hubungi tim redaksi kami langsung. Kami siap membantu Anda.
            </p>
          </div>
        </div>

        {/* Action Button & Status */}
        <div className="flex flex-col items-center md:items-end gap-3 flex-shrink-0">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-8 py-3.5 bg-white text-[#075E54] font-black text-sm md:text-base rounded-xl hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 group shadow-lg"
          >
            <svg 
              viewBox="0 0 24 24" 
              className="w-5 h-5 fill-[#25D366] group-hover:scale-110 transition-transform"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Hubungi WhatsApp
          </a>
          <div className="hidden md:flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-white/60 text-[10px] font-bold tracking-wider uppercase">
              Respon cepat: 09:00 - 17:00 WIB
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
