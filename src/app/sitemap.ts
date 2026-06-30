import { MetadataRoute } from 'next';
import { getProducts, getCollectionNames, getBlogs, getBlogArticles } from '@/src/lib/shopify';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.justtattoos.com';
  const lastModified = new Date();

  // ==========================================
  // 1. STATIC PAGES
  // ==========================================
  const staticPaths = [
    '', 
    '/about', 
    '/contact', 
    '/help', 
    '/how-it-works',
    '/privacy-policy', 
    '/returns', 
    '/shipping', 
    '/terms-of-service',
    '/collections', 
    '/tracking'
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8, // Give homepage highest priority
  }));

  // ==========================================
  // 2. PRODUCTS
  // ==========================================
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const productsRes = await getProducts({ first: 250 });
    const products = productsRes?.formattedData || [];
    
    productRoutes = products.map((product) => ({
      url: `${siteUrl}/products/${product.handle}`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9, // High priority for products
    }));
  } catch (error) {
    console.error("Sitemap Generation: Failed to fetch products", error);
  }

  // ==========================================
  // 3. COLLECTIONS
  // ==========================================
  let collectionRoutes: MetadataRoute.Sitemap = [];
  try {
    const collectionsRes = await getCollectionNames();
    
    // Preserved your exact hidden logic
    const hidden = ['boddy-part', 'frontpage'];
    const collections = (collectionsRes || []).filter(
      (c: any) => !hidden.includes(c.handle.toLowerCase())
    );

    collectionRoutes = collections.map((collection: any) => ({
      url: `${siteUrl}/collections/${collection.handle}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    }));
  } catch (error) {
    console.error("Sitemap Generation: Failed to fetch collections", error);
  }

  // ==========================================
  // 4. BLOGS & ARTICLES
  // ==========================================
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogsRes = await getBlogs().catch(() => []);
    
    if (blogsRes && Array.isArray(blogsRes)) {
      for (const blog of blogsRes) {
        // Main blog index
        blogRoutes.push({
          url: `${siteUrl}/blogs/${blog.handle}`,
          lastModified,
          changeFrequency: 'weekly',
          priority: 0.7,
        });
        
        // Individual articles
        try {
          const blogData = await getBlogArticles(blog.handle);
          if (blogData?.articles?.edges) {
            blogData.articles.edges.forEach((edge: any) => {
              const article = edge.node;
              blogRoutes.push({
                url: `${siteUrl}/blogs/${blog.handle}/${article.handle}`,
                lastModified,
                changeFrequency: 'monthly',
                priority: 0.6,
              });
            });
          }
        } catch (err) {
          console.error(`Sitemap Generation: Failed to fetch articles for blog: ${blog.handle}`, err);
        }
      }
    }
  } catch (error) {
    console.error("Sitemap Generation: Failed to fetch blogs", error);
  }

  // ==========================================
  // RETURN COMBINED SITEMAP
  // ==========================================
  return [...staticRoutes, ...collectionRoutes, ...productRoutes, ...blogRoutes];
}