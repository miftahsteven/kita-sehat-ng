import { dummyArticles, Article } from "@/data/dummyArticles";

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getTodayDate(): string {
  return new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getFeaturedArticles(): Article[] {
  return dummyArticles.filter((a) => a.isFeatured).slice(0, 5);
}

export function getHighlightArticles(): Article[] {
  return dummyArticles.filter((a) => a.isHighlight).slice(0, 4);
}

export function getPopularArticles(): Article[] {
  return dummyArticles.filter((a) => a.isPopular).slice(0, 5);
}

export function getEditorPickArticles(): Article[] {
  return dummyArticles.filter((a) => a.isEditorsPick).slice(0, 4);
}

export function getLatestArticles(limit = 6): Article[] {
  return [...dummyArticles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getArticlesByCategory(categorySlug: string, limit?: number): Article[] {
  const filtered = dummyArticles.filter((a) => a.categorySlug === categorySlug);
  return limit ? filtered.slice(0, limit) : filtered;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return dummyArticles.find((a) => a.slug === slug);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return dummyArticles
    .filter((a) => a.categorySlug === article.categorySlug && a.id !== article.id)
    .slice(0, limit);
}

export function searchArticles(query: string): Article[] {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase();
  return dummyArticles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      (a.tags && a.tags.some((t) => t.toLowerCase().includes(q)))
  );
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
