import { NextResponse } from 'next/server';
import { getCollectionNames } from '@/src/lib/shopify';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.justtattoos.com';
  let collections: any[] = [];

  try {
    const collectionsRes = await getCollectionNames();
    const hidden = ['boddy-part', 'frontpage'];
    
    collections = (collectionsRes || []).filter(
      (c: any) => !hidden.includes(c.handle.toLowerCase())
    );
  } catch (error) {
    console.error("Sitemap: Failed to fetch collections", error);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${collections.map((collection: any) => `  <url>
    <loc>${siteUrl}/collections/${collection.handle}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}