"use client";

import { useRef } from "react";
import { FormattedProduct } from "@/src/lib/shopify";
import { ProductCard } from "@/src/components/shared/ProductLayout";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

interface RelatedProductsProps {
  products: FormattedProduct[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  // 🚀 SEO FIX: Typed the ref to a UI list element
  const scrollRef = useRef<HTMLUListElement>(null);

  if (!products || products.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -320 : 320;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="bg-black py-20 border-t border-white/10 overflow-hidden"
      // 🚀 SEO FIX: Linked the section to its heading for structural crawling
      aria-labelledby="related-products-heading" 
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 
            id="related-products-heading"
            className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight"
          >
            You Might Also Like
          </h2>
          
          <div className="hidden md:flex items-center gap-2">
            <button 
              onClick={() => scroll('left')}
              aria-label="Scroll left" // 🚀 SEO FIX: Added aria-label
              className="p-3 bg-zinc-900 border border-white/20 text-white rounded-full hover:border-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange)] hover:text-black transition-all"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button 
              onClick={() => scroll('right')}
              aria-label="Scroll right" // 🚀 SEO FIX: Added aria-label
              className="p-3 bg-zinc-900 border border-white/20 text-white rounded-full hover:border-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange)] hover:text-black transition-all"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* 🚀 SEO FIX: Swapped to a semantic <ul> list for better bot crawling & accessibility */}
        <ul 
          ref={scrollRef}
          role="list"
          className={clsx(
            "flex gap-6 overflow-x-auto no-scrollbar pb-10 snap-x snap-mandatory",
            "items-stretch", // Force all cards to equal height
            "overflow-y-hidden" // Kill any vertical scrolling
          )}
        >
          {products.map((product, index) => (
            <li 
              key={product.id} 
              className="min-w-[260px] md:min-w-[300px] max-w-[300px] shrink-0 snap-start flex flex-col h-auto"
            >
              <ProductCard 
                item={product} 
                viewMode="grid" 
                page="products" 
                index={index} 
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}