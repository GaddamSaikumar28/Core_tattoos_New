'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { SlidersHorizontal, LayoutGrid, List, X, RefreshCcw, Loader2 } from 'lucide-react';
import clsx from 'clsx';

// Components
import { FilterSidebar, ActiveFilters, FilterOptions } from '@/src/components/shared/FilterSidebar';
// import { ProductCard } from '@/src/components/shared/ProductLayout';
// import SharedHeroBanner from "@/src/components/SharedHeroBanner";
import { getProducts, FormattedProduct } from '@/src/lib/shopify'; 
import { ProductCard } from '@/src/components/shared/ProductLayout';
import SharedHeroBanner from '@/src/components/layout/SharedHeroBanner';
const STATIC_FILTER_OPTIONS = {
  styles: ['Traditional', 'Fine Line', 'Blackwork', 'Geometric', 'Dotwork', 'Japanese', 'Realism', 'Minimalist'],
  sizes: ['Tiny (1x1)', 'Small (2x2)', 'Medium (4x4)', 'Large (6x8)', 'Sleeve (10x6)'],
  placements: ['Forearm', 'Calf', 'Chest', 'Neck', 'Wrist', 'Spine', 'Any']
};

export default function SalePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [itemsPerPage] = useState(12);

  const [products, setProducts] = useState<FormattedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [pageInfo, setPageInfo] = useState({ hasNextPage: false, endCursor: null as string | null });

  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    collections: [], // Not used here
    styles: [],
    sizes: [],
    placements: []
  });

  const [availableFilters] = useState<FilterOptions>({
    collections: [], 
    styles: STATIC_FILTER_OPTIONS.styles,
    sizes: STATIC_FILTER_OPTIONS.sizes,
    placements: STATIC_FILTER_OPTIONS.placements
  });

  const fetchProducts = useCallback(async (cursor?: string | null, isLoadMore = false) => {
    if (isLoadMore) setIsLoadingMore(true);
    else setIsLoading(true);

    try {
      // 1. Base Query: MUST belong to the automated 'sale' collection
      let queryParts = [`collection:sale`]; 

      // 2. Add Sidebar Filters
      if (activeFilters.styles.length > 0) {
        queryParts.push(`(${activeFilters.styles.map(s => `tag:'${s}'`).join(' OR ')})`);
      }
      if (activeFilters.sizes.length > 0) {
        queryParts.push(`(${activeFilters.sizes.map(s => `tag:'${s}'`).join(' OR ')})`);
      }
      if (activeFilters.placements.length > 0) {
        queryParts.push(`(${activeFilters.placements.map(p => `tag:'${p}'`).join(' OR ')})`);
      }

      const finalQuery = queryParts.join(' AND ');

      const response = await getProducts({ 
        first: itemsPerPage, 
        after: cursor,
        query: finalQuery 
      });

      if (isLoadMore) {
        setProducts(prev => [...prev, ...response.formattedData]);
      } else {
        setProducts(response.formattedData);
      }
      setPageInfo(response.pageInfo);

    } catch (error) {
      console.error("Failed to fetch sale products:", error);
      if (!isLoadMore) setProducts([]);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [itemsPerPage, activeFilters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleToggleFilter = (category: keyof FilterOptions | 'RESET', value?: string) => {
    if (category === 'RESET') {
      setActiveFilters({ collections: [], styles: [], sizes: [], placements: [] });
      return;
    }
    if (!value) return;

    setActiveFilters(prev => {
      const current = prev[category as keyof ActiveFilters];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const handleLoadMore = () => {
    if (pageInfo.hasNextPage && pageInfo.endCursor) {
      fetchProducts(pageInfo.endCursor, true);
    }
  };

  const activeFiltersCount = 
    activeFilters.styles.length + 
    activeFilters.sizes.length + 
    activeFilters.placements.length;

  return (
    <div className="bg-white min-h-screen mt-18 md:mt-0 pb-20">
      
      {/* ========================================================= */}
      {/* PREMIUM HERO BANNER                                       */}
      {/* ========================================================= */}
      <SharedHeroBanner
        image="/assets/images/SaleBanner.png" // Update with your actual image path
        mobileImage="/assets/images/SaleMobileBackground.png" // Update with your actual image path
        title="FLASH SALE"
        textColor="#FF3366" // Using a striking color for sale
      />

      {/* ========================================================= */}
      {/* MAIN CONTENT AREA                                         */}
      {/* ========================================================= */}
      <div className="container max-w-[1400px] mx-auto px-4 mt-12 md:mt-20">
        
        {/* Desktop Toolbar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setFilterDrawerOpen(true)} 
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-[var(--color-brand-orange)] transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
            <p className="hidden lg:block text-sm font-bold text-gray-400 uppercase tracking-widest">
              {isLoading ? 'Loading...' : `${products.length} Products Found`}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setViewMode('grid')} 
              className={clsx("p-2 rounded-xl transition-all", viewMode === 'grid' ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-900")}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')} 
              className={clsx("p-2 rounded-xl transition-all", viewMode === 'list' ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-900")}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* ========================================================= */}
          {/* DESKTOP SIDEBAR                                           */}
          {/* ========================================================= */}
          <div className="hidden lg:block w-[260px] shrink-0 sticky top-32 h-fit">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[13px] font-black uppercase tracking-widest text-gray-900">Filters</h2>
              {activeFiltersCount > 0 && (
                <button onClick={() => handleToggleFilter('RESET')} className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand-orange)] hover:underline">
                  Clear All
                </button>
              )}
            </div>
            <FilterSidebar 
              filters={availableFilters} 
              activeFilters={activeFilters} 
              onToggle={handleToggleFilter} 
            />
          </div>

          {/* ========================================================= */}
          {/* PRODUCT GRID                                              */}
          {/* ========================================================= */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="w-full py-32 flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-[var(--color-brand-orange)] mb-4" />
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Loading Sale Items...</p>
              </div>
            ) : (!isLoading && products.length > 0) ? (
              <div className="flex flex-col gap-10">
                <div className={clsx(
                  "grid gap-6",
                  viewMode === 'grid' ? "grid-cols-1 md:grid-cols-3 xl:grid-cols-3" : "grid-cols-1"
                )}>
                  {products.map((product) => (
                    <ProductCard key={product.id} item={product} viewMode={viewMode} page="sale" />
                  ))}
                </div>

                {/* LOAD MORE BUTTON */}
                {pageInfo.hasNextPage && (
                   <div className="flex justify-center mt-8">
                     <button 
                       onClick={handleLoadMore}
                       disabled={isLoadingMore}
                       className="px-8 py-4 rounded-2xl text-[13px] font-black uppercase tracking-widest text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all disabled:opacity-50 flex items-center gap-2"
                     >
                        {isLoadingMore ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        {isLoadingMore ? 'Loading...' : 'Show More'}
                     </button>
                   </div>
                )}
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="py-24 text-center bg-gray-50 border border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <RefreshCcw className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-gray-900 font-black text-xl mb-2">No sale items found</p>
                <p className="text-gray-500 font-medium text-sm mb-6 max-w-sm mx-auto">We couldn't find any sale items matching your current filters.</p>
                <button 
                  onClick={() => handleToggleFilter('RESET')} 
                  className="px-6 py-3 bg-gray-900 text-white text-[13px] font-black uppercase tracking-widest rounded-xl hover:bg-[var(--color-brand-orange)] transition-colors shadow-md"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE FILTER DRAWER                                      */}
      {/* ========================================================= */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => setFilterDrawerOpen(false)} 
          />
          <div className="relative w-[85%] max-w-sm bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-sm font-black uppercase tracking-widest text-gray-900">Filters</h2>
              <button onClick={() => setFilterDrawerOpen(false)} className="p-2 bg-gray-50 text-gray-500 hover:text-gray-900 rounded-full transition-colors">
                <X className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
              <FilterSidebar 
                filters={availableFilters} 
                activeFilters={activeFilters} 
                onToggle={handleToggleFilter} 
              />
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
              <button 
                onClick={() => handleToggleFilter('RESET')}
                className="flex-1 py-4 border border-gray-200 text-gray-900 text-[13px] font-black uppercase tracking-widest rounded-xl bg-white hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
              <button 
                onClick={() => setFilterDrawerOpen(false)}
                className="flex-[2] py-4 bg-gray-900 text-white text-[13px] font-black uppercase tracking-widest rounded-xl hover:bg-[var(--color-brand-orange)] shadow-xl transition-all"
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