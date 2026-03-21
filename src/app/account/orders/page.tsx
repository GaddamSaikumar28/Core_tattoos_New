// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import Cookies from "js-cookie";
// // // import Link from "next/link";
// // // import Image from "next/image";
// // // import { getCustomerOrders } from "@/src/lib/shopify";
// // // import { Loader2, Receipt, Printer, PackageSearch, Truck, ExternalLink } from "lucide-react";

// // // export default function OrdersPage() {
// // //   const [orders, setOrders] = useState<any[]>([]);
// // //   const [isLoading, setIsLoading] = useState(true);

// // //   useEffect(() => {
// // //     async function fetchOrders() {
// // //       const token = Cookies.get("shopify_customer_token");
// // //       if (token) {
// // //         try {
// // //           const fetchedOrders = await getCustomerOrders(token);
// // //           setOrders(fetchedOrders);
// // //         } catch (error) {
// // //           console.error("Failed to fetch orders", error);
// // //         }
// // //       }
// // //       setIsLoading(false);
// // //     }
// // //     fetchOrders();
// // //   }, []);

// // //   if (isLoading) {
// // //     return (
// // //       <div className="flex justify-center py-12">
// // //         <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="space-y-6">
// // //       <h1 className="text-3xl mt-10 font-black text-gray-900 mb-2">Order History</h1>
      
// // //       {orders.length === 0 ? (
// // //         <div className="p-12 text-center bg-gray-50 border border-gray-100 rounded-2xl">
// // //           <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-4" />
// // //           <p className="text-gray-500 font-medium">You haven't placed any orders yet.</p>
// // //         </div>
// // //       ) : (
// // //         <div className="space-y-6">
// // //           {orders.map((order) => {
// // //             const fulfillments = order.successfulFulfillments || [];
// // //             const isFulfilled = order.fulfillmentStatus === 'FULFILLED';

// // //             return (
// // //               <div key={order.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                
// // //                 {/* --- HEADER --- */}
// // //                 <div className="p-6 bg-gray-50 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
// // //                   <div>
// // //                     <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">
// // //                       Order {order.orderNumber}
// // //                     </p>
// // //                     <p className="text-sm font-bold text-gray-900">
// // //                       {new Date(order.processedAt).toLocaleDateString('en-US', { 
// // //                         year: 'numeric', month: 'long', day: 'numeric' 
// // //                       })}
// // //                     </p>
// // //                   </div>
                  
// // //                   <div className="flex items-center gap-4">
// // //                     <div className="text-right">
// // //                       <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Total</p>
// // //                       <p className="text-sm font-bold text-gray-900">
// // //                         {order.totalPrice.currencyCode} {order.totalPrice.amount}
// // //                       </p>
// // //                     </div>
// // //                     <button 
// // //                       onClick={() => window.print()} 
// // //                       className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-black hover:border-black transition-colors"
// // //                       title="Print / Save as PDF Invoice"
// // //                     >
// // //                       <Printer className="w-4 h-4" />
// // //                     </button>
// // //                   </div>
// // //                 </div>
                
// // //                 {/* --- BODY --- */}
// // //                 <div className="p-6">
// // //                   {/* Status Badges & Tracking Actions */}
// // //                   <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
// // //                     <div className="flex items-center gap-3">
// // //                       <span className={`px-3 py-1 rounded-full text-xs font-bold ${
// // //                         isFulfilled ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
// // //                       }`}>
// // //                         {order.fulfillmentStatus || 'UNFULFILLED'}
// // //                       </span>
// // //                       <span className={`px-3 py-1 rounded-full text-xs font-bold ${
// // //                         order.financialStatus === 'PAID' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
// // //                       }`}>
// // //                         {order.financialStatus}
// // //                       </span>
// // //                     </div>

// // //                     {/* Tracking Button - Routes to our new Parcel Panel page */}
// // //                     {order.email && order.orderNumber && (
// // //                       <Link 
// // //                         href={`/tracking?order=${encodeURIComponent(order.orderNumber)}&email=${encodeURIComponent(order.email)}`}
// // //                         className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors"
// // //                       >
// // //                         <PackageSearch className="w-4 h-4" />
// // //                         Track Package
// // //                       </Link>
// // //                     )}
// // //                   </div>

// // //                   {/* Raw Tracking Info Display (If Carrier info exists) */}
// // //                   {fulfillments.length > 0 && (
// // //                     <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
// // //                       <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
// // //                         <Truck className="w-4 h-4" /> Shipment Details
// // //                       </h4>
// // //                       <div className="space-y-2">
// // //                         {fulfillments.map((fulfillment: any, idx: number) => (
// // //                           <div key={idx} className="flex items-center justify-between text-sm">
// // //                             <span className="font-medium text-gray-700">
// // //                               {fulfillment.trackingCompany || 'Carrier'}
// // //                             </span>
// // //                             {fulfillment.trackingInfo?.[0]?.number && (
// // //                               <div className="flex items-center gap-2">
// // //                                 <span className="text-gray-500">#{fulfillment.trackingInfo[0].number}</span>
// // //                                 {fulfillment.trackingInfo[0].url && (
// // //                                   <a 
// // //                                     href={fulfillment.trackingInfo[0].url} 
// // //                                     target="_blank" 
// // //                                     rel="noreferrer"
// // //                                     className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
// // //                                     title="View on Carrier Website"
// // //                                   >
// // //                                     <ExternalLink className="w-3 h-3" />
// // //                                   </a>
// // //                                 )}
// // //                               </div>
// // //                             )}
// // //                           </div>
// // //                         ))}
// // //                       </div>
// // //                     </div>
// // //                   )}

