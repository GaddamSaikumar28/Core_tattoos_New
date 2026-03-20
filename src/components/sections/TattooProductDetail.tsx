

// "use client";

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Image from 'next/image';
// import { 
//   Plus, Minus, ZoomIn, 
//   Droplets, X, Star, ChevronDown, ShieldCheck, Loader2,
//   Clock, Flame, ShoppingBag, CreditCard
// } from 'lucide-react';
// import clsx from 'clsx';
// import { toast } from 'sonner';
// import { useCart } from '@/src/context/CartContext';
// import { FormattedProduct, Variant } from '@/src/lib/shopify';

// interface TattooProductDetailProps {
//   product: FormattedProduct;
// }

// export default function TattooProductDetail({ product }: TattooProductDetailProps) {
//   const { addToCart,buyNow } = useCart();
  
//   // UI States
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [activeAccordion, setActiveAccordion] = useState<string | null>('description');
  
//   // Cart States
//   const [quantity, setQuantity] = useState(1);
//   const [isAdding, setIsAdding] = useState(false);
//   const [isBuyingNow, setIsBuyingNow] = useState(false);

//   // Variant State
//   const variants = product.allVariants || [];
//   const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
//     variants.find(v => v.availableForSale) || variants[0] || null
//   );

//   // Derived Values
//   const price = selectedVariant ? Number(selectedVariant.price) : Number(product.checkout.price);
//   const compareAtPrice = selectedVariant?.compareAtPrice ? Number(selectedVariant.compareAtPrice) : Number(product.checkout.compareAtPrice);
//   const hasDiscount = compareAtPrice > price;
  
//   const gallery = product.media.gallery.length > 0 ? product.media.gallery : [{ url: product.media.featuredImage || '/placeholder.png', altText: product.title }];
//   const activeImage = gallery[activeImageIndex]?.url || '/placeholder.png';

//   // Extract rich attributes from the mapped Shopify data
//   const { tattooColorType, uiBackgroundColor, badges } = product.styling;
//   const { themes, placements, tags } = product.attributes;
//   const stockLevel = product.inventory.stockLevel;
//   const isLowStock = product.inventory.inStock && stockLevel > 0 && stockLevel <= 10;

//   // Dynamic Colors based on mapping
//   const primaryColor = uiBackgroundColor || '#00D084'; // Fallback to wireframe-like green

//   // =========================================================
//   // HANDLERS
//   // =========================================================
//   const handleAddToCart = async () => {
//     if (!selectedVariant?.variantId) {
//       toast.error("Please select a variant.");
//       return;
//     }

//     const safeQuantity = quantity > 0 ? quantity : 1;
//     setIsAdding(true);
    
