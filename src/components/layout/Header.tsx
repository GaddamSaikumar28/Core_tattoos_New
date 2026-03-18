
// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence, Variants } from "framer-motion";
// import { 
//   Search, 
//   User, 
//   ShoppingBag, 
//   Menu, 
//   X, 
//   ChevronDown, 
//   LogOut, 
//   Settings 
// } from "lucide-react";
// import { cn } from "@/src/lib/utils"; // Ensure this path matches your project structure

// // --- Data Structures ---
// const COLLECTION_DATA = {
//   "BODY PART": ["Ankle & Wrist", "Back, Torso & Chest Pieces", "Foot", "Hand", "Leg & Arm pieces", "Sleeve", "Spine"],
//   "STYLES": ["Animal", "Celestial art", "Colored Art", "Couple art", "Fantasy", "Floral", "Insects", "Japanese art", "Nature", "Spiritual", "Symbols and quotes", "Tribal art"],
//   "SIZES": ["Small", "Medium", "Large"],
// };

// const HOW_IT_WORKS_DATA = ["Help Center", "About us", "How it works", "Help & FAQ"];

// export default function Header() {
//   const pathname = usePathname();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [hoveredNav, setHoveredNav] = useState<string | null>(null);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
//   const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  
//   // Mock Auth State (Replace with your actual auth hook, e.g., NextAuth or Supabase)
//   const [isLoggedIn, setIsLoggedIn] = useState(false); 
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

//   // --- Timeout ref to prevent jittery menu closing ---
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const handleMouseEnter = (navItem: string) => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     setHoveredNav(navItem);
//     setActiveDropdown(navItem);
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setHoveredNav(null);
//       setActiveDropdown(null);
//       setIsProfileMenuOpen(false);
//     }, 150); // 150ms buffer for smooth mouse movement
//   };

//   // --- Scroll & Body Lock ---
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (isMobileDrawerOpen) document.body.style.overflow = "hidden";
//     else document.body.style.overflow = "";
//     return () => { document.body.style.overflow = ""; }; // Cleanup on unmount
//   }, [isMobileDrawerOpen]);

//   const isActive = (path: string) => pathname?.includes(path);

//   // --- Animation Variants ---
//   const dropdownVariants: Variants = {
//     hidden: { opacity: 0, y: 10, scale: 0.98, filter: "blur(4px)" },
//     visible: { 
//       opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
//       transition: { type: "spring", stiffness: 400, damping: 30, mass: 0.8 }
//     },
//     exit: { 
//       opacity: 0, y: 5, scale: 0.98, filter: "blur(4px)",
//       transition: { duration: 0.15, ease: "easeOut" }
//     }
//   };

//   const drawerVariants: Variants = {
//     hidden: { x: "-100%" },
//     visible: { 
//       x: 0,
//       transition: { type: "spring", stiffness: 300, damping: 35 }
//     },
//     exit: { 
//       x: "-100%",
//       transition: { type: "spring", stiffness: 300, damping: 35 }
//     }
//   };

//   return (
//     <>
//       {/* ========================================== */}
//       {/* 1. MAIN HEADER CONTAINER                   */}
//       {/* ========================================== */}
//       <header
//         className={cn(
//           "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out",
//           isScrolled 
//             ? "h-16 md:h-20 bg-white/90 backdrop-blur-md shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border-b border-gray-200" 
//             : "h-20 md:h-24 bg-white border-b border-transparent"
//         )}
//       >
//         <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
          
//           {/* ========================================== */}
//           {/* 2. DESKTOP VIEW (Hidden on Mobile)         */}
//           {/* ========================================== */}
//           <div className="hidden md:flex items-center justify-between h-full">
//             {/* Logo */}
//             <Link 
//               href="/" 
//               className="relative z-50 flex-shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] rounded-sm transition-transform hover:scale-[1.02]"
//             >
//               <Image
//                 src="/assets/icons/DesktopLogo.svg"
//                 alt="Just Tattoos"
//                 width={140}
//                 height={48}
//                 className={cn("transition-all duration-300 w-auto", isScrolled ? "h-8" : "h-10")}
//                 priority
//               />
//             </Link>

//             {/* Desktop Navigation */}
//             <nav className="flex h-full items-center gap-1" onMouseLeave={handleMouseLeave}>
//               {/* Nav Item: New Arrival */}
//               <div className="relative h-full flex items-center px-5 cursor-pointer" onMouseEnter={() => handleMouseEnter("new-arrivals")}>
//                 {hoveredNav === "new-arrivals" && (
//                   <motion.div layoutId="nav-pill" className="absolute inset-y-5 inset-x-0 bg-gray-100/80 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
//                 )}
//                 <Link href="/new-arrivals" className={cn(
//                   "relative z-10 font-almarena font-bold text-[14px] tracking-wider transition-colors duration-300",
//                   isActive("/new-arrivals") ? "text-[var(--color-brand-orange)]" : "text-gray-900"
//                 )}>
//                   NEW ARRIVAL
//                 </Link>
//               </div>

