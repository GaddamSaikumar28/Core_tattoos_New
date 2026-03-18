
// // // 'use client';

// // // import React, { useState } from 'react';
// // // import Link from 'next/link';
// // // import { Plus, ArrowRight, ChevronLeft } from 'lucide-react';
// // // import clsx from 'clsx';

// // // // --- Types ---

// // // interface Combination {
// // //   id: string;
// // //   price: number | string;
// // //   image: string;
// // //   size: string;
// // // }

// // // interface ProductItem {
// // //   id: string;
// // //   originalId?: string;
// // //   name: string;
// // //   variantName?: string;
// // //   style: string;
// // //   price: number | string;
// // //   image: string;
// // //   badge?: string;
// // //   productColor?: string;
// // //   isExploded?: boolean;
// // //   preSelectedCombo?: Combination;
// // //   combinations?: Combination[];
// // //   handle?: string;
// // //   slug?: string;
// // // }

// // // interface ProductCardProps {
// // //   item: ProductItem;
// // //   viewMode: 'grid' | 'list';
// // // }

// // // // --- Component ---

// // // export function ProductCard({ item, viewMode }: ProductCardProps) {
// // //   const isList = viewMode === 'list';
// // //   const isExploded = item.isExploded;
// // //   const combinations = item.combinations || [];
  
// // //   const [selectedCombo, setSelectedCombo] = useState<Combination | null>(
// // //     isExploded && item.preSelectedCombo ? item.preSelectedCombo : null
// // //   );

// // //   const activeColor = item.productColor || '#0f172a'; 
// // //   const price = selectedCombo ? selectedCombo.price : item.price;
// // //   const image = selectedCombo ? selectedCombo.image : item.image;
// // //   const parentId = isExploded ? item.originalId : item.id;
// // //   const slug = item.slug || `${item.handle}-${parentId}`;

// // //   const handleAddToCart = async (e: React.MouseEvent) => {
// // //     e.preventDefault(); 
// // //     const comboToAdd = isExploded ? item.preSelectedCombo : (selectedCombo || item.combinations?.[0]);
// // //     if (!comboToAdd?.id) return;
    
// // //     console.log(`Adding Variant ${comboToAdd.id} to cart`);
// // //     // Example: await addToCart(comboToAdd.id, 1);
// // //   };

// // //   return (
// // //     <div className={clsx(
// // //       "group relative bg-white border-2 border-slate-100 transition-all duration-300",
// // //       "hover:border-slate-950 hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]",
// // //       isList ? "flex items-center gap-6 p-4" : "flex flex-col p-5"
// // //     )}>
      
// // //       {/* --- IMAGE AREA --- */}
// // //       <div className={clsx(
// // //         "relative flex items-center justify-center overflow-hidden mb-5 bg-slate-50 border border-slate-100 group-hover:border-slate-300 transition-colors",
// // //         isList ? "w-32 h-32 shrink-0" : "w-full aspect-square"
// // //       )}>
// // //         {item.badge && (
// // //           <div className="absolute top-2 left-2 z-20">
// // //             <span 
// // //               style={{ backgroundColor: activeColor }} 
// // //               className="text-white text-[8px] font-black uppercase px-2 py-1 shadow-sm tracking-[0.2em]"
// // //             >
// // //               {item.badge}
// // //             </span>
// // //           </div>
// // //         )}

// // //         <Link href={`/product/${slug}`} className="w-full h-full flex items-center justify-center p-4">
// // //             <img 
// // //               src={image} 
// // //               alt={item.name} 
// // //               className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0" 
// // //             />
// // //         </Link>
// // //       </div>

// // //       {/* --- INFO AREA --- */}
// // //       <div className={clsx("flex flex-col flex-grow relative z-10", isList ? "text-left" : "text-center items-center")}>
// // //         <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{item.style}</span>
        
// // //         <Link href={`/product/${slug}`} className="block">
// // //             <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight leading-5 mb-2 group-hover:underline decoration-2 underline-offset-4">
// // //               {isExploded ? item.variantName : item.name}
// // //             </h3>
// // //         </Link>
        
// // //         {isExploded && <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{item.name}</p>}

// // //         <div className={clsx("flex items-center gap-3 mb-6 w-full", !isList && "justify-center flex-col xl:flex-row xl:gap-2")}>
// // //           <p className="text-xl font-black text-slate-950">${Number(price).toFixed(2)}</p>
          
