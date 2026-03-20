// // 'use client';

// // import React, { useState, useCallback,useEffect,useRef } from 'react';
// // import { motion,useInView } from 'framer-motion';
// // import { ChevronLeft, ChevronRight } from 'lucide-react';
// // import Image from 'next/image';

// // const products = [
// //   { id: 1, title: 'Majestic Eagle', price: '14.99', oldPrice: '19.99', image: '/assets/images/Card1.png', badges: [{ label: 'Bestseller', color: '#fe8204' }], inStock: true },
// //   { id: 2, title: 'Minimal Unicorn', price: '9.99', oldPrice: null, image: '/assets/images/Card2.png', badges: [], inStock: true },
// //   { id: 3, title: 'Botanical Leaves', price: '11.99', oldPrice: '15.99', image: '/assets/images/Card3.png', badges: [{ label: 'New', color: '#10b981' }], inStock: true },
// //   { id: 4, title: 'Abstract Runes', price: '8.99', oldPrice: null, image: '/assets/images/Card4.png', badges: [], inStock: false },
// //   { id: 5, title: 'Geometric Falcon', price: '16.99', oldPrice: '22.99', image: '/assets/images/Card5.png', badges: [{ label: 'Trending', color: '#ef4444' }], inStock: true },
// //   { id: 6, title: 'Coiled Snake', price: '18.99', oldPrice: '24.99', image: '/assets/images/Card6.png', badges: [], inStock: true },
// //   { id: 7, title: 'Lunar Phase', price: '12.50', oldPrice: '18.00', image: '/assets/images/Card7.png', badges: [{ label: 'Limited', color: '#8b5cf6' }], inStock: true },
// //   { id: 8, title: 'Solar Flare', price: '21.00', oldPrice: null, image: '/assets/images/Card8.png', badges: [], inStock: true },
// //   { id: 9, title: 'Cosmic Dust', price: '24.99', oldPrice: '30.00', image: '/assets/images/Card9.png', badges: [{ label: 'Premium', color: '#eab308' }], inStock: true },
// // ];

// // export default function ShopCollection() {
// //   const [activeIndex, setActiveIndex] = useState(0);
// //   const totalCards = products.length;
// //   const [isPaused, setIsPaused] = useState(false);
// //   const sectionRef = useRef<HTMLElement>(null);
// //   const isInView = useInView(sectionRef);
// //   const handleNext = useCallback(() => {
// //     setActiveIndex((prev) => (prev + 1) % totalCards);
// //   }, [totalCards]);

// //   useEffect(() => {
// //     if (isPaused) return; // Don't run timer if user is interacting

// //     const intervalId = setInterval(() => {
// //       handleNext();
// //     }, 4000); // 4000ms = 4 seconds per slide

// //     return () => clearInterval(intervalId); // Cleanup on unmount or pause
// //   }, [isPaused, handleNext, isInView]);

// //   const handlePrev = useCallback(() => {
// //     setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
// //   }, [totalCards]);

// //   const getCardStyles = useCallback((index: number) => {
// //     let diff = index - activeIndex;

// //     if (diff > totalCards / 2) diff -= totalCards;
// //     if (diff < -totalCards / 2) diff += totalCards;

// //     const absDiff = Math.abs(diff);
// //     const isActive = diff === 0;

// //     return {
// //       // Increased x-multiplier to 220 to spread cards wider on desktop
// //       x: diff * 220, 
// //       // Reduced z-push so they don't fade too far back
// //       z: -absDiff * 100, 
// //       // Reduced rotation to keep the arc looking modern and wide
// //       rotateY: diff * -12, 
// //       scale: isActive ? 1 : 0.85, 
// //       opacity: absDiff > 3 ? 0 : 1 - absDiff * 0.2, 
// //       zIndex: 100 - absDiff, 
// //       filter: isActive ? 'blur(0px)' : 'blur(2px)', 
// //     };
// //   }, [activeIndex, totalCards]);

