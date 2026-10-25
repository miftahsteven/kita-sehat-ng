import Container from "@/components/layout/Container";
import HeroSlider from "@/components/home/HeroSlider";
import LatestArticles from "@/components/home/LatestArticles";
import CategorySection from "@/components/home/CategorySection";
import EditorsPick from "@/components/home/EditorsPick";
import WhatsAppCTA from "@/components/home/WhatsAppCTA";
import AdBanner from "@/components/ads/AdBanner";
import PopularArticleList from "@/components/article/PopularArticleList";
import {
  getLatestArticles,
  getPopularArticles,
  getHeroArticles,
  getFeaturedArticles,
  getEditorPicks
} from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch specific segments
  const heroArticles = await getHeroArticles(5); 
  const featuredArticles = await getFeaturedArticles(4); 
  const editorPickArticles = await getEditorPicks(4);
  const rawLatestArticles = await getLatestArticles(30); // Fetch even more for filtering
  const popularArticles = await getPopularArticles(5);

  // Deduplicate articles currently displayed in Hero Slider (slider + highlights)
  const topSliderIds = new Set([
    ...heroArticles.map(a => a.id),
    ...featuredArticles.map(a => a.id)
  ]);
  
  // Prefer articles not currently displayed in the top hero slider
  let latestArticles = rawLatestArticles.filter(a => !topSliderIds.has(a.id));

  // Fallback: If not enough articles (< 6), backfill from rawLatestArticles so it is never blank
  if (latestArticles.length < 6) {
    const existingIds = new Set(latestArticles.map(a => a.id));
    for (const a of rawLatestArticles) {
      if (!existingIds.has(a.id)) {
        latestArticles.push(a);
        existingIds.add(a.id);
        if (latestArticles.length >= 6) break;
      }
    }
  }

  latestArticles = latestArticles.slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-50 py-5">
        <Container>
          <HeroSlider featured={heroArticles} highlights={featuredArticles} />
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
            <LatestArticles articles={latestArticles} />
            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-16 space-y-6">
                <PopularArticleList articles={popularArticles} />
                <AdBanner variant="sidebar" />
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Divider */}
      <div className="bg-gray-50 h-2" />

      {/* Mobile Popular Articles */}
      <section className="lg:hidden py-8 bg-white">
        <Container>
          <PopularArticleList articles={popularArticles} />
        </Container>
      </section>

      {/* Editor's Pick */}
      <section className="py-8 bg-white">
        <Container>
          <EditorsPick articles={editorPickArticles} />
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

