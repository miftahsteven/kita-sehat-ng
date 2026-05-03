"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/data/dummyArticles";
import { ChevronLeft, ChevronRight, Clock, CalendarDays, Eye } from "lucide-react";
import { formatDateShort } from "@/lib/utils";
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

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const HighlightItem = ({ article }: { article: Article }) => (
    <Link
      href={`/artikel/${article.slug}`}
      className="group flex gap-3 bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="80px"
        />
      </div>
      <div className="flex flex-col py-0.5 min-w-0">
        <div className="mb-1.5">
          <span className="bg-[#1a4d2e] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded leading-none">
            {article.category}
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
            <span>{article.views ?? 0}</span>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <section className="w-full">
      {/* Desktop layout */}
      <div className="hidden lg:grid grid-cols-[1fr_340px] gap-4">
        {/* Main slider */}
        <div className="relative overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex">
            {featured.map((article) => (
              <div key={article.id} className="flex-[0_0_100%] min-w-0">
                <Link href={`/artikel/${article.slug}`} className="group block relative aspect-[16/9]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1280px) 70vw, 820px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <CategoryBadge
                      category={article.category}
                      categorySlug={article.categorySlug}
                      noLink={true}
                      className="mb-4 bg-primary text-white border-0 hover:bg-primary/90 rounded px-3 py-1 text-[10px] uppercase tracking-widest font-bold"
                    />
                    <h2 className="text-white text-3xl md:text-4xl font-extrabold leading-tight mb-4 line-clamp-2 text-balance tracking-tight">
                      {article.title}
                    </h2>
                    <p className="text-white/80 text-sm line-clamp-2 mb-6 max-w-2xl leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-5 text-white/70 text-[11px] font-bold uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <span className="text-white">Admin</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-3.5 h-3.5" />
                        <span>{formatDateShort(article.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{article.views ?? 0}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Nav buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white flex items-center justify-center transition-all"
            aria-label="Sebelumnya"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white flex items-center justify-center transition-all"
            aria-label="Berikutnya"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Progress pagination */}
          <div className="absolute bottom-6 right-6 flex gap-1.5 items-center">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? "w-8 bg-yellow-400 shadow-sm"
                    : "w-2 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {highlights.slice(0, 4).map((article) => (
            <HighlightItem key={article.id} article={article} />
          ))}
        </div>
      </div>

      {/* Mobile/Tablet layout */}
      <div className="lg:hidden space-y-4">
        {/* Carousel */}
        <div className="relative overflow-hidden rounded-2xl shadow-md" ref={emblaRef}>
          <div className="flex">
            {featured.map((article) => (
              <div key={article.id} className="flex-[0_0_100%] min-w-0">
                <Link href={`/artikel/${article.slug}`} className="group block relative">
                  <div className="relative aspect-[4/3] sm:aspect-[16/9]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      priority
                      className="object-cover"
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="mb-3">
                        <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded leading-none">
                          {article.category}
                        </span>
                      </div>
                      <h2 className="text-white text-xl font-extrabold leading-tight line-clamp-2 mb-3 tracking-tight">
                        {article.title}
                      </h2>
                      <div className="flex items-center gap-4 text-white/70 text-[10px] font-bold uppercase tracking-wider">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays className="w-3 h-3" />
                          <span>{formatDateShort(article.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Eye className="w-3 h-3" />
                          <span>{article.views ?? 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination progress bars (Mobile) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 items-center">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? "w-8 bg-yellow-400"
                    : "w-2 bg-white/40"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Highlights List (Mobile) */}
        <div className="flex flex-col gap-3 px-1">
          {highlights.slice(0, 4).map((article) => (
            <HighlightItem key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
