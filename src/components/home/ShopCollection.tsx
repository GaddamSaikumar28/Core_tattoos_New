// // // // 'use client';

// // // // import React from 'react';
// // // // import { motion,Variants } from 'framer-motion';
// // // // import { ShoppingBag, ArrowRight } from 'lucide-react';

// // // // // Dummy data based on the wireframe layout
// // // // const products = [
// // // //   {
// // // //     id: 1,
// // // //     name: 'Majestic Eagle',
// // // //     price: '$14.99',
// // // //     image: '/assets/images/Card1.png',
// // // //     className: 'col-span-1 row-span-2', // Tall
// // // //   },
// // // //   {
// // // //     id: 2,
// // // //     name: 'Minimal Unicorn',
// // // //     price: '$9.99',
// // // //     image: '/assets/images/Card2.png',
// // // //     className: 'col-span-1 row-span-1', // Square
// // // //   },
// // // //   {
// // // //     id: 3,
// // // //     name: 'Botanical Leaves',
// // // //     price: '$11.99',
// // // //     image: '/assets/images/Card3.png',
// // // //     className: 'col-span-1 row-span-1', // Square
// // // //   },
// // // //   {
// // // //     id: 4,
// // // //     name: 'Abstract Runes',
// // // //     price: '$8.99',
// // // //     image: '/assets/images/Card4.png',
// // // //     className: 'col-span-1 row-span-1', // Square
// // // //   },
// // // //   {
// // // //     id: 5,
// // // //     name: 'Geometric Falcon',
// // // //     price: '$16.99',
// // // //     image: '/assets/images/Card5.png',
// // // //     className: 'col-span-1 row-span-2', // Tall
// // // //   },
// // // //   {
// // // //     id: 6,
// // // //     name: 'Coiled Snake',
// // // //     price: '$18.99',
// // // //     image: '/assets/images/Card6.png',
// // // //     className: 'col-span-1 row-span-2', // Tall
// // // //   },
// // // // ];

// // // // // Framer Motion animation variants
// // // // const containerVariants:Variants = {
// // // //   hidden: { opacity: 0 },
// // // //   visible: {
// // // //     opacity: 1,
// // // //     transition: { staggerChildren: 0.15 },
// // // //   },
// // // // };

// // // // const itemVariants:Variants = {
// // // //   hidden: { opacity: 0, y: 20 },
// // // //   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
// // // // };

// // // // export default function ShopCollection() {
// // // //   return (
// // // //     // Subtle gradient background: White fading to a 5% opacity of the brand orange
// // // //     <section className="min-h-screen py-16 px-4 md:px-8 bg-gradient-to-br from-white via-white to-[#fe8204]/5 ">
// // // //       <div>
// // // //         Our Collection
// // // //       </div>
      
// // // //       <div className="max-w-7xl mx-auto">
        
// // // //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
// // // //           {/* LEFT SIDE: Products Grid */}
// // // //           <motion.div 
// // // //             className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[240px]"
// // // //             variants={containerVariants}
// // // //             initial="hidden"
// // // //             whileInView="visible"
// // // //             viewport={{ once: true, margin: "-100px" }}
// // // //           >
// // // //             {products.map((product) => (
// // // //               <motion.a
// // // //                 key={product.id}
// // // //                 href={`/product/${product.id}`}
// // // //                 variants={itemVariants}
// // // //                 className={`relative group block rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 ${product.className}`}
// // // //               >
// // // //                 {/* Product Image */}
// // // //                 <img
// // // //                   src={product.image}
// // // //                   alt={product.name}
// // // //                   className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
// // // //                 />
                
// // // //                 {/* Hover Overlay & Price Tag */}
// // // //                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
// // // //                   <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
// // // //                     <h3 className="text-white font-semibold text-lg drop-shadow-md">{product.name}</h3>
// // // //                     <p className="text-[#fe8204] font-bold text-xl drop-shadow-md bg-white/10 w-fit px-2 py-1 rounded-md backdrop-blur-sm mt-1">
// // // //                       {product.price}
// // // //                     </p>
// // // //                   </div>
// // // //                 </div>
// // // //               </motion.a>
// // // //             ))}
// // // //           </motion.div>

