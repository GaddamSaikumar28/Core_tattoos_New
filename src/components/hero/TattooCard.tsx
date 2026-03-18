// // components/hero/TattooCard.tsx
// 'use client';

// import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
// import Image from 'next/image';
// import { useState } from 'react';

// interface TattooCardProps {
//   src: string;
//   className?: string;
//   style?: any;
// }

// export const TattooCard = ({ src, className = '', style }: TattooCardProps) => {
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);

//   const mouseXSpring = useSpring(x);
//   const mouseYSpring = useSpring(y);

//   const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
//   const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

//   const [isHovered, setIsHovered] = useState(false);

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const width = rect.width;
//     const height = rect.height;
//     const mouseX = e.clientX - rect.left;
//     const mouseY = e.clientY - rect.top;
//     const xPct = mouseX / width - 0.5;
//     const yPct = mouseY / height - 0.5;
//     x.set(xPct);
//     y.set(yPct);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//     x.set(0);
//     y.set(0);
//   };

//   return (
//     <motion.div
//       style={{ rotateX, rotateY, transformStyle: "preserve-3d", ...style }}
//       onMouseMove={handleMouseMove}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={handleMouseLeave}
//       className={`relative w-[200px] h-[300px] md:w-[240px] md:h-[360px] rounded-2xl overflow-hidden shadow-2xl border border-neutral-800/50 bg-neutral-900 ${className}`}
//     >
//       <Image
//         src={src}
//         alt="Tattoo art"
//         fill
//         sizes="(max-width: 768px) 200px, 240px"
//         className="object-cover pointer-events-none"
//         placeholder="blur"
//         blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
//       />
//       {/* Glass Reflection Highlight */}
//       <motion.div 
//         className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none mix-blend-overlay"
//         animate={{ opacity: isHovered ? 1 : 0.3 }}
//       />
//     </motion.div>
//   );
// };


"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { cn } from "../../lib/utils"; // Assuming you have a standard cn utility

const GALLERY_IMAGES = [
  { id: 1, src: "/assets/images/Card1.png", alt: "Spider tattoo blackwork" },
  { id: 2, src: "/assets/images/Card2.png", alt: "Snake and dagger tattoo" },
  { id: 3, src: "/assets/images/Card3.png", alt: "Tattoo artist portrait" },
  { id: 4, src: "/assets/images/Card4.png", alt: "Spiked flail leg tattoo" },
  { id: 5, src: "/assets/images/Card5.png", alt: "Skull and crossbones tattoo" },
  { id: 6, src: "/assets/images/Card6.png", alt: "Skull and crossbones tattoo" },
  { id: 7, src: "/assets/images/Card7.png", alt: "Skull and crossbones tattoo" },
  { id: 8, src: "/assets/images/Card8.png", alt: "Rose tattoo design" },
  { id: 9, src: "/assets/images/Card3.png", alt: "Dragon back piece" },
  { id: 10, src: "/assets/images/Card4.png", alt: "Dragon back piece" },
];

const totalCards = GALLERY_IMAGES.length;

