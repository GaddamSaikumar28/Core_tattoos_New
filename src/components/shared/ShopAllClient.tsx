'use client';

import React, { useState, useEffect, useCallback, Suspense, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link'; // 🚀 SEO FIX: Imported Link for semantic crawling
import { SlidersHorizontal, LayoutGrid, List, X, RefreshCcw, Loader2 } from 'lucide-react';
import clsx from 'clsx';

import { Breadcrumbs } from '@/src/components/shared/Breadcrumbs';
import { FilterSidebar, ActiveFilters, FilterOptions } from '@/src/components/shared/FilterSidebar';
import { ProductCard } from '@/src/components/shared/ProductLayout';
import { getProducts, FormattedProduct, getCollectionProducts } from '@/src/lib/shopify';

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
      // 🚀 THE FIX: Shopify uses CREATED_AT for global queries, but CREATED for Collections
      return { productSortKey: 'CREATED_AT', collectionSortKey: 'CREATED', reverse: true };
    }
};

interface InitialData {
  products: FormattedProduct[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
  filters: FilterOptions;
  collectionMap: Record<string, string>;
  activeFilters?: ActiveFilters;
  sortOption?: SortOptionValue;
}

interface ShopAllClientProps {
  initialData: InitialData;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Internal Component: Core logic decoupled from the direct `useSearchParams` hook.
// Receives `searchParamsString` as a prop so it can safely render on the server.
// ─────────────────────────────────────────────────────────────────────────────

function ShopAllContentInternal({ 
  initialData, 
  searchParamsString 
}: ShopAllClientProps & { searchParamsString: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const [products, setProducts] = useState<FormattedProduct[]>(initialData.products);
  const [pageInfo, setPageInfo] = useState(initialData.pageInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [sortOption, setSortOption] = useState<SortOptionValue>(
    initialData.sortOption ?? 'newest'
  );

  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(
    initialData.activeFilters ?? {
      collections: [],
      styles: [],
      sizes: [],
      placements: [],
    }
  );

  useEffect(() => {
    if (initialData.activeFilters) {
      setActiveFilters(initialData.activeFilters);
    }
  }, [initialData.activeFilters]);

  const fallbackModeRef = useRef<'none' | 'global_fallback'>('none');

  useEffect(() => {
    setProducts(initialData.products);
    setPageInfo(initialData.pageInfo);
    setIsLoading(false);
    // Only scroll to top if we are actively clicking around, not on initial load
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [initialData]);

  useEffect(() => {
    const handleResize = () => setItemsPerPage(window.innerWidth < 1024 ? 9 : 12);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const buildShopifyQuery = useCallback(() => {
    const queryParts: string[] = [];
    const buildGroup = (items: string[]) =>
      items.map((item) => `(tag:'${item}' OR "${item}")`).join(' OR ');

    if (activeFilters.collections.length > 0) {
      const cq = activeFilters.collections
        .map((item) => {
          const handle = initialData.collectionMap[item];
          return handle
            ? `(tag:'${handle}' OR tag:'${item}' OR "${handle}" OR "${item}")`
            : `(tag:'${item}' OR "${item}")`;
        })
        .join(' OR ');
      queryParts.push(`(${cq})`);
    }

    if (activeFilters.styles?.length > 0) queryParts.push(`(${buildGroup(activeFilters.styles)})`);
    if (activeFilters.placements?.length > 0) queryParts.push(`(${buildGroup(activeFilters.placements)})`);
    if (activeFilters.sizes?.length > 0) queryParts.push(`(${buildGroup(activeFilters.sizes)})`);

    return queryParts.length === 0 ? undefined : queryParts.join(' AND ');
  }, [activeFilters, initialData.collectionMap]);

  const fetchMoreProducts = async (cursor: string) => {
    setIsLoadingMore(true);
    try {
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

      const selectedCollection = activeFilters.collections[0];
      const handle = initialData.collectionMap[selectedCollection];

      let result;

      const sortSettings = getSortSettings(sortOption);

      if (hasNoFilters) {
        if (fallbackModeRef.current === 'global_fallback') {
           result = await getProducts({
             first: itemsPerPage,
             after: cursor,
             sortKey: sortSettings.productSortKey, 
             reverse: sortSettings.reverse,
           });
        } else {
          result = await getCollectionProducts({
            handle: 'all',
            first: itemsPerPage,
            after: cursor,
            sortKey: sortSettings.collectionSortKey, 
            reverse: sortSettings.reverse,
          });
          if (result.formattedData.length === 0) {
            fallbackModeRef.current = 'global_fallback';
            result = await getProducts({
              first: itemsPerPage,
              after: cursor,
              sortKey: sortSettings.productSortKey, 
              reverse: sortSettings.reverse,
            });
          }
        }
      } else if (isPureCollection && handle) {
        result = await getCollectionProducts({
          handle,
          first: itemsPerPage,
          after: cursor,
          sortKey: sortSettings.collectionSortKey, 
          reverse: sortSettings.reverse,
        });
      } else {
        result = await getProducts({
          query: buildShopifyQuery(),
          first: itemsPerPage,
          after: cursor,
          sortKey: sortSettings.productSortKey, 
          reverse: sortSettings.reverse,
        });
      }

      setProducts((prev) => [...prev, ...result.formattedData]);
      setPageInfo(result.pageInfo);
    } catch (error) {
      console.error('Failed to fetch more products', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (pageInfo.hasNextPage && pageInfo.endCursor && !isLoadingMore) {
      fetchMoreProducts(pageInfo.endCursor);
    }
  };

  const handleCategoryPillClick = (cat: string) => {
    setIsLoading(true); 
    const params = new URLSearchParams(searchParamsString);
    
    if (cat === 'Shop All') {
      params.delete('category');
      setActiveFilters((prev) => ({ ...prev, collections: [] }));
    } else {
      params.set('category', cat);
      setActiveFilters((prev) => ({ ...prev, collections: [cat] }));
    }

    params.set('sort', sortOption);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSortChange = (value: SortOptionValue) => {
    setSortOption(value);
    setIsLoading(true);
    const params = new URLSearchParams(searchParamsString);
    params.set('sort', value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const toggleFilter = (group: keyof ActiveFilters | 'RESET', value?: string) => {
    if (group === 'RESET') {
      setIsLoading(true);
      setActiveFilters({ collections: [], styles: [], sizes: [], placements: [] });
      const params = new URLSearchParams();
      params.set('sort', sortOption);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      return;
    }
    if (!value) return;

    setIsLoading(true); 
    const currentGroup = activeFilters[group as keyof ActiveFilters] || [];
    const isSelected = currentGroup.includes(value);
    const newGroupState = isSelected
      ? currentGroup.filter((i: string) => i !== value)
      : [...currentGroup, value];
      
    const newState = { ...activeFilters, [group]: newGroupState };
    setActiveFilters(newState);

    const params = new URLSearchParams(searchParamsString);
    if (newState.styles?.length > 0) params.set('styles', newState.styles.join(','));
    else params.delete('styles');
    
    if (newState.sizes?.length > 0) params.set('sizes', newState.sizes.join(','));
    else params.delete('sizes');
    
    if (newState.placements?.length > 0) params.set('placements', newState.placements.join(','));
    else params.delete('placements');

    params.set('sort', sortOption);

    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
  };

  // 🚀 SEO FIX: Helper functions to build Semantic Links for crawlers
  const getCategoryHref = (cat: string) => {
    const params = new URLSearchParams(searchParamsString);
    if (cat === 'Shop All') params.delete('category');
    else params.set('category', cat);
    params.set('sort', sortOption);
    params.delete('cursor'); // Reset pagination when changing category
    return `${pathname}?${params.toString()}`;
  };

  const getPaginationHref = () => {
    const params = new URLSearchParams(searchParamsString);
    if (pageInfo.endCursor) params.set('cursor', pageInfo.endCursor);
    return `${pathname}?${params.toString()}`;
  };

  const activeFilterCount = Object.values(activeFilters).reduce((acc, arr) => acc + arr.length, 0);
  const pageTitle = activeFilters.collections.length === 1 ? activeFilters.collections[0] : 'Shop All';

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="bg-zinc-950 min-h-screen text-white selection:bg-[var(--color-brand-orange)] selection:text-black mt-25 overflow-x-hidden w-full">

      {/* ── Mobile drawer overlay ────────────────────────────────────────── */}
      <div
        className={clsx(
          'fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          isFilterDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setFilterDrawerOpen(false)}
      />

      {/* ── Mobile drawer panel ──────────────────────────────────────────── */}
      <div
        className={clsx(
          'fixed right-0 top-0 h-full w-[300px] bg-zinc-950 z-[99] shadow-2xl',
          'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden',
          'border-l border-zinc-800',
          isFilterDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="p-6 h-full flex flex-col pt-20">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800 shrink-0">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">
              Refine
            </span>
            {activeFilterCount > 0 && (
              <span className="bg-[var(--color-brand-orange)] text-black text-[9px] font-black px-2 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
            <button
              onClick={() => setFilterDrawerOpen(false)}
              className="p-1.5 hover:bg-zinc-800 rounded-lg transition-colors ml-auto"
            >
              <X className="w-4 h-4 text-zinc-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto [scrollbar-width:none] pb-6">
            <FilterSidebar filters={initialData.filters} activeFilters={activeFilters} onToggle={toggleFilter} />
          </div>
        </div>
      </div>

      {/* ── Sticky category pill nav ─────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60">
        <div className="container max-w-[1400px] mx-auto px-4 py-3.5 flex items-center justify-between gap-4">

          <div className="flex-1 min-w-0 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-2 w-max">
              {/* 🚀 SEO FIX: Changed structural <button> to semantic Next.js <Link> */}
              <Link
                href={getCategoryHref('Shop All')}
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryPillClick('Shop All');
                }}
                scroll={false}
                className={clsx(
                  'px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap rounded-lg transition-all duration-200 border inline-block text-center',
                  activeFilters.collections.length === 0
                    ? 'bg-[var(--color-brand-orange)] text-black border-[var(--color-brand-orange)]'
                    : 'bg-transparent text-zinc-500 border-zinc-700 hover:border-zinc-400 hover:text-zinc-200'
                )}
              >
                Shop All
              </Link>

              {initialData.filters.collections.map((cat) => (
                <Link
                  key={cat}
                  href={getCategoryHref(cat)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryPillClick(cat);
                  }}
                  scroll={false}
                  className={clsx(
                    'px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap rounded-lg transition-all duration-200 border inline-block text-center',
                    activeFilters.collections.includes(cat)
                      ? 'bg-[var(--color-brand-orange)] text-black border-[var(--color-brand-orange)]'
                      : 'bg-transparent text-zinc-500 border-zinc-700 hover:border-zinc-400 hover:text-zinc-200'
                  )}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          <button
            onClick={() => setFilterDrawerOpen(true)}
            className={clsx(
              'lg:hidden shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 border text-[9px] font-black uppercase tracking-[0.15em]',
              activeFilterCount > 0
                ? 'bg-[var(--color-brand-orange)] text-black border-[var(--color-brand-orange)]'
                : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
            )}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {activeFilterCount > 0 ? `Filters (${activeFilterCount})` : 'Filters'}
          </button>
        </div>
      </nav>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className="container max-w-[1400px] mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── Desktop sidebar ──────────────────────────────────────────── */}
          <aside className="hidden lg:flex flex-col w-56 shrink-0">
            <div className="sticky top-[64px] max-h-[calc(100vh-80px)] overflow-y-auto [scrollbar-width:none] pb-6 pr-2">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">
                  Refine
                </span>
                {activeFilterCount > 0 && (
                  <span className="bg-[var(--color-brand-orange)] text-black text-[9px] font-black px-2 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <div className="h-px bg-zinc-800 mb-4" />
              <FilterSidebar filters={initialData.filters} activeFilters={activeFilters} onToggle={toggleFilter} />
            </div>
          </aside>

          {/* ── Product listing ───────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 relative min-h-[500px]">

            {/* Results bar */}
            <div className="flex items-center justify-between mb-8 pb-5 border-b border-zinc-800/60">
              <div>
                <Breadcrumbs items={[
                  { label: 'Home', url: '/' },
                  { label: 'Collections', url: '/collections' },
                  { label: pageTitle, url: '/collections' },
                ]} />
                <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                  {pageTitle}
                </h1>
                {!isLoading && (
                  <p className="text-[11px] font-bold text-zinc-500 mt-1">
                    <span className="text-white font-black">{products.length}</span> results
                  </p>
                )}
                {isLoading && (
                  <div className="h-4 w-28 bg-zinc-800 rounded animate-pulse mt-1" />
                )}
              </div>

              <div className="flex items-center gap-3">
                <label htmlFor="sort" className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold">
                  Sort
                </label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(event) => handleSortChange(event.target.value as SortOptionValue)}
                  className="bg-zinc-900 border border-zinc-700 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full px-3 py-2 outline-none transition-colors hover:border-zinc-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-black text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* View toggle */}
              <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={clsx(
                    'p-2 rounded-lg transition-all duration-200',
                    viewMode === 'grid'
                      ? 'bg-[var(--color-brand-orange)] text-black shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-300'
                  )}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={clsx(
                    'p-2 rounded-lg transition-all duration-200',
                    viewMode === 'list'
                      ? 'bg-[var(--color-brand-orange)] text-black shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-300'
                  )}
                  aria-label="List view"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ── Loading skeleton ── */}
            {isLoading && (
              <div
                className={clsx(
                  'grid gap-5',
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                    : 'grid-cols-1'
                )}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {/* ── Product grid ── */}
            {!isLoading && products.length > 0 && (
              <div className="flex flex-col items-center">
                <div
                  className={clsx(
                    'w-full grid gap-5',
                    viewMode === 'grid'
                      ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                      : 'grid-cols-1'
                  )}
                >
                  {products.map((item, index) => (
                    <ProductCard
                      key={`${item.id}-${index}`}
                      item={item}
                      viewMode={viewMode}
                      page="collections"
                      index={index}
                      priority={index <= 3}
                    />
                  ))}
                </div>

                {/* Load more */}
                {pageInfo.hasNextPage && (
                  <div className="mt-12 flex flex-col items-center gap-3">
                    {/* 🚀 SEO FIX: Converted Load More to crawlable semantic link */}
                    <Link
                      href={getPaginationHref()}
                      onClick={(e) => {
                        e.preventDefault();
                        if (!isLoadingMore) handleLoadMore();
                      }}
                      scroll={false}
                      aria-disabled={isLoadingMore}
                      className={clsx(
                        'px-10 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em]',
                        'border border-zinc-700 text-zinc-400',
                        'hover:bg-[var(--color-brand-orange)] hover:border-[var(--color-brand-orange)] hover:text-black',
                        'transition-all duration-300 flex items-center gap-2.5',
                        isLoadingMore && 'opacity-40 pointer-events-none'
                      )}
                    >
                      {isLoadingMore && <Loader2 className="w-4 h-4 animate-spin" />}
                      {isLoadingMore ? 'Loading...' : 'Show More'}
                    </Link>
                    {!isLoadingMore && (
                      <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                        {products.length} loaded
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ── Empty state ── */}
            {!isLoading && products.length === 0 && (
              <div className="py-24 text-center border border-dashed border-zinc-800 rounded-2xl flex flex-col items-center">
                <div className="w-14 h-14 bg-zinc-900 rounded-full flex items-center justify-center mb-5">
                  <RefreshCcw className="w-6 h-6 text-zinc-600" />
                </div>
                <p className="text-white font-black text-lg uppercase tracking-widest mb-2">
                  No Products Found
                </p>
                <p className="text-zinc-600 text-xs mb-8 max-w-xs mx-auto leading-relaxed">
                  We couldn't find anything matching your current filters.
                </p>
                {/* 🚀 SEO FIX: Added crawlable URL fallback to clear filters */}
                <Link
                  href={pathname}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFilter('RESET');
                  }}
                  className="px-8 py-3 bg-[var(--color-brand-orange)] text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:brightness-110 transition-all inline-block"
                >
                  Clear All Filters
                </Link>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 animate-pulse">
      <div className="aspect-[4/5] bg-zinc-800" />
      <div className="p-4 space-y-3">
        <div className="h-2.5 w-20 bg-zinc-800 rounded" />
        <div className="flex justify-between items-start gap-4">
          <div className="h-4 w-3/4 bg-zinc-800 rounded" />
          <div className="h-5 w-14 bg-zinc-800 rounded" />
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-11 w-[88px] bg-zinc-800 rounded-full" />
          <div className="h-11 flex-1 bg-zinc-800 rounded-full" />
        </div>
        <div className="h-10 w-full bg-zinc-800 rounded-full" />
        <div className="flex gap-2 pt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-[18px] h-[18px] rounded-full bg-zinc-800" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Component that handles reading the search parameters hook
// ─────────────────────────────────────────────────────────────────────────────
function ShopAllContentWithParams(props: ShopAllClientProps) {
  const searchParams = useSearchParams();
  const searchParamsString = searchParams?.toString() || "";
  
  return <ShopAllContentInternal {...props} searchParamsString={searchParamsString} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Main Export - Wraps the component in a Suspense boundary to prevent SSR bailout.
// Falls back to the pre-populated HTML version (using initialData) for Googlebot!
// ─────────────────────────────────────────────────────────────────────────────
export default function ShopAllClient(props: ShopAllClientProps) {
  return (
    <Suspense
      fallback={<ShopAllContentInternal {...props} searchParamsString="" />}
    >
      <ShopAllContentWithParams {...props} />
    </Suspense>
  );
}