// // // //           {/* RIGHT SIDE: Featured Collection Details */}
// // // //           <motion.div 
// // // //             className="lg:col-span-4 lg:sticky lg:top-24"
// // // //             initial={{ opacity: 0, x: 20 }}
// // // //             whileInView={{ opacity: 1, x: 0 }}
// // // //             transition={{ duration: 0.8, delay: 0.2 }}
// // // //             viewport={{ once: true }}
// // // //           >
// // // //             <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex flex-col items-center text-center">
              
// // // //               {/* Featured Image inside stylized circle */}
// // // //               <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-[0_0_20px_rgba(254,130,4,0.15)] mb-8 group">
// // // //                 {/* Ring matching brand color */}
// // // //                 <div className="absolute inset-0 border-2 border-[#fe8204]/30 rounded-full z-10 pointer-events-none transition-all group-hover:border-[#fe8204]/60"></div>
// // // //                 <img
// // // //                   src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80&w=800" 
// // // //                   alt="Applying temporary tattoo"
// // // //                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
// // // //                 />
// // // //               </div>

// // // //               {/* Text Content */}
// // // //               <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
// // // //                 Flawless Ink, <br /> Zero Commitment.
// // // //               </h2>
// // // //               <p className="text-gray-500 leading-relaxed mb-8">
// // // //                 Express yourself instantly with our premium temporary tattoos. 
// // // //                 Simply peel, press, and reveal stunning, realistic designs that look just like the real thing. 
// // // //                 Safe, painless, and ready when you are.
// // // //               </p>

// // // //               {/* Primary Call to Action */}
// // // //               <motion.button 
// // // //                 whileHover={{ scale: 1.02 }}
// // // //                 whileTap={{ scale: 0.98 }}
// // // //                 className="w-full group bg-[#fe8204] hover:bg-[#e07202] text-white py-4 px-8 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-colors shadow-lg shadow-[#fe8204]/25"
// // // //               >
// // // //                 <ShoppingBag className="w-5 h-5" />
// // // //                 Shop Collection
// // // //                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
// // // //               </motion.button>
// // // //             </div>
// // // //           </motion.div>

// // // //         </div>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // }

// // // 'use client';

// // // import React from 'react';
// // // import { motion, Variants } from 'framer-motion';
// // // import { ShoppingBag, ArrowRight } from 'lucide-react';

// // // // Updated data: Removed hardcoded layout classes so the grid handles placement automatically
// // // const products = [
// // //   {
// // //     id: 1,
// // //     name: 'Majestic Eagle',
// // //     price: '$14.99',
// // //     image: '/assets/images/Card1.png',
// // //   },
// // //   {
// // //     id: 2,
// // //     name: 'Minimal Unicorn',
// // //     price: '$9.99',
// // //     image: '/assets/images/Card2.png',
// // //   },
// // //   {
// // //     id: 3,
// // //     name: 'Botanical Leaves',
// // //     price: '$11.99',
// // //     image: '/assets/images/Card3.png',
// // //   },
// // //   {
// // //     id: 4,
// // //     name: 'Abstract Runes',
// // //     price: '$8.99',
// // //     image: '/assets/images/Card4.png',
// // //   },
// // //   {
// // //     id: 5,
// // //     name: 'Geometric Falcon',
// // //     price: '$16.99',
// // //     image: '/assets/images/Card5.png',
// // //   },
// // //   {
// // //     id: 6,
// // //     name: 'Coiled Snake',
// // //     price: '$18.99',
// // //     image: '/assets/images/Card6.png',
// // //   },
// // // ];

// // // // Framer Motion animation variants
// // // const containerVariants: Variants = {
// // //   hidden: { opacity: 0 },
// // //   visible: {
// // //     opacity: 1,
// // //     transition: { staggerChildren: 0.15 },
// // //   },
// // // };

// // // const itemVariants: Variants = {
// // //   hidden: { opacity: 0, y: 20 },
// // //   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
// // // };

// // // export default function ShopCollection() {
// // //   return (
// // //     // Subtle gradient background: White fading to a 5% opacity of the brand orange
// // //     <section className="min-h-screen py-16 px-4 md:px-8 bg-gradient-to-br from-white via-white to-[#fe8204]/5 ">
// // //       <div className="text-2xl font-bold mb-8 max-w-7xl mx-auto text-gray-900">
// // //         Our Collection
// // //       </div>
      
// // //       <div className="max-w-7xl mx-auto">
        
