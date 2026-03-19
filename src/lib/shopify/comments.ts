// // import { getProductsQuery } from './queries';

// // type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

// // const removeEdgesAndNodes = (array: any[]) => {
// //   return array.map((edge) => edge?.node);
// // };

// // export async function getProducts({
// //   query,
// //   reverse,
// //   sortKey
// // }: {
// //   query?: string;
// //   reverse?: boolean;
// //   sortKey?: string;
// // } = {}) {
// //   const res = await shopifyFetch<any>({
// //     query: getProductsQuery,
// //     tags: ['products'], 
// //     variables: {
// //       first: 250,
// //       reverse: reverse || false,
// //       sortKey: sortKey || 'CREATED_AT',
// //       ...(query && { query })
// //     }
// //   });
  

// //   if (!res.body?.data?.products?.edges) {
// //     return [];
// //   }

// //   return removeEdgesAndNodes(res.body.data.products.edges);
// // }

// // export async function shopifyFetch<T>({
// //   cache = 'force-cache',
// //   headers,
// //   query,
// //   tags,
// //   variables
// // }: {
// //   cache?: RequestCache;
// //   headers?: HeadersInit;
// //   query: string;
// //   tags?: string[];
// //   variables?: ExtractVariables<T>;
// // }): Promise<{ status: number; body: T } | never> {
  
// //   // 1. Move the env variables INSIDE the function
// //   const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
// //   const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
// //   const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION;

// //   // 2. Move the endpoint creation INSIDE the function
// //   const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

// //   // I updated this error message so if it fails again, it tells you exactly WHICH variable is missing
// //   if (!domain || !storefrontAccessToken) {
// //     throw new Error(`Missing Shopify environment variables. Domain: ${domain || 'Missing'}, Token: ${storefrontAccessToken ? 'Exists' : 'Missing'}`);
// //   }

// //   try {
// //     const result = await fetch(endpoint, {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
// //         ...headers
// //       },
// //       body: JSON.stringify({
// //         ...(query && { query }),
// //         ...(variables && { variables })
// //       }),
// //       cache,
// //       ...(tags && { next: { tags } })
// //     });

// //     const body = await result.json();

// //     if (body.errors) {
// //       console.error('Shopify GraphQL Errors:', body.errors);
// //       throw body.errors[0];
// //     }

// //     return {
// //       status: result.status,
// //       body
// //     };
// //   } catch (e) {
// //     console.error('Shopify Fetch Error:', e);
// //     throw {
// //       error: e,
// //       query
// //     };
// //   }
// // }

// 'use server';

// import { getProductsQuery } from './queries';
// import { getCollectionNamesQuery } from './queries';
// type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

// export async function shopifyFetch<T>({
//   cache = 'force-cache',
//   headers,
//   query,
//   tags,
//   variables
// }: {
//   cache?: RequestCache;
//   headers?: HeadersInit;
//   query: string;
//   tags?: string[];
//   variables?: ExtractVariables<T>;
// }): Promise<{ status: number; body: T } | never> {
  
//   const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
//   const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
//   const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION || '2024-01';

//   const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

//   if (!domain || !storefrontAccessToken) {
//     throw new Error(`Missing Shopify environment variables. Domain: ${domain || 'Missing'}, Token: ${storefrontAccessToken ? 'Exists' : 'Missing'}`);
//   }

//   try {
//     const result = await fetch(endpoint, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
//         ...headers
//       },
//       body: JSON.stringify({
//         ...(query && { query }),
//         ...(variables && { variables })
//       }),
//       cache,
//       ...(tags && { next: { tags } })
//     });

//     const body = await result.json();

//     if (body.errors) {
//       console.error('Shopify GraphQL Errors:', body.errors);
//       throw body.errors[0];
//     }

//     return {
//       status: result.status,
//       body
//     };
//   } catch (e) {
//     console.error('Shopify Fetch Error:', e);
//     throw {
//       error: e,
//       query
//     };
//   }
// }

// export async function getProducts({
//   query,
//   first = 12,
//   after,
//   reverse,
//   sortKey
// }: {
//   query?: string;
//   first?: number;
//   after?: string;
//   reverse?: boolean;
//   sortKey?: string;
// } = {}) {
//   const res = await shopifyFetch<any>({
//     query: getProductsQuery,
//     tags: ['products'], 
//     variables: {
//       first,
//       after,
//       reverse: reverse || false,
//       sortKey: sortKey || 'CREATED_AT',
//       ...(query && { query })
//     }
//   });

//   const productsData = res.body?.data?.products;

//   // console.log("raw product data from shopify");
//   // console.log(productsData);
//   if (!productsData?.edges) {
//     return { products: [], pageInfo: { hasNextPage: false, endCursor: null } };
//   }

//   // Map Shopify data to the App's required format efficiently
//   const mappedProducts = productsData.edges.map(({ node }: any) => {
//     // Dynamically extract custom fields from tags (Requires tagging products in Shopify like "Style:Traditional")
//     const tags = node.tags || [];
//     const styleTag = tags.find((t: string) => t.startsWith('Style:'))?.replace('Style:', '').trim() || 'Standard';
//     const placementTags = tags.filter((t: string) => t.startsWith('Placement:')).map((t: string) => t.replace('Placement:', '').trim());
//     const badgeTag = tags.find((t: string) => t.startsWith('Badge:'))?.replace('Badge:', '').trim();
    
//     return {
//       id: node.id,
//       handle: node.handle,
//       name: node.title,
//       category: node.productType || 'Uncategorized',
//       style: styleTag,
//       placements: placementTags,
//       price: node.priceRange.minVariantPrice.amount,
//       image: node.featuredImage?.url || '/placeholder.png',
//       badge: badgeTag || null,
//       productColor: "#171717", // Default or extract from metafields
//       combinations: node.variants.edges.map(({ node: variant }: any) => ({
//         id: variant.id,
//         price: variant.price.amount,
//         image: variant.image?.url || node.featuredImage?.url,
//         size: variant.selectedOptions.find((o: any) => o.name === 'Size' || o.name === 'Title')?.value || 'Default',
//         stock: variant.availableForSale ? 100 : 0
//       }))
//     };
//   });

//   return {
//     products: mappedProducts,
//     pageInfo: productsData.pageInfo,
//     formattedData:  mapShopifyProductsForProduction(productsData)
//   };
// }


// export async function getCollectionNames() {
//   const res = await shopifyFetch<any>({
//     query: getCollectionNamesQuery,
//     tags: ['collections'],
//     variables: {
//       first: 250 
//     }
//   });

//   if (!res.body?.data?.collections?.edges) {
//     return [];
//   }

//   // Returns an array of objects: { title: "Temporary Tattoos", handle: "temporary-tattoos" }
//   return res.body.data.collections.edges.map(({ node }: any) => ({
//     title: node.title,
//     handle: node.handle
//   }));
// }

// // --- 1. CONFIGURATION & CONSTANTS ---
// const TATTOO_CATEGORIES = {
//   placements: ["Hand", "Foot", "Ankle & Wrist", "Back, Torso & Chest Pieces", "Leg and Arm Pieces", "Finger", "Sleeve", "Spine", "Body Part"],
//   themes: ["Animal", "Fantasy", "Nature", "Spiritual", "Symbols and Quotes", "Connection/Couple Art", "Floral", "Insects", "Celestial Art", "Japanese Art", "Tribal Art", "Dog", "Cat", "Eagle", "Fish"],
//   sizes: ["Small", "Medium", "Large"]
// };

// // Fallback background colors for product cards if you want dynamic UI
// const UI_COLORS = ['#F9F9F9', '#F4F1EA', '#EFEFEF', '#FAFAFA'];

// // --- 2. UTILITY FUNCTIONS ---
// const calculateDiscount = (price, compareAtPrice) => {
//   if (!compareAtPrice || compareAtPrice <= price) return null;
//   const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
//   return Math.round(discount); // e.g., returns 20 for "20% OFF"
// };

// // --- 3. MAIN MAPPING FUNCTION ---
// export function mapShopifyProductsForProduction(shopifyJson) {
//   if (!shopifyJson?.edges) return [];

//   return shopifyJson.edges.map(({ node }) => {
//     // -- A. SAFE EXTRACTIONS --
//     const collections = node.collections?.edges.map(c => c.node.title) || [];
//     const rawTags = node.tags || [];
    
//     // -- B. MEDIA SEPARATION (Images vs Videos) --
//     // Shopify Storefront API uses 'media' to return images, videos, and 3D models
//     const allMedia = node.media?.edges.map(m => m.node) || [];
//     const images = [];
//     const videos = [];
    
//     // Fallback if querying standard 'images' instead of 'media'
//     const legacyImages = node.images?.edges.map(img => img.node) || [];
    
//     const mediaToProcess = allMedia.length > 0 ? allMedia : legacyImages;
//     mediaToProcess.forEach(mediaItem => {
//       if (mediaItem.mediaContentType === 'VIDEO' || mediaItem.sources) {
//         videos.push({
//           url: mediaItem.sources?.[0]?.url,
//           previewImage: mediaItem.previewImage?.url || null,
//         });
//       } else {
//         images.push({
//           url: mediaItem.url || mediaItem.image?.url,
//           altText: mediaItem.altText || node.title,
//           width: mediaItem.width || mediaItem.image?.width,
//           height: mediaItem.height || mediaItem.image?.height
//         });
//       }
//     });

//     // -- C. VARIANTS & CHECKOUT DATA --
//     // You MUST use the variant.id for Shopify Checkout (Storefront API)
//     const variants = node.variants?.edges.map(v => ({
//       variantId: v.node.id, // REQUIRED FOR CHECKOUT: e.g., "gid://shopify/ProductVariant/12345"
//       title: v.node.title,
//       price: parseFloat(v.node.price?.amount || 0),
//       compareAtPrice: v.node.compareAtPrice ? parseFloat(v.node.compareAtPrice.amount) : null,
//       currency: v.node.price?.currencyCode || "USD",
//       sku: v.node.sku || null,
//       availableForSale: v.node.availableForSale || false,
//       quantityAvailable: v.node.quantityAvailable ?? null, // Often requires specific API permissions
//       selectedOptions: v.node.selectedOptions || []
//     })) || [];

//     const defaultVariant = variants[0] || {};
//     const isOnSale = defaultVariant.compareAtPrice > defaultVariant.price;

//     // -- D. TATTOO SPECIFIC LOGIC --
//     const isColored = collections.includes('Colored Art') || rawTags.includes('Color');

//     return {
//       // 1. Core Identifiers & Routing
//       id: node.id,
//       handle: node.handle,        // Shopify standard handle
//       slug: node.handle,          // Frontend router slug (e.g., /product/{slug})
//       title: node.title,
//       vendor: node.vendor || "Unknown Artist",
//       description: node.description,
//       descriptionHtml: node.descriptionHtml,

//       // 2. Checkout & Financials (Using Default Variant)
//       checkout: {
//         defaultVariantId: defaultVariant.variantId, // Pass this to Shopify Cart API
//         price: defaultVariant.price,
//         compareAtPrice: defaultVariant.compareAtPrice,
//         currency: defaultVariant.currency,
//         discountPercentage: calculateDiscount(defaultVariant.price, defaultVariant.compareAtPrice),
//       },

//       // 3. Inventory & Stock
//       inventory: {
//         availableForSale: node.availableForSale !== undefined ? node.availableForSale : defaultVariant.availableForSale,
//         inStock: defaultVariant.quantityAvailable !== null ? defaultVariant.quantityAvailable > 0 : true,
//         stockLevel: defaultVariant.quantityAvailable,
//       },

//       // 4. Media Grouping
//       media: {
//         featuredImage: node.featuredImage?.url || images[0]?.url || null,
//         hoverImage: images[1]?.url || null, // Second image for hover reveals
//         gallery: images,                    // All images for the product detail carousel
//         videos: videos,                     // Any associated video files
//       },

//       // 5. Product Sorting & Filtering Data (For Sidebar Filters)
//       attributes: {
//         placements: collections.filter(c => TATTOO_CATEGORIES.placements.includes(c)),
//         themes: collections.filter(c => TATTOO_CATEGORIES.themes.includes(c)),
//         sizes: collections.filter(c => TATTOO_CATEGORIES.sizes.includes(c)),
//         rawCollections: collections,
//         tags: rawTags,
//       },

//       // 6. Frontend UI / Styling Object
//       styling: {
//         // Badges array makes it easy to map over in React/Vue
//         badges: [
//           collections.includes('New Arrivals') ? { type: 'new', label: 'New Arrival', color: '#000000' } : null,
//           isOnSale ? { type: 'sale', label: 'Sale', color: '#FF3366' } : null,
//           !defaultVariant.availableForSale ? { type: 'sold_out', label: 'Sold Out', color: '#999999' } : null
//         ].filter(Boolean), // Removes nulls
        
//         // Colors & Layout
//         tattooColorType: isColored ? 'Color' : 'Black & Grey',
//         uiBackgroundColor: UI_COLORS[Math.floor(Math.random() * UI_COLORS.length)], // Random subtle background
//         cardTheme: "light", // Easy toggle for dark/light mode grids
        
//         // Extracted from your specific high-res vertical images
//         aspectRatio: images[0] && images[0].height > images[0].width * 1.5 ? 'tall' : 'standard',
//       },
      
//       // 7. All variants for size/color selection dropdowns on the Product Page
//       allVariants: variants
//     };
//   });
// }

// // export const imageFragment = /* GraphQL */ `
// //   fragment image on Image {
// //     url(transform: { preferredContentType: WEBP })
// //     altText
// //     width
// //     height
// //   }
// // `;

// // export const productFragment = /* GraphQL */ `
// //   fragment product on Product {
// //     id
// //     handle
// //     availableForSale
// //     title
// //     description
// //     descriptionHtml
// //     options {
// //       id
// //       name
// //       values
// //     }
// //     priceRange {
// //       maxVariantPrice {
// //         amount
// //         currencyCode
// //       }
// //       minVariantPrice {
// //         amount
// //         currencyCode
// //       }
// //     }
// //     variants(first: 250) {
// //       edges {
// //         node {
// //           id
// //           title
// //           availableForSale
// //           selectedOptions {
// //             name
// //             value
// //           }
// //           price {
// //             amount
// //             currencyCode
// //           }
// //         }
// //       }
// //     }
// //     featuredImage {
// //       ...image
// //     }
// //     images(first: 20) {
// //       edges {
// //         node {
// //           ...image
// //         }
// //       }
// //     }
// //     seo {
// //       description
// //       title
// //     }
// //     tags
// //     updatedAt
// //   }
// //   ${imageFragment}
// // `;


// // export const getProductsQuery = /* GraphQL */ `
// //   query getProducts($first: Int!, $sortKey: ProductSortKeys, $reverse: Boolean) {
// //     products(first: $first, sortKey: $sortKey, reverse: $reverse) {
// //       edges {
// //         node {
// //           ...product
// //         }
// //       }
// //     }
// //   }
// //   ${productFragment}
// // `;

// export const imageFragment = /* GraphQL */ `
//   fragment image on Image {
//     url(transform: { preferredContentType: WEBP })
//     altText
//     width
//     height
//   }
// `;

// export const productFragment = /* GraphQL */ `
//   fragment product on Product {
//     id
//     handle
//     availableForSale
//     title
//     productType
//     description
//     descriptionHtml
//     options {
//       id
//       name
//       values
//     }
//     priceRange {
//       maxVariantPrice {
//         amount
//         currencyCode
//       }
//       minVariantPrice {
//         amount
//         currencyCode
//       }
//     }
//     variants(first: 250) {
//       edges {
//         node {
//           id
//           title
//           availableForSale
//           selectedOptions {
//             name
//             value
//           }
//           price {
//             amount
//             currencyCode
//           }
//           image {
//             ...image
//           }
//         }
//       }
//     }
//     featuredImage {
//       ...image
//     }
//     images(first: 20) {
//       edges {
//         node {
//           ...image
//         }
//       }
//     }
//     seo {
//       description
//       title
//     }
//     tags
//     updatedAt
//   }
//   ${imageFragment}
// `;

// export const getProductsQuery = /* GraphQL */ `
//   query getProducts($first: Int!, $after: String, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
//     products(first: $first, after: $after, query: $query, sortKey: $sortKey, reverse: $reverse) {
//       pageInfo {
//         hasNextPage
//         hasPreviousPage
//         startCursor
//         endCursor
//       }
//       edges {
//         cursor
//         node {
//           ...product
//         }
//       }
//     }
//   }
//   ${productFragment}
// `;

// export const imageFragment = /* GraphQL */ `
//   fragment image on Image {
//     url(transform: { preferredContentType: WEBP })
//     altText
//     width
//     height
//   }
// `;

// 1. THIS IS WHERE ALL THE NEW DATA FIELDS ARE ADDED
// export const productFragment = /* GraphQL */ `
//   fragment product on Product {
//     id
//     handle
//     availableForSale
//     title
//     description
//     descriptionHtml
//     vendor          # Added: Vendor (from Organization section)
//     productType     # Added: Product Category / Type
//     tags            # Kept: Tags (from Organization section)
//     seo {           # Kept: Search Engine Listing details
//       description
//       title
//     }
    
//     # Added: Fetching which Collections this product belongs to
//     collections(first: 10) {
//       edges {
//         node {
//           id
//           title
//           handle
//         }
//       }
//     }
    
//     options {
//       id
//       name
//       values
//     }
    
//     priceRange {
//       maxVariantPrice {
//         amount
//         currencyCode
//       }
//       minVariantPrice {
//         amount
//         currencyCode
//       }
//     }
    
//     # Updated: Variant details (Sizes, Price, Inventory, SKU, Barcode)
//     variants(first: 250) {
//       edges {
//         node {
//           id
//           title
//           sku                 # Added: SKU
//           barcode             # Added: Barcode
//           availableForSale
//           quantityAvailable   # Added: Exact Inventory count
//           selectedOptions {
//             name
//             value
//           }
//           price {
//             amount
//             currencyCode
//           }
//           compareAtPrice {    # Added: For showing "Original Price" crossed out if on sale
//             amount
//             currencyCode
//           }
//           image {             # Added: Variant specific images if you map images to sizes
//             ...image
//           }
//         }
//       }
//     }
    
//     featuredImage {
//       ...image
//     }
    
//     images(first: 20) {
//       edges {
//         node {
//           ...image
//         }
//       }
//     }
//     tags
//     collections
//     price
//     Category metafields
//     Inventory
//     updatedAt
//   }
//   ${imageFragment}
// `;

// 'use client';

// import React, { useState, useMemo, useEffect } from 'react';
// import { useSearchParams, useRouter, usePathname } from 'next/navigation';
// import { SlidersHorizontal, LayoutGrid, List, X, ChevronLeft, ChevronRight, RefreshCcw } from 'lucide-react';
// import clsx from 'clsx';

// import { FilterSidebar } from '@/src/components/shared/FilterSidebar';
// import { ProductCard } from '@/src/components/shared/ProductLayout';

// // Dummy Data types
// interface Combination {
//   id: string;
//   price: number | string;
//   image: string;
//   size: string;
//   stock: number;
// }

// interface Product {
//   id: string;
//   name: string;
//   category: string;
//   style: string;
//   handle?: string;
//   price: number | string;
//   image: string;
//   combinations?: Combination[];
//   placements?: string[];
//   productColor: any;
//   isExploded?: boolean;
//   originalId?: string;
//   variantName?: string;
//   preSelectedCombo?: Combination;
//   slug?: string;
//   badge: any;
// }

// interface ActiveFilters {
//   styles: string[];
//   sizes: string[];
//   placements: string[];
// }
// //HardCoded products we need to remove this now
// export const tattooProducts: Product[] = [
//   {
//     id: "prod_1",
//     handle: "crying-heart-traditional",
//     name: "Crying Heart",
//     category: "Temporary Tattoos",
//     price: "12.00",
//     image: "/assets/images/Card1.png",
//     badge: "Bestseller",
//     style: "Traditional",
//     placements: ["Forearm", "Calf", "Chest"],
//     productColor: "#dc2626", 
//     combinations: [
//       { id: "var_1a", size: "Small (2x2)", price: "12.00", stock: 10, image: "/assets/images/Card1.png" },
//       { id: "var_1b", size: "Large (4x4)", price: "18.00", stock: 5, image: "/assets/images/Card1.png" }
//     ]
//   },
//   {
//     id: "prod_2",
//     handle: "serpent-wrap",
//     name: "Serpent Wrap",
//     category: "Temporary Tattoos",
//     price: "24.00",
//     image: "/assets/images/Card2.png",
//     badge: "New",
//     style: "Blackwork",
//     placements: ["Forearm", "Neck", "Leg"],
//     productColor: "#171717", 
//     combinations: [
//       { id: "var_2a", size: "Medium (5x3)", price: "24.00", stock: 15, image: "/assets/images/Card2.png" },
//       { id: "var_2b", size: "Sleeve (10x6)", price: "45.00", stock: 2, image: "/assets/images/Card2.png" }
//     ]
//   },
//   {
//     id: "prod_3",
//     handle: "botanical-flash-sheet",
//     name: "Botanical Flash Sheet",
//     category: "Flash Sheets",
//     price: "30.00",
//     image: "/assets/images/Card3.png",
//     badge: "Digital Download",
//     style: "Fine Line",
//     placements: ["Any"],
//     productColor: "#52525b", 
//     combinations: [
//       { id: "var_3a", size: "Standard (8.5x11)", price: "30.00", stock: 999, image: "/assets/images/Card3.png" }
//     ]
//   },
//   {
//     id: "prod_4",
//     handle: "minimalist-rose",
//     name: "Minimalist Rose",
//     category: "Temporary Tattoos",
//     price: "10.00",
//     image: "/assets/images/Card7.png",
//     badge: null,
//     style: "Fine Line",
//     placements: ["Wrist", "Ankle", "Behind Ear"],
//     productColor: "#ef4444", 
//     combinations: [
//       { id: "var_4a", size: "Tiny (1x1)", price: "10.00", stock: 20, image: "/assets/images/Card7.png" }
//     ]
//   },
//   {
//     id: "prod_5",
//     handle: "geometric-wolf",
//     name: "Geometric Wolf",
//     category: "Temporary Tattoos",
//     price: "16.00",
//     image: "/assets/images/Card4.png",
//     badge: "Trending",
//     style: "Geometric",
//     placements: ["Forearm", "Thigh", "Shoulder"],
//     productColor: "#3f3f46", 
//     combinations: [
//       { id: "var_5a", size: "Medium (4x4)", price: "16.00", stock: 12, image: "/assets/images/Card4.png" }
//     ]
//   },
//   {
//     id: "prod_6",
//     handle: "mandala-lotus",
//     name: "Mandala Lotus",
//     category: "Temporary Tattoos",
//     price: "22.00",
//     image: "/assets/images/Card9.png",
//     badge: "Limited",
//     style: "Dotwork",
//     placements: ["Sternum", "Back", "Thigh"],
//     productColor: "#000000", 
//     combinations: [
//       { id: "var_6a", size: "Medium (5x5)", price: "22.00", stock: 8, image: "/assets/images/Card9.png" }
//     ]
//   },
//   {
//     id: "prod_7",
//     handle: "skull-dagger",
//     name: "Skull & Dagger",
//     category: "Temporary Tattoos",
//     price: "18.00",
//     image: "/assets/images/Card2.png",
//     badge: null,
//     style: "Traditional",
//     placements: ["Calf", "Forearm", "Bicep"],
//     productColor: "#1c1917", 
//     combinations: [
//       { id: "var_7a", size: "Medium (4x6)", price: "18.00", stock: 14, image: "/assets/images/Card2.png" }
//     ]
//   },
//   {
//     id: "prod_8",
//     handle: "koi-fish-flow",
//     name: "Koi Fish Flow",
//     category: "Temporary Tattoos",
//     price: "26.00",
//     image: "/assets/images/Card5.png",
//     badge: "Bestseller",
//     style: "Japanese",
//     placements: ["Sleeve", "Calf", "Ribs"],
//     productColor: "#ea580c", 
//     combinations: [
//       { id: "var_8a", size: "Large (6x8)", price: "26.00", stock: 6, image: "/assets/images/Card5.png" }
//     ]
//   },
//   {
//     id: "prod_9",
//     handle: "vintage-swallow",
//     name: "Vintage Swallow",
//     category: "Temporary Tattoos",
//     price: "14.00",
//     image: "/assets/images/Card10.png",
//     badge: "Classic",
//     style: "Traditional",
//     placements: ["Hand", "Chest", "Neck"],
//     productColor: "#0284c7", 
//     combinations: [
//       { id: "var_9a", size: "Small (3x3)", price: "14.00", stock: 25, image: "/assets/images/Card10.png" }
//     ]
//   },
//   {
//     id: "prod_10",
//     handle: "moon-phases",
//     name: "Moon Phases",
//     category: "Temporary Tattoos",
//     price: "15.00",
//     image: "/assets/images/Card1.png",
//     badge: null,
//     style: "Minimalist",
//     placements: ["Spine", "Forearm", "Collarbone"],
//     productColor: "#71717a", 
//     combinations: [
//       { id: "var_10a", size: "Strip (2x8)", price: "15.00", stock: 18, image: "/assets/images/Card1.png" }
//     ]
//   },
//   {
//     id: "prod_11",
//     handle: "cyberpunk-glitch",
//     name: "Cyberpunk Glitch",
//     category: "Temporary Tattoos",
//     price: "20.00",
//     image: "/assets/images/Card8.png",
//     badge: "Limited Edition",
//     style: "Neo-Traditional",
//     placements: ["Forearm", "Neck", "Calf"],
//     productColor: "#ec4899", 
//     combinations: [
//       { id: "var_11a", size: "Medium (4x5)", price: "20.00", stock: 5, image: "/assets/images/Card8.png" }
//     ]
//   },
//   {
//     id: "prod_12",
//     handle: "tiger-roar",
//     name: "Tiger Roar",
//     category: "Temporary Tattoos",
//     price: "28.00",
//     image: "/assets/images/Card6.png",
//     badge: "Hot",
//     style: "Realism",
//     placements: ["Chest", "Thigh", "Upper Back"],
//     productColor: "#b45309", 
//     combinations: [
//       { id: "var_12a", size: "Large (6x6)", price: "28.00", stock: 7, image: "/assets/images/Card6.png" }
//     ]
//   },
//   {
//     id: "prod_13",
//     handle: "dragon-coil",
//     name: "Dragon Coil",
//     category: "Temporary Tattoos",
//     price: "35.00",
//     image: "/assets/images/Card3.png",
//     badge: "Staff Pick",
//     style: "Japanese",
//     placements: ["Full Arm", "Leg Wrap", "Back"],
//     productColor: "#0f172a", 
//     combinations: [
//       { id: "var_13a", size: "Extra Large (8x14)", price: "35.00", stock: 4, image: "/assets/images/Card3.png" }
//     ]
//   },
//   {
//     id: "prod_14",
//     handle: "tarot-the-moon",
//     name: "Tarot Card: The Moon",
//     category: "Temporary Tattoos",
//     price: "16.00",
//     image: "/assets/images/Card5.png",
//     badge: null,
//     style: "Blackwork",
//     placements: ["Forearm", "Calf", "Bicep"],
//     productColor: "#27272a", 
//     combinations: [
//       { id: "var_14a", size: "Medium (3x5)", price: "16.00", stock: 22, image: "/assets/images/Card5.png" }
//     ]
//   },
//   {
//     id: "prod_15",
//     handle: "sacred-heart",
//     name: "Sacred Heart",
//     category: "Temporary Tattoos",
//     price: "18.00",
//     image: "/assets/images/Card7.png",
//     badge: "Popular",
//     style: "Traditional",
//     placements: ["Chest", "Sternum", "Hand"],
//     productColor: "#be123c", 
//     combinations: [
//       { id: "var_15a", size: "Medium (4x4)", price: "18.00", stock: 11, image: "/assets/images/Card7.png" }
//     ]
//   },
//   {
//     id: "prod_16",
//     handle: "barbed-wire-armband",
//     name: "Barbed Wire Armband",
//     category: "Temporary Tattoos",
//     price: "14.00",
//     image: "/assets/images/Card9.png",
//     badge: null,
//     style: "Tribal",
//     placements: ["Bicep", "Wrist", "Ankle"],
//     productColor: "#404040", 
//     combinations: [
//       { id: "var_16a", size: "Wrap (2x10)", price: "14.00", stock: 30, image: "/assets/images/Card9.png" }
//     ]
//   },
//   {
//     id: "prod_17",
//     handle: "butterfly-swarm",
//     name: "Butterfly Swarm",
//     category: "Temporary Tattoos",
//     price: "20.00",
//     image: "/assets/images/Card2.png",
//     badge: "Popular",
//     style: "Fine Line",
//     placements: ["Shoulder", "Ribs", "Thigh"],
//     productColor: "#3b82f6", 
//     combinations: [
//       { id: "var_17a", size: "Large (5x7)", price: "20.00", stock: 16, image: "/assets/images/Card2.png" }
//     ]
//   },
//   {
//     id: "prod_18",
//     handle: "watercolor-fox",
//     name: "Watercolor Fox",
//     category: "Temporary Tattoos",
//     price: "24.00",
//     image: "/assets/images/Card10.png",
//     badge: "Artistic",
//     style: "Watercolor",
//     placements: ["Calf", "Forearm", "Shoulder Blade"],
//     productColor: "#f97316", 
//     combinations: [
//       { id: "var_18a", size: "Medium (4x6)", price: "24.00", stock: 9, image: "/assets/images/Card10.png" }
//     ]
//   },
//   {
//     id: "prod_19",
//     handle: "gothic-lettering-pack",
//     name: "Gothic Lettering Pack",
//     category: "Flash Sheets",
//     price: "25.00",
//     image: "/assets/images/Card4.png",
//     badge: "Digital Download",
//     style: "Lettering",
//     placements: ["Any"],
//     productColor: "#18181b", 
//     combinations: [
//       { id: "var_19a", size: "Standard (8.5x11)", price: "25.00", stock: 999, image: "/assets/images/Card4.png" }
//     ]
//   },
//   {
//     id: "prod_20",
//     handle: "abstract-line-art",
//     name: "Abstract Line Art",
//     category: "Temporary Tattoos",
//     price: "18.00",
//     image: "/assets/images/Card8.png",
//     badge: "New",
//     style: "Abstract",
//     placements: ["Forearm", "Ribs", "Ankle"],
//     productColor: "#52525b", 
//     combinations: [
//       { id: "var_20a", size: "Medium (4x5)", price: "18.00", stock: 13, image: "/assets/images/Card8.png" }
//     ]
//   }
// ];

