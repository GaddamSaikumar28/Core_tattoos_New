"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

export default function Features() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          {/* Feature 1 */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <svg className="w-10 h-10 mb-4 text-[var(--color-brand-orange)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <h3 className="text-xl font-bold text-black uppercase mb-3 leading-tight tracking-wide">Lasts Up To 10 Days</h3>
            <p className="text-gray-800 text-base leading-relaxed">
              Our skin-safe ink is designed to last up to 10 days, giving you plenty of time to enjoy the look without long-term commitment. Easy to apply, easy to move on when you’re ready for something new.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <svg className="w-10 h-10 mb-4 text-[var(--color-brand-orange)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
              <path d="M16 3.13a4 4 0 010 7.75"></path>
            </svg>
            <h3 className="text-xl font-bold text-black uppercase mb-3 leading-tight tracking-wide">Made For All<br/>Skin Tones</h3>
            <p className="text-gray-800 text-base leading-relaxed">
              Our formulas are carefully tested, cruelty-free, and made with vegan-friendly ingredients. Designed to look great across a wide range of skin tones while meeting strict safety standards.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <svg className="w-10 h-10 mb-4 text-[var(--color-brand-orange)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <h3 className="text-xl font-bold text-black uppercase mb-3 leading-tight tracking-wide">Real Tattoo Look</h3>
            <p className="text-gray-800 text-base leading-relaxed">
              Unlike traditional temporary tattoos that sit on the surface, our ink absorbs into the top layer of your skin for a more natural, realistic finish. The design gradually fades as your skin renews itself.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <svg className="w-10 h-10 mb-4 text-[var(--color-brand-orange)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"></path>
              <path d="M12 6a6 6 0 1 0 6 6 6.007 6.007 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4.005 4.005 0 0 1-4 4z"></path>
            </svg>
            <h3 className="text-xl font-bold text-black uppercase mb-3 leading-tight tracking-wide">Built For<br/>Self-Expression</h3>
            <p className="text-gray-800 text-base leading-relaxed">
              Change your look, test new ideas, or make a statement whenever you feel like it. Our tattoos are made for experimenting freely and expressing yourself with confidence.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}