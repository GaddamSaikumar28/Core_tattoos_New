// // app/new-arrivalss/page.tsx
// import SharedHeroBanner from "@/src/components/layout/SharedHeroBanner";
// export default function NewArrivalsPage() {
//   return (
//     <main>
//       {/* Reusing your optimized component */}
//       <SharedHeroBanner 
//         title="New Arrivals"
//         image="/assets/images/NewArrivalsHeroDesktop.png"
//         mobileImage="/assets/images/NewArrivalMobile.png"
//         useMobileImage={true}
//         textColor="#FE8204"
//       />
      
//       {/* Your product grid or other content goes here */}
//       <section className="max-w-[1312px] mx-auto px-4 py-12">
//         <h3 className="text-2xl font-bold mb-8">Shop the Collection</h3>
//         {/* <ProductGrid /> */}
//       </section>
//     </main>
//   );
// }

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { SlidersHorizontal, LayoutGrid, List, X, ChevronLeft, ChevronRight, RefreshCcw } from 'lucide-react';
import clsx from 'clsx';

// Components
import { FilterSidebar } from '@/src/components/shared/FilterSidebar';
import { ProductCard } from '@/src/components/shared/ProductLayout';
import SharedHeroBanner from "@/src/components/layout/SharedHeroBanner";

// Types & Data (Assuming these are exported from your global data file)
// import { tattooProducts, Product, ActiveFilters } from '@/src/data/products'; 
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
export default function NewArrivalsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // --- UI State ---
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    styles: [],
    sizes: [],
    placements: []
  });

  // Handle Responsive Pagination
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 1024 ? 9 : 12);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // --- FILTER LOGIC ---
  
  // 1. First, narrow down to ONLY "New" products
  const newArrivalsBase = useMemo(() => {
    return tattooProducts.filter(p => p.badge === "New");
  }, []);

  // 2. Apply Sidebar Filters to the "New" subset
  const filteredProducts = useMemo(() => {
    return newArrivalsBase.filter(p => {
      const matchesStyle = activeFilters.styles.length === 0 || activeFilters.styles.includes(p.style);
      const matchesSize = activeFilters.sizes.length === 0 || (p.combinations && p.combinations.some(c => activeFilters.sizes.includes(c.size)));
      const matchesPlacement = activeFilters.placements.length === 0 || activeFilters.placements.every(pl => (p.placements || []).includes(pl));

      return matchesStyle && matchesSize && matchesPlacement;
    });
  }, [activeFilters, newArrivalsBase]);

  // 3. Explosion Logic (If results are low, show variants individually)
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
    return {
      styles: Array.from(new Set(newArrivalsBase.map(p => p.style))).filter(Boolean),
      sizes: Array.from(new Set(newArrivalsBase.flatMap(p => p.combinations?.map(c => c.size) || []))).filter(Boolean),
      placements: Array.from(new Set(newArrivalsBase.flatMap(p => p.placements || []))).filter(Boolean)
    };
  }, [newArrivalsBase]);

  const totalPages = Math.ceil(displayItems.length / itemsPerPage);
  const paginatedItems = displayItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    <div className="bg-white min-h-screen font-sans text-slate-950 mt-16">
      
      {/* HERO SECTION */}
      <SharedHeroBanner 
        title="New Arrivals"
        image="/assets/images/NewArrivalsHeroDesktop.png"
        mobileImage="/assets/images/NewArrivalMobile.png"
        useMobileImage={true}
        textColor="#FE8204"
      />

      {/* MOBILE FILTER DRAWER */}
      <div className={clsx(
        "fixed inset-0 z-[60] bg-slate-950/40 backdrop-blur-sm transition-opacity lg:hidden",
        isFilterDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )} onClick={() => setFilterDrawerOpen(false)} />
      
      <div className={clsx(
        "fixed right-0 top-0 h-full w-[300px] bg-white z-[70] shadow-2xl transition-transform duration-500 lg:hidden border-l border-slate-200",
        isFilterDrawerOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 shrink-0">
            <h2 className="text-sm font-bold uppercase tracking-widest">Filters</h2>
            <button onClick={() => setFilterDrawerOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
            <FilterSidebar filters={dynamicFilterOptions} activeFilters={activeFilters} onToggle={toggleFilter} />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="container max-w-[1312px] mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 space-y-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                <span className="text-xs font-bold uppercase tracking-widest">Filters</span>
                {(activeFilters.styles.length > 0 || activeFilters.sizes.length > 0) && (
                  <button onClick={() => toggleFilter('RESET')} className="text-[10px] text-orange-500 font-bold hover:underline">RESET</button>
                )}
              </div>
              <FilterSidebar filters={dynamicFilterOptions} activeFilters={activeFilters} onToggle={toggleFilter} />
            </div>
          </aside>

          {/* PRODUCT LISTINGS */}
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">The Latest Drops</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Showing <span className="text-gray-900 font-bold">{displayItems.length}</span> fresh designs
                </p>
              </div>
              
              {/* VIEW AND MOBILE TRIGGER */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setFilterDrawerOpen(true)} 
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium"
                >
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </button>
                <div className="flex items-center bg-gray-50 border border-gray-200 p-1 rounded-xl">
                  <button onClick={() => setViewMode('grid')} className={clsx("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-white text-[#fe8204] shadow-sm" : "text-gray-400")}><LayoutGrid className="w-4 h-4" /></button>
                  <button onClick={() => setViewMode('list')} className={clsx("p-2 rounded-lg transition-all", viewMode === 'list' ? "bg-white text-[#fe8204] shadow-sm" : "text-gray-400")}><List className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            {displayItems.length > 0 ? (
              <div className={clsx(
                "p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-100",
                "grid gap-6",
                viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              )}>
                {paginatedItems.map((item) => (
                  <ProductCard key={item.id} item={item} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center bg-gray-50/50 border border-dashed border-gray-300 rounded-3xl">
                <RefreshCcw className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-900 font-bold text-lg">No matches found</p>
                <p className="text-gray-500 text-sm mt-2">Try clearing your filters to see the newest designs.</p>
                <button onClick={() => toggleFilter('RESET')} className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-xl text-sm font-semibold">Clear Filters</button>
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 hover:border-[#fe8204] transition-all"><ChevronLeft className="w-5 h-5" /></button>
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i} onClick={() => setCurrentPage(i + 1)} className={clsx("w-10 h-10 rounded-xl text-sm font-bold transition-all", currentPage === i + 1 ? "bg-[#fe8204] text-white" : "bg-white text-gray-600 border border-gray-200")}>{i + 1}</button>
                ))}
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 hover:border-[#fe8204] transition-all"><ChevronRight className="w-5 h-5" /></button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}