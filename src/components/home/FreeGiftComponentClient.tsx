"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FreeGiftComponentClient({ data }: { data: any }) {
  return (
    <section className="bg-white w-full overflow-hidden px-4 py-16 md:px-8 lg:px-16 md:py-24 relative">
      <div className="max-w-[1312px] mx-auto">
        
        {/* Text Header Section */}
        <div className="mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl text-black font-bold uppercase leading-tight">
            {data.headerTitle}
          </h2>
          <p className="text-base md:text-lg font-medium text-gray-600 mt-4 md:mt-6 max-w-4xl leading-relaxed whitespace-pre-line">
            {data.headerDescription}
          </p>
          <p className="text-base md:text-lg font-bold text-[#FE8204] mt-3">
            {data.headerSubtext}
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
            <Image 
              src={data.image} 
              alt={data.headerTitle} 
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
            className="w-full md:w-2/5 bg-gray-50 border border-gray-200 rounded-[24px] md:rounded-[30px] p-6 md:p-8 flex flex-col justify-end min-h-[300px] md:min-h-[450px] relative"
          >
            <div className="mt-auto">
              <h3 className="text-xl md:text-2xl font-bold text-black uppercase mb-3 leading-tight">
                {data.cardTitle}
              </h3>
              <p className="text-sm md:text-base font-medium text-gray-700 mb-8 max-w-[320px] leading-relaxed whitespace-pre-line">
                {data.cardText}
              </p>

              <Link 
                href={data.buttonLink}
                className="bg-black text-white rounded-full h-[50px] px-2 pl-6 flex items-center gap-4 transition-all duration-300 hover:bg-[#FE8204] hover:border-[#FE8204] hover:outline-[#FE8204] border border-black outline outline-1 outline-offset-[-1px] outline-black group w-max"
              >
                  <span className="font-bold uppercase text-[16px] tracking-wide whitespace-nowrap pt-0.5">
                      {data.buttonText}
                  </span>
                  <div className="bg-white text-black w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <svg width="14" height="12" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 1.5L13.5 6.5M13.5 6.5L8.5 11.5M13.5 6.5H1.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                  </div>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}