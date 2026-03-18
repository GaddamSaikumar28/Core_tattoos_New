// // // "use client";

// // // import React, { useState, useCallback, useRef } from "react";
// // // import { motion, Variants, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
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

// // // // --- Product Showcase Dummy Data ---
// // // const PRODUCT_DATA = [
// // //   {
// // //     id: 1,
// // //     title: "Botanical Ink Tattoos",
// // //     desc: "Set of 15 waterproof designs. Lasts 3-5 days. Skin-safe.",
// // //     price: "$3.99",
// // //     oldPrice: "$4.99",
// // //     image: "/assets/images/Card1.png", // Ensure this matches the fallen center card
// // //     flavor: "Strawberry",
// // //     sideImage: "/assets/images/tiktok.svg", // Replace with your donut asset path
// // //   },
// // //   {
// // //     id: 2,
// // //     title: "Dark Arts Collection",
// // //     desc: "Set of 10 waterproof designs. Lasts 3-5 days. Skin-safe.",
// // //     price: "$4.99",
// // //     oldPrice: "$6.99",
// // //     image: "/assets/images/Card2.png",
// // //     flavor: "Blueberry",
// // //     sideImage: "/assets/images/tiktok.svg", // Replace with relevant asset path
// // //   },
// // //   {
// // //     id: 3,
// // //     title: "Classic Rose Sets",
// // //     desc: "Set of 5 waterproof designs. Lasts 3-5 days. Skin-safe.",
// // //     price: "$2.99",
// // //     oldPrice: "$3.99",
// // //     image: "/assets/images/Card8.png",
// // //     flavor: "Chocolate",
// // //     sideImage: "/assets/images/tiktok.svg", // Replace with relevant asset path
// // //   }
// // // ];

// // // // --- Continuous 3D Configuration Generator ---
// // // const getCardConfig = (diff: number) => {
// // //   const absDiff = Math.abs(diff);
// // //   const sign = Math.sign(diff) || 1;

// // //   if (absDiff === 0) return { x: "0%", scale: 0.85, rotateY: 0, z: 0, zIndex: 1000, opacity: 1 };
// // //   if (absDiff === 1) return { x: `${sign * 95}%`, scale: 0.85, rotateY: sign * -12, z: 50, zIndex: 90, opacity: 0.95 };
// // //   if (absDiff === 2) return { x: `${sign * 190}%`, scale: 0.9, rotateY: sign * -28, z: 100, zIndex: 80, opacity: 0.8 };
// // //   if (absDiff === 3) return { x: `${sign * 310}%`, scale: 1, rotateY: sign * -38, z: 150, zIndex: 70, opacity: 0.6 };
// // //   if (absDiff === 4) return { x: `${sign * 380}%`, scale: 1.1, rotateY: sign * -50, z: 250, zIndex: 60, opacity: 0 };
// // //   if (absDiff >= 5) return { x: `${sign * 500}%`, scale: 1.2, rotateY: sign * -60, z: 300, zIndex: 50, opacity: 0 };

// // //   return { x: "0%", scale: 0.8, opacity: 0, zIndex: 0 }; 
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

// // // const wheelVariants: Variants = {
// // //   enter: (direction: number) => ({
// // //     x: direction > 0 ? -300 : 300,
// // //     y: direction > 0 ? 100 : 100,
// // //     rotate: direction > 0 ? -30 : 30,
// // //     opacity: 0,
// // //   }),
// // //   center: {
// // //     x: 0,
// // //     y: 0,
// // //     rotate: 0,
// // //     opacity: 1,
// // //     transition: { type: "spring", stiffness: 80, damping: 15 }
// // //   },
// // //   exit: (direction: number) => ({
// // //     x: direction > 0 ? 300 : -300,
// // //     y: direction > 0 ? 100 : 100,
// // //     rotate: direction > 0 ? 30 : -30,
// // //     opacity: 0,
// // //     transition: { type: "spring", stiffness: 80, damping: 15 }
// // //   })
// // // };

// // // export default function HeroSection() {
// // //   // Original Gallery State
// // //   const [activeIndex, setActiveIndex] = useState(0);
  
// // //   // New Product Showcase State
// // //   const [productIndex, setProductIndex] = useState(0);
// // //   const [direction, setDirection] = useState(1); 
  
// // //   const sectionRef = useRef<HTMLElement>(null);
// // //   const isInView = useInView(sectionRef, { amount: 0.2 }); 

// // //   // --- Scroll Animation Hooks ---
// // //   const { scrollY } = useScroll();
// // //   const activeCardY = useTransform(scrollY, [0, 500], [0, 450]);
  
// // //   const buttonOpacity = useTransform(scrollY, [500, 700], [0, 1]);
// // //   const buttonX = useTransform(scrollY, [500, 700], [-30, 0]); 
// // //   const buttonPointerEvents = useTransform(scrollY, [500, 699, 700], ["none", "none", "auto"]);

// // //   const productSectionOpacity = useTransform(scrollY, [300, 600], [0, 1]);

// // //   const totalCards = GALLERY_IMAGES.length;

// // //   // Gallery Handlers
// // //   const handleNext = useCallback(() => {
// // //     setActiveIndex((prev) => (prev + 1) % totalCards);
// // //   }, [totalCards]);

// // //   const handlePrev = useCallback(() => {
// // //     setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
// // //   }, [totalCards]);

// // //   // Product Wheel Handlers
// // //   const nextProduct = () => {
// // //     setDirection(1);
// // //     setProductIndex((prev) => (prev + 1) % PRODUCT_DATA.length);
// // //   };
// // //   const prevProduct = () => {
// // //     setDirection(-1);
// // //     setProductIndex((prev) => (prev - 1 + PRODUCT_DATA.length) % PRODUCT_DATA.length);
// // //   };

// // //   const currentProduct = PRODUCT_DATA[productIndex];

// // //   return (
// // //     <div className="flex flex-col w-full overflow-x-hidden relative bg-[#f8f9fa]">
// // //       {/* --- TOP SECTION: HERO & 3D GALLERY --- */}
// // //       <section 
// // //         ref={sectionRef}
// // //         className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-10"
// // //         style={{ zIndex: 10 }}
// // //       >
// // //         <motion.div
// // //           className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto flex-1"
// // //           variants={containerVariants}
// // //           initial="hidden"
// // //           animate="visible"
// // //           style={{ perspective: "1500px" }}
// // //         >
// // //           {/* --- Hero Typography --- */}
// // //           <div className="flex flex-col items-center justify-center">
// // //             <motion.h1
// // //               variants={textVariants}
// // //               className={cn(
// // //                 "font-heading text-[var(--color-brand-orange)] tracking-tight z-10 flex flex-col text-left",
// // //                 "text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]" 
// // //               )}
// // //             >
// // //               <span>REAL INK</span>
// // //               <span className="ml-[1.6em]">YOUR WAY.</span>
// // //             </motion.h1>

// // //             <motion.p
// // //               variants={textVariants}
// // //               className={cn(
// // //                 "text-body text-black/70 max-w-3xl mt-4 z-10 leading-relaxed"
// // //               )}
// // //             >
// // //               Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically tested, permanent ink sinks into the top layer of your skin, fully developing into a bold,{" "}
// // //               <span className="text-[var(--color-brand-orange)] font-medium">realistic design within 24 hours.</span>
// // //             </motion.p>
// // //           </div>

// // //           {/* --- Interactive Concave 3D Gallery --- */}
// // //           <motion.div
// // //             className="relative w-full max-w-[1400px] h-[280px] sm:h-[350px] md:h-[400px] flex justify-center items-center z-20 cursor-grab active:cursor-grabbing"
// // //             style={{ 
// // //               perspective: "1500px", 
// // //               transformStyle: "preserve-3d",
// // //               touchAction: "pan-y" 
// // //             }}
// // //             onPanEnd={(e, info) => {
// // //               const swipeThreshold = 50;
// // //               if (info.offset.x < -swipeThreshold) {
// // //                 handleNext(); 
// // //               } else if (info.offset.x > swipeThreshold) {
// // //                 handlePrev(); 
// // //               }
// // //             }}
// // //           >
// // //             {GALLERY_IMAGES.map((img, index) => {
// // //               let diff = index - activeIndex;
// // //               if (diff > totalCards / 2) diff -= totalCards;
// // //               if (diff < -totalCards / 2) diff += totalCards;

