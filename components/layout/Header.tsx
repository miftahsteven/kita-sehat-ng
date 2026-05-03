"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import Container from "./Container";
import AdBanner from "@/components/ads/AdBanner";

interface HeaderProps {
  onMenuOpen: () => void;
}

export default function Header({ onMenuOpen }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 py-3">
      <Container>
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="flex items-center gap-2">
              {/* Icon mark */}
              <div className="relative w-8 h-8">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="20" cy="20" r="20" fill="#0098b0" opacity="0.12"/>
                  <path
                    d="M20 8C15.5 8 12 11.5 12 16c0 6.5 8 16 8 16s8-9.5 8-16c0-4.5-3.5-8-8-8z"
                    fill="#0098b0"
                    opacity="0.3"
                  />
                  <path
                    d="M17 20h2v-3h2v3h2v2h-2v3h-2v-3h-2v-2z"
                    fill="#0098b0"
                  />
                  <path
                    d="M20 10c-3.3 0-6 2.7-6 6 0 5 6 13 6 13s6-8 6-13c0-3.3-2.7-6-6-6z"
                    stroke="#0098b0"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </div>
              <div className="leading-tight">
                <span className="block text-base font-extrabold text-secondary tracking-tight leading-none">
                  Kita<span className="text-primary">Sehat</span>
                </span>
                <span className="block text-[8px] font-medium text-gray-400 uppercase tracking-widest leading-none mt-0.5">
                  Kesehatan Keluarga
                </span>
              </div>

            </div>
          </Link>

          {/* Desktop Ad Banner */}
          <div className="hidden md:flex flex-1 max-w-[728px] justify-end">
            <AdBanner variant="header" />
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={onMenuOpen}
            className="md:hidden p-2 rounded-lg text-secondary hover:bg-gray-50 transition-colors"
            aria-label="Buka menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile ad below logo */}
        <div className="md:hidden mt-3">
          <AdBanner variant="mobile-header" />
        </div>
      </Container>
    </header>
  );
}