// // //                   {/* Products List */}
// // //                   <div className="space-y-4">
// // //                     {order.lineItems.edges.map(({ node: item }: any, idx: number) => (
// // //                       <div key={idx} className="flex items-center gap-4 py-2 border-t border-gray-50 first:border-0 first:pt-0">
// // //                         <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden relative shrink-0">
// // //                           {item.variant?.image && (
// // //                             <Image 
// // //                               src={item.variant.image.url} 
// // //                               alt={item.variant.image.altText || item.title} 
// // //                               fill 
// // //                               className="object-cover" 
// // //                             />
// // //                           )}
// // //                         </div>
// // //                         <div className="flex-1">
// // //                           <p className="text-sm font-bold text-gray-900">{item.title}</p>
// // //                           <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>

// // //                 </div>
// // //               </div>
// // //             );
// // //           })}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }










// // // page.tsx
// // "use client";

// // import { useState, useEffect } from "react";
// // import Cookies from "js-cookie";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { getCustomerOrders } from "@/src/lib/shopify";
// // import { Loader2, Receipt, Printer, PackageSearch, Truck, ExternalLink } from "lucide-react";

// // export default function OrdersPage() {
// //   const [orders, setOrders] = useState<any[]>([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [printingOrderId, setPrintingOrderId] = useState<string | null>(null);

// //   useEffect(() => {
// //     async function fetchOrders() {
// //       const token = Cookies.get("shopify_customer_token");
// //       if (token) {
// //         try {
// //           const fetchedOrders = await getCustomerOrders(token);
// //           setOrders(fetchedOrders);
// //         } catch (error) {
// //           console.error("Failed to fetch orders", error);
// //         }
// //       }
// //       setIsLoading(false);
// //     }
// //     fetchOrders();
// //   }, []);

// //   const handlePrint = (orderId: string) => {
// //     setPrintingOrderId(orderId);
// //     // Give React a tick to render the print layout, then trigger the print dialog
// //     setTimeout(() => {
// //       window.print();
// //       setPrintingOrderId(null);
// //     }, 150);
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="flex justify-center py-12">
// //         <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6 relative">
// //       {/* This CSS block ensures that when printing, EVERYTHING else on the site 
// //         (navbars, footers) is hidden, and ONLY the specific invoice is visible. 
// //       */}
// //       {printingOrderId && (
// //         <style>{`
// //           @media print {
// //             body * {
// //               visibility: hidden;
// //             }
// //             #printable-invoice-${printingOrderId}, #printable-invoice-${printingOrderId} * {
// //               visibility: visible;
// //             }
// //             #printable-invoice-${printingOrderId} {
// //               position: absolute;
// //               left: 0;
// //               top: 0;
// //               width: 100%;
// //               margin: 0;
// //               padding: 0;
// //             }
// //             @page { margin: 1cm; }
// //           }
// //         `}</style>
// //       )}

// //       <h1 className="text-3xl mt-10 font-black text-gray-900 mb-2 print:hidden">Order History</h1>
      
// //       {orders.length === 0 ? (
// //         <div className="p-12 text-center bg-gray-50 border border-gray-100 rounded-2xl print:hidden">
// //           <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-4" />
// //           <p className="text-gray-500 font-medium">You haven't placed any orders yet.</p>
// //         </div>
// //       ) : (
// //         <div className="space-y-6">
// //           {orders.map((order) => {
// //             const fulfillments = order.successfulFulfillments || [];
// //             const isFulfilled = order.fulfillmentStatus === 'FULFILLED';
// //             const address = order.shippingAddress;

// //             return (
// //               <div key={order.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm print:hidden">
                
// //                 {/* --- NORMAL WEB UI HEADER --- */}
// //                 <div className="p-6 bg-gray-50 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
// //                   <div>
// //                     <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">
// //                       Order {order.orderNumber}
// //                     </p>
// //                     <p className="text-sm font-bold text-gray-900">
// //                       {new Date(order.processedAt).toLocaleDateString('en-US', { 
// //                         year: 'numeric', month: 'long', day: 'numeric' 
// //                       })}
// //                     </p>
// //                   </div>
                  
// //                   <div className="flex items-center gap-4">
// //                     <div className="text-right">
// //                       <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Total</p>
// //                       <p className="text-sm font-bold text-gray-900">
// //                         {order.totalPrice.currencyCode} {order.totalPrice.amount}
// //                       </p>
// //                     </div>
// //                     <button 
// //                       onClick={() => handlePrint(order.id)} 
// //                       className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-black hover:border-black transition-colors"
// //                       title="Print / Save as PDF Invoice"
// //                     >
// //                       <Printer className="w-4 h-4" />
// //                     </button>
// //                   </div>
// //                 </div>
                
// //                 {/* --- NORMAL WEB UI BODY --- */}
// //                 <div className="p-6">
// //                   <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
// //                     <div className="flex items-center gap-3">
// //                       <span className={`px-3 py-1 rounded-full text-xs font-bold ${
// //                         isFulfilled ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
// //                       }`}>
// //                         {order.fulfillmentStatus || 'UNFULFILLED'}
// //                       </span>
// //                       <span className={`px-3 py-1 rounded-full text-xs font-bold ${
// //                         order.financialStatus === 'PAID' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
// //                       }`}>
// //                         {order.financialStatus}
// //                       </span>
// //                     </div>

// //                     {order.email && order.orderNumber && (
// //                       <Link 
// //                         href={`/tracking?order=${encodeURIComponent(order.orderNumber)}&email=${encodeURIComponent(order.email)}`}
// //                         className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors"
// //                       >
// //                         <PackageSearch className="w-4 h-4" />
// //                         Track Package
// //                       </Link>
// //                     )}
// //                   </div>

