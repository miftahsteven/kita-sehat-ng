import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Breadcrumb from "@/components/common/Breadcrumb";
import CategoryBadge from "@/components/article/CategoryBadge";
import ArticleMeta from "@/components/article/ArticleMeta";
import RelatedArticles from "@/components/article/RelatedArticles";
import PopularArticleList from "@/components/article/PopularArticleList";
import AdBanner from "@/components/ads/AdBanner";
import { getArticleDetail, getPopularArticles, getSafeImageUrl, calculateReadingTime } from "@/lib/utils";
import { Share2, Facebook, Twitter, Link as LinkIcon, AlertCircle } from "lucide-react";
import { HEALTH_DISCLAIMER } from "@/lib/constants";
import { categories } from "@/data/categories";
import ViewTracker from "@/components/article/ViewTracker";
import ShareButtons from "@/components/article/ShareButtons";



import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getArticleDetail(slug);
  
  if (!data?.article) return { title: "Artikel Tidak Ditemukan" };
  
  const { article } = data;
  const imageUrl = getSafeImageUrl(article.coverImage, "https://kita-sehat.id/og-image.jpg");

  return {
    title: article.title,
    description: article.excerpt || article.seoDescription,
    keywords: article.seoKeywords,
    openGraph: {
      title: article.title,
      description: article.excerpt || article.seoDescription,
      url: `https://kita-sehat.id/artikel/${article.slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author?.name || "Redaksi Kita Sehat"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt || article.seoDescription,
      images: [imageUrl],
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const data = await getArticleDetail(slug);
  if (!data?.article) notFound();

  const { article, relatedArticles } = data;
  const popular = await getPopularArticles();

  const imageUrl = getSafeImageUrl(article.coverImage, "https://placehold.co/1200x675?text=No+Image");

  return (
    <div className="py-6 md:py-8">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Main content */}
          <article>
            <ViewTracker articleId={article.id} />
            {/* Breadcrumb */}
            <Breadcrumb
              items={[
                { label: article.category?.name, href: `/category/${article.category?.slug}` },
                { label: article.title },
              ]}
            />

            {/* Category + Title */}
            <div className="mb-5">
              <CategoryBadge
                category={article.category?.name}
                categorySlug={article.category?.slug}
                size="md"
                className="mb-3"
              />
              <h1 className="text-2xl md:text-3xl font-bold text-secondary leading-tight mb-4 text-balance">
                {article.title}
              </h1>
              <ArticleMeta
                author={article.author?.name}
                publishedAt={article.publishedAt}
                readingTime={calculateReadingTime(article.content)}
                viewCount={article.viewCount}
                className="mb-4"
              />

              {/* Share buttons */}
              <ShareButtons title={article.title} url={`/artikel/${article.slug}`} />
            </div>

            {/* Featured Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-7">
              <Image
                src={imageUrl}
                alt={article.title || "Gambar Artikel"}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 720px"
              />
            </div>

            {/* Article body */}
            <div
              className="prose-article"
              dangerouslySetInnerHTML={{
                __html: article.content || "",
              }}
            />

            {/* Inline Ad */}
            <div className="my-8">
              <AdBanner variant="inline" />
            </div>

            {/* Health Disclaimer */}
            <div className="mt-8 p-4 rounded-xl border border-amber-200 bg-amber-50 flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-amber-700 mb-1">Perhatian Penting</p>
                <p className="text-xs text-amber-600 leading-relaxed">{HEALTH_DISCLAIMER}</p>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-12">
              <RelatedArticles articles={relatedArticles} />
            </div>

          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-16 space-y-6">
              <PopularArticleList articles={popular} />
              <AdBanner variant="sidebar" />

              {/* Categories widget */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-primary rounded-full" />
                  <h3 className="font-bold text-secondary text-base">Kategori</h3>
                </div>
                <div className="space-y-1.5">
                  {categories.map((cat) => (
                    <a
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:text-primary transition-all"
                    >
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                      {cat.name}
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

