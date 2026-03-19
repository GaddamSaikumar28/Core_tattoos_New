
'use server';

import { getProductsQuery, getCollectionNamesQuery, searchProductsQuery } from './queries';
import { getProductByHandleQuery, getProductRecommendationsQuery } from './queries';

import { 
  getCartQuery, 
  createCartMutation, 
  addToCartMutation, 
  removeFromCartMutation, 
  updateCartMutation,
  updateCartBuyerIdentityMutation
} from './queries';
// --- SHARED TYPES FOR PRODUCTION ---
export interface Variant {
  variantId: string;
  title: string;
  price: number;
  compareAtPrice: number | null;
  currency: string;
  sku: string | null;
  availableForSale: boolean;
  quantityAvailable: number | null;
  selectedOptions: { name: string; value: string }[];
}

export interface FormattedProduct {
  id: string;
  handle: string;
  slug: string;
  title: string;
  vendor: string;
  description: string;
  descriptionHtml: string;
  checkout: {
    defaultVariantId: string | null;
    price: number;
    compareAtPrice: number | null;
    currency: string;
    discountPercentage: number | null;
  };
  inventory: {
    availableForSale: boolean;
    inStock: boolean;
    stockLevel: number;
  };
  media: {
    featuredImage: string | null;
    hoverImage: string | null;
    gallery: any[];
    videos: any[];
  };
  attributes: {
    placements: string[];
    themes: string[];
    sizes: string[];
    rawCollections: string[];
    tags: string[];
  };
  styling: {
    badges: { type: string; label: string; color: string }[];
    tattooColorType: string;
    uiBackgroundColor: string;
    cardTheme: string;
    aspectRatio: string;
  };
  allVariants: Variant[];
}

export interface SearchResult {
  id: string;
  handle: string;
  title: string;
  price: string;
  image: string;
  category?: string;
}

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export async function shopifyFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION || '2024-01';

  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

  if (!domain || !storefrontAccessToken) {
    throw new Error(`Missing Shopify environment variables.`);
  }

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      console.error('Shopify GraphQL Errors:', body.errors);
      throw body.errors[0];
    }

    return { status: result.status, body };
  } catch (e) {
    console.error('Shopify Fetch Error:', e);
    throw { error: e, query };
  }
}

export async function getProducts({
  query,
  first = 12,
  after,
  reverse,
  sortKey
}: {
  query?: string;
  first?: number;
  after?: string;
  reverse?: boolean;
  sortKey?: string;
} = {}) {
  const res = await shopifyFetch<any>({
    query: getProductsQuery,
    tags: ['products'], 
    variables: {
      first,
      after,
      reverse: reverse || false,
      sortKey: sortKey || 'CREATED_AT',
      ...(query && { query })
    }
  });

  const productsData = res.body?.data?.products;

  if (!productsData?.edges) {
    return { formattedData: [] as FormattedProduct[], pageInfo: { hasNextPage: false, endCursor: null } };
  }

  return {
    formattedData: await mapShopifyProductsForProduction(productsData) as FormattedProduct[],
    pageInfo: productsData.pageInfo,
  };
}

export async function getCollectionNames() {
  const res = await shopifyFetch<any>({
    query: getCollectionNamesQuery,
    tags: ['collections'],
    variables: { first: 250 }
  });

  if (!res.body?.data?.collections?.edges) return [];

  return res.body.data.collections.edges.map(({ node }: any) => ({
    title: node.title,
    handle: node.handle
  }));
}

export async function searchShopifyProducts(searchQuery: string): Promise<SearchResult[]> {
  const variables = {
    // The asterisk (*) acts as a wildcard so 'tat' matches 'tattoo'
    query: `${searchQuery}*` 
  };

  try {
    const res = await shopifyFetch<any>({
      query: searchProductsQuery,
      // We don't want to highly cache search queries as they are highly variable
      cache: 'no-store', 
      variables
    });

    if (!res.body?.data?.products?.edges) return [];

    // Map to the clean interface expected by your Header
    return res.body.data.products.edges.map(({ node }: any) => ({
      id: node.id,
      handle: node.handle,
      title: node.title,
      price: parseFloat(node.priceRange?.minVariantPrice?.amount || "0").toFixed(2),
      image: node.images?.edges?.[0]?.node?.url || '/assets/images/placeholder.png', // Fallback local image if missing
      category: node.productType || 'Product',
    }));

  } catch (error) {
    console.error("Failed to search products:", error);
    return []; // Graceful failure so the UI dropdown doesn't crash
  }
}

