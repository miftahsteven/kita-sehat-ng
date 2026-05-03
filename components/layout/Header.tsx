"use client";

import Link from "next/link";
import Image from "next/image";
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
          <Link href="/" className="flex items-center flex-shrink-0">
            <img
              src="/kita-sehat-logo.jpeg"
              alt="Kita-Sehat.id"
              className="h-15 md:h-18 w-auto object-contain"
            />
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
