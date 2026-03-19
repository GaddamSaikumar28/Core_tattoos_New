"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
interface Review {
  id: string;
  name: string;
  handle: string;
  title?: string;
  text: string;
  rating: number;
}

// --- Mock Data ---
const allReviews: Review[] = [
  { id: "1", name: "Victoria Linton", handle: "@victorialinton", text: "Praedam urna neque viverra justo ultrices dui. Est lorem nunc sed velit dignissim. In hendrerit gravida.", rating: 5 },
  { id: "2", name: "Dmitri Woodhouse", handle: "@yournamehere", text: "Mauris in aliquam se fringilla morbi tincidunt augue amet dui massa.", rating: 5 },
  { id: "3", name: "Hindley Micawber", handle: "@yoursocialmedia", title: "Top-notch!", text: "Rhoncus urna neque viverra justo nec ultrices dui. Est lorem ipsum dolor sit amet consectetur.", rating: 5 },
  { id: "4", name: "Fanny Deen", handle: "@fannydeen", title: "EXCELLENT JOB!", text: "A scelerisque purus semper eget duis at tellus. Amet cursus sit amet dictum sit justo. Varius sit amet.", rating: 5 },
  { id: "5", name: "Catherine Doe", handle: "@CatherineDoe", title: "TESTIMONIAL", text: "In hac habitasse platea dictumst quisque sagitise pur convallis.", rating: 4 },
  { id: "6", name: "Unknown User", handle: "@user123", title: "RECOMMENDED!", text: "Habitant morbi tristique et netus blandit molestie.", rating: 5 },
  { id: "7", name: "Artful Wotton", handle: "@ArtfulWotton", title: "Client Review", text: "Rhoncus neque viverra justo ultrices duist lorem dolor sed consect adipiscing.", rating: 0 },
  { id: "8", name: "Nelly Vane", handle: "@nellyvane", text: "Varius duis at consectetur lorem donec. Et tortor at risus viverra adipiscing at in tellus.", rating: 5 },
  { id: "9", name: "Jane Prokofich", handle: "@JaneProkofich", text: "Vestibulum mattis enim aulit tortor se ullamcorper morbi pretium.", rating: 0 },
  { id: "10", name: "Robert Fox", handle: "@robertfox", title: "Amazing Work", text: "They helped me through every step of the process. I couldn't be happier with the results.", rating: 5 },
  { id: "11", name: "Eleanor Pena", handle: "@eleanorp", title: "Fast & Reliable", text: "Delivered ahead of schedule and exceeded all my expectations.", rating: 5 },
  { id: "12", name: "Brooklyn Simmons", handle: "@brooklyns", text: "Great communication and a fantastic final product. Will return!", rating: 4 },
  { id: "13", name: "Brooklyn sdfads Simmons", handle: "@brooklyns", text: "Great communication sdfafda and a fantastic final product. Will return!", rating: 4 }
];

// --- Helpers ---
const StarRating = ({ rating }: { rating: number }) => {
  if (rating === 0) return null;
  return (
    <div className="text-[#fe8204] text-[10px] sm:text-xs tracking-widest flex items-center gap-1">
      {"★".repeat(rating)}{"☆".repeat(5 - rating)}
      {rating > 0 && <span className="text-gray-400 ml-1">({rating.toFixed(1)})</span>}
    </div>
  );
};

