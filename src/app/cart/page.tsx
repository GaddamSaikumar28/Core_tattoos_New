'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, ShieldCheck, Truck, Loader2, Lock } from 'lucide-react';
import { useCart } from '@/src/context/CartContext';
import { CartItemCard } from '@/src/components/cart/CartItemCard'; // Adjust path if needed

export default function CartPage() {
  const { cart, cartCount, isCartLoading } = useCart();

  // Safely extract cart data from the Shopify structure
  const cartItems = cart?.lines || [];
  const subtotal = cart?.cost?.subtotalAmount?.amount ? parseFloat(cart.cost.subtotalAmount.amount).toFixed(2) : '0.00';
  const total = cart?.cost?.totalAmount?.amount ? parseFloat(cart.cost.totalAmount.amount).toFixed(2) : '0.00';
  const currencyCode = cart?.cost?.subtotalAmount?.currencyCode || 'USD';
  const currencySymbol = currencyCode === 'USD' ? '$' : `${currencyCode} `;
  
  // Shopify generates a secure checkout URL for each cart
  const checkoutUrl = cart?.checkoutUrl || '#';

  // --- Loading State ---
  if (isCartLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center max-w-7xl mx-auto px-4">
        <Loader2 className="w-12 h-12 text-[#fe8204] animate-spin mb-4" />
        <p className="text-gray-500 font-medium animate-pulse">Loading your cart...</p>
      </div>
    );
  }

  // --- Empty Cart State ---
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-gray-100">
          <ShoppingBag className="w-10 h-10 text-gray-300" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8 max-w-md text-center text-lg">
          Looks like you haven't added any items yet. Browse our collections and find your perfect piece.
        </p>
        <Link 
          href="/tattoos" 
          className="bg-[#fe8204] hover:bg-gray-900 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-[#fe8204]/25 hover:shadow-xl hover:-translate-y-0.5"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  // --- Populated Cart State ---
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 mt-9 animate-in fade-in duration-500">
      
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-8 sm:mb-10">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">CART</h1>
        <span className="bg-gray-100 text-gray-600 font-bold px-3 py-1 rounded-full text-sm border border-gray-200 shadow-sm">
          {cartCount} {cartCount === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 relative">
        
        {/* Left Side: Cart Items List */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4 sm:gap-5">
          {cartItems.map((item) => (
            <CartItemCard 
              key={item.id} // item.id is the Shopify line item ID, perfectly unique
              item={item} 
              compact={false} 
            />
          ))}
        </div>

        {/* Right Side: Sticky Order Summary */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="bg-gray-50/50 rounded-3xl p-6 sm:p-8 lg:sticky lg:top-28 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h2 className="text-xl font-black text-gray-900 mb-6 border-b border-gray-200 pb-4 tracking-tight">
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-6 text-base">
              <div className="flex justify-between text-gray-600">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold text-gray-900">{currencySymbol}{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-medium">Shipping</span>
                <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-md">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-medium">Estimated Tax</span>
                <span className="font-bold text-gray-900">Included</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-5 mb-8 flex justify-between items-end">
              <span className="text-lg font-black text-gray-900">Total</span>
              <span className="text-3xl font-black text-[#fe8204] tracking-tight">
                {currencySymbol}{total}
              </span>
            </div>

            {/* Note: We use a standard <a> tag here because checkoutUrl redirects to Shopify's external domain */}
            <a 
              href={checkoutUrl}
              className="w-full bg-[#fe8204] hover:bg-gray-900 text-white py-4 sm:py-5 rounded-2xl font-black flex items-center justify-center gap-2.5 shadow-xl shadow-[#fe8204]/25 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98] mb-4 text-lg"
            >
              <Lock className="w-5 h-5" />
              Secure Checkout
            </a>
            
            <Link 
              href="/tattoos"
              className="w-full flex items-center justify-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors py-3 rounded-xl hover:bg-gray-100/50"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>

            {/* Trust Badges */}
            <div className="mt-8 pt-6 border-t border-gray-200/60 space-y-4">
              <div className="flex items-center gap-3.5 text-sm font-medium text-gray-600 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <div className="bg-green-50 p-2 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <span>Secure Checkout by Shopify</span>
              </div>
              <div className="flex items-center gap-3.5 text-sm font-medium text-gray-600 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <span>Fast & Reliable Shipping</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}