//     try {
//       await addToCart(selectedVariant.variantId, safeQuantity);
//       toast.success(`${product.title} added to cart!`);
//     } catch (error) {
//       console.error("Detail page cart error", error);
//       toast.error("Failed to add to cart. Please try again.");
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   const handleBuyNow = async () => {
//     if (!selectedVariant?.variantId) {
//       toast.error("Please select a variant.");
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const safeQuantity = quantity > 0 ? quantity : 1;
      
//       // Call our new dedicated function
//       const checkoutUrl = await buyNow(selectedVariant.variantId, safeQuantity);

//       if (checkoutUrl) {
//         window.location.href = checkoutUrl;
//       } else {
//         setIsBuyingNow(false);
//         // Toast is already handled inside the context if it fails
//       }
//     } catch (error) {
//       console.error("Buy Now error", error);
//       toast.error("Checkout failed. Please try again.");
//       setIsBuyingNow(false);
//     }
//   };

// //   const handleBuyNow = async () => {
// //     if (!selectedVariant?.variantId) {
// //       toast.error("Please select a variant.");
// //       return;
// //     }

// //     setIsBuyingNow(true);
// //     try {
// //       // 1. Add to cart behind the scenes
// //       await addToCart(selectedVariant.variantId, quantity > 0 ? quantity : 1);
      
// //       // 2. Direct redirect to Shopify checkout
// //       // Note: Adjust '/checkout' to your actual checkout routing path if using a custom headless setup
// //     //   window.location.href = '/checkout'; 

// //     if (cart?.checkoutUrl) {
// //       window.location.href = cart.checkoutUrl;
// //     }
  
// //     } catch (error) {
// //       console.error("Buy Now error", error);
// //       toast.error("Checkout failed. Please try again.");
// //       setIsBuyingNow(false);
// //     }
// //   };

//   return (
//     <div 
//       className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 selection:bg-gray-900 selection:text-white flex items-center justify-center transition-colors duration-500"
//       style={{ backgroundColor: `${primaryColor}20` }} // 20% opacity of the dynamic color for the page background
//     >
//       <div className="max-w-[1100px] w-full mx-auto relative">
        
//         {/* Breadcrumb */}
//         <nav className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2 overflow-x-auto whitespace-nowrap no-scrollbar pl-2">
//           <a href="/" className="hover:text-gray-900 transition-colors">Home</a>
//           <span>/</span>
//           <a href="/collections" className="hover:text-gray-900 transition-colors">Shop</a>
//           {/* {product.vendor && (
//             <>
//               <span>/</span>
//               <span className="hover:text-gray-900 transition-colors cursor-pointer">{product.vendor}</span>
//             </>
//           )} */}
//           <span>/</span>
//           <span className="text-gray-900">{product.title}</span>
//         </nav>

//         {/* MAIN CONTAINER (White Card) */}
//         {/* Added lg:ml-12 here to gently push the white card to the right on larger screens */}
//         <div className="relative bg-white rounded-[24px] shadow-2xl lg:shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 md:p-10 lg:pl-[440px] lg:pr-12 lg:py-16 flex flex-col lg:min-h-[600px] lg:ml-12">
          
//           {/* ===================================== */}
//           {/* LEFT: 3D FLOATING IMAGE GALLERY       */}
//           {/* ===================================== */}
//           <div 
//             className="lg:absolute lg:left-[-40px] lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-[420px] rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.15)] z-20 flex flex-col overflow-hidden mb-8 lg:mb-0 transition-colors duration-500"
//             style={{ backgroundColor: primaryColor }} // Using mapped UI color for the floating card
//           >
            
//             {/* Top Bar inside floating card (Grouped to the right with contrasting frosted backgrounds) */}
//             <div className="absolute md:top-4 md:right-4 top-7 right-7 flex items-center gap-2 z-30">
//               <button 
//                 onClick={() => setIsZoomed(true)}
//                 className="p-2.5 bg-white/80 backdrop-blur-md hover:bg-white text-gray-900 rounded-full shadow-sm transition-all"
//                 aria-label="Zoom In"
//               >
//                 <ZoomIn className="w-4 h-4" />
//               </button>
//               <button 
//                 className="p-2.5 bg-white/80 backdrop-blur-md hover:bg-white text-gray-900 rounded-full shadow-sm transition-all"
//                 aria-label="Add to Favorites"
//               >
//                 <Star className="w-4 h-4" />
//               </button>
//             </div>

//             {/* Badges (Adjusted to sit beautifully on the top left) */}
//             <div className="absolute md:top-4 md:left-4 top-7 left-8 flex flex-col gap-2 z-30">
//               {badges?.map((badge, idx) => (
//                 <span 
//                   key={idx} 
//                   className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full shadow-md text-white backdrop-blur-md border border-white/20" 
//                   style={{ backgroundColor: badge.color || '#000' }}
//                 >
//                   {badge.label}
//                 </span>
//               ))}
//             </div>

//             {/* Main Image */}
//             <div className="relative w-full aspect-square flex-1 p-8 cursor-zoom-in mt-8">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeImage}
//                   initial={{ opacity: 0, x: -20, scale: 0.95 }}
//                   animate={{ opacity: 1, x: 0, scale: 1 }}
//                   exit={{ opacity: 0, x: 20, scale: 0.95 }}
//                   transition={{ duration: 0.4, type: "spring" }}
//                   className="absolute inset-0 p-8 flex items-center justify-center drop-shadow-2xl"
//                   onClick={() => setIsZoomed(true)}
//                 >
//                   <Image 
//                     src={activeImage} 
//                     alt={product.title} 
//                     fill 
//                     priority
//                     sizes="(max-width: 768px) 100vw, 420px"
//                     className="object-contain transition-transform duration-700 hover:scale-110"
//                   />
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             {/* Thumbnails (Bottom Strip like Wireframe) */}
//             <div className="bg-white/90 backdrop-blur-md m-4 p-3 rounded-[16px] flex gap-3 overflow-x-auto no-scrollbar justify-center shadow-inner relative z-30">
//               {gallery.map((img, idx) => (
//                 <button 
//                   key={idx}
//                   onClick={() => setActiveImageIndex(idx)}
//                   className={clsx(
//                     "relative w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-[10px] overflow-hidden transition-all duration-300 border-2",
//                     activeImageIndex === idx 
//                       ? "border-gray-900 shadow-md scale-105" 
//                       : "border-transparent opacity-60 hover:opacity-100 hover:border-gray-200"
//                   )}
//                 >
//                   <Image src={img.url} alt={img.altText || `Thumbnail ${idx}`} fill className="object-cover bg-gray-50" />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* ===================================== */}
//           {/* RIGHT: PRODUCT DETAILS                */}
//           {/* ===================================== */}
//           <div className="flex-1 flex flex-col w-full relative z-10">
            
//             {/* Title & Vendor */}
//             <div className="mb-4">
//               <h1 className="text-3xl md:text-[40px] font-black text-gray-900 leading-[1.1] mb-1 tracking-tight">
//                 {product.title}
//               </h1>
//               <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
//                 Artist: {product.vendor}
//               </span>
//             </div>

//             {/* Pricing Section (Shows both Original and Discounted) */}
//             <div className="flex items-end gap-3 mb-6">
//               <span className="text-4xl font-black tracking-tighter" style={{ color: hasDiscount ? '#EF4444' : '#111827' }}>
//                 {selectedVariant?.currency === 'USD' ? '$' : selectedVariant?.currency}
//                 {price.toFixed(2)}
//               </span>
              
//               {hasDiscount && (
//                 <div className="flex flex-col mb-1">
//                   <span className="text-sm font-bold text-gray-400 line-through">
//                     ${compareAtPrice.toFixed(2)}
//                   </span>
//                   {product.checkout.discountPercentage!=null && product.checkout.discountPercentage > 0 && (
//                     <span className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50 px-2 py-0.5 rounded-sm">
//                       Save {product.checkout.discountPercentage}%
//                     </span>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Rich Attributes (Tags, Themes) */}
//             <div className="flex flex-wrap gap-2 mb-6">
//               <span className="px-3 py-1 bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
//                 {tattooColorType}
//               </span>
//               {themes.slice(0, 2).map(theme => (
//                 <span key={theme} className="px-3 py-1 bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
//                   {theme}
//                 </span>
//               ))}
//               {placements.slice(0, 2).map(placement => (
//                 <span key={placement} className="px-3 py-1 bg-gray-50 text-gray-500 border border-gray-200 text-[10px] font-bold uppercase tracking-widest rounded-full">
//                   Fits: {placement}
//                 </span>
//               ))}
//             </div>

//             {/* Variant Selector */}
//             {variants.length > 1 && (
//               <div className="mb-6">
//                 <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Select Size / Style</span>
//                 <div className="flex flex-wrap gap-2">
//                   {variants.map((variant) => {
//                     const isSelected = selectedVariant?.variantId === variant.variantId;
//                     const sizeLabel = variant.selectedOptions?.find(o => o.name === 'Size')?.value || variant.title;
                    
//                     return (
//                       <button
//                         key={variant.variantId}
//                         disabled={!variant.availableForSale}
//                         onClick={() => setSelectedVariant(variant)}
//                         className={clsx(
//                           "py-2 px-4 rounded-xl text-[12px] font-bold uppercase tracking-wider transition-all border-2",
//                           isSelected 
//                             ? "border-gray-900 bg-gray-900 text-white" 
//                             : !variant.availableForSale
//                               ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
//                               : "border-gray-200 bg-white text-gray-600 hover:border-gray-900 hover:text-gray-900"
//                         )}
//                       >
//                         {sizeLabel}
//                       </button>
//                     )
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Low Stock Warning */}
//             <AnimatePresence>
//               {isLowStock && (
//                 <motion.div 
//                   initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
//                   className="flex items-center gap-2 mb-6 text-orange-600 bg-orange-50 px-4 py-2.5 rounded-xl border border-orange-100"
//                 >
//                   <Flame className="w-4 h-4 fill-current animate-pulse" />
//                   <span className="text-xs font-bold uppercase tracking-widest">Selling Fast — Only {stockLevel} left!</span>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Actions: Quantity & Add To Cart & Buy Now */}
//             <div className="flex flex-col gap-3 mb-8">
//               <div className="flex items-center gap-3">
//                 {/* Quantity */}
//                 <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1 h-[54px] shrink-0">
//                   <button 
//                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                     className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-lg transition-all"
//                   >
//                     <Minus className="w-4 h-4" />
//                   </button>
//                   <span className="w-8 text-center text-sm font-black text-gray-900">{quantity}</span>
//                   <button 
//                     onClick={() => setQuantity(quantity + 1)}
//                     className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-lg transition-all"
//                   >
//                     <Plus className="w-4 h-4" />
//                   </button>
//                 </div>

