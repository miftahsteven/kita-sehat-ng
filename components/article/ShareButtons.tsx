"use client";

import { useState } from "react";
import { Share2, Facebook, Twitter, Link as LinkIcon, Check, MessageCircle } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  // Use full URL if relative
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url;

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const shareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + shareUrl)}`, "_blank");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: shareUrl,
        });
      } catch (err) {
        console.error("Error sharing", err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
      <span className="text-xs text-gray-400 flex items-center gap-1 mr-1">
        <Share2 className="w-3.5 h-3.5" /> Bagikan:
      </span>
      
      <button
        onClick={shareFacebook}
        aria-label="Bagikan ke Facebook"
        className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:opacity-80 transition-opacity active:scale-95"
      >
        <Facebook className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={shareTwitter}
        aria-label="Bagikan ke Twitter/X"
        className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center hover:opacity-80 transition-opacity active:scale-95"
      >
        <Twitter className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={shareWhatsApp}
        aria-label="Bagikan ke WhatsApp"
        className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center hover:opacity-80 transition-opacity active:scale-95"
      >
        <MessageCircle className="w-3.5 h-3.5 fill-white" />
      </button>

      <button
        onClick={copyToClipboard}
        aria-label="Salin Link"
        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-95 ${copied ? "bg-slate-900 text-white" : "bg-gray-500 text-white hover:opacity-80"}`}
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <LinkIcon className="w-3.5 h-3.5" />}
      </button>

      {/* Optional: Native Share on Mobile */}
      <button
        onClick={shareNative}
        aria-label="Bagikan lainnya"
        className="md:hidden w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center hover:opacity-80 transition-opacity active:scale-95"
      >
        <Share2 className="w-3.5 h-3.5" />
      </button>

      {copied && (
        <span className="text-[10px] text-slate-900 font-bold animate-in fade-in slide-in-from-left-1 duration-200">
          Link tersalin!
        </span>
      )}
    </div>
  );
}

