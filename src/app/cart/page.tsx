'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/src/context/CartContext';
import { CartItemCard } from '@/src/components/cart/CartItemCard';

export default function CartPage() {
  const { cart, cartTotal, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-300" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8 max-w-md text-center">
          You haven't added any items to your cart yet. Browse our collections and find your perfect tattoo.
        </p>
        <Link 
          href="/tattoos" 
          className="bg-[#fe8204] hover:bg-[#e07300] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-[#fe8204]/20"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="flex items-center  mt-10 gap-3 mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight">Your Cart</h1>
        <span className="bg-gray-100 text-gray-600 font-bold px-3 py-1 rounded-full text-sm">
          {cartCount} {cartCount === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Left Side: Cart Items */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {cart.map((item) => (
            <CartItemCard key={`${item.productId}-${item.variantId}`} item={item} compact={false} />
          ))}
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 sticky top-24 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span className="font-semibold text-gray-900">$0.00</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-8 flex justify-between items-center">
              <span className="text-base font-bold text-gray-900">Total</span>
              <span className="text-2xl font-black text-gray-900">${cartTotal.toFixed(2)}</span>
            </div>

            <Link 
              href="/checkout"
              className="w-full bg-[#fe8204] hover:bg-[#e07300] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#fe8204]/20 transition-all active:scale-[0.98] mb-4 text-lg"
            >
              Checkout Now
            </Link>
            
            <Link 
              href="/collections"
              className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors py-2"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>

            {/* Trust Badges */}
            <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <span>Secure Checkout powered by Shopify</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck className="w-5 h-5 text-blue-500" />
                <span>Free shipping on orders over $50</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}