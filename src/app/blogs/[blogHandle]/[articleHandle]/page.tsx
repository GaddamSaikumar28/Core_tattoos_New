import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle } from "@/src/lib/shopify/index";
import { Metadata } from "next";
import { Breadcrumbs } from "@/src/components/shared/Breadcrumbs";
import { extractFaqsFromHtml, extractHowToStepsFromHtml } from "@/src/lib/extractArticleSchema";

type Props = { 
  params: Promise<{ blogHandle: string, articleHandle: string }> 
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { blogHandle, articleHandle } = await params;
  const article = await getArticle(blogHandle, articleHandle);
  if (!article) return { title: 'Article Not Found' };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.justtattoos.com';
  const canonicalUrl = `${siteUrl}/blogs/${blogHandle}/${articleHandle}`;

  return {
    title: article.seo?.title || `${article.title} | Just Tattoos`,
    description: article.seo?.description || `Read ${article.title} on Just Tattoos`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: article.seo?.title || article.title,
      description: article.seo?.description || `Read ${article.title}`,
      url: canonicalUrl,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: article.authorV2?.name ? [article.authorV2.name] : [],
      images: article.image?.url ? [{ url: article.image.url, alt: article.image.altText || article.title }] : [],
    },
    twitter: { card: 'summary_large_image' }
  };
}

