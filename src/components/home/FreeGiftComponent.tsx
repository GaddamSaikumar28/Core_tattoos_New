import React from 'react';
// import { getHomeFreeGiftSectionData } from '@/src/lib/shopify';
// import { getHomeFreeGiftSectionData } from '@/src/lib/shopify';
import { getHomeFreeGiftSectionData } from '@/src/lib/shopify';
import FreeGiftComponentClient from './FreeGiftComponentClient';

export default async function FreeGiftComponent() {
  const data = await getHomeFreeGiftSectionData('home_free_gift_section');

  // Safety fallback in case the Shopify data isn't ready
  if (!data) {
    return (
      <div className="w-full bg-red-100 text-red-700 p-10 text-center font-bold text-2xl">
        Free Gift Section data missing! Check Shopify handle: home_free_gift_section
      </div>
    );
  }

  return <FreeGiftComponentClient data={data} />;
}