// app/account/orders/page.tsx
"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getCustomerOrders } from "@/src/lib/shopify";
import { Loader2, Receipt, ExternalLink, Printer } from "lucide-react";
import Image from "next/image";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-gray-900">Order History</h1>
      
      {orders.length === 0 ? (
        <div className="p-12 text-center bg-gray-50 border border-gray-100 rounded-2xl">
          <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 bg-gray-50 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Order {order.orderNumber}</p>
                  <p className="text-sm font-bold text-gray-900">
                    {new Date(order.processedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Total</p>
                    <p className="text-sm font-bold text-gray-900">{order.totalPrice.currencyCode} {order.totalPrice.amount}</p>
                  </div>
                  <button 
                    onClick={() => window.print()} 
                    className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-[var(--color-brand-orange)] hover:border-[var(--color-brand-orange)] transition-colors"
                    title="Print / Save as PDF Invoice"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.fulfillmentStatus === 'FULFILLED' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {order.fulfillmentStatus || 'UNFULFILLED'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.financialStatus === 'PAID' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {order.financialStatus}
                  </span>
                </div>

                <div className="space-y-4">
                  {order.lineItems.edges.map(({ node: item }: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden relative shrink-0">
                        {item.variant?.image && (
                          <Image src={item.variant.image.url} alt={item.variant.image.altText || item.title} fill className="object-cover" />
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
          ))}
        </div>
      )}
    </div>
  );
}