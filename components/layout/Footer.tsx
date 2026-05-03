import Link from "next/link";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import Container from "./Container";
import { FOOTER_LINKS, HEALTH_DISCLAIMER, SITE_NAME } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white">
      {/* Main footer */}
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="20" cy="20" r="20" fill="white" opacity="0.15"/>
                  <path d="M17 20h2v-3h2v3h2v2h-2v3h-2v-3h-2v-2z" fill="white"/>
                  <path d="M20 10c-3.3 0-6 2.7-6 6 0 5 6 13 6 13s6-8 6-13c0-3.3-2.7-6-6-6z" stroke="white" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
              <div>
                <span className="block text-lg font-extrabold tracking-tight leading-none text-white">
                  Kita<span className="text-primary">Sehat</span>.id
                </span>
                <span className="block text-[9px] text-white/50 uppercase tracking-widest leading-none mt-0.5">
                  Kesehatan Keluarga
                </span>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Informasi kesehatan keluarga yang terpercaya, ringan, dan mudah dipahami untuk membantu Anda hidup lebih sehat setiap hari.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, label: "Instagram", href: "#" },
                { icon: Facebook, label: "Facebook", href: "#" },
                { icon: Twitter, label: "Twitter", href: "#" },
                { icon: Youtube, label: "YouTube", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Kategori */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Kategori</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-primary transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Tentang</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-primary transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Disclaimer</h3>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-xs text-white/50 leading-relaxed">
                {HEALTH_DISCLAIMER}
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container>
          <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
            <p>© {currentYear} {SITE_NAME}. Hak cipta dilindungi.</p>
            <div className="flex items-center gap-4">
              <Link href="/kebijakan-privasi" className="hover:text-white/60 transition-colors">Kebijakan Privasi</Link>
              <Link href="/syarat-ketentuan" className="hover:text-white/60 transition-colors">Syarat & Ketentuan</Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