// //   const springConfig = { 
// //     type: "spring", 
// //     stiffness: 200, 
// //     damping: 25,   
// //     mass: 0.9 
// //   };

// //   return (
// //     // Replaced min-h-screen with standard vertical padding for a mid-page section
// //     <section
// //     ref={sectionRef} 
// //     className="relative w-full flex flex-col items-center justify-center py-12 md:py-16 bg-white text-black  selection:bg-[#fe8204] selection:text-white overflow-hidden">
      
// //       <div className="absolute inset-0 pointer-events-none flex justify-center z-0">
// //         <div
// //           className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
// //           style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}
// //         />
// //       </div>

// //       <div className="relative z-10 w-full flex flex-col items-center">
        
// //         {/* Header - Reduced bottom margin */}
// //         <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto mb-5 md:mb-5 px-4">
// //           <h2 className="font-black text-[#fe8204] tracking-tight text-3xl md:text-5xl lg:text-6xl leading-[1.1] uppercase">
// //             Our Collections
// //           </h2>
// //           {/* <p className="mt-2 text-gray-500 max-w-md font-medium text-sm md:text-base">
// //             Swipe or use arrows to explore our premium selected items.
// //           </p> */}
// //         </div>
          
// //         {/* 3D Carousel Gallery - Tightened height to fit cards exactly */}
// //         <div 
// //           className="relative w-full max-w-[1400px] h-[460px] md:h-[480px] flex justify-center items-center"
// //           style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
// //           onMouseEnter={() => setIsPaused(true)}
// //           onMouseLeave={() => setIsPaused(false)}
          
// //         >
// //           {products.map((product, index) => {
// //             const isActive = index === activeIndex;
            
// //             return (
// //               <motion.div
// //                 key={product.id}
// //                 initial={false}
// //                 animate={getCardStyles(index)}
// //                 transition={springConfig}
// //                 drag="x"
// //                 dragConstraints={{ left: 0, right: 0 }}
// //                 dragElastic={0.1}
// //                 onDragEnd={(_, info) => {
// //                   if (info.offset.x < -40) handleNext();
// //                   if (info.offset.x > 40) handlePrev();
// //                 }}
// //                 onClick={() => !isActive && setActiveIndex(index)}
// //                 className={`absolute origin-center ${isActive ? 'cursor-default' : 'cursor-pointer hover:brightness-110'} active:cursor-grabbing`}
// //                 style={{
// //                   width: "280px", 
// //                 }}
// //               >
// //                 <div className={`group flex flex-col gap-4 p-4 bg-zinc-900 rounded-2xl shadow-2xl border transition-colors duration-500 ${
// //                   isActive ? 'border-[#fe8204]/40 shadow-[0_20px_50px_rgba(254,130,4,0.15)]' : 'border-zinc-800'
// //                 }`}>
                  
// //                   <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-800 rounded-xl">
// //                     <div className="absolute top-3 left-3 z-20 flex flex-col gap-2 pointer-events-none">
// //                       {product.badges.map((badge, idx) => (
// //                         <div 
// //                           key={idx} 
// //                           className="bg-black/80 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border shadow-lg"
// //                           style={{ color: badge.color, borderColor: `${badge.color}40` }}
// //                         >
// //                           {badge.label}
// //                         </div>
// //                       ))}
// //                     </div>
                    
// //                     {product.image ? (
// //                       <Image
// //                         src={product.image}
// //                         alt={product.title}
// //                         fill
// //                         sizes="(max-width: 768px) 280px, 280px"
// //                         className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 group-hover:opacity-90 pointer-events-none"
// //                       />
// //                     ) : (
// //                       <div className="w-full h-full flex items-center justify-center text-zinc-600 uppercase text-xs tracking-widest">
// //                         No Image
// //                       </div>
// //                     )}
// //                   </div>

