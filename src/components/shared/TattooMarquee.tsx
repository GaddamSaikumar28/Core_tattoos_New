// {/* whole marquee should scale down in phone and some white noise is coming , not at all good looking and up to the mark */}
// import React from 'react';

// interface CardData {
//   label: string;
//   tag: string;
//   img: string;     
// }

// interface TattooMarqueeProps {
//   handleCategorySelect?: (category: string) => void;
// }

// interface MarqueeColumn {
//   type: 'tall' | 'stacked';
//   item?: CardData;
//   items?: CardData[];
// }

// const TattooMarquee: React.FC<TattooMarqueeProps> = ({ handleCategorySelect = () => {} }) => {
//   // Re-paired the data to ensure every stacked column has exactly 2 items, 
//   // and removed 'Sizes' completely. Added images to replace the old solid blocks.
// //   const marqueeColumns: MarqueeColumn[] = [
// //     { 
// //       type: 'tall', 
// //       item: { label: 'Japanese Art', tag: 'Styles', img: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&q=80' } 
// //     },
// //     { 
// //       type: 'stacked', items: [
// //         { label: 'Sleeve', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80' },
// //         { label: 'Back', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1581337204873-ef36aa186caa?auto=format&fit=crop&q=80' }
// //       ]
// //     },
// //     { 
// //       type: 'tall', 
// //       item: { label: 'Floral', tag: 'Styles', img: 'https://images.unsplash.com/photo-1605805561339-b9d9c22851ee?auto=format&fit=crop&q=80' } 
// //     },
// //     { 
// //       type: 'stacked', items: [
// //         { label: 'Abstract', tag: 'Styles', img: 'https://images.unsplash.com/photo-1590246814883-578ea4370fa6?auto=format&fit=crop&q=80' },
// //         { label: 'Spine', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1598371839696-5e5bb00d0d10?auto=format&fit=crop&q=80' }
// //       ]
// //     },
// //     { 
// //       type: 'tall', 
// //       item: { label: 'Tribal Art', tag: 'Styles', img: 'https://images.unsplash.com/photo-1600080829007-4e7cb8a7e3dd?auto=format&fit=crop&q=80' } 
// //     },
// //     { 
// //       type: 'stacked', items: [
// //         { label: 'Animal', tag: 'Styles', img: 'https://images.unsplash.com/photo-1578307886475-7071db10ccfb?auto=format&fit=crop&q=80' },
// //         { label: 'Hand', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1531256379416-9f000e90aaca?auto=format&fit=crop&q=80' } // Used geometric image as placeholder for hand
// //       ]
// //     },
// //     { 
// //       type: 'tall', 
// //       item: { label: 'Geometric', tag: 'Styles', img: 'https://images.unsplash.com/photo-1550246140-5119ae4790b8?auto=format&fit=crop&q=80' } 
// //     },
// //     { 
// //       type: 'stacked', items: [
// //         { label: 'Leg', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1621360841013-c76831f1fc9c?auto=format&fit=crop&q=80' },
// //         { label: 'Traditional', tag: 'Styles', img: 'https://images.unsplash.com/photo-1626201317056-59b1f24ddb59?auto=format&fit=crop&q=80' }
// //       ]
// //     },
// //   ];
// const marqueeColumns: MarqueeColumn[] = [
//   { 
//     type: 'tall', 
//     item: { label: 'Japanese art', tag: 'Styles', img: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&q=80' } 
//   },
//   { 
//     type: 'stacked', items: [
//       { label: 'Sleeve', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80' },
//       { label: 'Back, Torso & Chest Pieces', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1581337204873-ef36aa186caa?auto=format&fit=crop&q=80' }
//     ]
//   },
//   { 
//     type: 'tall', 
//     item: { label: 'Floral', tag: 'Styles', img: 'https://images.unsplash.com/photo-1605805561339-b9d9c22851ee?auto=format&fit=crop&q=80' } 
//   },
//   { 
//     type: 'stacked', items: [
//       { label: 'Small', tag: 'Sizes', img: 'https://images.unsplash.com/photo-1590246814883-578ea4370fa6?auto=format&fit=crop&q=80' },
//       { label: 'Spine', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1598371839696-5e5bb00d0d10?auto=format&fit=crop&q=80' }
//     ]
//   },
//   { 
//     type: 'tall', 
//     item: { label: 'Tribal art', tag: 'Styles', img: 'https://images.unsplash.com/photo-1600080829007-4e7cb8a7e3dd?auto=format&fit=crop&q=80' } 
//   },
//   { 
//     type: 'stacked', items: [
//       { label: 'Animal', tag: 'Styles', img: 'https://images.unsplash.com/photo-1578307886475-7071db10ccfb?auto=format&fit=crop&q=80' },
//       { label: 'Hand', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1531256379416-9f000e90aaca?auto=format&fit=crop&q=80' }
//     ]
//   },
//   { 
//     type: 'tall', 
//     item: { label: 'Leg & Arm pieces', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1621360841013-c76831f1fc9c?auto=format&fit=crop&q=80' } 
//   },
//   { 
//     type: 'stacked', items: [
//       { label: 'Celestial art', tag: 'Styles', img: 'https://images.unsplash.com/photo-1504333638930-c8787321efa0?auto=format&fit=crop&q=80' },
//       { label: 'Colored Art', tag: 'Styles', img: 'https://images.unsplash.com/photo-1560780552-ba54683cb263?auto=format&fit=crop&q=80' }
//     ]
//   },
//   { 
//     type: 'tall', 
//     item: { label: 'Couple art', tag: 'Styles', img: 'https://images.unsplash.com/photo-1518599904199-0ca897819ddb?auto=format&fit=crop&q=80' } 
//   },
//   { 
//     type: 'stacked', items: [
//       { label: 'Fantasy', tag: 'Styles', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80' },
//       { label: 'Insects', tag: 'Styles', img: 'https://images.unsplash.com/photo-1544485303-34e85741f237?auto=format&fit=crop&q=80' }
//     ]
//   },
//   { 
//     type: 'tall', 
//     item: { label: 'Medium', tag: 'Sizes', img: 'https://images.unsplash.com/photo-1550246140-5119ae4790b8?auto=format&fit=crop&q=80' } 
//   },
//   { 
//     type: 'stacked', items: [
//       { label: 'Nature', tag: 'Styles', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80' },
//       { label: 'Spiritual', tag: 'Styles', img: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80' }
//     ]
//   },
//   { 
//     type: 'tall', 
//     item: { label: 'Symbols and quotes', tag: 'Styles', img: 'https://images.unsplash.com/photo-1520038410233-7141be7b6f97?auto=format&fit=crop&q=80' } 
//   },
//   { 
//     type: 'stacked', items: [
//       { label: 'Ankle & Wrist', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1626201317056-59b1f24ddb59?auto=format&fit=crop&q=80' },
//       { label: 'Foot', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1516431883659-655d41c09bf9?auto=format&fit=crop&q=80' }
//     ]
//   },
//   { 
//     type: 'tall', 
//     item: { label: 'Large', tag: 'Sizes', img: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80' } 
//   }
// ];