// // //               const config = getCardConfig(diff);
// // //               const isCenter = Math.abs(diff) === 0;

// // //               return (
// // //                 <motion.div
// // //                   key={img.id}
// // //                   initial={false}
// // //                   animate={{
// // //                     opacity: config.opacity,
// // //                     x: config.x,
// // //                     scale: config.scale,
// // //                     rotateY: config.rotateY,
// // //                     z: config.z,
// // //                   }}
// // //                   transition={{
// // //                     type: "spring",
// // //                     stiffness: 80,
// // //                     damping: 14,
// // //                     mass: 1,
// // //                   }}
// // //                   whileHover={{
// // //                     scale: config.scale + 0.05,
// // //                     opacity: config.opacity > 0 ? 1 : 0, 
// // //                     transition: { duration: 0.4, ease: "easeOut" },
// // //                   }}
// // //                   onClick={() => {
// // //                     if (Math.abs(diff) <= 3) setActiveIndex(index);
// // //                   }}
// // //                   className="absolute origin-center group"
// // //                   style={{
// // //                     zIndex: config.zIndex,
// // //                     width: "clamp(140px, 16vw, 220px)",
// // //                     height: "clamp(200px, 25vw, 340px)",
// // //                     pointerEvents: Math.abs(diff) > 3 ? "none" : "auto",
// // //                     y: isCenter ? activeCardY : 0, 
// // //                   }}
// // //                 >
// // //                   {/* Visual Card Container */}
// // //                   <div className="relative w-full h-full shadow-2xl rounded-[20px] overflow-hidden border border-[var(--color-brand-orange)]/30 hover:border-[var(--color-brand-orange)] bg-black/40 backdrop-blur-sm">
// // //                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-10 transition-opacity duration-500" />
                    
// // //                     <Image
// // //                       src={img.src}
// // //                       alt={img.alt}
// // //                       fill
// // //                       className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
// // //                       sizes="(max-width: 768px) 30vw, 20vw"
// // //                       priority={isCenter}
// // //                     />
// // //                   </div>

// // //                   {/* Buy Now Button (Only on the center card) */}
// // //                   {isCenter && (
// // //                     <motion.div
// // //                       style={{
// // //                         opacity: buttonOpacity,
// // //                         x: buttonX,
// // //                         pointerEvents: buttonPointerEvents,
// // //                       }}
// // //                       className="absolute top-1/2 -right-[100px] md:-right-[140px] -translate-y-1/2 z-50"
// // //                     >
// // //                       <button className="bg-[var(--color-brand-orange)] text-white font-bold py-3 px-6 rounded-full shadow-lg whitespace-nowrap hover:scale-105 hover:shadow-[0_0_20px_var(--color-brand-orange)] transition-all duration-300">
// // //                         Buy Now
// // //                       </button>
// // //                     </motion.div>
// // //                   )}
// // //                 </motion.div>
// // //               );
// // //             })}
// // //           </motion.div>

// // //           {/* --- Manual Scrollbar --- */}
// // //           <motion.div 
// // //             variants={textVariants}
// // //             className="w-full max-w-[250px] md:max-w-[300px] mb-8 z-30 relative flex items-center justify-center"
// // //           >
// // //             <input
// // //               type="range"
// // //               min={0}
// // //               max={totalCards - 1}
// // //               value={activeIndex}
// // //               onChange={(e) => setActiveIndex(Number(e.target.value))}
// // //               className="w-full h-1.5 bg-black/10 rounded-full appearance-none cursor-pointer outline-none transition-all
// // //                 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,0,0,0.5)]
// // //                 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full
// // //                 hover:bg-black/30"
// // //               aria-label="Gallery Scrollbar"
// // //             />
// // //           </motion.div>

// // //           {/* --- Call To Actions --- */}
// // //           <motion.div
// // //             variants={textVariants}
// // //             className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 z-30 relative mt-auto md:mt-0"
// // //           >
// // //             <button 
// // //               className={cn(
// // //                 "font-[family-name:var(--font-montserrat)] bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 text-sm md:text-base"
// // //               )}
// // //             >
// // //               Order Now
// // //             </button>
// // //           </motion.div>
// // //         </motion.div>
// // //       </section>

// // //       {/* --- BOTTOM SECTION: SCROLL-REVEALED PRODUCT SHOWCASE --- */}
// // //       <section className="relative w-full min-h-screen flex items-center justify-center pt-20 pb-32">
// // //         <motion.div 
// // //           className="relative w-full max-w-[1000px] aspect-square md:aspect-video flex items-center justify-center"
// // //           style={{ opacity: productSectionOpacity }} 
// // //         >
// // //           {/* Background Circular Ring */}
// // //           <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full border border-gray-300/50 flex items-center justify-center z-0">
// // //              <span className="absolute top-4 md:top-10 text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">Easy to Apply</span>
// // //              <span className="absolute bottom-4 md:bottom-10 text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">Peel Off</span>
// // //              <span className="absolute left-4 md:left-10 -rotate-90 text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">Apply</span>
// // //              <span className="absolute right-4 md:right-10 rotate-90 text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">Feel It</span>
// // //           </div>

// // //           {/* Top Pill Header */}
// // //           <div className="absolute top-[5%] left-1/2 -translate-x-1/2 bg-[#8C52FF] text-white px-6 py-2.5 rounded-full flex gap-12 items-center shadow-lg z-30">
// // //             <button className="text-xl hover:scale-110 transition-transform">≡</button>
// // //             <button className="text-xl hover:scale-110 transition-transform">🛒</button>
// // //           </div>

// // //           {/* Floating Left Elements */}
// // //           <div className="absolute left-[5%] md:left-[10%] top-[25%] z-20 hover:scale-105 transition-transform">
// // //             <div className="bg-white/80 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 rounded-xl shadow-xl border border-white transform -rotate-12">
// // //               <p className="text-[#4b2787] font-[cursive] text-lg md:text-2xl">SALE</p>
// // //               <p className="font-bold text-xl md:text-3xl text-[#2d1b54]">{currentProduct.price} <span className="text-xs md:text-sm line-through text-gray-400">{currentProduct.oldPrice}</span></p>
// // //             </div>
// // //           </div>
          
// // //           {/* <div className="absolute left-[8%] md:left-[15%] bottom-[25%] z-20 hover:scale-105 transition-transform">
// // //              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center">
                
// // //                 <div className="grid grid-cols-2 gap-1 w-6 h-6 md:w-8 md:h-8">
// // //                   <div className="bg-red-500 rounded-tl-full rounded-bl-full rounded-tr-full"></div>
// // //                   <div className="bg-orange-500 rounded-full"></div>
// // //                   <div className="bg-purple-500 rounded-tl-full rounded-bl-full rounded-tr-full"></div>
// // //                   <div className="bg-blue-500 rounded-full"></div>
// // //                   <div className="bg-green-500 rounded-tl-full rounded-bl-full rounded-br-full col-span-1"></div>
// // //                 </div>
// // //              </div>
// // //           </div> */}

// // //           {/* Floating Right Element (Donut/Flavor box) */}
// // //           <div className="absolute right-[5%] md:right-[10%] top-[35%] z-20 hover:scale-105 transition-transform">
// // //             <div className="bg-white/60 backdrop-blur-xl w-32 h-32 md:w-48 md:h-48 rounded-3xl shadow-xl border border-white/50 flex items-center justify-center relative">
// // //                <Image src={currentProduct.sideImage} alt="Flavor" width={80} height={80} className="object-contain hover:rotate-180 transition-transform duration-700 w-[60px] md:w-[100px]" />
           