// --- 1. Pre-calculate the fixed 3D slots exactly ONCE ---
const SLOT_CONFIGS = Array.from({ length: totalCards }).map((_, index) => {
  let diff = index;
  if (diff > totalCards / 2) diff -= totalCards;
  
  const absDiff = Math.abs(diff);
  const sign = Math.sign(diff) || 1; 

  // Pushing 'z' into the negative naturally handles depth sorting—no zIndex needed!
  if (absDiff === 0) return { x: "0%", scale: 1, rotateY: 0, z: 0, opacity: 1 };
  if (absDiff === 1) return { x: `${sign * 85}%`, scale: 0.85, rotateY: sign * -12, z: -50, opacity: 0.95 };
  if (absDiff === 2) return { x: `${sign * 170}%`, scale: 0.75, rotateY: sign * -28, z: -100, opacity: 0.8 };
  if (absDiff === 3) return { x: `${sign * 260}%`, scale: 0.65, rotateY: sign * -38, z: -150, opacity: 0.6 };
  if (absDiff === 4) return { x: `${sign * 380}%`, scale: 0.5, rotateY: sign * -50, z: -250, opacity: 0 };
  if (absDiff >= 5) return { x: `${sign * 500}%`, scale: 0.5, rotateY: sign * -60, z: -300, opacity: 0 };

  return { x: "0%", scale: 0.5, opacity: 0 }; 
});

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function HeroSection() {
  const [images, setImages] = useState(GALLERY_IMAGES);

  const handleNext = useCallback(() => {
    setImages((prev) => {
      const newArr = [...prev];
      newArr.push(newArr.shift()!); // Move first image to the end
      return newArr;
    });
  }, []);

  const handlePrev = useCallback(() => {
    setImages((prev) => {
      const newArr = [...prev];
      newArr.unshift(newArr.pop()!); // Move last image to the front
      return newArr;
    });
  }, []);

  const handleCardClick = (clickedIndex: number) => {
    let diff = clickedIndex;
    if (diff > totalCards / 2) diff -= totalCards;
    
    if (diff === 0 || Math.abs(diff) > 3) return; // Ignore center or hidden cards

    setImages((prev) => {
      const newArr = [...prev];
      if (diff > 0) {
        for (let i = 0; i < diff; i++) newArr.push(newArr.shift()!);
      } else {
        for (let i = 0; i < Math.abs(diff); i++) newArr.unshift(newArr.pop()!);
      }
      return newArr;
    });
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center pt-32 pb-10 bg-gradient-to-b from-black to-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center z-0">
        {/* <div className="absolute top-[-15%] w-[90%] h-[60%] bg-[var(--color-brand-orange)]/10 blur-[140px] rounded-full" /> */}
      </div>

<div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center z-0">
         <div className="absolute top-[-15%] w-[90%] h-[60%] bg-white/5 blur-[140px] rounded-full" />
       <div
         className="absolute inset-0 opacity-30 mix-blend-overlay"
         style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}
         />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto flex-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center justify-center">
          <motion.h1
            variants={textVariants}
            className={cn(
              "font-heading text-white tracking-tight z-10 flex flex-col text-left",
              "text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]" 
            )}
          >
            <span>REAL INK</span>
            <span className="ml-[1.6em]">YOUR WAY.</span>
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="text-body text-white/70 max-w-3xl mt-4 z-10 leading-relaxed"
          >
            Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically tested, permanent ink sinks into the top layer of your skin, fully developing into a bold,{" "}
            <span className="text-[var(--color-brand-orange)] font-medium">realistic design within 24 hours.</span>
          </motion.p>
        </div>

        <motion.div
          className="relative w-full max-w-[1400px] h-[280px] sm:h-[350px] md:h-[400px] flex justify-center items-center mb-12 z-20 cursor-grab active:cursor-grabbing"
          style={{ perspective: "1500px", transformStyle: "preserve-3d", touchAction: "pan-y" }}
          onPanEnd={(e, info) => {
            const swipeThreshold = 50;
            if (info.offset.x < -swipeThreshold) handleNext(); 
            else if (info.offset.x > swipeThreshold) handlePrev(); 
          }}
        >
          {images.map((img, index) => {
            const config = SLOT_CONFIGS[index];
            const isCenter = index === 0;
            const isVisible = config.opacity > 0;

            return (
              <motion.div
                key={img.id}
                initial={false}
                animate={{
                  opacity: config.opacity,
                  x: config.x,
                  y: 0,
                  scale: config.scale,
                  rotateY: config.rotateY,
                  z: config.z, // Natural 3D depth sorting
                }}
                transition={{
                  type: "spring", 
                  stiffness: 100,
                  damping: 15,
                  mass: 1,
                }}
                whileHover={{
                  scale: isVisible && isCenter ? 1.05 : config.scale, 
                  y: isVisible && isCenter ? -15 : 0,
                  transition: { duration: 0.3 },
                }}
                onClick={() => handleCardClick(index)}
                className="absolute origin-center shadow-2xl rounded-[20px] overflow-hidden border border-[var(--color-brand-orange)]/30 hover:border-[var(--color-brand-orange)] bg-black/40 backdrop-blur-sm group"
                style={{
                  width: "clamp(140px, 16vw, 220px)",
                  height: "clamp(200px, 25vw, 340px)",
                  pointerEvents: isVisible ? "auto" : "none",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-10 transition-opacity duration-500" />
                
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
                  sizes="(max-width: 768px) 30vw, 20vw"
                  priority={isCenter}
                />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={textVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 z-30 relative mt-auto md:mt-0">
          <button className="font-[family-name:var(--font-montserrat)] bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 text-sm md:text-base">
            Book an Appointment
          </button>
          <button className="font-[family-name:var(--font-montserrat)] bg-transparent text-white/80 border border-white/30 px-8 py-3.5 rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white transition-all duration-300 text-sm md:text-base">
            View The Flash Book
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}