"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/src/context/AuthContext";

export default function SignupPage() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [acceptsMarketing, setAcceptsMarketing] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await signup(formData.firstName, formData.lastName, formData.email, formData.password, acceptsMarketing);
    setIsSubmitting(false);
    if (success) {
      router.push("/account"); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4 mt-16 md:mt-0">
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

          <div>
            <label className="block text-xs font-black text-gray-900 uppercase tracking-widest mb-2">Password</label>
            <input type="password" name="password" required minLength={8} value={formData.password} onChange={handleChange} className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-4 focus:border-[#fe8204] focus:ring-1 focus:ring-[#fe8204] outline-none transition-all" placeholder="Minimum 8 characters" />
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