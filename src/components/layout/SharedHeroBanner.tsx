"use client";

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

// 1. Define a strict interface for Props
interface SharedHeroBannerProps {
  image?: string;
  mobileImage?: string;
  title?: string;
  textColor?: string;
  useMobileImage?: boolean;
  priority?: boolean; // Added for LCP optimization
}

// 2. Define Animation Variants with Types
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12, // Slightly faster stagger for snappier feel
      delayChildren: 0.2,
    },
  },
};

const textVariants: Variants = {
  hidden: { y: '105%' }, // 105% ensures no "bleeding" pixels at the edge
  visible: {
    y: '0%',
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a premium feel
    },
  },
};

const imageFadeVariants: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 1.4, ease: "easeOut" } 
  }
};

export default function SharedHeroBanner({
  image = "/assets/images/NewArrivalsHeroDesktop.png",
  mobileImage = "/assets/images/NewArrivalMobile.png",
  title = "New Arrivals",
  textColor = "#FE8204",
  useMobileImage = true,
  priority = true, // Hero sections should almost always be priority
}: SharedHeroBannerProps) {
  
  const words = title.split(' ');

  return (
    <section className="w-full bg-white flex justify-center py-6 px-4 sm:px-6 lg:px-8 font-['Almarena']">
      <div className="relative w-full max-w-[1312px] mx-auto flex flex-col md:block">
        
        {/* --- Image Container --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={imageFadeVariants}
          className="relative w-full h-[564px] md:h-[635px] rounded-[30px] overflow-hidden bg-gray-100"
        >
          {/* Mobile Image */}
          {useMobileImage && (
            <div className="md:hidden relative w-full h-full">
              <Image
                src={mobileImage}
                alt={`${title} mobile`}
                fill
                priority={priority}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 10vw"
              />
            </div>
          )}

          {/* Desktop Image */}
          <div className={`${useMobileImage ? 'hidden md:block' : 'block'} relative w-full h-full`}>
            <Image
              src={image}
              alt={`${title} desktop`}
              fill
              priority={priority}
              className="object-cover"
              sizes="(max-width: 1312px) 100vw, 1312px"
            />
          </div>
        </motion.div>

        {/* --- Text Overlay Container --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="
            flex flex-col 
            mt-6 md:mt-0 
            md:absolute md:left-10 md:bottom-20 /* Adjusted for better visual balance */
            z-10 pointer-events-none
          "
        >
          {words.map((word, index) => (
            <div key={`${word}-${index}`} className="overflow-hidden pb-1 md:pb-2">
              <motion.h2
                variants={textVariants}
                className="font-bold uppercase text-[15vw] md:text-[140px] leading-[0.8] tracking-tighter m-0 p-0"
                style={{ color: textColor }}
              >
                {word}
              </motion.h2>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}