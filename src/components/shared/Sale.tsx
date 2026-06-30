'use client';

import React, { useState, useEffect, useCallback, Suspense, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link'; // 🚀 SEO FIX: Imported Link for semantic crawling
import { SlidersHorizontal, LayoutGrid, List, X, RefreshCcw, Loader2 } from 'lucide-react';
import clsx from 'clsx';

// Components
import { Breadcrumbs } from '@/src/components/shared/Breadcrumbs'; // 🚀 SEO FIX: Imported Breadcrumbs
import { FilterSidebar, ActiveFilters, FilterOptions } from '@/src/components/shared/FilterSidebar';
import { getProducts, getCollectionProducts, getMenu, FormattedProduct } from '@/src/lib/shopify'; 
import { ProductCard } from '@/src/components/shared/ProductLayout';

// 🚀 SEO FIX: Added Sort Option Types to support missing UI
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
      return { productSortKey: 'CREATED_AT', collectionSortKey: 'CREATED', reverse: true };
  }
};

// 🚀 FIX: Define the InitialData interface to match the Server Component
interface InitialData {
  products: FormattedProduct[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
  filters: FilterOptions;
  collectionMap: Record<string, string>;
  bannerImage?: string;
  activeFilters?: ActiveFilters;
  sortOption?: SortOptionValue; // 🚀 SEO FIX: Added sortOption
}

interface SalePageProps {
  collection?: any;
  initialData?: InitialData; // 🚀 FIX: Accept optional initialData
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Internal Component: Core logic decoupled from the direct `useSearchParams` hook.
// Receives `searchParamsString` as a prop so it can safely render on the server.
// ─────────────────────────────────────────────────────────────────────────────
function SaleContentInternal({ 
  collection, 
  initialData, 
  searchParamsString 
}: SalePageProps & { searchParamsString: string }) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Use the passed string to read parameters instead of the hook directly
  const searchParams = new URLSearchParams(searchParamsString);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [itemsPerPage] = useState(12);

  // 🚀 FIX: Initialize state directly with server-provided data
  const [products, setProducts] = useState<FormattedProduct[]>(initialData?.products || []);
  const [isLoading, setIsLoading] = useState(!initialData); // Skip loading state if we have SSR data
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [pageInfo, setPageInfo] = useState(initialData?.pageInfo || { hasNextPage: false, endCursor: null });
  const [bannerImage, setBannerImage] = useState<string>(initialData?.bannerImage || '/assets/images/SaleBanner.webp');
  
  // STATE INITIALIZATION
  const [collectionMap, setCollectionMap] = useState<Record<string, string>>(initialData?.collectionMap || {});

  const [dynamicFilters, setDynamicFilters] = useState<FilterOptions>(initialData?.filters || {
    collections: [],
    styles: [],
    sizes: [],
    placements: []
  });

  const [sortOption, setSortOption] = useState<SortOptionValue>(initialData?.sortOption ?? 'newest');

  // 🚀 SEO FIX: Initialize active filters directly from the URL query parameters
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(
    initialData?.activeFilters ?? {
      collections: [],
      styles: searchParams.get('styles')?.split(',') || [],
      sizes: searchParams.get('sizes')?.split(',') || [],
      placements: searchParams.get('placements')?.split(',') || []
    }
  );

  // 🚀 FIXED: Removed the initialData overwrite effect. 
  // We now strictly sync with the URL searchParams so the server cannot accidentally wipe our state.
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

  // 🚀 FIX: Track if we are paginating a fallback query so we don't cross-contaminate cursors
  const fallbackModeRef = useRef<'none' | 'all_products' | 'general_filtered'>('none');
  const isFirstRender = useRef(true);

  // 2. FETCH ALL DYNAMIC DATA (Fallback if no initialData is present)
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

