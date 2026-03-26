'use client';

import dynamic from 'next/dynamic';

// We load the footer dynamically so it doesn't bloat the main JS bundle
const Footer = dynamic(() => import('./Footer'), {
  // A simple placeholder so the layout doesn't jump when it loads
  loading: () => <div className="h-[400px] w-full bg-[#121212] animate-pulse" />,
  ssr: false 
});

interface FooterWrapperProps {
  logoUrl: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    twitter: string;
    youtube: string;
  };
}

export default function FooterWrapper(props: FooterWrapperProps) {
  return <Footer {...props} />;
}