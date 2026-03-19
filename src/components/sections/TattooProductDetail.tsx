"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, Plus, Minus, Share2, ZoomIn, 
  CheckCircle2, Droplets, ArrowLeft, X, Zap
} from 'lucide-react';
import clsx from 'clsx';
import { useCart } from '@/src/context/CartContext';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation'; // <-- ADDED

interface Combination {
  id: string;
  price: number | string;
  image: string;
  size: string;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  category: string;
  style?: string;
  price: number | string;
  image: string;
  combinations?: Combination[];
  placements?: string[];
  productColor?: string;
  badge?: string | null;
}

interface TattooProductDetailProps {
  product: Product;
  onAddToCart?: (variantId: string, quantity: number) => void;
  onBuyNow?: (variantId: string, quantity: number) => void;
  onBack?: () => void;
}

export default function TattooProductDetail({ 
  product, 
  onAddToCart, 
  onBuyNow, 
  onBack 
}: TattooProductDetailProps) {
  const router = useRouter();
  const combinations = product?.combinations || [];
  const [activeVariant, setActiveVariant] = useState<Combination | null>(combinations[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'care'>('details');
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const { addToCart, setCartOpen } = useCart();
  const themeColor = product?.productColor || '#171717';
  const displayImage = activeVariant?.image || product?.image;
  const currentPrice = activeVariant?.price || product?.price;
  const currentStock = activeVariant?.stock || 0;

  const handleShare = async () => {
    const shareData = {
      title: `${product?.name} | Tattoo`,
      text: `Check out this awesome tattoo: ${product?.name}`,
      url: typeof window !== 'undefined' ? window.location.href : '',
    };
    
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!'); 
    }
  };

//   const handleAddToCart = async () => {
//     if (!activeVariant || currentStock === 0) return;
//     setIsAdding(true);
//     if (onAddToCart) {
//       await onAddToCart(activeVariant.id, quantity);
//     } else {
//       await new Promise(res => setTimeout(res, 800)); 
//     }
//     setIsAdding(false);
//   };

const handleAddToCart = async () => {
    if (!activeVariant || currentStock === 0) return;
    setIsAdding(true);
    try {
      await addToCart({
        variantId: activeVariant.id,
        productId: product.id,
        name: product.name,
        variantName: activeVariant.size,
        price: Number(activeVariant.price),
        image: activeVariant.image,
        quantity: quantity
      });
      // Reset quantity after adding
      setQuantity(1);
    } catch (error) {
      toast.error('Failed to add item to cart.');
    } finally {
      setIsAdding(false);
    }
  };

//   const handleBuyNow = async () => {
//     if (!activeVariant || currentStock === 0) return;
//     setIsBuying(true);
//     if (onBuyNow) {
//       await onBuyNow(activeVariant.id, quantity);
//     } else {
//       await new Promise(res => setTimeout(res, 800)); 
//       // Typically redirects to checkout here
//     }
//     setIsBuying(false);
//   };

const handleBuyNow = async () => {
    if (!activeVariant || currentStock === 0) return;
    setIsBuying(true);
    try {
      // 1. Add the item to the cart
      await addToCart({
        variantId: activeVariant.id,
        productId: product.id,
        name: product.name,
        variantName: activeVariant.size,
        price: Number(activeVariant.price),
        image: activeVariant.image,
        quantity: quantity
      });
      
      // 2. Once Shopify API is integrated, you will generate a checkoutURL here
      // const checkoutUrl = await createShopifyCheckout(cartId);
      // window.location.href = checkoutUrl;
      
      // For now, redirect to the local cart/checkout page or open cart drawer
      toast.loading('Redirecting to checkout...', { duration: 1500 });
      setTimeout(() => {
        router.push('/checkout'); // Adjust this to your checkout route
      }, 1000);
      
    } catch (error) {
      toast.error('Failed to process Buy Now.');
      setIsBuying(false);
    }
  };

  if (!product) return null; 

  return (
    <div className="bg-white min-h-screen text-zinc-900 font-sans selection:bg-zinc-200">
      
      {/* Top Navigation Bar */}
      <header className="w-full border-b border-zinc-100 bg-white sticky top-0 z-30">
        <div className="container max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          <button 
            onClick={onBack} 
            className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to shop</span>
          </button>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-5 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT: IMAGE GALLERY & MAGNIFIER */}
          <div className="lg:col-span-6 xl:col-span-7 relative lg:sticky lg:top-24">
            <div 
              className="relative aspect-[4/5] md:aspect-square w-full rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center p-6 overflow-hidden group cursor-zoom-in transition-colors duration-300"
              onClick={() => setIsZoomed(true)}
              style={{ borderColor: `${themeColor}20` }}
            >
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundColor: themeColor }} />
              
              <AnimatePresence mode="wait">
                <motion.img 
                  key={displayImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={displayImage} 
                  alt={product.name}
                  className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
                />
              </AnimatePresence>

              <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur px-3 py-2 rounded-full shadow-sm flex items-center gap-2 text-xs font-semibold text-zinc-600 border border-zinc-200 pointer-events-none">
                <ZoomIn className="w-4 h-4" />
                <span className="hidden sm:inline">Magnify</span>
              </div>

              {product.badge && (
                <div 
                  className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest shadow-md" 
                  style={{ backgroundColor: themeColor }}
                >
                  {product.badge}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col">
            
            <div className="flex items-center justify-between mb-4">
              <span style={{ color: themeColor }} className="text-xs font-bold uppercase tracking-wider bg-zinc-50 px-3 py-1 rounded-full border border-zinc-100">
                {product.category}
              </span>
              <button onClick={handleShare} className="p-2 hover:bg-zinc-100 rounded-full transition-colors group">
                <Share2 className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
              </button>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight mb-4">
              {product.name}
            </h1>

            <p className="text-zinc-500 font-medium text-base md:text-lg mb-8 leading-relaxed">
              Premium {product.style || 'custom'} style temporary tattoo. Looks authentic and lasts up to 2 weeks.
            </p>

            <div className="space-y-8 mb-10">
              {/* VARIANTS (SIZE) */}
              {combinations.length > 0 && (
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Select Size</label>
                    <span className={clsx("text-xs font-medium", currentStock > 5 ? "text-zinc-500" : "text-red-500")}>
                      {currentStock > 0 ? `${currentStock} in stock` : 'Out of stock'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {combinations.map((combo) => {
                      const isSelected = activeVariant?.id === combo.id;
                      return (
                        <button
                          key={combo.id}
                          onClick={() => {
                            setActiveVariant(combo);
                            setQuantity(1); 
                          }}
                          style={{ 
                            borderColor: isSelected ? themeColor : '',
                            backgroundColor: isSelected ? `${themeColor}05` : 'white',
                            color: isSelected ? themeColor : ''
                          }}
                          className={clsx(
                            "px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 flex flex-col items-center justify-center gap-1",
                            !isSelected && "border-zinc-200 text-zinc-600 hover:border-zinc-300",
                            combo.stock === 0 && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          <span>{combo.size}</span>
                          <span className="text-xs font-medium opacity-80">${Number(combo.price).toFixed(2)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PRICE & QUANTITY */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-zinc-50 rounded-2xl border border-zinc-100 gap-4">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">Total Price</span>
                  <span className="text-3xl font-extrabold text-zinc-900">
                    ${(parseFloat(currentPrice as string) * quantity).toFixed(2)}
                  </span>
                </div>
                
                <div className="flex items-center bg-white border border-zinc-200 rounded-xl p-1 shadow-sm w-full sm:w-auto justify-between sm:justify-center">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-zinc-50 rounded-lg text-zinc-600 disabled:opacity-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold text-base">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => Math.min(currentStock, q + 1))} 
                    disabled={quantity >= currentStock}
                    className="p-3 hover:bg-zinc-50 rounded-lg text-zinc-600 disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS: ADD TO CART & BUY NOW */}
            {/* <div className="flex flex-col sm:flex-row gap-3 mb-10">
         
              <button 
                onClick={handleAddToCart}
                disabled={isAdding || isBuying || currentStock === 0}
                style={{ 
                  borderColor: currentStock > 0 ? themeColor : '#e4e4e7',
                  color: currentStock > 0 ? themeColor : '#a1a1aa'
                }}
                className={clsx(
                  "flex-1 py-4 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 border-2 transition-all duration-200 bg-white",
                  currentStock > 0 ? "hover:bg-zinc-50 active:scale-[0.99]" : "cursor-not-allowed"
                )}
              >
                <ShoppingCart className="w-5 h-5" />
                {currentStock === 0 ? 'Out of Stock' : isAdding ? 'Adding...' : 'Add To Cart'}
              </button>

            
              <button 
                onClick={handleBuyNow}
                disabled={isAdding || isBuying || currentStock === 0}
                style={{ backgroundColor: currentStock > 0 ? themeColor : '#e4e4e7' }}
                className={clsx(
                  "flex-1 py-4 rounded-xl text-white font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200",
                  currentStock > 0 ? "hover:opacity-90 active:scale-[0.99]" : "text-zinc-400 cursor-not-allowed shadow-none"
                )}
              >
               
                {isBuying ? 'Processing...' : 'Buy Now'}
              </button>
            </div> */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              {/* Add to Cart */}
              <button 
                onClick={handleAddToCart}
                disabled={isAdding || isBuying || currentStock === 0}
                style={{ 
                  borderColor: currentStock > 0 ? themeColor : '#e4e4e7',
                  color: currentStock > 0 ? themeColor : '#a1a1aa'
                }}
                className={clsx(
                  "flex-1 py-4 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 border-2 transition-all duration-200 bg-white",
                  currentStock > 0 ? "hover:bg-zinc-50 active:scale-[0.99]" : "cursor-not-allowed"
                )}
              >
                {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShoppingCart className="w-5 h-5" />}
                {currentStock === 0 ? 'Out of Stock' : isAdding ? 'Adding...' : 'Add To Cart'}
              </button>

              {/* Buy Now */}
              <button 
                onClick={handleBuyNow}
                disabled={isAdding || isBuying || currentStock === 0}
                style={{ backgroundColor: currentStock > 0 ? themeColor : '#e4e4e7' }}
                className={clsx(
                  "flex-1 py-4 rounded-xl text-white font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200",
                  currentStock > 0 ? "hover:opacity-90 active:scale-[0.99]" : "text-zinc-400 cursor-not-allowed shadow-none"
                )}
              >
                {isBuying ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {isBuying ? 'Processing...' : 'Buy Now'}
              </button>
            </div>

            {/* CONTENT TABS */}
            <div className="border-t border-zinc-100 pt-8">
              <div className="flex gap-8 border-b border-zinc-100 mb-6">
                {(['details', 'care'] as const).map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={clsx(
                      "pb-3 text-xs font-semibold uppercase tracking-wider transition-colors relative",
                      activeTab === tab ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-600"
                    )}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ backgroundColor: themeColor }} />
                    )}
                  </button>
                ))}
              </div>

              <div className="min-h-[160px]">
                {activeTab === 'details' && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      Designed by professional artists, our tattoos look incredibly authentic. They are waterproof, non-toxic, and rigorously tested for skin safety.
                    </p>
                    
                    {product?.placements && product.placements.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <span className="text-xs font-semibold uppercase text-zinc-500 tracking-wider">Recommended Placement:</span>
                        <div className="flex flex-wrap gap-2">
                          {product.placements.map(place => (
                            <span key={place} className="px-3 py-1.5 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-md">
                              {place}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
                
                {activeTab === 'care' && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div className="flex gap-4 items-start p-4 rounded-xl bg-zinc-50">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-zinc-600 leading-relaxed"><strong className="text-zinc-900 block font-semibold mb-1">Application</strong> Peel off clear film, place face down on clean skin, and hold a wet cloth firmly against it for 30 seconds before peeling the paper backing.</p>
                    </div>
                    <div className="flex gap-4 items-start p-4 rounded-xl bg-zinc-50">
                      <Droplets className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-zinc-600 leading-relaxed"><strong className="text-zinc-900 block font-semibold mb-1">Aftercare</strong> Avoid scrubbing in the shower. Pat dry gently. Lasts significantly longer on areas with minimal friction and hair.</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* FULL SCREEN MAGNIFIER MODAL */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button 
              onClick={() => setIsZoomed(false)}
              className="absolute md:mt-20 mt-15 top-6 right-4 p-3 bg-zinc-100 hover:bg-zinc-200 rounded-full text-zinc-900 transition-colors z-50"
              aria-label="Close zoom"
            >
              <X className="w-3 h-3" />
            </button>
            <motion.div 
              initial={{ scale: 0.7, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full h-full flex items-center justify-center overflow-auto"
            >
              <img 
                src={displayImage} 
                alt="Magnified view" 
                className="max-w-none md:mt-10 md:max-w-[70vw] md:max-h-[70vh] object-contain cursor-zoom-out"
                onClick={() => setIsZoomed(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}