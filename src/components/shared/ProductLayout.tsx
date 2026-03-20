

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ShoppingCart, Loader2, Minus, Plus } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
import { toast } from 'sonner';
import { useCart } from '@/src/context/CartContext';
import { FormattedProduct, Variant } from '@/src/lib/shopify';

interface ProductCardProps {
  item: FormattedProduct;
  viewMode: 'grid' | 'list';
  page: string; 
}

export function ProductCard({ item, viewMode, page }: ProductCardProps) {
  const isList = viewMode === 'list';
  const variants = item.allVariants || [];
   
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    variants.length > 0 ? variants[0] : null
  );

  // New State for Quantity
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  // Price Calculation handling both Normal and Discounted states
  const currentPrice = selectedVariant ? Number(selectedVariant.price) : Number(item.checkout.price);
  const originalPrice = selectedVariant?.compareAtPrice ? Number(selectedVariant.compareAtPrice) : null;
  const hasDiscount = originalPrice !== null && originalPrice > currentPrice;

  const image = item.media.featuredImage || '/placeholder.png';
  const hoverImage = item.media.hoverImage || image; 
  
  const slug = encodeURIComponent(item.slug.toLowerCase().replace(/\s+/g, '-'));
  const productUrl = `/${page}/${slug}`;
  
  const displayBadge = item.styling.badges?.[0];
  const cardColor = item.styling.uiBackgroundColor || '#35A7FF'; 

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'decrease' && quantity > 1) setQuantity(q => q - 1);
    if (type === 'increase') setQuantity(q => q + 1);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    if (!selectedVariant?.variantId) {
        toast.error('Please select a valid option');
        return;
    }
    try {
      setIsAdding(true);
      await addToCart(selectedVariant.variantId, quantity);
    } catch (error) {
      console.error("Failed to add to cart", error);
    } finally {
      setIsAdding(false);
    }
  };


  return (
    <div className={clsx(
      "group relative bg-[#fdfdfd] rounded-[32px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
      "shadow-[0_8px_24px_rgba(149,157,165,0.15)] hover:shadow-[0_20px_40px_rgba(149,157,165,0.25)] hover:-translate-y-2",
      // Changed mobile list mode to true horizontal (flex-row) instead of stacking (flex-col)
      isList ? "flex flex-row sm:flex-row h-auto items-center sm:items-stretch" : "flex flex-col w-full"
    )}>
      
      {/* 1. Geometric Colorful Background */}
      <div 
        className={clsx(
            "absolute top-0 left-0 z-0 transition-all duration-700 ease-in-out group-hover:scale-105 origin-top",
            isList ? "h-full w-[45%] sm:w-1/2" : "h-[50%] w-full"
        )}
        style={{ 
            backgroundColor: cardColor,
            clipPath: isList 
                ? 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' 
                : 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' 
        }}
      />

      {/* 2. Top Elements: Badges and Floating Price Pill */}
      <div className={clsx(
        "absolute flex justify-between items-start z-30 pointer-events-none",
        isList ? "top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4" : "top-4 left-4 right-4"
      )}>
        {/* Badges */}
        <div className="flex flex-col gap-2">
            {displayBadge && (
            <span className={clsx(
              "bg-white text-gray-900 font-black uppercase rounded-full shadow-sm tracking-wider w-fit",
              isList ? "text-[9px] px-2 py-1 sm:text-[11px] sm:px-3 sm:py-1.5" : "text-[11px] px-3 py-1.5"
            )}>
                {displayBadge.label}
            </span>
            )}
        </div>

        {/* Dynamic Price Pill (Expands if there is a discount) */}
        <div className={clsx(
          "bg-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2",
          isList ? "h-8 px-3 gap-1 sm:h-12 sm:px-4 sm:gap-2" : "h-12 px-4 gap-2"
        )}>
           {hasDiscount && (
             <span className={clsx(
               "font-bold text-gray-400 line-through", 
               isList ? "text-[11px] sm:text-[13px]" : "text-[13px]"
             )}>
               ${originalPrice.toFixed(2)}
             </span>
           )}
           <span className={clsx(
             "font-black tracking-tighter", 
             hasDiscount ? "text-[#FF5964]" : "text-gray-900", 
             isList ? "text-[14px] sm:text-[17px]" : "text-[17px]"
           )}>
             ${currentPrice.toFixed(2)}
           </span>
        </div>
      </div>

      {/* 3. The Product Image */}
      <div className={clsx(
        "relative z-20 flex items-center justify-center shrink-0",
        isList ? "w-[35%] sm:w-64 h-full p-2 sm:p-6" : "w-full pt-20 pb-4 px-6"
      )}>
        <Link href={productUrl} prefetch={false} className={clsx(
          "relative block bg-white rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.08)] overflow-hidden group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:-translate-y-2",
          // Shrink the image on mobile list view so it doesn't break boundaries
          isList ? "w-24 h-24 sm:w-48 sm:h-48 p-2 sm:p-4 mt-8 sm:mt-0 mx-auto" : "w-48 h-48 p-4 mx-auto"
        )}>
            <Image
                src={image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain p-2 sm:p-4 transition-all duration-700 ease-in-out group-hover:opacity-0 group-hover:scale-90"
            />
            <Image
                src={hoverImage}
                alt={`${item.title} alternate view`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain p-2 sm:p-4 opacity-0 scale-120 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-100"
            />
        </Link>
      </div>

      {/* 4. Content & Controls Area */}
      <div className={clsx(
        "relative z-20 flex flex-col flex-grow bg-transparent min-w-0",
        isList ? "justify-center pr-3 py-4 pl-1 sm:pr-8 sm:py-6 sm:pl-0" : "px-5 pb-5 pt-2"
      )}>
        
        <div className={clsx(isList ? "text-left sm:text-center mt-6 sm:mt-0" : "text-center")}>
            {item.attributes.themes?.[0] && (
                <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase mb-1.5 block truncate">
                {item.attributes.themes[0]}
                </span>
            )}
            
            <Link href={productUrl} prefetch={false}>
                <h3 className={clsx(
                  "font-black text-gray-900 leading-tight hover:text-gray-600 transition-colors line-clamp-2",
                  isList ? "text-[15px] sm:text-[18px]" : "text-[18px]"
                )}>
                {item.title}
                </h3>
            </Link>
        </div>

        {/* View Details Button */}
        <div className={clsx(
          "flex-grow flex items-center py-3",
          isList ? "justify-start sm:justify-center" : "justify-center"
        )}>
          <Link 
            href={productUrl}
            prefetch={false}
            className={clsx(
              "font-bold text-gray-500 hover:text-gray-900 border-2 border-gray-100 hover:border-gray-200 bg-white hover:bg-gray-50 rounded-full transition-all duration-300 uppercase tracking-wider",
              isList ? "text-[10px] px-3 py-1 sm:text-[12px] sm:px-5 sm:py-1.5" : "text-[12px] px-5 py-1.5"
            )}
          >
            View Details
          </Link>
        </div>

        {/* Form Controls */}
        <div className="flex flex-col gap-2 sm:gap-3">
          
          {/* Variant Selector (Full Width) */}
          {variants.length > 1 && (
            <div className="relative w-full">
              <select 
                className={clsx(
                  "w-full appearance-none bg-gray-50 font-bold text-gray-700 border-2 border-transparent rounded-full outline-none cursor-pointer hover:bg-gray-100 focus:border-gray-200 focus:bg-white transition-colors",
                  isList ? "py-2 pl-3 pr-8 text-[11px] sm:py-3 sm:pl-5 sm:pr-10 sm:text-[13px]" : "py-3 pl-5 pr-10 text-[13px]"
                )}
                value={selectedVariant ? selectedVariant.variantId : ""}
                onChange={(e) => setSelectedVariant(variants.find(v => v.variantId === e.target.value) || null)}
              >
                <option value="" disabled>Select Option</option>
                {variants.map(v => <option key={v.variantId} value={v.variantId}>{v.title}</option>)}
              </select>
              <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <ChevronDown className="w-4 h-4 stroke-[3]" />
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart Row */}
          <div className={clsx("flex gap-2", isList ? "flex-wrap sm:flex-nowrap" : "")}>
            
            {/* Quantity Selector */}
            <div className={clsx(
              "flex items-center justify-between bg-gray-50 rounded-full shrink-0 border-2 border-transparent hover:border-gray-100 transition-colors",
              isList ? "px-1 w-[80px] sm:px-2 sm:w-[100px]" : "px-2 w-[100px]"
            )}>
              <button 
                onClick={(e) => { e.preventDefault(); handleQuantityChange('decrease'); }}
                className={clsx(
                  "flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-full transition-colors active:scale-90",
                  isList ? "w-6 h-6 sm:w-8 sm:h-8" : "w-8 h-8"
                )}
              >
                <Minus className={clsx("stroke-[3]", isList ? "w-3 h-3 sm:w-3.5 sm:h-3.5" : "w-3.5 h-3.5")} />
              </button>
              
              <span className={clsx(
                "font-black text-gray-900 select-none",
                isList ? "text-[12px] sm:text-[14px]" : "text-[14px]"
              )}>
                {quantity}
              </span>
              
              <button 
                onClick={(e) => { e.preventDefault(); handleQuantityChange('increase'); }}
                className={clsx(
                  "flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-full transition-colors active:scale-90",
                  isList ? "w-6 h-6 sm:w-8 sm:h-8" : "w-8 h-8"
                )}
              >
                <Plus className={clsx("stroke-[3]", isList ? "w-3 h-3 sm:w-3.5 sm:h-3.5" : "w-3.5 h-3.5")} />
              </button>
            </div>

            {/* Action Button */}
            <button 
              onClick={handleAddToCart}
              disabled={!item.inventory.availableForSale || !selectedVariant || isAdding}
              className={clsx(
                "flex-1 flex items-center justify-center gap-2 rounded-full font-black uppercase tracking-wide transition-all duration-300 transform active:scale-[0.97]",
                isList ? "py-2 px-3 text-[11px] sm:py-3.5 sm:px-4 sm:text-[13px]" : "py-3.5 px-4 text-[13px]",
                (!item.inventory.availableForSale || !selectedVariant)
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5"
              )}
            >
              {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : (!item.inventory.availableForSale) ? 'Sold Out' : 'Add to Cart'} 
              {(!isAdding && item.inventory.availableForSale) && <ShoppingCart className={clsx(isList ? "w-3.5 h-3.5 sm:w-4 sm:h-4" : "w-4 h-4")} />}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}