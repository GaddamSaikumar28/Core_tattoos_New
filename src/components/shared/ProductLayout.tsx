'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ShoppingBag } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
import { toast } from 'sonner';
import { useCart } from '@/src/context/CartContext';
import { Loader2 } from 'lucide-react';
// --- Types ---
interface Combination {
  id: string;
  price: number | string;
  image: string;
  size: string;
}

interface ProductItem {
  id: string;
  originalId?: string;
  name: string;
  variantName?: string;
  style: string;
  price: number | string;
  image: string;
  badge?: string;
  productColor?: string;
  isExploded?: boolean;
  preSelectedCombo?: Combination;
  combinations?: Combination[];
  handle?: string;
  slug?: string;
}

interface ProductCardProps {
  item: ProductItem;
  viewMode: 'grid' | 'list';
  page: string; 
}

// --- Component ---
export function ProductCard({ item, viewMode, page }: ProductCardProps) {
  const isList = viewMode === 'list';
  const isExploded = item.isExploded;
  const combinations = item.combinations || [];
   
  const [selectedCombo, setSelectedCombo] = useState<Combination | null>(
    isExploded && item.preSelectedCombo ? item.preSelectedCombo : null
  );

  const [isAdding, setIsAdding] = useState(false); // <-- ADDED loading state
  const { addToCart } = useCart(); // <-- ADDED cart hook

  const price = selectedCombo ? selectedCombo.price : item.price;
  const image = selectedCombo ? selectedCombo.image : item.image;
  const parentId = isExploded ? item.originalId : item.id;
  
  // Ensure the slug is URL-safe just in case it's generated on the fly
  const rawSlug = item.slug || `${item.handle}-${parentId}`;
  const slug = encodeURIComponent(rawSlug.toLowerCase().replace(/\s+/g, '-'));
  
  // The universal base path based on your folder structure
  const productUrl = `/${page}/${slug}`;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    const comboToAdd = isExploded ? item.preSelectedCombo : (selectedCombo || item.combinations?.[0]);
    
    if (!comboToAdd?.id) {
        toast.error('Please select a size first.');
        return;
    }

    setIsAdding(true);
    try {
      await addToCart({
        variantId: comboToAdd.id,
        productId: parentId || item.id,
        name: isExploded ? (item.name || '') : item.name,
        variantName: comboToAdd.size,
        price: Number(comboToAdd.price),
        image: comboToAdd.image,
        quantity: 1
      });
    } catch (error) {
      toast.error('Failed to add to cart. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

//   const handleAddToCart = async (e: React.MouseEvent) => {
//     e.preventDefault(); 
//     const comboToAdd = isExploded ? item.preSelectedCombo : (selectedCombo || item.combinations?.[0]);
//     if (!comboToAdd?.id) return;
    
//     console.log(`Adding Variant ${comboToAdd.id} to cart`);
//     // Example: await addToCart(comboToAdd.id, 1);
//   };

  return (
    <div className={clsx(
      "group relative bg-white border border-gray-100/80 shadow-sm rounded-2xl overflow-hidden transition-all duration-300 ease-in-out",
      "hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:border-gray-200",
      isList ? "flex flex-col sm:flex-row" : "flex flex-col"
    )}>
      
      {/* --- IMAGE AREA --- */}
      <div className={clsx(
        "relative overflow-hidden bg-gray-50/50",
        isList ? "w-full sm:w-48 sm:min-w-[12rem] h-56 sm:h-auto shrink-0" : "w-full aspect-[4/5]"
      )}>
        {item.badge && (
          <div className="absolute top-3 left-3 z-20">
            <span className="bg-[#fe8204] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow-sm tracking-wider">
              {item.badge}
            </span>
          </div>
        )}

        {/* Fix 1: Updated URL and added prefetch={false} for performance */}
        <Link href={productUrl} prefetch={false} className="block w-full h-full relative">
            <Image
                src={image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </Link>
      </div>

      {/* --- INFO AREA --- */}
      <div className={clsx(
        "flex flex-col flex-grow p-5 sm:p-6",
        isList ? "justify-center" : ""
      )}>
        
        <span className="text-xs font-semibold text-[#fe8204] tracking-wider uppercase mb-1.5">
          {item.style}
        </span>
        
        {/* Fix 2: Added prefetch={false} here as well */}
        <Link href={productUrl} prefetch={false} className="block mb-1">
            <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-[#fe8204] transition-colors line-clamp-2">
              {isExploded ? item.variantName : item.name}
            </h3>
        </Link>
        
        {isExploded && (
          <p className="text-sm font-medium text-gray-500 mb-3 line-clamp-1">{item.name}</p>
        )}

        <div className="flex-grow" /> 

        <div className={clsx(
          "flex flex-col gap-4 mt-4 mb-5",
          isList ? "sm:flex-row sm:items-center sm:justify-between" : ""
        )}>
          <p className="text-2xl font-extrabold text-gray-900">
            ${Number(price).toFixed(2)}
          </p>
          
          {!isExploded && combinations.length > 0 && (
            <div className="relative w-full sm:max-w-[140px]">
              <select 
                className="w-full appearance-none bg-gray-50/80 text-sm font-semibold text-gray-700 py-2.5 pl-4 pr-10 border border-gray-200 rounded-xl outline-none cursor-pointer hover:bg-white hover:border-gray-300 focus:ring-2 focus:ring-[#fe8204]/20 focus:border-[#fe8204] transition-all"
                value={selectedCombo ? selectedCombo.id : ""}
                onChange={(e) => setSelectedCombo(combinations.find(c => c.id === e.target.value) || null)}
              >
                <option value="" disabled>Size</option>
                {combinations.map(c => <option key={c.id} value={c.id}>{c.size}</option>)}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* <button 
            onClick={handleAddToCart}
            disabled={!isExploded && combinations.length > 0 && !selectedCombo}
            className={clsx(
              "flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-sm font-bold transition-all duration-300",
              (!isExploded && combinations.length > 0 && !selectedCombo)
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-[#fe8204] hover:bg-[#e07300] text-white shadow-md shadow-[#fe8204]/20 hover:shadow-[#fe8204]/40"
            )}
          >
            {(!isExploded && !selectedCombo) ? 'Select Size' : 'Add to Cart'} 
            {(!isExploded && !selectedCombo) ? null : <ShoppingBag className="w-4 h-4" />}
          </button> */}
          <button 
            onClick={handleAddToCart}
            disabled={(!isExploded && combinations.length > 0 && !selectedCombo) || isAdding}
            className={clsx(
              "flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-sm font-bold transition-all duration-300",
              (!isExploded && combinations.length > 0 && !selectedCombo)
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-[#fe8204] hover:bg-[#e07300] text-white shadow-md shadow-[#fe8204]/20 hover:shadow-[#fe8204]/40 disabled:opacity-70"
            )}
          >
            {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : (!isExploded && !selectedCombo) ? 'Select Size' : 'Add to Cart'} 
            {(!isAdding && (isExploded || selectedCombo)) && <ShoppingBag className="w-4 h-4" />}
          </button>
          
          {/* Fix 3: Standardized URL to match folder structure and added prefetch={false} */}
          <Link 
            href={productUrl} 
            prefetch={false}
            className="flex items-center justify-center py-3 px-2 rounded-xl bg-transparent text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-[#fe8204] hover:border-[#fe8204]/30 font-semibold text-sm transition-all duration-300"
            aria-label="View Product Details"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}