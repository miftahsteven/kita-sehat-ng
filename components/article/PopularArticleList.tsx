import Link from "next/link";
import { Article } from "@/lib/utils";
import { Eye, TrendingUp } from "lucide-react";

interface PopularArticleListProps {
  articles: Article[];
  title?: string;
}

export default function PopularArticleList({
  articles,
  title = "Artikel Populer",
}: PopularArticleListProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg tracking-tight">{title}</h3>
        </div>
      </div>
      
      <div className="space-y-1">
        {articles.map((article, index) => (
          <Link
            key={article.id}
            href={`/artikel/${article.slug}`}
            className="group block py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 -mx-4 px-4 rounded-xl transition-all duration-200"
          >
            <div className="flex gap-4">
              <span className="flex-shrink-0 text-2xl font-black text-slate-100 group-hover:text-primary/20 transition-colors leading-none pt-1">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="text-[14px] font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-primary transition-colors mb-1.5">
                  {article.title}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                  <Eye className="w-3.5 h-3.5 text-slate-300" />
                  <span>{article.viewCount?.toLocaleString() || 0} Pembaca</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