//   const renderCard = (data: CardData, isStacked: boolean = false) => {
//     // Upgraded styling: softer borders, better shadows, smoother zoom, and partial grayscale base
//     const baseClasses = "relative group cursor-pointer overflow-hidden border border-gray-200 rounded-2xl flex-1 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1 bg-gray-100";
//     const sizeClasses = !isStacked ? 'w-[280px] h-[400px]' : 'w-full h-full';

//     return (
//       <div 
//         onClick={() => handleCategorySelect(data.label)}
//         className={`${baseClasses} ${sizeClasses}`}
//       >
//         <img 
//           src={data.img} 
//           alt={data.label} 
//           className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out grayscale-[0.3] group-hover:grayscale-0" 
//         />
//         {/* Improved gradient for readable text and smooth overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5 group-hover:from-black/90 group-hover:via-black/30 transition-colors duration-500" />
        
//         <div className="absolute bottom-6 left-6 right-6 z-10">
//           <p className="text-gray-300 text-[10px] font-bold tracking-widest uppercase mb-1 drop-shadow-sm">
//             {data.tag}
//           </p>
//           <h3 className="text-xl font-black uppercase text-white leading-tight drop-shadow-md">
//             {data.label}
//           </h3>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <section className="py-16 bg-white overflow-hidden relative border-b border-gray-100">
//       <style dangerouslySetInnerHTML={{__html: `
//         @keyframes scroll {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         .animate-scroll {
//           display: flex;
//           width: max-content;
//           animation: scroll 60s linear infinite; 
//         }
//         .animate-scroll:hover {
//           animation-play-state: paused;
//         }
//       `}} />

