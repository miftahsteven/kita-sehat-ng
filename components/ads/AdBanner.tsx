"use client";

import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4003";

interface AdBannerProps {
  variant?: "header" | "mobile-header" | "middle" | "inline" | "sidebar" | "sub-topic" | "mini-ads";
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
  "sub-topic": {
    placement: "SUB_TOPIC",
    label: "Sub Topic Banner",
    width: "w-full",
    height: "h-[120px] sm:h-[140px] md:h-[160px]",
    settingKey: "BANNER_SUB_TOPIC_ENABLED",
  },
  "mini-ads": {
    placement: "MINI_ADS",
    label: "Mini Ads",
    width: "w-full",
    height: "h-[120px] sm:h-[140px] md:h-[160px]",
    settingKey: "BANNER_MINI_ADS_ENABLED",
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

  const renderPlaceholder = () => {
    if (variant === "sub-topic") {
      return (
        <div
          className="w-full h-full flex flex-col items-center justify-center p-5 sm:p-6 bg-gradient-to-r from-slate-100 via-gray-100 to-slate-200 border border-slate-300/80 rounded-2xl relative overflow-hidden text-center select-none"
        >
          {/* Subtle background decoration */}
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-8 -top-8 w-32 h-32 bg-slate-300/30 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 space-y-1.5 max-w-xl">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/95 text-slate-700 border border-slate-200 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0098b0] animate-pulse" />
                Slot Banner Sub Topik
              </span>
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-800 tracking-tight">
              Pasang Iklan Brand Anda
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Tingkatkan exposures bisnis Anda
            </p>
          </div>
        </div>
      );
    }

    if (variant === "mini-ads") {
      return (
        <div
          className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 border border-slate-300/80 rounded-2xl relative overflow-hidden text-center select-none"
        >
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="relative z-10 space-y-1">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-white/95 text-slate-700 border border-slate-200 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0098b0] animate-pulse" />
                Mini Ads
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 leading-snug">
              Pasang Iklan Brand Anda
            </h4>
            <p className="text-[11px] text-slate-500">
              Tingkatkan exposures bisnis Anda
            </p>
          </div>
        </div>
      );
    }

    if (variant === "header" || variant === "mobile-header") {
      return (
        <div
          className="w-full h-full flex items-center justify-center px-4 sm:px-6 py-2 bg-gradient-to-r from-slate-100 via-gray-100 to-slate-200 border border-slate-300/80 rounded-xl relative overflow-hidden select-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#0098b0] shadow-xs border border-slate-200 font-black text-[10px]">
              AD
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-800 leading-tight">
                Pasang Iklan Brand Anda
              </p>
              <p className="text-[10px] text-slate-500">
                Tingkatkan exposures bisnis Anda
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (variant === "sidebar") {
      return (
        <div
          className="w-full h-full flex flex-col items-center justify-center p-5 bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 border border-slate-300/80 rounded-2xl relative overflow-hidden text-center select-none"
        >
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="relative z-10 space-y-1.5">
            <div className="flex justify-center mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/95 text-slate-700 border border-slate-200 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0098b0] animate-pulse" />
                Sidebar Ads
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-extrabold text-slate-800 leading-snug">
              Pasang Iklan Brand Anda
            </h4>
            <p className="text-xs text-slate-500">
              Tingkatkan exposures bisnis Anda
            </p>
          </div>
        </div>
      );
    }

    // Default middle / inline
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center px-6 md:px-10 py-5 bg-gradient-to-r from-slate-100 via-gray-100 to-slate-200 border border-slate-300/80 rounded-2xl relative overflow-hidden text-center select-none"
      >
        <div className="relative z-10 space-y-1.5 max-w-xl">
          <div className="flex justify-center mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/95 text-slate-700 border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0098b0] animate-pulse" />
              Ruang Iklan
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-800">
            Pasang Iklan Brand Anda
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Tingkatkan exposures bisnis Anda
          </p>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl flex items-center justify-center ${config.width} ${config.height} ${className}`}
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
        renderPlaceholder()
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