//               {/* Nav Item: Collection (Mega Menu Trigger) */}
//               <div className="relative h-full flex items-center px-5 cursor-pointer" onMouseEnter={() => handleMouseEnter("collection")}>
//                 {hoveredNav === "collection" && (
//                   <motion.div layoutId="nav-pill" className="absolute inset-y-5 inset-x-0 bg-gray-100/80 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
//                 )}
//                 <span className={cn(
//                   "relative z-10 font-almarena font-bold text-[14px] tracking-wider transition-colors flex items-center gap-1.5",
//                   activeDropdown === "collection" || isActive("/collection") ? "text-[var(--color-brand-orange)]" : "text-gray-900"
//                 )}>
//                   COLLECTION
//                   <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", activeDropdown === "collection" && "rotate-180")} />
//                 </span>

//                 {/* Mega Menu Dropdown */}
//                 <AnimatePresence>
//                   {activeDropdown === "collection" && (
//                     <motion.div
//                       variants={dropdownVariants}
//                       initial="hidden"
//                       animate="visible"
//                       exit="exit"
//                       className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-[85vw] max-w-[1000px] bg-white rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-10 z-50 origin-top cursor-default"
//                     >
//                       <div className="grid grid-cols-3 gap-12">
//                         {Object.entries(COLLECTION_DATA).map(([category, items]) => (
//                           <div key={category} className="flex flex-col gap-5">
//                             <h3 className="font-almarena text-[var(--color-brand-orange)] text-[14px] font-bold tracking-widest uppercase border-b border-gray-100 pb-3">{category}</h3>
//                             <ul className="flex flex-col gap-3">
//                               {items.map((item) => (
//                                 <li key={item}>
//                                   <Link
//                                     href={`/collection/${item.toLowerCase().replace(/ & /g, "-").replace(/, /g, "-").replace(/ /g, "-")}`}
//                                     className="font-montserrat text-[14px] font-medium text-gray-600 hover:text-[var(--color-brand-orange)] hover:translate-x-1.5 transition-all duration-300 inline-block"
//                                     onClick={() => setActiveDropdown(null)}
//                                   >
//                                     {item}
//                                   </Link>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* Nav Item: Sale */}
//               <div className="relative h-full flex items-center px-5 cursor-pointer" onMouseEnter={() => handleMouseEnter("sale")}>
//                 {hoveredNav === "sale" && (
//                   <motion.div layoutId="nav-pill" className="absolute inset-y-5 inset-x-0 bg-gray-100/80 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
//                 )}
//                 <Link href="/sale" className={cn(
//                   "relative z-10 font-almarena font-bold text-[14px] tracking-wider transition-colors duration-300",
//                   isActive("/sale") ? "text-red-600" : "text-red-500 hover:text-red-600"
//                 )}>
//                   SALE
//                 </Link>
//               </div>

//               {/* Nav Item: How It Works */}
//               <div className="relative h-full flex items-center px-5 cursor-pointer" onMouseEnter={() => handleMouseEnter("how-it-works")}>
//                 {hoveredNav === "how-it-works" && (
//                   <motion.div layoutId="nav-pill" className="absolute inset-y-5 inset-x-0 bg-gray-100/80 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
//                 )}
//                 <span className={cn(
//                   "relative z-10 font-almarena font-bold text-[14px] tracking-wider transition-colors flex items-center gap-1.5",
//                   activeDropdown === "how-it-works" || isActive("/how-it-works") ? "text-[var(--color-brand-orange)]" : "text-gray-900"
//                 )}>
//                   HOW IT WORKS
//                   <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", activeDropdown === "how-it-works" && "rotate-180")} />
//                 </span>

//                 <AnimatePresence>
//                   {activeDropdown === "how-it-works" && (
//                     <motion.div
//                       variants={dropdownVariants}
//                       initial="hidden"
//                       animate="visible"
//                       exit="exit"
//                       className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-[500px] bg-white rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-6 z-50 origin-top"
//                     >
//                       <div className="grid grid-cols-2 gap-3 w-full">
//                         {HOW_IT_WORKS_DATA.map((item) => (
//                           <Link
//                             key={item}
//                             href={`/${item.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
//                             className="font-almarena text-[14px] font-bold text-gray-700 hover:text-[var(--color-brand-orange)] hover:bg-orange-50/50 p-4 rounded-xl transition-all duration-300 flex items-center justify-between group"
//                             onClick={() => setActiveDropdown(null)}
//                           >
//                             {item}
//                             <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-[var(--color-brand-orange)] transition-all">→</span>
//                           </Link>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </nav>

//             {/* Desktop Utility Icons & Auth */}
//             <div className="flex items-center gap-5">
//               <button aria-label="Search" className="text-gray-900 hover:text-[var(--color-brand-orange)] p-2 rounded-full hover:bg-gray-50 transition-all outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]">
//                 <Search className="w-5 h-5" strokeWidth={1.8} />
//               </button>
              
//               <button aria-label="Cart" className="text-gray-900 hover:text-[var(--color-brand-orange)] p-2 rounded-full hover:bg-gray-50 transition-all relative group outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]">
//                 <ShoppingBag className="w-5 h-5" strokeWidth={1.8} />
//                 <span className="absolute top-0 right-0 bg-[var(--color-brand-orange)] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full font-montserrat shadow-sm transform group-hover:scale-110 transition-transform">
//                   2
//                 </span>
//               </button>

