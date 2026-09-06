import { Suspense } from 'react';
import { Metadata } from 'next';
import { getProducts, getMenu, getCollectionProducts } from '@/src/lib/shopify';
import ShopAllClient from '@/src/components/shared/ShopAllClient';
import { Loader2 } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.justtattoos.com';
// Hoisted to module scope (was previously local to generateMetadata only) so
// it's also reachable from ShopAllPage below for the ImageObject schema node.
const defaultImage = `${siteUrl}/assets/images/temporary_tattoos.webp`;

type SortOptionValue = 'newest' | 'price-asc' | 'price-desc' | 'alpha-asc';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// =========================================================
// 1. DYNAMIC SEO METADATA & CRAWL BUDGET ENFORCEMENT
// =========================================================
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  
  // 🚀 SEO FIX: Protect Crawl Budget by issuing noindex on filtered/faceted URL sequences
  const isFacetedURL = resolvedParams && Object.keys(resolvedParams).some(key => 
    ['styles', 'sizes', 'placements', 'category', 'cursor', 'sort'].includes(key)
  );

  // defaultImage is now declared at module scope above (shared with ShopAllPage's schema block)
  return {
    title: 'Shop All | Just Tattoos',
    description: 'Browse our complete collection of temporary tattoos with advanced filtering and search.',
    alternates: {
      canonical: `${siteUrl}/collections`,
    },
    robots: isFacetedURL ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title: 'Shop All | Just Tattoos',
      description: 'Browse our complete collection of temporary tattoos with advanced filtering and search.',
      url: `${siteUrl}/collections`,
      type: 'website',
      // 🚀 SEO FIX: Added fallback images for OpenGraph
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: 'Shop All | Just Tattoos',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Shop All | Just Tattoos',
      description: 'Browse our complete collection of temporary tattoos with advanced filtering and search.',
      // 🚀 SEO FIX: Added fallback images for Twitter
      images: [defaultImage],
    }
  };
}

const normalizeSortParam = (value: string | string[] | undefined): SortOptionValue => {
  const raw = Array.isArray(value) ? value[0] : value;
  switch (raw) {
    case 'price-asc':
    case 'price-desc':
    case 'alpha-asc':
      return raw;
    default:
      return 'newest';
  }
};

const getSortSettings = (sort: SortOptionValue) => {
  switch (sort) {
    case 'price-asc':
      return { productSortKey: 'PRICE', collectionSortKey: 'PRICE', reverse: false };
    case 'price-desc':
      return { productSortKey: 'PRICE', collectionSortKey: 'PRICE', reverse: true };
    case 'alpha-asc':
      return { productSortKey: 'TITLE', collectionSortKey: 'TITLE', reverse: false };
    default:
      // 🚀 THE FIX: Shopify uses CREATED_AT for global queries, but CREATED for Collections
      return { productSortKey: 'CREATED_AT', collectionSortKey: 'CREATED', reverse: true };
    }
};