// // //                <span className="absolute top-2 right-2 md:top-4 md:right-4 text-[#2d1b54] text-lg md:text-2xl font-bold rotate-45">↘</span>
// // //                <span className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-[#2d1b54] text-lg md:text-2xl font-bold -rotate-[135deg]">↘</span>
// // //             </div>
// // //           </div>

// // //           {/* Center Card Wheel (The settling place) */}
// // //           <div className="relative z-40 flex items-center justify-center w-[240px] h-[360px] md:w-[300px] md:h-[450px]">
// // //             <AnimatePresence custom={direction} mode="popLayout">
// // //               <motion.div
// // //                 key={currentProduct.id}
// // //                 custom={direction}
// // //                 variants={wheelVariants}
// // //                 initial="enter"
// // //                 animate="center"
// // //                 exit="exit"
// // //                 className="absolute w-full h-full bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col items-center pt-6 md:pt-8 px-4 md:px-6 border border-gray-100"
// // //               >
// // //                 <h3 className="text-xl md:text-2xl font-[cursive] text-[#2d1b54] mb-3 md:mb-4 text-center leading-tight">{currentProduct.title}</h3>
                
// // //                 <div className="relative flex-1 w-full mb-3 md:mb-4">
// // //                    <Image src={currentProduct.image} alt="Tattoo Sheet" fill className="object-contain" />
// // //                 </div>
                
// // //                 <div className="pb-4 md:pb-6 text-center">
// // //                   <p className="text-xs md:text-sm text-gray-600 leading-snug">{currentProduct.desc}</p>
// // //                 </div>
// // //               </motion.div>
// // //             </AnimatePresence>
// // //           </div>

// // //           {/* Bottom Controls */}
// // //           <div className="absolute bottom-[2%] md:bottom-[10%] w-full flex justify-between px-[5%] md:px-[15%] items-center z-50">
// // //             <div className="flex gap-2 md:gap-4 items-center">
// // //               <button onClick={prevProduct} className="w-8 h-8 md:w-10 md:h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:scale-110 transition-transform text-[#2d1b54] font-bold">
// // //                 &lt;
// // //               </button>
// // //               <button className="bg-[#8C52FF] text-white px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium hover:bg-[#7340d8] shadow-lg shadow-purple-500/30 transition-colors">
// // //                 Buy Now
// // //               </button>
// // //             </div>

// // //             <div className="flex gap-2 md:gap-4 items-center">
// // //               <button className="bg-[#8C52FF] text-white px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium hover:bg-[#7340d8] shadow-lg shadow-purple-500/30 transition-colors flex items-center gap-2">
// // //                 Add to Cart 🛒
// // //               </button>
// // //               <button onClick={nextProduct} className="w-8 h-8 md:w-10 md:h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:scale-110 transition-transform text-[#2d1b54] font-bold">
// // //                 &gt;
// // //               </button>
// // //             </div>
// // //           </div>

// // //         </motion.div>
// // //       </section>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import React, { useState, useCallback, useRef } from "react";
// // import { motion, Variants, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
// // import Image from "next/image";
// // import { cn } from "../../lib/utils"; // Ensure this path matches your utils.js file

// // // --- Mock Data ---
// // const GALLERY_IMAGES = [
// //   { id: 1, src: "/assets/images/Card1.png", alt: "Spider tattoo blackwork",        tag: "botanical" },
// //   { id: 2, src: "/assets/images/Card2.png", alt: "Snake and dagger tattoo",        tag: "darkarts" },
// //   { id: 3, src: "/assets/images/Card3.png", alt: "Tattoo artist portrait",         tag: "botanical" },
// //   { id: 4, src: "/assets/images/Card4.png", alt: "Spiked flail leg tattoo",        tag: "darkarts" },
// //   { id: 5, src: "/assets/images/Card5.png", alt: "Skull and crossbones tattoo",    tag: "darkarts" },
// //   { id: 6, src: "/assets/images/Card6.png", alt: "Skull and crossbones tattoo",    tag: "darkarts" },
// //   { id: 7, src: "/assets/images/Card7.png", alt: "Skull and crossbones tattoo",    tag: "darkarts" },
// //   { id: 8, src: "/assets/images/Card8.png", alt: "Rose tattoo design",             tag: "roses" },
// //   { id: 9, src: "/assets/images/Card3.png", alt: "Dragon back piece",              tag: "botanical" },
// //   { id: 10, src: "/assets/images/Card4.png", alt: "Dragon back piece",             tag: "darkarts" },
// // ];

// // // --- Product Showcase Dummy Data ---
// // const PRODUCT_DATA = [
// //   {
// //     id: 1,
// //     tag: "botanical",
// //     title: "Botanical Ink Tattoos",
// //     desc: "Set of 15 waterproof designs. Lasts 3-5 days. Skin-safe.",
// //     price: "$3.99",
// //     oldPrice: "$4.99",
// //     image: "/assets/images/Card1.png",
// //     flavor: "Strawberry",
// //     sideImage: "/assets/images/tiktok.svg",
// //   },
// //   {
// //     id: 2,
// //     tag: "darkarts",
// //     title: "Dark Arts Collection",
// //     desc: "Set of 10 waterproof designs. Lasts 3-5 days. Skin-safe.",
// //     price: "$4.99",
// //     oldPrice: "$6.99",
// //     image: "/assets/images/Card2.png",
// //     flavor: "Blueberry",
// //     sideImage: "/assets/images/tiktok.svg",
// //   },
// //   {
// //     id: 3,
// //     tag: "roses",
// //     title: "Classic Rose Sets",
// //     desc: "Set of 5 waterproof designs. Lasts 3-5 days. Skin-safe.",
// //     price: "$2.99",
// //     oldPrice: "$3.99",
// //     image: "/assets/images/Card8.png",
// //     flavor: "Chocolate",
// //     sideImage: "/assets/images/tiktok.svg",
// //   }
// // ];

// // // --- Continuous 3D Configuration Generator ---
// // const getCardConfig = (diff: number) => {
// //   const absDiff = Math.abs(diff);
// //   const sign = Math.sign(diff) || 1;

// //   if (absDiff === 0) return { x: "0%", scale: 0.85, rotateY: 0, z: 0, zIndex: 1000, opacity: 1 };
// //   if (absDiff === 1) return { x: `${sign * 95}%`, scale: 0.85, rotateY: sign * -12, z: 50, zIndex: 90, opacity: 0.95 };
// //   if (absDiff === 2) return { x: `${sign * 190}%`, scale: 0.9, rotateY: sign * -28, z: 100, zIndex: 80, opacity: 0.8 };
// //   if (absDiff === 3) return { x: `${sign * 310}%`, scale: 1, rotateY: sign * -38, z: 150, zIndex: 70, opacity: 0.6 };
// //   if (absDiff === 4) return { x: `${sign * 380}%`, scale: 1.1, rotateY: sign * -50, z: 250, zIndex: 60, opacity: 0 };
// //   if (absDiff >= 5) return { x: `${sign * 500}%`, scale: 1.2, rotateY: sign * -60, z: 300, zIndex: 50, opacity: 0 };

// //   return { x: "0%", scale: 0.8, opacity: 0, zIndex: 0 }; 
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

// // const wheelVariants: Variants = {
// //   enter: (direction: number) => ({
// //     x: direction > 0 ? -300 : 300,
// //     y: direction > 0 ? 100 : 100,
// //     rotate: direction > 0 ? -30 : 30,
// //     opacity: 0,
// //   }),
// //   center: {
// //     x: 0,
// //     y: 0,
// //     rotate: 0,
// //     opacity: 1,
// //     transition: { type: "spring", stiffness: 80, damping: 15 }
// //   },
// //   exit: (direction: number) => ({
// //     x: direction > 0 ? 300 : -300,
// //     y: direction > 0 ? 100 : 100,
// //     rotate: direction > 0 ? 30 : -30,
// //     opacity: 0,
// //     transition: { type: "spring", stiffness: 80, damping: 15 }
// //   })
// // };

