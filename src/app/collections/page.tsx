import { Suspense } from 'react';
import { Metadata } from 'next';
import { getProducts, getMenu, getCollectionProducts } from '@/src/lib/shopify';
import ShopAllClient from '@/src/components/shared/ShopAllClient';
import { Loader2 } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.justtattoos.com';

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
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Shop All | Just Tattoos',
      description: 'Browse our complete collection of temporary tattoos with advanced filtering and search.',
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

  // 🚀 SEO FIX: Construct highly explicit ItemList structured data arrays safely
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Shop All | Just Tattoos',
    description: 'Browse our complete collection of temporary tattoos with advanced filtering and search.',
    url: `${siteUrl}/collections`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: (result?.formattedData || []).map((product: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}/products/${product.handle}`
      }))
    }
  };

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
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
          Loading Collection...
        </span>
      </div>
    </div>
  );
}