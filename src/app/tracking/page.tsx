
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { PackageSearch, Mail, Hash, ArrowRight, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

function TrackingDetailPage() {
  const searchParams = useSearchParams();

  // 1. Initialize BOTH states from the URL
  const [orderNumber, setOrderNumber] = useState(searchParams.get("order") || "");
  const [email, setEmail] = useState(searchParams.get("email") || "");
  
  const [isTracking, setIsTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");

  // 2. Automatically load tracking if params exist on page load
  useEffect(() => {
    const urlOrder = searchParams.get("order");
    const urlEmail = searchParams.get("email");

    if (urlOrder && urlEmail) {
      const cleanOrder = encodeURIComponent(urlOrder.trim());
      const cleanEmail = encodeURIComponent(urlEmail.trim());
      
      // Using your exact provided URL
      setIframeUrl(`https://www.justtattoos.com/apps/parcelpanel?order=${cleanOrder}&email=${cleanEmail}`);
      setIsTracking(true);
    }
  }, [searchParams]);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber || !email) return;

    setIsLoading(true);

    const cleanOrder = encodeURIComponent(orderNumber.trim());
    const cleanEmail = encodeURIComponent(email.trim());
    
    // Using your exact provided URL
    const url = `https://www.justtattoos.com/apps/parcelpanel?order=${cleanOrder}&email=${cleanEmail}`;
    
    setTimeout(() => {
      setIframeUrl(url);
      setIsTracking(true);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen mt-20 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-3xl w-full space-y-8">
        
        {/* Header Section */}
        <div className="text-center">
          <PackageSearch className="mx-auto h-12 w-12 text-black" />
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 tracking-tight">
            Track Your Order
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter your order number and email address below to see real-time tracking updates.
          </p>
        </div>

        {/* Input Form */}
        {!isTracking && (
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 border border-gray-100">
            <form className="space-y-6" onSubmit={handleTrack}>
              <div>
                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">
                  Order Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Hash className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="orderNumber"
                    required
                    className="focus:ring-black focus:border-black block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 bg-gray-50"
                    placeholder="e.g. 1001"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    required
                    className="focus:ring-black focus:border-black block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 bg-gray-50"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:opacity-70"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                ) : (
                  <>
                    Track Package
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Parcel Panel Iframe Render */}
        {isTracking && iframeUrl && (
          <div className="w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <span className="font-medium text-gray-700">Order #{orderNumber}</span>
              <button 
                onClick={() => {
                  setIsTracking(false);
                  setIframeUrl("");
                }}
                className="text-sm text-gray-500 hover:text-black transition-colors"
              >
                Track another order
              </button>
            </div>
            
            <iframe
              src={iframeUrl}
              className="w-full h-[700px] border-none"
              title="Order Tracking"
              allowFullScreen
            />
          </div>
        )}

      </div>
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center mt-20">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-[#fe8204] animate-spin" />
            <span className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-950">
              Loading ...
            </span>
          </div>
        </div>
      }
    >
      <TrackingDetailPage />
    </Suspense>
  );
}