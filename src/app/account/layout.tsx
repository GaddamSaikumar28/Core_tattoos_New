// app/account/layout.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/src/context/AuthContext";
import { User, Package, Settings, LogOut, Loader2,MapPin } from "lucide-react";
import clsx from "clsx";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/account", icon: User },
  { name: "Order History", href: "/account/orders", icon: Package },
  { name: "Addresses", href: "/account/addresses", icon: MapPin },
  { name: "Settings", href: "/account/settings", icon: Settings },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { customer, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !customer) {
      router.push("/login");
    }
  }, [customer, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-brand-orange)]" />
      </div>
    );
  }

  if (!customer) return null; // Will redirect via useEffect

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="mb-8">
            <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-black text-xl mb-4">
              {customer?.firstName?.charAt(0) || "U"}
            </div>
            <h2 className="text-lg font-black text-gray-900">
              {customer?.firstName} {customer?.lastName}
            </h2>
            <p className="text-xs text-gray-500">{customer?.email}</p>
          </div>

          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors",
                    isActive 
                      ? "bg-white text-[var(--color-brand-orange)] shadow-sm border border-gray-100" 
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
            
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors mt-4 border-t border-gray-200"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}