import React from 'react';
import Link from 'next/link';
import { FormattedProduct } from '@/src/lib/shopify';
import ShowcaseCarouselClient from './ShowcaseCarouselClient';

interface ShowcaseCarouselProps {
  overline: string;
  titleHighlight: string;
  titleMain: string;
  subtitle?: string;
  viewAllLink: string;
  initialItems: FormattedProduct[];
  mode: 'product' | 'collection';
}

export default function ShowcaseCarousel({
  overline,
  titleHighlight,
  titleMain,
  subtitle,
  viewAllLink,
  initialItems,
  mode
}: ShowcaseCarouselProps) {
  // 🚀 SEO FIX: ImageObject markup for every real product image rendered in this
  // rail, built straight from the same initialItems already passed to the client
  // carousel — no placeholders, no separate data fetch. Runs for both the
  // "New Arrivals" (mode="product") and "Collections" (mode="collection") rails
  // since both are driven by real FormattedProduct data.
  const carouselImages = (initialItems || [])
    .filter((item) => Boolean(item?.media?.featuredImage))
    .map((item) => ({
      "@type": "ImageObject",
      "contentUrl": item.media.featuredImage as string,
      "url": item.media.featuredImage as string,
      "caption": item.title,
    }));

  const imageJsonLd =
    carouselImages.length > 0
      ? {
          "@context": "https://schema.org",
          "@graph": carouselImages,
        }
      : null;

  return (
    <section className="bg-[--color-bg-base] w-full py-20 px-6 md:px-12 lg:px-24 overflow-hidden selection:bg-[--color-brand-orange] selection:text-black">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-10">

        {imageJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(imageJsonLd) }}
          />
        )}

        {/* Pass props straight to the client orchestrator component */}
        <ShowcaseCarouselClient
          overline={overline}
          titleHighlight={titleHighlight}
          titleMain={titleMain}
          subtitle={subtitle}
          viewAllLink={viewAllLink}
          items={initialItems || []}
          mode={mode}
        />

      </div>
    </section>
  );
}