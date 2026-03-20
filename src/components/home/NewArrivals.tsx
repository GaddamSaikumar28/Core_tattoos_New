
"use client";

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

// --- Product Data ---
// Limited to 4 products to fit the exact requirement.
const products = [
  {
    id: 1,
    name: "Dragon Coil Sleeve",
    image: '/assets/images/Card1.png',
    oldPrice: 34.99,
    newPrice: 24.99,
    tag: "Bestseller"
  },
  {
    id: 2,
    name: "Minimalist Botanica",
    image: '/assets/images/Card2.png',
    oldPrice: 19.99,
    newPrice: 14.99,
    tag: "Trending"
  },
  {
    id: 3,
    name: "Geometric Wolf",
    image: '/assets/images/Card3.png',
    oldPrice: 29.99,
    newPrice: 21.99,
    tag: "New"
  },
  {
    id: 4,
    name: "Cyberpunk Circuit",
    image: '/assets/images/Card4.png',
    oldPrice: 24.99,
    newPrice: 18.99,
    tag: "Limited"
  },
];

// Reusable alternating slide animation
const slideVariants: Variants = {
  hidden: (direction: 'left' | 'right') => ({
    opacity: 0,
    x: direction === 'left' ? -80 : 80,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 20,
      duration: 0.8,
    },
  },
};

export default function TattooGallery() {
  return (
    <section className="bg-black text-white py-24 px-6 md:px-12 lg:px-24 w-full overflow-hidden font-sans selection:bg-[var(--color-brand-orange)] selection:text-black">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/10 pb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4 max-w-xl"
          >
            <h2 className="text-4xl md:text-5xl lg:text-7xl text-[var(--color-brand-orange)] font-black uppercase tracking-tighter leading-none">
              New<br />Arrivals
            </h2>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
              Get the look without the commitment. Discover stunning, lifelike temporary body art that applies in seconds and lasts for days.
            </p>
          </motion.div>

          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group flex items-center gap-3 text-[var(--color-brand-orange)] uppercase tracking-widest text-xs font-bold hover:text-white transition-colors duration-300"
          >
            View Full Collection
            <span className="bg-[var(--color-brand-orange)] text-black w-8 h-8 rounded-full flex justify-center items-center group-hover:bg-white group-hover:translate-x-2 transition-all duration-300">
              →
            </span>
          </motion.button>
        </div>

        {/* Product Grid / Vertical Stack on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8">
          {products.map((product, index) => {
            // Determine animation direction: Evens from left, Odds from right
            const direction = index % 2 === 0 ? 'left' : 'right';

            return (
              <motion.div
                key={product.id}
                custom={direction}
                variants={slideVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="group flex flex-col gap-6"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-white/5 rounded-sm">
                  {/* Tag Overlay */}
                  <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest px-3 py-1.5 border border-white/10">
                    {product.tag}
                  </div>
                  
                  {/* Note: Using next/image requires the domain to be configured if using external URLs.
                      Assuming local assets in /public folder here based on your path. */}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:opacity-80"
                  />
                  
                  {/* Quick Add Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                     <span className="text-white border border-white px-6 py-3 uppercase text-xs tracking-widest font-semibold backdrop-blur-md pointer-events-auto hover:bg-white hover:text-black transition-colors cursor-pointer">
                        Quick Add
                     </span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-sm md:text-base font-medium tracking-wide uppercase leading-snug">
                      {product.name}
                    </h3>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-[var(--color-brand-orange)] font-bold text-sm">
                        ${product.newPrice}
                      </span>
                      <span className="text-gray-600 line-through text-xs">
                        ${product.oldPrice}
                      </span>
                    </div>
                  </div>

                  {/* Desktop explicit button (optional, as quick add handles hover) */}
                  <button className="w-full bg-transparent border border-white/20 text-white px-4 py-3 text-xs font-semibold tracking-widest hover:border-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange)] hover:text-black transition-all duration-300 uppercase mt-2 lg:hidden">
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}