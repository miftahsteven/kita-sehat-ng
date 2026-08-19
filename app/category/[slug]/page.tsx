import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import Breadcrumb from "@/components/common/Breadcrumb";
import ArticleCard from "@/components/article/ArticleCard";
import PopularArticleList from "@/components/article/PopularArticleList";
import AdBanner from "@/components/ads/AdBanner";
import { getCategoryBySlug } from "@/data/categories";
import { getArticlesByCategory, getPopularArticles } from "@/lib/utils";
import { categories } from "@/data/categories";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page: pageStr } = await searchParams;
  const page = parseInt(pageStr || "1");
  
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const { articles, meta } = await getArticlesByCategory(slug, page, 10);
  const popular = await getPopularArticles();

  const totalPages = meta.lastPage || 1;

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
            {meta.total} artikel tersedia
          </div>
        </div>

        {/* Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          <div>
            {/* Sub Topic Banner */}
            <AdBanner variant="sub-topic" className="mb-6" />

            {articles.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-lg font-medium">Belum ada artikel di kategori ini.</p>
              </div>
            ) : (
              <>
                {/* Article grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    {/* Previous Button */}
                    {page > 1 && (
                      <Link
                        href={`/category/${slug}?page=${page - 1}`}
                        className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
                      >
                        Previous
                      </Link>
                    )}

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(p => p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1))
                        .map((p, i, arr) => {
                          const showEllipsis = i > 0 && p !== arr[i - 1] + 1;
                          return (
                            <div key={p} className="flex items-center gap-1.5">
                              {showEllipsis && <span className="text-slate-400">...</span>}
                              <Link
                                href={`/category/${slug}?page=${p}`}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                                  p === page
                                    ? "bg-[#0098b0] text-white shadow-lg shadow-cyan-500/30"
                                    : "bg-white border border-slate-100 text-slate-500 hover:border-[#0098b0] hover:text-[#0098b0]"
                                }`}
                              >
                                {p}
                              </Link>
                            </div>
                          );
                        })}
                    </div>

                    {/* Next Button */}
                    {page < totalPages && (
                      <Link
                        href={`/category/${slug}?page=${page + 1}`}
                        className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
                      >
                        Next
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-16 space-y-6">
              {/* Mini Ads above Popular Articles */}
              <AdBanner variant="mini-ads" />

              <PopularArticleList articles={popular} />

              {/* All categories */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-primary rounded-full" />
                  <h3 className="font-bold text-secondary text-base">Semua Kategori</h3>
                </div>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <Link
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
                        style={{ backgroundColor: cat.slug === slug ? "white" : cat.color }}
                      />
                    </Link>
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

