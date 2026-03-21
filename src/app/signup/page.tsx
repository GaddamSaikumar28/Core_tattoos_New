"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, ShoppingBag, Eye, EyeOff } from "lucide-react"; // Added Eye icons
import { useAuth } from "@/src/context/AuthContext";
import { toast } from "sonner"; // Used in AuthContext, so we use it here for validation errors

export default function SignupPage() {
  // 1. Added confirmPassword to state
  const [formData, setFormData] = useState({ 
    firstName: "", 
    lastName: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });
  
  const [showPassword, setShowPassword] = useState(false); // 2. State for eye toggle
  const [acceptsMarketing, setAcceptsMarketing] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();
  const shopifyAccountUrl = process.env.NEXT_PUBLIC_SHOPIFY_ACCOUNT_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 3. Validation: Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    const success = await signup(
      formData.firstName, 
      formData.lastName, 
      formData.email, 
      formData.password, 
      acceptsMarketing
    );
    setIsSubmitting(false);
    if (success) {
      router.push("/account"); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4 mt-16 md:mt-10">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 border border-gray-100">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900 mb-2">Create Account</h1>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Join our community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-black text-gray-900 uppercase tracking-widest mb-2">First Name</label>
              <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-4 focus:border-[#fe8204] focus:ring-1 focus:ring-[#fe8204] outline-none transition-all" placeholder="John" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-900 uppercase tracking-widest mb-2">Last Name</label>
              <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-4 focus:border-[#fe8204] focus:ring-1 focus:ring-[#fe8204] outline-none transition-all" placeholder="Doe" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-900 uppercase tracking-widest mb-2">Email Address</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-4 focus:border-[#fe8204] focus:ring-1 focus:ring-[#fe8204] outline-none transition-all" placeholder="you@example.com" />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-black text-gray-900 uppercase tracking-widest mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                required 
                minLength={8} 
                value={formData.password} 
                onChange={handleChange} 
                className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-4 focus:border-[#fe8204] focus:ring-1 focus:ring-[#fe8204] outline-none transition-all" 
                placeholder="Minimum 8 characters" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#fe8204] transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-xs font-black text-gray-900 uppercase tracking-widest mb-2">Confirm Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                name="confirmPassword" 
                required 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-4 focus:border-[#fe8204] focus:ring-1 focus:ring-[#fe8204] outline-none transition-all" 
                placeholder="Re-enter password" 
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input type="checkbox" id="marketing" checked={acceptsMarketing} onChange={(e) => setAcceptsMarketing(e.target.checked)} className="w-5 h-5 accent-[#fe8204] rounded-md cursor-pointer" />
            <label htmlFor="marketing" className="text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer">
              Subscribe to email updates and offers
            </label>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full h-14 mt-4 bg-gray-900 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-[#fe8204] transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50">
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
          </button>
        </form>

        {shopifyAccountUrl && (
          <div className="mb-8 mt-5">
            <a 
              href={shopifyAccountUrl}
              className="w-full h-14 bg-black text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-[#5a31f4] transition-colors flex items-center justify-center gap-3 shadow-lg"
            >
              <ShoppingBag className="w-5 h-5" />
              Continue with Shop
            </a>
          </div>
        )}

        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm font-bold text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-gray-900 hover:text-[#fe8204] hover:underline uppercase tracking-widest ml-1">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}