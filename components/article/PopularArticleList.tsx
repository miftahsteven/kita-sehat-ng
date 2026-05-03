import Link from "next/link";
import { Article } from "@/data/dummyArticles";
import CategoryBadge from "./CategoryBadge";
import { CalendarDays, Eye } from "lucide-react";
import { formatDateShort } from "@/lib/utils";

interface PopularArticleListProps {
  articles: Article[];
  title?: string;
}

export default function PopularArticleList({
  articles,
  title = "Artikel Populer",
}: PopularArticleListProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-5 bg-primary rounded-full" />
        <h3 className="font-bold text-secondary text-base">{title}</h3>
      </div>
      <ol className="space-y-3">
        {articles.map((article, index) => (
          <li key={article.id}>
            <Link
              href={`/artikel/${article.slug}`}
              className="group flex gap-3 items-start py-3 border-b border-gray-100 last:border-0"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="mb-1">
                  <CategoryBadge
                    category={article.category}
                    categorySlug={article.categorySlug}
                    noLink={true}
                    className="text-[9px] px-2 py-0.5"
                  />
                </div>
                <h4 className="text-[13px] font-bold text-secondary line-clamp-3 leading-snug group-hover:text-primary transition-colors mb-2">
                  {article.title}
                </h4>
                <div className="flex items-center gap-3 text-[10px] text-gray-400 font-medium">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-2.5 h-2.5" />
                    <span>{formatDateShort(article.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-2.5 h-2.5" />
                    <span>{article.views ?? 0}</span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