//       <div className="animate-scroll gap-6">
//         {[1, 2].map((iteration) => (
//           <div key={iteration} className="flex gap-6 pr-6 items-center">
//             {marqueeColumns.map((col, idx) => (
//               <React.Fragment key={idx}>
//                 {col.type === 'tall' && col.item && (
//                   <div className="flex-shrink-0">
//                     {renderCard(col.item)}
//                   </div>
//                 )}
                
//                 {col.type === 'stacked' && col.items && col.items.length === 2 && (
//                   <div className="w-[280px] h-[400px] flex-shrink-0 flex flex-col gap-6">
//                     {renderCard(col.items[0], true)}
//                     {renderCard(col.items[1], true)}
//                   </div>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>
//         ))}
//       </div>
      
//       {/* Thicker fade out gradients to mask the harsh entry/exit point of scrolling items */}
//       <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
//       <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
//     </section>
//   );
// };

// export default TattooMarquee;


import React from 'react';

// Interfaces remain the same...
interface CardData { label: string; tag: string; img: string; }
interface TattooMarqueeProps { handleCategorySelect?: (category: string) => void; }
interface MarqueeColumn { type: 'tall' | 'stacked'; item?: CardData; items?: CardData[]; }

const TattooMarquee: React.FC<TattooMarqueeProps> = ({ handleCategorySelect = () => {} }) => {
  // Use your existing marqueeColumns data array here...
  const marqueeColumns: MarqueeColumn[] = [
    { type: 'tall', item: { label: 'Japanese art', tag: 'Styles', img: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&q=80' } },
    { type: 'stacked', items: [{ label: 'Sleeve', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80' }, { label: 'Back & Chest', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1581337204873-ef36aa186caa?auto=format&fit=crop&q=80' }] },
    // Add the rest of your data...
  ];

  const renderCard = (data: CardData, isStacked: boolean = false) => {
    return (
      <div 
        onClick={() => handleCategorySelect(data.label)}
        className="relative group cursor-pointer overflow-hidden rounded-3xl flex-1 transition-all duration-300 w-full h-full bg-gray-100 isolate"
      >
        <img 
          src={data.img} 
          alt={data.label} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        
        <div className="absolute bottom-5 left-5 right-5 z-20">
          <p className="text-[#0088FF] text-[10px] font-black tracking-widest uppercase mb-1 drop-shadow-sm">
            {data.tag}
          </p>
          <h3 className="text-lg md:text-xl font-black uppercase text-white leading-tight">
            {data.label}
          </h3>
        </div>
      </div>
    );
  };

  return (
    <section className="py-12 md:py-20 bg-white overflow-hidden relative">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll { display: flex; width: max-content; animation: scroll 45s linear infinite; will-change: transform; }
        .animate-scroll:hover { animation-play-state: paused; }
      `}} />

      <div className="animate-scroll gap-4 md:gap-6">
        {[1, 2].map((iteration) => (
          <div key={iteration} className="flex gap-4 md:gap-6 pr-4 md:pr-6 items-center">
            {marqueeColumns.map((col, idx) => (
              <React.Fragment key={idx}>
                {col.type === 'tall' && col.item && (
                  <div className="w-[200px] h-[300px] md:w-[280px] md:h-[420px] shrink-0">
                    {renderCard(col.item)}
                  </div>
                )}
                {col.type === 'stacked' && col.items && col.items.length === 2 && (
                  <div className="w-[200px] h-[300px] md:w-[280px] md:h-[420px] shrink-0 flex flex-col gap-4 md:gap-6">
                    <div className="flex-1">{renderCard(col.items[0], true)}</div>
                    <div className="flex-1">{renderCard(col.items[1], true)}</div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
      
      {/* Clean fade masks */}
      <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-30" />
      <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-30" />
    </section>
  );
};

export default TattooMarquee;