// //                   <div className="flex flex-col gap-2 mt-1 px-1">
// //                     <div className="flex justify-between items-start gap-3">
// //                       <h3 className="text-sm md:text-base font-semibold tracking-wide uppercase leading-snug text-gray-100 truncate">
// //                         {product.title}
// //                       </h3>
                      
// //                       <div className="flex flex-col items-end shrink-0">
// //                         <span className="text-[#fe8204] font-black text-lg md:text-xl tracking-tight">
// //                           ${product.price}
// //                         </span>
// //                         {product.oldPrice && (
// //                           <span className="text-gray-500 line-through text-[10px] md:text-xs font-medium mt-0.5">
// //                             ${product.oldPrice}
// //                           </span>
// //                         )}
// //                       </div>
// //                     </div>

// //                     <button 
// //                       disabled={!product.inStock}
// //                       onClick={(e) => {
// //                         e.stopPropagation(); 
// //                         if (product.inStock) {
// //                           console.log(`Added ${product.title} to cart`);
// //                         }
// //                       }}
// //                       className={`w-full rounded-full border px-4 py-2.5 text-xs font-bold tracking-widest transition-all duration-300 uppercase mt-2
// //                         ${isActive ? 'pointer-events-auto' : 'pointer-events-none'} 
// //                         ${!product.inStock 
// //                           ? 'border-zinc-700 text-zinc-500 bg-zinc-800/50 cursor-not-allowed' 
// //                           : 'border-white/20 text-white bg-transparent hover:border-[#fe8204] hover:bg-[#fe8204] hover:text-black shadow-lg hover:shadow-[#fe8204]/20'
// //                         }
// //                       `}
// //                     >
// //                       {product.inStock ? "Add to Cart" : "Sold Out"}
// //                     </button>
// //                   </div>

// //                 </div>
// //               </motion.div>
// //             );
// //           })}
// //         </div>

// //         {/* Navigation Controls */}
// //         <div className="flex items-center gap-4 md:gap-6 mt-6 md:mt-8 z-20">
// //           <button 
// //             onClick={handlePrev}
// //             onMouseEnter={() => setIsPaused(true)}
// //             onMouseLeave={() => setIsPaused(false)}

// //             className="p-2.5 md:p-3 rounded-full bg-zinc-900 border border-zinc-800 text-white hover:bg-[#fe8204] hover:text-black hover:border-[#fe8204] transition-all duration-300 shadow-xl"
// //             aria-label="Previous Product"
// //           >
// //             <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
// //           </button>
          
// //           <div className="flex gap-1.5 md:gap-2">
// //             {products.map((_, idx) => (
// //               <button
// //                 key={idx}
// //                 onClick={() => setActiveIndex(idx)}
// //                 className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
// //                   activeIndex === idx ? 'bg-[#fe8204] w-6 md:w-8' : 'bg-zinc-300 w-1.5 md:w-2 hover:bg-zinc-400'
// //                 }`}
// //                 aria-label={`Go to slide ${idx + 1}`}
// //               />
// //             ))}
// //           </div>

// //           <button 
// //             onClick={handleNext}
// //             className="p-2.5 md:p-3 rounded-full bg-zinc-900 border border-zinc-800 text-white hover:bg-[#fe8204] hover:text-black hover:border-[#fe8204] transition-all duration-300 shadow-xl"
// //             aria-label="Next Product"
// //           >
// //             <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
// //           </button>
// //         </div>

// //       </div>
// //     </section>
// //   );
// // }






// 'use client';

// import React, { useState, useCallback, useEffect, useRef } from 'react';
// import { motion, useInView, Transition } from 'framer-motion';
// import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
// import Image from 'next/image';

// // Adjust these import paths based on your actual folder structure
// // import { useCart } from '@/src/lib/shopify/CartContext'; 
// import { getHomePageCollections, FormattedProduct } from '@/src/lib/shopify/index'; 
// import { useCart } from '@/src/context/CartContext';
// export default function ShopCollection() {
//   // State for dynamic Shopify data
//   const [products, setProducts] = useState<FormattedProduct[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
  