//               {/* Auth Branching */}
//               <div className="pl-5 border-l border-gray-200 flex items-center gap-4 h-8">
//                 {!isLoggedIn ? (
//                   <>
//                     <Link href="/login" className="font-montserrat font-semibold text-[14px] text-gray-700 hover:text-[var(--color-brand-orange)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-brand-orange)] rounded-sm">
//                       Log in
//                     </Link>
//                     <Link href="/register" className="font-montserrat font-bold text-[13px] bg-gray-900 text-white px-6 py-2.5 rounded-full hover:bg-[var(--color-brand-orange)] hover:shadow-md transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-brand-orange)]">
//                       Sign up
//                     </Link>
//                   </>
//                 ) : (
//                   <div className="relative" onMouseLeave={() => setIsProfileMenuOpen(false)}>
//                     <button 
//                       onMouseEnter={() => setIsProfileMenuOpen(true)}
//                       className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-brand-orange)] rounded-full transition-transform hover:scale-105"
//                     >
//                       <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-400 to-[var(--color-brand-orange)] p-[2px] shadow-sm">
//                         <div className="w-full h-full bg-white rounded-full border border-white flex items-center justify-center overflow-hidden">
//                           <User className="w-5 h-5 text-gray-600" />
//                         </div>
//                       </div>
//                     </button>

//                     <AnimatePresence>
//                       {isProfileMenuOpen && (
//                         <motion.div
//                           variants={dropdownVariants}
//                           initial="hidden"
//                           animate="visible"
//                           exit="exit"
//                           className="absolute top-[calc(100%+8px)] right-0 w-52 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-50 origin-top-right"
//                         >
//                           <Link href="/account" className="flex items-center gap-3 px-5 py-3 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[var(--color-brand-orange)] font-montserrat transition-colors">
//                             <Settings className="w-4 h-4" /> Account Settings
//                           </Link>
//                           <Link href="/orders" className="flex items-center gap-3 px-5 py-3 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[var(--color-brand-orange)] font-montserrat transition-colors">
//                             <ShoppingBag className="w-4 h-4" /> My Orders
//                           </Link>
//                           <div className="h-px bg-gray-100 my-1"></div>
//                           <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center gap-3 px-5 py-3 text-[14px] text-red-600 hover:bg-red-50 font-montserrat transition-colors">
//                             <LogOut className="w-4 h-4" /> Sign Out
//                           </button>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* ========================================== */}
//           {/* 3. MOBILE VIEW (Hidden on Desktop)         */}
//           {/* ========================================== */}
//           <div className="flex md:hidden items-center justify-between w-full h-full">
            
//             {/* Left: Hamburger Menu */}
//             <div className="flex-1 flex justify-start">
//               <button 
//                 aria-label="Open Menu"
//                 onClick={() => setIsMobileDrawerOpen(true)}
//                 className="text-gray-900 p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] outline-none"
//               >
//                 <Menu className="w-6 h-6" strokeWidth={1.5} />
//               </button>
//             </div>

//             {/* Center: Logo */}
//             <div className="flex-1 flex justify-center">
//               <Link href="/" className="outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] rounded-sm">
//                 <Image
//                   src="/assets/icons/DesktopLogo.svg"
//                   alt="Just Tattoos"
//                   width={110}
//                   height={32}
//                   className="w-auto h-7 object-contain"
//                   priority
//                 />
//               </Link>
//             </div>

//             {/* Right: Search & Cart Icons */}
//             <div className="flex-1 flex justify-end items-center gap-2 sm:gap-4">
//               <button aria-label="Search" className="text-gray-900 p-2 hover:bg-gray-100 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]">
//                 <Search className="w-5 h-5" strokeWidth={1.5} />
//               </button>
//               <button aria-label="Cart" className="text-gray-900 p-2 hover:bg-gray-100 rounded-full transition-colors relative group outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]">
//                 <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
//                 <span className="absolute top-1 right-1 bg-[var(--color-brand-orange)] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
//                   2
//                 </span>
//               </button>
//             </div>

//           </div>
//         </div>
//       </header>

//       {/* ========================================== */}
//       {/* 4. MOBILE SLIDE-OUT DRAWER                 */}
//       {/* ========================================== */}
//       <AnimatePresence>
//         {isMobileDrawerOpen && (
//           <>
//             {/* Dark Overlay */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsMobileDrawerOpen(false)}
//               className="md:hidden fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity"
//             />
            
//             {/* Drawer Panel */}
//             <motion.div
//               variants={drawerVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="md:hidden fixed top-0 left-0 w-[85vw] max-w-[360px] h-[100dvh] bg-white shadow-2xl z-[70] flex flex-col"
//             >
//               {/* Drawer Header */}
//               <div className="p-5 flex justify-between items-center border-b border-gray-100 bg-gray-50/80">
//                 <Image src="/assets/icons/DesktopLogo.svg" alt="Just Tattoos" width={100} height={28} className="w-auto h-6" />
//                 <button 
//                   onClick={() => setIsMobileDrawerOpen(false)} 
//                   className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:bg-[var(--color-brand-orange)] hover:text-white hover:border-transparent transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>

//               {/* Drawer Scrollable Content */}
//               <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-8">
                
