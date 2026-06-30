'use client';

import React, { useState, useEffect, useCallback, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link'; // 🚀 SEO FIX: Imported Link for semantic crawling
import { SlidersHorizontal, LayoutGrid, List, X, RefreshCcw, Loader2 } from 'lucide-react';
import clsx from 'clsx';

import { Breadcrumbs } from '@/src/components/shared/Breadcrumbs';
// Components
import { FilterSidebar, ActiveFilters, FilterOptions } from '@/src/components/shared/FilterSidebar';
import { ProductCard } from '@/src/components/shared/ProductLayout';
import { getProducts, getCollectionProducts, getMenu, FormattedProduct } from '@/src/lib/shopify';

export type SortOptionValue = 'newest' | 'price-asc' | 'price-desc' | 'alpha-asc';

const sortOptions: { value: SortOptionValue; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'alpha-asc', label: 'A → Z' },
];

const getSortSettings = (sort: SortOptionValue) => {
  switch (sort) {
    case 'price-asc':
      return { productSortKey: 'PRICE', collectionSortKey: 'PRICE', reverse: false };
    case 'price-desc':
      return { productSortKey: 'PRICE', collectionSortKey: 'PRICE', reverse: true };
    case 'alpha-asc':
      return { productSortKey: 'TITLE', collectionSortKey: 'TITLE', reverse: false };
    default:
      // 🚀 THE FIX: Split keys for collection vs global queries
      return { productSortKey: 'CREATED_AT', collectionSortKey: 'CREATED', reverse: true };
  }
};

