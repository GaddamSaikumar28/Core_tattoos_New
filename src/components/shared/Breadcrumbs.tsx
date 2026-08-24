import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type BreadcrumbItem = {
  label: string;
  url: string;
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Set to false if the parent page/layout already injects BreadcrumbList JSON-LD schema */
  renderSchema?: boolean;
}

export function Breadcrumbs({ items, renderSchema = false }: BreadcrumbsProps) {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.justtattoos.com').replace(/\/$/, '');

  // 1. Deduplicate breadcrumb items by normalized URL
  const uniqueItems = items.reduce<BreadcrumbItem[]>((acc, current) => {
    const normalizedPath = current.url.replace(/\/$/, '') || '/';
    const exists = acc.some((item) => (item.url.replace(/\/$/, '') || '/') === normalizedPath);
    if (!exists) {
      acc.push(current);
    }
    return acc;
  }, []);

  // 2. Safe URL construction (prevents double domains or double slashes)
  const formatFullUrl = (url: string) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    return `${siteUrl}${cleanPath}`;
  };

  // 3. Generate JSON-LD Schema (optional to prevent page-level duplication)
  const breadcrumbSchema = renderSchema
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: uniqueItems.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.label,
          item: formatFullUrl(item.url),
        })),
      }
    : null;

  return (
    <>
      {/* Render Schema tag only if renderSchema is true */}
      {renderSchema && breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}

      {/* Visible Breadcrumb UI */}
      <nav aria-label="Breadcrumb" className="mb-6 overflow-x-auto whitespace-nowrap pb-2">
        <ol className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 font-medium tracking-wide">
          {uniqueItems.map((item, index) => {
            const isLast = index === uniqueItems.length - 1;
            return (
              <li key={`${item.url}-${index}`} className="flex items-center">
                {isLast ? (
                  <span className="text-[var(--color-brand-orange)] font-bold" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link href={item.url} className="hover:text-[var(--color-brand-orange)] transition-colors">
                      {item.label}
                    </Link>
                    <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400 shrink-0" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}