// =========================================================
// 2. MAIN REGISTRY COMPONENT
// =========================================================
export default async function ShopAllPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;

  // 1. Parse URL Parameters on the Server (Fixes Hydration Mismatch)
  const categoryFromUrl = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
  const stylesParam = typeof resolvedParams.styles === 'string' ? resolvedParams.styles.split(',') : [];
  const sizesParam = typeof resolvedParams.sizes === 'string' ? resolvedParams.sizes.split(',') : [];
  const placementsParam = typeof resolvedParams.placements === 'string' ? resolvedParams.placements.split(',') : [];
  const sortParam = typeof resolvedParams.sort === 'string' ? resolvedParams.sort : undefined;
  const cursor = typeof resolvedParams.cursor === 'string' ? resolvedParams.cursor : undefined;

  const activeFilters = {
    collections: categoryFromUrl && categoryFromUrl !== 'Shop All' ? [categoryFromUrl] : [],
    styles: stylesParam,
    sizes: sizesParam,
    placements: placementsParam,
  };

  const sortOption = normalizeSortParam(sortParam);
  const sortSettings = getSortSettings(sortOption);

  // 2. Fetch Menu Data for Dynamic Filters
  const menuData = await getMenu('menu-custom') as any;
  const collectionsMenu = menuData?.items?.find((item: any) =>
    item.title.toLowerCase() === 'collection' || item.title.toLowerCase() === 'collections'
  );

  const flatCategories: string[] = [];
  const urlMapping: Record<string, string> = {};

  const processMenuItem = (item: any) => {
    if (item.items && item.items.length > 0) {
      item.items.forEach(processMenuItem);
    } else {
      flatCategories.push(item.title);
      if (item.url) {
        const urlParts = item.url.split('/').filter(Boolean);
        const handle = urlParts[urlParts.length - 1];
        if (handle) urlMapping[item.title] = handle.split('?')[0].split('#')[0];
      }
    }
  };

  if (collectionsMenu?.items) collectionsMenu.items.forEach(processMenuItem);
  const hiddenCollections = ['Home page'];
  const validCollections = flatCategories.filter((t) => !hiddenCollections.includes(t));

  const findMenuItems = (title: string) => {
    const section = menuData?.items?.find((item: any) =>
      item.title.toLowerCase() === title.toLowerCase() || item.title.toLowerCase().includes(title.toLowerCase())
    );
    return section?.items?.map((i: any) => i.title) || [];
  };

  const dynamicFilters = {
    collections: validCollections,
    styles: findMenuItems('styles'),
    sizes: findMenuItems('sizes'),
    placements: findMenuItems('placements'),
  };

  // 3. Build Server-Side Query (Matches Client Logic)
  const buildShopifyQuery = () => {
    const queryParts: string[] = [];
    const buildGroup = (items: string[]) => items.map((item) => `(tag:'${item}' OR "${item}")`).join(' OR ');

    if (activeFilters.collections.length > 0) {
      const cq = activeFilters.collections.map((item) => {
        const handle = urlMapping[item];
        return handle
          ? `(tag:'${handle}' OR tag:'${item}' OR "${handle}" OR "${item}")`
          : `(tag:'${item}' OR "${item}")`;
      }).join(' OR ');
      queryParts.push(`(${cq})`);
    }

    if (activeFilters.styles.length > 0) queryParts.push(`(${buildGroup(activeFilters.styles)})`);
    if (activeFilters.placements.length > 0) queryParts.push(`(${buildGroup(activeFilters.placements)})`);
    if (activeFilters.sizes.length > 0) queryParts.push(`(${buildGroup(activeFilters.sizes)})`);

    return queryParts.length === 0 ? undefined : queryParts.join(' AND ');
  };

  // 4. Fetch Initial Products SSR
  let result;
  const hasNoFilters =
    activeFilters.collections.length === 0 &&
    activeFilters.styles.length === 0 &&
    activeFilters.sizes.length === 0 &&
    activeFilters.placements.length === 0;

  const isPureCollection =
    activeFilters.collections.length === 1 &&
    activeFilters.styles.length === 0 &&
    activeFilters.sizes.length === 0 &&
    activeFilters.placements.length === 0;

  try {
    if (hasNoFilters) {
      result = await getCollectionProducts({
        handle: 'all',
        first: 12,
        after: cursor,
        sortKey: sortSettings.collectionSortKey, // 👈 Used collectionSortKey
        reverse: sortSettings.reverse,
      });
      if (result.formattedData.length === 0) {
        result = await getProducts({
          first: 12,
          after: cursor,
          sortKey: sortSettings.productSortKey, // 👈 Used productSortKey
          reverse: sortSettings.reverse,
        });
      }
    } else if (isPureCollection && urlMapping[activeFilters.collections[0]]) {
      result = await getCollectionProducts({
        handle: urlMapping[activeFilters.collections[0]],
        first: 12,
        after: cursor,
        sortKey: sortSettings.collectionSortKey, // 👈 Used collectionSortKey
        reverse: sortSettings.reverse,
      });
    } else {
      result = await getProducts({
        query: buildShopifyQuery(),
        first: 12,
        after: cursor,
        sortKey: sortSettings.productSortKey, // 👈 Used productSortKey
        reverse: sortSettings.reverse,
      });
    }
  } catch (error) {
    console.error("SSR Fetch Error:", error);
    result = { formattedData: [], pageInfo: { hasNextPage: false, endCursor: null } };
  }

  const initialData = {
    products: result.formattedData,
    pageInfo: result.pageInfo,
    filters: dynamicFilters,
    collectionMap: urlMapping,
    activeFilters,
    sortOption,
    currentCollectionTitle: activeFilters.collections.length === 1 ? activeFilters.collections[0] : 'Shop All',
  };

  // ---------------------------------------------------------
  // 🚀 SEO FIX: Full CollectionPage schema graph
  // Covers: CollectionPage, BreadcrumbList, ItemList, ImageObject,
  // Dataset (per CONSOLIDATED_SCHEMA_BY_PAGE.md "Collections Index").
  // Everything is cross-referenced by @id the same way the product
  // page's graph is, and it's purely additive markup — none of the
  // fetching/filtering/rendering logic above or below this block changed.
  // ---------------------------------------------------------
  const collectionsUrl = `${siteUrl}/collections`;

  // The doc's own examples show the CollectionPage node's @id/url tracking
  // the ACTUAL page being viewed — e.g. a cursor-paginated URL gets its own
  // @id/url with the cursor query string, not the bare /collections one.
  // This is separate from (and doesn't touch) the `alternates.canonical`
  // above, which intentionally always points at bare /collections for
  // crawl-budget reasons — the canonical tag says "index this URL instead,"
  // while this just describes the URL that's actually rendering right now.
  const buildQueryString = (params: Record<string, string | string[] | undefined>): string => {
    const usp = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined) return;
      if (Array.isArray(value)) {
        value.forEach((v) => usp.append(key, v));
      } else {
        usp.set(key, value);
      }
    });
    const qs = usp.toString();
    return qs ? `?${qs}` : '';
  };
  const currentPageUrl = `${collectionsUrl}${buildQueryString(resolvedParams)}`;

  const isFilteredView = initialData.currentCollectionTitle !== 'Shop All';
  // "All Products" matches the doc's default naming for the master catalog;
  // a filtered view (e.g. ?category=Skulls) gets its own name/breadcrumb leaf.
  const collectionName = isFilteredView ? initialData.currentCollectionTitle : 'All Products';

  const websiteJsonLd = {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'Just Tattoos',
    url: siteUrl,
  };

  const breadcrumbJsonLd = {
    '@type': 'BreadcrumbList',
    '@id': `${collectionsUrl}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'All Products',
        item: collectionsUrl,
      },
      // Only add a third crumb when an actual category filter is active —
      // the master catalog view stays a 2-level trail per the doc's example.
      ...(isFilteredView
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: collectionName,
              item: `${collectionsUrl}?category=${encodeURIComponent(collectionName)}`,
            },
          ]
        : []),
    ],
  };

  // Reused per-product shape from the original code (kept intact), just with
  // HTML stripped from the description for cleaner, more accurate markup —
  // same treatment already applied on the product detail page.
  const itemListJsonLd = {
    '@type': 'ItemList',
    '@id': `${collectionsUrl}#itemlist`,
    name: collectionName,
    itemListElement: (result?.formattedData || []).map((product: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.title,
        url: `${siteUrl}/products/${product.handle}`,
        image: product.media?.featuredImage,
        description: (product.description || '').replace(/<[^>]+>/g, ''),
        offers: {
          '@type': 'Offer',
          price: product.checkout?.price,
          priceCurrency: product.checkout?.currency || 'USD',
          availability: product.inventory?.inStock
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          url: `${siteUrl}/products/${product.handle}`,
        },
      },
    })),
  };

  // Hero/OG image for this listing view — same asset already used for
  // openGraph/twitter above, just also marked up explicitly per the doc.
  const heroImageJsonLd = {
    '@type': 'ImageObject',
    contentUrl: defaultImage,
    url: defaultImage,
    caption: collectionName,
  };

  // Dataset is called out as "Optional/marginal" in the schema doc itself.
  // Only emitting it for the true unfiltered "All Products" view, since it's
  // meant to describe the whole catalog, not a single filtered slice of it.
  // NOTE: there's no real catalog feed/export endpoint in this codebase today
  // (no {{catalog_feed_url}} equivalent) — using the product sitemap as the
  // closest existing stand-in for `distribution.contentUrl`. Flag if you'd
  // rather point this at a real feed (Merchant Center feed, CSV export, etc.)
  // or drop the `distribution` property entirely until one exists.
  const datasetJsonLd =
    !isFilteredView
      ? [
          {
            '@type': 'Dataset',
            name: 'Just Tattoos Design Catalog',
            url: collectionsUrl,
            description:
              'Structured catalog of Just Tattoos temporary tattoo designs, including style, placement, and pricing attributes.',
            creator: { '@type': 'Organization', name: 'Just Tattoos' },
            distribution: {
              '@type': 'DataDownload',
              encodingFormat: 'application/xml',
              contentUrl: `${siteUrl}/sitemap.xml`,
            },
          },
        ]
      : [];

  const hasProducts = (result?.formattedData || []).length > 0;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${currentPageUrl}#webpage`,
        url: currentPageUrl,
        name: isFilteredView ? `${collectionName} | Just Tattoos` : 'All Products',
        description: 'Browse our complete collection of temporary tattoos with advanced filtering and search.',
        isPartOf: { '@id': `${siteUrl}/#website` },
        ...(hasProducts && { mainEntity: { '@id': `${collectionsUrl}#itemlist` } }),
      },
      websiteJsonLd,
      breadcrumbJsonLd,
      ...(hasProducts ? [itemListJsonLd] : []),
      heroImageJsonLd,
      ...datasetJsonLd,
    ],
  };
  // const jsonLd = {
  //   '@context': 'https://schema.org',
  //   '@graph': [
  //     {
  //       '@type': 'CollectionPage',
  //       '@id': `${currentPageUrl}#webpage`,
  //       url: currentPageUrl,
  //       name: isFilteredView ? `${collectionName} | Just Tattoos` : 'All Products',
  //       description: 'Browse our complete collection of temporary tattoos with advanced filtering and search.',
  //       isPartOf: { '@id': `${siteUrl}/#website` },
  //       mainEntity: { '@id': `${collectionsUrl}#itemlist` },
  //     },
  //     websiteJsonLd,
  //     breadcrumbJsonLd,
  //     itemListJsonLd,
  //     heroImageJsonLd,
  //     ...datasetJsonLd,
  //   ],
  // };

  // 5. Render Client Component (No redundant blocking Suspense around data fetch)
  return (
    <>
      {/* 🚀 SEO FIX: Inject Collection Schema cleanly into layout hierarchy */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<PageSkeleton />}>
        <ShopAllClient initialData={initialData} />
      </Suspense>
    </>
  );
}

function PageSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center mt-20">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-[var(--color-brand-orange)] animate-spin" />
        {/* 🚀 SEO FIX: Hide literal text from bots/visual, keep for screen readers */}
        <span className="sr-only">
          Loading Collection...
        </span>
      </div>
    </div>
  );
}