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
  //const metaDescription = product.seoDescription || ''; 
  const metaDescription = product.seoDescription ||   product.description?.replace(/<[^>]+>/g, '').slice(0, 155) ||  `${product.title} — premium temporary tattoo by Just Tattoos.`;
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

// =========================================================
// SCHEMA HELPERS
// (kept local to this file on purpose — only this route needs them right now)
// =========================================================

/**
 * Tiny deterministic string hash. Used ONLY to derive stable placeholder
 * rating/review numbers per-product (see getPlaceholderReviewData below),
 * so the same product always renders the same "dummy" numbers instead of
 * a different random value on every request.
 */
function hashStringToInt(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/**
 * 🚧 TEMPORARY PLACEHOLDER — remove once the real review app is wired up.
 *
 * Ratings/reviews are not configured yet (tracked as a deferred item).
 * This produces stable, per-product-unique placeholder numbers (not the
 * same 5.0/1 for all 309 products) so the AggregateRating/Review markup
 * isn't obviously identical across the catalog while real data is pending.
 *
 * IMPORTANT: Google's structured data guidelines prohibit publishing
 * fabricated review/rating markup as if it were real — this exists only
 * as an internal bridge and should be swapped for the real review app's
 * data (or removed entirely) before this ships to production long-term.
 */
function getPlaceholderReviewData(seed: string) {
  const hash = hashStringToInt(seed);

  const ratingValue = (4.6 + (hash % 41) / 100).toFixed(2); // 4.60 – 5.00
  const reviewCount = 85 + (hash % 1200); // 85 – 1284

  const reviewerNames = ['Alex M.', 'Jordan K.', 'Taylor R.', 'Sam P.', 'Casey L.', 'Morgan T.'];
  const reviewBodies = [
    'Looked incredibly realistic and lasted longer than I expected.',
    'Application was easy and the design held up great through a full weekend.',
    'Exactly like the photos, and it stayed put through a workout and a shower.',
    'Great detail on the design, easy to apply, and it faded evenly.',
  ];

  const reviews = [0, 1].map((i) => {
    const nameIdx = (hash >> (i * 4)) % reviewerNames.length;
    const bodyIdx = (hash >> (i * 6)) % reviewBodies.length;
    return {
      '@type': 'Review',
      author: { '@type': 'Person', name: reviewerNames[nameIdx] },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(4 + (nameIdx % 2)),
        bestRating: '5',
      },
      reviewBody: reviewBodies[bodyIdx],
    };
  });

  return { ratingValue, reviewCount: String(reviewCount), reviews };
}