// // //           {!isExploded && combinations.length > 0 && (
// // //             <div className="relative group/select w-full xl:w-auto">
// // //               <select 
// // //                 className="appearance-none bg-white text-[10px] font-bold uppercase py-2 pl-3 pr-8 border-2 border-slate-200 outline-none cursor-pointer hover:border-slate-950 focus:border-slate-950 transition-all w-full xl:w-auto"
// // //                 value={selectedCombo ? selectedCombo.id : ""}
// // //                 onChange={(e) => setSelectedCombo(combinations.find(c => c.id === e.target.value) || null)}
// // //               >
// // //                 <option value="">Select Size</option>
// // //                 {combinations.map(c => <option key={c.id} value={c.id}>{c.size}</option>)}
// // //               </select>
// // //               <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-950">
// // //                 <ChevronLeft className="w-3 h-3 -rotate-90" />
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* --- ACTION BUTTONS --- */}
// // //         <div className={clsx("mt-auto w-full grid gap-2", isList ? "grid-cols-2 max-w-md" : "grid-cols-2")}>
// // //           <button 
// // //             onClick={handleAddToCart}
// // //             disabled={!isExploded && combinations.length > 0 && !selectedCombo}
// // //             className="flex items-center justify-center gap-2 py-3 bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all"
// // //           >
// // //             {(!isExploded && !selectedCombo) ? 'Select' : 'Add'} 
// // //             {(!isExploded && !selectedCombo) ? null : <Plus className="w-3 h-3" />}
// // //           </button>
          
// // //           <Link 
// // //             href={`/product/${slug}`} 
// // //             className="flex items-center justify-center gap-2 py-3 bg-white text-slate-950 text-[10px] font-black uppercase tracking-[0.2em] border-2 border-slate-200 hover:border-slate-950 transition-all"
// // //           >
// // //             View <ArrowRight className="w-3 h-3" />
// // //           </Link>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }








// // 'use client';

// // import React, { useState } from 'react';
// // import Link from 'next/link';
// // import { Plus, ArrowRight, ChevronLeft } from 'lucide-react';
// // import clsx from 'clsx';

// // // --- Types ---

// // interface Combination {
// //   id: string;
// //   price: number | string;
// //   image: string;
// //   size: string;
// // }

// // interface ProductItem {
// //   id: string;
// //   originalId?: string;
// //   name: string;
// //   variantName?: string;
// //   style: string;
// //   price: number | string;
// //   image: string;
// //   badge?: string;
// //   productColor?: string;
// //   isExploded?: boolean;
// //   preSelectedCombo?: Combination;
// //   combinations?: Combination[];
// //   handle?: string;
// //   slug?: string;
// // }

// // interface ProductCardProps {
// //   item: ProductItem;
// //   viewMode: 'grid' | 'list';
// // }

// // // --- Component ---

// // export function ProductCard({ item, viewMode }: ProductCardProps) {
// //   const isList = viewMode === 'list';
// //   const isExploded = item.isExploded;
// //   const combinations = item.combinations || [];
  
// //   const [selectedCombo, setSelectedCombo] = useState<Combination | null>(
// //     isExploded && item.preSelectedCombo ? item.preSelectedCombo : null
// //   );

// //   const activeColor = item.productColor || '#0f172a'; 
// //   const price = selectedCombo ? selectedCombo.price : item.price;
// //   const image = selectedCombo ? selectedCombo.image : item.image;
// //   const parentId = isExploded ? item.originalId : item.id;
// //   const slug = item.slug || `${item.handle}-${parentId}`;

// //   const handleAddToCart = async (e: React.MouseEvent) => {
// //     e.preventDefault(); 
// //     const comboToAdd = isExploded ? item.preSelectedCombo : (selectedCombo || item.combinations?.[0]);
// //     if (!comboToAdd?.id) return;
    
// //     console.log(`Adding Variant ${comboToAdd.id} to cart`);
// //     // Example: await addToCart(comboToAdd.id, 1);
// //   };

// //   return (
// //     <div className={clsx(
// //       "group relative bg-white border-2 border-slate-100 transition-all duration-300",
// //       "hover:border-slate-950 hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]",
// //       isList ? "flex items-center gap-6 p-4" : "flex flex-col p-5"
// //     )}>
      
