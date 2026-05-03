import ArticleCard from "./ArticleCard";
import { Article } from "@/data/dummyArticles";
import SectionTitle from "@/components/common/SectionTitle";

interface RelatedArticlesProps {
  articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-10 pt-8 border-t border-gray-100">
      <SectionTitle title="Artikel Terkait" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.slice(0, 3).map((article, index) => (
          <div key={article.id} className={index >= 2 ? "hidden sm:block" : "block"}>
            {/* Desktop: Default Card */}
            <div className="hidden sm:block">
              <ArticleCard article={article} className="h-full border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow" />
            </div>
            {/* Mobile: Compact Horizontal Card */}
            <div className="sm:hidden">
              <ArticleCard 
                article={article} 
                variant="compact" 
                className="bg-gray-50/50 rounded-2xl border border-gray-100 mb-2 last:mb-0" 
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
