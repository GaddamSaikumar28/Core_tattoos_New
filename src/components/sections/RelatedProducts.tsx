// // "use client";

// // import { useRef } from "react";
// // import { FormattedProduct } from "@/src/lib/shopify";
// // import { ProductCard } from "@/src/components/shared/ProductLayout"; // Your existing card
// // import { ChevronLeft, ChevronRight } from "lucide-react";

// // interface RelatedProductsProps {
// //   products: FormattedProduct[];
// // }

// // export function RelatedProducts({ products }: RelatedProductsProps) {
// //   const scrollRef = useRef<HTMLDivElement>(null);

// //   if (!products || products.length === 0) return null;

// //   const scroll = (direction: 'left' | 'right') => {
// //     if (scrollRef.current) {
// //       const { current } = scrollRef;
// //       const scrollAmount = direction === 'left' ? -400 : 400;
// //       current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
// //     }
// //   };

// //   return (
// //     <section className="bg-gray-50 py-20 border-t border-gray-200 mt-20">
// //       <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex items-center justify-between mb-10">
// //           <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight">
// //             You Might Also Like
// //           </h2>
          
// //           {/* Desktop Navigation Arrows */}
// //           <div className="hidden md:flex items-center gap-2">
// //             <button 
// //               onClick={() => scroll('left')}
// //               className="p-3 bg-white border border-gray-200 rounded-full hover:border-[var(--color-brand-orange)] hover:text-[var(--color-brand-orange)] transition-all shadow-sm"
// //             >
// //               <ChevronLeft className="w-5 h-5" />
// //             </button>
// //             <button 
// //               onClick={() => scroll('right')}
// //               className="p-3 bg-white border border-gray-200 rounded-full hover:border-[var(--color-brand-orange)] hover:text-[var(--color-brand-orange)] transition-all shadow-sm"
// //             >
// //               <ChevronRight className="w-5 h-5" />
// //             </button>
// //           </div>
// //         </div>

// //         {/* Scrollable Container */}
// //         <div 
// //           ref={scrollRef}
// //           className="flex gap-6 overflow-x-auto no-scrollbar pb-8 snap-x snap-mandatory"
// //         >
// //           {products.map((product) => (
// //             <div key={product.id} className="min-w-[280px] md:min-w-[320px] max-w-[320px] shrink-0 snap-start">
// //               {/* Assuming your ProductCard from ProductLayout.tsx takes these props */}
// //               <ProductCard item={product} viewMode="grid" page="products" index={index}  />
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// "use client";

// import { useRef } from "react";
// import { FormattedProduct } from "@/src/lib/shopify";
// import { ProductCard } from "@/src/components/shared/ProductLayout"; // Your existing card
// import { ChevronLeft, ChevronRight } from "lucide-react";

// interface RelatedProductsProps {
//   products: FormattedProduct[];
// }

// export function RelatedProducts({ products }: RelatedProductsProps) {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   if (!products || products.length === 0) return null;

//   const scroll = (direction: 'left' | 'right') => {
//     if (scrollRef.current) {
//       const { current } = scrollRef;
//       const scrollAmount = direction === 'left' ? -400 : 400;
//       current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   return (
//     <section className="bg-black py-20 border-t border-gray-200 mt-20">
//       <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between mb-10">
//           <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight">
//             You Might Also Like
//           </h2>
          
//           {/* Desktop Navigation Arrows */}
//           <div className="hidden md:flex items-center gap-2">
//             <button 
//               onClick={() => scroll('left')}
//               className="p-3 bg-white border border-gray-200 rounded-full hover:border-[var(--color-brand-orange)] hover:text-[var(--color-brand-orange)] transition-all shadow-sm"
//             >
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//             <button 
//               onClick={() => scroll('right')}
//               className="p-3 bg-white border border-gray-200 rounded-full hover:border-[var(--color-brand-orange)] hover:text-[var(--color-brand-orange)] transition-all shadow-sm"
//             >
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         {/* Scrollable Container */}
//         <div 
//           ref={scrollRef}
//           className="flex gap-6 overflow-x-auto no-scrollbar pb-8 snap-x snap-mandatory"
//         >
//           {/* Grab the index here to pass to the ProductCard */}
//           {products.map((product, index) => (
//             <div key={product.id} className="min-w-[280px] md:min-w-[320px] max-w-[320px] shrink-0 snap-start">
//               <ProductCard 
//                 item={product} 
//                 viewMode="grid" 
//                 page="products" 
//                 index={index} 
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useRef } from "react";
import { FormattedProduct } from "@/src/lib/shopify";
import { ProductCard } from "@/src/components/shared/ProductLayout"; // Your existing card
import { ChevronLeft, ChevronRight } from "lucide-react";

interface RelatedProductsProps {
  products: FormattedProduct[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!products || products.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // Adjusted scroll amount to match the newly shrunk card sizes
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-black py-20 border-t border-white/10 mt-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          
          {/* Changed text-gray-900 to text-white */}
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
            You Might Also Like
          </h2>
          
          {/* Desktop Navigation Arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button 
              onClick={() => scroll('left')}
              // Updated button styling for dark mode
              className="p-3 bg-zinc-900 border border-white/20 text-white rounded-full hover:border-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange)] hover:text-black transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              // Updated button styling for dark mode
              className="p-3 bg-zinc-900 border border-white/20 text-white rounded-full hover:border-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange)] hover:text-black transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-8 snap-x snap-mandatory"
        >
          {products.map((product, index) => (
      
            <div key={product.id} className="min-w-[240px] md:min-w-[280px] max-w-[280px] shrink-0 snap-start">
              <ProductCard 
                item={product} 
                viewMode="grid" 
                page="products" 
                index={index} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}