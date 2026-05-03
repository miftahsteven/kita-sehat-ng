import Container from "@/components/layout/Container";
import HeroSlider from "@/components/home/HeroSlider";
import LatestArticles from "@/components/home/LatestArticles";
import CategorySection from "@/components/home/CategorySection";
import EditorsPick from "@/components/home/EditorsPick";
import WhatsAppCTA from "@/components/home/WhatsAppCTA";
import AdBanner from "@/components/ads/AdBanner";
import PopularArticleList from "@/components/article/PopularArticleList";
import {
  getFeaturedArticles,
  getHighlightArticles,
  getLatestArticles,
  getPopularArticles,
  getEditorPickArticles,
  getArticlesByCategory,
} from "@/lib/utils";
import { categories } from "@/data/categories";

export default function HomePage() {
  const featured = getFeaturedArticles();
  const highlights = getHighlightArticles();
  const latest = getLatestArticles(6);
  const popular = getPopularArticles();
  const editorsPick = getEditorPickArticles();

  // Category sections
  const categorySections = [
    "nutrisi",
    "keluarga",
    "jiwa",
    "kesehatan-karir",
    "pria-wanita",
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-50 py-5">
        <Container>
          <HeroSlider featured={featured} highlights={highlights} />
        </Container>
      </section>

      {/* Middle Ad Banner */}
      <section className="py-4 bg-white">
        <Container>
          <AdBanner variant="middle" />
        </Container>
      </section>

      {/* Latest Articles + Popular Sidebar */}
      <section className="py-8 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            <LatestArticles articles={latest} />
            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-16 space-y-6">
                <PopularArticleList articles={popular} />
                <AdBanner variant="sidebar" />
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Divider */}
      <div className="bg-gray-50 h-2" />

      {/* Category Sections */}
      {/* <section className="py-8 bg-white">
        <Container>
          <div className="space-y-10">
            {categorySections.map((slug) => {
              const cat = categories.find((c) => c.slug === slug);
              if (!cat) return null;
              const articles = getArticlesByCategory(slug, 4);
              return (
                <CategorySection key={slug} category={cat} articles={articles} />
              );
            })}
          </div>
        </Container>
      </section> */}

      {/* Divider */}
      <div className="bg-gray-50 h-2" />

      {/* Editor's Pick */}
      <section className="py-8 bg-white">
        <Container>
          <EditorsPick articles={editorsPick} />
        </Container>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-8 bg-gray-50">
        <Container>
          <WhatsAppCTA />
        </Container>
      </section>
    </div>
  );
}
