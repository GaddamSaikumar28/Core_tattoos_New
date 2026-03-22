"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
// const faqs = [
//   {
//     id: 1,
//     question: "How long do Just Tattoos actually last?",
//     answer: "Our semi-permanent tattoos are designed to look incredibly realistic and typically last anywhere from 1 to 2 weeks (up to 10 days on average). The exact duration depends on the placement, your skin type, and how often you wash or exfoliate the area."
//   },
//   {
//     id: 2,
//     question: "Are they water-resistant?",
//     answer: "Yes! Once fully set, your tattoo is water-resistant. You can shower, swim, and sweat without worrying about it washing off immediately. Just avoid heavy scrubbing."
//   },
//   {
//     id: 3,
//     question: "Is the ink safe for my skin?",
//     answer: "Absolutely. Our inks are formulated with plant-based, skin-safe ingredients. They are cruelty-free, hypoallergenic, and clinically tested to ensure they are safe for all skin types."
//   },
//   {
//     id: 4,
//     question: "How do I apply them?",
//     answer: "It’s super simple. Peel off the clear protective film, place the design face down on clean, dry skin, press a damp cloth against it for 30 seconds, and peel back the paper. The color will develop fully over 24 hours."
//   },
//   {
//     id: 5,
//     question: "How can I remove them early?",
//     answer: "If you need to switch up your style early, you can gently scrub the area with warm water and an exfoliant, or use a bit of baby oil or rubbing alcohol to lift the ink away."

//   },
//   {
//     id: 6,
//     question: "How can I remove them early?",
//     answer: "If you need to switch up your style early, you can gently scrub the area with warm water and an exfoliant, or use a bit of baby oil or rubbing alcohol to lift the ink away."
//   },
//   {
//     id: 7,
//     question: "How can I remove them early?",
//     answer: "If you need to switch up your style early, you can gently scrub the area with warm water and an exfoliant, or use a bit of baby oil or rubbing alcohol to lift the ink away."
//   },
//   {
//     id: 8,
//     question: "How can I remove them early?",
//     answer: "If you need to switch up your style early, you can gently scrub the area with warm water and an exfoliant, or use a bit of baby oil or rubbing alcohol to lift the ink away."
//   },
//   {
//     id: 9,
//     question: "How can I remove them early?",
//     answer: "If you need to switch up your style early, you can gently scrub the area with warm water and an exfoliant, or use a bit of baby oil or rubbing alcohol to lift the ink away."
//   },
//   {
//     id: 10,
//     question: "How can I remove them early?",
//     answer: "If you need to switch up your style early, you can gently scrub the area with warm water and an exfoliant, or use a bit of baby oil or rubbing alcohol to lift the ink away."
//   }

// ];
const faqs = [
  {
    id: 1,
    question: "How long do Just Tattoos actually last?",
    answer: "Our semi-permanent tattoos are designed to look incredibly realistic and typically last anywhere from 1 to 2 weeks (up to 10 days on average). The exact duration depends on the placement, your skin type, and how often you wash or exfoliate the area."
  },
  {
    id: 2,
    question: "Are they water-resistant?",
    answer: "Yes! Once fully set, your tattoo is water-resistant. You can shower, swim, and sweat without worrying about it washing off immediately. Just avoid heavy scrubbing."
  },
  {
    id: 3,
    question: "Is the ink safe for my skin?",
    answer: "Absolutely. Our inks are formulated with plant-based, skin-safe ingredients. They are cruelty-free, hypoallergenic, and clinically tested to ensure they are safe for all skin types."
  },
  {
    id: 4,
    question: "How do I apply them?",
    answer: "It’s super simple. Peel off the clear protective film, place the design face down on clean, dry skin, press a damp cloth against it for 30 seconds, and peel back the paper. The color will develop fully over 24 hours."
  },
  {
    id: 5,
    question: "How can I remove them early?",
    answer: "If you need to switch up your style early, you can gently scrub the area with warm water and an exfoliant, or use a bit of baby oil or rubbing alcohol to lift the ink away."
  },
  {
    id: 6,
    question: "Why does my tattoo look faint right after applying?",
    answer: "Don't panic! Our plant-based ink goes on light and takes 24 to 36 hours to fully darken. It reacts safely with the proteins in your skin's top layer to create a rich, realistic color."
  },
  {
    id: 7,
    question: "Where is the best place to put my tattoo?",
    answer: "For the longest-lasting results, choose an area with minimal friction and hair, like your forearm, calf, or shoulder. Avoid areas that bend frequently (like wrists or knees) or places that naturally sweat a lot."
  },
  {
    id: 8,
    question: "Can I use lotion or sunscreen over it?",
    answer: "Yes, but we recommend waiting at least 24 hours after application before using any lotions, sunscreens, or heavy oils on the area. Once the tattoo has fully developed, keeping your skin moisturized can actually help it last longer!"
  },
  {
    id: 9,
    question: "What color will the tattoo develop into?",
    answer: "Our formula develops into a realistic dark blue-black shade, closely mimicking the look of authentic tattoo ink after it has healed in the skin. It does not look like a glossy, pitch-black sticker."
  },
  {
    id: 10,
    question: "Will sleeping mess up the tattoo while it develops?",
    answer: "To prevent the ink from transferring to other parts of your body while you sleep (like your face resting on your arm), we recommend wearing loose, long clothing over the tattooed area for the first night."
  }
];
const FaqSection = () => {
  // First item open by default
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index :any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white w-full px-4 py-16 md:px-8 lg:px-16 md:py-24 overflow-hidden">
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
              Got <span className="text-[#fe8204]">Questions?</span>
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              We’ve got answers. Everything you need to know about our ink, application, and making your style last.
            </p>
            
         
            <div className="mt-8 p-6 bg-zinc-50 border border-zinc-200 rounded-2xl">
              <h4 className="font-bold text-black mb-2 uppercase text-sm tracking-wide">
                Still need help?
              </h4>
              <p className="text-sm text-gray-500 mb-6">
                Can't find the answer you're looking for? Our team is ready to help you out.
              </p>
              <Link href="/contact" className="block w-max">
                <button className="bg-black text-white rounded-full h-[45px] px-6 font-bold uppercase text-[13px] tracking-wide transition-all duration-300 hover:bg-[#fe8204] w-max">
                  Contact Support
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ================= RIGHT COLUMN: Accordion Items ================= */}
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.id}
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
                  <h3 className={` font-bold text-lg md:text-xl transition-colors duration-300 ${isOpen ? 'text-[#fe8204]' : 'text-black group-hover:text-[#fe8204]'}`}>
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
                      <p className="pt-4 pb-2 text-gray-600 leading-relaxed pr-8 md:pr-12">
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
    </section>
  );
};

export default FaqSection;