// export default function ShopAll() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
  
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(12);

//   const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
//     styles: [],
//     sizes: [],
//     placements: []
//   });

//   // Handle Dynamic Items Per Page based on screen size
//   useEffect(() => {
//     const handleResize = () => {
//       setItemsPerPage(window.innerWidth < 1024 ? 9 : 12);
//     };
    
//     // Set initial value
//     handleResize();
    
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, [currentPage]);

//   const categoryFromUrl = searchParams.get('category') || 'Shop All';

//   // Dynamic Categories
//   const categories = useMemo(() => {
//     const cats = new Set(tattooProducts.map(p => p.category).filter(Boolean));
//     return ['Shop All', ...Array.from(cats)];
//   }, []);

//   // --- FILTER & EXPLOSION LOGIC ---
//   const filteredProducts = useMemo(() => {
//     return tattooProducts.filter(p => {
//       const matchesCategory = categoryFromUrl === 'Shop All' || p.category === categoryFromUrl;
//       const matchesStyle = activeFilters.styles.length === 0 || activeFilters.styles.includes(p.style);
//       const matchesSize = activeFilters.sizes.length === 0 || (p.combinations && p.combinations.some(c => activeFilters.sizes.includes(c.size)));
      
//       // FIXED: Safely fallback to empty array to prevent undefined error
//       const matchesPlacement = activeFilters.placements.length === 0 || activeFilters.placements.every(pl => (p.placements || []).includes(pl));

//       return matchesCategory && matchesStyle && matchesSize && matchesPlacement;
//     });
//   }, [categoryFromUrl, activeFilters]);

//   const displayItems = useMemo(() => {
//     if (filteredProducts.length > 0 && filteredProducts.length < 3) {
//       return filteredProducts.flatMap(product => {
//         if (!product.combinations?.length) return [{ ...product, isExploded: false }];
        
//         const relevantCombos = product.combinations.filter(combo => {
//           if (activeFilters.sizes.length === 0) return true;
//           return activeFilters.sizes.includes(combo.size);
//         });

//         return relevantCombos.map(combo => ({
//           ...product,
//           id: `${product.id}-${combo.id}`,
//           originalId: product.id,
//           variantName: combo.size,
//           price: combo.price,
//           image: combo.image, 
//           isExploded: true,
//           preSelectedCombo: combo,
//           slug: `${product.handle}-${combo.id}`
//         }));
//       });
//     }
//     return filteredProducts.map(p => ({ ...p, isExploded: false }));
//   }, [filteredProducts, activeFilters.sizes]);

//   // --- DYNAMIC SIDEBAR DATA ---
//   const dynamicFilterOptions = useMemo(() => {
//     const currentCategoryProducts = categoryFromUrl === 'Shop All' 
//       ? tattooProducts 
//       : tattooProducts.filter(p => p.category === categoryFromUrl);

//     return {
//       styles: Array.from(new Set(currentCategoryProducts.map(p => p.style))).filter(Boolean),
//       sizes: Array.from(new Set(currentCategoryProducts.flatMap(p => p.combinations?.map(c => c.size) || []))).filter(Boolean),
//       placements: Array.from(new Set(currentCategoryProducts.flatMap(p => p.placements || []))).filter(Boolean)
//     };
//   }, [categoryFromUrl]);

//   const totalPages = Math.ceil(displayItems.length / itemsPerPage);
  
//   // Ensure current page is valid when total pages change
//   useEffect(() => {
//     if (currentPage > totalPages && totalPages > 0) {
//       setCurrentPage(totalPages);
//     }
//   }, [totalPages, currentPage]);

//   const paginatedItems = displayItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   const handleCategoryChange = (cat: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     if (cat === 'Shop All') params.delete('category');
//     else params.set('category', cat);
    
//     router.push(`${pathname}?${params.toString()}`);
//     setActiveFilters({ styles: [], sizes: [], placements: [] });
//     setCurrentPage(1);
//   };

//   const toggleFilter = (group: keyof ActiveFilters | 'RESET', value?: string) => {
//     if (group === 'RESET') {
//       setActiveFilters({ styles: [], sizes: [], placements: [] });
//       return;
//     }
//     if (!value) return;

//     setActiveFilters(prev => {
//       const currentGroup = prev[group as keyof ActiveFilters];
//       const isSelected = currentGroup.includes(value);
//       return {
//         ...prev,
//         [group]: isSelected 
//           ? currentGroup.filter(item => item !== value) 
//           : [...currentGroup, value]
//       };
//     });
//     setCurrentPage(1);
//   };

//   return (
//     <div className="bg-slate-50 min-h-screen text-slate-950 selection:bg-slate-900 selection:text-white mt-20 md:mt-20">
      
//       {/* MOBILE DRAWER */}
//       <div className={clsx(
//         "fixed inset-0 z-[60] bg-slate-950/40 backdrop-blur-sm transition-opacity lg:hidden",
//         isFilterDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//       )} onClick={() => setFilterDrawerOpen(false)} />
      
//       <div className={clsx(
//         "fixed right-0 top-0 h-full w-[300px] bg-white z-[70] shadow-2xl transition-transform duration-500 lg:hidden border-l-2 border-slate-950",
//         isFilterDrawerOpen ? "translate-x-0" : "translate-x-full"
//       )}>
//         <div className="p-6 h-full flex flex-col">
//           <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-slate-100 shrink-0">
//             <h2 className="text-[12px] font-black uppercase tracking-[0.2em]">Filters</h2>
//             <button onClick={() => setFilterDrawerOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//           {/* FIXED: Added a flex-1 scrolling container so filters don't get hidden */}
//           <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
//             <FilterSidebar filters={dynamicFilterOptions} activeFilters={activeFilters} onToggle={toggleFilter} />
//           </div>
//         </div>
//       </div>

//       {/* TOP NAVIGATION */}
//       <nav className="sticky top-0 z-40 bg-white border-b-2 border-slate-100">
//         <div className="container max-w-[1400px] mx-auto px-4 py-4 flex items-center justify-between gap-4">
//           <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => handleCategoryChange(cat)}
//                 className={clsx(
//                   "px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border-2",
//                   categoryFromUrl === cat 
//                     ? "bg-slate-950 text-white border-slate-950" 
//                     : "bg-white text-slate-500 border-slate-200 hover:border-slate-950 hover:text-slate-950"
//                 )}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//           <button 
//             onClick={() => setFilterDrawerOpen(true)} 
//             className="lg:hidden p-2.5 bg-white border-2 border-slate-200 hover:border-slate-950 text-slate-950 transition-colors"
//           >
//             <SlidersHorizontal className="w-4 h-4" />
//           </button>
//         </div>
//       </nav>

//       {/* MAIN CONTENT AREA */}
//       <main className="container max-w-[1400px] mx-auto px-4 py-12">
//         <div className="flex flex-col lg:flex-row gap-12">
          
//           {/* DESKTOP SIDEBAR */}
//           <aside className="hidden lg:block w-64 shrink-0">
//             <div className="sticky top-28 space-y-8 max-h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar pb-4 pr-6 border-r-2 border-slate-100">
//               <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-950 mb-8 pb-4 border-b-2 border-slate-950">
//                 Filters
//               </span>
//               <FilterSidebar filters={dynamicFilterOptions} activeFilters={activeFilters} onToggle={toggleFilter} />
//             </div>
//           </aside>

//           {/* PRODUCT LISTINGS */}
//           <div className="flex-grow">
//   {/* HEADER SECTION */}
//   <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-6 border-b border-gray-100">
//     <div>
//       <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight capitalize">
//         {categoryFromUrl}
//       </h1>
//       <p className="text-sm font-medium text-gray-500 mt-2">
//         Showing <span className="text-gray-900 font-bold">{displayItems.length}</span> products
//       </p>
//     </div>
    
//     {/* VIEW MODE TOGGLE */}
//     <div className="flex items-center self-start sm:self-auto gap-1 bg-gray-50/80 border border-gray-200 p-1 rounded-xl shadow-sm">
//       <button 
//         onClick={() => setViewMode('grid')} 
//         className={clsx(
//           "p-2.5 rounded-lg transition-all duration-300", 
//           viewMode === 'grid' 
//             ? "bg-white text-[#fe8204] shadow-sm" 
//             : "text-gray-400 hover:text-gray-800 hover:bg-gray-100"
//         )}
//       >
//         <LayoutGrid className="w-4 h-4" />
//       </button>
//       <button 
//         onClick={() => setViewMode('list')} 
//         className={clsx(
//           "p-2.5 rounded-lg transition-all duration-300", 
//           viewMode === 'list' 
//             ? "bg-white text-[#fe8204] shadow-sm" 
//             : "text-gray-400 hover:text-gray-800 hover:bg-gray-100"
//         )}
//       >
//         <List className="w-4 h-4" />
//       </button>
//     </div>
//   </div>

//   {/* PRODUCTS LAYOUT WITH GRADIENT */}
//   {displayItems.length > 0 ? (
//     <div className={clsx(
//       // The neat gradient container
//       "p-4 sm:p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-gray-50 via-white to-[#fe8204]/5 border border-gray-100 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]",
//       "grid gap-6 sm:gap-8",
//       viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
//     )}>
//       {paginatedItems.map((item) => (
//         <ProductCard key={item.id} item={item} viewMode={viewMode} page="collections" />
//       ))}
//     </div>
//   ) : (
//     /* EMPTY STATE */
//     <div className="py-24 text-center bg-gray-50/50 border border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center">
//       <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//         <RefreshCcw className="w-8 h-8 text-gray-400" />
//       </div>
//       <p className="text-gray-900 font-bold text-lg mb-2">No products found</p>
//       <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">We couldn't find anything matching your current filters. Try adjusting them to see more results.</p>
//       <button 
//         onClick={() => toggleFilter('RESET')} 
//         className="px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-[#fe8204] transition-colors shadow-md"
//       >
//         Clear All Filters
//       </button>
//     </div>
//   )}

//   {/* PAGINATION */}
//   {totalPages > 1 && (
//     <div className="mt-12 flex items-center justify-center gap-2">
//       <button 
//         disabled={currentPage === 1} 
//         onClick={() => setCurrentPage(p => p - 1)} 
//         className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#fe8204] hover:text-[#fe8204] transition-all text-gray-600 shadow-sm"
//       >
//         <ChevronLeft className="w-5 h-5" />
//       </button>
      
//       {[...Array(totalPages)].map((_, i) => (
//         <button 
//           key={i} 
//           onClick={() => setCurrentPage(i + 1)} 
//           className={clsx(
//             "w-10 h-10 rounded-xl text-sm font-bold transition-all shadow-sm", 
//             currentPage === i + 1 
//               ? "bg-[#fe8204] text-white border-transparent shadow-[#fe8204]/30 shadow-md" 
//               : "bg-white text-gray-600 border border-gray-200 hover:border-[#fe8204] hover:text-[#fe8204]"
//           )}
//         >
//           {i + 1}
//         </button>
//       ))}
      
//       <button 
//         disabled={currentPage === totalPages} 
//         onClick={() => setCurrentPage(p => p + 1)} 
//         className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#fe8204] hover:text-[#fe8204] transition-all text-gray-600 shadow-sm"
//       >
//         <ChevronRight className="w-5 h-5" />
//       </button>
//     </div>
//   )}
// </div>
//         </div>
//       </main>
//     </div>
//   );
// }


// 'use client';

// import React from 'react';
// import clsx from 'clsx';
// import { Check } from 'lucide-react';

// // --- Types ---

// interface Filters {
//   styles?: string[];
//   sizes?: string[];
//   placements?: string[];
// }

// interface ActiveFilters {
//   styles: string[];
//   sizes: string[];
//   placements: string[];
// }

// interface FilterSidebarProps {
//   filters: Filters;
//   activeFilters: ActiveFilters;
//   onToggle: (category: keyof Filters | 'RESET', value?: string) => void;
// }

// interface FilterGroupProps {
//   title: string;
//   items: string[];
//   activeItems: string[];
//   onToggle: (value: string) => void;
// }

// // --- Components ---

// export function FilterSidebar({ filters, activeFilters, onToggle }: FilterSidebarProps) {
//   return (
//     <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
//       {filters.styles && filters.styles.length > 0 && (
//         <FilterGroup 
//           title="Style" 
//           items={filters.styles} 
//           activeItems={activeFilters.styles} 
//           onToggle={(v) => onToggle('styles', v)} 
//         />
//       )}
      
//       {filters.sizes && filters.sizes.length > 0 && (
//         <FilterGroup 
//           title="Size" 
//           items={filters.sizes} 
//           activeItems={activeFilters.sizes} 
//           onToggle={(v) => onToggle('sizes', v)} 
//         />
//       )}
      
//       {filters.placements && filters.placements.length > 0 && (
//         <FilterGroup 
//           title="Placement" 
//           items={filters.placements} 
//           activeItems={activeFilters.placements} 
//           onToggle={(v) => onToggle('placements', v)} 
//         />
//       )}
      
//       {Object.values(activeFilters).some(arr => arr.length > 0) && (
//         <button 
//           onClick={() => onToggle('RESET')} 
//           className="w-full py-3 rounded-xl bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-colors shadow-lg"
//         >
//           Reset Filters
//         </button>
//       )}
//     </div>
//   );
// }

// function FilterGroup({ title, items, activeItems, onToggle }: FilterGroupProps) {
//   return (
//     <div className="space-y-4">
//       <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-200 pb-2">
//         {title}
//       </h4>
//       <div className="space-y-3">
//         {items.map((item) => {
//           const isActive = activeItems.includes(item);
//           return (
//             <label key={item} className="flex items-center gap-3 cursor-pointer group select-none">
//               <div 
//                 className={clsx(
//                   "w-4 h-4 rounded-sm border transition-all flex items-center justify-center",
//                   isActive ? "bg-slate-950 border-slate-950 text-white" : "border-slate-300 bg-white group-hover:border-slate-500"
//                 )}
//               >
//                 <input 
//                   type="checkbox" 
//                   className="hidden" 
//                   checked={isActive} 
//                   onChange={() => onToggle(item)} 
//                 />
//                 {isActive && <Check className="w-3 h-3" strokeWidth={4} />}
//               </div>
//               <span className={clsx(
//                 "text-xs font-bold transition-colors uppercase tracking-widest", 
//                 isActive ? "text-slate-950" : "text-slate-500 group-hover:text-slate-800"
//               )}>
//                 {item}
//               </span>
//             </label>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { ChevronDown, ShoppingBag } from 'lucide-react';
// import clsx from 'clsx';
// import Image from 'next/image';
// import { toast } from 'sonner';
// import { useCart } from '@/src/context/CartContext';
// import { Loader2 } from 'lucide-react';
// // --- Types ---
// interface Combination {
//   id: string;
//   price: number | string;
//   image: string;
//   size: string;
// }

// interface ProductItem {
//   id: string;
//   originalId?: string;
//   name: string;
//   variantName?: string;
//   style: string;
//   price: number | string;
//   image: string;
//   badge?: string;
//   productColor?: string;
//   isExploded?: boolean;
//   preSelectedCombo?: Combination;
//   combinations?: Combination[];
//   handle?: string;
//   slug?: string;
// }

// interface ProductCardProps {
//   item: ProductItem;
//   viewMode: 'grid' | 'list';
//   page: string; 
// }

// // --- Component ---
// export function ProductCard({ item, viewMode, page }: ProductCardProps) {
//   const isList = viewMode === 'list';
//   const isExploded = item.isExploded;
//   const combinations = item.combinations || [];
   
//   const [selectedCombo, setSelectedCombo] = useState<Combination | null>(
//     isExploded && item.preSelectedCombo ? item.preSelectedCombo : null
//   );

//   const [isAdding, setIsAdding] = useState(false); // <-- ADDED loading state
//   const { addToCart } = useCart(); // <-- ADDED cart hook

//   const price = selectedCombo ? selectedCombo.price : item.price;
//   const image = selectedCombo ? selectedCombo.image : item.image;
//   const parentId = isExploded ? item.originalId : item.id;
  
//   // Ensure the slug is URL-safe just in case it's generated on the fly
//   const rawSlug = item.slug || `${item.handle}-${parentId}`;
//   const slug = encodeURIComponent(rawSlug.toLowerCase().replace(/\s+/g, '-'));
  
//   // The universal base path based on your folder structure
//   const productUrl = `/${page}/${slug}`;

//   const handleAddToCart = async (e: React.MouseEvent) => {
//     e.preventDefault(); 
//     const comboToAdd = isExploded ? item.preSelectedCombo : (selectedCombo || item.combinations?.[0]);
    
//     if (!comboToAdd?.id) {
//         toast.error('Please select a size first.');
//         return;
//     }

//     setIsAdding(true);
//     try {
//       await addToCart({
//         variantId: comboToAdd.id,
//         productId: parentId || item.id,
//         name: isExploded ? (item.name || '') : item.name,
//         variantName: comboToAdd.size,
//         price: Number(comboToAdd.price),
//         image: comboToAdd.image,
//         quantity: 1
//       });
//     } catch (error) {
//       toast.error('Failed to add to cart. Please try again.');
//     } finally {
//       setIsAdding(false);
//     }
//   };

// //   const handleAddToCart = async (e: React.MouseEvent) => {
// //     e.preventDefault(); 
// //     const comboToAdd = isExploded ? item.preSelectedCombo : (selectedCombo || item.combinations?.[0]);
// //     if (!comboToAdd?.id) return;
    
// //     console.log(`Adding Variant ${comboToAdd.id} to cart`);
// //     // Example: await addToCart(comboToAdd.id, 1);
// //   };

//   return (
//     <div className={clsx(
//       "group relative bg-white border border-gray-100/80 shadow-sm rounded-2xl overflow-hidden transition-all duration-300 ease-in-out",
//       "hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:border-gray-200",
//       isList ? "flex flex-col sm:flex-row" : "flex flex-col"
//     )}>
      
//       {/* --- IMAGE AREA --- */}
//       <div className={clsx(
//         "relative overflow-hidden bg-gray-50/50",
//         isList ? "w-full sm:w-48 sm:min-w-[12rem] h-56 sm:h-auto shrink-0" : "w-full aspect-[4/5]"
//       )}>
//         {item.badge && (
//           <div className="absolute top-3 left-3 z-20">
//             <span className="bg-[#fe8204] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow-sm tracking-wider">
//               {item.badge}
//             </span>
//           </div>
//         )}

//         {/* Fix 1: Updated URL and added prefetch={false} for performance */}
//         <Link href={productUrl} prefetch={false} className="block w-full h-full relative">
//             <Image
//                 src={image}
//                 alt={item.name}
//                 fill
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                 className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
//             />
//             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
//         </Link>
//       </div>

//       {/* --- INFO AREA --- */}
//       <div className={clsx(
//         "flex flex-col flex-grow p-5 sm:p-6",
//         isList ? "justify-center" : ""
//       )}>
        
//         <span className="text-xs font-semibold text-[#fe8204] tracking-wider uppercase mb-1.5">
//           {item.style}
//         </span>
        
//         {/* Fix 2: Added prefetch={false} here as well */}
//         <Link href={productUrl} prefetch={false} className="block mb-1">
//             <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-[#fe8204] transition-colors line-clamp-2">
//               {isExploded ? item.variantName : item.name}
//             </h3>
//         </Link>
        
//         {isExploded && (
//           <p className="text-sm font-medium text-gray-500 mb-3 line-clamp-1">{item.name}</p>
//         )}

//         <div className="flex-grow" /> 

//         <div className={clsx(
//           "flex flex-col gap-4 mt-4 mb-5",
//           isList ? "sm:flex-row sm:items-center sm:justify-between" : ""
//         )}>
//           <p className="text-2xl font-extrabold text-gray-900">
//             ${Number(price).toFixed(2)}
//           </p>
          
//           {!isExploded && combinations.length > 0 && (
//             <div className="relative w-full sm:max-w-[140px]">
//               <select 
//                 className="w-full appearance-none bg-gray-50/80 text-sm font-semibold text-gray-700 py-2.5 pl-4 pr-10 border border-gray-200 rounded-xl outline-none cursor-pointer hover:bg-white hover:border-gray-300 focus:ring-2 focus:ring-[#fe8204]/20 focus:border-[#fe8204] transition-all"
//                 value={selectedCombo ? selectedCombo.id : ""}
//                 onChange={(e) => setSelectedCombo(combinations.find(c => c.id === e.target.value) || null)}
//               >
//                 <option value="" disabled>Size</option>
//                 {combinations.map(c => <option key={c.id} value={c.id}>{c.size}</option>)}
//               </select>
//               <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
//                 <ChevronDown className="w-4 h-4" />
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-2 gap-2.5">
//           {/* <button 
//             onClick={handleAddToCart}
//             disabled={!isExploded && combinations.length > 0 && !selectedCombo}
//             className={clsx(
//               "flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-sm font-bold transition-all duration-300",
//               (!isExploded && combinations.length > 0 && !selectedCombo)
//                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                 : "bg-[#fe8204] hover:bg-[#e07300] text-white shadow-md shadow-[#fe8204]/20 hover:shadow-[#fe8204]/40"
//             )}
//           >
//             {(!isExploded && !selectedCombo) ? 'Select Size' : 'Add to Cart'} 
//             {(!isExploded && !selectedCombo) ? null : <ShoppingBag className="w-4 h-4" />}
//           </button> */}
//           <button 
//             onClick={handleAddToCart}
//             disabled={(!isExploded && combinations.length > 0 && !selectedCombo) || isAdding}
//             className={clsx(
//               "flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-sm font-bold transition-all duration-300",
//               (!isExploded && combinations.length > 0 && !selectedCombo)
//                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                 : "bg-[#fe8204] hover:bg-[#e07300] text-white shadow-md shadow-[#fe8204]/20 hover:shadow-[#fe8204]/40 disabled:opacity-70"
//             )}
//           >
//             {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : (!isExploded && !selectedCombo) ? 'Select Size' : 'Add to Cart'} 
//             {(!isAdding && (isExploded || selectedCombo)) && <ShoppingBag className="w-4 h-4" />}
//           </button>
          
//           {/* Fix 3: Standardized URL to match folder structure and added prefetch={false} */}
//           <Link 
//             href={productUrl} 
//             prefetch={false}
//             className="flex items-center justify-center py-3 px-2 rounded-xl bg-transparent text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-[#fe8204] hover:border-[#fe8204]/30 font-semibold text-sm transition-all duration-300"
//             aria-label="View Product Details"
//           >
//             View Details
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useState, useEffect, useRef, useMemo, useCallback } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";
// import { motion, AnimatePresence, Variants } from "framer-motion";
// import { 
//   Search, 
//   User, 
//   ShoppingBag, 
//   Menu, 
//   X, 
//   ChevronDown, 
//   LogOut, 
//   Settings 
// } from "lucide-react";
// import { cn } from "@/src/lib/utils"; 
// // 1. IMPORT YOUR CART CONTEXT HERE
// import { useCart } from "@/src/context/CartContext";
// import { getCollectionNames } from "@/src/lib/shopify";
// // --- Data Structures ---
// const COLLECTION_DATA = {
//   "BODY PART": ["Ankle & Wrist", "Back, Torso & Chest Pieces", "Foot", "Hand", "Leg & Arm pieces", "Sleeve", "Spine"],
//   "STYLES": ["Animal", "Celestial art", "Colored Art", "Couple art", "Fantasy", "Floral", "Insects", "Japanese art", "Nature", "Spiritual", "Symbols and quotes", "Tribal art"],
//   "SIZES": ["Small", "Medium", "Large"],
// };

// const HOW_IT_WORKS_DATA = ["Help Center", "About us", "How it works", "Help & FAQ"];
// interface Combination {
//   id: string;
//   size: string;
//   price: string;
//   stock: number;
//   image: string;
// }

// export interface Product {
//   id: string;
//   handle: string;
//   name: string;
//   category: string;
//   price: string;
//   image: string;
//   badge: string | null;
//   style: string;
//   placements: string[];
//   productColor: string;
//   combinations: Combination[];
// }

