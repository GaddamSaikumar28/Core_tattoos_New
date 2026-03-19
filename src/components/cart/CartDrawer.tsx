// // 'use client';

// // import React, { useEffect } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { X, ShoppingBag, ArrowRight } from 'lucide-react';
// // import Link from 'next/link';
// // import { useRouter } from 'next/navigation';
// // import { useCart } from '@/src/context/CartContext';
// // import { CartItemCard } from './CartItemCard';

// // export function CartDrawer() {
// //   const { isCartOpen, setCartOpen, cart, cartTotal, cartCount } = useCart();
// //   const router = useRouter();

// //   // Prevent background scrolling when drawer is open
// //   useEffect(() => {
// //     if (isCartOpen) {
// //       document.body.style.overflow = 'hidden';
// //     } else {
// //       document.body.style.overflow = 'unset';
// //     }
// //     return () => { document.body.style.overflow = 'unset'; };
// //   }, [isCartOpen]);

// //   const handleCheckout = () => {
// //     setCartOpen(false);
// //     router.push('/checkout');
// //   };

// //   return (
// //     <AnimatePresence>
// //       {isCartOpen && (
// //         <>
// //           {/* Backdrop */}
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             onClick={() => setCartOpen(false)}
// //             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
// //           />

// //           {/* Drawer */}
// //           <motion.div
// //             initial={{ x: '100%' }}
// //             animate={{ x: 0 }}
// //             exit={{ x: '100%' }}
// //             transition={{ type: 'spring', damping: 25, stiffness: 200 }}
// //             className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
// //           >
// //             {/* Header */}
// //             <div className="flex items-center justify-between p-5 border-b border-gray-100">
// //               <div className="flex items-center gap-2">
// //                 <ShoppingBag className="w-5 h-5 text-gray-900" />
// //                 <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
// //                 <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
// //                   {cartCount}
// //                 </span>
// //               </div>
// //               <button
// //                 onClick={() => setCartOpen(false)}
// //                 className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
// //               >
// //                 <X className="w-5 h-5" />
// //               </button>
// //             </div>

// //             {/* Scrollable Cart Items */}
// //             <div className="flex-1 overflow-y-auto p-5">
// //               {cart.length === 0 ? (
// //                 <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
// //                   <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
// //                     <ShoppingBag className="w-10 h-10 text-gray-300" />
// //                   </div>
// //                   <div>
// //                     <h3 className="text-lg font-bold text-gray-900">Your cart is empty</h3>
// //                     <p className="text-gray-500 mt-1">Looks like you haven't added any tattoos yet.</p>
// //                   </div>
// //                   <button
// //                     onClick={() => setCartOpen(false)}
// //                     className="mt-4 text-[#fe8204] font-bold hover:underline"
// //                   >
// //                     Continue Shopping
// //                   </button>
// //                 </div>
// //               ) : (
// //                 <div className="flex flex-col">
// //                   {cart.map((item) => (
// //                     <CartItemCard key={`${item.productId}-${item.variantId}`} item={item} compact={true} />
// //                   ))}
// //                 </div>
// //               )}
// //             </div>

// //             {/* Footer Summary */}
// //             {cart.length > 0 && (
// //               <div className="border-t border-gray-100 p-5 bg-gray-50/50">
// //                 <div className="flex justify-between items-center mb-4 text-sm">
// //                   <span className="text-gray-600 font-medium">Subtotal</span>
// //                   <span className="font-bold text-lg">${cartTotal.toFixed(2)}</span>
// //                 </div>
// //                 <p className="text-xs text-gray-500 mb-4">Shipping, taxes, and discounts calculated at checkout.</p>
                
// //                 <div className="flex flex-col gap-2">
// //                   <button
// //                     onClick={handleCheckout}
// //                     className="w-full bg-[#fe8204] hover:bg-[#e07300] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#fe8204]/20 transition-all active:scale-[0.98]"
// //                   >
// //                     Proceed to Checkout <ArrowRight className="w-4 h-4" />
// //                   </button>
// //                   <Link 
// //                     href="/cart"
// //                     onClick={() => setCartOpen(false)}
// //                     className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 py-3.5 rounded-xl font-bold flex items-center justify-center transition-all"
// //                   >
// //                     View Full Cart
// //                   </Link>
// //                 </div>
// //               </div>
// //             )}
// //           </motion.div>
// //         </>
// //       )}
// //     </AnimatePresence>
// //   );
// // }


