
import { notFound } from 'next/navigation';
import { getProduct, getProductRecommendations } from '@/src/lib/shopify';
// import TattooProductDetail from '@/src/components/TattooProductDetail';
// import { RelatedProducts } from '@/src/components/RelatedProducts';

import TattooProductDetail from '@/src/components/sections/TattooProductDetail';
import { RelatedProducts } from '@/src/components/sections/RelatedProducts';
import { Metadata } from 'next';

type Props = {
  // In Next.js 15+, params is a Promise
  params: Promise<{ handle: string }>;
};

// =========================================================
// 1. DYNAMIC SEO METADATA GENERATION
// =========================================================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.handle;

  const product = await getProduct(slug);

  if (!product) {
    return { 
      title: 'Product Not Found | Just Tattoos',
      description: 'The requested tattoo could not be found.'
    };
  }

  return {
    title: `${product.title} | Just Tattoos`,
    description: product.description || `Shop our premium ${product.styling.tattooColorType} temporary tattoo: ${product.title}.`,
    openGraph: {
      title: `${product.title} | Just Tattoos`,
      description: product.description || `Shop our premium temporary tattoo.`,
      images: product.media.featuredImage ? [
        {
          url: product.media.featuredImage,
          width: 800,
          height: 800,
          alt: product.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description,
      images: product.media.featuredImage ? [product.media.featuredImage] : [],
    }
  };
}

// =========================================================
// 2. MAIN SERVER COMPONENT
// =========================================================
export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.handle;

  // 1. Fetch the main product data from Shopify
  const product = await getProduct(slug);

  // 2. Handle 404 securely if the user types a random URL
  if (!product) {
    notFound();
  }

  // 3. Fetch Shopify's AI-driven related products using the product ID
  const relatedProducts = await getProductRecommendations(product.id);

  return (
    <div className="bg-white min-h-screen">
      {/* The UI component we built that handles the image gallery, 
        variants, pricing, and "Add to Cart" state 
      */}
      <TattooProductDetail product={product} />

      {/* The Related Products Carousel we built, placed seamlessly 
        at the bottom of the page 
      */}
      {relatedProducts && relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </div>
  );
}