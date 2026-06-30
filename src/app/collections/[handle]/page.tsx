import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCollection, getProducts, getCollectionProducts, getMenu, FormattedProduct } from '@/src/lib/shopify';
import { ActiveFilters } from '@/src/components/shared/FilterSidebar';

// 1. Import your custom UI components
import SalePage from '@/src/components/shared/Sale';
import NewArrivalsPage from '@/src/components/shared/NewArrivals';
import DefaultCollection from '@/src/components/shared/DefaultCollection';

type SortOptionValue = 'newest' | 'price-asc' | 'price-desc' | 'alpha-asc';

type Props = {
  params: Promise<{ handle: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

const normalizeSearchParam = (value: string | string[] | undefined) => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.flatMap((item) => item.split(',').map((value) => value.trim()).filter(Boolean));
  }
  return value.split(',').map((item) => item.trim()).filter(Boolean);
};

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

const buildActiveFilters = (searchParams: Props['searchParams']) => ({
  collections: normalizeSearchParam(searchParams.category).filter((value) => value !== 'Shop All'),
  styles: normalizeSearchParam(searchParams.styles),
  sizes: normalizeSearchParam(searchParams.sizes),
  placements: normalizeSearchParam(searchParams.placements),
});

// =========================================================
// 2. STRICT SEO METADATA & CANONICAL ENFORCEMENT
// =========================================================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.justtattoos.com";
  const canonicalUrl = `${siteUrl}/collections/${handle}`;

  const collection = await getCollection(handle);

  // 🚀 HYBRID SEO LOGIC FOR SALE PAGE
  if (handle === 'sale') {
    const title = collection?.seo?.title || collection?.title || 'Flash Sale: Premium Temporary Tattoos | Just Tattoos';
    const description = collection?.seo?.description || collection?.description || 'Save big on our premium temporary tattoos. Limited-time discounts on high-end, realistic tattoo designs. Shop the flash sale before inventory runs out!';
    
    return {
      title,
      description,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        type: 'website',
      }
    };
  }

  // 🚀 HYBRID SEO LOGIC FOR NEW ARRIVALS
  if (handle === 'new-arrival') {
    const title = collection?.seo?.title || collection?.title || 'New Arrivals: Latest Temporary Tattoo Designs | Just Tattoos';
    const description = collection?.seo?.description || collection?.description || 'Explore the newest temporary tattoo drops at Just Tattoos. Discover fresh, hyper-realistic, and modern styles trending right now.';
    
    return {
      title,
      description,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        type: 'website',
      }
    };
  }

  // Standard fallback error check for dynamic paths (floral, anime, etc.)
  if (!collection) {
    return { title: 'Collection Not Found | Just Tattoos' };
  }

  // Dynamic Shopify Collection Execution
  return {
    title: collection.seo?.title || `${collection.title} | Just Tattoos`,
    description: collection.seo?.description || collection.description || `Shop the ${collection.title} collection at Just Tattoos.`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: collection.seo?.title || collection.title,
      description: collection.seo?.description || collection.description,
      url: canonicalUrl,
      type: 'website',
    }
  };
}

// =========================================================
// 3. SERVER FUNCTION: Fetch Initial Collection Data
// =========================================================
interface MenuData {
  items?: Array<{
    title: string;
    items?: Array<{
      title: string;
      url?: string;
    }>;
  }>;
}