// 'use client';

// import React, { useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, ShoppingBag, ArrowRight } from 'lucide-react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useCart } from '@/src/context/CartContext';
// import { CartItemCard } from './CartItemCard';

// export function CartDrawer() {
//   const { isCartOpen, setCartOpen, cart, cartTotal, cartCount } = useCart();
//   const router = useRouter();

//   // Prevent background scrolling when drawer is open
//   useEffect(() => {
//     if (isCartOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => { document.body.style.overflow = 'unset'; };
//   }, [isCartOpen]);

//   const handleCheckout = () => {
//     setCartOpen(false);
//     router.push('/checkout');
//   };

//   return (
//     <AnimatePresence>
//       {/* FIX 1: Removed Fragment (<>)
//         FIX 2: Added explicit key="backdrop" and key="drawer"
//         FIX 3: Increased z-index to 100 and 110 to cover Header (z-50)
//       */}
//       {isCartOpen && (
//         <motion.div
//           key="backdrop"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={() => setCartOpen(false)}
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
//         />
//       )}

//       {isCartOpen && (
//         <motion.div
//           key="drawer"
//           initial={{ x: '100%' }}
//           animate={{ x: 0 }}
//           exit={{ x: '100%' }}
//           transition={{ type: 'spring', damping: 25, stiffness: 200 }}
//           className="fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-white shadow-2xl z-[110] flex flex-col"
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between p-5 border-b border-gray-100">
//             <div className="flex items-center gap-2">
//               <ShoppingBag className="w-5 h-5 text-gray-900" />
//               <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
//               <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
//                 {cartCount}
//               </span>
//             </div>
//             <button
//               onClick={() => setCartOpen(false)}
//               className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Scrollable Cart Items */}
//           <div className="flex-1 overflow-y-auto p-5">
//             {cart.length === 0 ? (
//               <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
//                 <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
//                   <ShoppingBag className="w-10 h-10 text-gray-300" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-900">Your cart is empty</h3>
//                   <p className="text-gray-500 mt-1">Looks like you haven't added any tattoos yet.</p>
//                 </div>
//                 <button
//                   onClick={() => setCartOpen(false)}
//                   className="mt-4 text-[#fe8204] font-bold hover:underline"
//                 >
//                   Continue Shopping
//                 </button>
//               </div>
//             ) : (
//               <div className="flex flex-col">
//                 {cart.map((item) => (
//                   <CartItemCard key={`${item.productId}-${item.variantId}`} item={item} compact={true} />
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Footer Summary */}
//           {cart.length > 0 && (
//             <div className="border-t border-gray-100 p-5 bg-gray-50/50">
//               <div className="flex justify-between items-center mb-4 text-sm">
//                 <span className="text-gray-600 font-medium">Subtotal</span>
//                 <span className="font-bold text-lg">${cartTotal.toFixed(2)}</span>
//               </div>
//               <p className="text-xs text-gray-500 mb-4">Shipping, taxes, and discounts calculated at checkout.</p>
              
//               <div className="flex flex-col gap-2">
//                 <button
//                   onClick={handleCheckout}
//                   className="w-full bg-[#fe8204] hover:bg-[#e07300] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#fe8204]/20 transition-all active:scale-[0.98]"
//                 >
//                   Proceed to Checkout <ArrowRight className="w-4 h-4" />
//                 </button>
//                 <Link 
//                   href="/cart"
//                   onClick={() => setCartOpen(false)}
//                   className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 py-3.5 rounded-xl font-bold flex items-center justify-center transition-all"
//                 >
//                   View Full Cart
//                 </Link>
//               </div>
//             </div>
//           )}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }


'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight, Loader2, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/src/context/CartContext';
import { CartItem } from '@/src/lib/shopify';