// // export default function HeroSection() {
// //   // Original Gallery State
// //   const [activeIndex, setActiveIndex] = useState(0);
  
// //   // New Product Showcase State
// //   const [productIndex, setProductIndex] = useState(0);
// //   const [direction, setDirection] = useState(1);
// //   // Tracks whether the dropped card has finished settling, so content animates in after
// //   const [cardSettled, setCardSettled] = useState(true);
  
// //   const sectionRef = useRef<HTMLElement>(null);
// //   const isInView = useInView(sectionRef, { amount: 0.2 }); 

// //   // --- Scroll Animation Hooks ---
// //   const { scrollY } = useScroll();
// //   const activeCardY = useTransform(scrollY, [0, 500], [0, 450]);
  
// //   const buttonOpacity = useTransform(scrollY, [500, 700], [0, 1]);
// //   const buttonX = useTransform(scrollY, [500, 700], [-30, 0]); 
// //   const buttonPointerEvents = useTransform(scrollY, [500, 699, 700], ["none", "none", "auto"]);

// //   const productSectionOpacity = useTransform(scrollY, [300, 600], [0, 1]);

// //   const totalCards = GALLERY_IMAGES.length;

// //   // Sync gallery activeIndex -> productIndex via tag mapping
// //   React.useEffect(() => {
// //     const activeTag = GALLERY_IMAGES[activeIndex]?.tag;
// //     const matchedIdx = PRODUCT_DATA.findIndex((p) => p.tag === activeTag);
// //     if (matchedIdx !== -1 && matchedIdx !== productIndex) {
// //       setDirection(matchedIdx > productIndex ? 1 : -1);
// //       setCardSettled(false);
// //       setProductIndex(matchedIdx);
// //     }
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [activeIndex]);

// //   // Gallery Handlers
// //   const handleNext = useCallback(() => {
// //     setActiveIndex((prev) => (prev + 1) % totalCards);
// //   }, [totalCards]);

// //   const handlePrev = useCallback(() => {
// //     setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
// //   }, [totalCards]);

// //   // Product Wheel Handlers
// //   const nextProduct = () => {
// //     setDirection(1);
// //     setCardSettled(false);
// //     setProductIndex((prev) => (prev + 1) % PRODUCT_DATA.length);
// //   };
// //   const prevProduct = () => {
// //     setDirection(-1);
// //     setCardSettled(false);
// //     setProductIndex((prev) => (prev - 1 + PRODUCT_DATA.length) % PRODUCT_DATA.length);
// //   };

// //   const currentProduct = PRODUCT_DATA[productIndex];

// //   return (
// //     <div className="flex flex-col w-full overflow-x-hidden relative bg-[#f8f9fa]">
// //       {/* --- TOP SECTION: HERO & 3D GALLERY --- */}
// //       <section 
// //         ref={sectionRef}
// //         className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-10"
// //         style={{ zIndex: 10 }}
// //       >
// //         <motion.div
// //           className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto flex-1"
// //           variants={containerVariants}
// //           initial="hidden"
// //           animate="visible"
// //           style={{ perspective: "1500px" }}
// //         >
// //           {/* --- Hero Typography --- */}
// //           <div className="flex flex-col items-center justify-center">
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
// //               className={cn(
// //                 "text-body text-black/70 max-w-3xl mt-4 z-10 leading-relaxed"
// //               )}
// //             >
// //               Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically tested, permanent ink sinks into the top layer of your skin, fully developing into a bold,{" "}
// //               <span className="text-[var(--color-brand-orange)] font-medium">realistic design within 24 hours.</span>
// //             </motion.p>
// //           </div>

// //           {/* --- Interactive Concave 3D Gallery --- */}
// //           <motion.div
// //             className="relative w-full max-w-[1400px] h-[280px] sm:h-[350px] md:h-[400px] flex justify-center items-center z-20 cursor-grab active:cursor-grabbing"
// //             style={{ 
// //               perspective: "1500px", 
// //               transformStyle: "preserve-3d",
// //               touchAction: "pan-y" 
// //             }}
// //             onPanEnd={(e, info) => {
// //               const swipeThreshold = 50;
// //               if (info.offset.x < -swipeThreshold) {
// //                 handleNext(); 
// //               } else if (info.offset.x > swipeThreshold) {
// //                 handlePrev(); 
// //               }
// //             }}
// //           >
// //             {GALLERY_IMAGES.map((img, index) => {
// //               let diff = index - activeIndex;
// //               if (diff > totalCards / 2) diff -= totalCards;
// //               if (diff < -totalCards / 2) diff += totalCards;

// //               const config = getCardConfig(diff);
// //               const isCenter = Math.abs(diff) === 0;

// //               return (
// //                 <motion.div
// //                   key={img.id}
// //                   initial={false}
// //                   animate={{
// //                     opacity: config.opacity,
// //                     x: config.x,
// //                     scale: config.scale,
// //                     rotateY: config.rotateY,
// //                     z: config.z,
// //                   }}
// //                   transition={{
// //                     type: "spring",
// //                     stiffness: 80,
// //                     damping: 14,
// //                     mass: 1,
// //                   }}
// //                   whileHover={{
// //                     scale: config.scale + 0.05,
// //                     opacity: config.opacity > 0 ? 1 : 0, 
// //                     transition: { duration: 0.4, ease: "easeOut" },
// //                   }}
// //                   onClick={() => {
// //                     if (Math.abs(diff) <= 3) setActiveIndex(index);
// //                   }}
// //                   className="absolute origin-center group"
// //                   style={{
// //                     zIndex: config.zIndex,
// //                     width: "clamp(140px, 16vw, 220px)",
// //                     height: "clamp(200px, 25vw, 340px)",
// //                     pointerEvents: Math.abs(diff) > 3 ? "none" : "auto",
// //                     y: isCenter ? activeCardY : 0, 
// //                   }}
// //                 >
// //                   {/* Visual Card Container */}
// //                   <div className="relative w-full h-full shadow-2xl rounded-[20px] overflow-hidden border border-[var(--color-brand-orange)]/30 hover:border-[var(--color-brand-orange)] bg-black/40 backdrop-blur-sm">
// //                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-10 transition-opacity duration-500" />
                    
// //                     <Image
// //                       src={img.src}
// //                       alt={img.alt}
// //                       fill
// //                       className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
// //                       sizes="(max-width: 768px) 30vw, 20vw"
// //                       priority={isCenter}
// //                     />
// //                   </div>

// //                   {/* Buy Now Button (Only on the center card) */}
// //                   {isCenter && (
// //                     <motion.div
// //                       style={{
// //                         opacity: buttonOpacity,
// //                         x: buttonX,
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

// //           {/* --- Manual Scrollbar --- */}
// //           <motion.div 
// //             variants={textVariants}
// //             className="w-full max-w-[250px] md:max-w-[300px] mb-8 z-30 relative flex items-center justify-center"
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

// //           {/* --- Call To Actions --- */}
// //           <motion.div
// //             variants={textVariants}
// //             className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 z-30 relative mt-auto md:mt-0"
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

// //       {/* --- BOTTOM SECTION: SCROLL-REVEALED PRODUCT SHOWCASE --- */}
// //       <section className="relative w-full min-h-screen flex items-center justify-center pt-20 pb-32">
// //         <motion.div 
// //           className="relative w-full max-w-[1000px] aspect-square md:aspect-video flex items-center justify-center"
// //           style={{ opacity: productSectionOpacity }} 
// //         >
// //           {/* Background Circular Ring */}
// //           <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full border border-gray-300/50 flex items-center justify-center z-0">
// //              <span className="absolute top-4 md:top-10 text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">Easy to Apply</span>
// //              <span className="absolute bottom-4 md:bottom-10 text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">Peel Off</span>
// //              <span className="absolute left-4 md:left-10 -rotate-90 text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">Apply</span>
// //              <span className="absolute right-4 md:right-10 rotate-90 text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">Feel It</span>
// //           </div>

