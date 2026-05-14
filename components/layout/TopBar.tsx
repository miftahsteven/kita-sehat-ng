"use client";

import { getTodayDate } from "@/lib/utils";
import Link from "next/link";
import Container from "./Container";

export default function TopBar() {
  const today = getTodayDate();

  return (
    <div className="hidden md:block bg-white border-b border-gray-100">
      <Container>
        <div className="flex items-center justify-between h-8 text-xs text-gray-500">
          <span className="text-gray-400">{today}</span>
          <span className="font-semibold text-primary tracking-wide">
            #HidupSehatMulaiSekarang
          </span>
          {/* <div className="flex items-center gap-4">
            <Link href="/tentang-kami" className="hover:text-primary transition-colors duration-150">
              Tentang Kami
            </Link>
            <Link href="/redaksi" className="hover:text-primary transition-colors duration-150">
              Redaksi
            </Link>
            <Link href="/kontak" className="hover:text-primary transition-colors duration-150">
              Kontak
            </Link>
          </div> */}
        </div>
      </Container>
    </div>
  );
}
