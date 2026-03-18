
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { SlidersHorizontal, LayoutGrid, List, X, ChevronLeft, ChevronRight, RefreshCcw } from 'lucide-react';
import clsx from 'clsx';

import { FilterSidebar } from '@/src/components/shared/FilterSidebar';
import { ProductCard } from '@/src/components/shared/ProductLayout';

// Dummy Data types
interface Combination {
  id: string;
  price: number | string;
  image: string;
  size: string;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  category: string;
  style: string;
  handle?: string;
  price: number | string;
  image: string;
  combinations?: Combination[];
  placements?: string[];
  productColor: any;
  isExploded?: boolean;
  originalId?: string;
  variantName?: string;
  preSelectedCombo?: Combination;
  slug?: string;
  badge: any;
}

interface ActiveFilters {
  styles: string[];
  sizes: string[];
  placements: string[];
}

export const tattooProducts: Product[] = [
  {
    id: "prod_1",
    handle: "crying-heart-traditional",
    name: "Crying Heart",
    category: "Temporary Tattoos",
    price: "12.00",
    image: "/assets/images/Card1.png",
    badge: "Bestseller",
    style: "Traditional",
    placements: ["Forearm", "Calf", "Chest"],
    productColor: "#dc2626", 
    combinations: [
      { id: "var_1a", size: "Small (2x2)", price: "12.00", stock: 10, image: "/assets/images/Card1.png" },
      { id: "var_1b", size: "Large (4x4)", price: "18.00", stock: 5, image: "/assets/images/Card1.png" }
    ]
  },
  {
    id: "prod_2",
    handle: "serpent-wrap",
    name: "Serpent Wrap",
    category: "Temporary Tattoos",
    price: "24.00",
    image: "/assets/images/Card2.png",
    badge: "New",
    style: "Blackwork",
    placements: ["Forearm", "Neck", "Leg"],
    productColor: "#171717", 
    combinations: [
      { id: "var_2a", size: "Medium (5x3)", price: "24.00", stock: 15, image: "/assets/images/Card2.png" },
      { id: "var_2b", size: "Sleeve (10x6)", price: "45.00", stock: 2, image: "/assets/images/Card2.png" }
    ]
  },
  {
    id: "prod_3",
    handle: "botanical-flash-sheet",
    name: "Botanical Flash Sheet",
    category: "Flash Sheets",
    price: "30.00",
    image: "/assets/images/Card3.png",
    badge: "Digital Download",
    style: "Fine Line",
    placements: ["Any"],
    productColor: "#52525b", 
    combinations: [
      { id: "var_3a", size: "Standard (8.5x11)", price: "30.00", stock: 999, image: "/assets/images/Card3.png" }
    ]
  },
  {
    id: "prod_4",
    handle: "minimalist-rose",
    name: "Minimalist Rose",
    category: "Temporary Tattoos",
    price: "10.00",
    image: "/assets/images/Card7.png",
    badge: null,
    style: "Fine Line",
    placements: ["Wrist", "Ankle", "Behind Ear"],
    productColor: "#ef4444", 
    combinations: [
      { id: "var_4a", size: "Tiny (1x1)", price: "10.00", stock: 20, image: "/assets/images/Card7.png" }
    ]
  },
  {
    id: "prod_5",
    handle: "geometric-wolf",
    name: "Geometric Wolf",
    category: "Temporary Tattoos",
    price: "16.00",
    image: "/assets/images/Card4.png",
    badge: "Trending",
    style: "Geometric",
    placements: ["Forearm", "Thigh", "Shoulder"],
    productColor: "#3f3f46", 
    combinations: [
      { id: "var_5a", size: "Medium (4x4)", price: "16.00", stock: 12, image: "/assets/images/Card4.png" }
    ]
  },
  {
    id: "prod_6",
    handle: "mandala-lotus",
    name: "Mandala Lotus",
    category: "Temporary Tattoos",
    price: "22.00",
    image: "/assets/images/Card9.png",
    badge: "Limited",
    style: "Dotwork",
    placements: ["Sternum", "Back", "Thigh"],
    productColor: "#000000", 
    combinations: [
      { id: "var_6a", size: "Medium (5x5)", price: "22.00", stock: 8, image: "/assets/images/Card9.png" }
    ]
  },
  {
    id: "prod_7",
    handle: "skull-dagger",
    name: "Skull & Dagger",
    category: "Temporary Tattoos",
    price: "18.00",
    image: "/assets/images/Card2.png",
    badge: null,
    style: "Traditional",
    placements: ["Calf", "Forearm", "Bicep"],
    productColor: "#1c1917", 
    combinations: [
      { id: "var_7a", size: "Medium (4x6)", price: "18.00", stock: 14, image: "/assets/images/Card2.png" }
    ]
  },
  {
    id: "prod_8",
    handle: "koi-fish-flow",
    name: "Koi Fish Flow",
    category: "Temporary Tattoos",
    price: "26.00",
    image: "/assets/images/Card5.png",
    badge: "Bestseller",
    style: "Japanese",
    placements: ["Sleeve", "Calf", "Ribs"],
    productColor: "#ea580c", 
    combinations: [
      { id: "var_8a", size: "Large (6x8)", price: "26.00", stock: 6, image: "/assets/images/Card5.png" }
    ]
  },
  {
    id: "prod_9",
    handle: "vintage-swallow",
    name: "Vintage Swallow",
    category: "Temporary Tattoos",
    price: "14.00",
    image: "/assets/images/Card10.png",
    badge: "Classic",
    style: "Traditional",
    placements: ["Hand", "Chest", "Neck"],
    productColor: "#0284c7", 
    combinations: [
      { id: "var_9a", size: "Small (3x3)", price: "14.00", stock: 25, image: "/assets/images/Card10.png" }
    ]
  },
  {
    id: "prod_10",
    handle: "moon-phases",
    name: "Moon Phases",
    category: "Temporary Tattoos",
    price: "15.00",
    image: "/assets/images/Card1.png",
    badge: null,
    style: "Minimalist",
    placements: ["Spine", "Forearm", "Collarbone"],
    productColor: "#71717a", 
    combinations: [
      { id: "var_10a", size: "Strip (2x8)", price: "15.00", stock: 18, image: "/assets/images/Card1.png" }
    ]
  },
  {
    id: "prod_11",
    handle: "cyberpunk-glitch",
    name: "Cyberpunk Glitch",
    category: "Temporary Tattoos",
    price: "20.00",
    image: "/assets/images/Card8.png",
    badge: "Limited Edition",
    style: "Neo-Traditional",
    placements: ["Forearm", "Neck", "Calf"],
    productColor: "#ec4899", 
    combinations: [
      { id: "var_11a", size: "Medium (4x5)", price: "20.00", stock: 5, image: "/assets/images/Card8.png" }
    ]
  },
  {
    id: "prod_12",
    handle: "tiger-roar",
    name: "Tiger Roar",
    category: "Temporary Tattoos",
    price: "28.00",
    image: "/assets/images/Card6.png",
    badge: "Hot",
    style: "Realism",
    placements: ["Chest", "Thigh", "Upper Back"],
    productColor: "#b45309", 
    combinations: [
      { id: "var_12a", size: "Large (6x6)", price: "28.00", stock: 7, image: "/assets/images/Card6.png" }
    ]
  },
  {
    id: "prod_13",
    handle: "dragon-coil",
    name: "Dragon Coil",
    category: "Temporary Tattoos",
    price: "35.00",
    image: "/assets/images/Card3.png",
    badge: "Staff Pick",
    style: "Japanese",
    placements: ["Full Arm", "Leg Wrap", "Back"],
    productColor: "#0f172a", 
    combinations: [
      { id: "var_13a", size: "Extra Large (8x14)", price: "35.00", stock: 4, image: "/assets/images/Card3.png" }
    ]
  },
  {
    id: "prod_14",
    handle: "tarot-the-moon",
    name: "Tarot Card: The Moon",
    category: "Temporary Tattoos",
    price: "16.00",
    image: "/assets/images/Card5.png",
    badge: null,
    style: "Blackwork",
    placements: ["Forearm", "Calf", "Bicep"],
    productColor: "#27272a", 
    combinations: [
      { id: "var_14a", size: "Medium (3x5)", price: "16.00", stock: 22, image: "/assets/images/Card5.png" }
    ]
  },
  {
    id: "prod_15",
    handle: "sacred-heart",
    name: "Sacred Heart",
    category: "Temporary Tattoos",
    price: "18.00",
    image: "/assets/images/Card7.png",
    badge: "Popular",
    style: "Traditional",
    placements: ["Chest", "Sternum", "Hand"],
    productColor: "#be123c", 
    combinations: [
      { id: "var_15a", size: "Medium (4x4)", price: "18.00", stock: 11, image: "/assets/images/Card7.png" }
    ]
  },
  {
    id: "prod_16",
    handle: "barbed-wire-armband",
    name: "Barbed Wire Armband",
    category: "Temporary Tattoos",
    price: "14.00",
    image: "/assets/images/Card9.png",
    badge: null,
    style: "Tribal",
    placements: ["Bicep", "Wrist", "Ankle"],
    productColor: "#404040", 
    combinations: [
      { id: "var_16a", size: "Wrap (2x10)", price: "14.00", stock: 30, image: "/assets/images/Card9.png" }
    ]
  },
  {
    id: "prod_17",
    handle: "butterfly-swarm",
    name: "Butterfly Swarm",
    category: "Temporary Tattoos",
    price: "20.00",
    image: "/assets/images/Card2.png",
    badge: "Popular",
    style: "Fine Line",
    placements: ["Shoulder", "Ribs", "Thigh"],
    productColor: "#3b82f6", 
    combinations: [
      { id: "var_17a", size: "Large (5x7)", price: "20.00", stock: 16, image: "/assets/images/Card2.png" }
    ]
  },
  {
    id: "prod_18",
    handle: "watercolor-fox",
    name: "Watercolor Fox",
    category: "Temporary Tattoos",
    price: "24.00",
    image: "/assets/images/Card10.png",
    badge: "Artistic",
    style: "Watercolor",
    placements: ["Calf", "Forearm", "Shoulder Blade"],
    productColor: "#f97316", 
    combinations: [
      { id: "var_18a", size: "Medium (4x6)", price: "24.00", stock: 9, image: "/assets/images/Card10.png" }
    ]
  },
  {
    id: "prod_19",
    handle: "gothic-lettering-pack",
    name: "Gothic Lettering Pack",
    category: "Flash Sheets",
    price: "25.00",
    image: "/assets/images/Card4.png",
    badge: "Digital Download",
    style: "Lettering",
    placements: ["Any"],
    productColor: "#18181b", 
    combinations: [
      { id: "var_19a", size: "Standard (8.5x11)", price: "25.00", stock: 999, image: "/assets/images/Card4.png" }
    ]
  },
  {
    id: "prod_20",
    handle: "abstract-line-art",
    name: "Abstract Line Art",
    category: "Temporary Tattoos",
    price: "18.00",
    image: "/assets/images/Card8.png",
    badge: "New",
    style: "Abstract",
    placements: ["Forearm", "Ribs", "Ankle"],
    productColor: "#52525b", 
    combinations: [
      { id: "var_20a", size: "Medium (4x5)", price: "18.00", stock: 13, image: "/assets/images/Card8.png" }
    ]
  }
];

