// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // --- Types ---
// interface Review {
//   id: string;
//   name: string;
//   handle: string;
//   title?: string;
//   text: string;
//   rating: number;
// }

// // --- Mock Data ---
// const allReviews: Review[] = [
//   { id: "1", name: "Victoria Linton", handle: "@victorialinton", text: "Praedam urna neque viverra justo ultrices dui. Est lorem nunc sed velit dignissim. In hendrerit gravida.", rating: 5 },
//   { id: "2", name: "Dmitri Woodhouse", handle: "@yournamehere", text: "Mauris in aliquam se fringilla morbi tincidunt augue amet dui massa.", rating: 5 },
//   { id: "3", name: "Hindley Micawber", handle: "@yoursocialmedia", title: "Top-notch!", text: "Rhoncus urna neque viverra justo nec ultrices dui. Est lorem ipsum dolor sit amet consectetur.", rating: 5 },
//   { id: "4", name: "Fanny Deen", handle: "@fannydeen", title: "EXCELLENT JOB!", text: "A scelerisque purus semper eget duis at tellus. Amet cursus sit amet dictum sit justo. Varius sit amet.", rating: 5 },
//   { id: "5", name: "Catherine Doe", handle: "@CatherineDoe", title: "TESTIMONIAL", text: "In hac habitasse platea dictumst quisque sagitise pur convallis.", rating: 4 },
//   { id: "6", name: "Unknown User", handle: "@user123", title: "RECOMMENDED!", text: "Habitant morbi tristique et netus blandit molestie.", rating: 5 },
//   { id: "7", name: "Artful Wotton", handle: "@ArtfulWotton", title: "Client Review", text: "Rhoncus neque viverra justo ultrices duist lorem dolor sed consect adipiscing.", rating: 0 },
//   { id: "8", name: "Nelly Vane", handle: "@nellyvane", text: "Varius duis at consectetur lorem donec. Et tortor at risus viverra adipiscing at in tellus.", rating: 5 },
//   { id: "9", name: "Jane Prokofich", handle: "@JaneProkofich", text: "Vestibulum mattis enim aulit tortor se ullamcorper morbi pretium.", rating: 0 },
//   { id: "10", name: "Robert Fox", handle: "@robertfox", title: "Amazing Work", text: "They helped me through every step of the process. I couldn't be happier with the results.", rating: 5 },
//   { id: "11", name: "Eleanor Pena", handle: "@eleanorp", title: "Fast & Reliable", text: "Delivered ahead of schedule and exceeded all my expectations.", rating: 5 },
//   { id: "12", name: "Brooklyn Simmons", handle: "@brooklyns", text: "Great communication and a fantastic final product. Will return!", rating: 4 },
//   { id: "13", name: "Brooklyn sdfads Simmons", handle: "@brooklyns", text: "Great communication sdfafda and a fantastic final product. Will return!", rating: 4 }
// ];

// // --- Helpers ---
// const StarRating = ({ rating }: { rating: number }) => {
//   if (rating === 0) return null;
//   return (
//     <div className="text-[#fe8204] text-[10px] sm:text-xs tracking-widest flex items-center gap-1">
//       {"★".repeat(rating)}{"☆".repeat(5 - rating)}
//       {rating > 0 && <span className="text-gray-400 ml-1">({rating.toFixed(1)})</span>}
//     </div>
//   );
// };

// // --- Extracted Animation Wrapper ---
// const AnimWrap = ({ 
//   children, 
//   id, 
//   index, 
//   isInitial 
// }: { 
//   children: React.ReactNode; 
//   id: string; 
//   index: number;
//   isInitial: boolean;
// }) => (
//   <AnimatePresence mode="wait">
//     <motion.div
//       key={id}
//       initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(8px)" }}
//       animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
//       exit={{ opacity: 0, y: -20, scale: 0.9, filter: "blur(8px)" }}
//       transition={{ 
//         duration: 0.6, 
//         ease: "easeInOut",
//         delay: isInitial ? index * 0.15 : 0 
//       }}
//       className="h-full w-full"
//     >
//       {children}
//     </motion.div>
//   </AnimatePresence>
// );

