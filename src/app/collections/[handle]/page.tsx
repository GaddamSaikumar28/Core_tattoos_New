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
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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

const buildActiveFilters = (resolvedSearchParams: { [key: string]: string | string[] | undefined }) => ({
  collections: normalizeSearchParam(resolvedSearchParams.category).filter((value) => value !== 'Shop All'),
  styles: normalizeSearchParam(resolvedSearchParams.styles),
  sizes: normalizeSearchParam(resolvedSearchParams.sizes),
  placements: normalizeSearchParam(resolvedSearchParams.placements),
});

// =========================================================
// 2. STRICT SEO METADATA & CANONICAL ENFORCEMENT
// =========================================================
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { handle } = await params;
  const resolvedSearchParams = await searchParams;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.justtattoos.com";
  const canonicalUrl = `${siteUrl}/collections/${handle}`;

  // 🚀 SEO FIX: Protect Crawl Budget by preventing indexing of faceted filter URLs
  const isFacetedURL = resolvedSearchParams && Object.keys(resolvedSearchParams).some(key => 
    ['styles', 'sizes', 'placements', 'category', 'cursor'].includes(key)
  );

  const collection = await getCollection(handle);
  const defaultImage = `${siteUrl}/assets/images/temporary_tattoos.webp`;

  // 🚀 HYBRID SEO LOGIC FOR SALE PAGE
  if (handle === 'sale') {
    const title = collection?.seo?.title || collection?.title || 'Flash Sale: Premium Temporary Tattoos | Just Tattoos';
    const description = collection?.seo?.description || collection?.description || 'Save big on our premium temporary tattoos. Limited-time discounts on high-end, realistic tattoo designs. Shop the flash sale before inventory runs out!';
    
    return {
      title,
      description,
      alternates: { canonical: canonicalUrl },
      robots: isFacetedURL ? { index: false, follow: true } : { index: true, follow: true },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        type: 'website',
        // 🚀 SEO FIX: Added openGraph image configurations
        images: [{ url: defaultImage, width: 1200, height: 630, alt: title }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        // 🚀 SEO FIX: Added twitter image configurations
        images: [defaultImage],
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
      robots: isFacetedURL ? { index: false, follow: true } : { index: true, follow: true },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        type: 'website',
        // 🚀 SEO FIX: Added openGraph image configurations
        images: [{ url: defaultImage, width: 1200, height: 630, alt: title }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        // 🚀 SEO FIX: Added twitter image configurations
        images: [defaultImage],
      }
    };
  }

  // Standard fallback error check for dynamic paths (floral, anime, etc.)
  if (!collection) {
    return { title: 'Collection Not Found | Just Tattoos', robots: { index: false } };
  }

  const finalTitle = collection.seo?.title || `${collection.title} | Just Tattoos`;
  const finalDescription = collection.seo?.description || collection.description || `Shop the ${collection.title} collection at Just Tattoos.`;
  // 🚀 FIX: getCollectionQuery now selects `image { url, altText, width, height }`,
  // so a real per-collection banner (when set in Shopify) is used here instead of
  // always silently falling back to the generic default — this was previously
  // impossible because the query never requested the `image` field at all.
  const collectionImage = collection.image?.url || defaultImage;
  const collectionImageWidth = collection.image?.width || 1200;
  const collectionImageHeight = collection.image?.height || 630;

  // Dynamic Shopify Collection Execution
  return {
    title: finalTitle,
    description: finalDescription,
    alternates: { canonical: canonicalUrl },
    robots: isFacetedURL ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title: collection.seo?.title || collection.title,
      description: collection.seo?.description || collection.description,
      url: canonicalUrl,
      type: 'website',
      // 🚀 SEO FIX: Added openGraph image configurations (now with real dimensions when available)
      images: [{ url: collectionImage, width: collectionImageWidth, height: collectionImageHeight, alt: collection.title || finalTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: collection.seo?.title || collection.title,
      description: collection.seo?.description || collection.description,
      // 🚀 SEO FIX: Added twitter image configurations
      images: [collectionImage],
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
  description?: string; // 🚀 SEO FIX: Optional description added to interface for schema
  imageUrl?: string;    // Added for ImageObject schema injection
  imageWidth?: number;  // 🚀 FIX: real width when Shopify has one set, for ImageObject accuracy
  imageHeight?: number; // 🚀 FIX: real height when Shopify has one set, for ImageObject accuracy
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
    const collectionData = handle !== 'sale' && handle !== 'new-arrival' ? await getCollection(handle) : null;

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
      description: collectionData?.description || collectionData?.seo?.description, // For schema
      imageUrl: collectionData?.image?.url || undefined,
      imageWidth: collectionData?.image?.width || undefined,
      imageHeight: collectionData?.image?.height || undefined,
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
  const resolvedSearchParams = await searchParams; // 🚀 SEO FIX: Awaited incoming searchParams object

  // 🚀 FIX: Verify Dynamic Collection exists first (prevents 404s on bad URLs)
  if (handle !== 'sale' && handle !== 'new-arrival') {
    const collection = await getCollection(handle);
    if (!collection) return notFound();
  }

  // Parse query filters and sort from the URL so SSR matches the browser
  const activeFilters = buildActiveFilters(resolvedSearchParams);
  const sortOption = normalizeSortParam(resolvedSearchParams.sort);
  
  // 🚀 SEO FIX: Extract cursor safely from awaited parameters object
  const cursor = typeof resolvedSearchParams.cursor === 'string' ? resolvedSearchParams.cursor : undefined;

  // 🚀 FIX: Fetch SSR data BEFORE the switchboard so all 3 routes get the SEO benefit
  const initialData = await fetchCollectionInitialData(handle, activeFilters, sortOption, cursor);

  // 🚀 SEO FIX: Schema Architecture mapping for Collections
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.justtattoos.com';
  const collectionName = initialData?.currentCollectionTitle || handle.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  // Canonical (no query string) — used for BreadcrumbList, which represents
  // site HIERARCHY and stays on the clean URL regardless of pagination/filters.
  const collectionUrl = `${siteUrl}/collections/${handle}`;

  // 🚀 FIX: CollectionPage / ItemList / Collection must track the ACTUAL
  // page being viewed (cursor, sort, filters) in their @id/url — confirmed
  // by the cursor-paginated rows in Google_Schema_Implementation_Map_
  // JustTattoos_WITH_CODE.xlsx (same pattern already applied on /collections).
  // This was previously hardcoded to the bare collectionUrl with no
  // pagination/filter awareness at all.
  const buildQueryString = (params: { [key: string]: string | string[] | undefined }): string => {
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
  const currentPageUrl = `${collectionUrl}${buildQueryString(resolvedSearchParams)}`;

  const defaultImageUrl = `${siteUrl}/assets/images/temporary_tattoos.webp`;
  // 🚀 FIX: use the collection's real image + real dimensions when Shopify has
  // one set (now possible since getCollectionQuery selects `image` at all) —
  // only fall back to the generic default + its known 1200x630 when there's
  // genuinely no collection image, instead of always hardcoding 1200x630.
  const schemaImageUrl = initialData?.imageUrl || defaultImageUrl;
  const schemaImageWidth = initialData?.imageWidth ? String(initialData.imageWidth) : '1200';
  const schemaImageHeight = initialData?.imageHeight ? String(initialData.imageHeight) : '630';

  const dynamicProductList = initialData?.products?.map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    // url: `${siteUrl}/products/${product.handle}`,
    item: {
      "@type": "Product",
      "name": product.title,
      "url": `${siteUrl}/products/${product.handle}`,  
      "image": product.media?.featuredImage,
      // 🚀 FIX: strip HTML from the rich-text description before it lands in
      // JSON-LD — same treatment already applied on the product page and the
      // /collections index; this file had regressed to the raw HTML string.
      "description": (product.description || '').replace(/<[^>]+>/g, ''),
      "offers": {
        "@type": "Offer",
        "price": product.checkout?.price,
        "priceCurrency": product.checkout?.currency || "USD",
        "availability": product.inventory?.inStock 
          ? "https://schema.org/InStock" 
          : "https://schema.org/OutOfStock",
        "url": `${siteUrl}/products/${product.handle}`
      }
    }
  })) || [];

  const hasProducts = dynamicProductList.length > 0;
  
  // Grouped Schemas inside an Array to be injected into a single script tag
  const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${currentPageUrl}#webpage`,
    "url": currentPageUrl,
    "name": collectionName,
    "isPartOf": { 
      "@type": "WebSite", 
      "@id": `${siteUrl}/#website`, 
      "name": "Just Tattoos", 
      "url": siteUrl 
    },
    ...(hasProducts && {
      "mainEntity": { 
        "@type": "ItemList", 
        "name": collectionName, 
        "itemListElement": dynamicProductList 
      }
    })
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { 
        "@type": "ListItem", 
        "position": 1, 
        "name": "Home", 
        "item": `${siteUrl}/` 
      },
      { 
        "@type": "ListItem", 
        "position": 2, 
        "name": "Collections", 
        "item": `${siteUrl}/collections` 
      },
      { 
        "@type": "ListItem", 
        "position": 3, 
        "name": collectionName, 
        "item": collectionUrl 
      }
    ]
  },
  ...(hasProducts ? [{
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${currentPageUrl}#itemlist`,
    "name": collectionName,
    "itemListElement": dynamicProductList
  }] : []),
  {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": schemaImageUrl,
    "url": schemaImageUrl,
    "caption": collectionName,
    "width": schemaImageWidth,
    "height": schemaImageHeight
  },
  ...(hasProducts ? [{
    "@context": "https://schema.org",
    "@type": "Collection",
    "name": collectionName,
    "url": currentPageUrl,
    "hasPart": dynamicProductList.map(listItem => listItem.item)
  }] : []),
];

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
      {/* 🚀 SEO FIX: Inject Full Aggregated Collection Schemas safely before rendering the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      {PageComponent}
    </>
  );
}