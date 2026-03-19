"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Plus, Minus, ZoomIn, 
  Droplets, X, Star, ChevronDown, ChevronUp, ShieldCheck, Loader2,
  Clock, Flame
} from 'lucide-react';
import clsx from 'clsx';
import { toast } from 'sonner';
import { useCart } from '@/src/context/CartContext';
import { FormattedProduct, Variant } from '@/src/lib/shopify';

interface TattooProductDetailProps {
  product: FormattedProduct;
}

export default function TattooProductDetail({ product }: TattooProductDetailProps) {
  const { addToCart } = useCart();
  
  // UI States
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('description');
  
  // Cart States
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

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
  const { tattooColorType } = product.styling;
  const { themes, placements, tags } = product.attributes;
  const stockLevel = product.inventory.stockLevel;
  const isLowStock = product.inventory.inStock && stockLevel > 0 && stockLevel <= 10;

  // =========================================================
  // ADD TO CART HANDLER
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

  return (
    <div className="bg-white min-h-screen pb-20 pt-24 selection:bg-[var(--color-brand-orange)] selection:text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-8 flex items-center gap-2 overflow-x-auto whitespace-nowrap no-scrollbar">
          <a href="/" className="hover:text-gray-900 transition-colors">Home</a>
          <span>/</span>
          <a href="/collections" className="hover:text-gray-900 transition-colors">Shop</a>
          {product.vendor && (
            <>
              <span>/</span>
              <span className="hover:text-gray-900 transition-colors cursor-pointer">{product.vendor}</span>
            </>
          )}
          <span>/</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* ===================================== */}
          {/* LEFT: IMAGE GALLERY (Matching UI Ref) */}
          {/* ===================================== */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-4 lg:sticky lg:top-28 lg:h-[calc(100vh-120px)]">
            
            {/* Vertical Thumbnails (Left side on Desktop, Top horizontal on Mobile) */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-[88px] shrink-0 py-1">
              {gallery.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={clsx(
                    "relative w-20 h-24 md:w-[88px] md:h-[110px] shrink-0 rounded-2xl overflow-hidden transition-all duration-300",
                    activeImageIndex === idx 
                      ? "ring-2 ring-offset-2 ring-[var(--color-brand-orange)] opacity-100" 
                      : "ring-1 ring-gray-200 opacity-60 hover:opacity-100 hover:ring-gray-300 bg-gray-50"
                  )}
                >
                  <Image src={img.url} alt={img.altText || `Thumbnail ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image Viewport */}
            <div className="relative flex-1 aspect-[4/5] md:aspect-auto md:h-full bg-[#F9F9F9] rounded-[32px] overflow-hidden group cursor-zoom-in border border-gray-100 shadow-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 p-4 md:p-10"
                  onClick={() => setIsZoomed(true)}
                >
                  <Image 
                    src={activeImage} 
                    alt={product.title} 
                    fill 
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Dynamic Badges Overlay */}
              <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                {product.styling.badges?.map((badge, idx) => (
                  <span 
                    key={idx} 
                    className="px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-sm text-white backdrop-blur-md" 
                    style={{ backgroundColor: badge.color || '#000' }}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>

              {/* Zoom Indicator */}
              <button 
                onClick={() => setIsZoomed(true)}
                className="absolute bottom-6 right-6 p-3.5 bg-white/90 backdrop-blur-md shadow-lg rounded-full text-gray-900 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 hover:bg-gray-900 hover:text-white"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ===================================== */}
          {/* RIGHT: PRODUCT DETAILS                */}
          {/* ===================================== */}
          <div className="lg:col-span-5 flex flex-col pt-4 md:pt-0">
            
            {/* Vendor & Rating */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[12px] font-black text-[var(--color-brand-orange)] uppercase tracking-[0.2em]">
                {product.vendor}
              </span>
              <div className="flex items-center gap-1.5 cursor-pointer group">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-xs font-bold text-gray-500 underline group-hover:text-gray-900 transition-colors">Write a review</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-[44px] font-black text-gray-900 leading-[1.05] mb-4 uppercase tracking-tighter">
              {product.title}
            </h1>

            {/* Rich Attributes (Color, Theme, Placement) */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-widest rounded-md">
                {tattooColorType}
              </span>
              {themes.slice(0, 2).map(theme => (
                <span key={theme} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-widest rounded-md">
                  {theme}
                </span>
              ))}
              {placements.slice(0, 2).map(placement => (
                <span key={placement} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-widest rounded-md border border-gray-200">
                  Fits: {placement}
                </span>
              ))}
            </div>

            {/* Pricing Area */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
              <span className="text-4xl font-black text-gray-900 tracking-tight">${price.toFixed(2)}</span>
              {hasDiscount && (
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-gray-400 line-through">${compareAtPrice.toFixed(2)}</span>
                  <span className="text-[11px] font-black uppercase tracking-widest text-red-500">
                    You Save {product.checkout.discountPercentage}%
                  </span>
                </div>
              )}
            </div>

            {/* Variant Selector */}
            {variants.length > 1 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900">Select Size</span>
                  <button className="text-[11px] font-bold text-gray-400 underline hover:text-gray-900 transition-colors">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {variants.map((variant) => {
                    const isSelected = selectedVariant?.variantId === variant.variantId;
                    const sizeLabel = variant.selectedOptions?.find(o => o.name === 'Size')?.value || variant.title;
                    
                    return (
                      <button
                        key={variant.variantId}
                        disabled={!variant.availableForSale}
                        onClick={() => setSelectedVariant(variant)}
                        className={clsx(
                          "py-3 px-6 rounded-2xl text-[13px] font-black uppercase tracking-wider transition-all border-2",
                          isSelected 
                            ? "border-gray-900 bg-gray-900 text-white shadow-lg" 
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

            {/* Dynamic Low Stock Warning */}
            <AnimatePresence>
              {isLowStock && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  className="flex items-center gap-2 mb-4 text-orange-600 bg-orange-50 px-4 py-3 rounded-xl border border-orange-100"
                >
                  <Flame className="w-4 h-4 fill-current animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest">Selling Fast — Only {stockLevel} left!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Add to Cart Layout */}
            <div className="flex items-center gap-3 mb-8">
              {/* Quantity Selector */}
              <div className="flex items-center bg-gray-50 border-2 border-gray-100 rounded-2xl p-1 h-[60px]">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-xl transition-all active:scale-95"
                >
                  <Minus className="w-4 h-4" strokeWidth={3} />
                </button>
                <span className="w-8 text-center text-sm font-black text-gray-900">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-xl transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" strokeWidth={3} />
                </button>
              </div>

              {/* Add Button */}
              <button 
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale || isAdding}
                className={clsx(
                  "flex-1 h-[60px] rounded-2xl flex items-center justify-center gap-2 text-[14px] font-black uppercase tracking-[0.15em] transition-all active:scale-[0.98]",
                  !selectedVariant?.availableForSale 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-100" 
                    : "bg-[#fe8204] text-white hover:bg-[#e07300] shadow-[0_12px_24px_rgba(254,130,4,0.25)] hover:shadow-[0_12px_24px_rgba(254,130,4,0.4)]"
                )}
              >
                {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : !selectedVariant?.availableForSale ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>

            {/* Value Propositions */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              <div className="flex items-center gap-3 p-4 bg-[#F9F9F9] rounded-2xl border border-gray-100">
                <Droplets className="w-5 h-5 text-[var(--color-brand-orange)]" />
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-900">Waterproof</h4>
                  <p className="text-[10px] text-gray-500 font-bold mt-0.5 uppercase tracking-wider">Lasts 1-2 weeks</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-[#F9F9F9] rounded-2xl border border-gray-100">
                <ShieldCheck className="w-5 h-5 text-[var(--color-brand-orange)]" />
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-900">Skin Safe</h4>
                  <p className="text-[10px] text-gray-500 font-bold mt-0.5 uppercase tracking-wider">Plant-based ink</p>
                </div>
              </div>
            </div>

            {/* Accordions */}
            <div className="border-t border-gray-200">
              <AccordionItem 
                title="Design Details" 
                isOpen={activeAccordion === 'description'} 
                onToggle={() => setActiveAccordion(activeAccordion === 'description' ? null : 'description')}
              >
                <div 
                  className="prose prose-sm max-w-none text-gray-600 font-medium leading-relaxed pb-6"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} 
                />
              </AccordionItem>
              
              <AccordionItem 
                title="How to Apply" 
                isOpen={activeAccordion === 'apply'} 
                onToggle={() => setActiveAccordion(activeAccordion === 'apply' ? null : 'apply')}
              >
                <ol className="text-sm text-gray-600 font-medium space-y-3 pb-6 list-decimal pl-5 marker:text-[var(--color-brand-orange)] marker:font-black">
                  <li>Ensure skin is completely clean, dry, and free of oils or lotions.</li>
                  <li>Remove the clear protective top sheet.</li>
                  <li>Press the tattoo firmly, design facing down, onto your skin.</li>
                  <li>Hold a completely wet cloth against the back of the tattoo. Press down and soak it thoroughly.</li>
                  <li>Wait 30 full seconds, then gently slide off the paper backing.</li>
                </ol>
              </AccordionItem>

              <AccordionItem 
                title="Shipping & Returns" 
                isOpen={activeAccordion === 'shipping'} 
                onToggle={() => setActiveAccordion(activeAccordion === 'shipping' ? null : 'shipping')}
              >
                <div className="space-y-4 pb-6 text-sm text-gray-600 font-medium">
                  <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-gray-400"/> Orders process in 1-2 business days.</p>
                  <p>Free standard shipping on all domestic orders over $35. International shipping calculated at checkout.</p>
                  <p>Not satisfied? We offer a 30-day money-back guarantee on unused tattoos.</p>
                </div>
              </AccordionItem>
            </div>

            {/* SEO Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-100">
                {tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-gray-50 text-gray-400 hover:text-gray-900 cursor-pointer transition-colors text-[9px] font-black uppercase tracking-[0.15em] rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

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
              className="absolute top-6 right-6 p-4 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-900 transition-colors z-[110]"
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
                className="object-contain"
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
    <div className="border-b border-gray-100">
      <button 
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between group outline-none"
      >
        <span className="text-[13px] font-black uppercase tracking-[0.15em] text-gray-900 group-hover:text-[var(--color-brand-orange)] transition-colors">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-300 group-hover:text-[var(--color-brand-orange)] transition-colors" />
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