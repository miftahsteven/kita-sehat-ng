import Link from "next/link";
import Image from "next/image";
import { Article, getSafeImageUrl, calculateReadingTime } from "@/lib/utils";
import CategoryBadge from "./CategoryBadge";
import ArticleMeta from "./ArticleMeta";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "large" | "compact";
  className?: string;
}

export default function ArticleCard({
  article,
  variant = "default",
  className = "",
}: ArticleCardProps) {
  const imageUrl = getSafeImageUrl(article.coverImage);
  const readingTime = calculateReadingTime(article.content);

  if (variant === "large") {
    return (
      <Link href={`/artikel/${article.slug}`} className={`article-card group block ${className}`}>
        <div className="relative overflow-hidden aspect-[16/9]">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 65vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <CategoryBadge
              category={article.category?.name}
              categorySlug={article.category?.slug}
              noLink={true}
              className="mb-3 bg-white/20 text-white border-0 backdrop-blur-sm hover:bg-white/30"
            />
            <h2 className="text-white text-xl font-bold line-clamp-2 leading-snug mb-2">
              {article.title}
            </h2>
            <ArticleMeta
              author={article.author?.name}
              publishedAt={article.publishedAt}
              readingTime={readingTime}
              viewCount={article.viewCount}
              compact
              className="text-white/70"
            />
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/artikel/${article.slug}`} className={`article-card group flex gap-3 p-3 ${className}`}>
        <div className="relative w-24 h-20 flex-shrink-0 overflow-hidden rounded-xl">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="96px"
          />
        </div>
        <div className="flex-1 min-w-0 py-0.5">
          <CategoryBadge
            category={article.category?.name}
            categorySlug={article.category?.slug}
            noLink={true}
            className="mb-1.5"
          />
          <h3 className="text-sm font-semibold text-secondary line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <ArticleMeta
            author={article.author?.name}
            publishedAt={article.publishedAt}
            readingTime={readingTime}
            viewCount={article.viewCount}
            compact
            className="mt-1"
          />
        </div>
      </Link>
    );
  }

  // Default card
  return (
    <Link href={`/artikel/${article.slug}`} className={`article-card group block ${className}`}>
      <div className="relative overflow-hidden aspect-[16/9] rounded-t-2xl">
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <CategoryBadge
          category={article.category?.name}
          categorySlug={article.category?.slug}
          noLink={true}
          className="mb-2.5"
        />
        <h3 className="text-base font-bold text-secondary line-clamp-2 leading-snug mb-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-3">
          {article.excerpt}
        </p>
        <ArticleMeta
          author={article.author?.name}
          publishedAt={article.publishedAt}
          readingTime={readingTime}
          viewCount={article.viewCount}
          compact
        />
      </div>
    </Link>
  );
}

