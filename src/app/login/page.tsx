"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/src/context/AuthContext";
import {  ShoppingBag } from "lucide-react";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const shopifyAccountUrl = process.env.NEXT_PUBLIC_SHOPIFY_ACCOUNT_URL;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await login(email, password);
    setIsSubmitting(false);
    if (success) {
      router.push("/account"); // Or redirect to checkout/home
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4 mt-16 md:mt-10">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 border border-gray-100">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-gray-900 uppercase tracking-widest mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-4 text-gray-900 focus:outline-none focus:border-[#fe8204] focus:ring-1 focus:ring-[#fe8204] transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-black text-gray-900 uppercase tracking-widest">Password</label>
              <Link href="/forgot-password" className="text-xs font-bold text-[#fe8204] hover:underline uppercase tracking-widest">
                Forgot?
              </Link>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-4 text-gray-900 focus:outline-none focus:border-[#fe8204] focus:ring-1 focus:ring-[#fe8204] transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full h-14 mt-4 bg-[#fe8204] text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-[#e07103] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#fe8204]/20 disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
          </button>
        </form>
        {shopifyAccountUrl && (
          <div className="mb-8">
            <a 
              href={shopifyAccountUrl}
              className="w-full h-14 mt-5 bg-black text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-[#5a31f4] transition-colors flex items-center justify-center gap-3 shadow-lg"
            >
              <ShoppingBag className="w-5 h-5" />
              Continue with Shop
            </a>
          </div>
        )}

        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm font-bold text-gray-500">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#fe8204] hover:underline uppercase tracking-widest ml-1">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}