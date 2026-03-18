// "use client";

// import React from 'react';
// import Image from 'next/image';
// import { motion } from 'framer-motion';

// const FreeGiftComponent = () => {
//   return (
//     <section className="bg-white w-full overflow-hidden px-4 py-16 md:px-8 lg:px-16 md:py-24 relative">
//       <div className="max-w-[1312px] mx-auto">
        
//         {/* Text Header Section */}
//         <div className="mb-10 md:mb-12">
//           <h2 className="text-3xl md:text-5xl text-[#fe8204] font-almarena font-bold text-white uppercase leading-tight">
//             Free gift with your order 
//           </h2>
//           <p className="text-base md:text-lg font-montserrat font-medium text-gray-300 mt-4 md:mt-6 max-w-4xl leading-relaxed">
//             Who doesn’t love a surprise? Spend $30 USD or more and we’ll toss in a mystery ink on us. Realistic tattoo look, water-resistant, and designed to last up to 10 days. At Just Tattoos, we make it easy to switch up your style, no commitment required.
//           </p>
//           <p className="text-base md:text-lg font-montserrat font-medium text-[var(--color-brand-orange,#FE8204)] mt-3">
//             Available in the U.S. only. While supplies last 
//           </p>
//         </div>

//         {/* Animated Cards Container */}
//         <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          
//           {/* Left Image Card (Slides in from Left) */}
//           <motion.div 
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//             className="w-full md:w-3/5 h-[350px] md:h-[450px] rounded-[24px] md:rounded-[30px] overflow-hidden relative shrink-0 bg-zinc-900"
//           >
//             {/* Next.js Optimized Image */}
//             <Image 
//               src="/assets/images/Component4.png" 
//               alt="Free Gift Box with Just Tattoos" 
//               fill
//               sizes="(max-width: 768px) 100vw, 60vw"
//               className="object-cover"
//               priority={false}
//             />
//           </motion.div>

//           {/* Right White Card (Slides in from Right) */}
//           <motion.div 
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
//             className="w-full md:w-2/5 bg-white rounded-[24px] md:rounded-[30px] p-6 md:p-8 flex flex-col justify-end min-h-[300px] md:min-h-[450px] relative"
//           >
//             {/* Wrap text & button in a container pushed to the bottom */}
//             <div className="mt-auto">
//               <h3 className="text-xl md:text-2xl font-almarena font-bold text-black uppercase mb-3 leading-tight">
//                 A Little Something Extra 
//               </h3>
//               <p className="text-sm md:text-base font-montserrat font-normal text-gray-800 mb-8 max-w-[320px] leading-relaxed">
//                 High-quality ink, on the house. Reach $30 and we’ll drop a mystery design into your order. New style, zero cost.
//               </p>

//               {/* Shop Collections Button // add hovered fe8204 color change to this color effect also  */}
//               <button className="bg-black text-white rounded-full h-[50px] px-2 pl-6 flex items-center gap-4 transition-all hover:bg-gray-800 border border-black outline outline-1 outline-offset-[-1px] outline-black group w-max">
//                   <span className="font-almarena font-bold uppercase text-[16px] tracking-wide whitespace-nowrap pt-0.5">
//                       Shop collections 
//                   </span>
//                   <div className="bg-white text-black w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
//                       {/* Arrow Icon */}
//                       <svg width="14" height="12" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M8.5 1.5L13.5 6.5M13.5 6.5L8.5 11.5M13.5 6.5H1.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                       </svg>
//                   </div>
//               </button>
//             </div>
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default FreeGiftComponent;
"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const FreeGiftComponent = () => {
  return (
    <section className="bg-white w-full overflow-hidden px-4 py-16 md:px-8 lg:px-16 md:py-24 relative">
      <div className="max-w-[1312px] mx-auto">
        
        {/* Text Header Section */}
        <div className="mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl text-black font-almarena font-bold uppercase leading-tight">
            Free gift with your order 
          </h2>
          <p className="text-base md:text-lg font-montserrat font-medium text-gray-600 mt-4 md:mt-6 max-w-4xl leading-relaxed">
            Who doesn’t love a surprise? Spend $30 USD or more and we’ll toss in a mystery ink on us. Realistic tattoo look, water-resistant, and designed to last up to 10 days. At Just Tattoos, we make it easy to switch up your style, no commitment required.
          </p>
          <p className="text-base md:text-lg font-montserrat font-bold text-[#FE8204] mt-3">
            Available in the U.S. only. While supplies last 
          </p>
        </div>

        {/* Animated Cards Container */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          
          {/* Left Image Card (Slides in from Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full md:w-3/5 h-[350px] md:h-[450px] rounded-[24px] md:rounded-[30px] overflow-hidden relative shrink-0 bg-zinc-100"
          >
            {/* Next.js Optimized Image */}
            <Image 
              src="/assets/images/Component4.png" 
              alt="Free Gift Box with Just Tattoos" 
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
              priority={false}
            />
          </motion.div>

          {/* Right Content Card (Slides in from Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            // Added bg-gray-50 and a light border so it doesn't vanish into the white section background
            className="w-full md:w-2/5 bg-gray-50 border border-gray-200 rounded-[24px] md:rounded-[30px] p-6 md:p-8 flex flex-col justify-end min-h-[300px] md:min-h-[450px] relative"
          >
            {/* Wrap text & button in a container pushed to the bottom */}
            <div className="mt-auto">
              <h3 className="text-xl md:text-2xl font-almarena font-bold text-black uppercase mb-3 leading-tight">
                A Little Something Extra 
              </h3>
              <p className="text-sm md:text-base font-montserrat font-medium text-gray-700 mb-8 max-w-[320px] leading-relaxed">
                High-quality ink, on the house. Reach $30 and we’ll drop a mystery design into your order. New style, zero cost.
              </p>

              {/* Shop Collections Button */}
              <button className="bg-black text-white rounded-full h-[50px] px-2 pl-6 flex items-center gap-4 transition-all duration-300 hover:bg-[#FE8204] hover:border-[#FE8204] hover:outline-[#FE8204] border border-black outline outline-1 outline-offset-[-1px] outline-black group w-max">
                  <span className="font-almarena font-bold uppercase text-[16px] tracking-wide whitespace-nowrap pt-0.5">
                      Shop collections 
                  </span>
                  <div className="bg-white text-black w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                      {/* Arrow Icon */}
                      <svg width="14" height="12" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 1.5L13.5 6.5M13.5 6.5L8.5 11.5M13.5 6.5H1.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                  </div>
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FreeGiftComponent;