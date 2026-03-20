// "use client";

// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Image from 'next/image';

// export default function SplashScreen() {
//   // 1. Default showIntro to TRUE so it covers the screen immediately
//   const [showIntro, setShowIntro] = useState<boolean>(true);
//   const [isMounted, setIsMounted] = useState<boolean>(false);

//   useEffect(() => {
//     setIsMounted(true);
//     const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');

//     if (hasSeenSplash) {
//       setShowIntro(false);
//     } else {
//       // Lock scrolling while splash is active
//       document.body.style.overflow = 'hidden';

//       const timer = setTimeout(() => {
//         setShowIntro(false);
//         sessionStorage.setItem('hasSeenSplash', 'true');
//         document.body.style.overflow = ''; // Unlock scroll
//       }, 3500); 
      
//       return () => {
//         clearTimeout(timer);
//         document.body.style.overflow = '';
//       };
//     }
//   }, []);

//   // 2. THE ANTI-FLASH GUARD: 
//   // Before React hydrates, return a solid brand-white screen to hide the homepage.
//   if (!isMounted) {
//     return <div className="fixed inset-0 z-[100] bg-[var(--color-white)]" />;
//   }

//   return (
//     <AnimatePresence>
//       {showIntro && (
//         <motion.div
//           // Use client's exact white color variable
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-white)] overflow-hidden"
//           // Start fully opaque (1) so the homepage never peeks through
//           initial={{ opacity: 1 }} 
//           exit={{ 
//             opacity: 0, 
//             transition: { duration: 0.9, ease: 'easeInOut' } 
//           }}
//         >
//           <div className="relative w-full h-full max-w-[1440px] mx-auto flex items-center justify-center">
            
//             {/* Top-Left Butterfly */}
//             <motion.div 
//               className="absolute top-[8%] left-[5%] md:top-[9%] md:left-[5%] lg:top-[10%] lg:left-[7%]"
//               initial={{ opacity: 0 }} 
//               animate={{ opacity: 1 }} 
//               transition={{ duration: 1.4, ease: 'easeInOut' }}
//             >
//               <Image 
//                 src="/assets/icons/butterflys.svg" 
//                 alt="Butterfly"
//                 width={240}
//                 height={240}
//                 className="w-[100px] md:w-[150px] lg:w-[200px] xl:w-[240px] h-auto"
//                 priority
//               />
//             </motion.div>

//             {/* Dead-Center Logo */}
//             <motion.div 
//               className="relative z-10" 
//               initial={{ opacity: 0 }} 
//               animate={{ opacity: 1 }} 
//               transition={{ duration: 1, delay: 0.3, ease: 'easeInOut' }}
//             >
//               <Image 
//                 src="/assets/icons/DesktopLogo.svg" 
//                 alt="Core Tattoos Logo"
//                 width={360}
//                 height={150}
//                 className="w-[180px] sm:w-[240px] md:w-[280px] lg:w-[320px] xl:w-[360px] h-auto"
//                 priority
//               />
//             </motion.div>

//             {/* Bottom-Right Butterfly (Flipped via Tailwind scale-x-[-1]) */}
//             <motion.div 
//               className="absolute bottom-[8%] right-[5%] md:bottom-[12%] md:right-[8%] lg:bottom-[15%] lg:right-[12%]"
//               initial={{ opacity: 0 }} 
//               animate={{ opacity: 1 }} 
//               transition={{ duration: 1.4, ease: 'easeInOut' }}
//             >
//               <Image 
//                 src="assets/icons/butterfly2s2.svg" 
//                 alt="Butterfly"
//                 width={240}
//                 height={240}
//                 className="w-[100px] md:w-[150px] lg:w-[200px] xl:w-[240px] h-auto scale-x-[-1]"
//                 priority
//               />
//             </motion.div>
            
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }



"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';

// --- Framer Motion Variants ---
const containerVariants:Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
  exit: { 
    opacity: 0, 
    // Adds a subtle blur out effect to the whole container on exit
    filter: 'blur(10px)', 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } // Custom modern cubic-bezier ease
  }
};

const logoVariants:Variants = {
  hidden: { opacity: 0, scale: 0.85, filter: 'blur(8px)' },
  visible: { 
    opacity: 1, 
    scale: 1, 
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: "easeOut", delay: 0.2 } 
  }
};

const butterflyLeftVariants:Variants = {
  hidden: { opacity: 0, x: -40, y: 40, rotate: -15 },
  visible: { 
    opacity: 1, 
    x: 0, 
    y: 0, 
    rotate: 0,
    // Spring physics make it feel organic, like it's settling into place
    transition: { type: "spring", stiffness: 45, damping: 15, delay: 0.6 }
  }
};

const butterflyRightVariants:Variants = {
  hidden: { opacity: 0, x: 40, y: 40, rotate: 15 },
  visible: { 
    opacity: 1, 
    x: 0, 
    y: 0, 
    rotate: 0,
    transition: { type: "spring", stiffness: 45, damping: 15, delay: 0.8 }
  }
};

export default function SplashScreen() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');

    if (hasSeenSplash) {
      setShowIntro(false);
    } else {
      // Lock scrolling while splash is active
      document.body.style.overflow = 'hidden';

      const timer = setTimeout(() => {
        setShowIntro(false);
        sessionStorage.setItem('hasSeenSplash', 'true');
        document.body.style.overflow = ''; // Unlock scroll
      }, 3500); 
      
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, []);

  // Anti-flash hydration guard
  if (!isMounted) {
    return <div className="fixed inset-0 z-[100] bg-[var(--color-white)]" />;
  }

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          aria-hidden="true" // Screen-reader optimization for decorative screens
          // pointer-events-auto during animation, then none so it doesn't block the site while exiting
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-white)] overflow-hidden pointer-events-auto"
        >
          <div className="relative w-full h-full max-w-[1440px] mx-auto flex items-center justify-center">
            
            {/* Top-Left Butterfly */}
            <motion.div 
              variants={butterflyLeftVariants}
              className="absolute top-[8%] left-[5%] md:top-[9%] md:left-[5%] lg:top-[10%] lg:left-[7%]"
            >
              <Image 
                src="/assets/icons/butterflys.svg" 
                alt="Butterfly Decoration"
                width={240}
                height={240}
                className="w-[100px] md:w-[150px] lg:w-[200px] xl:w-[240px] h-auto drop-shadow-sm"
                priority
              />
            </motion.div>

            {/* Dead-Center Logo */}
            <motion.div 
              variants={logoVariants}
              className="relative z-10" 
            >
              <Image 
                src="/assets/icons/DesktopLogo.svg" 
                alt="Core Tattoos Logo"
                width={360}
                height={150}
                className="w-[180px] sm:w-[240px] md:w-[280px] lg:w-[320px] xl:w-[360px] h-auto drop-shadow-md"
                priority
              />
            </motion.div>

            {/* Bottom-Right Butterfly */}
            <motion.div 
              variants={butterflyRightVariants}
              className="absolute bottom-[8%] right-[5%] md:bottom-[12%] md:right-[8%] lg:bottom-[15%] lg:right-[12%]"
            >
              <Image 
                src="/assets/icons/butterfly2s2.svg" 
                alt="Butterfly Decoration"
                width={240}
                height={240}
                className="w-[100px] md:w-[150px] lg:w-[200px] xl:w-[240px] h-auto scale-x-[-1] drop-shadow-sm"
                priority
              />
            </motion.div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}