// --- 1. CONFIGURATION & CONSTANTS ---
const TATTOO_CATEGORIES = {
  placements: ["Hand", "Foot", "Ankle & Wrist", "Back, Torso & Chest Pieces", "Leg and Arm Pieces", "Finger", "Sleeve", "Spine", "Body Part"],
  themes: ["Animal", "Fantasy", "Nature", "Spiritual", "Symbols and Quotes", "Connection/Couple Art", "Floral", "Insects", "Celestial Art", "Japanese Art", "Tribal Art", "Dog", "Cat", "Eagle", "Fish"],
  sizes: ["Small", "Medium", "Large"]
};
 const UI_COLORS = [
  // --- THE VIBRANT POP ---
  // High energy, modern tech, and flat-design classics. 
  // '#FF6B6B', // Soft Coral / Punchy Red
  // '#4ECDC4', // Electric Teal
  // '#F7B731', // Rich Mustard Yellow
  // '#A55EEA', // Vibrant Lilac / Purple
  // '#2D98DA', // Azure Blue
  // '#20BF6B', // Emerald Mint
  // '#FA8231', // Bold Tangerine

  // --- THE MUTED LUXURY ---
  // Neater, richer, and more grounded. 
  // '#8FA08D', // Deep Sage Green
  // '#D47A6A', // Warm Terracotta
  // '#6B8EAD', // Slate Steel Blue
  // '#C98A92', // Dusty Rose
  // '#919191', // Soft Ochre / Clay
  // '#b2b2b2', // Deep Mauve

  // --- THE RICH GREYS ---
  // Premium, sophisticated neutrals with subtle undertones.
  // Perfect for a sleek, heavy, or minimalist tattoo aesthetic.
  // '#2C3E50', // Midnight Blue-Grey (Very dark, cool)
  // '#34495E', // Deep Charcoal (Classic dark UI grey)
  // '#5D6D7E', // Cool Slate (Mid-tone blue-leaning grey)
  '#7F8C8D', // Classic Ash Grey (Slightly green-tinted neutral)
  '#95A5A6', // Soft Gunmetal (Lighter, metallic grey)
  '#696969', // Dim Grey (True, balanced mid-dark grey)
  '#7A7571', // Warm Taupe Grey (Brown/red-leaning grey, very organic)
  '#363636',  // Heavy Graphite / Onyx (Almost black, high contrast)
  '#b2b2b2',
  '#919191',
  '#919291'
];

// const UI_COLORS = [
//   // --- THE VIBRANT POP ---
//   // High energy, modern tech, and flat-design classics. 
//   // These look incredible behind stark white elements.
//   '#FF6B6B', // Soft Coral / Punchy Red
//   '#4ECDC4', // Electric Teal
//   '#F7B731', // Rich Mustard Yellow
//   '#A55EEA', // Vibrant Lilac / Purple
//   '#2D98DA', // Azure Blue
//   '#20BF6B', // Emerald Mint
//   '#FA8231', // Bold Tangerine

//   // --- THE MUTED LUXURY ---
//   // Neater, richer, and more grounded. 
//   // Perfect for a high-end, organic, or neo-traditional tattoo vibe.
//   '#8FA08D', // Deep Sage Green
//   '#D47A6A', // Warm Terracotta
//   '#6B8EAD', // Slate Steel Blue
//   '#C98A92', // Dusty Rose
//   '#DDA77B', // Soft Ochre / Clay
//   '#7A5C61'  // Deep Mauve
// ];
 //const UI_COLORS = ['#F9F9F9', '#F4F1EA', '#EFEFEF', '#FAFAFA'];