interface InitialData {
  products: FormattedProduct[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
  filters: FilterOptions;
  collectionMap: Record<string, string>;
  currentCollectionTitle: string;
  activeFilters?: ActiveFilters;
  sortOption?: SortOptionValue;
}

interface DefaultCollectionProps {
  handle: string;
  initialData?: InitialData;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Internal Component: Core logic decoupled from the direct `useSearchParams` hook.
// Receives `searchParamsString` as a prop so it can safely render on the server.
// ─────────────────────────────────────────────────────────────────────────────
function DefaultCollectionContentInternal({ 
  handle, 
  initialData, 
  searchParamsString 
}: DefaultCollectionProps & { searchParamsString: string }) {
  const router = useRouter();
  
  // Use the passed string to read parameters instead of the hook directly
  const parsedSearchParams = new URLSearchParams(searchParamsString);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const [products, setProducts] = useState<FormattedProduct[]>(initialData?.products || []);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [pageInfo, setPageInfo] = useState(initialData?.pageInfo || { hasNextPage: false, endCursor: null });

  const [collectionMap, setCollectionMap] = useState<Record<string, string>>(initialData?.collectionMap || {});
  const [currentCollectionTitle, setCurrentCollectionTitle] = useState<string>(initialData?.currentCollectionTitle || '');

  const [dynamicFilters, setDynamicFilters] = useState<FilterOptions>(initialData?.filters || {
    collections: [],
    styles: [],
    sizes: [],
    placements: []
  });

  const [sortOption, setSortOption] = useState<SortOptionValue>(initialData?.sortOption ?? 'newest');

  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(
    initialData?.activeFilters ?? {
      collections: initialData ? [initialData.currentCollectionTitle] : [],
      styles: parsedSearchParams.get('styles')?.split(',') || [],
      sizes: parsedSearchParams.get('sizes')?.split(',') || [],
      placements: parsedSearchParams.get('placements')?.split(',') || []
    }
  );

  useEffect(() => {
    if (initialData?.activeFilters) {
      setActiveFilters(initialData.activeFilters);
    }
    if (initialData?.sortOption) {
      setSortOption(initialData.sortOption);
    }
  }, [initialData?.activeFilters, initialData?.sortOption]);

  useEffect(() => {
    if (initialData) return;

    async function loadFilterData() {
      try {
        const menuData = await getMenu('menu-custom');

        const collectionsMenu = menuData?.items?.find((item: any) =>
          item.title.toLowerCase() === 'collection' || item.title.toLowerCase() === 'collections'
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

        if (collectionsMenu && collectionsMenu.items) {
          collectionsMenu.items.forEach(processMenuItem);
        }

        const hiddenCollections = ["Home page", "Sale", "New Arrivals"];
        const validCollections = flatCategories.filter(title => !hiddenCollections.includes(title));

        const findMenuItems = (title: string) => {
          const section = menuData?.items?.find((item: any) =>
            item.title.toLowerCase() === title.toLowerCase() ||
            item.title.toLowerCase().includes(title.toLowerCase())
          );
          return section?.items?.map((i: any) => i.title) || [];
        };

        setCollectionMap(urlMapping);
        setCurrentCollectionTitle(foundTitle);

        setDynamicFilters({
          collections: validCollections,
          styles: findMenuItems('styles'),
          sizes: findMenuItems('sizes'),
          placements: findMenuItems('placements')
        });

        setActiveFilters(prev => ({ ...prev, collections: [foundTitle] }));

      } catch (err) {
        console.error("Failed to load filter data", err);
      }
    }
    loadFilterData();
  }, [handle, initialData]);

  useEffect(() => {
    const handleResize = () => setItemsPerPage(window.innerWidth < 1024 ? 9 : 12);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchProducts = useCallback(async (cursor: string | null = null) => {
    const safeCursor = cursor && cursor !== 'undefined' && cursor !== 'null' && cursor.trim() !== '' ? cursor : undefined;

    if (safeCursor) setIsLoadingMore(true);
    else setIsLoading(true);

    try {
      const hasSecondaryFilters =
        activeFilters.styles.length > 0 ||
        activeFilters.sizes.length > 0 ||
        activeFilters.placements.length > 0;

      let result;

      // 🚀 FIXED: Actually get the current sort settings based on dropdown!
      const sortSettings = getSortSettings(sortOption);

      if (!hasSecondaryFilters) {
        result = await getCollectionProducts({
          handle: handle,
          first: itemsPerPage,
          after: safeCursor,
          sortKey: sortSettings.collectionSortKey, // 🚀 FIXED: Uses collectionSortKey
          reverse: sortSettings.reverse
        });
      } else {
        const queryParts = [`collection:'${handle}'`];
        const buildGroup = (items: string[]) => items.map(i => `(tag:'${i}' OR "${i}")`).join(' OR ');

        if (activeFilters.styles.length > 0) queryParts.push(`(${buildGroup(activeFilters.styles)})`);
        if (activeFilters.sizes.length > 0) queryParts.push(`(${buildGroup(activeFilters.sizes)})`);
        if (activeFilters.placements.length > 0) queryParts.push(`(${buildGroup(activeFilters.placements)})`);

        result = await getProducts({
          query: queryParts.join(' AND '),
          first: itemsPerPage,
          after: safeCursor,
          sortKey: sortSettings.productSortKey, // 🚀 FIXED: Uses productSortKey
          reverse: sortSettings.reverse
        });
      }

      if (safeCursor) {
        setProducts(prev => [...prev, ...result.formattedData]);
      } else {
        setProducts(result.formattedData);
      }
      setPageInfo(result.pageInfo);
    } catch (error) {
      console.error("Failed to fetch products", error);
      if (!cursor) setProducts([]);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [handle, activeFilters, itemsPerPage, sortOption]); // 🚀 FIXED: Added sortOption to dependency array
  
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current && initialData) {
      isFirstRender.current = false;
      return;
    }
    fetchProducts(null);
  }, [activeFilters, fetchProducts, initialData]);

  const handleCategoryPillClick = (cat: string) => {
    if (cat === 'Shop All') {
      router.push('/collections');
    } else {
      const targetHandle = collectionMap[cat];
      if (targetHandle) {
        router.push(`/collections/${targetHandle}`);
      }
    }
  };

  const handleSortChange = (value: SortOptionValue) => {
    setSortOption(value);
    setIsLoading(true);
    const params = new URLSearchParams(searchParamsString);
    params.set('sort', value);
    router.push(`${window.location.pathname}?${params.toString()}`, { scroll: false });
  };

  const toggleFilter = (group: keyof ActiveFilters | 'RESET', value?: string) => {
    if (group === 'RESET') {
      setActiveFilters(prev => ({ ...prev, styles: [], sizes: [], placements: [] }));
      const params = new URLSearchParams();
      params.set('sort', sortOption);
      router.push(`/collections/${handle}?${params.toString()}`, { scroll: false });
      return;
    }

    if (group === 'collections' && value) {
      handleCategoryPillClick(value);
      return;
    }

    if (!value) return;

    setActiveFilters(prev => {
      const currentGroup = prev[group as keyof ActiveFilters] || [];
      const isSelected = currentGroup.includes(value);

      const newGroupState = isSelected
        ? currentGroup.filter((item: string) => item !== value)
        : [...currentGroup, value];

      const newState = { ...prev, [group]: newGroupState };

      const params = new URLSearchParams(searchParamsString);

      if (newState.styles.length > 0) params.set('styles', newState.styles.join(','));
      else params.delete('styles');

      if (newState.sizes.length > 0) params.set('sizes', newState.sizes.join(','));
      else params.delete('sizes');

      if (newState.placements.length > 0) params.set('placements', newState.placements.join(','));
      else params.delete('placements');

      params.set('sort', sortOption);

      const queryString = params.toString();
      router.push(queryString ? `?${queryString}` : `/collections/${handle}`, { scroll: false });

      return newState;
    });
  };

  // 🚀 SEO FIX: Helper functions to build Semantic Links for crawlers
  const getCategoryHref = (cat: string) => {
    if (cat === 'Shop All') return '/collections';
    const targetHandle = collectionMap[cat];
    return targetHandle ? `/collections/${targetHandle}` : `/collections/${handle}`;
  };

  const getPaginationHref = () => {
    const params = new URLSearchParams(searchParamsString);
    if (pageInfo.endCursor) params.set('cursor', pageInfo.endCursor);
    return `?${params.toString()}`;
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-white selection:bg-[var(--color-brand-orange)] selection:text-black mt-20 md:mt-20 overflow-x-hidden w-full">

      {/* MOBILE DRAWER */}
      <div className={clsx(
        "fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity lg:hidden",
        isFilterDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )} onClick={() => setFilterDrawerOpen(false)} />

      <div className={clsx(
        "fixed right-0 top-0 h-full w-[300px] bg-zinc-950 z-[70] shadow-2xl transition-transform duration-500 lg:hidden border-l border-white/10",
        isFilterDrawerOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 shrink-0">
            <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-white">Filters</h2>
            <button onClick={() => setFilterDrawerOpen(false)} className="p-2 hover:bg-zinc-900 rounded-full transition-colors text-zinc-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
            <FilterSidebar filters={dynamicFilters} activeFilters={activeFilters} onToggle={toggleFilter} />
          </div>
          <div className="p-6 border-t border-white/10 bg-zinc-950">
            <button
              onClick={() => setFilterDrawerOpen(false)}
              className="w-full py-4 bg-[var(--color-brand-orange)] text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:brightness-110 transition-all"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* TOP HORIZONTAL NAVIGATION PILLS */}
      <nav className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md mt-5 border-b border-white/5">
        <div className="container max-w-[1400px] mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex gap-3 overflow-x-auto pb-1 lg:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {/* 🚀 SEO FIX: Let Next.js <Link> execute natively without onClick intercept */}
            <Link
              href={getCategoryHref('Shop All')}
              className="px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border rounded-full bg-transparent text-zinc-400 border-white/10 hover:border-white/30 hover:text-white inline-block text-center"
            >
              Shop All
            </Link>

            {dynamicFilters.collections.map((cat) => (
              <Link
                key={cat}
                href={getCategoryHref(cat)}
                className={clsx(
                  "px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border rounded-full inline-block text-center",
                  activeFilters.collections.includes(cat)
                    ? "bg-[var(--color-brand-orange)] text-black border-[var(--color-brand-orange)]"
                    : "bg-transparent text-zinc-400 border-white/10 hover:border-white/30 hover:text-white"
                )}
              >
                {cat}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setFilterDrawerOpen(true)}
            className="lg:hidden shrink-0 p-2.5 bg-transparent border border-white/10 hover:border-white/30 rounded-full text-zinc-400 hover:text-white transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="container max-w-[1400px] mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-28 space-y-8 max-h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar pb-4 pr-4">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-zinc-800/60">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Filters</span>
                {(activeFilters.styles.length > 0 || activeFilters.sizes.length > 0 || activeFilters.placements.length > 0) && (
                  <button onClick={() => toggleFilter('RESET')} className="text-[10px] font-bold text-[var(--color-brand-orange)] uppercase hover:text-white transition-colors">
                    Clear
                  </button>
                )}
              </div>
              <FilterSidebar filters={dynamicFilters} activeFilters={activeFilters} onToggle={toggleFilter} />
            </div>
          </aside>

          {/* PRODUCT LISTINGS */}
          <div className="flex-1 min-w-0 relative min-h-[500px]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-6 border-b border-zinc-800/60">
              <div>
                {/* 🚀 SEO FIX: Added structural breadcrumbs above heading */}
                <Breadcrumbs items={[
                  { label: 'Home', url: '/' },
                  { label: 'Collections', url: '/collections' },
                  { label: currentCollectionTitle || handle.replace(/-/g, ' '), url: `/collections/${handle}` },
                ]} />
                <h1 className="text-3xl md:text-4xl font-heading text-white tracking-tight capitalize mt-2">
                  {currentCollectionTitle || handle.replace(/-/g, ' ')}
                </h1>
                {!isLoading && (
                  <p className="text-sm font-medium text-zinc-500 mt-2">
                    Showing <span className="text-white font-bold">{products.length}</span> Results
                  </p>
                )}
              </div>

              <div className="flex items-center self-start sm:self-auto gap-4">
                {/* 🚀 SEO FIX: Injected missing Sort Options selector dropdown UI block */}
                <div className="flex items-center gap-3">
                  <label htmlFor="sort" className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold">
                    Sort
                  </label>
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={(event) => handleSortChange(event.target.value as SortOptionValue)}
                    className="bg-zinc-900 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full px-4 py-2.5 outline-none transition-colors hover:border-white/30"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-black text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-1 bg-zinc-900/50 border border-white/10 p-1 rounded-xl shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={clsx("p-2.5 rounded-lg transition-all", viewMode === 'grid' ? "bg-zinc-800 text-[var(--color-brand-orange)] shadow-sm" : "text-zinc-500 hover:text-zinc-300")}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={clsx("p-2.5 rounded-lg transition-all", viewMode === 'list' ? "bg-zinc-800 text-[var(--color-brand-orange)] shadow-sm" : "text-zinc-500 hover:text-zinc-300")}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/50 backdrop-blur-[2px] z-10 rounded-3xl">
                <Loader2 className="w-10 h-10 text-[var(--color-brand-orange)] animate-spin" />
              </div>
            )}

            {!isLoading && products.length > 0 ? (
              <div className="flex flex-col items-center">
                <div className={clsx(
                  "w-full",
                  "grid gap-6 sm:gap-8",
                  viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                )}>
                  {products.map((item, index) => (
                    <ProductCard key={`${item.id}-${index}`} item={item} viewMode={viewMode} page="collections" index={index} priority={index <= 3} />
                  ))}
                </div>

                {pageInfo.hasNextPage && (
                  <div className="mt-16">
                    {/* 🚀 SEO FIX: Converted Load More button to a crawlable semantic Link element */}
                    <Link
                      href={getPaginationHref()}
                      onClick={(e) => {
                        e.preventDefault();
                        if (!isLoadingMore) fetchProducts(pageInfo.endCursor);
                      }}
                      aria-disabled={isLoadingMore}
                      className={clsx(
                        "px-10 py-4 border border-white/20 text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black rounded-full transition-all duration-300 flex items-center gap-3",
                        isLoadingMore && "opacity-50 pointer-events-none"
                      )}
                    >
                      {isLoadingMore && <Loader2 className="w-4 h-4 animate-spin" />}
                      {isLoadingMore ? 'Loading...' : 'Show More'}
                    </Link>
                  </div>
                )}
              </div>
            ) : (!isLoading && products.length === 0) ? (
              <div className="py-24 text-center bg-zinc-900/30 border border-dashed border-zinc-800 rounded-[2rem] flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 border border-white/5">
                  <RefreshCcw className="w-8 h-8 text-zinc-500" />
                </div>
                <p className="text-white font-bold text-lg mb-2">No products found</p>
                <p className="text-zinc-500 text-sm mb-6 max-w-sm mx-auto">We couldn't find anything matching your current filters. Try adjusting them to see more results.</p>
                {/* 🚀 SEO FIX: Converted Clear Filters button to a standard crawlable fallback route Link */}
                <Link
                  href={`/collections/${handle}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFilter('RESET');
                  }}
                  className="px-6 py-3 bg-[var(--color-brand-orange)] text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:brightness-110 transition-all shadow-md inline-block text-center"
                >
                  Clear All Filters
                </Link>
              </div>
            ) : null}

          </div>
        </div>
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Component that handles reading the search parameters hook
// ─────────────────────────────────────────────────────────────────────────────
function DefaultCollectionContentWithParams(props: DefaultCollectionProps) {
  const searchParams = useSearchParams();
  const searchParamsString = searchParams?.toString() || "";
  
  return <DefaultCollectionContentInternal {...props} searchParamsString={searchParamsString} />;
}

// 🚀 SEO FIX: Replaced duplicate server streaming component fallback with a non-semantic spinner container to eliminate duplicate HTML
function DefaultCollectionSkeletonFallback() {
  return (
    <div className="bg-zinc-950 min-h-screen mt-20 w-full flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-[var(--color-brand-orange)] animate-spin" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Main Export - Wraps the component in a Suspense boundary to prevent SSR bailout.
// Falls back to the pre-populated HTML version (using initialData) for Googlebot!
// ─────────────────────────────────────────────────────────────────────────────
export default function DefaultCollection(props: DefaultCollectionProps) {
  return (
    <Suspense fallback={<DefaultCollectionSkeletonFallback />}>
      <DefaultCollectionContentWithParams {...props} />
    </Suspense>
  );
}