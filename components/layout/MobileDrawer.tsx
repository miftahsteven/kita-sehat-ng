"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Search, ChevronRight } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    onClose();
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 shadow-2xl md:hidden flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="20" cy="20" r="20" fill="#0098b0" opacity="0.12"/>
                <path d="M17 20h2v-3h2v3h2v2h-2v3h-2v-3h-2v-2z" fill="#0098b0"/>
                <path d="M20 10c-3.3 0-6 2.7-6 6 0 5 6 13 6 13s6-8 6-13c0-3.3-2.7-6-6-6z" stroke="#0098b0" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            <div className="leading-tight">
              <span className="block text-base font-extrabold text-secondary tracking-tight leading-none">
                Kita<span className="text-primary">Sehat</span>
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
            aria-label="Tutup menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-gray-100">
          <form onSubmit={handleSearch} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari artikel kesehatan..."
              className="flex-1 text-sm bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
            />
          </form>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-2">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-5 py-3.5 text-sm font-medium transition-colors border-b border-gray-50 ${
                  isActive
                    ? "text-primary bg-primary/5"
                    : "text-secondary hover:bg-gray-50 hover:text-primary"
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className={`w-4 h-4 ${isActive ? "text-primary" : "text-gray-300"}`} />
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-5 py-4 border-t border-gray-100">
          <div className="flex gap-3 text-xs text-gray-400">
            <Link href="/tentang-kami" className="hover:text-primary transition-colors">Tentang Kami</Link>
            <span>·</span>
            <Link href="/kontak" className="hover:text-primary transition-colors">Kontak</Link>
            <span>·</span>
            <Link href="/redaksi" className="hover:text-primary transition-colors">Redaksi</Link>
          </div>
          <p className="text-[10px] text-gray-300 mt-2 leading-relaxed">
            © 2026 Kita-Sehat.id. Informasi Kesehatan Keluarga.
          </p>
        </div>
      </div>
    </>
  );
}
