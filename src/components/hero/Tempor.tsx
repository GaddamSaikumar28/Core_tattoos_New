
// // // // // // // // // "use client";

// // // // // // // // // import React from "react";
// // // // // // // // // import { motion, Variants } from "framer-motion";
// // // // // // // // // import Image from "next/image";

// // // // // // // // // // --- Mock Data ---
// // // // // // // // // // Removed manual rotation/translate logic to handle it dynamically via 3D mapping
// // // // // // // // // const GALLERY_IMAGES = [
// // // // // // // // //   {
// // // // // // // // //     id: 1,
// // // // // // // // //     src: "/assets/images/Card1.png",
// // // // // // // // //     alt: "Spider tattoo blackwork",
// // // // // // // // //   },
// // // // // // // // //   {
// // // // // // // // //     id: 2,
// // // // // // // // //     src: "/assets/images/Card2.png",
// // // // // // // // //     alt: "Snake and dagger tattoo",
// // // // // // // // //   },
// // // // // // // // //   {
// // // // // // // // //     id: 3,
// // // // // // // // //     src: "/assets/images/Card3.png",
// // // // // // // // //     alt: "Tattoo artist portrait",
// // // // // // // // //   },
// // // // // // // // //   {
// // // // // // // // //     id: 4,
// // // // // // // // //     src: "/assets/images/Card4.png",
// // // // // // // // //     alt: "Spiked flail leg tattoo",
// // // // // // // // //   },
// // // // // // // // //   {
// // // // // // // // //     id: 5,
// // // // // // // // //     src: "/assets/images/Card5.png",
// // // // // // // // //     alt: "Skull and crossbones tattoo",
// // // // // // // // //   },
// // // // // // // // //   {
// // // // // // // // //     id: 6,
// // // // // // // // //     src: "/assets/images/Card6.png",
// // // // // // // // //     alt: "Skull and crossbones tattoo",
// // // // // // // // //   },
// // // // // // // // //   {
// // // // // // // // //     id: 7,
// // // // // // // // //     src: "/assets/images/Card7.png",
// // // // // // // // //     alt: "Skull and crossbones tattoo",
// // // // // // // // //   },
// // // // // // // // // ];

// // // // // // // // // // --- 3D Configuration Generator ---
// // // // // // // // // // Maps each index to its precise 3D spatial properties
// // // // // // // // // const getCardConfig = (index: number) => {
// // // // // // // // //   const configs: Record<number, any> = {
// // // // // // // // //     0: { x: "-275%",  scale: 1, rotateY: 38, z: 100, zIndex: 30, opacity: 0.8 },
// // // // // // // // //     1: { x: "-170%", scale: 0.84, rotateY: 28, z: 100, zIndex: 30, opacity: 0.8 },  // Far Left
// // // // // // // // //     2: { x: "-85%", scale: 0.82, rotateY: 12, z: 50, zIndex: 20, opacity: 0.95 },  // Mid Left
// // // // // // // // //     3: { x: "0%",    scale: 0.8,    rotateY: 0,  z: 0, zIndex: 10, opacity: 1 },      // Center
// // // // // // // // //     4: { x: "85%",  scale: 0.82, rotateY: -12, z: 50, zIndex: 20, opacity: 0.95 }, // Mid Right
// // // // // // // // //     5: { x: "170%",  scale: 0.84, rotateY: -28, z: 100, zIndex: 30, opacity: 0.8 }, // Far Right
// // // // // // // // //     6: { x: "275%",  scale: 1, rotateY: -38, z: 100, zIndex: 30, opacity: 0.8 },
// // // // // // // // //   };
// // // // // // // // //   return configs[index] || configs[2];
// // // // // // // // // };

// // // // // // // // // // --- Animation Variants ---
// // // // // // // // // const containerVariants: Variants = {
// // // // // // // // //   hidden: { opacity: 0 },
// // // // // // // // //   visible: {
// // // // // // // // //     opacity: 1,
// // // // // // // // //     transition: { staggerChildren: 0.15, delayChildren: 0.1 },
// // // // // // // // //   },
// // // // // // // // // };

// // // // // // // // // const textVariants: Variants = {
// // // // // // // // //   hidden: { opacity: 0, y: 20 },
// // // // // // // // //   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
// // // // // // // // // };

// // // // // // // // // export default function HeroSection() {
// // // // // // // // //   return (
// // // // // // // // //     <section
// // // // // // // // //       className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-start pt-28 pb-12 bg-[#0a0a0a]"
// // // // // // // // //     >
// // // // // // // // //       {/* Background Smoke / Glow Effects */}
    //   <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center z-0">
    //     <div className="absolute top-[-15%] w-[90%] h-[60%] bg-white/5 blur-[140px] rounded-full" />
    //     <div
    //       className="absolute inset-0 opacity-30 mix-blend-overlay"
    //       style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}
    //     />
    //   </div>

// // // // // // // // //       <motion.div
// // // // // // // // //         className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-7xl mx-auto"
// // // // // // // // //         variants={containerVariants}
// // // // // // // // //         initial="hidden"
// // // // // // // // //         animate="visible"
// // // // // // // // //       >
// // // // // // // // //         {/* --- Hero Typography --- */}
// // // // // // // // //         <motion.h3
// // // // // // // // //           variants={textVariants}
// // // // // // // // //           // Using font-serif here as the mockup clearly utilizes a clean, premium serif font
// // // // // // // // //           className="font-serif text-[#f4f4f4] tracking-tight leading-[1]"
// // // // // // // // //           style={{ fontSize: "clamp(2.5rem, 5vw + 1rem, 5.5rem)" }}
// // // // // // // // //         >
// // // // // // // // //           The Kind of Tattoo <br className="hidden md:block" />
// // // // // // // // //           You Won&apos;t Regret.
// // // // // // // // //         </motion.h3>

// // // // // // // // //         <motion.p
// // // // // // // // //           variants={textVariants}
// // // // // // // // //           className="text-base sm:text-lg text-white/70 max-w-lg mx-auto  font-light"
// // // // // // // // //         >
// // // // // // // // //           Exclusive blackwork tattoos by appointment-only. <br className="hidden sm:block" />
// // // // // // // // //           Where clean design meets permanent art.
// // // // // // // // //         </motion.p>

// // // // // // // // //         {/* --- Interactive Concave 3D Gallery --- */}
// // // // // // // // //         <div
// // // // // // // // //           className="relative w-full max-w-[1400px] h-[350px] sm:h-[450px] md:h-[500px] flex justify-center items-center mb-16"
// // // // // // // // //           style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
// // // // // // // // //         >
// // // // // // // // //           {GALLERY_IMAGES.map((img, index) => {
// // // // // // // // //             const config = getCardConfig(index);

// // // // // // // // //             return (
// // // // // // // // //               <motion.div
// // // // // // // // //                 key={img.id}
// // // // // // // // //                 custom={index}
// // // // // // // // //                 initial={{ opacity: 0, y: 100, scale: 0.8 }}
// // // // // // // // //                 animate={{
// // // // // // // // //                   opacity: config.opacity,
// // // // // // // // //                   x: config.x,
// // // // // // // // //                   y: 0,
// // // // // // // // //                   scale: config.scale,
// // // // // // // // //                   rotateY: config.rotateY,
// // // // // // // // //                   z: config.z,
// // // // // // // // //                   transition: {
// // // // // // // // //                     duration: 1.2,
// // // // // // // // //                     ease: [0.16, 1, 0.3, 1],
// // // // // // // // //                     delay: index * 0.1,
// // // // // // // // //                   },
// // // // // // // // //                 }}
// // // // // // // // //                 whileHover={{
// // // // // // // // //                   scale: config.scale + 0.05,
// // // // // // // // //                   y: -15,
// // // // // // // // //                   opacity: 1,
// // // // // // // // //                   transition: { duration: 0.4, ease: "easeOut" },
// // // // // // // // //                 }}
// // // // // // // // //                 className="absolute origin-center cursor-pointer shadow-2xl rounded-[25px] overflow-hidden border border-[#fe8204]/5 bg-black/40 backdrop-blur-sm group"
// // // // // // // // //                 style={{
// // // // // // // // //                   zIndex: config.zIndex,
// // // // // // // // //                   // Base dimensions. Framer Motion scales these up visually via the config!
// // // // // // // // //                   width: "clamp(160px, 18vw, 260px)",
// // // // // // // // //                   height: "clamp(260px, 28vw, 400px)",
// // // // // // // // //                 }}
// // // // // // // // //               >
// // // // // // // // //                 {/* Image Gradient Overlay for blending */}
// // // // // // // // //                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-70 group-hover:opacity-20 transition-opacity duration-500" />
                
// // // // // // // // //                 <Image
// // // // // // // // //                   src={img.src}
// // // // // // // // //                   alt={img.alt}
// // // // // // // // //                   fill
// // // // // // // // //                   className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
// // // // // // // // //                   sizes="(max-width: 768px) 50vw, 25vw"
// // // // // // // // //                   priority={index === 2}
// // // // // // // // //                 />
// // // // // // // // //               </motion.div>
// // // // // // // // //             );
// // // // // // // // //           })}
// // // // // // // // //         </div>

// // // // // // // // //         {/* --- Call To Actions --- */}
// // // // // // // // //         <motion.div
// // // // // // // // //           variants={textVariants}
// // // // // // // // //           className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 z-20 relative"
// // // // // // // // //         >
// // // // // // // // //           <button className="bg-[#f4f4f4] text-black font-medium px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300">
// // // // // // // // //             Book an Appointment
// // // // // // // // //           </button>

// // // // // // // // //           <button className="bg-transparent text-white border border-white/20 px-8 py-3.5 rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300">
// // // // // // // // //             View The Flash Book
// // // // // // // // //           </button>
// // // // // // // // //         </motion.div>
// // // // // // // // //       </motion.div>

// // // // // // // // //       {/* Heavy bottom fade to ground the cards in the background, replicating mockup */}
// // // // // // // // //       <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none z-20" />
// // // // // // // // //     </section>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // "use client";

// // // // // // // // import React from "react";
// // // // // // // // import { motion, Variants } from "framer-motion";
// // // // // // // // import Image from "next/image";

// // // // // // // // // --- Mock Data ---
// // // // // // // // const GALLERY_IMAGES = [
// // // // // // // //   { id: 1, src: "/assets/images/Card1.png", alt: "Spider tattoo blackwork" },
// // // // // // // //   { id: 2, src: "/assets/images/Card2.png", alt: "Snake and dagger tattoo" },
// // // // // // // //   { id: 3, src: "/assets/images/Card3.png", alt: "Tattoo artist portrait" },
// // // // // // // //   { id: 4, src: "/assets/images/Card4.png", alt: "Spiked flail leg tattoo" },
// // // // // // // //   { id: 5, src: "/assets/images/Card5.png", alt: "Skull and crossbones tattoo" },
// // // // // // // //   { id: 6, src: "/assets/images/Card6.png", alt: "Skull and crossbones tattoo" },
// // // // // // // //   { id: 7, src: "/assets/images/Card7.png", alt: "Skull and crossbones tattoo" },
// // // // // // // // ];

// // // // // // // // // --- 3D Configuration Generator ---
// // // // // // // // // Spacing updated to accommodate slightly smaller card sizes
// // // // // // // // const getCardConfig = (index: number) => {
// // // // // // // //   const configs: Record<number, any> = {
// // // // // // // //     0: { x: "-270%", scale: 1,    rotateY: 38,  z: 100, zIndex: 30, opacity: 0.8 },
// // // // // // // //     1: { x: "-170%", scale: 0.84, rotateY: 28,  z: 100, zIndex: 30, opacity: 0.8 },
// // // // // // // //     2: { x: "-85%",  scale: 0.82, rotateY: 12,  z: 50,  zIndex: 20, opacity: 0.95 },
// // // // // // // //     3: { x: "0%",    scale: 0.8,  rotateY: 0,   z: 0,   zIndex: 10, opacity: 1 },
// // // // // // // //     4: { x: "85%",   scale: 0.82, rotateY: -12, z: 50,  zIndex: 20, opacity: 0.95 },
// // // // // // // //     5: { x: "170%",  scale: 0.84, rotateY: -28, z: 100, zIndex: 30, opacity: 0.8 },
// // // // // // // //     6: { x: "270%",  scale: 1,    rotateY: -38, z: 100, zIndex: 30, opacity: 0.8 },
// // // // // // // //   };
// // // // // // // //   return configs[index] || configs[3];
// // // // // // // // };

// // // // // // // // // --- Animation Variants ---
// // // // // // // // const containerVariants: Variants = {
// // // // // // // //   hidden: { opacity: 0 },
// // // // // // // //   visible: {
// // // // // // // //     opacity: 1,
// // // // // // // //     transition: { staggerChildren: 0.15, delayChildren: 0.1 },
// // // // // // // //   },
// // // // // // // // };

// // // // // // // // const textVariants: Variants = {
// // // // // // // //   hidden: { opacity: 0, y: 20 },
// // // // // // // //   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
// // // // // // // // };

// // // // // // // // export default function HeroSection() {
// // // // // // // //   return (
// // // // // // // //     <section
// // // // // // // //       // Updated to a black-to-orange gradient and centered the content
// // // // // // // //       className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden flex flex-col items-center justify-center py-12 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-[#fe8204]/20"
// // // // // // // //     >
// // // // // // // //       {/* Background Smoke / Glow Effects */}
// // // // // // // //       <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center z-0">
// // // // // // // //         <div className="absolute top-[-15%] w-[90%] h-[60%] bg-[#fe8204]/10 blur-[140px] rounded-full" />
// // // // // // // //         <div
// // // // // // // //           className="absolute inset-0 opacity-30 mix-blend-overlay"
// // // // // // // //         //   style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}
// // // // // // // //         />
// // // // // // // //       </div>

// // // // // // // //       <motion.div
// // // // // // // //         className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-7xl mx-auto"
// // // // // // // //         variants={containerVariants}
// // // // // // // //         initial="hidden"
// // // // // // // //         animate="visible"
// // // // // // // //       >
// // // // // // // //         {/* --- Hero Typography --- */}
// // // // // // // //         <motion.h3
// // // // // // // //           variants={textVariants}
// // // // // // // //           // Using font-serif here as the mockup clearly utilizes a clean, premium serif font
// // // // // // // //           className="font-serif text-[#f4f4f4] tracking-tight leading-[1]"
// // // // // // // //           style={{ fontSize: "clamp(2rem, 5vw + 1rem, 5rem)" }}
// // // // // // // //         >
// // // // // // // //           Real Ink <br className="hidden md:block" />
// // // // // // // //           You Way.
// // // // // // // //         </motion.h3>

// // // // // // // //         <motion.p
// // // // // // // //           variants={textVariants}
// // // // // // // //           className="text-base sm:text-lg text-white/70   font-light"
// // // // // // // //         >
// // // // // // // //           <span className="text-[14px] leading-[1.6]">Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically tested, permanent ink sinks into the top layer of your skin, fully developing into a bold, </span>
// // // // // // // //           <span className="text-[#FE8204] text-[14px] leading-[1.6]">realistic design within 24 hours.</span>
// // // // // // // //         </motion.p>

// // // // // // // //         {/* --- Interactive Concave 3D Gallery --- */}
// // // // // // // //         <div
// // // // // // // //           className="relative w-full max-w-[1400px] h-[300px] sm:h-[400px] md:h-[450px] flex justify-center items-center mb-16"
// // // // // // // //           style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
// // // // // // // //         >
// // // // // // // //           {GALLERY_IMAGES.map((img, index) => {
// // // // // // // //             const config = getCardConfig(index);

// // // // // // // //             return (
// // // // // // // //               <motion.div
// // // // // // // //                 key={img.id}
// // // // // // // //                 custom={index}
// // // // // // // //                 initial={{ opacity: 0, y: 100, scale: 0.8 }}
// // // // // // // //                 animate={{
// // // // // // // //                   opacity: config.opacity,
// // // // // // // //                   x: config.x,
// // // // // // // //                   y: 0,
// // // // // // // //                   scale: config.scale,
// // // // // // // //                   rotateY: config.rotateY,
// // // // // // // //                   z: config.z,
// // // // // // // //                   transition: {
// // // // // // // //                     duration: 1.2,
// // // // // // // //                     ease: [0.16, 1, 0.3, 1],
// // // // // // // //                     delay: index * 0.1,
// // // // // // // //                   },
// // // // // // // //                 }}
// // // // // // // //                 whileHover={{
// // // // // // // //                   scale: config.scale + 0.05,
// // // // // // // //                   y: -15,
// // // // // // // //                   opacity: 1,
// // // // // // // //                   transition: { duration: 0.4, ease: "easeOut" },
// // // // // // // //                 }}
// // // // // // // //                 // Added visible orange border
// // // // // // // //                 className="absolute origin-center cursor-pointer shadow-2xl rounded-[20px] overflow-hidden border border-[#fe8204]/40 hover:border-[#fe8204] bg-black/40 backdrop-blur-sm group"
// // // // // // // //                 style={{
// // // // // // // //                   zIndex: config.zIndex,
// // // // // // // //                   // Reduced card dimensions here so they fit better without overlapping heavily
// // // // // // // //                   width: "clamp(130px, 15vw, 220px)",
// // // // // // // //                   height: "clamp(200px, 24vw, 340px)",
// // // // // // // //                 }}
// // // // // // // //               >
// // // // // // // //                 {/* Image Gradient Overlay for blending */}
// // // // // // // //                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-70 group-hover:opacity-20 transition-opacity duration-500" />
                
// // // // // // // //                 <Image
// // // // // // // //                   src={img.src}
// // // // // // // //                   alt={img.alt}
// // // // // // // //                   fill
// // // // // // // //                   className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
// // // // // // // //                   sizes="(max-width: 768px) 30vw, 20vw"
// // // // // // // //                   priority={index === 3} // Center image priority
// // // // // // // //                 />
// // // // // // // //               </motion.div>
// // // // // // // //             );
// // // // // // // //           })}
// // // // // // // //         </div>

// // // // // // // //         {/* --- Call To Actions --- */}
// // // // // // // //         <motion.div
// // // // // // // //           variants={textVariants}
// // // // // // // //           className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 z-20 relative"
// // // // // // // //         >
// // // // // // // //           <button className="bg-[#f4f4f4] text-black font-medium px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300">
// // // // // // // //             Book an Appointment
// // // // // // // //           </button>

// // // // // // // //           <button className="bg-transparent text-white border border-[#fe8204]/50 px-8 py-3.5 rounded-full backdrop-blur-sm hover:bg-[#fe8204]/20 hover:border-[#fe8204] transition-all duration-300">
// // // // // // // //             View The Flash Book
// // // // // // // //           </button>
// // // // // // // //         </motion.div>
// // // // // // // //       </motion.div>

// // // // // // // //       {/* Grounding bottom fade */}
// // // // // // // //       {/* <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#000] via-[#fe8204]/80 to-transparent pointer-events-none z-20" /> */}
// // // // // // // //     </section>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // "use client";

// // // // // // // // import React from "react";
// // // // // // // // import { motion, Variants } from "framer-motion";
// // // // // // // // import Image from "next/image";
// // // // // // // // import { cn } from "../../lib/utils"; // Ensure this path matches your utils.js file

// // // // // // // // // --- Mock Data ---
// // // // // // // // const GALLERY_IMAGES = [
// // // // // // // //   { id: 1, src: "/assets/images/Card1.png", alt: "Spider tattoo blackwork" },
// // // // // // // //   { id: 2, src: "/assets/images/Card2.png", alt: "Snake and dagger tattoo" },
// // // // // // // //   { id: 3, src: "/assets/images/Card3.png", alt: "Tattoo artist portrait" },
// // // // // // // //   { id: 4, src: "/assets/images/Card4.png", alt: "Spiked flail leg tattoo" },
// // // // // // // //   { id: 5, src: "/assets/images/Card5.png", alt: "Skull and crossbones tattoo" },
// // // // // // // //   { id: 6, src: "/assets/images/Card6.png", alt: "Skull and crossbones tattoo" },
// // // // // // // //   { id: 7, src: "/assets/images/Card7.png", alt: "Skull and crossbones tattoo" },
// // // // // // // // ];

// // // // // // // // // --- 3D Configuration Generator ---
// // // // // // // // const getCardConfig = (index: number) => {
// // // // // // // //   const configs: Record<number, any> = {
// // // // // // // //     0: { x: "-270%", scale: 1,    rotateY: 38,  z: 100, zIndex: 30, opacity: 0.8 },
// // // // // // // //     1: { x: "-170%", scale: 0.84, rotateY: 28,  z: 100, zIndex: 30, opacity: 0.8 },
// // // // // // // //     2: { x: "-85%",  scale: 0.82, rotateY: 12,  z: 50,  zIndex: 20, opacity: 0.95 },
// // // // // // // //     3: { x: "0%",    scale: 0.8,  rotateY: 0,   z: 0,   zIndex: 10, opacity: 1 },
// // // // // // // //     4: { x: "85%",   scale: 0.82, rotateY: -12, z: 50,  zIndex: 20, opacity: 0.95 },
// // // // // // // //     5: { x: "170%",  scale: 0.84, rotateY: -28, z: 100, zIndex: 30, opacity: 0.8 },
// // // // // // // //     6: { x: "270%",  scale: 1,    rotateY: -38, z: 100, zIndex: 30, opacity: 0.8 },
// // // // // // // //   };
// // // // // // // //   return configs[index] || configs[3];
// // // // // // // // };

// // // // // // // // // --- Animation Variants ---
// // // // // // // // const containerVariants: Variants = {
// // // // // // // //   hidden: { opacity: 0 },
// // // // // // // //   visible: {
// // // // // // // //     opacity: 1,
// // // // // // // //     transition: { staggerChildren: 0.15, delayChildren: 0.1 },
// // // // // // // //   },
// // // // // // // // };

// // // // // // // // const textVariants: Variants = {
// // // // // // // //   hidden: { opacity: 0, y: 20 },
// // // // // // // //   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
// // // // // // // // };

// // // // // // // // export default function HeroSection() {
// // // // // // // //   return (
// // // // // // // //     <section
// // // // // // // //       // Changed to justify-center to properly center the entire block vertically
// // // // // // // //       className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden flex flex-col items-center justify-center py-10 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#d4bca9]"
// // // // // // // //     >
// // // // // // // //       {/* Background Smoke / Glow Effects */}
// // // // // // // //       <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center z-0">
// // // // // // // //         <div className="absolute top-[-15%] w-[90%] h-[60%] bg-[var(--color-brand-orange)]/10 blur-[140px] rounded-full" />
// // // // // // // //       </div>

// // // // // // // //       <motion.div
// // // // // // // //         // Kept items-center, removed forced pt-10
// // // // // // // //         className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto"
// // // // // // // //         variants={containerVariants}
// // // // // // // //         initial="hidden"
// // // // // // // //         animate="visible"
// // // // // // // //       >
// // // // // // // //         {/* --- Hero Typography --- */}
// // // // // // // //         <div className="flex flex-col items-center justify-center mb-10 md:mb-12">
// // // // // // // //           <motion.h1
// // // // // // // //             variants={textVariants}
// // // // // // // //             className={cn(
// // // // // // // //               // Using font-heading for the correct client font, but overriding the massive text-hero size
// // // // // // // //               "font-heading text-white tracking-tight leading-[1.05] z-10",
// // // // // // // //               "text-[clamp(3rem,6vw,5.5rem)]" 
// // // // // // // //             )}
// // // // // // // //           >
// // // // // // // //             REAL INK <br className="hidden md:block" />
// // // // // // // //             YOU WAY.
// // // // // // // //           </motion.h1>

// // // // // // // //           <motion.p
// // // // // // // //             variants={textVariants}
// // // // // // // //             className={cn(
// // // // // // // //               // Using text-body for the client's Montserrat paragraph font
// // // // // // // //               "text-body text-white/70 max-w-3xl mt-5 z-10 leading-relaxed"
// // // // // // // //             )}
// // // // // // // //           >
// // // // // // // //             Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically tested, permanent ink sinks into the top layer of your skin, fully developing into a bold,{" "}
// // // // // // // //             <span className="text-[var(--color-brand-orange)] font-medium">realistic design within 24 hours.</span>
// // // // // // // //           </motion.p>
// // // // // // // //         </div>

// // // // // // // //         {/* --- Interactive Concave 3D Gallery --- */}
// // // // // // // //         <div
// // // // // // // //           // Adjusted height slightly and ensured it centers nicely between text and buttons
// // // // // // // //           className="relative w-full max-w-[1400px] h-[280px] sm:h-[350px] md:h-[400px] flex justify-center items-center mb-12 z-20"
// // // // // // // //           style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
// // // // // // // //         >
// // // // // // // //           {GALLERY_IMAGES.map((img, index) => {
// // // // // // // //             const config = getCardConfig(index);

// // // // // // // //             return (
// // // // // // // //               <motion.div
// // // // // // // //                 key={img.id}
// // // // // // // //                 custom={index}
// // // // // // // //                 initial={{ opacity: 0, y: 100, scale: 0.8 }}
// // // // // // // //                 animate={{
// // // // // // // //                   opacity: config.opacity,
// // // // // // // //                   x: config.x,
// // // // // // // //                   y: 0,
// // // // // // // //                   scale: config.scale,
// // // // // // // //                   rotateY: config.rotateY,
// // // // // // // //                   z: config.z,
// // // // // // // //                   transition: {
// // // // // // // //                     duration: 1.2,
// // // // // // // //                     ease: [0.16, 1, 0.3, 1],
// // // // // // // //                     delay: index * 0.1,
// // // // // // // //                   },
// // // // // // // //                 }}
// // // // // // // //                 whileHover={{
// // // // // // // //                   scale: config.scale + 0.05,
// // // // // // // //                   y: -15,
// // // // // // // //                   opacity: 1,
// // // // // // // //                   transition: { duration: 0.4, ease: "easeOut" },
// // // // // // // //                 }}
// // // // // // // //                 className="absolute origin-center cursor-pointer shadow-2xl rounded-[20px] overflow-hidden border border-[var(--color-brand-orange)]/30 hover:border-[var(--color-brand-orange)] bg-black/40 backdrop-blur-sm group"
// // // // // // // //                 style={{
// // // // // // // //                   zIndex: config.zIndex,
// // // // // // // //                   width: "clamp(140px, 16vw, 220px)",
// // // // // // // //                   height: "clamp(200px, 25vw, 340px)",
// // // // // // // //                 }}
// // // // // // // //               >
// // // // // // // //                 {/* Image Gradient Overlay for blending */}
// // // // // // // //                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-10 transition-opacity duration-500" />
                
// // // // // // // //                 <Image
// // // // // // // //                   src={img.src}
// // // // // // // //                   alt={img.alt}
// // // // // // // //                   fill
// // // // // // // //                   className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
// // // // // // // //                   sizes="(max-width: 768px) 30vw, 20vw"
// // // // // // // //                   priority={index === 3}
// // // // // // // //                 />
// // // // // // // //               </motion.div>
// // // // // // // //             );
// // // // // // // //           })}
// // // // // // // //         </div>

// // // // // // // //         {/* --- Call To Actions --- */}
// // // // // // // //         <motion.div
// // // // // // // //           variants={textVariants}
// // // // // // // //           className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 z-30 relative"
// // // // // // // //         >
// // // // // // // //           <button 
// // // // // // // //             className={cn(
// // // // // // // //               "font-[family-name:var(--font-montserrat)] bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 text-sm md:text-base"
// // // // // // // //             )}
// // // // // // // //           >
// // // // // // // //             Book an Appointment
// // // // // // // //           </button>

// // // // // // // //           <button 
// // // // // // // //             className={cn(
// // // // // // // //               "font-[family-name:var(--font-montserrat)] bg-transparent text-white/80 border border-white/30 px-8 py-3.5 rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white transition-all duration-300 text-sm md:text-base"
// // // // // // // //             )}
// // // // // // // //           >
// // // // // // // //             View The Flash Book
// // // // // // // //           </button>
// // // // // // // //         </motion.div>
// // // // // // // //       </motion.div>
// // // // // // // //     </section>
// // // // // // // //   );
// // // // // // // // }

// // // "use client";

// // // import React from "react";
// // // import { motion, Variants } from "framer-motion";
// // // import Image from "next/image";
// // // import { cn } from "../../lib/utils"; // Ensure this path matches your utils.js file

// // // // --- Mock Data ---
// // // const GALLERY_IMAGES = [
// // //   { id: 1, src: "/assets/images/Card1.png", alt: "Spider tattoo blackwork" },
// // //   { id: 2, src: "/assets/images/Card2.png", alt: "Snake and dagger tattoo" },
// // //   { id: 3, src: "/assets/images/Card3.png", alt: "Tattoo artist portrait" },
// // //   { id: 4, src: "/assets/images/Card4.png", alt: "Spiked flail leg tattoo" },
// // //   { id: 5, src: "/assets/images/Card5.png", alt: "Skull and crossbones tattoo" },
// // //   { id: 6, src: "/assets/images/Card6.png", alt: "Skull and crossbones tattoo" },
// // //   { id: 7, src: "/assets/images/Card7.png", alt: "Skull and crossbones tattoo" },
// // // ];

// // // // --- 3D Configuration Generator ---
// // // const getCardConfig = (index: number) => {
// // //   const configs: Record<number, any> = {
// // //     0: { x: "-270%", scale: 1,    rotateY: 38,  z: 100, zIndex: 30, opacity: 0.8 },
// // //     1: { x: "-170%", scale: 0.84, rotateY: 28,  z: 100, zIndex: 30, opacity: 0.8 },
// // //     2: { x: "-85%",  scale: 0.82, rotateY: 12,  z: 50,  zIndex: 20, opacity: 0.95 },
// // //     3: { x: "0%",    scale: 0.8,  rotateY: 0,   z: 0,   zIndex: 10, opacity: 1 },
// // //     4: { x: "85%",   scale: 0.82, rotateY: -12, z: 50,  zIndex: 20, opacity: 0.95 },
// // //     5: { x: "170%",  scale: 0.84, rotateY: -28, z: 100, zIndex: 30, opacity: 0.8 },
// // //     6: { x: "270%",  scale: 1,    rotateY: -38, z: 100, zIndex: 30, opacity: 0.8 },
// // //   };
// // //   return configs[index] || configs[3];
// // // };

// // // // --- Animation Variants ---
// // // const containerVariants: Variants = {
// // //   hidden: { opacity: 0 },
// // //   visible: {
// // //     opacity: 1,
// // //     transition: { staggerChildren: 0.15, delayChildren: 0.1 },
// // //   },
// // // };

// // // const textVariants: Variants = {
// // //   hidden: { opacity: 0, y: 20 },
// // //   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
// // // };

// // // export default function HeroSection() {
// // //   return (
// // //     <section
// // //       // Changed to min-h-screen and replaced py-10 with pt-32 pb-10 to clear the 96px header
// // //       className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center pt-32 pb-10 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#d4bca9]"
// // //     >
// // //       {/* Background Smoke / Glow Effects */}
// // //       <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center z-0">
// // //         <div className="absolute top-[-15%] w-[90%] h-[60%] bg-[var(--color-brand-orange)]/10 blur-[140px] rounded-full" />
// // //       </div>

// // //       <motion.div
// // //         className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto flex-1"
// // //         variants={containerVariants}
// // //         initial="hidden"
// // //         animate="visible"
// // //       >
// // //         {/* --- Hero Typography --- */}
// // //         <div className="flex flex-col items-center justify-center">
// // //           <motion.h1
// // //             variants={textVariants}
// // //             className={cn(
// // //               "font-heading text-white tracking-tight z-10 flex flex-col text-left",
// // //               "text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]" 
// // //             )}
// // //           >
// // //             <span>REAL INK</span>
// // //             <span className="ml-[1.6em]">YOUR WAY.</span>
// // //           </motion.h1>

// // //           <motion.p
// // //             variants={textVariants}
// // //             className={cn(
// // //               "text-body text-white/70 max-w-3xl mt-4 z-10 leading-relaxed"
// // //             )}
// // //           >
// // //             Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically tested, permanent ink sinks into the top layer of your skin, fully developing into a bold,{" "}
// // //             <span className="text-[var(--color-brand-orange)] font-medium">realistic design within 24 hours.</span>
// // //           </motion.p>
// // //         </div>

// // //         {/* --- Interactive Concave 3D Gallery --- */}
// // //         <div
// // //           className="relative w-full max-w-[1400px] h-[280px] sm:h-[350px] md:h-[400px] flex justify-center items-center mb-12 z-20"
// // //           style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
// // //         >
// // //           {GALLERY_IMAGES.map((img, index) => {
// // //             const config = getCardConfig(index);

// // //             return (
// // //               <motion.div
// // //                 key={img.id}
// // //                 custom={index}
// // //                 initial={{ opacity: 0, y: 100, scale: 0.8 }}
// // //                 animate={{
// // //                   opacity: config.opacity,
// // //                   x: config.x,
// // //                   y: 0,
// // //                   scale: config.scale,
// // //                   rotateY: config.rotateY,
// // //                   z: config.z,
// // //                   transition: {
// // //                     duration: 1.2,
// // //                     ease: [0.16, 1, 0.3, 1],
// // //                     delay: index * 0.1,
// // //                   },
// // //                 }}
// // //                 whileHover={{
// // //                   scale: config.scale + 0.05,
// // //                   y: -15,
// // //                   opacity: 1,
// // //                   transition: { duration: 0.4, ease: "easeOut" },
// // //                 }}
// // //                 className="absolute origin-center cursor-pointer shadow-2xl rounded-[20px] overflow-hidden border border-[var(--color-brand-orange)]/30 hover:border-[var(--color-brand-orange)] bg-black/40 backdrop-blur-sm group"
// // //                 style={{
// // //                   zIndex: config.zIndex,
// // //                   width: "clamp(140px, 16vw, 220px)",
// // //                   height: "clamp(200px, 25vw, 340px)",
// // //                 }}
// // //               >
// // //                 {/* Image Gradient Overlay for blending */}
// // //                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-10 transition-opacity duration-500" />
                
// // //                 <Image
// // //                   src={img.src}
// // //                   alt={img.alt}
// // //                   fill
// // //                   className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
// // //                   sizes="(max-width: 768px) 30vw, 20vw"
// // //                   priority={index === 3}
// // //                 />
// // //               </motion.div>
// // //             );
// // //           })}
// // //         </div>

// // //         {/* --- Call To Actions --- */}
// // //         <motion.div
// // //           variants={textVariants}
// // //           className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 z-30 relative mt-auto md:mt-0"
// // //         >
// // //           <button 
// // //             className={cn(
// // //               "font-[family-name:var(--font-montserrat)] bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 text-sm md:text-base"
// // //             )}
// // //           >
// // //             Book an Appointment
// // //           </button>

// // //           <button 
// // //             className={cn(
// // //               "font-[family-name:var(--font-montserrat)] bg-transparent text-white/80 border border-white/30 px-8 py-3.5 rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white transition-all duration-300 text-sm md:text-base"
// // //             )}
// // //           >
// // //             View The Flash Book
// // //           </button>
// // //         </motion.div>
// // //       </motion.div>
// // //     </section>
// // //   );
// // // }

// // // // // // // "use client";

// // // // // // // import React, { useState, useEffect, useCallback } from "react";
// // // // // // // import { motion, Variants } from "framer-motion";
// // // // // // // import Image from "next/image";
// // // // // // // import { cn } from "../../lib/utils"; // Ensure this path matches your utils.js file

// // // // // // // // --- Mock Data ---
// // // // // // // const GALLERY_IMAGES = [
// // // // // // //   { id: 1, src: "/assets/images/Card1.png", alt: "Spider tattoo blackwork" },
// // // // // // //   { id: 2, src: "/assets/images/Card2.png", alt: "Snake and dagger tattoo" },
// // // // // // //   { id: 3, src: "/assets/images/Card3.png", alt: "Tattoo artist portrait" },
// // // // // // //   { id: 4, src: "/assets/images/Card4.png", alt: "Spiked flail leg tattoo" },
// // // // // // //   { id: 5, src: "/assets/images/Card5.png", alt: "Skull and crossbones tattoo" },
// // // // // // //   { id: 6, src: "/assets/images/Card6.png", alt: "Skull and crossbones tattoo" },
// // // // // // //   { id: 7, src: "/assets/images/Card7.png", alt: "Skull and crossbones tattoo" },
// // // // // // // ];

// // // // // // // // --- 3D Configuration Generator ---
// // // // // // // const getCardConfig = (index: number) => {
// // // // // // //   const configs: Record<number, any> = {
// // // // // // //     0: { x: "-270%", scale: 1,    rotateY: 38,  z: 100, zIndex: 30, opacity: 0.8 },
// // // // // // //     1: { x: "-170%", scale: 0.84, rotateY: 28,  z: 100, zIndex: 30, opacity: 0.8 },
// // // // // // //     2: { x: "-85%",  scale: 0.82, rotateY: 12,  z: 50,  zIndex: 20, opacity: 0.95 },
// // // // // // //     3: { x: "0%",    scale: 0.8,  rotateY: 0,   z: 0,   zIndex: 10, opacity: 1 },
// // // // // // //     4: { x: "85%",   scale: 0.82, rotateY: -12, z: 50,  zIndex: 20, opacity: 0.95 },
// // // // // // //     5: { x: "170%",  scale: 0.84, rotateY: -28, z: 100, zIndex: 30, opacity: 0.8 },
// // // // // // //     6: { x: "270%",  scale: 1,    rotateY: -38, z: 100, zIndex: 30, opacity: 0.8 },
// // // // // // //   };
// // // // // // //   return configs[index];
// // // // // // // };

// // // // // // // // --- Animation Variants ---
// // // // // // // const containerVariants: Variants = {
// // // // // // //   hidden: { opacity: 0 },
// // // // // // //   visible: {
// // // // // // //     opacity: 1,
// // // // // // //     transition: { staggerChildren: 0.15, delayChildren: 0.1 },
// // // // // // //   },
// // // // // // // };

// // // // // // // const textVariants: Variants = {
// // // // // // //   hidden: { opacity: 0, y: 20 },
// // // // // // //   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
// // // // // // // };

// // // // // // // export default function HeroSection() {
// // // // // // //   const [activeIndex, setActiveIndex] = useState(0);
// // // // // // //   const totalCards = GALLERY_IMAGES.length;

// // // // // // //   // --- Navigation Handlers ---
// // // // // // //   const handleNext = useCallback(() => {
// // // // // // //     setActiveIndex((prev) => (prev + 1) % totalCards);
// // // // // // //   }, [totalCards]);

// // // // // // //   const handlePrev = useCallback(() => {
// // // // // // //     setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
// // // // // // //   }, [totalCards]);

// // // // // // //   // --- Auto-Rotation (Optional) ---
// // // // // // //   // Automatically rotates the carousel every 4 seconds.
// // // // // // //   useEffect(() => {
// // // // // // //     const interval = setInterval(() => {
// // // // // // //       handleNext();
// // // // // // //     }, 4000);
// // // // // // //     return () => clearInterval(interval);
// // // // // // //   }, [handleNext]);

// // // // // // //   return (
// // // // // // //     <section className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center pt-32 pb-10 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#d4bca9]">
// // // // // // //       {/* Background Smoke / Glow Effects */}
// // // // // // //       <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center z-0">
// // // // // // //         <div className="absolute top-[-15%] w-[90%] h-[60%] bg-[var(--color-brand-orange)]/10 blur-[140px] rounded-full" />
// // // // // // //       </div>

// // // // // // //       <motion.div
// // // // // // //         className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto flex-1"
// // // // // // //         variants={containerVariants}
// // // // // // //         initial="hidden"
// // // // // // //         animate="visible"
// // // // // // //       >
// // // // // // //         {/* --- Hero Typography --- */}
// // // // // // //         <div className="flex flex-col items-center justify-center">
// // // // // // //           <motion.h1
// // // // // // //             variants={textVariants}
// // // // // // //             className={cn(
// // // // // // //               "font-heading text-white tracking-tight z-10 flex flex-col text-left",
// // // // // // //               "text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]" 
// // // // // // //             )}
// // // // // // //           >
// // // // // // //             <span>REAL INK</span>
// // // // // // //             <span className="ml-[1.6em]">YOUR WAY.</span>
// // // // // // //           </motion.h1>

// // // // // // //           <motion.p
// // // // // // //             variants={textVariants}
// // // // // // //             className={cn(
// // // // // // //               "text-body text-white/70 max-w-3xl mt-4 z-10 leading-relaxed"
// // // // // // //             )}
// // // // // // //           >
// // // // // // //             Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically tested, permanent ink sinks into the top layer of your skin, fully developing into a bold,{" "}
// // // // // // //             <span className="text-[var(--color-brand-orange)] font-medium">realistic design within 24 hours.</span>
// // // // // // //           </motion.p>
// // // // // // //         </div>

// // // // // // //         {/* --- Interactive Concave 3D Gallery --- */}
// // // // // // //         <motion.div
// // // // // // //           className="relative w-full max-w-[1400px] h-[280px] sm:h-[350px] md:h-[400px] flex justify-center items-center mb-12 z-20 cursor-grab active:cursor-grabbing"
// // // // // // //           style={{ 
// // // // // // //             perspective: "1500px", 
// // // // // // //             transformStyle: "preserve-3d",
// // // // // // //             touchAction: "pan-y" // Allows vertical scrolling on mobile while grabbing horizontal swipes
// // // // // // //           }}
// // // // // // //           // Framer Motion Pan Gesture for swiping
// // // // // // //           onPanEnd={(e, info) => {
// // // // // // //             const swipeThreshold = 50;
// // // // // // //             if (info.offset.x < -swipeThreshold) {
// // // // // // //               handleNext(); // Swiped left -> move right
// // // // // // //             } else if (info.offset.x > swipeThreshold) {
// // // // // // //               handlePrev(); // Swiped right -> move left
// // // // // // //             }
// // // // // // //           }}
// // // // // // //         >
// // // // // // //           {GALLERY_IMAGES.map((img, index) => {
// // // // // // //             // 1. Find the distance from the currently active center
// // // // // // //             let diff = index - activeIndex;

// // // // // // //             // 2. Wrap-around logic to create the endless loop effect
// // // // // // //             if (diff > Math.floor(totalCards / 2)) diff -= totalCards;
// // // // // // //             if (diff < -Math.floor(totalCards / 2)) diff += totalCards;

// // // // // // //             // 3. Map the relative distance to our 0-6 configuration slots (Center is 3)
// // // // // // //             const configIndex = diff + 3;

// // // // // // //             // Fallback config for safety if somehow out of bounds
// // // // // // //             const config = getCardConfig(configIndex) || { 
// // // // // // //               x: "0%", scale: 0.5, rotateY: 0, z: -500, zIndex: -10, opacity: 0 
// // // // // // //             };

// // // // // // //             return (
// // // // // // //               <motion.div
// // // // // // //                 key={img.id}
// // // // // // //                 initial={{ opacity: 0, y: 100, scale: 0.8 }}
// // // // // // //                 animate={{
// // // // // // //                   opacity: config.opacity,
// // // // // // //                   x: config.x,
// // // // // // //                   y: 0,
// // // // // // //                   scale: config.scale,
// // // // // // //                   rotateY: config.rotateY,
// // // // // // //                   z: config.z,
// // // // // // //                   transition: {
// // // // // // //                     duration: 0.8, // Slightly faster for snappier manual swiping
// // // // // // //                     ease: [0.16, 1, 0.3, 1],
// // // // // // //                   },
// // // // // // //                 }}
// // // // // // //                 whileHover={{
// // // // // // //                   scale: config.scale + 0.05,
// // // // // // //                   y: -15,
// // // // // // //                   opacity: 1,
// // // // // // //                   transition: { duration: 0.4, ease: "easeOut" },
// // // // // // //                 }}
// // // // // // //                 // Optional: click a background card to bring it to center
// // // // // // //                 onClick={() => setActiveIndex(index)}
// // // // // // //                 className="absolute origin-center cursor-pointer shadow-2xl rounded-[20px] overflow-hidden border border-[var(--color-brand-orange)]/30 hover:border-[var(--color-brand-orange)] bg-black/40 backdrop-blur-sm group"
// // // // // // //                 style={{
// // // // // // //                   zIndex: config.zIndex,
// // // // // // //                   width: "clamp(140px, 16vw, 220px)",
// // // // // // //                   height: "clamp(200px, 25vw, 340px)",
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 {/* Image Gradient Overlay for blending */}
// // // // // // //                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-10 transition-opacity duration-500" />
                
// // // // // // //                 <Image
// // // // // // //                   src={img.src}
// // // // // // //                   alt={img.alt}
// // // // // // //                   fill
// // // // // // //                   className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
// // // // // // //                   sizes="(max-width: 768px) 30vw, 20vw"
// // // // // // //                   priority={configIndex === 3} // Prioritize loading whatever is currently in the center
// // // // // // //                 />
// // // // // // //               </motion.div>
// // // // // // //             );
// // // // // // //           })}
// // // // // // //         </motion.div>

// // // // // // //         {/* --- Call To Actions --- */}
// // // // // // //         <motion.div
// // // // // // //           variants={textVariants}
// // // // // // //           className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 z-30 relative mt-auto md:mt-0"
// // // // // // //         >
// // // // // // //           <button 
// // // // // // //             className={cn(
// // // // // // //               "font-[family-name:var(--font-montserrat)] bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 text-sm md:text-base"
// // // // // // //             )}
// // // // // // //           >
// // // // // // //             Book an Appointment
// // // // // // //           </button>

// // // // // // //           <button 
// // // // // // //             className={cn(
// // // // // // //               "font-[family-name:var(--font-montserrat)] bg-transparent text-white/80 border border-white/30 px-8 py-3.5 rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white transition-all duration-300 text-sm md:text-base"
// // // // // // //             )}
// // // // // // //           >
// // // // // // //             View The Flash Book
// // // // // // //           </button>
// // // // // // //         </motion.div>
// // // // // // //       </motion.div>
// // // // // // //     </section>
// // // // // // //   );
// // // // // // // }


// // // // // // // "use client";

// // // // // // // import React, { useState, useEffect, useCallback } from "react";
// // // // // // // import { motion, Variants } from "framer-motion";
// // // // // // // import Image from "next/image";
// // // // // // // import { cn } from "../../lib/utils"; // Ensure this path matches your utils.js file

// // // // // // // // --- Mock Data (Added 8 and 9 to demonstrate the sliding queue) ---
// // // // // // // const GALLERY_IMAGES = [
// // // // // // //   { id: 1, src: "/assets/images/Card1.png", alt: "Spider tattoo blackwork" },
// // // // // // //   { id: 2, src: "/assets/images/Card2.png", alt: "Snake and dagger tattoo" },
// // // // // // //   { id: 3, src: "/assets/images/Card3.png", alt: "Tattoo artist portrait" },
// // // // // // //   { id: 4, src: "/assets/images/Card4.png", alt: "Spiked flail leg tattoo" },
// // // // // // //   { id: 5, src: "/assets/images/Card5.png", alt: "Skull and crossbones tattoo" },
// // // // // // //   { id: 6, src: "/assets/images/Card6.png", alt: "Skull and crossbones tattoo" },
// // // // // // //   { id: 7, src: "/assets/images/Card7.png", alt: "Skull and crossbones tattoo" },
// // // // // // //   { id: 8, src: "/assets/images/Card8.png", alt: "Rose tattoo design" },
// // // // // // //   { id: 9, src: "/assets/images/Card3.png", alt: "Dragon back piece" },
// // // // // // //   { id: 10, src: "/assets/images/Card4.png", alt: "Dragon back piece" },
// // // // // // // ];

// // // // // // // // --- 3D Configuration Generator ---
// // // // // // // const getCardConfig = (configIndex: number) => {
// // // // // // //   const configs: Record<number, any> = {
// // // // // // //     0: { x: "-270%", scale: 1,    rotateY: 38,  z: 100, zIndex: 30, opacity: 0.8 },
// // // // // // //     1: { x: "-170%", scale: 0.84, rotateY: 28,  z: 100, zIndex: 30, opacity: 0.8 },
// // // // // // //     2: { x: "-85%",  scale: 0.82, rotateY: 12,  z: 50,  zIndex: 20, opacity: 0.95 },
// // // // // // //     3: { x: "0%",    scale: 0.8,  rotateY: 0,   z: 0,   zIndex: 10, opacity: 1 },
// // // // // // //     4: { x: "85%",   scale: 0.82, rotateY: -12, z: 50,  zIndex: 20, opacity: 0.95 },
// // // // // // //     5: { x: "170%",  scale: 0.84, rotateY: -28, z: 100, zIndex: 30, opacity: 0.8 },
// // // // // // //     6: { x: "270%",  scale: 1,    rotateY: -38, z: 100, zIndex: 30, opacity: 0.8 },
// // // // // // //   };

// // // // // // //   if (configs[configIndex]) return configs[configIndex];

// // // // // // //   // OFF-SCREEN LEFT: Cards that have popped out of the left side
// // // // // // //   if (configIndex < 0) {
// // // // // // //     return { x: "-400%", scale: 0.5, rotateY: 45, z: -500, zIndex: -10, opacity: 0 };
// // // // // // //   }
// // // // // // //   // OFF-SCREEN RIGHT: Cards waiting in the queue to slide in from the right
// // // // // // //   if (configIndex > 6) {
// // // // // // //     return { x: "400%", scale: 0.5, rotateY: -45, z: -500, zIndex: -10, opacity: 0 };
// // // // // // //   }
// // // // // // // };

// // // // // // // // --- Animation Variants ---
// // // // // // // const containerVariants: Variants = {
// // // // // // //   hidden: { opacity: 0 },
// // // // // // //   visible: {
// // // // // // //     opacity: 1,
// // // // // // //     transition: { staggerChildren: 0.15, delayChildren: 0.1 },
// // // // // // //   },
// // // // // // // };

// // // // // // // const textVariants: Variants = {
// // // // // // //   hidden: { opacity: 0, y: 20 },
// // // // // // //   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
// // // // // // // };

// // // // // // // export default function HeroSection() {
// // // // // // //   const [activeIndex, setActiveIndex] = useState(0);
// // // // // // //   const totalCards = GALLERY_IMAGES.length;

// // // // // // //   // --- Navigation Handlers ---
// // // // // // //   const handleNext = useCallback(() => {
// // // // // // //     setActiveIndex((prev) => (prev + 1) % totalCards);
// // // // // // //   }, [totalCards]);

// // // // // // //   const handlePrev = useCallback(() => {
// // // // // // //     setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
// // // // // // //   }, [totalCards]);

// // // // // // //   // --- Auto-Rotation (Optional) ---
// // // // // // //   useEffect(() => {
// // // // // // //     const interval = setInterval(() => {
// // // // // // //       handleNext();
// // // // // // //     }, 4000);
// // // // // // //     return () => clearInterval(interval);
// // // // // // //   }, [handleNext]);

// // // // // // //   return (
// // // // // // //     <section className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center pt-32 pb-10 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#d4bca9]">
// // // // // // //       {/* Background Smoke / Glow Effects */}
// // // // // // //       <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center z-0">
// // // // // // //         <div className="absolute top-[-15%] w-[90%] h-[60%] bg-[var(--color-brand-orange)]/10 blur-[140px] rounded-full" />
// // // // // // //       </div>

// // // // // // //       <motion.div
// // // // // // //         className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto flex-1"
// // // // // // //         variants={containerVariants}
// // // // // // //         initial="hidden"
// // // // // // //         animate="visible"
// // // // // // //       >
// // // // // // //         {/* --- Hero Typography --- */}
// // // // // // //         <div className="flex flex-col items-center justify-center">
// // // // // // //           <motion.h1
// // // // // // //             variants={textVariants}
// // // // // // //             className={cn(
// // // // // // //               "font-heading text-white tracking-tight z-10 flex flex-col text-left",
// // // // // // //               "text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]" 
// // // // // // //             )}
// // // // // // //           >
// // // // // // //             <span>REAL INK</span>
// // // // // // //             <span className="ml-[1.6em]">YOUR WAY.</span>
// // // // // // //           </motion.h1>

// // // // // // //           <motion.p
// // // // // // //             variants={textVariants}
// // // // // // //             className={cn(
// // // // // // //               "text-body text-white/70 max-w-3xl mt-4 z-10 leading-relaxed"
// // // // // // //             )}
// // // // // // //           >
// // // // // // //             Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically tested, permanent ink sinks into the top layer of your skin, fully developing into a bold,{" "}
// // // // // // //             <span className="text-[var(--color-brand-orange)] font-medium">realistic design within 24 hours.</span>
// // // // // // //           </motion.p>
// // // // // // //         </div>

// // // // // // //         {/* --- Interactive Concave 3D Gallery --- */}
// // // // // // //         <motion.div
// // // // // // //           className="relative w-full max-w-[1400px] h-[280px] sm:h-[350px] md:h-[400px] flex justify-center items-center mb-12 z-20 cursor-grab active:cursor-grabbing"
// // // // // // //           style={{ 
// // // // // // //             perspective: "1500px", 
// // // // // // //             transformStyle: "preserve-3d",
// // // // // // //             touchAction: "pan-y" 
// // // // // // //           }}
// // // // // // //           onPanEnd={(e, info) => {
// // // // // // //             const swipeThreshold = 50;
// // // // // // //             if (info.offset.x < -swipeThreshold) {
// // // // // // //               handleNext(); // Swiped left -> move queue right
// // // // // // //             } else if (info.offset.x > swipeThreshold) {
// // // // // // //               handlePrev(); // Swiped right -> move queue left
// // // // // // //             }
// // // // // // //           }}
// // // // // // //         >
// // // // // // //           {GALLERY_IMAGES.map((img, index) => {
// // // // // // //             // Find distance from the active index
// // // // // // //             let diff = index - activeIndex;

// // // // // // //             // Wrap-around math: Ensures the queue loops endlessly
// // // // // // //             if (diff > Math.floor(totalCards / 2)) diff -= totalCards;
// // // // // // //             if (diff < -Math.floor(totalCards / 2)) diff += totalCards;

// // // // // // //             // Shift mapping so diff = 0 lands on configIndex = 3 (Center)
// // // // // // //             const configIndex = diff + 3;
            
// // // // // // //             // Get the calculated config (handles visible 0-6, and invisible <0 or >6)
// // // // // // //             const config = getCardConfig(configIndex);

// // // // // // //             return (
// // // // // // //               <motion.div
// // // // // // //                 key={img.id}
// // // // // // //                 initial={{ opacity: 0, y: 100, scale: 0.8 }}
// // // // // // //                 animate={{
// // // // // // //                   opacity: config.opacity,
// // // // // // //                   x: config.x,
// // // // // // //                   y: 0,
// // // // // // //                   scale: config.scale,
// // // // // // //                   rotateY: config.rotateY,
// // // // // // //                   z: config.z,
// // // // // // //                   transition: {
// // // // // // //                     duration: 0.8,
// // // // // // //                     ease: [0.16, 1, 0.3, 1],
// // // // // // //                   },
// // // // // // //                 }}
// // // // // // //                 whileHover={{
// // // // // // //                   scale: config.scale + 0.05,
// // // // // // //                   y: -15,
// // // // // // //                   opacity: config.opacity > 0 ? 1 : 0, // Only show hover state if card is visible
// // // // // // //                   transition: { duration: 0.4, ease: "easeOut" },
// // // // // // //                 }}
// // // // // // //                 onClick={() => {
// // // // // // //                   // Only allow clicking to focus if the card is actually visible
// // // // // // //                   if (configIndex >= 0 && configIndex <= 6) {
// // // // // // //                     setActiveIndex(index);
// // // // // // //                   }
// // // // // // //                 }}
// // // // // // //                 className="absolute origin-center shadow-2xl rounded-[20px] overflow-hidden border border-[var(--color-brand-orange)]/30 hover:border-[var(--color-brand-orange)] bg-black/40 backdrop-blur-sm group"
// // // // // // //                 style={{
// // // // // // //                   zIndex: config.zIndex,
// // // // // // //                   width: "clamp(140px, 16vw, 220px)",
// // // // // // //                   height: "clamp(200px, 25vw, 340px)",
// // // // // // //                   // Disable pointer events if the card is pushed off-screen
// // // // // // //                   pointerEvents: configIndex < 0 || configIndex > 6 ? "none" : "auto",
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 {/* Image Gradient Overlay for blending */}
// // // // // // //                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-10 transition-opacity duration-500" />
                
// // // // // // //                 <Image
// // // // // // //                   src={img.src}
// // // // // // //                   alt={img.alt}
// // // // // // //                   fill
// // // // // // //                   className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
// // // // // // //                   sizes="(max-width: 768px) 30vw, 20vw"
// // // // // // //                   priority={configIndex === 3}
// // // // // // //                 />
// // // // // // //               </motion.div>
// // // // // // //             );
// // // // // // //           })}
// // // // // // //         </motion.div>

// // // // // // //         {/* --- Call To Actions --- */}
// // // // // // //         <motion.div
// // // // // // //           variants={textVariants}
// // // // // // //           className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 z-30 relative mt-auto md:mt-0"
// // // // // // //         >
// // // // // // //           <button 
// // // // // // //             className={cn(
// // // // // // //               "font-[family-name:var(--font-montserrat)] bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 text-sm md:text-base"
// // // // // // //             )}
// // // // // // //           >
// // // // // // //             Book an Appointment
// // // // // // //           </button>

// // // // // // //           <button 
// // // // // // //             className={cn(
// // // // // // //               "font-[family-name:var(--font-montserrat)] bg-transparent text-white/80 border border-white/30 px-8 py-3.5 rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white transition-all duration-300 text-sm md:text-base"
// // // // // // //             )}
// // // // // // //           >
// // // // // // //             View The Flash Book
// // // // // // //           </button>
// // // // // // //         </motion.div>
// // // // // // //       </motion.div>
// // // // // // //     </section>
// // // // // // //   );
// // // // // // // }

// // // // // perfect one
// // // // // "use client";

// // // // // import React, { useState, useEffect, useCallback } from "react";
// // // // // import { motion, Variants } from "framer-motion";
// // // // // import Image from "next/image";
// // // // // import { cn } from "../../lib/utils"; // Ensure this path matches your utils.js file

// // // // // // --- Mock Data ---
// // // // // const GALLERY_IMAGES = [
// // // // //   { id: 1, src: "/assets/images/Card1.png", alt: "Spider tattoo blackwork" },
// // // // //   { id: 2, src: "/assets/images/Card2.png", alt: "Snake and dagger tattoo" },
// // // // //   { id: 3, src: "/assets/images/Card3.png", alt: "Tattoo artist portrait" },
// // // // //   { id: 4, src: "/assets/images/Card4.png", alt: "Spiked flail leg tattoo" },
// // // // //   { id: 5, src: "/assets/images/Card5.png", alt: "Skull and crossbones tattoo" },
// // // // //   { id: 6, src: "/assets/images/Card6.png", alt: "Skull and crossbones tattoo" },
// // // // //   { id: 7, src: "/assets/images/Card7.png", alt: "Skull and crossbones tattoo" },
// // // // //   { id: 8, src: "/assets/images/Card8.png", alt: "Rose tattoo design" },
// // // // //   { id: 9, src: "/assets/images/Card3.png", alt: "Dragon back piece" },
// // // // //   { id: 10, src: "/assets/images/Card4.png", alt: "Dragon back piece" },
// // // // // ];

// // // // // // --- Continuous 3D Configuration Generator ---
// // // // // // Dynamically calculates positions based on distance from the active card,
// // // // // // wrapping seamlessly around the viewer without breaking.
// // // // // const getCardConfig = (diff: number) => {
// // // // //   const absDiff = Math.abs(diff);
// // // // //   const sign = Math.sign(diff) || 1; // 1 for right, -1 for left

// // // // //   // Center card (Active) - Pushed slightly back for the concave effect
// // // // //   if (absDiff === 0) return { x: "0%", scale: 0.85, rotateY: 0, z: 0, zIndex: 10, opacity: 1 };
  
// // // // //   // 1st layer out
// // // // //   if (absDiff === 1) return { x: `${sign * 95}%`, scale: 0.85, rotateY: sign * -12, z: 50, zIndex: 20, opacity: 0.95 };
  
// // // // //   // 2nd layer out
// // // // //   if (absDiff === 2) return { x: `${sign * 190}%`, scale: 0.9, rotateY: sign * -28, z: 100, zIndex: 30, opacity: 0.8 };
  
// // // // //   // 3rd layer out (Edges of the screen)
// // // // //   if (absDiff === 3) return { x: `${sign * 290}%`, scale: 0.95, rotateY: sign * -38, z: 150, zIndex: 40, opacity: 0.6 };
  
// // // // //   // 4th layer out - Wrapping smoothly OUTSIDE the peripheral vision completely invisibly
// // // // //   if (absDiff === 4) return { x: `${sign * 380}%`, scale: 1.1, rotateY: sign * -50, z: 250, zIndex: 50, opacity: 0 };
  
// // // // //   // 5th layer - Farthest behind the camera (crossing over to the other side)
// // // // //   if (absDiff >= 5) return { x: `${sign * 500}%`, scale: 1.2, rotateY: sign * -60, z: 300, zIndex: 60, opacity: 0 };

// // // // //   return { x: "0%", scale: 0.8, opacity: 0 }; // Safety fallback
// // // // // };

// // // // // // --- Animation Variants ---
// // // // // const containerVariants: Variants = {
// // // // //   hidden: { opacity: 0 },
// // // // //   visible: {
// // // // //     opacity: 1,
// // // // //     transition: { staggerChildren: 0.15, delayChildren: 0.1 },
// // // // //   },
// // // // // };

// // // // // const textVariants: Variants = {
// // // // //   hidden: { opacity: 0, y: 20 },
// // // // //   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
// // // // // };

// // // // // export default function HeroSection() {
// // // // //   const [activeIndex, setActiveIndex] = useState(0);
// // // // //   const totalCards = GALLERY_IMAGES.length;

// // // // //   // --- Navigation Handlers ---
// // // // //   const handleNext = useCallback(() => {
// // // // //     setActiveIndex((prev) => (prev + 1) % totalCards);
// // // // //   }, [totalCards]);

// // // // //   const handlePrev = useCallback(() => {
// // // // //     setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
// // // // //   }, [totalCards]);

// // // // //   // --- Auto-Rotation ---
// // // // //   useEffect(() => {
// // // // //     const interval = setInterval(() => {
// // // // //       handleNext();
// // // // //     }, 4000);
// // // // //     return () => clearInterval(interval);
// // // // //   }, [handleNext]);

// // // // //   return (
// // // // //     <section className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center pt-32 pb-10 bg-gradient-to-b from-[#000000] via-[#1a1a1a] to-[#ffffff]">
// // // // //       {/* Background Smoke / Glow Effects */}
// // // // //       {/* <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center z-0">
// // // // //         <div className="absolute top-[-15%] w-[90%] h-[60%] bg-[var(--color-brand-orange)]/10 blur-[140px] rounded-full" />
// // // // //       </div> */}

// // // // //       <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center z-0">
// // // // //       <div className="absolute top-[-15%] w-[90%] h-[60%] bg-white/5 blur-[140px] rounded-full" />
// // // // //         <div
// // // // //          className="absolute inset-0 opacity-30 mix-blend-overlay"
// // // // //          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}
// // // // //         />
// // // // //       </div>

// // // // //       <motion.div
// // // // //         className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto flex-1"
// // // // //         variants={containerVariants}
// // // // //         initial="hidden"
// // // // //         animate="visible"
// // // // //       >
// // // // //         {/* --- Hero Typography --- */}
// // // // //         <div className="flex flex-col items-center justify-center">
// // // // //           <motion.h1
// // // // //             variants={textVariants}
// // // // //             className={cn(
// // // // //               "font-heading text-white tracking-tight z-10 flex flex-col text-left",
// // // // //               "text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]" 
// // // // //             )}
// // // // //           >
// // // // //             <span>REAL INK</span>
// // // // //             <span className="ml-[1.6em]">YOUR WAY.</span>
// // // // //           </motion.h1>

// // // // //           <motion.p
// // // // //             variants={textVariants}
// // // // //             className={cn(
// // // // //               "text-body text-white/70 max-w-3xl mt-4 z-10 leading-relaxed"
// // // // //             )}
// // // // //           >
// // // // //             Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically tested, permanent ink sinks into the top layer of your skin, fully developing into a bold,{" "}
// // // // //             <span className="text-[var(--color-brand-orange)] font-medium">realistic design within 24 hours.</span>
// // // // //           </motion.p>
// // // // //         </div>

// // // // //         {/* --- Interactive Concave 3D Gallery --- */}
// // // // //         <motion.div
// // // // //           className="relative w-full max-w-[1400px] h-[280px] sm:h-[350px] md:h-[400px] flex justify-center items-center mb-12 z-20 cursor-grab active:cursor-grabbing"
// // // // //           style={{ 
// // // // //             perspective: "1500px", 
// // // // //             transformStyle: "preserve-3d",
// // // // //             touchAction: "pan-y" 
// // // // //           }}
// // // // //           onPanEnd={(e, info) => {
// // // // //             const swipeThreshold = 50;
// // // // //             if (info.offset.x < -swipeThreshold) {
// // // // //               handleNext(); 
// // // // //             } else if (info.offset.x > swipeThreshold) {
// // // // //               handlePrev(); 
// // // // //             }
// // // // //           }}
// // // // //         >
// // // // //           {GALLERY_IMAGES.map((img, index) => {
// // // // //             // Calculate absolute shortest-path distance for endless looping
// // // // //             let diff = index - activeIndex;
// // // // //             if (diff > totalCards / 2) diff -= totalCards;
// // // // //             if (diff < -totalCards / 2) diff += totalCards;

// // // // //             const config = getCardConfig(diff);

// // // // //             return (
// // // // //               <motion.div
// // // // //                 key={img.id}
// // // // //                 initial={false} // Prevents jumpy mounting animations
// // // // //                 animate={{
// // // // //                   opacity: config.opacity,
// // // // //                   x: config.x,
// // // // //                   y: 0,
// // // // //                   scale: config.scale,
// // // // //                   rotateY: config.rotateY,
// // // // //                   z: config.z,
// // // // //                 }}
// // // // //                 transition={{
// // // // //                   type: "spring",
// // // // //                   stiffness: 80,  // Soft stiffness for liquid movement
// // // // //                   damping: 14,    // Prevents bounce
// // // // //                   mass: 1,
// // // // //                 }}
// // // // //                 whileHover={{
// // // // //                   scale: config.scale + 0.05,
// // // // //                   y: -15,
// // // // //                   opacity: config.opacity > 0 ? 1 : 0, 
// // // // //                   transition: { duration: 0.4, ease: "easeOut" },
// // // // //                 }}
// // // // //                 onClick={() => {
// // // // //                   if (Math.abs(diff) <= 3) setActiveIndex(index);
// // // // //                 }}
// // // // //                 className="absolute origin-center shadow-2xl rounded-[20px] overflow-hidden border border-[var(--color-brand-orange)]/30 hover:border-[var(--color-brand-orange)] bg-black/40 backdrop-blur-sm group"
// // // // //                 style={{
// // // // //                   zIndex: config.zIndex,
// // // // //                   width: "clamp(140px, 16vw, 220px)",
// // // // //                   height: "clamp(200px, 25vw, 340px)",
// // // // //                   // Completely disable interactions on invisible/wrapped cards
// // // // //                   pointerEvents: Math.abs(diff) > 3 ? "none" : "auto",
// // // // //                 }}
// // // // //               >
// // // // //                 {/* Image Gradient Overlay for blending */}
// // // // //                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-10 transition-opacity duration-500" />
                
// // // // //                 <Image
// // // // //                   src={img.src}
// // // // //                   alt={img.alt}
// // // // //                   fill
// // // // //                   className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
// // // // //                   sizes="(max-width: 768px) 30vw, 20vw"
// // // // //                   priority={Math.abs(diff) === 0}
// // // // //                 />
// // // // //               </motion.div>
// // // // //             );
// // // // //           })}
// // // // //         </motion.div>

// // // // //         {/* --- Call To Actions --- */}
// // // // //         <motion.div
// // // // //           variants={textVariants}
// // // // //           className="flex flex-col sm:flex-row items-center color-black justify-center gap-4 sm:gap-6 z-30 relative mt-auto md:mt-0"
// // // // //         >
// // // // //           <button 
// // // // //             className={cn(
// // // // //               "font-[family-name:var(--font-montserrat)] bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 text-sm md:text-base"
// // // // //             )}
// // // // //           >
// // // // //             Order Now
// // // // //           </button>
// // // // //         </motion.div>
// // // // //       </motion.div>
// // // // //     </section>
// // // // //   );
// // // // // }

// // // // // "use client";

// // // // // import React, { useState, useEffect, useCallback } from "react";
// // // // // import { motion, Variants } from "framer-motion";
// // // // // import Image from "next/image";
// // // // // import { cn } from "../../lib/utils"; // Ensure this path matches your utils.js file

// // // // // // --- Mock Data ---
// // // // // const GALLERY_IMAGES = [
// // // // //   { id: 1, src: "/assets/images/Card1.png", alt: "Spider tattoo blackwork" },
// // // // //   { id: 2, src: "/assets/images/Card2.png", alt: "Snake and dagger tattoo" },
// // // // //   { id: 3, src: "/assets/images/Card3.png", alt: "Tattoo artist portrait" },
// // // // //   { id: 4, src: "/assets/images/Card4.png", alt: "Spiked flail leg tattoo" },
// // // // //   { id: 5, src: "/assets/images/Card5.png", alt: "Skull and crossbones tattoo" },
// // // // //   { id: 6, src: "/assets/images/Card6.png", alt: "Skull and crossbones tattoo" },
// // // // //   { id: 7, src: "/assets/images/Card7.png", alt: "Skull and crossbones tattoo" },
// // // // //   { id: 8, src: "/assets/images/Card8.png", alt: "Rose tattoo design" },
// // // // //   { id: 9, src: "/assets/images/Card3.png", alt: "Dragon back piece" },
// // // // //   { id: 10, src: "/assets/images/Card4.png", alt: "Dragon back piece" },
// // // // // ];

// // // // // // --- Continuous 3D Configuration Generator ---
// // // // // const getCardConfig = (diff: number) => {
// // // // //   const absDiff = Math.abs(diff);
// // // // //   const sign = Math.sign(diff) || 1; // 1 for right, -1 for left

// // // // //   // Center card (Active)
// // // // //   if (absDiff === 0) return { x: "0%", scale: 1, rotateY: 0, z: 0, zIndex: 10, opacity: 1 };
  
// // // // //   // 1st layer out
// // // // //   if (absDiff === 1) return { x: `${sign * 120}%`, scale: 0.9, rotateY: sign * -12, z: -100, zIndex: 9, opacity: 1 };
  
// // // // //   // 2nd layer out
// // // // //   if (absDiff === 2) return { x: `${sign * 240}%`, scale: 0.8, rotateY: sign * -25, z: -200, zIndex: 8, opacity: 1 };
  
// // // // //   // 3rd layer out (Moving towards the very edges)
// // // // //   if (absDiff === 3) return { x: `${sign * 380}%`, scale: 0.7, rotateY: sign * -35, z: -300, zIndex: 7, opacity: 1 };
  
// // // // //   // 4th layer out (PHYSICALLY OFF-SCREEN)
// // // // //   // We keep opacity at 1 here. The card slides completely out of the monitor boundaries fully intact.
// // // // //   if (absDiff === 4) return { x: `${sign * 550}%`, scale: 0.7, rotateY: sign * -45, z: -400, zIndex: 6, opacity: 1 };
  
// // // // //   // Layer 5+ (The Invisible Cross-Over point deep off-screen)
// // // // //   // This is where it loops to the other side. Since x is 800%, it's miles outside the viewport.
// // // // //   // We drop z to -2000 so if it crosses behind the center, it's completely out of sight.
// // // // //   if (absDiff >= 5) return { x: `${sign * 800}%`, scale: 0.5, rotateY: sign * -60, z: -2000, zIndex: 1, opacity: 0 };

// // // // //   return { x: "0%", scale: 0, opacity: 0 }; 
// // // // // };

// // // // // // --- Animation Variants ---
// // // // // const containerVariants: Variants = {
// // // // //   hidden: { opacity: 0 },
// // // // //   visible: {
// // // // //     opacity: 1,
// // // // //     transition: { staggerChildren: 0.15, delayChildren: 0.1 },
// // // // //   },
// // // // // };

// // // // // const textVariants: Variants = {
// // // // //   hidden: { opacity: 0, y: 20 },
// // // // //   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
// // // // // };

// // // // // export default function HeroSection() {
// // // // //   const [activeIndex, setActiveIndex] = useState(0);
// // // // //   const totalCards = GALLERY_IMAGES.length;

// // // // //   // --- Navigation Handlers ---
// // // // //   const handleNext = useCallback(() => {
// // // // //     setActiveIndex((prev) => (prev + 1) % totalCards);
// // // // //   }, [totalCards]);

// // // // //   const handlePrev = useCallback(() => {
// // // // //     setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
// // // // //   }, [totalCards]);

// // // // //   // --- Auto-Rotation ---
// // // // //   useEffect(() => {
// // // // //     const interval = setInterval(() => {
// // // // //       handleNext();
// // // // //     }, 8000); // Massive 8 second delay to allow the 3.5s slow animation to complete peacefully
// // // // //     return () => clearInterval(interval);
// // // // //   }, [handleNext]);

// // // // //   return (
// // // // //     <section className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center pt-32 pb-10 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#d4bca9]">
// // // // //       {/* Background Smoke / Glow Effects */}
// // // // //       <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center z-0">
// // // // //         <div className="absolute top-[-15%] w-[90%] h-[60%] bg-[var(--color-brand-orange)]/10 blur-[140px] rounded-full" />
// // // // //       </div>

// // // // //       <motion.div
// // // // //         className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto flex-1"
// // // // //         variants={containerVariants}
// // // // //         initial="hidden"
// // // // //         animate="visible"
// // // // //       >
// // // // //         {/* --- Hero Typography --- */}
// // // // //         <div className="flex flex-col items-center justify-center">
// // // // //           <motion.h1
// // // // //             variants={textVariants}
// // // // //             className={cn(
// // // // //               "font-heading text-white tracking-tight z-10 flex flex-col text-left",
// // // // //               "text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]" 
// // // // //             )}
// // // // //           >
// // // // //             <span>REAL INK</span>
// // // // //             <span className="ml-[1.6em]">YOUR WAY.</span>
// // // // //           </motion.h1>

// // // // //           <motion.p
// // // // //             variants={textVariants}
// // // // //             className={cn(
// // // // //               "text-body text-white/70 max-w-3xl mt-4 z-10 leading-relaxed"
// // // // //             )}
// // // // //           >
// // // // //             Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically tested, permanent ink sinks into the top layer of your skin, fully developing into a bold,{" "}
// // // // //             <span className="text-[var(--color-brand-orange)] font-medium">realistic design within 24 hours.</span>
// // // // //           </motion.p>
// // // // //         </div>

// // // // //         {/* --- Interactive Concave 3D Gallery --- */}
// // // // //         <motion.div
// // // // //           className="relative w-full max-w-[1400px] h-[280px] sm:h-[350px] md:h-[400px] flex justify-center items-center mb-12 z-20 cursor-grab active:cursor-grabbing"
// // // // //           style={{ 
// // // // //             perspective: "1500px", 
// // // // //             transformStyle: "preserve-3d",
// // // // //             touchAction: "pan-y" 
// // // // //           }}
// // // // //           onPanEnd={(e, info) => {
// // // // //             const swipeThreshold = 50;
// // // // //             if (info.offset.x < -swipeThreshold) {
// // // // //               handleNext(); 
// // // // //             } else if (info.offset.x > swipeThreshold) {
// // // // //               handlePrev(); 
// // // // //             }
// // // // //           }}
// // // // //         >
// // // // //           {GALLERY_IMAGES.map((img, index) => {
// // // // //             // Calculate absolute shortest-path distance for endless looping
// // // // //             let diff = index - activeIndex;
// // // // //             if (diff > totalCards / 2) diff -= totalCards;
// // // // //             if (diff < -totalCards / 2) diff += totalCards;

// // // // //             const config = getCardConfig(diff);

// // // // //             return (
// // // // //               <motion.div
// // // // //                 key={img.id}
// // // // //                 initial={false}
// // // // //                 animate={{
// // // // //                   opacity: config.opacity,
// // // // //                   x: config.x,
// // // // //                   y: 0,
// // // // //                   scale: config.scale,
// // // // //                   rotateY: config.rotateY,
// // // // //                   z: config.z,
// // // // //                 }}
// // // // //                 transition={{
// // // // //                   type: "tween",
// // // // //                   duration: 3.5, // THE FIX: Extremely slow 3.5-second movement
// // // // //                   ease: "easeInOut", // Smooth, constant acceleration/deceleration without snapping
// // // // //                 }}
// // // // //                 whileHover={{
// // // // //                   scale: config.scale + 0.05,
// // // // //                   y: -15,
// // // // //                   opacity: config.opacity > 0 ? 1 : 0, 
// // // // //                   transition: { duration: 0.6, ease: "easeOut" },
// // // // //                 }}
// // // // //                 onClick={() => {
// // // // //                   if (Math.abs(diff) <= 3) setActiveIndex(index);
// // // // //                 }}
// // // // //                 className="absolute origin-center shadow-2xl rounded-[20px] overflow-hidden border border-[var(--color-brand-orange)]/30 hover:border-[var(--color-brand-orange)] bg-black/40 backdrop-blur-sm group"
// // // // //                 style={{
// // // // //                   zIndex: config.zIndex,
// // // // //                   width: "clamp(140px, 16vw, 220px)",
// // // // //                   height: "clamp(200px, 25vw, 340px)",
// // // // //                   pointerEvents: Math.abs(diff) > 3 ? "none" : "auto",
// // // // //                 }}
// // // // //               >
// // // // //                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-10 transition-opacity duration-500" />
                
// // // // //                 <Image
// // // // //                   src={img.src}
// // // // //                   alt={img.alt}
// // // // //                   fill
// // // // //                   className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
// // // // //                   sizes="(max-width: 768px) 30vw, 20vw"
// // // // //                   priority={Math.abs(diff) === 0}
// // // // //                 />
// // // // //               </motion.div>
// // // // //             );
// // // // //           })}
// // // // //         </motion.div>

// // // // //         {/* --- Call To Actions --- */}
// // // // //         <motion.div
// // // // //           variants={textVariants}
// // // // //           className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 z-30 relative mt-auto md:mt-0"
// // // // //         >
// // // // //           <button 
// // // // //             className={cn(
// // // // //               "font-[family-name:var(--font-montserrat)] bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 text-sm md:text-base"
// // // // //             )}
// // // // //           >
// // // // //             Book an Appointment
// // // // //           </button>

// // // // //           <button 
// // // // //             className={cn(
// // // // //               "font-[family-name:var(--font-montserrat)] bg-transparent text-white/80 border border-white/30 px-8 py-3.5 rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white transition-all duration-300 text-sm md:text-base"
// // // // //             )}
// // // // //           >
// // // // //             View The Flash Book
// // // // //           </button>
// // // // //         </motion.div>
// // // // //       </motion.div>
// // // // //     </section>
// // // // //   );
// // // // // }


// // // // // "use client";

// // // // // import React, { useState, useEffect, useCallback } from "react";
// // // // // import { motion, Variants } from "framer-motion";
// // // // // import Image from "next/image";
// // // // // import { cn } from "../../lib/utils"; // Ensure this path matches your utils.js file

// // // // // // --- Mock Data ---
// // // // // const GALLERY_IMAGES = [
// // // // //   { id: 1, src: "/assets/images/Card1.png", alt: "Spider tattoo blackwork" },
// // // // //   { id: 2, src: "/assets/images/Card2.png", alt: "Snake and dagger tattoo" },
// // // // //   { id: 3, src: "/assets/images/Card3.png", alt: "Tattoo artist portrait" },
// // // // //   { id: 4, src: "/assets/images/Card4.png", alt: "Spiked flail leg tattoo" },
// // // // //   { id: 5, src: "/assets/images/Card5.png", alt: "Skull and crossbones tattoo" },
// // // // //   { id: 6, src: "/assets/images/Card6.png", alt: "Skull and crossbones tattoo" },
// // // // //   { id: 7, src: "/assets/images/Card7.png", alt: "Skull and crossbones tattoo" },
// // // // //   { id: 8, src: "/assets/images/Card8.png", alt: "Rose tattoo design" },
// // // // //   { id: 9, src: "/assets/images/Card3.png", alt: "Dragon back piece" },
// // // // //   { id: 10, src: "/assets/images/Card4.png", alt: "Dragon back piece" },
// // // // // ];

// // // // // // --- 3D Carousel Configuration Generator ---
// // // // // // const getCardConfig = (diff: number) => {
// // // // // //   const absDiff = Math.abs(diff);
// // // // // //   const sign = Math.sign(diff) || 1; // 1 for right, -1 for left

// // // // // //   // Center card (Active - Huge and in front)
// // // // // //   if (absDiff === 0) return { x: "0%", scale: 1, rotateY: 0, z: 0, zIndex: 10, opacity: 1 };
  
// // // // // //   // 1st layer out (Gliding to the sides)
// // // // // //   if (absDiff === 1) return { x: `${sign * 115}%`, scale: 0.85, rotateY: sign * -15, z: -100, zIndex: 9, opacity: 0.9 };
  
// // // // // //   // 2nd layer out (Reaching the maximum outer width of the circle)
// // // // // //   if (absDiff === 2) return { x: `${sign * 190}%`, scale: 0.7, rotateY: sign * -30, z: -250, zIndex: 8, opacity: 0.8 };
  
// // // // // //   // 3rd layer out (Curving back INWARDS behind the front cards)
// // // // // //   if (absDiff === 3) return { x: `${sign * 130}%`, scale: 0.55, rotateY: sign * -45, z: -400, zIndex: 7, opacity: 0.6 };
  
// // // // // //   // 4th layer out (Tucking in tightly behind the center)
// // // // // //   if (absDiff === 4) return { x: `${sign * 60}%`, scale: 0.4, rotateY: sign * -60, z: -550, zIndex: 6, opacity: 0.4 };
  
// // // // // //   // Layer 5+ (Directly behind the active center card, completing the loop)
// // // // // //   if (absDiff >= 5) return { x: "0%", scale: 0.3, rotateY: 0, z: -700, zIndex: 5, opacity: 0.2 };

// // // // // //   return { x: "0%", scale: 0, opacity: 0 }; 
// // // // // // };
// // // // // // --- 3D Carousel Configuration Generator ---
// // // // // const getCardConfig = (diff: number) => {
// // // // //   const absDiff = Math.abs(diff);
// // // // //   const sign = Math.sign(diff) || 1; // 1 for right, -1 for left

// // // // //   // Center card (Active - Huge and in front)
// // // // //   if (absDiff === 0) return { x: "0%", scale: 1, rotateY: 0, z: 0, zIndex: 10, opacity: 1 };
  
// // // // //   // 1st layer out (Gliding to the sides)
// // // // //   if (absDiff === 1) return { x: `${sign * 110}%`, scale: 0.85, rotateY: sign * -12, z: -100, zIndex: 9, opacity: 0.9 };
  
// // // // //   // 2nd layer out (Continuing outward)
// // // // //   if (absDiff === 2) return { x: `${sign * 200}%`, scale: 0.7, rotateY: sign * -25, z: -250, zIndex: 8, opacity: 0.8 };
  
// // // // //   // 3rd layer out (NEW: Reaching the maximum outer width of the circle)
// // // // //   if (absDiff === 3) return { x: `${sign * 260}%`, scale: 0.55, rotateY: sign * -40, z: -400, zIndex: 7, opacity: 0.6 };
  
// // // // //   // 4th layer out (Curving back INWARDS behind the front cards)
// // // // //   if (absDiff === 4) return { x: `${sign * 170}%`, scale: 0.4, rotateY: sign * -55, z: -550, zIndex: 6, opacity: 0.4 };
  
// // // // //   // 5th layer out (Tucking in tightly behind the center)
// // // // //   if (absDiff === 5) return { x: `${sign * 80}%`, scale: 0.3, rotateY: sign * -70, z: -700, zIndex: 5, opacity: 0.2 };

// // // // //   // Layer 6+ (Directly behind the active center card, completing the loop)
// // // // //   return { x: "0%", scale: 0.2, rotateY: 0, z: -850, zIndex: 4, opacity: 0 }; 
// // // // // };

// // // // // // --- Animation Variants ---
// // // // // const containerVariants: Variants = {
// // // // //   hidden: { opacity: 0 },
// // // // //   visible: {
// // // // //     opacity: 1,
// // // // //     transition: { staggerChildren: 0.15, delayChildren: 0.1 },
// // // // //   },
// // // // // };

// // // // // const textVariants: Variants = {
// // // // //   hidden: { opacity: 0, y: 20 },
// // // // //   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
// // // // // };

// // // // // export default function HeroSection() {
// // // // //   const [activeIndex, setActiveIndex] = useState(0);
// // // // //   const totalCards = GALLERY_IMAGES.length;

// // // // //   // --- Navigation Handlers ---
// // // // //   const handleNext = useCallback(() => {
// // // // //     setActiveIndex((prev) => (prev + 1) % totalCards);
// // // // //   }, [totalCards]);

// // // // //   const handlePrev = useCallback(() => {
// // // // //     setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
// // // // //   }, [totalCards]);

// // // // //   // --- Auto-Rotation ---
// // // // //   useEffect(() => {
// // // // //     const interval = setInterval(() => {
// // // // //       handleNext();
// // // // //     }, 8000); // 8-second delay allows the slow majesty of the 3D loop
// // // // //     return () => clearInterval(interval);
// // // // //   }, [handleNext]);

// // // // //   return (
// // // // //     <section className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center pt-32 pb-10 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#d4bca9]">
// // // // //       {/* Background Smoke / Glow Effects */}
// // // // //       <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center z-0">
// // // // //         <div className="absolute top-[-15%] w-[90%] h-[60%] bg-[var(--color-brand-orange)]/10 blur-[140px] rounded-full" />
// // // // //       </div>

// // // // //       <motion.div
// // // // //         className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto flex-1"
// // // // //         variants={containerVariants}
// // // // //         initial="hidden"
// // // // //         animate="visible"
// // // // //       >
// // // // //         {/* --- Hero Typography --- */}
// // // // //         <div className="flex flex-col items-center justify-center">
// // // // //           <motion.h1
// // // // //             variants={textVariants}
// // // // //             className={cn(
// // // // //               "font-heading text-white tracking-tight z-10 flex flex-col text-left",
// // // // //               "text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]" 
// // // // //             )}
// // // // //           >
// // // // //             <span>REAL INK</span>
// // // // //             <span className="ml-[1.6em]">YOUR WAY.</span>
// // // // //           </motion.h1>

// // // // //           <motion.p
// // // // //             variants={textVariants}
// // // // //             className={cn(
// // // // //               "text-body text-white/70 max-w-3xl mt-4 z-10 leading-relaxed"
// // // // //             )}
// // // // //           >
// // // // //             Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically tested, permanent ink sinks into the top layer of your skin, fully developing into a bold,{" "}
// // // // //             <span className="text-[var(--color-brand-orange)] font-medium">realistic design within 24 hours.</span>
// // // // //           </motion.p>
// // // // //         </div>

// // // // //         {/* --- Interactive 3D Carousel Gallery --- */}
// // // // //         <motion.div
// // // // //           className="relative w-full max-w-[1400px] h-[280px] sm:h-[350px] md:h-[400px] flex justify-center items-center mb-12 z-20 cursor-grab active:cursor-grabbing"
// // // // //           style={{ 
// // // // //             perspective: "1200px", // Slightly tighter perspective to emphasize depth
// // // // //             transformStyle: "preserve-3d",
// // // // //             touchAction: "pan-y" 
// // // // //           }}
// // // // //           onPanEnd={(e, info) => {
// // // // //             const swipeThreshold = 50;
// // // // //             if (info.offset.x < -swipeThreshold) {
// // // // //               handleNext(); 
// // // // //             } else if (info.offset.x > swipeThreshold) {
// // // // //               handlePrev(); 
// // // // //             }
// // // // //           }}
// // // // //         >
// // // // //           {GALLERY_IMAGES.map((img, index) => {
// // // // //             // Calculate absolute shortest-path distance for endless looping
// // // // //             let diff = index - activeIndex;
// // // // //             if (diff > totalCards / 2) diff -= totalCards;
// // // // //             if (diff < -totalCards / 2) diff += totalCards;

// // // // //             const config = getCardConfig(diff);

// // // // //             return (
// // // // //               <motion.div
// // // // //                 key={img.id}
// // // // //                 initial={false}
// // // // //                 animate={{
// // // // //                   opacity: config.opacity,
// // // // //                   x: config.x,
// // // // //                   y: 0,
// // // // //                   scale: config.scale,
// // // // //                   rotateY: config.rotateY,
// // // // //                   z: config.z,
// // // // //                 }}
// // // // //                 transition={{
// // // // //                   type: "tween",
// // // // //                   duration: 3.5, // Damn slow movement
// // // // //                   ease: "easeInOut", // Smooth, unbroken gliding
// // // // //                 }}
// // // // //                 whileHover={{
// // // // //                   scale: config.scale + 0.05,
// // // // //                   y: -15,
// // // // //                   opacity: 1, 
// // // // //                   transition: { duration: 0.6, ease: "easeOut" },
// // // // //                 }}
// // // // //                 // onClick={() => {
// // // // //                 //   // Allow clicking any card in the front half of the circle to bring it forward
// // // // //                 //   if (Math.abs(diff) <= 2) setActiveIndex(index);
// // // // //                 // }}
// // // // //                 // className="absolute origin-center shadow-2xl rounded-[20px] overflow-hidden border border-[var(--color-brand-orange)]/30 hover:border-[var(--color-brand-orange)] bg-black/40 backdrop-blur-sm group"
// // // // //                 // style={{
// // // // //                 //   zIndex: config.zIndex,
// // // // //                 //   width: "clamp(140px, 16vw, 220px)",
// // // // //                 //   height: "clamp(200px, 25vw, 340px)",
// // // // //                 //   // Disable clicking for the tiny cards way in the back
// // // // //                 //   pointerEvents: Math.abs(diff) > 2 ? "none" : "auto",
// // // // //                 // }}
// // // // //                 onClick={() => {
// // // // //                   // Allow clicking up to the 3rd layer to bring it forward
// // // // //                   if (Math.abs(diff) <= 3) setActiveIndex(index);
// // // // //                 }}
// // // // //                 className="absolute origin-center shadow-2xl rounded-[20px] overflow-hidden border border-[var(--color-brand-orange)]/30 hover:border-[var(--color-brand-orange)] bg-black/40 backdrop-blur-sm group"
// // // // //                 style={{
// // // // //                   zIndex: config.zIndex,
// // // // //                   width: "clamp(140px, 16vw, 220px)",
// // // // //                   height: "clamp(200px, 25vw, 340px)",
// // // // //                   // Disable clicking for the tiny cards way in the back
// // // // //                   pointerEvents: Math.abs(diff) > 3 ? "none" : "auto",
// // // // //                 }}
// // // // //               >
// // // // //                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-10 transition-opacity duration-500" />
                
// // // // //                 <Image
// // // // //                   src={img.src}
// // // // //                   alt={img.alt}
// // // // //                   fill
// // // // //                   className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
// // // // //                   sizes="(max-width: 768px) 30vw, 20vw"
// // // // //                   priority={Math.abs(diff) === 0}
// // // // //                 />
// // // // //               </motion.div>
// // // // //             );
// // // // //           })}
// // // // //         </motion.div>

// // // // //         {/* --- Call To Actions --- */}
// // // // //         <motion.div
// // // // //           variants={textVariants}
// // // // //           className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 z-30 relative mt-auto md:mt-0"
// // // // //         >
// // // // //           <button 
// // // // //             className={cn(
// // // // //               "font-[family-name:var(--font-montserrat)] bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 text-sm md:text-base"
// // // // //             )}
// // // // //           >
// // // // //             Book an Appointment
// // // // //           </button>

// // // // //           <button 
// // // // //             className={cn(
// // // // //               "font-[family-name:var(--font-montserrat)] bg-transparent text-white/80 border border-white/30 px-8 py-3.5 rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white transition-all duration-300 text-sm md:text-base"
// // // // //             )}
// // // // //           >
// // // // //             View The Flash Book
// // // // //           </button>
// // // // //         </motion.div>
// // // // //       </motion.div>
// // // // //     </section>
// // // // //   );
// // // // // }


// // // // "use client";

// // // // import React, { useState, useEffect, useCallback, useRef } from "react";
// // // // import { motion, Variants, useInView } from "framer-motion";
// // // // import Image from "next/image";
// // // // import { cn } from "../../lib/utils"; // Ensure this path matches your utils.js file

// // // // // --- Mock Data ---
// // // // const GALLERY_IMAGES = [
// // // //   { id: 1, src: "/assets/images/Card1.png", alt: "Spider tattoo blackwork" },
// // // //   { id: 2, src: "/assets/images/Card2.png", alt: "Snake and dagger tattoo" },
// // // //   { id: 3, src: "/assets/images/Card3.png", alt: "Tattoo artist portrait" },
// // // //   { id: 4, src: "/assets/images/Card4.png", alt: "Spiked flail leg tattoo" },
// // // //   { id: 5, src: "/assets/images/Card5.png", alt: "Skull and crossbones tattoo" },
// // // //   { id: 6, src: "/assets/images/Card6.png", alt: "Skull and crossbones tattoo" },
// // // //   { id: 7, src: "/assets/images/Card7.png", alt: "Skull and crossbones tattoo" },
// // // //   { id: 8, src: "/assets/images/Card8.png", alt: "Rose tattoo design" },
// // // //   { id: 9, src: "/assets/images/Card3.png", alt: "Dragon back piece" },
// // // //   { id: 10, src: "/assets/images/Card4.png", alt: "Dragon back piece" },
// // // // ];

// // // // // --- Continuous 3D Configuration Generator ---
// // // // const getCardConfig = (diff: number) => {
// // // //   const absDiff = Math.abs(diff);
// // // //   const sign = Math.sign(diff) || 1;

// // // //   if (absDiff === 0) return { x: "0%", scale: 0.85, rotateY: 0, z: 0, zIndex: 10, opacity: 1 };
// // // //   if (absDiff === 1) return { x: `${sign * 95}%`, scale: 0.85, rotateY: sign * -12, z: 50, zIndex: 20, opacity: 0.95 };
// // // //   if (absDiff === 2) return { x: `${sign * 190}%`, scale: 0.9, rotateY: sign * -28, z: 100, zIndex: 30, opacity: 0.8 };
// // // //   if (absDiff === 3) return { x: `${sign * 290}%`, scale: 0.95, rotateY: sign * -38, z: 150, zIndex: 40, opacity: 0.6 };
// // // //   if (absDiff === 4) return { x: `${sign * 380}%`, scale: 1.1, rotateY: sign * -50, z: 250, zIndex: 50, opacity: 0 };
// // // //   if (absDiff >= 5) return { x: `${sign * 500}%`, scale: 1.2, rotateY: sign * -60, z: 300, zIndex: 60, opacity: 0 };

// // // //   return { x: "0%", scale: 0.8, opacity: 0 }; 
// // // // };

// // // // // --- Animation Variants ---
// // // // const containerVariants: Variants = {
// // // //   hidden: { opacity: 0 },
// // // //   visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
// // // // };

// // // // const textVariants: Variants = {
// // // //   hidden: { opacity: 0, y: 20 },
// // // //   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
// // // // };

// // // // export default function HeroSection() {
// // // //   const [activeIndex, setActiveIndex] = useState(0);
// // // //   const [isPaused, setIsPaused] = useState(false); // Controls hover/interaction pausing
  
// // // //   // Ref & InView hook to stop auto-play when scrolled out
// // // //   const sectionRef = useRef<HTMLElement>(null);
// // // //   const isInView = useInView(sectionRef, { amount: 0.2 }); 

// // // //   const totalCards = GALLERY_IMAGES.length;

// // // //   // --- Navigation Handlers ---
// // // //   const handleNext = useCallback(() => {
// // // //     setActiveIndex((prev) => (prev + 1) % totalCards);
// // // //   }, [totalCards]);

// // // //   const handlePrev = useCallback(() => {
// // // //     setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
// // // //   }, [totalCards]);

// // // //   // --- Auto-Rotation (Now respects visibility and hover state) ---
// // // //   useEffect(() => {
// // // //     if (isPaused || !isInView) return; // Prevent rotation if interacting or scrolled away

// // // //     const interval = setInterval(() => {
// // // //       handleNext();
// // // //     }, 4000);
// // // //     return () => clearInterval(interval);
// // // //   }, [handleNext, isPaused, isInView]);

// // // //   return (
// // // //     <section 
// // // //       ref={sectionRef}
// // // //       className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center pt-32 pb-10 bg-gradient-to-b from-[#000000] via-[#1a1a1a] to-[#ffffff]"
// // // //     >
// // // //       {/* Background Effects */}
// // // //       <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center z-0">
// // // //         <div className="absolute top-[-15%] w-[90%] h-[60%] bg-white/5 blur-[140px] rounded-full" />
// // // //         <div
// // // //          className="absolute inset-0 opacity-30 mix-blend-overlay"
// // // //          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}
// // // //         />
// // // //       </div>

// // // //       <motion.div
// // // //         className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto flex-1"
// // // //         variants={containerVariants}
// // // //         initial="hidden"
// // // //         animate="visible"
// // // //       >
// // // //         {/* --- Hero Typography --- */}
// // // //         <div className="flex flex-col items-center justify-center">
// // // //           <motion.h1
// // // //             variants={textVariants}
// // // //             className={cn(
// // // //               "font-heading text-white tracking-tight z-10 flex flex-col text-left",
// // // //               "text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]" 
// // // //             )}
// // // //           >
// // // //             <span>REAL INK</span>
// // // //             <span className="ml-[1.6em]">YOUR WAY.</span>
// // // //           </motion.h1>

// // // //           <motion.p
// // // //             variants={textVariants}
// // // //             className={cn(
// // // //               "text-body text-white/70 max-w-3xl mt-4 z-10 leading-relaxed"
// // // //             )}
// // // //           >
// // // //             Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically tested, permanent ink sinks into the top layer of your skin, fully developing into a bold,{" "}
// // // //             <span className="text-[var(--color-brand-orange)] font-medium">realistic design within 24 hours.</span>
// // // //           </motion.p>
// // // //         </div>

// // // //         {/* --- Interactive Concave 3D Gallery --- */}
// // // //         <motion.div
// // // //           className="relative w-full max-w-[1400px] h-[280px] sm:h-[350px] md:h-[400px] flex justify-center items-center mt-8 mb-6 z-20 cursor-grab active:cursor-grabbing"
// // // //           style={{ 
// // // //             perspective: "1500px", 
// // // //             transformStyle: "preserve-3d",
// // // //             touchAction: "pan-y" 
// // // //           }}
// // // //           // Pause auto-rotation on mouse enter or touch
// // // //           onMouseEnter={() => setIsPaused(true)}
// // // //           onMouseLeave={() => setIsPaused(false)}
// // // //           onTouchStart={() => setIsPaused(true)}
// // // //           onTouchEnd={() => setIsPaused(false)}
// // // //           onPanEnd={(e, info) => {
// // // //             const swipeThreshold = 50;
// // // //             if (info.offset.x < -swipeThreshold) {
// // // //               handleNext(); 
// // // //             } else if (info.offset.x > swipeThreshold) {
// // // //               handlePrev(); 
// // // //             }
// // // //           }}
// // // //         >
// // // //           {GALLERY_IMAGES.map((img, index) => {
// // // //             let diff = index - activeIndex;
// // // //             if (diff > totalCards / 2) diff -= totalCards;
// // // //             if (diff < -totalCards / 2) diff += totalCards;

// // // //             const config = getCardConfig(diff);

// // // //             return (
// // // //               <motion.div
// // // //                 key={img.id}
// // // //                 initial={false}
// // // //                 animate={{
// // // //                   opacity: config.opacity,
// // // //                   x: config.x,
// // // //                   y: 0,
// // // //                   scale: config.scale,
// // // //                   rotateY: config.rotateY,
// // // //                   z: config.z,
// // // //                 }}
// // // //                 transition={{
// // // //                   type: "spring",
// // // //                   stiffness: 80,
// // // //                   damping: 14,
// // // //                   mass: 1,
// // // //                 }}
// // // //                 whileHover={{
// // // //                   scale: config.scale + 0.05,
// // // //                   y: -15,
// // // //                   opacity: config.opacity > 0 ? 1 : 0, 
// // // //                   transition: { duration: 0.4, ease: "easeOut" },
// // // //                 }}
// // // //                 onClick={() => {
// // // //                   if (Math.abs(diff) <= 3) setActiveIndex(index);
// // // //                 }}
// // // //                 className="absolute origin-center shadow-2xl rounded-[20px] overflow-hidden border border-[var(--color-brand-orange)]/30 hover:border-[var(--color-brand-orange)] bg-black/40 backdrop-blur-sm group"
// // // //                 style={{
// // // //                   zIndex: config.zIndex,
// // // //                   width: "clamp(140px, 16vw, 220px)",
// // // //                   height: "clamp(200px, 25vw, 340px)",
// // // //                   pointerEvents: Math.abs(diff) > 3 ? "none" : "auto",
// // // //                 }}
// // // //               >
// // // //                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-10 transition-opacity duration-500" />
                
// // // //                 <Image
// // // //                   src={img.src}
// // // //                   alt={img.alt}
// // // //                   fill
// // // //                   className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
// // // //                   sizes="(max-width: 768px) 30vw, 20vw"
// // // //                   priority={Math.abs(diff) === 0}
// // // //                 />
// // // //               </motion.div>
// // // //             );
// // // //           })}
// // // //         </motion.div>

// // // //         {/* --- Manual Scrollbar --- */}
// // // //         <motion.div 
// // // //           variants={textVariants}
// // // //           className="w-full max-w-[250px] md:max-w-[300px] mb-8 z-30 relative flex items-center justify-center"
// // // //           onMouseEnter={() => setIsPaused(true)}
// // // //           onMouseLeave={() => setIsPaused(false)}
// // // //           onTouchStart={() => setIsPaused(true)}
// // // //           onTouchEnd={() => setIsPaused(false)}
// // // //         >
// // // //           <input
// // // //             type="range"
// // // //             min={0}
// // // //             max={totalCards - 1}
// // // //             value={activeIndex}
// // // //             onChange={(e) => setActiveIndex(Number(e.target.value))}
// // // //             className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer outline-none transition-all
// // // //               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.8)]
// // // //               [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full
// // // //               hover:bg-white/30"
// // // //             aria-label="Gallery Scrollbar"
// // // //           />
// // // //         </motion.div>

// // // //         {/* --- Call To Actions --- */}
// // // //         <motion.div
// // // //           variants={textVariants}
// // // //           className="flex flex-col sm:flex-row items-center color-black justify-center gap-4 sm:gap-6 z-30 relative mt-auto md:mt-0"
// // // //         >
// // // //           <button 
// // // //             className={cn(
// // // //               "font-[family-name:var(--font-montserrat)] bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 text-sm md:text-base"
// // // //             )}
// // // //           >
// // // //             Order Now
// // // //           </button>
// // // //         </motion.div>
// // // //       </motion.div>
// // // //     </section>
// // // //   );
// // // // }


// // // "use client";

// // // import React, { useState, useEffect, useCallback, useRef } from "react";
// // // import { motion, Variants, useInView, useScroll, useTransform } from "framer-motion";
// // // import Image from "next/image";
// // // import { cn } from "../../lib/utils"; // Ensure this path matches your utils.js file

// // // // --- Mock Data ---
// // // const GALLERY_IMAGES = [
// // //   { id: 1, src: "/assets/images/Card1.png", alt: "Spider tattoo blackwork" },
// // //   { id: 2, src: "/assets/images/Card2.png", alt: "Snake and dagger tattoo" },
// // //   { id: 3, src: "/assets/images/Card3.png", alt: "Tattoo artist portrait" },
// // //   { id: 4, src: "/assets/images/Card4.png", alt: "Spiked flail leg tattoo" },
// // //   { id: 5, src: "/assets/images/Card5.png", alt: "Skull and crossbones tattoo" },
// // //   { id: 6, src: "/assets/images/Card6.png", alt: "Skull and crossbones tattoo" },
// // //   { id: 7, src: "/assets/images/Card7.png", alt: "Skull and crossbones tattoo" },
// // //   { id: 8, src: "/assets/images/Card8.png", alt: "Rose tattoo design" },
// // //   { id: 9, src: "/assets/images/Card3.png", alt: "Dragon back piece" },
// // //   { id: 10, src: "/assets/images/Card4.png", alt: "Dragon back piece" },
// // // ];

// // // // --- Continuous 3D Configuration Generator ---
// // // const getCardConfig = (diff: number) => {
// // //   const absDiff = Math.abs(diff);
// // //   const sign = Math.sign(diff) || 1;

// // //   if (absDiff === 0) return { x: "0%", scale: 0.85, rotateY: 0, z: 0, zIndex: 10, opacity: 1 };
// // //   if (absDiff === 1) return { x: `${sign * 95}%`, scale: 0.85, rotateY: sign * -12, z: 50, zIndex: 20, opacity: 0.95 };
// // //   if (absDiff === 2) return { x: `${sign * 190}%`, scale: 0.9, rotateY: sign * -28, z: 100, zIndex: 30, opacity: 0.8 };
// // //   if (absDiff === 3) return { x: `${sign * 290}%`, scale: 0.95, rotateY: sign * -38, z: 150, zIndex: 40, opacity: 0.6 };
// // //   if (absDiff === 4) return { x: `${sign * 380}%`, scale: 1.1, rotateY: sign * -50, z: 250, zIndex: 50, opacity: 0 };
// // //   if (absDiff >= 5) return { x: `${sign * 500}%`, scale: 1.2, rotateY: sign * -60, z: 300, zIndex: 60, opacity: 0 };

// // //   return { x: "0%", scale: 0.8, opacity: 0 }; 
// // // };

// // // // --- Animation Variants ---
// // // const containerVariants: Variants = {
// // //   hidden: { opacity: 0 },
// // //   visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
// // // };

// // // const textVariants: Variants = {
// // //   hidden: { opacity: 0, y: 20 },
// // //   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
// // // };

// // // export default function HeroSection() {
// // //   const [activeIndex, setActiveIndex] = useState(0);
// // //   const [isPaused, setIsPaused] = useState(false); 
  
// // //   const sectionRef = useRef<HTMLElement>(null);
// // //   const isInView = useInView(sectionRef, { amount: 0.2 }); 

// // //   // --- Scroll Animation Hooks ---
// // //   const { scrollY } = useScroll();
// // //   // Maps the window scroll from 0px-1000px to a Y-axis translation of 0px-800px on the card.
// // //   // Tweak the second array [0, 800] to make it fall faster or slower.
// // //   const activeCardY = useTransform(scrollY, [0, 1000], [0, 800]);

// // //   const totalCards = GALLERY_IMAGES.length;

// // //   const handleNext = useCallback(() => {
// // //     setActiveIndex((prev) => (prev + 1) % totalCards);
// // //   }, [totalCards]);

// // //   const handlePrev = useCallback(() => {
// // //     setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
// // //   }, [totalCards]);

// // //   useEffect(() => {
// // //     if (isPaused || !isInView) return; 
// // //     const interval = setInterval(() => {
// // //       handleNext();
// // //     }, 4000);
// // //     return () => clearInterval(interval);
// // //   }, [handleNext, isPaused, isInView]);

// // //   return (
// // //     <section 
// // //       ref={sectionRef}
// // //       // CRITICAL: Changed 'overflow-hidden' to 'overflow-x-hidden' so the falling card isn't clipped at the bottom
// // //     //   bg-gradient-to-b from-[#000000] via-[#1a1a1a] to-[#ffffff]
// // //       className="relative w-full min-h-screen overflow-x-hidden flex flex-col items-center justify-center pt-32 pb-10 bg-white "
// // //     >
// // //       {/* Background Effects */}
// // //       <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center z-0">
// // //         <div className="absolute top-[-15%] w-[90%] h-[60%] bg-white/5 blur-[140px] rounded-full" />
// // //         <div
// // //          className="absolute inset-0 opacity-30 mix-blend-overlay"
// // //          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}
// // //         />
// // //       </div>

// // //       <motion.div
// // //         className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto flex-1"
// // //         variants={containerVariants}
// // //         initial="hidden"
// // //         animate="visible"
// // //       >
// // //         {/* --- Hero Typography --- */}
// // //         <div className="flex flex-col items-center justify-center">
// // //           <motion.h1
// // //             variants={textVariants}
// // //             className={cn(
// // //               "font-heading text-black tracking-tight z-10 flex flex-col text-left",
// // //               "text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]" 
// // //             )}
// // //           >
// // //             <span>REAL INK</span>
// // //             <span className="ml-[1.6em]">YOUR WAY.</span>
// // //           </motion.h1>

// // //           <motion.p
// // //             variants={textVariants}
// // //             className={cn(
// // //               "text-body text-black/70 max-w-3xl mt-4 z-10 leading-relaxed"
// // //             )}
// // //           >
// // //             Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically tested, permanent ink sinks into the top layer of your skin, fully developing into a bold,{" "}
// // //             <span className="text-[var(--color-brand-orange)] font-medium">realistic design within 24 hours.</span>
// // //           </motion.p>
// // //         </div>

// // //         {/* --- Interactive Concave 3D Gallery --- */}
// // //         <motion.div
// // //           className="relative w-full max-w-[1400px] h-[280px] sm:h-[350px] md:h-[400px] flex justify-center items-center mt-8 mb-6 z-20 cursor-grab active:cursor-grabbing"
// // //           style={{ 
// // //             perspective: "1500px", 
// // //             transformStyle: "preserve-3d",
// // //             touchAction: "pan-y" 
// // //           }}
// // //           onMouseEnter={() => setIsPaused(true)}
// // //           onMouseLeave={() => setIsPaused(false)}
// // //           onTouchStart={() => setIsPaused(true)}
// // //           onTouchEnd={() => setIsPaused(false)}
// // //           onPanEnd={(e, info) => {
// // //             const swipeThreshold = 50;
// // //             if (info.offset.x < -swipeThreshold) {
// // //               handleNext(); 
// // //             } else if (info.offset.x > swipeThreshold) {
// // //               handlePrev(); 
// // //             }
// // //           }}
// // //         >
// // //           {GALLERY_IMAGES.map((img, index) => {
// // //             let diff = index - activeIndex;
// // //             if (diff > totalCards / 2) diff -= totalCards;
// // //             if (diff < -totalCards / 2) diff += totalCards;

// // //             const config = getCardConfig(diff);
// // //             const isCenter = Math.abs(diff) === 0;

// // //             return (
// // //               <motion.div
// // //                 key={img.id}
// // //                 initial={false}
// // //                 // REMOVED 'y: 0' from animate so it doesn't fight with our scroll transform
// // //                 animate={{
// // //                   opacity: config.opacity,
// // //                   x: config.x,
// // //                   scale: config.scale,
// // //                   rotateY: config.rotateY,
// // //                   z: config.z,
// // //                 }}
// // //                 transition={{
// // //                   type: "spring",
// // //                   stiffness: 80,
// // //                   damping: 14,
// // //                   mass: 1,
// // //                 }}
// // //                 whileHover={{
// // //                   scale: config.scale + 0.05,
// // //                   // REMOVED 'y: -15' here as well, to prevent glitchy snapping if the user hovers while scrolling
// // //                   opacity: config.opacity > 0 ? 1 : 0, 
// // //                   transition: { duration: 0.4, ease: "easeOut" },
// // //                 }}
// // //                 onClick={() => {
// // //                   if (Math.abs(diff) <= 3) setActiveIndex(index);
// // //                 }}
// // //                 className="absolute origin-center shadow-2xl rounded-[20px] overflow-hidden border border-[var(--color-brand-orange)]/30 hover:border-[var(--color-brand-orange)] bg-black/40 backdrop-blur-sm group"
// // //                 style={{
// // //                   zIndex: config.zIndex,
// // //                   width: "clamp(140px, 16vw, 220px)",
// // //                   height: "clamp(200px, 25vw, 340px)",
// // //                   pointerEvents: Math.abs(diff) > 3 ? "none" : "auto",
// // //                   // Apply the scroll transform ONLY if it's the center card. Otherwise, lock to 0.
// // //                   y: isCenter ? activeCardY : 0, 
// // //                 }}
// // //               >
// // //                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-10 transition-opacity duration-500" />
                
// // //                 <Image
// // //                   src={img.src}
// // //                   alt={img.alt}
// // //                   fill
// // //                   className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
// // //                   sizes="(max-width: 768px) 30vw, 20vw"
// // //                   priority={isCenter}
// // //                 />
// // //               </motion.div>
// // //             );
// // //           })}
// // //         </motion.div>

// // //         {/* --- Manual Scrollbar --- */}
// // //         <motion.div 
// // //           variants={textVariants}
// // //           className="w-full max-w-[250px] md:max-w-[300px] mb-8 z-30 relative flex items-center justify-center"
// // //           onMouseEnter={() => setIsPaused(true)}
// // //           onMouseLeave={() => setIsPaused(false)}
// // //           onTouchStart={() => setIsPaused(true)}
// // //           onTouchEnd={() => setIsPaused(false)}
// // //         >
// // //           <input
// // //             type="range"
// // //             min={0}
// // //             max={totalCards - 1}
// // //             value={activeIndex}
// // //             onChange={(e) => setActiveIndex(Number(e.target.value))}
// // //             className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer outline-none transition-all
// // //               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.8)]
// // //               [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full
// // //               hover:bg-white/30"
// // //             aria-label="Gallery Scrollbar"
// // //           />
// // //         </motion.div>

// // //         {/* --- Call To Actions --- */}
// // //         <motion.div
// // //           variants={textVariants}
// // //           className="flex flex-col sm:flex-row items-center color-black justify-center gap-4 sm:gap-6 z-30 relative mt-auto md:mt-0"
// // //         >
// // //           <button 
// // //             className={cn(
// // //               "font-[family-name:var(--font-montserrat)] bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 text-sm md:text-base"
// // //             )}
// // //           >
// // //             Order Now
// // //           </button>
// // //         </motion.div>
// // //       </motion.div>
// // //     </section>
// // //   );
// // // }

// // "use client";

// // import React, { useState, useCallback, useRef } from "react";
// // import { motion, Variants, useInView, useScroll, useTransform } from "framer-motion";
// // import Image from "next/image";
// // import { cn } from "../../lib/utils"; // Ensure this path matches your utils.js file

// // // --- Mock Data ---
// // const GALLERY_IMAGES = [
// //   { id: 1, src: "/assets/images/Card1.png", alt: "Spider tattoo blackwork" },
// //   { id: 2, src: "/assets/images/Card2.png", alt: "Snake and dagger tattoo" },
// //   { id: 3, src: "/assets/images/Card3.png", alt: "Tattoo artist portrait" },
// //   { id: 4, src: "/assets/images/Card4.png", alt: "Spiked flail leg tattoo" },
// //   { id: 5, src: "/assets/images/Card5.png", alt: "Skull and crossbones tattoo" },
// //   { id: 6, src: "/assets/images/Card6.png", alt: "Skull and crossbones tattoo" },
// //   { id: 7, src: "/assets/images/Card7.png", alt: "Skull and crossbones tattoo" },
// //   { id: 8, src: "/assets/images/Card8.png", alt: "Rose tattoo design" },
// //   { id: 9, src: "/assets/images/Card3.png", alt: "Dragon back piece" },
// //   { id: 10, src: "/assets/images/Card4.png", alt: "Dragon back piece" },
// // ];

// // // --- Continuous 3D Configuration Generator ---
// // const getCardConfig = (diff: number) => {
// //   const absDiff = Math.abs(diff);
// //   const sign = Math.sign(diff) || 1;

// //   if (absDiff === 0) return { x: "0%", scale: 0.85, rotateY: 0, z: 0, zIndex: 10, opacity: 1 };
// //   if (absDiff === 1) return { x: `${sign * 95}%`, scale: 0.85, rotateY: sign * -12, z: 50, zIndex: 20, opacity: 0.95 };
// //   if (absDiff === 2) return { x: `${sign * 190}%`, scale: 0.9, rotateY: sign * -28, z: 100, zIndex: 30, opacity: 0.8 };
// //   if (absDiff === 3) return { x: `${sign * 290}%`, scale: 0.95, rotateY: sign * -38, z: 150, zIndex: 40, opacity: 0.6 };
// //   if (absDiff === 4) return { x: `${sign * 380}%`, scale: 1.1, rotateY: sign * -50, z: 250, zIndex: 50, opacity: 0 };
// //   if (absDiff >= 5) return { x: `${sign * 500}%`, scale: 1.2, rotateY: sign * -60, z: 300, zIndex: 60, opacity: 0 };

// //   return { x: "0%", scale: 0.8, opacity: 0 }; 
// // };

// // // --- Animation Variants ---
// // const containerVariants: Variants = {
// //   hidden: { opacity: 0 },
// //   visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
// // };

// // const textVariants: Variants = {
// //   hidden: { opacity: 0, y: 20 },
// //   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
// // };

// // export default function HeroSection() {
// //   const [activeIndex, setActiveIndex] = useState(0);
  
// //   const sectionRef = useRef<HTMLElement>(null);
// //   const isInView = useInView(sectionRef, { amount: 0.2 }); 

// //   // --- Scroll Animation Hooks ---
// //   const { scrollY } = useScroll();
// //   const activeCardY = useTransform(scrollY, [0, 1000], [0, 800]);

// //   const totalCards = GALLERY_IMAGES.length;

// //   const handleNext = useCallback(() => {
// //     setActiveIndex((prev) => (prev + 1) % totalCards);
// //   }, [totalCards]);

// //   const handlePrev = useCallback(() => {
// //     setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
// //   }, [totalCards]);

// //   return (
// //     <section 
// //       ref={sectionRef}
// //       className="relative w-full min-h-screen overflow-x-hidden flex flex-col items-center justify-center pt-32 pb-10 bg-white "
// //     >
// //       {/* Background Effects */}
// //       {/* <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center z-0">
// //         <div className="absolute top-[-15%] w-[90%] h-[60%] bg-white/5 blur-[140px] rounded-full" />
// //         <div
// //          className="absolute inset-0 opacity-30 mix-blend-overlay"
// //          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}
// //         />
// //       </div> */}

// //       <motion.div
// //         className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto flex-1"
// //         variants={containerVariants}
// //         initial="hidden"
// //         animate="visible"
// //       >
// //         {/* --- Hero Typography --- */}
// //         <div className="flex flex-col items-center justify-center">
// //           <motion.h1
// //             variants={textVariants}
// //             className={cn(
// //               "font-heading text-[var(--color-brand-orange)] tracking-tight z-10 flex flex-col text-left",
// //               "text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]" 
// //             )}
// //           >
// //             <span>REAL INK</span>
// //             <span className="ml-[1.6em]">YOUR WAY.</span>
// //           </motion.h1>

// //           <motion.p
// //             variants={textVariants}
// //             className={cn(
// //               "text-body text-black/70 max-w-3xl mt-4 z-10 leading-relaxed"
// //             )}
// //           >
// //             Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically tested, permanent ink sinks into the top layer of your skin, fully developing into a bold,{" "}
// //             <span className="text-[var(--color-brand-orange)] font-medium">realistic design within 24 hours.</span>
// //           </motion.p>
// //         </div>

// //         {/* --- Interactive Concave 3D Gallery --- */}
// //         <motion.div
// //           className="relative w-full max-w-[1400px] h-[280px] sm:h-[350px] md:h-[400px] flex justify-center items-center z-20 cursor-grab active:cursor-grabbing"
// //           style={{ 
// //             perspective: "1500px", 
// //             transformStyle: "preserve-3d",
// //             touchAction: "pan-y" 
// //           }}
// //           onPanEnd={(e, info) => {
// //             const swipeThreshold = 50;
// //             if (info.offset.x < -swipeThreshold) {
// //               handleNext(); 
// //             } else if (info.offset.x > swipeThreshold) {
// //               handlePrev(); 
// //             }
// //           }}
// //         >
// //           {GALLERY_IMAGES.map((img, index) => {
// //             let diff = index - activeIndex;
// //             if (diff > totalCards / 2) diff -= totalCards;
// //             if (diff < -totalCards / 2) diff += totalCards;

// //             const config = getCardConfig(diff);
// //             const isCenter = Math.abs(diff) === 0;

// //             return (
// //               <motion.div
// //                 key={img.id}
// //                 initial={false}
// //                 animate={{
// //                   opacity: config.opacity,
// //                   x: config.x,
// //                   scale: config.scale,
// //                   rotateY: config.rotateY,
// //                   z: config.z,
// //                 }}
// //                 transition={{
// //                   type: "spring",
// //                   stiffness: 80,
// //                   damping: 14,
// //                   mass: 1,
// //                 }}
// //                 whileHover={{
// //                   scale: config.scale + 0.05,
// //                   opacity: config.opacity > 0 ? 1 : 0, 
// //                   transition: { duration: 0.4, ease: "easeOut" },
// //                 }}
// //                 onClick={() => {
// //                   if (Math.abs(diff) <= 3) setActiveIndex(index);
// //                 }}
// //                 className="absolute origin-center shadow-2xl rounded-[20px] overflow-hidden border border-[var(--color-brand-orange)]/30 hover:border-[var(--color-brand-orange)] bg-black/40 backdrop-blur-sm group"
// //                 style={{
// //                   zIndex: config.zIndex,
// //                   width: "clamp(140px, 16vw, 220px)",
// //                   height: "clamp(200px, 25vw, 340px)",
// //                   pointerEvents: Math.abs(diff) > 3 ? "none" : "auto",
// //                   y: isCenter ? activeCardY : 0, 
// //                 }}
// //               >
// //                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-10 transition-opacity duration-500" />
                
// //                 <Image
// //                   src={img.src}
// //                   alt={img.alt}
// //                   fill
// //                   className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
// //                   sizes="(max-width: 768px) 30vw, 20vw"
// //                   priority={isCenter}
// //                 />
// //               </motion.div>
// //             );
// //           })}
// //         </motion.div>

// //         {/* --- Manual Scrollbar --- */}
// //         {/* <motion.div 
// //           variants={textVariants}
// //           className="w-full max-w-[250px] md:max-w-[300px] mb-8 z-30 relative flex items-center justify-center"
// //         >
// //           <input
// //             type="range"
// //             min={0}
// //             max={totalCards - 1}
// //             value={activeIndex}
// //             onChange={(e) => setActiveIndex(Number(e.target.value))}
// //             className="w-full h-1.5 bg-black rounded-full appearance-none cursor-pointer outline-none transition-all
// //               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.8)]
// //               [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full
// //               hover:bg-white/30"
// //             aria-label="Gallery Scrollbar"
// //           />
// //         </motion.div> */}

// //         <motion.div 
// //   variants={textVariants}
// //   className="w-full max-w-[250px] md:max-w-[300px] mb-8 z-30 relative flex items-center justify-center"
// // >
// //   <input
// //     type="range"
// //     min={0}
// //     max={totalCards - 1}
// //     value={activeIndex}
// //     onChange={(e) => setActiveIndex(Number(e.target.value))}
// //     className="w-full h-1.5 bg-black/20 rounded-full appearance-none cursor-pointer outline-none transition-all
// //       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,0,0,0.5)]
// //       [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full
// //       hover:bg-black/30"
// //     aria-label="Gallery Scrollbar"
// //   />
// // </motion.div>

// //         {/* --- Call To Actions --- */}
// //         <motion.div
// //           variants={textVariants}
// //           className="flex flex-col sm:flex-row items-center color-black justify-center gap-4 sm:gap-6 z-30 relative mt-auto md:mt-0"
// //         >
// //           <button 
// //             className={cn(
// //               "font-[family-name:var(--font-montserrat)] bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 text-sm md:text-base"
// //             )}
// //           >
// //             Order Now
// //           </button>
// //         </motion.div>
// //       </motion.div>
// //     </section>
// //   );
// // }

// "use client";

// import React, { useState, useCallback, useRef } from "react";
// import { motion, Variants, useInView, useScroll, useTransform } from "framer-motion";
// import Image from "next/image";
// import { cn } from "../../lib/utils"; // Ensure this path matches your utils.js file

// // --- Mock Data ---
// const GALLERY_IMAGES = [
//   { id: 1, src: "/assets/images/Card1.png", alt: "Spider tattoo blackwork" },
//   { id: 2, src: "/assets/images/Card2.png", alt: "Snake and dagger tattoo" },
//   { id: 3, src: "/assets/images/Card3.png", alt: "Tattoo artist portrait" },
//   { id: 4, src: "/assets/images/Card4.png", alt: "Spiked flail leg tattoo" },
//   { id: 5, src: "/assets/images/Card5.png", alt: "Skull and crossbones tattoo" },
//   { id: 6, src: "/assets/images/Card6.png", alt: "Skull and crossbones tattoo" },
//   { id: 7, src: "/assets/images/Card7.png", alt: "Skull and crossbones tattoo" },
//   { id: 8, src: "/assets/images/Card8.png", alt: "Rose tattoo design" },
//   { id: 9, src: "/assets/images/Card3.png", alt: "Dragon back piece" },
//   { id: 10, src: "/assets/images/Card4.png", alt: "Dragon back piece" },
// ];

// // --- Continuous 3D Configuration Generator ---
// const getCardConfig = (diff: number) => {
//   const absDiff = Math.abs(diff);
//   const sign = Math.sign(diff) || 1;

//   // FIX: Reversed zIndex so the center (absDiff === 0) has the highest value
//   if (absDiff === 0) return { x: "0%", scale: 0.85, rotateY: 0, z: 0, zIndex: 1000, opacity: 1 };
//   if (absDiff === 1) return { x: `${sign * 95}%`, scale: 0.85, rotateY: sign * -12, z: 50, zIndex: 90, opacity: 0.95 };
//   if (absDiff === 2) return { x: `${sign * 190}%`, scale: 0.9, rotateY: sign * -28, z: 100, zIndex: 80, opacity: 0.8 };
//   if (absDiff === 3) return { x: `${sign * 290}%`, scale: 0.95, rotateY: sign * -38, z: 150, zIndex: 70, opacity: 0.6 };
//   if (absDiff === 4) return { x: `${sign * 380}%`, scale: 1.1, rotateY: sign * -50, z: 250, zIndex: 60, opacity: 0 };
//   if (absDiff >= 5) return { x: `${sign * 500}%`, scale: 1.2, rotateY: sign * -60, z: 300, zIndex: 50, opacity: 0 };

//   return { x: "0%", scale: 0.8, opacity: 0, zIndex: 0 }; 
// };

// // --- Animation Variants ---
// const containerVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
// };

// const textVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
// };

// export default function HeroSection() {
//   const [activeIndex, setActiveIndex] = useState(0);
  
//   const sectionRef = useRef<HTMLElement>(null);
//   const isInView = useInView(sectionRef, { amount: 0.2 }); 

//   // --- Scroll Animation Hooks ---
//   const { scrollY } = useScroll();
//   const activeCardY = useTransform(scrollY, [0, 500], [0, 450]);
//   // Controls how far the card falls down when scrolling
//   //const activeCardY = useTransform(scrollY, [0, 800], [0, 600]);
  
//   // Controls the appearance of the "Buy Now" button attached to the fallen card
//   const buttonOpacity = useTransform(scrollY, [500, 700], [0, 1]);
//   const buttonX = useTransform(scrollY, [500, 700], [-30, 0]); // Slides out to the right
//   const buttonPointerEvents = useTransform(scrollY, [500, 699, 700], ["none", "none", "auto"]);

//   const totalCards = GALLERY_IMAGES.length;

//   const handleNext = useCallback(() => {
//     setActiveIndex((prev) => (prev + 1) % totalCards);
//   }, [totalCards]);

//   const handlePrev = useCallback(() => {
//     setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
//   }, [totalCards]);

//   return (
//     <section 
//       //ref={sectionRef}
//       //className="relative w-full min-h-screen overflow-x-hidden flex flex-col items-center justify-center pt-32 pb-10 bg-white"
//         className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-10 bg-white"
//       style={{ zIndex: 10 }}
//     >
//       <motion.div
//         className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto flex-1"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         style={{ perspective: "1500px" }}
//       >
//         {/* --- Hero Typography --- */}
//         <div className="flex flex-col items-center justify-center">
//           <motion.h1
//             variants={textVariants}
//             className={cn(
//               "font-heading text-[var(--color-brand-orange)] tracking-tight z-10 flex flex-col text-left",
//               "text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]" 
//             )}
//           >
//             <span>REAL INK</span>
//             <span className="ml-[1.6em]">YOUR WAY.</span>
//           </motion.h1>

//           <motion.p
//             variants={textVariants}
//             className={cn(
//               "text-body text-black/70 max-w-3xl mt-4 z-10 leading-relaxed"
//             )}
//           >
//             Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically tested, permanent ink sinks into the top layer of your skin, fully developing into a bold,{" "}
//             <span className="text-[var(--color-brand-orange)] font-medium">realistic design within 24 hours.</span>
//           </motion.p>
//         </div>

//         {/* --- Interactive Concave 3D Gallery --- */}
//         <motion.div
//           className="relative w-full max-w-[1400px] h-[280px] sm:h-[350px] md:h-[400px] flex justify-center items-center z-20 cursor-grab active:cursor-grabbing"
//           style={{ 
//             perspective: "1500px", 
//             transformStyle: "preserve-3d",
//             touchAction: "pan-y" 
//           }}
//           onPanEnd={(e, info) => {
//             const swipeThreshold = 50;
//             if (info.offset.x < -swipeThreshold) {
//               handleNext(); 
//             } else if (info.offset.x > swipeThreshold) {
//               handlePrev(); 
//             }
//           }}
//         >
//           {GALLERY_IMAGES.map((img, index) => {
//             let diff = index - activeIndex;
//             if (diff > totalCards / 2) diff -= totalCards;
//             if (diff < -totalCards / 2) diff += totalCards;

//             const config = getCardConfig(diff);
//             const isCenter = Math.abs(diff) === 0;

//             return (
//               <motion.div
//                 key={img.id}
//                 initial={false}
//                 animate={{
//                   opacity: config.opacity,
//                   x: config.x,
//                   scale: config.scale,
//                   rotateY: config.rotateY,
//                   z: config.z,
//                 }}
//                 transition={{
//                   type: "spring",
//                   stiffness: 80,
//                   damping: 14,
//                   mass: 1,
//                 }}
//                 whileHover={{
//                   scale: config.scale + 0.05,
//                   opacity: config.opacity > 0 ? 1 : 0, 
//                   transition: { duration: 0.4, ease: "easeOut" },
//                 }}
//                 onClick={() => {
//                   if (Math.abs(diff) <= 3) setActiveIndex(index);
//                 }}
//                 // FIX: Removed `overflow-hidden` from this wrapper so the side button doesn't get clipped
//                 className="absolute origin-center group"
//                 style={{
//                   zIndex: config.zIndex,
//                   width: "clamp(140px, 16vw, 220px)",
//                   height: "clamp(200px, 25vw, 340px)",
//                   pointerEvents: Math.abs(diff) > 3 ? "none" : "auto",
//                   y: isCenter ? activeCardY : 0, 
//                 }}
//               >
//                 {/* Visual Card Container */}
//                 <div className="relative w-full h-full shadow-2xl rounded-[20px] overflow-hidden border border-[var(--color-brand-orange)]/30 hover:border-[var(--color-brand-orange)] bg-black/40 backdrop-blur-sm">
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-10 transition-opacity duration-500" />
                  
//                   <Image
//                     src={img.src}
//                     alt={img.alt}
//                     fill
//                     className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
//                     sizes="(max-width: 768px) 30vw, 20vw"
//                     priority={isCenter}
//                   />
//                 </div>

//                 {/* Buy Now Button (Only on the center card) */}
//                 {isCenter && (
//                   <motion.div
//                     style={{
//                       opacity: buttonOpacity,
//                       x: buttonX,
//                       pointerEvents: buttonPointerEvents,
//                     }}
//                     className="absolute top-1/2 -right-[100px] md:-right-[140px] -translate-y-1/2 z-50"
//                   >
//                     <button className="bg-[var(--color-brand-orange)] text-white font-bold py-3 px-6 rounded-full shadow-lg whitespace-nowrap hover:scale-105 hover:shadow-[0_0_20px_var(--color-brand-orange)] transition-all duration-300">
//                       Buy Now
//                     </button>
//                   </motion.div>
//                 )}
//               </motion.div>
//             );
//           })}
//         </motion.div>

//         {/* --- Manual Scrollbar --- */}
//         <motion.div 
//           variants={textVariants}
//           className="w-full max-w-[250px] md:max-w-[300px] mb-8 z-30 relative flex items-center justify-center"
//         >
//           <input
//             type="range"
//             min={0}
//             max={totalCards - 1}
//             value={activeIndex}
//             onChange={(e) => setActiveIndex(Number(e.target.value))}
//             className="w-full h-1.5 bg-black/10 rounded-full appearance-none cursor-pointer outline-none transition-all
//               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,0,0,0.5)]
//               [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full
//               hover:bg-black/30"
//             aria-label="Gallery Scrollbar"
//           />
//         </motion.div>

//         {/* --- Call To Actions --- */}
//         <motion.div
//           variants={textVariants}
//           className="flex flex-col sm:flex-row items-center color-black justify-center gap-4 sm:gap-6 z-30 relative mt-auto md:mt-0"
//         >
//           <button 
//             className={cn(
//               "font-[family-name:var(--font-montserrat)] bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 text-sm md:text-base"
//             )}
//           >
//             Order Now
//           </button>
//         </motion.div>

//         <div className="z-10 mt-10">
//              {/* Your input range code */}
//         </div>

//       </motion.div>
//     </section>
//   );
// }

// export default function HomePage() {
//   return (
//     <div className="w-full flex flex-col items-center">
//         <HeroSection />
//       <section className="w-full h-40 bg-gray-50 flex items-center justify-center border-t border-gray-100">
//         <p className="font-montserrat text-gray-400 text-sm font-medium">More homepage content goes here...</p>
//       </section>

//     </div>
//   );
// }


// "use client";

// import React, { useState, useCallback, useRef, useEffect } from "react";
// import {
//   motion,
//   Variants,
//   useInView,
//   useScroll,
//   useTransform,
//   AnimatePresence,
//   useMotionValue,
//   useSpring,
// } from "framer-motion";
// import Image from "next/image";
// import { cn } from "../../lib/utils";

// // ─── Data ──────────────────────────────────────────────────────────────────────

// const GALLERY_IMAGES = [
//   { id: 1,  src: "/assets/images/Card1.png", alt: "Spider tattoo blackwork",     tag: "botanical" },
//   { id: 2,  src: "/assets/images/Card2.png", alt: "Snake and dagger tattoo",     tag: "darkarts"  },
//   { id: 3,  src: "/assets/images/Card3.png", alt: "Tattoo artist portrait",      tag: "botanical" },
//   { id: 4,  src: "/assets/images/Card4.png", alt: "Spiked flail leg tattoo",     tag: "darkarts"  },
//   { id: 5,  src: "/assets/images/Card5.png", alt: "Skull and crossbones tattoo", tag: "darkarts"  },
//   { id: 6,  src: "/assets/images/Card6.png", alt: "Skull and crossbones tattoo", tag: "darkarts"  },
//   { id: 7,  src: "/assets/images/Card7.png", alt: "Skull and crossbones tattoo", tag: "darkarts"  },
//   { id: 8,  src: "/assets/images/Card8.png", alt: "Rose tattoo design",          tag: "roses"     },
//   { id: 9,  src: "/assets/images/Card3.png", alt: "Dragon back piece",           tag: "botanical" },
//   { id: 10, src: "/assets/images/Card4.png", alt: "Dragon back piece",           tag: "darkarts"  },
// ];

// const PRODUCT_DATA = [
//   {
//     id: 1, tag: "botanical",
//     title: "Botanical Ink Tattoos",
//     desc: "Set of 15 waterproof designs. Lasts 3-5 days. Skin-safe.",
//     price: "$3.99", oldPrice: "$4.99",
//     image: "/assets/images/Card1.png",
//     sideImage: "/assets/images/tiktok.svg",
//   },
//   {
//     id: 2, tag: "darkarts",
//     title: "Dark Arts Collection",
//     desc: "Set of 10 waterproof designs. Lasts 3-5 days. Skin-safe.",
//     price: "$4.99", oldPrice: "$6.99",
//     image: "/assets/images/Card2.png",
//     sideImage: "/assets/images/tiktok.svg",
//   },
//   {
//     id: 3, tag: "roses",
//     title: "Classic Rose Sets",
//     desc: "Set of 5 waterproof designs. Lasts 3-5 days. Skin-safe.",
//     price: "$2.99", oldPrice: "$3.99",
//     image: "/assets/images/Card8.png",
//     sideImage: "/assets/images/tiktok.svg",
//   },
// ];

// // ─── Card layout configs ────────────────────────────────────────────────────────

// const getCardConfig = (diff: number) => {
//   const abs  = Math.abs(diff);
//   const sign = Math.sign(diff) || 1;
//   if (abs === 0) return { x: "0%",           scale: 0.85, rotateY: 0,           z: 0,   zIndex: 50, opacity: 1    };
//   if (abs === 1) return { x: `${sign*95}%`,  scale: 0.85, rotateY: sign * -12,  z: 50,  zIndex: 40, opacity: 0.95 };
//   if (abs === 2) return { x: `${sign*190}%`, scale: 0.9,  rotateY: sign * -28,  z: 100, zIndex: 30, opacity: 0.8  };
//   if (abs === 3) return { x: `${sign*310}%`, scale: 1,    rotateY: sign * -38,  z: 150, zIndex: 20, opacity: 0.6  };
//   if (abs === 4) return { x: `${sign*380}%`, scale: 1.1,  rotateY: sign * -50,  z: 250, zIndex: 10, opacity: 0    };
//   return           { x: `${sign*500}%`, scale: 1.2,  rotateY: sign * -60,  z: 300, zIndex: 5,  opacity: 0    };
// };

// // ─── Animation variants ─────────────────────────────────────────────────────────

// const containerVariants: Variants = {
//   hidden:  { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
// };

// const textVariants: Variants = {
//   hidden:  { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
// };

// // Wheel card: slides in from side with slight rotation, springs to center
// // const wheelVariants: Variants = {
// //   enter: (dir: number) => ({
// //     x:       dir > 0 ? -260 : 260,
// //     y:       -20,
// //     rotate:  dir > 0 ? -8 : 8,
// //     scale:   0.9,
// //     opacity: 0,
// //   }),
// //   center: {
// //     x: 0, y: 0, rotate: 0, scale: 1, opacity: 1,
// //     transition: {
// //       type:      "spring",
// //       stiffness: 55,
// //       damping:   13,
// //       mass:      1.1,
// //       opacity:   { duration: 0.22, ease: "easeIn" },
// //     },
// //   },
// //   exit: (dir: number) => ({
// //     x:       dir > 0 ? 240 : -240,
// //     y:       30,
// //     rotate:  dir > 0 ? 8 : -8,
// //     scale:   0.9,
// //     opacity: 0,
// //     transition: {
// //       type:      "spring",
// //       stiffness: 65,
// //       damping:   15,
// //       opacity:   { duration: 0.14, ease: "easeOut" },
// //     },
// //   }),
// // };

// const wheelVariants: Variants = {
//   enter: (dir: number) => ({
//     x:       dir > 0 ? -300 : 300,
//     y:       100,
//     rotate:  dir > 0 ? -30 : 30,
//     opacity: 0,
//   }),
//   center: {
//     x: 0, y: 0, rotate: 0, opacity: 1,
//     transition: {
//       type:      "spring",
//       stiffness: 80,
//       damping:   15,
//       opacity:   { duration: 0.25, ease: "easeIn" },
//     },
//   },
//   exit: (dir: number) => ({
//     x:       dir > 0 ? 300 : -300,
//     y:       100,
//     rotate:  dir > 0 ? 30 : -30,
//     opacity: 0,
//     transition: {
//       type:      "spring",
//       stiffness: 80,
//       damping:   15,
//       opacity:   { duration: 0.15, ease: "easeOut" },
//     },
//   }),
// };
 

// // Staggered content reveal after card settles (custom = delay index)
// const contentVariants: Variants = {
//   hidden:  { opacity: 0, y: 7 },
//   visible: (i: number) => ({
//     opacity: 1, y: 0,
//     transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.11 },
//   }),
// };

// // ─── Component ──────────────────────────────────────────────────────────────────

// export default function HeroSection() {
//   const [activeIndex,  setActiveIndex]  = useState(0);
//   const [productIndex, setProductIndex] = useState(0);
//   const [direction,    setDirection]    = useState(1);
//   const [cardSettled,  setCardSettled]  = useState(true);

//   // Refs to measure the card's start (gallery center) and end (product card) positions
//   const galleryCenterRef  = useRef<HTMLDivElement>(null);
//   const productCardRef    = useRef<HTMLDivElement>(null);
//   const sectionRef        = useRef<HTMLElement>(null);
//   useInView(sectionRef, { amount: 0.2 });

//   const { scrollY } = useScroll();

//   // The raw scroll-driven Y offset (0 → max)
//   const rawCardY = useTransform(scrollY, [0, 520], [0, 1]);

//   // Smoothed spring so the card glides rather than jerks
//   const smoothProgress = useSpring(rawCardY, { stiffness: 60, damping: 22, mass: 0.8 });

//   // Buy Now button: appears after card has largely fallen
//   const buttonOpacity       = useTransform(scrollY, [460, 620], [0, 1]);
//   const buttonX             = useTransform(scrollY, [460, 620], [-28, 0]);
//   const buttonPointerEvents = useTransform(scrollY, [460, 619, 620], ["none", "none", "auto"] as const);

//   // Product section fades in
//   const productSectionOpacity = useTransform(scrollY, [300, 600], [0, 1]);

//   const totalCards = GALLERY_IMAGES.length;

//   // Sync gallery active image → matching product via tag
//   useEffect(() => {
//     const tag = GALLERY_IMAGES[activeIndex]?.tag;
//     const idx = PRODUCT_DATA.findIndex((p) => p.tag === tag);
//     if (idx !== -1 && idx !== productIndex) {
//       setDirection(idx > productIndex ? 1 : -1);
//       setCardSettled(false);
//       setProductIndex(idx);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [activeIndex]);

//   const handleNext = useCallback(() => setActiveIndex((p) => (p + 1) % totalCards), [totalCards]);
//   const handlePrev = useCallback(() => setActiveIndex((p) => (p - 1 + totalCards) % totalCards), [totalCards]);

//   const nextProduct = () => {
//     setDirection(1);
//     setCardSettled(false);
//     setProductIndex((p) => (p + 1) % PRODUCT_DATA.length);
//   };
//   const prevProduct = () => {
//     setDirection(-1);
//     setCardSettled(false);
//     setProductIndex((p) => (p - 1 + PRODUCT_DATA.length) % PRODUCT_DATA.length);
//   };

//   const currentProduct = PRODUCT_DATA[productIndex];

//   // Measure pixel offsets of gallery-center card and product card slot,
//   // then drive the falling card's translateY between those two points.
//   const [dropDistance, setDropDistance] = useState(450);

//   useEffect(() => {
//     const measure = () => {
//       const galleryEl = galleryCenterRef.current;
//       const productEl = productCardRef.current;
//       if (!galleryEl || !productEl) return;
//       const gRect = galleryEl.getBoundingClientRect();
//       const pRect = productEl.getBoundingClientRect();
//       const dist  = pRect.top - gRect.top;
//       setDropDistance(dist);
//     };
//     measure();
//     window.addEventListener("resize", measure);
//     return () => window.removeEventListener("resize", measure);
//   }, []);

//   // Derived translateY: smoothly goes from 0 → dropDistance as progress 0→1
//   const cardTranslateY = useTransform(smoothProgress, [0, 1], [0, dropDistance]);

//   // Scale the card slightly as it "lands" (it starts small in gallery, expands to product size)
//   const cardScale = useTransform(smoothProgress, [0, 1], [1, 1.12]);

//   // Fade the gallery card's gradient overlay out as it drops
//   const overlayOpacity = useTransform(smoothProgress, [0, 0.6], [0.6, 0]);

//   return (
//     <div className="flex flex-col w-full overflow-x-hidden relative bg-[#f8f9fa]">

//       {/* ══ HERO + GALLERY ══════════════════════════════════════════════════════
//           IMPORTANT stacking context notes:
//           - The falling gallery card is rendered OUTSIDE any element that creates
//             a stacking context (no transform on parents above it in DOM order).
//           - It uses position:fixed-like logic via a fixed-positioned clone trick:
//             the real card in the gallery is invisible once scrolled; a separate
//             absolutely-positioned element at the root level carries the visual.
//           - For simplicity here we keep it in the DOM tree but give the section
//             itself position:relative with overflow:visible so the card can escape.
//       ═══════════════════════════════════════════════════════════════════════ */}

//       <section
//         ref={sectionRef}
//         className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-10"
//         style={{ zIndex: 10, overflow: "visible" }}
//       >
//         <motion.div
//           className="relative flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto flex-1"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           style={{ perspective: "1500px", overflow: "visible" }}
//         >
//           {/* Hero typography */}
//           <div className="flex flex-col items-center justify-center relative z-10">
//             <motion.h1
//               variants={textVariants}
//               className={cn(
//                 "font-heading text-[var(--color-brand-orange)] tracking-tight z-10 flex flex-col text-left",
//                 "text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]"
//               )}
//             >
//               <span>REAL INK</span>
//               <span className="ml-[1.6em]">YOUR WAY.</span>
//             </motion.h1>

//             <motion.p
//               variants={textVariants}
//               className="text-body text-black/70 max-w-3xl mt-4 z-10 leading-relaxed"
//             >
//               Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically
//               tested, permanent ink sinks into the top layer of your skin, fully developing into a bold,{" "}
//               <span className="text-[var(--color-brand-orange)] font-medium">
//                 realistic design within 24 hours.
//               </span>
//             </motion.p>
//           </div>

//           {/* ── 3D Gallery ───────────────────────────────────────────────────── */}
//           <motion.div
//             className="relative w-full max-w-[1400px] h-[280px] sm:h-[350px] md:h-[400px] flex justify-center items-center cursor-grab active:cursor-grabbing"
//             style={{
//               perspective:    "1500px",
//               transformStyle: "preserve-3d",
//               touchAction:    "pan-y",
//               zIndex:         20,
//               overflow:       "visible",
//             }}
//             onPanEnd={(_, info) => {
//               if (info.offset.x < -50) handleNext();
//               else if (info.offset.x > 50) handlePrev();
//             }}
//           >
//             {GALLERY_IMAGES.map((img, index) => {
//               let diff = index - activeIndex;
//               if (diff >  totalCards / 2) diff -= totalCards;
//               if (diff < -totalCards / 2) diff += totalCards;

//               const config   = getCardConfig(diff);
//               const isCenter = diff === 0;

//               return (
//                 <motion.div
//                   key={img.id}
//                   ref={isCenter ? galleryCenterRef : undefined}
//                   initial={false}
//                   animate={{
//                     opacity: config.opacity,
//                     x:       config.x,
//                     scale:   config.scale,
//                     rotateY: config.rotateY,
//                     z:       config.z,
//                   }}
//                   transition={{ type: "spring", stiffness: 80, damping: 14, mass: 1 }}
//                   whileHover={{
//                     scale:   config.scale + 0.05,
//                     opacity: config.opacity > 0 ? 1 : 0,
//                     transition: { duration: 0.4, ease: "easeOut" },
//                   }}
//                   onClick={() => { if (Math.abs(diff) <= 3) setActiveIndex(index); }}
//                   className="absolute origin-center group"
//                   style={{
//                     // zIndex must be very high so the card travels ABOVE the
//                     // scrollbar and Order Now button beneath the gallery.
//                     zIndex:        isCenter ? 9999 : config.zIndex,
//                     width:         "clamp(140px, 16vw, 220px)",
//                     height:        "clamp(200px, 25vw, 340px)",
//                     pointerEvents: Math.abs(diff) > 3 ? "none" : "auto",
//                     // Use the spring-smoothed translateY for the falling centre card
//                     y: isCenter ? cardTranslateY : 0,
//                     scale: isCenter
//                       ? undefined   // framer animate.scale handles non-center
//                       : undefined,
//                   }}
//                 >
//                   {/* Visual card shell */}
//                   <div className="relative w-full h-full shadow-2xl rounded-[20px] overflow-hidden border border-[var(--color-brand-orange)]/30 hover:border-[var(--color-brand-orange)] bg-black/40 backdrop-blur-sm">
//                     <motion.div
//                       className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"
//                       style={{ opacity: isCenter ? overlayOpacity : 0.6 }}
//                     />
//                     <Image
//                       src={img.src}
//                       alt={img.alt}
//                       fill
//                       className="object-cover transition-transform duration-700 group-hover:scale-110"
//                       sizes="(max-width: 768px) 30vw, 20vw"
//                       priority={isCenter}
//                     />
//                   </div>

//                   {/* Buy Now pill — only on center, fades in once card has dropped */}
//                   {isCenter && (
//                     <motion.div
//                       style={{
//                         opacity:       buttonOpacity,
//                         x:             buttonX,
//                         pointerEvents: buttonPointerEvents,
//                       }}
//                       className="absolute top-1/2 -right-[100px] md:-right-[140px] -translate-y-1/2 z-50"
//                     >
//                       <button className="bg-[var(--color-brand-orange)] text-white font-bold py-3 px-6 rounded-full shadow-lg whitespace-nowrap hover:scale-105 hover:shadow-[0_0_20px_var(--color-brand-orange)] transition-all duration-300">
//                         Buy Now
//                       </button>
//                     </motion.div>
//                   )}
//                 </motion.div>
//               );
//             })}
//           </motion.div>

//           {/* Scrollbar — lower z so falling card passes over it */}
//           <motion.div
//             variants={textVariants}
//             className="w-full max-w-[250px] md:max-w-[300px] mb-8 relative flex items-center justify-center"
//             style={{ zIndex: 5 }}
//           >
//             <input
//               type="range"
//               min={0}
//               max={totalCards - 1}
//               value={activeIndex}
//               onChange={(e) => setActiveIndex(Number(e.target.value))}
//               className="w-full h-1.5 bg-black/10 rounded-full appearance-none cursor-pointer outline-none transition-all
//                 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,0,0,0.5)]
//                 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full
//                 hover:bg-black/30"
//               aria-label="Gallery Scrollbar"
//             />
//           </motion.div>

//           {/* CTA — z-5 so falling card passes over it */}
//           <motion.div
//             variants={textVariants}
//             className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 relative mt-auto md:mt-0"
//             style={{ zIndex: 5 }}
//           >
//             <button
//               className={cn(
//                 "font-[family-name:var(--font-montserrat)] bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 text-sm md:text-base"
//               )}
//             >
//               Order Now
//             </button>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* ══ PRODUCT SHOWCASE ══════════════════════════════════════════════════════ */}
//       <section className="relative w-full min-h-screen flex items-center justify-center pt-20 pb-32">
//         <motion.div
//           className="relative w-full max-w-[1000px] aspect-square md:aspect-video flex items-center justify-center"
//           style={{ opacity: productSectionOpacity }}
//         >
//           {/* Background ring */}
//           <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full border border-gray-300/50 flex items-center justify-center z-0">
//             <span className="absolute top-4    md:top-10    text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">Easy to Apply</span>
//             <span className="absolute bottom-4 md:bottom-10 text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">Peel Off</span>
//             <span className="absolute left-4   md:left-10  -rotate-90  text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">Apply</span>
//             <span className="absolute right-4  md:right-10  rotate-90  text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">Feel It</span>
//           </div>

//           {/* Top pill */}
//           <div className="absolute top-[5%] left-1/2 -translate-x-1/2 bg-[#8C52FF] text-white px-6 py-2.5 rounded-full flex gap-12 items-center shadow-lg z-30">
//             <button className="text-xl hover:scale-110 transition-transform">≡</button>
//             <button className="text-xl hover:scale-110 transition-transform">🛒</button>
//           </div>

//           {/* Sale badge — animates in after card settles */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={`sale-${currentProduct.id}`}
//               initial={{ opacity: 0, x: -24, rotate: -12 }}
//               animate={
//                 cardSettled
//                   ? { opacity: 1, x: 0, rotate: -12,
//                       transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.18 } }
//                   : { opacity: 0, x: -24, rotate: -12,
//                       transition: { duration: 0.12 } }
//               }
//               exit={{ opacity: 0, x: -24, rotate: -12, transition: { duration: 0.12 } }}
//               className="absolute left-[5%] md:left-[10%] top-[25%] z-20 hover:scale-105 transition-transform cursor-default"
//             >
//               <div className="bg-white/80 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 rounded-xl shadow-xl border border-white">
//                 <p className="text-[#4b2787] font-[cursive] text-lg md:text-2xl">SALE</p>
//                 <p className="font-bold text-xl md:text-3xl text-[#2d1b54]">
//                   {currentProduct.price}{" "}
//                   <span className="text-xs md:text-sm line-through text-gray-400">{currentProduct.oldPrice}</span>
//                 </p>
//               </div>
//             </motion.div>
//           </AnimatePresence>

//           {/* Floating right element */}
//           <div className="absolute right-[5%] md:right-[10%] top-[35%] z-20 hover:scale-105 transition-transform">
//             <div className="bg-white/60 backdrop-blur-xl w-32 h-32 md:w-48 md:h-48 rounded-3xl shadow-xl border border-white/50 flex items-center justify-center relative">
//               <Image
//                 src={currentProduct.sideImage}
//                 alt="Side visual"
//                 width={80} height={80}
//                 className="object-contain hover:rotate-180 transition-transform duration-700 w-[60px] md:w-[100px]"
//               />
//               <span className="absolute top-2  right-2  md:top-4  md:right-4  text-[#2d1b54] text-lg md:text-2xl font-bold  rotate-45">↘</span>
//               <span className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-[#2d1b54] text-lg md:text-2xl font-bold -rotate-[135deg]">↘</span>
//             </div>
//           </div>

//           {/* ── Centre product card slot ──────────────────────────────────────────
//               Layout: strict top→bottom flex
//                 Title      shrink-0, padded
//                 Image      flex-1 min-h-0, fill object-cover
//                 Description shrink-0, padded

//               ref={productCardRef} lets us measure where this slot lives
//               so the falling gallery card knows exactly how far to travel.
//           ─────────────────────────────────────────────────────────────────── */}
//           <div
//             ref={productCardRef}
//             className="relative z-40 flex items-center justify-center w-[220px] h-[340px] md:w-[290px] md:h-[430px]"
//           >
//             <AnimatePresence custom={direction} mode="popLayout">
//               <motion.div
//                 key={currentProduct.id}
//                 custom={direction}
//                 variants={wheelVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 onAnimationComplete={(def) => {
//                   if (def === "center") setCardSettled(true);
//                 }}
//                 className="absolute inset-0 bg-white rounded-[28px] border border-gray-100 overflow-hidden flex flex-col"
//                 style={{
//                   boxShadow: "0 24px 60px rgba(0,0,0,0.13), 0 4px 18px rgba(0,0,0,0.07)",
//                 }}
//               >
//                 {/* Title */}
//                 <motion.div
//                   custom={0}
//                   variants={contentVariants}
//                   initial="hidden"
//                   animate={cardSettled ? "visible" : "hidden"}
//                   className="shrink-0 px-5 pt-5 pb-1 text-center"
//                 >
//                   <h3 className="text-base md:text-lg font-[cursive] text-[#2d1b54] leading-snug">
//                     {currentProduct.title}
//                   </h3>
//                 </motion.div>

//                 {/* Image — fills all remaining space cleanly */}
//                 <div className="relative flex-1 min-h-0 w-full overflow-hidden">
//                   <Image
//                     src={currentProduct.image}
//                     alt={currentProduct.title}
//                     fill
//                     className="object-cover object-center"
//                     sizes="(max-width: 768px) 220px, 290px"
//                   />
//                 </div>

//                 {/* Description */}
//                 <motion.div
//                   custom={1}
//                   variants={contentVariants}
//                   initial="hidden"
//                   animate={cardSettled ? "visible" : "hidden"}
//                   className="shrink-0 px-5 pt-2 pb-4 text-center bg-white"
//                 >
//                   <p className="text-[11px] md:text-xs text-gray-500 leading-snug">
//                     {currentProduct.desc}
//                   </p>
//                 </motion.div>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Bottom controls */}
//           <div className="absolute bottom-[2%] md:bottom-[10%] w-full flex justify-between px-[5%] md:px-[15%] items-center z-50">
//             <div className="flex gap-2 md:gap-4 items-center">
//               <button
//                 onClick={prevProduct}
//                 className="w-8 h-8 md:w-10 md:h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:scale-110 transition-transform text-[#2d1b54] font-bold"
//               >
//                 &lt;
//               </button>
//               <button className="bg-[#8C52FF] text-white px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium hover:bg-[#7340d8] shadow-lg shadow-purple-500/30 transition-colors">
//                 Buy Now
//               </button>
//             </div>
//             <div className="flex gap-2 md:gap-4 items-center">
//               <button className="bg-[#8C52FF] text-white px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium hover:bg-[#7340d8] shadow-lg shadow-purple-500/30 transition-colors flex items-center gap-2">
//                 Add to Cart 🛒
//               </button>
//               <button
//                 onClick={nextProduct}
//                 className="w-8 h-8 md:w-10 md:h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:scale-110 transition-transform text-[#2d1b54] font-bold"
//               >
//                 &gt;
//               </button>
//             </div>
//           </div>

//         </motion.div>
//       </section>
//     </div>
//   );
// }



// // "use client";

// // import React, { useState, useCallback, useRef, useEffect } from "react";
// // import {
// //   motion,
// //   Variants,
// //   useInView,
// //   useScroll,
// //   useTransform,
// //   AnimatePresence,
// //   useSpring,
// // } from "framer-motion";
// // import Image from "next/image";
// // import { cn } from "../../lib/utils";

// // // ─── Data ──────────────────────────────────────────────────────────────────────

// // const GALLERY_IMAGES = [
// //   { id: 1,  src: "/assets/images/Card1.png", alt: "Spider tattoo blackwork",     tag: "botanical" },
// //   { id: 2,  src: "/assets/images/Card2.png", alt: "Snake and dagger tattoo",     tag: "darkarts"  },
// //   { id: 3,  src: "/assets/images/Card3.png", alt: "Tattoo artist portrait",      tag: "botanical" },
// //   { id: 4,  src: "/assets/images/Card4.png", alt: "Spiked flail leg tattoo",     tag: "darkarts"  },
// //   { id: 5,  src: "/assets/images/Card5.png", alt: "Skull and crossbones tattoo", tag: "darkarts"  },
// //   { id: 6,  src: "/assets/images/Card6.png", alt: "Skull and crossbones tattoo", tag: "darkarts"  },
// //   { id: 7,  src: "/assets/images/Card7.png", alt: "Skull and crossbones tattoo", tag: "darkarts"  },
// //   { id: 8,  src: "/assets/images/Card8.png", alt: "Rose tattoo design",          tag: "roses"     },
// //   { id: 9,  src: "/assets/images/Card3.png", alt: "Dragon back piece",           tag: "botanical" },
// //   { id: 10, src: "/assets/images/Card4.png", alt: "Dragon back piece",           tag: "darkarts"  },
// // ];

// // const PRODUCT_DATA = [
// //   {
// //     id: 1, tag: "botanical",
// //     title: "Botanical Ink Tattoos",
// //     desc: "Set of 15 waterproof designs. Lasts 3-5 days. Skin-safe.",
// //     price: "$3.99", oldPrice: "$4.99",
// //     image: "/assets/images/Card1.png",
// //     sideImage: "/assets/images/tiktok.svg",
// //   },
// //   {
// //     id: 2, tag: "darkarts",
// //     title: "Dark Arts Collection",
// //     desc: "Set of 10 waterproof designs. Lasts 3-5 days. Skin-safe.",
// //     price: "$4.99", oldPrice: "$6.99",
// //     image: "/assets/images/Card2.png",
// //     sideImage: "/assets/images/tiktok.svg",
// //   },
// //   {
// //     id: 3, tag: "roses",
// //     title: "Classic Rose Sets",
// //     desc: "Set of 5 waterproof designs. Lasts 3-5 days. Skin-safe.",
// //     price: "$2.99", oldPrice: "$3.99",
// //     image: "/assets/images/Card8.png",
// //     sideImage: "/assets/images/tiktok.svg",
// //   },
// // ];

// // // ─── Card layout configs (FIXED SCALES & Z-INDEX) ───────────────────────────────

// // // const getCardConfig = (diff: number) => {
// // //   const abs  = Math.abs(diff);
// // //   const sign = Math.sign(diff) || 1;
// // //   // Outer cards scale down and push back (negative Z) to avoid looking "hovered"
// // //   if (abs === 0) return { x: "0%",           scale: 1,    rotateY: 0,           z: 0,    zIndex: 50, opacity: 1    };
// // //   if (abs === 1) return { x: `${sign*95}%`,  scale: 0.9,  rotateY: sign * -12,  z: -50,  zIndex: 40, opacity: 0.95 };
// // //   if (abs === 2) return { x: `${sign*190}%`, scale: 0.8,  rotateY: sign * -28,  z: -100, zIndex: 30, opacity: 0.8  };
// // //   if (abs === 3) return { x: `${sign*310}%`, scale: 0.7,  rotateY: sign * -38,  z: -150, zIndex: 20, opacity: 0.6  };
// // //   if (abs === 4) return { x: `${sign*380}%`, scale: 0.6,  rotateY: sign * -50,  z: -200, zIndex: 10, opacity: 0    };
// // //   return                { x: `${sign*500}%`, scale: 0.5,  rotateY: sign * -60,  z: -250, zIndex: 5,  opacity: 0    };
// // // };

// // const getCardConfig = (diff: number) => {
// //   const abs  = Math.abs(diff);
// //   const sign = Math.sign(diff) || 1;
// //   if (abs === 0) return { x: "0%",           scale: 0.85, rotateY: 0,           z: 0,   zIndex: 50, opacity: 1    };
// //   if (abs === 1) return { x: `${sign*95}%`,  scale: 0.85, rotateY: sign * -12,  z: 50,  zIndex: 40, opacity: 0.95 };
// //   if (abs === 2) return { x: `${sign*190}%`, scale: 0.9,  rotateY: sign * -28,  z: 100, zIndex: 30, opacity: 0.8  };
// //   if (abs === 3) return { x: `${sign*310}%`, scale: 1,    rotateY: sign * -38,  z: 150, zIndex: 20, opacity: 0.6  };
// //   if (abs === 4) return { x: `${sign*380}%`, scale: 1.1,  rotateY: sign * -50,  z: 250, zIndex: 10, opacity: 0    };
// //   return           { x: `${sign*500}%`, scale: 1.2,  rotateY: sign * -60,  z: 300, zIndex: 5,  opacity: 0    };
// // };

// // // ─── Animation variants ─────────────────────────────────────────────────────────

// // const containerVariants: Variants = {
// //   hidden:  { opacity: 0 },
// //   visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
// // };

// // const textVariants: Variants = {
// //   hidden:  { opacity: 0, y: 20 },
// //   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
// // };

// // const wheelVariants: Variants = {
// //   enter: (dir: number) => ({
// //     x:       dir > 0 ? 300 : -300, // Fixed direction logic
// //     y:       0,
// //     rotate:  dir > 0 ? 30 : -30,
// //     opacity: 0,
// //     scale:   0.8,
// //   }),
// //   center: {
// //     x: 0, y: 0, rotate: 0, opacity: 1, scale: 1,
// //     transition: {
// //       type:      "spring",
// //       stiffness: 80,
// //       damping:   15,
// //       opacity:   { duration: 0.25, ease: "easeIn" },
// //     },
// //   },
// //   exit: (dir: number) => ({
// //     x:       dir > 0 ? -300 : 300, // Fixed direction logic
// //     y:       0,
// //     rotate:  dir > 0 ? -30 : 30,
// //     opacity: 0,
// //     scale:   0.8,
// //     transition: {
// //       type:      "spring",
// //       stiffness: 80,
// //       damping:   15,
// //       opacity:   { duration: 0.15, ease: "easeOut" },
// //     },
// //   }),
// // };

// // const contentVariants: Variants = {
// //   hidden:  { opacity: 0, y: 7 },
// //   visible: (i: number) => ({
// //     opacity: 1, y: 0,
// //     transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.11 },
// //   }),
// // };

// // // ─── Component ──────────────────────────────────────────────────────────────────

// // export default function HeroSection() {
// //   const [activeIndex,  setActiveIndex]  = useState(0);
// //   const [productIndex, setProductIndex] = useState(0);
// //   const [direction,    setDirection]    = useState(1);
// //   const [cardSettled,  setCardSettled]  = useState(true);

// //   const galleryCenterRef  = useRef<HTMLDivElement>(null);
// //   const productCardRef    = useRef<HTMLDivElement>(null);
// //   const sectionRef        = useRef<HTMLElement>(null);
// //   useInView(sectionRef, { amount: 0.2 });

// //   const { scrollY } = useScroll();

// //   // The raw scroll-driven Y offset
// //   const rawCardY = useTransform(scrollY, [0, 520], [0, 1]);
// //   const smoothProgress = useSpring(rawCardY, { stiffness: 60, damping: 22, mass: 0.8 });

// //   // UI Reveal logic: these ONLY fade in when the card is 85% - 100% finished dropping
// //   const showcaseElementsOpacity = useTransform(smoothProgress, [0.85, 1], [0, 1]);
  
// //   // The falling gallery image fades OUT right as it lands, while the product card fades IN
// //   const galleryCardFadeOut = useTransform(smoothProgress, [0.9, 1], [1, 0]);
// //   const productCardOpacity = useTransform(smoothProgress, [0.9, 1], [0, 1]);

// //   const buttonOpacity       = useTransform(scrollY, [460, 620], [0, 1]);
// //   const buttonX             = useTransform(scrollY, [460, 620], [-28, 0]);
// //   const buttonPointerEvents = useTransform(scrollY, [460, 619, 620], ["none", "none", "auto"] as const);

// //   const totalCards = GALLERY_IMAGES.length;

// //   // Sync gallery active image → matching product via tag
// //   useEffect(() => {
// //     const tag = GALLERY_IMAGES[activeIndex]?.tag;
// //     const idx = PRODUCT_DATA.findIndex((p) => p.tag === tag);
// //     if (idx !== -1 && idx !== productIndex) {
// //       setDirection(idx > productIndex ? 1 : -1);
// //       setCardSettled(false);
// //       setProductIndex(idx);
// //     }
// //   }, [activeIndex, productIndex]);

// //   const handleNext = useCallback(() => setActiveIndex((p) => (p + 1) % totalCards), [totalCards]);
// //   const handlePrev = useCallback(() => setActiveIndex((p) => (p - 1 + totalCards) % totalCards), [totalCards]);

// //   // Syncing Bidirectionally: When bottom arrows are clicked, spin the top gallery!
// //   const nextProduct = () => {
// //     const nextIdx = (productIndex + 1) % PRODUCT_DATA.length;
// //     const tag = PRODUCT_DATA[nextIdx].tag;
// //     const gIdx = GALLERY_IMAGES.findIndex(img => img.tag === tag);
// //     if (gIdx !== -1) {
// //       setDirection(1);
// //       setActiveIndex(gIdx); // This spins the gallery to the right card automatically
// //     }
// //   };
  
// //   const prevProduct = () => {
// //     const prevIdx = (productIndex - 1 + PRODUCT_DATA.length) % PRODUCT_DATA.length;
// //     const tag = PRODUCT_DATA[prevIdx].tag;
// //     const gIdx = GALLERY_IMAGES.findIndex(img => img.tag === tag);
// //     if (gIdx !== -1) {
// //       setDirection(-1);
// //       setActiveIndex(gIdx); 
// //     }
// //   };

// //   const currentProduct = PRODUCT_DATA[productIndex];

// //   const [dropDistance, setDropDistance] = useState(450);

// //   useEffect(() => {
// //     const measure = () => {
// //       const galleryEl = galleryCenterRef.current;
// //       const productEl = productCardRef.current;
// //       if (!galleryEl || !productEl) return;
// //       const gRect = galleryEl.getBoundingClientRect();
// //       const pRect = productEl.getBoundingClientRect();
// //       const dist  = pRect.top - gRect.top;
// //       setDropDistance(dist);
// //     };
// //     measure();
// //     window.addEventListener("resize", measure);
// //     // Timeout allows DOM to settle before measuring
// //     setTimeout(measure, 100);
// //     return () => window.removeEventListener("resize", measure);
// //   }, []);

// //   const cardTranslateY = useTransform(smoothProgress, [0, 1], [0, dropDistance]);
// //   const cardScale = useTransform(smoothProgress, [0, 1], [1, 1.12]);
// //   const overlayOpacity = useTransform(smoothProgress, [0, 0.6], [0.6, 0]);

// //   return (
// //     <div className="flex flex-col w-full overflow-x-hidden relative bg-[#f8f9fa]">

// //       <section
// //         ref={sectionRef}
// //         className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-10"
// //         style={{ zIndex: 10, overflow: "visible" }}
// //       >
// //         <motion.div
// //           className="relative flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto flex-1"
// //           variants={containerVariants}
// //           initial="hidden"
// //           animate="visible"
// //           style={{ perspective: "1500px", overflow: "visible" }}
// //         >
// //           {/* Hero typography */}
// //           <div className="flex flex-col items-center justify-center relative z-10">
// //             <motion.h1
// //               variants={textVariants}
// //               className={cn(
// //                 "font-heading text-[var(--color-brand-orange)] tracking-tight z-10 flex flex-col text-left",
// //                 "text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]"
// //               )}
// //             >
// //               <span>REAL INK</span>
// //               <span className="ml-[1.6em]">YOUR WAY.</span>
// //             </motion.h1>

// //             <motion.p
// //               variants={textVariants}
// //               className="text-body text-black/70 max-w-3xl mt-4 z-10 leading-relaxed"
// //             >
// //               Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically
// //               tested, permanent ink sinks into the top layer of your skin, fully developing into a bold,{" "}
// //               <span className="text-[var(--color-brand-orange)] font-medium">
// //                 realistic design within 24 hours.
// //               </span>
// //             </motion.p>
// //           </div>

// //           {/* ── 3D Gallery ───────────────────────────────────────────────────── */}
// //           <motion.div
// //             className="relative w-full max-w-[1400px] h-[280px] sm:h-[350px] md:h-[400px] flex justify-center items-center cursor-grab active:cursor-grabbing"
// //             style={{
// //               perspective:    "1500px",
// //               transformStyle: "preserve-3d",
// //               touchAction:    "pan-y",
// //               zIndex:         20,
// //               overflow:       "visible",
// //             }}
// //             onPanEnd={(_, info) => {
// //               if (info.offset.x < -50) handleNext();
// //               else if (info.offset.x > 50) handlePrev();
// //             }}
// //           >
// //             {GALLERY_IMAGES.map((img, index) => {
// //               let diff = index - activeIndex;
// //               if (diff >  totalCards / 2) diff -= totalCards;
// //               if (diff < -totalCards / 2) diff += totalCards;

// //               const config   = getCardConfig(diff);
// //               const isCenter = diff === 0;

// //               return (
// //                 <motion.div
// //                   key={img.id}
// //                   ref={isCenter ? galleryCenterRef : undefined}
// //                   initial={false}
// //                   animate={{
// //                     opacity: config.opacity,
// //                     x:       config.x,
// //                     rotateY: config.rotateY,
// //                     z:       config.z,
// //                     scale:   isCenter ? undefined : config.scale // Let Framer animate edge cards smoothly
// //                   }}
// //                   transition={{ type: "spring", stiffness: 80, damping: 14, mass: 1 }}
// //                   whileHover={{
// //                     scale:   isCenter ? undefined : config.scale + 0.05,
// //                     opacity: config.opacity > 0 ? 1 : 0,
// //                     transition: { duration: 0.4, ease: "easeOut" },
// //                   }}
// //                   onClick={() => { if (Math.abs(diff) <= 3) setActiveIndex(index); }}
// //                   className="absolute origin-center group"
// //                   style={{
// //                     zIndex:        isCenter ? 9999 : config.zIndex,
// //                     width:         "clamp(140px, 16vw, 220px)",
// //                     height:        "clamp(200px, 25vw, 340px)",
// //                     pointerEvents: Math.abs(diff) > 3 ? "none" : "auto",
// //                     y: isCenter ? cardTranslateY : 0,
// //                     // Center card uses the dynamic spring scale to enlarge as it drops
// //                     ...(isCenter ? { scale: cardScale } : {}) 
// //                   }}
// //                 >
// //                   {/* Visual card shell: Fades out EXACTLY as it lands so the product card can seamlessly fade in beneath it */}
// //                   <motion.div 
// //                     style={{ opacity: isCenter ? galleryCardFadeOut : 1 }}
// //                     className="relative w-full h-full shadow-2xl rounded-[20px] overflow-hidden border border-[var(--color-brand-orange)]/30 hover:border-[var(--color-brand-orange)] bg-black/40 backdrop-blur-sm"
// //                   >
// //                     <motion.div
// //                       className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"
// //                       style={{ opacity: isCenter ? overlayOpacity : 0.6 }}
// //                     />
// //                     <Image
// //                       src={img.src}
// //                       alt={img.alt}
// //                       fill
// //                       className="object-cover transition-transform duration-700 group-hover:scale-110"
// //                       sizes="(max-width: 768px) 30vw, 20vw"
// //                       priority={isCenter}
// //                     />
// //                   </motion.div>

// //                   {/* Buy Now pill on gallery */}
// //                   {isCenter && (
// //                     <motion.div
// //                       style={{
// //                         opacity:       buttonOpacity,
// //                         x:             buttonX,
// //                         pointerEvents: buttonPointerEvents,
// //                       }}
// //                       className="absolute top-1/2 -right-[100px] md:-right-[140px] -translate-y-1/2 z-50"
// //                     >
// //                       <button className="bg-[var(--color-brand-orange)] text-white font-bold py-3 px-6 rounded-full shadow-lg whitespace-nowrap hover:scale-105 hover:shadow-[0_0_20px_var(--color-brand-orange)] transition-all duration-300">
// //                         Buy Now
// //                       </button>
// //                     </motion.div>
// //                   )}
// //                 </motion.div>
// //               );
// //             })}
// //           </motion.div>

// //           <motion.div
// //             variants={textVariants}
// //             className="w-full max-w-[250px] md:max-w-[300px] mb-8 relative flex items-center justify-center"
// //             style={{ zIndex: 5 }}
// //           >
// //             <input
// //               type="range"
// //               min={0}
// //               max={totalCards - 1}
// //               value={activeIndex}
// //               onChange={(e) => setActiveIndex(Number(e.target.value))}
// //               className="w-full h-1.5 bg-black/10 rounded-full appearance-none cursor-pointer outline-none transition-all
// //                 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,0,0,0.5)]
// //                 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full
// //                 hover:bg-black/30"
// //               aria-label="Gallery Scrollbar"
// //             />
// //           </motion.div>

// //           <motion.div
// //             variants={textVariants}
// //             className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 relative mt-auto md:mt-0"
// //             style={{ zIndex: 5 }}
// //           >
// //             <button
// //               className={cn(
// //                 "font-[family-name:var(--font-montserrat)] bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 text-sm md:text-base"
// //               )}
// //             >
// //               Order Now
// //             </button>
// //           </motion.div>
// //         </motion.div>
// //       </section>

// //       {/* ══ PRODUCT SHOWCASE ══════════════════════════════════════════════════════ */}
// //       <section className="relative w-full min-h-screen flex items-center justify-center pt-20 pb-32">
// //         <motion.div
// //           className="relative w-full max-w-[1000px] aspect-square md:aspect-video flex items-center justify-center"
// //           style={{ opacity: showcaseElementsOpacity }} // Wrapper opacity controls entirely by scroll progress!
// //         >
// //           {/* Background ring */}
// //           <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full border border-gray-300/50 flex items-center justify-center z-0">
// //           <motion.div
// //                   custom={0}
// //                   variants={contentVariants}
// //                   initial="hidden"
// //                   animate={cardSettled ? "visible" : "hidden"}
// //                   className="shrink-0 px-5 pt-5 pb-1 text-center"
// //                 >
// //                   <h3 className="text-base md:text-lg font-[cursive] text-[#2d1b54] leading-snug">
// //                     {currentProduct.title}
// //                   </h3>
// //             </motion.div>
// //             {/* <span className="absolute top-4    md:top-10    text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">Easy to Apply</span> */}
// //             <span className="absolute bottom-4 md:bottom-10 text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">Peel Off</span>
// //             <span className="absolute left-4   md:left-10  -rotate-90  text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">Apply</span>
// //              {/*<span className="absolute right-4  md:right-10  rotate-90  text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">Feel It</span> */}
// //                <motion.div
// //                   custom={1}
// //                   variants={contentVariants}
// //                   initial="hidden"
// //                   animate={cardSettled ? "visible" : "hidden"}
// //                   className="shrink-0 px-5 pt-2 pb-4 text-center bg-white"
// //                 >
// //                   <p className="text-[11px] md:text-xs text-gray-500 leading-snug">
// //                     {currentProduct.desc}
// //                   </p>
// //                 </motion.div>
// //           </div>

// //           <div className="absolute top-[5%] left-1/2 -translate-x-1/2 bg-[#8C52FF] text-white px-6 py-2.5 rounded-full flex gap-12 items-center shadow-lg z-30">
// //             {/* <button className="text-xl hover:scale-110 transition-transform">≡</button>
// //             <button className="text-xl hover:scale-110 transition-transform">🛒</button> */}
// //             <motion.div
// //                   custom={0}
// //                   variants={contentVariants}
// //                   initial="hidden"
// //                   animate={cardSettled ? "visible" : "hidden"}
// //                   className="shrink-0 px-5 pt-5 pb-1 text-center"
// //                 >
// //                   <h3 className="text-base md:text-lg font-[cursive] text-[#2d1b54] leading-snug">
// //                     {currentProduct.title}
// //                   </h3>
// //             </motion.div>
// //           </div>

// //           <AnimatePresence mode="wait">
// //             <motion.div
// //               key={`sale-${currentProduct.id}`}
// //               initial={{ opacity: 0, x: -24, rotate: -12 }}
// //               animate={
// //                 cardSettled
// //                   ? { opacity: 1, x: 0, rotate: -12, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.18 } }
// //                   : { opacity: 0, x: -24, rotate: -12, transition: { duration: 0.12 } }
// //               }
// //               exit={{ opacity: 0, x: -24, rotate: -12, transition: { duration: 0.12 } }}
// //               className="absolute left-[5%] md:left-[10%] top-[25%] z-20 hover:scale-105 transition-transform cursor-default"
// //             >
// //               <div className="bg-white/80 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 rounded-xl shadow-xl border border-white">
// //                 <p className="text-[#4b2787] font-[cursive] text-lg md:text-2xl">SALE</p>
// //                 <p className="font-bold text-xl md:text-3xl text-[#2d1b54]">
// //                   {currentProduct.price}{" "}
// //                   <span className="text-xs md:text-sm line-through text-gray-400">{currentProduct.oldPrice}</span>
// //                 </p>
// //               </div>
// //             </motion.div>
// //           </AnimatePresence>

// //           <div className="absolute right-[5%] md:right-[10%] top-[35%] z-20 hover:scale-105 transition-transform">
// //             <div className="bg-white/60 backdrop-blur-xl w-32 h-32 md:w-48 md:h-48 rounded-3xl shadow-xl border border-white/50 flex items-center justify-center relative">
// //               <Image
// //                 src={currentProduct.sideImage}
// //                 alt="Side visual"
// //                 width={80} height={80}
// //                 className="object-contain hover:rotate-180 transition-transform duration-700 w-[60px] md:w-[100px]"
// //               />
// //               <span className="absolute top-2  right-2  md:top-4  md:right-4  text-[#2d1b54] text-lg md:text-2xl font-bold  rotate-45">↘</span>
// //               <span className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-[#2d1b54] text-lg md:text-2xl font-bold -rotate-[135deg]">↘</span>
// //             </div>
// //           </div>

// //           {/* ── Target Product Card Slot ────────────────────────────────────────── */}
// //           <motion.div
// //             ref={productCardRef}
// //             style={{ opacity: productCardOpacity }} // Fades in as the gallery card fades out above it
// //             className="relative z-40 flex items-center justify-center w-[220px] h-[340px] md:w-[290px] md:h-[430px]"
// //           >
// //             <AnimatePresence custom={direction} mode="popLayout">
// //               <motion.div
// //                 key={currentProduct.id}
// //                 custom={direction}
// //                 variants={wheelVariants}
// //                 initial="enter"
// //                 animate="center"
// //                 exit="exit"
// //                 onAnimationComplete={(def) => {
// //                   if (def === "center") setCardSettled(true);
// //                 }}
// //                 className="absolute inset-0 bg-white rounded-[28px] border border-gray-100 overflow-hidden flex flex-col"
// //                 style={{
// //                   boxShadow: "0 24px 60px rgba(0,0,0,0.13), 0 4px 18px rgba(0,0,0,0.07)",
// //                 }}
// //               >
// //                 {/* <motion.div
// //                   custom={0}
// //                   variants={contentVariants}
// //                   initial="hidden"
// //                   animate={cardSettled ? "visible" : "hidden"}
// //                   className="shrink-0 px-5 pt-5 pb-1 text-center"
// //                 >
// //                   <h3 className="text-base md:text-lg font-[cursive] text-[#2d1b54] leading-snug">
// //                     {currentProduct.title}
// //                   </h3>
// //                 </motion.div> */}

// //                 <div className="relative flex-1 min-h-0 w-full overflow-hidden">
// //                   <Image
// //                     src={currentProduct.image}
// //                     alt={currentProduct.title}
// //                     fill
// //                     className="object-cover object-center"
// //                     sizes="(max-width: 768px) 220px, 290px"
// //                   />
// //                 </div>

// //                 {/* <motion.div
// //                   custom={1}
// //                   variants={contentVariants}
// //                   initial="hidden"
// //                   animate={cardSettled ? "visible" : "hidden"}
// //                   className="shrink-0 px-5 pt-2 pb-4 text-center bg-white"
// //                 >
// //                   <p className="text-[11px] md:text-xs text-gray-500 leading-snug">
// //                     {currentProduct.desc}
// //                   </p>
// //                 </motion.div> */}
// //               </motion.div>
// //             </AnimatePresence>
// //           </motion.div>

// //           {/* Bottom controls */}
// //           <div className="absolute bottom-[2%] md:bottom-[10%] w-full flex justify-between px-[5%] md:px-[15%] items-center z-50">
// //             <div className="flex gap-2 md:gap-4 items-center">
// //               <button
// //                 onClick={prevProduct}
// //                 className="w-8 h-8 md:w-10 md:h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:scale-110 transition-transform text-[#2d1b54] font-bold"
// //               >
// //                 &lt;
// //               </button>
// //               <button className="bg-[#8C52FF] text-white px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium hover:bg-[#7340d8] shadow-lg shadow-purple-500/30 transition-colors">
// //                 Buy Now
// //               </button>
// //             </div>
// //             <div className="flex gap-2 md:gap-4 items-center">
// //               <button className="bg-[#8C52FF] text-white px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium hover:bg-[#7340d8] shadow-lg shadow-purple-500/30 transition-colors flex items-center gap-2">
// //                 Add to Cart 🛒
// //               </button>
// //               <button
// //                 onClick={nextProduct}
// //                 className="w-8 h-8 md:w-10 md:h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:scale-110 transition-transform text-[#2d1b54] font-bold"
// //               >
// //                 &gt;
// //               </button>
// //             </div>
// //           </div>
// //         </motion.div>
// //       </section>
// //     </div>
// //   );
// // }



// "use client";

// import React, { useState, useCallback, useRef, useEffect } from "react";
// import {
//   motion,
//   Variants,
//   useInView,
//   useScroll,
//   useTransform,
//   AnimatePresence,
//   useSpring,
// } from "framer-motion";
// import Image from "next/image";
// import { cn } from "../../lib/utils";

// // ─── Data ──────────────────────────────────────────────────────────────────────

// const GALLERY_IMAGES = [
//   { id: 1,  src: "/assets/images/Card1.png", alt: "Spider tattoo blackwork",     tag: "botanical" },
//   { id: 2,  src: "/assets/images/Card2.png", alt: "Snake and dagger tattoo",     tag: "darkarts"  },
//   { id: 3,  src: "/assets/images/Card3.png", alt: "Tattoo artist portrait",      tag: "botanical" },
//   { id: 4,  src: "/assets/images/Card4.png", alt: "Spiked flail leg tattoo",     tag: "darkarts"  },
//   { id: 5,  src: "/assets/images/Card5.png", alt: "Skull and crossbones tattoo", tag: "darkarts"  },
//   { id: 6,  src: "/assets/images/Card6.png", alt: "Skull and crossbones tattoo", tag: "darkarts"  },
//   { id: 7,  src: "/assets/images/Card7.png", alt: "Skull and crossbones tattoo", tag: "darkarts"  },
//   { id: 8,  src: "/assets/images/Card8.png", alt: "Rose tattoo design",          tag: "roses"     },
//   { id: 9,  src: "/assets/images/Card3.png", alt: "Dragon back piece",           tag: "botanical" },
//   { id: 10, src: "/assets/images/Card4.png", alt: "Dragon back piece",           tag: "darkarts"  },
// ];

// const PRODUCT_DATA = [
//   {
//     id: 1, tag: "botanical",
//     title: "Botanical Ink Tattoos",
//     desc: "Set of 15 waterproof designs. Lasts 3-5 days. Skin-safe.",
//     price: "$3.99", oldPrice: "$4.99",
//     image: "/assets/images/Card1.png",
//     sideImage: "/assets/images/tiktok.svg",
//   },
//   {
//     id: 2, tag: "darkarts",
//     title: "Dark Arts Collection",
//     desc: "Set of 10 waterproof designs. Lasts 3-5 days. Skin-safe.",
//     price: "$4.99", oldPrice: "$6.99",
//     image: "/assets/images/Card2.png",
//     sideImage: "/assets/images/tiktok.svg",
//   },
//   {
//     id: 3, tag: "roses",
//     title: "Classic Rose Sets",
//     desc: "Set of 5 waterproof designs. Lasts 3-5 days. Skin-safe.",
//     price: "$2.99", oldPrice: "$3.99",
//     image: "/assets/images/Card8.png",
//     sideImage: "/assets/images/tiktok.svg",
//   },
// ];

// // ─── Card layout configs (FIXED SCALES & Z-INDEX) ───────────────────────────────

// // const getCardConfig = (diff: number) => {
// //   const abs  = Math.abs(diff);
// //   const sign = Math.sign(diff) || 1;
// //   // Outer cards scale down and push back (negative Z) to avoid looking "hovered"
// //   if (abs === 0) return { x: "0%",           scale: 1,    rotateY: 0,           z: 0,    zIndex: 50, opacity: 1    };
// //   if (abs === 1) return { x: `${sign*95}%`,  scale: 0.9,  rotateY: sign * -12,  z: -50,  zIndex: 40, opacity: 0.95 };
// //   if (abs === 2) return { x: `${sign*190}%`, scale: 0.8,  rotateY: sign * -28,  z: -100, zIndex: 30, opacity: 0.8  };
// //   if (abs === 3) return { x: `${sign*310}%`, scale: 0.7,  rotateY: sign * -38,  z: -150, zIndex: 20, opacity: 0.6  };
// //   if (abs === 4) return { x: `${sign*380}%`, scale: 0.6,  rotateY: sign * -50,  z: -200, zIndex: 10, opacity: 0    };
// //   return                { x: `${sign*500}%`, scale: 0.5,  rotateY: sign * -60,  z: -250, zIndex: 5,  opacity: 0    };
// // };

// const getCardConfig = (diff: number) => {
//   const abs  = Math.abs(diff);
//   const sign = Math.sign(diff) || 1;
//   if (abs === 0) return { x: "0%",           scale: 0.85, rotateY: 0,           z: 0,   zIndex: 50, opacity: 1    };
//   if (abs === 1) return { x: `${sign*95}%`,  scale: 0.85, rotateY: sign * -12,  z: 50,  zIndex: 40, opacity: 0.95 };
//   if (abs === 2) return { x: `${sign*190}%`, scale: 0.9,  rotateY: sign * -28,  z: 100, zIndex: 30, opacity: 0.8  };
//   if (abs === 3) return { x: `${sign*310}%`, scale: 1,    rotateY: sign * -38,  z: 150, zIndex: 20, opacity: 0.6  };
//   if (abs === 4) return { x: `${sign*380}%`, scale: 1.1,  rotateY: sign * -50,  z: 250, zIndex: 10, opacity: 0    };
//   return           { x: `${sign*500}%`, scale: 1.2,  rotateY: sign * -60,  z: 300, zIndex: 5,  opacity: 0    };
// };

// // ─── Animation variants ─────────────────────────────────────────────────────────

// const containerVariants: Variants = {
//   hidden:  { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
// };

// const textVariants: Variants = {
//   hidden:  { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
// };

// const wheelVariants: Variants = {
//   enter: (dir: number) => ({
//     x:       dir > 0 ? 300 : -300, // Fixed direction logic
//     y:       0,
//     rotate:  dir > 0 ? 30 : -30,
//     opacity: 0,
//     scale:   0.8,
//   }),
//   center: {
//     x: 0, y: 0, rotate: 0, opacity: 1, scale: 1,
//     transition: {
//       type:      "spring",
//       stiffness: 80,
//       damping:   15,
//       opacity:   { duration: 0.25, ease: "easeIn" },
//     },
//   },
//   exit: (dir: number) => ({
//     x:       dir > 0 ? -300 : 300, // Fixed direction logic
//     y:       0,
//     rotate:  dir > 0 ? -30 : 30,
//     opacity: 0,
//     scale:   0.8,
//     transition: {
//       type:      "spring",
//       stiffness: 80,
//       damping:   15,
//       opacity:   { duration: 0.15, ease: "easeOut" },
//     },
//   }),
// };

// const contentVariants: Variants = {
//   hidden:  { opacity: 0, y: 7 },
//   visible: (i: number) => ({
//     opacity: 1, y: 0,
//     transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.11 },
//   }),
// };

// // ─── Component ──────────────────────────────────────────────────────────────────

// export default function HeroSection() {
//   const [activeIndex,  setActiveIndex]  = useState(0);
//   const [productIndex, setProductIndex] = useState(0);
//   const [direction,    setDirection]    = useState(1);
//   const [cardSettled,  setCardSettled]  = useState(true);

//   const galleryCenterRef  = useRef<HTMLDivElement>(null);
//   const productCardRef    = useRef<HTMLDivElement>(null);
//   const sectionRef        = useRef<HTMLElement>(null);
//   useInView(sectionRef, { amount: 0.2 });

//   const { scrollY } = useScroll();

//   // The raw scroll-driven Y offset
//   const rawCardY = useTransform(scrollY, [0, 520], [0, 1]);
//   const smoothProgress = useSpring(rawCardY, { stiffness: 60, damping: 22, mass: 0.8 });

//   // UI Reveal logic: these ONLY fade in when the card is 85% - 100% finished dropping
//   const showcaseElementsOpacity = useTransform(smoothProgress, [0.85, 1], [0, 1]);
  
//   // The falling gallery image stays fully visible during the entire drop, only fades out AFTER landing
//   // We use a two-phase approach: card stays opaque through the drop (0→1 progress stays at 1),
//   // then a separate cardHasLanded state triggers the actual fade-out swap.
//   const galleryCardFadeOut = useTransform(smoothProgress, [0.95, 1], [1, 0]);
//   const productCardOpacity = useTransform(smoothProgress, [0.95, 1], [0, 1]);

//   const buttonOpacity       = useTransform(scrollY, [460, 620], [0, 1]);
//   const buttonX             = useTransform(scrollY, [460, 620], [-28, 0]);
//   const buttonPointerEvents = useTransform(scrollY, [460, 619, 620], ["none", "none", "auto"] as const);

//   const totalCards = GALLERY_IMAGES.length;

//   // Sync gallery active image → matching product via tag
//   useEffect(() => {
//     const tag = GALLERY_IMAGES[activeIndex]?.tag;
//     const idx = PRODUCT_DATA.findIndex((p) => p.tag === tag);
//     if (idx !== -1 && idx !== productIndex) {
//       setDirection(idx > productIndex ? 1 : -1);
//       setCardSettled(false);
//       setProductIndex(idx);
//     }
//   }, [activeIndex, productIndex]);

//   const handleNext = useCallback(() => setActiveIndex((p) => (p + 1) % totalCards), [totalCards]);
//   const handlePrev = useCallback(() => setActiveIndex((p) => (p - 1 + totalCards) % totalCards), [totalCards]);

//   // Syncing Bidirectionally: When bottom arrows are clicked, spin the top gallery!
//   const nextProduct = () => {
//     const nextIdx = (productIndex + 1) % PRODUCT_DATA.length;
//     const tag = PRODUCT_DATA[nextIdx].tag;
//     const gIdx = GALLERY_IMAGES.findIndex(img => img.tag === tag);
//     if (gIdx !== -1) {
//       setDirection(1);
//       setActiveIndex(gIdx); // This spins the gallery to the right card automatically
//     }
//   };
  
//   const prevProduct = () => {
//     const prevIdx = (productIndex - 1 + PRODUCT_DATA.length) % PRODUCT_DATA.length;
//     const tag = PRODUCT_DATA[prevIdx].tag;
//     const gIdx = GALLERY_IMAGES.findIndex(img => img.tag === tag);
//     if (gIdx !== -1) {
//       setDirection(-1);
//       setActiveIndex(gIdx); 
//     }
//   };

//   const currentProduct = PRODUCT_DATA[productIndex];

//   const [dropDistance, setDropDistance] = useState(450);

//   useEffect(() => {
//     const measure = () => {
//       const galleryEl = galleryCenterRef.current;
//       const productEl = productCardRef.current;
//       if (!galleryEl || !productEl) return;
//       const gRect = galleryEl.getBoundingClientRect();
//       const pRect = productEl.getBoundingClientRect();
//       const dist  = pRect.top - gRect.top;
//       setDropDistance(dist);
//     };
//     measure();
//     window.addEventListener("resize", measure);
//     // Timeout allows DOM to settle before measuring
//     setTimeout(measure, 100);
//     return () => window.removeEventListener("resize", measure);
//   }, []);

//   const cardTranslateY = useTransform(smoothProgress, [0, 1], [0, dropDistance]);
//   // Card eases to natural size at landing so it visually "slots into" the product card frame smoothly
//   const cardScale = useTransform(smoothProgress, [0, 0.75, 1], [1, 1.08, 1.0]);
//   const overlayOpacity = useTransform(smoothProgress, [0, 0.6], [0.6, 0]);

//   return (
//     <div className="flex flex-col w-full overflow-x-hidden relative bg-[#f8f9fa]">

//       <section
//         ref={sectionRef}
//         className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-10"
//         style={{ zIndex: 10, overflow: "visible" }}
//       >
//         <motion.div
//           className="relative flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto flex-1"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           style={{ perspective: "1500px", overflow: "visible" }}
//         >
//           {/* Hero typography */}
//           <div className="flex flex-col items-center justify-center relative z-10">
//             <motion.h1
//               variants={textVariants}
//               className={cn(
//                 "font-heading text-[var(--color-brand-orange)] tracking-tight z-10 flex flex-col text-left",
//                 "text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]"
//               )}
//             >
//               <span>REAL INK</span>
//               <span className="ml-[1.6em]">YOUR WAY.</span>
//             </motion.h1>

//             <motion.p
//               variants={textVariants}
//               className="text-body text-black/70 max-w-3xl mt-4 z-10 leading-relaxed"
//             >
//               Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically
//               tested, permanent ink sinks into the top layer of your skin, fully developing into a bold,{" "}
//               <span className="text-[var(--color-brand-orange)] font-medium">
//                 realistic design within 24 hours.
//               </span>
//             </motion.p>
//           </div>

//           {/* ── 3D Gallery ───────────────────────────────────────────────────── */}
//           <motion.div
//             className="relative w-full max-w-[1400px] h-[280px] sm:h-[350px] md:h-[400px] flex justify-center items-center cursor-grab active:cursor-grabbing"
//             style={{
//               perspective:    "1500px",
//               transformStyle: "preserve-3d",
//               touchAction:    "pan-y",
//               zIndex:         20,
//               overflow:       "visible",
//             }}
//             onPanEnd={(_, info) => {
//               if (info.offset.x < -50) handleNext();
//               else if (info.offset.x > 50) handlePrev();
//             }}
//           >
//             {GALLERY_IMAGES.map((img, index) => {
//               let diff = index - activeIndex;
//               if (diff >  totalCards / 2) diff -= totalCards;
//               if (diff < -totalCards / 2) diff += totalCards;

//               const config   = getCardConfig(diff);
//               const isCenter = diff === 0;

//               return (
//                 <motion.div
//                   key={img.id}
//                   ref={isCenter ? galleryCenterRef : undefined}
//                   initial={false}
//                   animate={{
//                     opacity: config.opacity,
//                     x:       config.x,
//                     rotateY: config.rotateY,
//                     z:       config.z,
//                     scale:   isCenter ? undefined : config.scale // Let Framer animate edge cards smoothly
//                   }}
//                   transition={{ type: "spring", stiffness: 80, damping: 14, mass: 1 }}
//                   whileHover={{
//                     scale:   isCenter ? undefined : config.scale + 0.05,
//                     opacity: config.opacity > 0 ? 1 : 0,
//                     transition: { duration: 0.4, ease: "easeOut" },
//                   }}
//                   onClick={() => { if (Math.abs(diff) <= 3) setActiveIndex(index); }}
//                   className="absolute origin-center group"
//                   style={{
//                     zIndex:        isCenter ? 9999 : config.zIndex,
//                     width:         "clamp(140px, 16vw, 220px)",
//                     height:        "clamp(200px, 25vw, 340px)",
//                     pointerEvents: Math.abs(diff) > 3 ? "none" : "auto",
//                     y: isCenter ? cardTranslateY : 0,
//                     // Center card uses the dynamic spring scale to enlarge as it drops
//                     ...(isCenter ? { scale: cardScale } : {}) 
//                   }}
//                 >
//                   {/* Visual card shell: Fades out EXACTLY as it lands so the product card can seamlessly fade in beneath it */}
//                   <motion.div 
//                     style={{ opacity: isCenter ? galleryCardFadeOut : 1 }}
//                     className="relative w-full h-full shadow-2xl rounded-[20px] overflow-hidden border border-[var(--color-brand-orange)]/30 hover:border-[var(--color-brand-orange)] bg-black/40 backdrop-blur-sm"
//                   >
//                     <motion.div
//                       className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"
//                       style={{ opacity: isCenter ? overlayOpacity : 0.6 }}
//                     />
//                     <Image
//                       src={img.src}
//                       alt={img.alt}
//                       fill
//                       className="object-cover transition-transform duration-700 group-hover:scale-110"
//                       sizes="(max-width: 768px) 30vw, 20vw"
//                       priority={isCenter}
//                     />
//                   </motion.div>

//                   {/* Buy Now pill on gallery */}
//                   {isCenter && (
//                     <motion.div
//                       style={{
//                         opacity:       buttonOpacity,
//                         x:             buttonX,
//                         pointerEvents: buttonPointerEvents,
//                       }}
//                       className="absolute top-1/2 -right-[100px] md:-right-[140px] -translate-y-1/2 z-50"
//                     >
//                       <button className="bg-[var(--color-brand-orange)] text-white font-bold py-3 px-6 rounded-full shadow-lg whitespace-nowrap hover:scale-105 hover:shadow-[0_0_20px_var(--color-brand-orange)] transition-all duration-300">
//                         Buy Now
//                       </button>
//                     </motion.div>
//                   )}
//                 </motion.div>
//               );
//             })}
//           </motion.div>

//           <motion.div
//             variants={textVariants}
//             className="w-full max-w-[250px] md:max-w-[300px] mb-8 relative flex items-center justify-center"
//             style={{ zIndex: 5 }}
//           >
//             <input
//               type="range"
//               min={0}
//               max={totalCards - 1}
//               value={activeIndex}
//               onChange={(e) => setActiveIndex(Number(e.target.value))}
//               className="w-full h-1.5 bg-black/10 rounded-full appearance-none cursor-pointer outline-none transition-all
//                 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,0,0,0.5)]
//                 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full
//                 hover:bg-black/30"
//               aria-label="Gallery Scrollbar"
//             />
//           </motion.div>

//           <motion.div
//             variants={textVariants}
//             className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 relative mt-auto md:mt-0"
//             style={{ zIndex: 5 }}
//           >
//             <button
//               className={cn(
//                 "font-[family-name:var(--font-montserrat)] bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 text-sm md:text-base"
//               )}
//             >
//               Order Now
//             </button>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* ══ PRODUCT SHOWCASE ══════════════════════════════════════════════════════ */}
//       <section className="relative w-full min-h-screen flex items-center justify-center pt-20 pb-32">
//         <motion.div
//           className="relative w-full max-w-[1000px] aspect-square md:aspect-video flex items-center justify-center"
//           style={{ opacity: showcaseElementsOpacity }} // Wrapper opacity controls entirely by scroll progress!
//         >
//           {/* Background ring */}
//           <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full border border-gray-300/50 flex items-center justify-center z-0">
//             <span className="absolute bottom-4 md:bottom-10 text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">Peel Off</span>
//             <span className="absolute left-4   md:left-10  -rotate-90  text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">Apply</span>
//           </div>

//           {/* Title — floats ABOVE the circle, centered */}
//           <motion.div
//             custom={0}
//             variants={contentVariants}
//             initial="hidden"
//             animate={cardSettled ? "visible" : "hidden"}
//             className="absolute z-20 text-center
//               top-[calc(50%-150px-48px)] md:top-[calc(50%-300px-52px)]"
//             style={{ left: "50%", transform: "translateX(-50%)" }}
//           >
//             <span className="inline-block bg-[#8C52FF] text-white text-base md:text-lg font-[cursive] px-8 py-2.5 rounded-full shadow-lg tracking-wide whitespace-nowrap">
//               {currentProduct.title}
//             </span>
//           </motion.div>

//           {/* Description — floats BELOW the circle, centered */}
//           <motion.div
//             custom={1}
//             variants={contentVariants}
//             initial="hidden"
//             animate={cardSettled ? "visible" : "hidden"}
//             className="absolute z-20 text-center px-4
//               top-[calc(50%+150px+12px)] md:top-[calc(50%+300px+16px)]"
//             style={{ left: "50%", transform: "translateX(-50%)", width: "clamp(220px, 40%, 380px)" }}
//           >
//             <p className="text-[11px] md:text-sm text-gray-500 leading-relaxed bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-sm border border-gray-100">
//               {currentProduct.desc}
//             </p>
//           </motion.div>

//           <AnimatePresence mode="wait">
//             <motion.div
//               key={`sale-${currentProduct.id}`}
//               initial={{ opacity: 0, x: -24, rotate: -12 }}
//               animate={
//                 cardSettled
//                   ? { opacity: 1, x: 0, rotate: -12, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.18 } }
//                   : { opacity: 0, x: -24, rotate: -12, transition: { duration: 0.12 } }
//               }
//               exit={{ opacity: 0, x: -24, rotate: -12, transition: { duration: 0.12 } }}
//               className="absolute left-[5%] md:left-[10%] top-[25%] z-20 hover:scale-105 transition-transform cursor-default"
//             >
//               <div className="bg-white/80 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 rounded-xl shadow-xl border border-white">
//                 <p className="text-[#4b2787] font-[cursive] text-lg md:text-2xl">SALE</p>
//                 <p className="font-bold text-xl md:text-3xl text-[#2d1b54]">
//                   {currentProduct.price}{" "}
//                   <span className="text-xs md:text-sm line-through text-gray-400">{currentProduct.oldPrice}</span>
//                 </p>
//               </div>
//             </motion.div>
//           </AnimatePresence>

//           <div className="absolute right-[5%] md:right-[10%] top-[35%] z-20 hover:scale-105 transition-transform">
//             <div className="bg-white/60 backdrop-blur-xl w-32 h-32 md:w-48 md:h-48 rounded-3xl shadow-xl border border-white/50 flex items-center justify-center relative">
//               <Image
//                 src={currentProduct.sideImage}
//                 alt="Side visual"
//                 width={80} height={80}
//                 className="object-contain hover:rotate-180 transition-transform duration-700 w-[60px] md:w-[100px]"
//               />
//               <span className="absolute top-2  right-2  md:top-4  md:right-4  text-[#2d1b54] text-lg md:text-2xl font-bold  rotate-45">↘</span>
//               <span className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-[#2d1b54] text-lg md:text-2xl font-bold -rotate-[135deg]">↘</span>
//             </div>
//           </div>

//           {/* ── Target Product Card Slot ────────────────────────────────────────── */}
//           <motion.div
//             ref={productCardRef}
//             style={{ opacity: productCardOpacity }} // Fades in as the gallery card fades out above it
//             className="relative z-40 flex items-center justify-center w-[220px] h-[340px] md:w-[290px] md:h-[430px]"
//           >
//             <AnimatePresence custom={direction} mode="popLayout">
//               <motion.div
//                 key={currentProduct.id}
//                 custom={direction}
//                 variants={wheelVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 onAnimationComplete={(def) => {
//                   if (def === "center") setCardSettled(true);
//                 }}
//                 className="absolute inset-0 bg-white rounded-[28px] border border-gray-100 overflow-hidden flex flex-col"
//                 style={{
//                   boxShadow: "0 24px 60px rgba(0,0,0,0.13), 0 4px 18px rgba(0,0,0,0.07)",
//                 }}
//               >
//                 {/* <motion.div
//                   custom={0}
//                   variants={contentVariants}
//                   initial="hidden"
//                   animate={cardSettled ? "visible" : "hidden"}
//                   className="shrink-0 px-5 pt-5 pb-1 text-center"
//                 >
//                   <h3 className="text-base md:text-lg font-[cursive] text-[#2d1b54] leading-snug">
//                     {currentProduct.title}
//                   </h3>
//                 </motion.div> */}

//                 <div className="relative flex-1 min-h-0 w-full overflow-hidden">
//                   <Image
//                     src={currentProduct.image}
//                     alt={currentProduct.title}
//                     fill
//                     className="object-cover object-center"
//                     sizes="(max-width: 768px) 220px, 290px"
//                   />
//                 </div>

//                 {/* <motion.div
//                   custom={1}
//                   variants={contentVariants}
//                   initial="hidden"
//                   animate={cardSettled ? "visible" : "hidden"}
//                   className="shrink-0 px-5 pt-2 pb-4 text-center bg-white"
//                 >
//                   <p className="text-[11px] md:text-xs text-gray-500 leading-snug">
//                     {currentProduct.desc}
//                   </p>
//                 </motion.div> */}
//               </motion.div>
//             </AnimatePresence>
//           </motion.div>

//           {/* Bottom controls */}
//           <div className="absolute bottom-[2%] md:bottom-[10%] w-full flex justify-between px-[5%] md:px-[15%] items-center z-50">
//             <div className="flex gap-2 md:gap-4 items-center">
//               <button
//                 onClick={prevProduct}
//                 className="w-8 h-8 md:w-10 md:h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:scale-110 transition-transform text-[#2d1b54] font-bold"
//               >
//                 &lt;
//               </button>
//               <button className="bg-[#8C52FF] text-white px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium hover:bg-[#7340d8] shadow-lg shadow-purple-500/30 transition-colors">
//                 Buy Now
//               </button>
//             </div>
//             <div className="flex gap-2 md:gap-4 items-center">
//               <button className="bg-[#8C52FF] text-white px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium hover:bg-[#7340d8] shadow-lg shadow-purple-500/30 transition-colors flex items-center gap-2">
//                 Add to Cart 🛒
//               </button>
//               <button
//                 onClick={nextProduct}
//                 className="w-8 h-8 md:w-10 md:h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:scale-110 transition-transform text-[#2d1b54] font-bold"
//               >
//                 &gt;
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </section>
//     </div>
//   );
// }


// "use client";

// import React, { useState, useCallback, useRef, useEffect } from "react";
// import {
//   motion,
//   Variants,
//   useInView,
//   useScroll,
//   useTransform,
//   AnimatePresence,
//   useSpring,
//   useMotionValue,
//   animate,
// } from "framer-motion";
// import Image from "next/image";
// import { cn } from "../../lib/utils";

// // ─── Data ──────────────────────────────────────────────────────────────────────

// const GALLERY_IMAGES = [
//   { id: 1,  src: "/assets/images/Card1.png", alt: "Spider tattoo blackwork",     tag: "botanical" },
//   { id: 2,  src: "/assets/images/Card2.png", alt: "Snake and dagger tattoo",     tag: "darkarts"  },
//   { id: 3,  src: "/assets/images/Card3.png", alt: "Tattoo artist portrait",      tag: "botanical" },
//   { id: 4,  src: "/assets/images/Card4.png", alt: "Spiked flail leg tattoo",     tag: "darkarts"  },
//   { id: 5,  src: "/assets/images/Card5.png", alt: "Skull and crossbones tattoo", tag: "darkarts"  },
//   { id: 6,  src: "/assets/images/Card6.png", alt: "Skull and crossbones tattoo", tag: "darkarts"  },
//   { id: 7,  src: "/assets/images/Card7.png", alt: "Skull and crossbones tattoo", tag: "darkarts"  },
//   { id: 8,  src: "/assets/images/Card8.png", alt: "Rose tattoo design",          tag: "roses"     },
//   { id: 9,  src: "/assets/images/Card3.png", alt: "Dragon back piece",           tag: "botanical" },
//   { id: 10, src: "/assets/images/Card4.png", alt: "Dragon back piece",           tag: "darkarts"  },
// ];

// const PRODUCT_DATA = [
//   { 
//     id: 1, tag: "botanical", title: "Botanical Ink", desc: "Set of 15 waterproof designs. Lasts 3-5 days. Skin-safe.", price: "$3.99", oldPrice: "$4.99", image: "/assets/images/Card1.png", sideImage: "/assets/images/tiktok.svg" 
//   },
//   { 
//     id: 2, tag: "darkarts", title: "Dark Arts", desc: "Set of 10 waterproof designs. Lasts 3-5 days. Skin-safe.", price: "$4.99", oldPrice: "$6.99", image: "/assets/images/Card2.png", sideImage: "/assets/images/tiktok.svg" 
//   },
//   { 
//     id: 3, tag: "botanical", title: "Botanical Ink", desc: "Set of 15 waterproof designs. Lasts 3-5 days. Skin-safe.", price: "$3.99", oldPrice: "$4.99", image: "/assets/images/Card3.png", sideImage: "/assets/images/tiktok.svg" 
//   },
//   { 
//     id: 4, tag: "darkarts", title: "Dark Arts", desc: "Set of 10 waterproof designs. Lasts 3-5 days. Skin-safe.", price: "$4.99", oldPrice: "$6.99", image: "/assets/images/Card4.png", sideImage: "/assets/images/tiktok.svg" 
//   },
//   { 
//     id: 5, tag: "darkarts", title: "Dark Arts", desc: "Set of 10 waterproof designs. Lasts 3-5 days. Skin-safe.", price: "$4.99", oldPrice: "$6.99", image: "/assets/images/Card5.png", sideImage: "/assets/images/tiktok.svg" 
//   },
//   { 
//     id: 6, tag: "darkarts", title: "Dark Arts", desc: "Set of 10 waterproof designs. Lasts 3-5 days. Skin-safe.", price: "$4.99", oldPrice: "$6.99", image: "/assets/images/Card6.png", sideImage: "/assets/images/tiktok.svg" 
//   },
//   { 
//     id: 7, tag: "darkarts", title: "Dark Arts", desc: "Set of 10 waterproof designs. Lasts 3-5 days. Skin-safe.", price: "$4.99", oldPrice: "$6.99", image: "/assets/images/Card7.png", sideImage: "/assets/images/tiktok.svg" 
//   },
//   { 
//     id: 8, tag: "roses", title: "Classic Roses", desc: "Set of 5 waterproof designs. Lasts 3-5 days. Skin-safe.", price: "$2.99", oldPrice: "$3.99", image: "/assets/images/Card8.png", sideImage: "/assets/images/tiktok.svg" 
//   },
//   { 
//     id: 9, tag: "botanical", title: "Botanical Ink", desc: "Set of 15 waterproof designs. Lasts 3-5 days. Skin-safe.", price: "$3.99", oldPrice: "$4.99", image: "/assets/images/Card3.png", sideImage: "/assets/images/tiktok.svg" 
//   },
//   { 
//     id: 10, tag: "darkarts", title: "Dark Arts", desc: "Set of 10 waterproof designs. Lasts 3-5 days. Skin-safe.", price: "$4.99", oldPrice: "$6.99", image: "/assets/images/Card4.png", sideImage: "/assets/images/tiktok.svg" 
//   },
// ];

// // ─── Continuous Card Layout Engine ──────────────────────────────────────────────

// // Linear interpolation to smoothly blend between integer card positions
// const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

// const getContinuousConfig = (diff: number) => {
//   const abs = Math.abs(diff);
//   const sign = Math.sign(diff) || 1;

//   // Base configurations for discrete integer steps
//   const getConfig = (val: number) => {
//     if (val === 0) return { x: 0,   scale: 1,    rotateY: 0,   z: 0,   zIndex: 50, opacity: 1    };
//     if (val === 1) return { x: 95,  scale: 0.85, rotateY: -12, z: 50,  zIndex: 40, opacity: 0.95 };
//     if (val === 2) return { x: 190, scale: 0.9,  rotateY: -28, z: 100, zIndex: 30, opacity: 0.8  };
//     if (val === 3) return { x: 310, scale: 1,    rotateY: -38, z: 150, zIndex: 20, opacity: 0.6  };
//     if (val === 4) return { x: 380, scale: 1.1,  rotateY: -50, z: 250, zIndex: 10, opacity: 0    };
//     return                { x: 500, scale: 1.2,  rotateY: -60, z: 300, zIndex: 5,  opacity: 0    };
//   };

//   if (abs >= 5) {
//     const c = getConfig(5);
//     return { x: `${c.x * sign}%`, scale: c.scale, rotateY: c.rotateY * sign, z: c.z, zIndex: c.zIndex, opacity: c.opacity };
//   }

//   // Find boundaries to interpolate between
//   const lowerAbs = Math.floor(abs);
//   const upperAbs = Math.ceil(abs);
//   const fraction = abs - lowerAbs;

//   const c1 = getConfig(lowerAbs);
//   const c2 = getConfig(upperAbs);

//   const xLower = c1.x * sign;
//   const xUpper = c2.x * sign;
//   const rotLower = c1.rotateY * sign;
//   const rotUpper = c2.rotateY * sign;

//   return {
//     x: `${lerp(xLower, xUpper, fraction)}%`,
//     scale: lerp(c1.scale, c2.scale, fraction),
//     rotateY: lerp(rotLower, rotUpper, fraction),
//     z: lerp(c1.z, c2.z, fraction),
//     zIndex: fraction < 0.5 ? c1.zIndex : c2.zIndex, // Discrete pop exactly at halfway mark
//     opacity: lerp(c1.opacity, c2.opacity, fraction),
//   };
// };

// // ─── Animation variants ─────────────────────────────────────────────────────────

// const containerVariants: Variants = {
//   hidden:  { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
// };

// const textVariants: Variants = {
//   hidden:  { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
// };

// const wheelVariants: Variants = {
//   enter: (dir: number) => ({
//     x: dir > 0 ? 300 : -300, y: 0, rotate: dir > 0 ? 30 : -30, opacity: 0, scale: 0.8,
//   }),
//   center: {
//     x: 0, y: 0, rotate: 0, opacity: 1, scale: 1,
//     transition: { type: "spring", stiffness: 80, damping: 15, opacity: { duration: 0.25, ease: "easeIn" } },
//   },
//   exit: (dir: number) => ({
//     x: dir > 0 ? -300 : 300, y: 0, rotate: dir > 0 ? -30 : 30, opacity: 0, scale: 0.8,
//     transition: { type: "spring", stiffness: 80, damping: 15, opacity: { duration: 0.15, ease: "easeOut" } },
//   }),
// };

// const contentVariants: Variants = {
//   hidden:  { opacity: 0, y: 7 },
//   visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.11 } }),
// };

// // ─── Component ──────────────────────────────────────────────────────────────────

// export default function HeroSection() {
//   const [activeIndex,  setActiveIndex]  = useState(0);
//   const [productIndex, setProductIndex] = useState(0);
//   const [direction,    setDirection]    = useState(1);
//   const [cardSettled,  setCardSettled]  = useState(true);

//   // Motion value for true 60fps scrubbing
//   const sliderProgress = useMotionValue(0);

//   const galleryAnchorRef  = useRef<HTMLDivElement>(null); 
//   const productCardRef    = useRef<HTMLDivElement>(null);
//   const sectionRef        = useRef<HTMLElement>(null);
//   useInView(sectionRef, { amount: 0.2 });

//   const { scrollY } = useScroll();
//   const rawCardY = useTransform(scrollY, [0, 600], [0, 1]);
//   const smoothProgress = useSpring(rawCardY, { stiffness: 50, damping: 18, mass: 0.5 });
//   const showcaseElementsOpacity = useTransform(smoothProgress, [0.85, 1], [0, 1]);
//   const productCardOpacity = useTransform(smoothProgress, [0.99, 1], [0, 1]);

//   const totalCards = GALLERY_IMAGES.length;

//   // Sync state transitions seamlessly with Framer Motion Springs
//   useEffect(() => {
//     const controls = animate(sliderProgress, activeIndex, {
//       type: "spring", stiffness: 150, damping: 20, mass: 1
//     });
//     return controls.stop;
//   }, [activeIndex, sliderProgress]);

//   // Keep bottom products synced
//   useEffect(() => {
//     const id = GALLERY_IMAGES[activeIndex]?.id;
//     const idx = PRODUCT_DATA.findIndex((p) => p.id === id);
//     if (idx !== -1 && idx !== productIndex) {
//       setDirection(idx > productIndex ? 1 : -1);
//       setCardSettled(false);
//       setProductIndex(idx);
//     }
//   }, [activeIndex, productIndex]);

//   const handleNext = useCallback(() => setActiveIndex((p) => (p + 1) % totalCards), [totalCards]);
//   const handlePrev = useCallback(() => setActiveIndex((p) => (p - 1 + totalCards) % totalCards), [totalCards]);

//   const nextProduct = () => {
//     const nextIdx = (productIndex + 1) % PRODUCT_DATA.length;
//     const id = PRODUCT_DATA[nextIdx].id;
//     const gIdx = GALLERY_IMAGES.findIndex(img => img.id === id);
//     if (gIdx !== -1) { setDirection(1); setActiveIndex(gIdx); }
//   };
  
//   const prevProduct = () => {
//     const prevIdx = (productIndex - 1 + PRODUCT_DATA.length) % PRODUCT_DATA.length;
//     const id = PRODUCT_DATA[prevIdx].id;
//     const gIdx = GALLERY_IMAGES.findIndex(img => img.id === id);
//     if (gIdx !== -1) { setDirection(-1); setActiveIndex(gIdx); }
//   };

//   const currentProduct = PRODUCT_DATA[productIndex];
//   const [dropDistance, setDropDistance] = useState(0);

//   useEffect(() => {
//     const measure = () => {
//       const galleryEl = galleryAnchorRef.current;
//       const productEl = productCardRef.current;
//       if (!galleryEl || !productEl) return;
//       const gRect = galleryEl.getBoundingClientRect();
//       const pRect = productEl.getBoundingClientRect();
//       setDropDistance((pRect.top + window.scrollY + pRect.height / 2) - (gRect.top + window.scrollY + gRect.height / 2));
//     };
//     measure();
//     window.addEventListener("resize", measure);
//     const t1 = setTimeout(measure, 100);
//     return () => { window.removeEventListener("resize", measure); clearTimeout(t1); };
//   }, []);

//   return (
//     <div className="flex flex-col w-full overflow-x-hidden relative bg-[#f8f9fa]">

//       <section
//         ref={sectionRef}
//         className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-10"
//         style={{ zIndex: 10, overflow: "visible" }}
//       >
//         <motion.div
//           className="relative flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto flex-1"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           style={{ perspective: "1500px", overflow: "visible" }}
//         >
//           {/* Hero typography */}
//           <div className="flex flex-col items-center justify-center relative z-10">
//             <motion.h1
//               variants={textVariants}
//               className={cn(
//                 "font-heading text-[var(--color-brand-orange)] tracking-tight z-10 flex flex-col text-left",
//                 "text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]"
//               )}
//             >
//               <span>REAL INK</span>
//               <span className="ml-[1.6em]">YOUR WAY.</span>
//             </motion.h1>

//             <motion.p
//               variants={textVariants}
//               className="text-body text-black/70 max-w-3xl z-10 leading-relaxed"
//             >
//               Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically
//               tested, permanent ink sinks into the top layer of your skin, fully developing into a bold,{" "}
//               <span className="text-[var(--color-brand-orange)] font-medium">
//                 realistic design within 24 hours.
//               </span>
//             </motion.p>
//           </div>

//           {/* ── 3D Gallery ───────────────────────────────────────────────────── */}
//           <motion.div
//             ref={galleryAnchorRef}
//             className="relative w-full max-w-[1400px] h-[300px] sm:h-[350px] md:h-[400px] flex justify-center items-center cursor-grab active:cursor-grabbing mt-4"
//             style={{ perspective: "1500px", transformStyle: "preserve-3d", touchAction: "pan-y", zIndex: 20, overflow: "visible" }}
//             onPanEnd={(_, info) => {
//               if (info.offset.x < -50) handleNext();
//               else if (info.offset.x > 50) handlePrev();
//             }}
//           >
//             {GALLERY_IMAGES.map((img, index) => {
//               // Creating fluid variables attached to Framer's render loop (60FPS without React renders)
//               const cardConfig = useTransform(() => {
//                 let diff = index - sliderProgress.get();
//                 if (diff > totalCards / 2) diff -= totalCards;
//                 if (diff < -totalCards / 2) diff += totalCards;
//                 return getContinuousConfig(diff);
//               });

//               const cardX = useTransform(() => cardConfig.get().x);
//               const cardRotateY = useTransform(() => cardConfig.get().rotateY);
//               const cardZ = useTransform(() => cardConfig.get().z);
//               const cardZIndex = useTransform(() => cardConfig.get().zIndex);
//               const cardOpacity = useTransform(() => cardConfig.get().opacity);

//               // Only execute scroll-to-bottom mechanics for the distinctly active element
//               const cardY = useTransform(() => index === activeIndex ? smoothProgress.get() * dropDistance : 0);
//               const cardFinalScale = useTransform(() => {
//                 const config = cardConfig.get();
//                 const progress = smoothProgress.get();
//                 if (index === activeIndex) return 0.85 + (0.15 * progress);
//                 return config.scale;
//               });

//               const overlayOp = useTransform(() => index === activeIndex ? Math.max(0, 0.6 - smoothProgress.get()) : 0.6);

//               let discreteDiff = index - activeIndex;
//               if (discreteDiff > totalCards / 2) discreteDiff -= totalCards;
//               if (discreteDiff < -totalCards / 2) discreteDiff += totalCards;
//               const isCenterCard = index === activeIndex;

//               return (
//                 <motion.div
//                   key={img.id}
//                   onClick={() => { if (Math.abs(discreteDiff) <= 3) setActiveIndex(index); }}
//                   className="absolute origin-center group w-[220px] h-[320px] md:w-[290px] md:h-[430px]"
//                   style={{
//                     x: cardX, y: cardY, rotateY: cardRotateY, z: cardZ, zIndex: cardZIndex, opacity: cardOpacity, scale: cardFinalScale,
//                     pointerEvents: Math.abs(discreteDiff) > 3 ? "none" : "auto",
//                     willChange: isCenterCard ? "transform, opacity" : "auto", 
//                   }}
//                 >
//                   <div 
//                     className="relative w-full h-full shadow-2xl rounded-[20px] overflow-hidden border border-[var(--color-brand-orange)]/30 md:group-hover:border-[var(--color-brand-orange)] bg-black/40 backdrop-blur-sm transition-colors duration-300"
//                   >
//                     <motion.div
//                       className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"
//                       style={{ opacity: overlayOp }}
//                     />
//                     <Image
//                       src={img.src} alt={img.alt} fill priority={isCenterCard}
//                       className="object-cover transition-transform duration-700 md:group-hover:scale-110"
//                       sizes="(max-width: 768px) 50vw, 30vw"
//                     />
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </motion.div>

//           <motion.div
//             variants={textVariants}
//             className="w-full max-w-[250px] md:max-w-[300px] mb-8 relative flex items-center justify-center mt-12 md:mt-4"
//             style={{ zIndex: 5 }}
//           >
//             {/* Directly map input into framer motion to intercept drags flawlessly */}
//             <motion.input
//               type="range"
//               min={0}
//               max={totalCards - 1}
//               step={0.01}
//               value={sliderProgress}
//               onChange={(e) => sliderProgress.set(parseFloat(e.target.value))}
//               onPointerUp={(e) => setActiveIndex(Math.round(parseFloat(e.currentTarget.value)))}
//               onTouchEnd={(e) => setActiveIndex(Math.round(parseFloat(e.currentTarget.value)))}
//               className="w-full h-1.5 bg-black/10 rounded-full appearance-none cursor-pointer outline-none transition-all
//                 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,0,0,0.5)]
//                 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full
//                 hover:bg-black/30"
//               aria-label="Gallery Scrollbar"
//             />
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* ══ PRODUCT SHOWCASE ══════════════════════════════════════════════════════ */}
//       <section className="relative w-full min-h-screen flex items-center justify-center pt-32 pb-32">
//         <motion.div
//           className="relative w-full max-w-[1000px] aspect-square md:aspect-video flex items-center justify-center"
//           style={{ opacity: showcaseElementsOpacity }} 
//         >
//           <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-[var(--color-brand-orange)] bg-[var(--color-brand-orange)] flex items-center justify-center z-0">
//             <motion.div
//               custom={0} variants={contentVariants} initial="hidden" animate={cardSettled ? "visible" : "hidden"}
//               className="absolute -top-28 md:-top-24 left-1/2 -translate-x-1/2 w-[90vw] md:w-max text-center z-10"
//             >
//               <h3 className="text-4xl md:text-5xl font-[cursive] text-[#2d1b54] leading-snug drop-shadow-sm">
//                 {currentProduct.title}
//               </h3>
//             </motion.div>

//             <motion.div
//               custom={1} variants={contentVariants} initial="hidden" animate={cardSettled ? "visible" : "hidden"}
//               className="absolute -bottom-45 md:-bottom-24 left-1/2 -translate-x-1/2 w-[85vw] md:w-[450px] text-center z-10"
//             >
//               <p className="text-xs md:text-base text-gray-500 leading-relaxed bg-white/60 backdrop-blur-md px-4 py-3 md:px-6 md:py-3 rounded-2xl shadow-sm border border-gray-200/50">
//                 {currentProduct.desc}
//               </p>
//             </motion.div>
            
//             <span className="absolute top-4 md:top-5 text-[10px] md:text-xs text-black tracking-widest uppercase">Order</span>
//             <span className="absolute bottom-4 md:bottom-5 text-[10px] md:text-xs text-black tracking-widest uppercase">Peel Off</span>
//             <span className="absolute left-4 md:left-5 -rotate-90 text-[10px] md:text-xs text-black tracking-widest uppercase">Apply</span>
//             <span className="absolute right-4 md:right-25 -rotate-90 text-[10px] md:text-xs text-black tracking-widest uppercase">Feel It</span>
//           </div>

//           <AnimatePresence mode="wait">
//             <motion.div
//               key={`sale-${currentProduct.id}`}
//               initial={{ opacity: 0, x: -24, rotate: -12 }}
//               animate={ cardSettled ? { opacity: 1, x: 0, rotate: -12, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.18 } } : { opacity: 0, x: -24, rotate: -12, transition: { duration: 0.12 } } }
//               exit={{ opacity: 0, x: -24, rotate: -12, transition: { duration: 0.12 } }}
//               className="absolute -left-2 md:left-[10%] top-[10%] md:top-[25%] z-20 hover:scale-105 transition-transform cursor-default"
//             >
//               <div className="bg-white/80 backdrop-blur-md px-3 py-2 md:px-6 md:py-4 rounded-xl shadow-xl border border-white">
//                 <p className="text-[#4b2787] font-[cursive] text-base md:text-2xl">SALE</p>
//                 <p className="font-bold text-lg md:text-3xl text-[#2d1b54]">
//                   {currentProduct.price} <span className="text-[10px] md:text-sm line-through text-gray-400">{currentProduct.oldPrice}</span>
//                 </p>
//               </div>
//             </motion.div>
//           </AnimatePresence>

//           <div className="absolute -right-2 md:right-[10%] top-[20%] md:top-[35%] z-20 hover:scale-105 transition-transform">
//             <div className="bg-white/60 backdrop-blur-xl w-24 h-24 md:w-48 md:h-48 rounded-2xl md:rounded-3xl shadow-xl border border-white/50 flex items-center justify-center relative">
//               <Image src={currentProduct.sideImage} alt="Side visual" width={80} height={80} className="object-contain hover:rotate-180 transition-transform duration-700 w-[40px] md:w-[100px]" />
//               <span className="absolute top-1 right-1 md:top-4 md:right-4 text-[#2d1b54] text-sm md:text-2xl font-bold rotate-45">↘</span>
//               <span className="absolute bottom-1 left-1 md:bottom-4 md:left-4 text-[#2d1b54] text-sm md:text-2xl font-bold -rotate-[135deg]">↘</span>
//             </div>
//           </div>

//           <motion.div
//             ref={productCardRef}
//             style={{ opacity: productCardOpacity }}
//             className="relative z-40 flex items-center justify-center w-[220px] h-[320px] md:w-[290px] md:h-[430px]"
//           >
//             <AnimatePresence custom={direction} mode="popLayout">
//               <motion.div
//                 key={currentProduct.id} custom={direction} variants={wheelVariants} initial="enter" animate="center" exit="exit"
//                 onAnimationComplete={(def) => { if (def === "center") setCardSettled(true); }}
//                 className="absolute inset-0 bg-white rounded-[28px] border border-gray-100 overflow-hidden flex flex-col"
//                 style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.13), 0 4px 18px rgba(0,0,0,0.07)" }}
//               >
//                 <div className="relative flex-1 min-h-0 w-full overflow-hidden">
//                   <Image src={currentProduct.image} alt={currentProduct.title} fill className="object-cover object-center" sizes="(max-width: 768px) 220px, 290px" />
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </motion.div>

//           <div className="absolute -bottom-16 md:bottom-[5%] w-full flex justify-between px-[5%] md:px-[15%] items-center z-50">
//             <div className="flex gap-2 md:gap-4 items-center">
//               <button onClick={prevProduct} className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:scale-110 transition-transform text-[#2d1b54] font-bold">&lt;</button>
//             </div>
//             <div className="flex gap-2 items-center">
//                 <button className="bg-[var(--color-brand-orange)] text-white px-4 md:px-6 py-2 md:py-3 rounded-full border-[3px] border-black text-xs md:text-base font-medium hover:bg-[#7340d8] shadow-lg shadow-purple-500/30 transition-colors">
//                     Buy Now
//                 </button>
//                 <button className="bg-[var(--color-brand-orange)] hidden sm:flex text-white px-4 md:px-6 py-2 md:py-3 rounded-full border-[3px] border-black text-xs md:text-base font-medium hover:bg-[#7340d8] shadow-lg shadow-purple-500/30 transition-colors items-center gap-2">
//                     Add to Cart
//                 </button>
//             </div>
//             <div className="flex gap-2 md:gap-4 items-center">
//               <button onClick={nextProduct} className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:scale-110 transition-transform text-[#2d1b54] font-bold">&gt;</button>
//             </div>
//           </div>
//         </motion.div>
//       </section>
//     </div>
//   );
// }


// // // "use client";

// // // import React, { useState, useEffect } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";

// // // // --- Types ---
// // // interface Review {
// // //   id: string;
// // //   name: string;
// // //   title?: string;
// // //   text: string;
// // //   rating: number;
// // // }

// // // // --- Mock Data ---
// // // const allReviews: Review[] = [
// // //   { id: "1", name: "Victoria Linton", title: "Excellent Job!", text: "Praesent urna neque viverra justo ultrices dui. Est lorem ipsum dolor sit amet consectetur adipiscing.", rating: 5 },
// // //   { id: "2", name: "Dmitri Woodhouse", title: "Top-notch!", text: "Mauris in aliquam se fringilla morbi tincidunt augue amet dui massa.", rating: 5 },
// // //   { id: "3", name: "Fanny Deen", title: "Highly Recommended", text: "A scelerisque purus semper eget duis at tellus. Amet cursus sit amet dictum sit justo.", rating: 5 },
// // //   { id: "4", name: "Nelly Vane", title: "Client Review", text: "Varius duis at consectetur lorem donec. Et tortor at risus viverra adipiscing at in tellus.", rating: 5 },
// // //   { id: "5", name: "Hindley Micawber", title: "Great Experience", text: "Rhoncus urna neque viverra justo nec ultrices dui. Est lorem ipsum dolor sit amet consectetur.", rating: 5 },
// // //   { id: "6", name: "Catherine Doe", title: "Testimonial", text: "In hac habitasse platea dictumst quisque sagitise pur convallis.", rating: 5 },
// // //   { id: "7", name: "Jane Prokofich", title: "Superb Quality", text: "Vestibulum mattis enim aulit tortor se ullamcorper morbi pretium.", rating: 5 },
// // //   { id: "8", name: "John Smith", title: "Very Professional", text: "Habitant morbi tristique et netus blandit molestie. Outstanding work from the team.", rating: 5 },
// // //   { id: "9", name: "Alice Wonderland", title: "Loved It", text: "The attention to detail was exactly what I was looking for. Will definitely use again.", rating: 5 },
// // //   { id: "10", name: "Robert Fox", title: "Amazing Support", text: "They helped me through every step of the process. I couldn't be happier with the results.", rating: 5 },
// // //   { id: "11", name: "Eleanor Pena", title: "Fast and Reliable", text: "Delivered ahead of schedule and exceeded all my expectations.", rating: 5 },
// // //   { id: "12", name: "Cameron Williamson", title: "Five Stars", text: "Simply the best service I have ever used. Highly recommend to everyone.", rating: 5 },
// // //   { id: "13", name: "Brooklyn Simmons", title: "Will Return", text: "Great communication and a fantastic final product.", rating: 5 }
// // // ];

// // // // --- Helper Functions ---
// // // // Carefully maps to the irregular, scattered design seen in the mockup
// // // const getCardStyles = (index: number) => {
// // //   const styles = [
// // //     "rounded-3xl rounded-tr-sm min-h-[160px]", // 0: Top left (bubble pointing top-right)
// // //     "rounded-[40px] text-center p-8 min-h-[250px] shadow-xl md:col-span-1 md:row-span-2 flex flex-col justify-center", // 1: Center large square
// // //     "rounded-3xl min-h-[140px]", // 2: Top right
// // //     "rounded-[2.5rem] rounded-bl-sm min-h-[160px]", // 3: Mid left bubble
// // //     "rounded-full px-8 py-6 min-h-[120px] text-center flex flex-col justify-center", // 4: Mid right pill
// // //     "rounded-3xl min-h-[200px] flex flex-col justify-between", // 5: Bottom left tall
// // //     "rounded-[2.5rem] rounded-br-sm min-h-[180px]", // 6: Bottom center bubble
// // //     "rounded-[2.5rem] rounded-tl-sm min-h-[150px]", // 7: Bottom right bubble
// // //     "rounded-3xl min-h-[160px]" // 8: Extra slot
// // //   ];
// // //   return styles[index % styles.length];
// // // };

// // // const renderStars = (rating: number) => {
// // //   return "★".repeat(rating) + "☆".repeat(5 - rating);
// // // };

// // // export default function DynamicReviews() {
// // //   const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);
// // //   const [hiddenReviews, setHiddenReviews] = useState<Review[]>([]);

// // //   // Initialize reviews on mount
// // //   useEffect(() => {
// // //     setVisibleReviews(allReviews.slice(0, 9));
// // //     setHiddenReviews(allReviews.slice(9));
// // //   }, []);

// // //   // Set up the rotation interval
// // //   useEffect(() => {
// // //     if (hiddenReviews.length === 0) return;

// // //     const interval = setInterval(() => {
// // //       setVisibleReviews((prevVisible) => {
// // //         const newVisible = [...prevVisible];
        
// // //         setHiddenReviews((prevHidden) => {
// // //           const newHidden = [...prevHidden];
          
// // //           const swapVisibleIdx = Math.floor(Math.random() * 9);
// // //           const swapHiddenIdx = Math.floor(Math.random() * newHidden.length);

// // //           const temp = newVisible[swapVisibleIdx];
// // //           newVisible[swapVisibleIdx] = newHidden[swapHiddenIdx];
// // //           newHidden[swapHiddenIdx] = temp;

// // //           return newHidden;
// // //         });
        
// // //         return newVisible;
// // //       });
// // //     }, 4000); 

// // //     return () => clearInterval(interval);
// // //   }, [hiddenReviews]);

// // //   if (visibleReviews.length === 0) return null;

// // //   return (
// // //     <section className="bg-[#cdbfae] min-h-screen p-10 box-border font-sans perspective-[1200px]">
// // //       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 items-center justify-center">
// // //         {visibleReviews.map((review, index) => {
// // //           const isQuoteStyle = index === 0 || index === 7; 
          
// // //           return (
// // //             <div key={`slot-${index}`} className="relative h-full w-full flex perspective-[1000px]">
// // //               <AnimatePresence mode="wait">
// // //                 <motion.div
// // //                   key={review.id}
// // //                   initial={{ opacity: 0, scale: 0.9, y: 10 }}
// // //                   animate={{ opacity: 1, scale: 1, y: 0 }}
// // //                   exit={{ opacity: 0, scale: 0.9, y: -10 }}
// // //                   transition={{ duration: 0.5, ease: "easeOut" }}
// // //                   // 3D Hover Effect
// // //                   whileHover={{ 
// // //                     scale: 1.03, 
// // //                     rotateX: 4, 
// // //                     rotateY: -4, 
// // //                     y: -8,
// // //                     boxShadow: "15px 25px 40px -5px rgba(0, 0, 0, 0.2)"
// // //                   }}
// // //                   className={`bg-[#fdfdfd] shadow-md p-6 lg:p-8 flex flex-col gap-3 w-full border border-white/40 backdrop-blur-sm ${getCardStyles(index)}`}
// // //                   style={{ transformStyle: "preserve-3d" }}
// // //                 >
// // //                   {/* Decorative Quote Mark */}
// // //                   {isQuoteStyle && (
// // //                     <span className="absolute -top-6 -left-2 text-7xl text-[#8e8275] opacity-20 font-serif font-black leading-none pointer-events-none transform translate-z-[20px]">
// // //                       &ldquo;
// // //                     </span>
// // //                   )}

// // //                   {/* Header Text (No Image) */}
// // //                   <div className={`flex flex-col w-full ${getCardStyles(index).includes("text-center") ? "items-center" : "items-start"} transform translate-z-[30px]`}>
// // //                     {review.title && (
// // //                       <h5 className="font-bold text-gray-800 text-sm tracking-wider uppercase m-0 mb-1">
// // //                         {review.title}
// // //                       </h5>
// // //                     )}
// // //                     <h4 className="font-serif font-medium text-gray-900 text-lg m-0 leading-tight">
// // //                       {review.name}
// // //                     </h4>
// // //                   </div>

// // //                   {/* Centered Rating */}
// // //                   <div className="flex justify-center w-full transform translate-z-[40px]">
// // //                     <div className="text-[#b48e65] text-lg tracking-[0.2em] my-1">
// // //                       {renderStars(review.rating)}
// // //                     </div>
// // //                   </div>

// // //                   {/* Review Content */}
// // //                   <div className="flex flex-col gap-1 mt-1 flex-grow justify-center transform translate-z-[20px]">
// // //                     <p className={`text-gray-600 text-[15px] leading-relaxed m-0 ${getCardStyles(index).includes("text-center") ? "text-center" : "text-left"}`}>
// // //                       &quot;{review.text}&quot;
// // //                     </p>
// // //                     <span className={`text-xs text-gray-400 mt-2 font-medium tracking-wide ${getCardStyles(index).includes("text-center") ? "text-center" : "text-left"}`}>
// // //                       @{review.name.replace(/\s+/g, '')}
// // //                     </span>
// // //                   </div>
// // //                 </motion.div>
// // //               </AnimatePresence>
// // //             </div>
// // //           );
// // //         })}
// // //       </div>
// // //     </section>
// // //   );
// // // }

// // "use client";

// // import React from "react";
// // import { motion } from "framer-motion";

// // // --- Types ---
// // interface Review {
// //   id: string;
// //   name: string;
// //   handle: string;
// //   text: string;
// //   rating: number;
// //   image: string;
// //   type: 'bubble-tl' | 'center-hero' | 'pill' | 'card-br' | 'minimal' | 'quote-bottom';
// //   title?: string;
// // }

// // // --- Mock Data (Matching the Image) ---
// // const allReviews: Review[] = [
// //   {
// //     id: "1",
// //     name: "Victoria Linton",
// //     handle: "@victorialinton",
// //     text: "Praesent urna neque viverra justo ultrices dui. Est lorem ipsum dolor sit amet consectetur adipiscing. In hendrerit gravida.",
// //     rating: 5,
// //     image: "https://i.pravatar.cc/150?u=1",
// //     type: 'bubble-tl'
// //   },
// //   {
// //     id: "3",
// //     name: "Fanny Deen",
// //     handle: "@fannydeen",
// //     title: "EXCELLENT JOB!",
// //     text: "A scelerisque purus semper eget duis at tellus. Amet cursus sit amet dictum sit justo. Varius sit amet.",
// //     rating: 5,
// //     image: "https://i.pravatar.cc/150?u=3",
// //     type: 'center-hero'
// //   },
// //   {
// //     id: "4",
// //     name: "Nelly Vane",
// //     handle: "@nellyvane",
// //     text: "Varius duis at consectetur lorem donec. Et tortor at risus viverra adipiscing at in tellus.",
// //     rating: 5,
// //     image: "https://i.pravatar.cc/150?u=4",
// //     type: 'pill'
// //   },
// // ];

// // // --- Styles & Components ---

// // export default function TestimonialGrid() {
// //   return (
// //     <section className="bg-[#C6B6A6] min-h-screen p-8 md:p-16 flex items-center justify-center font-sans">
// //       <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
// //         {/* 1. Top Left - Victoria Style (Speech Bubble Top Left) */}
// //         <motion.div whileHover={{ y: -5 }} className="relative bg-white p-8 rounded-[2rem] rounded-tl-none shadow-xl">
// //             <div className="flex items-center gap-4 mb-4">
// //                 <img src="https://i.pravatar.cc/150?u=1" className="w-16 h-16 rounded-full border-4 border-[#C6B6A6]" alt="" />
// //                 <div>
// //                     <h4 className="font-bold text-gray-800 text-lg">Victoria Linton</h4>
// //                     <div className="text-yellow-500 text-xs">★★★★★</div>
// //                 </div>
// //             </div>
// //             <p className="text-gray-600 text-sm leading-relaxed">
// //                 Praesent urna neque viverra justo ultrices dui. Est lorem ipsum dolor sit amet consectetur adipiscing.
// //             </p>
// //             <span className="absolute top-4 right-6 text-4xl text-gray-200 font-serif">“</span>
// //         </motion.div>

// //         {/* 2. Center - Fanny Deen Style (The Hero Card) */}
// //         <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-10 rounded-[3rem] shadow-2xl text-center flex flex-col items-center relative">
// //             <div className="absolute -top-12 left-1/2 -translate-x-1/2">
// //                 <img src="https://i.pravatar.cc/150?u=3" className="w-24 h-24 rounded-full border-8 border-[#C6B6A6]" alt="" />
// //             </div>
// //             <div className="mt-12">
// //                 <h3 className="uppercase tracking-widest font-bold text-gray-800 mb-2">Excellent Job!</h3>
// //                 <div className="text-yellow-600 mb-4">★★★★★</div>
// //                 <p className="text-gray-500 italic text-sm leading-loose mb-6">
// //                     "A scelerisque purus semper eget duis at tellus. Amet cursus sit amet dictum sit justo."
// //                 </p>
// //                 <span className="font-serif text-2xl text-gray-800">Fanny Deen</span>
// //             </div>
// //         </motion.div>

// //         {/* 3. Top Right - Client Review (Simple Pill) */}
// //         <motion.div className="bg-white rounded-3xl overflow-hidden shadow-lg">
// //             <div className="bg-gray-50 px-6 py-2 flex justify-between items-center border-b border-gray-100">
// //                 <span className="font-bold text-sm text-gray-700">Client Review</span>
// //                 <span className="text-xs text-gray-400">@ArtfulWotton</span>
// //             </div>
// //             <div className="p-6">
// //                 <p className="text-gray-600 text-sm">"Rhoncus neque viverra justo ultrices duist lorem dolor sed consect."</p>
// //                 <div className="mt-4 flex gap-2 text-gray-400 text-xs">
// //                    <span>Read More →</span>
// //                 </div>
// //             </div>
// //         </motion.div>

// //         {/* 4. Mid Left - Dmitri Style (Dark Image Cutout) */}
// //         <motion.div className="bg-white p-6 rounded-[2.5rem] flex items-center gap-4 shadow-lg">
// //             <p className="text-sm text-gray-600 flex-1 italic">"Mauris in aliquam se fringilla morbi tincidunt augue amet dui massa"</p>
// //             <div className="relative">
// //                 <img src="https://i.pravatar.cc/150?u=12" className="w-16 h-16 rounded-full grayscale" alt="" />
// //                 <div className="absolute -bottom-2 -left-2 bg-yellow-400 rounded-full px-2 py-1 text-[8px] font-bold">★★★★★</div>
// //             </div>
// //         </motion.div>

// //         {/* 5. Mid Right - Nelly Vane (Horizontal Capsule) */}
// //         <motion.div className="bg-white p-4 pr-8 rounded-full flex items-center gap-4 shadow-md md:col-span-2 w-fit justify-self-center">
// //             <img src="https://i.pravatar.cc/150?u=9" className="w-14 h-14 rounded-full" alt="" />
// //             <div>
// //                 <div className="flex justify-between items-center">
// //                     <h4 className="font-bold text-gray-800 uppercase text-xs tracking-tighter">Nelly Vane</h4>
// //                     <span className="bg-gray-100 p-1 rounded-full ml-2">👍</span>
// //                 </div>
// //                 <p className="text-[11px] text-gray-400 max-w-[200px] leading-tight">Varius duis at consectetur lorem donec. Et tortor at risus viverra.</p>
// //                 <div className="text-yellow-500 text-[10px]">★★★★★ (5.0)</div>
// //             </div>
// //         </motion.div>

// //       </div>
// //     </section>
// //   );
// // }


// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // --- Types ---
// interface Review {
//   id: string;
//   name: string;
//   handle: string;
//   text: string;
//   rating: number;
//   title?: string;
// }

// // --- Extended Mock Data for Rotation ---
// const allReviews: Review[] = [
//   { id: "1", name: "Victoria Linton", handle: "@victorialinton", text: "Praesent urna neque viverra justo ultrices dui. Est lorem ipsum dolor sit amet consectetur adipiscing.", rating: 5, title: "Superb!" },
//   { id: "2", name: "Fanny Deen", handle: "@fannydeen", title: "EXCELLENT JOB!", text: "A scelerisque purus semper eget duis at tellus. Amet cursus sit amet dictum sit justo. Varius sit amet.", rating: 5 },
//   { id: "3", name: "Nelly Vane", handle: "@nellyvane", text: "Varius duis at consectetur lorem donec. Et tortor at risus viverra adipiscing at in tellus.", rating: 5 },
//   { id: "4", name: "Dmitri Woodhouse", handle: "@dmitriwood", text: "Mauris in aliquam se fringilla morbi tincidunt augue amet dui massa.", rating: 4 },
//   { id: "5", name: "Hindley Micawber", handle: "@hindleym", title: "Top-notch!", text: "Rhoncus urna neque viverra justo nec ultrices dui. Est lorem ipsum dolor sit amet consectetur.", rating: 5 },
//   { id: "6", name: "Jane Prokofich", handle: "@janepro", text: "Vestibulum mattis enim aulit tortor se ullamcorper morbi pretium.", rating: 5 },
//   { id: "7", name: "Artful Wotton", handle: "@artfulwotton", text: "Rhoncus neque viverra justo ultrices duist lorem dolor sed consect adipiscing.", rating: 4 },
//   { id: "8", name: "Catherine Doe", handle: "@cathydoe", title: "Testimonial", text: "In hac habitasse platea dictumst quisque sagitise pur convallis.", rating: 5 },
//   { id: "9", name: "Robert Fox", handle: "@robertfox", text: "They helped me through every step of the process. I couldn't be happier with the results.", rating: 5 },
//   { id: "10", name: "Eleanor Pena", handle: "@eleanorp", title: "Fast & Reliable", text: "Delivered ahead of schedule and exceeded all my expectations.", rating: 5 },
//   { id: "11", name: "Brooklyn Simmons", handle: "@brooklyns", text: "Great communication and a fantastic final product. Will return!", rating: 4 }
// ];

// // --- Helper Components ---
// const Avatar = ({ name, size = "w-16 h-16", border = "" }: { name: string, size?: string, border?: string }) => (
//   <div className={`${size} ${border} rounded-full bg-[#fe8204] text-white flex items-center justify-center font-bold text-xl uppercase shrink-0`}>
//     {name.charAt(0)}
//   </div>
// );

// const Stars = ({ rating }: { rating: number }) => (
//   <div className="text-[#fe8204] text-xs tracking-widest">
//     {"★".repeat(rating)}{"☆".repeat(5 - rating)}
//   </div>
// );

// // --- Main Component ---
// export default function TestimonialGrid() {
//   const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);
//   const [hiddenReviews, setHiddenReviews] = useState<Review[]>([]);

//   useEffect(() => {
//     // 7 distinct layout slots
//     setVisibleReviews(allReviews.slice(0, 7));
//     setHiddenReviews(allReviews.slice(7));
//   }, []);

//   useEffect(() => {
//     if (hiddenReviews.length === 0) return;

//     const interval = setInterval(() => {
//       setVisibleReviews((prevVisible) => {
//         const newVisible = [...prevVisible];
//         setHiddenReviews((prevHidden) => {
//           const newHidden = [...prevHidden];
          
//           // Swap a random visible block with a random hidden review
//           const swapVisibleIdx = Math.floor(Math.random() * 7);
//           const swapHiddenIdx = Math.floor(Math.random() * newHidden.length);

//           const temp = newVisible[swapVisibleIdx];
//           newVisible[swapVisibleIdx] = newHidden[swapHiddenIdx];
//           newHidden[swapHiddenIdx] = temp;

//           return newHidden;
//         });
//         return newVisible;
//       });
//     }, 4500); // Rotates every 4.5 seconds

//     return () => clearInterval(interval);
//   }, [hiddenReviews]);

//   if (visibleReviews.length === 0) return null;

//   // The 7 specific layout wrappers for our 7 data slots
//   const renderSlot = (index: number, review: Review) => {
//     const animationProps = {
//       initial: { opacity: 0, scale: 0.95 },
//       animate: { opacity: 1, scale: 1 },
//       exit: { opacity: 0, scale: 0.95 },
//       transition: { duration: 0.5 }
//     };

//     switch (index) {
//       case 0: // Top Left - Victoria Style
//         return (
//           <motion.div {...animationProps} className="h-full relative bg-white p-6 rounded-[2rem] rounded-tl-none shadow-xl flex flex-col justify-center">
//             <div className="flex items-center gap-4 mb-4">
//               <Avatar name={review.name} border="border-4 border-[#C6B6A6]" />
//               <div>
//                 <h4 className="font-bold text-gray-800 text-base">{review.name}</h4>
//                 <Stars rating={review.rating} />
//               </div>
//             </div>
//             <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
//             <span className="absolute top-4 right-6 text-4xl text-[#fe8204] opacity-20 font-serif">“</span>
//           </motion.div>
//         );

//       case 1: // Center Hero - Fanny Deen Style (Spans 2 rows)
//         return (
//           <motion.div {...animationProps} className="h-full bg-white p-8 rounded-[3rem] shadow-2xl text-center flex flex-col items-center justify-center relative mt-10 md:mt-0">
//             <div className="absolute -top-10 left-1/2 -translate-x-1/2">
//               <Avatar name={review.name} size="w-20 h-20" border="border-8 border-[#C6B6A6]" />
//             </div>
//             <div className="mt-8 flex flex-col items-center">
//               <h3 className="uppercase tracking-widest font-bold text-gray-800 mb-2">{review.title || "Excellent!"}</h3>
//               <div className="mb-4"><Stars rating={review.rating} /></div>
//               <p className="text-gray-500 italic text-sm leading-loose mb-6">"{review.text}"</p>
//               <span className="font-serif text-xl text-gray-800 font-medium">{review.name}</span>
//             </div>
//           </motion.div>
//         );

//       case 2: // Top Right - Pill Style
//         return (
//           <motion.div {...animationProps} className="h-full bg-white rounded-3xl overflow-hidden shadow-lg flex flex-col">
//             <div className="bg-gray-50 px-5 py-3 flex justify-between items-center border-b border-gray-100">
//               <span className="font-bold text-sm text-gray-700">Client Review</span>
//               <span className="text-xs text-[#fe8204] font-medium">{review.handle}</span>
//             </div>
//             <div className="p-6 flex-1 flex flex-col justify-center">
//               <p className="text-gray-600 text-sm italic">"{review.text}"</p>
//               <div className="mt-4 flex gap-2 text-[#fe8204] font-semibold text-xs cursor-pointer hover:underline">
//                 Read More &rarr;
//               </div>
//             </div>
//           </motion.div>
//         );

//       case 3: // Mid Left - Minimal Cutout Style
//         return (
//           <motion.div {...animationProps} className="h-full bg-white p-5 rounded-[2.5rem] flex items-center gap-4 shadow-lg">
//             <p className="text-sm text-gray-600 flex-1 italic leading-snug">"{review.text}"</p>
//             <div className="relative shrink-0">
//               <Avatar name={review.name} size="w-14 h-14" />
//               <div className="absolute -bottom-2 -left-2 bg-white rounded-full p-1 shadow-sm"><Stars rating={review.rating} /></div>
//             </div>
//           </motion.div>
//         );

//       case 4: // Mid Right - Horizontal Capsule Style
//         return (
//           <motion.div {...animationProps} className="h-full bg-white p-3 pr-6 rounded-full flex items-center gap-4 shadow-md w-full">
//             <Avatar name={review.name} size="w-12 h-12" />
//             <div className="flex-1">
//               <div className="flex justify-between items-center w-full">
//                 <h4 className="font-bold text-gray-800 uppercase text-xs tracking-tighter">{review.name}</h4>
//               </div>
//               <p className="text-[11px] text-gray-400 leading-tight line-clamp-2 mt-1">{review.text}</p>
//               <div className="mt-1"><Stars rating={review.rating} /></div>
//             </div>
//           </motion.div>
//         );

//       case 5: // Bottom Left (New) - "Top-Notch" Card Style
//         return (
//           <motion.div {...animationProps} className="h-full bg-white p-6 rounded-3xl shadow-lg border-t-4 border-[#fe8204] flex flex-col justify-between">
//             <div>
//               <h3 className="font-bold text-gray-800 text-lg mb-1">{review.title || "Top-notch!"}</h3>
//               <p className="text-gray-500 text-xs mb-3">{review.text}</p>
//               <Stars rating={review.rating} />
//             </div>
//             <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
//               <Avatar name={review.name} size="w-10 h-10" />
//               <div className="flex flex-col">
//                 <span className="text-sm font-bold text-gray-700">{review.name}</span>
//                 <span className="text-[10px] text-gray-400">{review.handle}</span>
//               </div>
//             </div>
//           </motion.div>
//         );

//       case 6: // Bottom Right (New) - Quote Bubble Bottom Style
//         return (
//           <motion.div {...animationProps} className="h-full relative bg-white p-6 rounded-[2rem] rounded-br-none shadow-xl flex flex-col justify-center items-end text-right">
//             <span className="absolute top-4 left-6 text-4xl text-[#fe8204] opacity-20 font-serif">“</span>
//             <p className="text-gray-600 text-sm leading-relaxed mb-4 mt-2">"{review.text}"</p>
//             <div className="flex items-center gap-3 flex-row-reverse">
//               <Avatar name={review.name} size="w-12 h-12" />
//               <div className="flex flex-col items-end">
//                 <span className="font-serif italic text-gray-800">{review.name}</span>
//                 <span className="text-[10px] text-[#fe8204]">{review.handle}</span>
//               </div>
//             </div>
//           </motion.div>
//         );
      
//       default: return null;
//     }
//   };

//   return (
//     <section className="bg-[#C6B6A6] min-h-screen p-8 md:p-16 flex items-center justify-center font-sans overflow-hidden">
//       <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
        
//         {/* ROW 1 */}
//         <div className="md:col-start-1 md:row-start-1">
//           <AnimatePresence mode="wait"><motion.div key={visibleReviews[0].id} className="h-full">{renderSlot(0, visibleReviews[0])}</motion.div></AnimatePresence>
//         </div>
        
//         {/* CENTER HERO (Spans Row 1 & 2) */}
//         <div className="md:col-start-2 md:row-start-1 md:row-span-2">
//           <AnimatePresence mode="wait"><motion.div key={visibleReviews[1].id} className="h-full">{renderSlot(1, visibleReviews[1])}</motion.div></AnimatePresence>
//         </div>

//         <div className="md:col-start-3 md:row-start-1">
//           <AnimatePresence mode="wait"><motion.div key={visibleReviews[2].id} className="h-full">{renderSlot(2, visibleReviews[2])}</motion.div></AnimatePresence>
//         </div>

//         {/* ROW 2 */}
//         <div className="md:col-start-1 md:row-start-2">
//           <AnimatePresence mode="wait"><motion.div key={visibleReviews[3].id} className="h-full">{renderSlot(3, visibleReviews[3])}</motion.div></AnimatePresence>
//         </div>

//         <div className="md:col-start-3 md:row-start-2">
//           <AnimatePresence mode="wait"><motion.div key={visibleReviews[4].id} className="h-full">{renderSlot(4, visibleReviews[4])}</motion.div></AnimatePresence>
//         </div>

//         {/* ROW 3 */}
//         <div className="md:col-start-1 md:row-start-3">
//           <AnimatePresence mode="wait"><motion.div key={visibleReviews[5].id} className="h-full">{renderSlot(5, visibleReviews[5])}</motion.div></AnimatePresence>
//         </div>

//         <div className="md:col-start-3 md:row-start-3">
//           <AnimatePresence mode="wait"><motion.div key={visibleReviews[6].id} className="h-full">{renderSlot(6, visibleReviews[6])}</motion.div></AnimatePresence>
//         </div>

//       </div>
//     </section>
//   );
// }

// // "use client";

// // import React, { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";

// // // --- Types ---
// // interface Review {
// //   id: string;
// //   name: string;
// //   handle: string;
// //   title?: string;
// //   text: string;
// //   rating: number;
// // }

// // // --- Mock Data ---
// // const allReviews: Review[] = [
// //   { id: "1", name: "Victoria Linton", handle: "@victorialinton", text: "Praedam urna neque viverra justo ultrices dui. Est lorem nunc sed velit dignissim. In hendrerit gravida.", rating: 5 },
// //   { id: "2", name: "Dmitri Woodhouse", handle: "@yournamehere", text: "Mauris in aliquam se fringilla morbi tincidunt augue amet dui massa.", rating: 5 },
// //   { id: "3", name: "Hindley Micawber", handle: "@yoursocialmedia", title: "Top-notch!", text: "Rhoncus urna neque viverra justo nec ultrices dui. Est lorem ipsum dolor sit amet consectetur.", rating: 5 },
// //   { id: "4", name: "Fanny Deen", handle: "@fannydeen", title: "EXCELLENT JOB!", text: "A scelerisque purus semper eget duis at tellus. Amet cursus sit amet dictum sit justo. Varius sit amet.", rating: 5 },
// //   { id: "5", name: "Catherine Doe", handle: "@CatherineDoe", title: "TESTIMONIAL", text: "In hac habitasse platea dictumst quisque sagitise pur convallis.", rating: 4 },
// //   { id: "6", name: "Unknown User", handle: "@user123", title: "RECOMMENDED!", text: "Habitant morbi tristique et netus blandit molestie.", rating: 5 },
// //   { id: "7", name: "Artful Wotton", handle: "@ArtfulWotton", title: "Client Review", text: "Rhoncus neque viverra justo ultrices duist lorem dolor sed consect adipiscing.", rating: 0 }, // Rating handled differently in UI
// //   { id: "8", name: "Nelly Vane", handle: "@nellyvane", text: "Varius duis at consectetur lorem donec. Et tortor at risus viverra adipiscing at in tellus.", rating: 5 },
// //   { id: "9", name: "Jane Prokofich", handle: "@JaneProkofich", text: "Vestibulum mattis enim aulit tortor se ullamcorper morbi pretium.", rating: 0 },
// //   // Extra reviews to power the rotation
// //   { id: "10", name: "Robert Fox", handle: "@robertfox", title: "Amazing Work", text: "They helped me through every step of the process. I couldn't be happier with the results.", rating: 5 },
// //   { id: "11", name: "Eleanor Pena", handle: "@eleanorp", title: "Fast & Reliable", text: "Delivered ahead of schedule and exceeded all my expectations.", rating: 5 },
// //   { id: "12", name: "Brooklyn Simmons", handle: "@brooklyns", text: "Great communication and a fantastic final product. Will return!", rating: 4 }
// // ];

// // // --- Helpers ---
// // const StarRating = ({ rating }: { rating: number }) => {
// //   if (rating === 0) return null;
// //   return (
// //     <div className="text-[#fe8204] text-[10px] sm:text-xs tracking-widest flex items-center gap-1">
// //       {"★".repeat(rating)}{"☆".repeat(5 - rating)}
// //       {rating > 0 && <span className="text-gray-400 font-sans ml-1">({rating.toFixed(1)})</span>}
// //     </div>
// //   );
// // };

// // // --- Main Component ---
// // export default function ReviewsMockupGrid() {
// //   const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);
// //   const [hiddenReviews, setHiddenReviews] = useState<Review[]>([]);

// //   // The background color of the main section, used for avatar borders to create the "cutout" effect
// //   const bgTheme = "#C4B5A5"; 
// //   const shadowStyle = "shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.2)] transition-shadow duration-300";

// //   useEffect(() => {
// //     setVisibleReviews(allReviews.slice(0, 9));
// //     setHiddenReviews(allReviews.slice(9));
// //   }, []);

// //   useEffect(() => {
// //     if (hiddenReviews.length === 0) return;
// //     const interval = setInterval(() => {
// //       setVisibleReviews((prev) => {
// //         const next = [...prev];
// //         setHiddenReviews((prevHidden) => {
// //           const nextHidden = [...prevHidden];
// //           const swapVis = Math.floor(Math.random() * 9);
// //           const swapHid = Math.floor(Math.random() * nextHidden.length);
// //           const temp = next[swapVis];
// //           next[swapVis] = nextHidden[swapHid];
// //           nextHidden[swapHid] = temp;
// //           return nextHidden;
// //         });
// //         return next;
// //       });
// //     }, 4000); // Changes one review every 4 seconds
// //     return () => clearInterval(interval);
// //   }, [hiddenReviews]);

// //   if (visibleReviews.length === 0) return null;

// //   // Animation wrapper for smooth data swapping
// //   const AnimWrap = ({ children, id }: { children: React.ReactNode, id: string }) => (
// //     <AnimatePresence mode="wait">
// //       <motion.div
// //         key={id}
// //         initial={{ opacity: 0, y: 10 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         exit={{ opacity: 0, y: -10 }}
// //         transition={{ duration: 0.4 }}
// //         className="h-full w-full"
// //       >
// //         {children}
// //       </motion.div>
// //     </AnimatePresence>
// //   );

// //   return (
// //     <section 
// //       style={{ backgroundColor: bgTheme }} 
// //       className="min-h-screen p-8 md:p-16 lg:p-24 flex items-center justify-center font-sans overflow-hidden"
// //     >
// //       <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr] gap-x-8 gap-y-12 items-start">
        
// //         {/* ================= COLUMN 1 ================= */}
// //         <div className="flex flex-col gap-12 pt-8">
          
// //           {/* Card 1: Top Left Bubble */}
// //           <div className="relative">
// //             <AnimWrap id={visibleReviews[0].id}>
// //               <div className={`bg-white rounded-3xl p-6 relative ${shadowStyle}`}>
// //                 <div 
// //                   className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
// //                   style={{ border: `6px solid ${bgTheme}` }}
// //                 >
// //                   {visibleReviews[0].name.charAt(0)}
// //                 </div>
// //                 <div className="absolute top-2 right-4 text-6xl text-gray-300 font-serif leading-none">“</div>
// //                 <div className="ml-10 mb-3">
// //                   <h4 className="font-serif text-lg text-gray-800">{visibleReviews[0].name}</h4>
// //                   <StarRating rating={visibleReviews[0].rating} />
// //                 </div>
// //                 <p className="text-gray-500 text-xs leading-relaxed">{visibleReviews[0].text}</p>
// //               </div>
// //             </AnimWrap>
// //           </div>

// //           {/* Card 2: Mid Left Overlap */}
// //           <div className="relative pr-8">
// //             <AnimWrap id={visibleReviews[1].id}>
// //               <div className={`bg-white rounded-[2rem] p-6 relative ${shadowStyle}`}>
// //                 <div 
// //                   className="absolute top-1/2 -translate-y-1/2 -right-8 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
// //                   style={{ border: `6px solid ${bgTheme}` }}
// //                 >
// //                   {visibleReviews[1].name.charAt(0)}
// //                 </div>
// //                 <p className="text-gray-600 text-sm italic mb-4 pr-6">"{visibleReviews[1].text}"</p>
// //                 <div className="flex justify-between items-end pr-6">
// //                   <div>
// //                     <h4 className="font-bold text-gray-800 text-[10px] uppercase tracking-wider">{visibleReviews[1].name}</h4>
// //                     <span className="text-gray-400 text-[10px]">{visibleReviews[1].handle}</span>
// //                   </div>
// //                   <StarRating rating={visibleReviews[1].rating} />
// //                 </div>
// //               </div>
// //             </AnimWrap>
// //           </div>

// //           {/* Card 3: Bottom Left Vertical Split */}
// //           <div className="w-3/4 mx-auto">
// //             <AnimWrap id={visibleReviews[2].id}>
// //               <div className={`bg-white rounded-3xl overflow-hidden flex flex-col ${shadowStyle}`}>
// //                 <div className="p-8 text-center flex-1">
// //                   <h3 className="font-serif text-xl text-gray-800 mb-4">{visibleReviews[2].title || "Top-notch!"}</h3>
// //                   <p className="text-gray-500 text-xs leading-relaxed mb-6">{visibleReviews[2].text}</p>
// //                   <div className="flex justify-center"><StarRating rating={visibleReviews[2].rating} /></div>
// //                 </div>
// //                 <div className="bg-[#EBE5DF] p-4 flex items-center gap-4">
// //                   <div className="w-10 h-10 rounded-full bg-[#fe8204] text-white flex items-center justify-center font-bold uppercase shrink-0">
// //                     {visibleReviews[2].name.charAt(0)}
// //                   </div>
// //                   <div className="flex flex-col text-left">
// //                     <span className="font-bold text-gray-800 text-xs">{visibleReviews[2].name}</span>
// //                     <span className="text-gray-500 text-[10px]">{visibleReviews[2].handle}</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             </AnimWrap>
// //           </div>
// //         </div>

// //         {/* ================= COLUMN 2 (CENTER) ================= */}
// //         <div className="flex flex-col gap-10">
          
// //           {/* Card 4: Main Hero */}
// //           <div className="relative pt-12">
// //             <AnimWrap id={visibleReviews[3].id}>
// //               <div className={`bg-white rounded-[3rem] p-12 text-center relative flex flex-col items-center justify-center ${shadowStyle}`}>
// //                 <div 
// //                   className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-4xl font-bold uppercase shadow-inner"
// //                   style={{ border: `8px solid ${bgTheme}` }}
// //                 >
// //                   {visibleReviews[3].name.charAt(0)}
// //                 </div>
// //                 <h2 className="font-serif text-2xl text-gray-800 mb-3 tracking-wide mt-4 uppercase">
// //                   {visibleReviews[3].title}
// //                 </h2>
// //                 <div className="mb-6"><StarRating rating={visibleReviews[3].rating} /></div>
// //                 <p className="text-gray-500 text-sm leading-loose italic mb-8 px-4">
// //                   "{visibleReviews[3].text}"
// //                 </p>
// //                 <span className="font-serif italic text-2xl text-gray-400">
// //                   {visibleReviews[3].name}
// //                 </span>
// //               </div>
// //             </AnimWrap>
// //           </div>

// //           {/* Row of two bottom bubbles */}
// //           <div className="grid grid-cols-2 gap-6 items-end">
// //             {/* Card 5: Left Bubble pointing left */}
// //             <div className="relative">
// //               <AnimWrap id={visibleReviews[4].id}>
// //                 {/* Simulated CSS tail */}
// //                 <div className="absolute -bottom-4 left-6 w-8 h-8 bg-white rotate-45" />
// //                 <div className={`bg-white rounded-[2rem] p-4 relative z-10 flex gap-4 ${shadowStyle}`}>
// //                   {/* Replaced image with brand-colored vertical block */}
// //                   <div className="w-1/3 bg-[#fe8204] rounded-[1.5rem] flex flex-col items-center justify-center text-white p-2">
// //                     <span className="text-3xl font-bold">{visibleReviews[4].name.charAt(0)}</span>
// //                   </div>
// //                   <div className="flex-1 py-2 pr-2">
// //                     <h5 className="font-bold text-gray-800 text-[11px] uppercase mb-2">{visibleReviews[4].title}</h5>
// //                     <p className="text-gray-500 text-[10px] leading-snug mb-2">"{visibleReviews[4].text}"</p>
// //                     <span className="text-gray-400 text-[9px] block mb-2">{visibleReviews[4].handle}</span>
// //                     <StarRating rating={visibleReviews[4].rating} />
// //                   </div>
// //                 </div>
// //               </AnimWrap>
// //             </div>

// //             {/* Card 6: Right Bubble pointing right */}
// //             <div className="relative">
// //               <AnimWrap id={visibleReviews[5].id}>
// //                 {/* Simulated CSS tail */}
// //                 <div className="absolute -bottom-4 right-6 w-8 h-8 bg-white rotate-45" />
// //                 <div className={`bg-white rounded-[2rem] p-4 relative z-10 flex flex-col gap-3 ${shadowStyle}`}>
// //                   <div className="absolute top-0 left-6 bg-[#A7988A] text-white text-xs px-2 py-1 rounded-b-md z-20">★</div>
// //                   {/* Replaced image with brand-colored horizontal block */}
// //                   <div className="w-full h-24 bg-[#fe8204] rounded-[1.5rem] flex items-center justify-center text-white">
// //                     <span className="text-4xl font-bold">{visibleReviews[5].name.charAt(0)}</span>
// //                   </div>
// //                   <div className="text-center px-2 pb-2">
// //                     <h5 className="font-bold text-gray-800 text-[10px] uppercase mb-1">{visibleReviews[5].title}</h5>
// //                     <div className="flex justify-center mb-2 scale-90"><StarRating rating={visibleReviews[5].rating} /></div>
// //                     <p className="text-gray-400 text-[9px] leading-snug">"{visibleReviews[5].text}"</p>
// //                   </div>
// //                 </div>
// //               </AnimWrap>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ================= COLUMN 3 ================= */}
// //         <div className="flex flex-col gap-10">
          
// //           {/* Card 7: Top Right Header Split */}
// //           <div>
// //             <AnimWrap id={visibleReviews[6].id}>
// //               <div className={`bg-white rounded-3xl overflow-hidden ${shadowStyle}`}>
// //                 <div className="bg-[#EBE5DF] px-6 py-4 flex justify-between items-center border-b border-gray-100">
// //                   <span className="font-serif font-bold text-gray-800">{visibleReviews[6].title}</span>
// //                   <span className="text-xs text-gray-500">{visibleReviews[6].handle}</span>
// //                 </div>
// //                 <div className="p-6">
// //                   <p className="text-gray-600 text-sm mb-6">"{visibleReviews[6].text}"</p>
// //                   <div className="flex justify-between items-center">
// //                     <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-[#fe8204] transition-colors">Read More &rarr;</button>
// //                     <div className="flex gap-2 text-gray-300">
// //                       <span>♡</span><span>💬</span><span>↗</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </AnimWrap>
// //           </div>

// //           {/* Card 8: Mid Right Wide Pill */}
// //           <div className="relative pl-8 my-4">
// //             <AnimWrap id={visibleReviews[7].id}>
// //               <div className={`bg-white rounded-full p-5 pl-12 flex relative items-center gap-4 ${shadowStyle}`}>
// //                 <div 
// //                   className="absolute -left-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
// //                   style={{ border: `6px solid ${bgTheme}` }}
// //                 >
// //                   {visibleReviews[7].name.charAt(0)}
// //                 </div>
// //                 {/* Thumbs up badge */}
// //                 <div className="absolute -top-4 right-8 w-10 h-10 rounded-full bg-[#A7988A] text-white flex items-center justify-center text-lg shadow-md border-4 border-white">
// //                   👍
// //                 </div>
// //                 <div className="flex-1 pr-4">
// //                   <h4 className="font-serif text-sm font-bold text-gray-800 uppercase mb-1">{visibleReviews[7].name}</h4>
// //                   <p className="text-gray-500 text-[10px] leading-tight mb-2 pr-8">{visibleReviews[7].text}</p>
// //                   <StarRating rating={visibleReviews[7].rating} />
// //                 </div>
// //               </div>
// //             </AnimWrap>
// //           </div>

// //           {/* Card 9: Bottom Right Bubble */}
// //           <div className="relative mt-8">
// //             <AnimWrap id={visibleReviews[8].id}>
// //               <div className={`bg-white rounded-[2rem] rounded-bl-none p-8 relative ${shadowStyle}`}>
// //                 <div className="absolute -bottom-6 left-6 text-7xl text-gray-400 font-serif leading-none rotate-180 opacity-50">“</div>
// //                 <p className="text-gray-600 text-sm mb-6">"{visibleReviews[8].text}"</p>
// //                 <div className="flex justify-end pr-16 text-right flex-col">
// //                   <span className="font-[Brush Script MT, cursive] font-serif italic text-xl text-gray-400">{visibleReviews[8].name}</span>
// //                   <span className="text-[10px] text-gray-400">{visibleReviews[8].handle}</span>
// //                 </div>
// //                 <div 
// //                   className="absolute -bottom-6 -right-2 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
// //                   style={{ border: `6px solid ${bgTheme}` }}
// //                 >
// //                   {visibleReviews[8].name.charAt(0)}
// //                 </div>
// //               </div>
// //             </AnimWrap>
// //           </div>

// //         </div>
// //       </div>
// //     </section>
// //   );
// // }


// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // --- Types ---
// interface Review {
//   id: string;
//   name: string;
//   handle: string;
//   title?: string;
//   text: string;
//   rating: number;
// }

// // --- Mock Data ---
// const allReviews: Review[] = [
//   { id: "1", name: "Victoria Linton", handle: "@victorialinton", text: "Praedam urna neque viverra justo ultrices dui. Est lorem nunc sed velit dignissim. In hendrerit gravida.", rating: 5 },
//   { id: "2", name: "Dmitri Woodhouse", handle: "@yournamehere", text: "Mauris in aliquam se fringilla morbi tincidunt augue amet dui massa.", rating: 5 },
//   { id: "3", name: "Hindley Micawber", handle: "@yoursocialmedia", title: "Top-notch!", text: "Rhoncus urna neque viverra justo nec ultrices dui. Est lorem ipsum dolor sit amet consectetur.", rating: 5 },
//   { id: "4", name: "Fanny Deen", handle: "@fannydeen", title: "EXCELLENT JOB!", text: "A scelerisque purus semper eget duis at tellus. Amet cursus sit amet dictum sit justo. Varius sit amet.", rating: 5 },
//   { id: "5", name: "Catherine Doe", handle: "@CatherineDoe", title: "TESTIMONIAL", text: "In hac habitasse platea dictumst quisque sagitise pur convallis.", rating: 4 },
//   { id: "6", name: "Unknown User", handle: "@user123", title: "RECOMMENDED!", text: "Habitant morbi tristique et netus blandit molestie.", rating: 5 },
//   { id: "7", name: "Artful Wotton", handle: "@ArtfulWotton", title: "Client Review", text: "Rhoncus neque viverra justo ultrices duist lorem dolor sed consect adipiscing.", rating: 0 },
//   { id: "8", name: "Nelly Vane", handle: "@nellyvane", text: "Varius duis at consectetur lorem donec. Et tortor at risus viverra adipiscing at in tellus.", rating: 5 },
//   { id: "9", name: "Jane Prokofich", handle: "@JaneProkofich", text: "Vestibulum mattis enim aulit tortor se ullamcorper morbi pretium.", rating: 0 },
//   { id: "10", name: "Robert Fox", handle: "@robertfox", title: "Amazing Work", text: "They helped me through every step of the process. I couldn't be happier with the results.", rating: 5 },
//   { id: "11", name: "Eleanor Pena", handle: "@eleanorp", title: "Fast & Reliable", text: "Delivered ahead of schedule and exceeded all my expectations.", rating: 5 },
//   { id: "12", name: "Brooklyn Simmons", handle: "@brooklyns", text: "Great communication and a fantastic final product. Will return!", rating: 4 }
// ];

// // --- Helpers ---
// const StarRating = ({ rating }: { rating: number }) => {
//   if (rating === 0) return null;
//   return (
//     <div className="text-[#fe8204] text-[10px] sm:text-xs tracking-widest flex items-center gap-1">
//       {"★".repeat(rating)}{"☆".repeat(5 - rating)}
//       {rating > 0 && <span className="text-gray-400 font-sans ml-1">({rating.toFixed(1)})</span>}
//     </div>
//   );
// };

// // --- Main Component ---
// export default function ReviewsMockupGrid() {
//   const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);
//   const [hiddenReviews, setHiddenReviews] = useState<Review[]>([]);
  
//   // Track which index to swap next to create a sequential loop
//   const updateIndex = useRef(0);
//   // Track initial load to stagger the entrance animation
//   const isInitialMount = useRef(true);

//   const bgTheme = "#C4B5A5"; 
//   const shadowStyle = "shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.2)] transition-shadow duration-300";

//   useEffect(() => {
//     setVisibleReviews(allReviews.slice(0, 9));
//     setHiddenReviews(allReviews.slice(9));

//     // Turn off staggered delays after initial mount
//     const timeout = setTimeout(() => {
//       isInitialMount.current = false;
//     }, 2000);
//     return () => clearTimeout(timeout);
//   }, []);

//   useEffect(() => {
//     if (hiddenReviews.length === 0) return;
    
//     // Change one review sequentially every 3 seconds
//     const interval = setInterval(() => {
//       setVisibleReviews((prevVis) => {
//         const nextVis = [...prevVis];
//         setHiddenReviews((prevHid) => {
//           const nextHid = [...prevHid];
          
//           const currentIndex = updateIndex.current;
          
//           // Swap visible slot with the first item in the hidden queue
//           const temp = nextVis[currentIndex];
//           nextVis[currentIndex] = nextHid[0];
          
//           // Move the old visible item to the back of the hidden queue
//           nextHid.shift(); 
//           nextHid.push(temp); 
          
//           return nextHid;
//         });
        
//         // Move to the next card in the grid (0 through 8)
//         updateIndex.current = (updateIndex.current + 1) % 9;
//         return nextVis;
//       });
//     }, 3000); 
    
//     return () => clearInterval(interval);
//   }, [hiddenReviews.length]);

//   if (visibleReviews.length === 0) return null;

//   // Animation wrapper with added scale and staggered entrance logic
//   const AnimWrap = ({ children, id, index }: { children: React.ReactNode, id: string, index: number }) => (
//     <AnimatePresence mode="wait">
//       <motion.div
//         key={id}
//         initial={{ opacity: 0, y: 15, scale: 0.95 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         exit={{ opacity: 0, y: -15, scale: 0.95 }}
//         transition={{ 
//           duration: 0.5, 
//           ease: "easeInOut",
//           delay: isInitialMount.current ? index * 0.15 : 0 
//         }}
//         className="h-full w-full"
//       >
//         {children}
//       </motion.div>
//     </AnimatePresence>
//   );

//   return (
//     <section 
//       style={{ backgroundColor: bgTheme }} 
//       className="min-h-screen p-8 md:p-16 lg:p-24 flex items-center justify-center font-sans overflow-hidden"
//     >
//       <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr] gap-x-8 gap-y-12 items-start">
        
//         {/* ================= COLUMN 1 ================= */}
//         <div className="flex flex-col gap-12 pt-8">
          
//           {/* Card 1: Top Left Bubble */}
//           <div className="relative">
//             <AnimWrap id={visibleReviews[0].id} index={0}>
//               <div className={`bg-white rounded-3xl p-6 relative ${shadowStyle}`}>
//                 <div 
//                   className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
//                   style={{ border: `6px solid ${bgTheme}` }}
//                 >
//                   {visibleReviews[0].name.charAt(0)}
//                 </div>
//                 <div className="absolute top-2 right-4 text-6xl text-gray-300 font-serif leading-none">“</div>
//                 <div className="ml-10 mb-3">
//                   <h4 className="font-serif text-lg text-gray-800">{visibleReviews[0].name}</h4>
//                   <StarRating rating={visibleReviews[0].rating} />
//                 </div>
//                 <p className="text-gray-500 text-xs leading-relaxed">{visibleReviews[0].text}</p>
//               </div>
//             </AnimWrap>
//           </div>

//           {/* Card 2: Mid Left Overlap */}
//           <div className="relative pr-8">
//             <AnimWrap id={visibleReviews[1].id} index={1}>
//               <div className={`bg-white rounded-[2rem] p-6 relative ${shadowStyle}`}>
//                 <div 
//                   className="absolute top-1/2 -translate-y-1/2 -right-8 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
//                   style={{ border: `6px solid ${bgTheme}` }}
//                 >
//                   {visibleReviews[1].name.charAt(0)}
//                 </div>
//                 <p className="text-gray-600 text-sm italic mb-4 pr-6">"{visibleReviews[1].text}"</p>
//                 <div className="flex justify-between items-end pr-6">
//                   <div>
//                     <h4 className="font-bold text-gray-800 text-[10px] uppercase tracking-wider">{visibleReviews[1].name}</h4>
//                     <span className="text-gray-400 text-[10px]">{visibleReviews[1].handle}</span>
//                   </div>
//                   <StarRating rating={visibleReviews[1].rating} />
//                 </div>
//               </div>
//             </AnimWrap>
//           </div>

//           {/* Card 3: Bottom Left Vertical Split */}
//           <div className="w-3/4 mx-auto">
//             <AnimWrap id={visibleReviews[2].id} index={2}>
//               <div className={`bg-white rounded-3xl overflow-hidden flex flex-col ${shadowStyle}`}>
//                 <div className="p-8 text-center flex-1">
//                   <h3 className="font-serif text-xl text-gray-800 mb-4">{visibleReviews[2].title || "Top-notch!"}</h3>
//                   <p className="text-gray-500 text-xs leading-relaxed mb-6">{visibleReviews[2].text}</p>
//                   <div className="flex justify-center"><StarRating rating={visibleReviews[2].rating} /></div>
//                 </div>
//                 <div className="bg-[#EBE5DF] p-4 flex items-center gap-4">
//                   <div className="w-10 h-10 rounded-full bg-[#fe8204] text-white flex items-center justify-center font-bold uppercase shrink-0">
//                     {visibleReviews[2].name.charAt(0)}
//                   </div>
//                   <div className="flex flex-col text-left">
//                     <span className="font-bold text-gray-800 text-xs">{visibleReviews[2].name}</span>
//                     <span className="text-gray-500 text-[10px]">{visibleReviews[2].handle}</span>
//                   </div>
//                 </div>
//               </div>
//             </AnimWrap>
//           </div>
//         </div>

//         {/* ================= COLUMN 2 (CENTER) ================= */}
//         <div className="flex flex-col gap-10">
          
//           {/* Card 4: Main Hero */}
//           <div className="relative pt-12">
//             <AnimWrap id={visibleReviews[3].id} index={3}>
//               <div className={`bg-white rounded-[3rem] p-12 text-center relative flex flex-col items-center justify-center ${shadowStyle}`}>
//                 <div 
//                   className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-4xl font-bold uppercase shadow-inner"
//                   style={{ border: `8px solid ${bgTheme}` }}
//                 >
//                   {visibleReviews[3].name.charAt(0)}
//                 </div>
//                 <h2 className="font-serif text-2xl text-gray-800 mb-3 tracking-wide mt-4 uppercase">
//                   {visibleReviews[3].title}
//                 </h2>
//                 <div className="mb-6"><StarRating rating={visibleReviews[3].rating} /></div>
//                 <p className="text-gray-500 text-sm leading-loose italic mb-8 px-4">
//                   "{visibleReviews[3].text}"
//                 </p>
//                 <span className="font-serif italic text-2xl text-gray-400">
//                   {visibleReviews[3].name}
//                 </span>
//               </div>
//             </AnimWrap>
//           </div>

//           {/* Row of two bottom bubbles */}
//           <div className="grid grid-cols-2 gap-6 items-end">
//             {/* Card 5: Left Bubble pointing left */}
//             <div className="relative">
//               <AnimWrap id={visibleReviews[4].id} index={4}>
//                 {/* Simulated CSS tail */}
//                 <div className="absolute -bottom-4 left-6 w-8 h-8 bg-white rotate-45" />
//                 <div className={`bg-white rounded-[2rem] p-4 relative z-10 flex gap-4 ${shadowStyle}`}>
//                   <div className="w-1/3 bg-[#fe8204] rounded-[1.5rem] flex flex-col items-center justify-center text-white p-2">
//                     <span className="text-3xl font-bold">{visibleReviews[4].name.charAt(0)}</span>
//                   </div>
//                   <div className="flex-1 py-2 pr-2">
//                     <h5 className="font-bold text-gray-800 text-[11px] uppercase mb-2">{visibleReviews[4].title}</h5>
//                     <p className="text-gray-500 text-[10px] leading-snug mb-2">"{visibleReviews[4].text}"</p>
//                     <span className="text-gray-400 text-[9px] block mb-2">{visibleReviews[4].handle}</span>
//                     <StarRating rating={visibleReviews[4].rating} />
//                   </div>
//                 </div>
//               </AnimWrap>
//             </div>

//             {/* Card 6: Right Bubble pointing right */}
//             <div className="relative">
//               <AnimWrap id={visibleReviews[5].id} index={5}>
//                 {/* Simulated CSS tail */}
//                 <div className="absolute -bottom-4 right-6 w-8 h-8 bg-white rotate-45" />
//                 <div className={`bg-white rounded-[2rem] p-4 relative z-10 flex flex-col gap-3 ${shadowStyle}`}>
//                   <div className="absolute top-0 left-6 bg-[#A7988A] text-white text-xs px-2 py-1 rounded-b-md z-20">★</div>
//                   <div className="w-full h-24 bg-[#fe8204] rounded-[1.5rem] flex items-center justify-center text-white">
//                     <span className="text-4xl font-bold">{visibleReviews[5].name.charAt(0)}</span>
//                   </div>
//                   <div className="text-center px-2 pb-2">
//                     <h5 className="font-bold text-gray-800 text-[10px] uppercase mb-1">{visibleReviews[5].title}</h5>
//                     <div className="flex justify-center mb-2 scale-90"><StarRating rating={visibleReviews[5].rating} /></div>
//                     <p className="text-gray-400 text-[9px] leading-snug">"{visibleReviews[5].text}"</p>
//                   </div>
//                 </div>
//               </AnimWrap>
//             </div>
//           </div>
//         </div>

//         {/* ================= COLUMN 3 ================= */}
//         <div className="flex flex-col gap-10">
          
//           {/* Card 7: Top Right Header Split */}
//           <div>
//             <AnimWrap id={visibleReviews[6].id} index={6}>
//               <div className={`bg-white rounded-3xl overflow-hidden ${shadowStyle}`}>
//                 <div className="bg-[#EBE5DF] px-6 py-4 flex justify-between items-center border-b border-gray-100">
//                   <span className="font-serif font-bold text-gray-800">{visibleReviews[6].title}</span>
//                   <span className="text-xs text-gray-500">{visibleReviews[6].handle}</span>
//                 </div>
//                 <div className="p-6">
//                   <p className="text-gray-600 text-sm mb-6">"{visibleReviews[6].text}"</p>
//                   <div className="flex justify-between items-center">
//                     <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-[#fe8204] transition-colors">Read More &rarr;</button>
//                     <div className="flex gap-2 text-gray-300">
//                       <span>♡</span><span>💬</span><span>↗</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </AnimWrap>
//           </div>

//           {/* Card 8: Mid Right Wide Pill */}
//           <div className="relative pl-8 my-4">
//             <AnimWrap id={visibleReviews[7].id} index={7}>
//               <div className={`bg-white rounded-full p-5 pl-12 flex relative items-center gap-4 ${shadowStyle}`}>
//                 <div 
//                   className="absolute -left-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
//                   style={{ border: `6px solid ${bgTheme}` }}
//                 >
//                   {visibleReviews[7].name.charAt(0)}
//                 </div>
//                 {/* Thumbs up badge */}
//                 <div className="absolute -top-4 right-8 w-10 h-10 rounded-full bg-[#A7988A] text-white flex items-center justify-center text-lg shadow-md border-4 border-white">
//                   👍
//                 </div>
//                 <div className="flex-1 pr-4">
//                   <h4 className="font-serif text-sm font-bold text-gray-800 uppercase mb-1">{visibleReviews[7].name}</h4>
//                   <p className="text-gray-500 text-[10px] leading-tight mb-2 pr-8">{visibleReviews[7].text}</p>
//                   <StarRating rating={visibleReviews[7].rating} />
//                 </div>
//               </div>
//             </AnimWrap>
//           </div>

//           {/* Card 9: Bottom Right Bubble */}
//           <div className="relative mt-8">
//             <AnimWrap id={visibleReviews[8].id} index={8}>
//               <div className={`bg-white rounded-[2rem] rounded-bl-none p-8 relative ${shadowStyle}`}>
//                 <div className="absolute -bottom-6 left-6 text-7xl text-gray-400 font-serif leading-none rotate-180 opacity-50">“</div>
//                 <p className="text-gray-600 text-sm mb-6">"{visibleReviews[8].text}"</p>
//                 <div className="flex justify-end pr-16 text-right flex-col">
//                   <span className="font-[Brush Script MT, cursive] font-serif italic text-xl text-gray-400">{visibleReviews[8].name}</span>
//                   <span className="text-[10px] text-gray-400">{visibleReviews[8].handle}</span>
//                 </div>
//                 <div 
//                   className="absolute -bottom-6 -right-2 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
//                   style={{ border: `6px solid ${bgTheme}` }}
//                 >
//                   {visibleReviews[8].name.charAt(0)}
//                 </div>
//               </div>
//             </AnimWrap>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }


// // "use client";

// // import React, { useState, useEffect, useRef } from "react";
// // import { motion, AnimatePresence } from "framer-motion";

// // // --- Types ---
// // interface Review {
// //   id: string;
// //   name: string;
// //   handle: string;
// //   title?: string;
// //   text: string;
// //   rating: number;
// // }

// // // --- Mock Data ---
// // const allReviews: Review[] = [
// //   { id: "1", name: "Victoria Linton", handle: "@victorialinton", text: "Praedam urna neque viverra justo ultrices dui. Est lorem nunc sed velit dignissim. In hendrerit gravida.", rating: 5 },
// //   { id: "2", name: "Dmitri Woodhouse", handle: "@yournamehere", text: "Mauris in aliquam se fringilla morbi tincidunt augue amet dui massa.", rating: 5 },
// //   { id: "3", name: "Hindley Micawber", handle: "@yoursocialmedia", title: "Top-notch!", text: "Rhoncus urna neque viverra justo nec ultrices dui. Est lorem ipsum dolor sit amet consectetur.", rating: 5 },
// //   { id: "4", name: "Fanny Deen", handle: "@fannydeen", title: "EXCELLENT JOB!", text: "A scelerisque purus semper eget duis at tellus. Amet cursus sit amet dictum sit justo. Varius sit amet.", rating: 5 },
// //   { id: "5", name: "Catherine Doe", handle: "@CatherineDoe", title: "TESTIMONIAL", text: "In hac habitasse platea dictumst quisque sagitise pur convallis.", rating: 4 },
// //   { id: "6", name: "Unknown User", handle: "@user123", title: "RECOMMENDED!", text: "Habitant morbi tristique et netus blandit molestie.", rating: 5 },
// //   { id: "7", name: "Artful Wotton", handle: "@ArtfulWotton", title: "Client Review", text: "Rhoncus neque viverra justo ultrices duist lorem dolor sed consect adipiscing.", rating: 0 },
// //   { id: "8", name: "Nelly Vane", handle: "@nellyvane", text: "Varius duis at consectetur lorem donec. Et tortor at risus viverra adipiscing at in tellus.", rating: 5 },
// //   { id: "9", name: "Jane Prokofich", handle: "@JaneProkofich", text: "Vestibulum mattis enim aulit tortor se ullamcorper morbi pretium.", rating: 0 },
// //   { id: "10", name: "Robert Fox", handle: "@robertfox", title: "Amazing Work", text: "They helped me through every step of the process. I couldn't be happier with the results.", rating: 5 },
// //   { id: "11", name: "Eleanor Pena", handle: "@eleanorp", title: "Fast & Reliable", text: "Delivered ahead of schedule and exceeded all my expectations.", rating: 5 },
// //   { id: "12", name: "Brooklyn Simmons", handle: "@brooklyns", text: "Great communication and a fantastic final product. Will return!", rating: 4 }
// // ];

// // // --- Helpers ---
// // const StarRating = ({ rating }: { rating: number }) => {
// //   if (rating === 0) return null;
// //   return (
// //     <div className="text-[#fe8204] text-[10px] sm:text-xs tracking-widest flex items-center gap-1">
// //       {"★".repeat(rating)}{"☆".repeat(5 - rating)}
// //       {rating > 0 && <span className="text-gray-400 font-sans ml-1">({rating.toFixed(1)})</span>}
// //     </div>
// //   );
// // };

// // // --- Main Component ---
// // export default function ReviewsMockupGrid() {
// //   const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);
// //   const [hiddenReviews, setHiddenReviews] = useState<Review[]>([]);
  
// //   // Track the last updated index so we don't randomly pick the same card twice in a row
// //   const lastUpdatedIndex = useRef(-1);
  
// //   // Track initial load to stagger the entrance animation
// //   const isInitialMount = useRef(true);

// //   const bgTheme = "#C4B5A5"; 
// //   const shadowStyle = "shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.2)] transition-shadow duration-300";

// //   useEffect(() => {
// //     setVisibleReviews(allReviews.slice(0, 9));
// //     setHiddenReviews(allReviews.slice(9));

// //     // Turn off staggered delays after initial mount
// //     const timeout = setTimeout(() => {
// //       isInitialMount.current = false;
// //     }, 2000);
// //     return () => clearTimeout(timeout);
// //   }, []);

// //   useEffect(() => {
// //     // Stop if there's nothing to swap
// //     if (allReviews.length <= 9) return;
    
// //     // Change ONE random review every 4 seconds (increased gap for a cleaner feel)
// //     const interval = setInterval(() => {
// //       setVisibleReviews((prevVis) => {
// //         let nextVis = [...prevVis];

// //         setHiddenReviews((prevHid) => {
// //           let nextHid = [...prevHid];
          
// //           // 1. Pick a random grid card (0 to 8) to swap out
// //           let randomGridIndex;
// //           do {
// //             randomGridIndex = Math.floor(Math.random() * nextVis.length);
// //           } while (randomGridIndex === lastUpdatedIndex.current); // Prevent swapping the same spot twice
          
// //           lastUpdatedIndex.current = randomGridIndex;
          
// //           // 2. Pick a random review from the hidden queue to bring in
// //           const randomHiddenIndex = Math.floor(Math.random() * nextHid.length);
          
// //           // 3. Perform the swap
// //           const outgoingReview = nextVis[randomGridIndex];
// //           const incomingReview = nextHid[randomHiddenIndex];
          
// //           nextVis[randomGridIndex] = incomingReview;
          
// //           // 4. Update the hidden queue
// //           nextHid.splice(randomHiddenIndex, 1); 
// //           nextHid.push(outgoingReview); 
          
// //           return nextHid;
// //         });
        
// //         return nextVis;
// //       });
// //     }, 4000); 
    
// //     return () => clearInterval(interval);
// //   }, []); // Run interval setup once

// //   // Failsafe to ensure grid doesn't break if we have less than 9 visible
// //   if (visibleReviews.length < 9) return null;

// //   // Animation wrapper with added blur and scale for a premium, single-card transition
// //   const AnimWrap = ({ children, id, index }: { children: React.ReactNode, id: string, index: number }) => (
// //     <AnimatePresence mode="wait">
// //       <motion.div
// //         key={id}
// //         initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(8px)" }}
// //         animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
// //         exit={{ opacity: 0, y: -20, scale: 0.9, filter: "blur(8px)" }}
// //         transition={{ 
// //           duration: 0.6, 
// //           ease: "easeInOut",
// //           delay: isInitialMount.current ? index * 0.15 : 0 
// //         }}
// //         className="h-full w-full"
// //       >
// //         {children}
// //       </motion.div>
// //     </AnimatePresence>
// //   );

// //   return (
// //     <section 
// //       style={{ backgroundColor: bgTheme }} 
// //       className="min-h-screen p-8 md:p-16 lg:p-24 flex items-center justify-center font-sans overflow-hidden"
// //     >
// //       <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr] gap-x-8 gap-y-12 items-start">
        
// //         {/* ================= COLUMN 1 ================= */}
// //         <div className="flex flex-col gap-12 pt-8">
          
// //           {/* Card 1: Top Left Bubble */}
// //           <div className="relative">
// //             <AnimWrap id={visibleReviews[0].id} index={0}>
// //               <div className={`bg-white rounded-3xl p-6 relative ${shadowStyle}`}>
// //                 <div 
// //                   className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
// //                   style={{ border: `6px solid ${bgTheme}` }}
// //                 >
// //                   {visibleReviews[0].name.charAt(0)}
// //                 </div>
// //                 <div className="absolute top-2 right-4 text-6xl text-gray-300 font-serif leading-none">“</div>
// //                 <div className="ml-10 mb-3">
// //                   <h4 className="font-serif text-lg text-gray-800">{visibleReviews[0].name}</h4>
// //                   <StarRating rating={visibleReviews[0].rating} />
// //                 </div>
// //                 <p className="text-gray-500 text-xs leading-relaxed">{visibleReviews[0].text}</p>
// //               </div>
// //             </AnimWrap>
// //           </div>

// //           {/* Card 2: Mid Left Overlap */}
// //           <div className="relative pr-8">
// //             <AnimWrap id={visibleReviews[1].id} index={1}>
// //               <div className={`bg-white rounded-[2rem] p-6 relative ${shadowStyle}`}>
// //                 <div 
// //                   className="absolute top-1/2 -translate-y-1/2 -right-8 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
// //                   style={{ border: `6px solid ${bgTheme}` }}
// //                 >
// //                   {visibleReviews[1].name.charAt(0)}
// //                 </div>
// //                 <p className="text-gray-600 text-sm italic mb-4 pr-6">"{visibleReviews[1].text}"</p>
// //                 <div className="flex justify-between items-end pr-6">
// //                   <div>
// //                     <h4 className="font-bold text-gray-800 text-[10px] uppercase tracking-wider">{visibleReviews[1].name}</h4>
// //                     <span className="text-gray-400 text-[10px]">{visibleReviews[1].handle}</span>
// //                   </div>
// //                   <StarRating rating={visibleReviews[1].rating} />
// //                 </div>
// //               </div>
// //             </AnimWrap>
// //           </div>

// //           {/* Card 3: Bottom Left Vertical Split */}
// //           <div className="w-3/4 mx-auto">
// //             <AnimWrap id={visibleReviews[2].id} index={2}>
// //               <div className={`bg-white rounded-3xl overflow-hidden flex flex-col ${shadowStyle}`}>
// //                 <div className="p-8 text-center flex-1">
// //                   <h3 className="font-serif text-xl text-gray-800 mb-4">{visibleReviews[2].title || "Top-notch!"}</h3>
// //                   <p className="text-gray-500 text-xs leading-relaxed mb-6">{visibleReviews[2].text}</p>
// //                   <div className="flex justify-center"><StarRating rating={visibleReviews[2].rating} /></div>
// //                 </div>
// //                 <div className="bg-[#EBE5DF] p-4 flex items-center gap-4">
// //                   <div className="w-10 h-10 rounded-full bg-[#fe8204] text-white flex items-center justify-center font-bold uppercase shrink-0">
// //                     {visibleReviews[2].name.charAt(0)}
// //                   </div>
// //                   <div className="flex flex-col text-left">
// //                     <span className="font-bold text-gray-800 text-xs">{visibleReviews[2].name}</span>
// //                     <span className="text-gray-500 text-[10px]">{visibleReviews[2].handle}</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             </AnimWrap>
// //           </div>
// //         </div>

// //         {/* ================= COLUMN 2 (CENTER) ================= */}
// //         <div className="flex flex-col gap-10">
          
// //           {/* Card 4: Main Hero */}
// //           <div className="relative pt-12">
// //             <AnimWrap id={visibleReviews[3].id} index={3}>
// //               <div className={`bg-white rounded-[3rem] p-12 text-center relative flex flex-col items-center justify-center ${shadowStyle}`}>
// //                 <div 
// //                   className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-4xl font-bold uppercase shadow-inner"
// //                   style={{ border: `8px solid ${bgTheme}` }}
// //                 >
// //                   {visibleReviews[3].name.charAt(0)}
// //                 </div>
// //                 <h2 className="font-serif text-2xl text-gray-800 mb-3 tracking-wide mt-4 uppercase">
// //                   {visibleReviews[3].title}
// //                 </h2>
// //                 <div className="mb-6"><StarRating rating={visibleReviews[3].rating} /></div>
// //                 <p className="text-gray-500 text-sm leading-loose italic mb-8 px-4">
// //                   "{visibleReviews[3].text}"
// //                 </p>
// //                 <span className="font-serif italic text-2xl text-gray-400">
// //                   {visibleReviews[3].name}
// //                 </span>
// //               </div>
// //             </AnimWrap>
// //           </div>

// //           {/* Row of two bottom bubbles */}
// //           <div className="grid grid-cols-2 gap-6 items-end">
// //             {/* Card 5: Left Bubble pointing left */}
// //             <div className="relative">
// //               <AnimWrap id={visibleReviews[4].id} index={4}>
// //                 {/* Simulated CSS tail */}
// //                 <div className="absolute -bottom-4 left-6 w-8 h-8 bg-white rotate-45" />
// //                 <div className={`bg-white rounded-[2rem] p-4 relative z-10 flex gap-4 ${shadowStyle}`}>
// //                   <div className="w-1/3 bg-[#fe8204] rounded-[1.5rem] flex flex-col items-center justify-center text-white p-2">
// //                     <span className="text-3xl font-bold">{visibleReviews[4].name.charAt(0)}</span>
// //                   </div>
// //                   <div className="flex-1 py-2 pr-2">
// //                     <h5 className="font-bold text-gray-800 text-[11px] uppercase mb-2">{visibleReviews[4].title}</h5>
// //                     <p className="text-gray-500 text-[10px] leading-snug mb-2">"{visibleReviews[4].text}"</p>
// //                     <span className="text-gray-400 text-[9px] block mb-2">{visibleReviews[4].handle}</span>
// //                     <StarRating rating={visibleReviews[4].rating} />
// //                   </div>
// //                 </div>
// //               </AnimWrap>
// //             </div>

// //             {/* Card 6: Right Bubble pointing right */}
// //             <div className="relative">
// //               <AnimWrap id={visibleReviews[5].id} index={5}>
// //                 {/* Simulated CSS tail */}
// //                 <div className="absolute -bottom-4 right-6 w-8 h-8 bg-white rotate-45" />
// //                 <div className={`bg-white rounded-[2rem] p-4 relative z-10 flex flex-col gap-3 ${shadowStyle}`}>
// //                   <div className="absolute top-0 left-6 bg-[#A7988A] text-white text-xs px-2 py-1 rounded-b-md z-20">★</div>
// //                   <div className="w-full h-24 bg-[#fe8204] rounded-[1.5rem] flex items-center justify-center text-white">
// //                     <span className="text-4xl font-bold">{visibleReviews[5].name.charAt(0)}</span>
// //                   </div>
// //                   <div className="text-center px-2 pb-2">
// //                     <h5 className="font-bold text-gray-800 text-[10px] uppercase mb-1">{visibleReviews[5].title}</h5>
// //                     <div className="flex justify-center mb-2 scale-90"><StarRating rating={visibleReviews[5].rating} /></div>
// //                     <p className="text-gray-400 text-[9px] leading-snug">"{visibleReviews[5].text}"</p>
// //                   </div>
// //                 </div>
// //               </AnimWrap>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ================= COLUMN 3 ================= */}
// //         <div className="flex flex-col gap-10">
          
// //           {/* Card 7: Top Right Header Split */}
// //           <div>
// //             <AnimWrap id={visibleReviews[6].id} index={6}>
// //               <div className={`bg-white rounded-3xl overflow-hidden ${shadowStyle}`}>
// //                 <div className="bg-[#EBE5DF] px-6 py-4 flex justify-between items-center border-b border-gray-100">
// //                   <span className="font-serif font-bold text-gray-800">{visibleReviews[6].title}</span>
// //                   <span className="text-xs text-gray-500">{visibleReviews[6].handle}</span>
// //                 </div>
// //                 <div className="p-6">
// //                   <p className="text-gray-600 text-sm mb-6">"{visibleReviews[6].text}"</p>
// //                   <div className="flex justify-between items-center">
// //                     <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-[#fe8204] transition-colors">Read More &rarr;</button>
// //                     <div className="flex gap-2 text-gray-300">
// //                       <span>♡</span><span>💬</span><span>↗</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </AnimWrap>
// //           </div>

// //           {/* Card 8: Mid Right Wide Pill */}
// //           <div className="relative pl-8 my-4">
// //             <AnimWrap id={visibleReviews[7].id} index={7}>
// //               <div className={`bg-white rounded-full p-5 pl-12 flex relative items-center gap-4 ${shadowStyle}`}>
// //                 <div 
// //                   className="absolute -left-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
// //                   style={{ border: `6px solid ${bgTheme}` }}
// //                 >
// //                   {visibleReviews[7].name.charAt(0)}
// //                 </div>
// //                 {/* Thumbs up badge */}
// //                 <div className="absolute -top-4 right-8 w-10 h-10 rounded-full bg-[#A7988A] text-white flex items-center justify-center text-lg shadow-md border-4 border-white">
// //                   👍
// //                 </div>
// //                 <div className="flex-1 pr-4">
// //                   <h4 className="font-serif text-sm font-bold text-gray-800 uppercase mb-1">{visibleReviews[7].name}</h4>
// //                   <p className="text-gray-500 text-[10px] leading-tight mb-2 pr-8">{visibleReviews[7].text}</p>
// //                   <StarRating rating={visibleReviews[7].rating} />
// //                 </div>
// //               </div>
// //             </AnimWrap>
// //           </div>

// //           {/* Card 9: Bottom Right Bubble */}
// //           <div className="relative mt-8">
// //             <AnimWrap id={visibleReviews[8].id} index={8}>
// //               <div className={`bg-white rounded-[2rem] rounded-bl-none p-8 relative ${shadowStyle}`}>
// //                 <div className="absolute -bottom-6 left-6 text-7xl text-gray-400 font-serif leading-none rotate-180 opacity-50">“</div>
// //                 <p className="text-gray-600 text-sm mb-6">"{visibleReviews[8].text}"</p>
// //                 <div className="flex justify-end pr-16 text-right flex-col">
// //                   <span className="font-[Brush Script MT, cursive] font-serif italic text-xl text-gray-400">{visibleReviews[8].name}</span>
// //                   <span className="text-[10px] text-gray-400">{visibleReviews[8].handle}</span>
// //                 </div>
// //                 <div 
// //                   className="absolute -bottom-6 -right-2 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
// //                   style={{ border: `6px solid ${bgTheme}` }}
// //                 >
// //                   {visibleReviews[8].name.charAt(0)}
// //                 </div>
// //               </div>
// //             </AnimWrap>
// //           </div>

// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // --- Types ---
// interface Review {
//   id: string;
//   name: string;
//   handle: string;
//   title?: string;
//   text: string;
//   rating: number;
// }

// // --- Mock Data ---
// const allReviews: Review[] = [
//   { id: "1", name: "Victoria Linton", handle: "@victorialinton", text: "Praedam urna neque viverra justo ultrices dui. Est lorem nunc sed velit dignissim. In hendrerit gravida.", rating: 5 },
//   { id: "2", name: "Dmitri Woodhouse", handle: "@yournamehere", text: "Mauris in aliquam se fringilla morbi tincidunt augue amet dui massa.", rating: 5 },
//   { id: "3", name: "Hindley Micawber", handle: "@yoursocialmedia", title: "Top-notch!", text: "Rhoncus urna neque viverra justo nec ultrices dui. Est lorem ipsum dolor sit amet consectetur.", rating: 5 },
//   { id: "4", name: "Fanny Deen", handle: "@fannydeen", title: "EXCELLENT JOB!", text: "A scelerisque purus semper eget duis at tellus. Amet cursus sit amet dictum sit justo. Varius sit amet.", rating: 5 },
//   { id: "5", name: "Catherine Doe", handle: "@CatherineDoe", title: "TESTIMONIAL", text: "In hac habitasse platea dictumst quisque sagitise pur convallis.", rating: 4 },
//   { id: "6", name: "Unknown User", handle: "@user123", title: "RECOMMENDED!", text: "Habitant morbi tristique et netus blandit molestie.", rating: 5 },
//   { id: "7", name: "Artful Wotton", handle: "@ArtfulWotton", title: "Client Review", text: "Rhoncus neque viverra justo ultrices duist lorem dolor sed consect adipiscing.", rating: 0 },
//   { id: "8", name: "Nelly Vane", handle: "@nellyvane", text: "Varius duis at consectetur lorem donec. Et tortor at risus viverra adipiscing at in tellus.", rating: 5 },
//   { id: "9", name: "Jane Prokofich", handle: "@JaneProkofich", text: "Vestibulum mattis enim aulit tortor se ullamcorper morbi pretium.", rating: 0 },
//   { id: "10", name: "Robert Fox", handle: "@robertfox", title: "Amazing Work", text: "They helped me through every step of the process. I couldn't be happier with the results.", rating: 5 },
//   { id: "11", name: "Eleanor Pena", handle: "@eleanorp", title: "Fast & Reliable", text: "Delivered ahead of schedule and exceeded all my expectations.", rating: 5 },
//   { id: "12", name: "Brooklyn Simmons", handle: "@brooklyns", text: "Great communication and a fantastic final product. Will return!", rating: 4 },
//   { id: "13", name: "Brooklyn sdfads Simmons", handle: "@brooklyns", text: "Great communication sdfafda and a fantastic final product. Will return!", rating: 4 }
// ];

// // --- Helpers ---
// const StarRating = ({ rating }: { rating: number }) => {
//   if (rating === 0) return null;
//   return (
//     <div className="text-[#fe8204] text-[10px] sm:text-xs tracking-widest flex items-center gap-1">
//       {"★".repeat(rating)}{"☆".repeat(5 - rating)}
//       {rating > 0 && <span className="text-gray-400 font-sans ml-1">({rating.toFixed(1)})</span>}
//     </div>
//   );
// };

// // --- Extracted Animation Wrapper ---
// // ✅ MOVED OUTSIDE: Reference stays stable, preventing the full-grid blink.
// const AnimWrap = ({ 
//   children, 
//   id, 
//   index, 
//   isInitial 
// }: { 
//   children: React.ReactNode; 
//   id: string; 
//   index: number;
//   isInitial: boolean;
// }) => (
//   <AnimatePresence mode="wait">
//     <motion.div
//       key={id}
//       initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(8px)" }}
//       animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
//       exit={{ opacity: 0, y: -20, scale: 0.9, filter: "blur(8px)" }}
//       transition={{ 
//         duration: 0.6, 
//         ease: "easeInOut",
//         delay: isInitial ? index * 0.15 : 0 
//       }}
//       className="h-full w-full"
//     >
//       {children}
//     </motion.div>
//   </AnimatePresence>
// );

// // --- Main Component ---
// export default function ReviewsMockupGrid() {
//   const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);
//   const [hiddenReviews, setHiddenReviews] = useState<Review[]>([]);
  
//   const lastUpdatedIndex = useRef(-1);
//   const isInitialMount = useRef(true);

//   const bgTheme = "#C4B5A5"; 
//   const shadowStyle = "shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.2)] transition-shadow duration-300";

//   useEffect(() => {
//     setVisibleReviews(allReviews.slice(0, 9));
//     setHiddenReviews(allReviews.slice(9));

//     const timeout = setTimeout(() => {
//       isInitialMount.current = false;
//     }, 200);
//     return () => clearTimeout(timeout);
//   }, []);

//   useEffect(() => {
//     if (allReviews.length <= 9) return;
    
//     const interval = setInterval(() => {
//       setVisibleReviews((prevVis) => {
//         let nextVis = [...prevVis];

//         setHiddenReviews((prevHid) => {
//           let nextHid = [...prevHid];
          
//           let randomGridIndex;
//           do {
//             randomGridIndex = Math.floor(Math.random() * nextVis.length);
//           } while (randomGridIndex === lastUpdatedIndex.current); 
          
//           lastUpdatedIndex.current = randomGridIndex;
          
//           const randomHiddenIndex = Math.floor(Math.random() * nextHid.length);
          
//           const outgoingReview = nextVis[randomGridIndex];
//           const incomingReview = nextHid[randomHiddenIndex];
          
//           nextVis[randomGridIndex] = incomingReview;
          
//           nextHid.splice(randomHiddenIndex, 1); 
//           nextHid.push(outgoingReview); 
          
//           return nextHid;
//         });
        
//         return nextVis;
//       });
//     }, 4000); 
    
//     return () => clearInterval(interval);
//   }, []); 

//   if (visibleReviews.length < 9) return null;

//   return (
//     <section 
//       style={{ backgroundColor: bgTheme }} 
//       className="min-h-screen p-8 md:p-16 lg:p-24 flex items-center justify-center font-sans overflow-hidden"
//     >
//       <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr] gap-x-8 gap-y-12 items-start">
        
//         {/* ================= COLUMN 1 ================= */}
//         <div className="flex flex-col gap-12 pt-8">
//           <div className="relative">
//             <AnimWrap id={visibleReviews[0].id} index={0} isInitial={isInitialMount.current}>
//               <div className={`bg-white rounded-3xl p-6 relative ${shadowStyle}`}>
//                 <div 
//                   className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
//                   style={{ border: `6px solid ${bgTheme}` }}
//                 >
//                   {visibleReviews[0].name.charAt(0)}
//                 </div>
//                 <div className="absolute top-2 right-4 text-6xl text-gray-300 font-serif leading-none">“</div>
//                 <div className="ml-10 mb-3">
//                   <h4 className="font-serif text-lg text-gray-800">{visibleReviews[0].name}</h4>
//                   <StarRating rating={visibleReviews[0].rating} />
//                 </div>
//                 <p className="text-gray-500 text-xs leading-relaxed">{visibleReviews[0].text}</p>
//               </div>
//             </AnimWrap>
//           </div>

//           <div className="relative pr-8">
//             <AnimWrap id={visibleReviews[1].id} index={1} isInitial={isInitialMount.current}>
//               <div className={`bg-white rounded-[2rem] p-6 relative ${shadowStyle}`}>
//                 <div 
//                   className="absolute top-1/2 -translate-y-1/2 -right-8 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
//                   style={{ border: `6px solid ${bgTheme}` }}
//                 >
//                   {visibleReviews[1].name.charAt(0)}
//                 </div>
//                 <p className="text-gray-600 text-sm italic mb-4 pr-6">"{visibleReviews[1].text}"</p>
//                 <div className="flex justify-between items-end pr-6">
//                   <div>
//                     <h4 className="font-bold text-gray-800 text-[10px] uppercase tracking-wider">{visibleReviews[1].name}</h4>
//                     <span className="text-gray-400 text-[10px]">{visibleReviews[1].handle}</span>
//                   </div>
//                   <StarRating rating={visibleReviews[1].rating} />
//                 </div>
//               </div>
//             </AnimWrap>
//           </div>

//           <div className="w-3/4 mx-auto">
//             <AnimWrap id={visibleReviews[2].id} index={2} isInitial={isInitialMount.current}>
//               <div className={`bg-white rounded-3xl overflow-hidden flex flex-col ${shadowStyle}`}>
//                 <div className="p-8 text-center flex-1">
//                   <h3 className="font-serif text-xl text-gray-800 mb-4">{visibleReviews[2].title || "Top-notch!"}</h3>
//                   <p className="text-gray-500 text-xs leading-relaxed mb-6">{visibleReviews[2].text}</p>
//                   <div className="flex justify-center"><StarRating rating={visibleReviews[2].rating} /></div>
//                 </div>
//                 <div className="bg-[#EBE5DF] p-4 flex items-center gap-4">
//                   <div className="w-10 h-10 rounded-full bg-[#fe8204] text-white flex items-center justify-center font-bold uppercase shrink-0">
//                     {visibleReviews[2].name.charAt(0)}
//                   </div>
//                   <div className="flex flex-col text-left">
//                     <span className="font-bold text-gray-800 text-xs">{visibleReviews[2].name}</span>
//                     <span className="text-gray-500 text-[10px]">{visibleReviews[2].handle}</span>
//                   </div>
//                 </div>
//               </div>
//             </AnimWrap>
//           </div>
//         </div>

//         {/* ================= COLUMN 2 (CENTER) ================= */}
//         <div className="flex flex-col gap-10">
//           <div className="relative pt-12">
//             <AnimWrap id={visibleReviews[3].id} index={3} isInitial={isInitialMount.current}>
//               <div className={`bg-white rounded-[3rem] p-12 text-center relative flex flex-col items-center justify-center ${shadowStyle}`}>
//                 <div 
//                   className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-4xl font-bold uppercase shadow-inner"
//                   style={{ border: `8px solid ${bgTheme}` }}
//                 >
//                   {visibleReviews[3].name.charAt(0)}
//                 </div>
//                 <h2 className="font-serif text-2xl text-gray-800 mb-3 tracking-wide mt-4 uppercase">
//                   {visibleReviews[3].title}
//                 </h2>
//                 <div className="mb-6"><StarRating rating={visibleReviews[3].rating} /></div>
//                 <p className="text-gray-500 text-sm leading-loose italic mb-8 px-4">
//                   "{visibleReviews[3].text}"
//                 </p>
//                 <span className="font-serif italic text-2xl text-gray-400">
//                   {visibleReviews[3].name}
//                 </span>
//               </div>
//             </AnimWrap>
//           </div>

//           <div className="grid grid-cols-2 gap-6 items-end">
//             <div className="relative">
//               <AnimWrap id={visibleReviews[4].id} index={4} isInitial={isInitialMount.current}>
//                 <div className="absolute -bottom-4 left-6 w-8 h-8 bg-white rotate-45" />
//                 <div className={`bg-white rounded-[2rem] p-4 relative z-10 flex gap-4 ${shadowStyle}`}>
//                   <div className="w-1/3 bg-[#fe8204] rounded-[1.5rem] flex flex-col items-center justify-center text-white p-2">
//                     <span className="text-3xl font-bold">{visibleReviews[4].name.charAt(0)}</span>
//                   </div>
//                   <div className="flex-1 py-2 pr-2">
//                     <h5 className="font-bold text-gray-800 text-[11px] uppercase mb-2">{visibleReviews[4].title}</h5>
//                     <p className="text-gray-500 text-[10px] leading-snug mb-2">"{visibleReviews[4].text}"</p>
//                     <span className="text-gray-400 text-[9px] block mb-2">{visibleReviews[4].handle}</span>
//                     <StarRating rating={visibleReviews[4].rating} />
//                   </div>
//                 </div>
//               </AnimWrap>
//             </div>

//             <div className="relative">
//               <AnimWrap id={visibleReviews[5].id} index={5} isInitial={isInitialMount.current}>
//                 <div className="absolute -bottom-4 right-6 w-8 h-8 bg-white rotate-45" />
//                 <div className={`bg-white rounded-[2rem] p-4 relative z-10 flex flex-col gap-3 ${shadowStyle}`}>
//                   <div className="absolute top-0 left-6 bg-[#A7988A] text-white text-xs px-2 py-1 rounded-b-md z-20">★</div>
//                   <div className="w-full h-24 bg-[#fe8204] rounded-[1.5rem] flex items-center justify-center text-white">
//                     <span className="text-4xl font-bold">{visibleReviews[5].name.charAt(0)}</span>
//                   </div>
//                   <div className="text-center px-2 pb-2">
//                     <h5 className="font-bold text-gray-800 text-[10px] uppercase mb-1">{visibleReviews[5].title}</h5>
//                     <div className="flex justify-center mb-2 scale-90"><StarRating rating={visibleReviews[5].rating} /></div>
//                     <p className="text-gray-400 text-[9px] leading-snug">"{visibleReviews[5].text}"</p>
//                   </div>
//                 </div>
//               </AnimWrap>
//             </div>
//           </div>
//         </div>

//         {/* ================= COLUMN 3 ================= */}
//         <div className="flex flex-col gap-10">
//           <div>
//             <AnimWrap id={visibleReviews[6].id} index={6} isInitial={isInitialMount.current}>
//               <div className={`bg-white rounded-3xl overflow-hidden ${shadowStyle}`}>
//                 <div className="bg-[#EBE5DF] px-6 py-4 flex justify-between items-center border-b border-gray-100">
//                   <span className="font-serif font-bold text-gray-800">{visibleReviews[6].title}</span>
//                   <span className="text-xs text-gray-500">{visibleReviews[6].handle}</span>
//                 </div>
//                 <div className="p-6">
//                   <p className="text-gray-600 text-sm mb-6">"{visibleReviews[6].text}"</p>
//                   <div className="flex justify-between items-center">
//                     <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-[#fe8204] transition-colors">Read More &rarr;</button>
//                     <div className="flex gap-2 text-gray-300">
//                       <span>♡</span><span>💬</span><span>↗</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </AnimWrap>
//           </div>

//           <div className="relative pl-8 my-4">
//             <AnimWrap id={visibleReviews[7].id} index={7} isInitial={isInitialMount.current}>
//               <div className={`bg-white rounded-full p-5 pl-12 flex relative items-center gap-4 ${shadowStyle}`}>
//                 <div 
//                   className="absolute -left-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
//                   style={{ border: `6px solid ${bgTheme}` }}
//                 >
//                   {visibleReviews[7].name.charAt(0)}
//                 </div>
//                 <div className="absolute -top-4 right-8 w-10 h-10 rounded-full bg-[#A7988A] text-white flex items-center justify-center text-lg shadow-md border-4 border-white">
//                   👍
//                 </div>
//                 <div className="flex-1 pr-4">
//                   <h4 className="font-serif text-sm font-bold text-gray-800 uppercase mb-1">{visibleReviews[7].name}</h4>
//                   <p className="text-gray-500 text-[10px] leading-tight mb-2 pr-8">{visibleReviews[7].text}</p>
//                   <StarRating rating={visibleReviews[7].rating} />
//                 </div>
//               </div>
//             </AnimWrap>
//           </div>

//           <div className="relative mt-8">
//             <AnimWrap id={visibleReviews[8].id} index={8} isInitial={isInitialMount.current}>
//               <div className={`bg-white rounded-[2rem] rounded-bl-none p-8 relative ${shadowStyle}`}>
//                 <div className="absolute -bottom-6 left-6 text-7xl text-gray-400 font-serif leading-none rotate-180 opacity-50">“</div>
//                 <p className="text-gray-600 text-sm mb-6">"{visibleReviews[8].text}"</p>
//                 <div className="flex justify-end pr-16 text-right flex-col">
//                   <span className="font-[Brush Script MT, cursive] font-serif italic text-xl text-gray-400">{visibleReviews[8].name}</span>
//                   <span className="text-[10px] text-gray-400">{visibleReviews[8].handle}</span>
//                 </div>
//                 <div 
//                   className="absolute -bottom-6 -right-2 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
//                   style={{ border: `6px solid ${bgTheme}` }}
//                 >
//                   {visibleReviews[8].name.charAt(0)}
//                 </div>
//               </div>
//             </AnimWrap>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }



// // // // import React from 'react';

// // // // // --- Types ---
// // // // interface Product {
// // // //   id: number;
// // // //   imageSrc: string;
// // // //   price: string;
// // // // }

// // // // // --- Mock Data ---
// // // // const products: Product[] = [
// // // //   { id: 1, imageSrc: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$120.00' },
// // // //   { id: 2, imageSrc: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$85.00' },
// // // //   { id: 3, imageSrc: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$95.00' },
// // // //   { id: 4, imageSrc: 'https://images.unsplash.com/photo-1489987707023-af0d4e7f6e28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$150.00' },
// // // // ];

// // // // // --- Reusable Product Card Component ---
// // // // const ProductCard = ({ product }: { product: Product }) => (
// // // //   <div className="flex flex-col group w-full mb-8 lg:mb-0">
// // // //     <div className="overflow-hidden mb-4 bg-[var(--color-secondary)]">
// // // //       {/* Note: Using standard <img> for plug-and-play ease. 
// // // //           Swap to next/image (<Image />) in production for optimization. */}
// // // //       <img
// // // //         src={product.imageSrc}
// // // //         alt={`Product ${product.id}`}
// // // //         className="w-full h-auto object-cover aspect-[3/4] grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out"
// // // //       />
// // // //     </div>
// // // //     <div className="flex flex-col gap-3">
// // // //       {/* Price mapped to your custom fonts */}
// // // //       <p className="font-heading text-lead">{product.price}</p>
      
// // // //       {/* View Button using your custom button class */}
// // // //       <button className="text-btn self-start border border-[var(--color-white)] px-6 py-2 hover:bg-[var(--color-white)] hover:text-[var(--color-black)] transition-colors duration-300">
// // // //         VIEW
// // // //       </button>
// // // //     </div>
// // // //   </div>
// // // // );

// // // // // --- Main Section Component ---
// // // // export default function NewArrivals() {
// // // //   return (
// // // //     <section className="bg-[var(--color-black)] text-[var(--color-white)] py-20 px-4 md:px-8 w-full overflow-hidden">
// // // //       <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_1fr] gap-10 lg:gap-16 items-start">
        
// // // //         {/* Column 1 */}
// // // //         <div className="flex flex-col gap-10">
// // // //           <h2 className="font-heading text-h2 uppercase leading-none">
// // // //             FRESH<br />DROPS
// // // //           </h2>
// // // //           <ProductCard product={products[0]} />
// // // //         </div>

// // // //         {/* Column 2 (Staggered layout on desktop) */}
// // // //         <div className="flex flex-col gap-10 lg:pt-32">
// // // //           <ProductCard product={products[1]} />
// // // //           <ProductCard product={products[2]} />
// // // //         </div>

// // // //         {/* Column 3: Vertical Text (Hidden on mobile/tablet to preserve layout) */}
// // // //         <div className="hidden lg:flex justify-center items-center h-full select-none">
// // // //           <h1 
// // // //             className="font-heading text-hero uppercase text-[var(--color-white)] whitespace-nowrap"
// // // //             style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
// // // //           >
// // // //             NEW ARRIVALS
// // // //           </h1>
// // // //         </div>

// // // //         {/* Column 4 */}
// // // //         <div className="flex flex-col gap-10">
// // // //           <div className="flex flex-col items-start gap-6 lg:mt-8">
// // // //             <p className="text-body uppercase max-w-[280px]">
// // // //               Curating exactly the things you need in pieces.
// // // //             </p>
// // // //             <button className="text-btn bg-[var(--color-white)] text-[var(--color-black)] px-8 py-3 hover:bg-[var(--color-primary)] hover:text-[var(--color-white)] transition-colors duration-300">
// // // //               READ MORE
// // // //             </button>
// // // //           </div>
// // // //           <ProductCard product={products[3]} />
// // // //         </div>

// // // //       </div>
// // // //     </section>
// // // //   );
// // // // }
// // // import React from 'react';
// // // import Image from 'next/image';
// // // // --- Mock Data for Images ---
// // // // Using 5 distinct images to match the exact placement in the provided design
// // // const tattooImages = [
// // //   '/assets/images/Card1.png', // 1: Left column large
// // //   '/assets/images/Card2.png', // 2: Middle column top
// // //   '/assets/images/Card3.png', // 3: Middle column bottom
// // //   '/assets/images/Card4.png', // 4: Right middle column
// // //   '/assets/images/Card5.png', // 5: Far right column
// // // ];

// // // export default function TattooGallery() {
// // //   return (
// // //     <section className="bg-black text-white py-20 px-4 md:px-8 w-full overflow-hidden font-sans">
// // //       {/* Custom Grid Layout matching the image proportions:
// // //         Col 1: Title + Img + Text + Btn
// // //         Col 2: 2 Stacked Images
// // //         Col 3: Img + Text + Btn
// // //         Col 4: Vertical Text
// // //         Col 5: Text + Btn + Img
// // //       */}
// // //       <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_auto_1.5fr] gap-8 lg:gap-12 items-start">
        
// // //         {/* Column 1 */}
// // //         <div className="flex flex-col gap-6">
// // //           <h2 className="text-3xl lg:text-4xl text-[var(--color-brand-orange)] font-bold uppercase leading-tight tracking-wider mb-2">
// // //             NEW<br />Arrivals
// // //           </h2>
// // //           <img
// // //             src={tattooImages[0]}
// // //             alt="Tattoo Work 1"
// // //             className="w-full h-auto object-cover aspect-[4/5]"
// // //           />
// // //           <p className="text-xs text-gray-400 max-w-[250px] leading-relaxed mt-2">
// // //             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
// // //           </p>
// // //           <button className="border border-white px-6 py-2 text-xs font-semibold tracking-widest hover:bg-white hover:text-black transition-colors duration-300 self-start mt-2 uppercase">
// // //             VIEW ALL
// // //           </button>
// // //         </div>

// // //         {/* Column 2 */}
// // //         <div className="flex flex-col gap-8 lg:pt-24">
// // //           <img
// // //             src={tattooImages[1]}
// // //             alt="Tattoo Work 2"
// // //             className="w-full h-auto object-cover aspect-square"
// // //           />
// // //           <img
// // //             src={tattooImages[2]}
// // //             alt="Tattoo Work 3"
// // //             className="w-full h-auto object-cover aspect-[4/5]"
// // //           />
// // //         </div>

// // //         {/* Column 3 */}
// // //         <div className="flex flex-col gap-6 lg:pt-12">
// // //           <img
// // //             src={tattooImages[3]}
// // //             alt="Tattoo Work 4"
// // //             className="w-full h-auto object-cover aspect-[3/4]"
// // //           />
// // //           <p className="text-xs text-gray-400 max-w-[200px] leading-relaxed mt-2">
// // //             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
// // //           </p>
// // //           <button className="bg-white text-black px-6 py-2 text-xs font-semibold tracking-widest hover:bg-gray-300 transition-colors duration-300 self-start mt-2 uppercase">
// // //             VIEW ALL
// // //           </button>
// // //         </div>

// // //         {/* Column 4: Vertical Text */}
// // //         {/* <div className="hidden lg:flex justify-center items-center h-full select-none px-4">
// // //           <h1 
// // //             className="text-4xl text-[var(--color-brand-orange)] lg:text-5xl font-bold uppercase tracking-[0.2em] whitespace-nowrap"
// // //             style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
// // //           >
// // //             JUST TATTOOS
// // //           </h1>
// // //         </div> */}

// // //         <div className="hidden lg:flex justify-center items-center h-full select-none px-4">
// // //   {/* We wrap the Image in a div to handle the rotation safely without messing up Next.js Image bounding boxes */}
// // //         <div className="transform -rotate-90 w-[80px] lg:w-[110px] flex justify-center items-center">
// // //             <Image 
// // //             src="/assets/icons/Fotterlogo2.svg" 
// // //             alt="Just Tattoos Logo"
// // //             width={400} 
// // //             height={80} 
// // //             className="w-full h-auto object-contain"
// // //             priority // Add this if the logo is visible immediately when the page loads
// // //             />
// // //         </div>
// // //         </div>

// // //         {/* Column 5 */}
// // //         <div className="flex flex-col gap-6 lg:pt-24">
// // //           <div className="flex flex-col items-start gap-6">
// // //             <p className="text-xs text-gray-400 uppercase max-w-[250px] leading-relaxed">
// // //               Curating exactly the things you need in pieces.
// // //             </p>
// // //             <button className="bg-white text-black px-6 py-2 text-xs font-semibold tracking-widest hover:bg-gray-300 transition-colors duration-300 self-start uppercase">
// // //               VIEW ALL
// // //             </button>
// // //           </div>
// // //           <img
// // //             src={tattooImages[4]}
// // //             alt="Tattoo Work 5"
// // //             className="w-full h-auto object-cover aspect-[3/4] mt-4"
// // //           />
// // //         </div>

// // //       </div>
// // //     </section>
// // //   );
// // // }


// // import React from 'react';
// // import Image from 'next/image';

// // // --- Mock Data for Images ---
// // const tattooImages = [
// //   '/assets/images/Card1.png', // 1: Left column large
// //   '/assets/images/Card2.png', // 2: Middle column top
// //   '/assets/images/Card3.png', // 3: Middle column bottom
// //   '/assets/images/Card4.png', // 4: Right middle column
// //   '/assets/images/Card5.png', // 5: Far right column
// // ];

// // export default function TattooGallery() {
// //   return (
// //     <section className="bg-black text-white py-20 px-4 md:px-8 w-full overflow-hidden font-sans">
// //       <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_auto_1.5fr] gap-8 lg:gap-12 items-start">
        
// //         {/* Column 1 */}
// //         <div className="flex flex-col gap-6">
// //           <h2 className="text-3xl lg:text-4xl text-[var(--color-brand-orange)] font-bold uppercase leading-tight tracking-wider mb-2">
// //             NEW<br />Arrivals
// //           </h2>
// //           <img
// //             src={tattooImages[0]}
// //             alt="Tattoo Work 1"
// //             className="w-full h-auto object-cover aspect-[4/5]"
// //           />
// //           <p className="text-xs text-gray-400 max-w-[250px] leading-relaxed mt-2">
// //             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
// //           </p>
// //           <button className="border border-white px-6 py-2 text-xs font-semibold tracking-widest hover:bg-white hover:text-black transition-colors duration-300 self-start mt-2 uppercase">
// //             VIEW ALL
// //           </button>
// //         </div>

// //         {/* Column 2 */}
// //         <div className="flex flex-col gap-8 lg:pt-24">
// //           <img
// //             src={tattooImages[1]}
// //             alt="Tattoo Work 2"
// //             className="w-full h-auto object-cover aspect-square"
// //           />
// //           <img
// //             src={tattooImages[2]}
// //             alt="Tattoo Work 3"
// //             className="w-full h-auto object-cover aspect-[4/5]"
// //           />
// //         </div>

// //         {/* Column 3 */}
// //         <div className="flex flex-col gap-6 lg:pt-12">
// //           <img
// //             src={tattooImages[3]}
// //             alt="Tattoo Work 4"
// //             className="w-full h-auto object-cover aspect-[3/4]"
// //           />
// //           <p className="text-xs text-gray-400 max-w-[200px] leading-relaxed mt-2">
// //             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
// //           </p>
// //           <button className="bg-white text-black px-6 py-2 text-xs font-semibold tracking-widest hover:bg-gray-300 transition-colors duration-300 self-start mt-2 uppercase">
// //             VIEW ALL
// //           </button>
// //         </div>

// //         {/* Column 4: Vertical Logo */}
// //         {/* 1. The parent div defines the horizontal width of the grid column (e.g. w-[80px]).
// //           2. The inner div is rotated, so its 'w-[500px]' acts as the vertical height.
// //         */}
// //         <div className="hidden lg:flex justify-center items-center h-full select-none w-[80px] lg:w-[120px] relative">
// //           <div className="transform -rotate-90 origin-center w-[400px] lg:w-[500px] flex justify-center items-center absolute">
// //             <Image 
// //               src="/assets/icons/Fotterlogo2.svg" 
// //               alt="Just Tattoos Logo"
// //               width={500} 
// //               height={100} 
// //               className="w-full h-auto object-contain"
// //               priority 
// //             />
// //           </div>
// //         </div>

// //         {/* Column 5 */}
// //         <div className="flex flex-col gap-6 lg:pt-24">
// //           <div className="flex flex-col items-start gap-6">
// //             <p className="text-xs text-gray-400 uppercase max-w-[250px] leading-relaxed">
// //               Curating exactly the things you need in pieces.
// //             </p>
// //             <button className="bg-white text-black px-6 py-2 text-xs font-semibold tracking-widest hover:bg-gray-300 transition-colors duration-300 self-start uppercase">
// //               VIEW ALL
// //             </button>
// //           </div>
// //           <img
// //             src={tattooImages[4]}
// //             alt="Tattoo Work 5"
// //             className="w-full h-auto object-cover aspect-[3/4] mt-4"
// //           />
// //         </div>

// //       </div>
// //     </section>
// //   );
// // }

// // import React from 'react';
// // import Image from 'next/image';

// // // --- Mock Data for Images ---
// // const tattooImages = [
// //   '/assets/images/Card1.png', // 1: Left column large
// //   '/assets/images/Card2.png', // 2: Middle column top
// //   '/assets/images/Card3.png', // 3: Middle column bottom
// //   '/assets/images/Card4.png', // 4: Right middle column
// //   '/assets/images/Card5.png', // 5: Far right column
// // ];

// // export default function TattooGallery() {
// //   return (
// //     <section className="bg-black text-white py-20 px-4 md:px-8 w-full overflow-hidden font-sans">
// //       <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_auto_1.5fr] gap-8 lg:gap-12 items-start">
        
// //         {/* Column 1 */}
// //         <div className="flex flex-col gap-6">
// //           <h2 className="text-3xl lg:text-4xl text-[var(--color-brand-orange)] font-bold uppercase leading-tight tracking-wider mb-2">
// //             NEW<br />Arrivals
// //           </h2>
// //           {/* Image Container with Animation */}
// //           <div className="overflow-hidden w-full relative group">
// //             <img
// //               src={tattooImages[0]}
// //               alt="Tattoo Work 1"
// //               className="w-full h-auto object-cover aspect-[4/5] transform transition-transform duration-700 ease-in-out group-hover:scale-105"
// //             />
// //           </div>
// //           <p className="text-xs text-gray-400 max-w-[250px] leading-relaxed mt-2">
// //             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
// //           </p>
// //           {/* Outline Button */}
// //           <button className="border border-[var(--color-brand-orange)] text-[var(--color-brand-orange)] px-6 py-2 text-xs font-semibold tracking-widest hover:bg-[var(--color-brand-orange)] hover:text-black transition-all duration-300 self-start mt-2 uppercase">
// //             VIEW ALL
// //           </button>
// //         </div>

// //         {/* Column 2 */}
// //         <div className="flex flex-col gap-8 lg:pt-24">
// //           <div className="overflow-hidden w-full relative group">
// //             <img
// //               src={tattooImages[1]}
// //               alt="Tattoo Work 2"
// //               className="w-full h-auto object-cover aspect-square transform transition-transform duration-700 ease-in-out group-hover:scale-105"
// //             />
// //           </div>
// //           <div className="overflow-hidden w-full relative group">
// //             <img
// //               src={tattooImages[2]}
// //               alt="Tattoo Work 3"
// //               className="w-full h-auto object-cover aspect-[4/5] transform transition-transform duration-700 ease-in-out group-hover:scale-105"
// //             />
// //           </div>
// //         </div>

// //         {/* Column 3 */}
// //         <div className="flex flex-col gap-6 lg:pt-12">
// //           <div className="overflow-hidden w-full relative group">
// //             <img
// //               src={tattooImages[3]}
// //               alt="Tattoo Work 4"
// //               className="w-full h-auto object-cover aspect-[3/4] transform transition-transform duration-700 ease-in-out group-hover:scale-105"
// //             />
// //           </div>
// //           <p className="text-xs text-gray-400 max-w-[200px] leading-relaxed mt-2">
// //             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
// //           </p>
// //           {/* Solid Button */}
// //           <button className="bg-[var(--color-brand-orange)] text-black px-6 py-2 text-xs font-semibold tracking-widest hover:bg-white hover:text-black transition-all duration-300 self-start mt-2 uppercase">
// //             VIEW ALL
// //           </button>
// //         </div>

// //         {/* Column 4: Vertical Logo */}
// //         <div className="hidden lg:flex justify-center items-center h-full select-none w-[80px] lg:w-[120px] relative">
// //           <div className="transform -rotate-90 origin-center w-[400px] lg:w-[500px] flex justify-center items-center absolute">
// //             <Image 
// //               src="/assets/icons/Fotterlogo2.svg" 
// //               alt="Just Tattoos Logo"
// //               width={500} 
// //               height={100} 
// //               className="w-full h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-500"
// //               priority 
// //             />
// //           </div>
// //         </div>

// //         {/* Column 5 */}
// //         <div className="flex flex-col gap-6 lg:pt-24">
// //           <div className="flex flex-col items-start gap-6">
// //             <p className="text-xs text-gray-400 uppercase max-w-[250px] leading-relaxed">
// //               Curating exactly the things you need in pieces.
// //             </p>
// //             {/* Solid Button */}
// //             <button className="bg-[var(--color-brand-orange)] text-black px-6 py-2 text-xs font-semibold tracking-widest hover:bg-white hover:text-black transition-all duration-300 self-start uppercase">
// //               VIEW ALL
// //             </button>
// //           </div>
// //           <div className="overflow-hidden w-full relative group mt-4">
// //             <img
// //               src={tattooImages[4]}
// //               alt="Tattoo Work 5"
// //               className="w-full h-auto object-cover aspect-[3/4] transform transition-transform duration-700 ease-in-out group-hover:scale-105"
// //             />
// //           </div>
// //         </div>

// //       </div>
// //     </section>
// //   );
// // }


// "use client";

// import React from 'react';
// import Image from 'next/image';
// import { motion, Variants } from 'framer-motion';

// // --- Mock Data for Images ---
// const tattooImages = [
//   '/assets/images/Card1.png', // 1: Left column large
//   '/assets/images/Card2.png', // 2: Middle column top
//   '/assets/images/Card3.png', // 3: Middle column bottom
//   '/assets/images/Card4.png', // 4: Right middle column
//   '/assets/images/Card5.png', // 5: Far right column
// ];

// // Reusable animation configuration for the images
// const imageAnimation:Variants = {
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
          
//           {/* Framer Motion Image Container */}
//           <motion.div 
//             variants={imageAnimation}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-50px" }}
//             custom={0.1} // Delay for stagger effect
//             className="overflow-hidden w-full relative group"
//           >
//             <img
//               src={tattooImages[0]}
//               alt="Tattoo Work 1"
//               className="w-full h-auto object-cover aspect-[4/5] transform transition-transform duration-700 ease-in-out group-hover:scale-105"
//             />
//           </motion.div>
          
//           <p className="text-xs text-gray-400 max-w-[250px] leading-relaxed mt-2">
//            Get the look without the commitment. Our ultra-realistic, peel-and-wear tattoos let you switch up your aesthetic instantly.
//           </p>
//           <button className="border border-[var(--color-brand-orange)] text-[var(--color-brand-orange)] px-6 py-2 text-xs font-semibold tracking-widest hover:bg-[var(--color-brand-orange)] hover:text-black transition-all duration-300 self-start mt-2 uppercase">
//             VIEW ALL
//           </button>
//         </div>

//         {/* Column 2 */}
//         <div className="flex flex-col gap-8 lg:pt-24">
//           <motion.div 
//             variants={imageAnimation}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-50px" }}
//             custom={0.2}
//             className="overflow-hidden w-full relative group"
//           >
//             <img
//               src={tattooImages[1]}
//               alt="Tattoo Work 2"
//               className="w-full h-auto object-cover aspect-square transform transition-transform duration-700 ease-in-out group-hover:scale-105"
//             />
//           </motion.div>
//           <motion.div 
//             variants={imageAnimation}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-50px" }}
//             custom={0.3}
//             className="overflow-hidden w-full relative group"
//           >
//             <img
//               src={tattooImages[2]}
//               alt="Tattoo Work 3"
//               className="w-full h-auto object-cover aspect-[4/5] transform transition-transform duration-700 ease-in-out group-hover:scale-105"
//             />
//           </motion.div>
//         </div>

//         {/* Column 3 */}
//         <div className="flex flex-col gap-6 lg:pt-12">
//           <motion.div 
//             variants={imageAnimation}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-50px" }}
//             custom={0.4}
//             className="overflow-hidden w-full relative group"
//           >
//             <img
//               src={tattooImages[3]}
//               alt="Tattoo Work 4"
//               className="w-full h-auto object-cover aspect-[3/4] transform transition-transform duration-700 ease-in-out group-hover:scale-105"
//             />
//           </motion.div>
//           <p className="text-xs text-gray-400 max-w-[200px] leading-relaxed mt-2">
//            Zero needles, zero regrets. Discover stunning, lifelike temporary body art that applies in seconds and lasts for days.
//           </p>
//           <button className="bg-[var(--color-brand-orange)] text-black px-6 py-2 text-xs font-semibold tracking-widest hover:bg-white hover:text-black transition-all duration-300 self-start mt-2 uppercase">
//             VIEW ALL
//           </button>
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
//             <button className="bg-[var(--color-brand-orange)] text-black px-6 py-2 text-xs font-semibold tracking-widest hover:bg-white hover:text-black transition-all duration-300 self-start uppercase">
//               VIEW ALL
//             </button>
//           </div>
//           <motion.div 
//             variants={imageAnimation}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-50px" }}
//             custom={0.5}
//             className="overflow-hidden w-full relative group mt-4"
//           >
//             <img
//               src={tattooImages[4]}
//               alt="Tattoo Work 5"
//               className="w-full h-auto object-cover aspect-[3/4] transform transition-transform duration-700 ease-in-out group-hover:scale-105"
//             />
//           </motion.div>
//         </div>

//       </div>
//     </section>
//   );
// }

// "use client";

// import React, { useState, useRef } from 'react';
// import { motion, useScroll, useTransform, AnimatePresence, Variants } from 'framer-motion';
// import { Filter, ShoppingBag, Heart, ChevronRight, ChevronLeft } from 'lucide-react';

// // --- Data Models & Constants ---
// const COLLECTION_DATA = {
//   "BODY PART": ["Ankle & Wrist", "Back, Torso & Chest Pieces", "Foot", "Hand", "Leg & Arm pieces", "Sleeve", "Spine"],
//   "STYLES": ["Animal", "Celestial art", "Colored Art", "Couple art", "Fantasy", "Floral", "Insects", "Japanese art", "Nature", "Spiritual", "Symbols and quotes", "Tribal art"],
//   "SIZES": ["Small", "Medium", "Large"],
// };

// // Generating mock images for the visual showcases
// const STYLE_SHOWCASE = COLLECTION_DATA.STYLES.map((style, i) => ({
//   name: style,
//   image: `https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80&w=300&h=300`, // Placeholder
// }));

// const BODY_PART_SHOWCASE = COLLECTION_DATA["BODY PART"].map((part, i) => ({
//   name: part,
//   image: `https://images.unsplash.com/photo-${1600000000000 + i}?auto=format&fit=crop&q=80&w=400&h=600`, // Placeholder
// }));

// type Product = {
//   id: string;
//   name: string;
//   price: number;
//   category: string;
//   bodyPart: string;
//   image: string;
//   isNew?: boolean;
// };

// // Dummy data for the bottom grid
// const DUMMY_PRODUCTS: Product[] = Array.from({ length: 16 }).map((_, i) => ({
//   id: `prod-${i}`,
//   name: `Premium Ink Design ${i + 1}`,
//   price: 12.99 + (i * 3),
//   category: COLLECTION_DATA.STYLES[i % COLLECTION_DATA.STYLES.length],
//   bodyPart: COLLECTION_DATA["BODY PART"][i % COLLECTION_DATA["BODY PART"].length],
//   image: `https://images.unsplash.com/photo-1598371839696-5e5bb00d0d10?auto=format&fit=crop&q=80&w=600&h=800`,
//   isNew: i % 5 === 0,
// }));

// // --- Main Component ---
// export default function CollectionsPage() {
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
//   const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
//     "BODY PART": [],
//     "STYLES": [],
//     "SIZES": []
//   });

//   const carouselRef = useRef<HTMLDivElement>(null);

//   const handleFilterToggle = (category: string, item: string) => {
//     setActiveFilters(prev => {
//       const current = prev[category] || [];
//       return {
//         ...prev,
//         [category]: current.includes(item) 
//           ? current.filter(i => i !== item)
//           : [...current, item]
//       };
//     });
//   };

//   const scrollCarousel = (direction: 'left' | 'right') => {
//     if (carouselRef.current) {
//       const { scrollLeft, clientWidth } = carouselRef.current;
//       const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
//       carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
//     }
//   };

//   // Animation variants
//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     show: { opacity: 1, transition: { staggerChildren: 0.1 } }
//   };
  
//   const fadeUpItem:Variants = {
//     hidden: { opacity: 0, y: 30 },
//     show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
//   };

//   return (
//     <div className="min-h-screen bg-[#fafafa] font-['Montserrat',sans-serif] text-gray-900 overflow-x-hidden">
      
//       {/* 1. HERO SECTION */}
//       <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0 bg-black/40 z-10"></div>
//         <img 
//           src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80&w=2000" 
//           alt="Tattoo Lifestyle" 
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="relative z-20 text-center px-4 max-w-3xl"
//         >
//           <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white font-['Almarena',sans-serif] uppercase mb-4">
//             The Collection
//           </h1>
//           <p className="text-lg md:text-xl text-gray-200">
//             Express yourself without the commitment. Explore our curated categories and find your next masterpiece.
//           </p>
//         </motion.div>
//       </section>

//       {/* 2. SHOP BY STYLE (Circular Showcase) */}
//       <section className="py-20 bg-white">
//         <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-end mb-10">
//             <div>
//               <h2 className="text-3xl font-bold font-['Almarena',sans-serif] uppercase tracking-wide">Shop by Style</h2>
//               <p className="text-gray-500 mt-2">Find the aesthetic that speaks to your soul.</p>
//             </div>
//             <div className="hidden md:flex gap-2">
//               <button onClick={() => scrollCarousel('left')} className="p-3 rounded-full border border-gray-200 hover:border-[#fe8204] hover:text-[#fe8204] transition-colors"><ChevronLeft size={20} /></button>
//               <button onClick={() => scrollCarousel('right')} className="p-3 rounded-full border border-gray-200 hover:border-[#fe8204] hover:text-[#fe8204] transition-colors"><ChevronRight size={20} /></button>
//             </div>
//           </div>

//           <div 
//             ref={carouselRef}
//             className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
//             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//           >
//             {STYLE_SHOWCASE.map((style, i) => (
//               <motion.div 
//                 key={style.name}
//                 initial={{ opacity: 0, x: 50 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true, margin: "-100px" }}
//                 transition={{ duration: 0.5, delay: i * 0.05 }}
//                 className="flex flex-col items-center gap-4 flex-shrink-0 snap-center cursor-pointer group"
//               >
//                 <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#fe8204] transition-all duration-300 p-1">
//                   <div className="w-full h-full rounded-full overflow-hidden">
//                     <img src={style.image} alt={style.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
//                   </div>
//                 </div>
//                 <span className="font-medium text-sm md:text-base tracking-wide group-hover:text-[#fe8204] transition-colors text-center w-full max-w-[120px] leading-tight">
//                   {style.name}
//                 </span>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 3. SHOP BY PLACEMENT (Card Deck Showcase) */}
//       <section className="py-20 bg-[#fafafa]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl font-bold font-['Almarena',sans-serif] uppercase tracking-wide">Perfect Placement</h2>
//             <p className="text-gray-500 mt-2">Designs curated for specific contours of your body.</p>
//           </div>

//           <motion.div 
//             variants={staggerContainer}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, margin: "-100px" }}
//             className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
//           >
//             {BODY_PART_SHOWCASE.slice(0, 8).map((part) => (
//               <motion.div 
//                 key={part.name}
//                 variants={fadeUpItem}
//                 className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer bg-gray-200"
//               >
//                 <img src={part.image} alt={part.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
//                   <h3 className="text-white font-['Almarena',sans-serif] text-xl font-bold uppercase tracking-wider mb-2">{part.name}</h3>
//                   <span className="text-[#fe8204] text-sm font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
//                     Explore <ChevronRight size={16} />
//                   </span>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* 4. ALL PRODUCTS GRID WITH FILTERS */}
//       <section className="py-20 bg-white border-t border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
//           <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <h2 className="text-3xl font-bold font-['Almarena',sans-serif] uppercase tracking-wide">All Designs</h2>
            
//             {/* Mobile Filter Button */}
//             <button 
//               onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
//               className="lg:hidden w-full md:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded uppercase font-bold text-sm tracking-wider"
//             >
//               <Filter size={18} /> Filters & Sort
//             </button>
//           </div>

//           <div className="flex flex-col lg:flex-row gap-12">
            
//             {/* Sidebar / Filters */}
//             <div className={`lg:w-1/4 flex-shrink-0 ${mobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
//               <div className="sticky top-8 space-y-10">
//                 {Object.entries(COLLECTION_DATA).map(([category, items]) => (
//                   <div key={category} className="border-b border-gray-100 pb-8 last:border-0">
//                     <h3 className="text-sm font-bold tracking-widest uppercase text-gray-900 mb-5 font-['Almarena',sans-serif]">
//                       {category}
//                     </h3>
//                     <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
//                       {items.map((item) => {
//                         const isChecked = activeFilters[category]?.includes(item);
//                         return (
//                           <div key={item} className="flex items-center group cursor-pointer" onClick={() => handleFilterToggle(category, item)}>
//                             <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 ${isChecked ? 'bg-[#fe8204] border-[#fe8204]' : 'border-gray-300 group-hover:border-[#fe8204]'}`}>
//                               {isChecked && (
//                                 <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                                 </motion.svg>
//                               )}
//                             </div>
//                             <span className={`ml-3 text-sm transition-colors ${isChecked ? 'text-gray-900 font-semibold' : 'text-gray-600 group-hover:text-gray-900'}`}>
//                               {item}
//                             </span>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Product Grid Area */}
//             <div className="lg:w-3/4">
//               {/* Desktop Header controls */}
//               <div className="hidden lg:flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
//                 <span className="text-sm text-gray-500 font-medium">Showing {DUMMY_PRODUCTS.length} curated designs</span>
//                 <div className="flex items-center gap-3 text-sm">
//                   <span className="text-gray-500">Sort by:</span>
//                   <select className="bg-transparent border-none font-semibold text-gray-900 focus:ring-0 cursor-pointer outline-none">
//                     <option>Recommended</option>
//                     <option>Newest Arrivals</option>
//                     <option>Price: Low to High</option>
//                     <option>Price: High to Low</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Grid */}
//               <motion.div 
//                 layout
//                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
//               >
//                 <AnimatePresence>
//                   {DUMMY_PRODUCTS.map((product, index) => (
//                     <motion.div
//                       key={product.id}
//                       layout
//                       initial={{ opacity: 0, scale: 0.95 }}
//                       whileInView={{ opacity: 1, scale: 1 }}
//                       viewport={{ once: true }}
//                       transition={{ duration: 0.4, delay: (index % 6) * 0.1 }}
//                       className="group flex flex-col cursor-pointer"
//                     >
//                       {/* Image Container */}
//                       <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100 rounded-xl mb-5">
//                         <img
//                           src={product.image}
//                           alt={product.name}
//                           className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
//                         />
                        
//                         {/* Badges */}
//                         {product.isNew && (
//                           <div className="absolute top-4 left-4 bg-[#fe8204] text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-widest uppercase font-['Almarena',sans-serif] shadow-lg">
//                             New
//                           </div>
//                         )}

//                         {/* Hover Overlay Actions */}
//                         <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                           <button className="w-full bg-white/95 backdrop-blur-sm text-gray-900 py-3.5 rounded-lg font-bold text-sm hover:bg-[#fe8204] hover:text-white transition-colors flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 duration-300 ease-out shadow-lg">
//                             <ShoppingBag size={18} /> Quick Add
//                           </button>
//                         </div>
                        
//                         <button className="absolute top-4 right-4 bg-white/80 backdrop-blur p-2 rounded-full text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 duration-300 shadow-sm">
//                           <Heart size={18} fill="currentColor" className="fill-transparent hover:fill-current" />
//                         </button>
//                       </div>

//                       {/* Product Details */}
//                       <div className="flex flex-col flex-1 px-1">
//                         <div className="flex justify-between items-start mb-1">
//                           <span className="text-[11px] text-gray-500 tracking-wider uppercase font-semibold">{product.category}</span>
//                           <span className="text-[11px] text-[#fe8204] tracking-wider uppercase font-semibold">{product.bodyPart}</span>
//                         </div>
//                         <h3 className="text-base font-bold text-gray-900 group-hover:text-[#fe8204] transition-colors leading-tight mb-2 font-['Almarena',sans-serif]">
//                           {product.name}
//                         </h3>
//                         <div className="mt-auto">
//                           <p className="text-sm font-semibold text-gray-600">${product.price.toFixed(2)}</p>
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </motion.div>
              
//               {/* Load More */}
//               <div className="mt-20 flex justify-center">
//                 <button className="group flex items-center justify-center gap-3 border-2 border-gray-900 text-gray-900 px-10 py-4 font-bold text-sm tracking-widest uppercase hover:bg-gray-900 hover:text-white transition-all duration-300 rounded-full">
//                   Load More Designs
//                   <div className="w-2 h-2 rounded-full bg-[#fe8204] group-hover:scale-150 transition-transform"></div>
//                 </button>
//               </div>

//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// "use client";
// import React, { useState, useMemo } from 'react';
// import { motion } from 'framer-motion';
// import { Filter, ArrowRight } from 'lucide-react';
// // import FilterSidebar from '@/components/FilterSidebar'; // Adjust paths as needed
// // import ProductLayout from '@/components/ProductLayout';
// import FilterSidebar from '@/src/components/shared/FilterSidebar';
// import ProductLayout from '@/src/components/shared/ProductLayout';
// // --- Data Models (Expanded for Logic) ---
// const CATEGORIES = ["All", "Abstract", "Floral", "Geometric", "Traditional"];
// const BODY_PARTS = ["All", "Arm", "Back", "Leg", "Chest"];

// const DUMMY_PRODUCTS = Array.from({ length: 45 }).map((_, i) => ({
//   id: `prod-${i}`,
//   name: `Curated Ink ${i + 1}`,
//   price: 25.00 + (i * 2),
//   category: CATEGORIES[(i % (CATEGORIES.length - 1)) + 1],
//   bodyPart: BODY_PARTS[(i % (BODY_PARTS.length - 1)) + 1],
//   image: `https://images.unsplash.com/photo-1598371839696-5e5bb00d0d10?auto=format&fit=crop&q=80&w=600&h=800`,
//   isNew: i < 5,
// }));

// export default function CollectionsPage() {
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
//   const [activeMasterCategory, setActiveMasterCategory] = useState<string>("All");
  
//   const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
//     "BODY PART": [],
//     "STYLES": [],
//   });

//   // Requirement 5: Dynamic Filter Logic based on Master Category
//   const currentFilterData = useMemo(() => {
//     if (activeMasterCategory === "All") {
//       return { "STYLES": CATEGORIES.slice(1), "BODY PART": BODY_PARTS.slice(1) };
//     }
//     // If a specific style is selected, only show body part filters relevant to that style
//     if (CATEGORIES.includes(activeMasterCategory)) {
//        return { "BODY PART": BODY_PARTS.slice(1) };
//     }
//     return { "STYLES": CATEGORIES.slice(1) };
//   }, [activeMasterCategory]);

//   const handleFilterToggle = (category: string, item: string) => {
//     setActiveFilters(prev => {
//       const current = prev[category] || [];
//       return {
//         ...prev,
//         [category]: current.includes(item) ? current.filter(i => i !== item) : [...current, item]
//       };
//     });
//   };

//   // Filter Products based on Master Category AND Sidebar Filters
//   const filteredProducts = useMemo(() => {
//     return DUMMY_PRODUCTS.filter(product => {
//       // 1. Master Category Check
//       const matchesMaster = activeMasterCategory === "All" || 
//                             product.category === activeMasterCategory || 
//                             product.bodyPart === activeMasterCategory;
//       if (!matchesMaster) return false;

//       // 2. Sidebar Filters Check
//       const matchesStyle = activeFilters["STYLES"]?.length === 0 || activeFilters["STYLES"]?.includes(product.category);
//       const matchesPart = activeFilters["BODY PART"]?.length === 0 || activeFilters["BODY PART"]?.includes(product.bodyPart);

//       return matchesStyle && matchesPart;
//     });
//   }, [activeMasterCategory, activeFilters]);

//   // Handler for Top Section Clicks
//   const selectCategoryAndScroll = (category: string) => {
//     setActiveMasterCategory(category);
//     setActiveFilters({ "BODY PART": [], "STYLES": [] }); // Reset sub-filters
//     document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <div className="min-h-screen bg-white font-['Montserrat',sans-serif] text-gray-900">
      
//       {/* 1. Replace the below with a banner and 3d text on it as Collections  */}
//       {/* <section className="pt-32 pb-20 px-4 md:px-8 border-b border-gray-900">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
//             Permanent<br/> <span className="text-gray-400">Expression.</span>
//           </h1>
//           <p className="text-xl max-w-xl font-medium">Discover hyper-curated flash art. Select a discipline below to filter our collection instantly.</p>
//         </div>
//       </section> */}

// {   /**. replace this whole both styles with a layout similar to attached in the attaches a card with different width and size side by side */}
//       {/* 2. INNOVATIVE STYLES - Interactive Typography List instead of circles */}
//       {/* <section className="py-20 border-b border-gray-200 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 md:px-8">
//           <div className="flex flex-col md:flex-row gap-12 items-start">
//             <div className="md:w-1/3">
//               <h2 className="text-3xl font-black uppercase tracking-tight mb-4">Disciplines</h2>
//               <p className="text-gray-500">Hover and click to filter the main collection by artistic style.</p>
//             </div>
//             <div className="md:w-2/3 flex flex-col w-full">
//               {CATEGORIES.slice(1).map((style) => (
//                 <div 
//                   key={style}
//                   onClick={() => selectCategoryAndScroll(style)}
//                   className="group flex items-center justify-between py-6 border-b border-gray-300 cursor-pointer hover:border-black transition-colors"
//                 >
//                   <span className="text-4xl md:text-5xl font-bold text-gray-300 group-hover:text-black transition-colors uppercase tracking-tighter">
//                     {style}
//                   </span>
//                   <ArrowRight className="opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300" size={32} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section> */}

//       {/* 3. INNOVATIVE PLACEMENT - Bento Grid instead of standard cards */}
//       {/* <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4 md:px-8">
//           <h2 className="text-3xl font-black uppercase tracking-tight mb-10 text-center">Curated for Placement</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
            
//             <div 
//               onClick={() => selectCategoryAndScroll("Arm")}
//               className="md:col-span-2 md:row-span-2 relative bg-gray-200 group cursor-pointer overflow-hidden h-[400px] md:h-auto"
//             >
//               <img src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Arm" />
//               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
//               <div className="absolute bottom-6 left-6 text-white">
//                 <span className="text-sm tracking-widest uppercase mb-1 block">Placement</span>
//                 <h3 className="text-4xl font-black uppercase">Sleeves & Arms</h3>
//               </div>
//             </div>

        
//             <div onClick={() => selectCategoryAndScroll("Back")} className="md:col-span-2 relative bg-gray-800 group cursor-pointer overflow-hidden h-[300px] md:h-auto">
//                <div className="absolute inset-0 flex items-center justify-center p-8 text-center z-10">
//                  <h3 className="text-3xl font-black text-white uppercase group-hover:scale-110 transition-transform">Back Pieces</h3>
//                </div>
//                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent opacity-80 z-0"></div>
//             </div>

//             <div onClick={() => selectCategoryAndScroll("Chest")} className="relative bg-gray-100 group cursor-pointer overflow-hidden h-[200px] md:h-auto flex items-end p-6">
//                 <h3 className="text-2xl font-black uppercase z-10 group-hover:-translate-y-2 transition-transform">Chest</h3>
//             </div>
            
//             <div onClick={() => selectCategoryAndScroll("Leg")} className="relative bg-black group cursor-pointer overflow-hidden h-[200px] md:h-auto flex items-end p-6 text-white">
//                 <h3 className="text-2xl font-black uppercase z-10 group-hover:-translate-y-2 transition-transform">Legs</h3>
//             </div>
//           </div>
//         </div>
//       </section> */}
//     {/** initially this section appears , When ever the above parent categores or sub categories are selected,  add it should navigate to next page and it should show like this shop -> Ankle & wrist again when shop clicked it should come page think of all such scenerios and give me the full udpated code */}
//       {/* 4. MAIN PRODUCT SECTION  */}
//       <section id="product-section" className="py-20 bg-white border-t border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 md:px-8">
          
//           <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black pb-6">
//             <div>
//               <h2 className="text-4xl font-black uppercase tracking-tight">
//                 {activeMasterCategory === "All" ? "The Archive" : `${activeMasterCategory} Collection`}
//               </h2>
//               {activeMasterCategory !== "All" && (
//                 <button onClick={() => setActiveMasterCategory("All")} className="text-sm text-gray-500 mt-2 underline hover:text-black">
//                   Clear Selection & View All
//                 </button>
//               )}
//             </div>
            
//             <button 
//               onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
//               className="lg:hidden flex items-center justify-center gap-2 border border-black px-6 py-3 uppercase font-bold text-sm tracking-wider w-full md:w-auto"
//             >
//               <Filter size={18} /> Filters
//             </button>
//           </div>

//           <div className="flex flex-col lg:flex-row gap-12">
//             <FilterSidebar 
//               filterData={currentFilterData} 
//               activeFilters={activeFilters} 
//               onFilterToggle={handleFilterToggle} 
//               isOpen={mobileFiltersOpen} 
//             />
            
//             <div className="lg:w-3/4">
//               {filteredProducts.length > 0 ? (
//                 <ProductLayout products={filteredProducts} />
//               ) : (
//                 <div className="text-center py-20 text-gray-500 font-medium">No designs found matching your criteria.</div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// // "use client";
// // import React from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';

// // type FilterSidebarProps = {
// //   filterData: Record<string, string[]>;
// //   activeFilters: Record<string, string[]>;
// //   onFilterToggle: (category: string, item: string) => void;
// //   isOpen: boolean;
// // };

// // export default function FilterSidebar({ filterData, activeFilters, onFilterToggle, isOpen }: FilterSidebarProps) {
// //   return (
// //     <div className={`lg:w-1/4 flex-shrink-0 ${isOpen ? 'block' : 'hidden lg:block'}`}>
// //       <div className="sticky top-8 space-y-10">
// //         <AnimatePresence>
// //           {Object.entries(filterData).map(([category, items]) => (
// //             <motion.div 
// //               key={category} 
// //               initial={{ opacity: 0, y: 10 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               className="border-b border-gray-200 pb-8 last:border-0"
// //             >
// //               <h3 className="text-sm font-bold tracking-widest uppercase text-gray-900 mb-5 font-['Almarena',sans-serif]">
// //                 {category}
// //               </h3>
// //               <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
// //                 {items.map((item) => {
// //                   const isChecked = activeFilters[category]?.includes(item);
// //                   return (
// //                     <div key={item} className="flex items-center group cursor-pointer" onClick={() => onFilterToggle(category, item)}>
// //                       <div className={`w-5 h-5 flex items-center justify-center transition-all duration-200 ${isChecked ? 'bg-black border-black' : 'border border-gray-300 group-hover:border-black'}`}>
// //                         {isChecked && (
// //                           <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
// //                           </motion.svg>
// //                         )}
// //                       </div>
// //                       <span className={`ml-3 text-sm transition-colors ${isChecked ? 'text-black font-semibold' : 'text-gray-600 group-hover:text-black'}`}>
// //                         {item}
// //                       </span>
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             </motion.div>
// //           ))}
// //         </AnimatePresence>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// type FilterSidebarProps = {
//   filterData: Record<string, string[]>;
//   activeFilters: Record<string, string[]>;
//   onFilterToggle: (category: string, item: string) => void;
//   isOpen: boolean;
//   onClose: () => void; // Added: Required to close the drawer on mobile
// };

// export default function FilterSidebar({ 
//   filterData, 
//   activeFilters, 
//   onFilterToggle, 
//   isOpen, 
//   onClose 
// }: FilterSidebarProps) {

//   // Prevent background scrolling when mobile drawer is open
//   useEffect(() => {
//     if (isOpen && window.innerWidth < 1024) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => { document.body.style.overflow = 'unset'; };
//   }, [isOpen]);

//   return (
//     <>
//       {/* Mobile Backdrop Overlay */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
//             aria-hidden="true"
//           />
//         )}
//       </AnimatePresence>

//       {/* Sidebar / Drawer Container */}
//       <div
//         className={`
//           fixed inset-y-0 left-0 z-50 w-[85vw] max-w-[320px] bg-white shadow-2xl 
//           transition-transform duration-300 ease-in-out flex flex-col
//           lg:static lg:z-auto lg:w-1/4 lg:max-w-none lg:translate-x-0 lg:bg-transparent lg:shadow-none lg:flex-shrink-0
//           ${isOpen ? 'translate-x-0' : '-translate-x-full'}
//         `}
//       >
//         {/* Mobile Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 lg:hidden">
//           <h2 className="text-lg font-bold text-gray-900 font-['Almarena',sans-serif]">Filters</h2>
//           <button 
//             onClick={onClose}
//             className="p-2 -mr-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
//           >
//             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         {/* Scrollable Filter Content */}
//         <div className="flex-1 overflow-y-auto lg:sticky lg:top-8 p-6 lg:p-0 custom-scrollbar">
//           <div className="space-y-8">
//             <AnimatePresence>
//               {Object.entries(filterData).map(([category, items]) => (
//                 <motion.div 
//                   key={category} 
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="pb-8 border-b border-gray-100 last:border-0 last:pb-0"
//                 >
//                   <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900 mb-4 font-['Almarena',sans-serif]">
//                     {category}
//                   </h3>
                  
//                   <div className="flex flex-col space-y-3">
//                     {items.map((item) => {
//                       const isChecked = activeFilters[category]?.includes(item);
//                       return (
//                         <label 
//                           key={item} 
//                           className="flex items-start group cursor-pointer"
//                         >
//                           {/* Hidden native checkbox for accessibility */}
//                           <input 
//                             type="checkbox" 
//                             className="sr-only"
//                             checked={isChecked || false}
//                             onChange={() => onFilterToggle(category, item)}
//                           />
                          
//                           {/* Custom Checkbox UI */}
//                           <div 
//                             className={`
//                               relative mt-0.5 flex w-5 h-5 flex-shrink-0 items-center justify-center rounded-[4px] border transition-all duration-200
//                               ${isChecked 
//                                 ? 'bg-black border-black shadow-sm' 
//                                 : 'bg-white border-gray-300 group-hover:border-black shadow-sm'
//                               }
//                             `}
//                           >
//                             <AnimatePresence>
//                               {isChecked && (
//                                 <motion.svg 
//                                   initial={{ scale: 0, opacity: 0 }} 
//                                   animate={{ scale: 1, opacity: 1 }}
//                                   exit={{ scale: 0, opacity: 0 }}
//                                   transition={{ duration: 0.15 }}
//                                   className="w-3.5 h-3.5 text-white" 
//                                   fill="none" 
//                                   viewBox="0 0 24 24" 
//                                   stroke="currentColor"
//                                 >
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                                 </motion.svg>
//                               )}
//                             </AnimatePresence>
//                           </div>
                          
//                           {/* Label Text */}
//                           <span 
//                             className={`
//                               ml-3 text-sm leading-6 transition-colors duration-200 select-none
//                               ${isChecked ? 'text-black font-semibold' : 'text-gray-600 group-hover:text-black'}
//                             `}
//                           >
//                             {item}
//                           </span>
//                         </label>
//                       );
//                     })}
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         </div>

//         {/* Mobile Footer / Apply Button */}
//         <div className="p-4 border-t border-gray-100 lg:hidden bg-gray-50">
//           <button 
//             onClick={onClose}
//             className="w-full py-3 px-4 bg-black text-white text-sm font-bold rounded-lg shadow-md hover:bg-gray-800 transition-colors"
//           >
//             Show Results
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }



// // // import React from 'react';

// // // // 1. Define the shape of your card data
// // // interface CardData {
// // //   label: string;
// // //   tag: string;
// // //   img?: string;     // Optional, since solid cards don't have images
// // //   solid?: boolean;  // Optional flag for solid color cards
// // // }

// // // // 2. Define the shape of your component props
// // // interface TattooMarqueeProps {
// // //   handleCategorySelect?: (category: string) => void;
// // // }

// // // // 3. Define the shape of your layout columns
// // // interface MarqueeColumn {
// // //   type: 'tall' | 'stacked';
// // //   item?: CardData;
// // //   items?: CardData[];
// // // }

// // // const TattooMarquee: React.FC<TattooMarqueeProps> = ({ handleCategorySelect = () => {} }) => {
// // //   // Apply the MarqueeColumn[] type here
// // //   const marqueeColumns: MarqueeColumn[] = [
// // //     { type: 'tall', item: { label: 'Japanese Art', tag: 'Styles', img: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&q=80' } },
// // //     { type: 'stacked', items: [
// // //       { label: 'Sleeve', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80' },
// // //       { label: 'Small', tag: 'Sizes', solid: true }
// // //     ]},
// // //     { type: 'tall', item: { label: 'Floral', tag: 'Styles', img: 'https://images.unsplash.com/photo-1605805561339-b9d9c22851ee?auto=format&fit=crop&q=80' } },
// // //     { type: 'stacked', items: [
// // //       { label: 'Back, Torso & Chest', tag: 'Body Part', solid: true },
// // //       { label: 'Celestial Art', tag: 'Styles', img: 'https://images.unsplash.com/photo-1590246814883-578ea4370fa6?auto=format&fit=crop&q=80' }
// // //     ]},
// // //     { type: 'tall', item: { label: 'Large', tag: 'Sizes', solid: true } },
// // //     { type: 'stacked', items: [
// // //       { label: 'Spine', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1598371839696-5e5bb00d0d10?auto=format&fit=crop&q=80' },
// // //       { label: 'Tribal Art', tag: 'Styles', solid: true }
// // //     ]},
// // //     { type: 'tall', item: { label: 'Animal', tag: 'Styles', img: 'https://images.unsplash.com/photo-1578307886475-7071db10ccfb?auto=format&fit=crop&q=80' } },
// // //     { type: 'stacked', items: [
// // //       { label: 'Hand', tag: 'Body Part', solid: true },
// // //       { label: 'Couple Art', tag: 'Styles', img: 'https://images.unsplash.com/photo-1531256379416-9f000e90aaca?auto=format&fit=crop&q=80' }
// // //     ]},
// // //     { type: 'tall', item: { label: 'Medium', tag: 'Sizes', solid: true } },
// // //     { type: 'stacked', items: [
// // //       { label: 'Leg & Arm Pieces', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1621360841013-c76831f1fc9c?auto=format&fit=crop&q=80' },
// // //       { label: 'Colored Art', tag: 'Styles', solid: true }
// // //     ]},
// // //     { type: 'tall', item: { label: 'Spiritual', tag: 'Styles', img: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&q=80' } },
// // //     { type: 'stacked', items: [
// // //       { label: 'Ankle & Wrist', tag: 'Body Part', solid: true },
// // //       { label: 'Nature', tag: 'Styles', img: 'https://images.unsplash.com/photo-1605805561339-b9d9c22851ee?auto=format&fit=crop&q=80' }
// // //     ]},
// // //     { type: 'tall', item: { label: 'Fantasy', tag: 'Styles', solid: true } },
// // //     { type: 'stacked', items: [
// // //       { label: 'Foot', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1590246814883-578ea4370fa6?auto=format&fit=crop&q=80' },
// // //       { label: 'Insects', tag: 'Styles', solid: true }
// // //     ]},
// // //     { type: 'tall', item: { label: 'Symbols & Quotes', tag: 'Styles', img: 'https://images.unsplash.com/photo-1598371839696-5e5bb00d0d10?auto=format&fit=crop&q=80' } }
// // //   ];

// // //   // 4. Apply the CardData and boolean types to your helper function parameters
// // //   const renderCard = (data: CardData, isStacked: boolean = false) => {
// // //     const baseClasses = "relative group cursor-pointer overflow-hidden border border-[#4a3b32] rounded-2xl flex-1 transition-all duration-300";
    
// // //     if (data.solid) {
// // //       return (
// // //         <div 
// // //           onClick={() => handleCategorySelect(data.label)}
// // //           className={`${baseClasses} bg-[#1a1411] p-6 flex flex-col justify-end hover:bg-[#221a16]`}
// // //         >
// // //           <div>
// // //             <p className="text-[#a89f91] text-[10px] font-bold tracking-widest uppercase mb-1">{data.tag}</p>
// // //             <h3 className="text-xl md:text-2xl font-black uppercase text-white mb-3">{data.label}</h3>
// // //             <button className="bg-transparent border border-white text-white text-[10px] font-bold uppercase px-4 py-2 hover:bg-white hover:text-black transition-colors">
// // //               Explore
// // //             </button>
// // //           </div>
// // //         </div>
// // //       );
// // //     }

// // //     return (
// // //       <div 
// // //         onClick={() => handleCategorySelect(data.label)}
// // //         className={`${baseClasses} ${!isStacked ? 'w-[350px] h-[524px]' : ''}`}
// // //       >
// // //         {/* We use data.img as the source. TypeScript knows it might be undefined, but we know our non-solid cards have it */}
// // //         <img 
// // //           src={data.img} 
// // //           alt={data.label} 
// // //           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0" 
// // //         />
// // //         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-black/70 transition-colors" />
// // //         <div className="absolute bottom-6 left-6 right-6">
// // //           <p className="text-[#a89f91] text-[10px] font-bold tracking-widest uppercase mb-1">{data.tag}</p>
// // //           <h3 className="text-xl md:text-2xl font-black uppercase text-white mb-3 leading-none">{data.label}</h3>
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <section className="py-20 bg-[#2b211d] text-gray-100 overflow-hidden relative">
// // //       <style dangerouslySetInnerHTML={{__html: `
// // //         @keyframes scroll {
// // //           0% { transform: translateX(0); }
// // //           100% { transform: translateX(-50%); }
// // //         }
// // //         .animate-scroll {
// // //           display: flex;
// // //           width: max-content;
// // //           animation: scroll 80s linear infinite; 
// // //         }
// // //         .animate-scroll:hover {
// // //           animation-play-state: paused;
// // //         }
// // //       `}} />

// // //       <div className="animate-scroll gap-6">
// // //         {[1, 2].map((iteration) => (
// // //           <div key={iteration} className="flex gap-6 pr-6 items-center">
// // //             {marqueeColumns.map((col, idx) => (
// // //               <React.Fragment key={idx}>
// // //                 {col.type === 'tall' && col.item ? (
// // //                   <div className="flex-shrink-0">
// // //                     {renderCard(col.item)}
// // //                   </div>
// // //                 ) : col.items ? (
// // //                   <div className="w-[350px] h-[524px] flex-shrink-0 flex flex-col gap-6">
// // //                     {renderCard(col.items[0], true)}
// // //                     {renderCard(col.items[1], true)}
// // //                   </div>
// // //                 ) : null}
// // //               </React.Fragment>
// // //             ))}
// // //           </div>
// // //         ))}
// // //       </div>
      
// // //       <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#2b211d] to-transparent pointer-events-none z-10" />
// // //       <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#2b211d] to-transparent pointer-events-none z-10" />
// // //     </section>
// // //   );
// // // };

// // // export default TattooMarquee;

// // import React from 'react';

// // interface CardData {
// //   label: string;
// //   tag: string;
// //   img?: string;     
// //   solid?: boolean;  
// // }

// // interface TattooMarqueeProps {
// //   handleCategorySelect?: (category: string) => void;
// // }

// // interface MarqueeColumn {
// //   type: 'tall' | 'stacked';
// //   item?: CardData;
// //   items?: CardData[];
// // }

// // const TattooMarquee: React.FC<TattooMarqueeProps> = ({ handleCategorySelect = () => {} }) => {
// //   const marqueeColumns: MarqueeColumn[] = [
// //     { type: 'tall', item: { label: 'Japanese Art', tag: 'Styles', img: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&q=80' } },
// //     { type: 'stacked', items: [
// //       { label: 'Sleeve', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80' },
// //       { label: 'Small', tag: 'Sizes', solid: true }
// //     ]},
// //     { type: 'tall', item: { label: 'Floral', tag: 'Styles', img: 'https://images.unsplash.com/photo-1605805561339-b9d9c22851ee?auto=format&fit=crop&q=80' } },
// //     { type: 'stacked', items: [
// //       { label: 'Back', tag: 'Body Part', solid: true },
// //       { label: 'Abstract', tag: 'Styles', img: 'https://images.unsplash.com/photo-1590246814883-578ea4370fa6?auto=format&fit=crop&q=80' }
// //     ]},
// //     { type: 'tall', item: { label: 'Large', tag: 'Sizes', solid: true } },
// //     { type: 'stacked', items: [
// //       { label: 'Spine', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1598371839696-5e5bb00d0d10?auto=format&fit=crop&q=80' },
// //       { label: 'Tribal Art', tag: 'Styles', solid: true }
// //     ]},
// //     { type: 'tall', item: { label: 'Animal', tag: 'Styles', img: 'https://images.unsplash.com/photo-1578307886475-7071db10ccfb?auto=format&fit=crop&q=80' } },
// //     { type: 'stacked', items: [
// //       { label: 'Hand', tag: 'Body Part', solid: true },
// //       { label: 'Geometric', tag: 'Styles', img: 'https://images.unsplash.com/photo-1531256379416-9f000e90aaca?auto=format&fit=crop&q=80' }
// //     ]},
// //     { type: 'tall', item: { label: 'Medium', tag: 'Sizes', solid: true } },
// //     { type: 'stacked', items: [
// //       { label: 'Leg', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1621360841013-c76831f1fc9c?auto=format&fit=crop&q=80' },
// //       { label: 'Traditional', tag: 'Styles', solid: true }
// //     ]},
// //   ];

// //   const renderCard = (data: CardData, isStacked: boolean = false) => {
// //     // SCALED DOWN: Width reduced to 260px, Heights adjusted to 380px for a more refined look
// //     const baseClasses = "relative group cursor-pointer overflow-hidden border border-[#4a3b32] rounded-xl flex-1 transition-all duration-300";
    
// //     if (data.solid) {
// //       return (
// //         <div 
// //           onClick={() => handleCategorySelect(data.label)}
// //           className={`${baseClasses} bg-[#1a1411] p-5 flex flex-col justify-end hover:bg-[#221a16]`}
// //         >
// //           <div>
// //             <p className="text-[#a89f91] text-[9px] font-bold tracking-widest uppercase mb-1">{data.tag}</p>
// //             <h3 className="text-lg md:text-xl font-black uppercase text-white mb-2">{data.label}</h3>
// //           </div>
// //         </div>
// //       );
// //     }

// //     return (
// //       <div 
// //         onClick={() => handleCategorySelect(data.label)}
// //         className={`${baseClasses} ${!isStacked ? 'w-[260px] h-[380px]' : ''}`}
// //       >
// //         <img 
// //           src={data.img} 
// //           alt={data.label} 
// //           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0" 
// //         />
// //         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-black/70 transition-colors" />
// //         <div className="absolute bottom-5 left-5 right-5">
// //           <p className="text-[#a89f91] text-[9px] font-bold tracking-widest uppercase mb-1">{data.tag}</p>
// //           <h3 className="text-lg md:text-xl font-black uppercase text-white leading-none">{data.label}</h3>
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <section className="py-12 bg-[#2b211d] text-gray-100 overflow-hidden relative border-b border-[#1a1411]">
// //       <style dangerouslySetInnerHTML={{__html: `
// //         @keyframes scroll {
// //           0% { transform: translateX(0); }
// //           100% { transform: translateX(-50%); }
// //         }
// //         .animate-scroll {
// //           display: flex;
// //           width: max-content;
// //           animation: scroll 60s linear infinite; 
// //         }
// //         .animate-scroll:hover {
// //           animation-play-state: paused;
// //         }
// //       `}} />

// //       <div className="animate-scroll gap-4">
// //         {[1, 2].map((iteration) => (
// //           <div key={iteration} className="flex gap-4 pr-4 items-center">
// //             {marqueeColumns.map((col, idx) => (
// //               <React.Fragment key={idx}>
// //                 {col.type === 'tall' && col.item ? (
// //                   <div className="flex-shrink-0">
// //                     {renderCard(col.item)}
// //                   </div>
// //                 ) : col.items ? (
// //                   <div className="w-[260px] h-[380px] flex-shrink-0 flex flex-col gap-4">
// //                     {renderCard(col.items[0], true)}
// //                     {renderCard(col.items[1], true)}
// //                   </div>
// //                 ) : null}
// //               </React.Fragment>
// //             ))}
// //           </div>
// //         ))}
// //       </div>
      
// //       <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#2b211d] to-transparent pointer-events-none z-10" />
// //       <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#2b211d] to-transparent pointer-events-none z-10" />
// //     </section>
// //   );
// // };

// // export default TattooMarquee;

// import React from 'react';

// interface CardData {
//   label: string;
//   tag: string;
//   img?: string;     
//   solid?: boolean;  
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
//   const marqueeColumns: MarqueeColumn[] = [
//     { type: 'tall', item: { label: 'Japanese Art', tag: 'Styles', img: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&q=80' } },
//     { type: 'stacked', items: [
//       { label: 'Sleeve', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80' },
//     //   { label: 'Small', tag: 'Sizes', solid: true }
//     ]},
//     { type: 'tall', item: { label: 'Floral', tag: 'Styles', img: 'https://images.unsplash.com/photo-1605805561339-b9d9c22851ee?auto=format&fit=crop&q=80' } },
//     { type: 'stacked', items: [
//       { label: 'Back', tag: 'Body Part', solid: true },
//       { label: 'Abstract', tag: 'Styles', img: 'https://images.unsplash.com/photo-1590246814883-578ea4370fa6?auto=format&fit=crop&q=80' }
//     ]},
//     // { type: 'tall', item: { label: 'Large', tag: 'Sizes', solid: true } },
//     { type: 'stacked', items: [
//       { label: 'Spine', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1598371839696-5e5bb00d0d10?auto=format&fit=crop&q=80' },
//       { label: 'Tribal Art', tag: 'Styles', solid: true }
//     ]},
//     { type: 'tall', item: { label: 'Animal', tag: 'Styles', img: 'https://images.unsplash.com/photo-1578307886475-7071db10ccfb?auto=format&fit=crop&q=80' } },
//     { type: 'stacked', items: [
//       { label: 'Hand', tag: 'Body Part', solid: true },
//       { label: 'Geometric', tag: 'Styles', img: 'https://images.unsplash.com/photo-1531256379416-9f000e90aaca?auto=format&fit=crop&q=80' }
//     ]},
//     // { type: 'tall', item: { label: 'Medium', tag: 'Sizes', solid: true } },
//     { type: 'stacked', items: [
//       { label: 'Leg', tag: 'Body Part', img: 'https://images.unsplash.com/photo-1621360841013-c76831f1fc9c?auto=format&fit=crop&q=80' },
//       { label: 'Traditional', tag: 'Styles', solid: true }
//     ]},
//   ];

//   const renderCard = (data: CardData, isStacked: boolean = false) => {
//     // Clean borders and gentle shadows for the light theme
//     const baseClasses = "relative group cursor-pointer overflow-hidden border border-gray-200 rounded-xl flex-1 transition-all duration-300 shadow-sm hover:shadow-md";
    
//     // if (data.solid) {
//     //   return (
//     //     <div 
//     //       onClick={() => handleCategorySelect(data.label)}
//     //       className={`${baseClasses} bg-gray-50 p-6 flex flex-col justify-end hover:bg-gray-100`}
//     //     >
//     //       <div>
//     //         <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase mb-2">{data.tag}</p>
//     //         <h3 className="text-xl font-black uppercase text-gray-900 mb-1">{data.label}</h3>
//     //       </div>
//     //     </div>
//     //   );
//     // }

//     return (
//       <div 
//         onClick={() => handleCategorySelect(data.label)}
//         className={`${baseClasses} ${!isStacked ? 'w-[260px] h-[380px]' : ''}`}
//       >
//         <img 
//           src={data.img} 
//           alt={data.label} 
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0" 
//         />
//         {/* Dark gradient on images so white text is still readable */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-colors" />
//         <div className="absolute bottom-6 left-6 right-6">
//           <p className="text-gray-300 text-[10px] font-bold tracking-widest uppercase mb-2">{data.tag}</p>
//           <h3 className="text-xl font-black uppercase text-white leading-none">{data.label}</h3>
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

//       <div className="animate-scroll gap-4">
//         {[1, 2].map((iteration) => (
//           <div key={iteration} className="flex gap-4 pr-4 items-center">
//             {marqueeColumns.map((col, idx) => (
//               <React.Fragment key={idx}>
//                 {col.type === 'tall' && col.item ? (
//                   <div className="flex-shrink-0">
//                     {renderCard(col.item)}
//                   </div>
//                 ) : col.items ? (
//                   <div className="w-[260px] h-[380px] flex-shrink-0 flex flex-col gap-4">
//                     {renderCard(col.items[0], true)}
//                     {renderCard(col.items[1], true)}
//                   </div>
//                 ) : null}
//               </React.Fragment>
//             ))}
//           </div>
//         ))}
//       </div>
      
//       {/* White gradients on the edges to blend the scrolling items into the background */}
//       <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
//       <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
//     </section>
//   );
// };

// export default TattooMarquee;

// // {/** initially all filter options are not shown and some bug some where all is going while changing to grid layout , even flter bar is so simple  */}

// // "use client";

// // import React, { useEffect, useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';

// // type FilterSidebarProps = {
// //   filterData: Record<string, string[]>;
// //   activeFilters: Record<string, string[]>;
// //   onFilterToggle: (category: string, item: string) => void;
// //   isOpen: boolean;
// //   onClose: () => void;
// // };

// // export default function FilterSidebar({ 
// //   filterData, 
// //   activeFilters, 
// //   onFilterToggle, 
// //   isOpen, 
// //   onClose 
// // }: FilterSidebarProps) {

// //   // --- Safe Close Logic ---
// //   const handleSafeClose = () => {
// //     if (typeof onClose === 'function') {
// //       onClose();
// //     } else {
// //       console.warn("FilterSidebar: onClose prop is missing!");
// //     }
// //   };

// //   // --- Swipe Detection Logic ---
// //   const [touchStartX, setTouchStartX] = useState<number | null>(null);
// //   const [touchEndX, setTouchEndX] = useState<number | null>(null);
// //   const minSwipeDistance = 50;

// //   const handleTouchStart = (e: React.TouchEvent) => {
// //     setTouchEndX(null);
// //     setTouchStartX(e.targetTouches[0].clientX);
// //   };

// //   const handleTouchMove = (e: React.TouchEvent) => {
// //     setTouchEndX(e.targetTouches[0].clientX);
// //   };

// //   const handleTouchEnd = () => {
// //     if (!touchStartX || !touchEndX) return;
// //     const distance = touchStartX - touchEndX;
// //     if (distance > minSwipeDistance) handleSafeClose(); // Left swipe closes drawer
// //   };

// //   useEffect(() => {
// //     if (isOpen && window.innerWidth < 1024) {
// //       document.body.style.overflow = 'hidden';
// //     } else {
// //       document.body.style.overflow = 'unset';
// //     }
// //     return () => { document.body.style.overflow = 'unset'; };
// //   }, [isOpen]);

// //   return (
// //     <>
// //       <AnimatePresence>
// //         {isOpen && (
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             onClick={handleSafeClose}
// //             className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm lg:hidden cursor-pointer"
// //             aria-hidden="true"
// //           />
// //         )}
// //       </AnimatePresence>

// //       <div
// //         onTouchStart={handleTouchStart}
// //         onTouchMove={handleTouchMove}
// //         onTouchEnd={handleTouchEnd}
// //         className={`
// //           fixed inset-y-0 left-0 z-[9999] w-[80vw] sm:w-[350px] bg-white shadow-2xl flex flex-col
// //           transition-transform duration-300 ease-in-out
// //           lg:static lg:z-auto lg:w-1/4 lg:translate-x-0 lg:flex-shrink-0
// //           lg:border lg:border-gray-200 lg:rounded-2xl lg:shadow-sm lg:bg-white
// //           ${isOpen ? 'translate-x-0' : '-translate-x-full'}
// //         `}
// //       >
// //         <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100 lg:hidden">
// //           <h2 className="text-xl font-black uppercase text-gray-900">Filters</h2>
// //           <button 
// //             onClick={handleSafeClose}
// //             className="p-2 text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full"
// //           >
// //             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //             </svg>
// //           </button>
// //         </div>

// //         <div className="hidden lg:block px-6 pt-6 pb-4 border-b border-gray-100">
// //            <h2 className="text-lg font-black uppercase tracking-tight text-gray-900">Filter Options</h2>
// //         </div>

// //         <div className="flex-1 overflow-y-auto p-5 lg:p-6 custom-scrollbar">
// //           <div className="space-y-8">
// //             <AnimatePresence>
// //               {Object.entries(filterData).map(([category, items]) => (
// //                 <motion.div key={category} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pb-8 border-b border-gray-100 last:border-0 last:pb-0">
// //                   <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">{category}</h3>
// //                   <div className="flex flex-col space-y-3">
// //                     {items.map((item) => {
// //                       const isChecked = activeFilters[category]?.includes(item);
// //                       return (
// //                         <label key={item} className="flex items-center group cursor-pointer">
// //                           <input 
// //                             type="checkbox" 
// //                             className="sr-only"
// //                             checked={isChecked || false}
// //                             onChange={() => onFilterToggle(category, item)}
// //                           />
// //                           <div className={`relative flex w-5 h-5 flex-shrink-0 items-center justify-center rounded-md border transition-all duration-200 ${isChecked ? 'bg-black border-black shadow-sm' : 'bg-white border-gray-300 group-hover:border-black'}`}>
// //                             <AnimatePresence>
// //                               {isChecked && (
// //                                 <motion.svg initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
// //                                 </motion.svg>
// //                               )}
// //                             </AnimatePresence>
// //                           </div>
// //                           <span className={`ml-3 text-sm transition-colors duration-200 ${isChecked ? 'text-black font-bold' : 'text-gray-600 group-hover:text-black'}`}>{item}</span>
// //                         </label>
// //                       );
// //                     })}
// //                   </div>
// //                 </motion.div>
// //               ))}
// //             </AnimatePresence>
// //           </div>
// //         </div>

// //         <div className="p-4 border-t border-gray-100 lg:hidden bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
// //           <button 
// //             onClick={handleSafeClose}
// //             className="w-full py-4 px-4 bg-black text-white text-sm font-bold uppercase tracking-wider rounded-xl shadow-md hover:bg-gray-800 transition-colors active:scale-95"
// //           >
// //             Show Results
// //           </button>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }


// "use client";
// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// type FilterState = {
//   "BODY PART": string[];
//   "STYLES": string[];
// };

// type FilterSidebarProps = {
//   filterData:Record<string, string[]>;
//   activeFilters: Record<string, string[]>;
//   onFilterToggle: (category: string, item: string) => void;
//   isOpen: boolean;
//   onClose: () => void;
// };

// export default function FilterSidebar({ filterData, activeFilters, onFilterToggle, isOpen, onClose }: FilterSidebarProps) {
//   const handleSafeClose = () => {
//     if (typeof onClose === 'function') onClose();
//   };

//   const [touchStartX, setTouchStartX] = useState<number | null>(null);
//   const [touchEndX, setTouchEndX] = useState<number | null>(null);

//   const handleTouchStart = (e: React.TouchEvent) => {
//     setTouchEndX(null);
//     setTouchStartX(e.targetTouches[0].clientX);
//   };

//   const handleTouchMove = (e: React.TouchEvent) => setTouchEndX(e.targetTouches[0].clientX);

//   const handleTouchEnd = () => {
//     if (!touchStartX || !touchEndX) return;
//     if (touchStartX - touchEndX > 50) handleSafeClose(); 
//   };

//   useEffect(() => {
//     if (isOpen && window.innerWidth < 1024) document.body.style.overflow = 'hidden';
//     else document.body.style.overflow = 'unset';
//     return () => { document.body.style.overflow = 'unset'; };
//   }, [isOpen]);

//   return (
//     <>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             onClick={handleSafeClose}
//             className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm lg:hidden cursor-pointer"
//           />
//         )}
//       </AnimatePresence>

//       <div
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//         className={`
//           fixed inset-y-0 left-0 z-[9999] w-[85vw] sm:w-[350px] bg-white flex flex-col
//           transition-transform duration-400 cubic-bezier(0.4, 0, 0.2, 1)
//           lg:static lg:z-auto lg:w-1/4 lg:translate-x-0 lg:flex-shrink-0
//           lg:bg-transparent
//           ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
//         `}
//       >
//         <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 lg:hidden">
//           <h2 className="text-xl font-black uppercase text-gray-900">Filters</h2>
//           <button onClick={handleSafeClose} className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors">
//             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         <div className="hidden lg:block pb-6 mb-2 border-b border-gray-100">
//            <h2 className="text-xl font-black uppercase tracking-tight text-gray-900">Filters</h2>
//         </div>

//         <div className="flex-1 overflow-y-auto p-6 lg:p-0 lg:mt-6">
//           <div className="space-y-8">
//             <AnimatePresence>
//               {Object.entries(filterData).map(([category, items]) => (
//                 <motion.div key={category} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-8 border-b border-gray-100 last:border-0 last:pb-0">
//                   <h3 className="text-sm font-black tracking-widest uppercase text-gray-900 mb-5">{category}</h3>
//                   <div className="flex flex-col space-y-3.5">
//                     {items.map((item) => {
//                       const isChecked = activeFilters[category]?.includes(item);
//                       return (
//                         <label key={item} className="flex items-center group cursor-pointer">
//                           <input type="checkbox" className="sr-only" checked={isChecked || false} onChange={() => onFilterToggle(category, item)} />
//                           <div className={`relative flex w-5 h-5 flex-shrink-0 items-center justify-center rounded-[6px] border transition-all duration-200 ${isChecked ? 'bg-[#0088FF] border-[#0088FF]' : 'bg-white border-gray-300 group-hover:border-[#0088FF]'}`}>
//                             <AnimatePresence>
//                               {isChecked && (
//                                 <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                                 </motion.svg>
//                               )}
//                             </AnimatePresence>
//                           </div>
//                           <span className={`ml-3 text-sm font-medium transition-colors duration-200 ${isChecked ? 'text-black' : 'text-gray-500 group-hover:text-black'}`}>{item}</span>
//                         </label>
//                       );
//                     })}
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         </div>

//         <div className="p-4 border-t border-gray-100 lg:hidden bg-white">
//           <button onClick={handleSafeClose} className="w-full py-4 px-4 bg-[#0088FF] text-white text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-[#0070E0] transition-colors">
//             View Results
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// // {/* Not at all good, no neat styling the image should fill up in grid layout and when hovered should scale up No proper card design followed, worst card desing  */}
// // "use client";
// // import React, { useState, useEffect } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Heart, LayoutGrid, List, ChevronLeft, ChevronRight, ShoppingCart, Zap } from 'lucide-react';

// // type Product = {
// //   id: string; name: string; price: number; category: string; bodyPart: string; image: string; isNew?: boolean;
// // };

// // export default function ProductLayout({ products }: { products: Product[] }) {
// //   const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [itemsPerPage, setItemsPerPage] = useState(12);

// //   useEffect(() => {
// //     const handleResize = () => setItemsPerPage(window.innerWidth < 1024 ? 8 : 12);
// //     handleResize(); 
// //     window.addEventListener('resize', handleResize);
// //     return () => window.removeEventListener('resize', handleResize);
// //   }, []);

// //   const totalPages = Math.ceil(products.length / itemsPerPage);
// //   const currentProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
// //   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

// //   return (
// //     <div className="w-full">
// //       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-4 border-b border-gray-200 gap-4">
// //         <span className="text-sm text-gray-500 font-medium">Showing <b className="text-black">{currentProducts.length}</b> of <b className="text-black">{products.length}</b></span>
        
// //         <div className="flex bg-gray-100 p-1 rounded-xl">
// //           <button onClick={() => setLayoutMode('grid')} className={`p-2.5 rounded-lg transition-all ${layoutMode === 'grid' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-black'}`}>
// //             <LayoutGrid size={18} />
// //           </button>
// //           <button onClick={() => setLayoutMode('list')} className={`p-2.5 rounded-lg transition-all ${layoutMode === 'list' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-black'}`}>
// //             <List size={18} />
// //           </button>
// //         </div>
// //       </div>

// //       <motion.div layout className={layoutMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8" : "flex flex-col gap-6"}>
// //         <AnimatePresence mode="popLayout">
// //           {currentProducts.map((product, index) => (
// //             <motion.div
// //               key={product.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3, delay: index * 0.05 }}
// //               className={`group bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-2xl hover:border-gray-200 transition-all duration-300 ${layoutMode === 'list' ? 'flex flex-col sm:flex-row gap-6 items-center' : 'flex flex-col'}`}
// //             >
// //               {/* Image Box */}
// //               <div className={`relative bg-gray-50 overflow-hidden rounded-xl ${layoutMode === 'list' ? 'w-full sm:w-56 h-64 sm:h-56 flex-shrink-0' : 'w-full aspect-[4/5] mb-5'}`}>
// //                 <img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
// //                 {product.isNew && (
// //                   <div className="absolute top-3 left-3 bg-black text-white text-[10px] px-2.5 py-1.5 rounded-full tracking-widest uppercase font-bold shadow-md">NEW</div>
// //                 )}
// //                 <button className="absolute top-3 right-3 bg-white/90 p-2.5 rounded-full text-gray-400 hover:text-red-500 hover:shadow-md transition-all">
// //                   <Heart size={16} className="hover:fill-current" />
// //                 </button>
// //               </div>

// //               {/* Details & Actions */}
// //               <div className={`flex flex-col flex-1 h-full justify-between w-full ${layoutMode === 'list' ? 'py-2' : ''}`}>
// //                 <div>
// //                   <div className="flex justify-between items-start mb-2">
// //                     <span className="text-[10px] text-gray-400 tracking-wider uppercase font-bold">{product.category}</span>
// //                     <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md tracking-wider uppercase">{product.bodyPart}</span>
// //                   </div>
// //                   <h3 className="text-lg font-black text-gray-900 leading-tight mb-2 uppercase">{product.name}</h3>
// //                   <p className="text-xl font-medium text-gray-700 mb-6">${product.price.toFixed(2)}</p>
// //                 </div>
                
// //                 {/* Modern App-like Buttons */}
// //                 <div className="flex gap-3 mt-auto w-full">
// //                   <button className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-900 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wide hover:border-black hover:bg-gray-50 transition-all active:scale-95">
// //                     <ShoppingCart size={16} /> <span className="hidden xs:inline">Cart</span>
// //                   </button>
// //                   <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wide shadow-md hover:bg-gray-800 hover:shadow-lg transition-all active:scale-95">
// //                      Buy Now
// //                   </button>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           ))}
// //         </AnimatePresence>
// //       </motion.div>

// //       {/* Modern Pagination Controls */}
// //       {totalPages > 1 && (
// //         <div className="mt-16 flex justify-center items-center gap-2">
// //           <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="p-3 rounded-xl border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors">
// //             <ChevronLeft size={18} />
// //           </button>
// //           {Array.from({ length: totalPages }).map((_, i) => (
// //             <button key={i} onClick={() => paginate(i + 1)} className={`w-11 h-11 rounded-xl text-sm font-bold transition-all ${currentPage === i + 1 ? 'bg-black text-white shadow-md' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
// //               {i + 1}
// //             </button>
// //           ))}
// //           <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="p-3 rounded-xl border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors">
// //             <ChevronRight size={18} />
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { LayoutGrid, List, ChevronLeft, ChevronRight, Plus, ArrowRight, Star } from 'lucide-react';

// type Product = {
//   id: string; name: string; price: number; category: string; bodyPart: string; image: string; isNew?: boolean;
// };

// export default function ProductLayout({ products }: { products: Product[] }) {
//   const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(12);

//   useEffect(() => {
//     const handleResize = () => setItemsPerPage(window.innerWidth < 1280 ? 8 : 12);
//     handleResize(); 
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const totalPages = Math.ceil(products.length / itemsPerPage);
//   const currentProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   return (
//     <div className="w-full">
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-gray-100 gap-4">
//         <span className="text-sm text-gray-500 font-medium">
//           Showing <b className="text-black">{currentProducts.length}</b> of <b className="text-black">{products.length}</b> products
//         </span>
        
//         <div className="flex bg-gray-50 p-1.5 rounded-xl border border-gray-100">
//           <button onClick={() => setLayoutMode('grid')} className={`p-2 rounded-lg transition-all ${layoutMode === 'grid' ? 'bg-white shadow-sm text-[#0088FF]' : 'text-gray-400 hover:text-gray-800'}`}>
//             <LayoutGrid size={18} />
//           </button>
//           <button onClick={() => setLayoutMode('list')} className={`p-2 rounded-lg transition-all ${layoutMode === 'list' ? 'bg-white shadow-sm text-[#0088FF]' : 'text-gray-400 hover:text-gray-800'}`}>
//             <List size={18} />
//           </button>
//         </div>
//       </div>

//       <motion.div layout className={layoutMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-6"}>
//         <AnimatePresence mode="popLayout">
//           {currentProducts.map((product, index) => (
//             <motion.div
//               key={product.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3, delay: index * 0.05 }}
//               className={`group bg-white border border-gray-100/80 rounded-[2rem] p-4 sm:p-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 ${layoutMode === 'list' ? 'flex flex-col sm:flex-row gap-8 items-center' : 'flex flex-col items-center text-center'}`}
//             >
//               {/* Image Container - Matched to Reference */}
//               <div className={`relative bg-[#F8F9FA] rounded-3xl overflow-hidden flex items-center justify-center ${layoutMode === 'list' ? 'w-full sm:w-64 h-64 shrink-0' : 'w-full aspect-square mb-6'}`}>
//                 {product.isNew && (
//                   <div className="absolute top-4 left-4 bg-[#0088FF] text-white text-[10px] px-3 py-1.5 rounded-full tracking-wider uppercase font-extrabold z-10">
//                     NEW FLAVORS
//                   </div>
//                 )}
//                 {/* Changed to object-contain to match the neat, product-focused look of the reference */}
//                 <img src={product.image} alt={product.name} className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-500 ease-out mix-blend-multiply" />
//               </div>

//               {/* Product Details */}
//               <div className={`flex flex-col flex-1 w-full ${layoutMode === 'list' ? 'items-start text-left' : 'items-center text-center'}`}>
//                 <span className="text-xs text-gray-400 font-bold tracking-[0.15em] uppercase mb-2">{product.category}</span>
//                 <h3 className="text-2xl font-black text-[#0088FF] uppercase leading-none mb-2">{product.name}</h3>
//                 <span className="text-[11px] font-bold text-gray-900 tracking-[0.1em] uppercase mb-4">{product.bodyPart} ELITE EDITION</span>
                
//                 {/* 5-Star Rating */}
//                 <div className="flex gap-1 mb-6 text-gray-500">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} size={14} className="fill-current" />
//                   ))}
//                 </div>

//                 <p className="text-[28px] font-black text-[#111827] mb-6">${product.price.toFixed(2)}</p>
                
//                 {/* Reference Buttons */}
//                 <div className="flex gap-3 w-full mt-auto">
//                   <button className="flex-1 flex items-center justify-center gap-2 bg-[#0088FF] text-white py-3.5 rounded-2xl text-sm font-bold uppercase tracking-wide hover:bg-[#0070E0] transition-colors active:scale-95">
//                     ADD <Plus size={16} strokeWidth={3} />
//                   </button>
//                   <button className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-100 text-gray-600 py-3.5 rounded-2xl text-sm font-bold uppercase tracking-wide hover:border-gray-300 hover:text-gray-900 transition-colors active:scale-95">
//                     DETAILS <ArrowRight size={16} strokeWidth={2.5} />
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </motion.div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="mt-16 flex justify-center items-center gap-2">
//           <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="p-3.5 rounded-2xl border border-gray-100 text-gray-400 disabled:opacity-50 hover:bg-gray-50 hover:text-black transition-colors">
//             <ChevronLeft size={20} />
//           </button>
//           {Array.from({ length: totalPages }).map((_, i) => (
//             <button key={i} onClick={() => paginate(i + 1)} className={`w-12 h-12 rounded-2xl text-sm font-black transition-all ${currentPage === i + 1 ? 'bg-[#0088FF] text-white' : 'border border-gray-100 text-gray-500 hover:bg-gray-50'}`}>
//               {i + 1}
//             </button>
//           ))}
//           <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="p-3.5 rounded-2xl border border-gray-100 text-gray-400 disabled:opacity-50 hover:bg-gray-50 hover:text-black transition-colors">
//             <ChevronRight size={20} />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// 'use client';

// import React, { useState, useMemo, useEffect } from 'react';
// import { useSearchParams, useRouter, usePathname } from 'next/navigation';
// import { SlidersHorizontal, LayoutGrid, List, X, ChevronLeft, ChevronRight, RefreshCcw } from 'lucide-react';
// import clsx from 'clsx';

// // Components (Assuming these are converted to TSX as well)
// // import { FilterSidebar } from '../components/FilterSidebar';
// // import { ProductCard } from '../components/ProductCard';
// import { FilterSidebar } from '@/src/components/shared/FilterSidebar';
// import { ProductCard } from '@/src/components/shared/ProductLayout';
// // Dummy Data types
// interface Combination {
//   id: string;
//   price: number | string;
//   image: string;
//   size: string;
//   stock: number;
// }

// interface Product {
//   id: string;
//   name: string;
//   category: string;
//   style: string;
//   handle?: string;
//   price: number | string;
//   image: string;
//   combinations?: Combination[];
//   placements?: string[];
//   productColor:any;
//   // Added by logic
//   isExploded?: boolean;
//   originalId?: string;
//   variantName?: string;
//   preSelectedCombo?: Combination;
//   slug?: string;
//   badge:any;

// }

// interface ActiveFilters {
//   styles: string[];
//   sizes: string[];
//   placements: string[];
// }

// // Dummy data import or placeholder
// // const tattooProducts: Product[] = []; // Replace with your actual data import
// export const tattooProducts: Product[] = [
//   {
//     id: "prod_1",
//     handle: "crying-heart-traditional",
//     name: "Crying Heart",
//     category: "Temporary Tattoos",
//     price: "12.00",
//     image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80&w=600",
//     badge: "Bestseller",
//     style: "Traditional",
//     placements: ["Forearm", "Calf", "Chest"],
//     productColor: "#dc2626", // Blood Red
//     combinations: [
//       { id: "var_1a", size: "Small (2x2)", price: "12.00", stock: 10, image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80&w=600" },
//       { id: "var_1b", size: "Large (4x4)", price: "18.00", stock: 5, image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80&w=600" }
//     ]
//   },
//   {
//     id: "prod_2",
//     handle: "serpent-wrap",
//     name: "Serpent Wrap",
//     category: "Temporary Tattoos",
//     price: "24.00",
//     image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80&w=600",
//     badge: "New",
//     style: "Blackwork",
//     placements: ["Forearm", "Neck", "Leg"],
//     productColor: "#171717", // Deep Black
//     combinations: [
//       { id: "var_2a", size: "Medium (5x3)", price: "24.00", stock: 15, image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80&w=600" },
//       { id: "var_2b", size: "Sleeve (10x6)", price: "45.00", stock: 2, image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80&w=600" }
//     ]
//   },
//   {
//     id: "prod_3",
//     handle: "botanical-flash-sheet",
//     name: "Botanical Flash Sheet",
//     category: "Flash Sheets",
//     price: "30.00",
//     image: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&q=80&w=600",
//     badge: "Digital Download",
//     style: "Fine Line",
//     placements: ["Any"],
//     productColor: "#52525b", // Zinc
//     combinations: [
//       { id: "var_3a", size: "Standard (8.5x11)", price: "30.00", stock: 999, image: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&q=80&w=600" }
//     ]
//   }
// ];
// export default function ShopAll() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
  
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 12;

//   const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
//     styles: [],
//     sizes: [],
//     placements: []
//   });

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, [currentPage]);

//   const categoryFromUrl = searchParams.get('category') || 'Shop All';

//   // Dynamic Categories
//   const categories = useMemo(() => {
//     const cats = new Set(tattooProducts.map(p => p.category).filter(Boolean));
//     return ['Shop All', ...Array.from(cats)];
//   }, []);

//   // --- FILTER & EXPLOSION LOGIC ---
//   const filteredProducts = useMemo(() => {
//     // Reset page if filters change
//     return tattooProducts.filter(p => {
//       const matchesCategory = categoryFromUrl === 'Shop All' || p.category === categoryFromUrl;
//       const matchesStyle = activeFilters.styles.length === 0 || activeFilters.styles.includes(p.style);
//       const matchesSize = activeFilters.sizes.length === 0 || (p.combinations && p.combinations.some(c => activeFilters.sizes.includes(c.size)));
//       const matchesPlacement = activeFilters.placements.length === 0 || (p.placements && activeFilters.placements.every(pl => p.placements.includes(pl)));

//       return matchesCategory && matchesStyle && matchesSize && matchesPlacement;
//     });
//   }, [categoryFromUrl, activeFilters]);

//   const displayItems = useMemo(() => {
//     if (filteredProducts.length > 0 && filteredProducts.length < 3) {
//       return filteredProducts.flatMap(product => {
//         if (!product.combinations?.length) return [{ ...product, isExploded: false }];
        
//         const relevantCombos = product.combinations.filter(combo => {
//           if (activeFilters.sizes.length === 0) return true;
//           return activeFilters.sizes.includes(combo.size);
//         });

//         return relevantCombos.map(combo => ({
//           ...product,
//           id: `${product.id}-${combo.id}`,
//           originalId: product.id,
//           variantName: combo.size,
//           price: combo.price,
//           image: combo.image, 
//           isExploded: true,
//           preSelectedCombo: combo,
//           slug: `${product.handle}-${combo.id}`
//         }));
//       });
//     }
//     return filteredProducts.map(p => ({ ...p, isExploded: false }));
//   }, [filteredProducts, activeFilters.sizes]);

//   // --- DYNAMIC SIDEBAR DATA ---
//   const dynamicFilterOptions = useMemo(() => {
//     const currentCategoryProducts = categoryFromUrl === 'Shop All' 
//       ? tattooProducts 
//       : tattooProducts.filter(p => p.category === categoryFromUrl);

//     return {
//       styles: Array.from(new Set(currentCategoryProducts.map(p => p.style))).filter(Boolean),
//       sizes: Array.from(new Set(currentCategoryProducts.flatMap(p => p.combinations?.map(c => c.size) || []))).filter(Boolean),
//       placements: Array.from(new Set(currentCategoryProducts.flatMap(p => p.placements || []))).filter(Boolean)
//     };
//   }, [categoryFromUrl]);

//   const totalPages = Math.ceil(displayItems.length / itemsPerPage);
//   const paginatedItems = displayItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   const handleCategoryChange = (cat: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     if (cat === 'Shop All') params.delete('category');
//     else params.set('category', cat);
    
//     router.push(`${pathname}?${params.toString()}`);
//     setActiveFilters({ styles: [], sizes: [], placements: [] });
//     setCurrentPage(1);
//   };

//   const toggleFilter = (group: keyof ActiveFilters | 'RESET', value?: string) => {
//     if (group === 'RESET') {
//       setActiveFilters({ styles: [], sizes: [], placements: [] });
//       return;
//     }
//     if (!value) return;

//     setActiveFilters(prev => {
//       const currentGroup = prev[group as keyof ActiveFilters];
//       const isSelected = currentGroup.includes(value);
//       return {
//         ...prev,
//         [group]: isSelected 
//           ? currentGroup.filter(item => item !== value) 
//           : [...currentGroup, value]
//       };
//     });
//     setCurrentPage(1);
//   };

//   return (
//     <div className="bg-slate-50 min-h-screen font-sans text-slate-950 selection:bg-slate-900 selection:text-white">
      
//       {/* MOBILE DRAWER */}
//       <div className={clsx(
//         "fixed inset-0 z-[60] bg-slate-950/40 backdrop-blur-sm transition-opacity lg:hidden",
//         isFilterDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//       )} onClick={() => setFilterDrawerOpen(false)} />
      
//       <div className={clsx(
//         "fixed right-0 top-0 h-full w-[300px] bg-white z-[70] shadow-2xl transition-transform duration-500 lg:hidden border-l-2 border-slate-950",
//         isFilterDrawerOpen ? "translate-x-0" : "translate-x-full"
//       )}>
//         <div className="p-6 h-full flex flex-col">
//           <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-slate-100">
//             <h2 className="text-[12px] font-black uppercase tracking-[0.2em]">Filters</h2>
//             <button onClick={() => setFilterDrawerOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//           <FilterSidebar filters={dynamicFilterOptions} activeFilters={activeFilters} onToggle={toggleFilter} />
//         </div>
//       </div>

//       {/* TOP NAVIGATION */}
//       <nav className="sticky top-0 z-40 bg-white border-b-2 border-slate-100">
//         <div className="container max-w-[1400px] mx-auto px-4 py-4 flex items-center justify-between gap-4">
//           <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => handleCategoryChange(cat)}
//                 className={clsx(
//                   "px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border-2",
//                   categoryFromUrl === cat 
//                     ? "bg-slate-950 text-white border-slate-950" 
//                     : "bg-white text-slate-500 border-slate-200 hover:border-slate-950 hover:text-slate-950"
//                 )}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//           <button 
//             onClick={() => setFilterDrawerOpen(true)} 
//             className="lg:hidden p-2.5 bg-white border-2 border-slate-200 hover:border-slate-950 text-slate-950 transition-colors"
//           >
//             <SlidersHorizontal className="w-4 h-4" />
//           </button>
//         </div>
//       </nav>

//       {/* MAIN CONTENT AREA */}
//       <main className="container max-w-[1400px] mx-auto px-4 py-12">
//         <div className="flex flex-col lg:flex-row gap-12">
          
//           {/* DESKTOP SIDEBAR */}
//           <aside className="hidden lg:block w-64 shrink-0">
//             <div className="sticky top-28 space-y-8 max-h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar pb-4 pr-6 border-r-2 border-slate-100">
//               <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-950 mb-8 pb-4 border-b-2 border-slate-950">
//                 Refine Studio
//               </span>
//               <FilterSidebar filters={dynamicFilterOptions} activeFilters={activeFilters} onToggle={toggleFilter} />
//             </div>
//           </aside>

//           {/* PRODUCT LISTINGS */}
//           <div className="flex-grow">
//             <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4 pb-6 border-b-2 border-slate-100">
//               <div>
//                 <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-950">{categoryFromUrl}</h1>
//                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">
//                   {displayItems.length} Products Found
//                 </p>
//               </div>
              
//               <div className="flex items-center self-start sm:self-auto gap-1 bg-white border-2 border-slate-100 p-1">
//                 <button onClick={() => setViewMode('grid')} className={clsx("p-2 transition-all", viewMode === 'grid' ? "bg-slate-950 text-white" : "text-slate-400 hover:text-slate-950")}><LayoutGrid className="w-4 h-4" /></button>
//                 <button onClick={() => setViewMode('list')} className={clsx("p-2 transition-all", viewMode === 'list' ? "bg-slate-950 text-white" : "text-slate-400 hover:text-slate-950")}><List className="w-4 h-4" /></button>
//               </div>
//             </div>

//             {displayItems.length > 0 ? (
//               <div className={clsx(
//                 "grid gap-6",
//                 viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
//               )}>
//                 {paginatedItems.map((item) => (
//                   <ProductCard key={item.id} item={item} viewMode={viewMode} />
//                 ))}
//               </div>
//             ) : (
//               <div className="py-32 text-center bg-white border-2 border-dashed border-slate-300">
//                 <RefreshCcw className="w-8 h-8 text-slate-300 mx-auto mb-4" />
//                 <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.2em]">No Designs Match Your Criteria</p>
//                 <button onClick={() => toggleFilter('RESET')} className="mt-6 text-slate-950 font-black text-[10px] uppercase tracking-widest border-b-2 border-slate-950 pb-1 hover:text-slate-600 hover:border-slate-600 transition-colors">Clear All Filters</button>
//               </div>
//             )}

//             {/* PAGINATION */}
//             {totalPages > 1 && (
//               <div className="mt-16 flex items-center justify-center gap-2">
//                 <button 
//                   disabled={currentPage === 1} 
//                   onClick={() => setCurrentPage(p => p - 1)} 
//                   className="w-12 h-12 flex items-center justify-center bg-white border-2 border-slate-200 disabled:opacity-30 hover:border-slate-950 hover:text-slate-950 transition-all text-slate-500"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>
//                 {[...Array(totalPages)].map((_, i) => (
//                   <button 
//                     key={i} 
//                     onClick={() => setCurrentPage(i + 1)} 
//                     className={clsx(
//                       "w-12 h-12 text-[12px] font-black transition-all border-2", 
//                       currentPage === i + 1 ? "bg-slate-950 text-white border-slate-950" : "bg-white text-slate-500 border-slate-200 hover:border-slate-950 hover:text-slate-950"
//                     )}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
//                 <button 
//                   disabled={currentPage === totalPages} 
//                   onClick={() => setCurrentPage(p => p + 1)} 
//                   className="w-12 h-12 flex items-center justify-center bg-white border-2 border-slate-200 disabled:opacity-30 hover:border-slate-950 hover:text-slate-950 transition-all text-slate-500"
//                 >
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


// 'use client';

// import React from 'react';
// import clsx from 'clsx';
// import { Check } from 'lucide-react';

// // --- Types ---

// interface Filters {
//   styles?: string[];
//   sizes?: string[];
//   placements?: string[];
// }

// interface ActiveFilters {
//   styles: string[];
//   sizes: string[];
//   placements: string[];
// }

// interface FilterSidebarProps {
//   filters: Filters;
//   activeFilters: ActiveFilters;
//   // Category can be a key of Filters or the string 'RESET'
//   onToggle: (category: keyof Filters | 'RESET', value?: string) => void;
// }

// interface FilterGroupProps {
//   title: string;
//   items: string[];
//   activeItems: string[];
//   onToggle: (value: string) => void;
// }

// // --- Components ---

// export function FilterSidebar({ filters, activeFilters, onToggle }: FilterSidebarProps) {
//   return (
//     <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
//       {filters.styles && filters.styles.length > 0 && (
//         <FilterGroup 
//           title="Style" 
//           items={filters.styles} 
//           activeItems={activeFilters.styles} 
//           onToggle={(v) => onToggle('styles', v)} 
//         />
//       )}
      
//       {filters.sizes && filters.sizes.length > 0 && (
//         <FilterGroup 
//           title="Size" 
//           items={filters.sizes} 
//           activeItems={activeFilters.sizes} 
//           onToggle={(v) => onToggle('sizes', v)} 
//         />
//       )}
      
//       {filters.placements && filters.placements.length > 0 && (
//         <FilterGroup 
//           title="Placement" 
//           items={filters.placements} 
//           activeItems={activeFilters.placements} 
//           onToggle={(v) => onToggle('placements', v)} 
//         />
//       )}
      
//       {Object.values(activeFilters).some(arr => arr.length > 0) && (
//         <button 
//           onClick={() => onToggle('RESET')} 
//           className="w-full py-3 rounded-xl bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-colors shadow-lg"
//         >
//           Reset Filters
//         </button>
//       )}
//     </div>
//   );
// }

// function FilterGroup({ title, items, activeItems, onToggle }: FilterGroupProps) {
//   return (
//     <div className="space-y-4">
//       <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-200 pb-2">
//         {title}
//       </h4>
//       <div className="space-y-3">
//         {items.map((item) => {
//           const isActive = activeItems.includes(item);
//           return (
//             <label key={item} className="flex items-center gap-3 cursor-pointer group select-none">
//               <div 
//                 className={clsx(
//                   "w-4 h-4 rounded-sm border transition-all flex items-center justify-center",
//                   isActive ? "bg-slate-950 border-slate-950 text-white" : "border-slate-300 bg-white group-hover:border-slate-500"
//                 )}
//               >
//                 <input 
//                   type="checkbox" 
//                   className="hidden" 
//                   checked={isActive} 
//                   onChange={() => onToggle(item)} 
//                 />
//                 {isActive && <Check className="w-3 h-3" strokeWidth={4} />}
//               </div>
//               <span className={clsx(
//                 "text-xs font-bold transition-colors uppercase tracking-widest", 
//                 isActive ? "text-slate-950" : "text-slate-500 group-hover:text-slate-800"
//               )}>
//                 {item}
//               </span>
//             </label>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// // // // 'use client';

// // // // import React, { useState } from 'react';
// // // // import Link from 'next/link';
// // // // import { Plus, ArrowRight, ChevronLeft } from 'lucide-react';
// // // // import clsx from 'clsx';

// // // // // --- Types ---

// // // // interface Combination {
// // // //   id: string;
// // // //   price: number | string;
// // // //   image: string;
// // // //   size: string;
// // // // }

// // // // interface ProductItem {
// // // //   id: string;
// // // //   originalId?: string;
// // // //   name: string;
// // // //   variantName?: string;
// // // //   style: string;
// // // //   price: number | string;
// // // //   image: string;
// // // //   badge?: string;
// // // //   productColor?: string;
// // // //   isExploded?: boolean;
// // // //   preSelectedCombo?: Combination;
// // // //   combinations?: Combination[];
// // // //   handle?: string;
// // // //   slug?: string;
// // // // }

// // // // interface ProductCardProps {
// // // //   item: ProductItem;
// // // //   viewMode: 'grid' | 'list';
// // // // }

// // // // // --- Component ---

// // // // export function ProductCard({ item, viewMode }: ProductCardProps) {
// // // //   const isList = viewMode === 'list';
// // // //   const isExploded = item.isExploded;
// // // //   const combinations = item.combinations || [];
  
// // // //   const [selectedCombo, setSelectedCombo] = useState<Combination | null>(
// // // //     isExploded && item.preSelectedCombo ? item.preSelectedCombo : null
// // // //   );

// // // //   const activeColor = item.productColor || '#0f172a'; 
// // // //   const price = selectedCombo ? selectedCombo.price : item.price;
// // // //   const image = selectedCombo ? selectedCombo.image : item.image;
// // // //   const parentId = isExploded ? item.originalId : item.id;
// // // //   const slug = item.slug || `${item.handle}-${parentId}`;

// // // //   const handleAddToCart = async (e: React.MouseEvent) => {
// // // //     e.preventDefault(); 
// // // //     const comboToAdd = isExploded ? item.preSelectedCombo : (selectedCombo || item.combinations?.[0]);
// // // //     if (!comboToAdd?.id) return;
    
// // // //     console.log(`Adding Variant ${comboToAdd.id} to cart`);
// // // //     // Example: await addToCart(comboToAdd.id, 1);
// // // //   };

// // // //   return (
// // // //     <div className={clsx(
// // // //       "group relative bg-white border-2 border-slate-100 transition-all duration-300",
// // // //       "hover:border-slate-950 hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]",
// // // //       isList ? "flex items-center gap-6 p-4" : "flex flex-col p-5"
// // // //     )}>
      
// // // //       {/* --- IMAGE AREA --- */}
// // // //       <div className={clsx(
// // // //         "relative flex items-center justify-center overflow-hidden mb-5 bg-slate-50 border border-slate-100 group-hover:border-slate-300 transition-colors",
// // // //         isList ? "w-32 h-32 shrink-0" : "w-full aspect-square"
// // // //       )}>
// // // //         {item.badge && (
// // // //           <div className="absolute top-2 left-2 z-20">
// // // //             <span 
// // // //               style={{ backgroundColor: activeColor }} 
// // // //               className="text-white text-[8px] font-black uppercase px-2 py-1 shadow-sm tracking-[0.2em]"
// // // //             >
// // // //               {item.badge}
// // // //             </span>
// // // //           </div>
// // // //         )}

// // // //         <Link href={`/product/${slug}`} className="w-full h-full flex items-center justify-center p-4">
// // // //             <img 
// // // //               src={image} 
// // // //               alt={item.name} 
// // // //               className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0" 
// // // //             />
// // // //         </Link>
// // // //       </div>

// // // //       {/* --- INFO AREA --- */}
// // // //       <div className={clsx("flex flex-col flex-grow relative z-10", isList ? "text-left" : "text-center items-center")}>
// // // //         <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{item.style}</span>
        
// // // //         <Link href={`/product/${slug}`} className="block">
// // // //             <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight leading-5 mb-2 group-hover:underline decoration-2 underline-offset-4">
// // // //               {isExploded ? item.variantName : item.name}
// // // //             </h3>
// // // //         </Link>
        
// // // //         {isExploded && <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{item.name}</p>}

// // // //         <div className={clsx("flex items-center gap-3 mb-6 w-full", !isList && "justify-center flex-col xl:flex-row xl:gap-2")}>
// // // //           <p className="text-xl font-black text-slate-950">${Number(price).toFixed(2)}</p>
          
// // // //           {!isExploded && combinations.length > 0 && (
// // // //             <div className="relative group/select w-full xl:w-auto">
// // // //               <select 
// // // //                 className="appearance-none bg-white text-[10px] font-bold uppercase py-2 pl-3 pr-8 border-2 border-slate-200 outline-none cursor-pointer hover:border-slate-950 focus:border-slate-950 transition-all w-full xl:w-auto"
// // // //                 value={selectedCombo ? selectedCombo.id : ""}
// // // //                 onChange={(e) => setSelectedCombo(combinations.find(c => c.id === e.target.value) || null)}
// // // //               >
// // // //                 <option value="">Select Size</option>
// // // //                 {combinations.map(c => <option key={c.id} value={c.id}>{c.size}</option>)}
// // // //               </select>
// // // //               <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-950">
// // // //                 <ChevronLeft className="w-3 h-3 -rotate-90" />
// // // //               </div>
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         {/* --- ACTION BUTTONS --- */}
// // // //         <div className={clsx("mt-auto w-full grid gap-2", isList ? "grid-cols-2 max-w-md" : "grid-cols-2")}>
// // // //           <button 
// // // //             onClick={handleAddToCart}
// // // //             disabled={!isExploded && combinations.length > 0 && !selectedCombo}
// // // //             className="flex items-center justify-center gap-2 py-3 bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all"
// // // //           >
// // // //             {(!isExploded && !selectedCombo) ? 'Select' : 'Add'} 
// // // //             {(!isExploded && !selectedCombo) ? null : <Plus className="w-3 h-3" />}
// // // //           </button>
          
// // // //           <Link 
// // // //             href={`/product/${slug}`} 
// // // //             className="flex items-center justify-center gap-2 py-3 bg-white text-slate-950 text-[10px] font-black uppercase tracking-[0.2em] border-2 border-slate-200 hover:border-slate-950 transition-all"
// // // //           >
// // // //             View <ArrowRight className="w-3 h-3" />
// // // //           </Link>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }








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
// // import { Plus, ArrowRight, ChevronDown, ShoppingBag } from 'lucide-react';
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
// //       "group relative bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 ease-in-out",
// //       "hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 hover:border-gray-200",
// //       isList ? "flex flex-col sm:flex-row" : "flex flex-col"
// //     )}>
      
// //       {/* --- IMAGE AREA --- */}
// //       <div className={clsx(
// //         "relative overflow-hidden bg-gray-50",
// //         isList ? "w-full sm:w-48 sm:min-w-[12rem] h-56 sm:h-auto shrink-0" : "w-full aspect-[4/5]"
// //       )}>
// //         {/* Badge */}
// //         {item.badge && (
// //           <div className="absolute top-3 left-3 z-20">
// //             <span className="bg-[#fe8204] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow-sm tracking-wider">
// //               {item.badge}
// //             </span>
// //           </div>
// //         )}

// //         <Link href={`/product/${slug}`} className="block w-full h-full relative">
// //             <img 
// //               src={image} 
// //               alt={item.name} 
// //               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
// //             />
// //             {/* Subtle overlay on hover for premium feel */}
// //             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
// //         </Link>
// //       </div>

// //       {/* --- INFO AREA --- */}
// //       <div className={clsx(
// //         "flex flex-col flex-grow p-5 sm:p-6",
// //         isList ? "justify-center" : ""
// //       )}>
        
// //         {/* Category / Style */}
// //         <span className="text-xs font-semibold text-[#fe8204] tracking-wider uppercase mb-1.5">
// //           {item.style}
// //         </span>
        
// //         {/* Title */}
// //         <Link href={`/product/${slug}`} className="block mb-1">
// //             <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-[#fe8204] transition-colors line-clamp-2">
// //               {isExploded ? item.variantName : item.name}
// //             </h3>
// //         </Link>
        
// //         {/* Subtitle for exploded variants */}
// //         {isExploded && (
// //           <p className="text-sm font-medium text-gray-500 mb-3 line-clamp-1">{item.name}</p>
// //         )}

// //         <div className="flex-grow" /> {/* Spacer to push bottom content down in grid mode */}

// //         {/* Price & Select Container */}
// //         <div className={clsx(
// //           "flex flex-col gap-4 mt-4 mb-5",
// //           isList ? "sm:flex-row sm:items-center sm:justify-between" : ""
// //         )}>
// //           <p className="text-2xl font-extrabold text-gray-900">
// //             ${Number(price).toFixed(2)}
// //           </p>
          
// //           {!isExploded && combinations.length > 0 && (
// //             <div className="relative w-full sm:max-w-[140px]">
// //               <select 
// //                 className="w-full appearance-none bg-gray-50 text-sm font-semibold text-gray-700 py-2.5 pl-4 pr-10 border border-gray-200 rounded-xl outline-none cursor-pointer hover:bg-gray-100 hover:border-gray-300 focus:ring-2 focus:ring-[#fe8204]/20 focus:border-[#fe8204] transition-all"
// //                 value={selectedCombo ? selectedCombo.id : ""}
// //                 onChange={(e) => setSelectedCombo(combinations.find(c => c.id === e.target.value) || null)}
// //               >
// //                 <option value="" disabled>Size</option>
// //                 {combinations.map(c => <option key={c.id} value={c.id}>{c.size}</option>)}
// //               </select>
// //               <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
// //                 <ChevronDown className="w-4 h-4" />
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* --- ACTION BUTTONS --- */}
// //         <div className="grid grid-cols-[1fr_auto] gap-2.5">
// //           <button 
// //             onClick={handleAddToCart}
// //             disabled={!isExploded && combinations.length > 0 && !selectedCombo}
// //             className={clsx(
// //               "flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300",
// //               (!isExploded && combinations.length > 0 && !selectedCombo)
// //                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
// //                 : "bg-[#fe8204] hover:bg-[#e07300] text-white shadow-lg shadow-[#fe8204]/25 hover:shadow-[#fe8204]/40"
// //             )}
// //           >
// //             {(!isExploded && !selectedCombo) ? 'Select Size' : 'Add to Cart'} 
// //             {(!isExploded && !selectedCombo) ? null : <ShoppingBag className="w-4 h-4" />}
// //           </button>
          
// //           <Link 
// //             href={`/product/${slug}`} 
// //             className="flex items-center justify-center p-3 rounded-xl bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-300 transition-all duration-300 group/link"
// //             aria-label="View Product"
// //           >
// //             <ArrowRight className="w-5 h-5 group-hover/link:translate-x-0.5 transition-transform" />
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { ChevronDown, ShoppingBag } from 'lucide-react';
// import clsx from 'clsx';
// import Image from 'next/image';
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
//       // Added shadow-sm and slightly softer border for the light gradient background
//       "group relative bg-white border border-gray-100/80 shadow-sm rounded-2xl overflow-hidden transition-all duration-300 ease-in-out",
//       "hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:border-gray-200",
//       isList ? "flex flex-col sm:flex-row" : "flex flex-col"
//     )}>
      
//       {/* --- IMAGE AREA --- */}
//       <div className={clsx(
//         "relative overflow-hidden bg-gray-50/50",
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
//             {/* <img 
//               src={image} 
//               alt={item.name} 
//               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
//             /> */}
//             <Image
//                 src={image}
//                 alt={item.name}
//                 fill
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                 className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
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
//         <Link href={`/collections/${slug}`} className="block mb-1">
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
//                 className="w-full appearance-none bg-gray-50/80 text-sm font-semibold text-gray-700 py-2.5 pl-4 pr-10 border border-gray-200 rounded-xl outline-none cursor-pointer hover:bg-white hover:border-gray-300 focus:ring-2 focus:ring-[#fe8204]/20 focus:border-[#fe8204] transition-all"
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
//         {/* Updated to grid-cols-2 so the buttons sit perfectly side-by-side */}
//         <div className="grid grid-cols-2 gap-2.5">
//           <button 
//             onClick={handleAddToCart}
//             disabled={!isExploded && combinations.length > 0 && !selectedCombo}
//             className={clsx(
//               "flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-sm font-bold transition-all duration-300",
//               (!isExploded && combinations.length > 0 && !selectedCombo)
//                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                 : "bg-[#fe8204] hover:bg-[#e07300] text-white shadow-md shadow-[#fe8204]/20 hover:shadow-[#fe8204]/40"
//             )}
//           >
//             {(!isExploded && !selectedCombo) ? 'Select Size' : 'Add to Cart'} 
//             {(!isExploded && !selectedCombo) ? null : <ShoppingBag className="w-4 h-4" />}
//           </button>
          
//           {/* Replaced Icon with "View Details" text and styled to look great on light backgrounds */}
//           <Link 
//             href={`/product/${slug}`} 
//             className="flex items-center justify-center py-3 px-2 rounded-xl bg-transparent text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-[#fe8204] hover:border-[#fe8204]/30 font-semibold text-sm transition-all duration-300"
//             aria-label="View Product Details"
//           >
//             View Details
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


// // "use client";

// // import React, { useState, useMemo } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { 
// //   ShoppingCart, Plus, Minus, Share2, ZoomIn, 
// //   CheckCircle2, Info, Droplets, ArrowLeft, X
// // } from 'lucide-react';
// // import clsx from 'clsx';
// // // import { Product, Combination } from '../types/product';

// // interface Combination {
// //   id: string;
// //   price: number | string;
// //   image: string;
// //   size: string;
// //   stock: number;
// // }

// // interface Product {
// //   id: string;
// //   name: string;
// //   category: string;
// //   style: string;
// //   handle?: string;
// //   price: number | string;
// //   image: string;
// //   combinations?: Combination[];
// //   placements?: string[];
// //   productColor: any;
// //   isExploded?: boolean;
// //   originalId?: string;
// //   variantName?: string;
// //   preSelectedCombo?: Combination;
// //   slug?: string;
// //   badge: any;
// // }

// // // export const tattooProducts: Product[] = [
// // //   {
// // //     id: "prod_1",
// // //     handle: "crying-heart-traditional",
// // //     name: "Crying Heart",
// // //     category: "Temporary Tattoos",
// // //     price: "12.00",
// // //     image: "/assets/images/Card1.png",
// // //     badge: "Bestseller",
// // //     style: "Traditional",
// // //     placements: ["Forearm", "Calf", "Chest"],
// // //     productColor: "#dc2626", 
// // //     combinations: [
// // //       { id: "var_1a", size: "Small (2x2)", price: "12.00", stock: 10, image: "/assets/images/Card1.png" },
// // //       { id: "var_1b", size: "Large (4x4)", price: "18.00", stock: 5, image: "/assets/images/Card1.png" }
// // //     ]
// // //   },
// // //   {
// // //     id: "prod_2",
// // //     handle: "serpent-wrap",
// // //     name: "Serpent Wrap",
// // //     category: "Temporary Tattoos",
// // //     price: "24.00",
// // //     image: "/assets/images/Card2.png",
// // //     badge: "New",
// // //     style: "Blackwork",
// // //     placements: ["Forearm", "Neck", "Leg"],
// // //     productColor: "#171717", 
// // //     combinations: [
// // //       { id: "var_2a", size: "Medium (5x3)", price: "24.00", stock: 15, image: "/assets/images/Card2.png" },
// // //       { id: "var_2b", size: "Sleeve (10x6)", price: "45.00", stock: 2, image: "/assets/images/Card2.png" }
// // //     ]
// // //   },
// // //   {
// // //     id: "prod_3",
// // //     handle: "botanical-flash-sheet",
// // //     name: "Botanical Flash Sheet",
// // //     category: "Flash Sheets",
// // //     price: "30.00",
// // //     image: "/assets/images/Card3.png",
// // //     badge: "Digital Download",
// // //     style: "Fine Line",
// // //     placements: ["Any"],
// // //     productColor: "#52525b", 
// // //     combinations: [
// // //       { id: "var_3a", size: "Standard (8.5x11)", price: "30.00", stock: 999, image: "/assets/images/Card3.png" }
// // //     ]
// // //   },
// // //   {
// // //     id: "prod_4",
// // //     handle: "minimalist-rose",
// // //     name: "Minimalist Rose",
// // //     category: "Temporary Tattoos",
// // //     price: "10.00",
// // //     image: "/assets/images/Card7.png",
// // //     badge: null,
// // //     style: "Fine Line",
// // //     placements: ["Wrist", "Ankle", "Behind Ear"],
// // //     productColor: "#ef4444", 
// // //     combinations: [
// // //       { id: "var_4a", size: "Tiny (1x1)", price: "10.00", stock: 20, image: "/assets/images/Card7.png" }
// // //     ]
// // //   },
// // //   {
// // //     id: "prod_5",
// // //     handle: "geometric-wolf",
// // //     name: "Geometric Wolf",
// // //     category: "Temporary Tattoos",
// // //     price: "16.00",
// // //     image: "/assets/images/Card4.png",
// // //     badge: "Trending",
// // //     style: "Geometric",
// // //     placements: ["Forearm", "Thigh", "Shoulder"],
// // //     productColor: "#3f3f46", 
// // //     combinations: [
// // //       { id: "var_5a", size: "Medium (4x4)", price: "16.00", stock: 12, image: "/assets/images/Card4.png" }
// // //     ]
// // //   },
// // //   {
// // //     id: "prod_6",
// // //     handle: "mandala-lotus",
// // //     name: "Mandala Lotus",
// // //     category: "Temporary Tattoos",
// // //     price: "22.00",
// // //     image: "/assets/images/Card9.png",
// // //     badge: "Limited",
// // //     style: "Dotwork",
// // //     placements: ["Sternum", "Back", "Thigh"],
// // //     productColor: "#000000", 
// // //     combinations: [
// // //       { id: "var_6a", size: "Medium (5x5)", price: "22.00", stock: 8, image: "/assets/images/Card9.png" }
// // //     ]
// // //   },
// // //   {
// // //     id: "prod_7",
// // //     handle: "skull-dagger",
// // //     name: "Skull & Dagger",
// // //     category: "Temporary Tattoos",
// // //     price: "18.00",
// // //     image: "/assets/images/Card2.png",
// // //     badge: null,
// // //     style: "Traditional",
// // //     placements: ["Calf", "Forearm", "Bicep"],
// // //     productColor: "#1c1917", 
// // //     combinations: [
// // //       { id: "var_7a", size: "Medium (4x6)", price: "18.00", stock: 14, image: "/assets/images/Card2.png" }
// // //     ]
// // //   },
// // //   {
// // //     id: "prod_8",
// // //     handle: "koi-fish-flow",
// // //     name: "Koi Fish Flow",
// // //     category: "Temporary Tattoos",
// // //     price: "26.00",
// // //     image: "/assets/images/Card5.png",
// // //     badge: "Bestseller",
// // //     style: "Japanese",
// // //     placements: ["Sleeve", "Calf", "Ribs"],
// // //     productColor: "#ea580c", 
// // //     combinations: [
// // //       { id: "var_8a", size: "Large (6x8)", price: "26.00", stock: 6, image: "/assets/images/Card5.png" }
// // //     ]
// // //   },
// // //   {
// // //     id: "prod_9",
// // //     handle: "vintage-swallow",
// // //     name: "Vintage Swallow",
// // //     category: "Temporary Tattoos",
// // //     price: "14.00",
// // //     image: "/assets/images/Card10.png",
// // //     badge: "Classic",
// // //     style: "Traditional",
// // //     placements: ["Hand", "Chest", "Neck"],
// // //     productColor: "#0284c7", 
// // //     combinations: [
// // //       { id: "var_9a", size: "Small (3x3)", price: "14.00", stock: 25, image: "/assets/images/Card10.png" }
// // //     ]
// // //   },
// // //   {
// // //     id: "prod_10",
// // //     handle: "moon-phases",
// // //     name: "Moon Phases",
// // //     category: "Temporary Tattoos",
// // //     price: "15.00",
// // //     image: "/assets/images/Card1.png",
// // //     badge: null,
// // //     style: "Minimalist",
// // //     placements: ["Spine", "Forearm", "Collarbone"],
// // //     productColor: "#71717a", 
// // //     combinations: [
// // //       { id: "var_10a", size: "Strip (2x8)", price: "15.00", stock: 18, image: "/assets/images/Card1.png" }
// // //     ]
// // //   },
// // //   {
// // //     id: "prod_11",
// // //     handle: "cyberpunk-glitch",
// // //     name: "Cyberpunk Glitch",
// // //     category: "Temporary Tattoos",
// // //     price: "20.00",
// // //     image: "/assets/images/Card8.png",
// // //     badge: "Limited Edition",
// // //     style: "Neo-Traditional",
// // //     placements: ["Forearm", "Neck", "Calf"],
// // //     productColor: "#ec4899", 
// // //     combinations: [
// // //       { id: "var_11a", size: "Medium (4x5)", price: "20.00", stock: 5, image: "/assets/images/Card8.png" }
// // //     ]
// // //   },
// // //   {
// // //     id: "prod_12",
// // //     handle: "tiger-roar",
// // //     name: "Tiger Roar",
// // //     category: "Temporary Tattoos",
// // //     price: "28.00",
// // //     image: "/assets/images/Card6.png",
// // //     badge: "Hot",
// // //     style: "Realism",
// // //     placements: ["Chest", "Thigh", "Upper Back"],
// // //     productColor: "#b45309", 
// // //     combinations: [
// // //       { id: "var_12a", size: "Large (6x6)", price: "28.00", stock: 7, image: "/assets/images/Card6.png" }
// // //     ]
// // //   },
// // //   {
// // //     id: "prod_13",
// // //     handle: "dragon-coil",
// // //     name: "Dragon Coil",
// // //     category: "Temporary Tattoos",
// // //     price: "35.00",
// // //     image: "/assets/images/Card3.png",
// // //     badge: "Staff Pick",
// // //     style: "Japanese",
// // //     placements: ["Full Arm", "Leg Wrap", "Back"],
// // //     productColor: "#0f172a", 
// // //     combinations: [
// // //       { id: "var_13a", size: "Extra Large (8x14)", price: "35.00", stock: 4, image: "/assets/images/Card3.png" }
// // //     ]
// // //   },
// // //   {
// // //     id: "prod_14",
// // //     handle: "tarot-the-moon",
// // //     name: "Tarot Card: The Moon",
// // //     category: "Temporary Tattoos",
// // //     price: "16.00",
// // //     image: "/assets/images/Card5.png",
// // //     badge: null,
// // //     style: "Blackwork",
// // //     placements: ["Forearm", "Calf", "Bicep"],
// // //     productColor: "#27272a", 
// // //     combinations: [
// // //       { id: "var_14a", size: "Medium (3x5)", price: "16.00", stock: 22, image: "/assets/images/Card5.png" }
// // //     ]
// // //   },
// // //   {
// // //     id: "prod_15",
// // //     handle: "sacred-heart",
// // //     name: "Sacred Heart",
// // //     category: "Temporary Tattoos",
// // //     price: "18.00",
// // //     image: "/assets/images/Card7.png",
// // //     badge: "Popular",
// // //     style: "Traditional",
// // //     placements: ["Chest", "Sternum", "Hand"],
// // //     productColor: "#be123c", 
// // //     combinations: [
// // //       { id: "var_15a", size: "Medium (4x4)", price: "18.00", stock: 11, image: "/assets/images/Card7.png" }
// // //     ]
// // //   },
// // //   {
// // //     id: "prod_16",
// // //     handle: "barbed-wire-armband",
// // //     name: "Barbed Wire Armband",
// // //     category: "Temporary Tattoos",
// // //     price: "14.00",
// // //     image: "/assets/images/Card9.png",
// // //     badge: null,
// // //     style: "Tribal",
// // //     placements: ["Bicep", "Wrist", "Ankle"],
// // //     productColor: "#404040", 
// // //     combinations: [
// // //       { id: "var_16a", size: "Wrap (2x10)", price: "14.00", stock: 30, image: "/assets/images/Card9.png" }
// // //     ]
// // //   },
// // //   {
// // //     id: "prod_17",
// // //     handle: "butterfly-swarm",
// // //     name: "Butterfly Swarm",
// // //     category: "Temporary Tattoos",
// // //     price: "20.00",
// // //     image: "/assets/images/Card2.png",
// // //     badge: "Popular",
// // //     style: "Fine Line",
// // //     placements: ["Shoulder", "Ribs", "Thigh"],
// // //     productColor: "#3b82f6", 
// // //     combinations: [
// // //       { id: "var_17a", size: "Large (5x7)", price: "20.00", stock: 16, image: "/assets/images/Card2.png" }
// // //     ]
// // //   },
// // //   {
// // //     id: "prod_18",
// // //     handle: "watercolor-fox",
// // //     name: "Watercolor Fox",
// // //     category: "Temporary Tattoos",
// // //     price: "24.00",
// // //     image: "/assets/images/Card10.png",
// // //     badge: "Artistic",
// // //     style: "Watercolor",
// // //     placements: ["Calf", "Forearm", "Shoulder Blade"],
// // //     productColor: "#f97316", 
// // //     combinations: [
// // //       { id: "var_18a", size: "Medium (4x6)", price: "24.00", stock: 9, image: "/assets/images/Card10.png" }
// // //     ]
// // //   },
// // //   {
// // //     id: "prod_19",
// // //     handle: "gothic-lettering-pack",
// // //     name: "Gothic Lettering Pack",
// // //     category: "Flash Sheets",
// // //     price: "25.00",
// // //     image: "/assets/images/Card4.png",
// // //     badge: "Digital Download",
// // //     style: "Lettering",
// // //     placements: ["Any"],
// // //     productColor: "#18181b", 
// // //     combinations: [
// // //       { id: "var_19a", size: "Standard (8.5x11)", price: "25.00", stock: 999, image: "/assets/images/Card4.png" }
// // //     ]
// // //   },
// // //   {
// // //     id: "prod_20",
// // //     handle: "abstract-line-art",
// // //     name: "Abstract Line Art",
// // //     category: "Temporary Tattoos",
// // //     price: "18.00",
// // //     image: "/assets/images/Card8.png",
// // //     badge: "New",
// // //     style: "Abstract",
// // //     placements: ["Forearm", "Ribs", "Ankle"],
// // //     productColor: "#52525b", 
// // //     combinations: [
// // //       { id: "var_20a", size: "Medium (4x5)", price: "18.00", stock: 13, image: "/assets/images/Card8.png" }
// // //     ]
// // //   }
// // // ];

// // interface TattooProductDetailProps {
// //   product: Product;
// //   onAddToCart?: (variantId: string, quantity: number) => void;
// // }

// // export default function TattooProductDetail({ product, onAddToCart }: TattooProductDetailProps) {
// //   const [activeVariant, setActiveVariant] = useState<Combination>(product.combinations[0]);
// //   const [quantity, setQuantity] = useState(1);
// //   const [activeTab, setActiveTab] = useState<'details' | 'care'>('details');
// //   const [isZoomed, setIsZoomed] = useState(false);
// //   const [isAdding, setIsAdding] = useState(false);

// //   const themeColor = product.productColor || '#171717';
// //   const displayImage = activeVariant?.image || product.image;
// //   const currentPrice = activeVariant?.price || product.price;

// //   // 1. Share Functionality
// //   const handleShare = async () => {
// //     const shareData = {
// //       title: `${product.name} | Tattoo`,
// //       text: `Check out this awesome ${product.style} tattoo: ${product.name}`,
// //       url: window.location.href,
// //     };
    
// //     if (navigator.share) {
// //       try {
// //         await navigator.share(shareData);
// //       } catch (err) {
// //         console.log('Error sharing', err);
// //       }
// //     } else {
// //       navigator.clipboard.writeText(window.location.href);
// //       alert('Link copied to clipboard!'); // Replace with a toast notification in production
// //     }
// //   };

// //   // 2. Add To Cart Handler
// //   const handleAddToCart = async () => {
// //     if (!activeVariant) return;
// //     setIsAdding(true);
// //     // Simulate API call or call passed prop
// //     if (onAddToCart) {
// //       await onAddToCart(activeVariant.id, quantity);
// //     } else {
// //       await new Promise(res => setTimeout(res, 800)); // Mock delay
// //     }
// //     setIsAdding(false);
// //   };

// //   return (
// //     <div className="bg-white min-h-screen text-zinc-900 font-sans">
// //       <main className="container max-w-7xl mx-auto px-5 py-8 lg:py-16">
        
// //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
// //           {/* LEFT: IMAGE GALLERY & MAGNIFIER */}
// //           <div className="lg:col-span-6 xl:col-span-7 sticky top-24">
// //             <div 
// //               className="relative aspect-[4/5] md:aspect-square rounded-3xl bg-zinc-50 border border-zinc-100 flex items-center justify-center p-6 overflow-hidden group cursor-zoom-in"
// //               onClick={() => setIsZoomed(true)}
// //               style={{ borderColor: `${themeColor}20` }}
// //             >
// //               {/* Subtle background glow */}
// //               <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundColor: themeColor }} />
              
// //               <AnimatePresence mode="wait">
// //                 <motion.img 
// //                   key={displayImage}
// //                   initial={{ opacity: 0, scale: 0.95 }}
// //                   animate={{ opacity: 1, scale: 1 }}
// //                   exit={{ opacity: 0 }}
// //                   transition={{ duration: 0.4 }}
// //                   src={displayImage} 
// //                   alt={product.name}
// //                   className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
// //                 />
// //               </AnimatePresence>

// //               {/* Magnifier Mobile Hint */}
// //               <div className="absolute bottom-6 right-6 z-20 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-sm flex items-center gap-2 text-xs font-semibold text-zinc-600 border border-zinc-200">
// //                 <ZoomIn className="w-4 h-4" />
// //                 <span className="hidden md:inline">Click to magnify</span>
// //                 <span className="md:hidden">Tap to magnify</span>
// //               </div>

// //               {product.badge && (
// //                 <div className="absolute top-6 left-6 z-20 px-4 py-1.5 rounded-full text-white text-[10px] font-bold uppercase tracking-widest shadow-lg" style={{ backgroundColor: themeColor }}>
// //                   {product.badge}
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* RIGHT: PRODUCT INFO */}
// //           <div className="lg:col-span-6 xl:col-span-5 flex flex-col pt-4">
            
// //             <div className="flex items-center justify-between mb-4">
// //               <span style={{ color: themeColor }} className="text-xs font-bold uppercase tracking-widest bg-zinc-50 px-3 py-1 rounded-full">
// //                 {product.category}
// //               </span>
// //               <button onClick={handleShare} className="p-2 hover:bg-zinc-100 rounded-full transition-colors group">
// //                 <Share2 className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
// //               </button>
// //             </div>

// //             <h1 className="text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight leading-none mb-4">
// //               {product.name}
// //             </h1>

// //             <p className="text-zinc-500 font-medium text-lg mb-8">
// //               Premium {product.style} style temporary tattoo. Lasts 1-2 weeks.
// //             </p>

// //             {/* VARIANTS (SIZE) */}
// //             <div className="space-y-6 mb-10">
// //               <div>
// //                 <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3 flex justify-between">
// //                   <span>Select Size</span>
// //                   <span className="text-zinc-900">{activeVariant?.stock || 0} in stock</span>
// //                 </label>
// //                 <div className="grid grid-cols-2 gap-3">
// //                   {product.combinations.map((combo) => {
// //                     const isSelected = activeVariant?.id === combo.id;
// //                     return (
// //                       <button
// //                         key={combo.id}
// //                         onClick={() => setActiveVariant(combo)}
// //                         style={{ 
// //                           borderColor: isSelected ? themeColor : '',
// //                           backgroundColor: isSelected ? `${themeColor}08` : 'white',
// //                           color: isSelected ? themeColor : ''
// //                         }}
// //                         className={clsx(
// //                           "px-4 py-4 rounded-2xl border-2 text-sm font-bold transition-all duration-300 flex flex-col items-center justify-center gap-1",
// //                           !isSelected && "border-zinc-200 text-zinc-600 hover:border-zinc-300"
// //                         )}
// //                       >
// //                         <span>{combo.size}</span>
// //                         <span className="text-xs font-medium opacity-70">${combo.price}</span>
// //                       </button>
// //                     );
// //                   })}
// //                 </div>
// //               </div>

// //               {/* PRICE & QUANTITY */}
// //               <div className="flex items-center justify-between p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
// //                 <div className="flex flex-col">
// //                   <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Total</span>
// //                   <span className="text-3xl font-black text-zinc-900">
// //                     ${(parseFloat(currentPrice) * quantity).toFixed(2)}
// //                   </span>
// //                 </div>
// //                 <div className="flex items-center bg-white border border-zinc-200 rounded-xl p-1 shadow-sm">
// //                   <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 hover:bg-zinc-50 rounded-lg"><Minus className="w-4 h-4" /></button>
// //                   <span className="w-12 text-center font-bold text-lg">{quantity}</span>
// //                   <button 
// //                     onClick={() => setQuantity(q => Math.min(activeVariant?.stock || 99, q + 1))} 
// //                     className="p-3 hover:bg-zinc-50 rounded-lg"
// //                   >
// //                     <Plus className="w-4 h-4" />
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* ADD TO CART */}
// //             <button 
// //               style={{ backgroundColor: themeColor }}
// //               onClick={handleAddToCart}
// //               disabled={isAdding || activeVariant?.stock === 0}
// //               className="w-full py-5 rounded-2xl text-white font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-xl hover:opacity-90 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-8"
// //             >
// //               <ShoppingCart className="w-5 h-5" />
// //               {activeVariant?.stock === 0 ? 'Out of Stock' : isAdding ? 'Adding to Cart...' : 'Add To Cart'}
// //             </button>

// //             {/* CONTENT TABS */}
// //             <div className="mt-8 border-t border-zinc-100 pt-8">
// //               <div className="flex gap-8 border-b border-zinc-100 mb-6">
// //                 {(['details', 'care'] as const).map(tab => (
// //                   <button 
// //                     key={tab}
// //                     onClick={() => setActiveTab(tab)}
// //                     className={clsx(
// //                       "pb-4 text-xs font-bold uppercase tracking-widest transition-all relative",
// //                       activeTab === tab ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-600"
// //                     )}
// //                   >
// //                     {tab}
// //                     {activeTab === tab && (
// //                       <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: themeColor }} />
// //                     )}
// //                   </button>
// //                 ))}
// //               </div>

// //               <div className="min-h-[150px]">
// //                 {activeTab === 'details' && (
// //                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
// //                     <p className="text-sm text-zinc-600 leading-relaxed">
// //                       Designed by professional artists, our {product.style.toLowerCase()} tattoos look incredibly authentic. They are waterproof, non-toxic, and safe for all skin types.
// //                     </p>
// //                     <div className="flex flex-col gap-2 mt-4">
// //                       <span className="text-xs font-bold uppercase text-zinc-400 tracking-widest">Recommended Placement:</span>
// //                       <div className="flex flex-wrap gap-2">
// //                         {product.placements.map(place => (
// //                           <span key={place} className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-semibold rounded-md">
// //                             {place}
// //                           </span>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   </motion.div>
// //                 )}
// //                 {activeTab === 'care' && (
// //                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 gap-4">
// //                     <div className="flex gap-3 items-start">
// //                       <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
// //                       <p className="text-sm text-zinc-600"><strong className="text-zinc-900 block">Application</strong> Peel off clear film, place face down on clean skin, and hold a wet cloth against it for 30 seconds.</p>
// //                     </div>
// //                     <div className="flex gap-3 items-start">
// //                       <Droplets className="w-5 h-5 text-blue-500 shrink-0" />
// //                       <p className="text-sm text-zinc-600"><strong className="text-zinc-900 block">Aftercare</strong> Avoid scrubbing in the shower. Pat dry. Lasts longer on areas with less friction.</p>
// //                     </div>
// //                   </motion.div>
// //                 )}
// //               </div>
// //             </div>

// //           </div>
// //         </div>
// //       </main>

// //       {/* FULL SCREEN MAGNIFIER MODAL (Mobile & Desktop) */}
// //       <AnimatePresence>
// //         {isZoomed && (
// //           <motion.div 
// //             initial={{ opacity: 0 }} 
// //             animate={{ opacity: 1 }} 
// //             exit={{ opacity: 0 }}
// //             className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
// //           >
// //             <button 
// //               onClick={() => setIsZoomed(false)}
// //               className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
// //             >
// //               <X className="w-6 h-6" />
// //             </button>
// //             <motion.div 
// //               initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
// //               className="w-full h-full flex items-center justify-center overflow-auto"
// //             >
// //               <img 
// //                 src={displayImage} 
// //                 alt="Magnified view" 
// //                 className="max-w-[150%] max-h-[150%] md:max-w-[90vw] md:max-h-[90vh] object-contain cursor-zoom-out touch-pinch-zoom"
// //                 onClick={() => setIsZoomed(false)}
// //               />
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // }
// "use client";

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   ShoppingCart, Plus, Minus, Share2, ZoomIn, 
//   CheckCircle2, Droplets, ArrowLeft, X
// } from 'lucide-react';
// import clsx from 'clsx';

// interface Combination {
//   id: string;
//   price: number | string;
//   image: string;
//   size: string;
//   stock: number;
// }

// interface Product {
//   id: string;
//   name: string;
//   category: string;
//   style?: string;
//   price: number | string;
//   image: string;
//   combinations?: Combination[];
//   placements?: string[];
//   productColor?: string;
//   badge?: string | null;
// }

// interface TattooProductDetailProps {
//   product: Product;
//   onAddToCart?: (variantId: string, quantity: number) => void;
//   onBack?: () => void;
// }

// export default function TattooProductDetail({ product, onAddToCart, onBack }: TattooProductDetailProps) {
//   // Safety checks for potential missing data
//   const combinations = product?.combinations || [];
//   const [activeVariant, setActiveVariant] = useState<Combination | null>(combinations[0] || null);
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState<'details' | 'care'>('details');
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [isAdding, setIsAdding] = useState(false);

//   const themeColor = product?.productColor || '#171717';
//   const displayImage = activeVariant?.image || product?.image;
//   const currentPrice = activeVariant?.price || product?.price;
//   const currentStock = activeVariant?.stock || 0;

//   const handleShare = async () => {
//     const shareData = {
//       title: `${product?.name} | Tattoo`,
//       text: `Check out this awesome tattoo: ${product?.name}`,
//       url: typeof window !== 'undefined' ? window.location.href : '',
//     };
    
//     if (typeof navigator !== 'undefined' && navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.log('Error sharing', err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       alert('Link copied to clipboard!'); 
//     }
//   };

//   const handleAddToCart = async () => {
//     if (!activeVariant || currentStock === 0) return;
//     setIsAdding(true);
//     if (onAddToCart) {
//       await onAddToCart(activeVariant.id, quantity);
//     } else {
//       await new Promise(res => setTimeout(res, 800)); // Mock network delay
//     }
//     setIsAdding(false);
//   };

//   if (!product) return null; // Prevent render if product data is entirely missing

//   return (
//     <div className="bg-white min-h-screen text-zinc-900 font-sans selection:bg-zinc-200">
      
//       {/* Top Navigation Bar */}
//       <header className="w-full border-b border-zinc-100 bg-white sticky top-0 z-30">
//         <div className="container max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
//           <button 
//             onClick={onBack} 
//             className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             <span>Back to shop</span>
//           </button>
//         </div>
//       </header>

//       <main className="container max-w-7xl mx-auto px-5 py-8 lg:py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
//           {/* LEFT: IMAGE GALLERY & MAGNIFIER */}
//           {/* FIX: Changed to lg:sticky to prevent mobile layout breaking */}
//           <div className="lg:col-span-6 xl:col-span-7 relative lg:sticky lg:top-24">
//             <div 
//               className="relative aspect-[4/5] md:aspect-square w-full rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center p-6 overflow-hidden group cursor-zoom-in transition-colors duration-300"
//               onClick={() => setIsZoomed(true)}
//               style={{ borderColor: `${themeColor}20` }}
//             >
//               <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundColor: themeColor }} />
              
//               <AnimatePresence mode="wait">
//                 <motion.img 
//                   key={displayImage}
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   src={displayImage} 
//                   alt={product.name}
//                   className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
//                 />
//               </AnimatePresence>

//               <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur px-3 py-2 rounded-full shadow-sm flex items-center gap-2 text-xs font-semibold text-zinc-600 border border-zinc-200 pointer-events-none">
//                 <ZoomIn className="w-4 h-4" />
//                 <span className="hidden sm:inline">Magnify</span>
//               </div>

//               {product.badge && (
//                 <div 
//                   className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest shadow-md" 
//                   style={{ backgroundColor: themeColor }}
//                 >
//                   {product.badge}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* RIGHT: PRODUCT INFO */}
//           <div className="lg:col-span-6 xl:col-span-5 flex flex-col">
            
//             <div className="flex items-center justify-between mb-4">
//               <span style={{ color: themeColor }} className="text-xs font-bold uppercase tracking-wider bg-zinc-50 px-3 py-1 rounded-full border border-zinc-100">
//                 {product.category}
//               </span>
//               <button onClick={handleShare} className="p-2 hover:bg-zinc-100 rounded-full transition-colors group">
//                 <Share2 className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
//               </button>
//             </div>

//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight mb-4">
//               {product.name}
//             </h1>

//             <p className="text-zinc-500 font-medium text-base md:text-lg mb-8 leading-relaxed">
//               Premium {product.style || 'custom'} style temporary tattoo. Looks authentic and lasts up to 2 weeks.
//             </p>

//             <div className="space-y-8 mb-10">
//               {/* VARIANTS (SIZE) */}
//               {combinations.length > 0 && (
//                 <div>
//                   <div className="flex justify-between items-end mb-3">
//                     <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Select Size</label>
//                     <span className={clsx("text-xs font-medium", currentStock > 5 ? "text-zinc-500" : "text-red-500")}>
//                       {currentStock > 0 ? `${currentStock} in stock` : 'Out of stock'}
//                     </span>
//                   </div>
//                   <div className="grid grid-cols-2 gap-3">
//                     {combinations.map((combo) => {
//                       const isSelected = activeVariant?.id === combo.id;
//                       return (
//                         <button
//                           key={combo.id}
//                           onClick={() => {
//                             setActiveVariant(combo);
//                             setQuantity(1); // Reset quantity on variant change
//                           }}
//                           style={{ 
//                             borderColor: isSelected ? themeColor : '',
//                             backgroundColor: isSelected ? `${themeColor}05` : 'white',
//                             color: isSelected ? themeColor : ''
//                           }}
//                           className={clsx(
//                             "px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 flex flex-col items-center justify-center gap-1",
//                             !isSelected && "border-zinc-200 text-zinc-600 hover:border-zinc-300",
//                             combo.stock === 0 && "opacity-50 cursor-not-allowed"
//                           )}
//                         >
//                           <span>{combo.size}</span>
//                           <span className="text-xs font-medium opacity-80">${Number(combo.price).toFixed(2)}</span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* PRICE & QUANTITY */}
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-zinc-50 rounded-2xl border border-zinc-100 gap-4">
//                 <div className="flex flex-col">
//                   <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">Total Price</span>
//                   <span className="text-3xl font-extrabold text-zinc-900">
//                     ${(parseFloat(currentPrice as string) * quantity).toFixed(2)}
//                   </span>
//                 </div>
                
//                 <div className="flex items-center bg-white border border-zinc-200 rounded-xl p-1 shadow-sm w-full sm:w-auto justify-between sm:justify-center">
//                   <button 
//                     onClick={() => setQuantity(q => Math.max(1, q - 1))} 
//                     disabled={quantity <= 1}
//                     className="p-3 hover:bg-zinc-50 rounded-lg text-zinc-600 disabled:opacity-50"
//                   >
//                     <Minus className="w-4 h-4" />
//                   </button>
//                   <span className="w-12 text-center font-bold text-base">{quantity}</span>
//                   <button 
//                     onClick={() => setQuantity(q => Math.min(currentStock, q + 1))} 
//                     disabled={quantity >= currentStock}
//                     className="p-3 hover:bg-zinc-50 rounded-lg text-zinc-600 disabled:opacity-50"
//                   >
//                     <Plus className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* ADD TO CART */}
//             <button 
//               style={{ backgroundColor: currentStock > 0 ? themeColor : '#e4e4e7' }}
//               onClick={handleAddToCart}
//               disabled={isAdding || currentStock === 0}
//               className={clsx(
//                 "w-full py-4 rounded-xl text-white font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200 mb-10",
//                 currentStock > 0 ? "hover:opacity-90 active:scale-[0.99]" : "text-zinc-400 cursor-not-allowed shadow-none"
//               )}
//             >
//               <ShoppingCart className="w-5 h-5" />
//               {currentStock === 0 ? 'Out of Stock' : isAdding ? 'Adding to Cart...' : 'Add To Cart'}
//             </button>

//             {/* CONTENT TABS */}
//             <div className="border-t border-zinc-100 pt-8">
//               <div className="flex gap-8 border-b border-zinc-100 mb-6">
//                 {(['details', 'care'] as const).map(tab => (
//                   <button 
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={clsx(
//                       "pb-3 text-xs font-semibold uppercase tracking-wider transition-colors relative",
//                       activeTab === tab ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-600"
//                     )}
//                   >
//                     {tab}
//                     {activeTab === tab && (
//                       <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ backgroundColor: themeColor }} />
//                     )}
//                   </button>
//                 ))}
//               </div>

//               <div className="min-h-[160px]">
//                 {activeTab === 'details' && (
//                   <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
//                     <p className="text-sm text-zinc-600 leading-relaxed">
//                       Designed by professional artists, our tattoos look incredibly authentic. They are waterproof, non-toxic, and rigorously tested for skin safety.
//                     </p>
                    
//                     {product?.placements && product.placements.length > 0 && (
//                       <div className="flex flex-col gap-3">
//                         <span className="text-xs font-semibold uppercase text-zinc-500 tracking-wider">Recommended Placement:</span>
//                         <div className="flex flex-wrap gap-2">
//                           {product.placements.map(place => (
//                             <span key={place} className="px-3 py-1.5 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-md">
//                               {place}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </motion.div>
//                 )}
                
//                 {activeTab === 'care' && (
//                   <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
//                     <div className="flex gap-4 items-start p-4 rounded-xl bg-zinc-50">
//                       <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
//                       <p className="text-sm text-zinc-600 leading-relaxed"><strong className="text-zinc-900 block font-semibold mb-1">Application</strong> Peel off clear film, place face down on clean skin, and hold a wet cloth firmly against it for 30 seconds before peeling the paper backing.</p>
//                     </div>
//                     <div className="flex gap-4 items-start p-4 rounded-xl bg-zinc-50">
//                       <Droplets className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
//                       <p className="text-sm text-zinc-600 leading-relaxed"><strong className="text-zinc-900 block font-semibold mb-1">Aftercare</strong> Avoid scrubbing in the shower. Pat dry gently. Lasts significantly longer on areas with minimal friction and hair.</p>
//                     </div>
//                   </motion.div>
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>
//       </main>

//       {/* FULL SCREEN MAGNIFIER MODAL */}
//       <AnimatePresence>
//         {isZoomed && (
//           <motion.div 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }} 
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md flex items-center justify-center p-4"
//           >
//             <button 
//               onClick={() => setIsZoomed(false)}
//               className="absolute mt-15 top-6 right-3 p-3 bg-zinc-100 hover:bg-zinc-200 rounded-full text-zinc-900 transition-colors z-50"
//               aria-label="Close zoom"
//             >
//               <X className="w-3 h-3" />
//             </button>
//             <motion.div 
//               initial={{ scale: 0.9, opacity: 0 }} 
//               animate={{ scale: 1, opacity: 1 }} 
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="w-full h-full flex items-center justify-center overflow-auto"
//             >
//               <img 
//                 src={displayImage} 
//                 alt="Magnified view" 
//                 className="max-w-none md:max-w-[90vw] md:max-h-[90vh] object-contain cursor-zoom-out"
//                 onClick={() => setIsZoomed(false)}
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence, Variants } from "framer-motion";
// import { 
//   Search, 
//   User, 
//   ShoppingBag, 
//   Menu, 
//   X, 
//   ChevronDown, 
//   LogOut, 
//   Settings 
// } from "lucide-react";
// import { cn } from "@/src/lib/utils"; // Ensure this path matches your project structure

// // --- Data Structures ---
// const COLLECTION_DATA = {
//   "BODY PART": ["Ankle & Wrist", "Back, Torso & Chest Pieces", "Foot", "Hand", "Leg & Arm pieces", "Sleeve", "Spine"],
//   "STYLES": ["Animal", "Celestial art", "Colored Art", "Couple art", "Fantasy", "Floral", "Insects", "Japanese art", "Nature", "Spiritual", "Symbols and quotes", "Tribal art"],
//   "SIZES": ["Small", "Medium", "Large"],
// };

// const HOW_IT_WORKS_DATA = ["Help Center", "About us", "How it works", "Help & FAQ"];

// export default function Header() {
//   const pathname = usePathname();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [hoveredNav, setHoveredNav] = useState<string | null>(null);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
//   const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  
//   // Mock Auth State (Replace with your actual auth hook, e.g., NextAuth or Supabase)
//   const [isLoggedIn, setIsLoggedIn] = useState(false); 
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

//   // --- Timeout ref to prevent jittery menu closing ---
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const handleMouseEnter = (navItem: string) => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     setHoveredNav(navItem);
//     setActiveDropdown(navItem);
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setHoveredNav(null);
//       setActiveDropdown(null);
//       setIsProfileMenuOpen(false);
//     }, 150); // 150ms buffer for smooth mouse movement
//   };

//   // --- Scroll & Body Lock ---
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (isMobileDrawerOpen) document.body.style.overflow = "hidden";
//     else document.body.style.overflow = "";
//     return () => { document.body.style.overflow = ""; }; // Cleanup on unmount
//   }, [isMobileDrawerOpen]);

//   const isActive = (path: string) => pathname?.includes(path);

//   // --- Animation Variants ---
//   const dropdownVariants: Variants = {
//     hidden: { opacity: 0, y: 10, scale: 0.98, filter: "blur(4px)" },
//     visible: { 
//       opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
//       transition: { type: "spring", stiffness: 400, damping: 30, mass: 0.8 }
//     },
//     exit: { 
//       opacity: 0, y: 5, scale: 0.98, filter: "blur(4px)",
//       transition: { duration: 0.15, ease: "easeOut" }
//     }
//   };

//   const drawerVariants: Variants = {
//     hidden: { x: "-100%" },
//     visible: { 
//       x: 0,
//       transition: { type: "spring", stiffness: 300, damping: 35 }
//     },
//     exit: { 
//       x: "-100%",
//       transition: { type: "spring", stiffness: 300, damping: 35 }
//     }
//   };

//   return (
//     <>
//       {/* ========================================== */}
//       {/* 1. MAIN HEADER CONTAINER                   */}
//       {/* ========================================== */}
//       <header
//         className={cn(
//           "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out",
//           isScrolled 
//             ? "h-16 md:h-20 bg-white/90 backdrop-blur-md shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border-b border-gray-200" 
//             : "h-20 md:h-24 bg-white border-b border-transparent"
//         )}
//       >
//         <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
          
//           {/* ========================================== */}
//           {/* 2. DESKTOP VIEW (Hidden on Mobile)         */}
//           {/* ========================================== */}
//           <div className="hidden md:flex items-center justify-between h-full">
//             {/* Logo */}
//             <Link 
//               href="/" 
//               className="relative z-50 flex-shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] rounded-sm transition-transform hover:scale-[1.02]"
//             >
//               <Image
//                 src="/assets/icons/DesktopLogo.svg"
//                 alt="Just Tattoos"
//                 width={140}
//                 height={48}
//                 className={cn("transition-all duration-300 w-auto", isScrolled ? "h-8" : "h-10")}
//                 priority
//               />
//             </Link>

//             {/* Desktop Navigation */}
//             <nav className="flex h-full items-center gap-1" onMouseLeave={handleMouseLeave}>
//               {/* Nav Item: New Arrival */}
//               <div className="relative h-full flex items-center px-5 cursor-pointer" onMouseEnter={() => handleMouseEnter("new-arrivals")}>
//                 {hoveredNav === "new-arrivals" && (
//                   <motion.div layoutId="nav-pill" className="absolute inset-y-5 inset-x-0 bg-gray-100/80 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
//                 )}
//                 <Link href="/new-arrivals" className={cn(
//                   "relative z-10 font-almarena font-bold text-[14px] tracking-wider transition-colors duration-300",
//                   isActive("/new-arrivals") ? "text-[var(--color-brand-orange)]" : "text-gray-900"
//                 )}>
//                   NEW ARRIVAL
//                 </Link>
//               </div>

//               {/* Nav Item: Collection (Mega Menu Trigger) */}
//               <div className="relative h-full flex items-center px-5 cursor-pointer" onMouseEnter={() => handleMouseEnter("collection")}>
//                 {hoveredNav === "collection" && (
//                   <motion.div layoutId="nav-pill" className="absolute inset-y-5 inset-x-0 bg-gray-100/80 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
//                 )}
//                 <span className={cn(
//                   "relative z-10 font-almarena font-bold text-[14px] tracking-wider transition-colors flex items-center gap-1.5",
//                   activeDropdown === "collection" || isActive("/collection") ? "text-[var(--color-brand-orange)]" : "text-gray-900"
//                 )}>
//                   COLLECTION
//                   <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", activeDropdown === "collection" && "rotate-180")} />
//                 </span>

//                 {/* Mega Menu Dropdown */}
//                 <AnimatePresence>
//                   {activeDropdown === "collection" && (
//                     <motion.div
//                       variants={dropdownVariants}
//                       initial="hidden"
//                       animate="visible"
//                       exit="exit"
//                       className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-[85vw] max-w-[1000px] bg-white rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-10 z-50 origin-top cursor-default"
//                     >
//                       <div className="grid grid-cols-3 gap-12">
//                         {Object.entries(COLLECTION_DATA).map(([category, items]) => (
//                           <div key={category} className="flex flex-col gap-5">
//                             <h3 className="font-almarena text-[var(--color-brand-orange)] text-[14px] font-bold tracking-widest uppercase border-b border-gray-100 pb-3">{category}</h3>
//                             <ul className="flex flex-col gap-3">
//                               {items.map((item) => (
//                                 <li key={item}>
//                                   <Link
//                                     href={`/collections/${item.toLowerCase().replace(/ & /g, "-").replace(/, /g, "-").replace(/ /g, "-")}`}
//                                     className="font-montserrat text-[14px] font-medium text-gray-600 hover:text-[var(--color-brand-orange)] hover:translate-x-1.5 transition-all duration-300 inline-block"
//                                     onClick={() => setActiveDropdown(null)}
//                                   >
//                                     {item}
//                                   </Link>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* Nav Item: Sale */}
//               <div className="relative h-full flex items-center px-5 cursor-pointer" onMouseEnter={() => handleMouseEnter("sale")}>
//                 {hoveredNav === "sale" && (
//                   <motion.div layoutId="nav-pill" className="absolute inset-y-5 inset-x-0 bg-gray-100/80 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
//                 )}
//                 <Link href="/sale" className={cn(
//                   "relative z-10 font-almarena font-bold text-[14px] tracking-wider transition-colors duration-300",
//                   isActive("/sale") ? "text-red-600" : "text-red-500 hover:text-red-600"
//                 )}>
//                   SALE
//                 </Link>
//               </div>

//               {/* Nav Item: How It Works */}
//               <div className="relative h-full flex items-center px-5 cursor-pointer" onMouseEnter={() => handleMouseEnter("how-it-works")}>
//                 {hoveredNav === "how-it-works" && (
//                   <motion.div layoutId="nav-pill" className="absolute inset-y-5 inset-x-0 bg-gray-100/80 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
//                 )}
//                 <span className={cn(
//                   "relative z-10 font-almarena font-bold text-[14px] tracking-wider transition-colors flex items-center gap-1.5",
//                   activeDropdown === "how-it-works" || isActive("/how-it-works") ? "text-[var(--color-brand-orange)]" : "text-gray-900"
//                 )}>
//                   HOW IT WORKS
//                   <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", activeDropdown === "how-it-works" && "rotate-180")} />
//                 </span>

//                 <AnimatePresence>
//                   {activeDropdown === "how-it-works" && (
//                     <motion.div
//                       variants={dropdownVariants}
//                       initial="hidden"
//                       animate="visible"
//                       exit="exit"
//                       className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-[500px] bg-white rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-6 z-50 origin-top"
//                     >
//                       <div className="grid grid-cols-2 gap-3 w-full">
//                         {HOW_IT_WORKS_DATA.map((item) => (
//                           <Link
//                             key={item}
//                             href={`/${item.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
//                             className="font-almarena text-[14px] font-bold text-gray-700 hover:text-[var(--color-brand-orange)] hover:bg-orange-50/50 p-4 rounded-xl transition-all duration-300 flex items-center justify-between group"
//                             onClick={() => setActiveDropdown(null)}
//                           >
//                             {item}
//                             <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-[var(--color-brand-orange)] transition-all">→</span>
//                           </Link>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </nav>

//             {/* Desktop Utility Icons & Auth */}
//             <div className="flex items-center gap-5">
//               <button aria-label="Search" className="text-gray-900 hover:text-[var(--color-brand-orange)] p-2 rounded-full hover:bg-gray-50 transition-all outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]">
//                 <Search className="w-5 h-5" strokeWidth={1.8} />
//               </button>
              
//               <button aria-label="Cart" className="text-gray-900 hover:text-[var(--color-brand-orange)] p-2 rounded-full hover:bg-gray-50 transition-all relative group outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]">
//                 <ShoppingBag className="w-5 h-5" strokeWidth={1.8} />
//                 <span className="absolute top-0 right-0 bg-[var(--color-brand-orange)] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full font-montserrat shadow-sm transform group-hover:scale-110 transition-transform">
//                   2
//                 </span>
//               </button>

//               {/* Auth Branching */}
//               <div className="pl-5 border-l border-gray-200 flex items-center gap-4 h-8">
//                 {!isLoggedIn ? (
//                   <>
//                     <Link href="/login" className="font-montserrat font-semibold text-[14px] text-gray-700 hover:text-[var(--color-brand-orange)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-brand-orange)] rounded-sm">
//                       Log in
//                     </Link>
//                     <Link href="/register" className="font-montserrat font-bold text-[13px] bg-gray-900 text-white px-6 py-2.5 rounded-full hover:bg-[var(--color-brand-orange)] hover:shadow-md transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-brand-orange)]">
//                       Sign up
//                     </Link>
//                   </>
//                 ) : (
//                   <div className="relative" onMouseLeave={() => setIsProfileMenuOpen(false)}>
//                     <button 
//                       onMouseEnter={() => setIsProfileMenuOpen(true)}
//                       className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-brand-orange)] rounded-full transition-transform hover:scale-105"
//                     >
//                       <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-400 to-[var(--color-brand-orange)] p-[2px] shadow-sm">
//                         <div className="w-full h-full bg-white rounded-full border border-white flex items-center justify-center overflow-hidden">
//                           <User className="w-5 h-5 text-gray-600" />
//                         </div>
//                       </div>
//                     </button>

//                     <AnimatePresence>
//                       {isProfileMenuOpen && (
//                         <motion.div
//                           variants={dropdownVariants}
//                           initial="hidden"
//                           animate="visible"
//                           exit="exit"
//                           className="absolute top-[calc(100%+8px)] right-0 w-52 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-50 origin-top-right"
//                         >
//                           <Link href="/account" className="flex items-center gap-3 px-5 py-3 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[var(--color-brand-orange)] font-montserrat transition-colors">
//                             <Settings className="w-4 h-4" /> Account Settings
//                           </Link>
//                           <Link href="/orders" className="flex items-center gap-3 px-5 py-3 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[var(--color-brand-orange)] font-montserrat transition-colors">
//                             <ShoppingBag className="w-4 h-4" /> My Orders
//                           </Link>
//                           <div className="h-px bg-gray-100 my-1"></div>
//                           <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center gap-3 px-5 py-3 text-[14px] text-red-600 hover:bg-red-50 font-montserrat transition-colors">
//                             <LogOut className="w-4 h-4" /> Sign Out
//                           </button>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* ========================================== */}
//           {/* 3. MOBILE VIEW (Hidden on Desktop)         */}
//           {/* ========================================== */}
//           <div className="flex md:hidden items-center justify-between w-full h-full">
            
//             {/* Left: Hamburger Menu */}
//             <div className="flex-1 flex justify-start">
//               <button 
//                 aria-label="Open Menu"
//                 onClick={() => setIsMobileDrawerOpen(true)}
//                 className="text-gray-900 p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] outline-none"
//               >
//                 <Menu className="w-6 h-6" strokeWidth={1.5} />
//               </button>
//             </div>

//             {/* Center: Logo */}
//             <div className="flex-1 flex justify-center">
//               <Link href="/" className="outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] rounded-sm">
//                 <Image
//                   src="/assets/icons/DesktopLogo.svg"
//                   alt="Just Tattoos"
//                   width={110}
//                   height={32}
//                   className="w-auto h-7 object-contain"
//                   priority
//                 />
//               </Link>
//             </div>

//             {/* Right: Search & Cart Icons */}
//             <div className="flex-1 flex justify-end items-center gap-2 sm:gap-4">
//               <button aria-label="Search" className="text-gray-900 p-2 hover:bg-gray-100 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]">
//                 <Search className="w-5 h-5" strokeWidth={1.5} />
//               </button>
//               <button aria-label="Cart" className="text-gray-900 p-2 hover:bg-gray-100 rounded-full transition-colors relative group outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]">
//                 <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
//                 <span className="absolute top-1 right-1 bg-[var(--color-brand-orange)] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
//                   2
//                 </span>
//               </button>
//             </div>

//           </div>
//         </div>
//       </header>

//       {/* ========================================== */}
//       {/* 4. MOBILE SLIDE-OUT DRAWER                 */}
//       {/* ========================================== */}
//       <AnimatePresence>
//         {isMobileDrawerOpen && (
//           <>
//             {/* Dark Overlay */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsMobileDrawerOpen(false)}
//               className="md:hidden fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity"
//             />
            
//             {/* Drawer Panel */}
//             <motion.div
//               variants={drawerVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="md:hidden fixed top-0 left-0 w-[85vw] max-w-[360px] h-[100dvh] bg-white shadow-2xl z-[70] flex flex-col"
//             >
//               {/* Drawer Header */}
//               <div className="p-5 flex justify-between items-center border-b border-gray-100 bg-gray-50/80">
//                 <Image src="/assets/icons/DesktopLogo.svg" alt="Just Tattoos" width={100} height={28} className="w-auto h-6" />
//                 <button 
//                   onClick={() => setIsMobileDrawerOpen(false)} 
//                   className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:bg-[var(--color-brand-orange)] hover:text-white hover:border-transparent transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>

//               {/* Drawer Scrollable Content */}
//               <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-8">
                
//                 {/* Auth Block Mobile */}
//                 {!isLoggedIn ? (
//                   <div className="flex flex-col gap-3 pb-8 border-b border-gray-100">
//                     <Link href="/login" onClick={() => setIsMobileDrawerOpen(false)} className="w-full py-3.5 text-center rounded-xl border-2 border-gray-100 font-montserrat font-bold text-[14px] hover:border-[var(--color-brand-orange)] hover:text-[var(--color-brand-orange)] transition-colors">
//                       Log in
//                     </Link>
//                     <Link href="/register" onClick={() => setIsMobileDrawerOpen(false)} className="w-full py-3.5 text-center rounded-xl bg-gray-900 text-white font-montserrat font-bold text-[14px] hover:bg-[var(--color-brand-orange)] shadow-md transition-all">
//                       Create Account
//                     </Link>
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-4 pb-8 border-b border-gray-100">
//                     <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center">
//                       <User className="w-6 h-6 text-[var(--color-brand-orange)]" />
//                     </div>
//                     <div className="flex-1">
//                       <p className="font-montserrat font-bold text-[15px] text-gray-900">My Account</p>
//                       <button onClick={() => setIsLoggedIn(false)} className="text-[13px] text-gray-500 hover:text-red-500 font-medium mt-0.5 transition-colors">Sign out</button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Mobile Links */}
//                 <div className="flex flex-col gap-6">
//                   <Link href="/new-arrivals" className="font-almarena text-[16px] font-bold text-gray-900 flex items-center justify-between group" onClick={() => setIsMobileDrawerOpen(false)}>
//                     NEW ARRIVAL <span className="text-gray-300 group-hover:text-[var(--color-brand-orange)] group-hover:translate-x-1 transition-all">→</span>
//                   </Link>

//                   {/* Mobile Collection Accordion */}
//                   <div className="flex flex-col gap-4">
//                     <button 
//                       className="flex justify-between items-center font-almarena text-[16px] font-bold text-gray-900 w-full text-left"
//                       onClick={() => setMobileExpanded(mobileExpanded === "collection" ? null : "collection")}
//                     >
//                       COLLECTION
//                       <ChevronDown className={cn("w-5 h-5 transition-transform duration-300 text-gray-400", mobileExpanded === "collection" && "rotate-180 text-[var(--color-brand-orange)]")} />
//                     </button>
                    
//                     <AnimatePresence>
//                       {mobileExpanded === "collection" && (
//                         <motion.div 
//                           initial={{ height: 0, opacity: 0 }}
//                           animate={{ height: "auto", opacity: 1 }}
//                           exit={{ height: 0, opacity: 0 }}
//                           className="overflow-hidden flex flex-col gap-6 pl-4 border-l-2 border-[var(--color-brand-orange)]/20 ml-1"
//                         >
//                           {Object.entries(COLLECTION_DATA).map(([category, items]) => (
//                               <div key={category} className="flex flex-col gap-3 py-1 mt-2">
//                                 <h4 className="font-almarena text-[var(--color-brand-orange)] text-[13px] font-bold tracking-wider">{category}</h4>
//                                 {items.map(item => (
//                                   <Link 
//                                     key={item} 
//                                     href={`/collections/${item.toLowerCase().replace(/ & /g, "-").replace(/, /g, "-").replace(/ /g, "-")}`}
//                                     className="font-montserrat text-gray-600 text-[14px] font-medium hover:text-[var(--color-brand-orange)] transition-colors py-1"
//                                     onClick={() => setIsMobileDrawerOpen(false)}
//                                   >
//                                     {item}
//                                   </Link>
//                                 ))}
//                               </div>
//                           ))}
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>

//                   <Link href="/sale" className="font-almarena text-[16px] font-bold text-red-500 flex items-center justify-between group" onClick={() => setIsMobileDrawerOpen(false)}>
//                     SALE <span className="text-red-200 group-hover:text-red-500 group-hover:translate-x-1 transition-all">→</span>
//                   </Link>
//                 </div>

//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }


// "use client";
// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface CardConfig {
//   id: number;
//   heroRotate: number;
//   heroX: number;
//   heroY: number;
//   circRotate: number;
//   circX: number;
//   circY: number;
//   zIndex: number;
// }

// const deckConfig: CardConfig[] = [
//   // Cards 1-4: Fanned out in hero state
//   { id: 1, heroRotate: -2,  heroX: 0,   heroY: 0,   circRotate: 0,   circX: 0,    circY: -220, zIndex: 40 }, 
//   { id: 2, heroRotate: 6,   heroX: 45,  heroY: -5,  circRotate: 45,  circX: 156,  circY: -156, zIndex: 30 }, 
//   { id: 3, heroRotate: 14,  heroX: 85,  heroY: -10, circRotate: 90,  circX: 220,  circY: 0,    zIndex: 20 }, 
//   { id: 4, heroRotate: 22,  heroX: 125, heroY: -10, circRotate: 135, circX: 156,  circY: 156,  zIndex: 10 }, 
//   // Cards 5-8: Hidden directly behind Card 1 during initial state
//   { id: 5, heroRotate: -2,  heroX: 0,   heroY: 0,   circRotate: 180, circX: 0,    circY: 220,  zIndex: 5 },  
//   { id: 6, heroRotate: -2,  heroX: 0,   heroY: 0,   circRotate: 225, circX: -156, circY: 156,  zIndex: 4 },  
//   { id: 7, heroRotate: -2,  heroX: 0,   heroY: 0,   circRotate: 270, circX: -220, circY: 0,    zIndex: 3 },  
//   { id: 8, heroRotate: -2,  heroX: 0,   heroY: 0,   circRotate: 315, circX: -156, circY: -156, zIndex: 2 },  
// ];

// const FACE_CARD_DROP_MS  = 2500;
// const POST_SETTLE_GAP_MS = 500;
// const EXPAND_DELAY_MS    = FACE_CARD_DROP_MS + POST_SETTLE_GAP_MS;

// export default function Hero() {
//   // 2. TypeScript automatically infers these as boolean, but you can explicitly type them if you prefer: useState<boolean>(true)
//   const [showIntro,     setShowIntro]     = useState(true);
//   const [topCardReady,  setTopCardReady]  = useState(false);
//   const [isExpanded,    setIsExpanded]    = useState(false);
//   const [cardIsFalling, setCardIsFalling] = useState(false);
  
//   const [isScrolled,    setIsScrolled]    = useState(false);
//   const [isDesktop,     setIsDesktop]     = useState(true);

//   useEffect(() => {
//     // Check if splash has been seen. If yes, skip the 2800ms wait.
//     const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
//     const initialDelay = hasSeenSplash ? 100 : 2800;
    
//     const introTimer = setTimeout(() => {
//       setShowIntro(false);
//       setTimeout(() => {
//         setTopCardReady(true);
//         setCardIsFalling(true);
//         setTimeout(() => setCardIsFalling(false), FACE_CARD_DROP_MS);
//         setTimeout(() => setIsExpanded(true), EXPAND_DELAY_MS);
//       }, 400);
//     }, initialDelay); 

//     return () => clearTimeout(introTimer);
//   }, []);

//   useEffect(() => {
//     if (!isExpanded) {
//       document.body.style.overflow = 'hidden'; // Block scroll during animation
//     } else {
//       document.body.style.overflow = '';       // Release scroll when cards expand
//     }
//     return () => { document.body.style.overflow = ''; };
//   }, [isExpanded]);

//   useEffect(() => {
//     setIsDesktop(window.innerWidth >= 768);
//     const handleResize = () => setIsDesktop(window.innerWidth >= 768);
//     window.addEventListener('resize', handleResize);

//     const handleScroll = () => {
//       if (!isExpanded) return;

//       // Hysteresis: Require a deeper scroll to trigger, and a higher scroll to untrigger.
//       if (window.scrollY > 80) {
//         setIsScrolled(true);
//       } else if (window.scrollY < 30) {
//         setIsScrolled(false);
//       }
//     };
//     window.addEventListener('scroll', handleScroll, { passive: true });
    
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [isExpanded]);

//   // Adjust mobile explosion radius here. 0.9 pushes cards further out to make room for text.
//   const getCircPos = (val: number) => isDesktop ? val : val * 0.9;

//   // 3. Typed the Image error handler
//   const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//     const target = e.currentTarget;
//     target.style.display = 'none';
//     if (target.nextElementSibling) {
//       (target.nextElementSibling as HTMLElement).style.display = 'flex';
//     }
//   };

//   return (
//     <div className="relative w-full h-[150vh] bg-white">
      
//       {/* Sticky container uses exactly 100vh so the bottom bar isn't forced off-screen */}
//       <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col">

//         {/* PHASE 2 & 3 — HERO AND SCROLL STATE */}
//         <AnimatePresence>
//           <motion.div
//             className="relative z-10 flex flex-col h-full w-full"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.6 }}
//           >
//             <main className="max-w-[1300px] mx-auto px-6 lg:px-12 w-full flex-grow flex flex-col md:flex-row items-center justify-center pb-8 pt-2 md:pt-0 gap-8">
              
//               {/* Left Column: Text */}
//               <motion.div 
//                 className="w-full md:w-[55%] flex flex-col items-center md:items-start justify-center z-20 order-1"
//                 animate={{ opacity: isScrolled ? 0 : 1, y: isScrolled ? -40 : 0, filter: isScrolled ? 'blur(10px)' : 'blur(0px)' }}
//                 transition={{ duration: 0.6, ease: 'easeInOut' }}
//                 style={{ pointerEvents: isScrolled ? 'none' : 'auto' }}
//               >
//                 <motion.div 
//                   initial={{ x: -30, opacity: 0 }} 
//                   animate={{ x: 0, opacity: 1 }} 
//                   transition={{ duration: 0.8, ease: 'easeOut', delay: 0 }} 
//                   className="w-max flex flex-col text-left relative z-30"
//                 >
//                   <div 
//                     className="text-black text-[15vw] md:text-[72px] lg:text-[86px] xl:text-[100px] leading-[0.85] tracking-[-0.03em] uppercase whitespace-nowrap" 
//                     style={{ fontFamily: 'Almarena, sans-serif', fontWeight: '800' }}
//                   >
//                     REAL INK
//                   </div>
                  
//                   <div 
//                     className="text-[#FE8204] text-[15vw] md:text-[72px] lg:text-[86px] xl:text-[100px] leading-[0.85] tracking-[-0.03em] uppercase whitespace-nowrap mt-1 lg:mt-2 ml-[10vw] md:ml-[60px] lg:ml-[70px] xl:ml-[85px]" 
//                     style={{ fontFamily: 'Almarena, sans-serif', fontWeight: '800' }}
//                   >
//                     YOUR WAY
//                   </div>
//                 </motion.div>

//                 <motion.p 
//                   className="mt-6 md:mt-8 text-left hidden md:block text-[#111]" 
//                   style={{ maxWidth: '520px', fontFamily: 'Montserrat, sans-serif', fontWeight: '500' }} 
//                   initial={{ y: 20, opacity: 0 }} 
//                   animate={{ y: 0, opacity: 1 }} 
//                   transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
//                 >
//                   <span className="text-[14px] lg:text-[16px] leading-[1.6]">
//                     Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically tested, permanent ink sinks into the top layer of your skin, fully developing into a bold, 
//                   </span>
//                   <span className="text-[#FE8204] text-[14px] lg:text-[16px] leading-[1.6] font-semibold">
//                     {" "}realistic design within 24 hours.
//                   </span>
//                 </motion.p>

//                 <motion.button 
//                   className="mt-8 bg-black text-white rounded-full px-7 py-3.5 lg:px-8 lg:py-4 hidden md:flex items-center gap-4 font-bold uppercase tracking-widest text-[12px] lg:text-[14px] hover:bg-gray-800 transition-colors group" 
//                   initial={{ y: 20, opacity: 0 }} 
//                   animate={{ y: 0, opacity: 1 }} 
//                   transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
//                 >
//                   SHOP COLLECTIONS
//                   <span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center group-hover:translate-x-1 transition-transform">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M5 12h14"></path>
//                       <path d="m12 5 7 7-7 7"></path>
//                     </svg>
//                   </span>
//                 </motion.button>
//               </motion.div>

//               {/* Right Column: Scaled-down Card Deck */}
//               <motion.div 
//                 className="w-full md:w-[45%] h-[250px] md:h-[380px] lg:h-[420px] relative flex justify-center items-center order-2"
//                 animate={{ 
//                   x: isScrolled && isDesktop ? '-61%' : '0%', 
//                   y: isScrolled ? 80 : 0
//                 }}
//                 transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//               >
//                 {/* Center "Real Tattoo Look" Logo */}
//                 <motion.div
//                   className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-[60]"
//                   initial={{ opacity: 0, scale: 0.5 }}
//                   animate={{ opacity: isScrolled ? 1 : 0, scale: isScrolled ? 1 : 0.5 }}
//                   transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: isScrolled ? 0.15 : 0 }}
//                 >
//                   <span className="text-[24px] md:text-[32px] leading-[1.1] tracking-widest text-black uppercase text-center" style={{ fontFamily: 'Almarena, sans-serif', fontWeight: '800' }}>
//                     REAL
//                   </span>
//                   <svg className="my-1.5" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FE8204" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
//                   </svg>
//                   <span className="text-[24px] md:text-[32px] leading-[1.1] tracking-widest text-black uppercase text-center" style={{ fontFamily: 'Almarena, sans-serif', fontWeight: '800' }}>
//                     TATTOO<br/>LOOK
//                   </span>
//                 </motion.div>

//                 <div className="relative w-[180px] h-[250px] md:w-[260px] md:h-[360px] lg:w-[320px] lg:h-[440px] flex justify-center items-center">
//                   {deckConfig.map((card, index) => {
//                     const isTopCard = index === 0;
//                     const isVisibleInHero = card.id <= 4;

//                     return (
//                       <motion.div
//                         key={card.id}
//                         className="absolute inset-0 rounded-2xl md:rounded-[24px] overflow-hidden flex flex-col items-center justify-center"
//                         style={{
//                           zIndex: isTopCard && cardIsFalling ? 9999 : card.zIndex,
//                           transformOrigin: 'center', 
//                           border: '2px solid #111',
//                           boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
//                           backgroundColor: '#fff',
//                         }}
//                         initial={isTopCard ? { x: 0, y: -800, opacity: 0, rotate: -20 } : { x: 0, y: 0, opacity: 0, rotate: 0 }}
//                         animate={
//                           isScrolled 
//                             ? {
//                                 x: getCircPos(card.circX ),
//                                 y: getCircPos(card.circY),
//                                 rotate: card.circRotate,
//                                 opacity: 1,
//                                 scale: isDesktop ? 0.5 : 0.95 
//                               }
//                             : isExpanded
//                             ? {
//                                 x: isDesktop ? card.heroX : card.heroX * 0.5, 
//                                 y: isDesktop ? card.heroY : card.heroY * 0.5, 
//                                 rotate: card.heroRotate,
//                                 opacity: isVisibleInHero ? 1 : 0, 
//                                 scale: 1
//                               }
//                             : isTopCard && topCardReady
//                             ? {
//                                 x: 0,          
//                                 y: [-800, 0],   
//                                 rotate: [-30, -2], 
//                                 opacity: [0, 1],
//                                 scale: 1
//                               }
//                             : {
//                                 x: 0,
//                                 y: isTopCard ? -800 : 0,
//                                 opacity: 0,
//                                 rotate: isTopCard ? -20 : 0,
//                                 scale: 1
//                               }
//                         }
//                         transition={
//                           isScrolled
//                           ? { type: 'spring', damping: 20, stiffness: 70, mass: 1 }
//                             : isExpanded
//                             ? { type: 'spring', damping: 18, stiffness: 90, delay: isTopCard ? 0 : index * 0.08 }
//                             : isTopCard && topCardReady
//                             ? { duration: 2.5, ease: [0.25, 0.1, 0.25, 1] } 
//                             : { duration: 0 }
//                         }
//                       >
//                         <img 
//                           src={`/assets/images/Card${card.id}.png`} 
//                           alt={`Tattoo Card ${card.id}`} 
//                           className="w-full h-full object-cover" 
//                           onError={handleImageError} 
//                         />
//                         <div className="hidden w-full h-full bg-gray-100 items-center justify-center text-center px-4">
//                           <span className="font-bold text-xl text-gray-400">Card {card.id}</span>
//                         </div>
//                       </motion.div>
//                     );
//                   })}
//                 </div>
//               </motion.div>

//               {/* Mobile-only Body Copy */}
//               <motion.div 
//                 className="w-full order-3 md:hidden flex flex-col items-center text-center px-4 pb-12 mt-4"
//                 animate={{ opacity: isScrolled ? 0 : 1, y: isScrolled ? 40 : 0 }}
//                 transition={{ duration: 0.6 }}
//                 style={{ pointerEvents: isScrolled ? 'none' : 'auto' }}
//               >
//                 <motion.p className="text-[#111]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '500' }} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}>
//                   <span className="text-[14px] leading-[1.6]">Get the authentic tattoo look without the needle or the lifelong commitment. 
//                   Our clinically tested, permanent ink sinks into the top layer of your skin, fully developing into a bold, </span>
//                   <span className="text-[#FE8204] text-[14px] leading-[1.6]">realistic design within 24 hours.</span>
//                 </motion.p>
//                 <motion.button className="mt-8 bg-black text-white rounded-full px-8 py-4 flex items-center gap-4 font-bold uppercase tracking-widest text-[13px] hover:bg-gray-800 transition-colors group" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}>
//                   SHOP COLLECTIONS
//                   <span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center group-hover:translate-x-1 transition-transform">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
//                   </span>
//                 </motion.button>
//               </motion.div>
              
//             </main>

//             {/* Infinity Scroll Bar */}
//             {isDesktop && (
//               <motion.div
//                 className="fixed bottom-0 left-0 z-50 w-full h-14 md:h-16 bg-black flex-shrink-0 flex items-center overflow-hidden"
//                 initial={{ y: 50, opacity: 0 }}
//                 animate={{
//                   y: isExpanded ? 0 : 50,
//                   opacity: isScrolled ? 0 : (isExpanded ? 1 : 0),
//                   x: isScrolled ? '100%' : '0%' 
//                 }}
//                 transition={{ duration: 0.8, ease: 'easeInOut' }}
//               >
//                 <motion.div className="flex whitespace-nowrap items-center h-full" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 18, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}>
//                   {[0, 1].map((i) => (
//                     <span key={i} className="flex items-center h-full shrink-0">
//                       {Array.from({ length: 10 }).map((_, j) => (
//                         <span key={j} className="flex items-center justify-center px-4 h-full shrink-0">
//                           <img 
//                             src="/assets/icons/InfinityBar.svg" 
//                             alt="Infinity Logo" 
//                             className="h-5 md:h-6 w-auto object-contain" 
//                           />
//                         </span>
//                       ))}
//                     </span>
//                   ))}
//                 </motion.div>
//               </motion.div>
//             )}

//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }


// "use client";
// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface CardConfig {
//   id: number;
//   heroRotate: number;
//   heroX: number;
//   heroY: number;
//   circRotate: number;
//   circX: number;
//   circY: number;
//   zIndex: number;
// }

// const deckConfig: CardConfig[] = [
//   // Cards 1-4: Fanned out in hero state
//   { id: 1, heroRotate: -2,  heroX: 0,   heroY: 0,   circRotate: 0,   circX: 0,    circY: -220, zIndex: 40 }, 
//   { id: 2, heroRotate: 6,   heroX: 45,  heroY: -5,  circRotate: 45,  circX: 156,  circY: -156, zIndex: 30 }, 
//   { id: 3, heroRotate: 14,  heroX: 85,  heroY: -10, circRotate: 90,  circX: 220,  circY: 0,    zIndex: 20 }, 
//   { id: 4, heroRotate: 22,  heroX: 125, heroY: -10, circRotate: 135, circX: 156,  circY: 156,  zIndex: 10 }, 
//   // Cards 5-8: Hidden directly behind Card 1 during initial state
//   { id: 5, heroRotate: -2,  heroX: 0,   heroY: 0,   circRotate: 180, circX: 0,    circY: 220,  zIndex: 5 },  
//   { id: 6, heroRotate: -2,  heroX: 0,   heroY: 0,   circRotate: 225, circX: -156, circY: 156,  zIndex: 4 },  
//   { id: 7, heroRotate: -2,  heroX: 0,   heroY: 0,   circRotate: 270, circX: -220, circY: 0,    zIndex: 3 },  
//   { id: 8, heroRotate: -2,  heroX: 0,   heroY: 0,   circRotate: 315, circX: -156, circY: -156, zIndex: 2 },  
// ];

// const FACE_CARD_DROP_MS  = 2500;
// const POST_SETTLE_GAP_MS = 500;
// const EXPAND_DELAY_MS    = FACE_CARD_DROP_MS + POST_SETTLE_GAP_MS;

// export default function Hero() {
//   // 2. TypeScript automatically infers these as boolean, but you can explicitly type them if you prefer: useState<boolean>(true)
//   const [showIntro,     setShowIntro]     = useState(true);
//   const [topCardReady,  setTopCardReady]  = useState(false);
//   const [isExpanded,    setIsExpanded]    = useState(false);
//   const [cardIsFalling, setCardIsFalling] = useState(false);
  
//   const [isScrolled,    setIsScrolled]    = useState(false);
//   const [isDesktop,     setIsDesktop]     = useState(true);

//   useEffect(() => {
//     // Check if splash has been seen. If yes, skip the 2800ms wait.
//     const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
//     const initialDelay = hasSeenSplash ? 100 : 2800;
    
//     const introTimer = setTimeout(() => {
//       setShowIntro(false);
//       setTimeout(() => {
//         setTopCardReady(true);
//         setCardIsFalling(true);
//         setTimeout(() => setCardIsFalling(false), FACE_CARD_DROP_MS);
//         setTimeout(() => setIsExpanded(true), EXPAND_DELAY_MS);
//       }, 400);
//     }, initialDelay); 

//     return () => clearTimeout(introTimer);
//   }, []);

//   useEffect(() => {
//     if (!isExpanded) {
//       document.body.style.overflow = 'hidden'; // Block scroll during animation
//     } else {
//       document.body.style.overflow = '';       // Release scroll when cards expand
//     }
//     return () => { document.body.style.overflow = ''; };
//   }, [isExpanded]);

//   useEffect(() => {
//     setIsDesktop(window.innerWidth >= 768);
//     const handleResize = () => setIsDesktop(window.innerWidth >= 768);
//     window.addEventListener('resize', handleResize);

//     const handleScroll = () => {
//       if (!isExpanded) return;

//       // Hysteresis: Require a deeper scroll to trigger, and a higher scroll to untrigger.
//       if (window.scrollY > 80) {
//         setIsScrolled(true);
//       } else if (window.scrollY < 30) {
//         setIsScrolled(false);
//       }
//     };
//     window.addEventListener('scroll', handleScroll, { passive: true });
    
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [isExpanded]);

//   // Adjust mobile explosion radius here. 0.9 pushes cards further out to make room for text.
//   const getCircPos = (val: number) => isDesktop ? val : val * 0.9;

//   // 3. Typed the Image error handler
//   const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//     const target = e.currentTarget;
//     target.style.display = 'none';
//     if (target.nextElementSibling) {
//       (target.nextElementSibling as HTMLElement).style.display = 'flex';
//     }
//   };

//   return (
//     <div className="relative w-full h-[150vh] bg-white">
      
//       {/* Sticky container uses exactly 100vh so the bottom bar isn't forced off-screen */}
//       <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col">

//         {/* PHASE 2 & 3 — HERO AND SCROLL STATE */}
//         <AnimatePresence>
//           <motion.div
//             className="relative z-10 flex flex-col h-full w-full"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.6 }}
//           >
//             <main className="max-w-[1300px] mx-auto px-6 lg:px-12 w-full flex-grow flex flex-col md:flex-row items-center justify-center pb-8 pt-2 md:pt-0 gap-8">
              
//               {/* Left Column: Text */}
//               <motion.div 
//                 className="w-full md:w-[55%] flex flex-col items-center md:items-start justify-center z-20 order-1"
//                 animate={{ opacity: isScrolled ? 0 : 1, y: isScrolled ? -40 : 0, filter: isScrolled ? 'blur(10px)' : 'blur(0px)' }}
//                 transition={{ duration: 0.6, ease: 'easeInOut' }}
//                 style={{ pointerEvents: isScrolled ? 'none' : 'auto' }}
//               >
//                 <motion.div 
//                   initial={{ x: -30, opacity: 0 }} 
//                   animate={{ x: 0, opacity: 1 }} 
//                   transition={{ duration: 0.8, ease: 'easeOut', delay: 0 }} 
//                   className="w-max flex flex-col text-left relative z-30"
//                 >
//                   <div 
//                     className="text-black text-[15vw] md:text-[72px] lg:text-[86px] xl:text-[100px] leading-[0.85] tracking-[-0.03em] uppercase whitespace-nowrap" 
//                     style={{ fontFamily: 'Almarena, sans-serif', fontWeight: '800' }}
//                   >
//                     REAL INK
//                   </div>
                  
//                   <div 
//                     className="text-[#FE8204] text-[15vw] md:text-[72px] lg:text-[86px] xl:text-[100px] leading-[0.85] tracking-[-0.03em] uppercase whitespace-nowrap mt-1 lg:mt-2 ml-[10vw] md:ml-[60px] lg:ml-[70px] xl:ml-[85px]" 
//                     style={{ fontFamily: 'Almarena, sans-serif', fontWeight: '800' }}
//                   >
//                     YOUR WAY
//                   </div>
//                 </motion.div>

//                 <motion.p 
//                   className="mt-6 md:mt-8 text-left hidden md:block text-[#111]" 
//                   style={{ maxWidth: '520px', fontFamily: 'Montserrat, sans-serif', fontWeight: '500' }} 
//                   initial={{ y: 20, opacity: 0 }} 
//                   animate={{ y: 0, opacity: 1 }} 
//                   transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
//                 >
//                   <span className="text-[14px] lg:text-[16px] leading-[1.6]">
//                     Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically tested, permanent ink sinks into the top layer of your skin, fully developing into a bold, 
//                   </span>
//                   <span className="text-[#FE8204] text-[14px] lg:text-[16px] leading-[1.6] font-semibold">
//                     {" "}realistic design within 24 hours.
//                   </span>
//                 </motion.p>

//                 <motion.button 
//                   className="mt-8 bg-black text-white rounded-full px-7 py-3.5 lg:px-8 lg:py-4 hidden md:flex items-center gap-4 font-bold uppercase tracking-widest text-[12px] lg:text-[14px] hover:bg-gray-800 transition-colors group" 
//                   initial={{ y: 20, opacity: 0 }} 
//                   animate={{ y: 0, opacity: 1 }} 
//                   transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
//                 >
//                   SHOP COLLECTIONS
//                   <span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center group-hover:translate-x-1 transition-transform">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M5 12h14"></path>
//                       <path d="m12 5 7 7-7 7"></path>
//                     </svg>
//                   </span>
//                 </motion.button>
//               </motion.div>

//               {/* Right Column: Scaled-down Card Deck */}
//               <motion.div 
//                 className="w-full md:w-[45%] h-[250px] md:h-[380px] lg:h-[420px] relative flex justify-center items-center order-2"
//                 animate={{ 
//                   x: isScrolled && isDesktop ? '-61%' : '0%', 
//                   y: isScrolled ? 80 : 0
//                 }}
//                 transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//               >
//                 {/* Center "Real Tattoo Look" Logo */}
//                 <motion.div
//                   className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-[60]"
//                   initial={{ opacity: 0, scale: 0.5 }}
//                   animate={{ opacity: isScrolled ? 1 : 0, scale: isScrolled ? 1 : 0.5 }}
//                   transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: isScrolled ? 0.15 : 0 }}
//                 >
//                   <span className="text-[24px] md:text-[32px] leading-[1.1] tracking-widest text-black uppercase text-center" style={{ fontFamily: 'Almarena, sans-serif', fontWeight: '800' }}>
//                     REAL
//                   </span>
//                   <svg className="my-1.5" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FE8204" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
//                   </svg>
//                   <span className="text-[24px] md:text-[32px] leading-[1.1] tracking-widest text-black uppercase text-center" style={{ fontFamily: 'Almarena, sans-serif', fontWeight: '800' }}>
//                     TATTOO<br/>LOOK
//                   </span>
//                 </motion.div>

//                 <div className="relative w-[180px] h-[250px] md:w-[260px] md:h-[360px] lg:w-[320px] lg:h-[440px] flex justify-center items-center">
//                   {deckConfig.map((card, index) => {
//                     const isTopCard = index === 0;
//                     const isVisibleInHero = card.id <= 4;

//                     return (
//                       <motion.div
//                         key={card.id}
//                         className="absolute inset-0 rounded-2xl md:rounded-[24px] overflow-hidden flex flex-col items-center justify-center"
//                         style={{
//                           zIndex: isTopCard && cardIsFalling ? 9999 : card.zIndex,
//                           transformOrigin: 'center', 
//                           border: '2px solid #111',
//                           boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
//                           backgroundColor: '#fff',
//                         }}
//                         initial={isTopCard ? { x: 0, y: -800, opacity: 0, rotate: -20 } : { x: 0, y: 0, opacity: 0, rotate: 0 }}
//                         animate={
//                           isScrolled 
//                             ? {
//                                 x: getCircPos(card.circX ),
//                                 y: getCircPos(card.circY),
//                                 rotate: card.circRotate,
//                                 opacity: 1,
//                                 scale: isDesktop ? 0.5 : 0.95 
//                               }
//                             : isExpanded
//                             ? {
//                                 x: isDesktop ? card.heroX : card.heroX * 0.5, 
//                                 y: isDesktop ? card.heroY : card.heroY * 0.5, 
//                                 rotate: card.heroRotate,
//                                 opacity: isVisibleInHero ? 1 : 0, 
//                                 scale: 1
//                               }
//                             : isTopCard && topCardReady
//                             ? {
//                                 x: 0,          
//                                 y: [-800, 0],   
//                                 rotate: [-30, -2], 
//                                 opacity: [0, 1],
//                                 scale: 1
//                               }
//                             : {
//                                 x: 0,
//                                 y: isTopCard ? -800 : 0,
//                                 opacity: 0,
//                                 rotate: isTopCard ? -20 : 0,
//                                 scale: 1
//                               }
//                         }
//                         transition={
//                           isScrolled
//                           ? { type: 'spring', damping: 20, stiffness: 70, mass: 1 }
//                             : isExpanded
//                             ? { type: 'spring', damping: 18, stiffness: 90, delay: isTopCard ? 0 : index * 0.08 }
//                             : isTopCard && topCardReady
//                             ? { duration: 2.5, ease: [0.25, 0.1, 0.25, 1] } 
//                             : { duration: 0 }
//                         }
//                       >
//                         <img 
//                           src={`/assets/images/Card${card.id}.png`} 
//                           alt={`Tattoo Card ${card.id}`} 
//                           className="w-full h-full object-cover" 
//                           onError={handleImageError} 
//                         />
//                         <div className="hidden w-full h-full bg-gray-100 items-center justify-center text-center px-4">
//                           <span className="font-bold text-xl text-gray-400">Card {card.id}</span>
//                         </div>
//                       </motion.div>
//                     );
//                   })}
//                 </div>
//               </motion.div>

//               {/* Mobile-only Body Copy */}
//               <motion.div 
//                 className="w-full order-3 md:hidden flex flex-col items-center text-center px-4 pb-12 mt-4"
//                 animate={{ opacity: isScrolled ? 0 : 1, y: isScrolled ? 40 : 0 }}
//                 transition={{ duration: 0.6 }}
//                 style={{ pointerEvents: isScrolled ? 'none' : 'auto' }}
//               >
//                 <motion.p className="text-[#111]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '500' }} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}>
//                   <span className="text-[14px] leading-[1.6]">Get the authentic tattoo look without the needle or the lifelong commitment. 
//                   Our clinically tested, permanent ink sinks into the top layer of your skin, fully developing into a bold, </span>
//                   <span className="text-[#FE8204] text-[14px] leading-[1.6]">realistic design within 24 hours.</span>
//                 </motion.p>
//                 <motion.button className="mt-8 bg-black text-white rounded-full px-8 py-4 flex items-center gap-4 font-bold uppercase tracking-widest text-[13px] hover:bg-gray-800 transition-colors group" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}>
//                   SHOP COLLECTIONS
//                   <span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center group-hover:translate-x-1 transition-transform">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
//                   </span>
//                 </motion.button>
//               </motion.div>
              
//             </main>

//             {/* Infinity Scroll Bar */}
//             {isDesktop && (
//               <motion.div
//                 className="fixed bottom-0 left-0 z-50 w-full h-14 md:h-16 bg-black flex-shrink-0 flex items-center overflow-hidden"
//                 initial={{ y: 50, opacity: 0 }}
//                 animate={{
//                   y: isExpanded ? 0 : 50,
//                   opacity: isScrolled ? 0 : (isExpanded ? 1 : 0),
//                   x: isScrolled ? '100%' : '0%' 
//                 }}
//                 transition={{ duration: 0.8, ease: 'easeInOut' }}
//               >
//                 <motion.div className="flex whitespace-nowrap items-center h-full" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 18, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}>
//                   {[0, 1].map((i) => (
//                     <span key={i} className="flex items-center h-full shrink-0">
//                       {Array.from({ length: 10 }).map((_, j) => (
//                         <span key={j} className="flex items-center justify-center px-4 h-full shrink-0">
//                           <img 
//                             src="/assets/icons/InfinityBar.svg" 
//                             alt="Infinity Logo" 
//                             className="h-5 md:h-6 w-auto object-contain" 
//                           />
//                         </span>
//                       ))}
//                     </span>
//                   ))}
//                 </motion.div>
//               </motion.div>
//             )}

//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

