import { apiFetch } from "./api";

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: { name: string; slug: string };
  coverImage: string;
  author: { name: string };
  publishedAt: string;
  viewCount: number;
  isFeatured: boolean;
  isHero: boolean;
  isEditorPick: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  updatedAt: string;
};

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateShort(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getSafeImageUrl(url: string | null | undefined, fallback = "https://placehold.co/800x450?text=No+Image"): string {
  if (!url || typeof url !== "string" || url.trim() === "") {
    return fallback;
  }
  if (url.startsWith("http")) return url;
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4003";
  return `${API_BASE}${url}`;
}

export function getTodayDate(): string {
  return new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function getLatestArticles(limit = 6): Promise<Article[]> {
  try {
    const res = await apiFetch(`/api/articles?limit=${limit}&sort=latest`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getHeroArticles(limit = 5): Promise<Article[]> {
  try {
    const res = await apiFetch(`/api/articles?limit=${limit}&hero=true&sort=latest`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getFeaturedArticles(limit = 4): Promise<Article[]> {
  try {
    const res = await apiFetch(`/api/articles?limit=${limit}&featured=true&sort=latest`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getEditorPicks(limit = 4): Promise<Article[]> {
  try {
    const res = await apiFetch(`/api/articles?limit=${limit}&editorPick=true&sort=latest`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getArticlesByCategory(categorySlug: string, page = 1, limit = 10): Promise<{ articles: Article[], meta: any }> {
  try {
    const res = await apiFetch(`/api/articles?category=${categorySlug}&page=${page}&limit=${limit}`);
    return { articles: res.data, meta: res.meta };
  } catch (err) {
    console.error(err);
    return { articles: [], meta: { total: 0, page: 1, lastPage: 1 } };
  }
}

export async function getPopularArticles(limit = 5): Promise<Article[]> {
  try {
    const res = await apiFetch(`/api/articles?limit=${limit}&sort=popular`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getArticleDetail(slug: string): Promise<{ article: Article, relatedArticles: Article[] } | null> {
  try {
    const res = await apiFetch(`/api/articles/${slug}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const data = await getArticleDetail(slug);
    return data?.article || null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export type ArticleFilters = {
  search?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  sort?: "latest" | "popular" | "featured";
  page?: number;
  limit?: number;
};

export async function getArticles(filters: ArticleFilters = {}): Promise<{ articles: Article[], meta: any }> {
  try {
    const params = new URLSearchParams();
    if (filters.search) params.append("search", filters.search);
    if (filters.category) params.append("category", filters.category);
    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);
    if (filters.sort) params.append("sort", filters.sort);
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());

    const res = await apiFetch(`/api/articles?${params.toString()}`);
    return { articles: res.data, meta: res.meta };
  } catch (err) {
    console.error(err);
    return { articles: [], meta: { total: 0, page: 1, lastPage: 1 } };
  }
}

export async function searchArticles(query: string, page = 1, limit = 10): Promise<{ articles: Article[], meta: any }> {
  return getArticles({ search: query, page, limit });
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function calculateReadingTime(content: string | null | undefined): string {
  if (!content) return "1 menit";
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} menit`;
}

export async function incrementArticleView(articleId: string): Promise<void> {
  try {
    const sessionKey = `viewed_article_${articleId}`;
    if (typeof window !== "undefined" && !sessionStorage.getItem(sessionKey)) {
      await apiFetch("/api/articles/views", {
        method: "POST",
        body: JSON.stringify({ articleId }),
      });
      sessionStorage.setItem(sessionKey, "true");
    }
  } catch (err) {
    console.error("Failed to increment view count", err);
  }
}

