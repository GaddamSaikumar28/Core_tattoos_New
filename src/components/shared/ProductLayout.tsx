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

//   const handleAddToCart = async (e: React.MouseEvent) => {
//     e.preventDefault(); 
    
//     if (!selectedVariant?.variantId) {
//         toast.error('Please select an option first.');
//         return;
//     }

//     setIsAdding(true);
//     try {
//       await addToCart({
//         variantId: selectedVariant.variantId,
//         productId: item.id,
//         name: item.title,
//         variantName: selectedVariant.title,
//         price: currentPrice,
//         image: image,
//         quantity: quantity // Passing the selected quantity
//       });
//       toast.success(`Added ${quantity} to cart!`);
//       setQuantity(1); // Reset after adding
//     } catch (error) {
//       toast.error('Failed to add to cart. Please try again.');
//     } finally {
//       setIsAdding(false);
//     }
//   };

const handleAddToCart = async (e: React.MouseEvent) => {
  e.preventDefault(); 
  if (!selectedVariant?.variantId) {
      toast.error('Please select a valid option');
      return;
  }
  try {
    await addToCart(selectedVariant.variantId, quantity);
  } catch (error) {
    console.error("Failed to add to cart", error);
  }
};


  return (
    <div className={clsx(
      "group relative bg-[#fdfdfd] rounded-[32px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
      "shadow-[0_8px_24px_rgba(149,157,165,0.15)] hover:shadow-[0_20px_40px_rgba(149,157,165,0.25)] hover:-translate-y-2",
      isList ? "flex flex-col sm:flex-row h-auto sm:h-auto" : "flex flex-col w-full"
    )}>
      
      {/* 1. Geometric Colorful Background */}
      <div 
        className={clsx(
            "absolute top-0 left-0 w-full z-0 transition-all duration-700 ease-in-out group-hover:scale-105 origin-top",
            isList ? "h-full w-1/2 clip-path-slant-right" : "h-[60%] clip-path-slant-bottom"
        )}
        style={{ 
            backgroundColor: cardColor,
            clipPath: isList 
                ? 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' 
                : 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' 
        }}
      />

      {/* 2. Top Elements: Badges and Floating Price Pill */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-30 pointer-events-none">
        {/* Badges */}
        <div className="flex flex-col gap-2">
            {displayBadge && (
            <span className="bg-white text-gray-900 text-[11px] font-black uppercase px-3 py-1.5 rounded-full shadow-sm tracking-wider w-fit">
                {displayBadge.label}
            </span>
            )}
        </div>

        {/* Dynamic Price Pill (Expands if there is a discount) */}
        <div className="h-12 bg-white rounded-full px-4 flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2">
           {hasDiscount && (
             <span className="text-[13px] font-bold text-gray-400 line-through">
               ${originalPrice.toFixed(2)}
             </span>
           )}
           <span className={clsx("text-[17px] font-black tracking-tighter", hasDiscount ? "text-[#FF5964]" : "text-gray-900")}>
             ${currentPrice.toFixed(2)}
           </span>
        </div>
      </div>

      {/* 3. The Product Image */}
      <div className={clsx(
        "relative z-20 flex items-center justify-center shrink-0",
        isList ? "w-64 h-full p-6" : "w-full pt-20 pb-4 px-6"
      )}>
        <Link href={productUrl} prefetch={false} className="relative block w-48 h-48 bg-white rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.08)] p-4 overflow-hidden group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:-translate-y-2">
            <Image
                src={image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain p-4 transition-all duration-700 ease-in-out group-hover:opacity-0 group-hover:scale-90"
            />
            <Image
                src={image}
                alt={`${item.title} alternate view`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain p-4 opacity-0 scale-120 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-100"
            />
        </Link>
      </div>

      {/* 4. Content & Controls Area */}
      <div className={clsx(
        "relative z-20 flex flex-col flex-grow bg-transparent",
        isList ? "justify-center pr-8 py-6" : "px-5 pb-5 pt-2"
      )}>
        
        <div className="text-center mb-5">
            {item.attributes.themes?.[0] && (
                <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase mb-1.5 block">
                {item.attributes.themes[0]}
                </span>
            )}
            
            <Link href={productUrl} prefetch={false}>
                <h3 className="text-[18px] font-black text-gray-900 leading-tight hover:text-gray-600 transition-colors line-clamp-2">
                {item.title}
                </h3>
            </Link>
        </div>

        <div className="flex-grow" /> 

        {/* Form Controls */}
        <div className="flex flex-col gap-3">
          
          {/* Variant Selector (Full Width) */}
          {variants.length > 1 && (
            <div className="relative w-full">
              <select 
                className="w-full appearance-none bg-gray-50 text-[13px] font-bold text-gray-700 py-3 pl-5 pr-10 border-2 border-transparent rounded-full outline-none cursor-pointer hover:bg-gray-100 focus:border-gray-200 focus:bg-white transition-colors"
                value={selectedVariant ? selectedVariant.variantId : ""}
                onChange={(e) => setSelectedVariant(variants.find(v => v.variantId === e.target.value) || null)}
              >
                <option value="" disabled>Select Option</option>
                {variants.map(v => <option key={v.variantId} value={v.variantId}>{v.title}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <ChevronDown className="w-4 h-4 stroke-[3]" />
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart Row */}
          <div className="flex gap-2">
            
            {/* Quantity Selector */}
            <div className="flex items-center justify-between bg-gray-50 rounded-full px-2 w-[100px] shrink-0 border-2 border-transparent hover:border-gray-100 transition-colors">
              <button 
                onClick={(e) => { e.preventDefault(); handleQuantityChange('decrease'); }}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-full transition-colors active:scale-90"
              >
                <Minus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
              
              <span className="text-[14px] font-black text-gray-900 select-none">
                {quantity}
              </span>
              
              <button 
                onClick={(e) => { e.preventDefault(); handleQuantityChange('increase'); }}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-full transition-colors active:scale-90"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>

            {/* Action Button */}
            <button 
              onClick={handleAddToCart}
              disabled={!item.inventory.availableForSale || !selectedVariant || isAdding}
              className={clsx(
                "flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-full text-[13px] font-black uppercase tracking-wide transition-all duration-300 transform active:scale-[0.97]",
                (!item.inventory.availableForSale || !selectedVariant)
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5"
              )}
            >
              {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : (!item.inventory.availableForSale) ? 'Sold Out' : 'Add to Cart'} 
              {(!isAdding && item.inventory.availableForSale) && <ShoppingCart className="w-4 h-4" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}