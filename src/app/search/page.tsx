// src/app/search/page.tsx
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getProducts, getCollectionNames } from "@/src/lib/shopify";
import { Breadcrumbs } from "@/src/components/shared/Breadcrumbs";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.justtattoos.com";

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q?.trim() || "";

  return {
    title: query ? `Search results for "${query}" | Just Tattoos` : "Search | Just Tattoos",
    description: query
      ? `Browse temporary tattoo designs matching "${query}" at Just Tattoos.`
      : "Search Just Tattoos' full catalog of temporary tattoo designs.",
    alternates: { canonical: `${siteUrl}/search` },
    robots: query ? { index: false, follow: true } : { index: true, follow: true },
  };
}

function sanitizeQuery(raw: string): string {
  return raw.replace(/[^\w\s-]/g, "").trim();
}

// Loose match: strips spaces/punctuation and lowercases both sides so
// "Ankle & Wrist", "ankle-wrist", and "ankle wrist" all match the same collection.
function normalizeForMatch(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const rawQuery = q?.trim() || "";
  const query = sanitizeQuery(rawQuery);

  let products: Awaited<ReturnType<typeof getProducts>>["formattedData"] = [];

  if (query) {
    // 🚀 Try matching a real collection first — redirect there instead of
    // showing a generic results grid, so head-term searches ("floral",
    // "sleeve") land on the real, already-indexed, fully-schema'd collection
    // page rather than a duplicate/thinner version of the same content.
    const collections = await getCollectionNames();
    const normalizedQuery = normalizeForMatch(query);
    const matchedCollection = collections.find(
      (c) => normalizeForMatch(c.title) === normalizedQuery || normalizeForMatch(c.handle) === normalizedQuery
    );

    if (matchedCollection) {
      redirect(`/collections/${matchedCollection.handle}`);
    }

    // No collection match — genuine free-text product search, stays on /search.
    const result = await getProducts({
      query: `${query}*`,
      first: 24,
      sortKey: "RELEVANCE",
    });
    products = result.formattedData;
  }

  const searchUrl = `${siteUrl}/search${rawQuery ? `?q=${encodeURIComponent(rawQuery)}` : ""}`;

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` },
        { "@type": "ListItem", "position": 2, "name": "Search", "item": `${siteUrl}/search` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "SearchResultsPage",
      "@id": `${searchUrl}#webpage`,
      "url": searchUrl,
      "name": rawQuery ? `Search results for "${rawQuery}"` : "Search",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-black text-white pt-32 md:pt-40 pb-24 px-6 md:px-10 lg:px-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <div className="max-w-[1300px] mx-auto">
        <div className="mb-10 opacity-80">
          <Breadcrumbs items={[{ label: "Home", url: "/" }, { label: "Search", url: "/search" }]} />
        </div>

        <form action="/search" method="GET" className="max-w-xl mb-16">
          <input
            type="text"
            name="q"
            defaultValue={rawQuery}
            placeholder="Search designs, styles, placements..."
            className="w-full px-6 py-4 bg-zinc-900 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:border-[#FE8204] outline-none"
          />
        </form>

        {!rawQuery ? (
          <p className="text-zinc-500">Enter a search term to browse our designs.</p>
        ) : products.length === 0 ? (
          <div className="text-center py-24 text-zinc-500 bg-zinc-900/30 rounded-[2rem] border border-dashed border-white/10">
            No results found for "{rawQuery}".
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-8 text-zinc-200">
              {products.length} result{products.length !== 1 ? "s" : ""} for "{rawQuery}"
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.handle}`}
                  className="group flex flex-col bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="relative w-full aspect-square bg-zinc-950">
                    {product.media.featuredImage && (
                      <Image
                        src={product.media.featuredImage}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-zinc-100 line-clamp-1 group-hover:text-[#FE8204] transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">${product.checkout.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}