// //           {/* Top Pill Header */}
// //           <div className="absolute top-[5%] left-1/2 -translate-x-1/2 bg-[#8C52FF] text-white px-6 py-2.5 rounded-full flex gap-12 items-center shadow-lg z-30">
// //             <button className="text-xl hover:scale-110 transition-transform">≡</button>
// //             <button className="text-xl hover:scale-110 transition-transform">🛒</button>
// //           </div>

// //           {/* Floating Left Elements */}
// //           <motion.div
// //             initial={{ opacity: 0, x: -16, rotate: -12 }}
// //             animate={{ opacity: cardSettled ? 1 : 0, x: cardSettled ? 0 : -16, rotate: -12 }}
// //             transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
// //             className="absolute left-[5%] md:left-[10%] top-[25%] z-20 hover:scale-105 transition-transform"
// //           >
// //             <div className="bg-white/80 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 rounded-xl shadow-xl border border-white">
// //               <p className="text-[#4b2787] font-[cursive] text-lg md:text-2xl">SALE</p>
// //               <p className="font-bold text-xl md:text-3xl text-[#2d1b54]">{currentProduct.price} <span className="text-xs md:text-sm line-through text-gray-400">{currentProduct.oldPrice}</span></p>
// //             </div>
// //           </motion.div>
          
// //           {/* <div className="absolute left-[8%] md:left-[15%] bottom-[25%] z-20 hover:scale-105 transition-transform">
// //              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center">
                
// //                 <div className="grid grid-cols-2 gap-1 w-6 h-6 md:w-8 md:h-8">
// //                   <div className="bg-red-500 rounded-tl-full rounded-bl-full rounded-tr-full"></div>
// //                   <div className="bg-orange-500 rounded-full"></div>
// //                   <div className="bg-purple-500 rounded-tl-full rounded-bl-full rounded-tr-full"></div>
// //                   <div className="bg-blue-500 rounded-full"></div>
// //                   <div className="bg-green-500 rounded-tl-full rounded-bl-full rounded-br-full col-span-1"></div>
// //                 </div>
// //              </div>
// //           </div> */}

// //           {/* Floating Right Element (Donut/Flavor box) */}
// //           <div className="absolute right-[5%] md:right-[10%] top-[35%] z-20 hover:scale-105 transition-transform">
// //             <div className="bg-white/60 backdrop-blur-xl w-32 h-32 md:w-48 md:h-48 rounded-3xl shadow-xl border border-white/50 flex items-center justify-center relative">
// //                <Image src={currentProduct.sideImage} alt="Flavor" width={80} height={80} className="object-contain hover:rotate-180 transition-transform duration-700 w-[60px] md:w-[100px]" />
           
// //                <span className="absolute top-2 right-2 md:top-4 md:right-4 text-[#2d1b54] text-lg md:text-2xl font-bold rotate-45">↘</span>
// //                <span className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-[#2d1b54] text-lg md:text-2xl font-bold -rotate-[135deg]">↘</span>
// //             </div>
// //           </div>

// //           {/* Center Card Wheel (The settling place) */}
// //           <div className="relative z-40 flex items-center justify-center w-[240px] h-[360px] md:w-[300px] md:h-[450px]">
// //             <AnimatePresence custom={direction} mode="popLayout">
// //               <motion.div
// //                 key={currentProduct.id}
// //                 custom={direction}
// //                 variants={wheelVariants}
// //                 initial="enter"
// //                 animate="center"
// //                 exit="exit"
// //                 onAnimationComplete={(definition) => {
// //                   if (definition === "center") setCardSettled(true);
// //                 }}
// //                 className="absolute w-full h-full bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col items-center border border-gray-100"
// //                 style={{ padding: 0 }}
// //               >
// //                 {/* Title — fades in after card settles */}
// //                 <motion.h3
// //                   initial={{ opacity: 0, y: -8 }}
// //                   animate={{ opacity: cardSettled ? 1 : 0, y: cardSettled ? 0 : -8 }}
// //                   transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
// //                   className="text-xl md:text-2xl font-[cursive] text-[#2d1b54] text-center leading-tight px-4 md:px-6 pt-5 md:pt-7 pb-2 md:pb-3 w-full"
// //                 >
// //                   {currentProduct.title}
// //                 </motion.h3>

// //                 {/* Image — fills the middle, perfectly contained */}
// //                 <div className="relative w-full flex-1 min-h-0 overflow-hidden">
// //                   <Image
// //                     src={currentProduct.image}
// //                     alt={currentProduct.title}
// //                     fill
// //                     className="object-cover object-center"
// //                     sizes="(max-width: 768px) 240px, 300px"
// //                   />
// //                 </div>

// //                 {/* Description — fades in after card settles */}
// //                 <motion.div
// //                   initial={{ opacity: 0, y: 8 }}
// //                   animate={{ opacity: cardSettled ? 1 : 0, y: cardSettled ? 0 : 8 }}
// //                   transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
// //                   className="px-4 md:px-6 pb-4 md:pb-6 pt-2 md:pt-3 text-center w-full shrink-0"
// //                 >
// //                   <p className="text-xs md:text-sm text-gray-600 leading-snug">{currentProduct.desc}</p>
// //                 </motion.div>
// //               </motion.div>
// //             </AnimatePresence>
// //           </div>

// //           {/* Bottom Controls */}
// //           <div className="absolute bottom-[2%] md:bottom-[10%] w-full flex justify-between px-[5%] md:px-[15%] items-center z-50">
// //             <div className="flex gap-2 md:gap-4 items-center">
// //               <button onClick={prevProduct} className="w-8 h-8 md:w-10 md:h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:scale-110 transition-transform text-[#2d1b54] font-bold">
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
// //               <button onClick={nextProduct} className="w-8 h-8 md:w-10 md:h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:scale-110 transition-transform text-[#2d1b54] font-bold">
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

// import React, { useState, useCallback, useRef } from "react";
// import { motion, Variants, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { cn } from "../../lib/utils";

// // --- Mock Data ---
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

// // --- Product Showcase Data ---
// const PRODUCT_DATA = [
//   {
//     id: 1,
//     tag: "botanical",
//     title: "Botanical Ink Tattoos",
//     desc: "Set of 15 waterproof designs. Lasts 3-5 days. Skin-safe.",
//     price: "$3.99",
//     oldPrice: "$4.99",
//     image: "/assets/images/Card1.png",
//     flavor: "Strawberry",
//     sideImage: "/assets/images/tiktok.svg",
//   },
//   {
//     id: 2,
//     tag: "darkarts",
//     title: "Dark Arts Collection",
//     desc: "Set of 10 waterproof designs. Lasts 3-5 days. Skin-safe.",
//     price: "$4.99",
//     oldPrice: "$6.99",
//     image: "/assets/images/Card2.png",
//     flavor: "Blueberry",
//     sideImage: "/assets/images/tiktok.svg",
//   },
//   {
//     id: 3,
//     tag: "roses",
//     title: "Classic Rose Sets",
//     desc: "Set of 5 waterproof designs. Lasts 3-5 days. Skin-safe.",
//     price: "$2.99",
//     oldPrice: "$3.99",
//     image: "/assets/images/Card8.png",
//     flavor: "Chocolate",
//     sideImage: "/assets/images/tiktok.svg",
//   },
// ];

// // --- Continuous 3D Configuration Generator ---
// const getCardConfig = (diff: number) => {
//   const absDiff = Math.abs(diff);
//   const sign = Math.sign(diff) || 1;