// // --- Main Component ---
// export default function ReviewsMockupGrid() {
//   // ✅ Combined State
//   const [reviews, setReviews] = useState({
//     visible: allReviews.slice(0, 9),
//     hidden: allReviews.slice(9)
//   });
  
//   const lastUpdatedIndex = useRef(-1);
//   const isInitialMount = useRef(true);

//   //const bgTheme = "#C4B5A5"; 
//   const bgTheme = "bg-[#111111]";
//   const shadowStyle = "shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.2)] transition-shadow duration-300";

//   // Handle initial mount delay for staggered entrance
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       isInitialMount.current = false;
//     }, 200);
//     return () => clearTimeout(timeout);
//   }, []);

//   // ✅ Fixed Interval Logic
//   useEffect(() => {
//     if (allReviews.length <= 9) return;
    
//     const interval = setInterval(() => {
//       setReviews((prev) => {
//         const nextVis = [...prev.visible];
//         const nextHid = [...prev.hidden];
        
//         let randomGridIndex;
//         do {
//           randomGridIndex = Math.floor(Math.random() * nextVis.length);
//         } while (randomGridIndex === lastUpdatedIndex.current); 
        
//         lastUpdatedIndex.current = randomGridIndex;
        
//         const randomHiddenIndex = Math.floor(Math.random() * nextHid.length);
        
//         const outgoingReview = nextVis[randomGridIndex];
//         const incomingReview = nextHid[randomHiddenIndex];
        
//         nextVis[randomGridIndex] = incomingReview;
        
//         nextHid.splice(randomHiddenIndex, 1); 
//         nextHid.push(outgoingReview); 
        
//         return { visible: nextVis, hidden: nextHid };
//       });
//     }, 5000); 
    
//     return () => clearInterval(interval);
//   }, []); 

//   const visibleReviews = reviews.visible;

//   if (visibleReviews.length < 9) return null;

//   return (
//     <section 
//       style={{ backgroundColor: bgTheme }} 
//       className="min-h-screen p-8 md:p-16 lg:p-24 flex items-center justify-center overflow-hidden"
//     >
//       <div className="max-w-[1400px] w-full flex flex-col items-center">
        
//         {/* ================= HEADING (TOP & CENTERED) ================= */}
//         <div className="w-full text-center mb-12 md:mb-16">
//           <h2 className="text-4xl md:text-5xl  font-bold text-gray-900 uppercase tracking-wide">
//             Our Testimonials
//           </h2>
//         </div>

//         {/* ================= REVIEWS GRID ================= */}
//         <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr] gap-x-8 gap-y-12 items-start">
          
//           {/* ================= COLUMN 1 ================= */}
//           <div className="flex flex-col gap-12 pt-8">
//             <div className="relative">
//               <AnimWrap id={visibleReviews[0].id} index={0} isInitial={isInitialMount.current}>
//                 <div className={`bg-white rounded-3xl p-6 relative ${shadowStyle}`}>
//                   <div 
//                     className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
//                     style={{ border: `6px solid ${bgTheme}` }}
//                   >
//                     {visibleReviews[0].name.charAt(0)}
//                   </div>
//                   <div className="absolute top-2 right-4 text-6xl text-gray-300 leading-none">“</div>
//                   <div className="ml-10 mb-3">
//                     <h4 className=" text-lg text-gray-800">{visibleReviews[0].name}</h4>
//                     <StarRating rating={visibleReviews[0].rating} />
//                   </div>
//                   <p className="text-gray-500 text-xs leading-relaxed">{visibleReviews[0].text}</p>
//                 </div>
//               </AnimWrap>
//             </div>