export function CartDrawer() {
  const { 
    isCartOpen, 
    setCartOpen, 
    cart, 
    cartCount, 
    isCartLoading 
  } = useCart();

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isCartOpen]);

  // Use Shopify's native, secure checkout URL
  const handleCheckout = () => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  };

  const isEmpty = !cart || cart.lines.length === 0;
  const subtotal = cart?.cost?.subtotalAmount?.amount || '0.00';
  const currency = cart?.cost?.subtotalAmount?.currencyCode || 'USD';

  return (
    <AnimatePresence>
      {/* Backdrop */}
      {isCartOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
        />
      )}

      {/* Drawer */}
      {isCartOpen && (
        <motion.div
          key="drawer"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-white shadow-2xl z-[110] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white z-10">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gray-900" />
              <h2 className="text-lg font-black uppercase tracking-widest text-gray-900">Your Cart</h2>
              {cartCount > 0 && (
                <span className="bg-[var(--color-brand-orange)] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
            <button
              onClick={() => setCartOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Cart Items */}
          <div className="flex-1 overflow-y-auto p-5 no-scrollbar bg-gray-50/30">
            {isCartLoading ? (
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-8 h-8 text-[var(--color-brand-orange)] animate-spin" />
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Loading Cart...</p>
              </div>
            ) : isEmpty ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center border-2 border-dashed border-gray-200">
                  <ShoppingBag className="w-10 h-10 text-gray-300" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Your cart is empty</h3>
                  <p className="text-gray-500 mt-2 text-sm font-medium">Looks like you haven't added any tattoos yet.</p>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="mt-6 px-8 py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-[var(--color-brand-orange)] transition-colors shadow-md text-sm uppercase tracking-widest"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {cart.lines.map((line) => (
                  <CartLineItem key={line.id} line={line} />
                ))}
              </div>
            )}
          </div>

          {/* Footer Summary */}
          {!isEmpty && (
            <div className="border-t border-gray-100 p-6 bg-white shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] z-10">
              <div className="flex justify-between items-end mb-4">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Subtotal</span>
                <span className="font-black text-2xl text-gray-900">
                  {currency === 'USD' ? '$' : ''}{subtotal}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-medium mb-6">Shipping, taxes, and discount codes calculated at checkout.</p>
              
              <button
                onClick={handleCheckout}
                className="w-full bg-[#fe8204] hover:bg-[#e07300] text-white py-4.5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-[#fe8204]/20 transition-all active:scale-[0.98]"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// =========================================================
// SUB-COMPONENT: Single Cart Line Item 
// =========================================================
function CartLineItem({ line }: { line: CartItem }) {
  const { updateQuantity, removeLineItem } = useCart();
  const product = line.merchandise.product;
  const image = product.featuredImage?.url || '/placeholder.png';
  
  // Shopify returns "Default Title" if a product has no variants. We hide it.
  const variantTitle = line.merchandise.title === "Default Title" ? null : line.merchandise.title;
  const price = line.cost.totalAmount.amount;
  const currency = line.cost.totalAmount.currencyCode;

  return (
    <div className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm relative group">
      
      {/* Image */}
      <div className="relative w-20 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
        <Image 
          src={image} 
          alt={product.title} 
          fill 
          sizes="80px"
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 justify-between py-0.5">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h4 className="text-sm font-bold text-gray-900 leading-tight">
              {product.title}
            </h4>
            {variantTitle && (
              <p className="text-xs text-gray-500 mt-1 font-medium">{variantTitle}</p>
            )}
          </div>
          <button 
            onClick={() => removeLineItem(line.id)}
            className="text-gray-300 hover:text-red-500 transition-colors p-1"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          {/* Quantity Controls */}
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-0.5">
            <button 
              onClick={() => updateQuantity(line.id, line.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 hover:shadow-sm rounded-md transition-all"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-xs font-bold text-gray-900">
              {line.quantity}
            </span>
            <button 
              onClick={() => updateQuantity(line.id, line.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 hover:shadow-sm rounded-md transition-all"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Price */}
          <div className="text-sm font-black text-gray-900">
            {currency === 'USD' ? '$' : ''}{Number(price).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}