//   // Carousel State
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
  
//   const totalCards = products.length;
//   const sectionRef = useRef<HTMLElement>(null);
//   const isInView = useInView(sectionRef);
  
//   // Cart Integration
//   const { addToCart } = useCart();

//   // 1. Fetch Products on Mount
//   useEffect(() => {
//     let isMounted = true;
    
//     async function fetchShopifyProducts() {
//       try {
//         // Fetch the first 10 products (adjustable)
//         const { formattedData } = await getHomePageCollections();
//         if (isMounted && formattedData) {
//           setProducts(formattedData);
//         }
//       } catch (error) {
//         console.error("Error fetching collection products:", error);
//       } finally {
//         if (isMounted) {
//           setIsLoading(false);
//         }
//       }
//     }

//     fetchShopifyProducts();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   // 2. Carousel Handlers
//   const handleNext = useCallback(() => {
//     if (totalCards === 0) return;
//     setActiveIndex((prev) => (prev + 1) % totalCards);
//   }, [totalCards]);

//   const handlePrev = useCallback(() => {
//     if (totalCards === 0) return;
//     setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
//   }, [totalCards]);

//   // 3. Auto-play Timer
//   useEffect(() => {
//     // Don't run timer if user is interacting, data is loading, or section is out of view
//     if (isPaused || totalCards <= 1 || !isInView) return; 

//     const intervalId = setInterval(() => {
//       handleNext();
//     }, 4000); 

//     return () => clearInterval(intervalId); 
//   }, [isPaused, handleNext, isInView, totalCards]);

//   // 4. Calculate 3D Positions
//   const getCardStyles = useCallback((index: number) => {
//     if (totalCards === 0) return {};
    
//     let diff = index - activeIndex;

//     // Wrap around logic for infinite loop feel
//     if (diff > totalCards / 2) diff -= totalCards;
//     if (diff < -totalCards / 2) diff += totalCards;

//     const absDiff = Math.abs(diff);
//     const isActive = diff === 0;

//     return {
//       x: diff * 220, 
//       z: -absDiff * 100, 
//       rotateY: diff * -12, 
//       scale: isActive ? 1 : 0.85, 
//       opacity: absDiff > 3 ? 0 : 1 - absDiff * 0.2, 
//       zIndex: 100 - absDiff, 
//       filter: isActive ? 'blur(0px)' : 'blur(2px)', 
//     };
//   }, [activeIndex, totalCards]);

//   const springConfig:Transition = { 
//     type: "spring", 
//     stiffness: 200, 
//     damping: 25,   
//     mass: 0.9 
//   };

//   return (
//     <section
//       ref={sectionRef} 
//       className="relative w-full flex flex-col items-center justify-center py-12 md:py-16 bg-white text-black  selection:bg-[#fe8204] selection:text-white overflow-hidden"
//     >
//       {/* Background Texture */}
//       <div className="absolute inset-0 pointer-events-none flex justify-center z-0">
//         <div
//           className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
//           style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}
//         />
//       </div>

//       <div className="relative z-10 w-full flex flex-col items-center">
        
//         {/* Header */}
//         <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto mb-5 md:mb-5 px-4">
//           <h2 className="font-black text-[#fe8204] tracking-tight text-3xl md:text-5xl lg:text-6xl leading-[1.1] uppercase">
//             Our Collections
//           </h2>
//         </div>
          
//         {/* Loading State */}
//         {isLoading && (
//           <div className="flex flex-col items-center justify-center h-[460px] md:h-[480px]">
//              <Loader2 className="w-8 h-8 animate-spin text-[#fe8204] mb-4" />
//              <p className="text-zinc-500 font-medium uppercase tracking-widest text-sm">Loading Gallery...</p>
//           </div>
//         )}

