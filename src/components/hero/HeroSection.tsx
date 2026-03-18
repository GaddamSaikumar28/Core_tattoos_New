

"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  motion,
  Variants,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
  useMotionValue,
  animate,
} from "framer-motion";
import Image from "next/image";
import { cn } from "../../lib/utils";

// ─── Data ──────────────────────────────────────────────────────────────────────

const GALLERY_IMAGES = [
  { id: 1,  src: "/assets/images/Card1.png", alt: "Spider tattoo blackwork",     tag: "botanical" },
  { id: 2,  src: "/assets/images/Card2.png", alt: "Snake and dagger tattoo",     tag: "darkarts"  },
  { id: 3,  src: "/assets/images/Card3.png", alt: "Tattoo artist portrait",      tag: "botanical" },
  { id: 4,  src: "/assets/images/Card4.png", alt: "Spiked flail leg tattoo",     tag: "darkarts"  },
  { id: 5,  src: "/assets/images/Card5.png", alt: "Skull and crossbones tattoo", tag: "darkarts"  },
  { id: 6,  src: "/assets/images/Card6.png", alt: "Skull and crossbones tattoo", tag: "darkarts"  },
  { id: 7,  src: "/assets/images/Card7.png", alt: "Skull and crossbones tattoo", tag: "darkarts"  },
  { id: 8,  src: "/assets/images/Card8.png", alt: "Rose tattoo design",          tag: "roses"     },
  { id: 9,  src: "/assets/images/Card3.png", alt: "Dragon back piece",           tag: "botanical" },
  { id: 10, src: "/assets/images/Card4.png", alt: "Dragon back piece",           tag: "darkarts"  },
];

const PRODUCT_DATA = [
  { 
    id: 1, tag: "botanical", title: "Botanical Ink", desc: "Set of 15 waterproof designs. Lasts 3-5 days. Skin-safe.", price: "$3.99", oldPrice: "$4.99", image: "/assets/images/Card1.png", sideImage: "/assets/images/tiktok.svg" 
  },
  { 
    id: 2, tag: "darkarts", title: "Dark Arts", desc: "Set of 10 waterproof designs. Lasts 3-5 days. Skin-safe.", price: "$4.99", oldPrice: "$6.99", image: "/assets/images/Card2.png", sideImage: "/assets/images/tiktok.svg" 
  },
  { 
    id: 3, tag: "botanical", title: "Botanical Ink", desc: "Set of 15 waterproof designs. Lasts 3-5 days. Skin-safe.", price: "$3.99", oldPrice: "$4.99", image: "/assets/images/Card3.png", sideImage: "/assets/images/tiktok.svg" 
  },
  { 
    id: 4, tag: "darkarts", title: "Dark Arts", desc: "Set of 10 waterproof designs. Lasts 3-5 days. Skin-safe.", price: "$4.99", oldPrice: "$6.99", image: "/assets/images/Card4.png", sideImage: "/assets/images/tiktok.svg" 
  },
  { 
    id: 5, tag: "darkarts", title: "Dark Arts", desc: "Set of 10 waterproof designs. Lasts 3-5 days. Skin-safe.", price: "$4.99", oldPrice: "$6.99", image: "/assets/images/Card5.png", sideImage: "/assets/images/tiktok.svg" 
  },
  { 
    id: 6, tag: "darkarts", title: "Dark Arts", desc: "Set of 10 waterproof designs. Lasts 3-5 days. Skin-safe.", price: "$4.99", oldPrice: "$6.99", image: "/assets/images/Card6.png", sideImage: "/assets/images/tiktok.svg" 
  },
  { 
    id: 7, tag: "darkarts", title: "Dark Arts", desc: "Set of 10 waterproof designs. Lasts 3-5 days. Skin-safe.", price: "$4.99", oldPrice: "$6.99", image: "/assets/images/Card7.png", sideImage: "/assets/images/tiktok.svg" 
  },
  { 
    id: 8, tag: "roses", title: "Classic Roses", desc: "Set of 5 waterproof designs. Lasts 3-5 days. Skin-safe.", price: "$2.99", oldPrice: "$3.99", image: "/assets/images/Card8.png", sideImage: "/assets/images/tiktok.svg" 
  },
  { 
    id: 9, tag: "botanical", title: "Botanical Ink", desc: "Set of 15 waterproof designs. Lasts 3-5 days. Skin-safe.", price: "$3.99", oldPrice: "$4.99", image: "/assets/images/Card3.png", sideImage: "/assets/images/tiktok.svg" 
  },
  { 
    id: 10, tag: "darkarts", title: "Dark Arts", desc: "Set of 10 waterproof designs. Lasts 3-5 days. Skin-safe.", price: "$4.99", oldPrice: "$6.99", image: "/assets/images/Card4.png", sideImage: "/assets/images/tiktok.svg" 
  },
];

