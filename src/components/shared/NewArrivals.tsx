'use client';

import React, { useState, useEffect, useCallback, Suspense, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link'; // 🚀 SEO FIX: Imported Link for semantic crawling
import { SlidersHorizontal, LayoutGrid, List, X, RefreshCcw, Loader2 } from 'lucide-react';
import clsx from 'clsx';

// Components
import { Breadcrumbs } from '@/src/components/shared/Breadcrumbs'; // 🚀 SEO FIX: Imported Breadcrumbs
import { FilterSidebar, ActiveFilters, FilterOptions } from '@/src/components/shared/FilterSidebar';
import { ProductCard } from '@/src/components/shared/ProductLayout';
import { getProducts, getCollectionProducts, getMenu, FormattedProduct } from '@/src/lib/shopify'; 

// 🚀 SEO FIX: Added Sort Option Types to support missing UI
export type SortOptionValue = 'newest' | 'price-asc' | 'price-desc' | 'alpha-asc';
const getSortSettings = (sort: SortOptionValue) => {
  switch (sort) {
    case 'price-asc':
      return { productSortKey: 'PRICE', collectionSortKey: 'PRICE', reverse: false };
    case 'price-desc':
      return { productSortKey: 'PRICE', collectionSortKey: 'PRICE', reverse: true };
    case 'alpha-asc':
      return { productSortKey: 'TITLE', collectionSortKey: 'TITLE', reverse: false };
    default:
      return { productSortKey: 'CREATED_AT', collectionSortKey: 'CREATED', reverse: true };
  }
};
const sortOptions: { value: SortOptionValue; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'alpha-asc', label: 'A → Z' },
];

// 🚀 SEO FIX: Define the InitialData interface to accept pre-rendered server data
interface InitialData {
  products: FormattedProduct[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
  filters: FilterOptions;
  collectionMap: Record<string, string>;
  bannerImage?: string;
  activeFilters?: ActiveFilters;
  sortOption?: SortOptionValue; // Added sortOption
}

interface NewArrivalsPageProps {
  collection?: any;
  initialData?: InitialData;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Internal Component: Core logic decoupled from the direct `useSearchParams` hook.
// Receives `searchParamsString` as a prop so it can safely render on the server.
// ─────────────────────────────────────────────────────────────────────────────
function NewArrivalsContentInternal({ 
  collection, 
  initialData, 
  searchParamsString 
}: NewArrivalsPageProps & { searchParamsString: string }) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Use the passed string to read parameters instead of the hook directly
  const searchParams = new URLSearchParams(searchParamsString);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [itemsPerPage] = useState(12);

  // 🚀 SEO FIX: Initialize state directly with server-provided data to ensure DOM parity
  const [products, setProducts] = useState<FormattedProduct[]>(initialData?.products || []);
  const [isLoading, setIsLoading] = useState(!initialData); // Skip loading state if we have SSR data
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [pageInfo, setPageInfo] = useState(initialData?.pageInfo || { hasNextPage: false, endCursor: null as string | null });
  const [bannerImage, setBannerImage] = useState<string>(initialData?.bannerImage || '/assets/images/temporary_tattoos.webp');
  
  // STATE INITIALIZATION
  const [collectionMap, setCollectionMap] = useState<Record<string, string>>(initialData?.collectionMap || {});
  
  const [dynamicFilters, setDynamicFilters] = useState<FilterOptions>(initialData?.filters || {
    collections: [],
    styles: [],
    sizes: [],
    placements: []
  });

  const [sortOption, setSortOption] = useState<SortOptionValue>(initialData?.sortOption ?? 'newest');

  // Initialize active filters directly from the URL query parameters
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(
    initialData?.activeFilters ?? {
      collections: [],
      styles: searchParams.get('styles')?.split(',') || [],
      sizes: searchParams.get('sizes')?.split(',') || [],
      placements: searchParams.get('placements')?.split(',') || []
    }
  );

  useEffect(() => {
    setActiveFilters(prev => ({
      collections: prev.collections, // Preserve the active collection context
      styles: searchParams.get('styles')?.split(',').filter(Boolean) || [],
      sizes: searchParams.get('sizes')?.split(',').filter(Boolean) || [],
      placements: searchParams.get('placements')?.split(',').filter(Boolean) || []
    }));
    
    const urlSort = searchParams.get('sort') as SortOptionValue;
    if (urlSort) {
      setSortOption(urlSort);
    }
  }, [searchParamsString]);

  // Track if we are paginating a fallback query to prevent cursor contamination
  const fallbackModeRef = useRef<'none' | 'global_fallback'>('none');
  const isFirstRender = useRef(true);

