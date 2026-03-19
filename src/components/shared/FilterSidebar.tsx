

'use client';

import React from 'react';
import clsx from 'clsx';
import { Check } from 'lucide-react';

// --- Types ---

interface Filters {
  styles?: string[];
  sizes?: string[];
  placements?: string[];
}

interface ActiveFilters {
  styles: string[];
  sizes: string[];
  placements: string[];
}

interface FilterSidebarProps {
  filters: Filters;
  activeFilters: ActiveFilters;
  onToggle: (category: keyof Filters | 'RESET', value?: string) => void;
}

interface FilterGroupProps {
  title: string;
  items: string[];
  activeItems: string[];
  onToggle: (value: string) => void;
}

// --- Components ---

export function FilterSidebar({ filters, activeFilters, onToggle }: FilterSidebarProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
      {filters.styles && filters.styles.length > 0 && (
        <FilterGroup 
          title="Style" 
          items={filters.styles} 
          activeItems={activeFilters.styles} 
          onToggle={(v) => onToggle('styles', v)} 
        />
      )}
      
      {filters.sizes && filters.sizes.length > 0 && (
        <FilterGroup 
          title="Size" 
          items={filters.sizes} 
          activeItems={activeFilters.sizes} 
          onToggle={(v) => onToggle('sizes', v)} 
        />
      )}
      
      {filters.placements && filters.placements.length > 0 && (
        <FilterGroup 
          title="Placement" 
          items={filters.placements} 
          activeItems={activeFilters.placements} 
          onToggle={(v) => onToggle('placements', v)} 
        />
      )}
      
      {Object.values(activeFilters).some(arr => arr.length > 0) && (
        <button 
          onClick={() => onToggle('RESET')} 
          className="w-full py-3 rounded-xl bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-colors shadow-lg"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}

function FilterGroup({ title, items, activeItems, onToggle }: FilterGroupProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-200 pb-2">
        {title}
      </h4>
      <div className="space-y-3">
        {items.map((item) => {
          const isActive = activeItems.includes(item);
          return (
            <label key={item} className="flex items-center gap-3 cursor-pointer group select-none">
              <div 
                className={clsx(
                  "w-4 h-4 rounded-sm border transition-all flex items-center justify-center",
                  isActive ? "bg-slate-950 border-slate-950 text-white" : "border-slate-300 bg-white group-hover:border-slate-500"
                )}
              >
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={isActive} 
                  onChange={() => onToggle(item)} 
                />
                {isActive && <Check className="w-3 h-3" strokeWidth={4} />}
              </div>
              <span className={clsx(
                "text-xs font-bold transition-colors uppercase tracking-widest", 
                isActive ? "text-slate-950" : "text-slate-500 group-hover:text-slate-800"
              )}>
                {item}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