// // //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
// // //           {/* LEFT SIDE: Products Grid */}
// // //           <motion.div 
// // //             // Switched to a standard auto-flowing grid for dynamic additions
// // //             className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
// // //             variants={containerVariants}
// // //             initial="hidden"
// // //             whileInView="visible"
// // //             viewport={{ once: true, margin: "-100px" }}
// // //           >
// // //             {products.map((product) => (
// // //               <motion.div
// // //                 key={product.id}
// // //                 variants={itemVariants}
// // //                 className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 group"
// // //               >
// // //                 {/* Product Image Area */}
// // //                 <a href={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-50">
// // //                   <img
// // //                     src={product.image}
// // //                     alt={product.name}
// // //                     className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
// // //                   />
// // //                 </a>
                
// // //                 {/* Product Details & Buy Button Area */}
// // //                 <div className="p-4 flex flex-col flex-grow justify-between gap-3">
// // //                   <a href={`/product/${product.id}`}>
// // //                     <h3 className="text-gray-900 font-semibold text-lg truncate hover:text-[#fe8204] transition-colors">
// // //                       {product.name}
// // //                     </h3>
// // //                   </a>
                  
// // //                   <div className="flex items-center justify-between mt-auto">
// // //                     <span className="text-gray-900 font-bold text-xl">
// // //                       {product.price}
// // //                     </span>
// // //                     <button className="bg-[#fe8204] hover:bg-[#e07202] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-md shadow-[#fe8204]/20 active:scale-95">
// // //                       Buy Now
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </motion.div>
// // //             ))}
// // //           </motion.div>

// // //           {/* RIGHT SIDE: Featured Collection Details */}
// // //           <motion.div 
// // //             className="lg:col-span-4 lg:sticky lg:top-24"
// // //             initial={{ opacity: 0, x: 20 }}
// // //             whileInView={{ opacity: 1, x: 0 }}
// // //             transition={{ duration: 0.8, delay: 0.2 }}
// // //             viewport={{ once: true }}
// // //           >
// // //             <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex flex-col items-center text-center">
              
// // //               {/* Featured Image inside stylized circle */}
// // //               <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-[0_0_20px_rgba(254,130,4,0.15)] mb-8 group">
// // //                 {/* Ring matching brand color */}
// // //                 <div className="absolute inset-0 border-2 border-[#fe8204]/30 rounded-full z-10 pointer-events-none transition-all group-hover:border-[#fe8204]/60"></div>
// // //                 <img
// // //                   src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80&w=800" 
// // //                   alt="Applying temporary tattoo"
// // //                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
// // //                 />
// // //               </div>

// // //               {/* Text Content */}
// // //               <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
// // //                 Flawless Ink, <br /> Zero Commitment.
// // //               </h2>
// // //               <p className="text-gray-500 leading-relaxed mb-8">
// // //                 Express yourself instantly with our premium temporary tattoos. 
// // //                 Simply peel, press, and reveal stunning, realistic designs that look just like the real thing. 
// // //                 Safe, painless, and ready when you are.
// // //               </p>

// // //               {/* Primary Call to Action */}
// // //               <motion.button 
// // //                 whileHover={{ scale: 1.02 }}
// // //                 whileTap={{ scale: 0.98 }}
// // //                 className="w-full group bg-[#fe8204] hover:bg-[#e07202] text-white py-4 px-8 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-colors shadow-lg shadow-[#fe8204]/25"
// // //               >
// // //                 <ShoppingBag className="w-5 h-5" />
// // //                 Shop Collection
// // //                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
// // //               </motion.button>
// // //             </div>
// // //           </motion.div>

// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // }


// // 'use client';

// // import React from 'react';
// // import { motion, Variants } from 'framer-motion';
// // import { ShoppingBag, ArrowRight } from 'lucide-react';

// // // Product Data
// // const products = [
// //   {
// //     id: 1,
// //     name: 'Majestic Eagle',
// //     price: '$14.99',
// //     image: '/assets/images/Card1.png',
// //   },
// //   {
// //     id: 2,
// //     name: 'Minimal Unicorn',
// //     price: '$9.99',
// //     image: '/assets/images/Card2.png',
// //   },
// //   {
// //     id: 3,
// //     name: 'Botanical Leaves',
// //     price: '$11.99',
// //     image: '/assets/images/Card3.png',
// //   },
// //   {
// //     id: 4,
// //     name: 'Abstract Runes',
// //     price: '$8.99',
// //     image: '/assets/images/Card4.png',
// //   },
// //   {
// //     id: 5,
// //     name: 'Geometric Falcon',
// //     price: '$16.99',
// //     image: '/assets/images/Card5.png',
// //   },
// //   {
// //     id: 6,
// //     name: 'Coiled Snake',
// //     price: '$18.99',
// //     image: '/assets/images/Card6.png',
// //   },
// // ];