//                 {/* Auth Block Mobile */}
//                 {!isLoggedIn ? (
//                   <div className="flex flex-col gap-3 pb-8 border-b border-gray-100">
//                     <Link href="/login" onClick={() => setIsMobileDrawerOpen(false)} className="w-full py-3.5 text-center rounded-xl border-2 border-gray-100 font-montserrat font-bold text-[14px] hover:border-[var(--color-brand-orange)] hover:text-[var(--color-brand-orange)] transition-colors">
//                       Log in
//                     </Link>
//                     <Link href="/register" onClick={() => setIsMobileDrawerOpen(false)} className="w-full py-3.5 text-center rounded-xl bg-gray-900 text-white font-montserrat font-bold text-[14px] hover:bg-[var(--color-brand-orange)] shadow-md transition-all">
//                       Create Account
//                     </Link>
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-4 pb-8 border-b border-gray-100">
//                     <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center">
//                       <User className="w-6 h-6 text-[var(--color-brand-orange)]" />
//                     </div>
//                     <div className="flex-1">
//                       <p className="font-montserrat font-bold text-[15px] text-gray-900">My Account</p>
//                       <button onClick={() => setIsLoggedIn(false)} className="text-[13px] text-gray-500 hover:text-red-500 font-medium mt-0.5 transition-colors">Sign out</button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Mobile Links */}
//                 <div className="flex flex-col gap-6">
//                   <Link href="/new-arrivals" className="font-almarena text-[16px] font-bold text-gray-900 flex items-center justify-between group" onClick={() => setIsMobileDrawerOpen(false)}>
//                     NEW ARRIVAL <span className="text-gray-300 group-hover:text-[var(--color-brand-orange)] group-hover:translate-x-1 transition-all">→</span>
//                   </Link>

//                   {/* Mobile Collection Accordion */}
//                   <div className="flex flex-col gap-4">
//                     <button 
//                       className="flex justify-between items-center font-almarena text-[16px] font-bold text-gray-900 w-full text-left"
//                       onClick={() => setMobileExpanded(mobileExpanded === "collection" ? null : "collection")}
//                     >
//                       COLLECTION
//                       <ChevronDown className={cn("w-5 h-5 transition-transform duration-300 text-gray-400", mobileExpanded === "collection" && "rotate-180 text-[var(--color-brand-orange)]")} />
//                     </button>
                    
//                     <AnimatePresence>
//                       {mobileExpanded === "collection" && (
//                         <motion.div 
//                           initial={{ height: 0, opacity: 0 }}
//                           animate={{ height: "auto", opacity: 1 }}
//                           exit={{ height: 0, opacity: 0 }}
//                           className="overflow-hidden flex flex-col gap-6 pl-4 border-l-2 border-[var(--color-brand-orange)]/20 ml-1"
//                         >
//                           {Object.entries(COLLECTION_DATA).map(([category, items]) => (
//                               <div key={category} className="flex flex-col gap-3 py-1 mt-2">
//                                 <h4 className="font-almarena text-[var(--color-brand-orange)] text-[13px] font-bold tracking-wider">{category}</h4>
//                                 {items.map(item => (
//                                   <Link 
//                                     key={item} 
//                                     href={`/collection/${item.toLowerCase().replace(/ & /g, "-").replace(/, /g, "-").replace(/ /g, "-")}`}
//                                     className="font-montserrat text-gray-600 text-[14px] font-medium hover:text-[var(--color-brand-orange)] transition-colors py-1"
//                                     onClick={() => setIsMobileDrawerOpen(false)}
//                                   >
//                                     {item}
//                                   </Link>
//                                 ))}
//                               </div>
//                           ))}
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>

//                   <Link href="/sale" className="font-almarena text-[16px] font-bold text-red-500 flex items-center justify-between group" onClick={() => setIsMobileDrawerOpen(false)}>
//                     SALE <span className="text-red-200 group-hover:text-red-500 group-hover:translate-x-1 transition-all">→</span>
//                   </Link>
//                 </div>

//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Search, 
  User, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown, 
  LogOut, 
  Settings 
} from "lucide-react";
import { cn } from "@/src/lib/utils"; // Ensure this path matches your project structure
// --- Data Structures ---
const COLLECTION_DATA = {
  "BODY PART": ["Ankle & Wrist", "Back, Torso & Chest Pieces", "Foot", "Hand", "Leg & Arm pieces", "Sleeve", "Spine"],
  "STYLES": ["Animal", "Celestial art", "Colored Art", "Couple art", "Fantasy", "Floral", "Insects", "Japanese art", "Nature", "Spiritual", "Symbols and quotes", "Tribal art"],
  "SIZES": ["Small", "Medium", "Large"],
};

