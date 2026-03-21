// "use client";

// import React, { useEffect, useRef, useState } from 'react';
// import Image from 'next/image';

// // 1. Explicitly typing the hook's return tuple prevents 'readonly' ref errors
// const useScrollReveal = (
//   options: IntersectionObserverInit = { threshold: 0.15 }
// ): [React.RefObject<HTMLDivElement | null>, boolean] => {
//   const ref = useRef<HTMLDivElement>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting) {
//         setIsVisible(true);
//         observer.unobserve(entry.target);
//       }
//     }, options);

//     const currentRef = ref.current;
//     if (currentRef) observer.observe(currentRef);
    
//     return () => {
//       if (currentRef) observer.unobserve(currentRef);
//     };
//   }, [options]);

//   return [ref, isVisible];
// };

// // 2. Extracted props to an interface for cleaner syntax
// interface ActionButtonProps {
//   text: string;
// }

// const ActionButton = ({ text }: ActionButtonProps) => (
//   <button 
//     className="group relative flex items-center justify-between w-[200px] h-[44px] bg-white rounded-full border border-black pl-4 pr-1 overflow-hidden transition-colors hover:bg-gray-100"
//   >
//     <span className="text-sm font-medium text-black z-10">
//       {text}
//     </span>
//     <div className="w-[34px] h-[34px] bg-black rounded-full flex items-center justify-center z-10 transition-transform group-hover:scale-95">
//       <svg width="12" height="10" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M8.5 1.5L13.5 6.5M13.5 6.5L8.5 11.5M13.5 6.5H1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     </div>
//   </button>
// );

// export default function FeatureSection() {
//   const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.1 });
//   const [img1Ref, img1Visible] = useScrollReveal({ threshold: 0.2 });
//   const [card1Ref, card1Visible] = useScrollReveal({ threshold: 0.2 });
//   const [card2Ref, card2Visible] = useScrollReveal({ threshold: 0.2 });
//   const [img2Ref, img2Visible] = useScrollReveal({ threshold: 0.2 });

//   return (
//     <section className="w-full max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-20 overflow-hidden bg-white">
      
//       {/* Header Section */}
//       <div 
//         ref={headerRef}
//         className={`mb-8 md:mb-12 transition-all duration-700 ease-out ${
//           headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//         }`}
//       >
//         <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black mb-3 md:mb-4 flex items-center">
//           Real Art. <span className="ml-2 md:ml-3 text-gray-700">Real Fast.</span>
//         </h2>
//         <p className="text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
//           Get an authentic, tattoo-quality finish that develops in 24 hours. Our skin-safe formula is built for adventure and designed to fade naturally. Your style, your terms.
//         </p>
//       </div>

//       {/* Grid Layout */}
//       <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        
//         {/* Row 1: Left Image */}
//         <div 
//           ref={img1Ref}
//           className={`relative md:col-span-8 h-[300px] md:h-[380px] rounded-2xl overflow-hidden transition-all duration-1000 ease-out ${
//             img1Visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 md:-translate-x-12'
//           }`}
//         >
//           <Image 
//             src="/assets/images/SecondComponent1.png" 
//             alt="Tattoo applied on arm" 
//             fill
//             className="object-cover"
//             sizes="(max-width: 768px) 100vw, 66vw"
//             priority 
//           />
//         </div>

//         {/* Row 1: Right Black Card */}
//         <div 
//           ref={card1Ref}
//           className={`md:col-span-4 h-[300px] md:h-[380px] bg-black rounded-2xl p-6 md:p-8 flex flex-col justify-end transition-all duration-1000 md:delay-100 ease-out ${
//             card1Visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 md:translate-x-12'
//           }`}
//         >
//           <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
//             Built for Self-Expression
//           </h3>
//           <p className="text-sm md:text-base text-gray-300 mb-6 leading-relaxed">
//             Born from a love for tattoo culture and a fear of lifelong regret. Just Tattoos was created to let you test new ideas and make a statement whenever the mood strikes.
//           </p>
//           <ActionButton text="Read our story" />
//         </div>

//         {/* Row 2: Left Grey Card */}
//         <div 
//           ref={card2Ref}
//           className={`md:col-span-4 h-[300px] md:h-[380px] bg-[#f3f4f6] rounded-2xl p-6 md:p-8 flex flex-col justify-end transition-all duration-1000 ease-out ${
//             card2Visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 md:-translate-x-12'
//           }`}
//         >
//           <h3 className="text-xl md:text-2xl font-semibold text-black mb-3">
//             The 24-Hour Glow Up
//           </h3>
//           <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
//             Apply your design in minutes and watch the magic happen. Our ink develops over 24 hours to create a deep, realistic finish that lasts up to 10 days. No pain, just art.
//           </p>
//           <ActionButton text="How it works" />
//         </div>

//         {/* Row 2: Right Image */}
//         <div 
//           ref={img2Ref}
//           className={`relative md:col-span-8 h-[300px] md:h-[380px] rounded-2xl overflow-hidden transition-all duration-1000 md:delay-100 ease-out ${
//             img2Visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 md:translate-x-12'
//           }`}
//         >
//           <Image 
//             src="/assets/images/SecondComponent2.png" 
//             alt="Applying tattoo transfer" 
//             fill
//             className="object-cover"
//             sizes="(max-width: 768px) 100vw, 66vw"
//           />
//         </div>

