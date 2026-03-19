// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { PenTool, Target, Image as ImageIcon } from "lucide-react";
// import Image from "next/image";

// // --- Animation Variants ---
// const sectionVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.2, duration: 0.8, ease: "easeOut" },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
// };

// const featureData = [
//   {
//     id: 1,
//     icon: PenTool,
//     subtitle: "Tattooing",
//     title: "DESIGN CURATION",
//     description:
//       "Our team helps curate and refine designs into high-fidelity temporary tattoos tailored to your exact style.",
//   },
//   {
//     id: 2,
//     icon: Target,
//     subtitle: "Piercing",
//     title: "PLACEMENT GUIDES",
//     description:
//       "Discover ideal temporary placement for maximum impact with our expert anatomical placement guides.",
//   },
//   {
//     id: 3,
//     icon: ImageIcon,
//     subtitle: "Tattoo Design",
//     title: "ARTIST PRINTS",
//     description:
//       "Submit your custom art or photos to create a one-of-a-kind temporary decal printed with premium ink.",
//   },
// ];

// export default function WhatWeDo() {
//   return (
//     <section className="relative w-full bg-[var(--color-white)] py-20 md:py-32 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
//         {/* --- Top Section: Features Grid --- */}
//         <motion.div
//           variants={sectionVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="flex flex-col items-center text-center mb-24 md:mb-32"
//         >
//           <motion.h2 variants={itemVariants} className="text-h2 font-heading mb-16 text-[var(--color-black)]">
//             What We Do
//           </motion.h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 w-full">
//             {featureData.map((feature) => {
//               const Icon = feature.icon;
//               return (
//                 <motion.div
//                   key={feature.id}
//                   variants={itemVariants}
//                   whileHover={{ y: -10 }}
//                   className="flex flex-col items-center group cursor-default"
//                 >
//                   <div className="mb-6 p-5 rounded-full bg-gray-50 text-[var(--color-brand-orange)] group-hover:bg-[var(--color-brand-orange)] group-hover:text-[var(--color-white)] transition-all duration-500 ease-out shadow-[var(--shadow-card)]">
//                     <Icon strokeWidth={1.5} size={40} />
//                   </div>
//                   <h4 className="font-heading text-lg text-[var(--color-secondary)] opacity-60 mb-1 capitalize tracking-wider">
//                     {feature.subtitle}
//                   </h4>
//                   <h3 className="text-h3 font-heading mb-4 text-[var(--color-black)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
//                     {feature.title}
//                   </h3>
//                   <p className="text-body text-gray-600 max-w-[280px]">
//                     {feature.description}
//                   </p>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </motion.div>

//         {/* --- Bottom Section: About Us & Image --- */}
//         <motion.div
//           variants={sectionVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center"
//         >
//           {/* Decorative Vertical Text */}
//           <div className="hidden xl:block absolute left-[-80px] top-1/2 -translate-y-1/2 -rotate-90 origin-center select-none pointer-events-none z-0">
//             <span className="text-hero font-heading text-[var(--color-secondary)] opacity-5 whitespace-nowrap tracking-tighter">
//               JUST TATTOOS
//             </span>
//           </div>

//           {/* Image Container */}
//           <motion.div 
//             variants={itemVariants}
//             className="relative w-full max-w-md mx-auto lg:max-w-none z-10 flex justify-center"
//           >
//             <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden shadow-2xl border-4 border-[var(--color-white)] ring-1 ring-gray-100">
//               {/* Note: Replace src with your actual asset. Using a relevant placeholder for now. */}
//               <Image
//                 src="https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=1200&auto=format&fit=crop"
//                 alt="Applying a temporary tattoo"
//                 fill
//                 className="object-cover hover:scale-110 transition-transform duration-1000 ease-in-out"
//                 sizes="(max-width: 768px) 300px, 450px"
//               />
//             </div>
            
//             {/* Decorative abstract shape behind image */}
//             <div className="absolute -bottom-6 -right-6 w-[80%] h-[80%] rounded-full bg-[var(--color-brand-orange)] opacity-10 -z-10 blur-2xl"></div>
//           </motion.div>

