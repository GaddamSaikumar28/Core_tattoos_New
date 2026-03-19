// 'use client';

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { toast } from 'sonner';

// // Structuring this similar to Shopify's CartLine structure
// export interface CartItem {
//   variantId: string;
//   productId: string;
//   name: string;
//   variantName: string;
//   price: number;
//   image: string;
//   quantity: number;
// }

// interface CartContextType {
//   cart: CartItem[];
//   addToCart: (item: CartItem) => Promise<void>;
//   removeFromCart: (variantId: string) => void;
//   updateQuantity: (variantId: string, quantity: number) => void;
//   cartTotal: number;
//   cartCount: number;
//   isCartOpen: boolean;
//   setCartOpen: (open: boolean) => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [isCartOpen, setCartOpen] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);

//   // Load cart from localStorage on mount (Simulating persisted cart)
//   useEffect(() => {
//     setIsMounted(true);
//     const savedCart = localStorage.getItem('tattoo_cart');
//     if (savedCart) {
//       try {
//         setCart(JSON.parse(savedCart));
//       } catch (e) {
//         console.error("Failed to parse cart", e);
//       }
//     }
//   }, []);

//   // Save to localStorage whenever cart changes
//   useEffect(() => {
//     if (isMounted) {
//       localStorage.setItem('tattoo_cart', JSON.stringify(cart));
//     }
//   }, [cart, isMounted]);

//   const addToCart = async (newItem: CartItem) => {
//     // Simulating Shopify API network delay
//     await new Promise(resolve => setTimeout(resolve, 500)); 

//     setCart((prev) => {
//       const existingItem = prev.find((item) => item.variantId === newItem.variantId);
//       if (existingItem) {
//         return prev.map((item) =>
//           item.variantId === newItem.variantId
//             ? { ...item, quantity: item.quantity + newItem.quantity }
//             : item
//         );
//       }
//       return [...prev, newItem];
//     });
    
//     // Trigger Sonner Toast
//     toast.success(`${newItem.name} added to cart`, {
//       description: `${newItem.variantName} x ${newItem.quantity}`,
//       action: {
//         label: 'View Cart',
//         onClick: () => setCartOpen(true),
//       },
//     });
//   };

//   const removeFromCart = (variantId: string) => {
//     setCart((prev) => prev.filter((item) => item.variantId !== variantId));
//     toast.info('Item removed from cart');
//   };

//   const updateQuantity = (variantId: string, quantity: number) => {
//     if (quantity < 1) {
//       removeFromCart(variantId);
//       return;
//     }
//     setCart((prev) =>
//       prev.map((item) => (item.variantId === variantId ? { ...item, quantity } : item))
//     );
//   };

//   const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
//   const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount, isCartOpen, setCartOpen }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error('useCart must be used within a CartProvider');
//   return context;
// };


"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { 
  Cart, 
  createCart, 
  getCart, 
  addToCart as apiAddToCart, 
  updateCartItem, 
  removeFromCart,
  updateCartBuyerIdentity
} from "@/src/lib/shopify";

