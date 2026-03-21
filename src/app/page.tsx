// import Image from "next/image";
// import Link from "next/link";
// // import AboutSection from "../components/home/AboutSection";
// import FeatureSection from "../components/home/FeatureSection";
// import NewArrivals from "../components/home/NewArrivals";
// import ShopCollection from "../components/home/ShopCollection";
// import Features from "../components/home/Features";
// import HowItWorks from "../components/home/HowItWorks";
// import FreeGiftComponent from "../components/home/FreeGiftComponent";
// import DynamicReviews from "../components/home/DynamicReviews";
// import FaqSection from "../components/home/FaqSection";
// import NewsletterSection from "../components/home/NewsletterSection";
// import Hero from "../components/hero/Hero";
// export default function HomePage() {
//   return (
//     <div className="w-full flex flex-col items-center overflow-visible">
//       {/* <div className="relative z-20 w-full">
//          <HeroSection />
//       </div> */}
//       <Hero />
//       <FeatureSection />
//       <NewArrivals />
//       <ShopCollection />
//       <Features />
//       <HowItWorks />
//       <FreeGiftComponent />
//       <DynamicReviews />
//       {/* <AboutSection /> */}
//       <FaqSection />
//       <NewsletterSection />
//       {/* <WhatWeDo /> */}
//     </div>
//   );
// }



import { Suspense } from "react";
import { getHomePageHeroCollections } from "@/src/lib/shopify/index";

// Import Sections
import FeatureSection from "../components/home/FeatureSection";
import NewArrivals from "../components/home/NewArrivals";
import ShopCollection from "../components/home/ShopCollection";
import Features from "../components/home/Features";
import HowItWorks from "../components/home/HowItWorks";
import FreeGiftComponent from "../components/home/FreeGiftComponent";
import DynamicReviews from "../components/home/DynamicReviews";
import FaqSection from "../components/home/FaqSection";
import NewsletterSection from "../components/home/NewsletterSection";
import Hero from "../components/hero/Hero";

// 1. Create an isolated Async Server Component for fetching the Hero data
async function HeroWithData() {
  try {
    const products = await getHomePageHeroCollections();
    
    // Pass the fetched products to your client-side Hero component
    return <Hero initialProducts={products} />;
  } catch (error) {
    // Production safety: If Shopify is down, don't crash the whole page. 
    // Fallback to an empty array so the Hero still renders its static layout.
    console.error("Failed to fetch hero products:", error);
    return <Hero initialProducts={[]} />;
  }
}

// 2. Create a Skeleton Fallback to prevent Cumulative Layout Shift (CLS)
// This should roughly match the height and shape of your actual Hero
function HeroSkeleton() {
  return (
    <div className="w-full h-screen bg-[#fafafa] animate-pulse flex items-start justify-center pt-[15vh]">
      <div className="w-full max-w-[1300px] px-6 lg:px-12 flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Text Skeleton */}
        <div className="w-full md:w-[55%] flex flex-col gap-4">
          <div className="h-20 md:h-24 w-3/4 bg-gray-200 rounded-lg"></div>
          <div className="h-20 md:h-24 w-2/3 bg-gray-200 rounded-lg md:ml-[60px]"></div>
          <div className="mt-8 h-24 w-full max-w-[520px] bg-gray-200 rounded-lg hidden md:block"></div>
        </div>
        {/* Card Deck Skeleton */}
        <div className="w-[180px] h-[250px] md:w-[260px] md:h-[360px] lg:w-[320px] lg:h-[440px] bg-gray-200 rounded-[24px]"></div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center overflow-visible">
      
      {/* 3. Wrap the async component in Suspense */}
      <Suspense fallback={<HeroSkeleton />}>
        <HeroWithData />
      </Suspense>

      {/* These components will now render instantly while the Hero data loads */}
      <FeatureSection />
      <NewArrivals />
      <ShopCollection />
      <Features />
      <HowItWorks />
      <FreeGiftComponent />
      <DynamicReviews />
      <FaqSection />
      <NewsletterSection />
    </div>
  );
}