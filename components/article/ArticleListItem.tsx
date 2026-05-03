import Link from "next/link";
import Image from "next/image";
import { Article } from "@/data/dummyArticles";
import CategoryBadge from "./CategoryBadge";
import { Clock, CalendarDays } from "lucide-react";
import { formatDateShort } from "@/lib/utils";

interface ArticleListItemProps {
  article: Article;
  className?: string;
}

export default function ArticleListItem({
  article,
  className = "",
}: ArticleListItemProps) {
  return (
    <Link
      href={`/artikel/${article.slug}`}
      className={`group flex gap-4 bg-white rounded-xl border border-gray-100 p-3 hover:shadow-card transition-all duration-200 hover:-translate-y-0.5 ${className}`}
    >
      <div className="relative w-28 h-20 sm:w-32 sm:h-22 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="128px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <CategoryBadge
          category={article.category}
          categorySlug={article.categorySlug}
          noLink={true}
          className="mb-1.5"
        />
        <h3 className="text-sm font-semibold text-secondary line-clamp-2 leading-snug group-hover:text-primary transition-colors mb-2">
          {article.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <CalendarDays className="w-3 h-3" />
            <span>{formatDateShort(article.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{article.readingTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