// // // Framer Motion animation variants
// // const containerVariants: Variants = {
// //   hidden: { opacity: 0 },
// //   visible: {
// //     opacity: 1,
// //     transition: { staggerChildren: 0.15 },
// //   },
// // };

// // const itemVariants: Variants = {
// //   hidden: { opacity: 0, y: 20 },
// //   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
// // };

// // export default function ShopCollection() {
// //   return (
// //     // Subtle gradient background: White fading to a 5% opacity of the brand orange
// //     <section className="min-h-screen py-16 px-4 md:px-8 bg-gradient-to-br from-white via-white to-[#fe8204]/5 ">
// //       <div className="text-2xl font-bold mb-8 max-w-7xl mx-auto text-gray-900">
// //         Our Collection
// //       </div>
      
// //       <div className="max-w-7xl mx-auto">
// //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
// //           {/* LEFT SIDE: Products Grid */}
// //           <motion.div 
// //             className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
// //             variants={containerVariants}
// //             initial="hidden"
// //             whileInView="visible"
// //             // FIX: Removed the margin: "-100px" so it triggers immediately on load
// //             viewport={{ once: true, amount: 0.1 }}
// //           >
// //             {products.map((product) => (
// //               <motion.div
// //                 key={product.id}
// //                 variants={itemVariants}
// //                 className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 group"
// //               >
// //                 {/* Product Image Area */}
// //                 <a href={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-50">
// //                   <img
// //                     src={product.image}
// //                     alt={product.name}
// //                     className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
// //                   />
// //                 </a>
                
// //                 {/* Product Details & Buy Button Area */}
// //                 <div className="p-4 flex flex-col flex-grow justify-between gap-3">
// //                   <a href={`/product/${product.id}`}>
// //                     <h3 className="text-gray-900 font-semibold text-lg truncate hover:text-[#fe8204] transition-colors">
// //                       {product.name}
// //                     </h3>
// //                   </a>
                  
// //                   <div className="flex items-center justify-between mt-auto">
// //                     <span className="text-gray-900 font-bold text-xl">
// //                       {product.price}
// //                     </span>
// //                     <button className="bg-[#fe8204] hover:bg-[#e07202] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-md shadow-[#fe8204]/20 active:scale-95">
// //                       Buy Now
// //                     </button>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </motion.div>

// //           {/* RIGHT SIDE: Featured Collection Details */}
// //           <motion.div 
// //             className="lg:col-span-4 lg:sticky lg:top-24"
// //             initial={{ opacity: 0, x: 20 }}
// //             whileInView={{ opacity: 1, x: 0 }}
// //             transition={{ duration: 0.8, delay: 0.2 }}
// //             viewport={{ once: true }}
// //           >
// //             <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex flex-col items-center text-center">
              
// //               {/* Featured Image inside stylized circle */}
// //               <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-[0_0_20px_rgba(254,130,4,0.15)] mb-8 group">
// //                 <div className="absolute inset-0 border-2 border-[#fe8204]/30 rounded-full z-10 pointer-events-none transition-all group-hover:border-[#fe8204]/60"></div>
// //                 <img
// //                   src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80&w=800" 
// //                   alt="Applying temporary tattoo"
// //                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
// //                 />
// //               </div>

// //               {/* Text Content */}
// //               <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
// //                 Flawless Ink, <br /> Zero Commitment.
// //               </h2>
// //               <p className="text-gray-500 leading-relaxed mb-8">
// //                 Express yourself instantly with our premium temporary tattoos. 
// //                 Simply peel, press, and reveal stunning, realistic designs that look just like the real thing. 
// //                 Safe, painless, and ready when you are.
// //               </p>

// //               {/* Primary Call to Action */}
// //               <motion.button 
// //                 whileHover={{ scale: 1.02 }}
// //                 whileTap={{ scale: 0.98 }}
// //                 className="w-full group bg-[#fe8204] hover:bg-[#e07202] text-white py-4 px-8 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-colors shadow-lg shadow-[#fe8204]/25"
// //               >
// //                 <ShoppingBag className="w-5 h-5" />
// //                 Shop Collection
// //                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
// //               </motion.button>
// //             </div>
// //           </motion.div>

// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// 'use client';

// import React from 'react';
// import { ShoppingBag, ArrowRight } from 'lucide-react';

// // Product Data
// const products = [
//   {
//     id: 1,
//     name: 'Majestic Eagle',
//     price: '$14.99',
//     image: '/assets/images/Card1.png',
//   },
//   {
//     id: 2,
//     name: 'Minimal Unicorn',
//     price: '$9.99',
//     image: '/assets/images/Card2.png',
//   },
//   {
//     id: 3,
//     name: 'Botanical Leaves',
//     price: '$11.99',
//     image: '/assets/images/Card3.png',
//   },
//   {
//     id: 4,
//     name: 'Abstract Runes',
//     price: '$8.99',
//     image: '/assets/images/Card4.png',
//   },
//   {
//     id: 5,
//     name: 'Geometric Falcon',
//     price: '$16.99',
//     image: '/assets/images/Card5.png',
//   },
//   {
//     id: 6,
//     name: 'Coiled Snake',
//     price: '$18.99',
//     image: '/assets/images/Card6.png',
//   },
// ];

// export default function ShopCollection() {
//   return (
//     // Subtle gradient background: White fading to a 5% opacity of the brand orange
//     <section className="min-h-screen py-16 px-4 md:px-8 bg-gradient-to-br from-white via-white to-[#fe8204]/5 ">
//       <div className="text-2xl font-bold text-center text-[#fe8204] mb-8 max-w-7xl mx-auto">
//         <h2>Our Collection</h2>
//      </div>
      
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
//           {/* LEFT SIDE: Products Grid */}
//           <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
//             {products.map((product) => (
//             //   <div
//             //     key={product.id}
//             //     className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-400 transition-all duration-300 group"
//             //   >
//             <div
//                 key={product.id}
//                 // NEW SHADOW CLASSES APPLIED BELOW:
//                 className="flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-400 transition-all duration-300 group shadow-[0_4px_12px_rgba(254,130,4,0.1)] hover:shadow-[0_12px_30px_rgba(254,130,4,0.2)]"
//             >
//                 {/* Product Image Area */}
//                 <a href={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-50">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
//                   />
//                 </a>
                
//                 {/* Product Details & Buy Button Area */}
//                 <div className="p-4 flex flex-col flex-grow justify-between gap-3">
//                   <a href={`/product/${product.id}`}>
//                     <h3 className="text-gray-900 font-semibold text-lg truncate hover:text-[#fe8204] transition-colors">
//                       {product.name}
//                     </h3>
//                   </a>
                  
//                   <div className="flex items-center justify-between mt-auto">
//                     <span className="text-gray-900 font-bold text-xl">
//                       {product.price}
//                     </span>
//                     <button className="bg-[#fe8204] hover:bg-[#e07202] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-md shadow-[#fe8204]/20 active:scale-95">
//                       Buy Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* RIGHT SIDE: Featured Collection Details */}
//           <div className="lg:col-span-4 lg:sticky lg:top-24">
//             <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex flex-col items-center text-center">
              
//               {/* Featured Image inside stylized circle */}
//               <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-[0_0_20px_rgba(254,130,4,0.15)] mb-8 group">
//                 <div className="absolute inset-0 border-2 border-[#fe8204]/30 rounded-full z-10 pointer-events-none transition-all group-hover:border-[#fe8204]/60"></div>
//                 <img
//                   src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80&w=800" 
//                   alt="Applying temporary tattoo"
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
//               </div>

//               {/* Text Content */}
//               <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
//                 Flawless Ink, <br /> Zero Commitment.
//               </h2>
//               <p className="text-gray-500 leading-relaxed mb-8">
//                 Express yourself instantly with our premium temporary tattoos. 
//                 Simply peel, press, and reveal stunning, realistic designs that look just like the real thing. 
//                 Safe, painless, and ready when you are.
//               </p>

//               {/* Primary Call to Action */}
//               <button 
//                 className="w-full group bg-[#fe8204] hover:bg-[#e07202] text-white py-4 px-8 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-colors shadow-lg shadow-[#fe8204]/25 active:scale-95"
//               >
//                 <ShoppingBag className="w-5 h-5" />
//                 Shop Collection
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </button>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

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