// //                   {fulfillments.length > 0 && (
// //                     <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
// //                       <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
// //                         <Truck className="w-4 h-4" /> Shipment Details
// //                       </h4>
// //                       <div className="space-y-2">
// //                         {fulfillments.map((fulfillment: any, idx: number) => (
// //                           <div key={idx} className="flex items-center justify-between text-sm">
// //                             <span className="font-medium text-gray-700">
// //                               {fulfillment.trackingCompany || 'Carrier'}
// //                             </span>
// //                             {fulfillment.trackingInfo?.[0]?.number && (
// //                               <div className="flex items-center gap-2">
// //                                 <span className="text-gray-500">#{fulfillment.trackingInfo[0].number}</span>
// //                                 {fulfillment.trackingInfo[0].url && (
// //                                   <a 
// //                                     href={fulfillment.trackingInfo[0].url} 
// //                                     target="_blank" 
// //                                     rel="noreferrer"
// //                                     className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
// //                                     title="View on Carrier Website"
// //                                   >
// //                                     <ExternalLink className="w-3 h-3" />
// //                                   </a>
// //                                 )}
// //                               </div>
// //                             )}
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   )}

// //                   <div className="space-y-4">
// //                     {order.lineItems.edges.map(({ node: item }: any, idx: number) => (
// //                       <div key={idx} className="flex items-center gap-4 py-2 border-t border-gray-50 first:border-0 first:pt-0">
// //                         <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden relative shrink-0">
// //                           {item.variant?.image && (
// //                             <Image 
// //                               src={item.variant.image.url} 
// //                               alt={item.variant.image.altText || item.title} 
// //                               fill 
// //                               className="object-cover" 
// //                             />
// //                           )}
// //                         </div>
// //                         <div className="flex-1">
// //                           <p className="text-sm font-bold text-gray-900">{item.title}</p>
// //                           <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* --- HIDDEN PRINT UI (ONLY VISIBLE WHEN PRINTING THIS SPECIFIC ORDER) --- */}
// //                 {printingOrderId === order.id && (
// //                   <div id={`printable-invoice-${order.id}`} className="hidden print:block bg-white text-black p-8 font-sans max-w-4xl mx-auto">
                    
// //                     {/* Header */}
// //                     <div className="flex justify-between items-start border-b-2 border-gray-900 pb-6 mb-8">
// //                       <div>
// //                         {/* You can replace this H1 with an actual <img /> of your logo */}
// //                         <h1 className="text-4xl font-black tracking-tighter uppercase">YOUR LOGO</h1>
// //                         <p className="text-sm text-gray-500 mt-1">support@yourstore.com</p>
// //                       </div>
// //                       <div className="text-right">
// //                         <h2 className="text-3xl font-light text-gray-400 uppercase tracking-widest mb-2">Invoice</h2>
// //                         <p className="text-sm font-bold">Order #{order.orderNumber}</p>
// //                         <p className="text-sm text-gray-500">
// //                           Date: {new Date(order.processedAt).toLocaleDateString()}
// //                         </p>
// //                         <p className="text-sm mt-2">
// //                           Status: <span className="font-bold">{order.financialStatus}</span>
// //                         </p>
// //                       </div>
// //                     </div>

// //                     {/* Customer & Shipping Info */}
// //                     <div className="flex justify-between mb-10 text-sm">
// //                       <div className="w-1/2">
// //                         <h3 className="font-bold uppercase tracking-wider text-xs text-gray-400 mb-2">Billed / Shipped To</h3>
// //                         {address ? (
// //                           <div className="text-gray-800 leading-relaxed">
// //                             <p className="font-bold text-base">{address.name}</p>
// //                             <p>{address.address1}</p>
// //                             {address.address2 && <p>{address.address2}</p>}
// //                             <p>{address.city}, {address.province} {address.zip}</p>
// //                             <p>{address.country}</p>
// //                             <p className="mt-1 text-gray-500">{order.email}</p>
// //                           </div>
// //                         ) : (
// //                           <p className="text-gray-500">No address provided</p>
// //                         )}
// //                       </div>

// //                       {/* Tracking Block */}
// //                       {fulfillments.length > 0 && (
// //                         <div className="w-1/2 text-right">
// //                           <h3 className="font-bold uppercase tracking-wider text-xs text-gray-400 mb-2">Shipment Tracking</h3>
// //                           {fulfillments.map((f: any, idx: number) => (
// //                             <div key={idx} className="mb-2 text-gray-800">
// //                               <p className="font-bold">{f.trackingCompany}</p>
// //                               {f.trackingInfo?.[0]?.number && (
// //                                 <p className="font-mono text-xs">{f.trackingInfo[0].number}</p>
// //                               )}
// //                             </div>
// //                           ))}
// //                         </div>
// //                       )}
// //                     </div>