interface InitialData {
  products: FormattedProduct[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
  filters: {
    collections: string[];
    styles: string[];
    sizes: string[];
    placements: string[];
  };
  collectionMap: Record<string, string>;
  currentCollectionTitle: string;
  activeFilters: ActiveFilters;
}

async function fetchCollectionInitialData(
  handle: string,
  activeFilters: ActiveFilters,
  sortOption: SortOptionValue,
  cursor?: string // 🚀 SEO FIX: Added cursor argument for SSR Pagination Parity
): Promise<InitialData | null> {
  try {
    // Fetch menu data for filters
    const menuData = (await getMenu('menu-custom')) as MenuData | null;

    const collectionsMenu = menuData?.items?.find(
      (item) =>
        item.title.toLowerCase() === 'collection' ||
        item.title.toLowerCase() === 'collections'
    );

    const flatCategories: string[] = [];
    const urlMapping: Record<string, string> = {};
    let foundTitle = handle.replace(/-/g, ' ');

    const processMenuItem = (item: any) => {
      if (item.items && item.items.length > 0) {
        item.items.forEach(processMenuItem);
      } else {
        flatCategories.push(item.title);
        if (item.url) {
          const urlParts = item.url.split('/').filter(Boolean);
          const mappedHandle = urlParts[urlParts.length - 1];
          if (mappedHandle) {
            const cleanHandle = mappedHandle.split('?')[0].split('#')[0];
            urlMapping[item.title] = cleanHandle;

            if (cleanHandle === handle) {
              foundTitle = item.title;
            }
          }
        }
      }
    };

    if (collectionsMenu?.items) {
      collectionsMenu.items.forEach(processMenuItem);
    }

    const findMenuItems = (title: string) => {
      const section = menuData?.items?.find(
        (item) =>
          item.title.toLowerCase() === title.toLowerCase() ||
          item.title.toLowerCase().includes(title.toLowerCase())
      );
      return section?.items?.map((i: any) => i.title) || [];
    };

    const hiddenCollections = ['Home page', 'Sale', 'New Arrivals'];
    const validCollections = flatCategories.filter((t) => !hiddenCollections.includes(t));

    const filters = {
      collections: validCollections,
      styles: findMenuItems('styles'),
      sizes: findMenuItems('sizes'),
      placements: findMenuItems('placements'),
    };

    const effectiveFilters: ActiveFilters = {
      ...activeFilters,
      collections: activeFilters.collections.length > 0 ? activeFilters.collections : [foundTitle],
    };

    const buildQuery = () => {
      const queryParts: string[] = [];
      const buildGroup = (items: string[]) => items.map((item) => `(tag:'${item}' OR "${item}")`).join(' OR ');

      if (effectiveFilters.collections.length > 0 && handle !== 'sale' && handle !== 'new-arrival') {
        queryParts.push(`collection:'${handle}'`);
      }

      if (effectiveFilters.styles.length > 0) queryParts.push(`(${buildGroup(effectiveFilters.styles)})`);
      if (effectiveFilters.placements.length > 0) queryParts.push(`(${buildGroup(effectiveFilters.placements)})`);
      if (effectiveFilters.sizes.length > 0) queryParts.push(`(${buildGroup(effectiveFilters.sizes)})`);

      // For sale/new-arrival, use collection filter explicitly when searching with secondary filters
      if ((handle === 'sale' || handle === 'new-arrival') && effectiveFilters.styles.length + effectiveFilters.placements.length + effectiveFilters.sizes.length > 0) {
        queryParts.unshift(`collection:'${handle}'`);
      }

      return queryParts.length === 0 ? undefined : queryParts.join(' AND ');
    };

    const sortSettings = getSortSettings(sortOption);

    let productsResult;
    const hasSecondaryFilters =
      activeFilters.styles.length > 0 ||
      activeFilters.sizes.length > 0 ||
      activeFilters.placements.length > 0;

    if (!hasSecondaryFilters) {
      productsResult = await getCollectionProducts({
        handle,
        first: 12,
        after: cursor,
        sortKey: sortSettings.collectionSortKey,  // 👈 Used collectionSortKey
        reverse: sortSettings.reverse,
      });
      if (productsResult.formattedData.length === 0 && handle === 'all') {
        productsResult = await getProducts({
          first: 12,
          after: cursor,
          sortKey: sortSettings.productSortKey, // 👈 Used productSortKey
          reverse: sortSettings.reverse,
        });
      }
    } else {
      const query = buildQuery();
      productsResult = await getProducts({
        query,
        first: 12,
        after: cursor,
        sortKey: sortSettings.productSortKey, // 👈 Used productSortKey
        reverse: sortSettings.reverse,
      });
    }

    return {
      products: productsResult.formattedData,
      pageInfo: productsResult.pageInfo,
      filters,
      collectionMap: urlMapping,
      currentCollectionTitle: foundTitle,
      activeFilters: effectiveFilters,
    };
  } catch (error) {
    console.error(`Failed to fetch initial data for collection ${handle}:`, error);
    return null;
  }
}

// =========================================================
// 4. MAIN SWITCHBOARD COMPONENT
// =========================================================
export default async function CollectionSwitchboardPage({ params, searchParams }: Props) {
  const { handle } = await params;

  // 🚀 FIX: Verify Dynamic Collection exists first (prevents 404s on bad URLs)
  if (handle !== 'sale' && handle !== 'new-arrival') {
    const collection = await getCollection(handle);
    if (!collection) return notFound();
  }

  // Parse query filters and sort from the URL so SSR matches the browser
  const activeFilters = buildActiveFilters(searchParams);
  const sortOption = normalizeSortParam(searchParams.sort);
  
  // 🚀 SEO FIX: Extract cursor for server-side pagination rendering
  const cursor = typeof searchParams.cursor === 'string' ? searchParams.cursor : undefined;

  // 🚀 FIX: Fetch SSR data BEFORE the switchboard so all 3 routes get the SEO benefit
  const initialData = await fetchCollectionInitialData(handle, activeFilters, sortOption, cursor);

  // 🚀 SEO FIX: Generate Collection Schema dynamically from initialData
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.justtattoos.com';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: initialData?.currentCollectionTitle || handle.replace(/-/g, ' '),
    url: `${siteUrl}/collections/${handle}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: initialData?.products?.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}/products/${product.handle}`
      })) || []
    }
  };

  // --- SWITCHBOARD LOGIC ---

  let PageComponent;
  // 1. If URL is /collections/sale, load the Sale UI with Server Data
  if (handle === 'sale') {
    PageComponent = <SalePage initialData={initialData || undefined} />;
  }
  // 2. If URL is /collections/new-arrival, load the New Arrivals UI with Server Data
  else if (handle === 'new-arrival') {
    PageComponent = <NewArrivalsPage initialData={initialData || undefined} />;
  }
  // 3. Fallback: Standard Dynamic Collections (Floral, Animal, etc.)
  else {
    PageComponent = <DefaultCollection handle={handle} initialData={initialData || undefined} />; 
  }

  return (
    <>
      {/* 🚀 SEO FIX: Inject Collection ItemList Schema safely before rendering the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {PageComponent}
    </>
  );
}