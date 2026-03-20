"use client";

import React from 'react';
import { motion } from 'framer-motion';

const NewsletterSection = () => {
  return (
    <section className="bg-[#EBEBEB] w-full py-16 md:py-24 px-4 md:px-8 lg:px-16 overflow-hidden ">
      <div className="max-w-[1312px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Heading */}
          <h2 className="text-5xl md:text-6xl lg:text-[72px]  font-bold text-black uppercase leading-none mb-6 tracking-tight">
            Subscribe to news
          </h2>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl lg:text-2xl  text-black font-medium leading-snug mb-10 max-w-[500px]">
            Join our newsletter to stay up to date on features and releases.
          </p>

          {/* Form */}
          <form 
            onSubmit={(e) => e.preventDefault()} 
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 max-w-[650px]"
          >
            {/* Input Field */}
            <div className="w-full sm:flex-1 relative">
              <input 
                type="email" 
                placeholder="jane@email.com" 
                required
                className="w-full h-[60px] md:h-[68px] rounded-full px-8 text-base md:text-lg  text-black bg-white border border-gray-200 focus:border-black outline-none placeholder:text-gray-500 shadow-sm transition-all"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full sm:w-auto h-[60px] md:h-[68px] px-8 md:px-12 rounded-full bg-black text-white font-bold text-base md:text-lg  uppercase tracking-wider hover:bg-[#fe8204] hover:shadow-lg transition-all duration-300 shrink-0"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;