// //                     {/* Items Table */}
// //                     <table className="w-full text-left mb-8 border-collapse">
// //                       <thead>
// //                         <tr className="border-b-2 border-gray-900 text-xs uppercase tracking-wider text-gray-500">
// //                           <th className="py-3 px-2 font-bold">Item Description</th>
// //                           <th className="py-3 px-2 font-bold text-center">Qty</th>
// //                           <th className="py-3 px-2 font-bold text-right">Unit Price</th>
// //                           <th className="py-3 px-2 font-bold text-right">Total</th>
// //                         </tr>
// //                       </thead>
// //                       <tbody>
// //                         {order.lineItems.edges.map(({ node: item }: any, idx: number) => (
// //                           <tr key={idx} className="border-b border-gray-200">
// //                             <td className="py-4 px-2">
// //                               <div className="flex items-center gap-4">
// //                                 {/* Print-friendly image display */}
// //                                 {item.variant?.image && (
// //                                   <img 
// //                                     src={item.variant.image.url} 
// //                                     alt="Product" 
// //                                     className="w-12 h-12 object-cover rounded-md border border-gray-100"
// //                                   />
// //                                 )}
// //                                 <span className="font-bold text-gray-800 text-sm">{item.title}</span>
// //                               </div>
// //                             </td>
// //                             <td className="py-4 px-2 text-center text-sm">{item.quantity}</td>
// //                             <td className="py-4 px-2 text-right text-sm">
// //                               {item.variant?.price?.currencyCode} {item.variant?.price?.amount}
// //                             </td>
// //                             <td className="py-4 px-2 text-right font-bold text-sm">
// //                               {order.totalPrice.currencyCode} {(parseFloat(item.variant?.price?.amount || "0") * item.quantity).toFixed(2)}
// //                             </td>
// //                           </tr>
// //                         ))}
// //                       </tbody>
// //                     </table>

// //                     {/* Totals Summary */}
// //                     <div className="flex justify-end">
// //                       <div className="w-1/3 space-y-3 text-sm">
// //                         <div className="flex justify-between text-gray-600">
// //                           <span>Subtotal</span>
// //                           <span>{order.subtotalPrice?.currencyCode} {order.subtotalPrice?.amount}</span>
// //                         </div>
// //                         <div className="flex justify-between text-gray-600">
// //                           <span>Shipping</span>
// //                           <span>{order.totalShippingPrice?.currencyCode} {order.totalShippingPrice?.amount}</span>
// //                         </div>
// //                         <div className="flex justify-between text-gray-600 border-b border-gray-200 pb-3">
// //                           <span>Tax</span>
// //                           <span>{order.totalTax?.currencyCode} {order.totalTax?.amount}</span>
// //                         </div>
// //                         <div className="flex justify-between font-black text-lg pt-1">
// //                           <span>Total</span>
// //                           <span>{order.totalPrice.currencyCode} {order.totalPrice.amount}</span>
// //                         </div>
// //                       </div>
// //                     </div>
                    
// //                     {/* Footer */}
// //                     <div className="mt-16 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
// //                       <p>Thank you for your business!</p>
// //                       <p>If you have any questions about this invoice, please contact support.</p>
// //                     </div>

// //                   </div>
// //                 )}
// //                 {/* --- END HIDDEN PRINT UI --- */}

// //               </div>
// //             );
// //           })}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// "use client";

// import { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import Link from "next/link";
// import Image from "next/image";
// import { getCustomerOrders } from "@/src/lib/shopify";
// import { Loader2, Receipt, Printer, PackageSearch, Truck, ExternalLink } from "lucide-react";

// export default function OrdersPage() {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   // Instead of just the ID, let's store the whole order object when printing 
//   // so we can render it cleanly outside the main layout loop.
//   const [printingOrder, setPrintingOrder] = useState<any | null>(null);

//   useEffect(() => {
//     async function fetchOrders() {
//       const token = Cookies.get("shopify_customer_token");
//       if (token) {
//         try {
//           const fetchedOrders = await getCustomerOrders(token);
//           setOrders(fetchedOrders);
//         } catch (error) {
//           console.error("Failed to fetch orders", error);
//         }
//       }
//       setIsLoading(false);
//     }
//     fetchOrders();
//   }, []);

//   // Listen for when the print dialog is closed to clean up the UI
//   useEffect(() => {
//     const handleAfterPrint = () => {
//       setPrintingOrder(null);
//     };
//     window.addEventListener("afterprint", handleAfterPrint);
//     return () => window.removeEventListener("afterprint", handleAfterPrint);
//   }, []);

//   const handlePrint = (order: any) => {
//     setPrintingOrder(order);
//     console.log("in the orders list");
//     console.log(order);
//     // Give React 150ms to render the print layout, then open the print dialog
//     setTimeout(() => {
//       window.print();
//     }, 150);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center py-12">
//         <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* --- NORMAL WEB UI --- */}
//       {/* We apply 'print:hidden' here so the entire normal website disappears natively when printing */}
//       <div className={`space-y-6 ${printingOrder ? "print:hidden" : ""}`}>
//         <h1 className="text-3xl mt-10 font-black text-gray-900 mb-2">Order History</h1>
        
//         {orders.length === 0 ? (
//           <div className="p-12 text-center bg-gray-50 border border-gray-100 rounded-2xl">
//             <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-4" />
//             <p className="text-gray-500 font-medium">You haven't placed any orders yet.</p>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {orders.map((order) => {
//               const fulfillments = order.successfulFulfillments || [];
//               const isFulfilled = order.fulfillmentStatus === 'FULFILLED';

//               return (
//                 <div key={order.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
//                   <div className="p-6 bg-gray-50 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
//                     <div>
//                       <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">
//                         Order {order.orderNumber}
//                       </p>
//                       <p className="text-sm font-bold text-gray-900">
//                         {new Date(order.processedAt).toLocaleDateString('en-US', { 
//                           year: 'numeric', month: 'long', day: 'numeric' 
//                         })}
//                       </p>
//                     </div>
                    