// //       {/* --- IMAGE AREA --- */}
// //       <div className={clsx(
// //         "relative flex items-center justify-center overflow-hidden mb-5 bg-slate-50 border border-slate-100 group-hover:border-slate-300 transition-colors",
// //         isList ? "w-32 h-32 shrink-0" : "w-full aspect-square"
// //       )}>
// //         {item.badge && (
// //           <div className="absolute top-2 left-2 z-20">
// //             <span 
// //               style={{ backgroundColor: activeColor }} 
// //               className="text-white text-[8px] font-black uppercase px-2 py-1 shadow-sm tracking-[0.2em]"
// //             >
// //               {item.badge}
// //             </span>
// //           </div>
// //         )}

// //         <Link href={`/product/${slug}`} className="w-full h-full flex items-center justify-center p-4">
// //             <img 
// //               src={image} 
// //               alt={item.name} 
// //               className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0" 
// //             />
// //         </Link>
// //       </div>

// //       {/* --- INFO AREA --- */}
// //       <div className={clsx("flex flex-col flex-grow relative z-10", isList ? "text-left" : "text-center items-center")}>
// //         <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{item.style}</span>
        
// //         <Link href={`/product/${slug}`} className="block">
// //             <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight leading-5 mb-2 group-hover:underline decoration-2 underline-offset-4">
// //               {isExploded ? item.variantName : item.name}
// //             </h3>
// //         </Link>
        
// //         {isExploded && <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{item.name}</p>}

// //         <div className={clsx("flex items-center gap-3 mb-6 w-full", !isList && "justify-center flex-col xl:flex-row xl:gap-2")}>
// //           <p className="text-xl font-black text-slate-950">${Number(price).toFixed(2)}</p>
          
// //           {!isExploded && combinations.length > 0 && (
// //             <div className="relative group/select w-full xl:w-auto">
// //               <select 
// //                 className="appearance-none bg-white text-[10px] font-bold uppercase py-2 pl-3 pr-8 border-2 border-slate-200 outline-none cursor-pointer hover:border-slate-950 focus:border-slate-950 transition-all w-full xl:w-auto"
// //                 value={selectedCombo ? selectedCombo.id : ""}
// //                 onChange={(e) => setSelectedCombo(combinations.find(c => c.id === e.target.value) || null)}
// //               >
// //                 <option value="">Select Size</option>
// //                 {combinations.map(c => <option key={c.id} value={c.id}>{c.size}</option>)}
// //               </select>
// //               <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-950">
// //                 <ChevronLeft className="w-3 h-3 -rotate-90" />
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* --- ACTION BUTTONS --- */}
// //         <div className={clsx("mt-auto w-full grid gap-2", isList ? "grid-cols-2 max-w-md" : "grid-cols-2")}>
// //           <button 
// //             onClick={handleAddToCart}
// //             disabled={!isExploded && combinations.length > 0 && !selectedCombo}
// //             className="flex items-center justify-center gap-2 py-3 bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all"
// //           >
// //             {(!isExploded && !selectedCombo) ? 'Select' : 'Add'} 
// //             {(!isExploded && !selectedCombo) ? null : <Plus className="w-3 h-3" />}
// //           </button>
          
// //           <Link 
// //             href={`/product/${slug}`} 
// //             className="flex items-center justify-center gap-2 py-3 bg-white text-slate-950 text-[10px] font-black uppercase tracking-[0.2em] border-2 border-slate-200 hover:border-slate-950 transition-all"
// //           >
// //             View <ArrowRight className="w-3 h-3" />
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { Plus, ArrowRight, ChevronDown, ShoppingBag } from 'lucide-react';
// import clsx from 'clsx';

// // --- Types ---

// interface Combination {
//   id: string;
//   price: number | string;
//   image: string;
//   size: string;
// }

// interface ProductItem {
//   id: string;
//   originalId?: string;
//   name: string;
//   variantName?: string;
//   style: string;
//   price: number | string;
//   image: string;
//   badge?: string;
//   productColor?: string;
//   isExploded?: boolean;
//   preSelectedCombo?: Combination;
//   combinations?: Combination[];
//   handle?: string;
//   slug?: string;
// }

// interface ProductCardProps {
//   item: ProductItem;
//   viewMode: 'grid' | 'list';
// }

// // --- Component ---

