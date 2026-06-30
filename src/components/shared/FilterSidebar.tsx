'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { Check, ChevronDown } from 'lucide-react';

export interface FilterOptions {
  collections: string[];
  styles: string[];
  sizes: string[];
  placements: string[];
}

export interface ActiveFilters {
  collections: string[];
  styles: string[];
  sizes: string[];
  placements: string[];
}

interface FilterSidebarProps {
  filters: FilterOptions;
  activeFilters: ActiveFilters;
  onToggle: (category: keyof FilterOptions | 'RESET', value?: string) => void;
}

export function FilterSidebar({ filters, activeFilters, onToggle }: FilterSidebarProps) {
  const pathname = usePathname();
  const hasAnyActive = Object.values(activeFilters).some((arr) => arr.length > 0);

  return (
    <div className="space-y-1">

      {filters.collections && filters.collections.length > 0 && (
        <FilterGroup
          title="Categories"
          groupKey="collections"
          items={filters.collections}
          activeItems={activeFilters.collections}
          onToggle={(v) => onToggle('collections', v)}
        />
      )}

      {filters.styles && filters.styles.length > 0 && (
        <FilterGroup
          title="Style"
          groupKey="styles"
          items={filters.styles}
          activeItems={activeFilters.styles}
          onToggle={(v) => onToggle('styles', v)}
        />
      )}

      {filters.sizes && filters.sizes.length > 0 && (
        <FilterGroup
          title="Size"
          groupKey="sizes"
          items={filters.sizes}
          activeItems={activeFilters.sizes}
          onToggle={(v) => onToggle('sizes', v)}
        />
      )}

      {filters.placements && filters.placements.length > 0 && (
        <FilterGroup
          title="Placement"
          groupKey="placements"
          items={filters.placements}
          activeItems={activeFilters.placements}
          onToggle={(v) => onToggle('placements', v)}
        />
      )}

      {hasAnyActive && (
        <div className="pt-4">
          {/* 🚀 SEO FIX: Converted reset button to a semantic crawlable link */}
          <Link
            href={pathname}
            onClick={(e) => {
              e.preventDefault();
              onToggle('RESET');
            }}
            scroll={false}
            className="w-full flex items-center justify-center py-2.5 rounded-lg border border-zinc-700 text-zinc-400 text-[9px] font-black uppercase tracking-[0.25em] hover:border-[var(--color-brand-orange)] hover:text-[var(--color-brand-orange)] transition-all duration-200"
          >
            Clear All Filters
          </Link>
        </div>
      )}
    </div>
  );
}

// ─── Collapsible filter group ─────────────────────────────────────────────

interface FilterGroupProps {
  title: string;
  groupKey: keyof FilterOptions;
  items: string[];
  activeItems: string[];
  onToggle: (val: string) => void;
}

// 1. Core UI logic moved to an Internal component that takes searchParams as a raw string
function FilterGroupInternal({
  title,
  groupKey,
  items,
  activeItems,
  onToggle,
  currentSearchParams = "",
}: FilterGroupProps & { currentSearchParams?: string }) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const activeCount = activeItems.length;

  return (
    <div className="border-b border-zinc-800/60 last:border-0">

      {/* Group header toggle */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="w-full flex items-center justify-between py-3.5 group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 group-hover:text-zinc-200 transition-colors duration-150">
            {title}
          </span>
          {activeCount > 0 && (
            <span className="bg-[var(--color-brand-orange)] text-black text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none shrink-0">
              {activeCount}
            </span>
          )}
        </div>
        <ChevronDown
          className={clsx(
            'w-3.5 h-3.5 text-zinc-600 transition-transform duration-300 shrink-0',
            isOpen ? 'rotate-180' : 'rotate-0'
          )}
        />
      </button>

      {/* Items Container */}
      <div className={clsx('pb-3', isOpen ? 'block' : 'hidden')}>
        <div className="space-y-0.5">
          {items.map((item) => {
            const isActive = activeItems.includes(item);

            // 🚀 SEO FIX: Construct semantic URLs for crawlers while preserving existing queries
            let href = pathname;
            if (groupKey !== 'collections') {
              const params = new URLSearchParams(currentSearchParams);
              const newVals = isActive
                ? activeItems.filter((i) => i !== item)
                : [...activeItems, item];

              if (newVals.length > 0) {
                params.set(groupKey, newVals.join(','));
              } else {
                params.delete(groupKey);
              }
              
              const qs = params.toString();
              href = qs ? `${pathname}?${qs}` : pathname;
            }

            return (
              <Link
                key={item}
                href={href}
                onClick={(e) => {
                  e.preventDefault(); // Intercepts click so we don't hard reload
                  onToggle(item);     // Uses parent's fast state-routing
                }}
                scroll={false}
                role="checkbox"
                aria-checked={isActive}
                className="flex items-center gap-3 px-1 py-2 rounded-lg group/item hover:bg-zinc-800/40 transition-colors duration-150 select-none"
              >
                {/* 🚀 SEO FIX: Replaced <input type="checkbox"> with standard div to clean up DOM */}
                <div
                  className={clsx(
                    'w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 transition-all duration-150',
                    isActive
                      ? 'bg-[var(--color-brand-orange)] border-[var(--color-brand-orange)]'
                      : 'border-zinc-700 bg-transparent group-hover/item:border-zinc-500'
                  )}
                >
                  {isActive && (
                    <Check className="w-2.5 h-2.5 text-black" strokeWidth={3.5} />
                  )}
                </div>

                {/* Label text */}
                <span
                  className={clsx(
                    'text-[10px] font-bold uppercase tracking-widest leading-tight line-clamp-1 transition-colors duration-150',
                    isActive
                      ? 'text-[var(--color-brand-orange)]'
                      : 'text-zinc-500 group-hover/item:text-zinc-200'
                  )}
                >
                  {item}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
}

// 2. Component that handles reading the search parameters
function FilterGroupWithParams(props: FilterGroupProps) {
  const searchParams = useSearchParams();
  const currentSearchParams = searchParams?.toString() || "";
  return <FilterGroupInternal {...props} currentSearchParams={currentSearchParams} />;
}

// 3. Main Export - Wraps the component in a Suspense boundary to prevent SSR bailout.
// The fallback renders the HTML links instantly for Googlebot (without query params attached).
function FilterGroup(props: FilterGroupProps) {
  return (
    <Suspense fallback={<FilterGroupInternal {...props} currentSearchParams="" />}>
      <FilterGroupWithParams {...props} />
    </Suspense>
  );
}