// ─── Continuous Card Layout Engine ──────────────────────────────────────────────

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

const getContinuousConfig = (diff: number) => {
  const abs = Math.abs(diff);
  const sign = Math.sign(diff) || 1;

  const getConfig = (val: number) => {
    if (val === 0) return { x: 0,   scale: 1,    rotateY: 0,   z: 0,   zIndex: 50, opacity: 1    };
    if (val === 1) return { x: 95,  scale: 0.85, rotateY: -12, z: 50,  zIndex: 40, opacity: 0.95 };
    if (val === 2) return { x: 190, scale: 0.9,  rotateY: -28, z: 100, zIndex: 30, opacity: 0.8  };
    if (val === 3) return { x: 310, scale: 1,    rotateY: -38, z: 150, zIndex: 20, opacity: 0.6  };
    if (val === 4) return { x: 380, scale: 1.1,  rotateY: -50, z: 250, zIndex: 10, opacity: 0    };
    return                { x: 500, scale: 1.2,  rotateY: -60, z: 300, zIndex: 5,  opacity: 0    };
  };

  if (abs >= 5) {
    const c = getConfig(5);
    return { x: `${c.x * sign}%`, scale: c.scale, rotateY: c.rotateY * sign, z: c.z, zIndex: c.zIndex, opacity: c.opacity };
  }

  const lowerAbs = Math.floor(abs);
  const upperAbs = Math.ceil(abs);
  const fraction = abs - lowerAbs;

  const c1 = getConfig(lowerAbs);
  const c2 = getConfig(upperAbs);

  const xLower = c1.x * sign;
  const xUpper = c2.x * sign;
  const rotLower = c1.rotateY * sign;
  const rotUpper = c2.rotateY * sign;

  return {
    x: `${lerp(xLower, xUpper, fraction)}%`,
    scale: lerp(c1.scale, c2.scale, fraction),
    rotateY: lerp(rotLower, rotUpper, fraction),
    z: lerp(c1.z, c2.z, fraction),
    zIndex: fraction < 0.5 ? c1.zIndex : c2.zIndex,
    opacity: lerp(c1.opacity, c2.opacity, fraction),
  };
};

// ─── Animation variants ─────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const textVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const wheelVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 300 : -300, y: 0, rotate: dir > 0 ? 30 : -30, opacity: 0, scale: 0.8,
  }),
  center: {
    x: 0, y: 0, rotate: 0, opacity: 1, scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 15, opacity: { duration: 0.25, ease: "easeIn" } },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -300 : 300, y: 0, rotate: dir > 0 ? -30 : 30, opacity: 0, scale: 0.8,
    transition: { type: "spring", stiffness: 80, damping: 15, opacity: { duration: 0.15, ease: "easeOut" } },
  }),
};

const contentVariants: Variants = {
  hidden:  { opacity: 0, y: 7 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.11 } }),
};

