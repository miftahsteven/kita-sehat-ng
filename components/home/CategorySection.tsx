import Link from "next/link";
import Image from "next/image";
import { Article } from "@/data/dummyArticles";
import { Category } from "@/data/categories";
import ArticleCard from "@/components/article/ArticleCard";
import CategoryBadge from "@/components/article/CategoryBadge";
import ArticleMeta from "@/components/article/ArticleMeta";
import { ChevronRight } from "lucide-react";

interface CategorySectionProps {
  category: Category;
  articles: Article[];
}

export default function CategorySection({ category, articles }: CategorySectionProps) {
  if (articles.length === 0) return null;

  const [main, ...rest] = articles;

  return (
    <section>
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 rounded-full" style={{ backgroundColor: category.color }} />
          <h2 className="text-lg font-bold text-secondary">{category.name}</h2>
        </div>
        <Link
          href={`/category/${category.slug}`}
          className="flex items-center gap-0.5 text-sm font-medium text-primary hover:text-accent transition-colors"
        >
          Lihat Semua <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Desktop: 1 large left + 3 small right */}
      <div className="hidden md:grid grid-cols-[1fr_280px] gap-4 lg:grid-cols-[1fr_320px]">
        {/* Main article */}
        <Link href={`/artikel/${main.slug}`} className="group article-card block">
          <div className="relative overflow-hidden aspect-[16/9] rounded-t-2xl">
            <Image
              src={main.image}
              alt={main.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1280px) 60vw, 720px"
            />
          </div>
          <div className="p-5">
            <CategoryBadge category={main.category} categorySlug={main.categorySlug} noLink={true} className="mb-3" />
            <h3 className="text-lg font-bold text-secondary line-clamp-2 leading-snug mb-2 group-hover:text-primary transition-colors">
              {main.title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2 mb-3 leading-relaxed">{main.excerpt}</p>
            <ArticleMeta
              author={main.author}
              publishedAt={main.publishedAt}
              readingTime={main.readingTime}
              compact
            />
          </div>
        </Link>

        {/* Side articles */}
        <div className="flex flex-col gap-3">
          {rest.slice(0, 3).map((article) => (
            <Link
              key={article.id}
              href={`/artikel/${article.slug}`}
              className="group flex gap-3 bg-white rounded-xl border border-gray-100 p-3 hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="relative w-20 h-16 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="80px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-secondary line-clamp-2 leading-snug group-hover:text-primary transition-colors mb-1">
                  {article.title}
                </h4>
                <ArticleMeta
                  author={article.author}
                  publishedAt={article.publishedAt}
                  readingTime={article.readingTime}
                  compact
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="md:hidden">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {articles.slice(0, 4).map((article) => (
            <Link
              key={article.id}
              href={`/artikel/${article.slug}`}
              className="group flex-shrink-0 w-56 article-card block"
            >
              <div className="relative overflow-hidden aspect-[16/10] rounded-t-xl">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="224px"
                />
              </div>
              <div className="p-3">
                <CategoryBadge category={article.category} categorySlug={article.categorySlug} noLink={true} className="mb-1.5" />
                <h3 className="text-sm font-semibold text-secondary line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <ArticleMeta
                  author={article.author}
                  publishedAt={article.publishedAt}
                  readingTime={article.readingTime}
                  compact
                  className="mt-1.5"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
