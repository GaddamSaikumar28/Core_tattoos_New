"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";
import { useAuth } from "@/src/context/AuthContext";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { recoverPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await recoverPassword(email);
    setIsSubmitting(false);
    if (success) setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4 mt-16 md:mt-0">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 border border-gray-100">
        
        <Link href="/login" className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-900 uppercase tracking-widest mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>

        {isSubmitted ? (
          <div className="text-center py-6">
            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4">Check Your Email</h2>
            <p className="text-sm font-bold text-gray-500 leading-relaxed">
              We've sent password reset instructions to <br/><span className="text-gray-900">{email}</span>
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900 mb-2">Reset Password</h1>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Enter your email to get a reset link</p>
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

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-14 mt-4 bg-gray-900 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-[#fe8204] transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Reset Link"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}