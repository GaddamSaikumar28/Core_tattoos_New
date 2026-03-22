
import React from 'react';
import { getFaqSectionData } from '@/src/lib/shopify'; // Update path if needed
import FaqClient from './FaqClient';

export default async function FaqSection() {
  const data = await getFaqSectionData('faq-section');

  if (!data) {
    return (
      <section className="bg-white w-full px-4 py-16 text-center">
        Loading FAQs...
      </section>
    );
  }

  return (
    <section className="bg-white w-full px-4 py-16 md:px-8 lg:px-16 md:py-24 overflow-hidden">
      {/* Pass the dynamic data to the interactive client component */}
      <FaqClient data={data} />
    </section>
  );
}