// const UI_COLORS = [
//   '#FF5964', // Vibrant Coral Red
//   '#35A7FF', // Electric Sky Blue
//   '#38E4AE', // Mint/Neon Green
//   '#FFD166', // Sunny Yellow
//   '#9D8DF1', // Soft Purple/Lavender
//   '#FF9F1C'  // Bright Tangerine
// ];
// --- 2. UTILITY FUNCTIONS ---
const calculateDiscount = (price: number, compareAtPrice: number | null): number | null => {
  if (!compareAtPrice || compareAtPrice <= price) return null;
  const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
  return Math.round(discount); 
};

// --- 3. MAIN MAPPING FUNCTION ---
export async function mapShopifyProductsForProduction(shopifyJson: any) {
  if (!shopifyJson?.edges) return [];

  return shopifyJson.edges.map(({ node }: any) => {
    const collections = node.collections?.edges?.map((c: any) => c.node.title) || [];
    const rawTags = node.tags || [];
    
    const allMedia = node.media?.edges?.map((m: any) => m.node) || [];
    const images: any[] = [];
    const videos: any[] = [];
    
    const legacyImages = node.images?.edges?.map((img: any) => img.node) || [];
    const mediaToProcess = allMedia.length > 0 ? allMedia : legacyImages;
    
    mediaToProcess.forEach((mediaItem: any) => {
      if (mediaItem.mediaContentType === 'VIDEO' || mediaItem.sources) {
        videos.push({
          url: mediaItem.sources?.[0]?.url,
          previewImage: mediaItem.previewImage?.url || null,
        });
      } else {
        images.push({
          url: mediaItem.url || mediaItem.image?.url,
          altText: mediaItem.altText || node.title,
          width: mediaItem.width || mediaItem.image?.width,
          height: mediaItem.height || mediaItem.image?.height
        });
      }
    });

    const variants = node.variants?.edges?.map((v: any) => ({
      variantId: v.node.id, 
      title: v.node.title,
      price: parseFloat(v.node.price?.amount || "0"),
      compareAtPrice: v.node.compareAtPrice ? parseFloat(v.node.compareAtPrice.amount) : null,
      currency: v.node.price?.currencyCode || "USD",
      sku: v.node.sku || null,
      availableForSale: v.node.availableForSale || false,
      quantityAvailable: v.node.quantityAvailable ?? null,
      selectedOptions: v.node.selectedOptions || []
    })) || [];

    const defaultVariant = variants[0] || {};
    const isOnSale = defaultVariant.compareAtPrice && defaultVariant.price 
      ? defaultVariant.compareAtPrice > defaultVariant.price 
      : false;

    const isColored = collections.includes('Colored Art') || rawTags.includes('Color');

    return {
      id: node.id,
      handle: node.handle,        
      slug: node.handle,          
      title: node.title,
      vendor: node.vendor || "Unknown Artist",
      description: node.description,
      descriptionHtml: node.descriptionHtml,

      checkout: {
        defaultVariantId: defaultVariant.variantId || null, 
        price: defaultVariant.price || 0,
        compareAtPrice: defaultVariant.compareAtPrice || null,
        currency: defaultVariant.currency || "USD",
        discountPercentage: calculateDiscount(defaultVariant.price || 0, defaultVariant.compareAtPrice || null),
      },

      inventory: {
        availableForSale: node.availableForSale !== undefined ? node.availableForSale : (defaultVariant.availableForSale || false),
        inStock: defaultVariant.quantityAvailable !== null ? defaultVariant.quantityAvailable > 0 : true,
        stockLevel: defaultVariant.quantityAvailable || 0,
      },

      media: {
        featuredImage: node.featuredImage?.url || images[0]?.url || null,
        hoverImage: images[1]?.url || null, 
        gallery: images,                    
        videos: videos,                     
      },

      attributes: {
        placements: collections.filter((c: string) => TATTOO_CATEGORIES.placements.includes(c)),
        themes: collections.filter((c: string) => TATTOO_CATEGORIES.themes.includes(c)),
        sizes: collections.filter((c: string) => TATTOO_CATEGORIES.sizes.includes(c)),
        rawCollections: collections,
        tags: rawTags,
      },

      styling: {
        badges: [
          collections.includes('New Arrivals') ? { type: 'new', label: 'New Arrival', color: '#000000' } : null,
          isOnSale ? { type: 'sale', label: 'Sale', color: '#FF3366' } : null,
          (defaultVariant.variantId && !defaultVariant.availableForSale) ? { type: 'sold_out', label: 'Sold Out', color: '#999999' } : null
        ].filter(Boolean), 
        tattooColorType: isColored ? 'Color' : 'Black & Grey',
        uiBackgroundColor: UI_COLORS[Math.floor(Math.random() * UI_COLORS.length)],
        cardTheme: "light",
        aspectRatio: (images[0] && images[0].height > images[0].width * 1.5) ? 'tall' : 'standard',
      },
      
      allVariants: variants
    };
  });
}

