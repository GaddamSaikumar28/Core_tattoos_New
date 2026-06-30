import { NextResponse } from 'next/server';
import { getBlogs, getBlogArticles } from '@/src/lib/shopify';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.justtattoos.com';
  let urls: { loc: string; priority: string; changefreq: string }[] = [];

  try {
    const blogsRes = await getBlogs().catch(() => []);
    
    if (blogsRes && Array.isArray(blogsRes)) {
      for (const blog of blogsRes) {
        // Main blog index
        urls.push({
          loc: `${siteUrl}/blogs/${blog.handle}`,
          priority: '0.7',
          changefreq: 'weekly'
        });
        
        // Individual articles
        try {
          const blogData = await getBlogArticles(blog.handle);
          if (blogData?.articles?.edges) {
            blogData.articles.edges.forEach((edge: any) => {
              const article = edge.node;
              urls.push({
                loc: `${siteUrl}/blogs/${blog.handle}/${article.handle}`,
                priority: '0.6',
                changefreq: 'monthly' 
              });
            });
          }
        } catch (err) {
          console.error(`Sitemap: Failed to fetch articles for blog: ${blog.handle}`, err);
        }
      }
    }
  } catch (error) {
    console.error("Sitemap: Failed to fetch blogs", error);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(urlObj => `  <url>
    <loc>${urlObj.loc}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${urlObj.changefreq}</changefreq>
    <priority>${urlObj.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}