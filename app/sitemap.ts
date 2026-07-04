import { MetadataRoute } from 'next'
import { getArticles, Article } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kita-sehat.id'

  // Get all articles
  let articles: Article[] = []
  try {
    const data = await getArticles({ limit: 1000 })
    articles = data.articles
  } catch (error) {
    console.error('Sitemap error:', error)
  }

  // Define static routes
  const routes = [
    '',
    '/tentang-kami',
    '/kontak',
    '/redaksi',
    '/category/umum',
    '/category/nutrisi',
    '/category/keluarga',
    '/category/pria-wanita',
    '/category/jiwa',
    '/category/kesehatan-karir',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Define dynamic article routes
  const articleRoutes = articles.map((article: any) => ({
    url: `${baseUrl}/artikel/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...routes, ...articleRoutes]
}
