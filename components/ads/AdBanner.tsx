interface AdBannerProps {
  variant?: "header" | "mobile-header" | "middle" | "inline" | "sidebar";
  className?: string;
}

const adConfig = {
  header: {
    label: "Header Banner 728 × 90",
    width: "w-full max-w-[728px]",
    height: "h-[90px]",
  },
  "mobile-header": {
    label: "Mobile Banner 320 × 50",
    width: "w-full",
    height: "h-[50px]",
  },
  middle: {
    label: "Middle Banner 970 × 90",
    width: "w-full",
    height: "h-[90px] md:h-[90px]",
  },
  inline: {
    label: "Inline Article Banner 300 × 250",
    width: "w-full",
    height: "h-[120px]",
  },
  sidebar: {
    label: "Sidebar Banner 300 × 250",
    width: "w-full",
    height: "h-[250px]",
  },
};

export default function AdBanner({ variant = "middle", className = "" }: AdBannerProps) {
  const config = adConfig[variant];

  return (
    <div
      className={`ad-placeholder ${config.width} ${config.height} ${className}`}
      role="complementary"
      aria-label="Iklan"
    >
      <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
        Advertisement
      </span>
      <span className="text-[9px] text-gray-300 font-mono">
        {config.label}
      </span>
    </div>
  );
}
