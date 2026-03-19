
export const imageFragment = /* GraphQL */ `
  fragment image on Image {
    url(transform: { preferredContentType: WEBP })
    altText
    width
    height
  }
`;

export const productFragment = /* GraphQL */ `
  fragment product on Product {
  
    id
    handle
    title
    description
    descriptionHtml
    vendor          
    productType     
    tags            
    
   
    availableForSale
    isGiftCard
    requiresSellingPlan   # True if this is a subscription-only product
    createdAt
    publishedAt
    updatedAt
    
  
    seo {
      title
      description
    }
    
   
    collections(first: 10) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
    
    options {
      id
      name
      values
    }
    
  
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    
   
    variants(first: 250) {
      edges {
        node {
          id
          title
          sku                 
          barcode             
          
        
          availableForSale
          currentlyNotInStock   
          quantityAvailable   
          
        
          requiresShipping
          taxable
          weight
          weightUnit
          
          selectedOptions {
            name
            value
          }
          
         
          price {
            amount
            currencyCode
          }
          compareAtPrice {    
            amount
            currencyCode
          }
          
         
          unitPrice {
            amount
            currencyCode
          }
          unitPriceMeasurement {
            measuredType
            quantityUnit
            quantityValue
            referenceUnit
            referenceValue
          }
          
          image {             
            ...image
          }
        }
      }
    }
    
  
    media(first: 20) {
      edges {
        node {
          mediaContentType
          alt
          ... on MediaImage {
            image {
              ...image
            }
          }
          ... on Video {
            sources {
              url
              mimeType
            }
          }
        }
      }
    }
    
    featuredImage {
      ...image
    }
    
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }

  }
  ${imageFragment}
`;


export const getProductsQuery = /* GraphQL */ `
  query getProducts(
    $first: Int!
    $after: String
    $query: String
    $sortKey: ProductSortKeys
    $reverse: Boolean
  ) {
    products(
      first: $first
      after: $after
      query: $query
      sortKey: $sortKey
      reverse: $reverse
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;

export const getCollectionNamesQuery = /* GraphQL */ `
  query getCollectionNames($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          title
          handle
        }
      }
    }
  }
`;


export const searchProductsQuery = /* GraphQL */ `
  query searchProducts($query: String!) {
    products(first: 6, query: $query) {
      edges {
        node {
          id
          title
          handle
          productType
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export const getProductByHandleQuery = /* GraphQL */ `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`;

export const getProductRecommendationsQuery = /* GraphQL */ `
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
  ${productFragment}
`;


export const cartFragment = /* GraphQL */ `
  fragment cart on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              product {
                id
                handle
                title
                featuredImage {
                  ...image
                }
              }
            }
          }
        }
      }
    }
  }
  ${imageFragment}
`;

export const getCartQuery = /* GraphQL */ `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...cart
    }
  }
  ${cartFragment}
`;

export const createCartMutation = /* GraphQL */ `
  mutation createCart($lineItems: [CartLineInput!]) {
    cartCreate(input: { lines: $lineItems }) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const addToCartMutation = /* GraphQL */ `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const removeFromCartMutation = /* GraphQL */ `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const updateCartMutation = /* GraphQL */ `
  mutation updateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const updateCartBuyerIdentityMutation = /* GraphQL */ `
  mutation cartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;