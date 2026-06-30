import Link from "next/link";
import type { TattooProduct } from "./UI";
import BookClientLoader from "./BookClientLoader";

interface BookWrapperProps {
  products?: TattooProduct[];
}

export default function BookWrapper({ products }: BookWrapperProps) {
  return (
    <div className="w-full h-full relative">
      {/* 1. Safely render client canvas wrapper without triggering compile context exceptions */}
      <BookClientLoader products={products} />

      {/* 2. SEO HTML SHELL: Instantly indexed via raw server markup delivery pathways */}
      <div 
        className="sr-only absolute pointer-events-none w-1 h-1 overflow-hidden" 
        aria-hidden="true"
      >
        <h2>Interactive Temporary Tattoo Lookbook Catalog</h2>
        <p>Explore premium, long-lasting temporary ink collections and tattoo lookbooks custom engineered for authentic skin application style loops.</p>
        
        {products && products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <Link href={`/products/${product.handle}`} prefetch={false}>
                  <h3>{product.title}</h3>
                </Link>
                <span>Price: ${product.price}</span>
                <span>Ink Variant Type: {product.colorType}</span>
                
                {product.themes && product.themes.length > 0 && (
                  <p>Design Themes: {product.themes.join(", ")}</p>
                )}
                {product.placements && product.placements.length > 0 && (
                  <p>Recommended Placements: {product.placements.join(", ")}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading temporary tattoo flash artwork collections...</p>
        )}
      </div>
    </div>
  );
}