export async function getProduct(handle: string): Promise<FormattedProduct | null> {
  if (!handle) {
    console.warn("getProduct called with undefined handle");
    return null;
  }

  const res = await shopifyFetch<any>({
    query: getProductByHandleQuery,
    tags: ['products', handle],
    variables: { handle }
  });

  if (!res.body?.data?.product) return null;

  // We wrap the single product in an edges array so our mapper can process it
  const mapped = await mapShopifyProductsForProduction({ edges: [{ node: res.body.data.product }] });
  return mapped[0] as FormattedProduct;
}

// 2. Fetch AI-driven Related Products
export async function getProductRecommendations(productId: string): Promise<FormattedProduct[]> {
  const res = await shopifyFetch<any>({
    query: getProductRecommendationsQuery,
    tags: ['products', 'recommendations', productId],
    variables: { productId }
  });

  if (!res.body?.data?.productRecommendations) return [];

  // Wrap the recommendations in an edges array for the mapper
  const edges = res.body.data.productRecommendations.map((node: any) => ({ node }));
  return await mapShopifyProductsForProduction({ edges }) as FormattedProduct[];
}

export interface CartItem {
  id: string; // The unique ID of the line item in the cart
  quantity: number;
  cost: {
    totalAmount: { amount: string; currencyCode: string };
  };
  merchandise: {
    id: string; // The actual variant ID
    title: string;
    price: { amount: string; currencyCode: string };
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage: { url: string; altText: string } | null;
    };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
    totalTaxAmount: { amount: string; currencyCode: string } | null;
  };
  lines: CartItem[];
}

// --- CART API HELPERS ---

// Formats the raw Shopify GraphQL Cart into a clean object
const reshapeCart = (cart: any): Cart => {
  if (!cart) return cart;
  return {
    ...cart,
    lines: cart.lines?.edges?.map((edge: any) => edge.node) || [],
  };
};

export async function createCart(variantId: string, quantity: number): Promise<Cart> {
  const res = await shopifyFetch<any>({
    query: createCartMutation,
    variables: { lineItems: [{ merchandiseId: variantId, quantity }] },
    cache: 'no-store', // Carts should never be cached
  });
  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const res = await shopifyFetch<any>({
    query: getCartQuery,
    variables: { cartId },
    cache: 'no-store',
  });
  if (!res.body.data.cart) return null; // Cart expired or deleted
  return reshapeCart(res.body.data.cart);
}

export async function addToCart(cartId: string, variantId: string, quantity: number): Promise<Cart> {
  const res = await shopifyFetch<any>({
    query: addToCartMutation,
    variables: { cartId, lines: [{ merchandiseId: variantId, quantity }] },
    cache: 'no-store',
  });
  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function updateCartItem(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const res = await shopifyFetch<any>({
    query: updateCartMutation,
    variables: { cartId, lines: [{ id: lineId, quantity }] },
    cache: 'no-store',
  });
  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function removeFromCart(cartId: string, lineId: string): Promise<Cart> {
  const res = await shopifyFetch<any>({
    query: removeFromCartMutation,
    variables: { cartId, lineIds: [lineId] },
    cache: 'no-store',
  });
  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

// Associates a guest cart with a logged-in user's Shopify Account
export async function updateCartBuyerIdentity(cartId: string, customerAccessToken: string): Promise<Cart> {
  const res = await shopifyFetch<any>({
    query: updateCartBuyerIdentityMutation,
    variables: { 
      cartId, 
      buyerIdentity: { customerAccessToken } 
    },
    cache: 'no-store',
  });
  return reshapeCart(res.body.data.cartBuyerIdentityUpdate.cart);
}