//   if (absDiff === 0) return { x: "0%",          scale: 0.85, rotateY: 0,           z: 0,   zIndex: 1000, opacity: 1    };
//   if (absDiff === 1) return { x: `${sign*95}%`,  scale: 0.85, rotateY: sign * -12,  z: 50,  zIndex: 90,   opacity: 0.95 };
//   if (absDiff === 2) return { x: `${sign*190}%`, scale: 0.9,  rotateY: sign * -28,  z: 100, zIndex: 80,   opacity: 0.8  };
//   if (absDiff === 3) return { x: `${sign*310}%`, scale: 1,    rotateY: sign * -38,  z: 150, zIndex: 70,   opacity: 0.6  };
//   if (absDiff === 4) return { x: `${sign*380}%`, scale: 1.1,  rotateY: sign * -50,  z: 250, zIndex: 60,   opacity: 0    };
//   if (absDiff >= 5)  return { x: `${sign*500}%`, scale: 1.2,  rotateY: sign * -60,  z: 300, zIndex: 50,   opacity: 0    };

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

// // Natural drop-in for the product card wheel
// const wheelVariants: Variants = {
//   enter: (direction: number) => ({
//     x: direction > 0 ? -260 : 260,
//     y: -10,
//     rotate: direction > 0 ? -15 : 15,
//     scale: 0.84,
//     opacity: 0,
//   }),
//   center: {
//     x: 0,
//     y: 0,
//     rotate: 0,
//     scale: 1,
//     opacity: 1,
//     transition: {
//       type: "spring",
//       stiffness: 52,
//       damping: 13,
//       mass: 1.1,
//       opacity: { duration: 0.22, ease: "easeIn" },
//     },
//   },
//   exit: (direction: number) => ({
//     x: direction > 0 ? 260 : -260,
//     y: 55,
//     rotate: direction > 0 ? 15 : -15,
//     scale: 0.84,
//     opacity: 0,
//     transition: {
//       type: "spring",
//       stiffness: 65,
//       damping: 15,
//       opacity: { duration: 0.16, ease: "easeOut" },
//     },
//   }),
// };

// // Staggered content reveal after card finishes settling
// const contentVariants: Variants = {
//   hidden: { opacity: 0, y: 8 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1], delay: i * 0.09 },
//   }),
// };

// export default function HeroSection() {
//   // Original Gallery State
//   const [activeIndex, setActiveIndex] = useState(0);

//   // Product Showcase State
//   const [productIndex, setProductIndex] = useState(0);
//   const [direction, setDirection] = useState(1);
//   // Flips true once the card spring animation completes → triggers content fade-in
//   const [cardSettled, setCardSettled] = useState(true);

//   const sectionRef = useRef<HTMLElement>(null);
//   const isInView = useInView(sectionRef, { amount: 0.2 });

//   // --- Scroll hooks ---
//   const { scrollY } = useScroll();
//   const activeCardY = useTransform(scrollY, [0, 500], [0, 450]);

//   const buttonOpacity       = useTransform(scrollY, [500, 700], [0, 1]);
//   const buttonX             = useTransform(scrollY, [500, 700], [-30, 0]);
//   const buttonPointerEvents = useTransform(scrollY, [500, 699, 700], ["none", "none", "auto"]);
//   const productSectionOpacity = useTransform(scrollY, [300, 600], [0, 1]);

//   const totalCards = GALLERY_IMAGES.length;

//   // Sync gallery active image → product via tag
//   React.useEffect(() => {
//     const activeTag  = GALLERY_IMAGES[activeIndex]?.tag;
//     const matchedIdx = PRODUCT_DATA.findIndex((p) => p.tag === activeTag);
//     if (matchedIdx !== -1 && matchedIdx !== productIndex) {
//       setDirection(matchedIdx > productIndex ? 1 : -1);
//       setCardSettled(false);
//       setProductIndex(matchedIdx);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [activeIndex]);

//   const handleNext = useCallback(() => setActiveIndex((p) => (p + 1) % totalCards), [totalCards]);
//   const handlePrev = useCallback(() => setActiveIndex((p) => (p - 1 + totalCards) % totalCards), [totalCards]);

//   const nextProduct = () => { setDirection(1);  setCardSettled(false); setProductIndex((p) => (p + 1) % PRODUCT_DATA.length); };
//   const prevProduct = () => { setDirection(-1); setCardSettled(false); setProductIndex((p) => (p - 1 + PRODUCT_DATA.length) % PRODUCT_DATA.length); };

//   const currentProduct = PRODUCT_DATA[productIndex];

//   return (
//     <div className="flex flex-col w-full overflow-x-hidden relative bg-[#f8f9fa]">

//       {/* ── TOP SECTION ────────────────────────────────────────────────────────── */}
//       <section
//         ref={sectionRef}
//         className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-10"
//         style={{ zIndex: 10 }}
//       >
//         <motion.div
//           className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto flex-1"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           style={{ perspective: "1500px" }}
//         >
//           {/* Hero Typography */}
//           <div className="flex flex-col items-center justify-center">
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
//               className={cn("text-body text-black/70 max-w-3xl mt-4 z-10 leading-relaxed")}
//             >
//               Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically
//               tested, permanent ink sinks into the top layer of your skin, fully developing into a bold,{" "}
//               <span className="text-[var(--color-brand-orange)] font-medium">
//                 realistic design within 24 hours.
//               </span>
//             </motion.p>
//           </div>

//           {/* ── 3D Gallery ──
//               The gallery wrapper sits at z-20. The scrollbar + CTA below sit at z-10.
//               The center card's inline zIndex is 9999 (not inside z-30 context),
//               so it always paints above the scrollbar/button as it scrolls downward.
//           */}
//           <motion.div
//             className="relative w-full max-w-[1400px] h-[280px] sm:h-[350px] md:h-[400px] flex justify-center items-center z-20 cursor-grab active:cursor-grabbing"
//             style={{
//               perspective: "1500px",
//               transformStyle: "preserve-3d",
//               touchAction: "pan-y",
//             }}
//             onPanEnd={(_, info) => {
//               if (info.offset.x < -50) handleNext();
//               else if (info.offset.x > 50) handlePrev();
//             }}
//           >
//             {GALLERY_IMAGES.map((img, index) => {
//               let diff = index - activeIndex;
//               if (diff > totalCards / 2) diff -= totalCards;
//               if (diff < -totalCards / 2) diff += totalCards;

//               const config   = getCardConfig(diff);
//               const isCenter = diff === 0;

//               return (
//                 <motion.div
//                   key={img.id}
//                   initial={false}
//                   animate={{
//                     opacity: config.opacity,
//                     x: config.x,
//                     scale: config.scale,
//                     rotateY: config.rotateY,
//                     z: config.z,
//                   }}
//                   transition={{ type: "spring", stiffness: 80, damping: 14, mass: 1 }}
//                   whileHover={{
//                     scale: config.scale + 0.05,
//                     opacity: config.opacity > 0 ? 1 : 0,
//                     transition: { duration: 0.4, ease: "easeOut" },
//                   }}
//                   onClick={() => { if (Math.abs(diff) <= 3) setActiveIndex(index); }}
//                   className="absolute origin-center group"
//                   style={{
//                     // ↓ KEY FIX: center card gets zIndex 9999 so it paints above
//                     //   the scrollbar (z-10) and CTA (z-10) as it falls downward.
//                     zIndex: isCenter ? 9999 : config.zIndex,
//                     width: "clamp(140px, 16vw, 220px)",
//                     height: "clamp(200px, 25vw, 340px)",
//                     pointerEvents: Math.abs(diff) > 3 ? "none" : "auto",
//                     y: isCenter ? activeCardY : 0,
//                   }}
//                 >
//                   <div className="relative w-full h-full shadow-2xl rounded-[20px] overflow-hidden border border-[var(--color-brand-orange)]/30 hover:border-[var(--color-brand-orange)] bg-black/40 backdrop-blur-sm">
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-10 transition-opacity duration-500" />
//                     <Image
//                       src={img.src}
//                       alt={img.alt}
//                       fill
//                       className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
//                       sizes="(max-width: 768px) 30vw, 20vw"
//                       priority={isCenter}
//                     />
//                   </div>