// // Your Product Array
// export const tattooProducts: Product[] = [
//   { id: "prod_1", handle: "crying-heart-traditional", name: "Crying Heart", category: "Temporary Tattoos", price: "12.00", image: "/assets/images/Card1.png", badge: "Bestseller", style: "Traditional", placements: ["Forearm", "Calf", "Chest"], productColor: "#dc2626", combinations: [{ id: "var_1a", size: "Small (2x2)", price: "12.00", stock: 10, image: "/assets/images/Card1.png" }, { id: "var_1b", size: "Large (4x4)", price: "18.00", stock: 5, image: "/assets/images/Card1.png" }] },
//   { id: "prod_2", handle: "serpent-wrap", name: "Serpent Wrap", category: "Temporary Tattoos", price: "24.00", image: "/assets/images/Card2.png", badge: "New", style: "Blackwork", placements: ["Forearm", "Neck", "Leg"], productColor: "#171717", combinations: [{ id: "var_2a", size: "Medium (5x3)", price: "24.00", stock: 15, image: "/assets/images/Card2.png" }, { id: "var_2b", size: "Sleeve (10x6)", price: "45.00", stock: 2, image: "/assets/images/Card2.png" }] },
//   { id: "prod_3", handle: "botanical-flash-sheet", name: "Botanical Flash Sheet", category: "Flash Sheets", price: "30.00", image: "/assets/images/Card3.png", badge: "Digital Download", style: "Fine Line", placements: ["Any"], productColor: "#52525b", combinations: [{ id: "var_3a", size: "Standard (8.5x11)", price: "30.00", stock: 999, image: "/assets/images/Card3.png" }] },
//   { id: "prod_4", handle: "minimalist-rose", name: "Minimalist Rose", category: "Temporary Tattoos", price: "10.00", image: "/assets/images/Card7.png", badge: null, style: "Fine Line", placements: ["Wrist", "Ankle", "Behind Ear"], productColor: "#ef4444", combinations: [{ id: "var_4a", size: "Tiny (1x1)", price: "10.00", stock: 20, image: "/assets/images/Card7.png" }] },
//   { id: "prod_5", handle: "geometric-wolf", name: "Geometric Wolf", category: "Temporary Tattoos", price: "16.00", image: "/assets/images/Card4.png", badge: "Trending", style: "Geometric", placements: ["Forearm", "Thigh", "Shoulder"], productColor: "#3f3f46", combinations: [{ id: "var_5a", size: "Medium (4x4)", price: "16.00", stock: 12, image: "/assets/images/Card4.png" }] },
//   { id: "prod_6", handle: "mandala-lotus", name: "Mandala Lotus", category: "Temporary Tattoos", price: "22.00", image: "/assets/images/Card9.png", badge: "Limited", style: "Dotwork", placements: ["Sternum", "Back", "Thigh"], productColor: "#000000", combinations: [{ id: "var_6a", size: "Medium (5x5)", price: "22.00", stock: 8, image: "/assets/images/Card9.png" }] },
//   { id: "prod_7", handle: "skull-dagger", name: "Skull & Dagger", category: "Temporary Tattoos", price: "18.00", image: "/assets/images/Card2.png", badge: null, style: "Traditional", placements: ["Calf", "Forearm", "Bicep"], productColor: "#1c1917", combinations: [{ id: "var_7a", size: "Medium (4x6)", price: "18.00", stock: 14, image: "/assets/images/Card2.png" }] },
//   { id: "prod_8", handle: "koi-fish-flow", name: "Koi Fish Flow", category: "Temporary Tattoos", price: "26.00", image: "/assets/images/Card5.png", badge: "Bestseller", style: "Japanese", placements: ["Sleeve", "Calf", "Ribs"], productColor: "#ea580c", combinations: [{ id: "var_8a", size: "Large (6x8)", price: "26.00", stock: 6, image: "/assets/images/Card5.png" }] },
//   { id: "prod_9", handle: "vintage-swallow", name: "Vintage Swallow", category: "Temporary Tattoos", price: "14.00", image: "/assets/images/Card10.png", badge: "Classic", style: "Traditional", placements: ["Hand", "Chest", "Neck"], productColor: "#0284c7", combinations: [{ id: "var_9a", size: "Small (3x3)", price: "14.00", stock: 25, image: "/assets/images/Card10.png" }] },
//   { id: "prod_10", handle: "moon-phases", name: "Moon Phases", category: "Temporary Tattoos", price: "15.00", image: "/assets/images/Card1.png", badge: null, style: "Minimalist", placements: ["Spine", "Forearm", "Collarbone"], productColor: "#71717a", combinations: [{ id: "var_10a", size: "Strip (2x8)", price: "15.00", stock: 18, image: "/assets/images/Card1.png" }] },
//   { id: "prod_11", handle: "cyberpunk-glitch", name: "Cyberpunk Glitch", category: "Temporary Tattoos", price: "20.00", image: "/assets/images/Card8.png", badge: "Limited Edition", style: "Neo-Traditional", placements: ["Forearm", "Neck", "Calf"], productColor: "#ec4899", combinations: [{ id: "var_11a", size: "Medium (4x5)", price: "20.00", stock: 5, image: "/assets/images/Card8.png" }] },
//   { id: "prod_12", handle: "tiger-roar", name: "Tiger Roar", category: "Temporary Tattoos", price: "28.00", image: "/assets/images/Card6.png", badge: "Hot", style: "Realism", placements: ["Chest", "Thigh", "Upper Back"], productColor: "#b45309", combinations: [{ id: "var_12a", size: "Large (6x6)", price: "28.00", stock: 7, image: "/assets/images/Card6.png" }] },
//   { id: "prod_13", handle: "dragon-coil", name: "Dragon Coil", category: "Temporary Tattoos", price: "35.00", image: "/assets/images/Card3.png", badge: "Staff Pick", style: "Japanese", placements: ["Full Arm", "Leg Wrap", "Back"], productColor: "#0f172a", combinations: [{ id: "var_13a", size: "Extra Large (8x14)", price: "35.00", stock: 4, image: "/assets/images/Card3.png" }] },
//   { id: "prod_14", handle: "tarot-the-moon", name: "Tarot Card: The Moon", category: "Temporary Tattoos", price: "16.00", image: "/assets/images/Card5.png", badge: null, style: "Blackwork", placements: ["Forearm", "Calf", "Bicep"], productColor: "#27272a", combinations: [{ id: "var_14a", size: "Medium (3x5)", price: "16.00", stock: 22, image: "/assets/images/Card5.png" }] },
//   { id: "prod_15", handle: "sacred-heart", name: "Sacred Heart", category: "Temporary Tattoos", price: "18.00", image: "/assets/images/Card7.png", badge: "Popular", style: "Traditional", placements: ["Chest", "Sternum", "Hand"], productColor: "#be123c", combinations: [{ id: "var_15a", size: "Medium (4x4)", price: "18.00", stock: 11, image: "/assets/images/Card7.png" }] },
//   { id: "prod_16", handle: "barbed-wire-armband", name: "Barbed Wire Armband", category: "Temporary Tattoos", price: "14.00", image: "/assets/images/Card9.png", badge: null, style: "Tribal", placements: ["Bicep", "Wrist", "Ankle"], productColor: "#404040", combinations: [{ id: "var_16a", size: "Wrap (2x10)", price: "14.00", stock: 30, image: "/assets/images/Card9.png" }] },
//   { id: "prod_17", handle: "butterfly-swarm", name: "Butterfly Swarm", category: "Temporary Tattoos", price: "20.00", image: "/assets/images/Card2.png", badge: "Popular", style: "Fine Line", placements: ["Shoulder", "Ribs", "Thigh"], productColor: "#3b82f6", combinations: [{ id: "var_17a", size: "Large (5x7)", price: "20.00", stock: 16, image: "/assets/images/Card2.png" }] },
//   { id: "prod_18", handle: "watercolor-fox", name: "Watercolor Fox", category: "Temporary Tattoos", price: "24.00", image: "/assets/images/Card10.png", badge: "Artistic", style: "Watercolor", placements: ["Calf", "Forearm", "Shoulder Blade"], productColor: "#f97316", combinations: [{ id: "var_18a", size: "Medium (4x6)", price: "24.00", stock: 9, image: "/assets/images/Card10.png" }] },
//   { id: "prod_19", handle: "gothic-lettering-pack", name: "Gothic Lettering Pack", category: "Flash Sheets", price: "25.00", image: "/assets/images/Card4.png", badge: "Digital Download", style: "Lettering", placements: ["Any"], productColor: "#18181b", combinations: [{ id: "var_19a", size: "Standard (8.5x11)", price: "25.00", stock: 999, image: "/assets/images/Card4.png" }] },
//   { id: "prod_20", handle: "abstract-line-art", name: "Abstract Line Art", category: "Temporary Tattoos", price: "18.00", image: "/assets/images/Card8.png", badge: "New", style: "Abstract", placements: ["Forearm", "Ribs", "Ankle"], productColor: "#52525b", combinations: [{ id: "var_20a", size: "Medium (4x5)", price: "18.00", stock: 13, image: "/assets/images/Card8.png" }] }
// ];

// export default function Header() {
//   const pathname = usePathname();
//   const router = useRouter();
//   // 2. CONSUME CART STATE
//   const { cartCount, setCartOpen } = useCart();
  
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [hoveredNav, setHoveredNav] = useState<string | null>(null);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
//   const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [collectionData, setCollectionData] = useState([]);
//   const [isLoading,setIsLoading]=useState(false);
//   const fetchPageData = useCallback(async (cursor?: string | null, isGoingBack = false) => {
//       setIsLoading(true);
//       try {
//         setIsLoading(true);
//         const result = await getCollectionNames();
//         setCollectionData(result);
//         console.log("this is the collection names of the data");
//         console.log(result);
//       } catch (error) {
//         console.error("Failed to fetch collection Names", error);
//       } finally {
//         setIsLoading(false);
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//       }
//   },[]);
//   const searchResults = useMemo(() => {
//     if (!searchQuery.trim()) return [];
    
//     // Split the query into individual words to allow out-of-order matching
//     const searchTerms = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
    
//     return tattooProducts.filter((product) => {
//       // Create a master string of all searchable text for this product
//       const searchableText = [
//         product.name,
//         product.style,
//         product.category,
//         product.badge,
//         ...(product.placements || [])
//       ].filter(Boolean).join(" ").toLowerCase();

//       // Ensure EVERY typed term is found somewhere in the product metadata
//       return searchTerms.every(term => searchableText.includes(term));
//     }).slice(0, 6); // Limit to top 6 results to not overwhelm the UI
//   }, [searchQuery]);

//   const closeSearch = () => {
//     setIsSearchOpen(false);
//     setSearchQuery(""); // Clear input when closed
//   };
//   // Mock Auth State (Replace with your actual auth hook)
//   const [isLoggedIn, setIsLoggedIn] = useState(false); 
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

//   // --- Timeout ref to prevent jittery menu closing ---
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const handleMouseEnter = (navItem: string) => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     setHoveredNav(navItem);
//     setActiveDropdown(navItem);
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setHoveredNav(null);
//       setActiveDropdown(null);
//       setIsProfileMenuOpen(false);
//     }, 150); 
//   };

//   // --- Scroll & Body Lock ---
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (isMobileDrawerOpen) document.body.style.overflow = "hidden";
//     else document.body.style.overflow = "";
//     return () => { document.body.style.overflow = ""; }; 
//   }, [isMobileDrawerOpen]);

//   const isActive = (path: string) => pathname?.includes(path);

//   // --- Animation Variants ---
//   const dropdownVariants: Variants = {
//     hidden: { opacity: 0, y: 10, scale: 0.98, filter: "blur(4px)" },
//     visible: { 
//       opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
//       transition: { type: "spring", stiffness: 400, damping: 30, mass: 0.8 }
//     },
//     exit: { 
//       opacity: 0, y: 5, scale: 0.98, filter: "blur(4px)",
//       transition: { duration: 0.15, ease: "easeOut" }
//     }
//   };

//   const drawerVariants: Variants = {
//     hidden: { x: "-100%" },
//     visible: { 
//       x: 0,
//       transition: { type: "spring", stiffness: 300, damping: 35 }
//     },
//     exit: { 
//       x: "-100%",
//       transition: { type: "spring", stiffness: 300, damping: 35 }
//     }
//   };

//   return (
//     <>
//       <header
//         className={cn(
//           "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out",
//           isScrolled || isSearchOpen
//             ? "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border-b border-gray-200" 
//             : "bg-white border-b border-transparent",
//           isScrolled ? "h-16 md:h-20" : "h-20 md:h-24"
//         )}
//       >
//         <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full relative">
          
//           {/* ========================================== */}
//           {/* DESKTOP VIEW                               */}
//           {/* ========================================== */}
//           <div className="hidden md:flex items-center w-full h-full">
            
//             {/* LEFT: Logo */}
//             <div className="flex-1 flex items-center justify-start">
//               <Link 
//                 href="/" 
//                 className="relative z-50 flex-shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] rounded-sm transition-transform hover:scale-[1.02]"
//               >
//                 <Image
//                   src="/assets/icons/Fotterlogo2.svg"
//                   alt="Just Tattoos"
//                   width={140}
//                   height={48}
//                   className={cn("transition-all duration-300 w-90px", isScrolled ? "h-8" : "h-10")}
//                   priority
//                 />
//               </Link>
//             </div>

//             {/* CENTER: Desktop Navigation (Kept original logic) */}
//             <nav className="flex h-full items-center justify-center gap-2" onMouseLeave={handleMouseLeave}>
//               {/* ... (Your existing Desktop Navigation logic remains exactly the same) ... */}
//               <div className="relative h-full flex items-center px-4 cursor-pointer" onMouseEnter={() => handleMouseEnter("new-arrivals")}>
//                 {hoveredNav === "new-arrivals" && (
//                   <motion.div layoutId="nav-pill" className="absolute inset-y-5 inset-x-0 bg-gray-100/80 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
//                 )}
//                 <Link href="/new-arrivals" className={cn(
//                   "relative z-10  font-bold text-[14px] tracking-wider transition-colors duration-300",
//                   isActive("/new-arrivals") ? "text-[var(--color-brand-orange)]" : "text-gray-900"
//                 )}>
//                   NEW ARRIVAL
//                 </Link>
//               </div>

//               {/* Nav Item: Collection */}
//               <div className="relative h-full flex items-center px-4 cursor-pointer" onMouseEnter={() => handleMouseEnter("collection")}>
//                 {hoveredNav === "collection" && (
//                   <motion.div layoutId="nav-pill" className="absolute inset-y-5 inset-x-0 bg-gray-100/80 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
//                 )}
//                 <Link 
//                   href="/collections"
//                   onClick={() => setActiveDropdown(null)}
//                   className={cn(
//                     "relative z-10  font-bold text-[14px] tracking-wider transition-colors flex items-center gap-1.5",
//                     activeDropdown === "collection" || isActive("/shopall") || isActive("/collection") ? "text-[var(--color-brand-orange)]" : "text-gray-900"
//                   )}
//                 >
//                   COLLECTION
//                   <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", activeDropdown === "collection" && "rotate-180")} />
//                 </Link>

//                 <AnimatePresence>
//                   {activeDropdown === "collection" && (
//                     <motion.div
//                       variants={dropdownVariants}
//                       initial="hidden"
//                       animate="visible"
//                       exit="exit"
//                       className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-[90vw] max-w-[1100px] bg-white rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50 origin-top cursor-default flex"
//                     >
//                       <div className="flex-1 p-10 grid grid-cols-3 gap-8">
//                         {Object.entries(COLLECTION_DATA).map(([category, items]) => (
//                           <div key={category} className="flex flex-col gap-6">
//                             <h3 className=" text-[var(--color-brand-orange)] text-[13px] font-bold tracking-widest uppercase">{category}</h3>
//                             <ul className="flex flex-col gap-3.5">
//                               {items.map((item) => (
//                                 <li key={item}>
//                                   <Link
//                                     href={`/collections/${item.toLowerCase().replace(/ & /g, "-").replace(/, /g, "-").replace(/ /g, "-")}`}
//                                     className=" text-[14px] font-medium text-gray-600 hover:text-gray-900 hover:translate-x-1.5 transition-all duration-300 inline-block"
//                                     onClick={() => setActiveDropdown(null)}
//                                   >
//                                     {item}
//                                   </Link>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         ))}
//                       </div>

//                       <div className="w-[35%] bg-gray-50 flex items-center justify-center relative p-8">
//                         <div className="relative w-full max-w-[220px] aspect-[3/4]">
//                           <div className="absolute inset-0 bg-white border border-gray-200 rounded-xl shadow-lg rotate-6 translate-x-6 origin-bottom-right"></div>
//                           <div className="absolute inset-0 bg-white border border-gray-200 rounded-xl shadow-lg -rotate-3 -translate-x-3 origin-bottom-left"></div>
//                           <div className="absolute inset-0 bg-gray-900 rounded-xl shadow-xl flex items-center justify-center border-4 border-white overflow-hidden z-10">
//                             <div className="relative w-full h-full bg-[var(--color-brand-orange)]/20">
//                               <Image 
//                                 src="/assets/images/Card1.png"
//                                 alt="Featured Tattoo Art" 
//                                 fill
//                                 priority
//                                 sizes="(max-width: 768px) 220px, 25vw"
//                                 className="object-cover"
//                               />
//                             </div> 
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* Nav Item: Sale */}
//               <div className="relative h-full flex items-center px-4 cursor-pointer" onMouseEnter={() => handleMouseEnter("sale")}>
//                 {hoveredNav === "sale" && (
//                   <motion.div layoutId="nav-pill" className="absolute inset-y-5 inset-x-0 bg-gray-100/80 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
//                 )}
//                 <Link href="/sale" className={cn(
//                   "relative z-10  font-bold text-[14px] tracking-wider transition-colors duration-300",
//                   isActive("/sale") ? "text-red-600" : "text-red-500 hover:text-red-600"
//                 )}>
//                   SALE
//                 </Link>
//               </div>

//               {/* Nav Item: How It Works */}
//               <div className="relative h-full flex items-center px-4 cursor-pointer" onMouseEnter={() => handleMouseEnter("how-it-works")}>
//                 {hoveredNav === "how-it-works" && (
//                   <motion.div layoutId="nav-pill" className="absolute inset-y-5 inset-x-0 bg-gray-100/80 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
//                 )}
//                 <span className={cn(
//                   "relative z-10  font-bold text-[14px] tracking-wider transition-colors flex items-center gap-1.5",
//                   activeDropdown === "how-it-works" || isActive("/how-it-works") ? "text-[var(--color-brand-orange)]" : "text-gray-900"
//                 )}>
//                   HOW IT WORKS
//                   <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", activeDropdown === "how-it-works" && "rotate-180")} />
//                 </span>

//                 <AnimatePresence>
//                   {activeDropdown === "how-it-works" && (
//                     <motion.div
//                       variants={dropdownVariants}
//                       initial="hidden"
//                       animate="visible"
//                       exit="exit"
//                       className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-[500px] bg-white rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-6 z-50 origin-top"
//                     >
//                       <div className="grid grid-cols-2 gap-3 w-full">
//                         {HOW_IT_WORKS_DATA.map((item) => (
//                           <Link
//                             key={item}
//                             href={`/${item.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
//                             className=" text-[14px] font-bold text-gray-700 hover:text-[var(--color-brand-orange)] hover:bg-orange-50/50 p-4 rounded-xl transition-all duration-300 flex items-center justify-between group"
//                             onClick={() => setActiveDropdown(null)}
//                           >
//                             {item}
//                             <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-[var(--color-brand-orange)] transition-all">→</span>
//                           </Link>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </nav>

//             {/* RIGHT: Utility Icons & Auth */}
//             <div className="flex-1 flex items-center justify-end gap-3 lg:gap-5">
//               <button 
//                 aria-label="Search" 
//                 onClick={() => setIsSearchOpen(!isSearchOpen)}
//                 className="text-gray-900 hover:text-[var(--color-brand-orange)] p-2 rounded-full hover:bg-gray-50 transition-all outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]"
//               >
//                 {isSearchOpen ? <X className="w-5 h-5" strokeWidth={1.8} /> : <Search className="w-5 h-5" strokeWidth={1.8} />}
//               </button>
              
//               {/* 3. DESKTOP CART BUTTON WITH DYNAMIC COUNT */}
//               <button 
//                 aria-label="Cart" 
//                 onClick={() => setCartOpen(true)}
//                 className="text-gray-900 hover:text-[var(--color-brand-orange)] p-2 rounded-full hover:bg-gray-50 transition-all relative group outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]"
//               >
//                 <ShoppingBag className="w-5 h-5" strokeWidth={1.8} />
//                 {cartCount > 0 && (
//                   <span className="absolute top-0 right-0 bg-[var(--color-brand-orange)] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full  shadow-sm transform group-hover:scale-110 transition-transform">
//                     {cartCount}
//                   </span>
//                 )}
//               </button>

//               {/* Auth Branching */}
//               <div className="pl-3 lg:pl-5 border-l border-gray-200 flex items-center gap-3 lg:gap-4 h-8">
//                 {!isLoggedIn ? (
//                   <>
//                     <Link href="/login" className=" font-semibold text-[14px] text-gray-700 hover:text-[var(--color-brand-orange)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-brand-orange)] rounded-sm whitespace-nowrap">
//                       Log in
//                     </Link>
//                     <Link href="/register" className=" font-bold text-[13px] bg-gray-900 text-white px-5 lg:px-6 py-2.5 rounded-full hover:bg-[var(--color-brand-orange)] hover:shadow-md transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-brand-orange)] whitespace-nowrap">
//                       Sign up
//                     </Link>
//                   </>
//                 ) : (
//                   <div className="relative" onMouseLeave={() => setIsProfileMenuOpen(false)}>
//                     <button 
//                       onMouseEnter={() => setIsProfileMenuOpen(true)}
//                       className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-brand-orange)] rounded-full transition-transform hover:scale-105"
//                     >
//                       <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-400 to-[var(--color-brand-orange)] p-[2px] shadow-sm">
//                         <div className="w-full h-full bg-white rounded-full border border-white flex items-center justify-center overflow-hidden">
//                           <User className="w-5 h-5 text-gray-600" />
//                         </div>
//                       </div>
//                     </button>

//                     <AnimatePresence>
//                       {isProfileMenuOpen && (
//                         <motion.div
//                           variants={dropdownVariants}
//                           initial="hidden"
//                           animate="visible"
//                           exit="exit"
//                           className="absolute top-[calc(100%+8px)] right-0 w-52 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-50 origin-top-right"
//                         >
//                           <Link href="/account" className="flex items-center gap-3 px-5 py-3 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[var(--color-brand-orange)]  transition-colors">
//                             <Settings className="w-4 h-4" /> Account Settings
//                           </Link>
//                           <Link href="/orders" className="flex items-center gap-3 px-5 py-3 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[var(--color-brand-orange)]  transition-colors">
//                             <ShoppingBag className="w-4 h-4" /> My Orders
//                           </Link>
//                           <div className="h-px bg-gray-100 my-1"></div>
//                           <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center gap-3 px-5 py-3 text-[14px] text-red-600 hover:bg-red-50  transition-colors">
//                             <LogOut className="w-4 h-4" /> Sign Out
//                           </button>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* ========================================== */}
//           {/* MOBILE VIEW                                */}
//           {/* ========================================== */}
//           <div className="flex md:hidden items-center justify-between w-full h-full">
            
//             {/* Left: Hamburger Menu */}
//             <div className="flex-1 flex justify-start">
//               <button 
//                 aria-label="Open Menu"
//                 onClick={() => setIsMobileDrawerOpen(true)}
//                 className="text-gray-900 p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] outline-none"
//               >
//                 <Menu className="w-6 h-6" strokeWidth={1.5} />
//               </button>
//             </div>

//             {/* Center: Logo */}
//             <div className="flex-1 flex justify-center">
//               <Link href="/" className="outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] rounded-sm">
//                 <Image
//                   src="/assets/icons/Fotterlogo2.svg"
//                   alt="Just Tattoos"
//                   width={110}
//                   height={32}
//                   className="w-auto h-7 object-contain"
//                   priority
//                 />
//               </Link>
//             </div>

//             {/* Right: Search & Cart Icons */}
//             <div className="flex-1 flex justify-end items-center gap-2 sm:gap-4">
//               <button 
//                 aria-label="Search" 
//                 onClick={() => setIsSearchOpen(!isSearchOpen)}
//                 className="text-gray-900 p-2 hover:bg-gray-100 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]"
//               >
//                 {isSearchOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Search className="w-5 h-5" strokeWidth={1.5} />}
//               </button>

//               {/* 4. MOBILE CART BUTTON WITH DYNAMIC COUNT */}
//               <button 
//                 aria-label="Cart" 
//                 onClick={() => setCartOpen(true)}
//                 className="text-gray-900 p-2 hover:bg-gray-100 rounded-full transition-colors relative group outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]"
//               >
//                 <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
//                 {cartCount > 0 && (
//                   <span className="absolute top-1 right-1 bg-[var(--color-brand-orange)] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
//                     {cartCount}
//                   </span>
//                 )}
//               </button>
//             </div>

//           </div>
//         </div>

//         {/* ========================================== */}
//         {/* SLIDE-DOWN SEARCH BAR                      */}
//         {/* ========================================== */}
//         {/* ... (Kept exactly the same) ... */}
//         {/* <AnimatePresence>
//           {isSearchOpen && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-md overflow-hidden z-40"
//             >
//               <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
//                 <div className="relative flex items-center w-full">
//                   <Search className="absolute left-5 w-5 h-5 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search tattoos, styles, or collections..."
//                     className="w-full pl-14 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-orange)] focus:border-transparent  text-gray-700 shadow-sm transition-all"
//                     autoFocus
//                   />
//                   <button
//                     onClick={() => setIsSearchOpen(false)}
//                     className="absolute right-3 p-1.5 text-gray-400 hover:text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence> */}
//         <AnimatePresence>
//         {isSearchOpen && (
//           <>
//             {/* ADDED: Backdrop to close search if user clicks outside */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={closeSearch}
//               className="fixed inset-0 bg-black/20 z-30"
//             />

//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-md overflow-visible z-40"
//             >
//               <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative">
//                 <div className="relative flex items-center w-full">
//                   <Search className="absolute left-5 w-5 h-5 text-[var(--color-brand-orange)]" />
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search tattoos, styles, placements, or categories..."
//                     className="w-full pl-14 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-orange)] focus:bg-white  text-gray-900 shadow-sm transition-all text-sm md:text-base"
//                     autoFocus
//                   />
//                   <button
//                     onClick={closeSearch}
//                     className="absolute right-3 p-1.5 text-gray-400 hover:text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>

//                 {/* ADDED: Interactive Search Results Dropdown */}
//                 <AnimatePresence>
//                   {searchQuery.trim().length > 0 && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="absolute top-full left-0 right-0 mt-2 mx-4 sm:mx-6 lg:mx-8 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50"
//                     >
//                       {searchResults.length > 0 ? (
//                         <div className="flex flex-col max-h-[60vh] overflow-y-auto custom-scrollbar">
//                           {/* Section Header */}
//                           <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
//                             <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
//                               Products ({searchResults.length})
//                             </span>
//                           </div>

//                           {/* Matching Items */}
//                           {searchResults.map((product) => (
//                             <Link 
//                               key={product.id}
//                               href={`/collections/${product.handle}`} 
//                               onClick={closeSearch}
//                               className="flex items-center gap-4 p-4 hover:bg-orange-50/50 transition-colors border-b border-gray-50 last:border-0 group"
//                             >
//                               <div className="w-14 h-14 relative bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-200 group-hover:border-[var(--color-brand-orange)]/30 transition-colors">
//                                 <Image src={product.image} alt={product.name} fill sizes="56px" className="object-cover" />
//                               </div>
//                               <div className="flex-1 flex flex-col">
//                                 <h4 className="text-sm font-bold text-gray-900 group-hover:text-[var(--color-brand-orange)] transition-colors">
//                                   {product.name}
//                                 </h4>
//                                 <div className="flex items-center gap-2 mt-0.5">
//                                   <span className="text-xs font-semibold text-gray-500">{product.style}</span>
//                                   <span className="w-1 h-1 rounded-full bg-gray-300"></span>
//                                   <span className="text-xs text-gray-400">{product.category}</span>
//                                 </div>
//                               </div>
//                               <div className="text-sm font-black text-gray-900">
//                                 ${product.price}
//                               </div>
//                             </Link>
//                           ))}
//                         </div>
//                       ) : (
//                         /* Empty State Fallback */
//                         <div className="p-10 flex flex-col items-center justify-center text-center">
//                           <Search className="w-10 h-10 text-gray-200 mb-3" />
//                           <p className="text-gray-900 font-bold">No results found for "{searchQuery}"</p>
//                           <p className="text-sm text-gray-500 mt-2">Try searching for styles like <span className="font-semibold text-gray-700">Traditional</span>, <span className="font-semibold text-gray-700">Fine Line</span>, or <span className="font-semibold text-gray-700">Blackwork</span>.</p>
//                         </div>
//                       )}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//       </header>

