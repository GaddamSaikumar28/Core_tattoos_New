

"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Plus, Minus, ZoomIn, 
  Droplets, X, Star, ChevronDown, ShieldCheck, Loader2,
  Clock, Flame, ShoppingBag, CreditCard
} from 'lucide-react';
import clsx from 'clsx';
import { toast } from 'sonner';
import { useCart } from '@/src/context/CartContext';
import { FormattedProduct, Variant } from '@/src/lib/shopify';

interface TattooProductDetailProps {
  product: FormattedProduct;
}

export default function TattooProductDetail({ product }: TattooProductDetailProps) {
  const { addToCart,buyNow } = useCart();
  
  // UI States
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
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

  // Derived Values
  const price = selectedVariant ? Number(selectedVariant.price) : Number(product.checkout.price);
  const compareAtPrice = selectedVariant?.compareAtPrice ? Number(selectedVariant.compareAtPrice) : Number(product.checkout.compareAtPrice);
  const hasDiscount = compareAtPrice > price;
  
  const gallery = product.media.gallery.length > 0 ? product.media.gallery : [{ url: product.media.featuredImage || '/placeholder.png', altText: product.title }];
  const activeImage = gallery[activeImageIndex]?.url || '/placeholder.png';

  // Extract rich attributes from the mapped Shopify data
  const { tattooColorType, uiBackgroundColor, badges } = product.styling;
  const { themes, placements, tags } = product.attributes;
  const stockLevel = product.inventory.stockLevel;
  const isLowStock = product.inventory.inStock && stockLevel > 0 && stockLevel <= 10;

  // Dynamic Colors based on mapping
  const primaryColor = uiBackgroundColor || '#00D084'; // Fallback to wireframe-like green

  // =========================================================
  // HANDLERS
  // =========================================================
  const handleAddToCart = async () => {
    if (!selectedVariant?.variantId) {
      toast.error("Please select a variant.");
      return;
    }

    const safeQuantity = quantity > 0 ? quantity : 1;
    setIsAdding(true);
    
    try {
      await addToCart(selectedVariant.variantId, safeQuantity);
      toast.success(`${product.title} added to cart!`);
    } catch (error) {
      console.error("Detail page cart error", error);
      toast.error("Failed to add to cart. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!selectedVariant?.variantId) {
      toast.error("Please select a variant.");
      return;
    }

    setIsBuyingNow(true);
    try {
      const safeQuantity = quantity > 0 ? quantity : 1;
      
      // Call our new dedicated function
      const checkoutUrl = await buyNow(selectedVariant.variantId, safeQuantity);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        setIsBuyingNow(false);
        // Toast is already handled inside the context if it fails
      }
    } catch (error) {
      console.error("Buy Now error", error);
      toast.error("Checkout failed. Please try again.");
      setIsBuyingNow(false);
    }
  };

//   const handleBuyNow = async () => {
//     if (!selectedVariant?.variantId) {
//       toast.error("Please select a variant.");
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       // 1. Add to cart behind the scenes
//       await addToCart(selectedVariant.variantId, quantity > 0 ? quantity : 1);
      
//       // 2. Direct redirect to Shopify checkout
//       // Note: Adjust '/checkout' to your actual checkout routing path if using a custom headless setup
//     //   window.location.href = '/checkout'; 

//     if (cart?.checkoutUrl) {
//       window.location.href = cart.checkoutUrl;
//     }
  
//     } catch (error) {
//       console.error("Buy Now error", error);
//       toast.error("Checkout failed. Please try again.");
//       setIsBuyingNow(false);
//     }
//   };

  return (
    <div 
      className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 selection:bg-gray-900 selection:text-white flex items-center justify-center transition-colors duration-500"
      style={{ backgroundColor: `${primaryColor}20` }} // 20% opacity of the dynamic color for the page background
    >
      <div className="max-w-[1100px] w-full mx-auto relative">
        
        {/* Breadcrumb */}
        <nav className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2 overflow-x-auto whitespace-nowrap no-scrollbar pl-2">
          <a href="/" className="hover:text-gray-900 transition-colors">Home</a>
          <span>/</span>
          <a href="/collections" className="hover:text-gray-900 transition-colors">Shop</a>
          {/* {product.vendor && (
            <>
              <span>/</span>
              <span className="hover:text-gray-900 transition-colors cursor-pointer">{product.vendor}</span>
            </>
          )} */}
          <span>/</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>

        {/* MAIN CONTAINER (White Card) */}
        {/* Added lg:ml-12 here to gently push the white card to the right on larger screens */}
        <div className="relative bg-white rounded-[24px] shadow-2xl lg:shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 md:p-10 lg:pl-[440px] lg:pr-12 lg:py-16 flex flex-col lg:min-h-[600px] lg:ml-12">
          
          {/* ===================================== */}
          {/* LEFT: 3D FLOATING IMAGE GALLERY       */}
          {/* ===================================== */}
          <div 
            className="lg:absolute lg:left-[-40px] lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-[420px] rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.15)] z-20 flex flex-col overflow-hidden mb-8 lg:mb-0 transition-colors duration-500"
            style={{ backgroundColor: primaryColor }} // Using mapped UI color for the floating card
          >
            
            {/* Top Bar inside floating card (Grouped to the right with contrasting frosted backgrounds) */}
            <div className="absolute md:top-4 md:right-4 top-7 right-7 flex items-center gap-2 z-30">
              <button 
                onClick={() => setIsZoomed(true)}
                className="p-2.5 bg-white/80 backdrop-blur-md hover:bg-white text-gray-900 rounded-full shadow-sm transition-all"
                aria-label="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button 
                className="p-2.5 bg-white/80 backdrop-blur-md hover:bg-white text-gray-900 rounded-full shadow-sm transition-all"
                aria-label="Add to Favorites"
              >
                <Star className="w-4 h-4" />
              </button>
            </div>

            {/* Badges (Adjusted to sit beautifully on the top left) */}
            <div className="absolute md:top-4 md:left-4 top-7 left-8 flex flex-col gap-2 z-30">
              {badges?.map((badge, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full shadow-md text-white backdrop-blur-md border border-white/20" 
                  style={{ backgroundColor: badge.color || '#000' }}
                >
                  {badge.label}
                </span>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative w-full aspect-square flex-1 p-8 cursor-zoom-in mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  className="absolute inset-0 p-8 flex items-center justify-center drop-shadow-2xl"
                  onClick={() => setIsZoomed(true)}
                >
                  <Image 
                    src={activeImage} 
                    alt={product.title} 
                    fill 
                    priority
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-contain transition-transform duration-700 hover:scale-110"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnails (Bottom Strip like Wireframe) */}
            <div className="bg-white/90 backdrop-blur-md m-4 p-3 rounded-[16px] flex gap-3 overflow-x-auto no-scrollbar justify-center shadow-inner relative z-30">
              {gallery.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={clsx(
                    "relative w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-[10px] overflow-hidden transition-all duration-300 border-2",
                    activeImageIndex === idx 
                      ? "border-gray-900 shadow-md scale-105" 
                      : "border-transparent opacity-60 hover:opacity-100 hover:border-gray-200"
                  )}
                >
                  <Image src={img.url} alt={img.altText || `Thumbnail ${idx}`} fill className="object-cover bg-gray-50" />
                </button>
              ))}
            </div>
          </div>

          {/* ===================================== */}
          {/* RIGHT: PRODUCT DETAILS                */}
          {/* ===================================== */}
          <div className="flex-1 flex flex-col w-full relative z-10">
            
            {/* Title & Vendor */}
            <div className="mb-4">
              <h1 className="text-3xl md:text-[40px] font-black text-gray-900 leading-[1.1] mb-1 tracking-tight">
                {product.title}
              </h1>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Artist: {product.vendor}
              </span>
            </div>

            {/* Pricing Section (Shows both Original and Discounted) */}
            <div className="flex items-end gap-3 mb-6">
              <span className="text-4xl font-black tracking-tighter" style={{ color: hasDiscount ? '#EF4444' : '#111827' }}>
                {selectedVariant?.currency === 'USD' ? '$' : selectedVariant?.currency}
                {price.toFixed(2)}
              </span>
              
              {hasDiscount && (
                <div className="flex flex-col mb-1">
                  <span className="text-sm font-bold text-gray-400 line-through">
                    ${compareAtPrice.toFixed(2)}
                  </span>
                  {product.checkout.discountPercentage!=null && product.checkout.discountPercentage > 0 && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50 px-2 py-0.5 rounded-sm">
                      Save {product.checkout.discountPercentage}%
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Rich Attributes (Tags, Themes) */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
                {tattooColorType}
              </span>
              {themes.slice(0, 2).map(theme => (
                <span key={theme} className="px-3 py-1 bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {theme}
                </span>
              ))}
              {placements.slice(0, 2).map(placement => (
                <span key={placement} className="px-3 py-1 bg-gray-50 text-gray-500 border border-gray-200 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Fits: {placement}
                </span>
              ))}
            </div>

            {/* Variant Selector */}
            {variants.length > 1 && (
              <div className="mb-6">
                <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Select Size / Style</span>
                <div className="flex flex-wrap gap-2">
                  {variants.map((variant) => {
                    const isSelected = selectedVariant?.variantId === variant.variantId;
                    const sizeLabel = variant.selectedOptions?.find(o => o.name === 'Size')?.value || variant.title;
                    
                    return (
                      <button
                        key={variant.variantId}
                        disabled={!variant.availableForSale}
                        onClick={() => setSelectedVariant(variant)}
                        className={clsx(
                          "py-2 px-4 rounded-xl text-[12px] font-bold uppercase tracking-wider transition-all border-2",
                          isSelected 
                            ? "border-gray-900 bg-gray-900 text-white" 
                            : !variant.availableForSale
                              ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                              : "border-gray-200 bg-white text-gray-600 hover:border-gray-900 hover:text-gray-900"
                        )}
                      >
                        {sizeLabel}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Low Stock Warning */}
            <AnimatePresence>
              {isLowStock && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  className="flex items-center gap-2 mb-6 text-orange-600 bg-orange-50 px-4 py-2.5 rounded-xl border border-orange-100"
                >
                  <Flame className="w-4 h-4 fill-current animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest">Selling Fast — Only {stockLevel} left!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions: Quantity & Add To Cart & Buy Now */}
            <div className="flex flex-col gap-3 mb-8">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1 h-[54px] shrink-0">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-lg transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-black text-gray-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-lg transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button 
                  onClick={handleAddToCart}
                  disabled={!selectedVariant?.availableForSale || isAdding}
                  className={clsx(
                    "flex-1 h-[54px] rounded-xl flex items-center justify-center gap-2 text-[13px] font-black uppercase tracking-widest transition-all",
                    !selectedVariant?.availableForSale 
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                      : "bg-[#EF4444] text-white hover:bg-[#DC2626] shadow-[0_8px_20px_rgba(239,68,68,0.25)] hover:shadow-[0_8px_20px_rgba(239,68,68,0.4)]"
                  )}
                >
                  {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      {!selectedVariant?.availableForSale ? 'Out of Stock' : 'Add to Cart'}
                    </>
                  )}
                </button>
              </div>

              {/* Buy Now Button (New) */}
              <button 
                onClick={handleBuyNow}
                disabled={!selectedVariant?.availableForSale || isBuyingNow}
                className={clsx(
                  "w-full h-[54px] rounded-xl flex items-center justify-center gap-2 text-[13px] font-black uppercase tracking-widest transition-all border-2",
                  !selectedVariant?.availableForSale 
                    ? "border-gray-100 text-gray-400 cursor-not-allowed hidden" 
                    : "border-gray-900 bg-gray-900 text-white hover:bg-white hover:text-gray-900 shadow-lg"
                )}
              >
                {isBuyingNow ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    <CreditCard className="w-4 h-4" /> Buy It Now
                  </>
                )}
              </button>
            </div>

            {/* Details Accordion */}
            <div className="mt-auto border-t border-gray-100">
              <AccordionItem 
                title="Description" 
                isOpen={activeAccordion === 'description'} 
                onToggle={() => setActiveAccordion(activeAccordion === 'description' ? null : 'description')}
              >
                <div 
                  className="prose prose-sm max-w-none text-gray-600 text-sm leading-relaxed pb-6"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} 
                />
              </AccordionItem>
              
              <AccordionItem 
                title="Benefits & Materials" 
                isOpen={activeAccordion === 'benefits'} 
                onToggle={() => setActiveAccordion(activeAccordion === 'benefits' ? null : 'benefits')}
              >
                <ul className="text-sm text-gray-600 space-y-3 pb-6 list-disc pl-5 marker:text-gray-300">
                  <li><strong className="text-gray-900">Waterproof:</strong> Lasts 1-2 weeks depending on placement.</li>
                  <li><strong className="text-gray-900">Skin Safe:</strong> Made with hypoallergenic, plant-based ink.</li>
                  <li>Looks incredibly realistic, mimicking real tattoo textures.</li>
                </ul>
              </AccordionItem>
            </div>

          </div>
        </div>
      </div>

      {/* FULL SCREEN MAGNIFIER MODAL */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            <button 
              className="absolute top-6 right-6 mt-20 p-4 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-900 transition-colors z-[110]"
              aria-label="Close zoom"
            >
              <X className="w-5 h-5" strokeWidth={2.5} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-6xl max-h-[90vh]"
            >
              <Image 
                src={activeImage} 
                alt="Magnified view" 
                fill
                className="object-contain drop-shadow-2xl"
                quality={100}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// =========================================================
// STRICTLY TYPED ACCORDION COMPONENT
// =========================================================
interface AccordionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function AccordionItem({ title, isOpen, onToggle, children }: AccordionProps) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={onToggle}
        className="w-full py-4 flex items-center justify-between group outline-none"
      >
        <span className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-900 group-hover:text-gray-500 transition-colors">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}