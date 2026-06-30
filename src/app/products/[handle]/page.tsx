import { notFound } from 'next/navigation';
import { getProduct, getProductRecommendations } from '@/src/lib/shopify';
import TattooProductDetail from '@/src/components/sections/TattooProductDetail';
import { RelatedProducts } from '@/src/components/sections/RelatedProducts';
import { Metadata } from 'next';
import TattooProductAngleView from '@/src/components/sections/TattooProductAngleView';

type Props = { params: Promise<{ handle: string }> };

// =========================================================
// 1. STRICT SEO METADATA & CANONICAL ENFORCEMENT
// =========================================================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  
  // Fetch the product using your exact function
  const product = await getProduct(resolvedParams.handle);

  if (!product) {
    return { title: 'Product Not Found | Just Tattoos' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.justtattoos.com';
  const canonicalUrl = `${siteUrl}/products/${product.handle}`;

  // Read strictly from dedicated SEO fields, falling back to requested format if blank
  const metaTitle = product.seoTitle || `${product.title} | Just Tattoos`;
  const metaDescription = product.seoDescription || ''; 

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      images: product.media?.featuredImage 
        ? [{ url: product.media.featuredImage, width: 800, height: 800, alt: metaTitle }] 
        : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: product.media?.featuredImage ? [product.media.featuredImage] : [],
    }
  };
}


export default async function GlobalProductPage({ params }: Props) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.handle);
  if (!product) notFound();

  const relatedProducts = await getProductRecommendations(product.id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.justtattoos.com';
  
  // --- Construct the Strict Product JSON-LD ---
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description.replace(/<[^>]+>/g, ''), // Strip HTML for schema
    image: product.media.featuredImage ? [product.media.featuredImage] : [],
    brand: { '@type': 'Brand', name: 'Just Tattoos' },
    // Only grab SKU if it exists
    ...(product.allVariants?.[0]?.sku && { sku: product.allVariants[0].sku }),
    
    // 🚀 P1 SEO FIX (REVIEWS INTEGRATION PREP)
    // Uncomment and populate this block once your review app is installed.
    /*
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.reviews?.averageRating || '5.0', 
      reviewCount: product.reviews?.totalCount || '1',      
    },
    review: product.reviews?.items?.map((review: any) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
      },
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewBody: review.body
    })),
    */

    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/products/${product.handle}`,
      priceCurrency: product.checkout.currency || 'USD',
      price: product.checkout.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inventory.availableForSale 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Just Tattoos' }
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* --- Inject Product Schema --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <TattooProductDetail product={product} />
      
      {product.media?.angleViews && product.media.angleViews.length > 0 && 
        product.media?.models && product.media.models.length > 0 && (
          <TattooProductAngleView product={product} />
      )}
      
      {relatedProducts && relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </div>
  );
}