//       {/* ========================================== */}
//       {/* MOBILE SLIDE-OUT DRAWER                    */}
//       {/* ========================================== */}
//       {/* ... (Kept exactly the same) ... */}
//       <AnimatePresence>
//         {isMobileDrawerOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsMobileDrawerOpen(false)}
//               className="md:hidden fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity"
//             />
            
//             <motion.div
//               variants={drawerVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="md:hidden fixed top-0 left-0 w-[85vw] max-w-[360px] h-[100dvh] bg-white shadow-2xl z-[70] flex flex-col"
//             >
//               <div className="p-5 flex justify-between items-center border-b border-gray-100 bg-gray-50/80">
//                 <Image src="/assets/icons/DesktopLogo.svg" alt="Just Tattoos" width={100} height={28} className="w-auto h-6" />
//                 <button 
//                   onClick={() => setIsMobileDrawerOpen(false)} 
//                   className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:bg-[var(--color-brand-orange)] hover:text-white hover:border-transparent transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>

//               <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-8">
                
//                 {!isLoggedIn ? (
//                   <div className="flex flex-col gap-3 pb-8 border-b border-gray-100">
//                     <Link href="/login" onClick={() => setIsMobileDrawerOpen(false)} className="w-full py-3.5 text-center rounded-xl border-2 border-gray-100  font-bold text-[14px] hover:border-[var(--color-brand-orange)] hover:text-[var(--color-brand-orange)] transition-colors">
//                       Log in
//                     </Link>
//                     <Link href="/register" onClick={() => setIsMobileDrawerOpen(false)} className="w-full py-3.5 text-center rounded-xl bg-gray-900 text-white  font-bold text-[14px] hover:bg-[var(--color-brand-orange)] shadow-md transition-all">
//                       Create Account
//                     </Link>
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-4 pb-8 border-b border-gray-100">
//                     <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center">
//                       <User className="w-6 h-6 text-[var(--color-brand-orange)]" />
//                     </div>
//                     <div className="flex-1">
//                       <p className=" font-bold text-[15px] text-gray-900">My Account</p>
//                       <button onClick={() => setIsLoggedIn(false)} className="text-[13px] text-gray-500 hover:text-red-500 font-medium mt-0.5 transition-colors">Sign out</button>
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex flex-col gap-6">
//                   <Link href="/new-arrivals" className=" text-[16px] font-bold text-gray-900 flex items-center justify-between group" onClick={() => setIsMobileDrawerOpen(false)}>
//                     NEW ARRIVAL <span className="text-gray-300 group-hover:text-[var(--color-brand-orange)] group-hover:translate-x-1 transition-all">→</span>
//                   </Link>

//                   <div className="flex flex-col gap-4">
//                     <div className="flex justify-between items-center w-full">
//                       <a 
//                         href="/collections" 
//                         className=" text-[16px] font-bold text-gray-900 hover:text-[var(--color-brand-orange)] transition-colors text-left flex-grow"
//                       >
//                         COLLECTION
//                       </a>
//                       <button 
//                         className="p-2 -mr-2 flex items-center justify-center"
//                         onClick={() => setMobileExpanded(mobileExpanded === "collection" ? null : "collection")}
//                         aria-label="Toggle collection menu"
//                       >
//                         <ChevronDown 
//                           className={cn(
//                             "w-5 h-5 transition-transform duration-300 text-gray-400", 
//                             mobileExpanded === "collection" && "rotate-180 text-[var(--color-brand-orange)]"
//                           )} 
//                         />
//                       </button>
//                     </div>
                    
//                     <AnimatePresence>
//                       {mobileExpanded === "collection" && (
//                         <motion.div 
//                           initial={{ height: 0, opacity: 0 }}
//                           animate={{ height: "auto", opacity: 1 }}
//                           exit={{ height: 0, opacity: 0 }}
//                           className="overflow-hidden flex flex-col gap-6 pl-4 border-l-2 border-[var(--color-brand-orange)]/20 ml-1"
//                         >
//                           {Object.entries(COLLECTION_DATA).map(([category, items]) => (
//                               <div key={category} className="flex flex-col gap-3 py-1 mt-2">
//                                 <h4 className=" text-[var(--color-brand-orange)] text-[13px] font-bold tracking-wider">{category}</h4>
//                                 {items.map(item => (
//                                   <Link 
//                                     key={item} 
//                                     href={`/collections/${item.toLowerCase().replace(/ & /g, "-").replace(/, /g, "-").replace(/ /g, "-")}`}
//                                     className=" text-gray-600 text-[14px] font-medium hover:text-[var(--color-brand-orange)] transition-colors py-1"
//                                     onClick={() => setIsMobileDrawerOpen(false)}
//                                   >
//                                     {item}
//                                   </Link>
//                                 ))}
//                               </div>
//                           ))}
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>

//                   <Link href="/sale" className=" text-[16px] font-bold text-red-500 flex items-center justify-between group" onClick={() => setIsMobileDrawerOpen(false)}>
//                     SALE <span className="text-red-200 group-hover:text-red-500 group-hover:translate-x-1 transition-all">→</span>
//                   </Link>
//                 </div>

//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// 'use server';

// import { getProductsQuery } from './queries';
// import { getCollectionNamesQuery } from './queries';

// type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

// export async function shopifyFetch<T>({
//   cache = 'force-cache',
//   headers,
//   query,
//   tags,
//   variables
// }: {
//   cache?: RequestCache;
//   headers?: HeadersInit;
//   query: string;
//   tags?: string[];
//   variables?: ExtractVariables<T>;
// }): Promise<{ status: number; body: T } | never> {
  
//   const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
//   const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
//   const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION || '2024-01';

//   const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

//   if (!domain || !storefrontAccessToken) {
//     throw new Error(`Missing Shopify environment variables. Domain: ${domain || 'Missing'}, Token: ${storefrontAccessToken ? 'Exists' : 'Missing'}`);
//   }

//   try {
//     const result = await fetch(endpoint, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
//         ...headers
//       },
//       body: JSON.stringify({
//         ...(query && { query }),
//         ...(variables && { variables })
//       }),
//       cache,
//       ...(tags && { next: { tags } })
//     });

//     const body = await result.json();

//     if (body.errors) {
//       console.error('Shopify GraphQL Errors:', body.errors);
//       throw body.errors[0];
//     }

//     return {
//       status: result.status,
//       body
//     };
//   } catch (e) {
//     console.error('Shopify Fetch Error:', e);
//     throw {
//       error: e,
//       query
//     };
//   }
// }

// export async function getProducts({
//   query,
//   first = 12,
//   after,
//   reverse,
//   sortKey
// }: {
//   query?: string;
//   first?: number;
//   after?: string;
//   reverse?: boolean;
//   sortKey?: string;
// } = {}) {
//   const res = await shopifyFetch<any>({
//     query: getProductsQuery,
//     tags: ['products'], 
//     variables: {
//       first,
//       after,
//       reverse: reverse || false,
//       sortKey: sortKey || 'CREATED_AT',
//       ...(query && { query })
//     }
//   });

//   const productsData = res.body?.data?.products;

//   if (!productsData?.edges) {
//     return { products: [], pageInfo: { hasNextPage: false, endCursor: null }, formattedData: [] };
//   }

//   // Map Shopify data to the App's required format efficiently
//   const mappedProducts = productsData.edges.map(({ node }: any) => {
//     // Dynamically extract custom fields from tags
//     const tags = node.tags || [];
//     const styleTag = tags.find((t: string) => t.startsWith('Style:'))?.replace('Style:', '').trim() || 'Standard';
//     const placementTags = tags.filter((t: string) => t.startsWith('Placement:')).map((t: string) => t.replace('Placement:', '').trim());
//     const badgeTag = tags.find((t: string) => t.startsWith('Badge:'))?.replace('Badge:', '').trim();
    
//     return {
//       id: node.id,
//       handle: node.handle,
//       name: node.title,
//       category: node.productType || 'Uncategorized',
//       style: styleTag,
//       placements: placementTags,
//       price: node.priceRange?.minVariantPrice?.amount || "0.00", // Safe optional chaining
//       image: node.featuredImage?.url || '/placeholder.png',
//       badge: badgeTag || null,
//       productColor: "#171717", // Default or extract from metafields
//       combinations: node.variants?.edges?.map(({ node: variant }: any) => ({
//         id: variant.id,
//         price: variant.price?.amount || "0.00",
//         image: variant.image?.url || node.featuredImage?.url || null,
//         size: variant.selectedOptions?.find((o: any) => o.name === 'Size' || o.name === 'Title')?.value || 'Default',
//         stock: variant.availableForSale ? 100 : 0
//       })) || []
//     };
//   });

//   return {
//     products: mappedProducts, // Legacy/Alternative mapping
//     pageInfo: productsData.pageInfo,
//     formattedData: mapShopifyProductsForProduction(productsData) // New robust mapping
//   };
// }


// export async function getCollectionNames() {
//   const res = await shopifyFetch<any>({
//     query: getCollectionNamesQuery,
//     tags: ['collections'],
//     variables: {
//       first: 250 
//     }
//   });

//   if (!res.body?.data?.collections?.edges) {
//     return [];
//   }

//   // Returns an array of objects: { title: "Temporary Tattoos", handle: "temporary-tattoos" }
//   return res.body.data.collections.edges.map(({ node }: any) => ({
//     title: node.title,
//     handle: node.handle
//   }));
// }

// // --- 1. CONFIGURATION & CONSTANTS ---
// const TATTOO_CATEGORIES = {
//   placements: ["Hand", "Foot", "Ankle & Wrist", "Back, Torso & Chest Pieces", "Leg and Arm Pieces", "Finger", "Sleeve", "Spine", "Body Part"],
//   themes: ["Animal", "Fantasy", "Nature", "Spiritual", "Symbols and Quotes", "Connection/Couple Art", "Floral", "Insects", "Celestial Art", "Japanese Art", "Tribal Art", "Dog", "Cat", "Eagle", "Fish"],
//   sizes: ["Small", "Medium", "Large"]
// };

// // Fallback background colors for product cards if you want dynamic UI
// const UI_COLORS = ['#F9F9F9', '#F4F1EA', '#EFEFEF', '#FAFAFA'];

// // --- 2. UTILITY FUNCTIONS ---
// // Fixed Typescript typing here
// const calculateDiscount = (price: number, compareAtPrice: number | null): number | null => {
//   if (!compareAtPrice || compareAtPrice <= price) return null;
//   const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
//   return Math.round(discount); // e.g., returns 20 for "20% OFF"
// };

// // --- 3. MAIN MAPPING FUNCTION ---
// export async function mapShopifyProductsForProduction(shopifyJson: any) {
//   if (!shopifyJson?.edges) return [];

//   return shopifyJson.edges.map(({ node }: any) => {
//     // -- A. SAFE EXTRACTIONS --
//     const collections = node.collections?.edges?.map((c: any) => c.node.title) || [];
//     const rawTags = node.tags || [];
    
//     // -- B. MEDIA SEPARATION (Images vs Videos) --
//     const allMedia = node.media?.edges?.map((m: any) => m.node) || [];
//     const images: any[] = [];
//     const videos: any[] = [];
    
//     // Fallback if querying standard 'images' instead of 'media'
//     const legacyImages = node.images?.edges?.map((img: any) => img.node) || [];
    
//     const mediaToProcess = allMedia.length > 0 ? allMedia : legacyImages;
//     mediaToProcess.forEach((mediaItem: any) => {
//       if (mediaItem.mediaContentType === 'VIDEO' || mediaItem.sources) {
//         videos.push({
//           url: mediaItem.sources?.[0]?.url,
//           previewImage: mediaItem.previewImage?.url || null,
//         });
//       } else {
//         images.push({
//           url: mediaItem.url || mediaItem.image?.url,
//           altText: mediaItem.altText || node.title,
//           width: mediaItem.width || mediaItem.image?.width,
//           height: mediaItem.height || mediaItem.image?.height
//         });
//       }
//     });

//     // -- C. VARIANTS & CHECKOUT DATA --
//     const variants = node.variants?.edges?.map((v: any) => ({
//       variantId: v.node.id, // REQUIRED FOR CHECKOUT
//       title: v.node.title,
//       price: parseFloat(v.node.price?.amount || "0"),
//       compareAtPrice: v.node.compareAtPrice ? parseFloat(v.node.compareAtPrice.amount) : null,
//       currency: v.node.price?.currencyCode || "USD",
//       sku: v.node.sku || null,
//       availableForSale: v.node.availableForSale || false,
//       quantityAvailable: v.node.quantityAvailable ?? null,
//       selectedOptions: v.node.selectedOptions || []
//     })) || [];

//     const defaultVariant = variants[0] || {};
//     // Fixed safe math check for isOnSale to prevent NaN issues
//     const isOnSale = defaultVariant.compareAtPrice && defaultVariant.price 
//       ? defaultVariant.compareAtPrice > defaultVariant.price 
//       : false;

//     // -- D. TATTOO SPECIFIC LOGIC --
//     const isColored = collections.includes('Colored Art') || rawTags.includes('Color');

//     return {
//       // 1. Core Identifiers & Routing
//       id: node.id,
//       handle: node.handle,        
//       slug: node.handle,          
//       title: node.title,
//       vendor: node.vendor || "Unknown Artist",
//       description: node.description,
//       descriptionHtml: node.descriptionHtml,

//       // 2. Checkout & Financials
//       checkout: {
//         defaultVariantId: defaultVariant.variantId || null, 
//         price: defaultVariant.price || 0,
//         compareAtPrice: defaultVariant.compareAtPrice || null,
//         currency: defaultVariant.currency || "USD",
//         discountPercentage: calculateDiscount(defaultVariant.price || 0, defaultVariant.compareAtPrice || null),
//       },

//       // 3. Inventory & Stock
//       inventory: {
//         availableForSale: node.availableForSale !== undefined ? node.availableForSale : (defaultVariant.availableForSale || false),
//         inStock: defaultVariant.quantityAvailable !== null ? defaultVariant.quantityAvailable > 0 : true,
//         stockLevel: defaultVariant.quantityAvailable || 0,
//       },

//       // 4. Media Grouping
//       media: {
//         featuredImage: node.featuredImage?.url || images[0]?.url || null,
//         hoverImage: images[1]?.url || null, 
//         gallery: images,                    
//         videos: videos,                     
//       },

//       // 5. Product Sorting & Filtering Data
//       attributes: {
//         placements: collections.filter((c: string) => TATTOO_CATEGORIES.placements.includes(c)),
//         themes: collections.filter((c: string) => TATTOO_CATEGORIES.themes.includes(c)),
//         sizes: collections.filter((c: string) => TATTOO_CATEGORIES.sizes.includes(c)),
//         rawCollections: collections,
//         tags: rawTags,
//       },

//       // 6. Frontend UI / Styling Object
//       styling: {
//         badges: [
//           collections.includes('New Arrivals') ? { type: 'new', label: 'New Arrival', color: '#000000' } : null,
//           isOnSale ? { type: 'sale', label: 'Sale', color: '#FF3366' } : null,
//           (defaultVariant.variantId && !defaultVariant.availableForSale) ? { type: 'sold_out', label: 'Sold Out', color: '#999999' } : null
//         ].filter(Boolean), 
        
//         tattooColorType: isColored ? 'Color' : 'Black & Grey',
//         uiBackgroundColor: UI_COLORS[Math.floor(Math.random() * UI_COLORS.length)],
//         cardTheme: "light",
//         aspectRatio: (images[0] && images[0].height > images[0].width * 1.5) ? 'tall' : 'standard',
//       },
      
//       // 7. All variants for dropdowns
//       allVariants: variants
//     };
//   });
// }



//nav bar

// "use client";

// import { useState, useEffect, useRef, useMemo, useCallback } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";
// import { motion, AnimatePresence, Variants } from "framer-motion";
// import { 
//   Search, 
//   User, 
//   ShoppingBag, 
//   Menu, 
//   X, 
//   ChevronDown, 
//   LogOut, 
//   Settings 
// } from "lucide-react";
// import { cn } from "@/src/lib/utils"; 
// import { useCart } from "@/src/context/CartContext";
// import { getCollectionNames } from "@/src/lib/shopify"; // Adjust path if needed

// const HOW_IT_WORKS_DATA = ["Help Center", "About us", "How it works", "Help & FAQ"];

// interface Combination {
//   id: string;
//   size: string;
//   price: string;
//   stock: number;
//   image: string;
// }

// export interface Product {
//   id: string;
//   handle: string;
//   name: string;
//   category: string;
//   price: string;
//   image: string;
//   badge: string | null;
//   style: string;
//   placements: string[];
//   productColor: string;
//   combinations: Combination[];
// }

// export interface ShopifyCollection {
//   title: string;
//   handle: string;
// }


// // need to remove this and add the best search engine integrated with shopify
// export const tattooProducts: Product[] = [
//   { id: "prod_1", handle: "crying-heart-traditional", name: "Crying Heart", category: "Temporary Tattoos", price: "12.00", image: "/assets/images/Card1.png", badge: "Bestseller", style: "Traditional", placements: ["Forearm", "Calf", "Chest"], productColor: "#dc2626", combinations: [{ id: "var_1a", size: "Small (2x2)", price: "12.00", stock: 10, image: "/assets/images/Card1.png" }, { id: "var_1b", size: "Large (4x4)", price: "18.00", stock: 5, image: "/assets/images/Card1.png" }] },
//   { id: "prod_2", handle: "serpent-wrap", name: "Serpent Wrap", category: "Temporary Tattoos", price: "24.00", image: "/assets/images/Card2.png", badge: "New", style: "Blackwork", placements: ["Forearm", "Neck", "Leg"], productColor: "#171717", combinations: [{ id: "var_2a", size: "Medium (5x3)", price: "24.00", stock: 15, image: "/assets/images/Card2.png" }, { id: "var_2b", size: "Sleeve (10x6)", price: "45.00", stock: 2, image: "/assets/images/Card2.png" }] },
//   { id: "prod_3", handle: "botanical-flash-sheet", name: "Botanical Flash Sheet", category: "Flash Sheets", price: "30.00", image: "/assets/images/Card3.png", badge: "Digital Download", style: "Fine Line", placements: ["Any"], productColor: "#52525b", combinations: [{ id: "var_3a", size: "Standard (8.5x11)", price: "30.00", stock: 999, image: "/assets/images/Card3.png" }] },
//   { id: "prod_4", handle: "minimalist-rose", name: "Minimalist Rose", category: "Temporary Tattoos", price: "10.00", image: "/assets/images/Card7.png", badge: null, style: "Fine Line", placements: ["Wrist", "Ankle", "Behind Ear"], productColor: "#ef4444", combinations: [{ id: "var_4a", size: "Tiny (1x1)", price: "10.00", stock: 20, image: "/assets/images/Card7.png" }] },
//   { id: "prod_5", handle: "geometric-wolf", name: "Geometric Wolf", category: "Temporary Tattoos", price: "16.00", image: "/assets/images/Card4.png", badge: "Trending", style: "Geometric", placements: ["Forearm", "Thigh", "Shoulder"], productColor: "#3f3f46", combinations: [{ id: "var_5a", size: "Medium (4x4)", price: "16.00", stock: 12, image: "/assets/images/Card4.png" }] },
//   { id: "prod_6", handle: "mandala-lotus", name: "Mandala Lotus", category: "Temporary Tattoos", price: "22.00", image: "/assets/images/Card9.png", badge: "Limited", style: "Dotwork", placements: ["Sternum", "Back", "Thigh"], productColor: "#000000", combinations: [{ id: "var_6a", size: "Medium (5x5)", price: "22.00", stock: 8, image: "/assets/images/Card9.png" }] },
//   { id: "prod_7", handle: "skull-dagger", name: "Skull & Dagger", category: "Temporary Tattoos", price: "18.00", image: "/assets/images/Card2.png", badge: null, style: "Traditional", placements: ["Calf", "Forearm", "Bicep"], productColor: "#1c1917", combinations: [{ id: "var_7a", size: "Medium (4x6)", price: "18.00", stock: 14, image: "/assets/images/Card2.png" }] },
//   { id: "prod_8", handle: "koi-fish-flow", name: "Koi Fish Flow", category: "Temporary Tattoos", price: "26.00", image: "/assets/images/Card5.png", badge: "Bestseller", style: "Japanese", placements: ["Sleeve", "Calf", "Ribs"], productColor: "#ea580c", combinations: [{ id: "var_8a", size: "Large (6x8)", price: "26.00", stock: 6, image: "/assets/images/Card5.png" }] },
//   { id: "prod_9", handle: "vintage-swallow", name: "Vintage Swallow", category: "Temporary Tattoos", price: "14.00", image: "/assets/images/Card10.png", badge: "Classic", style: "Traditional", placements: ["Hand", "Chest", "Neck"], productColor: "#0284c7", combinations: [{ id: "var_9a", size: "Small (3x3)", price: "14.00", stock: 25, image: "/assets/images/Card10.png" }] },
//   { id: "prod_10", handle: "moon-phases", name: "Moon Phases", category: "Temporary Tattoos", price: "15.00", image: "/assets/images/Card1.png", badge: null, style: "Minimalist", placements: ["Spine", "Forearm", "Collarbone"], productColor: "#71717a", combinations: [{ id: "var_10a", size: "Strip (2x8)", price: "15.00", stock: 18, image: "/assets/images/Card1.png" }] },
//   { id: "prod_11", handle: "cyberpunk-glitch", name: "Cyberpunk Glitch", category: "Temporary Tattoos", price: "20.00", image: "/assets/images/Card8.png", badge: "Limited Edition", style: "Neo-Traditional", placements: ["Forearm", "Neck", "Calf"], productColor: "#ec4899", combinations: [{ id: "var_11a", size: "Medium (4x5)", price: "20.00", stock: 5, image: "/assets/images/Card8.png" }] },
//   { id: "prod_12", handle: "tiger-roar", name: "Tiger Roar", category: "Temporary Tattoos", price: "28.00", image: "/assets/images/Card6.png", badge: "Hot", style: "Realism", placements: ["Chest", "Thigh", "Upper Back"], productColor: "#b45309", combinations: [{ id: "var_12a", size: "Large (6x6)", price: "28.00", stock: 7, image: "/assets/images/Card6.png" }] },
//   { id: "prod_13", handle: "dragon-coil", name: "Dragon Coil", category: "Temporary Tattoos", price: "35.00", image: "/assets/images/Card3.png", badge: "Staff Pick", style: "Japanese", placements: ["Full Arm", "Leg Wrap", "Back"], productColor: "#0f172a", combinations: [{ id: "var_13a", size: "Extra Large (8x14)", price: "35.00", stock: 4, image: "/assets/images/Card3.png" }] },
//   { id: "prod_14", handle: "tarot-the-moon", name: "Tarot Card: The Moon", category: "Temporary Tattoos", price: "16.00", image: "/assets/images/Card5.png", badge: null, style: "Blackwork", placements: ["Forearm", "Calf", "Bicep"], productColor: "#27272a", combinations: [{ id: "var_14a", size: "Medium (3x5)", price: "16.00", stock: 22, image: "/assets/images/Card5.png" }] },
//   { id: "prod_15", handle: "sacred-heart", name: "Sacred Heart", category: "Temporary Tattoos", price: "18.00", image: "/assets/images/Card7.png", badge: "Popular", style: "Traditional", placements: ["Chest", "Sternum", "Hand"], productColor: "#be123c", combinations: [{ id: "var_15a", size: "Medium (4x4)", price: "18.00", stock: 11, image: "/assets/images/Card7.png" }] },
//   { id: "prod_16", handle: "barbed-wire-armband", name: "Barbed Wire Armband", category: "Temporary Tattoos", price: "14.00", image: "/assets/images/Card9.png", badge: null, style: "Tribal", placements: ["Bicep", "Wrist", "Ankle"], productColor: "#404040", combinations: [{ id: "var_16a", size: "Wrap (2x10)", price: "14.00", stock: 30, image: "/assets/images/Card9.png" }] },
//   { id: "prod_17", handle: "butterfly-swarm", name: "Butterfly Swarm", category: "Temporary Tattoos", price: "20.00", image: "/assets/images/Card2.png", badge: "Popular", style: "Fine Line", placements: ["Shoulder", "Ribs", "Thigh"], productColor: "#3b82f6", combinations: [{ id: "var_17a", size: "Large (5x7)", price: "20.00", stock: 16, image: "/assets/images/Card2.png" }] },
//   { id: "prod_18", handle: "watercolor-fox", name: "Watercolor Fox", category: "Temporary Tattoos", price: "24.00", image: "/assets/images/Card10.png", badge: "Artistic", style: "Watercolor", placements: ["Calf", "Forearm", "Shoulder Blade"], productColor: "#f97316", combinations: [{ id: "var_18a", size: "Medium (4x6)", price: "24.00", stock: 9, image: "/assets/images/Card10.png" }] },
//   { id: "prod_19", handle: "gothic-lettering-pack", name: "Gothic Lettering Pack", category: "Flash Sheets", price: "25.00", image: "/assets/images/Card4.png", badge: "Digital Download", style: "Lettering", placements: ["Any"], productColor: "#18181b", combinations: [{ id: "var_19a", size: "Standard (8.5x11)", price: "25.00", stock: 999, image: "/assets/images/Card4.png" }] },
//   { id: "prod_20", handle: "abstract-line-art", name: "Abstract Line Art", category: "Temporary Tattoos", price: "18.00", image: "/assets/images/Card8.png", badge: "New", style: "Abstract", placements: ["Forearm", "Ribs", "Ankle"], productColor: "#52525b", combinations: [{ id: "var_20a", size: "Medium (4x5)", price: "18.00", stock: 13, image: "/assets/images/Card8.png" }] }
// ];

// export default function Header() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { cartCount, setCartOpen } = useCart();
  
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [hoveredNav, setHoveredNav] = useState<string | null>(null);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
//   const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
  
//   // DYNAMIC SHOPIFY COLLECTIONS STATE
//   const [collections, setCollections] = useState<ShopifyCollection[]>([]);
//   const [isLoadingCollections, setIsLoadingCollections] = useState(true);

//   // Fetch collections on component mount
//   useEffect(() => {
//     const fetchCollections = async () => {
//       setIsLoadingCollections(true);
//       try {
//         const result = await getCollectionNames();
//         console.log("Header Collections");
//         console.log(result);
//         setCollections(result || []);
//       } catch (error) {
//         console.error("Failed to fetch collection Names", error);
//       } finally {
//         setIsLoadingCollections(false);
//       }
//     };

//     fetchCollections();
//   }, []);

//   const searchResults = useMemo(() => {
//     if (!searchQuery.trim()) return [];
//     const searchTerms = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
    
//     return tattooProducts.filter((product) => {
//       const searchableText = [
//         product.name,
//         product.style,
//         product.category,
//         product.badge,
//         ...(product.placements || [])
//       ].filter(Boolean).join(" ").toLowerCase();

//       return searchTerms.every(term => searchableText.includes(term));
//     }).slice(0, 6); 
//   }, [searchQuery]);

//   const closeSearch = () => {
//     setIsSearchOpen(false);
//     setSearchQuery(""); 
//   };

//   const [isLoggedIn, setIsLoggedIn] = useState(false); 
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const handleMouseEnter = (navItem: string) => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     setHoveredNav(navItem);
//     setActiveDropdown(navItem);
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setHoveredNav(null);
//       setActiveDropdown(null);
//       setIsProfileMenuOpen(false);
//     }, 150); 
//   };

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (isMobileDrawerOpen) document.body.style.overflow = "hidden";
//     else document.body.style.overflow = "";
//     return () => { document.body.style.overflow = ""; }; 
//   }, [isMobileDrawerOpen]);

//   const isActive = (path: string) => pathname?.includes(path);

//   const dropdownVariants: Variants = {
//     hidden: { opacity: 0, y: 10, scale: 0.98, filter: "blur(4px)" },
//     visible: { 
//       opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
//       transition: { type: "spring", stiffness: 400, damping: 30, mass: 0.8 }
//     },
//     exit: { 
//       opacity: 0, y: 5, scale: 0.98, filter: "blur(4px)",
//       transition: { duration: 0.15, ease: "easeOut" }
//     }
//   };

