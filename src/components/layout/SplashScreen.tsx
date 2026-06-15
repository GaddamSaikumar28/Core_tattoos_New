"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants, TargetAndTransition } from "framer-motion";
import Image from "next/image";

interface SplashScreenProps {
  logoUrl: string;
  leftImageUrl: string;
  rightImageUrl: string;
}

const isDev = process.env.NODE_ENV === "development";
const logWarning = (message: string) => {
  if (isDev) console.warn(message);
};

const premiumEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
  exit: {
    opacity: 0,
    filter: "blur(10px)",
    transition: { duration: 0.8, ease: premiumEase },
  },
};

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 15, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: premiumEase, delay: 0.1 },
  },
};

const leftButterflyVariants: Variants = {
  hidden: { opacity: 0, x: -60, y: 30, rotate: -15 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: { duration: 1.6, ease: premiumEase, delay: 0.3 },
  },
};

const rightButterflyVariants: Variants = {
  hidden: { opacity: 0, x: 60, y: 30, rotate: 15 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: { duration: 1.6, ease: premiumEase, delay: 0.45 },
  },
};

const floatAnimation: TargetAndTransition = {
  y: [0, -12, 0],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function SplashScreen({
  logoUrl,
  leftImageUrl,
  rightImageUrl,
}: SplashScreenProps) {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [canFloat, setCanFloat] = useState<boolean>(false);
  const mountTime = useRef(Date.now());

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

    if (hasSeenSplash) {
      setShowIntro(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const floatTimer = setTimeout(() => setCanFloat(true), 1600);

    const exitSplash = () => {
      setShowIntro(false);
      sessionStorage.setItem("hasSeenSplash", "true");
      window.dispatchEvent(new Event("splashComplete"));
      
      setTimeout(() => {
        document.body.style.overflow = "";
      }, 800);
    };

    const failSafeTimer = setTimeout(() => {
      logWarning("Splash screen fallback: WebGL took too long.");
      exitSplash();
    }, 4000);

    const handleThreeReady = () => {
      clearTimeout(failSafeTimer);
      
      const elapsed = Date.now() - mountTime.current;
      const minDisplayTime = 2000; 
      const remainingTime = Math.max(0, minDisplayTime - elapsed);

      setTimeout(() => {
        exitSplash();
      }, remainingTime);
    };

    window.addEventListener("threeAssetPipelineReady", handleThreeReady);

    return () => {
      clearTimeout(failSafeTimer);
      clearTimeout(floatTimer);
      window.removeEventListener("threeAssetPipelineReady", handleThreeReady);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        html.splash-completed #core-splash-root {
          display: none !important;
        }
      `}} />

      <AnimatePresence>
        {showIntro && (
          <motion.div
            id="core-splash-root"
            key="core-splash-root"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            aria-hidden="true"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] overflow-hidden select-none touch-none transform-gpu"
          >
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_50%)]" />

            <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto flex items-center justify-center px-4">
              
              {/* Left Decor Layer */}
              <motion.div
                variants={leftButterflyVariants}
                className="absolute top-[15%] left-[6%] sm:left-[10%] md:top-[18%] transform-gpu"
              >
                {/* FIXED: Replaced 'undefined' with a valid base target object { y: 0 } */}
                <motion.div animate={canFloat ? floatAnimation : { y: 0 }}>
                  <Image
                    src={leftImageUrl}
                    alt=""
                    width={220}
                    height={220}
                    sizes="(max-width: 768px) 90px, 220px"
                    className="w-[90px] sm:w-[140px] md:w-[180px] xl:w-[220px] h-auto opacity-85"
                    priority
                    quality={80}
                  />
                </motion.div>
              </motion.div>

              {/* Central Focal Point (Logo) */}
              <motion.div 
                variants={logoVariants} 
                className="relative z-20 mx-auto transform-gpu"
              >
                <Image
                  src={logoUrl}
                  alt="Logo"
                  width={340}
                  height={140}
                  sizes="(max-width: 768px) 180px, 340px"
                  className="w-[180px] sm:w-[240px] md:w-[290px] xl:w-[340px] h-auto"
                  priority
                  quality={90}
                />
              </motion.div>

              {/* Right Decor Layer */}
              <motion.div
                variants={rightButterflyVariants}
                className="absolute bottom-[15%] right-[6%] sm:right-[10%] md:bottom-[18%] transform-gpu"
              >
                {/* FIXED: Replaced 'undefined' with a valid base target object { y: 0 } */}
                <motion.div animate={canFloat ? floatAnimation : { y: 0 }}>
                  <Image
                    src={rightImageUrl}
                    alt=""
                    width={220}
                    height={220}
                    sizes="(max-width: 768px) 90px, 220px"
                    className="w-[90px] sm:w-[140px] md:w-[180px] xl:w-[220px] h-auto scale-x-[-1] opacity-85"
                    priority
                    quality={80}
                  />
                </motion.div>
              </motion.div>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}