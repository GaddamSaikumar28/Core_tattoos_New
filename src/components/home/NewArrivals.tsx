// "use client";

// import React from 'react';
// import Image from 'next/image';
// import { motion, Variants } from 'framer-motion';

// // --- Product Data ---
// const products = [
//   {
//     id: 1,
//     name: "Dragon Coil Sleeve",
//     image: '/assets/images/Card1.png',
//     oldPrice: 34.99,
//     newPrice: 24.99,
//   },
//   {
//     id: 2,
//     name: "Minimalist Botanica",
//     image: '/assets/images/Card2.png',
//     oldPrice: 19.99,
//     newPrice: 14.99,
//   },
//   {
//     id: 3,
//     name: "Geometric Wolf",
//     image: '/assets/images/Card3.png',
//     oldPrice: 29.99,
//     newPrice: 21.99,
//   },
//   {
//     id: 4,
//     name: "Cyberpunk Circuit",
//     image: '/assets/images/Card4.png',
//     oldPrice: 24.99,
//     newPrice: 18.99,
//   },
//   {
//     id: 5,
//     name: "Celestial Map",
//     image: '/assets/images/Card5.png',
//     oldPrice: 22.99,
//     newPrice: 16.99,
//   },
// ];

// // Reusable animation configuration for the items
// const itemAnimation: Variants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: (customDelay) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for a smooth, premium feel
//       delay: customDelay,
//     },
//   }),
// };

// export default function TattooGallery() {
//   return (
//     <section className="bg-black text-white py-20 px-4 md:px-8 w-full overflow-hidden font-sans">
//       <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_auto_1.5fr] gap-8 lg:gap-12 items-start">
        
//         {/* Column 1 */}
//         <div className="flex flex-col gap-6">
//           <motion.h2 
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.6 }}
//             className="text-3xl lg:text-4xl text-[var(--color-brand-orange)] font-bold uppercase leading-tight tracking-wider mb-2"
//           >
//             NEW<br />Arrivals
//           </motion.h2>
          
//           <motion.div 
//             variants={itemAnimation}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-50px" }}
//             custom={0.1}
//             className="w-full flex flex-col gap-4"
//           >
//             <div className="overflow-hidden w-full relative group">
//               <img
//                 src={products[0].image}
//                 alt={products[0].name}
//                 className="w-full h-auto object-cover aspect-[4/5] transform transition-transform duration-700 ease-in-out group-hover:scale-105"
//               />
//             </div>
//             <div className="flex flex-col gap-2">
//               <h3 className="text-sm md:text-base font-semibold tracking-wider uppercase">{products[0].name}</h3>
//               <div className="flex items-center gap-3">
//                 <span className="text-[var(--color-brand-orange)] font-bold">${products[0].newPrice}</span>
//                 <span className="text-gray-500 line-through text-xs">${products[0].oldPrice}</span>
//               </div>
//               <button className="w-full bg-transparent border border-[var(--color-brand-orange)] text-[var(--color-brand-orange)] px-4 py-3 text-xs font-semibold tracking-widest hover:bg-[var(--color-brand-orange)] hover:text-black transition-all duration-300 uppercase mt-1">
//                 Buy Now
//               </button>
//             </div>
//           </motion.div>
          
//           <p className="text-xs text-gray-400 max-w-[250px] leading-relaxed mt-2">
//            Get the look without the commitment. Our ultra-realistic, peel-and-wear tattoos let you switch up your aesthetic instantly.
//           </p>
//           <button className="border-b border-[var(--color-brand-orange)] text-[var(--color-brand-orange)] pb-1 text-xs font-semibold tracking-widest hover:text-white hover:border-white transition-all duration-300 self-start mt-2 uppercase">
//             VIEW COLLECTION
//           </button>
//         </div>

//         {/* Column 2 */}
//         <div className="flex flex-col gap-10 lg:pt-24">
//           <motion.div 
//             variants={itemAnimation}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-50px" }}
//             custom={0.2}
//             className="w-full flex flex-col gap-4"
//           >
//             <div className="overflow-hidden w-full relative group">
//               <img
//                 src={products[1].image}
//                 alt={products[1].name}
//                 className="w-full h-auto object-cover aspect-square transform transition-transform duration-700 ease-in-out group-hover:scale-105"
//               />
//             </div>
//             <div className="flex flex-col gap-2">
//               <h3 className="text-sm font-semibold tracking-wider uppercase">{products[1].name}</h3>
//               <div className="flex items-center gap-3">
//                 <span className="text-[var(--color-brand-orange)] font-bold">${products[1].newPrice}</span>
//                 <span className="text-gray-500 line-through text-xs">${products[1].oldPrice}</span>
//               </div>
//               <button className="w-full bg-transparent border border-[var(--color-brand-orange)] text-[var(--color-brand-orange)] px-4 py-2.5 text-xs font-semibold tracking-widest hover:bg-[var(--color-brand-orange)] hover:text-black transition-all duration-300 uppercase mt-1">
//                 Buy Now
//               </button>
//             </div>
//           </motion.div>

