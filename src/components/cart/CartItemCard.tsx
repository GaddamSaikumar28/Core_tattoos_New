

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/src/context/CartContext';
import { CartItem } from '@/src/lib/shopify'; // Adjust this import path if your index.ts is located elsewhere

interface CartItemCardProps {
  item: CartItem;
  compact?: boolean; // True for Drawer, False for Full Page
}

export function CartItemCard({ item, compact = false }: CartItemCardProps) {
  const { updateQuantity, removeLineItem } = useCart();

  // 1. Safely destructure the nested Shopify GraphQL data
  const { merchandise, cost, quantity, id: lineId } = item;
  const { product, title: variantTitle } = merchandise;
  
  // 2. Format Data Variables
  const imageUrl = product.featuredImage?.url || '/assets/images/placeholder.png';
  const productTitle = product.title;
  const productHandle = product.handle;
  
  // Shopify assigns "Default Title" to products without specific variants. We hide it for a cleaner UI.
  const displayVariantTitle = variantTitle !== "Default Title" ? variantTitle : null;
  
  const price = parseFloat(cost.totalAmount.amount).toFixed(2);
  const currency = cost.totalAmount.currencyCode === 'USD' ? '$' : cost.totalAmount.currencyCode + ' ';

  return (
    <div 
      className={`flex gap-4 group transition-all duration-300 ${
        compact 
          ? 'py-4 border-b border-gray-100 last:border-0' 
          : 'p-4 sm:p-5 bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.08)]'
      }`}
    >
      {/* --- Image Section --- */}
      <Link 
        href={`/collections/${productHandle}`} 
        className="relative shrink-0 overflow-hidden rounded-xl bg-gray-50 border border-gray-100 block"
      >
        <div className={`${compact ? 'w-20 h-24' : 'w-24 h-24 sm:w-32 sm:h-32'} relative`}>
          <Image
            src={imageUrl}
            alt={product.featuredImage?.altText || productTitle}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100px, 150px"
          />
        </div>
      </Link>

      {/* --- Content Section --- */}
      <div className="flex flex-col flex-grow justify-between py-0.5">
        
        {/* Top Row: Title & Price */}
        <div className="flex justify-between items-start gap-3">
          <div className="flex flex-col">
            <Link 
              href={`/tattoos/${productHandle}`} 
              className="font-bold text-gray-900 text-sm sm:text-base leading-tight hover:text-[var(--color-brand-orange,#fe8204)] transition-colors line-clamp-2"
            >
              {productTitle}
            </Link>
            {displayVariantTitle && (
              <span className="text-xs sm:text-sm text-gray-500 mt-1.5 font-medium bg-gray-50 inline-block px-2 py-0.5 rounded-md w-fit border border-gray-200">
                {displayVariantTitle}
              </span>
            )}
          </div>
          <p className="font-black text-gray-900 whitespace-nowrap text-sm sm:text-base tracking-tight">
            {currency}{price}
          </p>
        </div>

        {/* Bottom Row: Controls & Delete */}
        <div className="flex items-end sm:items-center justify-between mt-3 sm:mt-4">
          
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 p-0.5 shadow-sm">
            <button
              onClick={() => updateQuantity(lineId, quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white hover:shadow-sm rounded-md transition-all active:scale-95"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center text-sm font-bold text-gray-900 select-none">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(lineId, quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white hover:shadow-sm rounded-md transition-all active:scale-95"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeLineItem(lineId)}
            className="group/remove flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-95"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4 transition-transform group-hover/remove:scale-110" />
            {!compact && <span className="text-sm font-bold hidden sm:inline tracking-wide">Remove</span>}
          </button>
          
        </div>
      </div>
    </div>
  );
}