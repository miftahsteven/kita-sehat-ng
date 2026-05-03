"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section
      className="rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #103174 0%, #0098b0 60%, #2596be 100%)",
      }}
    >
      <div className="px-6 py-10 md:py-12 md:px-12 flex flex-col md:flex-row items-center gap-8">
        {/* Icon */}
        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
          <Mail className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl font-bold text-white mb-2">
            Tips Kesehatan Langsung di Email Anda
          </h2>
          <p className="text-white/70 text-sm leading-relaxed max-w-md">
            Dapatkan informasi kesehatan keluarga yang ringan, praktis, dan
            terpercaya. Mulai hidup sehat dengan satu langkah kecil.
          </p>
        </div>

        {/* Form */}
        <div className="w-full md:w-auto flex-shrink-0">
          {submitted ? (
            <div className="flex items-center gap-2 bg-white/15 border border-white/20 rounded-xl px-5 py-3.5 text-white text-sm font-medium">
              <CheckCircle className="w-4 h-4 text-green-300" />
              Terima kasih! Kami akan segera menghubungi Anda.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email Anda..."
                required
                className="flex-1 md:w-60 px-4 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-white text-primary font-semibold text-sm rounded-xl hover:bg-white/90 transition-all duration-200 active:scale-95 whitespace-nowrap"
              >
                Berlangganan
              </button>
            </form>
          )}
          <p className="text-white/40 text-[10px] mt-2 text-center">
            Gratis. Bisa berhenti kapan saja.
          </p>
        </div>
      </div>
    </section>
  );
}
