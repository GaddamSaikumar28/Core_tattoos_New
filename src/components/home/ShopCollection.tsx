
'use client';

import React from 'react';
import { ShoppingBag, ArrowRight, Plus, Star } from 'lucide-react';

// Product Data (Extended slightly for production-grade UI)
const products = [
  {
    id: 1,
    name: 'Majestic Eagle',
    price: '$14.99',
    image: '/assets/images/Card1.png',
    badge: 'Bestseller',
  },
  {
    id: 2,
    name: 'Minimal Unicorn',
    price: '$9.99',
    image: '/assets/images/Card2.png',
  },
  {
    id: 3,
    name: 'Botanical Leaves',
    price: '$11.99',
    image: '/assets/images/Card3.png',
    badge: 'New',
  },
  {
    id: 4,
    name: 'Abstract Runes',
    price: '$8.99',
    image: '/assets/images/Card4.png',
  },
  {
    id: 5,
    name: 'Geometric Falcon',
    price: '$16.99',
    image: '/assets/images/Card5.png',
  },
  {
    id: 6,
    name: 'Coiled Snake',
    price: '$18.99',
    image: '/assets/images/Card6.png',
  },
];

export default function ShopCollection() {
  return (
    <>
      {/* Inline styles to hide scrollbar but keep functionality */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <section className="min-h-screen py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]  overflow-hidden">
        
        {/* Mobile Header (Hidden on Desktop, handled by sidebar) */}
        <div className="lg:hidden mb-8 text-center">
          <span className="text-[#fe8204] font-semibold tracking-wider text-sm uppercase mb-2 block">Premium Ink</span>
          <h2 className="text-3xl font-bold text-gray-900">Our Collection</h2>
        </div>

        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* LEFT SIDE: Sticky Editorial Section (Desktop Only) */}
            <div className="hidden lg:flex lg:col-span-4 lg:sticky lg:top-10 flex-col justify-center h-[calc(100vh-80px)]">
              <div className="pr-8">
                <span className="text-[#fe8204] font-semibold tracking-wider text-sm uppercase mb-4 block">Premium Ink</span>
                <h2 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-[1.1]">
                  Flawless Ink, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fe8204] to-[#ffb167]">Zero Commitment.</span>
                </h2>
                <p className="text-gray-500 leading-relaxed mb-10 text-lg">
                  Express yourself instantly with our premium temporary tattoos. 
                  Simply peel, press, and reveal stunning, realistic designs that look just like the real thing.
                </p>

                {/* Editorial Image Feature */}
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-10 group">
                  <div className="absolute inset-0 bg-[#fe8204]/10 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
                  <img
                    src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80&w=800" 
                    alt="Applying temporary tattoo"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Floating Glass Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-lg z-20 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-900">Skin Safe</p>
                      <p className="text-xs text-gray-500">Dermatologist Tested</p>
                    </div>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#fe8204] shadow-sm">
                      <Star className="w-5 h-5 fill-current" />
                    </div>
                  </div>
                </div>

                <button className="w-full group bg-gray-900 hover:bg-[#fe8204] text-white py-4 px-8 rounded-full font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-gray-900/10 hover:shadow-[#fe8204]/25 active:scale-[0.98]">
                  <ShoppingBag className="w-5 h-5" />
                  Shop All Designs
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* RIGHT SIDE: Products Scroll/Grid */}
            <div className="lg:col-span-8 w-full">
              {/* Mobile: Horizontal CSS Scroll Snap (peeking next card)
                Desktop: Standard Masonry-style Grid 
              */}
              <div className="flex lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8 overflow-x-auto lg:overflow-visible snap-x snap-mandatory hide-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0 pb-8 lg:pb-0">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="w-[82vw] sm:w-[300px] lg:w-auto flex-shrink-0 snap-center group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(254,130,4,0.15)] hover:border-[#fe8204]/30 relative"
                  >
                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold tracking-wide text-gray-900 shadow-sm border border-gray-100">
                        {product.badge}
                      </div>
                    )}

                    {/* Image Container */}
                    <a href={`/product/${product.id}`} className="block relative aspect-[4/5] bg-[#f8f8f8] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Quick Add Overlay (Desktop) */}
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:flex items-center justify-center">
                        <button className="translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-gray-900 hover:text-[#fe8204] px-6 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2">
                          <Plus className="w-4 h-4" /> Quick Add
                        </button>
                      </div>
                    </a>
                    
                    {/* Product Info */}
                    <div className="p-6 flex flex-col flex-grow bg-white z-10">
                      <div className="flex justify-between items-start mb-2">
                        <a href={`/product/${product.id}`} className="block flex-1 pr-4">
                          <h3 className="text-gray-900 font-bold text-lg leading-tight hover:text-[#fe8204] transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </a>
                        <span className="text-[#fe8204] font-bold text-lg bg-[#fe8204]/10 px-3 py-1 rounded-xl">
                          {product.price}
                        </span>
                      </div>
                      
                      {/* Mobile Buy Button */}
                      <button className="mt-4 lg:hidden w-full bg-gray-50 hover:bg-[#fe8204] text-gray-900 hover:text-white border border-gray-200 hover:border-[#fe8204] py-3 rounded-xl font-semibold transition-colors flex justify-center items-center gap-2 active:scale-[0.98]">
                        <ShoppingBag className="w-4 h-4" /> Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}