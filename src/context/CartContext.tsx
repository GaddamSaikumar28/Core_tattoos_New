

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
  buyNow: (variantId: string, quantity: number) => Promise<string | undefined>; // <-- NEW
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

  const buyNow = async (variantId: string, quantity: number): Promise<string | undefined> => {
    try {
      const savedCartId = localStorage.getItem(CART_ID_KEY);
      let checkoutCart: Cart;

      if (!savedCartId || !cart) {
        // Create a new cart if one doesn't exist
        checkoutCart = await createCart(variantId, quantity);
        localStorage.setItem(CART_ID_KEY, checkoutCart.id);
      } else {
        // Check if item already exists in the cart
        const existingLineItem = cart.lines.find(
          (line) => line.merchandise.id === variantId
        );

        if (existingLineItem) {
          // Update quantity if it exists
          checkoutCart = await updateCartItem(
            cart.id, 
            existingLineItem.id, 
            existingLineItem.quantity + quantity
          );
        } else {
          // Add new line item to existing cart
          checkoutCart = await apiAddToCart(savedCartId, variantId, quantity);
        }
      }
      
      // Update global cart state quietly
      setCart(checkoutCart);
      
      // Return the fresh checkout URL
      return checkoutCart.checkoutUrl;

    } catch (error) {
      console.error("Buy Now process failed:", error);
      toast.error("Failed to initialize checkout.");
      return undefined;
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
        linkCartToUser,
        buyNow,
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