//         {/* Empty State Guard */}
//         {!isLoading && totalCards === 0 && (
//           <div className="flex flex-col items-center justify-center h-[460px] md:h-[480px]">
//              <p className="text-zinc-500 font-medium uppercase tracking-widest text-sm">No products found.</p>
//           </div>
//         )}

//         {/* 3D Carousel Gallery */}
//         {!isLoading && totalCards > 0 && (
//           <div 
//             className="relative w-full max-w-[1400px] h-[460px] md:h-[480px] flex justify-center items-center"
//             style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//           >
//             {products.map((product, index) => {
//               const isActive = index === activeIndex;
//               const { title, checkout, inventory, media, styling } = product;
//               const isStocked = inventory.inStock && checkout.defaultVariantId;
              
//               return (
//                 <motion.div
//                   key={product.id}
//                   initial={false}
//                   animate={getCardStyles(index)}
//                   transition={springConfig}
//                   drag="x"
//                   dragConstraints={{ left: 0, right: 0 }}
//                   dragElastic={0.1}
//                   onDragEnd={(_, info) => {
//                     if (info.offset.x < -40) handleNext();
//                     if (info.offset.x > 40) handlePrev();
//                   }}
//                   onClick={() => !isActive && setActiveIndex(index)}
//                   className={`absolute origin-center ${isActive ? 'cursor-default' : 'cursor-pointer hover:brightness-110'} active:cursor-grabbing`}
//                   style={{ width: "280px" }}
//                 >
//                   <div className={`group flex flex-col gap-4 p-4 bg-zinc-900 rounded-2xl shadow-2xl border transition-colors duration-500 ${
//                     isActive ? 'border-[#fe8204]/40 shadow-[0_20px_50px_rgba(254,130,4,0.15)]' : 'border-zinc-800'
//                   }`}>
                    
//                     {/* Image Box */}
//                     <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-800 rounded-xl">
//                       {/* Badges */}
//                       <div className="absolute top-3 left-3 z-20 flex flex-col gap-2 pointer-events-none">
//                         {styling?.badges?.map((badge, idx) => (
//                           badge && (
//                             <div 
//                               key={idx} 
//                               className="bg-black/80 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border shadow-lg"
//                               style={{ color: badge.color, borderColor: `${badge.color}40` }}
//                             >
//                               {badge.label}
//                             </div>
//                           )
//                         ))}
//                       </div>
                      
//                       {/* Product Image */}
//                       {media?.featuredImage ? (
//                         <Image
//                           src={media.featuredImage}
//                           alt={title}
//                           fill
//                           sizes="(max-width: 768px) 280px, 280px"
//                           className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 group-hover:opacity-90 pointer-events-none"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center text-zinc-600 uppercase text-xs tracking-widest">
//                           No Image
//                         </div>
//                       )}
//                     </div>

//                     {/* Details */}
//                     <div className="flex flex-col gap-2 mt-1 px-1">
//                       <div className="flex justify-between items-start gap-3">
//                         <h3 className="text-sm md:text-base font-semibold tracking-wide uppercase leading-snug text-gray-100 truncate">
//                           {title}
//                         </h3>
                        
//                         <div className="flex flex-col items-end shrink-0">
//                           <span className="text-[#fe8204] font-black text-lg md:text-xl tracking-tight">
//                             ${checkout.price.toFixed(2)}
//                           </span>
//                           {checkout.compareAtPrice && checkout.compareAtPrice > checkout.price && (
//                             <span className="text-gray-500 line-through text-[10px] md:text-xs font-medium mt-0.5">
//                               ${checkout.compareAtPrice.toFixed(2)}
//                             </span>
//                           )}
//                         </div>
//                       </div>