//             <div className="relative pr-8">
//               <AnimWrap id={visibleReviews[1].id} index={1} isInitial={isInitialMount.current}>
//                 <div className={`bg-white rounded-[2rem] p-6 relative ${shadowStyle}`}>
//                   <div 
//                     className="absolute top-1/2 -translate-y-1/2 -right-8 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
//                     style={{ border: `6px solid ${bgTheme}` }}
//                   >
//                     {visibleReviews[1].name.charAt(0)}
//                   </div>
//                   <p className="text-gray-600 text-sm  mb-4 pr-6">"{visibleReviews[1].text}"</p>
//                   <div className="flex justify-between items-end pr-6">
//                     <div>
//                       <h4 className="font-bold text-gray-800 text-[10px] uppercase tracking-wider">{visibleReviews[1].name}</h4>
//                       <span className="text-gray-400 text-[10px]">{visibleReviews[1].handle}</span>
//                     </div>
//                     <StarRating rating={visibleReviews[1].rating} />
//                   </div>
//                 </div>
//               </AnimWrap>
//             </div>

//             <div className="w-3/4 mx-auto">
//               <AnimWrap id={visibleReviews[2].id} index={2} isInitial={isInitialMount.current}>
//                 <div className={`bg-white rounded-3xl overflow-hidden flex flex-col ${shadowStyle}`}>
//                   <div className="p-8 text-center flex-1">
//                     <h3 className=" text-xl text-gray-800 mb-4">{visibleReviews[2].title || "Top-notch!"}</h3>
//                     <p className="text-gray-500 text-xs leading-relaxed mb-6">{visibleReviews[2].text}</p>
//                     <div className="flex justify-center"><StarRating rating={visibleReviews[2].rating} /></div>
//                   </div>
//                   <div className="bg-[#EBE5DF] p-4 flex items-center gap-4">
//                     <div className="w-10 h-10 rounded-full bg-[#fe8204] text-white flex items-center justify-center font-bold uppercase shrink-0">
//                       {visibleReviews[2].name.charAt(0)}
//                     </div>
//                     <div className="flex flex-col text-left">
//                       <span className="font-bold text-gray-800 text-xs">{visibleReviews[2].name}</span>
//                       <span className="text-gray-500 text-[10px]">{visibleReviews[2].handle}</span>
//                     </div>
//                   </div>
//                 </div>
//               </AnimWrap>
//             </div>
//           </div>

//           {/* ================= COLUMN 2 (CENTER) ================= */}
//           <div className="flex flex-col gap-10">
//             <div className="relative pt-12">
//               <AnimWrap id={visibleReviews[3].id} index={3} isInitial={isInitialMount.current}>
//                 <div className={`bg-white rounded-[3rem] p-12 text-center relative flex flex-col items-center justify-center ${shadowStyle}`}>
//                   <div 
//                     className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-4xl font-bold uppercase shadow-inner"
//                     style={{ border: `8px solid ${bgTheme}` }}
//                   >
//                     {visibleReviews[3].name.charAt(0)}
//                   </div>
//                   <h2 className=" text-2xl text-gray-800 mb-3 tracking-wide mt-4 uppercase">
//                     {visibleReviews[3].title}
//                   </h2>
//                   <div className="mb-6"><StarRating rating={visibleReviews[3].rating} /></div>
//                   <p className="text-gray-500 text-sm leading-loose  mb-8 px-4">
//                     "{visibleReviews[3].text}"
//                   </p>
//                   <span className=" text-2xl text-gray-400">
//                     {visibleReviews[3].name}
//                   </span>
//                 </div>
//               </AnimWrap>
//             </div>

