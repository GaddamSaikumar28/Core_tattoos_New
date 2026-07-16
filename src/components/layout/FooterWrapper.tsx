'use client';

import Footer from './Footer';

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