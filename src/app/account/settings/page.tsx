// app/account/settings/page.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { updateCustomerProfile } from "@/src/lib/shopify";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
  const { customer } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Form States
  const [formData, setFormData] = useState({
    firstName: customer?.firstName || "",
    lastName: customer?.lastName || "",
    email: customer?.email || "",
    password: "", // Only sent if user wants to change it
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const token = Cookies.get("shopify_customer_token");
      if (!token) throw new Error("Authentication error");

      // Construct update payload
      const updatePayload: any = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };

      // Only add password if they typed a new one
      if (formData.password.trim().length > 0) {
        if (formData.password.length < 8) {
          throw new Error("Password must be at least 8 characters");
        }
        updatePayload.password = formData.password;
      }

      const response = await updateCustomerProfile(token, updatePayload);
      
      // If updating email/password changes the token, update the cookie
      if (response.newToken) {
        Cookies.set("shopify_customer_token", response.newToken, { expires: 14 });
      }

      toast.success("Profile updated successfully! Refreshing...");
      setTimeout(() => window.location.reload(), 1500); // Reload to sync context

    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-black text-gray-900 mb-6">Account Settings</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 border border-gray-100 rounded-2xl shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">First Name</label>
            <input 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[var(--color-brand-orange)] transition-colors"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">Last Name</label>
            <input 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[var(--color-brand-orange)] transition-colors"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">Email Address</label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[var(--color-brand-orange)] transition-colors"
            required
          />
        </div>

        <div className="pt-6 border-t border-gray-100 space-y-2">
          <h3 className="font-bold text-gray-900 mb-4">Security</h3>
          <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">New Password (leave blank to keep current)</label>
          <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Min. 8 characters"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[var(--color-brand-orange)] transition-colors"
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white text-[13px] font-black uppercase tracking-widest rounded-xl hover:bg-[var(--color-brand-orange)] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}