//             <div className="grid grid-cols-2 gap-6 items-end">
//               <div className="relative">
//                 <AnimWrap id={visibleReviews[4].id} index={4} isInitial={isInitialMount.current}>
//                   <div className="absolute -bottom-4 left-6 w-8 h-8 bg-white rotate-45" />
//                   <div className={`bg-white rounded-[2rem] p-4 relative z-10 flex gap-4 ${shadowStyle}`}>
//                     <div className="w-1/3 bg-[#fe8204] rounded-[1.5rem] flex flex-col items-center justify-center text-white p-2">
//                       <span className="text-3xl font-bold">{visibleReviews[4].name.charAt(0)}</span>
//                     </div>
//                     <div className="flex-1 py-2 pr-2">
//                       <h5 className="font-bold text-gray-800 text-[11px] uppercase mb-2">{visibleReviews[4].title}</h5>
//                       <p className="text-gray-500 text-[10px] leading-snug mb-2">"{visibleReviews[4].text}"</p>
//                       <span className="text-gray-400 text-[9px] block mb-2">{visibleReviews[4].handle}</span>
//                       <StarRating rating={visibleReviews[4].rating} />
//                     </div>
//                   </div>
//                 </AnimWrap>
//               </div>

//               <div className="relative">
//                 <AnimWrap id={visibleReviews[5].id} index={5} isInitial={isInitialMount.current}>
//                   <div className="absolute -bottom-4 right-6 w-8 h-8 bg-white rotate-45" />
//                   <div className={`bg-white rounded-[2rem] p-4 relative z-10 flex flex-col gap-3 ${shadowStyle}`}>
//                     <div className="absolute top-0 left-6 bg-[#A7988A] text-white text-xs px-2 py-1 rounded-b-md z-20">★</div>
//                     <div className="w-full h-24 bg-[#fe8204] rounded-[1.5rem] flex items-center justify-center text-white">
//                       <span className="text-4xl font-bold">{visibleReviews[5].name.charAt(0)}</span>
//                     </div>
//                     <div className="text-center px-2 pb-2">
//                       <h5 className="font-bold text-gray-800 text-[10px] uppercase mb-1">{visibleReviews[5].title}</h5>
//                       <div className="flex justify-center mb-2 scale-90"><StarRating rating={visibleReviews[5].rating} /></div>
//                       <p className="text-gray-400 text-[9px] leading-snug">"{visibleReviews[5].text}"</p>
//                     </div>
//                   </div>
//                 </AnimWrap>
//               </div>
//             </div>
//           </div>

//           {/* ================= COLUMN 3 ================= */}
//           <div className="flex flex-col gap-10">
//             <div>
//               <AnimWrap id={visibleReviews[6].id} index={6} isInitial={isInitialMount.current}>
//                 <div className={`bg-white rounded-3xl overflow-hidden ${shadowStyle}`}>
//                   <div className="bg-[#EBE5DF] px-6 py-4 flex justify-between items-center border-b border-gray-100">
//                     <span className=" font-bold text-gray-800">{visibleReviews[6].title}</span>
//                     <span className="text-xs text-gray-500">{visibleReviews[6].handle}</span>
//                   </div>
//                   <div className="p-6">
//                     <p className="text-gray-600 text-sm mb-6">"{visibleReviews[6].text}"</p>
//                     <div className="flex justify-between items-center">
//                       <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-[#fe8204] transition-colors">Read More &rarr;</button>
//                       <div className="flex gap-2 text-gray-300">
//                         <span>♡</span><span>💬</span><span>↗</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </AnimWrap>
//             </div>

//             <div className="relative pl-8 my-4">
//               <AnimWrap id={visibleReviews[7].id} index={7} isInitial={isInitialMount.current}>
//                 <div className={`bg-white rounded-full p-5 pl-12 flex relative items-center gap-4 ${shadowStyle}`}>
//                   <div 
//                     className="absolute -left-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
//                     style={{ border: `6px solid ${bgTheme}` }}
//                   >
//                     {visibleReviews[7].name.charAt(0)}
//                   </div>
//                   <div className="absolute -top-4 right-8 w-10 h-10 rounded-full bg-[#A7988A] text-white flex items-center justify-center text-lg shadow-md border-4 border-white">
//                     👍
//                   </div>
//                   <div className="flex-1 pr-4">
//                     <h4 className="text-sm font-bold text-gray-800 uppercase mb-1">{visibleReviews[7].name}</h4>
//                     <p className="text-gray-500 text-[10px] leading-tight mb-2 pr-8">{visibleReviews[7].text}</p>
//                     <StarRating rating={visibleReviews[7].rating} />
//                   </div>
//                 </div>
//               </AnimWrap>
//             </div>

