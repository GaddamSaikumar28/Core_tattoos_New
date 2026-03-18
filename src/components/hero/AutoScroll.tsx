

"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, Variants, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "../../lib/utils"; // Ensure this path matches your utils.js file

// --- Mock Data ---
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

// --- Continuous 3D Configuration Generator ---
const getCardConfig = (diff: number) => {
  const absDiff = Math.abs(diff);
  const sign = Math.sign(diff) || 1;

  if (absDiff === 0) return { x: "0%", scale: 0.85, rotateY: 0, z: 0, zIndex: 10, opacity: 1 };
  if (absDiff === 1) return { x: `${sign * 95}%`, scale: 0.85, rotateY: sign * -12, z: 50, zIndex: 20, opacity: 0.95 };
  if (absDiff === 2) return { x: `${sign * 190}%`, scale: 0.9, rotateY: sign * -28, z: 100, zIndex: 30, opacity: 0.8 };
  if (absDiff === 3) return { x: `${sign * 290}%`, scale: 0.95, rotateY: sign * -38, z: 150, zIndex: 40, opacity: 0.6 };
  if (absDiff === 4) return { x: `${sign * 380}%`, scale: 1.1, rotateY: sign * -50, z: 250, zIndex: 50, opacity: 0 };
  if (absDiff >= 5) return { x: `${sign * 500}%`, scale: 1.2, rotateY: sign * -60, z: 300, zIndex: 60, opacity: 0 };

  return { x: "0%", scale: 0.8, opacity: 0 }; 
};

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); 
  
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2 }); 

  // --- Scroll Animation Hooks ---
  const { scrollY } = useScroll();
  // Maps the window scroll from 0px-1000px to a Y-axis translation of 0px-800px on the card.
  // Tweak the second array [0, 800] to make it fall faster or slower.
  const activeCardY = useTransform(scrollY, [0, 1000], [0, 800]);

  const totalCards = GALLERY_IMAGES.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalCards);
  }, [totalCards]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  }, [totalCards]);

  useEffect(() => {
    if (isPaused || !isInView) return; 
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [handleNext, isPaused, isInView]);

  return (
    <section 
      ref={sectionRef}
      // CRITICAL: Changed 'overflow-hidden' to 'overflow-x-hidden' so the falling card isn't clipped at the bottom
    //   bg-gradient-to-b from-[#000000] via-[#1a1a1a] to-[#ffffff]
      className="relative w-full min-h-screen overflow-x-hidden flex flex-col items-center justify-center pt-32 pb-10 bg-white "
    >
      {/* Background Effects */}
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
        {/* --- Hero Typography --- */}
        <div className="flex flex-col items-center justify-center">
          <motion.h1
            variants={textVariants}
            className={cn(
              "font-heading text-black tracking-tight z-10 flex flex-col text-left",
              "text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]" 
            )}
          >
            <span>REAL INK</span>
            <span className="ml-[1.6em]">YOUR WAY.</span>
          </motion.h1>

          <motion.p
            variants={textVariants}
            className={cn(
              "text-body text-black/70 max-w-3xl mt-4 z-10 leading-relaxed"
            )}
          >
            Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically tested, permanent ink sinks into the top layer of your skin, fully developing into a bold,{" "}
            <span className="text-[var(--color-brand-orange)] font-medium">realistic design within 24 hours.</span>
          </motion.p>
        </div>

        {/* --- Interactive Concave 3D Gallery --- */}
        <motion.div
          className="relative w-full max-w-[1400px] h-[280px] sm:h-[350px] md:h-[400px] flex justify-center items-center mt-8 mb-6 z-20 cursor-grab active:cursor-grabbing"
          style={{ 
            perspective: "1500px", 
            transformStyle: "preserve-3d",
            touchAction: "pan-y" 
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onPanEnd={(e, info) => {
            const swipeThreshold = 50;
            if (info.offset.x < -swipeThreshold) {
              handleNext(); 
            } else if (info.offset.x > swipeThreshold) {
              handlePrev(); 
            }
          }}
        >
          {GALLERY_IMAGES.map((img, index) => {
            let diff = index - activeIndex;
            if (diff > totalCards / 2) diff -= totalCards;
            if (diff < -totalCards / 2) diff += totalCards;

            const config = getCardConfig(diff);
            const isCenter = Math.abs(diff) === 0;

            return (
              <motion.div
                key={img.id}
                initial={false}
                // REMOVED 'y: 0' from animate so it doesn't fight with our scroll transform
                animate={{
                  opacity: config.opacity,
                  x: config.x,
                  scale: config.scale,
                  rotateY: config.rotateY,
                  z: config.z,
                }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 14,
                  mass: 1,
                }}
                whileHover={{
                  scale: config.scale + 0.05,
                  // REMOVED 'y: -15' here as well, to prevent glitchy snapping if the user hovers while scrolling
                  opacity: config.opacity > 0 ? 1 : 0, 
                  transition: { duration: 0.4, ease: "easeOut" },
                }}
                onClick={() => {
                  if (Math.abs(diff) <= 3) setActiveIndex(index);
                }}
                className="absolute origin-center shadow-2xl rounded-[20px] overflow-hidden border border-[var(--color-brand-orange)]/30 hover:border-[var(--color-brand-orange)] bg-black/40 backdrop-blur-sm group"
                style={{
                  zIndex: config.zIndex,
                  width: "clamp(140px, 16vw, 220px)",
                  height: "clamp(200px, 25vw, 340px)",
                  pointerEvents: Math.abs(diff) > 3 ? "none" : "auto",
                  // Apply the scroll transform ONLY if it's the center card. Otherwise, lock to 0.
                  y: isCenter ? activeCardY : 0, 
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

        {/* --- Manual Scrollbar --- */}
        <motion.div 
          variants={textVariants}
          className="w-full max-w-[250px] md:max-w-[300px] mb-8 z-30 relative flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <input
            type="range"
            min={0}
            max={totalCards - 1}
            value={activeIndex}
            onChange={(e) => setActiveIndex(Number(e.target.value))}
            className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer outline-none transition-all
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.8)]
              [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full
              hover:bg-white/30"
            aria-label="Gallery Scrollbar"
          />
        </motion.div>

        {/* --- Call To Actions --- */}
        <motion.div
          variants={textVariants}
          className="flex flex-col sm:flex-row items-center color-black justify-center gap-4 sm:gap-6 z-30 relative mt-auto md:mt-0"
        >
          <button 
            className={cn(
              "font-[family-name:var(--font-montserrat)] bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 text-sm md:text-base"
            )}
          >
            Order Now
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}