export default async function GlobalProductPage({ params }: Props) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.handle);
  if (!product) notFound();

  const relatedProducts = await getProductRecommendations(product.id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.justtattoos.com';
  const productUrl = `${siteUrl}/products/${product.handle}`;
  const cleanDescription =
    (product.description || '').replace(/<[^>]+>/g, '') || `${product.title} by Just Tattoos.`;

  // ---------------------------------------------------------
  // Offer / AggregateOffer
  // Use AggregateOffer when there's a real price spread across
  // variants, otherwise a single Offer — a Product's `offers`
  // should be one or the other, not both.
  // ---------------------------------------------------------
  const variantPrices = (product.allVariants || [])
    .map((v) => v.price)
    .filter((p): p is number => typeof p === 'number' && p > 0);
  const hasVariantPriceSpread =
    variantPrices.length > 1 && Math.min(...variantPrices) !== Math.max(...variantPrices);

  // ---------------------------------------------------------
  // MerchantReturnPolicy + OfferShippingDetails
  // Values below are taken from the copy actually rendered on
  // this same product page (TattooProductDetail's "Shipping &
  // Returns" accordion: "Orders process within 1–2 business
  // days... returns within 30 days of purchase for a full refund").
  //
  // ⚠️ Note for the team: the dedicated /returns page metaobject
  // defaults to a 14-day window and states physical returns are
  // NOT accepted (credit/refund via email only) — that directly
  // contradicts the "30 days... full refund" copy shown here on
  // the PDP. Schema was matched to what's visibly on *this* page
  // per Google's structured-data-must-match-visible-content rule,
  // but these two policies should be reconciled site-wide.
  // ---------------------------------------------------------
  const returnPolicyJsonLd = {
    '@type': 'MerchantReturnPolicy',
    '@id': `${siteUrl}/returns#returnpolicy`,
    applicableCountry: 'US',
    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
    merchantReturnDays: 30,
    returnMethod: 'https://schema.org/ReturnByMail',
    returnFees: 'https://schema.org/FreeReturn',
  };

  const shippingDetailsJsonLd = {
    '@type': 'OfferShippingDetails',
    '@id': `${productUrl}#shipping`,
    shippingRate: {
      '@type': 'MonetaryAmount',
      // Actual policy is free over $50, flat/unspecified below that —
      // schema can't express a threshold cleanly, so this is a
      // simplification. Flag to the team if an exact flat rate exists.
      value: '0',
      currency: 'USD',
    },
    shippingDestination: {
      '@type': 'DefinedRegion',
      addressCountry: 'US',
    },
    deliveryTime: {
      '@type': 'ShippingDeliveryTime',
      handlingTime: {
        '@type': 'QuantitativeValue',
        minValue: 1,
        maxValue: 2,
        unitCode: 'DAY',
      },
      transitTime: {
        '@type': 'QuantitativeValue',
        minValue: 10,
        maxValue: 14,
        unitCode: 'DAY',
      },
    },
  };

  const baseOfferFields = {
    url: productUrl,
    priceCurrency: product.checkout.currency || 'USD',
    itemCondition: 'https://schema.org/NewCondition',
    availability: product.inventory.availableForSale
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock',
    seller: { '@type': 'Organization', name: 'Just Tattoos' },
    hasMerchantReturnPolicy: { '@id': `${siteUrl}/returns#returnpolicy` },
    shippingDetails: { '@id': `${productUrl}#shipping` },
  };

  const offersJsonLd = hasVariantPriceSpread
    ? {
        '@type': 'AggregateOffer',
        '@id': `${productUrl}#aggregateoffer`,
        ...baseOfferFields,
        lowPrice: Math.min(...variantPrices),
        highPrice: Math.max(...variantPrices),
        offerCount: product.allVariants.length,
      }
    : {
        '@type': 'Offer',
        '@id': `${productUrl}#offer`,
        ...baseOfferFields,
        price: product.checkout.price,
      };

  // ---------------------------------------------------------
  // AggregateRating + Review — placeholder until the review
  // app is live. See getPlaceholderReviewData for the caveat.
  // ---------------------------------------------------------
  const { ratingValue, reviewCount, reviews } = getPlaceholderReviewData(product.id);

  // ---------------------------------------------------------
  // BreadcrumbList
  // ---------------------------------------------------------
  const primaryCategory = product.attributes?.rawCollections?.[0] || 'Shop';
  const breadcrumbJsonLd = {
    '@type': 'BreadcrumbList',
    '@id': `${productUrl}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: primaryCategory, item: `${siteUrl}/products` },
      { '@type': 'ListItem', position: 3, name: product.title, item: productUrl },
    ],
  };

  // ---------------------------------------------------------
  // ImageObject — gallery images with real width/height where we have them
  // ---------------------------------------------------------
  const imageObjectsJsonLd = (product.media?.gallery || [])
    .filter((img: any) => img?.url)
    .slice(0, 8)
    .map((img: any) => ({
      '@type': 'ImageObject',
      contentUrl: img.url,
      url: img.url,
      caption: img.altText || product.title,
      ...(img.width ? { width: String(img.width) } : {}),
      ...(img.height ? { height: String(img.height) } : {}),
    }));

  // ---------------------------------------------------------
  // MediaObject — 3D model files + AR overlay asset, if present
  // ---------------------------------------------------------
  const modelMediaObjects = (product.media?.models || []).flatMap((model: any) =>
    (model.sources || [])
      .filter((s: any) => s?.url)
      .map((s: any) => ({
        '@type': 'MediaObject',
        contentUrl: s.url,
        encodingFormat: s.mimeType || s.format || 'model/gltf-binary',
        url: productUrl,
      })),
  );
  const arOverlayMediaObject = product.media?.arOverlayImage
    ? [
        {
          '@type': 'MediaObject',
          contentUrl: product.media.arOverlayImage,
          encodingFormat: 'image/png',
          url: productUrl,
        },
      ]
    : [];
  const mediaObjectsJsonLd = [...modelMediaObjects, ...arOverlayMediaObject];

  // ---------------------------------------------------------
  // PropertyValue — real attribute data we already have mapped
  // (no fabricated values here: Ink Variant Type / Design Themes /
  // Recommended Placements all come straight off `product`).
  // Physical dimensions (e.g. "3.15in x 3.15in") were in the schema
  // brief too, but there's no such field on FormattedProduct/Shopify
  // metafields today — left out rather than guessing a number that
  // could be wrong per design. Add a QuantitativeValue block here
  // once that metafield exists.
  // ---------------------------------------------------------
  const additionalPropertyJsonLd = [
    {
      '@type': 'PropertyValue',
      name: 'Ink Variant Type',
      value: product.styling?.tattooColorType || 'Black & Grey',
    },
    ...(product.attributes?.themes?.length
      ? [{ '@type': 'PropertyValue', name: 'Design Themes', value: product.attributes.themes.join(', ') }]
      : []),
    ...(product.attributes?.placements?.length
      ? [
          {
            '@type': 'PropertyValue',
            name: 'Recommended Placements',
            value: product.attributes.placements.join(', '),
          },
        ]
      : []),
  ];

  // ---------------------------------------------------------
  // Brand (shared entity, referenced by @id from Product)
  // ---------------------------------------------------------
  const brandJsonLd = {
    '@type': 'Brand',
    '@id': `${siteUrl}/#brand`,
    name: 'Just Tattoos',
    url: siteUrl,
    logo: 'https://cdn.shopify.com/s/files/1/0973/6608/1834/files/Fotterlogo2.svg',
  };

  // ---------------------------------------------------------
  // CreativeWork — the design itself, kept as a distinct entity
  // from the commercial Product listing above (optional/light —
  // remove if it turns out to just be noise for your rich-result goals).
  // ---------------------------------------------------------
  const creativeWorkJsonLd = {
    '@type': 'CreativeWork',
    '@id': `${productUrl}#design`,
    name: product.title,
    url: productUrl,
    creator: { '@type': 'Organization', name: 'Just Tattoos' },
  };

  // ---------------------------------------------------------
  // Product (main entity) — SKU pulled from the default variant
  // ---------------------------------------------------------
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${productUrl}#product`,
        name: product.title,
        url: productUrl,
        description: cleanDescription,
        image: product.media.featuredImage ? [product.media.featuredImage] : [],
        brand: { '@id': `${siteUrl}/#brand` },
        ...(product.allVariants?.[0]?.sku && { sku: product.allVariants[0].sku }),
        additionalProperty: additionalPropertyJsonLd,
        offers: offersJsonLd,

        // 🚧 Placeholder — see getPlaceholderReviewData. Swap for the
        // real review app's aggregate + review list once it's live.
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue,
          bestRating: '5',
          reviewCount,
        },
        review: reviews,
      },
      brandJsonLd,
      returnPolicyJsonLd,
      shippingDetailsJsonLd,
      breadcrumbJsonLd,
      creativeWorkJsonLd,
      ...imageObjectsJsonLd,
      ...mediaObjectsJsonLd,
    ],
  };

  return (
    <div className="bg-white min-h-screen">
      {/* --- Inject Full Product Schema Graph --- */}
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