//                       {/* Add to Cart Button */}
//                       <button 
//                         disabled={!isStocked}
//                         onClick={async (e) => {
//                           e.stopPropagation(); 
//                           if (isStocked) {
//                             // Uses CartContext to add the correct variant to Shopify Cart
//                             await addToCart(checkout.defaultVariantId, 1);
//                           }
//                         }}
//                         className={`w-full rounded-full border px-4 py-2.5 text-xs font-bold tracking-widest transition-all duration-300 uppercase mt-2
//                           ${isActive ? 'pointer-events-auto' : 'pointer-events-none'} 
//                           ${!isStocked 
//                             ? 'border-zinc-700 text-zinc-500 bg-zinc-800/50 cursor-not-allowed' 
//                             : 'border-white/20 text-white bg-transparent hover:border-[#fe8204] hover:bg-[#fe8204] hover:text-black shadow-lg hover:shadow-[#fe8204]/20'
//                           }
//                         `}
//                       >
//                         {isStocked ? "Add to Cart" : "Sold Out"}
//                       </button>
//                     </div>

//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         )}

//         {/* Navigation Controls */}
//         {!isLoading && totalCards > 0 && (
//           <div className="flex items-center gap-4 md:gap-6 mt-6 md:mt-8 z-20">
//             <button 
//               onClick={handlePrev}
//               onMouseEnter={() => setIsPaused(true)}
//               onMouseLeave={() => setIsPaused(false)}
//               className="p-2.5 md:p-3 rounded-full bg-zinc-900 border border-zinc-800 text-white hover:bg-[#fe8204] hover:text-black hover:border-[#fe8204] transition-all duration-300 shadow-xl"
//               aria-label="Previous Product"
//             >
//               <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
//             </button>
            
//             <div className="flex gap-1.5 md:gap-2">
//               {products.map((_, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setActiveIndex(idx)}
//                   className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
//                     activeIndex === idx ? 'bg-[#fe8204] w-6 md:w-8' : 'bg-zinc-300 w-1.5 md:w-2 hover:bg-zinc-400'
//                   }`}
//                   aria-label={`Go to slide ${idx + 1}`}
//                 />
//               ))}
//             </div>

//             <button 
//               onClick={handleNext}
//               className="p-2.5 md:p-3 rounded-full bg-zinc-900 border border-zinc-800 text-white hover:bg-[#fe8204] hover:text-black hover:border-[#fe8204] transition-all duration-300 shadow-xl"
//               aria-label="Next Product"
//             >
//               <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
//             </button>
//           </div>
//         )}

//       </div>
//     </section>
//   );
// }

'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useInView, Transition } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import Image from 'next/image';