//   const drawerVariants: Variants = {
//     hidden: { x: "-100%" },
//     visible: { 
//       x: 0,
//       transition: { type: "spring", stiffness: 300, damping: 35 }
//     },
//     exit: { 
//       x: "-100%",
//       transition: { type: "spring", stiffness: 300, damping: 35 }
//     }
//   };

//   return (
//     <>
//       <header
//         className={cn(
//           "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out",
//           isScrolled || isSearchOpen
//             ? "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border-b border-gray-200" 
//             : "bg-white border-b border-transparent",
//           isScrolled ? "h-16 md:h-20" : "h-20 md:h-24"
//         )}
//       >
//         <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full relative">
          
//           {/* ========================================== */}
//           {/* DESKTOP VIEW                               */}
//           {/* ========================================== */}
//           <div className="hidden md:flex items-center w-full h-full">
            
//             <div className="flex-1 flex items-center justify-start">
//               <Link 
//                 href="/" 
//                 className="relative z-50 flex-shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] rounded-sm transition-transform hover:scale-[1.02]"
//               >
//                 <Image
//                   src="/assets/icons/Fotterlogo2.svg"
//                   alt="Just Tattoos"
//                   width={140}
//                   height={48}
//                   className={cn("transition-all duration-300 w-90px", isScrolled ? "h-8" : "h-10")}
//                   priority
//                 />
//               </Link>
//             </div>

//             <nav className="flex h-full items-center justify-center gap-2" onMouseLeave={handleMouseLeave}>
            //   <div className="relative h-full flex items-center px-4 cursor-pointer" onMouseEnter={() => handleMouseEnter("new-arrivals")}>
            //     {hoveredNav === "new-arrivals" && (
            //       <motion.div layoutId="nav-pill" className="absolute inset-y-5 inset-x-0 bg-gray-100/80 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
            //     )}
            //     <Link href="/new-arrivals" className={cn(
            //       "relative z-10  font-bold text-[14px] tracking-wider transition-colors duration-300",
            //       isActive("/new-arrivals") ? "text-[var(--color-brand-orange)]" : "text-gray-900"
            //     )}>
            //       NEW ARRIVAL
            //     </Link>
            //   </div>

//               {/* DYNAMIC COLLECTIONS DESKTOP DROPDOWN */}
//               <div className="relative h-full flex items-center px-4 cursor-pointer" onMouseEnter={() => handleMouseEnter("collection")}>
//                 {hoveredNav === "collection" && (
//                   <motion.div layoutId="nav-pill" className="absolute inset-y-5 inset-x-0 bg-gray-100/80 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
//                 )}
//                 <Link 
//                   href="/collections"
//                   onClick={() => setActiveDropdown(null)}
//                   className={cn(
//                     "relative z-10  font-bold text-[14px] tracking-wider transition-colors flex items-center gap-1.5",
//                     activeDropdown === "collection" || isActive("/shopall") || isActive("/collection") ? "text-[var(--color-brand-orange)]" : "text-gray-900"
//                   )}
//                 >
//                   COLLECTION
//                   <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", activeDropdown === "collection" && "rotate-180")} />
//                 </Link>

//                 <AnimatePresence>
//                   {activeDropdown === "collection" && (
//                     <motion.div
//                       variants={dropdownVariants}
//                       initial="hidden"
//                       animate="visible"
//                       exit="exit"
//                       className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-[90vw] max-w-[1100px] bg-white rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50 origin-top cursor-default flex"
//                     >
//                       <div className="flex-1 p-10">
//                         {isLoadingCollections ? (
//                            <div className="text-sm font-semibold text-gray-500 animate-pulse">Loading collections...</div>
//                         ) : collections.length > 0 ? (
//                           <div className="grid grid-cols-3 gap-8">
//                             <div className="col-span-3 mb-2 border-b border-gray-100 pb-2">
//                                 <h3 className="text-[var(--color-brand-orange)] text-[13px] font-bold tracking-widest uppercase">Shop by Collection</h3>
//                             </div>
//                             {/* Dynamically Map all fetched collections */}
//                             {collections.map((collection) => (
//                               <Link
//                                 key={collection.handle}
//                                 href={`/collections/${collection.handle}`}
//                                 className="text-[14px] font-medium text-gray-600 hover:text-gray-900 hover:translate-x-1.5 transition-all duration-300 block"
//                                 onClick={() => setActiveDropdown(null)}
//                               >
//                                 {collection.title}
//                               </Link>
//                             ))}
//                           </div>
//                         ) : (
//                            <div className="text-sm text-gray-500">No collections found.</div>
//                         )}
//                       </div>

//                       <div className="w-[35%] bg-gray-50 flex items-center justify-center relative p-8">
//                         <div className="relative w-full max-w-[220px] aspect-[3/4]">
//                           <div className="absolute inset-0 bg-white border border-gray-200 rounded-xl shadow-lg rotate-6 translate-x-6 origin-bottom-right"></div>
//                           <div className="absolute inset-0 bg-white border border-gray-200 rounded-xl shadow-lg -rotate-3 -translate-x-3 origin-bottom-left"></div>
//                           <div className="absolute inset-0 bg-gray-900 rounded-xl shadow-xl flex items-center justify-center border-4 border-white overflow-hidden z-10">
//                             <div className="relative w-full h-full bg-[var(--color-brand-orange)]/20">
//                               <Image 
//                                 src="/assets/images/Card1.png"
//                                 alt="Featured Tattoo Art" 
//                                 fill
//                                 priority
//                                 sizes="(max-width: 768px) 220px, 25vw"
//                                 className="object-cover"
//                               />
//                             </div> 
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* Nav Item: Sale */}
            //   <div className="relative h-full flex items-center px-4 cursor-pointer" onMouseEnter={() => handleMouseEnter("sale")}>
            //     {hoveredNav === "sale" && (
            //       <motion.div layoutId="nav-pill" className="absolute inset-y-5 inset-x-0 bg-gray-100/80 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
            //     )}
            //     <Link href="/sale" className={cn(
            //       "relative z-10  font-bold text-[14px] tracking-wider transition-colors duration-300",
            //       isActive("/sale") ? "text-red-600" : "text-red-500 hover:text-red-600"
            //     )}>
            //       SALE
            //     </Link>
            //   </div>

            //   {/* Nav Item: How It Works */}
            //   <div className="relative h-full flex items-center px-4 cursor-pointer" onMouseEnter={() => handleMouseEnter("how-it-works")}>
            //     {hoveredNav === "how-it-works" && (
            //       <motion.div layoutId="nav-pill" className="absolute inset-y-5 inset-x-0 bg-gray-100/80 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
            //     )}
            //     <span className={cn(
            //       "relative z-10  font-bold text-[14px] tracking-wider transition-colors flex items-center gap-1.5",
            //       activeDropdown === "how-it-works" || isActive("/how-it-works") ? "text-[var(--color-brand-orange)]" : "text-gray-900"
            //     )}>
            //       HOW IT WORKS
            //       <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", activeDropdown === "how-it-works" && "rotate-180")} />
            //     </span>

            //     <AnimatePresence>
            //       {activeDropdown === "how-it-works" && (
            //         <motion.div
            //           variants={dropdownVariants}
            //           initial="hidden"
            //           animate="visible"
            //           exit="exit"
            //           className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-[500px] bg-white rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-6 z-50 origin-top"
            //         >
            //           <div className="grid grid-cols-2 gap-3 w-full">
            //             {HOW_IT_WORKS_DATA.map((item) => (
            //               <Link
            //                 key={item}
            //                 href={`/${item.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
            //                 className=" text-[14px] font-bold text-gray-700 hover:text-[var(--color-brand-orange)] hover:bg-orange-50/50 p-4 rounded-xl transition-all duration-300 flex items-center justify-between group"
            //                 onClick={() => setActiveDropdown(null)}
            //               >
            //                 {item}
            //                 <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-[var(--color-brand-orange)] transition-all">→</span>
            //               </Link>
            //             ))}
            //           </div>
            //         </motion.div>
            //       )}
            //     </AnimatePresence>
            //   </div>
            // </nav>

//             <div className="flex-1 flex items-center justify-end gap-3 lg:gap-5">
//               <button 
//                 aria-label="Search" 
//                 onClick={() => setIsSearchOpen(!isSearchOpen)}
//                 className="text-gray-900 hover:text-[var(--color-brand-orange)] p-2 rounded-full hover:bg-gray-50 transition-all outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]"
//               >
//                 {isSearchOpen ? <X className="w-5 h-5" strokeWidth={1.8} /> : <Search className="w-5 h-5" strokeWidth={1.8} />}
//               </button>
              
//               <button 
//                 aria-label="Cart" 
//                 onClick={() => setCartOpen(true)}
//                 className="text-gray-900 hover:text-[var(--color-brand-orange)] p-2 rounded-full hover:bg-gray-50 transition-all relative group outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]"
//               >
//                 <ShoppingBag className="w-5 h-5" strokeWidth={1.8} />
//                 {cartCount > 0 && (
//                   <span className="absolute top-0 right-0 bg-[var(--color-brand-orange)] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full  shadow-sm transform group-hover:scale-110 transition-transform">
//                     {cartCount}
//                   </span>
//                 )}
//               </button>

//               <div className="pl-3 lg:pl-5 border-l border-gray-200 flex items-center gap-3 lg:gap-4 h-8">
//                 {!isLoggedIn ? (
//                   <>
//                     <Link href="/login" className=" font-semibold text-[14px] text-gray-700 hover:text-[var(--color-brand-orange)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-brand-orange)] rounded-sm whitespace-nowrap">
//                       Log in
//                     </Link>
//                     <Link href="/register" className=" font-bold text-[13px] bg-gray-900 text-white px-5 lg:px-6 py-2.5 rounded-full hover:bg-[var(--color-brand-orange)] hover:shadow-md transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-brand-orange)] whitespace-nowrap">
//                       Sign up
//                     </Link>
//                   </>
//                 ) : (
//                   <div className="relative" onMouseLeave={() => setIsProfileMenuOpen(false)}>
//                     <button 
//                       onMouseEnter={() => setIsProfileMenuOpen(true)}
//                       className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-brand-orange)] rounded-full transition-transform hover:scale-105"
//                     >
//                       <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-400 to-[var(--color-brand-orange)] p-[2px] shadow-sm">
//                         <div className="w-full h-full bg-white rounded-full border border-white flex items-center justify-center overflow-hidden">
//                           <User className="w-5 h-5 text-gray-600" />
//                         </div>
//                       </div>
//                     </button>

//                     <AnimatePresence>
//                       {isProfileMenuOpen && (
//                         <motion.div
//                           variants={dropdownVariants}
//                           initial="hidden"
//                           animate="visible"
//                           exit="exit"
//                           className="absolute top-[calc(100%+8px)] right-0 w-52 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-50 origin-top-right"
//                         >
//                           <Link href="/account" className="flex items-center gap-3 px-5 py-3 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[var(--color-brand-orange)]  transition-colors">
//                             <Settings className="w-4 h-4" /> Account Settings
//                           </Link>
//                           <Link href="/orders" className="flex items-center gap-3 px-5 py-3 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[var(--color-brand-orange)]  transition-colors">
//                             <ShoppingBag className="w-4 h-4" /> My Orders
//                           </Link>
//                           <div className="h-px bg-gray-100 my-1"></div>
//                           <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center gap-3 px-5 py-3 text-[14px] text-red-600 hover:bg-red-50  transition-colors">
//                             <LogOut className="w-4 h-4" /> Sign Out
//                           </button>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* ========================================== */}
//           {/* MOBILE VIEW                                */}
//           {/* ========================================== */}
//           <div className="flex md:hidden items-center justify-between w-full h-full">
//             <div className="flex-1 flex justify-start">
//               <button 
//                 aria-label="Open Menu"
//                 onClick={() => setIsMobileDrawerOpen(true)}
//                 className="text-gray-900 p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] outline-none"
//               >
//                 <Menu className="w-6 h-6" strokeWidth={1.5} />
//               </button>
//             </div>

//             <div className="flex-1 flex justify-center">
//               <Link href="/" className="outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] rounded-sm">
//                 <Image
//                   src="/assets/icons/Fotterlogo2.svg"
//                   alt="Just Tattoos"
//                   width={110}
//                   height={32}
//                   className="w-auto h-7 object-contain"
//                   priority
//                 />
//               </Link>
//             </div>

//             <div className="flex-1 flex justify-end items-center gap-2 sm:gap-4">
//               <button 
//                 aria-label="Search" 
//                 onClick={() => setIsSearchOpen(!isSearchOpen)}
//                 className="text-gray-900 p-2 hover:bg-gray-100 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]"
//               >
//                 {isSearchOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Search className="w-5 h-5" strokeWidth={1.5} />}
//               </button>

//               <button 
//                 aria-label="Cart" 
//                 onClick={() => setCartOpen(true)}
//                 className="text-gray-900 p-2 hover:bg-gray-100 rounded-full transition-colors relative group outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]"
//               >
//                 <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
//                 {cartCount > 0 && (
//                   <span className="absolute top-1 right-1 bg-[var(--color-brand-orange)] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
//                     {cartCount}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ========================================== */}
//         {/* SEARCH BAR (Intact)                        */}
//         {/* ========================================== */}
//         <AnimatePresence>
//         {isSearchOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={closeSearch}
//               className="fixed inset-0 bg-black/20 z-30"
//             />

//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-md overflow-visible z-40"
//             >
//               <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative">
//                 <div className="relative flex items-center w-full">
//                   <Search className="absolute left-5 w-5 h-5 text-[var(--color-brand-orange)]" />
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search tattoos, styles, placements, or categories..."
//                     className="w-full pl-14 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-orange)] focus:bg-white  text-gray-900 shadow-sm transition-all text-sm md:text-base"
//                     autoFocus
//                   />
//                   <button
//                     onClick={closeSearch}
//                     className="absolute right-3 p-1.5 text-gray-400 hover:text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>

//                 <AnimatePresence>
//                   {searchQuery.trim().length > 0 && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="absolute top-full left-0 right-0 mt-2 mx-4 sm:mx-6 lg:mx-8 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50"
//                     >
//                       {searchResults.length > 0 ? (
//                         <div className="flex flex-col max-h-[60vh] overflow-y-auto custom-scrollbar">
//                           <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
//                             <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
//                               Products ({searchResults.length})
//                             </span>
//                           </div>
//                           {searchResults.map((product) => (
//                             <Link 
//                               key={product.id}
//                               href={`/collections/${product.handle}`} 
//                               onClick={closeSearch}
//                               className="flex items-center gap-4 p-4 hover:bg-orange-50/50 transition-colors border-b border-gray-50 last:border-0 group"
//                             >
//                               <div className="w-14 h-14 relative bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-200 group-hover:border-[var(--color-brand-orange)]/30 transition-colors">
//                                 <Image src={product.image} alt={product.name} fill sizes="56px" className="object-cover" />
//                               </div>
//                               <div className="flex-1 flex flex-col">
//                                 <h4 className="text-sm font-bold text-gray-900 group-hover:text-[var(--color-brand-orange)] transition-colors">
//                                   {product.name}
//                                 </h4>
//                                 <div className="flex items-center gap-2 mt-0.5">
//                                   <span className="text-xs font-semibold text-gray-500">{product.style}</span>
//                                   <span className="w-1 h-1 rounded-full bg-gray-300"></span>
//                                   <span className="text-xs text-gray-400">{product.category}</span>
//                                 </div>
//                               </div>
//                               <div className="text-sm font-black text-gray-900">
//                                 ${product.price}
//                               </div>
//                             </Link>
//                           ))}
//                         </div>
//                       ) : (
//                         <div className="p-10 flex flex-col items-center justify-center text-center">
//                           <Search className="w-10 h-10 text-gray-200 mb-3" />
//                           <p className="text-gray-900 font-bold">No results found for "{searchQuery}"</p>
//                           <p className="text-sm text-gray-500 mt-2">Try searching for styles like <span className="font-semibold text-gray-700">Traditional</span>, <span className="font-semibold text-gray-700">Fine Line</span>, or <span className="font-semibold text-gray-700">Blackwork</span>.</p>
//                         </div>
//                       )}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//       </header>

//       {/* ========================================== */}
//       {/* MOBILE SLIDE-OUT DRAWER                    */}
//       {/* ========================================== */}
//       <AnimatePresence>
//         {isMobileDrawerOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsMobileDrawerOpen(false)}
//               className="md:hidden fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity"
//             />
            
//             <motion.div
//               variants={drawerVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="md:hidden fixed top-0 left-0 w-[85vw] max-w-[360px] h-[100dvh] bg-white shadow-2xl z-[70] flex flex-col"
//             >
//               <div className="p-5 flex justify-between items-center border-b border-gray-100 bg-gray-50/80">
//                 <Image src="/assets/icons/DesktopLogo.svg" alt="Just Tattoos" width={100} height={28} className="w-auto h-6" />
//                 <button 
//                   onClick={() => setIsMobileDrawerOpen(false)} 
//                   className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:bg-[var(--color-brand-orange)] hover:text-white hover:border-transparent transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>

//               <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-8">
//                 {!isLoggedIn ? (
//                   <div className="flex flex-col gap-3 pb-8 border-b border-gray-100">
//                     <Link href="/login" onClick={() => setIsMobileDrawerOpen(false)} className="w-full py-3.5 text-center rounded-xl border-2 border-gray-100  font-bold text-[14px] hover:border-[var(--color-brand-orange)] hover:text-[var(--color-brand-orange)] transition-colors">
//                       Log in
//                     </Link>
//                     <Link href="/register" onClick={() => setIsMobileDrawerOpen(false)} className="w-full py-3.5 text-center rounded-xl bg-gray-900 text-white  font-bold text-[14px] hover:bg-[var(--color-brand-orange)] shadow-md transition-all">
//                       Create Account
//                     </Link>
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-4 pb-8 border-b border-gray-100">
//                     <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center">
//                       <User className="w-6 h-6 text-[var(--color-brand-orange)]" />
//                     </div>
//                     <div className="flex-1">
//                       <p className=" font-bold text-[15px] text-gray-900">My Account</p>
//                       <button onClick={() => setIsLoggedIn(false)} className="text-[13px] text-gray-500 hover:text-red-500 font-medium mt-0.5 transition-colors">Sign out</button>
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex flex-col gap-6">
//                   <Link href="/new-arrivals" className=" text-[16px] font-bold text-gray-900 flex items-center justify-between group" onClick={() => setIsMobileDrawerOpen(false)}>
//                     NEW ARRIVAL <span className="text-gray-300 group-hover:text-[var(--color-brand-orange)] group-hover:translate-x-1 transition-all">→</span>
//                   </Link>

//                   <div className="flex flex-col gap-4">
//                     <div className="flex justify-between items-center w-full">
//                       <a 
//                         href="/collections" 
//                         className=" text-[16px] font-bold text-gray-900 hover:text-[var(--color-brand-orange)] transition-colors text-left flex-grow"
//                       >
//                         COLLECTION
//                       </a>
//                       <button 
//                         className="p-2 -mr-2 flex items-center justify-center"
//                         onClick={() => setMobileExpanded(mobileExpanded === "collection" ? null : "collection")}
//                         aria-label="Toggle collection menu"
//                       >
//                         <ChevronDown 
//                           className={cn(
//                             "w-5 h-5 transition-transform duration-300 text-gray-400", 
//                             mobileExpanded === "collection" && "rotate-180 text-[var(--color-brand-orange)]"
//                           )} 
//                         />
//                       </button>
//                     </div>
                    
//                     {/* DYNAMIC COLLECTIONS MOBILE ACCORDION */}
//                     <AnimatePresence>
//                       {mobileExpanded === "collection" && (
//                         <motion.div 
//                           initial={{ height: 0, opacity: 0 }}
//                           animate={{ height: "auto", opacity: 1 }}
//                           exit={{ height: 0, opacity: 0 }}
//                           className="overflow-hidden flex flex-col gap-3 pl-4 border-l-2 border-[var(--color-brand-orange)]/20 ml-1 py-2"
//                         >
//                            {isLoadingCollections ? (
//                               <div className="text-[14px] text-gray-400 py-1">Loading...</div>
//                            ) : collections.length > 0 ? (
//                               collections.map((collection) => (
//                                 <Link 
//                                   key={collection.handle} 
//                                   href={`/collections/${collection.handle}`}
//                                   className="text-gray-600 text-[14px] font-medium hover:text-[var(--color-brand-orange)] transition-colors py-1.5"
//                                   onClick={() => setIsMobileDrawerOpen(false)}
//                                 >
//                                   {collection.title}
//                                 </Link>
//                               ))
//                            ) : (
//                               <div className="text-[14px] text-gray-400 py-1">No collections found.</div>
//                            )}
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>

//                   <Link href="/sale" className=" text-[16px] font-bold text-red-500 flex items-center justify-between group" onClick={() => setIsMobileDrawerOpen(false)}>
//                     SALE <span className="text-red-200 group-hover:text-red-500 group-hover:translate-x-1 transition-all">→</span>
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
// 'use client';

// import React from 'react';
// import clsx from 'clsx';
// import { Check } from 'lucide-react';

// interface Filters {
//   styles?: string[];
//   sizes?: string[];
//   placements?: string[];
// }

// interface ActiveFilters {
//   styles: string[];
//   sizes: string[];
//   placements: string[];
// }

// interface FilterSidebarProps {
//   filters: Filters;
//   activeFilters: ActiveFilters;
//   onToggle: (category: keyof Filters | 'RESET', value?: string) => void;
// }

// interface FilterGroupProps {
//   title: string;
//   items: string[];
//   activeItems: string[];
//   onToggle: (value: string) => void;
// }

// export function FilterSidebar({ filters, activeFilters, onToggle }: FilterSidebarProps) {
//   return (
//     <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
//       {filters.styles && filters.styles.length > 0 && (
//         <FilterGroup 
//           title="Style" 
//           items={filters.styles} 
//           activeItems={activeFilters.styles} 
//           onToggle={(v) => onToggle('styles', v)} 
//         />
//       )}
      
//       {filters.sizes && filters.sizes.length > 0 && (
//         <FilterGroup 
//           title="Size" 
//           items={filters.sizes} 
//           activeItems={activeFilters.sizes} 
//           onToggle={(v) => onToggle('sizes', v)} 
//         />
//       )}
      
//       {filters.placements && filters.placements.length > 0 && (
//         <FilterGroup 
//           title="Placement" 
//           items={filters.placements} 
//           activeItems={activeFilters.placements} 
//           onToggle={(v) => onToggle('placements', v)} 
//         />
//       )}
      
//       {Object.values(activeFilters).some(arr => arr.length > 0) && (
//         <button 
//           onClick={() => onToggle('RESET')} 
//           className="w-full py-3 rounded-xl bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-colors shadow-lg"
//         >
//           Reset Filters
//         </button>
//       )}
//     </div>
//   );
// }

// function FilterGroup({ title, items, activeItems, onToggle }: FilterGroupProps) {
//   return (
//     <div className="space-y-4">
//       <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-200 pb-2">
//         {title}
//       </h4>
//       <div className="space-y-3">
//         {items.map((item) => {
//           const isActive = activeItems.includes(item);
//           return (
//             <label key={item} className="flex items-center gap-3 cursor-pointer group select-none">
//               <div 
//                 className={clsx(
//                   "w-4 h-4 rounded-sm border transition-all flex items-center justify-center",
//                   isActive ? "bg-slate-950 border-slate-950 text-white" : "border-slate-300 bg-white group-hover:border-slate-500"
//                 )}
//               >
//                 <input 
//                   type="checkbox" 
//                   className="hidden" 
//                   checked={isActive} 
//                   onChange={() => onToggle(item)} 
//                 />
//                 {isActive && <Check className="w-3 h-3" strokeWidth={4} />}
//               </div>
//               <span className={clsx(
//                 "text-xs font-bold transition-colors uppercase tracking-widest", 
//                 isActive ? "text-slate-950" : "text-slate-500 group-hover:text-slate-800"
//               )}>
//                 {item}
//               </span>
//             </label>
//           );
//         })}
//       </div>
//     </div>
//   );
// }



// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { ChevronDown, ShoppingBag } from 'lucide-react';
// import clsx from 'clsx';
// import Image from 'next/image';
// import { toast } from 'sonner';
// import { useCart } from '@/src/context/CartContext';
// import { Loader2 } from 'lucide-react';

// interface Combination {
//   id: string;
//   price: number | string;
//   image: string;
//   size: string;
// }

// interface ProductItem {
//   id: string;
//   originalId?: string;
//   name: string;
//   variantName?: string;
//   style: string;
//   price: number | string;
//   image: string;
//   badge?: string;
//   productColor?: string;
//   isExploded?: boolean;
//   preSelectedCombo?: Combination;
//   combinations?: Combination[];
//   handle?: string;
//   slug?: string;
// }

// interface ProductCardProps {
//   item: ProductItem;
//   viewMode: 'grid' | 'list';
//   page: string; 
// }

// export function ProductCard({ item, viewMode, page }: ProductCardProps) {
//   const isList = viewMode === 'list';
//   const isExploded = item.isExploded;
//   const combinations = item.combinations || [];
   
//   const [selectedCombo, setSelectedCombo] = useState<Combination | null>(
//     isExploded && item.preSelectedCombo ? item.preSelectedCombo : null
//   );

//   const [isAdding, setIsAdding] = useState(false);
//   const { addToCart } = useCart();

//   const price = selectedCombo ? selectedCombo.price : item.price;
//   const image = selectedCombo ? selectedCombo.image : item.image;
//   const parentId = isExploded ? item.originalId : item.id;
  
//   const rawSlug = item.slug || `${item.handle}-${parentId}`;
//   const slug = encodeURIComponent(rawSlug.toLowerCase().replace(/\s+/g, '-'));
//   const productUrl = `/${page}/${slug}`;

//   const handleAddToCart = async (e: React.MouseEvent) => {
//     e.preventDefault(); 
//     const comboToAdd = isExploded ? item.preSelectedCombo : (selectedCombo || item.combinations?.[0]);
    
//     if (!comboToAdd?.id) {
//         toast.error('Please select a size first.');
//         return;
//     }

