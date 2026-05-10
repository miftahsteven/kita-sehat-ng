import { Article } from "@/lib/utils";
import ArticleCard from "@/components/article/ArticleCard";
import SectionTitle from "@/components/common/SectionTitle";

interface LatestArticlesProps {
  articles: Article[];
}

export default function LatestArticles({ articles }: LatestArticlesProps) {
  return (
    <section>
      <SectionTitle title="Artikel Terbaru" viewAllHref="/search" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