//       </div>
//     </section>
//   );
// }

"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // 1. Added Next.js Link

// Explicitly typing the hook's return tuple prevents 'readonly' ref errors
const useScrollReveal = (
  options: IntersectionObserverInit = { threshold: 0.15 }
): [React.RefObject<HTMLDivElement | null>, boolean] => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options]);

  return [ref, isVisible];
};

// 2. Extracted props to an interface for cleaner syntax and added href
interface ActionButtonProps {
  text: string;
  href: string;
}

const ActionButton = ({ text, href }: ActionButtonProps) => (
  // 3. Changed from <button> to <Link> and added orange hover animations
  <Link 
    href={href}
    className="group relative flex items-center justify-between w-[200px] h-[44px] bg-white rounded-full border border-black pl-4 pr-1 overflow-hidden transition-all duration-300 hover:border-[#fe8204] hover:bg-[#fe8204]"
  >
    <span className="text-sm font-medium text-black z-10 transition-colors duration-300 group-hover:text-white">
      {text}
    </span>
    <div className="w-[34px] h-[34px] bg-black rounded-full flex items-center justify-center z-10 transition-all duration-300 group-hover:bg-white group-hover:translate-x-[2px]">
      <svg width="12" height="10" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M8.5 1.5L13.5 6.5M13.5 6.5L8.5 11.5M13.5 6.5H1.5" 
          className="stroke-white group-hover:stroke-[#fe8204] transition-colors duration-300"
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </Link>
);

export default function FeatureSection() {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.1 });
  const [img1Ref, img1Visible] = useScrollReveal({ threshold: 0.2 });
  const [card1Ref, card1Visible] = useScrollReveal({ threshold: 0.2 });
  const [card2Ref, card2Visible] = useScrollReveal({ threshold: 0.2 });
  const [img2Ref, img2Visible] = useScrollReveal({ threshold: 0.2 });

  return (
    <section className="w-full max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-20 overflow-hidden bg-white">
      
      {/* Header Section */}
      <div 
        ref={headerRef}
        className={`mb-8 md:mb-12 transition-all duration-700 ease-out ${
          headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black mb-3 md:mb-4 flex items-center">
          Real Art. <span className="ml-2 md:ml-3 text-gray-700">Real Fast.</span>
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
          Get an authentic, tattoo-quality finish that develops in 24 hours. Our skin-safe formula is built for adventure and designed to fade naturally. Your style, your terms.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        
        {/* Row 1: Left Image */}
        <div 
          ref={img1Ref}
          className={`relative md:col-span-8 h-[300px] md:h-[380px] rounded-2xl overflow-hidden transition-all duration-1000 ease-out ${
            img1Visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 md:-translate-x-12'
          }`}
        >
          <Image 
            src="/assets/images/SecondComponent1.png" 
            alt="Tattoo applied on arm" 
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 66vw"
            priority 
          />
        </div>

        {/* Row 1: Right Black Card */}
        <div 
          ref={card1Ref}
          className={`md:col-span-4 h-[300px] md:h-[380px] bg-black rounded-2xl p-6 md:p-8 flex flex-col justify-end transition-all duration-1000 md:delay-100 ease-out ${
            card1Visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 md:translate-x-12'
          }`}
        >
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
            Built for Self-Expression
          </h3>
          <p className="text-sm md:text-base text-gray-300 mb-6 leading-relaxed">
            Born from a love for tattoo culture and a fear of lifelong regret. Just Tattoos was created to let you test new ideas and make a statement whenever the mood strikes.
          </p>
          {/* 4. Added routing to /about */}
          <ActionButton text="Read our story" href="/about" />
        </div>

        {/* Row 2: Left Grey Card */}
        <div 
          ref={card2Ref}
          className={`md:col-span-4 h-[300px] md:h-[380px] bg-[#f3f4f6] rounded-2xl p-6 md:p-8 flex flex-col justify-end transition-all duration-1000 ease-out ${
            card2Visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 md:-translate-x-12'
          }`}
        >
          <h3 className="text-xl md:text-2xl font-semibold text-black mb-3">
            The 24-Hour Glow Up
          </h3>
          <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
            Apply your design in minutes and watch the magic happen. Our ink develops over 24 hours to create a deep, realistic finish that lasts up to 10 days. No pain, just art.
          </p>
          {/* 5. Added routing to /how-it-works */}
          <ActionButton text="How it works" href="/how-it-works" />
        </div>

        {/* Row 2: Right Image */}
        <div 
          ref={img2Ref}
          className={`relative md:col-span-8 h-[300px] md:h-[380px] rounded-2xl overflow-hidden transition-all duration-1000 md:delay-100 ease-out ${
            img2Visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 md:translate-x-12'
          }`}
        >
          <Image 
            src="/assets/images/SecondComponent2.png" 
            alt="Applying tattoo transfer" 
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 66vw"
          />
        </div>

      </div>
    </section>
  );
}