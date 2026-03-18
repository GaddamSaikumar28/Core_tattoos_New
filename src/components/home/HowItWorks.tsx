"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Define the TypeScript interface for our steps array
interface Step {
  num: string;
  text: string;
}

const steps: Step[] = [
  { num: "1", text: "Cleanse" },
  { num: "2", text: "Peel" },
  { num: "3", text: "Apply" },
  { num: "4", text: "Showcase" },
];

export default function HowItWorks() {
  return (
    <section className="py-20 w-full  bg-[#111111] text-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[var(--color-brand-orange)] font-bold tracking-widest uppercase text-sm mb-2">How It Works</h2>
          <p className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight">Apply. Peel. Conquer.</p>
        </motion.div>

        {/* Steps Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              className={`bg-white rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-lg ${
                index % 2 !== 0 ? 'md:mt-8' : '' // Staggers the 2nd and 4th cards
              }`}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.15, // Sequential entry
                type: "spring",
                stiffness: 200
              }}
            >
              <span className="text-6xl font-black text-[var(--color-brand-orange)] mb-2">{step.num}</span>
              <span className="text-black font-bold uppercase tracking-wider text-lg">{step.text}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}