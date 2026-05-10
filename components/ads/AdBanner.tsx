"use client";

import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4003";

interface AdBannerProps {
  variant?: "header" | "mobile-header" | "middle" | "inline" | "sidebar";
  className?: string;
}

interface BannerSlide {
  id: string;
  name: string;
  imageUrlDesktop: string;
  imageUrlMobile: string;
  targetUrl?: string;
}

const adConfig = {
  header: {
    placement: "HEADER_TOP",
    label: "Header Ad",
    width: "w-full max-w-[728px]",
    height: "h-[90px]",
    settingKey: "BANNER_HEADER_ENABLED",
  },
  "mobile-header": {
    placement: "HEADER_TOP",
    label: "Mobile Header Ad",
    width: "w-full",
    height: "h-[50px]",
    settingKey: "BANNER_HEADER_ENABLED",
  },
  middle: {
    placement: "BELOW_HERO",
    label: "Middle Banner",
    width: "w-full",
    height: "h-[90px] md:h-[200px]",
    settingKey: "BANNER_MIDDLE_ENABLED",
  },
  sidebar: {
    placement: "SIDEBAR",
    label: "Sidebar Ad",
    width: "w-full",
    height: "h-[250px]",
    settingKey: "BANNER_SIDEBAR_ENABLED",
  },
  inline: {
    placement: "ARTICLE_MIDDLE",
    label: "Inline Ad",
    width: "w-full",
    height: "h-[120px]",
    settingKey: "BANNER_MIDDLE_ENABLED",
  }
};

export default function AdBanner({ variant = "middle", className = "" }: AdBannerProps) {
  const [banners, setBanners] = useState<BannerSlide[]>([]);
  const [isEnabled, setIsEnabled] = useState<boolean | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const config = adConfig[variant as keyof typeof adConfig] || adConfig.middle;

  useEffect(() => {
    async function fetchAdData() {
      try {
        // Fetch Settings
        const settingsRes = await fetch(`${API_URL}/api/admin/banners/settings`);
        const settingsData = await settingsRes.json();
        const enabled = settingsData?.data?.[config.settingKey] === true;
        setIsEnabled(enabled);

        if (enabled) {
          // Fetch Banners for this placement
          const bannersRes = await fetch(`${API_URL}/api/admin/banners`);
          const bannersData = await bannersRes.json();
          const filtered = bannersData.data.filter((b: any) => b.placement === config.placement && b.isActive);
          setBanners(filtered);
        }
      } catch (err) {
        console.error("Failed to fetch ad data", err);
        setIsEnabled(false);
      }
    }
    fetchAdData();
  }, [variant]);

  // Slider effect
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners]);

  if (isEnabled === false) return null;
  if (isEnabled === null) return <div className={`${config.width} ${config.height} bg-gray-50 animate-pulse rounded-xl`} />;

  const currentBanner = banners[currentIndex];

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center ${config.width} ${config.height} ${className}`}
      role="complementary"
      aria-label="Iklan"
    >
      {currentBanner ? (
        <a 
          href={currentBanner.targetUrl || "#"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full h-full block"
        >
          <picture>
            {currentBanner.imageUrlMobile && (
              <source media="(max-width: 768px)" srcSet={currentBanner.imageUrlMobile} />
            )}
            <img
              src={currentBanner.imageUrlDesktop}
              alt={currentBanner.name}
              className="w-full h-full object-cover transition-opacity duration-1000"
            />
          </picture>
        </a>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            Advertisement
          </span>
          <span className="text-[9px] text-gray-300 font-mono mt-1">
            {config.label} Space Available
          </span>
        </div>
      )}
      
      {/* Dots for slider */}
      {banners.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {banners.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1 rounded-full transition-all ${idx === currentIndex ? "w-4 bg-white" : "w-1 bg-white/40"}`} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
