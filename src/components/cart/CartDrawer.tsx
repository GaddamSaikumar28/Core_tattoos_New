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
//       {isCartOpen && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setCartOpen(false)}
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
//           />

//           {/* Drawer */}
//           <motion.div
//             initial={{ x: '100%' }}
//             animate={{ x: 0 }}
//             exit={{ x: '100%' }}
//             transition={{ type: 'spring', damping: 25, stiffness: 200 }}
//             className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between p-5 border-b border-gray-100">
//               <div className="flex items-center gap-2">
//                 <ShoppingBag className="w-5 h-5 text-gray-900" />
//                 <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
//                 <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
//                   {cartCount}
//                 </span>
//               </div>
//               <button
//                 onClick={() => setCartOpen(false)}
//                 className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Scrollable Cart Items */}
//             <div className="flex-1 overflow-y-auto p-5">
//               {cart.length === 0 ? (
//                 <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
//                   <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
//                     <ShoppingBag className="w-10 h-10 text-gray-300" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-900">Your cart is empty</h3>
//                     <p className="text-gray-500 mt-1">Looks like you haven't added any tattoos yet.</p>
//                   </div>
//                   <button
//                     onClick={() => setCartOpen(false)}
//                     className="mt-4 text-[#fe8204] font-bold hover:underline"
//                   >
//                     Continue Shopping
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex flex-col">
//                   {cart.map((item) => (
//                     <CartItemCard key={`${item.productId}-${item.variantId}`} item={item} compact={true} />
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Footer Summary */}
//             {cart.length > 0 && (
//               <div className="border-t border-gray-100 p-5 bg-gray-50/50">
//                 <div className="flex justify-between items-center mb-4 text-sm">
//                   <span className="text-gray-600 font-medium">Subtotal</span>
//                   <span className="font-bold text-lg">${cartTotal.toFixed(2)}</span>
//                 </div>
//                 <p className="text-xs text-gray-500 mb-4">Shipping, taxes, and discounts calculated at checkout.</p>
                
//                 <div className="flex flex-col gap-2">
//                   <button
//                     onClick={handleCheckout}
//                     className="w-full bg-[#fe8204] hover:bg-[#e07300] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#fe8204]/20 transition-all active:scale-[0.98]"
//                   >
//                     Proceed to Checkout <ArrowRight className="w-4 h-4" />
//                   </button>
//                   <Link 
//                     href="/cart"
//                     onClick={() => setCartOpen(false)}
//                     className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 py-3.5 rounded-xl font-bold flex items-center justify-center transition-all"
//                   >
//                     View Full Cart
//                   </Link>
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }


'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/src/context/CartContext';
import { CartItemCard } from './CartItemCard';

export function CartDrawer() {
  const { isCartOpen, setCartOpen, cart, cartTotal, cartCount } = useCart();
  const router = useRouter();

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isCartOpen]);

  const handleCheckout = () => {
    setCartOpen(false);
    router.push('/checkout');
  };

  return (
    <AnimatePresence>
      {/* FIX 1: Removed Fragment (<>)
        FIX 2: Added explicit key="backdrop" and key="drawer"
        FIX 3: Increased z-index to 100 and 110 to cover Header (z-50)
      */}
      {isCartOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
        />
      )}

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
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gray-900" />
              <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
              <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </div>
            <button
              onClick={() => setCartOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Cart Items */}
          <div className="flex-1 overflow-y-auto p-5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 text-gray-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Your cart is empty</h3>
                  <p className="text-gray-500 mt-1">Looks like you haven't added any tattoos yet.</p>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="mt-4 text-[#fe8204] font-bold hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="flex flex-col">
                {cart.map((item) => (
                  <CartItemCard key={`${item.productId}-${item.variantId}`} item={item} compact={true} />
                ))}
              </div>
            )}
          </div>

          {/* Footer Summary */}
          {cart.length > 0 && (
            <div className="border-t border-gray-100 p-5 bg-gray-50/50">
              <div className="flex justify-between items-center mb-4 text-sm">
                <span className="text-gray-600 font-medium">Subtotal</span>
                <span className="font-bold text-lg">${cartTotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">Shipping, taxes, and discounts calculated at checkout.</p>
              
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#fe8204] hover:bg-[#e07300] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#fe8204]/20 transition-all active:scale-[0.98]"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
                <Link 
                  href="/cart"
                  onClick={() => setCartOpen(false)}
                  className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 py-3.5 rounded-xl font-bold flex items-center justify-center transition-all"
                >
                  View Full Cart
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}