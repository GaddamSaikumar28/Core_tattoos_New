import React from 'react';
import { getHomeFeatureSectionData } from '@/src/lib/shopify';
import FeatureSectionClient from './FeatureSectionClient';

export default async function FeatureSection() {
  const data = await getHomeFeatureSectionData('home_feature_section');

  if (!data) return null;

  return <FeatureSectionClient data={data} />;
}