//             <div className="relative mt-8">
//               <AnimWrap id={visibleReviews[8].id} index={8} isInitial={isInitialMount.current}>
//                 <div className={`bg-white rounded-[2rem] rounded-bl-none p-8 relative ${shadowStyle}`}>
//                   <div className="absolute -bottom-6 left-6 text-7xl text-gray-400 leading-none rotate-180 opacity-50">“</div>
//                   <p className="text-gray-600 text-sm mb-6">"{visibleReviews[8].text}"</p>
//                   <div className="flex justify-end pr-16 text-right flex-col">
//                     <span className=" text-xl text-gray-400">{visibleReviews[8].name}</span>
//                     <span className="text-[10px] text-gray-400">{visibleReviews[8].handle}</span>
//                   </div>
//                   <div 
//                     className="absolute -bottom-6 -right-2 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
//                     style={{ border: `6px solid ${bgTheme}` }}
//                   >
//                     {visibleReviews[8].name.charAt(0)}
//                   </div>
//                 </div>
//               </AnimWrap>
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface Testimonial {
  name: string;
  text: string;
  img: string;
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
    img: 'https://placehold.co/48x48',
  },
  {
    name: 'Sarah Laurent',
    text: '"Perfect for testing my sleeve idea. Super easy to apply and the color is very deep."',
    img: 'https://placehold.co/48x48',
  },
  {
    name: 'Chris Peterson',
    text: '"Best temporary tattoo I ever tried. People thought it was permanent. Total winner."',
    img: 'https://placehold.co/48x48',
  },
];

const row2: Testimonial[] = [
  {
    name: 'Elena Rodriguez',
    text: '"The mystery gift was a great surprise. High quality art that fades away naturally"',
    img: 'https://placehold.co/48x48',
  },
  {
    name: 'Blake Thompson',
    text: '"No needles, no pain, just style. It developed perfectly in one day. Highly suggest."',
    img: 'https://placehold.co/48x48',
  },
  {
    name: 'Maya Whitestone',
    text: '"Finally, a tattoo with zero regret. My friends are obsessed with the matte finish."',
    img: 'https://placehold.co/48x48',
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

const TestimonialCard: React.FC<TestimonialCardProps> = ({ item, isMobile = false }) => (
  <motion.div
    whileHover={!isMobile ? { y: -5, boxShadow: '0px 10px 20px rgba(0,0,0,0.05)' } : {}}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className={`bg-white rounded-[30px] border border-black outline outline-1 outline-offset-[-1px] outline-black flex flex-col justify-start align-start gap-5 md:gap-6 ${
      isMobile ? 'min-w-full px-5 py-8' : 'w-[416px] p-8 shrink-0'
    }`}
  >
    <div className="flex flex-col gap-4 md:gap-6">
      <FiveStars />
      <p className="text-black  font-normal text-sm md:text-base leading-snug">
        {item.text}
      </p>
    </div>
    <div className="flex items-center gap-4 mt-auto">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.img}
        alt={`${item.name} profile picture`}
        className="w-12 h-12 rounded-full object-cover"
        loading="lazy"
      />
      <div className="flex flex-col flex-1">
        <h4 className="text-black  font-bold text-base">{item.name}</h4>
      </div>
    </div>
  </motion.div>
);

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
      {/* Note: Using Framer Motion for marquees is possible, but CSS is significantly more performant 
          for infinite continuous loops and handles hover-pausing cleanly without JS thread overhead. 
          We wrap it in a motion layout for smooth initial rendering. */}
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

        {/* Top Row: Moves Right to Left (Wait, the original CSS moves it Right. Adjusted here for logic) */}
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