export default async function SingleArticlePage({ params }: Props) {
  const { blogHandle, articleHandle } = await params;
  const article = await getArticle(blogHandle, articleHandle);
  
  if (!article) return notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.justtattoos.com";
  const articleUrl = `${siteUrl}/blogs/${blogHandle}/${articleHandle}`;
  const authorName = article.authorV2?.name || "Just Tattoos Team";
  const publisherLogo = "https://cdn.shopify.com/s/files/1/0973/6608/1834/files/Fotterlogo2.svg";

  // =========================================================
  // 🚀 SEO FIX: CONDITIONAL SCHEMA TARGETING (BY HANDLE)
  // =========================================================
  const faqAndSpeakableHandles = [
    'how-long-do-semi-permanent-tattoos-last',
    'why-does-my-tattoo-look-faint-after-applying',
    'are-semi-permanent-tattoos-safe',
    'how-do-semi-permanent-tattoos-work-the-science-explained'
  ];

  const howToHandles = [
    'how-to-fade-tattoos-fast-proven-methods-that-actually-work',
    'how-to-remove-temporary-tattoos-easily-without-damaging-your-skin-guide',
    'how-to-apply-a-temporary-tattoo-step-by-step-guide',
    'how-to-make-temporary-tattoos-at-home-secret-printer-method-that-actually-works',
    'how-to-make-temporary-tattoos-last-longer'
  ];

  const definedTermHandles = [
    'what-is-a-semi-permanent-tattoo'
  ];

  // =========================================================
  // 🚀 SEO FIX: CONSOLIDATE UNIVERSAL POST SCHEMAS
  // =========================================================
  const schemas: any[] = [
    {
      // 1. BreadcrumbList (3 Levels)
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${siteUrl}/blogs` },
        { "@type": "ListItem", "position": 3, "name": article.title, "item": articleUrl }
      ]
    },
    {
      // 2. BlogPosting
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${articleUrl}#blogposting`,
      "headline": article.title,
      "url": articleUrl,
      "mainEntityOfPage": { "@type": "WebPage", "@id": articleUrl },
      "author": { "@type": "Person", "name": authorName },
      "publisher": {
        "@type": "Organization",
        "name": "Just Tattoos",
        "logo": { "@type": "ImageObject", "url": publisherLogo }
      },
      "image": article.image ? [article.image.url] : [],
      "datePublished": article.publishedAt,
      // NOTE: Shopify's Storefront API Article type has no "updatedAt"/"modified"
      // field, so this still falls back to publishedAt. See the comment block
      // at the bottom of this file for exactly what to add if you want a real,
      // independent dateModified value.
      "dateModified": article.publishedAt
    },
    {
      // 3. Article
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${articleUrl}#article`,
      "headline": article.title,
      "url": articleUrl,
      "author": { "@type": "Person", "name": authorName },
      "publisher": {
        "@type": "Organization",
        "name": "Just Tattoos",
        "logo": { "@type": "ImageObject", "url": publisherLogo }
      },
      "image": article.image ? [article.image.url] : [],
      "datePublished": article.publishedAt
    },
    {
      // 4. Person (Author)
      "@context": "https://schema.org",
      "@type": "Person",
      "name": authorName,
      "url": `${siteUrl}/about`
    },
    {
      // 5. CreativeWork
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": article.title,
      "url": articleUrl,
      "creator": { "@type": "Organization", "name": "Just Tattoos" }
    }
  ];

  // 6. ImageObject (If Image Exists)
  if (article.image) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "contentUrl": article.image.url,
      "url": article.image.url,
      "caption": article.image.altText || article.title,
      "width": article.image.width?.toString() || "1200",
      "height": article.image.height?.toString() || "800"
    });
  }

  // =========================================================
  // 🚀 SEO FIX: INJECT CONDITIONAL SCHEMAS
  // =========================================================
  
  if (faqAndSpeakableHandles.includes(articleHandle)) {
    // 🚀 FIX: try to pull real Q&A pairs out of the article body first
    // (headings that read like a question, plus the text under them).
    // Only fall back to the single generic question if the article isn't
    // written in that heading style — so this never breaks, it just gets
    // better automatically as content is written in a Q&A format.
    const extractedFaqs = extractFaqsFromHtml(article.contentHtml);

    const faqEntities = extractedFaqs.length > 0
      ? extractedFaqs.map((f) => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": { "@type": "Answer", "text": f.answer }
        }))
      : [
          {
            "@type": "Question",
            "name": article.title,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": article.seo?.description || `Detailed guide on ${article.title}`
            }
          }
        ];

    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${articleUrl}#faq`,
      "mainEntity": faqEntities
    });

    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "url": articleUrl,
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", ".faq-answer", ".article-summary"]
      }
    });
  }

  if (howToHandles.includes(articleHandle)) {
    // 🚀 FIX: try to pull the real numbered steps out of the article body's
    // <ol> list first. Falls back to the single generic step only if the
    // article has no ordered list to parse.
    const extractedSteps = extractHowToStepsFromHtml(article.contentHtml);

    const stepEntities = extractedSteps.length > 0
      ? extractedSteps.map((s) => ({ "@type": "HowToStep", "name": s.name, "text": s.text }))
      : [
          {
            "@type": "HowToStep",
            "name": "Read Full Instructions",
            "text": article.seo?.description || "Read the article below for full step-by-step instructions."
          }
        ];

    schemas.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": article.title,
      "url": articleUrl,
      "step": stepEntities
    });
  }

  if (definedTermHandles.includes(articleHandle)) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      "name": "Semi-Permanent Tattoo", // Or dynamically extracted based on title mapping
      "url": articleUrl,
      "description": article.seo?.description || "Definition and breakdown of this term.",
      "inDefinedTermSet": `${siteUrl}/blogs/${blogHandle}`
    });
  }

  return (
    <article className="w-full min-h-screen bg-black text-white selection:bg-[#FE8204] selection:text-white pb-24 relative overflow-hidden">
      
      {/* 🚀 INJECT ALL CONSOLIDATED SCHEMAS SAFELY */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} 
      />

      {/* Premium Hero Bleed Container (Flows seamlessly under transparent headers) */}
      <div className="relative w-full pt-32 md:pt-40 pb-16 md:pb-24 bg-zinc-950 border-b border-white/5 overflow-hidden">
        
        {/* Full Screen Image Backdrop */}
        {article.image && (
          <Image
            src={article.image.url}
            alt={article.image.altText || `${article.title} cover image`}
            fill
            priority
            className="object-cover opacity-20 z-0 select-none pointer-events-none"
          />
        )}
        
        {/* Cinematic Linear Shadow Gradient Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-zinc-950/40 z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-[#FE8204] opacity-[0.03] blur-[130px] pointer-events-none z-10" />

        <div className="relative z-20 w-full max-w-[1300px] mx-auto px-6 md:px-10 lg:px-20">
          
          {/* Breadcrumbs Styled Elegantly Over Backdrop */}
          <div className="mb-10 opacity-70 hover:opacity-100 transition-opacity">
            <Breadcrumbs items={[
              { label: 'Home', url: '/' },
              { label: 'Blogs', url: '/blogs' },
              { label: blogHandle, url: `/blogs/${blogHandle}` },
              { label: article.title, url: articleUrl }
            ]} renderSchema={false} /> 
            {/* 👆 THE FIX: renderSchema={false} prevents duplication */}
          </div>

          {/* Core Post Title Details Wrapper */}
          <div className="max-w-[900px]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white mb-6 leading-[1.1]">
              {article.title}
            </h1>
            
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg text-xs font-bold uppercase tracking-wider text-zinc-300">
              {article.authorV2?.name && (
                <>
                  <span>By <span className="text-[#FE8204] font-black">{article.authorV2.name}</span></span>
                  <span className="text-zinc-600">•</span>
                </>
              )}
              <time className="text-zinc-400">
                {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Article Body Section */}
      <div className="w-full max-w-[850px] mx-auto px-6 py-16 md:py-24 relative z-20">
        <div 
          className="text-base md:text-lg text-zinc-300 leading-relaxed font-sans 
            [&>p]:mb-6 [&>p]:leading-relaxed
            [&>h2]:text-2xl md:[&>h2]:text-4xl [&>h2]:font-black [&>h2]:text-white [&>h2]:mt-14 [&>h2]:mb-6 [&>h2]:tracking-tight [&>h2]:uppercase
            [&>h3]:text-xl md:[&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-zinc-100 [&>h3]:mt-10 [&>h3]:mb-4 [&>h3]:tracking-tight
            [&>img]:w-full [&>img]:rounded-[2rem] [&>img]:my-12 [&>img]:border [&>img]:border-white/10 [&>img]:shadow-2xl
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2 [&>ul>li]:text-zinc-300
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:mb-2 [&>ol>li]:text-zinc-300
            [&>a]:text-[#FE8204] [&>a]:underline [&>a]:font-bold [&>a:hover]:text-white [&>a]:transition-colors
            [&>blockquote]:border-l-4 [&>blockquote]:border-[#FE8204] [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-zinc-200 [&>blockquote]:bg-zinc-900/50 [&>blockquote]:backdrop-blur-sm [&>blockquote]:p-6 [&>blockquote]:rounded-r-2xl [&>blockquote]:my-10"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />
      </div>
    </article>
  );
}

// =========================================================
// 📝 OPTIONAL FOLLOW-UP — real dateModified (not applied here, needs your input)
// =========================================================
// Shopify's Storefront API Article type has no updatedAt/modified field, only
// publishedAt — that's why dateModified above still falls back to publishedAt.
// If you want a real, independently-tracked "last updated" date, add a
// metafield and wire it through like this:
//
// 1. Shopify Admin → the Article → Metafields → add a Date field, e.g.
//    namespace "custom", key "updated_at".
//
// 2. In queries.ts, inside getArticleByHandleQuery's `articleByHandle { ... }`
//    selection, add:
//      updatedAtMetafield: metafield(namespace: "custom", key: "updated_at") {
//        value
//      }
//
// 3. No change needed in index.ts — getArticle() already returns the raw
//    articleByHandle object as-is, so the new field will just show up on it.
//
// 4. Back in this file, change:
//      "dateModified": article.publishedAt
//    to:
//      "dateModified": article.updatedAtMetafield?.value || article.publishedAt