// --- Extracted Animation Wrapper ---
const AnimWrap = ({ 
  children, 
  id, 
  index, 
  isInitial 
}: { 
  children: React.ReactNode; 
  id: string; 
  index: number;
  isInitial: boolean;
}) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20, scale: 0.9, filter: "blur(8px)" }}
      transition={{ 
        duration: 0.6, 
        ease: "easeInOut",
        delay: isInitial ? index * 0.15 : 0 
      }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

// --- Main Component ---
export default function ReviewsMockupGrid() {
  // ✅ Combined State
  const [reviews, setReviews] = useState({
    visible: allReviews.slice(0, 9),
    hidden: allReviews.slice(9)
  });
  
  const lastUpdatedIndex = useRef(-1);
  const isInitialMount = useRef(true);

  //const bgTheme = "#C4B5A5"; 
  const bgTheme = "bg-[#111111]";
  const shadowStyle = "shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.2)] transition-shadow duration-300";

  // Handle initial mount delay for staggered entrance
  useEffect(() => {
    const timeout = setTimeout(() => {
      isInitialMount.current = false;
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  // ✅ Fixed Interval Logic
  useEffect(() => {
    if (allReviews.length <= 9) return;
    
    const interval = setInterval(() => {
      setReviews((prev) => {
        const nextVis = [...prev.visible];
        const nextHid = [...prev.hidden];
        
        let randomGridIndex;
        do {
          randomGridIndex = Math.floor(Math.random() * nextVis.length);
        } while (randomGridIndex === lastUpdatedIndex.current); 
        
        lastUpdatedIndex.current = randomGridIndex;
        
        const randomHiddenIndex = Math.floor(Math.random() * nextHid.length);
        
        const outgoingReview = nextVis[randomGridIndex];
        const incomingReview = nextHid[randomHiddenIndex];
        
        nextVis[randomGridIndex] = incomingReview;
        
        nextHid.splice(randomHiddenIndex, 1); 
        nextHid.push(outgoingReview); 
        
        return { visible: nextVis, hidden: nextHid };
      });
    }, 5000); 
    
    return () => clearInterval(interval);
  }, []); 

  const visibleReviews = reviews.visible;

  if (visibleReviews.length < 9) return null;

  return (
    <section 
      style={{ backgroundColor: bgTheme }} 
      className="min-h-screen p-8 md:p-16 lg:p-24 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-[1400px] w-full flex flex-col items-center">
        
        {/* ================= HEADING (TOP & CENTERED) ================= */}
        <div className="w-full text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl  font-bold text-gray-900 uppercase tracking-wide">
            Our Testimonials
          </h2>
        </div>

        {/* ================= REVIEWS GRID ================= */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr] gap-x-8 gap-y-12 items-start">
          
          {/* ================= COLUMN 1 ================= */}
          <div className="flex flex-col gap-12 pt-8">
            <div className="relative">
              <AnimWrap id={visibleReviews[0].id} index={0} isInitial={isInitialMount.current}>
                <div className={`bg-white rounded-3xl p-6 relative ${shadowStyle}`}>
                  <div 
                    className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
                    style={{ border: `6px solid ${bgTheme}` }}
                  >
                    {visibleReviews[0].name.charAt(0)}
                  </div>
                  <div className="absolute top-2 right-4 text-6xl text-gray-300 leading-none">“</div>
                  <div className="ml-10 mb-3">
                    <h4 className=" text-lg text-gray-800">{visibleReviews[0].name}</h4>
                    <StarRating rating={visibleReviews[0].rating} />
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{visibleReviews[0].text}</p>
                </div>
              </AnimWrap>
            </div>

            <div className="relative pr-8">
              <AnimWrap id={visibleReviews[1].id} index={1} isInitial={isInitialMount.current}>
                <div className={`bg-white rounded-[2rem] p-6 relative ${shadowStyle}`}>
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 -right-8 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
                    style={{ border: `6px solid ${bgTheme}` }}
                  >
                    {visibleReviews[1].name.charAt(0)}
                  </div>
                  <p className="text-gray-600 text-sm  mb-4 pr-6">"{visibleReviews[1].text}"</p>
                  <div className="flex justify-between items-end pr-6">
                    <div>
                      <h4 className="font-bold text-gray-800 text-[10px] uppercase tracking-wider">{visibleReviews[1].name}</h4>
                      <span className="text-gray-400 text-[10px]">{visibleReviews[1].handle}</span>
                    </div>
                    <StarRating rating={visibleReviews[1].rating} />
                  </div>
                </div>
              </AnimWrap>
            </div>

            <div className="w-3/4 mx-auto">
              <AnimWrap id={visibleReviews[2].id} index={2} isInitial={isInitialMount.current}>
                <div className={`bg-white rounded-3xl overflow-hidden flex flex-col ${shadowStyle}`}>
                  <div className="p-8 text-center flex-1">
                    <h3 className=" text-xl text-gray-800 mb-4">{visibleReviews[2].title || "Top-notch!"}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-6">{visibleReviews[2].text}</p>
                    <div className="flex justify-center"><StarRating rating={visibleReviews[2].rating} /></div>
                  </div>
                  <div className="bg-[#EBE5DF] p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#fe8204] text-white flex items-center justify-center font-bold uppercase shrink-0">
                      {visibleReviews[2].name.charAt(0)}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-gray-800 text-xs">{visibleReviews[2].name}</span>
                      <span className="text-gray-500 text-[10px]">{visibleReviews[2].handle}</span>
                    </div>
                  </div>
                </div>
              </AnimWrap>
            </div>
          </div>

          {/* ================= COLUMN 2 (CENTER) ================= */}
          <div className="flex flex-col gap-10">
            <div className="relative pt-12">
              <AnimWrap id={visibleReviews[3].id} index={3} isInitial={isInitialMount.current}>
                <div className={`bg-white rounded-[3rem] p-12 text-center relative flex flex-col items-center justify-center ${shadowStyle}`}>
                  <div 
                    className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-4xl font-bold uppercase shadow-inner"
                    style={{ border: `8px solid ${bgTheme}` }}
                  >
                    {visibleReviews[3].name.charAt(0)}
                  </div>
                  <h2 className=" text-2xl text-gray-800 mb-3 tracking-wide mt-4 uppercase">
                    {visibleReviews[3].title}
                  </h2>
                  <div className="mb-6"><StarRating rating={visibleReviews[3].rating} /></div>
                  <p className="text-gray-500 text-sm leading-loose  mb-8 px-4">
                    "{visibleReviews[3].text}"
                  </p>
                  <span className=" text-2xl text-gray-400">
                    {visibleReviews[3].name}
                  </span>
                </div>
              </AnimWrap>
            </div>

            <div className="grid grid-cols-2 gap-6 items-end">
              <div className="relative">
                <AnimWrap id={visibleReviews[4].id} index={4} isInitial={isInitialMount.current}>
                  <div className="absolute -bottom-4 left-6 w-8 h-8 bg-white rotate-45" />
                  <div className={`bg-white rounded-[2rem] p-4 relative z-10 flex gap-4 ${shadowStyle}`}>
                    <div className="w-1/3 bg-[#fe8204] rounded-[1.5rem] flex flex-col items-center justify-center text-white p-2">
                      <span className="text-3xl font-bold">{visibleReviews[4].name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 py-2 pr-2">
                      <h5 className="font-bold text-gray-800 text-[11px] uppercase mb-2">{visibleReviews[4].title}</h5>
                      <p className="text-gray-500 text-[10px] leading-snug mb-2">"{visibleReviews[4].text}"</p>
                      <span className="text-gray-400 text-[9px] block mb-2">{visibleReviews[4].handle}</span>
                      <StarRating rating={visibleReviews[4].rating} />
                    </div>
                  </div>
                </AnimWrap>
              </div>

              <div className="relative">
                <AnimWrap id={visibleReviews[5].id} index={5} isInitial={isInitialMount.current}>
                  <div className="absolute -bottom-4 right-6 w-8 h-8 bg-white rotate-45" />
                  <div className={`bg-white rounded-[2rem] p-4 relative z-10 flex flex-col gap-3 ${shadowStyle}`}>
                    <div className="absolute top-0 left-6 bg-[#A7988A] text-white text-xs px-2 py-1 rounded-b-md z-20">★</div>
                    <div className="w-full h-24 bg-[#fe8204] rounded-[1.5rem] flex items-center justify-center text-white">
                      <span className="text-4xl font-bold">{visibleReviews[5].name.charAt(0)}</span>
                    </div>
                    <div className="text-center px-2 pb-2">
                      <h5 className="font-bold text-gray-800 text-[10px] uppercase mb-1">{visibleReviews[5].title}</h5>
                      <div className="flex justify-center mb-2 scale-90"><StarRating rating={visibleReviews[5].rating} /></div>
                      <p className="text-gray-400 text-[9px] leading-snug">"{visibleReviews[5].text}"</p>
                    </div>
                  </div>
                </AnimWrap>
              </div>
            </div>
          </div>

          {/* ================= COLUMN 3 ================= */}
          <div className="flex flex-col gap-10">
            <div>
              <AnimWrap id={visibleReviews[6].id} index={6} isInitial={isInitialMount.current}>
                <div className={`bg-white rounded-3xl overflow-hidden ${shadowStyle}`}>
                  <div className="bg-[#EBE5DF] px-6 py-4 flex justify-between items-center border-b border-gray-100">
                    <span className=" font-bold text-gray-800">{visibleReviews[6].title}</span>
                    <span className="text-xs text-gray-500">{visibleReviews[6].handle}</span>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-6">"{visibleReviews[6].text}"</p>
                    <div className="flex justify-between items-center">
                      <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-[#fe8204] transition-colors">Read More &rarr;</button>
                      <div className="flex gap-2 text-gray-300">
                        <span>♡</span><span>💬</span><span>↗</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimWrap>
            </div>

            <div className="relative pl-8 my-4">
              <AnimWrap id={visibleReviews[7].id} index={7} isInitial={isInitialMount.current}>
                <div className={`bg-white rounded-full p-5 pl-12 flex relative items-center gap-4 ${shadowStyle}`}>
                  <div 
                    className="absolute -left-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
                    style={{ border: `6px solid ${bgTheme}` }}
                  >
                    {visibleReviews[7].name.charAt(0)}
                  </div>
                  <div className="absolute -top-4 right-8 w-10 h-10 rounded-full bg-[#A7988A] text-white flex items-center justify-center text-lg shadow-md border-4 border-white">
                    👍
                  </div>
                  <div className="flex-1 pr-4">
                    <h4 className="text-sm font-bold text-gray-800 uppercase mb-1">{visibleReviews[7].name}</h4>
                    <p className="text-gray-500 text-[10px] leading-tight mb-2 pr-8">{visibleReviews[7].text}</p>
                    <StarRating rating={visibleReviews[7].rating} />
                  </div>
                </div>
              </AnimWrap>
            </div>

            <div className="relative mt-8">
              <AnimWrap id={visibleReviews[8].id} index={8} isInitial={isInitialMount.current}>
                <div className={`bg-white rounded-[2rem] rounded-bl-none p-8 relative ${shadowStyle}`}>
                  <div className="absolute -bottom-6 left-6 text-7xl text-gray-400 leading-none rotate-180 opacity-50">“</div>
                  <p className="text-gray-600 text-sm mb-6">"{visibleReviews[8].text}"</p>
                  <div className="flex justify-end pr-16 text-right flex-col">
                    <span className=" text-xl text-gray-400">{visibleReviews[8].name}</span>
                    <span className="text-[10px] text-gray-400">{visibleReviews[8].handle}</span>
                  </div>
                  <div 
                    className="absolute -bottom-6 -right-2 w-16 h-16 rounded-full bg-[#fe8204] text-white flex items-center justify-center text-2xl font-bold uppercase"
                    style={{ border: `6px solid ${bgTheme}` }}
                  >
                    {visibleReviews[8].name.charAt(0)}
                  </div>
                </div>
              </AnimWrap>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}