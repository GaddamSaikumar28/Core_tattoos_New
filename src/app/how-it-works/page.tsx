import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getHowItWorksPageData, getHowItWorksPageSeoSettings } from '@/src/lib/shopify';

// =========================================================
// 1. STRICT SEO METADATA
// =========================================================
export async function generateMetadata(): Promise<Metadata> {
  // Parallel fetching to eliminate waterfall latency
  const [data, seoData] = await Promise.all([
    getHowItWorksPageData('how-it-works').catch(() => null),
    getHowItWorksPageSeoSettings().catch(() => null),
  ]);

  console.log('Fetched How It Works Page Content:', data); 
  console.log('Fetched How It Works Page SEO Settings:', seoData);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.justtattoos.com';

  // Prioritize dedicated SEO Metaobject title -> Fall back to dynamic Hero Title -> Default fallback
  const cleanTitle = seoData?.title 
    ? seoData.title
    : data?.heroTitle 
    ? `${data.heroTitle.replace(/\b\w/g, (c: string) => c.toUpperCase())} | Just Tattoos`
    : 'How It Works | Just Tattoos';

  // Prioritize dedicated SEO Metaobject description -> Default fallback
  const defaultDescription = seoData?.description || 
    'Learn how to apply and care for your temporary tattoos with our step-by-step guide.';

  return {
    title: cleanTitle,
    description: defaultDescription,
    alternates: {
      canonical: `${siteUrl}/how-it-works`,
    },
    openGraph: {
      title: cleanTitle,
      description: defaultDescription,
      url: `${siteUrl}/how-it-works`,
      type: 'website',
      images: data?.heroImage 
        ? [
            {
              url: data.heroImage,
              width: 1200,
              height: 630,
              alt: data.heroTitle || 'How It Works - Just Tattoos',
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: cleanTitle,
      description: defaultDescription,
      images: data?.heroImage ? [data.heroImage] : [],
    },
  };
}

// =========================================================
// 🚀 FIX: Fixed publish date for this page's Article schema.
// Was `new Date().toISOString()`, which recomputed on every server
// request/revalidation — the reported publish date silently drifted
// over time. Set this once to the real date this page's content went
// live, or wire it to a metaobject field if one gets added later.
// =========================================================
const HOW_IT_WORKS_PUBLISHED_DATE = '2025-01-01T00:00:00Z';

// =========================================================
// 2. MAIN HOW IT WORKS SERVER COMPONENT (100% UNTOUCHED LOGIC)
// =========================================================
export default async function HowItWorks() {
  // Fetch data directly from Shopify
  const data = await getHowItWorksPageData('how-it-works');

  if (!data) {
    return <div className="p-20 text-center text-white bg-black min-h-screen">Loading How It Works content...</div>;
  }

  // =========================================================
  // STRUCTURED DATA (JSON-LD)
  // =========================================================
  
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.justtattoos.com/how-it-works#webpage",
    "url": "https://www.justtattoos.com/how-it-works",
    "name": "How It Works",
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://www.justtattoos.com/#website",
      "name": "Just Tattoos",
      "url": "https://www.justtattoos.com"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.justtattoos.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "How It Works",
        "item": "https://www.justtattoos.com/how-it-works"
      }
    ]
  };

  const imageObjectSchema = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": data.heroImage || "",
    "url": data.heroImage || "",
    "caption": "How It Works",
    "width": "1200",
    "height": "630"
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": "https://www.justtattoos.com/how-it-works#article",
    "headline": "How It Works",
    "url": "https://www.justtattoos.com/how-it-works",
    "author": {
      "@type": "Person",
      "name": "Just Tattoos Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Just Tattoos",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cdn.shopify.com/s/files/1/0973/6608/1834/files/Fotterlogo2.svg"
      }
    },
    "image": [
      data.heroImage || ""
    ],
    // 🚀 FIX: was `new Date().toISOString()` (recomputed on every request).
    "datePublished": HOW_IT_WORKS_PUBLISHED_DATE
  };

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "How It Works",
    "url": "https://www.justtattoos.com/how-it-works",
    "creator": {
      "@type": "Organization",
      "name": "Just Tattoos"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI-Assisted Custom Temporary Tattoo Design",
    "provider": {
      "@type": "Organization",
      "name": "Just Tattoos",
      "url": "https://www.justtattoos.com"
    },
    "areaServed": "US",
    "url": "https://www.justtattoos.com/how-it-works"
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Just Tattoos AI Design Generator",
    "url": "https://www.justtattoos.com/how-it-works",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How Just Tattoos Works",
    "url": "https://www.justtattoos.com/how-it-works",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Choose Your Design",
        "text": "Browse 1000+ curated designs or use the AI generator to create something uniquely yours. Ships within 24 hours."
      },
      {
        "@type": "HowToStep",
        "name": "Peel & Press",
        "text": "Place on clean, dry skin. Hold a wet cloth over it for 30 seconds. Peel the backing to reveal your art."
      },
      {
        "@type": "HowToStep",
        "name": "Rock Your Look",
        "text": "Waterproof, gym-proof, sweatproof. Looks and feels like real permanent ink without the commitment."
      },
      {
        "@type": "HowToStep",
        "name": "Enjoy 10-14 Days",
        "text": "Lasts up to two full weeks. When you're ready for a change, remove instantly with rubbing alcohol."
      }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Just Tattoos AI Design Generator",
    "url": "https://www.justtattoos.com/how-it-works",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  // 🚀 FIX: was "cssSelector": "main" — matched the entire page body rather
  // than the actual steps module. Scoped to the real steps <section> below
  // (see the "Steps Section" comment in the JSX), which is the element this
  // node is actually meant to describe.
  const webPageElementSchema = {
    "@context": "https://schema.org",
    "@type": "WebPageElement",
    "isPartOf": {
      "@type": "WebPage",
      "url": "https://www.justtattoos.com/how-it-works"
    },
    "name": "How It Works Steps",
    "cssSelector": ".how-it-works-steps"
  };

  const aiModelSchema = {
    "@context": "https://schema.org",
    "@type": "AIModel",
    "name": "Just Tattoos AI Design Generator",
    "url": "https://www.justtattoos.com/how-it-works",
    "applicationCategory": "DesignApplication",
    "description": "Text/style/mood/placement-conditioned generative model producing custom temporary tattoo design concepts.",
    "provider": {
      "@type": "Organization",
      "name": "Just Tattoos",
      "url": "https://www.justtattoos.com"
    }
  };

  return (
    // Switched to bg-black and text-white, removed mt-10
    <main className="w-full bg-black text-white overflow-hidden min-h-screen">
      
      {/* 🚀 SCHEMA INJECTIONS */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageObjectSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageElementSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aiModelSchema) }} />

      {/* 🚀 PREMIUM HERO BANNER REPLACEMENT */}
      <div className="container max-w-[1400px] mx-auto px-4 pt-24 md:pt-32">
        <div className="relative w-full h-[280px] md:h-[380px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group bg-zinc-900 flex items-center">
          
          {/* Background Image using Next.js Image */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <Image
              src={data.heroImage}
              alt={data.heroTitle}
              fill
              priority
              className="object-cover object-center opacity-60 transition-transform duration-1000 ease-out group-hover:scale-105"
              sizes="(max-width: 1400px) 100vw, 1400px"
            />
          </div>

          {/* Precision Gradient Overlays for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 px-8 md:px-16 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-md mb-6 shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FE8204] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FE8204]"></span>
              </span>
              <span className="text-[#FE8204] text-[10px] font-black uppercase tracking-[0.2em]">
                Guide
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-xl leading-none">
              {data.heroTitle}
            </h1>
          </div>
        </div>
      </div>

      {/* Intro Header */}
      <section className="container mx-auto px-6 pt-20 pb-10 md:pt-32 md:pb-16 text-center max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 uppercase whitespace-pre-line text-zinc-100">
          {data.introHeading}
        </h2>
        <p className="text-lg md:text-xl text-zinc-400 font-medium leading-relaxed whitespace-pre-line">
          {data.introParagraph}
        </p>
      </section>

      {/* Steps Section */}
      {/* 🚀 FIX: added "how-it-works-steps" so the WebPageElement schema above
          can point at this specific section instead of the whole <main>. */}
      <section className="how-it-works-steps container mx-auto px-6 pb-24 md:pb-40">
        <div className="flex flex-col gap-24 md:gap-32">
          {data.steps.map((step, index) => {
            const isEven = index % 2 !== 0;

            return (
              <div 
                key={step.id} 
                className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 group ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Image Container - Updated to dark mode border/shadow */}
                <div className="w-full md:w-1/2 relative h-[350px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-zinc-900 border border-white/10">
                  <Image 
                    src={step.image} 
                    alt={step.alt} 
                    fill 
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Content Container */}
                <div className="w-full md:w-1/2 relative flex flex-col justify-center">
                  {/* Massive Background Number - Updated for dark mode */}
                  <span className="absolute -top-16 -left-8 md:-top-24 md:-left-12 text-[10rem] md:text-[14rem] font-black text-white/5 leading-none select-none z-0">
                    0{step.id}
                  </span>

                  {/* Foreground Text */}
                  <div className="relative z-10 space-y-6">
                    {/* Step badge updated to white bg with black text for contrast */}
                    <div className="inline-block px-4 py-1.5 bg-white text-black text-sm font-bold tracking-widest uppercase rounded-full mb-2">
                      Step {step.id}
                    </div>
                    <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-100">
                      {step.title}
                    </h3>
                    <p className="text-lg md:text-xl text-zinc-400 font-medium leading-relaxed max-w-lg whitespace-pre-line">
                      {step.description}
                    </p>

                    <div className="pt-6">
                      <Link 
                        href="/collections" 
                        className="group/btn inline-flex items-center gap-3 border-b-2 border-white pb-2 text-lg font-bold uppercase tracking-wider text-white hover:text-[#FE8204] hover:border-[#FE8204] transition-all duration-300"
                      >
                        Shop Tattoos
                        <svg 
                          className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}