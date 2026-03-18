import Image from "next/image";
import Link from "next/link";
import HeroSection from "../components/hero/HeroSection";
import WhatWeDo from "../components/home/WhatWeDo";
import AboutSection from "../components/home/AboutSection";
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
export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center overflow-visible">
      {/* <div className="relative z-20 w-full">
         <HeroSection />
      </div> */}
      <Hero />
      <FeatureSection />
      <NewArrivals />
      <ShopCollection />
      <Features />
      <HowItWorks />
      <FreeGiftComponent />
      <DynamicReviews />
      <AboutSection />
      <FaqSection />
      <NewsletterSection />
      {/* <WhatWeDo /> */}
    </div>
  );
}