  // 3. HYBRID PRODUCT FETCHING WITH FALLBACK LOGIC
  const fetchProducts = useCallback(async (cursor: string | null = null) => {
    // Reset fallback mode if this is a fresh fetch (not a pagination load)
    if (!cursor) fallbackModeRef.current = 'none';

    if (cursor) setIsLoadingMore(true);
    else setIsLoading(true);

    try {
      const hasFilters = 
        activeFilters.collections.length > 0 ||
        activeFilters.styles.length > 0 || 
        activeFilters.sizes.length > 0 || 
        activeFilters.placements.length > 0;

      let result;
      
      // 🚀 THE FIX: Calculate the active sort settings based on the dropdown state
      const sortSettings = getSortSettings(sortOption);

      if (!hasFilters) {
        // SCENARIO A: No Filters
        if (fallbackModeRef.current === 'all_products') {
          // If we fell back previously, continue paginating the fallback query
          result = await getProducts({ 
            first: itemsPerPage, 
            after: cursor || undefined,
            sortKey: sortSettings.productSortKey, // 🚀 APPLIED
            reverse: sortSettings.reverse         // 🚀 APPLIED
          });
        } else {
          // Standard 'Sale' Collection Fetch
          result = await getCollectionProducts({
            handle: 'sale', 
            first: itemsPerPage,
            after: cursor || undefined,
            sortKey: sortSettings.collectionSortKey, // 🚀 APPLIED
            reverse: sortSettings.reverse            // 🚀 APPLIED
          });
          
          // UPDATE BANNER IMAGE IF IT EXISTS
          if (!cursor && result.collectionImage?.url) {
            setBannerImage(result.collectionImage.url);
          } else if (!cursor && !result.collectionImage?.url) {
            setBannerImage('/assets/images/SaleBanner.webp'); 
          }

          // 🚨 FALLBACK: If 'sale' is empty or doesn't exist, fetch general products
          if (result.formattedData.length === 0 && !cursor) {
              console.warn("Sale collection is empty. Falling back to all products.");
              fallbackModeRef.current = 'all_products';
              result = await getProducts({ 
                first: itemsPerPage,
                sortKey: sortSettings.productSortKey, // 🚀 APPLIED
                reverse: sortSettings.reverse         // 🚀 APPLIED
              });
          }
        }

      } else {
        // SCENARIO B: Filtered Search Query within 'Sale'
        const queryParts = [`collection:'sale'`];
        const buildGroup = (items: string[]) => items.map(i => `(tag:'${i}' OR "${i}")`).join(' OR ');

        // If a collection is selected, intersect it with the sale query
        if (activeFilters.collections.length > 0) {
            const selectedCol = activeFilters.collections[0];
            const handle = collectionMap[selectedCol];
            if (handle) {
                queryParts.push(`(tag:'${handle}' OR tag:'${selectedCol}' OR "${handle}")`);
            }
        }

        if (activeFilters.styles.length > 0) queryParts.push(`(${buildGroup(activeFilters.styles)})`);
        if (activeFilters.sizes.length > 0) queryParts.push(`(${buildGroup(activeFilters.sizes)})`);
        if (activeFilters.placements.length > 0) queryParts.push(`(${buildGroup(activeFilters.placements)})`);

        if (fallbackModeRef.current === 'general_filtered') {
          // If we fell back previously, continue paginating the fallback filtered query
          const fallbackQuery = queryParts.filter(part => part !== `collection:'sale'`).join(' AND ');
          result = await getProducts({
              query: fallbackQuery || undefined,
              first: itemsPerPage,
              after: cursor || undefined,
              sortKey: sortSettings.productSortKey, // 🚀 APPLIED
              reverse: sortSettings.reverse         // 🚀 APPLIED
          });
        } else {
          // Standard Filtered Fetch
          result = await getProducts({
            query: queryParts.join(' AND '),
            first: itemsPerPage,
            after: cursor || undefined,
            sortKey: sortSettings.productSortKey, // 🚀 APPLIED
            reverse: sortSettings.reverse         // 🚀 APPLIED
          });

          // 🚨 FALLBACK: If the filtered sale query returns nothing, try fetching just the filters without the 'sale' restriction
          if (result.formattedData.length === 0 && !cursor) {
              console.warn("Filtered sale query is empty. Falling back to general filtered products.");
              fallbackModeRef.current = 'general_filtered';
              const fallbackQuery = queryParts.filter(part => part !== `collection:'sale'`).join(' AND ');
              result = await getProducts({
                  query: fallbackQuery || undefined,
                  first: itemsPerPage,
                  sortKey: sortSettings.productSortKey, // 🚀 APPLIED
                  reverse: sortSettings.reverse         // 🚀 APPLIED
              });
          }
        }
      }

      if (cursor) {
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
    router.push(`${pathname || '/collections/sale'}?${params.toString()}`, { scroll: false });
  };

  // 4. TOGGLE LOGIC WITH URL PUSH
  const handleToggleFilter = (group: keyof ActiveFilters | 'RESET', value?: string) => {
    if (group === 'RESET') {
      setActiveFilters({ collections: [], styles: [], sizes: [], placements: [] });
      router.push(pathname || '/collections/sale', { scroll: false });
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
    
    router.push(`${pathname || '/collections/sale'}${queryString ? `?${queryString}` : ''}`, { scroll: false });
  };

  // 🚀 SEO FIX: Helper function to build Semantic Links for Pagination crawlers
  const getPaginationHref = () => {
    const params = new URLSearchParams(searchParamsString);
    if (pageInfo.endCursor) params.set('cursor', pageInfo.endCursor);
    return `${pathname || '/collections/sale'}?${params.toString()}`;
  };

  const activeFiltersCount = 
    activeFilters.collections.length + 
    activeFilters.styles.length + 
    activeFilters.sizes.length + 
    activeFilters.placements.length;

  return (
    <div className="bg-zinc-950 min-h-screen text-white selection:bg-[#FF3366] selection:text-white mt-20 overflow-x-hidden w-full pb-20">
      
      {/* 🚀 PREMIUM INLINE FLASH SALE BANNER */}
      <div className="container max-w-[1400px] mx-auto px-4 pt-4 md:pt-8">
        <div className="relative w-full h-[280px] md:h-[380px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group bg-zinc-900 flex items-center">
          
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img
              src={bannerImage}
              alt="Flash Sale"
              className="w-full h-full object-cover object-center opacity-50 transition-transform duration-1000 ease-out group-hover:scale-105"
            />
          </div>

          {/* Precision Gradient Overlays for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 px-8 md:px-16 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-md mb-6 shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3366] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF3366]"></span>
              </span>
              <span className="text-[#FF3366] text-[10px] font-black uppercase tracking-[0.2em]">
                Limited Time Offer
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-xl leading-none">
              Flash Sale
            </h1>
            
            <p className="text-zinc-300 text-sm md:text-base font-medium leading-relaxed max-w-md drop-shadow-md">
              Grab your favorite temporary tattoo designs at unbeatable prices before they're gone for good.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="container max-w-[1400px] mx-auto px-4 mt-12 md:mt-16">
        
        {/* 🚀 SEO FIX: Added structural breadcrumbs */}
        <div className="mb-4">
          <Breadcrumbs items={[
            { label: 'Home', url: '/' },
            { label: 'Collections', url: '/collections' },
            { label: 'Sale', url: '/collections/sale' },
          ]} />
        </div>

        {/* Desktop Toolbar */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-800/60">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setFilterDrawerOpen(true)} 
              className="lg:hidden flex items-center gap-2 px-5 py-2.5 bg-zinc-900 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
            <p className="hidden lg:block text-xs font-bold text-zinc-500 uppercase tracking-widest">
              {isLoading ? 'Scanning inventory...' : <><span className="text-white">{products.length}</span> Markdown Items Found</>}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
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
                className={clsx("p-2.5 rounded-lg transition-all", viewMode === 'grid' ? "bg-zinc-800 text-[#FF3366] shadow-sm" : "text-zinc-500 hover:text-zinc-300")}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')} 
                className={clsx("p-2.5 rounded-lg transition-all", viewMode === 'list' ? "bg-zinc-800 text-[#FF3366] shadow-sm" : "text-zinc-500 hover:text-zinc-300")}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-28 space-y-8 max-h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar pb-4 pr-4 border-r border-zinc-800/60">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-zinc-800/60">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Filters</span>
                {activeFiltersCount > 0 && (
                  <button onClick={() => handleToggleFilter('RESET')} className="text-[10px] font-bold text-[#FF3366] uppercase hover:text-white transition-colors">
                    Clear
                  </button>
                )}
              </div>
              <FilterSidebar 
                filters={dynamicFilters} 
                activeFilters={activeFilters} 
                onToggle={handleToggleFilter} 
              />
            </div>
          </aside>

          {/* PRODUCT GRID */}
          <div className="flex-1 min-w-0 relative min-h-[500px]">
            {isLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/50 backdrop-blur-[2px] z-10 rounded-3xl">
                <Loader2 className="w-10 h-10 animate-spin text-[#FF3366] mb-4" />
              </div>
            ) : (!isLoading && products.length > 0) ? (
              <div className="flex flex-col items-center">
                <div className={clsx(
                  "w-full p-4 sm:p-6 lg:p-8 rounded-[2rem] border bg-black border-zinc-800 shadow-[inset_0_1px_4px_rgba(0,0,0,0.8)]",
                  "grid gap-6 sm:gap-8",
                  viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                )}>
                  {products.map((item, index) => (
                    <ProductCard 
                      key={`${item.id}-${index}`} 
                      item={item} 
                      viewMode={viewMode} 
                      page="sale" 
                      index={index} 
                    />
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
                <p className="font-black text-white uppercase tracking-widest text-lg mb-2">No products found</p>
                <p className="text-zinc-500 text-sm mb-6 max-w-sm mx-auto">We couldn't find anything matching your current filters. Try adjusting them to see more sale results.</p>
                {/* 🚀 SEO FIX: Converted Clear Filters button to a standard crawlable fallback route Link */}
                <Link 
                  href={pathname || '/collections/sale'}
                  onClick={(e) => {
                    e.preventDefault();
                    handleToggleFilter('RESET');
                  }} 
                  className="px-6 py-3 bg-[#FF3366] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:brightness-110 transition-all shadow-md inline-block"
                >
                  Clear All Filters
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-[70] flex justify-end lg:hidden">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
            onClick={() => setFilterDrawerOpen(false)} 
          />
          <div className="relative w-80 bg-zinc-950 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 border-l border-white/10">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-white">Filters</h2>
              <button onClick={() => setFilterDrawerOpen(false)} className="p-2 hover:bg-zinc-900 rounded-full text-zinc-400 hover:text-white transition-colors">
                <X className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
              <FilterSidebar 
                filters={dynamicFilters} 
                activeFilters={activeFilters} 
                onToggle={handleToggleFilter} 
              />
            </div>
            <div className="p-6 border-t border-white/10 bg-zinc-950 flex gap-3">
              <button 
                onClick={() => handleToggleFilter('RESET')}
                className="flex-1 py-4 border border-zinc-700 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full bg-zinc-900 hover:bg-zinc-800 transition-colors"
              >
                Reset
              </button>
              <button 
                onClick={() => setFilterDrawerOpen(false)}
                className="flex-[2] py-4 bg-[#FF3366] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:brightness-110 shadow-xl transition-all"
              >
                Apply ({products.length})
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
function SaleContentWithParams(props: SalePageProps) {
  const searchParams = useSearchParams();
  const searchParamsString = searchParams?.toString() || "";
  
  return <SaleContentInternal {...props} searchParamsString={searchParamsString} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Main Export - Wraps the component in a Suspense boundary to prevent SSR bailout.
// Falls back to the pre-populated HTML version (using initialData) for Googlebot!
// ─────────────────────────────────────────────────────────────────────────────
export default function SalePage(props: SalePageProps) {
  return (
    <Suspense 
      fallback={<SaleContentInternal {...props} searchParamsString="" />}
    >
      <SaleContentWithParams {...props} />
    </Suspense>
  );
}