//                     <div className="flex items-center gap-4">
//                       <div className="text-right">
//                         <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Total</p>
//                         <p className="text-sm font-bold text-gray-900">
//                           {order.totalPrice.currencyCode} {order.totalPrice.amount}
//                         </p>
//                       </div>
//                       <button 
//                         onClick={() => handlePrint(order)} 
//                         className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-black hover:border-black transition-colors"
//                         title="Print / Save as PDF Invoice"
//                       >
//                         <Printer className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
                  
//                   <div className="p-6">
//                     <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
//                       <div className="flex items-center gap-3">
//                         <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                           isFulfilled ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
//                         }`}>
//                           {order.fulfillmentStatus || 'UNFULFILLED'}
//                         </span>
//                         <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                           order.financialStatus === 'PAID' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
//                         }`}>
//                           {order.financialStatus}
//                         </span>
//                       </div>

//                       {order.email && order.orderNumber && (
//                         <Link 
//                           href={`/tracking?order=${encodeURIComponent(order.orderNumber)}&email=${encodeURIComponent(order.email)}`}
//                           className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors"
//                         >
//                           <PackageSearch className="w-4 h-4" />
//                           Track Package
//                         </Link>
//                       )}
//                     </div>

//                     {fulfillments.length > 0 && (
//                       <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
//                         <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
//                           <Truck className="w-4 h-4" /> Shipment Details
//                         </h4>
//                         <div className="space-y-2">
//                           {fulfillments.map((fulfillment: any, idx: number) => (
//                             <div key={idx} className="flex items-center justify-between text-sm">
//                               <span className="font-medium text-gray-700">
//                                 {fulfillment.trackingCompany || 'Carrier'}
//                               </span>
//                               {fulfillment.trackingInfo?.[0]?.number && (
//                                 <div className="flex items-center gap-2">
//                                   <span className="text-gray-500">#{fulfillment.trackingInfo[0].number}</span>
//                                   {fulfillment.trackingInfo[0].url && (
//                                     <a 
//                                       href={fulfillment.trackingInfo[0].url} 
//                                       target="_blank" 
//                                       rel="noreferrer"
//                                       className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
//                                     >
//                                       <ExternalLink className="w-3 h-3" />
//                                     </a>
//                                   )}
//                                 </div>
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     <div className="space-y-4">
//                       {order.lineItems.edges.map(({ node: item }: any, idx: number) => (
//                         <div key={idx} className="flex items-center gap-4 py-2 border-t border-gray-50 first:border-0 first:pt-0">
//                           <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden relative shrink-0">
//                             {item.variant?.image && (
//                               <Image 
//                                 src={item.variant.image.url} 
//                                 alt={item.variant.image.altText || item.title} 
//                                 fill 
//                                 className="object-cover" 
//                               />
//                             )}
//                           </div>
//                           <div className="flex-1">
//                             <p className="text-sm font-bold text-gray-900">{item.title}</p>
//                             <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* --- HIDDEN PRINT UI --- */}
//       {/* This sits completely outside your main layout. It only appears when Ctrl+P is triggered. */}
//       {printingOrder && (
//         <div className="hidden print:block absolute inset-0 bg-white text-black p-8 font-sans w-full max-w-4xl mx-auto z-50">
          
//           {/* Header */}
//           <div className="flex justify-between items-start border-b-2 border-gray-900 pb-6 mb-8">
//             <div>
//               {/* Replace YOUR LOGO with <img src="/logo.png" className="h-12" /> */}
//               <h1 className="text-4xl font-black tracking-tighter uppercase">YOUR LOGO</h1>
//               <p className="text-sm text-gray-500 mt-1">support@yourstore.com</p>
//             </div>
//             <div className="text-right">
//               <h2 className="text-3xl font-light text-gray-400 uppercase tracking-widest mb-2">Invoice</h2>
//               <p className="text-sm font-bold">Order #{printingOrder.orderNumber}</p>
//               <p className="text-sm text-gray-500">
//                 Date: {new Date(printingOrder.processedAt).toLocaleDateString()}
//               </p>
//               <p className="text-sm mt-2">
//                 Status: <span className="font-bold">{printingOrder.financialStatus}</span>
//               </p>
//             </div>
//           </div>

//           {/* Customer & Shipping Info */}
//           <div className="flex justify-between mb-10 text-sm">
//             <div className="w-1/2">
//               <h3 className="font-bold uppercase tracking-wider text-xs text-gray-400 mb-2">Billed / Shipped To</h3>
//               {printingOrder.shippingAddress ? (
//                 <div className="text-gray-800 leading-relaxed">
//                   <p className="font-bold text-base">{printingOrder.shippingAddress.name}</p>
//                   <p>{printingOrder.shippingAddress.address1}</p>
//                   {printingOrder.shippingAddress.address2 && <p>{printingOrder.shippingAddress.address2}</p>}
//                   <p>{printingOrder.shippingAddress.city}, {printingOrder.shippingAddress.province} {printingOrder.shippingAddress.zip}</p>
//                   <p>{printingOrder.shippingAddress.country}</p>
//                   <p className="mt-1 text-gray-500">{printingOrder.email}</p>
//                 </div>
//               ) : (
//                 <p className="text-gray-500">No address provided</p>
//               )}
//             </div>

