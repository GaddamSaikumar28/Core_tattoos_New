import { NextResponse } from 'next/server';
import { getProducts } from '@/src/lib/shopify';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.justtattoos.com';
  let products: any[] = [];

  try {
    let hasNextPage = true;
    let cursor = null;
    
    while (hasNextPage) {
      const productsRes: any = await getProducts({ first: 250, after: cursor });
      products = [...products, ...(productsRes?.formattedData || [])];
      
      hasNextPage = productsRes?.pageInfo?.hasNextPage || false;
      cursor = productsRes?.pageInfo?.endCursor || null;
      if (!hasNextPage) break;
    }
  } catch (error) {
    console.error("Sitemap: Failed to fetch products", error);
  }

  // Generate XML with proper Google Image Namespace
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${products.map(product => {
  // 🚀 FIX: Now correctly referencing your custom 'media' object from the mapper
  const imageUrl = product.media?.featuredImage || (product.media?.gallery && product.media.gallery[0]?.url) || '';
  const safeTitle = (product.title || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  return `  <url>
    <loc>${siteUrl}/products/${product.handle}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>${imageUrl ? `
    <image:image>
      <image:loc>${imageUrl.replace(/&/g, '&amp;')}</image:loc>
      <image:title>${safeTitle}</image:title>
    </image:image>` : ''}
  </url>`;
}).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: { 
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}