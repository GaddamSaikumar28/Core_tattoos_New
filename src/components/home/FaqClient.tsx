 "use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function FaqClient({ data }: { data: any }) {
//   const [openIndex, setOpenIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-[1312px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
      {/* ================= LEFT COLUMN: Header & CTA ================= */}
      <div className="w-full lg:w-1/3 lg:sticky lg:top-24 flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black uppercase leading-tight">
            {data.headerText} <span className="text-[#fe8204]">{data.headerHighlight}</span>
          </h2>
          <p className="text-gray-600 mt-4 leading-relaxed whitespace-pre-line">
            {data.subheading}
          </p>
          
          <div className="mt-8 p-6 bg-zinc-50 border border-zinc-200 rounded-2xl">
            <h4 className="font-bold text-black mb-2 uppercase text-sm tracking-wide">
              {data.supportTitle}
            </h4>
            <p className="text-sm text-gray-500 mb-6 whitespace-pre-line">
              {data.supportDescription}
            </p>
            <Link href={data.supportButtonLink} className="block w-max">
              <button className="bg-black text-white rounded-full h-[45px] px-6 font-bold uppercase text-[13px] tracking-wide transition-all duration-300 hover:bg-[#fe8204] w-max">
                {data.supportButtonText}
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ================= RIGHT COLUMN: Accordion Items ================= */}
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        {data.faqs.map((faq: any, index: number) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`border-b border-zinc-200 pb-4 ${isOpen ? 'pt-4' : 'py-4'} transition-all`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between text-left group gap-4 focus:outline-none"
              >
                <h3 className={`font-bold text-lg md:text-xl transition-colors duration-300 ${isOpen ? 'text-[#fe8204]' : 'text-black group-hover:text-[#fe8204]'}`}>
                  {faq.question}
                </h3>
                
                {/* Plus/Minus Icon */}
                <div className="relative w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 group-hover:bg-zinc-200 transition-colors">
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute w-3 h-[2px] bg-black rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 90, opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute w-3 h-[2px] bg-black rounded-full"
                  />
                </div>
              </button>

              {/* Animated Answer Body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 pb-2 text-gray-600 leading-relaxed pr-8 md:pr-12 whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}