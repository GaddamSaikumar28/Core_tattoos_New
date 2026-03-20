// app/account/page.tsx
"use client";

import { useAuth } from "@/src/context/AuthContext";
import Link from "next/link";
import { Package, ArrowRight } from "lucide-react";

export default function AccountDashboard() {
  const { customer } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Welcome back, {customer?.firstName}!</h1>
        <p className="text-gray-500">From your account dashboard you can view your recent orders and manage your account details.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm flex flex-col items-start">
          <div className="w-10 h-10 bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)] rounded-full flex items-center justify-center mb-4">
            <Package className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Recent Orders</h3>
          <p className="text-sm text-gray-500 mb-4">Check the status of your recent purchases.</p>
          <Link href="/account/orders" className="text-[11px] font-black uppercase tracking-widest text-[var(--color-brand-orange)] flex items-center gap-1 mt-auto hover:gap-2 transition-all">
            View Orders <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        {/* Add more quick-action cards here as needed (e.g., Rewards, Wishlist) */}
      </div>
    </div>
  );
}