//           <motion.div 
//             variants={itemAnimation}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-50px" }}
//             custom={0.3}
//             className="w-full flex flex-col gap-4"
//           >
//             <div className="overflow-hidden w-full relative group">
//               <img
//                 src={products[2].image}
//                 alt={products[2].name}
//                 className="w-full h-auto object-cover aspect-[4/5] transform transition-transform duration-700 ease-in-out group-hover:scale-105"
//               />
//             </div>
//             <div className="flex flex-col gap-2">
//               <h3 className="text-sm font-semibold tracking-wider uppercase">{products[2].name}</h3>
//               <div className="flex items-center gap-3">
//                 <span className="text-[var(--color-brand-orange)] font-bold">${products[2].newPrice}</span>
//                 <span className="text-gray-500 line-through text-xs">${products[2].oldPrice}</span>
//               </div>
//               <button className="w-full bg-transparent border border-[var(--color-brand-orange)] text-[var(--color-brand-orange)] px-4 py-2.5 text-xs font-semibold tracking-widest hover:bg-[var(--color-brand-orange)] hover:text-black transition-all duration-300 uppercase mt-1">
//                 Buy Now
//               </button>
//             </div>
//           </motion.div>
//         </div>

//         {/* Column 3 */}
//         <div className="flex flex-col gap-6 lg:pt-12">
//           <motion.div 
//             variants={itemAnimation}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-50px" }}
//             custom={0.4}
//             className="w-full flex flex-col gap-4"
//           >
//             <div className="overflow-hidden w-full relative group">
//               <img
//                 src={products[3].image}
//                 alt={products[3].name}
//                 className="w-full h-auto object-cover aspect-[3/4] transform transition-transform duration-700 ease-in-out group-hover:scale-105"
//               />
//             </div>
//             <div className="flex flex-col gap-2">
//               <h3 className="text-sm font-semibold tracking-wider uppercase">{products[3].name}</h3>
//               <div className="flex items-center gap-3">
//                 <span className="text-[var(--color-brand-orange)] font-bold">${products[3].newPrice}</span>
//                 <span className="text-gray-500 line-through text-xs">${products[3].oldPrice}</span>
//               </div>
//               <button className="w-full bg-[var(--color-brand-orange)] text-black px-4 py-3 text-xs font-bold tracking-widest hover:bg-white transition-all duration-300 uppercase mt-1">
//                 Buy Now
//               </button>
//             </div>
//           </motion.div>
//           <p className="text-xs text-gray-400 max-w-[200px] leading-relaxed mt-2">
//            Zero needles, zero regrets. Discover stunning, lifelike temporary body art that applies in seconds and lasts for days.
//           </p>
//         </div>

//         {/* Column 4: Vertical Logo */}
//         <div className="hidden lg:flex justify-center items-center h-full select-none w-[80px] lg:w-[120px] relative">
//           <motion.div 
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 1, delay: 0.6 }}
//             className="transform -rotate-90 origin-center w-[400px] lg:w-[500px] flex justify-center items-center absolute"
//           >
//             <Image 
//               src="/assets/icons/Fotterlogo2.svg" 
//               alt="Just Tattoos Logo"
//               width={500} 
//               height={100} 
//               className="w-full h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-500"
//               priority 
//             />
//           </motion.div>
//         </div>

//         {/* Column 5 */}
//         <div className="flex flex-col gap-6 lg:pt-24">
//           <div className="flex flex-col items-start gap-6">
//             <p className="text-xs text-gray-400 uppercase max-w-[250px] leading-relaxed">
//               Switch out your ink as often as you switch your outfits.
//             </p>
//           </div>
//           <motion.div 
//             variants={itemAnimation}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-50px" }}
//             custom={0.5}
//             className="w-full flex flex-col gap-4 mt-4"
//           >
//             <div className="overflow-hidden w-full relative group">
//               <img
//                 src={products[4].image}
//                 alt={products[4].name}
//                 className="w-full h-auto object-cover aspect-[3/4] transform transition-transform duration-700 ease-in-out group-hover:scale-105"
//               />
//             </div>
//             <div className="flex flex-col gap-2">
//               <h3 className="text-sm font-semibold tracking-wider uppercase">{products[4].name}</h3>
//               <div className="flex items-center gap-3">
//                 <span className="text-[var(--color-brand-orange)] font-bold">${products[4].newPrice}</span>
//                 <span className="text-gray-500 line-through text-xs">${products[4].oldPrice}</span>
//               </div>
//               <button className="w-full bg-[var(--color-brand-orange)] text-black px-4 py-3 text-xs font-bold tracking-widest hover:bg-white transition-all duration-300 uppercase mt-1">
//                 Buy Now
//               </button>
//             </div>
//           </motion.div>
//         </div>

//       </div>
//     </section>
//   );
// }

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