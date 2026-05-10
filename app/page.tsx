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

export default async function HomePage() {
  // Fetch specific segments
  const heroArticles = await getHeroArticles(5); 
  const featuredArticles = await getFeaturedArticles(4); 
  const editorPickArticles = await getEditorPicks(4);
  const rawLatestArticles = await getLatestArticles(30); // Fetch even more for filtering
  const popularArticles = await getPopularArticles(5);

  // Filter latest articles:
  // 1. Not in featuredArticles (isFeatured === true)
  // 2. Not in heroArticles (currently displayed in slider)
  // 3. Not in editorPickArticles (isEditorPick === true)
  const heroIds = heroArticles.map(a => a.id);
  const editorPickIds = editorPickArticles.map(a => a.id);
  
  const latestArticles = rawLatestArticles
    .filter(a => !a.isFeatured) // Exclude all highlighted
    .filter(a => !a.isEditorPick) // Exclude editor picks
    .filter(a => !heroIds.includes(a.id)) // Exclude currently in slider
    .slice(0, 6); // Take top 6 after filtering

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

