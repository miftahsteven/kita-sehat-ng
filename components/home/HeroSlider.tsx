"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";
import { Article, getSafeImageUrl, formatDateShort } from "@/lib/utils";
import { ChevronLeft, ChevronRight, CalendarDays, Eye } from "lucide-react";
import CategoryBadge from "@/components/article/CategoryBadge";

interface HeroSliderProps {
  featured: Article[];
  highlights: Article[];
}

export default function HeroSlider({ featured, highlights }: HeroSliderProps) {
  const autoplayRef = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplayRef.current]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    const autoplay = emblaApi.plugins()?.autoplay;
    if (autoplay) autoplay.stop();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    const autoplay = emblaApi.plugins()?.autoplay;
    if (autoplay) autoplay.stop();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
    const autoplay = emblaApi.plugins()?.autoplay;
    if (autoplay) autoplay.stop();
  }, [emblaApi]);

  const HighlightItem = ({ article }: { article: Article }) => {
    const imageUrl = getSafeImageUrl(article.coverImage, "https://placehold.co/100x100");
    
    return (
      <Link
        href={`/artikel/${article.slug}`}
        className="group flex gap-3 bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="80px"
          />
        </div>
        <div className="flex flex-col py-0.5 min-w-0">
          <div className="mb-1.5">
            <span className="bg-[#1a4d2e] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded leading-none">
              {article.category?.name || "Umum"}
            </span>
          </div>
          <h3 className="text-secondary text-[14px] font-bold line-clamp-2 leading-snug group-hover:text-primary transition-colors mb-2">
            {article.title}
          </h3>
          <div className="mt-auto flex items-center gap-3 text-[10px] text-gray-400 font-medium">
            <div className="flex items-center gap-1">
              <CalendarDays className="w-3 h-3" />
              <span>{formatDateShort(article.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{article.viewCount ?? 0}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4 lg:gap-6">
        {/* Main Slider Section */}
        <div className="relative group">
          {/* Navigation Buttons (Desktop only) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              scrollPrev();
            }}
            className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-2xl text-[#1a4d2e] items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-[50] border border-gray-100 hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto"
            aria-label="Sebelumnya"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              scrollNext();
            }}
            className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-2xl text-[#1a4d2e] items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-[50] border border-gray-100 hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto"
            aria-label="Berikutnya"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Embla Viewport */}
          <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-100" ref={emblaRef}>
            <div className="flex">
              {featured.map((article) => {
                const imageUrl = getSafeImageUrl(article.coverImage, "https://placehold.co/820x460");
                return (
                  <div key={article.id} className="flex-[0_0_100%] min-w-0">
                    <Link href={`/artikel/${article.slug}`} className="group/slide block relative aspect-[4/3] sm:aspect-[16/9]">
                      <Image
                        src={imageUrl}
                        alt={article.title || "Gambar Artikel"}
                        fill
                        priority
                        className="object-cover transition-transform duration-700 group-hover/slide:scale-105"
                        sizes="(max-width: 768px) 100vw, 820px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                        <CategoryBadge
                          category={article.category?.name || "Umum"}
                          categorySlug={article.category?.slug}
                          noLink={true}
                          className="mb-3 md:mb-4 bg-primary text-white border-0 rounded px-3 py-1 text-[9px] md:text-[10px] uppercase tracking-widest font-bold"
                        />
                        <h2 className="text-white text-xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-3 md:mb-4 line-clamp-2 text-balance tracking-tight">
                          {article.title}
                        </h2>
                        <p className="hidden md:block text-white/80 text-sm line-clamp-2 mb-6 max-w-2xl leading-relaxed">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-4 md:gap-5 text-white/70 text-[10px] md:text-[11px] font-bold uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <span className="text-white">{article.author?.name || "Admin"}</span>
                          </div>
                          <div className="flex items-center gap-1.5 md:gap-2">
                            <CalendarDays className="w-3 md:w-3.5 h-3 md:h-3.5" />
                            <span>{formatDateShort(article.publishedAt)}</span>
                          </div>
                          <div className="flex items-center gap-1.5 md:gap-2">
                            <Eye className="w-3 md:w-3.5 h-3 md:h-3.5" />
                            <span>{article.viewCount ?? 0}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pagination Indicators */}
          <div className="absolute bottom-4 md:bottom-6 right-1/2 translate-x-1/2 lg:right-6 lg:translate-x-0 flex gap-1.5 items-center z-[50]">
            {featured.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? "w-8 bg-yellow-400 shadow-lg"
                    : "w-2 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Highlights Section */}
        <div className="flex flex-col gap-3">
          {highlights.slice(0, 4).map((article) => (
            <HighlightItem key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
