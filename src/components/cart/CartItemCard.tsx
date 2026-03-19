'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart, CartItem } from '@/src/context/CartContext';

interface CartItemCardProps {
  item: CartItem;
  compact?: boolean; // True for Drawer, False for Full Page
}

export function CartItemCard({ item, compact = false }: CartItemCardProps) {
  const { updateQuantity, removeFromCart } = useCart();

  // Create a safe slug for linking back to the product
  const slug = encodeURIComponent(item.name.toLowerCase().replace(/\s+/g, '-'));

  return (
    <div className={`flex gap-4 py-4 ${compact ? 'border-b border-gray-100 last:border-0' : 'p-4 bg-white rounded-2xl border border-gray-100 shadow-sm'}`}>
      {/* Image */}
      <Link href={`/tattoos/${slug}`} className="relative shrink-0 overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
        <div className={`${compact ? 'w-20 h-20' : 'w-24 h-24 sm:w-32 sm:h-32'} relative`}>
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100px, 150px"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-grow justify-between">
        <div className="flex justify-between items-start gap-2">
          <div>
            <Link href={`/tattoos/${slug}`} className="font-bold text-gray-900 hover:text-[#fe8204] transition-colors line-clamp-2">
              {item.name}
            </Link>
            <p className="text-sm text-gray-500 mt-0.5">Size: {item.variantName}</p>
          </div>
          <p className="font-bold text-gray-900 whitespace-nowrap">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3">
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
            <button
              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-l-lg transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-semibold text-gray-900 select-none">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-r-lg transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeFromCart(item.variantId)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
            {!compact && <span className="text-sm font-medium hidden sm:inline">Remove</span>}
          </button>
        </div>
      </div>
    </div>
  );
}