//                 {/* Add to Cart */}
//                 <button 
//                   onClick={handleAddToCart}
//                   disabled={!selectedVariant?.availableForSale || isAdding}
//                   className={clsx(
//                     "flex-1 h-[54px] rounded-xl flex items-center justify-center gap-2 text-[13px] font-black uppercase tracking-widest transition-all",
//                     !selectedVariant?.availableForSale 
//                       ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
//                       : "bg-[#EF4444] text-white hover:bg-[#DC2626] shadow-[0_8px_20px_rgba(239,68,68,0.25)] hover:shadow-[0_8px_20px_rgba(239,68,68,0.4)]"
//                   )}
//                 >
//                   {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : (
//                     <>
//                       <ShoppingBag className="w-4 h-4" />
//                       {!selectedVariant?.availableForSale ? 'Out of Stock' : 'Add to Cart'}
//                     </>
//                   )}
//                 </button>
//               </div>

//               {/* Buy Now Button (New) */}
//               <button 
//                 onClick={handleBuyNow}
//                 disabled={!selectedVariant?.availableForSale || isBuyingNow}
//                 className={clsx(
//                   "w-full h-[54px] rounded-xl flex items-center justify-center gap-2 text-[13px] font-black uppercase tracking-widest transition-all border-2",
//                   !selectedVariant?.availableForSale 
//                     ? "border-gray-100 text-gray-400 cursor-not-allowed hidden" 
//                     : "border-gray-900 bg-gray-900 text-white hover:bg-white hover:text-gray-900 shadow-lg"
//                 )}
//               >
//                 {isBuyingNow ? <Loader2 className="w-5 h-5 animate-spin" /> : (
//                   <>
//                     <CreditCard className="w-4 h-4" /> Buy It Now
//                   </>
//                 )}
//               </button>
//             </div>

