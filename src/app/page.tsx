import { Suspense } from "react";
import { cache } from "react";
import {
  getHomePageNewArrivals,
  getHomePageCollections,
} from "@/src/lib/shopify/index";

import ShowcaseCarousel        from "../components/home/ShowcaseCarousel";
import DynamicReviews          from "../components/home/DynamicReviews";
import NewsletterSection       from "../components/home/NewsletterSection";
import TattooStudio            from "../components/home/TattooStudio";
import CommunityGallerySection from "@/src/components/home/CommunityGallery";
import HowItWorks              from "@/src/components/home/HowItWorks";
import BookWrapper             from "@/src/components/3DBook/BookWrapper";
import HeroCardCarousel        from "../components/sections/HeroCardCarousel";
import type { TattooProduct }  from "@/src/components/3DBook/UI";

const dummyBookProducts: TattooProduct[] = Array.from({ length: 14 }, (_, i) => i + 1)
  .filter((num) => num !== 4) // Exclude number 4
  .map((num) => ({
    id:             `local-tattoo-${num}`,
    title:          `Lookbook Design ${num}`,
    handle:         `lookbook-design-${num}`,
    price:          19,
    compareAtPrice: 25,
    // frontImage maps to the image of the tattoo ON the skin
    frontImage:     `/assets/HeroImages/card${num}.webp`,
    // backImage maps to the pure tattoo design
    backImage:      `/assets/HeroImages/card${num}_tattoo.webp`,
    themes:         ["Curated", "Lookbook"],
    placements:     ["Arm", "Forearm", "Leg"],
    colorType:      "Black & Grey",
    badge:          num === 1 ? "Bestseller" : undefined,
  }));

export const revalidate = 60;

// High-performance loading skeleton matching the carousel item frame layout exactly
function CarouselSkeleton() {
  return (
    <section className="bg-[--color-bg-base] w-full py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-10">
        <div className="w-48 h-6 bg-white/5 animate-pulse rounded mb-4" />
        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-12 md:gap-6 overflow-hidden pb-8 pt-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-full max-w-[340px] md:max-w-none md:w-[280px] mx-auto md:mx-0 h-auto min-h-[400px] flex-shrink-0 flex flex-col">
              <div className="w-full aspect-[4/5] bg-white/5 animate-pulse rounded-[1.5rem] mb-4" />
              <div className="flex flex-col flex-grow gap-2 px-1">
                <div className="w-1/3 h-3 bg-white/5 animate-pulse rounded" />
                <div className="w-2/3 h-5 bg-white/5 animate-pulse rounded" />
                <div className="w-1/2 h-4 bg-white/5 animate-pulse rounded mt-2" />
                <div className="w-full h-8 bg-white/5 animate-pulse rounded mt-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  // Fire both API endpoints concurrently on the server to prevent query chaining
  const [newArrivalsData, collectionsData] = await Promise.all([
    getHomePageNewArrivals(10),
    getHomePageCollections(10)
  ]);

  return (
    <div className="w-full flex flex-col items-center overflow-visible bg-[var(--color-bg-base)]">
      <HeroCardCarousel />

      <div className="w-full h-[800px] relative">
        <BookWrapper products={dummyBookProducts} />
      </div>

      <Suspense fallback={<CarouselSkeleton />}>
        <ShowcaseCarousel
          overline="JUST DROPPED"
          titleHighlight="NEW"
          titleMain="ARRIVALS"
          viewAllLink="/collections/new-arrival"
          initialItems={newArrivalsData}
          mode="product"
        />
      </Suspense>

      <Suspense fallback={<CarouselSkeleton />}>
        <ShowcaseCarousel
          overline="CURATED FOR YOU"
          titleHighlight="OUR"
          titleMain="COLLECTIONS"
          subtitle="1,000+ premium designs across every style, mood, and placement."
          viewAllLink="/collections"
          initialItems={collectionsData}
          mode="collection"
        />
      </Suspense>

      <TattooStudio />
      <CommunityGallerySection />
      <HowItWorks />
      <DynamicReviews />
      <NewsletterSection />
    </div>
  );
}