//             {/* Tracking Block */}
//             {printingOrder.successfulFulfillments?.length > 0 && (
//               <div className="w-1/2 text-right">
//                 <h3 className="font-bold uppercase tracking-wider text-xs text-gray-400 mb-2">Shipment Tracking</h3>
//                 {printingOrder.successfulFulfillments.map((f: any, idx: number) => (
//                   <div key={idx} className="mb-2 text-gray-800">
//                     <p className="font-bold">{f.trackingCompany}</p>
//                     {f.trackingInfo?.[0]?.number && (
//                       <p className="font-mono text-xs">{f.trackingInfo[0].number}</p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Items Table */}
//           <table className="w-full text-left mb-8 border-collapse">
//             <thead>
//               <tr className="border-b-2 border-gray-900 text-xs uppercase tracking-wider text-gray-500">
//                 <th className="py-3 px-2 font-bold">Item Description</th>
//                 <th className="py-3 px-2 font-bold text-center">Qty</th>
//                 <th className="py-3 px-2 font-bold text-right">Unit Price</th>
//                 <th className="py-3 px-2 font-bold text-right">Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {printingOrder.lineItems.edges.map(({ node: item }: any, idx: number) => (
//                 <tr key={idx} className="border-b border-gray-200">
//                   <td className="py-4 px-2">
//                     <div className="flex items-center gap-4">
//                       {item.variant?.image && (
//                         <img 
//                           src={item.variant.image.url} 
//                           alt="Product" 
//                           className="w-12 h-12 object-cover rounded-md border border-gray-100"
//                         />
//                       )}
//                       <span className="font-bold text-gray-800 text-sm">{item.title}</span>
//                     </div>
//                   </td>
//                   <td className="py-4 px-2 text-center text-sm">{item.quantity}</td>
//                   <td className="py-4 px-2 text-right text-sm">
//                     {item.variant?.price?.currencyCode} {item.variant?.price?.amount}
//                   </td>
//                   <td className="py-4 px-2 text-right font-bold text-sm">
//                     {printingOrder.totalPrice.currencyCode} {(parseFloat(item.variant?.price?.amount || "0") * item.quantity).toFixed(2)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Totals Summary */}
//           <div className="flex justify-end">
//             <div className="w-1/3 space-y-3 text-sm">
//               <div className="flex justify-between text-gray-600">
//                 <span>Subtotal</span>
//                 <span>{printingOrder.subtotalPrice?.currencyCode} {printingOrder.subtotalPrice?.amount}</span>
//               </div>
//               <div className="flex justify-between text-gray-600">
//                 <span>Shipping</span>
//                 <span>{printingOrder.totalShippingPrice?.currencyCode} {printingOrder.totalShippingPrice?.amount}</span>
//               </div>
//               <div className="flex justify-between text-gray-600 border-b border-gray-200 pb-3">
//                 <span>Tax</span>
//                 <span>{printingOrder.totalTax?.currencyCode} {printingOrder.totalTax?.amount}</span>
//               </div>
//               <div className="flex justify-between font-black text-lg pt-1">
//                 <span>Total</span>
//                 <span>{printingOrder.totalPrice.currencyCode} {printingOrder.totalPrice.amount}</span>
//               </div>
//             </div>
//           </div>
          
//           <div className="mt-16 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
//             <p>Thank you for your business!</p>
//           </div>

//         </div>
//       )}
//     </>
//   );
// }