// Adjust these import paths based on your actual folder structure
import { getHomePageCollections, FormattedProduct } from '@/src/lib/shopify/index'; 
import { useCart } from '@/src/context/CartContext';

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
      className="relative w-full flex flex-col items-center justify-center py-12 md:py-16 bg-white text-black  selection:bg-[#fe8204] selection:text-white overflow-hidden"
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
        <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto mb-5 md:mb-5 px-4">
          <h2 className="font-black text-[#fe8204] tracking-tight text-3xl md:text-5xl lg:text-6xl leading-[1.1] uppercase">
            Our Collections
          </h2>
        </div>
          
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-[460px] md:h-[480px]">
             <Loader2 className="w-8 h-8 animate-spin text-[#fe8204] mb-4" />
             <p className="text-zinc-500 font-medium uppercase tracking-widest text-sm">Loading Gallery...</p>
          </div>
        )}

        {/* Empty State Guard */}
        {!isLoading && totalCards === 0 && (
          <div className="flex flex-col items-center justify-center h-[460px] md:h-[480px]">
             <p className="text-zinc-500 font-medium uppercase tracking-widest text-sm">No products found.</p>
          </div>
        )}

        {/* 3D Carousel Gallery */}
        {!isLoading && totalCards > 0 && (
          <div 
            className="relative w-full max-w-[1400px] h-[480px] md:h-[500px] flex justify-center items-center"
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
                  className={`absolute origin-center h-[70vh] md:h-[60vh]
                    min-h-[400px] md:min-h-[470px] 
                    max-h-[550px] md:max-h-[670px]

                    ${isActive ? 'cursor-default' : 'cursor-pointer hover:brightness-110'} active:cursor-grabbing`}
                  // Added explicit height so all cards are identical in the 3D stack
                //   style={{ width: "310px", height: "500px" }}
                style={{ 
                    width: "min(310px, 80vw)", // Caps width at 310px but shrinks on small screens
                    // maxHeight: "650px",         // Prevents it from getting too tall on monitors
                    // minHeight: "400px"          // Prevents it from collapsing on short phones
                }}
                >
                  {/* Added h-full to the wrapper so it stretches the full 450px */}
                  <div className={`group flex flex-col h-full gap-4 p-4 bg-zinc-900 rounded-2xl shadow-2xl border transition-colors duration-500 ${
                    isActive ? 'border-[#fe8204]/40 shadow-[0_20px_50px_rgba(254,130,4,0.15)]' : 'border-zinc-800'
                  }`}>
                    
                    {/* Image Box - added shrink-0 so it doesn't get crushed by the flex box */}
                    <div className="relative w-full aspect-[4/5] shrink-0 overflow-hidden bg-black rounded-xl">
                      {/* Badges */}
                      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2 pointer-events-none">
                        {/* {styling?.badges?.map((badge, idx) => (
                          badge && (
                            <div 
                              key={idx} 
                              className="bg-black backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border shadow-lg"
                            //   style={{ color: badge.color, borderColor: `${badge.color}40` }}
                            >
                              {badge.label}
                            </div>
                          )
                        ))} */}
                        {styling?.badges[0] && (
                            <div 
                              key={0} 
                              className="bg-black backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border shadow-lg"
                            //   style={{ color: badge.color, borderColor: `${badge.color}40` }}
                            >
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
                          sizes="(max-width: 768px) 280px, 280px"
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 group-hover:opacity-90 pointer-events-none"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600 uppercase text-xs tracking-widest">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Details - Added flex-grow to take up all remaining height */}
                    <div className="flex flex-col flex-grow gap-2 mt-1 px-1">
                      <div className="flex justify-between items-start gap-3 min-h-[3.25rem]">
                        {/* Swapped truncate for line-clamp-2 so it can span 2 lines without cutting off abruptly */}
                        <h3 className="text-sm md:text-base font-semibold tracking-wide uppercase leading-snug text-gray-100 line-clamp-2">
                          {title}
                        </h3>
                        
                        <div className="flex flex-col items-end shrink-0 ">
                          <span className="text-[#fe8204] font-black text-lg md:text-xl tracking-tight">
                            ${checkout.price.toFixed(2)}
                          </span>
                          {checkout.compareAtPrice && checkout.compareAtPrice > checkout.price && (
                            <span className="text-white line-through text-[15px] md:text-xs font-medium mt-0.5">
                              ${checkout.compareAtPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Add to Cart Button - Added mt-auto to push it down permanently */}
                      <button 
                        disabled={!isStocked || isAddingToCart}
                        onClick={async (e) => {
                          e.stopPropagation(); 
                          if (isStocked && checkout.defaultVariantId) {
                            await addToCart(checkout.defaultVariantId, 1);
                          }
                        }}
                        className={`w-full bg-black rounded-full border px-4 py-2  text-xs font-bold tracking-widest transition-all duration-300 uppercase mt-auto
                          ${isActive ? 'pointer-events-auto' : 'pointer-events-none'} 
                          ${(!isStocked || isAddingToCart)
                            ? 'border-zinc-700 text-zinc-500 bg-zinc-800/50 cursor-not-allowed' 
                            : 'border-white/20 text-white bg-transparent hover:border-[#fe8204] hover:bg-[#fe8204] hover:text-black shadow-lg hover:shadow-[#fe8204]/20'
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
          <div className="flex items-center gap-4 md:gap-6 mt-6 md:mt-8 z-20">
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