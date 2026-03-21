"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { getCustomerOrders } from "@/src/lib/shopify";
import { Loader2, Receipt, Printer, PackageSearch, RotateCcw } from "lucide-react";

// ---------------------------------------------------------------------------
// PROFESSIONAL INVOICE COMPONENT
// Extracted outside the main component to prevent unnecessary re-renders
// ---------------------------------------------------------------------------
const PrintInvoice = ({ order }: { order: any }) => {
  const formatCurrency = (amount: string, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(parseFloat(amount || "0"));
  };

  return (
    <div
      className="bg-white text-black p-8 md:p-12 w-full max-w-5xl mx-auto"
      style={{ pageBreakAfter: "always" }}
    >
      {/* HEADER SECTION */}
      <div className="flex justify-between items-start border-b-2 border-black pb-8 mb-8">
        <div>
          {/* <h1 className="text-4xl font-black tracking-tighter uppercase text-black mb-2">
            JUST TATTOOS
          </h1> */}
          <img 
            src="/assets/icons/Fotterlogo2.svg" 
            alt="JUST TATTOOS" 
            className="h-12 w-auto mb-4 object-contain print:grayscale" 
          />
          <p className="text-sm text-gray-600">123 Inkwell Avenue, Suite 100</p>
          <p className="text-sm text-gray-600">Art District, NY 10001</p>
          <p className="text-sm text-gray-600 mt-1">support@justtattoos.com | www.justtattoos.com</p>
        </div>

        <div className="text-right flex flex-col items-end">
          <h2 className="text-4xl font-light text-gray-300 uppercase tracking-widest mb-4">
            Invoice
          </h2>
          <table className="text-sm text-right">
            <tbody>
              <tr>
                <td className="pr-4 text-gray-500 py-1">Order Number:</td>
                <td className="font-bold text-black py-1">#{order.orderNumber}</td>
              </tr>
              <tr>
                <td className="pr-4 text-gray-500 py-1">Date:</td>
                <td className="font-bold text-black py-1">
                  {new Date(order.processedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
              </tr>
              <tr>
                <td className="pr-4 text-gray-500 py-1">Status:</td>
                <td className="font-bold py-1">
                  {order.canceledAt ? (
                    <span className="text-black border border-black px-2 py-0.5 rounded text-xs uppercase tracking-wider">
                      Canceled / Returned
                    </span>
                  ) : (
                    <span className="text-black uppercase tracking-wider text-xs">
                      {order.financialStatus}
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CUSTOMER DETAILS SECTION */}
      <div className="mb-12 flex justify-between">
        <div className="w-1/2">
          <h3 className="font-bold uppercase tracking-widest text-xs text-gray-400 mb-3 border-b border-gray-200 pb-2">
            Billed / Shipped To
          </h3>
          {order.shippingAddress ? (
            <div className="text-sm text-gray-800 leading-relaxed">
              <p className="font-bold text-black text-base mb-1">
                {order.shippingAddress.name}
              </p>
              <p>{order.shippingAddress.address1} {order.shippingAddress.address2}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.province}{" "}
                {order.shippingAddress.zip}
              </p>
              <p className="text-gray-500 mt-1">{order.shippingAddress.country}</p>
              <p className="text-gray-500 mt-2 font-medium">{order.email}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic">No shipping address provided.</p>
          )}
        </div>
      </div>

      {/* ORDER ITEMS TABLE */}
      <div className="mb-12">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-black text-xs uppercase tracking-wider text-gray-500">
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
              const currency =
                item.variant?.price?.currencyCode ||
                order.totalPrice.currencyCode ||
                "USD";

              return (
                <tr key={idx} className="border-b border-gray-200 break-inside-avoid">
                  <td className="py-4 px-2 align-top">
                    {item.variant?.image ? (
                      <img
                        src={item.variant.image.url}
                        alt="Product"
                        className="w-12 h-12 object-cover rounded border border-gray-200 print:border-gray-400"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded border border-gray-200 print:border-gray-400"></div>
                    )}
                  </td>
                  <td className="py-4 px-2 align-top">
                    <span className="font-bold text-black block mb-1">
                      {item.title}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-center align-top text-gray-700">
                    {item.quantity}
                  </td>
                  <td className="py-4 px-2 text-right align-top text-gray-700">
                    {formatCurrency(itemPrice.toString(), currency)}
                  </td>
                  <td className="py-4 px-2 text-right align-top font-bold text-black">
                    {formatCurrency(itemTotal.toString(), currency)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* TOTALS SECTION */}
      <div className="flex justify-end break-inside-avoid">
        <div className="w-full sm:w-1/2 md:w-1/3 space-y-3 text-sm">
          <div className="flex justify-between text-gray-600 px-2">
            <span>Subtotal</span>
            <span>
              {formatCurrency(
                order.subtotalPrice?.amount,
                order.subtotalPrice?.currencyCode
              )}
            </span>
          </div>
          <div className="flex justify-between text-gray-600 px-2">
            <span>Shipping</span>
            <span>
              {formatCurrency(
                order.totalShippingPrice?.amount,
                order.totalShippingPrice?.currencyCode
              )}
            </span>
          </div>
          <div className="flex justify-between text-gray-600 border-b border-gray-200 pb-3 px-2">
            <span>Tax</span>
            <span>
              {formatCurrency(
                order.totalTax?.amount,
                order.totalTax?.currencyCode
              )}
            </span>
          </div>
          <div className="flex justify-between font-black text-xl pt-2 px-2 text-black">
            <span>Total</span>
            <span>
              {formatCurrency(
                order.totalPrice?.amount,
                order.totalPrice?.currencyCode
              )}
            </span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-20 pt-8 border-t border-gray-200 text-center text-xs text-gray-500 break-inside-avoid">
        <p className="font-bold text-black mb-1 text-sm">Thank you for your business!</p>
        <p>If you have any questions regarding this invoice, please contact our support team at support@justtattoos.com.</p>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// MAIN PAGE COMPONENT
// ---------------------------------------------------------------------------
export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // printMode can be 'single', 'all', or null
  const [printMode, setPrintMode] = useState<"single" | "all" | null>(null);
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
    setPrintMode("single");
    // Increased timeout slightly to ensure React renders the DOM before browser hooks print
    setTimeout(() => window.print(), 250);
  };

  const handlePrintAll = () => {
    setPrintMode("all");
    setTimeout(() => window.print(), 250);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <>
      {/* MAGIC CSS INJECTION 
        This is what hides your global layouts (navbars, footers) ONLY during printing,
        pulling the invoice container (#print-root) to the front and top of the page.
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #print-root, #print-root * {
            visibility: visible;
          }
          #print-root {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
          }
        }
      `}} />

      {/* NORMAL WEB UI */}
      <div className={`space-y-6 ${printMode ? "hidden" : "block"}`}>
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
            <p className="text-gray-500 font-medium">
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const isRefunded = order.financialStatus.includes("REFUNDED");
              const isCanceled = !!order.canceledAt;

              return (
                <div
                  key={order.id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
                >
                  {/* Web Header */}
                  <div className="p-6 bg-gray-50 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">
                        Order {order.orderNumber}
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {new Date(order.processedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">
                          Total
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          {order.totalPrice.currencyCode}{" "}
                          {order.totalPrice.amount}
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
                          {order.fulfillmentStatus || "UNFULFILLED"}
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            isRefunded
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {order.financialStatus}
                        </span>

                        {isCanceled && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                            CANCELED / RETURNED
                          </span>
                        )}
                      </div>

                      <div className="flex gap-3">
                        {!isCanceled && !isRefunded && (
                          <Link
                            href="/returns"
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <RotateCcw className="w-4 h-4" />
                            Return Items
                          </Link>
                        )}
                        <Link
                          href={order.statusUrl}
                          target="_blank"
                          className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          <PackageSearch className="w-4 h-4" />
                          View Full Status
                        </Link>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {order.lineItems.edges.map(
                        ({ node: item }: any, idx: number) => (
                          <div
                            key={idx}
                            className="flex items-center gap-4 py-2 border-t border-gray-50 first:border-0 first:pt-0"
                          >
                            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden relative shrink-0">
                              {item.variant?.image && (
                                <img
                                  src={item.variant.image.url}
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-bold text-gray-900">
                                {item.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                        )
                      )}
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
        <div id="print-root" className="bg-white w-full z-50">
          {printMode === "single" && printingOrder && (
            <PrintInvoice order={printingOrder} />
          )}

          {printMode === "all" &&
            orders.map((order) => <PrintInvoice key={order.id} order={order} />)}
        </div>
      )}
    </>
  );
}