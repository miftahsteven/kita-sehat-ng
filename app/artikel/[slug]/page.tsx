import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Breadcrumb from "@/components/common/Breadcrumb";
import CategoryBadge from "@/components/article/CategoryBadge";
import ArticleMeta from "@/components/article/ArticleMeta";
import RelatedArticles from "@/components/article/RelatedArticles";
import PopularArticleList from "@/components/article/PopularArticleList";
import AdBanner from "@/components/ads/AdBanner";
import { getArticleBySlug, getRelatedArticles, getPopularArticles } from "@/lib/utils";
import { dummyArticles } from "@/data/dummyArticles";
import { Share2, Facebook, Twitter, Link as LinkIcon, AlertCircle } from "lucide-react";
import { HEALTH_DISCLAIMER } from "@/lib/constants";
import { categories } from "@/data/categories";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return dummyArticles.map((article) => ({ slug: article.slug }));
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article, 3);
  const popular = getPopularArticles();

  const defaultContent = `
<p>${article.excerpt}</p>

<h2>Mengapa Hal Ini Penting?</h2>
<p>Kesehatan adalah investasi jangka panjang yang sering kali diabaikan di tengah kesibukan sehari-hari. Namun memahami topik ini dapat membuat perbedaan besar dalam kualitas hidup Anda dan keluarga.</p>

<h2>Apa yang Perlu Anda Ketahui</h2>
<p>Berdasarkan penelitian terbaru dan rekomendasi dari para tenaga kesehatan profesional, ada beberapa hal penting yang perlu dipahami terkait topik ini:</p>
<ul>
<li>Konsistensi adalah kunci — perubahan kecil yang dilakukan secara rutin lebih efektif daripada perubahan besar yang tidak berkelanjutan.</li>
<li>Setiap orang memiliki kondisi yang berbeda — apa yang berhasil untuk satu orang belum tentu cocok untuk yang lain.</li>
<li>Konsultasikan dengan tenaga medis profesional sebelum membuat perubahan signifikan pada gaya hidup atau pola makan Anda.</li>
</ul>

<h2>Langkah Praktis yang Bisa Dilakukan</h2>
<p>Mulailah dengan langkah-langkah kecil yang realistis dan dapat dilakukan setiap hari. Tidak perlu perubahan drastis — cukup komitmen untuk menjadi sedikit lebih baik setiap harinya.</p>

<blockquote>Kesehatan bukan tujuan akhir, melainkan cara hidup yang dijalani dengan penuh kesadaran setiap hari.</blockquote>

<h2>Tips dari Para Ahli</h2>
<p>Para dokter dan ahli kesehatan menyarankan untuk tidak terburu-buru dalam mengejar hasil. Proses yang berkelanjutan dengan motivasi yang tepat jauh lebih penting daripada hasil instan yang tidak bertahan lama.</p>

<p>Dengan menerapkan informasi ini secara konsisten, Anda dan keluarga dapat merasakan manfaat kesehatan yang nyata dalam jangka panjang.</p>
  `;

  return (
    <div className="py-6 md:py-8">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Main content */}
          <article>
            {/* Breadcrumb */}
            <Breadcrumb
              items={[
                { label: article.category, href: `/category/${article.categorySlug}` },
                { label: article.title },
              ]}
            />

            {/* Category + Title */}
            <div className="mb-5">
              <CategoryBadge
                category={article.category}
                categorySlug={article.categorySlug}
                size="md"
                className="mb-3"
              />
              <h1 className="text-2xl md:text-3xl font-bold text-secondary leading-tight mb-4 text-balance">
                {article.title}
              </h1>
              <ArticleMeta
                author={article.author}
                publishedAt={article.publishedAt}
                readingTime={article.readingTime}
                className="mb-4"
              />

              {/* Share buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-400 flex items-center gap-1 mr-1">
                  <Share2 className="w-3.5 h-3.5" /> Bagikan:
                </span>
                {[
                  { label: "Facebook", icon: Facebook, color: "bg-blue-600" },
                  { label: "Twitter/X", icon: Twitter, color: "bg-sky-500" },
                  { label: "Salin Link", icon: LinkIcon, color: "bg-gray-500" },
                ].map(({ label, icon: Icon, color }) => (
                  <button
                    key={label}
                    aria-label={`Bagikan ke ${label}`}
                    className={`w-8 h-8 rounded-lg ${color} text-white flex items-center justify-center hover:opacity-80 transition-opacity`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-7">
              <Image
                src={article.image}
                alt={article.title}
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
                __html: article.content || defaultContent,
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

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="text-sm text-gray-400">Tag:</span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Related Articles */}
            <RelatedArticles articles={related} />
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
