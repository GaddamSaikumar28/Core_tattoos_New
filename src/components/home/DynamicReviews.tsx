'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- Types ---
interface Testimonial {
  name: string;
  text: string;
}

interface TestimonialCardProps {
  item: Testimonial;
  isMobile?: boolean;
}

// --- Data ---
const row1: Testimonial[] = [
  {
    name: 'Jordan Miller',
    text: '"This ink looks so real! It lasted ten full days through gym sessions. Love it. 10/10."',
  },
  {
    name: 'Sarah Laurent',
    text: '"Perfect for testing my sleeve idea. Super easy to apply and the color is very deep."',
  },
  {
    name: 'Chris Peterson',
    text: '"Best temporary tattoo I ever tried. People thought it was permanent. Total winner."',
  },
];

const row2: Testimonial[] = [
  {
    name: 'Elena Rodriguez',
    text: '"The mystery gift was a great surprise. High quality art that fades away naturally"',
  },
  {
    name: 'Blake Thompson',
    text: '"No needles, no pain, just style. It developed perfectly in one day. Highly suggest."',
  },
  {
    name: 'Maya Whitestone',
    text: '"Finally, a tattoo with zero regret. My friends are obsessed with the matte finish."',
  },
];

const allTestimonials: Testimonial[] = [...row1, ...row2];

// --- Reusable Components ---
const FiveStars: React.FC = () => (
  <div className="flex gap-1 overflow-hidden h-[19px]">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        width="20"
        height="19"
        viewBox="0 0 20 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z"
          fill="#FE8204"
        />
      </svg>
    ))}
  </div>
);

const TestimonialCard: React.FC<TestimonialCardProps> = ({ item, isMobile = false }) => {
  // Extract the first letter of the name for the avatar
  const initial = item.name ? item.name.charAt(0).toUpperCase() : '';

  return (
    <motion.div
      whileHover={!isMobile ? { y: -5, boxShadow: '0px 10px 20px rgba(0,0,0,0.05)' } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`bg-white rounded-[30px] border border-black outline outline-1 outline-offset-[-1px] outline-black flex flex-col justify-start align-start gap-5 md:gap-6 ${
        isMobile ? 'min-w-full px-5 py-8' : 'w-[416px] p-8 shrink-0'
      }`}
    >
      <div className="flex flex-col gap-4 md:gap-6">
        <FiveStars />
        <p className="text-black font-normal text-sm md:text-base leading-snug">
          {item.text}
        </p>
      </div>
      <div className="flex items-center gap-4 mt-auto">
        
        {/* Replaced image with Initial Avatar */}
        <div className="w-12 h-12 rounded-full bg-[#FE8204]/10 border border-[#FE8204] flex items-center justify-center text-[#FE8204] font-bold text-xl shrink-0">
          {initial}
        </div>

        <div className="flex flex-col flex-1">
          <h4 className="text-black font-bold text-base">{item.name}</h4>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Component ---
export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < allTestimonials.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="relative w-full bg-white py-16 md:py-24 overflow-hidden">
      {/* Header */}
      <div className="px-4 md:px-16 mb-12 md:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-black font-bold text-4xl md:text-6xl uppercase tracking-wide"
        >
          Our Testimonials
        </motion.h2>
      </div>

      {/* --- DESKTOP VIEW (Continuous Marquee) --- */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex flex-col gap-8 w-full group/marquee"
      >
        <style>
          {`
            @keyframes marqueeLeft {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes marqueeRight {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .animate-marquee-left {
              animation: marqueeLeft 40s linear infinite;
            }
            .animate-marquee-right {
              animation: marqueeRight 40s linear infinite;
            }
            .group\\/marquee:hover .animate-marquee-left,
            .group\\/marquee:hover .animate-marquee-right {
              animation-play-state: paused;
            }
          `}
        </style>

        {/* Top Row: Moves Right to Left */}
        <div className="flex w-max animate-marquee-right gap-8">
          {[...row1, ...row1, ...row1].map((item, index) => (
            <TestimonialCard key={`row1-${index}`} item={item} />
          ))}
        </div>

        {/* Bottom Row: Moves Left to Right */}
        <div className="flex w-max animate-marquee-left gap-8">
          {[...row2, ...row2, ...row2].map((item, index) => (
            <TestimonialCard key={`row2-${index}`} item={item} />
          ))}
        </div>
      </motion.div>

      {/* --- MOBILE VIEW (Interactive Carousel) --- */}
      <div className="flex md:hidden flex-col w-full px-4">
        {/* Carousel Track */}
        <div className="overflow-hidden w-full rounded-[30px] touch-pan-y">
          <motion.div
            className="flex gap-4"
            animate={{ x: `calc(-${currentIndex * 100}% - ${currentIndex * 16}px)` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {allTestimonials.map((item, index) => (
              <TestimonialCard key={`mobile-${index}`} item={item} isMobile={true} />
            ))}
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mt-8 w-full">
          {/* Pagination Dots */}
          <div className="flex gap-2">
            {allTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-[#FE8204] w-6'
                    : 'bg-white border border-black opacity-80 hover:bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Arrow Buttons */}
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              aria-label="Previous testimonial"
              className={`w-12 h-12 rounded-full bg-white border border-black outline outline-1 outline-offset-[-1px] outline-black flex items-center justify-center transition-all ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:bg-gray-100 active:scale-95'
              }`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 18L9 12L15 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              disabled={currentIndex === allTestimonials.length - 1}
              aria-label="Next testimonial"
              className={`w-12 h-12 rounded-full bg-white border border-black outline outline-1 outline-offset-[-1px] outline-black flex items-center justify-center transition-all ${
                currentIndex === allTestimonials.length - 1
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:bg-gray-100 active:scale-95'
              }`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 18L15 12L9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}