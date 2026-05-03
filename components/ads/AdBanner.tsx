"use client";

import { useState } from "react";

interface AdBannerProps {
  variant?: "header" | "mobile-header" | "middle" | "inline" | "sidebar";
  className?: string;
}

const adConfig = {
  header: {
    label: "Header Banner 728 × 90",
    width: "w-full max-w-[728px]",
    height: "h-[90px]",
    image: "/moeltiva-ads.jpeg",
  },
  "mobile-header": {
    label: "Mobile Banner 320 × 50",
    width: "w-full",
    height: "h-[50px]",
    image: "/moeltiva-ads.jpeg",
  },
  middle: {
    label: "Middle Banner 970 × 90",
    width: "w-full",
    height: "h-[90px] md:h-[90px]",
    image: "/middle-banner-ads.jpeg",
  },
  inline: {
    label: "Inline Article Banner 300 × 250",
    width: "w-full",
    height: "h-[120px]",
    image: "/middle-banner-ads.jpeg",
  },
  sidebar: {
    label: "Sidebar Banner 300 × 250",
    width: "w-full",
    height: "h-[250px]",
    image: "/middle-banner-ads.jpeg",
  },
};

export default function AdBanner({ variant = "middle", className = "" }: AdBannerProps) {
  const [error, setError] = useState(false);
  const config = adConfig[variant];

  // Jika terjadi error (gambar tidak ditemukan), tampilkan placeholder asli
  if (error) {
    return (
      <div className={`ad-placeholder ${config.width} ${config.height} ${className}`}>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          Advertisement
        </span>
        <span className="text-[9px] text-gray-300 font-mono">
          {config.label}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl ${config.width} ${config.height} ${className}`}
      role="complementary"
      aria-label="Iklan"
    >
      <img 
        src={config.image} 
        alt={config.label} 
        className="w-full h-full object-cover" 
        onError={() => setError(true)}
      />
    </div>
  );
}