//             {/* Details Accordion */}
//             <div className="mt-auto border-t border-gray-100">
//               <AccordionItem 
//                 title="Description" 
//                 isOpen={activeAccordion === 'description'} 
//                 onToggle={() => setActiveAccordion(activeAccordion === 'description' ? null : 'description')}
//               >
//                 <div 
//                   className="prose prose-sm max-w-none text-gray-600 text-sm leading-relaxed pb-6"
//                   dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} 
//                 />
//               </AccordionItem>
              
//               <AccordionItem 
//                 title="Benefits & Materials" 
//                 isOpen={activeAccordion === 'benefits'} 
//                 onToggle={() => setActiveAccordion(activeAccordion === 'benefits' ? null : 'benefits')}
//               >
//                 <ul className="text-sm text-gray-600 space-y-3 pb-6 list-disc pl-5 marker:text-gray-300">
//                   <li><strong className="text-gray-900">Waterproof:</strong> Lasts 1-2 weeks depending on placement.</li>
//                   <li><strong className="text-gray-900">Skin Safe:</strong> Made with hypoallergenic, plant-based ink.</li>
//                   <li>Looks incredibly realistic, mimicking real tattoo textures.</li>
//                 </ul>
//               </AccordionItem>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* FULL SCREEN MAGNIFIER MODAL */}
//       <AnimatePresence>
//         {isZoomed && (
//           <motion.div 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }} 
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
//             onClick={() => setIsZoomed(false)}
//           >
//             <button 
//               className="absolute top-6 right-6 mt-20 p-4 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-900 transition-colors z-[110]"
//               aria-label="Close zoom"
//             >
//               <X className="w-5 h-5" strokeWidth={2.5} />
//             </button>
//             <motion.div 
//               initial={{ scale: 0.9, opacity: 0 }} 
//               animate={{ scale: 1, opacity: 1 }} 
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="relative w-full h-full max-w-6xl max-h-[90vh]"
//             >
//               <Image 
//                 src={activeImage} 
//                 alt="Magnified view" 
//                 fill
//                 className="object-contain drop-shadow-2xl"
//                 quality={100}
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // =========================================================
// // STRICTLY TYPED ACCORDION COMPONENT
// // =========================================================
// interface AccordionProps {
//   title: string;
//   isOpen: boolean;
//   onToggle: () => void;
//   children: React.ReactNode;
// }