//           {/* Text Content Container */}
//           <motion.div variants={itemVariants} className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-xl mx-auto lg:mx-0 z-10 lg:pl-12">
//             <h4 className="font-heading text-xl text-[var(--color-brand-orange)] mb-2  lowercase tracking-widest">
//               About Us
//             </h4>
//             <h2 className="text-h2 font-heading text-[var(--color-black)] mb-6">
//               Redefining Body Art
//             </h2>
//             <p className="text-body text-gray-600 mb-10">
//               There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
//             </p>
            
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-[var(--color-primary)] text-[var(--color-white)] text-btn px-10 py-4 rounded-sm shadow-[var(--shadow-card)] hover:bg-[var(--color-secondary)] hover:shadow-xl transition-all duration-300"
//             >
//               Read Our Story
//             </motion.button>
//           </motion.div>

//         </motion.div>
//       </div>
//     </section>
//   );
// }


"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { PenTool, Target, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

// --- Animation Variants ---
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, duration: 0.8, ease: "easeOut" },
  },
};

const itemVariants : Variants= {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const featureData = [
  {
    id: 1,
    icon: PenTool,
    subtitle: "Tattooing",
    title: "DESIGN CURATION",
    description:
      "Our team helps curate and refine designs into high-fidelity temporary tattoos tailored to your exact style.",
  },
  {
    id: 2,
    icon: Target,
    subtitle: "Piercing",
    title: "PLACEMENT GUIDES",
    description:
      "Discover ideal temporary placement for maximum impact with our expert anatomical placement guides.",
  },
  {
    id: 3,
    icon: ImageIcon,
    subtitle: "Tattoo Design",
    title: "ARTIST PRINTS",
    description:
      "Submit your custom art or photos to create a one-of-a-kind temporary decal printed with premium ink.",
  },
];

export default function WhatWeDo() {
  return (
    <section className="relative w-full bg-[var(--color-white)] py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* --- Top Section: Features Grid --- */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center text-center mb-24 md:mb-32"
        >
          <motion.h2 variants={itemVariants} className="text-h2 font-heading mb-16 text-[var(--color-black)]">
            What We Do
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 w-full">
            {featureData.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="flex flex-col items-center group cursor-default"
                >
                  <div className="mb-6 text-[var(--color-brand-orange)] transition-transform duration-500 ease-out group-hover:scale-110">
                    <Icon strokeWidth={1.5} size={48} />
                  </div>
                  {/* /Cursive styled subtitle mapping to the mockup */}
                  <h4 className=" text-xl text-[var(--color-secondary)] opacity-80 mb-2 capitalize">
                    {feature.subtitle}
                  </h4>
                  <h3 className="text-h3 font-heading mb-4 text-[var(--color-black)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-body text-gray-600 max-w-[300px]">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* --- Bottom Section: About Us & Circular Image --- */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center"
        >
          {/* Left Side: Decorative Text & Image */}
          <motion.div 
            variants={itemVariants}
            className="relative w-full flex justify-center lg:justify-end lg:pr-12 z-10"
          >
            {/* Decorative Vertical Text */}
            <div className="absolute left-0 md:left-[-40px] top-1/2 -translate-y-1/2 -rotate-90 origin-center select-none pointer-events-none z-20">
              <span className="text-5xl md:text-6xl font-heading text-[var(--color-black)] tracking-widest whitespace-nowrap">
                JUST TATTOOS
              </span>
            </div>

            {/* Circular Image Container with Hard Offset Shadow */}
            <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] ml-12 md:ml-20">
              
              {/* The Hard Circular Shadow (Offset to bottom-right) */}
              <div className="absolute top-[8%] left-[8%] w-full h-full rounded-full bg-[var(--color-brand-orange)] shadow-xl -z-10 transition-transform duration-700 hover:translate-x-2 hover:translate-y-2"></div>
              
              {/* The Main Image Circle */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-[6px] border-[var(--color-white)] shadow-sm bg-gray-100 z-10">
                <Image
                  src="https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=1200&auto=format&fit=crop"
                  alt="Applying a temporary tattoo"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                  sizes="(max-width: 768px) 300px, 450px"
                />
              </div>

            </div>
          </motion.div>

          {/* Right Side: Text Content */}
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-xl mx-auto lg:mx-0 z-10">
            <h4 className=" text-3xl text-[var(--color-black)] mb-6 tracking-wide">
              About Us
            </h4>
            <p className="text-body text-gray-600 mb-10 leading-relaxed">
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-[var(--color-brand-orange)] to-[var(--color-primary)] text-[var(--color-white)] text-btn px-8 py-4 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300"
            >
              READ OUR STORY
            </motion.button>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}