const HOW_IT_WORKS_DATA = ["Help Center", "About us", "How it works", "Help & FAQ"];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  
  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Mock Auth State (Replace with your actual auth hook)
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // --- Timeout ref to prevent jittery menu closing ---
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (navItem: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredNav(navItem);
    setActiveDropdown(navItem);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredNav(null);
      setActiveDropdown(null);
      setIsProfileMenuOpen(false);
    }, 150); // 150ms buffer for smooth mouse movement
  };

  // --- Scroll & Body Lock ---
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileDrawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; }; // Cleanup on unmount
  }, [isMobileDrawerOpen]);

  const isActive = (path: string) => pathname?.includes(path);

  // --- Animation Variants ---
  const dropdownVariants: Variants = {
    hidden: { opacity: 0, y: 10, scale: 0.98, filter: "blur(4px)" },
    visible: { 
      opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
      transition: { type: "spring", stiffness: 400, damping: 30, mass: 0.8 }
    },
    exit: { 
      opacity: 0, y: 5, scale: 0.98, filter: "blur(4px)",
      transition: { duration: 0.15, ease: "easeOut" }
    }
  };

  const drawerVariants: Variants = {
    hidden: { x: "-100%" },
    visible: { 
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 35 }
    },
    exit: { 
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 35 }
    }
  };

  return (
    <>
      {/* ========================================== */}
      {/* 1. MAIN HEADER CONTAINER                   */}
      {/* ========================================== */}
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out",
          isScrolled || isSearchOpen
            ? "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border-b border-gray-200" 
            : "bg-white border-b border-transparent",
          isScrolled ? "h-16 md:h-20" : "h-20 md:h-24"
        )}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full relative">
          
          {/* ========================================== */}
          {/* 2. DESKTOP VIEW (Hidden on Mobile)         */}
          {/* ========================================== */}
          <div className="hidden md:flex items-center w-full h-full">
            
            {/* LEFT: Logo (Using flex-1 to push nav to true center) */}
            <div className="flex-1 flex items-center justify-start">
              <Link 
                href="/" 
                className="relative z-50 flex-shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] rounded-sm transition-transform hover:scale-[1.02]"
              >
                <Image
                  src="/assets/icons/DesktopLogo.svg"
                  alt="Just Tattoos"
                  width={140}
                  height={48}
                  className={cn("transition-all duration-300 w-auto", isScrolled ? "h-8" : "h-10")}
                  priority
                />
              </Link>
            </div>

            {/* CENTER: Desktop Navigation */}
            <nav className="flex h-full items-center justify-center gap-2" onMouseLeave={handleMouseLeave}>
              {/* Nav Item: New Arrival */}
              <div className="relative h-full flex items-center px-4 cursor-pointer" onMouseEnter={() => handleMouseEnter("new-arrivals")}>
                {hoveredNav === "new-arrivals" && (
                  <motion.div layoutId="nav-pill" className="absolute inset-y-5 inset-x-0 bg-gray-100/80 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                <Link href="/new-arrivals" className={cn(
                  "relative z-10 font-almarena font-bold text-[14px] tracking-wider transition-colors duration-300",
                  isActive("/new-arrivals") ? "text-[var(--color-brand-orange)]" : "text-gray-900"
                )}>
                  NEW ARRIVAL
                </Link>
              </div>

              {/* Nav Item: Collection (Mega Menu Trigger) */}
              {/* <div className="relative h-full flex items-center px-4 cursor-pointer" onMouseEnter={() => handleMouseEnter("collection")}>
                {hoveredNav === "collection" && (
                  <motion.div layoutId="nav-pill" className="absolute inset-y-5 inset-x-0 bg-gray-100/80 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                <span className={cn(
                  "relative z-10 font-almarena font-bold text-[14px] tracking-wider transition-colors flex items-center gap-1.5",
                  activeDropdown === "collection" || isActive("/collection") ? "text-[var(--color-brand-orange)]" : "text-gray-900"
                )}>
                  COLLECTION
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", activeDropdown === "collection" && "rotate-180")} />
                </span>

             
                <AnimatePresence>
                  {activeDropdown === "collection" && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-[90vw] max-w-[1100px] bg-white rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50 origin-top cursor-default flex"
                    >
                     
                      <div className="flex-1 p-10 grid grid-cols-3 gap-8">
                        {Object.entries(COLLECTION_DATA).map(([category, items]) => (
                          <div key={category} className="flex flex-col gap-6">
                            <h3 className="font-almarena text-[var(--color-brand-orange)] text-[13px] font-bold tracking-widest uppercase">{category}</h3>
                            <ul className="flex flex-col gap-3.5">
                              {items.map((item) => (
                                <li key={item}>
                                  <Link
                                    href={`/collection/${item.toLowerCase().replace(/ & /g, "-").replace(/, /g, "-").replace(/ /g, "-")}`}
                                    className="font-montserrat text-[14px] font-medium text-gray-600 hover:text-gray-900 hover:translate-x-1.5 transition-all duration-300 inline-block"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      
                      <div className="w-[35%] bg-gray-50 flex items-center justify-center relative p-8">
                        <div className="relative w-full max-w-[220px] aspect-[3/4]">
                       
                           <div className="absolute inset-0 bg-white border border-gray-200 rounded-xl shadow-lg rotate-6 translate-x-6 origin-bottom-right"></div>
                           <div className="absolute inset-0 bg-white border border-gray-200 rounded-xl shadow-lg -rotate-3 -translate-x-3 origin-bottom-left"></div>
                           <div className="absolute inset-0 bg-gray-900 rounded-xl shadow-xl flex items-center justify-center border-4 border-white overflow-hidden z-10">
                             
                              <div className="w-full h-full bg-[var(--color-brand-orange)]/20 flex items-center justify-center">
                                <span className="text-gray-900 font-almarena font-bold text-sm">Featured Art</span>
                              </div>
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div> */}

              {/* Nav Item: Collection (Mega Menu Trigger) */}
              <div className="relative h-full flex items-center px-4 cursor-pointer" onMouseEnter={() => handleMouseEnter("collection")}>
                {hoveredNav === "collection" && (
                  <motion.div layoutId="nav-pill" className="absolute inset-y-5 inset-x-0 bg-gray-100/80 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                
                {/* Changed from span to Link pointing to /shopall */}
                <Link 
                  href="/collections"
                  onClick={() => setActiveDropdown(null)}
                  className={cn(
                    "relative z-10 font-almarena font-bold text-[14px] tracking-wider transition-colors flex items-center gap-1.5",
                    activeDropdown === "collection" || isActive("/shopall") || isActive("/collection") ? "text-[var(--color-brand-orange)]" : "text-gray-900"
                  )}
                >
                  COLLECTION
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", activeDropdown === "collection" && "rotate-180")} />
                </Link>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {activeDropdown === "collection" && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-[90vw] max-w-[1100px] bg-white rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50 origin-top cursor-default flex"
                    >
                      {/* Dropdown Left Side: Links */}
                      <div className="flex-1 p-10 grid grid-cols-3 gap-8">
                        {Object.entries(COLLECTION_DATA).map(([category, items]) => (
                          <div key={category} className="flex flex-col gap-6">
                            <h3 className="font-almarena text-[var(--color-brand-orange)] text-[13px] font-bold tracking-widest uppercase">{category}</h3>
                            <ul className="flex flex-col gap-3.5">
                              {items.map((item) => (
                                <li key={item}>
                                  <Link
                                    href={`/collection/${item.toLowerCase().replace(/ & /g, "-").replace(/, /g, "-").replace(/ /g, "-")}`}
                                    className="font-montserrat text-[14px] font-medium text-gray-600 hover:text-gray-900 hover:translate-x-1.5 transition-all duration-300 inline-block"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Dropdown Right Side: Featured/Images (Based on screenshot) */}
                      {/* <div className="w-[35%] bg-gray-50 flex items-center justify-center relative p-8">
                        <div className="relative w-full max-w-[220px] aspect-[3/4]">
                          
                           <div className="absolute inset-0 bg-white border border-gray-200 rounded-xl shadow-lg rotate-6 translate-x-6 origin-bottom-right"></div>
                           <div className="absolute inset-0 bg-white border border-gray-200 rounded-xl shadow-lg -rotate-3 -translate-x-3 origin-bottom-left"></div>
                           <div className="absolute inset-0 bg-gray-900 rounded-xl shadow-xl flex items-center justify-center border-4 border-white overflow-hidden z-10">
                             
                              <div className="w-full h-full bg-[var(--color-brand-orange)]/20 flex items-center justify-center">
                             
                                <Image 
                                   src={`/assets/icons/Card1.png`}
                                    alt="Infinity Logo" 
                                    className="h-5 md:h-6 w-auto object-contain"
                                    fill 
                                 />
                              </div> 
                           </div>
                        </div>
                      </div> */}
                      <div className="w-[35%] bg-gray-50 flex items-center justify-center relative p-8">
  <div className="relative w-full max-w-[220px] aspect-[3/4]">
    
    {/* Decorative Background Cards */}
    <div className="absolute inset-0 bg-white border border-gray-200 rounded-xl shadow-lg rotate-6 translate-x-6 origin-bottom-right"></div>
    <div className="absolute inset-0 bg-white border border-gray-200 rounded-xl shadow-lg -rotate-3 -translate-x-3 origin-bottom-left"></div>
    
    {/* Main Image Card */}
    <div className="absolute inset-0 bg-gray-900 rounded-xl shadow-xl flex items-center justify-center border-4 border-white overflow-hidden z-10">
      <div className="relative w-full h-full bg-[var(--color-brand-orange)]/20">
        <Image 
          src="/assets/images/Card1.png"
          alt="Featured Tattoo Art" 
          fill
          priority
          sizes="(max-width: 768px) 220px, 25vw"
          className="object-cover" // Changes to 'object-contain' if you don't want it cropped
        />
      </div> 
    </div>

  </div>
</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Nav Item: Sale */}
              <div className="relative h-full flex items-center px-4 cursor-pointer" onMouseEnter={() => handleMouseEnter("sale")}>
                {hoveredNav === "sale" && (
                  <motion.div layoutId="nav-pill" className="absolute inset-y-5 inset-x-0 bg-gray-100/80 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                <Link href="/sale" className={cn(
                  "relative z-10 font-almarena font-bold text-[14px] tracking-wider transition-colors duration-300",
                  isActive("/sale") ? "text-red-600" : "text-red-500 hover:text-red-600"
                )}>
                  SALE
                </Link>
              </div>

              {/* Nav Item: How It Works */}
              <div className="relative h-full flex items-center px-4 cursor-pointer" onMouseEnter={() => handleMouseEnter("how-it-works")}>
                {hoveredNav === "how-it-works" && (
                  <motion.div layoutId="nav-pill" className="absolute inset-y-5 inset-x-0 bg-gray-100/80 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                <span className={cn(
                  "relative z-10 font-almarena font-bold text-[14px] tracking-wider transition-colors flex items-center gap-1.5",
                  activeDropdown === "how-it-works" || isActive("/how-it-works") ? "text-[var(--color-brand-orange)]" : "text-gray-900"
                )}>
                  HOW IT WORKS
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", activeDropdown === "how-it-works" && "rotate-180")} />
                </span>

                <AnimatePresence>
                  {activeDropdown === "how-it-works" && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-[500px] bg-white rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-6 z-50 origin-top"
                    >
                      <div className="grid grid-cols-2 gap-3 w-full">
                        {HOW_IT_WORKS_DATA.map((item) => (
                          <Link
                            key={item}
                            href={`/${item.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                            className="font-almarena text-[14px] font-bold text-gray-700 hover:text-[var(--color-brand-orange)] hover:bg-orange-50/50 p-4 rounded-xl transition-all duration-300 flex items-center justify-between group"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item}
                            <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-[var(--color-brand-orange)] transition-all">→</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* RIGHT: Utility Icons & Auth (Using flex-1 to push nav to true center) */}
            <div className="flex-1 flex items-center justify-end gap-3 lg:gap-5">
              <button 
                aria-label="Search" 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-900 hover:text-[var(--color-brand-orange)] p-2 rounded-full hover:bg-gray-50 transition-all outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]"
              >
                {isSearchOpen ? <X className="w-5 h-5" strokeWidth={1.8} /> : <Search className="w-5 h-5" strokeWidth={1.8} />}
              </button>
              
              <button aria-label="Cart" className="text-gray-900 hover:text-[var(--color-brand-orange)] p-2 rounded-full hover:bg-gray-50 transition-all relative group outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]">
                <ShoppingBag className="w-5 h-5" strokeWidth={1.8} />
                <span className="absolute top-0 right-0 bg-[var(--color-brand-orange)] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full font-montserrat shadow-sm transform group-hover:scale-110 transition-transform">
                  2
                </span>
              </button>

              {/* Auth Branching */}
              <div className="pl-3 lg:pl-5 border-l border-gray-200 flex items-center gap-3 lg:gap-4 h-8">
                {!isLoggedIn ? (
                  <>
                    <Link href="/login" className="font-montserrat font-semibold text-[14px] text-gray-700 hover:text-[var(--color-brand-orange)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-brand-orange)] rounded-sm whitespace-nowrap">
                      Log in
                    </Link>
                    <Link href="/register" className="font-montserrat font-bold text-[13px] bg-gray-900 text-white px-5 lg:px-6 py-2.5 rounded-full hover:bg-[var(--color-brand-orange)] hover:shadow-md transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-brand-orange)] whitespace-nowrap">
                      Sign up
                    </Link>
                  </>
                ) : (
                  <div className="relative" onMouseLeave={() => setIsProfileMenuOpen(false)}>
                    <button 
                      onMouseEnter={() => setIsProfileMenuOpen(true)}
                      className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-brand-orange)] rounded-full transition-transform hover:scale-105"
                    >
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-400 to-[var(--color-brand-orange)] p-[2px] shadow-sm">
                        <div className="w-full h-full bg-white rounded-full border border-white flex items-center justify-center overflow-hidden">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isProfileMenuOpen && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute top-[calc(100%+8px)] right-0 w-52 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-50 origin-top-right"
                        >
                          <Link href="/account" className="flex items-center gap-3 px-5 py-3 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[var(--color-brand-orange)] font-montserrat transition-colors">
                            <Settings className="w-4 h-4" /> Account Settings
                          </Link>
                          <Link href="/orders" className="flex items-center gap-3 px-5 py-3 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[var(--color-brand-orange)] font-montserrat transition-colors">
                            <ShoppingBag className="w-4 h-4" /> My Orders
                          </Link>
                          <div className="h-px bg-gray-100 my-1"></div>
                          <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center gap-3 px-5 py-3 text-[14px] text-red-600 hover:bg-red-50 font-montserrat transition-colors">
                            <LogOut className="w-4 h-4" /> Sign Out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ========================================== */}
          {/* 3. MOBILE VIEW (Hidden on Desktop)         */}
          {/* ========================================== */}
          <div className="flex md:hidden items-center justify-between w-full h-full">
            
            {/* Left: Hamburger Menu */}
            <div className="flex-1 flex justify-start">
              <button 
                aria-label="Open Menu"
                onClick={() => setIsMobileDrawerOpen(true)}
                className="text-gray-900 p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] outline-none"
              >
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>

            {/* Center: Logo */}
            <div className="flex-1 flex justify-center">
              <Link href="/" className="outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] rounded-sm">
                <Image
                  src="/assets/icons/DesktopLogo.svg"
                  alt="Just Tattoos"
                  width={110}
                  height={32}
                  className="w-auto h-7 object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Right: Search & Cart Icons */}
            <div className="flex-1 flex justify-end items-center gap-2 sm:gap-4">
              <button 
                aria-label="Search" 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-900 p-2 hover:bg-gray-100 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]"
              >
                {isSearchOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Search className="w-5 h-5" strokeWidth={1.5} />}
              </button>
              <button aria-label="Cart" className="text-gray-900 p-2 hover:bg-gray-100 rounded-full transition-colors relative group outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]">
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                <span className="absolute top-1 right-1 bg-[var(--color-brand-orange)] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                  2
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* ========================================== */}
        {/* SLIDE-DOWN SEARCH BAR                      */}
        {/* ========================================== */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-md overflow-hidden z-40"
            >
              <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                <div className="relative flex items-center w-full">
                  <Search className="absolute left-5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tattoos, styles, or collections..."
                    className="w-full pl-14 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-orange)] focus:border-transparent font-montserrat text-gray-700 shadow-sm transition-all"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-3 p-1.5 text-gray-400 hover:text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ========================================== */}
      {/* 4. MOBILE SLIDE-OUT DRAWER                 */}
      {/* ========================================== */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <>
            {/* Dark Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileDrawerOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity"
            />
            
            {/* Drawer Panel */}
            <motion.div
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden fixed top-0 left-0 w-[85vw] max-w-[360px] h-[100dvh] bg-white shadow-2xl z-[70] flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-5 flex justify-between items-center border-b border-gray-100 bg-gray-50/80">
                <Image src="/assets/icons/DesktopLogo.svg" alt="Just Tattoos" width={100} height={28} className="w-auto h-6" />
                <button 
                  onClick={() => setIsMobileDrawerOpen(false)} 
                  className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:bg-[var(--color-brand-orange)] hover:text-white hover:border-transparent transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-8">
                
                {/* Auth Block Mobile */}
                {!isLoggedIn ? (
                  <div className="flex flex-col gap-3 pb-8 border-b border-gray-100">
                    <Link href="/login" onClick={() => setIsMobileDrawerOpen(false)} className="w-full py-3.5 text-center rounded-xl border-2 border-gray-100 font-montserrat font-bold text-[14px] hover:border-[var(--color-brand-orange)] hover:text-[var(--color-brand-orange)] transition-colors">
                      Log in
                    </Link>
                    <Link href="/register" onClick={() => setIsMobileDrawerOpen(false)} className="w-full py-3.5 text-center rounded-xl bg-gray-900 text-white font-montserrat font-bold text-[14px] hover:bg-[var(--color-brand-orange)] shadow-md transition-all">
                      Create Account
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 pb-8 border-b border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center">
                      <User className="w-6 h-6 text-[var(--color-brand-orange)]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-montserrat font-bold text-[15px] text-gray-900">My Account</p>
                      <button onClick={() => setIsLoggedIn(false)} className="text-[13px] text-gray-500 hover:text-red-500 font-medium mt-0.5 transition-colors">Sign out</button>
                    </div>
                  </div>
                )}

                {/* Mobile Links */}
                <div className="flex flex-col gap-6">
                  <Link href="/new-arrivals" className="font-almarena text-[16px] font-bold text-gray-900 flex items-center justify-between group" onClick={() => setIsMobileDrawerOpen(false)}>
                    NEW ARRIVAL <span className="text-gray-300 group-hover:text-[var(--color-brand-orange)] group-hover:translate-x-1 transition-all">→</span>
                  </Link>

                  {/* Mobile Collection Accordion */}
                  <div className="flex flex-col gap-4">
                    {/* <button 
                      className="flex justify-between items-center font-almarena text-[16px] font-bold text-gray-900 w-full text-left"
                      onClick={() => setMobileExpanded(mobileExpanded === "collection" ? null : "collection")}
                    >
                      COLLECTION
                      <ChevronDown className={cn("w-5 h-5 transition-transform duration-300 text-gray-400", mobileExpanded === "collection" && "rotate-180 text-[var(--color-brand-orange)]")} />
                    </button> */}
                    <div className="flex justify-between items-center w-full">
  {/* The Text Link */}
  <a 
    href="/collections" 
    className="font-almarena text-[16px] font-bold text-gray-900 hover:text-[var(--color-brand-orange)] transition-colors text-left flex-grow"
  >
    COLLECTION
  </a>

  {/* The Chevron Toggle */}
  <button 
    className="p-2 -mr-2 flex items-center justify-center"
    onClick={() => setMobileExpanded(mobileExpanded === "collection" ? null : "collection")}
    aria-label="Toggle collection menu"
  >
    <ChevronDown 
      className={cn(
        "w-5 h-5 transition-transform duration-300 text-gray-400", 
        mobileExpanded === "collection" && "rotate-180 text-[var(--color-brand-orange)]"
      )} 
    />
  </button>
</div>
                    
                    <AnimatePresence>
                      {mobileExpanded === "collection" && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden flex flex-col gap-6 pl-4 border-l-2 border-[var(--color-brand-orange)]/20 ml-1"
                        >
                          {Object.entries(COLLECTION_DATA).map(([category, items]) => (
                              <div key={category} className="flex flex-col gap-3 py-1 mt-2">
                                <h4 className="font-almarena text-[var(--color-brand-orange)] text-[13px] font-bold tracking-wider">{category}</h4>
                                {items.map(item => (
                                  <Link 
                                    key={item} 
                                    href={`/collection/${item.toLowerCase().replace(/ & /g, "-").replace(/, /g, "-").replace(/ /g, "-")}`}
                                    className="font-montserrat text-gray-600 text-[14px] font-medium hover:text-[var(--color-brand-orange)] transition-colors py-1"
                                    onClick={() => setIsMobileDrawerOpen(false)}
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link href="/sale" className="font-almarena text-[16px] font-bold text-red-500 flex items-center justify-between group" onClick={() => setIsMobileDrawerOpen(false)}>
                    SALE <span className="text-red-200 group-hover:text-red-500 group-hover:translate-x-1 transition-all">→</span>
                  </Link>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}