// function AccordionItem({ title, isOpen, onToggle, children }: AccordionProps) {
//   return (
//     <div className="border-b border-gray-100 last:border-0">
//       <button 
//         onClick={onToggle}
//         className="w-full py-4 flex items-center justify-between group outline-none"
//       >
//         <span className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-900 group-hover:text-gray-500 transition-colors">
//           {title}
//         </span>
//         <motion.div
//           animate={{ rotate: isOpen ? 180 : 0 }}
//           transition={{ duration: 0.2 }}
//         >
//           <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" />
//         </motion.div>
//       </button>
//       <AnimatePresence initial={false}>
//         {isOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
//             className="overflow-hidden"
//           >
//             {children}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }



"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Plus, Minus, ZoomIn, X, Star,
  Droplets, ChevronDown, ShieldCheck, Loader2,
  Clock, Sparkles, ShoppingBag, Info, AlertCircle
} from 'lucide-react';
import clsx from 'clsx';
import { toast } from 'sonner';
import { useCart } from '@/src/context/CartContext';
import { FormattedProduct, Variant } from '@/src/lib/shopify';

interface TattooProductDetailProps {
  product: FormattedProduct;
}

export default function TattooProductDetail({ product }: TattooProductDetailProps) {
  const { addToCart, buyNow } = useCart();
  
  // UI States
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('description');
  
  // Cart States
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  // Variant State
  const variants = product.allVariants || [];
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    variants.find(v => v.availableForSale) || variants[0] || null
  );

  // Derived Values from your robust mapper
  const price = selectedVariant ? Number(selectedVariant.price) : product.checkout.price;
  const compareAtPrice = selectedVariant?.compareAtPrice ? Number(selectedVariant.compareAtPrice) : product.checkout.compareAtPrice;
  const isOnSale = compareAtPrice && compareAtPrice > price;
  
  // Utilize the pre-calculated discount percentage or fallback
  const discount = product.checkout.discountPercentage || (isOnSale ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0);

  // Media (Using mapped gallery array)
  const images = product.media?.gallery?.length > 0 
    ? product.media.gallery 
    : [{ url: product.media?.featuredImage || '/assets/images/placeholder-tattoo.png', altText: product.title }];

  // Lock body scroll when Zoom Modal is open
  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isZoomed]);

  // Handlers
  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    setQuantity(prev => {
      if (type === 'increase') return prev + 1;
      return prev > 1 ? prev - 1 : 1;
    });
  };

  const handleAddToCart = async () => {
    if (!selectedVariant?.variantId) {
      toast.error("Please select an option");
      return;
    }
    
    setIsAdding(true);
    try {
      await addToCart(selectedVariant.variantId, quantity);
      toast.success("Added to cart");
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!selectedVariant?.variantId) {
      toast.error("Please select an option");
      return;
    }
    
    setIsBuyingNow(true);
    try {
      const checkoutUrl = await buyNow(selectedVariant.variantId, quantity);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Buy now error:", error);
    } finally {
      setIsBuyingNow(false);
    }
  };

  const toggleAccordion = (id: string) => {
    setActiveAccordion(prev => prev === id ? null : id);
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-20 selection:bg-[#fe8204] selection:text-white">
      <div className="container max-w-[1400px] mx-auto px-4">
        
        {/* BREADCRUMBS */}
        <nav className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 lg:mb-8">
          <a href="/" className="hover:text-gray-900 transition-colors">Home</a>
          <span>/</span>
          <a href="/collections/" className="hover:text-gray-900 transition-colors">Shop ALL</a>
          <span>/</span>
          <span className="text-gray-900 truncate max-w-[150px] sm:max-w-none">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 xl:gap-16">
          
          {/* ========================================================= */}
          {/* LEFT: IMAGE GALLERY (Thumbnails at Bottom, Reduced Height)*/}
          {/* ========================================================= */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:h-fit">
            
            {/* Main Image Viewer */}
            <div className="relative w-full aspect-square md:aspect-[4/3] max-h-[500px] rounded-2xl bg-[#0a0a0a] border border-gray-100 overflow-hidden flex items-center justify-center group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full p-6 md:p-8"
                >
                  <Image 
                    src={images[activeImageIndex].url} 
                    alt={images[activeImageIndex].altText || product.title}
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Badges Overlay (Safely utilizing the mapper's output) */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.styling?.badges?.filter(Boolean).map((badge: any, i: number) => (
                  <span 
                    key={i} 
                    className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white rounded-md shadow-sm"
                    style={{ backgroundColor: badge.color }}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>

              {/* Magnifier / Zoom Button */}
              <button 
                onClick={() => setIsZoomed(true)}
                className="absolute bottom-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                aria-label="Zoom image"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>

            {/* Horizontal Thumbnails at Bottom */}
            {images.length > 1 && (
              <div className="flex flex-row gap-3 overflow-x-auto no-scrollbar pb-2">
                {images.map((img, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={clsx(
                      "relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-[#0a0a0a] border-2 transition-all duration-300",
                      activeImageIndex === index ? "border-[#fe8204]" : "border-transparent hover:border-gray-400"
                    )}
                  >
                    <Image 
                      src={img.url} 
                      alt={img.altText || `Thumbnail ${index + 1}`} 
                      fill 
                      className="object-contain p-2"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* RIGHT: PRODUCT INFO (Maximized Data Display)              */}
          {/* ========================================================= */}
          <div className="flex flex-col py-2">
            
            {/* Vendor, Type & Stars */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-[10px] font-black text-[#fe8204] uppercase tracking-widest bg-[#fe8204]/10 px-2.5 py-1 rounded-md">
                  {product.vendor}
                </span>
                {product.styling?.tattooColorType && (
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-gray-100 px-2.5 py-1 rounded-md">
                    {product.styling.tattooColorType}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-gray-900 leading-[1.1] mb-4">
                {product.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1 text-[#fe8204]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest pt-0.5">
                  4.9 (120 Reviews)
                </p>
              </div>
            </div>
            
            {/* Price & Inventory Alert */}
            <div className="mb-8 border-b border-gray-100 pb-8">
              <div className="flex items-end gap-4 mb-2">
                <span className="text-3xl font-black text-gray-900 tracking-tight">
                  ${price.toFixed(2)}
                </span>
                {isOnSale && (
                  <>
                    <span className="text-xl font-bold text-gray-400 line-through mb-0.5">
                      ${compareAtPrice.toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-600 px-2.5 py-1 text-xs font-black uppercase tracking-widest rounded-md mb-1.5">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Dynamic Inventory Notice from Mapper */}
              {product.inventory?.stockLevel > 0 && product.inventory.stockLevel < 10 ? (
                <div className="flex items-center gap-1.5 text-red-500 mt-2">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-widest">
                    Low Stock: Only {product.inventory.stockLevel} left!
                  </span>
                </div>
              ) : product.inventory?.inStock ? (
                <span className="text-[11px] font-bold uppercase tracking-widest text-green-600 mt-2 block">
                  ✓ In Stock & Ready to Ship
                </span>
              ) : null}
            </div>

            {/* Variants (Size/Style Selection Pills) */}
            {variants.length > 1 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-900">Select Option</h3>
                  {selectedVariant && !selectedVariant.availableForSale && (
                     <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Out of Stock</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  {variants.map((v) => (
                    <button
                      key={v.variantId}
                      onClick={() => setSelectedVariant(v)}
                      className={clsx(
                        "px-6 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200 border-2",
                        selectedVariant?.variantId === v.variantId 
                          ? "border-[#fe8204] bg-[#fe8204] text-white shadow-md" 
                          : "border-gray-200 bg-white text-gray-900 hover:border-gray-900"
                      )}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: Droplets, text: "Waterproof" },
                { icon: Clock, text: "Lasts 1-2 Weeks" },
                { icon: ShieldCheck, text: "Skin Safe" },
                { icon: Sparkles, text: "Realistic Look" }
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <feat.icon className="w-5 h-5 text-[#fe8204]" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-700">{feat.text}</span>
                </div>
              ))}
            </div>

            {/* Action Area (Quantity + Buttons) */}
            <div className="flex flex-col gap-4 mb-12">
              <div className="flex flex-col sm:flex-row items-stretch gap-4">
                
                {/* Quantity Selector */}
                <div className="flex items-center justify-between border-2 border-gray-200 rounded-xl bg-white h-[60px] w-full sm:w-[140px] shrink-0">
                  <button 
                    onClick={() => handleQuantityChange('decrease')} 
                    className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-base font-black text-gray-900">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange('increase')} 
                    className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add To Cart */}
                <button 
                  onClick={handleAddToCart}
                  disabled={isAdding || !selectedVariant?.availableForSale}
                  className="flex-1 h-[60px] border-2 border-gray-900 bg-white text-gray-900 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShoppingBag className="w-5 h-5" />}
                  Add to Cart
                </button>
              </div>

              {/* Buy Now */}
              <button 
                onClick={handleBuyNow}
                disabled={isBuyingNow || !selectedVariant?.availableForSale}
                className="w-full h-[60px] bg-[#fe8204] text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-[#e07103] transition-colors duration-300 flex items-center justify-center gap-3 shadow-lg shadow-[#fe8204]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBuyingNow ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {selectedVariant?.availableForSale ? "Buy It Now" : "Out of Stock"}
              </button>
            </div>

            {/* Accordions (Maximizing mapped data) */}
            <div className="border-t-2 border-gray-100">
              <AccordionItem 
                title="Description" 
                isOpen={activeAccordion === 'description'} 
                onToggle={() => toggleAccordion('description')}
              >
                <div 
                  className="prose prose-sm prose-gray max-w-none text-gray-600 font-medium leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
                />
              </AccordionItem>

              {/* Specific Product Attributes extracted from mapper */}
              <AccordionItem 
                title="Tattoo Details" 
                isOpen={activeAccordion === 'details'} 
                onToggle={() => toggleAccordion('details')}
              >
                <div className="space-y-4">
                  {product.attributes?.themes?.length > 0 && (
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Themes</span>
                      <div className="flex flex-wrap gap-2">
                        {product.attributes.themes.map((theme, i) => (
                          <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-[11px] font-bold uppercase">{theme}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {product.attributes?.placements?.length > 0 && (
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Best Placements</span>
                      <div className="flex flex-wrap gap-2">
                        {product.attributes.placements.map((placement, i) => (
                          <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-[11px] font-bold uppercase">{placement}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {product.attributes?.tags?.length > 0 && (
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Tags</span>
                      <div className="flex flex-wrap gap-2">
                        {product.attributes.tags.map((tag, i) => (
                          <span key={i} className="bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </AccordionItem>
              
              <AccordionItem 
                title="How To Apply" 
                isOpen={activeAccordion === 'apply'} 
                onToggle={() => toggleAccordion('apply')}
              >
                <ol className="space-y-3 text-sm text-gray-600 font-medium list-decimal pl-4">
                  <li>Ensure your skin is clean, dry, and free of makeup or lotions.</li>
                  <li>Remove the clear protective top sheet.</li>
                  <li>Press the tattoo design firmly onto your skin.</li>
                  <li>Hold a wet cloth or sponge against the back of the tattoo for 30 seconds.</li>
                  <li>Gently peel off the paper backing. Let it dry!</li>
                </ol>
              </AccordionItem>

              <AccordionItem 
                title="Shipping & Returns" 
                isOpen={activeAccordion === 'shipping'} 
                onToggle={() => toggleAccordion('shipping')}
              >
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  Orders process within 1-2 business days. Free shipping on orders over $50. 
                  Not completely satisfied? We accept returns within 30 days of purchase for a full refund.
                </p>
              </AccordionItem>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MAGNIFIER / ZOOM MODAL                                    */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col overflow-y-auto cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
              className="fixed top-6 right-6 z-[101] w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Close zoom"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="min-h-screen w-full flex items-center justify-center p-4 py-20">
              <Image 
                src={images[activeImageIndex].url} 
                alt={images[activeImageIndex].altText || product.title}
                width={1200}
                height={1200}
                className="w-auto max-w-full h-auto max-h-none object-contain rounded-xl"
                onClick={(e) => e.stopPropagation()} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// =========================================================
// CLEAN ACCORDION COMPONENT
// =========================================================
function AccordionItem({ title, isOpen, onToggle, children }: { title: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="border-b-2 border-gray-100 last:border-0">
      <button 
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between group outline-none"
      >
        <span className="text-xs font-black uppercase tracking-widest text-gray-900 group-hover:text-[#fe8204] transition-colors">
          {title}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#fe8204] transition-colors" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}