"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { getCustomerOrders } from "@/src/lib/shopify";
import { Loader2, Receipt, Printer, PackageSearch, Truck, ExternalLink, RotateCcw } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // printMode can be 'single', 'all', or null
  const [printMode, setPrintMode] = useState<'single' | 'all' | null>(null);
  const [printingOrder, setPrintingOrder] = useState<any | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      const token = Cookies.get("shopify_customer_token");
      if (token) {
        try {
          const fetchedOrders = await getCustomerOrders(token);
          setOrders(fetchedOrders);
        } catch (error) {
          console.error("Failed to fetch orders", error);
        }
      }
      setIsLoading(false);
    }
    fetchOrders();
  }, []);

  // Cleanup after print dialog closes
  useEffect(() => {
    const handleAfterPrint = () => {
      setPrintMode(null);
      setPrintingOrder(null);
    };
    window.addEventListener("afterprint", handleAfterPrint);
    return () => window.removeEventListener("afterprint", handleAfterPrint);
  }, []);

  const handlePrintSingle = (order: any) => {
    setPrintingOrder(order);
    setPrintMode('single');
    setTimeout(() => window.print(), 150);
  };

  const handlePrintAll = () => {
    setPrintMode('all');
    setTimeout(() => window.print(), 150);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  // REUSABLE INVOICE COMPONENT FOR PRINTING
  // const PrintInvoice = ({ order }: { order: any }) => (
  //   <div className="bg-white text-black p-8 font-sans w-full max-w-4xl mx-auto" style={{ pageBreakAfter: 'always' }}>
  //     <div className="flex justify-between items-start border-b-2 border-gray-900 pb-6 mb-8">
  //       <div>
  //         <h1 className="text-4xl font-black tracking-tighter uppercase">JUST TATTOOS</h1>
  //         <p className="text-sm text-gray-500 mt-1">support@justtattoos.com</p>
  //       </div>
  //       <div className="text-right">
  //         <h2 className="text-3xl font-light text-gray-400 uppercase tracking-widest mb-2">Invoice</h2>
  //         <p className="text-sm font-bold">Order #{order.orderNumber}</p>
  //         <p className="text-sm text-gray-500">Date: {new Date(order.processedAt).toLocaleDateString()}</p>
  //         <p className="text-sm mt-2 flex justify-end gap-2">
  //           Status: <span className="font-bold">{order.financialStatus}</span>
  //           {order.canceledAt && <span className="text-red-500 font-bold">(CANCELED/RETURNED)</span>}
  //         </p>
  //       </div>
  //     </div>

  //     <div className="flex justify-between mb-10 text-sm">
  //       <div className="w-1/2">
  //         <h3 className="font-bold uppercase tracking-wider text-xs text-gray-400 mb-2">Billed / Shipped To</h3>
  //         {order.shippingAddress ? (
  //           <div className="text-gray-800 leading-relaxed">
  //             <p className="font-bold text-base">{order.shippingAddress.name}</p>
  //             <p>{order.shippingAddress.address1} {order.shippingAddress.address2}</p>
  //             <p>{order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.zip}</p>
  //             <p>{order.shippingAddress.country}</p>
  //             <p className="mt-1 text-gray-500">{order.email}</p>
  //           </div>
  //         ) : (
  //           <p className="text-gray-500">No address provided</p>
  //         )}
  //       </div>
  //     </div>

  //     <table className="w-full text-left mb-8 border-collapse">
  //       <thead>
  //         <tr className="border-b-2 border-gray-900 text-xs uppercase tracking-wider text-gray-500">
  //           <th className="py-3 px-2 font-bold">Item Description</th>
  //           <th className="py-3 px-2 font-bold text-center">Qty</th>
  //           <th className="py-3 px-2 font-bold text-right">Unit Price</th>
  //           <th className="py-3 px-2 font-bold text-right">Total</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {order.lineItems.edges.map(({ node: item }: any, idx: number) => (
  //           <tr key={idx} className="border-b border-gray-200">
  //             <td className="py-4 px-2">
  //               <div className="flex items-center gap-4">
  //                 {item.variant?.image && (
  //                   <img src={item.variant.image.url} alt="Product" className="w-12 h-12 object-cover rounded-md border border-gray-100" />
  //                 )}
  //                 <span className="font-bold text-gray-800 text-sm">{item.title}</span>
  //               </div>
  //             </td>
  //             <td className="py-4 px-2 text-center text-sm">{item.quantity}</td>
  //             <td className="py-4 px-2 text-right text-sm">{item.variant?.price?.currencyCode} {item.variant?.price?.amount}</td>
  //             <td className="py-4 px-2 text-right font-bold text-sm">
  //               {order.totalPrice.currencyCode} {(parseFloat(item.variant?.price?.amount || "0") * item.quantity).toFixed(2)}
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>

  //     <div className="flex justify-end">
  //       <div className="w-1/3 space-y-3 text-sm">
  //         <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{order.subtotalPrice?.amount}</span></div>
  //         <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{order.totalShippingPrice?.amount}</span></div>
  //         <div className="flex justify-between text-gray-600 border-b border-gray-200 pb-3"><span>Tax</span><span>{order.totalTax?.amount}</span></div>
  //         <div className="flex justify-between font-black text-lg pt-1"><span>Total</span><span>{order.totalPrice.currencyCode} {order.totalPrice.amount}</span></div>
  //       </div>
  //     </div>
  //   </div>
  // );
  const PrintInvoice = ({ order }: { order: any }) => {
    // Format currency helper
    const formatCurrency = (amount: string, currency: string) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
      }).format(parseFloat(amount || "0"));
    };

    return (
      <div 
        className="bg-white text-slate-800 p-8 md:p-12 font-sans w-full mx-auto" 
        style={{ pageBreakAfter: 'always', maxWidth: '1000px' }}
      >
        {/* --- HEADER SECTION --- */}
        <div className="flex justify-between items-start border-b border-slate-300 pb-8 mb-8">
          {/* Company Info */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase mb-2">
              JUST TATTOOS
            </h1>
            <p className="text-sm text-slate-500">support@justtattoos.com</p>
            <p className="text-sm text-slate-500">www.justtattoos.com</p>
          </div>

          {/* Invoice Details */}
          <div className="text-right flex flex-col items-end">
            <h2 className="text-3xl font-light text-slate-400 uppercase tracking-widest mb-4">Invoice</h2>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-right">
              <span className="text-slate-500">Order Number:</span>
              <span className="font-bold text-slate-900">#{order.orderNumber}</span>
              
              <span className="text-slate-500">Date:</span>
              <span className="font-medium text-slate-900">
                {new Date(order.processedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', month: 'short', day: 'numeric' 
                })}
              </span>

              <span className="text-slate-500">Status:</span>
              <span className="font-medium">
                {order.canceledAt ? (
                  <span className="text-red-600 font-bold border border-red-200 px-2 py-0.5 rounded text-xs inline-block">CANCELED</span>
                ) : (
                  <span className="text-slate-900">{order.financialStatus}</span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* --- CUSTOMER DETAILS SECTION --- */}
        <div className="mb-10">
          <h3 className="font-bold uppercase tracking-widest text-xs text-slate-400 mb-4 border-b border-slate-100 pb-2">
            Shipping Information
          </h3>
          {order.shippingAddress ? (
            <div className="text-sm text-slate-700 leading-relaxed">
              <p className="font-bold text-slate-900 text-base mb-1">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.address1} {order.shippingAddress.address2}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.zip}</p>
              <p className="text-slate-500 mt-1">{order.shippingAddress.country}</p>
              <p className="text-slate-500 mt-2 font-medium">{order.email}</p>
            </div>
          ) : (
            <p className="text-sm text-slate-400 italic">No shipping address provided.</p>
          )}
        </div>

        {/* --- ORDER ITEMS TABLE --- */}
        <div className="mb-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-800 text-xs uppercase tracking-wider text-slate-500">
                <th className="py-3 px-2 font-bold w-16">Item</th>
                <th className="py-3 px-2 font-bold">Description</th>
                <th className="py-3 px-2 font-bold text-center w-20">Qty</th>
                <th className="py-3 px-2 font-bold text-right w-28">Price</th>
                <th className="py-3 px-2 font-bold text-right w-32">Total</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {order.lineItems.edges.map(({ node: item }: any, idx: number) => {
                const itemPrice = parseFloat(item.variant?.price?.amount || "0");
                const itemTotal = itemPrice * item.quantity;
                const currency = item.variant?.price?.currencyCode || order.totalPrice.currencyCode || "USD";

                return (
                  <tr key={idx} className="border-b border-slate-200 break-inside-avoid">
                    <td className="py-4 px-2 align-top">
                      {item.variant?.image ? (
                        <img 
                          src={item.variant.image.url} 
                          alt="Product" 
                          className="w-12 h-12 object-cover rounded border border-slate-200"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-slate-100 rounded border border-slate-200"></div>
                      )}
                    </td>
                    <td className="py-4 px-2 align-top">
                      <span className="font-bold text-slate-900 block mb-1">{item.title}</span>
                      {/* You can add variant options here if needed later */}
                    </td>
                    <td className="py-4 px-2 text-center align-top text-slate-700">
                      {item.quantity}
                    </td>
                    <td className="py-4 px-2 text-right align-top text-slate-700">
                      {formatCurrency(itemPrice.toString(), currency)}
                    </td>
                    <td className="py-4 px-2 text-right align-top font-bold text-slate-900">
                      {formatCurrency(itemTotal.toString(), currency)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* --- TOTALS SECTION --- */}
        <div className="flex justify-end break-inside-avoid">
          <div className="w-full sm:w-1/2 md:w-1/3 space-y-3 text-sm">
            <div className="flex justify-between text-slate-600 px-2">
              <span>Subtotal</span>
              <span>{formatCurrency(order.subtotalPrice?.amount, order.subtotalPrice?.currencyCode)}</span>
            </div>
            <div className="flex justify-between text-slate-600 px-2">
              <span>Shipping</span>
              <span>{formatCurrency(order.totalShippingPrice?.amount, order.totalShippingPrice?.currencyCode)}</span>
            </div>
            <div className="flex justify-between text-slate-600 border-b border-slate-200 pb-3 px-2">
              <span>Tax</span>
              <span>{formatCurrency(order.totalTax?.amount, order.totalTax?.currencyCode)}</span>
            </div>
            <div className="flex justify-between font-black text-xl pt-2 px-2 text-slate-900">
              <span>Total</span>
              <span>{formatCurrency(order.totalPrice?.amount, order.totalPrice?.currencyCode)}</span>
            </div>
          </div>
        </div>

        {/* --- FOOTER --- */}
        <div className="mt-16 pt-8 border-t border-slate-200 text-center text-xs text-slate-500 break-inside-avoid">
          <p className="font-bold text-slate-700 mb-1">Thank you for your business!</p>
          <p>If you have any questions regarding this invoice, please contact our support team.</p>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* NORMAL WEB UI */}
      <div className={`space-y-6 ${printMode ? "print:hidden" : ""}`}>
        
        <div className="flex justify-between items-end mt-10 mb-2">
          <h1 className="text-3xl font-black text-gray-900">Order History</h1>
          {orders.length > 0 && (
            <button 
              onClick={handlePrintAll}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print All Orders
            </button>
          )}
        </div>
        
        {orders.length === 0 ? (
          <div className="p-12 text-center bg-gray-50 border border-gray-100 rounded-2xl">
            <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const fulfillments = order.successfulFulfillments || [];
              const isRefunded = order.financialStatus.includes('REFUNDED');
              const isCanceled = !!order.canceledAt;

              return (
                <div key={order.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  {/* Web Header */}
                  <div className="p-6 bg-gray-50 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Order {order.orderNumber}</p>
                      <p className="text-sm font-bold text-gray-900">
                        {new Date(order.processedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Total</p>
                        <p className="text-sm font-bold text-gray-900">
                          {order.totalPrice.currencyCode} {order.totalPrice.amount}
                        </p>
                      </div>
                      <button 
                        onClick={() => handlePrintSingle(order)} 
                        className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-black hover:border-black transition-colors"
                        title="Print Invoice"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Web Body */}
                  <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
                          {order.fulfillmentStatus || 'UNFULFILLED'}
                        </span>
                        
                        {/* Status Badges for Refunds/Returns */}
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          isRefunded ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {order.financialStatus}
                        </span>

                        {isCanceled && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                            CANCELED / RETURNED
                          </span>
                        )}
                      </div>

                      <div className="flex gap-3">
                        {/* Return Items Button linking to your returns portal */}
                        {!isCanceled && !isRefunded && (
                           <Link 
                             href="/returns" // Change this to your Shopify Returns portal URL
                             className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors"
                           >
                             <RotateCcw className="w-4 h-4" />
                             Return Items
                           </Link>
                        )}
                        <Link 
                          href={order.statusUrl} // Native shopify status url
                          target="_blank"
                          className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          <PackageSearch className="w-4 h-4" />
                          View Full Status
                        </Link>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {order.lineItems.edges.map(({ node: item }: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-4 py-2 border-t border-gray-50 first:border-0 first:pt-0">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden relative shrink-0">
                            {item.variant?.image && (
                              <img src={item.variant.image.url} alt={item.title} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900">{item.title}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* HIDDEN PRINT UI */}
      {printMode && (
        <div className="hidden print:block absolute inset-0 bg-white w-full z-50">
          {printMode === 'single' && printingOrder && (
            <PrintInvoice order={printingOrder} />
          )}
          
          {printMode === 'all' && orders.map(order => (
            <PrintInvoice key={order.id} order={order} />
          ))}
        </div>
      )}
    </>
  );
}