//     setIsAdding(true);
//     try {
//       await addToCart({
//         variantId: comboToAdd.id,
//         productId: parentId || item.id,
//         name: isExploded ? (item.name || '') : item.name,
//         variantName: comboToAdd.size,
//         price: Number(comboToAdd.price),
//         image: comboToAdd.image,
//         quantity: 1
//       });
//       toast.success('Added to cart!');
//     } catch (error) {
//       toast.error('Failed to add to cart. Please try again.');
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   return (
//     <div className={clsx(
//       "group relative bg-white border border-gray-100/80 shadow-sm rounded-2xl overflow-hidden transition-all duration-300 ease-in-out",
//       "hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:border-gray-200",
//       isList ? "flex flex-col sm:flex-row" : "flex flex-col"
//     )}>
      
//       <div className={clsx(
//         "relative overflow-hidden bg-gray-50/50",
//         isList ? "w-full sm:w-48 sm:min-w-[12rem] h-56 sm:h-auto shrink-0" : "w-full aspect-[4/5]"
//       )}>
//         {item.badge && (
//           <div className="absolute top-3 left-3 z-20">
//             <span className="bg-[#fe8204] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow-sm tracking-wider">
//               {item.badge}
//             </span>
//           </div>
//         )}

//         <Link href={productUrl} prefetch={false} className="block w-full h-full relative">
//             <Image
//                 src={image}
//                 alt={item.name}
//                 fill
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                 className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
//             />
//             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
//         </Link>
//       </div>

//       <div className={clsx("flex flex-col flex-grow p-5 sm:p-6", isList ? "justify-center" : "")}>
//         <span className="text-xs font-semibold text-[#fe8204] tracking-wider uppercase mb-1.5">
//           {item.style}
//         </span>
        
//         <Link href={productUrl} prefetch={false} className="block mb-1">
//             <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-[#fe8204] transition-colors line-clamp-2">
//               {isExploded ? item.variantName : item.name}
//             </h3>
//         </Link>
        
//         {isExploded && (
//           <p className="text-sm font-medium text-gray-500 mb-3 line-clamp-1">{item.name}</p>
//         )}

//         <div className="flex-grow" /> 

//         <div className={clsx("flex flex-col gap-4 mt-4 mb-5", isList ? "sm:flex-row sm:items-center sm:justify-between" : "")}>
//           <p className="text-2xl font-extrabold text-gray-900">
//             ${Number(price).toFixed(2)}
//           </p>
          
//           {!isExploded && combinations.length > 0 && (
//             <div className="relative w-full sm:max-w-[140px]">
//               <select 
//                 className="w-full appearance-none bg-gray-50/80 text-sm font-semibold text-gray-700 py-2.5 pl-4 pr-10 border border-gray-200 rounded-xl outline-none cursor-pointer hover:bg-white hover:border-gray-300 focus:ring-2 focus:ring-[#fe8204]/20 focus:border-[#fe8204] transition-all"
//                 value={selectedCombo ? selectedCombo.id : ""}
//                 onChange={(e) => setSelectedCombo(combinations.find(c => c.id === e.target.value) || null)}
//               >
//                 <option value="" disabled>Size</option>
//                 {combinations.map(c => <option key={c.id} value={c.id}>{c.size}</option>)}
//               </select>
//               <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
//                 <ChevronDown className="w-4 h-4" />
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-2 gap-2.5">
//           <button 
//             onClick={handleAddToCart}
//             disabled={(!isExploded && combinations.length > 0 && !selectedCombo) || isAdding}
//             className={clsx(
//               "flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-sm font-bold transition-all duration-300",
//               (!isExploded && combinations.length > 0 && !selectedCombo)
//                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                 : "bg-[#fe8204] hover:bg-[#e07300] text-white shadow-md shadow-[#fe8204]/20 hover:shadow-[#fe8204]/40 disabled:opacity-70"
//             )}
//           >
//             {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : (!isExploded && !selectedCombo) ? 'Select Size' : 'Add to Cart'} 
//             {(!isAdding && (isExploded || selectedCombo)) && <ShoppingBag className="w-4 h-4" />}
//           </button>
          
//           <Link 
//             href={productUrl} 
//             prefetch={false}
//             className="flex items-center justify-center py-3 px-2 rounded-xl bg-transparent text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-[#fe8204] hover:border-[#fe8204]/30 font-semibold text-sm transition-all duration-300"
//           >
//             View Details
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import React, { useState, useMemo, useEffect, useCallback } from 'react';
// import { useSearchParams, useRouter, usePathname } from 'next/navigation';
// import { SlidersHorizontal, LayoutGrid, List, X, ChevronLeft, ChevronRight, RefreshCcw, Loader2 } from 'lucide-react';
// import clsx from 'clsx';

// import { FilterSidebar } from '@/src/components/shared/FilterSidebar';
// import { ProductCard } from '@/src/components/shared/ProductLayout';
// // import { getProducts } from '@/src/lib/index'; // Ensure path is correct
// import { getProducts } from '@/src/lib/shopify';
// interface Combination {
//   id: string;
//   price: number | string;
//   image: string;
//   size: string;
//   stock: number;
// }

// interface Product {
//   id: string;
//   name: string;
//   category: string;
//   style: string;
//   handle?: string;
//   price: number | string;
//   image: string;
//   combinations?: Combination[];
//   placements?: string[];
//   productColor: any;
//   isExploded?: boolean;
//   originalId?: string;
//   variantName?: string;
//   preSelectedCombo?: Combination;
//   slug?: string;
//   badge: any;
// }

// interface ActiveFilters {
//   styles: string[];
//   sizes: string[];
//   placements: string[];
// }

// // You can fetch these dynamically in a separate call, but caching them here prevents UI lag on load
// const GLOBAL_FILTER_OPTIONS = {
//   categories: ['Shop All', 'Temporary Tattoos', 'Flash Sheets', 'Apparel'],
//   styles: ['Traditional', 'Fine Line', 'Blackwork', 'Geometric', 'Dotwork', 'Japanese', 'Realism', 'Minimalist'],
//   sizes: ['Tiny (1x1)', 'Small (2x2)', 'Medium (4x4)', 'Large (6x8)', 'Sleeve (10x6)'],
//   placements: ['Forearm', 'Calf', 'Chest', 'Neck', 'Wrist', 'Spine', 'Any']
// };

// export default function ShopAll() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
  
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);
//   const [itemsPerPage, setItemsPerPage] = useState(12);

//   // Dynamic Data States
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
  
//   // Pagination State
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageInfo, setPageInfo] = useState({ hasNextPage: false, endCursor: null as string | null });
//   const [cursorHistory, setCursorHistory] = useState<string[]>([]); // Tracks start cursors to go backwards

//   const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
//     styles: [],
//     sizes: [],
//     placements: []
//   });

//   const categoryFromUrl = searchParams.get('category') || 'Shop All';

//   useEffect(() => {
//     const handleResize = () => setItemsPerPage(window.innerWidth < 1024 ? 9 : 12);
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Construct Shopify Search Query based on active filters
//   const buildShopifyQuery = useCallback(() => {
//     const queryParts: string[] = [];
    
//     if (categoryFromUrl !== 'Shop All') {
//       queryParts.push(`product_type:'${categoryFromUrl}'`);
//     }
    
//     if (activeFilters.styles.length > 0) {
//       // Shopify allows matching tags. Example: tag:'Style:Traditional'
//       const styleQueries = activeFilters.styles.map(s => `tag:'Style:${s}'`).join(' OR ');
//       queryParts.push(`(${styleQueries})`);
//     }

//     if (activeFilters.placements.length > 0) {
//       const placementQueries = activeFilters.placements.map(p => `tag:'Placement:${p}'`).join(' OR ');
//       queryParts.push(`(${placementQueries})`);
//     }
    
//     return queryParts.join(' AND ');
//   }, [categoryFromUrl, activeFilters]);

//   // Main Fetch Function
//   const fetchPageData = useCallback(async (cursor?: string | null, isGoingBack = false) => {
//     setIsLoading(true);
//     try {
//       const queryStr = buildShopifyQuery();
//       const result = await getProducts({
//         query: queryStr,
//         first: itemsPerPage,
//         after: cursor || undefined
//       });

//       setProducts(result.products);
//       setPageInfo(result.pageInfo);

//       // Manage cursor history for the "Back" button
//       if (!isGoingBack && result.pageInfo.endCursor) {
//         setCursorHistory(prev => [...prev, result.pageInfo.endCursor!]);
//       }
//     } catch (error) {
//       console.error("Failed to fetch products", error);
//     } finally {
//       setIsLoading(false);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   }, [buildShopifyQuery, itemsPerPage]);

//   // Initial load and filter change observer
//   useEffect(() => {
//     setCurrentPage(1);
//     setCursorHistory([]); // Reset history on filter change
//     fetchPageData(null);
//   }, [categoryFromUrl, activeFilters, fetchPageData]);

//   const handleNextPage = () => {
//     if (pageInfo.hasNextPage) {
//       setCurrentPage(prev => prev + 1);
//       fetchPageData(pageInfo.endCursor);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       const newPage = currentPage - 1;
//       setCurrentPage(newPage);
//       // If we go back to page 1, pass null. Otherwise, pass the cursor of the page *before* the one we want.
//       const previousCursor = newPage === 1 ? null : cursorHistory[newPage - 2];
      
//       // Remove the last cursor from history since we are stepping back
//       setCursorHistory(prev => prev.slice(0, -1));
//       fetchPageData(previousCursor, true);
//     }
//   };

//   // Process data for rendering (Handles Variant "Explosion" if needed)
//   const displayItems = useMemo(() => {
//     if (products.length > 0 && products.length < 3) {
//       return products.flatMap(product => {
//         if (!product.combinations?.length) return [{ ...product, isExploded: false }];
        
//         const relevantCombos = product.combinations.filter(combo => {
//           if (activeFilters.sizes.length === 0) return true;
//           return activeFilters.sizes.includes(combo.size);
//         });

//         return relevantCombos.map(combo => ({
//           ...product,
//           id: `${product.id}-${combo.id}`,
//           originalId: product.id,
//           variantName: combo.size,
//           price: combo.price,
//           image: combo.image, 
//           isExploded: true,
//           preSelectedCombo: combo,
//           slug: `${product.handle}-${combo.id}`
//         }));
//       });
//     }
//     return products.map(p => ({ ...p, isExploded: false }));
//   }, [products, activeFilters.sizes]);


//   const handleCategoryChange = (cat: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     if (cat === 'Shop All') params.delete('category');
//     else params.set('category', cat);
    
//     router.push(`${pathname}?${params.toString()}`);
//     setActiveFilters({ styles: [], sizes: [], placements: [] });
//   };

//   const toggleFilter = (group: keyof ActiveFilters | 'RESET', value?: string) => {
//     if (group === 'RESET') {
//       setActiveFilters({ styles: [], sizes: [], placements: [] });
//       return;
//     }
//     if (!value) return;

//     setActiveFilters(prev => {
//       const currentGroup = prev[group as keyof ActiveFilters];
//       const isSelected = currentGroup.includes(value);
//       return {
//         ...prev,
//         [group]: isSelected 
//           ? currentGroup.filter(item => item !== value) 
//           : [...currentGroup, value]
//       };
//     });
//   };

//   return (
//     <div className="bg-slate-50 min-h-screen text-slate-950 selection:bg-slate-900 selection:text-white mt-20 md:mt-20">
      
//       {/* MOBILE DRAWER */}
//       <div className={clsx(
//         "fixed inset-0 z-[60] bg-slate-950/40 backdrop-blur-sm transition-opacity lg:hidden",
//         isFilterDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//       )} onClick={() => setFilterDrawerOpen(false)} />
      
//       <div className={clsx(
//         "fixed right-0 top-0 h-full w-[300px] bg-white z-[70] shadow-2xl transition-transform duration-500 lg:hidden border-l-2 border-slate-950",
//         isFilterDrawerOpen ? "translate-x-0" : "translate-x-full"
//       )}>
//         <div className="p-6 h-full flex flex-col">
//           <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-slate-100 shrink-0">
//             <h2 className="text-[12px] font-black uppercase tracking-[0.2em]">Filters</h2>
//             <button onClick={() => setFilterDrawerOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//           <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
//             <FilterSidebar filters={GLOBAL_FILTER_OPTIONS} activeFilters={activeFilters} onToggle={toggleFilter} />
//           </div>
//         </div>
//       </div>

//       {/* TOP NAVIGATION */}
//       <nav className="sticky top-0 z-40 bg-white border-b-2 border-slate-100">
//         <div className="container max-w-[1400px] mx-auto px-4 py-4 flex items-center justify-between gap-4">
//           <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
//             {GLOBAL_FILTER_OPTIONS.categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => handleCategoryChange(cat)}
//                 className={clsx(
//                   "px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border-2",
//                   categoryFromUrl === cat 
//                     ? "bg-slate-950 text-white border-slate-950" 
//                     : "bg-white text-slate-500 border-slate-200 hover:border-slate-950 hover:text-slate-950"
//                 )}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//           <button 
//             onClick={() => setFilterDrawerOpen(true)} 
//             className="lg:hidden p-2.5 bg-white border-2 border-slate-200 hover:border-slate-950 text-slate-950 transition-colors"
//           >
//             <SlidersHorizontal className="w-4 h-4" />
//           </button>
//         </div>
//       </nav>

//       {/* MAIN CONTENT AREA */}
//       <main className="container max-w-[1400px] mx-auto px-4 py-12">
//         <div className="flex flex-col lg:flex-row gap-12">
          
//           {/* DESKTOP SIDEBAR */}
//           <aside className="hidden lg:block w-64 shrink-0">
//             <div className="sticky top-28 space-y-8 max-h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar pb-4 pr-6 border-r-2 border-slate-100">
//               <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-950 mb-8 pb-4 border-b-2 border-slate-950">
//                 Filters
//               </span>
//               <FilterSidebar filters={GLOBAL_FILTER_OPTIONS} activeFilters={activeFilters} onToggle={toggleFilter} />
//             </div>
//           </aside>

//           {/* PRODUCT LISTINGS */}
//           <div className="flex-grow relative min-h-[500px]">
//             {/* HEADER SECTION */}
//             <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-6 border-b border-gray-100">
//               <div>
//                 <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight capitalize">
//                   {categoryFromUrl}
//                 </h1>
//                 {!isLoading && (
//                   <p className="text-sm font-medium text-gray-500 mt-2">
//                     Page <span className="text-gray-900 font-bold">{currentPage}</span>
//                   </p>
//                 )}
//               </div>
              
//               <div className="flex items-center self-start sm:self-auto gap-1 bg-gray-50/80 border border-gray-200 p-1 rounded-xl shadow-sm">
//                 <button 
//                   onClick={() => setViewMode('grid')} 
//                   className={clsx("p-2.5 rounded-lg transition-all", viewMode === 'grid' ? "bg-white text-[#fe8204] shadow-sm" : "text-gray-400 hover:text-gray-800")}
//                 >
//                   <LayoutGrid className="w-4 h-4" />
//                 </button>
//                 <button 
//                   onClick={() => setViewMode('list')} 
//                   className={clsx("p-2.5 rounded-lg transition-all", viewMode === 'list' ? "bg-white text-[#fe8204] shadow-sm" : "text-gray-400 hover:text-gray-800")}
//                 >
//                   <List className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>

//             {/* LOADING STATE OVERLAY */}
//             {isLoading ? (
//                <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[2px] z-10 rounded-3xl">
//                   <Loader2 className="w-10 h-10 text-[#fe8204] animate-spin" />
//                </div>
//             ) : null}

//             {/* PRODUCTS LAYOUT */}
//             {!isLoading && displayItems.length > 0 ? (
//               <div className={clsx(
//                 "p-4 sm:p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-gray-50 via-white to-[#fe8204]/5 border border-gray-100 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]",
//                 "grid gap-6 sm:gap-8",
//                 viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
//               )}>
//                 {displayItems.map((item) => (
//                   <ProductCard key={item.id} item={item} viewMode={viewMode} page="collections" />
//                 ))}
//               </div>
//             ) : (!isLoading && displayItems.length === 0) ? (
//               <div className="py-24 text-center bg-gray-50/50 border border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center">
//                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                   <RefreshCcw className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <p className="text-gray-900 font-bold text-lg mb-2">No products found</p>
//                 <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">We couldn't find anything matching your current filters. Try adjusting them to see more results.</p>
//                 <button 
//                   onClick={() => toggleFilter('RESET')} 
//                   className="px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-[#fe8204] transition-colors shadow-md"
//                 >
//                   Clear All Filters
//                 </button>
//               </div>
//             ) : null}

//             {/* SERVER PAGINATION */}
//             {(!isLoading && (currentPage > 1 || pageInfo.hasNextPage)) && (
//               <div className="mt-12 flex items-center justify-center gap-4">
//                 <button 
//                   disabled={currentPage === 1} 
//                   onClick={handlePrevPage} 
//                   className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#fe8204] hover:text-[#fe8204] transition-all text-gray-600 shadow-sm"
//                 >
//                   <ChevronLeft className="w-5 h-5" />
//                 </button>
                
//                 <span className="text-sm font-bold text-gray-600">
//                   Page {currentPage}
//                 </span>
                
//                 <button 
//                   disabled={!pageInfo.hasNextPage} 
//                   onClick={handleNextPage} 
//                   className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#fe8204] hover:text-[#fe8204] transition-all text-gray-600 shadow-sm"
//                 >
//                   <ChevronRight className="w-5 h-5" />
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }




// // // // 'use client';

// // // // import React, { useState } from 'react';
// // // // import Link from 'next/link';
// // // // import { ChevronDown, ShoppingBag, Loader2 } from 'lucide-react';
// // // // import clsx from 'clsx';
// // // // import Image from 'next/image';
// // // // import { toast } from 'sonner';
// // // // import { useCart } from '@/src/context/CartContext';
// // // // import { FormattedProduct, Variant } from '@/src/lib/shopify'; // Adjust path if needed

// // // // interface ProductCardProps {
// // // //   item: FormattedProduct;
// // // //   viewMode: 'grid' | 'list';
// // // //   page: string; 
// // // // }

// // // // export function ProductCard({ item, viewMode, page }: ProductCardProps) {
// // // //   const isList = viewMode === 'list';
// // // //   const variants = item.allVariants || [];
   
// // // //   const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
// // // //     variants.length > 0 ? variants[0] : null
// // // //   );

// // // //   const [isAdding, setIsAdding] = useState(false);
// // // //   const { addToCart } = useCart();

// // // //   const price = selectedVariant ? selectedVariant.price : item.checkout.price;
// // // //   const image = item.media.featuredImage || '/placeholder.png';
// // // //   const slug = encodeURIComponent(item.slug.toLowerCase().replace(/\s+/g, '-'));
// // // //   const productUrl = `/${page}/${slug}`;
// // // //   const displayBadge = item.styling.badges?.[0]; // Show the highest priority badge

// // // //   const handleAddToCart = async (e: React.MouseEvent) => {
// // // //     e.preventDefault(); 
    
// // // //     if (!selectedVariant?.variantId) {
// // // //         toast.error('Please select an option first.');
// // // //         return;
// // // //     }

// // // //     setIsAdding(true);
// // // //     try {
// // // //       await addToCart({
// // // //         variantId: selectedVariant.variantId,
// // // //         productId: item.id,
// // // //         name: item.title,
// // // //         variantName: selectedVariant.title,
// // // //         price: Number(selectedVariant.price),
// // // //         image: image,
// // // //         quantity: 1
// // // //       });
// // // //       toast.success('Added to cart!');
// // // //     } catch (error) {
// // // //       toast.error('Failed to add to cart. Please try again.');
// // // //     } finally {
// // // //       setIsAdding(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className={clsx(
// // // //       "group relative bg-white border border-gray-100/80 shadow-sm rounded-2xl overflow-hidden transition-all duration-300 ease-in-out",
// // // //       "hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:border-gray-200",
// // // //       isList ? "flex flex-col sm:flex-row" : "flex flex-col"
// // // //     )}>
      
// // // //       <div className={clsx(
// // // //         "relative overflow-hidden bg-gray-50/50",
// // // //         isList ? "w-full sm:w-48 sm:min-w-[12rem] h-56 sm:h-auto shrink-0" : "w-full aspect-[4/5]"
// // // //       )}>
// // // //         {displayBadge && (
// // // //           <div className="absolute top-3 left-3 z-20">
// // // //             <span 
// // // //               style={{ backgroundColor: displayBadge.color || '#fe8204' }}
// // // //               className="text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow-sm tracking-wider"
// // // //             >
// // // //               {displayBadge.label}
// // // //             </span>
// // // //           </div>
// // // //         )}

// // // //         <Link href={productUrl} prefetch={false} className="block w-full h-full relative">
// // // //             <Image
// // // //                 src={image}
// // // //                 alt={item.title}
// // // //                 fill
// // // //                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// // // //                 className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
// // // //             />
// // // //             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
// // // //         </Link>
// // // //       </div>

// // // //       <div className={clsx("flex flex-col flex-grow p-5 sm:p-6", isList ? "justify-center" : "")}>
// // // //         {item.attributes.themes?.[0] && (
// // // //           <span className="text-xs font-semibold text-[#fe8204] tracking-wider uppercase mb-1.5">
// // // //             {item.attributes.themes[0]}
// // // //           </span>
// // // //         )}
        
// // // //         <Link href={productUrl} prefetch={false} className="block mb-1">
// // // //             <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-[#fe8204] transition-colors line-clamp-2">
// // // //               {item.title}
// // // //             </h3>
// // // //         </Link>

// // // //         <div className="flex-grow" /> 

// // // //         <div className={clsx("flex flex-col gap-4 mt-4 mb-5", isList ? "sm:flex-row sm:items-center sm:justify-between" : "")}>
// // // //           <div className="flex items-end gap-2">
// // // //             <p className="text-2xl font-extrabold text-gray-900">
// // // //               ${Number(price).toFixed(2)}
// // // //             </p>
// // // //             {selectedVariant?.compareAtPrice && (
// // // //                <p className="text-sm text-gray-400 line-through mb-1 font-medium">
// // // //                  ${Number(selectedVariant.compareAtPrice).toFixed(2)}
// // // //                </p>
// // // //             )}
// // // //           </div>
          
// // // //           {variants.length > 1 && (
// // // //             <div className="relative w-full sm:max-w-[140px]">
// // // //               <select 
// // // //                 className="w-full appearance-none bg-gray-50/80 text-sm font-semibold text-gray-700 py-2.5 pl-4 pr-10 border border-gray-200 rounded-xl outline-none cursor-pointer hover:bg-white hover:border-gray-300 focus:ring-2 focus:ring-[#fe8204]/20 focus:border-[#fe8204] transition-all"
// // // //                 value={selectedVariant ? selectedVariant.variantId : ""}
// // // //                 onChange={(e) => setSelectedVariant(variants.find(v => v.variantId === e.target.value) || null)}
// // // //               >
// // // //                 <option value="" disabled>Select Option</option>
// // // //                 {variants.map(v => <option key={v.variantId} value={v.variantId}>{v.title}</option>)}
// // // //               </select>
// // // //               <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
// // // //                 <ChevronDown className="w-4 h-4" />
// // // //               </div>
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         <div className="grid grid-cols-2 gap-2.5">
// // // //           <button 
// // // //             onClick={handleAddToCart}
// // // //             disabled={!item.inventory.availableForSale || !selectedVariant || isAdding}
// // // //             className={clsx(
// // // //               "flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-sm font-bold transition-all duration-300",
// // // //               (!item.inventory.availableForSale || !selectedVariant)
// // // //                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
// // // //                 : "bg-[#fe8204] hover:bg-[#e07300] text-white shadow-md shadow-[#fe8204]/20 hover:shadow-[#fe8204]/40 disabled:opacity-70"
// // // //             )}
// // // //           >
// // // //             {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : (!item.inventory.availableForSale) ? 'Sold Out' : 'Add to Cart'} 
// // // //             {(!isAdding && item.inventory.availableForSale) && <ShoppingBag className="w-4 h-4" />}
// // // //           </button>
          
// // // //           <Link 
// // // //             href={productUrl} 
// // // //             prefetch={false}
// // // //             className="flex items-center justify-center py-3 px-2 rounded-xl bg-transparent text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-[#fe8204] hover:border-[#fe8204]/30 font-semibold text-sm transition-all duration-300"
// // // //           >
// // // //             View Details
// // // //           </Link>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // 'use client';

// // // import React, { useState } from 'react';
// // // import Link from 'next/link';
// // // import { ChevronDown, ShoppingBag, Loader2, ArrowUpRight } from 'lucide-react';
// // // import clsx from 'clsx';
// // // import Image from 'next/image';
// // // import { toast } from 'sonner';
// // // import { useCart } from '@/src/context/CartContext';
// // // import { FormattedProduct, Variant } from '@/src/lib/shopify';

// // // interface ProductCardProps {
// // //   item: FormattedProduct;
// // //   viewMode: 'grid' | 'list';
// // //   page: string; 
// // // }

// // // export function ProductCard({ item, viewMode, page }: ProductCardProps) {
// // //   const isList = viewMode === 'list';
// // //   const variants = item.allVariants || [];
   
// // //   const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
// // //     variants.length > 0 ? variants[0] : null
// // //   );

// // //   const [isAdding, setIsAdding] = useState(false);
// // //   const { addToCart } = useCart();

// // //   const price = selectedVariant ? selectedVariant.price : item.checkout.price;
// // //   const image = item.media.featuredImage || '/placeholder.png';
// // //   const slug = encodeURIComponent(item.slug.toLowerCase().replace(/\s+/g, '-'));
// // //   const productUrl = `/${page}/${slug}`;
// // //   const displayBadge = item.styling.badges?.[0]; 

// // //   const handleAddToCart = async (e: React.MouseEvent) => {
// // //     e.preventDefault(); 
    
// // //     if (!selectedVariant?.variantId) {
// // //         toast.error('Please select an option first.');
// // //         return;
// // //     }

// // //     setIsAdding(true);
// // //     try {
// // //       await addToCart({
// // //         variantId: selectedVariant.variantId,
// // //         productId: item.id,
// // //         name: item.title,
// // //         variantName: selectedVariant.title,
// // //         price: Number(selectedVariant.price),
// // //         image: image,
// // //         quantity: 1
// // //       });
// // //       toast.success('Added to cart!');
// // //     } catch (error) {
// // //       toast.error('Failed to add to cart. Please try again.');
// // //     } finally {
// // //       setIsAdding(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className={clsx(
// // //       "group relative bg-white rounded-[24px] p-3 transition-all duration-500 ease-out",
// // //       "border border-gray-200/60 shadow-sm hover:shadow-2xl hover:shadow-[#fe8204]/10 hover:-translate-y-2 hover:border-[#fe8204]/30",
// // //       isList ? "flex flex-col sm:flex-row gap-6" : "flex flex-col"
// // //     )}>
      
// // //       {/* Image Container */}
// // //       <div className={clsx(
// // //         "relative overflow-hidden rounded-[18px] bg-gray-50",
// // //         isList ? "w-full sm:w-64 sm:min-w-[16rem] shrink-0 aspect-square" : "w-full aspect-square"
// // //       )}>
// // //         {/* Modern Floating Badge */}
// // //         {displayBadge && (
// // //           <div className="absolute top-3 left-3 z-20">
// // //             <span 
// // //               style={{ backgroundColor: displayBadge.color || '#fe8204' }}
// // //               className="text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm tracking-widest"
// // //             >
// // //               {displayBadge.label}
// // //             </span>
// // //           </div>
// // //         )}

// // //         <Link href={productUrl} prefetch={false} className="block w-full h-full relative">
// // //             <Image
// // //                 src={image}
// // //                 alt={item.title}
// // //                 fill
// // //                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// // //                 className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
// // //             />
// // //             {/* Subtle Gradient Overlay on Hover */}
// // //             <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
// // //         </Link>
// // //       </div>

// // //       {/* Content Container */}
// // //       <div className={clsx(
// // //         "flex flex-col flex-grow",
// // //         isList ? "justify-center py-4 pr-4" : "p-3 pt-4"
// // //       )}>
        
// // //         {/* Theme Tag */}
// // //         {item.attributes.themes?.[0] && (
// // //           <span className="text-[11px] font-bold text-[#fe8204] tracking-[0.15em] uppercase mb-2 block">
// // //             {item.attributes.themes[0]}
// // //           </span>
// // //         )}
        
// // //         {/* Title */}
// // //         <Link href={productUrl} prefetch={false} className="block mb-2">
// // //             <h3 className="text-lg font-extrabold text-gray-900 leading-snug group-hover:text-[#fe8204] transition-colors line-clamp-2">
// // //               {item.title}
// // //             </h3>
// // //         </Link>

// // //         {/* Flexible spacer pushes bottom content down if title is short */}
// // //         <div className="flex-grow" /> 

// // //         {/* Price & Variant Row */}
// // //         <div className={clsx(
// // //           "flex items-center justify-between gap-4 mt-4 mb-5",
// // //           isList ? "sm:justify-start sm:gap-8" : ""
// // //         )}>
// // //           <div className="flex flex-col">
// // //             <div className="flex items-center gap-2">
// // //               <p className="text-2xl font-black text-gray-900 tracking-tight">
// // //                 ${Number(price).toFixed(2)}
// // //               </p>
// // //             </div>
// // //             {selectedVariant?.compareAtPrice && (
// // //               <p className="text-xs text-gray-400 line-through font-semibold mt-0.5">
// // //                 Originally ${Number(selectedVariant.compareAtPrice).toFixed(2)}
// // //               </p>
// // //             )}
// // //           </div>
          