export default function ShopAll() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    styles: [],
    sizes: [],
    placements: []
  });

  // Handle Dynamic Items Per Page based on screen size
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 1024 ? 9 : 12);
    };
    
    // Set initial value
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const categoryFromUrl = searchParams.get('category') || 'Shop All';

  // Dynamic Categories
  const categories = useMemo(() => {
    const cats = new Set(tattooProducts.map(p => p.category).filter(Boolean));
    return ['Shop All', ...Array.from(cats)];
  }, []);

  // --- FILTER & EXPLOSION LOGIC ---
  const filteredProducts = useMemo(() => {
    return tattooProducts.filter(p => {
      const matchesCategory = categoryFromUrl === 'Shop All' || p.category === categoryFromUrl;
      const matchesStyle = activeFilters.styles.length === 0 || activeFilters.styles.includes(p.style);
      const matchesSize = activeFilters.sizes.length === 0 || (p.combinations && p.combinations.some(c => activeFilters.sizes.includes(c.size)));
      
      // FIXED: Safely fallback to empty array to prevent undefined error
      const matchesPlacement = activeFilters.placements.length === 0 || activeFilters.placements.every(pl => (p.placements || []).includes(pl));

      return matchesCategory && matchesStyle && matchesSize && matchesPlacement;
    });
  }, [categoryFromUrl, activeFilters]);

  const displayItems = useMemo(() => {
    if (filteredProducts.length > 0 && filteredProducts.length < 3) {
      return filteredProducts.flatMap(product => {
        if (!product.combinations?.length) return [{ ...product, isExploded: false }];
        
        const relevantCombos = product.combinations.filter(combo => {
          if (activeFilters.sizes.length === 0) return true;
          return activeFilters.sizes.includes(combo.size);
        });

        return relevantCombos.map(combo => ({
          ...product,
          id: `${product.id}-${combo.id}`,
          originalId: product.id,
          variantName: combo.size,
          price: combo.price,
          image: combo.image, 
          isExploded: true,
          preSelectedCombo: combo,
          slug: `${product.handle}-${combo.id}`
        }));
      });
    }
    return filteredProducts.map(p => ({ ...p, isExploded: false }));
  }, [filteredProducts, activeFilters.sizes]);

  // --- DYNAMIC SIDEBAR DATA ---
  const dynamicFilterOptions = useMemo(() => {
    const currentCategoryProducts = categoryFromUrl === 'Shop All' 
      ? tattooProducts 
      : tattooProducts.filter(p => p.category === categoryFromUrl);

    return {
      styles: Array.from(new Set(currentCategoryProducts.map(p => p.style))).filter(Boolean),
      sizes: Array.from(new Set(currentCategoryProducts.flatMap(p => p.combinations?.map(c => c.size) || []))).filter(Boolean),
      placements: Array.from(new Set(currentCategoryProducts.flatMap(p => p.placements || []))).filter(Boolean)
    };
  }, [categoryFromUrl]);

  const totalPages = Math.ceil(displayItems.length / itemsPerPage);
  
  // Ensure current page is valid when total pages change
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const paginatedItems = displayItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCategoryChange = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === 'Shop All') params.delete('category');
    else params.set('category', cat);
    
    router.push(`${pathname}?${params.toString()}`);
    setActiveFilters({ styles: [], sizes: [], placements: [] });
    setCurrentPage(1);
  };

  const toggleFilter = (group: keyof ActiveFilters | 'RESET', value?: string) => {
    if (group === 'RESET') {
      setActiveFilters({ styles: [], sizes: [], placements: [] });
      return;
    }
    if (!value) return;

    setActiveFilters(prev => {
      const currentGroup = prev[group as keyof ActiveFilters];
      const isSelected = currentGroup.includes(value);
      return {
        ...prev,
        [group]: isSelected 
          ? currentGroup.filter(item => item !== value) 
          : [...currentGroup, value]
      };
    });
    setCurrentPage(1);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-950 selection:bg-slate-900 selection:text-white mt-20 md:mt-20">
      
      {/* MOBILE DRAWER */}
      <div className={clsx(
        "fixed inset-0 z-[60] bg-slate-950/40 backdrop-blur-sm transition-opacity lg:hidden",
        isFilterDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )} onClick={() => setFilterDrawerOpen(false)} />
      
      <div className={clsx(
        "fixed right-0 top-0 h-full w-[300px] bg-white z-[70] shadow-2xl transition-transform duration-500 lg:hidden border-l-2 border-slate-950",
        isFilterDrawerOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-slate-100 shrink-0">
            <h2 className="text-[12px] font-black uppercase tracking-[0.2em]">Filters</h2>
            <button onClick={() => setFilterDrawerOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* FIXED: Added a flex-1 scrolling container so filters don't get hidden */}
          <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
            <FilterSidebar filters={dynamicFilterOptions} activeFilters={activeFilters} onToggle={toggleFilter} />
          </div>
        </div>
      </div>

      {/* TOP NAVIGATION */}
      <nav className="sticky top-0 z-40 bg-white border-b-2 border-slate-100">
        <div className="container max-w-[1400px] mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={clsx(
                  "px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border-2",
                  categoryFromUrl === cat 
                    ? "bg-slate-950 text-white border-slate-950" 
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-950 hover:text-slate-950"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setFilterDrawerOpen(true)} 
            className="lg:hidden p-2.5 bg-white border-2 border-slate-200 hover:border-slate-950 text-slate-950 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="container max-w-[1400px] mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 space-y-8 max-h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar pb-4 pr-6 border-r-2 border-slate-100">
              <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-950 mb-8 pb-4 border-b-2 border-slate-950">
                Filters
              </span>
              <FilterSidebar filters={dynamicFilterOptions} activeFilters={activeFilters} onToggle={toggleFilter} />
            </div>
          </aside>

          {/* PRODUCT LISTINGS */}
          <div className="flex-grow">
  {/* HEADER SECTION */}
  <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-6 border-b border-gray-100">
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight capitalize">
        {categoryFromUrl}
      </h1>
      <p className="text-sm font-medium text-gray-500 mt-2">
        Showing <span className="text-gray-900 font-bold">{displayItems.length}</span> products
      </p>
    </div>
    
    {/* VIEW MODE TOGGLE */}
    <div className="flex items-center self-start sm:self-auto gap-1 bg-gray-50/80 border border-gray-200 p-1 rounded-xl shadow-sm">
      <button 
        onClick={() => setViewMode('grid')} 
        className={clsx(
          "p-2.5 rounded-lg transition-all duration-300", 
          viewMode === 'grid' 
            ? "bg-white text-[#fe8204] shadow-sm" 
            : "text-gray-400 hover:text-gray-800 hover:bg-gray-100"
        )}
      >
        <LayoutGrid className="w-4 h-4" />
      </button>
      <button 
        onClick={() => setViewMode('list')} 
        className={clsx(
          "p-2.5 rounded-lg transition-all duration-300", 
          viewMode === 'list' 
            ? "bg-white text-[#fe8204] shadow-sm" 
            : "text-gray-400 hover:text-gray-800 hover:bg-gray-100"
        )}
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  </div>

  {/* PRODUCTS LAYOUT WITH GRADIENT */}
  {displayItems.length > 0 ? (
    <div className={clsx(
      // The neat gradient container
      "p-4 sm:p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-gray-50 via-white to-[#fe8204]/5 border border-gray-100 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]",
      "grid gap-6 sm:gap-8",
      viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
    )}>
      {paginatedItems.map((item) => (
        <ProductCard key={item.id} item={item} viewMode={viewMode} />
      ))}
    </div>
  ) : (
    /* EMPTY STATE */
    <div className="py-24 text-center bg-gray-50/50 border border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <RefreshCcw className="w-8 h-8 text-gray-400" />
      </div>
      <p className="text-gray-900 font-bold text-lg mb-2">No products found</p>
      <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">We couldn't find anything matching your current filters. Try adjusting them to see more results.</p>
      <button 
        onClick={() => toggleFilter('RESET')} 
        className="px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-[#fe8204] transition-colors shadow-md"
      >
        Clear All Filters
      </button>
    </div>
  )}

  {/* PAGINATION */}
  {totalPages > 1 && (
    <div className="mt-12 flex items-center justify-center gap-2">
      <button 
        disabled={currentPage === 1} 
        onClick={() => setCurrentPage(p => p - 1)} 
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#fe8204] hover:text-[#fe8204] transition-all text-gray-600 shadow-sm"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      {[...Array(totalPages)].map((_, i) => (
        <button 
          key={i} 
          onClick={() => setCurrentPage(i + 1)} 
          className={clsx(
            "w-10 h-10 rounded-xl text-sm font-bold transition-all shadow-sm", 
            currentPage === i + 1 
              ? "bg-[#fe8204] text-white border-transparent shadow-[#fe8204]/30 shadow-md" 
              : "bg-white text-gray-600 border border-gray-200 hover:border-[#fe8204] hover:text-[#fe8204]"
          )}
        >
          {i + 1}
        </button>
      ))}
      
      <button 
        disabled={currentPage === totalPages} 
        onClick={() => setCurrentPage(p => p + 1)} 
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#fe8204] hover:text-[#fe8204] transition-all text-gray-600 shadow-sm"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )}
</div>
          {/* <div className="flex-grow ">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4 pb-6 border-b-2 border-slate-100">
              <div>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-950">{categoryFromUrl}</h1>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">
                  {displayItems.length} Products Found
                </p>
              </div>
              
              <div className="flex items-center self-start sm:self-auto gap-1 bg-white border-2 border-slate-100 p-1">
                <button onClick={() => setViewMode('grid')} className={clsx("p-2 transition-all", viewMode === 'grid' ? "bg-slate-950 text-white" : "text-slate-400 hover:text-slate-950")}><LayoutGrid className="w-4 h-4" /></button>
                <button onClick={() => setViewMode('list')} className={clsx("p-2 transition-all", viewMode === 'list' ? "bg-slate-950 text-white" : "text-slate-400 hover:text-slate-950")}><List className="w-4 h-4" /></button>
              </div>
            </div>

            {displayItems.length > 0 ? (
              <div className={clsx(
                "grid gap-6",
                viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              )}>
                {paginatedItems.map((item) => (
                  <ProductCard key={item.id} item={item} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="py-32 text-center bg-white border-2 border-dashed border-slate-300">
                <RefreshCcw className="w-8 h-8 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.2em]">No Designs Match Your Criteria</p>
                <button onClick={() => toggleFilter('RESET')} className="mt-6 text-slate-950 font-black text-[10px] uppercase tracking-widest border-b-2 border-slate-950 pb-1 hover:text-slate-600 hover:border-slate-600 transition-colors">Clear All Filters</button>
              </div>
            )}

       
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-2">
                <button 
                  disabled={currentPage === 1} 
                  onClick={() => setCurrentPage(p => p - 1)} 
                  className="w-12 h-12 flex items-center justify-center bg-white border-2 border-slate-200 disabled:opacity-30 hover:border-slate-950 hover:text-slate-950 transition-all text-slate-500"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentPage(i + 1)} 
                    className={clsx(
                      "w-12 h-12 text-[12px] font-black transition-all border-2", 
                      currentPage === i + 1 ? "bg-slate-950 text-white border-slate-950" : "bg-white text-slate-500 border-slate-200 hover:border-slate-950 hover:text-slate-950"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
                <button 
                  disabled={currentPage === totalPages} 
                  onClick={() => setCurrentPage(p => p + 1)} 
                  className="w-12 h-12 flex items-center justify-center bg-white border-2 border-slate-200 disabled:opacity-30 hover:border-slate-950 hover:text-slate-950 transition-all text-slate-500"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div> */}
        </div>
      </main>
    </div>
  );
}