  // 2. FETCH ALL DYNAMIC DATA
  useEffect(() => {
    if (initialData) return; // 🚀 FIX: Skip fetching if the server already provided the menu

    async function loadFilterData() {
      try {
        const menuData = await getMenu('menu-custom');
        
        // --- A. Process Collections ---
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
              if (handle) {
                const cleanHandle = handle.split('?')[0].split('#')[0];
                urlMapping[item.title] = cleanHandle;
              }
            }
          }
        };

        if (collectionsMenu && collectionsMenu.items) {
          collectionsMenu.items.forEach(processMenuItem);
        }

        const hiddenCollections = ["Home page"];
        const validCollections = flatCategories.filter(title => !hiddenCollections.includes(title));

        // --- B. Process Secondary Filters ---
        const findMenuItems = (title: string) => {
          const section = menuData?.items?.find((item: any) => 
            item.title.toLowerCase() === title.toLowerCase() || 
            item.title.toLowerCase().includes(title.toLowerCase())
          );
          return section?.items?.map((i: any) => i.title) || [];
        };

        // Update State
        setCollectionMap(urlMapping);
        setDynamicFilters({
          collections: validCollections,
          styles: findMenuItems('styles'),
          sizes: findMenuItems('sizes'),
          placements: findMenuItems('placements')
        });

      } catch (err) {
        console.error("Failed to load filter data", err);
      }
    }
    loadFilterData();
  }, [initialData]);

  // 3. HYBRID PRODUCT FETCHING LOGIC
  const fetchProducts = useCallback(async (cursor: string | null = null) => {
    // Defensively sanitize the cursor
    const safeCursor = cursor && cursor !== 'undefined' && cursor !== 'null' && cursor.trim() !== '' ? cursor : undefined;
    
    // Reset fallback mode if this is a fresh fetch (not a pagination load)
    if (!safeCursor) fallbackModeRef.current = 'none';

    if (safeCursor) setIsLoadingMore(true);
    else setIsLoading(true);

    try {
      const hasSecondaryFilters = 
        activeFilters.styles.length > 0 || 
        activeFilters.sizes.length > 0 || 
        activeFilters.placements.length > 0;

      const selectedCollection = activeFilters.collections[0];
      const baseHandle = (selectedCollection && collectionMap[selectedCollection]) 
        ? collectionMap[selectedCollection] 
        : 'new-arrival'; // ⚠️ Note: If pasting this into the Sale page, change this string to 'sale'

      let result;

      // 🚀 THE FIX: Calculate the active sort settings based on the dropdown state
      const sortSettings = getSortSettings(sortOption);

      if (!hasSecondaryFilters) {
        // SCENARIO A: Strict Collection Fetch OR Fallback
        if (fallbackModeRef.current === 'global_fallback') {
          // If we fell back previously, continue paginating the fallback query
          result = await getProducts({ 
            first: itemsPerPage, 
            after: safeCursor,
            sortKey: sortSettings.productSortKey, // 🚀 APPLIED
            reverse: sortSettings.reverse         // 🚀 APPLIED
          });
        } else {
          result = await getCollectionProducts({
            handle: baseHandle, 
            first: itemsPerPage,
            after: safeCursor,
            sortKey: sortSettings.collectionSortKey, // 🚀 APPLIED
            reverse: sortSettings.reverse            // 🚀 APPLIED
          });

          // UPDATE BANNER IMAGE IF IT EXISTS
          if (!safeCursor && result.collectionImage?.url) {
            setBannerImage(result.collectionImage.url);
          } else if (!safeCursor && !result.collectionImage?.url) {
            setBannerImage('/assets/images/temporary_tattoos.webp'); 
          }

          // 🚨 FALLBACK: If collection is empty, fetch general products
          if (result.formattedData.length === 0 && !safeCursor) {
            console.warn(`Collection '${baseHandle}' is empty. Falling back to global latest products.`);
            fallbackModeRef.current = 'global_fallback';
            result = await getProducts({ 
              first: itemsPerPage,
              sortKey: sortSettings.productSortKey, // 🚀 APPLIED
              reverse: sortSettings.reverse         // 🚀 APPLIED
            });
          }
        }
      } else {
        // SCENARIO B: Filtered Search Query within the target collection
        const queryParts = [`collection:'${baseHandle}'`];
        const buildGroup = (items: string[]) => items.map(i => `(tag:'${i}' OR "${i}")`).join(' OR ');

        if (activeFilters.styles.length > 0) queryParts.push(`(${buildGroup(activeFilters.styles)})`);
        if (activeFilters.sizes.length > 0) queryParts.push(`(${buildGroup(activeFilters.sizes)})`);
        if (activeFilters.placements.length > 0) queryParts.push(`(${buildGroup(activeFilters.placements)})`);

        result = await getProducts({
          query: queryParts.join(' AND '),
          first: itemsPerPage,
          after: safeCursor,
          sortKey: sortSettings.productSortKey, // 🚀 APPLIED
          reverse: sortSettings.reverse         // 🚀 APPLIED
        });

        // 🚨 FALLBACK: If the filtered collection query returns nothing, try general filters without strict collection binding
        if (result.formattedData.length === 0 && !safeCursor) {
          console.warn("Filtered collection query is empty. Falling back to general filtered products.");
          const fallbackQuery = queryParts.filter(part => part !== `collection:'${baseHandle}'`).join(' AND ');
          result = await getProducts({
              query: fallbackQuery || undefined,
              first: itemsPerPage,
              sortKey: sortSettings.productSortKey, // 🚀 APPLIED
              reverse: sortSettings.reverse         // 🚀 APPLIED
          });
        }
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
  }, [activeFilters, itemsPerPage, collectionMap, sortOption]); 
  
  // 🚀 FIX: Prevent double-fetching on the initial mount if we already have SSR data
  useEffect(() => {
    if (isFirstRender.current && initialData) {
      isFirstRender.current = false;
      return; 
    }
    fetchProducts(null);
  }, [activeFilters, fetchProducts, initialData]);

  // Handle Sort changes
  const handleSortChange = (value: SortOptionValue) => {
    setSortOption(value);
    setIsLoading(true);
    const params = new URLSearchParams(searchParamsString);
    params.set('sort', value);
    router.push(`${pathname || '/collections/new-arrival'}?${params.toString()}`, { scroll: false });
  };

  // 4. TOGGLE LOGIC WITH URL PUSH
  const handleToggleFilter = (group: keyof ActiveFilters | 'RESET', value?: string) => {
    if (group === 'RESET') {
      setActiveFilters({ collections: [], styles: [], sizes: [], placements: [] });
      router.push(pathname || '/collections/new-arrival', { scroll: false });
      return;
    }
    if (!value) return;

    // 1. Calculate the new state OUTSIDE of the setState updater
    const currentGroup = activeFilters[group as keyof ActiveFilters] || [];
    const isSelected = currentGroup.includes(value);

    let newGroupState;
    if (group === 'collections') {
      newGroupState = isSelected ? [] : [value];
    } else {
      newGroupState = isSelected 
        ? currentGroup.filter((item: string) => item !== value) 
        : [...currentGroup, value];
    }

    const newState = { ...activeFilters, [group]: newGroupState };

    // 2. Safely update React State
    setActiveFilters(newState);

    // 3. Trigger the router push side-effect sequentially
    const params = new URLSearchParams(searchParamsString);
    
    if (newState.styles.length > 0) params.set('styles', newState.styles.join(','));
    else params.delete('styles');
    
    if (newState.sizes.length > 0) params.set('sizes', newState.sizes.join(','));
    else params.delete('sizes');
    
    if (newState.placements.length > 0) params.set('placements', newState.placements.join(','));
    else params.delete('placements');
    
    params.set('sort', sortOption);

    const queryString = params.toString();
    
    router.push(`${pathname || '/collections/new-arrival'}${queryString ? `?${queryString}` : ''}`, { scroll: false });
  };

  // 🚀 SEO FIX: Helper function to build Semantic Links for Pagination crawlers
  const getPaginationHref = () => {
    const params = new URLSearchParams(searchParamsString);
    if (pageInfo.endCursor) params.set('cursor', pageInfo.endCursor);
    return `${pathname || '/collections/new-arrival'}?${params.toString()}`;
  };
  
  const activeFiltersCount = 
    activeFilters.collections.length + 
    activeFilters.styles.length + 
    activeFilters.sizes.length + 
    activeFilters.placements.length;

  return (
    <div className="bg-zinc-950 min-h-screen text-white selection:bg-[var(--color-brand-orange)] selection:text-black mt-20 overflow-x-hidden w-full">
      
      {/* 🚀 PREMIUM HERO BANNER REPLACEMENT */}
      <div className="container max-w-[1400px] mx-auto px-4 pt-4 md:pt-8">
        <div className="relative w-full h-[280px] md:h-[380px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group bg-zinc-900 flex items-center">
          
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img
              src={bannerImage}
              alt="New Arrivals"
              className="w-full h-full object-cover object-center opacity-60 transition-transform duration-1000 ease-out group-hover:scale-105"
            />
          </div>

          {/* Precision Gradient Overlays for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 px-8 md:px-16 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-md mb-6 shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-orange)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-brand-orange)]"></span>
              </span>
              <span className="text-[var(--color-brand-orange)] text-[10px] font-black uppercase tracking-[0.2em]">
                Fresh Drops
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-xl leading-none">
              New Arrivals
            </h1>
            
            <p className="text-zinc-300 text-sm md:text-base font-medium leading-relaxed max-w-md drop-shadow-md">
              Discover our newest temporary tattoo designs. Fresh, bold styles crafted to elevate your look instantly.
            </p>
          </div>
        </div>
      </div>

      <main className="container max-w-[1400px] mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-28 space-y-8 max-h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar pb-4 pr-4 border-r border-zinc-800/60">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-zinc-800/60">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Filters</span>
                {activeFiltersCount > 0 && (
                  <button onClick={() => handleToggleFilter('RESET')} className="text-[10px] font-bold text-[var(--color-brand-orange)] uppercase hover:text-white transition-colors">
                    Clear
                  </button>
                )}
              </div>
              <FilterSidebar filters={dynamicFilters} activeFilters={activeFilters} onToggle={handleToggleFilter} />
            </div>
          </aside>

          {/* PRODUCT LISTINGS */}
          <div className="flex-1 min-w-0 relative min-h-[500px]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-6 border-b border-zinc-800/60 gap-4">
              <div>
                {/* 🚀 SEO FIX: Added structural breadcrumbs */}
                <Breadcrumbs items={[
                  { label: 'Home', url: '/' },
                  { label: 'Collections', url: '/collections' },
                  { label: activeFilters.collections.length > 0 ? activeFilters.collections[0] : 'New Arrivals', url: '/collections/new-arrival' },
                ]} />
                <h2 className="text-3xl md:text-4xl font-heading tracking-tight text-white uppercase mt-2">
                  {activeFilters.collections.length > 0 ? activeFilters.collections[0] : 'The Latest Drops'}
                </h2>
                {!isLoading && (
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-2">
                    <span className="text-white">{products.length}</span> Fresh Designs Found
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setFilterDrawerOpen(true)} 
                  className="lg:hidden flex items-center gap-2 px-5 py-2.5 bg-zinc-900 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </button>

                {/* 🚀 SEO FIX: Injected missing Sort Options UI block */}
                <div className="hidden sm:flex items-center gap-3 mr-2">
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
                  {products.map((item, idx) => (
                    <ProductCard key={item.id} item={item} viewMode={viewMode} page="new-arrivals" index={idx} />
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
            ) : !isLoading && (
              <div className="py-24 text-center bg-zinc-900/30 border border-dashed border-zinc-800 rounded-[2rem] flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 border border-white/5">
                  <RefreshCcw className="w-8 h-8 text-zinc-500" />
                </div>
                <p className="font-black text-white uppercase tracking-widest text-lg mb-2">No matching designs</p>
                <p className="text-zinc-500 text-sm mb-6 max-w-sm mx-auto">We couldn't find any fresh drops matching your filters. Try clearing them to see all new arrivals.</p>
                {/* 🚀 SEO FIX: Converted Reset button to a standard crawlable fallback route Link */}
                <Link 
                  href={pathname || '/collections/new-arrival'}
                  onClick={(e) => {
                    e.preventDefault();
                    handleToggleFilter('RESET');
                  }} 
                  className="px-6 py-3 bg-[var(--color-brand-orange)] text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:brightness-110 transition-all shadow-md inline-block"
                >
                  Reset All Filters
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* MOBILE DRAWER */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-[70] flex justify-end lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={() => setFilterDrawerOpen(false)} />
          <div className="relative w-80 bg-zinc-950 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-white/10">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
               <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-white">Filters</h2>
               <button onClick={() => setFilterDrawerOpen(false)} className="p-2 hover:bg-zinc-900 rounded-full text-zinc-400 hover:text-white transition-colors">
                 <X className="w-4 h-4" />
               </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
              <FilterSidebar filters={dynamicFilters} activeFilters={activeFilters} onToggle={handleToggleFilter} />
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
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Component that handles reading the search parameters hook
// ─────────────────────────────────────────────────────────────────────────────
function NewArrivalsContentWithParams(props: NewArrivalsPageProps) {
  const searchParams = useSearchParams();
  const searchParamsString = searchParams?.toString() || "";
  
  return <NewArrivalsContentInternal {...props} searchParamsString={searchParamsString} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Main Export - Wraps the component in a Suspense boundary to prevent SSR bailout.
// Falls back to the pre-populated HTML version (using initialData) for Googlebot!
// ─────────────────────────────────────────────────────────────────────────────
export default function NewArrivalsPage(props: NewArrivalsPageProps) {
  return (
    <Suspense 
      fallback={<NewArrivalsContentInternal {...props} searchParamsString="" />}
    >
      <NewArrivalsContentWithParams {...props} />
    </Suspense>
  );
}