interface CartContextType {
  cart: Cart | null;
  cartCount: number;
  isCartOpen: boolean;
  isCartLoading: boolean;
  isAddingToCart: boolean;
  setCartOpen: (open: boolean) => void;
//   addToCart: (variantId: string, quantity: number) => Promise<void>;
  addToCart: (variantOrId: any, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeLineItem: (lineId: string) => Promise<void>;
  linkCartToUser: (customerAccessToken: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_KEY = "shopify_cart_id";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // 1. Initialize Cart from LocalStorage
  const initializeCart = useCallback(async () => {
    setIsCartLoading(true);
    const savedCartId = typeof window !== 'undefined' ? localStorage.getItem(CART_ID_KEY) : null;

    if (savedCartId) {
      try {
        const existingCart = await getCart(savedCartId);
        if (existingCart) {
          setCart(existingCart);
        } else {
          // IMPORTANT: If cart returns null, it has expired on Shopify's end (10 days).
          // We must wipe it locally so the user isn't stuck with a broken cart.
          localStorage.removeItem(CART_ID_KEY);
          setCart(null);
        }
      } catch (error) {
        console.error("Failed to fetch cart", error);
        localStorage.removeItem(CART_ID_KEY);
      }
    }
    setIsCartLoading(false);
  }, []);

  // Run on mount
  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  // 2. Cross-Tab Synchronization
  // If user opens two tabs and adds an item in Tab A, Tab B will automatically sync.
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CART_ID_KEY) {
        initializeCart();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [initializeCart]);

  // --- ACTIONS ---

//   const addToCart = async (variantId: string, quantity: number) => {
//     setIsAddingToCart(true);
//     try {
//       const savedCartId = localStorage.getItem(CART_ID_KEY);
//       let newCart: Cart;

//       if (!savedCartId || !cart) {
//         // Create brand new cart
//         newCart = await createCart(variantId, quantity);
//         localStorage.setItem(CART_ID_KEY, newCart.id);
//       } else {
//         // Add to existing cart
//         newCart = await apiAddToCart(savedCartId, variantId, quantity);
//       }
      
//       setCart(newCart);
//       setIsCartOpen(true);
//       toast.success("Added to cart");
//     } catch (error) {
//       console.error("Add to cart error:", error);
//       toast.error("Failed to add to cart");
//     } finally {
//       setIsAddingToCart(false);
//     }
//   };

const addToCart = async (variantOrId: any, incomingQuantity?: number) => {
    setIsAddingToCart(true);
    try {
      // 1. SMART EXTRACTION: Figure out the exact String ID
      let finalVariantId = "";
      
      if (typeof variantOrId === 'string') {
        finalVariantId = variantOrId;
      } else if (variantOrId?.variantId) {
        finalVariantId = variantOrId.variantId; // From ProductCard (FormattedProduct)
      } else if (variantOrId?.id) {
        finalVariantId = variantOrId.id; // From TattooProductDetail (Combination)
      } else {
        toast.error("Invalid product selected.");
        return;
      }

      // 2. SMART QUANTITY: Fallback to 1 if it's missing or an object (e.g., an event payload)
      const safeQuantity = (typeof incomingQuantity === 'number' && incomingQuantity > 0) 
        ? incomingQuantity 
        : 1;

      const savedCartId = localStorage.getItem(CART_ID_KEY);
      let newCart: Cart;

      if (!savedCartId || !cart) {
        // A. CREATE BRAND NEW CART
        newCart = await createCart(finalVariantId, safeQuantity);
        localStorage.setItem(CART_ID_KEY, newCart.id);
      } else {
        // B. CHECK FOR EXISTING ITEM TO PREVENT DUPLICATES
        const existingLineItem = cart.lines.find(
          (line) => line.merchandise.id === finalVariantId
        );

        if (existingLineItem) {
          // Just update the quantity of the existing item in the cart!
          const newTotalQuantity = existingLineItem.quantity + safeQuantity;
          await updateQuantity(existingLineItem.id, newTotalQuantity);
          setIsCartOpen(true);
          toast.success("Added to cart");
          return; // Exit early, since updateQuantity handles the state update
        } else {
          // Add brand new line item to existing cart
          newCart = await apiAddToCart(savedCartId, finalVariantId, safeQuantity);
        }
      }
      
      setCart(newCart);
      setIsCartOpen(true);
      toast.success("Added to cart");
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cart?.id) return;
    
    // Optimistic UI update (optional, but makes it feel instant)
    const previousCart = { ...cart };
    setCart(prev => prev ? {
      ...prev,
      lines: prev.lines.map(line => line.id === lineId ? { ...line, quantity } : line)
    } : null);

    try {
      if (quantity === 0) {
        await removeLineItem(lineId);
      } else {
        const updatedCart = await updateCartItem(cart.id, lineId, quantity);
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Update quantity error:", error);
      setCart(previousCart); // Revert on failure
      toast.error("Failed to update quantity");
    }
  };

  const removeLineItem = async (lineId: string) => {
    if (!cart?.id) return;
    try {
      const updatedCart = await removeFromCart(cart.id, lineId);
      setCart(updatedCart);
    } catch (error) {
      console.error("Remove from cart error:", error);
      toast.error("Failed to remove item");
    }
  };

  // 3. Guest to Logged-in User Handoff
  // Call this function when a user successfully logs in.
  // It attaches the current guest cart to their official customer account.
  const linkCartToUser = async (customerAccessToken: string) => {
    if (!cart?.id) return;
    try {
      const linkedCart = await updateCartBuyerIdentity(cart.id, customerAccessToken);
      setCart(linkedCart);
    } catch (error) {
      console.error("Failed to link cart to user:", error);
    }
  };

  // Calculate global total quantity
  const cartCount = cart?.totalQuantity || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        isCartOpen,
        isCartLoading,
        isAddingToCart,
        setCartOpen: setIsCartOpen,
        addToCart,
        updateQuantity,
        removeLineItem,
        linkCartToUser
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}