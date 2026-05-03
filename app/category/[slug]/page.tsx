import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import Breadcrumb from "@/components/common/Breadcrumb";
import ArticleCard from "@/components/article/ArticleCard";
import PopularArticleList from "@/components/article/PopularArticleList";
import AdBanner from "@/components/ads/AdBanner";
import { getCategoryBySlug } from "@/data/categories";
import { getArticlesByCategory, getPopularArticles } from "@/lib/utils";
import { categories } from "@/data/categories";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const articles = getArticlesByCategory(slug);
  const popular = getPopularArticles();

  return (
    <div className="py-6 md:py-8">
      <Container>
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: category.name }]} />

        {/* Category header */}
        <div className="mb-8 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-8 rounded-full" style={{ backgroundColor: category.color }} />
            <h1 className="text-2xl md:text-3xl font-bold text-secondary">{category.name}</h1>
          </div>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl leading-relaxed mt-2">
            {category.description}
          </p>
          <div className="mt-3 text-xs text-gray-400">
            {articles.length} artikel tersedia
          </div>
        </div>

        {/* Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          <div>
            {articles.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-lg font-medium">Belum ada artikel di kategori ini.</p>
              </div>
            ) : (
              <>
                {/* Featured article */}
                {articles[0] && (
                  <div className="mb-6">
                    <ArticleCard article={articles[0]} variant="large" />
                  </div>
                )}

                {/* Article grid */}
                {articles.length > 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {articles.slice(1).map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                )}

                {/* Pagination dummy */}
                <div className="mt-8 flex items-center justify-center gap-2">
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                        page === 1
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <span className="text-gray-400 text-sm px-2">...</span>
                  <button className="w-9 h-9 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary transition-all">
                    8
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-16 space-y-6">
              <PopularArticleList articles={popular} />
              <AdBanner variant="sidebar" />

              {/* All categories */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-primary rounded-full" />
                  <h3 className="font-bold text-secondary text-base">Semua Kategori</h3>
                </div>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <a
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${
                        cat.slug === slug
                          ? "bg-primary text-white font-medium"
                          : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: cat.slug === params.slug ? "white" : cat.color }}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