// export function ProductCard({ item, viewMode }: ProductCardProps) {
//   const isList = viewMode === 'list';
//   const isExploded = item.isExploded;
//   const combinations = item.combinations || [];
  
//   const [selectedCombo, setSelectedCombo] = useState<Combination | null>(
//     isExploded && item.preSelectedCombo ? item.preSelectedCombo : null
//   );

//   const price = selectedCombo ? selectedCombo.price : item.price;
//   const image = selectedCombo ? selectedCombo.image : item.image;
//   const parentId = isExploded ? item.originalId : item.id;
//   const slug = item.slug || `${item.handle}-${parentId}`;

//   const handleAddToCart = async (e: React.MouseEvent) => {
//     e.preventDefault(); 
//     const comboToAdd = isExploded ? item.preSelectedCombo : (selectedCombo || item.combinations?.[0]);
//     if (!comboToAdd?.id) return;
    
//     console.log(`Adding Variant ${comboToAdd.id} to cart`);
//     // Example: await addToCart(comboToAdd.id, 1);
//   };

//   return (
//     <div className={clsx(
//       "group relative bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 ease-in-out",
//       "hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 hover:border-gray-200",
//       isList ? "flex flex-col sm:flex-row" : "flex flex-col"
//     )}>
      
//       {/* --- IMAGE AREA --- */}
//       <div className={clsx(
//         "relative overflow-hidden bg-gray-50",
//         isList ? "w-full sm:w-48 sm:min-w-[12rem] h-56 sm:h-auto shrink-0" : "w-full aspect-[4/5]"
//       )}>
//         {/* Badge */}
//         {item.badge && (
//           <div className="absolute top-3 left-3 z-20">
//             <span className="bg-[#fe8204] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow-sm tracking-wider">
//               {item.badge}
//             </span>
//           </div>
//         )}

//         <Link href={`/product/${slug}`} className="block w-full h-full relative">
//             <img 
//               src={image} 
//               alt={item.name} 
//               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
//             />
//             {/* Subtle overlay on hover for premium feel */}
//             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
//         </Link>
//       </div>

//       {/* --- INFO AREA --- */}
//       <div className={clsx(
//         "flex flex-col flex-grow p-5 sm:p-6",
//         isList ? "justify-center" : ""
//       )}>
        
//         {/* Category / Style */}
//         <span className="text-xs font-semibold text-[#fe8204] tracking-wider uppercase mb-1.5">
//           {item.style}
//         </span>
        
//         {/* Title */}
//         <Link href={`/product/${slug}`} className="block mb-1">
//             <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-[#fe8204] transition-colors line-clamp-2">
//               {isExploded ? item.variantName : item.name}
//             </h3>
//         </Link>
        
//         {/* Subtitle for exploded variants */}
//         {isExploded && (
//           <p className="text-sm font-medium text-gray-500 mb-3 line-clamp-1">{item.name}</p>
//         )}

//         <div className="flex-grow" /> {/* Spacer to push bottom content down in grid mode */}

//         {/* Price & Select Container */}
//         <div className={clsx(
//           "flex flex-col gap-4 mt-4 mb-5",
//           isList ? "sm:flex-row sm:items-center sm:justify-between" : ""
//         )}>
//           <p className="text-2xl font-extrabold text-gray-900">
//             ${Number(price).toFixed(2)}
//           </p>
          
//           {!isExploded && combinations.length > 0 && (
//             <div className="relative w-full sm:max-w-[140px]">
//               <select 
//                 className="w-full appearance-none bg-gray-50 text-sm font-semibold text-gray-700 py-2.5 pl-4 pr-10 border border-gray-200 rounded-xl outline-none cursor-pointer hover:bg-gray-100 hover:border-gray-300 focus:ring-2 focus:ring-[#fe8204]/20 focus:border-[#fe8204] transition-all"
//                 value={selectedCombo ? selectedCombo.id : ""}
//                 onChange={(e) => setSelectedCombo(combinations.find(c => c.id === e.target.value) || null)}
//               >
//                 <option value="" disabled>Size</option>
//                 {combinations.map(c => <option key={c.id} value={c.id}>{c.size}</option>)}
//               </select>
//               <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
//                 <ChevronDown className="w-4 h-4" />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* --- ACTION BUTTONS --- */}
//         <div className="grid grid-cols-[1fr_auto] gap-2.5">
//           <button 
//             onClick={handleAddToCart}
//             disabled={!isExploded && combinations.length > 0 && !selectedCombo}
//             className={clsx(
//               "flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300",
//               (!isExploded && combinations.length > 0 && !selectedCombo)
//                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                 : "bg-[#fe8204] hover:bg-[#e07300] text-white shadow-lg shadow-[#fe8204]/25 hover:shadow-[#fe8204]/40"
//             )}
//           >
//             {(!isExploded && !selectedCombo) ? 'Select Size' : 'Add to Cart'} 
//             {(!isExploded && !selectedCombo) ? null : <ShoppingBag className="w-4 h-4" />}
//           </button>
          