// // //           {variants.length > 1 && (
// // //             <div className="relative w-[130px] shrink-0">
// // //               <select 
// // //                 className="w-full appearance-none bg-gray-50 text-xs font-bold text-gray-700 py-2.5 pl-4 pr-8 border border-gray-200/80 rounded-full outline-none cursor-pointer hover:bg-gray-100 hover:border-gray-300 focus:ring-4 focus:ring-[#fe8204]/10 focus:border-[#fe8204] transition-all"
// // //                 value={selectedVariant ? selectedVariant.variantId : ""}
// // //                 onChange={(e) => setSelectedVariant(variants.find(v => v.variantId === e.target.value) || null)}
// // //               >
// // //                 <option value="" disabled>Select</option>
// // //                 {variants.map(v => <option key={v.variantId} value={v.variantId}>{v.title}</option>)}
// // //               </select>
// // //               <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
// // //                 <ChevronDown className="w-3.5 h-3.5" />
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Action Buttons */}
// // //         <div className="flex gap-3">
// // //           <button 
// // //             onClick={handleAddToCart}
// // //             disabled={!item.inventory.availableForSale || !selectedVariant || isAdding}
// // //             className={clsx(
// // //               "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 active:scale-[0.98]",
// // //               (!item.inventory.availableForSale || !selectedVariant)
// // //                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
// // //                 : "bg-[#fe8204] text-white shadow-[0_4px_14px_0_rgba(254,130,4,0.25)] hover:shadow-[0_6px_20px_rgba(254,130,4,0.4)] hover:bg-[#eb7703] hover:-translate-y-0.5"
// // //             )}
// // //           >
// // //             {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : (!item.inventory.availableForSale) ? 'Sold Out' : 'Add to Cart'} 
// // //             {(!isAdding && item.inventory.availableForSale) && <ShoppingBag className="w-4 h-4" />}
// // //           </button>
          
// // //           <Link 
// // //             href={productUrl} 
// // //             prefetch={false}
// // //             className="flex items-center justify-center py-3 px-4 rounded-xl bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-[#fe8204] font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
// // //             title="View Details"
// // //           >
// // //             <ArrowUpRight className="w-5 h-5" />
// // //           </Link>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }





// // 'use client';

// // import React, { useState } from 'react';
// // import Link from 'next/link';
// // import { ChevronDown, ShoppingBag, Loader2, ArrowRight } from 'lucide-react';
// // import clsx from 'clsx';
// // import Image from 'next/image';
// // import { toast } from 'sonner';
// // import { useCart } from '@/src/context/CartContext';
// // import { FormattedProduct, Variant } from '@/src/lib/shopify';

// // interface ProductCardProps {
// //   item: FormattedProduct;
// //   viewMode: 'grid' | 'list';
// //   page: string; 
// // }

// // export function ProductCard({ item, viewMode, page }: ProductCardProps) {
// //   const isList = viewMode === 'list';
// //   const variants = item.allVariants || [];
   
// //   const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
// //     variants.length > 0 ? variants[0] : null
// //   );

// //   const [isAdding, setIsAdding] = useState(false);
// //   const { addToCart } = useCart();

// //   const price = selectedVariant ? selectedVariant.price : item.checkout.price;
// //   const image = item.media.featuredImage || '/placeholder.png';
// //   const slug = encodeURIComponent(item.slug.toLowerCase().replace(/\s+/g, '-'));
// //   const productUrl = `/${page}/${slug}`;
// //   const displayBadge = item.styling.badges?.[0]; 

// //   const handleAddToCart = async (e: React.MouseEvent) => {
// //     e.preventDefault(); 
    
// //     if (!selectedVariant?.variantId) {
// //         toast.error('Please select an option first.');
// //         return;
// //     }

// //     setIsAdding(true);
// //     try {
// //       await addToCart({
// //         variantId: selectedVariant.variantId,
// //         productId: item.id,
// //         name: item.title,
// //         variantName: selectedVariant.title,
// //         price: Number(selectedVariant.price),
// //         image: image,
// //         quantity: 1
// //       });
// //       toast.success('Added to ink station!');
// //     } catch (error) {
// //       toast.error('Failed to add. Please try again.');
// //     } finally {
// //       setIsAdding(false);
// //     }
// //   };

// //   return (
// //     <div className={clsx(
// //       "group relative w-full rounded-[28px] p-2 transition-all duration-500",
// //       "bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden",
// //       "hover:border-[#fe8204]/50 hover:shadow-[0_0_40px_-10px_rgba(254,130,4,0.3)] hover:-translate-y-2",
// //       isList ? "flex flex-col sm:flex-row gap-4" : "flex flex-col"
// //     )}>
      
// //       {/* Colorful Ambient Glow Blob */}
// //       <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#fe8204] opacity-20 blur-[80px] rounded-full pointer-events-none group-hover:opacity-40 transition-opacity duration-700" />
// //       <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600 opacity-10 blur-[80px] rounded-full pointer-events-none group-hover:opacity-20 transition-opacity duration-700" />

// //       {/* Image Container - The White Canvas */}
// //       <div className={clsx(
// //         "relative overflow-hidden rounded-[22px] bg-white z-10",
// //         isList ? "w-full sm:w-64 sm:min-w-[16rem] shrink-0 aspect-square" : "w-full aspect-square"
// //       )}>
// //         {/* Edgy Floating Badge */}
// //         {displayBadge && (
// //           <div className="absolute top-4 left-4 z-20">
// //             <span 
// //               style={{ backgroundColor: displayBadge.color || '#fe8204' }}
// //               className="text-black text-[10px] font-black uppercase px-3.5 py-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] tracking-widest"
// //             >
// //               {displayBadge.label}
// //             </span>
// //           </div>
// //         )}

// //         <Link href={productUrl} prefetch={false} className="block w-full h-full relative p-6">
// //             <Image
// //                 src={image}
// //                 alt={item.title}
// //                 fill
// //                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// //                 className="object-contain p-6 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110 group-hover:-rotate-2"
// //             />
// //         </Link>
// //       </div>

// //       {/* Content Container - Dark Glassmorphism */}
// //       <div className={clsx(
// //         "relative flex flex-col flex-grow z-10",
// //         isList ? "justify-center py-4 pr-6 pl-2" : "p-5 pt-6"
// //       )}>
        
// //         {item.attributes.themes?.[0] && (
// //           <span className="text-[10px] font-black text-[#fe8204] tracking-[0.2em] uppercase mb-2.5 block drop-shadow-[0_0_8px_rgba(254,130,4,0.4)]">
// //             // {item.attributes.themes[0]}
// //           </span>
// //         )}
        
// //         <Link href={productUrl} prefetch={false} className="block mb-2">
// //             <h3 className="text-xl font-black text-zinc-100 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#fe8204] group-hover:to-amber-300 transition-all line-clamp-2">
// //               {item.title}
// //             </h3>
// //         </Link>

// //         <div className="flex-grow" /> 

// //         {/* Price & Variant Glass Panel */}
// //         <div className={clsx(
// //           "flex items-center justify-between gap-3 mt-5 mb-5 p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-md",
// //           isList ? "sm:justify-start sm:gap-6" : ""
// //         )}>
// //           <div className="flex flex-col pl-2">
// //             <div className="flex items-center gap-2">
// //               <p className="text-2xl font-black text-white tracking-tighter">
// //                 ${Number(price).toFixed(2)}
// //               </p>
// //             </div>
// //             {selectedVariant?.compareAtPrice && (
// //               <p className="text-[11px] text-zinc-500 line-through font-bold mt-0.5">
// //                 ${Number(selectedVariant.compareAtPrice).toFixed(2)}
// //               </p>
// //             )}
// //           </div>
          
// //           {variants.length > 1 && (
// //             <div className="relative w-[120px] shrink-0">
// //               <select 
// //                 className="w-full appearance-none bg-zinc-950 text-[11px] font-bold text-zinc-300 py-2.5 pl-4 pr-8 border border-zinc-700 rounded-xl outline-none cursor-pointer hover:border-[#fe8204]/60 focus:border-[#fe8204] focus:ring-1 focus:ring-[#fe8204] transition-all"
// //                 value={selectedVariant ? selectedVariant.variantId : ""}
// //                 onChange={(e) => setSelectedVariant(variants.find(v => v.variantId === e.target.value) || null)}
// //               >
// //                 <option value="" disabled>Select</option>
// //                 {variants.map(v => <option key={v.variantId} value={v.variantId}>{v.title}</option>)}
// //               </select>
// //               <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
// //                 <ChevronDown className="w-4 h-4" />
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Neon Action Buttons */}
// //         <div className="flex gap-2.5">
// //           <button 
// //             onClick={handleAddToCart}
// //             disabled={!item.inventory.availableForSale || !selectedVariant || isAdding}
// //             className={clsx(
// //               "flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-black uppercase tracking-wide transition-all duration-300 active:scale-95 overflow-hidden relative",
// //               (!item.inventory.availableForSale || !selectedVariant)
// //                 ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
// //                 : "bg-[#fe8204] text-zinc-950 hover:bg-[#ff9a33] shadow-[0_0_20px_rgba(254,130,4,0.3)] hover:shadow-[0_0_30px_rgba(254,130,4,0.6)]"
// //             )}
// //           >
// //             {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : (!item.inventory.availableForSale) ? 'Out of Ink' : 'Add to Cart'} 
// //             {(!isAdding && item.inventory.availableForSale) && <ShoppingBag className="w-4 h-4 mb-0.5" />}
// //           </button>
          
// //           <Link 
// //             href={productUrl} 
// //             prefetch={false}
// //             className="flex items-center justify-center py-3.5 px-4 rounded-xl bg-zinc-900 text-zinc-300 border border-zinc-700 hover:bg-zinc-800 hover:text-white hover:border-zinc-500 font-bold transition-all duration-300 active:scale-95 group/link"
// //             title="View Details"
// //           >
// //             <ArrowRight className="w-5 h-5 group-hover/link:-rotate-45 transition-transform duration-300" />
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { ChevronDown, ShoppingCart, Loader2 } from 'lucide-react';
// import clsx from 'clsx';
// import Image from 'next/image';
// import { toast } from 'sonner';
// import { useCart } from '@/src/context/CartContext';
// import { FormattedProduct, Variant } from '@/src/lib/shopify';

// interface ProductCardProps {
//   item: FormattedProduct;
//   viewMode: 'grid' | 'list';
//   page: string; 
// }

// export function ProductCard({ item, viewMode, page }: ProductCardProps) {
//   const isList = viewMode === 'list';
//   const variants = item.allVariants || [];
   
//   const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
//     variants.length > 0 ? variants[0] : null
//   );

//   const [isAdding, setIsAdding] = useState(false);
//   const { addToCart } = useCart();

//   const price = selectedVariant ? selectedVariant.price : item.checkout.price;
//   const image = item.media.featuredImage || '/placeholder.png';
//   const hoverImage = item.media.hoverImage || image; // Fallback to main image if no hover
  
//   const slug = encodeURIComponent(item.slug.toLowerCase().replace(/\s+/g, '-'));
//   const productUrl = `/${page}/${slug}`;
  
//   const displayBadge = item.styling.badges?.[0];
//   // Use the mapped UI color, or fallback to a vibrant default
//   const cardColor = item.styling.uiBackgroundColor || '#00C4CC'; 

//   const handleAddToCart = async (e: React.MouseEvent) => {
//     e.preventDefault(); 
    
//     if (!selectedVariant?.variantId) {
//         toast.error('Please select an option first.');
//         return;
//     }

//     setIsAdding(true);
//     try {
//       await addToCart({
//         variantId: selectedVariant.variantId,
//         productId: item.id,
//         name: item.title,
//         variantName: selectedVariant.title,
//         price: Number(selectedVariant.price),
//         image: image,
//         quantity: 1
//       });
//       toast.success('Added to cart!');
//     } catch (error) {
//       toast.error('Failed to add to cart. Please try again.');
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   return (
//     <div className={clsx(
//       "group relative bg-[#fdfdfd] rounded-[32px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
//       "shadow-[0_8px_24px_rgba(149,157,165,0.15)] hover:shadow-[0_20px_40px_rgba(149,157,165,0.25)] hover:-translate-y-2",
//       isList ? "flex flex-col sm:flex-row h-auto sm:h-64" : "flex flex-col w-full"
//     )}>
      
//       {/* 1. Geometric Colorful Background Background (Diagonal Cut) */}
//       <div 
//         className={clsx(
//             "absolute top-0 left-0 w-full z-0 transition-all duration-700 ease-in-out group-hover:scale-105 origin-top",
//             isList ? "h-full w-1/2 clip-path-slant-right" : "h-[65%] clip-path-slant-bottom"
//         )}
//         style={{ 
//             backgroundColor: cardColor,
//             // Inline clip-paths to create that sharp, modern flat-design angle
//             clipPath: isList 
//                 ? 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' 
//                 : 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' 
//         }}
//       />

//       {/* 2. Top Elements: Badges and Floating Price */}
//       <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-30 pointer-events-none">
//         {/* Badge */}
//         <div className="flex flex-col gap-2">
//             {displayBadge && (
//             <span className="bg-white text-gray-900 text-[11px] font-black uppercase px-3 py-1.5 rounded-full shadow-sm tracking-wider">
//                 {displayBadge.label}
//             </span>
//             )}
//             {item.checkout.discountPercentage && item.checkout.discountPercentage > 0 ? (
//                  <span className="bg-[#FF3366] text-white text-[11px] font-black uppercase px-3 py-1.5 rounded-full shadow-sm tracking-wider w-fit">
//                  -{item.checkout.discountPercentage}%
//                </span>
//             ) : null}
//         </div>

//         {/* Floating Price Circle */}
//         <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
//            <span className="text-[17px] font-black text-gray-900 tracking-tighter">
//              ${Number(price).toFixed(0)}
//            </span>
//         </div>
//       </div>

//       {/* 3. The Product Image (Inside a Perfect White Circle) */}
//       <div className={clsx(
//         "relative z-20 flex items-center justify-center shrink-0",
//         isList ? "w-64 h-full p-6" : "w-full pt-16 pb-6 px-6"
//       )}>
//         <Link href={productUrl} prefetch={false} className="relative block w-48 h-48 bg-white rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.08)] p-4 overflow-hidden group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:-translate-y-3">
            
//             {/* Main Image */}
//             <Image
//                 src={image}
//                 alt={item.title}
//                 fill
//                 sizes="(max-width: 768px) 100vw, 33vw"
//                 className="object-contain p-4 transition-all duration-700 ease-in-out group-hover:opacity-0 group-hover:scale-90"
//             />
            
//             {/* Hover Image (Reveals smoothly) */}
//             <Image
//                 src={hoverImage}
//                 alt={`${item.title} alternate view`}
//                 fill
//                 sizes="(max-width: 768px) 100vw, 33vw"
//                 className="object-contain p-4 opacity-0 scale-110 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-100"
//             />
//         </Link>
//       </div>

//       {/* 4. White Content Area */}
//       <div className={clsx(
//         "relative z-20 flex flex-col flex-grow bg-transparent",
//         isList ? "justify-center pr-8 py-6" : "px-6 pb-6 pt-2"
//       )}>
        
//         <div className="text-center mb-4">
//             {item.attributes.themes?.[0] && (
//                 <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-1.5 block">
//                 {item.attributes.themes[0]}
//                 </span>
//             )}
            
//             <Link href={productUrl} prefetch={false}>
//                 <h3 className="text-[19px] font-black text-gray-900 leading-tight hover:text-gray-600 transition-colors line-clamp-2">
//                 {item.title}
//                 </h3>
//             </Link>
//         </div>

//         <div className="flex-grow" /> 

//         {/* Flat Design Controls Area */}
//         <div className={clsx("flex flex-col gap-4 mt-2", isList ? "sm:flex-row sm:items-center" : "")}>
          
//           {/* Variant Selector */}
//           {variants.length > 1 && (
//             <div className="relative w-full">
//               <select 
//                 className="w-full appearance-none bg-gray-50 text-[13px] font-bold text-gray-700 py-3 pl-5 pr-10 border-2 border-transparent rounded-full outline-none cursor-pointer hover:bg-gray-100 focus:border-gray-200 focus:bg-white transition-colors"
//                 value={selectedVariant ? selectedVariant.variantId : ""}
//                 onChange={(e) => setSelectedVariant(variants.find(v => v.variantId === e.target.value) || null)}
//               >
//                 <option value="" disabled>Select Option</option>
//                 {variants.map(v => <option key={v.variantId} value={v.variantId}>{v.title}</option>)}
//               </select>
//               <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
//                 <ChevronDown className="w-4 h-4 stroke-[3]" />
//               </div>
//             </div>
//           )}

//           {/* High-Contrast Action Button */}
//           <button 
//             onClick={handleAddToCart}
//             disabled={!item.inventory.availableForSale || !selectedVariant || isAdding}
//             className={clsx(
//               "w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-[13px] font-black uppercase tracking-wide transition-all duration-300 transform active:scale-[0.97]",
//               (!item.inventory.availableForSale || !selectedVariant)
//                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                 : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5"
//             )}
//           >
//             {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : (!item.inventory.availableForSale) ? 'Sold Out' : 'Add to Cart'} 
//             {(!isAdding && item.inventory.availableForSale) && <ShoppingCart className="w-4 h-4" />}
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }


// "use client";

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   ShoppingCart, Plus, Minus, Share2, ZoomIn, 
//   CheckCircle2, Droplets, ArrowLeft, X, Zap
// } from 'lucide-react';
// import clsx from 'clsx';
// import { useCart } from '@/src/context/CartContext';
// import { toast } from 'sonner';
// import { Loader2 } from 'lucide-react';
// import { useRouter } from 'next/navigation'; // <-- ADDED

// interface Combination {
//   id: string;
//   price: number | string;
//   image: string;
//   size: string;
//   stock: number;
// }

// interface Product {
//   id: string;
//   name: string;
//   category: string;
//   style?: string;
//   price: number | string;
//   image: string;
//   combinations?: Combination[];
//   placements?: string[];
//   productColor?: string;
//   badge?: string | null;
// }

// interface TattooProductDetailProps {
//   product: Product;
//   onAddToCart?: (variantId: string, quantity: number) => void;
//   onBuyNow?: (variantId: string, quantity: number) => void;
//   onBack?: () => void;
// }

// export default function TattooProductDetail({ 
//   product, 
//   onAddToCart, 
//   onBuyNow, 
//   onBack 
// }: TattooProductDetailProps) {
//   const router = useRouter();
//   const combinations = product?.combinations || [];
//   const [activeVariant, setActiveVariant] = useState<Combination | null>(combinations[0] || null);
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState<'details' | 'care'>('details');
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [isAdding, setIsAdding] = useState(false);
//   const [isBuying, setIsBuying] = useState(false);
//   const { addToCart, setCartOpen } = useCart();
//   const themeColor = product?.productColor || '#171717';
//   const displayImage = activeVariant?.image || product?.image;
//   const currentPrice = activeVariant?.price || product?.price;
//   const currentStock = activeVariant?.stock || 0;

//   const handleShare = async () => {
//     const shareData = {
//       title: `${product?.name} | Tattoo`,
//       text: `Check out this awesome tattoo: ${product?.name}`,
//       url: typeof window !== 'undefined' ? window.location.href : '',
//     };
    
//     if (typeof navigator !== 'undefined' && navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.log('Error sharing', err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       alert('Link copied to clipboard!'); 
//     }
//   };

// const handleAddToCart = async () => {
//     if (!activeVariant || currentStock === 0) return;
//     setIsAdding(true);
//     try {
//       await addToCart({
//         variantId: activeVariant.id,
//         productId: product.id,
//         name: product.name,
//         variantName: activeVariant.size,
//         price: Number(activeVariant.price),
//         image: activeVariant.image,
//         quantity: quantity
//       });
//       // Reset quantity after adding
//       setQuantity(1);
//     } catch (error) {
//       toast.error('Failed to add item to cart.');
//     } finally {
//       setIsAdding(false);
//     }
//   };

// const handleBuyNow = async () => {
//     if (!activeVariant || currentStock === 0) return;
//     setIsBuying(true);
//     try {
//       // 1. Add the item to the cart
//       await addToCart({
//         variantId: activeVariant.id,
//         productId: product.id,
//         name: product.name,
//         variantName: activeVariant.size,
//         price: Number(activeVariant.price),
//         image: activeVariant.image,
//         quantity: quantity
//       });
      
//       // 2. Once Shopify API is integrated, you will generate a checkoutURL here
//       // const checkoutUrl = await createShopifyCheckout(cartId);
//       // window.location.href = checkoutUrl;
      
//       // For now, redirect to the local cart/checkout page or open cart drawer
//       toast.loading('Redirecting to checkout...', { duration: 1500 });
//       setTimeout(() => {
//         router.push('/checkout'); // Adjust this to your checkout route
//       }, 1000);
      
//     } catch (error) {
//       toast.error('Failed to process Buy Now.');
//       setIsBuying(false);
//     }
//   };

//   if (!product) return null; 

//   return (
//     <div className="bg-white min-h-screen text-zinc-900  selection:bg-zinc-200">
      
//       {/* Top Navigation Bar */}
//       <header className="w-full border-b border-zinc-100 bg-white sticky top-0 z-30">
//         <div className="container max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
//           <button 
//             onClick={onBack} 
//             className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             <span>Back to shop</span>
//           </button>
//         </div>
//       </header>

//       <main className="container max-w-7xl mx-auto px-5 py-8 lg:py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
//           {/* LEFT: IMAGE GALLERY & MAGNIFIER */}
//           <div className="lg:col-span-6 xl:col-span-7 relative lg:sticky lg:top-24">
//             <div 
//               className="relative aspect-[4/5] md:aspect-square w-full rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center p-6 overflow-hidden group cursor-zoom-in transition-colors duration-300"
//               onClick={() => setIsZoomed(true)}
//               style={{ borderColor: `${themeColor}20` }}
//             >
//               <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundColor: themeColor }} />
              
//               <AnimatePresence mode="wait">
//                 <motion.img 
//                   key={displayImage}
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   src={displayImage} 
//                   alt={product.name}
//                   className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
//                 />
//               </AnimatePresence>

//               <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur px-3 py-2 rounded-full shadow-sm flex items-center gap-2 text-xs font-semibold text-zinc-600 border border-zinc-200 pointer-events-none">
//                 <ZoomIn className="w-4 h-4" />
//                 <span className="hidden sm:inline">Magnify</span>
//               </div>

//               {product.badge && (
//                 <div 
//                   className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest shadow-md" 
//                   style={{ backgroundColor: themeColor }}
//                 >
//                   {product.badge}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* RIGHT: PRODUCT INFO */}
//           <div className="lg:col-span-6 xl:col-span-5 flex flex-col">
            
//             <div className="flex items-center justify-between mb-4">
//               <span style={{ color: themeColor }} className="text-xs font-bold uppercase tracking-wider bg-zinc-50 px-3 py-1 rounded-full border border-zinc-100">
//                 {product.category}
//               </span>
//               <button onClick={handleShare} className="p-2 hover:bg-zinc-100 rounded-full transition-colors group">
//                 <Share2 className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
//               </button>
//             </div>

//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight mb-4">
//               {product.name}
//             </h1>

//             <p className="text-zinc-500 font-medium text-base md:text-lg mb-8 leading-relaxed">
//               Premium {product.style || 'custom'} style temporary tattoo. Looks authentic and lasts up to 2 weeks.
//             </p>

//             <div className="space-y-8 mb-10">
//               {/* VARIANTS (SIZE) */}
//               {combinations.length > 0 && (
//                 <div>
//                   <div className="flex justify-between items-end mb-3">
//                     <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Select Size</label>
//                     <span className={clsx("text-xs font-medium", currentStock > 5 ? "text-zinc-500" : "text-red-500")}>
//                       {currentStock > 0 ? `${currentStock} in stock` : 'Out of stock'}
//                     </span>
//                   </div>
//                   <div className="grid grid-cols-2 gap-3">
//                     {combinations.map((combo) => {
//                       const isSelected = activeVariant?.id === combo.id;
//                       return (
//                         <button
//                           key={combo.id}
//                           onClick={() => {
//                             setActiveVariant(combo);
//                             setQuantity(1); 
//                           }}
//                           style={{ 
//                             borderColor: isSelected ? themeColor : '',
//                             backgroundColor: isSelected ? `${themeColor}05` : 'white',
//                             color: isSelected ? themeColor : ''
//                           }}
//                           className={clsx(
//                             "px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 flex flex-col items-center justify-center gap-1",
//                             !isSelected && "border-zinc-200 text-zinc-600 hover:border-zinc-300",
//                             combo.stock === 0 && "opacity-50 cursor-not-allowed"
//                           )}
//                         >
//                           <span>{combo.size}</span>
//                           <span className="text-xs font-medium opacity-80">${Number(combo.price).toFixed(2)}</span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* PRICE & QUANTITY */}
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-zinc-50 rounded-2xl border border-zinc-100 gap-4">
//                 <div className="flex flex-col">
//                   <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">Total Price</span>
//                   <span className="text-3xl font-extrabold text-zinc-900">
//                     ${(parseFloat(currentPrice as string) * quantity).toFixed(2)}
//                   </span>
//                 </div>
                
//                 <div className="flex items-center bg-white border border-zinc-200 rounded-xl p-1 shadow-sm w-full sm:w-auto justify-between sm:justify-center">
//                   <button 
//                     onClick={() => setQuantity(q => Math.max(1, q - 1))} 
//                     disabled={quantity <= 1}
//                     className="p-3 hover:bg-zinc-50 rounded-lg text-zinc-600 disabled:opacity-50"
//                   >
//                     <Minus className="w-4 h-4" />
//                   </button>
//                   <span className="w-12 text-center font-bold text-base">{quantity}</span>
//                   <button 
//                     onClick={() => setQuantity(q => Math.min(currentStock, q + 1))} 
//                     disabled={quantity >= currentStock}
//                     className="p-3 hover:bg-zinc-50 rounded-lg text-zinc-600 disabled:opacity-50"
//                   >
//                     <Plus className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-3 mb-10">
//               {/* Add to Cart */}
//               <button 
//                 onClick={handleAddToCart}
//                 disabled={isAdding || isBuying || currentStock === 0}
//                 style={{ 
//                   borderColor: currentStock > 0 ? themeColor : '#e4e4e7',
//                   color: currentStock > 0 ? themeColor : '#a1a1aa'
//                 }}
//                 className={clsx(
//                   "flex-1 py-4 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 border-2 transition-all duration-200 bg-white",
//                   currentStock > 0 ? "hover:bg-zinc-50 active:scale-[0.99]" : "cursor-not-allowed"
//                 )}
//               >
//                 {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShoppingCart className="w-5 h-5" />}
//                 {currentStock === 0 ? 'Out of Stock' : isAdding ? 'Adding...' : 'Add To Cart'}
//               </button>

//               {/* Buy Now */}
//               <button 
//                 onClick={handleBuyNow}
//                 disabled={isAdding || isBuying || currentStock === 0}
//                 style={{ backgroundColor: currentStock > 0 ? themeColor : '#e4e4e7' }}
//                 className={clsx(
//                   "flex-1 py-4 rounded-xl text-white font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200",
//                   currentStock > 0 ? "hover:opacity-90 active:scale-[0.99]" : "text-zinc-400 cursor-not-allowed shadow-none"
//                 )}
//               >
//                 {isBuying ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
//                 {isBuying ? 'Processing...' : 'Buy Now'}
//               </button>
//             </div>

