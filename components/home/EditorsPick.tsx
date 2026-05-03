import Link from "next/link";
import Image from "next/image";
import { Article } from "@/data/dummyArticles";
import CategoryBadge from "@/components/article/CategoryBadge";
import ArticleMeta from "@/components/article/ArticleMeta";
import { Star } from "lucide-react";

interface EditorsPickProps {
  articles: Article[];
}

export default function EditorsPick({ articles }: EditorsPickProps) {
  if (articles.length === 0) return null;

  const [main, ...rest] = articles;

  return (
    <section className="rounded-2xl overflow-hidden"
      style={{ background: "linear-gradient(135deg, #e8f4fb 0%, #eef7fa 50%, #f0f5ff 100%)" }}
    >
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Star className="w-4 h-4 text-white fill-white" />
          </div>
          <div>
            <span className="block text-[10px] font-semibold text-primary uppercase tracking-widest">Pilihan Redaksi</span>
            <span className="block text-base font-bold text-secondary leading-tight">Editor&apos;s Pick</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
          {/* Main article */}
          <Link href={`/artikel/${main.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={main.image}
                alt={main.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-primary px-2.5 py-1 rounded-full">
                  ★ Pilihan Utama
                </span>
              </div>
            </div>
            <div className="p-5">
              <CategoryBadge category={main.category} categorySlug={main.categorySlug} noLink={true} className="mb-3" />
              <h3 className="text-lg font-bold text-secondary line-clamp-2 leading-snug mb-2 group-hover:text-primary transition-colors">
                {main.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-3">{main.excerpt}</p>
              <ArticleMeta
                author={main.author}
                publishedAt={main.publishedAt}
                readingTime={main.readingTime}
                compact
              />
            </div>
          </Link>

          {/* Side picks */}
          <div className="flex flex-col gap-3">
            {rest.slice(0, 3).map((article, i) => (
              <Link
                key={article.id}
                href={`/artikel/${article.slug}`}
                className="group flex gap-3 bg-white rounded-xl p-3 shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center text-[11px] font-bold text-primary">
                  {i + 2}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-secondary line-clamp-2 leading-snug group-hover:text-primary transition-colors mb-1">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-1.5">
                    <CategoryBadge category={article.category} categorySlug={article.categorySlug} noLink={true} />
                    <span className="text-[10px] text-gray-400">· {article.readingTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
