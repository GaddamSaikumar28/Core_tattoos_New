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
  return (
    <section className="bg-[--color-bg-base] w-full py-20 px-6 md:px-12 lg:px-24 overflow-hidden selection:bg-[--color-brand-orange] selection:text-black">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-10">
        
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