//             {/* CONTENT TABS */}
//             <div className="border-t border-zinc-100 pt-8">
//               <div className="flex gap-8 border-b border-zinc-100 mb-6">
//                 {(['details', 'care'] as const).map(tab => (
//                   <button 
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={clsx(
//                       "pb-3 text-xs font-semibold uppercase tracking-wider transition-colors relative",
//                       activeTab === tab ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-600"
//                     )}
//                   >
//                     {tab}
//                     {activeTab === tab && (
//                       <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ backgroundColor: themeColor }} />
//                     )}
//                   </button>
//                 ))}
//               </div>

//               <div className="min-h-[160px]">
//                 {activeTab === 'details' && (
//                   <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
//                     <p className="text-sm text-zinc-600 leading-relaxed">
//                       Designed by professional artists, our tattoos look incredibly authentic. They are waterproof, non-toxic, and rigorously tested for skin safety.
//                     </p>
                    
//                     {product?.placements && product.placements.length > 0 && (
//                       <div className="flex flex-col gap-3">
//                         <span className="text-xs font-semibold uppercase text-zinc-500 tracking-wider">Recommended Placement:</span>
//                         <div className="flex flex-wrap gap-2">
//                           {product.placements.map(place => (
//                             <span key={place} className="px-3 py-1.5 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-md">
//                               {place}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </motion.div>
//                 )}
                
//                 {activeTab === 'care' && (
//                   <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
//                     <div className="flex gap-4 items-start p-4 rounded-xl bg-zinc-50">
//                       <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
//                       <p className="text-sm text-zinc-600 leading-relaxed"><strong className="text-zinc-900 block font-semibold mb-1">Application</strong> Peel off clear film, place face down on clean skin, and hold a wet cloth firmly against it for 30 seconds before peeling the paper backing.</p>
//                     </div>
//                     <div className="flex gap-4 items-start p-4 rounded-xl bg-zinc-50">
//                       <Droplets className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
//                       <p className="text-sm text-zinc-600 leading-relaxed"><strong className="text-zinc-900 block font-semibold mb-1">Aftercare</strong> Avoid scrubbing in the shower. Pat dry gently. Lasts significantly longer on areas with minimal friction and hair.</p>
//                     </div>
//                   </motion.div>
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>
//       </main>

//       {/* FULL SCREEN MAGNIFIER MODAL */}
//       <AnimatePresence>
//         {isZoomed && (
//           <motion.div 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }} 
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md flex items-center justify-center p-4"
//           >
//             <button 
//               onClick={() => setIsZoomed(false)}
//               className="absolute md:mt-20 mt-15 top-6 right-4 p-3 bg-zinc-100 hover:bg-zinc-200 rounded-full text-zinc-900 transition-colors z-50"
//               aria-label="Close zoom"
//             >
//               <X className="w-3 h-3" />
//             </button>
//             <motion.div 
//               initial={{ scale: 0.7, opacity: 0 }} 
//               animate={{ scale: 1, opacity: 1 }} 
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="w-full h-full flex items-center justify-center overflow-auto"
//             >
//               <img 
//                 src={displayImage} 
//                 alt="Magnified view" 
//                 className="max-w-none md:mt-10 md:max-w-[70vw] md:max-h-[70vh] object-contain cursor-zoom-out"
//                 onClick={() => setIsZoomed(false)}
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }




// "use client";

// import React, { useState, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Image from 'next/image';
// import { 
//   ShoppingCart, Plus, Minus, Share2, ZoomIn, 
//   CheckCircle2, Droplets, X, Zap, Star, ChevronDown, ChevronUp, ShieldCheck
// } from 'lucide-react';
// import clsx from 'clsx';
// import { toast } from 'sonner';
// import { useCart } from '@/src/context/CartContext';
// import { FormattedProduct, Variant } from '@/src/lib/shopify';
// import { Loader2 } from 'lucide-react';
// interface TattooProductDetailProps {
//   product: FormattedProduct;
// }

// export default function TattooProductDetail({ product }: TattooProductDetailProps) {
//   const { addToCart, setCartOpen } = useCart();
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [activeImage, setActiveImage] = useState(product.media.featuredImage || '/placeholder.png');
//   const [quantity, setQuantity] = useState(1);
//   const [isAdding, setIsAdding] = useState(false);
  
//   // Accordion state
//   const [activeAccordion, setActiveAccordion] = useState<string | null>('description');

//   // Find unique variants (e.g., Sizes)
//   const variants = product.allVariants || [];
//   const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
//     variants.find(v => v.availableForSale) || variants[0] || null
//   );

//   const price = selectedVariant ? selectedVariant.price : product.checkout.price;
//   const compareAtPrice = selectedVariant ? selectedVariant.compareAtPrice : product.checkout.compareAtPrice;
//   const gallery = product.media.gallery.length > 0 ? product.media.gallery : [{ url: activeImage, altText: product.title }];

// //   const handleAddToCart = async () => {
// //     if (!selectedVariant?.variantId) {
// //       toast.error('Please select an option');
// //       return;
// //     }
// //     setIsAdding(true);
// //     try {
// //     //   await addToCart(selectedVariant.variantId, quantity);
// //       toast.success(`${quantity}x ${product.title} added to cart!`);
// //       setCartOpen(true);
// //     } catch (error) {
// //       toast.error('Failed to add to cart');
// //     } finally {
// //       setIsAdding(false);
// //     }
// //   };
// const handleAddToCartClick = async () => {
//   // 1. Check if the active variant has an ID
//   if (!activeVariant?.id) {
//     toast.error("Please select a variant.");
//     return;
//   }

//   // 2. Ensure quantity is a valid number (fallback to 1 if undefined)
//   const safeQuantity = quantity ? Number(quantity) : 1;

//   try {
//     // If you are using the context directly:
//     await addToCart(activeVariant.id, safeQuantity);
    
//     // OR if you are using the prop passed from the parent:
//     // onAddToCart(activeVariant.id, safeQuantity);
//   } catch (error) {
//     console.error("Detail page cart error", error);
//   }
// };
//   return (
//     <div className="bg-white min-h-screen pb-20 pt-24">
//       <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Breadcrumb */}
//         <div className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-8 flex items-center gap-2">
//           <a href="/" className="hover:text-gray-900 transition-colors">Home</a>
//           <span>/</span>
//           <a href="/collections" className="hover:text-gray-900 transition-colors">Shop</a>
//           <span>/</span>
//           <span className="text-gray-900">{product.title}</span>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
//           {/* ===================================== */}
//           {/* LEFT: IMAGE GALLERY                   */}
//           {/* ===================================== */}
//           <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-28 lg:h-[calc(100vh-120px)]">
            
//             {/* Thumbnails (Left side on desktop, bottom on mobile) */}
//             <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-24 shrink-0">
//               {gallery.map((img, idx) => (
//                 <button 
//                   key={idx}
//                   onClick={() => setActiveImage(img.url)}
//                   className={clsx(
//                     "relative w-20 h-24 md:w-full md:h-32 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300",
//                     activeImage === img.url ? "border-[var(--color-brand-orange)] opacity-100" : "border-transparent opacity-60 hover:opacity-100 bg-gray-50"
//                   )}
//                 >
//                   <Image src={img.url} alt={img.altText || `Thumbnail ${idx}`} fill className="object-cover" />
//                 </button>
//               ))}
//             </div>

//             {/* Main Image */}
//             <div className="relative w-full aspect-[4/5] md:aspect-auto md:h-full bg-[#F9F9F9] rounded-3xl overflow-hidden group cursor-zoom-in">
//               <Image 
//                 src={activeImage} 
//                 alt={product.title} 
//                 fill 
//                 priority
//                 className="object-contain p-4 md:p-10 transition-transform duration-500 group-hover:scale-105"
//                 onClick={() => setIsZoomed(true)}
//               />
//               {/* Badges */}
//               <div className="absolute top-6 left-6 flex flex-col gap-2">
//                 {product.styling.badges.map((badge, idx) => (
//                   <span key={idx} className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm text-white" style={{ backgroundColor: badge.color }}>
//                     {badge.label}
//                   </span>
//                 ))}
//               </div>
//               <button 
//                 onClick={() => setIsZoomed(true)}
//                 className="absolute bottom-6 right-6 p-3 bg-white/90 backdrop-blur shadow-lg rounded-full text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0"
//               >
//                 <ZoomIn className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           {/* ===================================== */}
//           {/* RIGHT: PRODUCT DETAILS                */}
//           {/* ===================================== */}
//           <div className="lg:col-span-5 flex flex-col">
            
//             {/* Vendor & Reviews */}
//             <div className="flex items-center justify-between mb-3">
//               <span className="text-[12px] font-bold text-[var(--color-brand-orange)] uppercase tracking-[0.2em]">
//                 {product.vendor}
//               </span>
//               <div className="flex items-center gap-1.5 cursor-pointer group">
//                 <div className="flex text-yellow-400">
//                   {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
//                 </div>
//                 <span className="text-xs font-bold text-gray-500 underline group-hover:text-gray-900 transition-colors">128 Reviews</span>
//               </div>
//             </div>

//             {/* Title */}
//             <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-[1.1] mb-6 uppercase tracking-tight">
//               {product.title}
//             </h1>

//             {/* Pricing */}
//             <div className="flex items-end gap-3 mb-8 pb-8 border-b border-gray-100">
//               <span className="text-3xl font-black text-gray-900">${price.toFixed(2)}</span>
//               {compareAtPrice && compareAtPrice > price && (
//                 <>
//                   <span className="text-xl font-bold text-gray-400 line-through mb-1">${compareAtPrice.toFixed(2)}</span>
//                   <span className="text-xs font-black uppercase tracking-widest text-red-500 bg-red-50 px-2 py-1 rounded-md mb-1.5">
//                     Save {Math.round(((compareAtPrice - price) / compareAtPrice) * 100)}%
//                   </span>
//                 </>
//               )}
//             </div>

//             {/* Variant Selector (If Multiple) */}
//             {variants.length > 1 && (
//               <div className="mb-8">
//                 <div className="flex justify-between items-center mb-3">
//                   <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900">Select Size</span>
//                   <button className="text-[11px] font-bold text-gray-400 underline hover:text-gray-900">Size Guide</button>
//                 </div>
//                 <div className="grid grid-cols-3 gap-3">
//                   {variants.map((variant) => {
//                     const isSelected = selectedVariant?.variantId === variant.variantId;
//                     const sizeLabel = variant.selectedOptions.find(o => o.name === 'Size')?.value || variant.title;
//                     return (
//                       <button
//                         key={variant.variantId}
//                         disabled={!variant.availableForSale}
//                         onClick={() => setSelectedVariant(variant)}
//                         className={clsx(
//                           "py-3 px-2 rounded-xl text-xs font-bold transition-all border-2 text-center",
//                           isSelected 
//                             ? "border-[var(--color-brand-orange)] bg-orange-50/50 text-gray-900 shadow-sm" 
//                             : !variant.availableForSale
//                               ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
//                               : "border-gray-200 bg-white text-gray-600 hover:border-gray-900 hover:text-gray-900"
//                         )}
//                       >
//                         {sizeLabel}
//                       </button>
//                     )
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Add to Cart Actions */}
//             <div className="flex items-center gap-4 mb-8">
//               {/* Quantity */}
//               <div className="flex items-center bg-gray-50 border-2 border-gray-100 rounded-2xl p-1 h-14">
//                 <button 
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                   className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-xl transition-all"
//                 >
//                   <Minus className="w-4 h-4" />
//                 </button>
//                 <span className="w-10 text-center text-sm font-bold text-gray-900">{quantity}</span>
//                 <button 
//                   onClick={() => setQuantity(quantity + 1)}
//                   className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-xl transition-all"
//                 >
//                   <Plus className="w-4 h-4" />
//                 </button>
//               </div>

//               {/* Add Button */}
//               <button 
//                 onClick={handleAddToCart}
//                 disabled={!selectedVariant?.availableForSale || isAdding}
//                 className={clsx(
//                   "flex-1 h-14 rounded-2xl flex items-center justify-center gap-2 text-[14px] font-black uppercase tracking-widest transition-all shadow-xl",
//                   !selectedVariant?.availableForSale 
//                     ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none" 
//                     : "bg-gray-900 text-white hover:bg-[var(--color-brand-orange)] hover:shadow-orange-500/25"
//                 )}
//               >
//                 {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : !selectedVariant?.availableForSale ? 'Out of Stock' : 'Add to Cart'}
//               </button>
//             </div>

//             {/* Value Props */}
//             <div className="grid grid-cols-2 gap-4 mb-8">
//               <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
//                 <Droplets className="w-5 h-5 text-[var(--color-brand-orange)]" />
//                 <div>
//                   <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-900">Waterproof</h4>
//                   <p className="text-[11px] text-gray-500 font-medium mt-0.5">Lasts up to 1-2 weeks</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
//                 <ShieldCheck className="w-5 h-5 text-[var(--color-brand-orange)]" />
//                 <div>
//                   <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-900">Skin Safe</h4>
//                   <p className="text-[11px] text-gray-500 font-medium mt-0.5">Plant-based ink</p>
//                 </div>
//               </div>
//             </div>

//             {/* Accordions for Info */}
//             <div className="border-t border-gray-200">
//               <AccordionItem 
//                 title="Description" 
//                 isOpen={activeAccordion === 'description'} 
//                 onToggle={() => setActiveAccordion(activeAccordion === 'description' ? null : 'description')}
//               >
//                 <div 
//                   className="prose prose-sm max-w-none text-gray-600 font-medium leading-relaxed pb-4"
//                   dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} 
//                 />
//               </AccordionItem>
//               <AccordionItem 
//                 title="How to Apply" 
//                 isOpen={activeAccordion === 'apply'} 
//                 onToggle={() => setActiveAccordion(activeAccordion === 'apply' ? null : 'apply')}
//               >
//                 <ul className="text-sm text-gray-600 font-medium space-y-2 pb-4 list-decimal pl-4 marker:text-[var(--color-brand-orange)] marker:font-bold">
//                   <li>Ensure skin is clean, dry, and free of makeup or oils.</li>
//                   <li>Remove the clear top sheet.</li>
//                   <li>Press tattoo, design facing down, onto skin.</li>
//                   <li>Hold a wet cloth against back of tattoo. Press down and make sure to wet it thoroughly.</li>
//                   <li>Wait 30 seconds, then peel off paper backing.</li>
//                 </ul>
//               </AccordionItem>
//             </div>

//             {/* Tags/Attributes */}
//             {product.attributes.tags.length > 0 && (
//               <div className="flex flex-wrap gap-2 mt-8">
//                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mr-2 flex items-center">Tags:</span>
//                 {product.attributes.tags.slice(0, 5).map(tag => (
//                   <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded-md">
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             )}

//           </div>
//         </div>
//       </div>

//       {/* FULL SCREEN MAGNIFIER MODAL */}
//       <AnimatePresence>
//         {isZoomed && (
//           <motion.div 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }} 
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
//             onClick={() => setIsZoomed(false)}
//           >
//             <button 
//               className="absolute top-6 right-6 p-4 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-900 transition-colors z-[110]"
//               aria-label="Close zoom"
//             >
//               <X className="w-5 h-5" strokeWidth={2.5} />
//             </button>
//             <motion.div 
//               initial={{ scale: 0.8, opacity: 0 }} 
//               animate={{ scale: 1, opacity: 1 }} 
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="relative w-full h-full max-w-5xl max-h-[90vh]"
//             >
//               <Image 
//                 src={activeImage} 
//                 alt="Magnified view" 
//                 fill
//                 className="object-contain"
//                 quality={100}
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // Simple Accordion Helper Component
// function AccordionItem({ title, isOpen, onToggle, children }: any) {
//   return (
//     <div className="border-b border-gray-100">
//       <button 
//         onClick={onToggle}
//         className="w-full py-5 flex items-center justify-between group"
//       >
//         <span className="text-[13px] font-black uppercase tracking-widest text-gray-900">{title}</span>
//         {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-gray-900" /> : <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-900" />}
//       </button>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="overflow-hidden"
//           >
//             {children}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }



// "use client";

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Image from 'next/image';
// import { 
//   Plus, Minus, ZoomIn, 
//   Droplets, X, Star, ChevronDown, ChevronUp, ShieldCheck, Loader2
// } from 'lucide-react';
// import clsx from 'clsx';
// import { toast } from 'sonner';
// import { useCart } from '@/src/context/CartContext';
// import { FormattedProduct, Variant } from '@/src/lib/shopify';

// interface TattooProductDetailProps {
//   product: FormattedProduct;
// }

// export default function TattooProductDetail({ product }: TattooProductDetailProps) {
//   const { addToCart } = useCart();
  
//   // UI States
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [activeImage, setActiveImage] = useState(product.media.featuredImage || '/placeholder.png');
//   const [activeAccordion, setActiveAccordion] = useState<string | null>('description');
  
//   // Cart States
//   const [quantity, setQuantity] = useState(1);
//   const [isAdding, setIsAdding] = useState(false);

//   // Variant State (Safely defaults to the first available, or just the first)
//   const variants = product.allVariants || [];
//   const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
//     variants.find(v => v.availableForSale) || variants[0] || null
//   );

//   // Derived Values
//   const price = selectedVariant ? Number(selectedVariant.price) : Number(product.checkout.price);
//   const compareAtPrice = selectedVariant?.compareAtPrice ? Number(selectedVariant.compareAtPrice) : Number(product.checkout.compareAtPrice);
//   const gallery = product.media.gallery.length > 0 ? product.media.gallery : [{ url: activeImage, altText: product.title }];

//   // =========================================================
//   // ADD TO CART HANDLER
//   // =========================================================
//   const handleAddToCart = async () => {
//     // 1. Ensure a variant is selected
//     if (!selectedVariant?.variantId) {
//       toast.error("Please select a variant.");
//       return;
//     }

//     // 2. Ensure quantity is valid
//     const safeQuantity = quantity > 0 ? quantity : 1;

//     setIsAdding(true);
//     try {
//       // 3. Pass the ID and quantity to your smart CartContext
//       await addToCart(selectedVariant.variantId, safeQuantity);
//     } catch (error) {
//       console.error("Detail page cart error", error);
//       // Note: Success/Error toasts are already handled inside CartContext!
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   return (
//     <div className="bg-white min-h-screen pb-20 pt-24">
//       <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Breadcrumb */}
//         <div className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-8 flex items-center gap-2">
//           <a href="/" className="hover:text-gray-900 transition-colors">Home</a>
//           <span>/</span>
//           <a href="/collections" className="hover:text-gray-900 transition-colors">Shop</a>
//           <span>/</span>
//           <span className="text-gray-900">{product.title}</span>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
//           {/* ===================================== */}
//           {/* LEFT: IMAGE GALLERY                   */}
//           {/* ===================================== */}
//           <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-28 lg:h-[calc(100vh-120px)]">
            
//             {/* Thumbnails */}
//             <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-24 shrink-0">
//               {gallery.map((img, idx) => (
//                 <button 
//                   key={idx}
//                   onClick={() => setActiveImage(img.url)}
//                   className={clsx(
//                     "relative w-20 h-24 md:w-full md:h-32 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300",
//                     activeImage === img.url ? "border-[var(--color-brand-orange)] opacity-100" : "border-transparent opacity-60 hover:opacity-100 bg-gray-50"
//                   )}
//                 >
//                   <Image src={img.url} alt={img.altText || `Thumbnail ${idx}`} fill className="object-cover" />
//                 </button>
//               ))}
//             </div>

//             {/* Main Image */}
//             <div className="relative w-full aspect-[4/5] md:aspect-auto md:h-full bg-[#F9F9F9] rounded-3xl overflow-hidden group cursor-zoom-in">
//               <Image 
//                 src={activeImage} 
//                 alt={product.title} 
//                 fill 
//                 priority
//                 sizes="(max-width: 768px) 100vw, 50vw"
//                 className="object-contain p-4 md:p-10 transition-transform duration-500 group-hover:scale-105"
//                 onClick={() => setIsZoomed(true)}
//               />
//               {/* Badges */}
//               <div className="absolute top-6 left-6 flex flex-col gap-2">
//                 {product.styling?.badges?.map((badge, idx) => (
//                   <span key={idx} className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm text-white" style={{ backgroundColor: badge.color }}>
//                     {badge.label}
//                   </span>
//                 ))}
//               </div>
//               <button 
//                 onClick={() => setIsZoomed(true)}
//                 className="absolute bottom-6 right-6 p-3 bg-white/90 backdrop-blur shadow-lg rounded-full text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0"
//               >
//                 <ZoomIn className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           {/* ===================================== */}
//           {/* RIGHT: PRODUCT DETAILS                */}
//           {/* ===================================== */}
//           <div className="lg:col-span-5 flex flex-col">
            
//             {/* Vendor & Reviews */}
//             <div className="flex items-center justify-between mb-3">
//               <span className="text-[12px] font-bold text-[var(--color-brand-orange)] uppercase tracking-[0.2em]">
//                 {product.vendor}
//               </span>
//               <div className="flex items-center gap-1.5 cursor-pointer group">
//                 <div className="flex text-yellow-400">
//                   {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
//                 </div>
//                 <span className="text-xs font-bold text-gray-500 underline group-hover:text-gray-900 transition-colors">128 Reviews</span>
//               </div>
//             </div>

//             {/* Title */}
//             <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-[1.1] mb-6 uppercase tracking-tight">
//               {product.title}
//             </h1>

//             {/* Pricing */}
//             <div className="flex items-end gap-3 mb-8 pb-8 border-b border-gray-100">
//               <span className="text-3xl font-black text-gray-900">${price.toFixed(2)}</span>
//               {compareAtPrice > price && (
//                 <>
//                   <span className="text-xl font-bold text-gray-400 line-through mb-1">${compareAtPrice.toFixed(2)}</span>
//                   <span className="text-xs font-black uppercase tracking-widest text-red-500 bg-red-50 px-2 py-1 rounded-md mb-1.5">
//                     Save {Math.round(((compareAtPrice - price) / compareAtPrice) * 100)}%
//                   </span>
//                 </>
//               )}
//             </div>

//             {/* Variant Selector (If Multiple) */}
//             {variants.length > 1 && (
//               <div className="mb-8">
//                 <div className="flex justify-between items-center mb-3">
//                   <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900">Select Option</span>
//                   <button className="text-[11px] font-bold text-gray-400 underline hover:text-gray-900">Size Guide</button>
//                 </div>
//                 <div className="grid grid-cols-3 gap-3">
//                   {variants.map((variant) => {
//                     const isSelected = selectedVariant?.variantId === variant.variantId;
//                     // Safely get variant name without crashing
//                     const sizeLabel = variant.selectedOptions?.find(o => o.name === 'Size')?.value || variant.title;
                    
//                     return (
//                       <button
//                         key={variant.variantId}
//                         disabled={!variant.availableForSale}
//                         onClick={() => setSelectedVariant(variant)}
//                         className={clsx(
//                           "py-3 px-2 rounded-xl text-xs font-bold transition-all border-2 text-center",
//                           isSelected 
//                             ? "border-[var(--color-brand-orange)] bg-orange-50/50 text-gray-900 shadow-sm" 
//                             : !variant.availableForSale
//                               ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
//                               : "border-gray-200 bg-white text-gray-600 hover:border-gray-900 hover:text-gray-900"
//                         )}
//                       >
//                         {sizeLabel}
//                       </button>
//                     )
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Add to Cart Actions */}
//             <div className="flex items-center gap-4 mb-8">
//               {/* Quantity Selector */}
//               <div className="flex items-center bg-gray-50 border-2 border-gray-100 rounded-2xl p-1 h-14">
//                 <button 
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                   className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-xl transition-all active:scale-95"
//                 >
//                   <Minus className="w-4 h-4" />
//                 </button>
//                 <span className="w-10 text-center text-sm font-bold text-gray-900">{quantity}</span>
//                 <button 
//                   onClick={() => setQuantity(quantity + 1)}
//                   className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-xl transition-all active:scale-95"
//                 >
//                   <Plus className="w-4 h-4" />
//                 </button>
//               </div>

//               {/* Add Button */}
//               <button 
//                 onClick={handleAddToCart}
//                 disabled={!selectedVariant?.availableForSale || isAdding}
//                 className={clsx(
//                   "flex-1 h-14 rounded-2xl flex items-center justify-center gap-2 text-[14px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-[0.98]",
//                   !selectedVariant?.availableForSale 
//                     ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none" 
//                     : "bg-gray-900 text-white hover:bg-[var(--color-brand-orange)] hover:shadow-orange-500/25"
//                 )}
//               >
//                 {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : !selectedVariant?.availableForSale ? 'Out of Stock' : 'Add to Cart'}
//               </button>
//             </div>

//             {/* Value Props */}
//             <div className="grid grid-cols-2 gap-4 mb-8">
//               <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
//                 <Droplets className="w-5 h-5 text-[var(--color-brand-orange)]" />
//                 <div>
//                   <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-900">Waterproof</h4>
//                   <p className="text-[11px] text-gray-500 font-medium mt-0.5">Lasts up to 1-2 weeks</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
//                 <ShieldCheck className="w-5 h-5 text-[var(--color-brand-orange)]" />
//                 <div>
//                   <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-900">Skin Safe</h4>
//                   <p className="text-[11px] text-gray-500 font-medium mt-0.5">Plant-based ink</p>
//                 </div>
//               </div>
//             </div>

//             {/* Accordions for Info */}
//             <div className="border-t border-gray-200">
//               <AccordionItem 
//                 title="Description" 
//                 isOpen={activeAccordion === 'description'} 
//                 onToggle={() => setActiveAccordion(activeAccordion === 'description' ? null : 'description')}
//               >
//                 <div 
//                   className="prose prose-sm max-w-none text-gray-600 font-medium leading-relaxed pb-4"
//                   dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} 
//                 />
//               </AccordionItem>
//               <AccordionItem 
//                 title="How to Apply" 
//                 isOpen={activeAccordion === 'apply'} 
//                 onToggle={() => setActiveAccordion(activeAccordion === 'apply' ? null : 'apply')}
//               >
//                 <ul className="text-sm text-gray-600 font-medium space-y-2 pb-4 list-decimal pl-4 marker:text-[var(--color-brand-orange)] marker:font-bold">
//                   <li>Ensure skin is clean, dry, and free of makeup or oils.</li>
//                   <li>Remove the clear top sheet.</li>
//                   <li>Press tattoo, design facing down, onto skin.</li>
//                   <li>Hold a wet cloth against back of tattoo. Press down and make sure to wet it thoroughly.</li>
//                   <li>Wait 30 seconds, then peel off paper backing.</li>
//                 </ul>
//               </AccordionItem>
//             </div>

//             {/* Tags/Attributes */}
//             {product.attributes.tags.length > 0 && (
//               <div className="flex flex-wrap gap-2 mt-8">
//                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mr-2 flex items-center">Tags:</span>
//                 {product.attributes.tags.slice(0, 5).map(tag => (
//                   <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded-md">
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             )}

//           </div>
//         </div>
//       </div>

//       {/* FULL SCREEN MAGNIFIER MODAL */}
//       <AnimatePresence>
//         {isZoomed && (
//           <motion.div 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }} 
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
//             onClick={() => setIsZoomed(false)}
//           >
//             <button 
//               className="absolute top-6 right-6 p-4 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-900 transition-colors z-[110]"
//               aria-label="Close zoom"
//             >
//               <X className="w-5 h-5" strokeWidth={2.5} />
//             </button>
//             <motion.div 
//               initial={{ scale: 0.8, opacity: 0 }} 
//               animate={{ scale: 1, opacity: 1 }} 
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="relative w-full h-full max-w-5xl max-h-[90vh]"
//             >
//               <Image 
//                 src={activeImage} 
//                 alt="Magnified view" 
//                 fill
//                 className="object-contain"
//                 quality={100}
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // =========================================================
// // STRICTLY TYPED ACCORDION COMPONENT
// // =========================================================
// interface AccordionProps {
//   title: string;
//   isOpen: boolean;
//   onToggle: () => void;
//   children: React.ReactNode;
// }

// function AccordionItem({ title, isOpen, onToggle, children }: AccordionProps) {
//   return (
//     <div className="border-b border-gray-100">
//       <button 
//         onClick={onToggle}
//         className="w-full py-5 flex items-center justify-between group"
//       >
//         <span className="text-[13px] font-black uppercase tracking-widest text-gray-900">{title}</span>
//         {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-gray-900" /> : <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-900" />}
//       </button>
//       <AnimatePresence initial={false}>
//         {isOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             className="overflow-hidden"
//           >
//             {children}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

















