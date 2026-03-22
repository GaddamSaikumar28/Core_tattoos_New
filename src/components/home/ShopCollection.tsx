'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useInView, Transition } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';
// Adjust these import paths based on your actual folder structure
import { getHomePageCollections, FormattedProduct } from '@/src/lib/shopify/index'; 
import { useCart } from '@/src/context/CartContext';
import Link from 'next/link';
export default function ShopCollection() {
  // State for dynamic Shopify data
  const [products, setProducts] = useState<FormattedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Carousel State
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const totalCards = products.length;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef);
  
  // Cart Integration (Added isAddingToCart)
  const { addToCart, isAddingToCart } = useCart();

  // 1. Fetch Products on Mount
  useEffect(() => {
    let isMounted = true;
    
    async function fetchShopifyProducts() {
      try {
        // Fetch the first 10 products (adjustable)
        const formattedData = await getHomePageCollections(10);
        if (isMounted && formattedData) {
          setProducts(formattedData);
        }
      } catch (error) {
        console.error("Error fetching collection products:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchShopifyProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Carousel Handlers
  const handleNext = useCallback(() => {
    if (totalCards === 0) return;
    setActiveIndex((prev) => (prev + 1) % totalCards);
  }, [totalCards]);

  const handlePrev = useCallback(() => {
    if (totalCards === 0) return;
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  }, [totalCards]);

  // 3. Auto-play Timer
  useEffect(() => {
    // Don't run timer if user is interacting, data is loading, or section is out of view
    if (isPaused || totalCards <= 1 || !isInView) return; 

    const intervalId = setInterval(() => {
      handleNext();
    }, 4000); 

    return () => clearInterval(intervalId); 
  }, [isPaused, handleNext, isInView, totalCards]);

  // 4. Calculate 3D Positions
  const getCardStyles = useCallback((index: number) => {
    if (totalCards === 0) return {};
    
    let diff = index - activeIndex;

    // Wrap around logic for infinite loop feel
    if (diff > totalCards / 2) diff -= totalCards;
    if (diff < -totalCards / 2) diff += totalCards;

    const absDiff = Math.abs(diff);
    const isActive = diff === 0;

    return {
      x: diff * 220, 
      z: -absDiff * 100, 
      rotateY: diff * -12, 
      scale: isActive ? 1 : 0.85, 
      opacity: absDiff > 3 ? 0 : 1 - absDiff * 0.2, 
      zIndex: 100 - absDiff, 
      filter: isActive ? 'blur(0px)' : 'blur(2px)', 
    };
  }, [activeIndex, totalCards]);

  const springConfig: Transition = { 
    type: "spring", 
    stiffness: 200, 
    damping: 25,   
    mass: 0.9 
  };
return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col items-center justify-center py-12 md:py-16 bg-white text-black selection:bg-[#fe8204] selection:text-white overflow-hidden"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 pointer-events-none flex justify-center z-0">
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}
        />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* Header */}
        {/* <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto mb-5 md:mb-5 px-4">
          <h2 className="font-black text-[#fe8204] tracking-tight text-3xl md:text-5xl lg:text-6xl leading-[1.1] uppercase">
            Our Collections
          </h2>
        </div> */}
        <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto mb-8 md:mb-10 px-4">
          <h2 className="font-black text-[#fe8204] tracking-tight text-3xl md:text-5xl lg:text-6xl leading-[1.1] uppercase mb-4 md:mb-5">
            Our Collections
          </h2>
          
          <Link 
            href="/collections"
            className="group flex items-center gap-3 text-[#fe8204] uppercase tracking-widest text-xs font-bold hover:text-black transition-colors duration-300"
          >
            View All Collections
            <span className="bg-[#fe8204] text-white w-8 h-8 rounded-full flex justify-center items-center group-hover:bg-black group-hover:translate-x-2 transition-all duration-300">
              →
            </span>
          </Link>
        </div>
          
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-[500px]">
             <Loader2 className="w-8 h-8 animate-spin text-[#fe8204] mb-4" />
             <p className="text-zinc-500 font-medium uppercase tracking-widest text-sm">Loading Gallery...</p>
          </div>
        )}

        {/* Empty State Guard */}
        {!isLoading && totalCards === 0 && (
          <div className="flex flex-col items-center justify-center h-[500px]">
             <p className="text-zinc-500 font-medium uppercase tracking-widest text-sm">No products found.</p>
          </div>
        )}

        {/* 3D Carousel Gallery */}
        {!isLoading && totalCards > 0 && (
          <div 
            // Fixed container height to ensure enough room for the 3D rotation
            className="relative w-full max-w-[1400px] h-[520px] md:h-[580px] flex justify-center items-center"
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {products.map((product, index) => {
              const isActive = index === activeIndex;
              const { title, checkout, inventory, media, styling } = product;
              const isStocked = inventory.availableForSale && checkout.defaultVariantId;
              
              return (
                <motion.div
                  key={product.id}
                  initial={false}
                  animate={getCardStyles(index)}
                  transition={springConfig}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -40) handleNext();
                    if (info.offset.x > 40) handlePrev();
                  }}
                  onClick={() => !isActive && setActiveIndex(index)}
                  // Simplified classes: Removed conflicting vh and min/max heights
                  className={`absolute origin-center flex justify-center items-center
                    ${isActive ? 'cursor-default' : 'cursor-pointer hover:brightness-110'} active:cursor-grabbing`}
                  style={{ 
                    width: "min(320px, 85vw)", // Responsive width
                    height: "min(480px, 75vh)" // Responsive height that doesn't blow out on large monitors
                  }}
                >
                  <div className={`group flex flex-col w-full h-full p-3 md:p-4 bg-zinc-900 rounded-2xl shadow-2xl border transition-colors duration-500 ${
                    isActive ? 'border-[#fe8204]/40 shadow-[0_20px_50px_rgba(254,130,4,0.15)]' : 'border-zinc-800'
                  }`}>
                    
                    {/* Image Box - Changed to flex-1 so it absorbs extra vertical space */}
                    <div className="relative w-full flex-1 min-h-[200px] overflow-hidden bg-black rounded-xl">
                      {/* Badges */}
                      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2 pointer-events-none">
                        {styling?.badges[0] && (
                            <div className="bg-black/80 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
                              {styling.badges[0].label}
                            </div>
                        )}
                      </div>
                      
                      {/* Product Image */}
                      {media?.featuredImage ? (
                        <Image
                          src={media.featuredImage}
                          alt={title}
                          fill
                          sizes="(max-width: 768px) 300px, 320px"
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 group-hover:opacity-90 pointer-events-none"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600 uppercase text-xs tracking-widest">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Details - Changed to shrink-0 so it perfectly wraps text/button without stretching */}
                    <div className="flex flex-col shrink-0 gap-3 mt-4 px-1">
                      <div className="flex justify-between items-start gap-3">
                        <h3 className="text-sm md:text-base font-semibold tracking-wide uppercase leading-snug text-gray-100 line-clamp-2">
                          {title}
                        </h3>
                        
                        <div className="flex flex-col items-end shrink-0">
                          <span className="text-[#fe8204] font-black text-lg md:text-xl tracking-tight">
                            ${checkout.price.toFixed(2)}
                          </span>
                          {checkout.compareAtPrice && checkout.compareAtPrice > checkout.price && (
                            <span className="text-zinc-400 line-through text-[13px] font-medium mt-0.5">
                              ${checkout.compareAtPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <button 
                        disabled={!isStocked || isAddingToCart}
                        onClick={async (e) => {
                          e.stopPropagation(); 
                          if (isStocked && checkout.defaultVariantId) {
                            await addToCart(checkout.defaultVariantId, 1);
                          }
                        }}
                        className={`w-full rounded-full border px-4 py-3 text-xs font-bold tracking-widest transition-all duration-300 uppercase
                          ${isActive ? 'pointer-events-auto' : 'pointer-events-none'} 
                          ${(!isStocked || isAddingToCart)
                            ? 'border-zinc-700 text-zinc-500 bg-zinc-800/50 cursor-not-allowed' 
                            : 'border-white/20 text-white bg-black hover:border-[#fe8204] hover:bg-[#fe8204] hover:text-black shadow-lg hover:shadow-[#fe8204]/20'
                          }
                        `}
                      >
                        {!isStocked ? "Sold Out" : isAddingToCart ? "Adding..." : "Add to Cart"}
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Navigation Controls */}
        {!isLoading && totalCards > 0 && (
          <div className="flex items-center gap-4 md:gap-6 mt-4 md:mt-8 z-20">
            {/* Nav buttons remain exactly the same */}
            <button 
              onClick={handlePrev}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="p-2.5 md:p-3 rounded-full bg-zinc-900 border border-zinc-800 text-white hover:bg-[#fe8204] hover:text-black hover:border-[#fe8204] transition-all duration-300 shadow-xl"
              aria-label="Previous Product"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            
            <div className="flex gap-1.5 md:gap-2">
              {products.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
                    activeIndex === idx ? 'bg-[#fe8204] w-6 md:w-8' : 'bg-zinc-300 w-1.5 md:w-2 hover:bg-zinc-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="p-2.5 md:p-3 rounded-full bg-zinc-900 border border-zinc-800 text-white hover:bg-[#fe8204] hover:text-black hover:border-[#fe8204] transition-all duration-300 shadow-xl"
              aria-label="Next Product"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}