//           <Link 
//             href={`/product/${slug}`} 
//             className="flex items-center justify-center p-3 rounded-xl bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-300 transition-all duration-300 group/link"
//             aria-label="View Product"
//           >
//             <ArrowRight className="w-5 h-5 group-hover/link:translate-x-0.5 transition-transform" />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ShoppingBag } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
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
}

// --- Component ---

export function ProductCard({ item, viewMode }: ProductCardProps) {
  const isList = viewMode === 'list';
  const isExploded = item.isExploded;
  const combinations = item.combinations || [];
  
  const [selectedCombo, setSelectedCombo] = useState<Combination | null>(
    isExploded && item.preSelectedCombo ? item.preSelectedCombo : null
  );

  const price = selectedCombo ? selectedCombo.price : item.price;
  const image = selectedCombo ? selectedCombo.image : item.image;
  const parentId = isExploded ? item.originalId : item.id;
  const slug = item.slug || `${item.handle}-${parentId}`;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    const comboToAdd = isExploded ? item.preSelectedCombo : (selectedCombo || item.combinations?.[0]);
    if (!comboToAdd?.id) return;
    
    console.log(`Adding Variant ${comboToAdd.id} to cart`);
    // Example: await addToCart(comboToAdd.id, 1);
  };

  return (
    <div className={clsx(
      // Added shadow-sm and slightly softer border for the light gradient background
      "group relative bg-white border border-gray-100/80 shadow-sm rounded-2xl overflow-hidden transition-all duration-300 ease-in-out",
      "hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:border-gray-200",
      isList ? "flex flex-col sm:flex-row" : "flex flex-col"
    )}>
      
      {/* --- IMAGE AREA --- */}
      <div className={clsx(
        "relative overflow-hidden bg-gray-50/50",
        isList ? "w-full sm:w-48 sm:min-w-[12rem] h-56 sm:h-auto shrink-0" : "w-full aspect-[4/5]"
      )}>
        {/* Badge */}
        {item.badge && (
          <div className="absolute top-3 left-3 z-20">
            <span className="bg-[#fe8204] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow-sm tracking-wider">
              {item.badge}
            </span>
          </div>
        )}

        <Link href={`/product/${slug}`} className="block w-full h-full relative">
            {/* <img 
              src={image} 
              alt={item.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
            /> */}
            <Image
                src={image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />
            {/* Subtle overlay on hover for premium feel */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </Link>
      </div>

      {/* --- INFO AREA --- */}
      <div className={clsx(
        "flex flex-col flex-grow p-5 sm:p-6",
        isList ? "justify-center" : ""
      )}>
        
        {/* Category / Style */}
        <span className="text-xs font-semibold text-[#fe8204] tracking-wider uppercase mb-1.5">
          {item.style}
        </span>
        
        {/* Title */}
        <Link href={`/collections/${slug}`} className="block mb-1">
            <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-[#fe8204] transition-colors line-clamp-2">
              {isExploded ? item.variantName : item.name}
            </h3>
        </Link>
        
        {/* Subtitle for exploded variants */}
        {isExploded && (
          <p className="text-sm font-medium text-gray-500 mb-3 line-clamp-1">{item.name}</p>
        )}

        <div className="flex-grow" /> {/* Spacer to push bottom content down in grid mode */}

        {/* Price & Select Container */}
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

        {/* --- ACTION BUTTONS --- */}
        {/* Updated to grid-cols-2 so the buttons sit perfectly side-by-side */}
        <div className="grid grid-cols-2 gap-2.5">
          <button 
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
          </button>
          
          {/* Replaced Icon with "View Details" text and styled to look great on light backgrounds */}
          <Link 
            href={`/product/${slug}`} 
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