//                   {isCenter && (
//                     <motion.div
//                       style={{ opacity: buttonOpacity, x: buttonX, pointerEvents: buttonPointerEvents }}
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

//           {/* Scrollbar — z-10 so center card (z-9999) always paints above it */}
//           <motion.div
//             variants={textVariants}
//             className="w-full max-w-[250px] md:max-w-[300px] mb-8 relative flex items-center justify-center"
//             style={{ zIndex: 10 }}
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

//           {/* CTA — z-10 same reasoning */}
//           <motion.div
//             variants={textVariants}
//             className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 relative mt-auto md:mt-0"
//             style={{ zIndex: 10 }}
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

//       {/* ── BOTTOM SECTION: PRODUCT SHOWCASE ──────────────────────────────────── */}
//       <section className="relative w-full min-h-screen flex items-center justify-center pt-20 pb-32">
//         <motion.div
//           className="relative w-full max-w-[1000px] aspect-square md:aspect-video flex items-center justify-center"
//           style={{ opacity: productSectionOpacity }}
//         >
//           {/* Background Circular Ring */}
//           <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full border border-gray-300/50 flex items-center justify-center z-0">
//             <span className="absolute top-4 md:top-10 text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">Easy to Apply</span>
//             <span className="absolute bottom-4 md:bottom-10 text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">Peel Off</span>
//             <span className="absolute left-4 md:left-10 -rotate-90 text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">Apply</span>
//             <span className="absolute right-4 md:right-10 rotate-90 text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">Feel It</span>
//           </div>

//           {/* Top Pill Header */}
//           <div className="absolute top-[5%] left-1/2 -translate-x-1/2 bg-[#8C52FF] text-white px-6 py-2.5 rounded-full flex gap-12 items-center shadow-lg z-30">
//             <button className="text-xl hover:scale-110 transition-transform">≡</button>
//             <button className="text-xl hover:scale-110 transition-transform">🛒</button>
//           </div>

//           {/* ── Sale Badge — fades in after card settles ── */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={`sale-${currentProduct.id}`}
//               initial={{ opacity: 0, x: -16, rotate: -12 }}
//               animate={
//                 cardSettled
//                   ? { opacity: 1, x: 0,   rotate: -12, transition: { duration: 0.42, ease: [0.16,1,0.3,1], delay: 0.14 } }
//                   : { opacity: 0, x: -16, rotate: -12, transition: { duration: 0.18 } }
//               }
//               exit={{ opacity: 0, x: -16, rotate: -12, transition: { duration: 0.16 } }}
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

//           {/* Floating Right Element */}
//           <div className="absolute right-[5%] md:right-[10%] top-[35%] z-20 hover:scale-105 transition-transform">
//             <div className="bg-white/60 backdrop-blur-xl w-32 h-32 md:w-48 md:h-48 rounded-3xl shadow-xl border border-white/50 flex items-center justify-center relative">
//               <Image
//                 src={currentProduct.sideImage}
//                 alt="Flavor"
//                 width={80}
//                 height={80}
//                 className="object-contain hover:rotate-180 transition-transform duration-700 w-[60px] md:w-[100px]"
//               />
//               <span className="absolute top-2 right-2 md:top-4 md:right-4 text-[#2d1b54] text-lg md:text-2xl font-bold rotate-45">↘</span>
//               <span className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-[#2d1b54] text-lg md:text-2xl font-bold -rotate-[135deg]">↘</span>
//             </div>
//           </div>

//           {/* ── Center Product Card ─────────────────────────────────────────────
//               Layout:  [title shrink-0] | [image flex-1 min-h-0] | [desc shrink-0]
//               The image div uses flex-1 + min-h-0 so it fills exactly the remaining
//               vertical space — no gaps, no overflow. object-cover fills it cleanly.

//               onAnimationComplete("center") → setCardSettled(true) → content fades in.
//           ─────────────────────────────────────────────────────────────────────── */}
//           <div className="relative z-40 flex items-center justify-center w-[220px] h-[340px] md:w-[290px] md:h-[440px]">
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
//                 style={{ boxShadow: "0 20px 56px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.07)" }}
//               >
//                 {/* Title */}
//                 <motion.div
//                   className="shrink-0 px-4 pt-5 pb-2 text-center"
//                   custom={0}
//                   variants={contentVariants}
//                   initial="hidden"
//                   animate={cardSettled ? "visible" : "hidden"}
//                 >
//                   <h3 className="text-base md:text-xl font-[cursive] text-[#2d1b54] leading-tight">
//                     {currentProduct.title}
//                   </h3>
//                 </motion.div>

//                 {/* Image — flex-1 min-h-0 is the key: fills remaining space exactly */}
//                 <div className="relative flex-1 min-h-0 w-full">
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
//                   className="shrink-0 px-4 pt-2 pb-4 text-center bg-white"
//                   custom={1}
//                   variants={contentVariants}
//                   initial="hidden"
//                   animate={cardSettled ? "visible" : "hidden"}
//                 >
//                   <p className="text-[11px] md:text-xs text-gray-500 leading-snug">
//                     {currentProduct.desc}
//                   </p>
//                 </motion.div>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Bottom Controls */}
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

// import React from "react";
// import Image from "next/image";
// import { motion , Variants} from "framer-motion";
// import { MousePointer2, Anchor, PenTool, MoveRight } from "lucide-react";

// const features = [
//   {
//     icon: <PenTool className="w-6 h-6" />,
//     title: "DESIGN CURATION",
//     subtitle: "Tattooing",
//     description: "Our team curates intricate artist-driven designs into high-fidelity, premium temporary tattoo films.",
//   },
//   {
//     icon: <Anchor className="w-6 h-6" />,
//     title: "PLACEMENT GUIDES",
//     subtitle: "Piercing",
//     description: "Discover ideal temporary placement for maximum impact with our expert-led placement guides.",
//   },
//   {
//     icon: <MousePointer2 className="w-6 h-6" />,
//     title: "ARTIST PRINTS",
//     subtitle: "Tattoo Design",
//     description: "Submit your custom art or photos to create a one-of-a-kind temporary decal with professional finish.",
//   },
// ];

// const fadeInVertical:Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { 
//     opacity: 1, 
//     y: 0, 
//     transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
//   },
// };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.2 },
//   },
// };

// export default function AboutSection() {
//   return (
//     <section className="relative min-h-screen w-full bg-[var(--background)] py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
//       {/* Background Decorative Element */}
//       <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
//         <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[var(--primary)] blur-[120px]" />
//       </div>

//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <motion.div 
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={fadeInVertical}
//           className="text-center mb-20"
//         >
//           <span className="text-[var(--primary)] font-medium tracking-[0.3em] text-sm uppercase mb-4 block">
//             Our Expertise
//           </span>
//           <h2 className="text-4xl md:text-6xl font-bold text-[var(--foreground)] tracking-tight">
//             WHAT WE DO
//           </h2>
//         </motion.div>

//         {/* Top Features Grid */}
//         <motion.div 
//           variants={staggerContainer}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32"
//         >
//           {features.map((item, index) => (
//             <motion.div 
//               key={index}
//               variants={fadeInVertical}
//               whileHover={{ y: -10 }}
//               className="group flex flex-col items-center text-center p-8 rounded-2xl transition-all duration-500 hover:bg-[var(--accent-soft)]/10"
//             >
//               <div className="mb-6 p-4 rounded-full bg-[var(--primary)]/5 text-[var(--primary)] group-hover:scale-110 transition-transform duration-500">
//                 {item.icon}
//               </div>
//               <span className="italic font-serif text-[var(--secondary)] mb-1 opacity-80">{item.subtitle}</span>
//               <h3 className="text-xl font-bold tracking-wider mb-4 text-[var(--foreground)] uppercase">
//                 {item.title}
//               </h3>
//               <p className="text-[var(--foreground-muted)] leading-relaxed text-sm max-w-xs">
//                 {item.description}
//               </p>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Bottom "About" Section with Vertical Text & Circle */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-16 border-t border-[var(--foreground)]/10">
          