// ─── Component ──────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [activeIndex,  setActiveIndex]  = useState(0);
  const [productIndex, setProductIndex] = useState(0);
  const [direction,    setDirection]    = useState(1);
  const [cardSettled,  setCardSettled]  = useState(true);

  const sliderProgress = useMotionValue(0);

  const galleryAnchorRef  = useRef<HTMLDivElement>(null); 
  const productCardRef    = useRef<HTMLDivElement>(null);
  const sectionRef        = useRef<HTMLElement>(null);
  useInView(sectionRef, { amount: 0.2 });

  const { scrollY } = useScroll();
  const rawCardY = useTransform(scrollY, [0, 600], [0, 1]);
  const smoothProgress = useSpring(rawCardY, { stiffness: 50, damping: 18, mass: 0.5 });
  const showcaseElementsOpacity = useTransform(smoothProgress, [0.85, 1], [0, 1]);
  const productCardOpacity = useTransform(smoothProgress, [0.99, 1], [0, 1]);

  const totalCards = GALLERY_IMAGES.length;

  useEffect(() => {
    const controls = animate(sliderProgress, activeIndex, {
      type: "spring", stiffness: 150, damping: 20, mass: 1
    });
    return controls.stop;
  }, [activeIndex, sliderProgress]);

  useEffect(() => {
    const id = GALLERY_IMAGES[activeIndex]?.id;
    const idx = PRODUCT_DATA.findIndex((p) => p.id === id);
    if (idx !== -1 && idx !== productIndex) {
      setDirection(idx > productIndex ? 1 : -1);
      setCardSettled(false);
      setProductIndex(idx);
    }
  }, [activeIndex, productIndex]);

  const handleNext = useCallback(() => setActiveIndex((p) => (p + 1) % totalCards), [totalCards]);
  const handlePrev = useCallback(() => setActiveIndex((p) => (p - 1 + totalCards) % totalCards), [totalCards]);

  const nextProduct = () => {
    const nextIdx = (productIndex + 1) % PRODUCT_DATA.length;
    const id = PRODUCT_DATA[nextIdx].id;
    const gIdx = GALLERY_IMAGES.findIndex(img => img.id === id);
    if (gIdx !== -1) { setDirection(1); setActiveIndex(gIdx); }
  };
  
  const prevProduct = () => {
    const prevIdx = (productIndex - 1 + PRODUCT_DATA.length) % PRODUCT_DATA.length;
    const id = PRODUCT_DATA[prevIdx].id;
    const gIdx = GALLERY_IMAGES.findIndex(img => img.id === id);
    if (gIdx !== -1) { setDirection(-1); setActiveIndex(gIdx); }
  };

  const currentProduct = PRODUCT_DATA[productIndex];
  const [dropDistance, setDropDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      const galleryEl = galleryAnchorRef.current;
      const productEl = productCardRef.current;
      if (!galleryEl || !productEl) return;
      const gRect = galleryEl.getBoundingClientRect();
      const pRect = productEl.getBoundingClientRect();
      setDropDistance((pRect.top + window.scrollY + pRect.height / 2) - (gRect.top + window.scrollY + gRect.height / 2));
    };
    measure();
    window.addEventListener("resize", measure);
    const t1 = setTimeout(measure, 100);
    return () => { window.removeEventListener("resize", measure); clearTimeout(t1); };
  }, []);

  return (
    <div className="flex flex-col w-full overflow-x-hidden relative bg-[white]">

      <section
        ref={sectionRef}
        className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-10"
        style={{ zIndex: 50, overflow: "visible" }} /* FIX: Increased z-index to 50 so cards slide OVER bottom UI */
      >
         <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center z-0">
                <div className="absolute top-[-15%] w-[90%] h-[60%] bg-white/5 blur-[140px] rounded-full" />
                <div
                className="absolute inset-0 opacity-30 mix-blend-overlay"
                style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}
                />
            </div>
            
        <motion.div
          className="relative flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto flex-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ perspective: "1500px", overflow: "visible" }}
        >

          {/* Hero typography */}
          <div className="flex flex-col items-center justify-center relative z-10">
            <motion.h1
              variants={textVariants}
              className={cn(
                "font-heading text-[var(--color-brand-orange)] tracking-tight z-10 flex flex-col text-left",
                "text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]"
              )}
            >
              <span>REAL INK</span>
              <span className="ml-[1.6em]">YOUR WAY.</span>
            </motion.h1>

            <motion.p
              variants={textVariants}
              className="text-body text-black/70 max-w-3xl z-10 leading-relaxed"
            >
              Get the authentic tattoo look without the needle or the lifelong commitment. Our clinically
              tested, permanent ink sinks into the top layer of your skin, fully developing into a bold,{" "}
              <span className="text-[var(--color-brand-orange)] font-medium">
                realistic design within 24 hours.
              </span>
            </motion.p>
          </div>

          {/* ── 3D Gallery ───────────────────────────────────────────────────── */}
          <motion.div
            ref={galleryAnchorRef}
            className="relative w-full max-w-[1400px] h-[300px] sm:h-[350px] md:h-[400px] flex justify-center items-center cursor-grab active:cursor-grabbing mt-4"
            style={{ perspective: "1500px", transformStyle: "preserve-3d", touchAction: "pan-y", zIndex: 20, overflow: "visible" }}
            onPanEnd={(_, info) => {
              if (info.offset.x < -50) handleNext();
              else if (info.offset.x > 50) handlePrev();
            }}
          >
            {GALLERY_IMAGES.map((img, index) => {
              const cardConfig = useTransform(() => {
                let diff = index - sliderProgress.get();
                if (diff > totalCards / 2) diff -= totalCards;
                if (diff < -totalCards / 2) diff += totalCards;
                return getContinuousConfig(diff);
              });

              const cardX = useTransform(() => cardConfig.get().x);
              const cardRotateY = useTransform(() => cardConfig.get().rotateY);
              const cardZ = useTransform(() => cardConfig.get().z);
              const cardZIndex = useTransform(() => cardConfig.get().zIndex);

              // FIX: Opacity crossfade to kill the duplicate card instantly when settling
              const cardOpacity = useTransform(() => {
                const baseOpacity = cardConfig.get().opacity;
                if (index === activeIndex) {
                  const progress = smoothProgress.get();
                  if (progress > 0.99) {
                    return baseOpacity * (1 - (progress - 0.99) * 100);
                  }
                }
                return baseOpacity;
              });

              const cardY = useTransform(() => index === activeIndex ? smoothProgress.get() * dropDistance : 0);
              const cardFinalScale = useTransform(() => {
                const config = cardConfig.get();
                const progress = smoothProgress.get();
                if (index === activeIndex) return 0.85 + (0.15 * progress);
                return config.scale;
              });

              const overlayOp = useTransform(() => index === activeIndex ? Math.max(0, 0.6 - smoothProgress.get()) : 0.6);

              let discreteDiff = index - activeIndex;
              if (discreteDiff > totalCards / 2) discreteDiff -= totalCards;
              if (discreteDiff < -totalCards / 2) discreteDiff += totalCards;
              const isCenterCard = index === activeIndex;

              return (
                <motion.div
                  key={img.id}
                  onClick={() => { if (Math.abs(discreteDiff) <= 3) setActiveIndex(index); }}
                  className="absolute origin-center group w-[220px] h-[320px] md:w-[290px] md:h-[430px]"
                  style={{
                    x: cardX, y: cardY, rotateY: cardRotateY, z: cardZ, zIndex: cardZIndex, opacity: cardOpacity, scale: cardFinalScale,
                    pointerEvents: Math.abs(discreteDiff) > 3 ? "none" : "auto",
                    willChange: isCenterCard ? "transform, opacity" : "auto", 
                  }}
                >
                  <div 
                    className="relative w-full h-full shadow-2xl rounded-[20px] overflow-hidden border border-[var(--color-brand-orange)]/30 md:group-hover:border-[var(--color-brand-orange)] bg-black/40 backdrop-blur-sm transition-colors duration-300"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none"
                      style={{ opacity: overlayOp }}
                    />
                    <Image
                      src={img.src} alt={img.alt} fill priority={isCenterCard}
                      className="object-cover transition-transform duration-700 md:group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 30vw"
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            variants={textVariants}
            className="w-full max-w-[250px] md:max-w-[300px] mb-8 relative flex items-center justify-center mt-12 md:mt-4"
            style={{ zIndex: 5 }}
          >
            <motion.input
              type="range"
              min={0}
              max={totalCards - 1}
              step={0.01}
              value={sliderProgress}
              onChange={(e) => sliderProgress.set(parseFloat(e.target.value))}
              onPointerUp={(e) => setActiveIndex(Math.round(parseFloat(e.currentTarget.value)))}
              onTouchEnd={(e) => setActiveIndex(Math.round(parseFloat(e.currentTarget.value)))}
              className="w-full h-1.5 bg-black/10 rounded-full appearance-none cursor-pointer outline-none transition-all
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,0,0,0.5)]
                [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full
                hover:bg-black/30"
              aria-label="Gallery Scrollbar"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ══ PRODUCT SHOWCASE ══════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-32 pb-32">
        <motion.div
          className="relative w-full max-w-[1000px] aspect-square md:aspect-video flex items-center justify-center"
          style={{ opacity: showcaseElementsOpacity }} 
        >
          <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-[var(--color-brand-orange)] bg-[var(--color-brand-orange)] flex items-center justify-center z-0">
            <motion.div
              custom={0} variants={contentVariants} initial="hidden" animate={cardSettled ? "visible" : "hidden"}
              className="absolute -top-28 md:-top-24 left-1/2 -translate-x-1/2 w-[90vw] md:w-max text-center z-10"
            >
              <h3 className="text-4xl md:text-5xl font-[cursive] text-[#2d1b54] leading-snug drop-shadow-sm">
                {currentProduct.title}
              </h3>
            </motion.div>

            <motion.div
              custom={1} variants={contentVariants} initial="hidden" animate={cardSettled ? "visible" : "hidden"}
              className="absolute -bottom-45 md:-bottom-24 left-1/2 -translate-x-1/2 w-[85vw] md:w-[450px] text-center z-10"
            >
              <p className="text-xs md:text-base text-gray-500 leading-relaxed bg-white/60 backdrop-blur-md px-4 py-3 md:px-6 md:py-3 rounded-2xl shadow-sm border border-gray-200/50">
                {currentProduct.desc}
              </p>
            </motion.div>
            
            <span className="absolute top-4 md:top-5 text-[10px] md:text-xs text-black tracking-widest uppercase">Order</span>
            <span className="absolute bottom-4 md:bottom-5 text-[10px] md:text-xs text-black tracking-widest uppercase">Peel Off</span>
            <span className="absolute left-4 md:left-5 -rotate-90 text-[10px] md:text-xs text-black tracking-widest uppercase">Apply</span>
            <span className="absolute right-4 md:right-25 -rotate-90 text-[10px] md:text-xs text-black tracking-widest uppercase">Feel It</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`sale-${currentProduct.id}`}
              initial={{ opacity: 0, x: -24, rotate: -12 }}
              animate={ cardSettled ? { opacity: 1, x: 0, rotate: -12, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.18 } } : { opacity: 0, x: -24, rotate: -12, transition: { duration: 0.12 } } }
              exit={{ opacity: 0, x: -24, rotate: -12, transition: { duration: 0.12 } }}
              className="absolute -left-2 md:left-[10%] top-[10%] md:top-[25%] z-20 hover:scale-105 transition-transform cursor-default"
            >
              <div className="bg-white/80 backdrop-blur-md px-3 py-2 md:px-6 md:py-4 rounded-xl shadow-xl border border-white">
                <p className="text-[#4b2787] font-[cursive] text-base md:text-2xl">SALE</p>
                <p className="font-bold text-lg md:text-3xl text-[#2d1b54]">
                  {currentProduct.price} <span className="text-[10px] md:text-sm line-through text-gray-400">{currentProduct.oldPrice}</span>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* <div className="absolute -right-2 md:right-[10%] top-[20%] md:top-[35%] z-20 hover:scale-105 transition-transform">
            <div className="bg-white/60 backdrop-blur-xl w-24 h-24 md:w-48 md:h-48 rounded-2xl md:rounded-3xl shadow-xl border border-white/50 flex items-center justify-center relative overflow-hidden p-4">
               <div className="relative w-full h-full hover:rotate-180 transition-transform duration-700">
                 <Image src={currentProduct.sideImage} alt="Side visual" fill className="object-contain" />
              </div> 
              <span className="absolute top-1 right-1 md:top-4 md:right-4 text-[#2d1b54] text-sm md:text-2xl font-bold rotate-45">↘</span>
              <span className="absolute bottom-1 left-1 md:bottom-4 md:left-4 text-[#2d1b54] text-sm md:text-2xl font-bold -rotate-[135deg]">↘</span>
            </div>
          </div> */}

          <motion.div
            ref={productCardRef}
            style={{ opacity: productCardOpacity }}
            className="relative z-40 flex items-center justify-center w-[220px] h-[320px] md:w-[290px] md:h-[430px]"
          >
            <AnimatePresence custom={direction} mode="popLayout">
              {/* FIX: Unified border radius, shadow, and background styles so it exactly matches the dropped gallery card */}
              <motion.div
                key={currentProduct.id} custom={direction} variants={wheelVariants} initial="enter" animate="center" exit="exit"
                onAnimationComplete={(def) => { if (def === "center") setCardSettled(true); }}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm shadow-2xl rounded-[20px] border border-[var(--color-brand-orange)]/30 overflow-hidden flex flex-col"
              >
                <div className="relative flex-1 min-h-0 w-full overflow-hidden">
                  <Image src={currentProduct.image} alt={currentProduct.title} fill className="object-cover object-center" sizes="(max-width: 768px) 220px, 290px" />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="absolute -bottom-16 md:bottom-[5%] w-full flex justify-between px-[5%] md:px-[15%] items-center z-50">
            <div className="flex gap-2 md:gap-4 items-center">
              <button aria-label="Previous product" onClick={prevProduct} className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:scale-110 transition-transform text-[#2d1b54] font-bold">&lt;</button>
            </div>
            <div className="flex gap-2 items-center">
                <button className="bg-[var(--color-brand-orange)] text-white px-4 md:px-6 py-2 md:py-3 rounded-full border-[3px] border-black text-xs md:text-base font-medium hover:bg-[#7340d8] shadow-lg shadow-purple-500/30 transition-colors">
                    Buy Now
                </button>
                <button className="bg-[var(--color-brand-orange)] hidden sm:flex text-white px-4 md:px-6 py-2 md:py-3 rounded-full border-[3px] border-black text-xs md:text-base font-medium hover:bg-[#7340d8] shadow-lg shadow-purple-500/30 transition-colors items-center gap-2">
                    Add to Cart
                </button>
            </div>
            <div className="flex gap-2 md:gap-4 items-center">
              <button aria-label="Next product" onClick={nextProduct} className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:scale-110 transition-transform text-[#2d1b54] font-bold">&gt;</button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}