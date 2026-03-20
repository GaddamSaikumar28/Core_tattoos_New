
"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { MousePointer2, Anchor, PenTool, MoveRight } from "lucide-react";

const features = [
  {
    icon: <PenTool strokeWidth={1.5} className="w-8 h-8" />,
    subtitle: "Curation",
    title: "PREMIUM DESIGNS",
    description: "Our team transforms intricate, artist-driven artwork into high-fidelity temporary tattoo films.",
  },
  {
    icon: <Anchor strokeWidth={1.5} className="w-8 h-8" />,
    subtitle: "Application",
    title: "EXPERT PLACEMENT",
    description: "Discover the ideal spots for maximum visual impact with our specialized placement guides.",
  },
  {
    icon: <MousePointer2 strokeWidth={1.5} className="w-8 h-8" />,
    subtitle: "Customization",
    title: "PERSONAL PRINTS",
    description: "Submit your own art or photography to create one-of-a-kind decals with a professional, matte finish.",
  },
];

// --- Animation Variants ---
const fadeInVertical: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function WhatWeDoSection() {
  return (
    <section className="relative w-full bg-[var(--color-white)] py-16 px-6 md:px-10 lg:px-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* --- Header Section --- */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInVertical}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading text-[var(--color-black)] tracking-tight">
            WHAT WE DO
          </h2>
        </motion.div>

        {/* --- Top Features Grid --- */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-20"
        >
          {features.map((item, index) => (
            <motion.div 
              key={index}
              variants={fadeInVertical}
              whileHover={{ y: -4 }}
              className="group flex flex-col items-center text-center transition-all duration-300 cursor-default"
            >
              <div className="mb-4 text-[var(--color-brand-orange)] transition-transform duration-500 ease-out group-hover:scale-110">
                {item.icon}
              </div>
              <span className=" text-lg text-[var(--color-secondary)] opacity-80 mb-1 capitalize tracking-wide">
                {item.subtitle}
              </span>
              <h3 className="text-xl font-heading mb-3 text-[var(--color-black)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* --- Bottom "About" Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Vertical Title Component (Hidden on Mobile) */}
          <div className="hidden lg:flex lg:col-span-2 justify-center relative">
            <motion.h2 
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-3xl xl:text-4xl font-heading text-[var(--color-black)] whitespace-nowrap tracking-widest pointer-events-none select-none opacity-90"
            >
              JUST TATTOOS
            </motion.h2>
          </div>

          {/* Circular Image with Solid Offset Shadow */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:col-span-4 flex justify-center relative z-10"
          >
            <div className="relative w-[260px] h-[260px] md:w-[360px] md:h-[360px]">
              {/* Hard Circular Shadow Offset */}
              <div className="absolute top-[4%] left-[4%] w-full h-full rounded-full bg-[var(--color-brand-orange)] shadow-lg -z-10 transition-transform duration-500 hover:translate-x-1 hover:translate-y-1" />
              
              {/* Main Image */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-[4px] border-[var(--color-white)] bg-gray-100 z-10 shadow-sm">
                <Image
                  src="/assets/images/Card7.png"
                  alt="Temporary Tattoo Application"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 260px, 360px"
                />
              </div>
            </div>
          </motion.div>

          {/* About Us Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left lg:pl-8"
          >
            <h3 className=" text-2xl md:text-3xl text-[var(--color-black)] mb-4 tracking-wide">
              Our Story
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-8 leading-relaxed max-w-lg">
              We believe self-expression shouldn't have to be permanent unless you want it to be. 
              By bridging the gap between high-end artistry and everyday wear, we bring you hyper-realistic 
              decals that look and feel authentic. Whether you are test-driving a new design or just switching 
              up your style for the weekend, our premium films guarantee a flawless finish every time.
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--color-brand-orange)] to-[var(--color-primary)] text-[var(--color-white)] text-sm font-semibold px-6 py-3 rounded shadow-md hover:shadow-lg transition-all duration-300"
            >
              READ MORE
              <MoveRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}