//           {/* Vertical Title Component */}
//           <div className="hidden lg:flex lg:col-span-1 justify-center">
//             <motion.h2 
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               className="text-5xl font-black text-[var(--foreground)] opacity-20 whitespace-nowrap uppercase tracking-tighter"
//               style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
//             >
//               JUST TATTOOS
//             </motion.h2>
//           </div>

//           {/* Circle Image with Modern Shadow */}
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.8 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1, ease: "circOut" }}
//             className="lg:col-span-5 flex justify-center relative group"
//           >
//             <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-[12px] border-[var(--background)] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] z-10">
//               <Image
//                 src="/path-to-your-tattoo-image.jpg" // Update with your image path
//                 alt="Tattoo Application"
//                 fill
//                 className="object-cover transition-transform duration-700 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//             </div>
//             {/* Soft Shadow Ring */}
//             <div className="absolute -inset-4 border border-[var(--primary)]/10 rounded-full scale-105 animate-pulse" />
//           </motion.div>

//           {/* About Us Content */}
//           <motion.div 
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.3 }}
//             className="lg:col-span-6 flex flex-col items-start lg:pl-12"
//           >
//             <h3 className="text-4xl font-serif italic text-[var(--foreground)] mb-6">About Us</h3>
//             <p className="text-lg text-[var(--foreground-muted)] leading-relaxed mb-8 max-w-lg">
//               There is an easy reflection of peace of London town normally, but the majority here collect devotion to some by inspired fragments or going for less a concept of outer version yet used to be one there sent omitting embracing within in the cattle of rock, till.
//             </p>
            
//             <motion.button 
//               whileHover={{ x: 10 }}
//               className="group flex items-center gap-4 bg-[var(--primary)] text-[var(--primary-foreground)] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all hover:bg-[var(--primary-hover)] shadow-lg"
//             >
//               Read Our Story
//               <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";
// import React, { useState, useMemo } from 'react';
// import { Filter, ChevronRight } from 'lucide-react';
// import FilterSidebar from '@/src/components/shared/FilterSidebar';
// import ProductLayout from '@/src/components/shared/ProductLayout';
// import TattooMarquee from '@/src/components/shared/TattooMarquee';

// const CATEGORIES = ["All", "Abstract", "Floral", "Geometric", "Traditional", "Japanese Art", "Tribal Art", "Animal"];
// const BODY_PARTS = ["All", "Arm", "Back", "Leg", "Chest", "Sleeve", "Spine", "Hand"];
// const SIZES = ["All", "Small", "Medium", "Large"];

// const DUMMY_PRODUCTS = Array.from({ length: 45 }).map((_, i) => ({
//   id: `prod-${i}`,
//   name: `Curated Ink ${i + 1}`,
//   price: 25.00 + (i * 2),
//   category: CATEGORIES[(i % (CATEGORIES.length - 1)) + 1],
//   bodyPart: BODY_PARTS[(i % (BODY_PARTS.length - 1)) + 1],
//   size: SIZES[(i % (SIZES.length - 1)) + 1],
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

//   const currentFilterData = useMemo<Record<string, string[]>>(() => {
//     if (activeMasterCategory === "All") {
//       return { "STYLES": CATEGORIES.slice(1), "BODY PART": BODY_PARTS.slice(1) };
//     }
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

//   const filteredProducts = useMemo(() => {
//     return DUMMY_PRODUCTS.filter(product => {
//       const matchesMaster = activeMasterCategory === "All" || 
//                             product.category === activeMasterCategory || 
//                             product.bodyPart === activeMasterCategory ||
//                             product.size === activeMasterCategory;
                            
//       if (!matchesMaster) return false;

//       const matchesStyle = activeFilters["STYLES"]?.length === 0 || activeFilters["STYLES"]?.includes(product.category);
//       const matchesPart = activeFilters["BODY PART"]?.length === 0 || activeFilters["BODY PART"]?.includes(product.bodyPart);

//       return matchesStyle && matchesPart;
//     });
//   }, [activeMasterCategory, activeFilters]);

//   const handleCategorySelect = (category: string) => {
//     setActiveMasterCategory(category);
//     setActiveFilters({ "BODY PART": [], "STYLES": [] });
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div className="min-h-screen bg-white font-['Montserrat',sans-serif] text-gray-900">
      
//       {/* 1. HERO & MARQUEE - Visible on the 'All' page */}
//       {activeMasterCategory === "All" && (
//         <div className="fade-in flex flex-col w-full">
          
//           {/* Banner with Image */}
//           <section className="relative w-full h-[40vh] min-h-[350px] md:h-[50vh] flex flex-col items-center justify-center overflow-hidden">
//             {/* Background Image */}
//             <img 
//               src="https://images.unsplash.com/photo-1598371839696-5e5bb00d0d10?auto=format&fit=crop&q=80&w=2000" 
//               alt="The Archives Banner" 
//               className="absolute inset-0 w-full h-full object-cover object-center"
//             />
//             {/* Dark overlay to make text readable */}
//             <div className="absolute inset-0 bg-black/50 z-0"></div>
            
//             {/* Text Content */}
//             <div className="relative z-10 text-center px-4">
//               <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4 drop-shadow-md">
//                 Collection
//               </h1>
//               <p className="text-white/90 uppercase tracking-[0.2em] text-sm md:text-base font-medium">
//                 Shop All
//               </p>
//             </div>
//           </section>
          
//           <TattooMarquee handleCategorySelect={handleCategorySelect} />
//         </div>
//       )}

//       {/* 2. MAIN PRODUCT SECTION */}
//       <section id="product-section" className="py-16 mt-10 bg-white min-h-screen">
//         <div className="max-w-7xl mx-auto px-4 md:px-8">
          
//           {/* Breadcrumbs */}
//           {activeMasterCategory !== "All" ? (
//             <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-8 text-gray-400">
//               <button 
//                 onClick={() => handleCategorySelect("All")} 
//                 className="hover:text-black transition-colors"
//               >
//                 Shop All
//               </button>
//               <ChevronRight size={14} />
//               <span className="text-black">{activeMasterCategory}</span>
//             </div>
//           ) : (
//              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-8 text-black">
//                <span>All Designs</span>
//              </div>
//           )}

//           {/* Header & Mobile Filter Toggle */}
//           <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
//             <div>
//               <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-gray-900">
//                 {activeMasterCategory === "All" ? "Complete Collection" : `${activeMasterCategory} Collection`}
//               </h2>
//             </div>
            
//             <button 
//               onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
//               className="lg:hidden flex items-center justify-center gap-2 border border-gray-300 px-6 py-3 uppercase font-bold text-sm tracking-wider w-full md:w-auto hover:bg-black hover:text-white transition-colors rounded-sm"
//             >
//               <Filter size={18} /> Filters
//             </button>
//           </div>

//           {/* Sidebar & Products Grid */}
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
//                 <div className="text-center py-32 text-gray-500 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-xl bg-gray-50">
//                   <p className="text-xl font-medium mb-4 text-gray-700">No designs found matching your criteria.</p>
//                   <button 
//                     onClick={() => setActiveFilters({ "BODY PART": [], "STYLES": [] })}
//                     className="border border-black bg-white px-6 py-3 uppercase text-sm font-bold hover:bg-black hover:text-white transition-colors rounded-sm shadow-sm"
//                   >
//                     Clear Filters
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// }

