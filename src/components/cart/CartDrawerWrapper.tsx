'use client';

import dynamic from 'next/dynamic';

// We move the dynamic import here, inside a 'use client' file
const CartDrawer = dynamic(
  () => import('./CartDrawer').then((mod) => mod.CartDrawer),
  { ssr: false }
);

export default function CartDrawerWrapper() {
  return <CartDrawer />;
}