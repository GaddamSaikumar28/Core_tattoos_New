"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";

const TOKEN_KEY = "shopify_customer_token";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. Extract the token from the URL after Shopify redirects back
    // Depending on your Shopify settings, this might be 'accessToken' or 'token'
    const token = searchParams.get("accessToken") || searchParams.get("token");

    if (token) {
      // 2. Store it in the cookie exactly how your email/password login does
      Cookies.set(TOKEN_KEY, token, { expires: 14 });

      // 3. Redirect to the account page
      // Your AuthContext will see the cookie and automatically fetch the user data
      router.push("/account");
    } else {
      // If something went wrong, send them back to login
      router.push("/login?error=no_token");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Loader2 className="w-10 h-10 animate-spin text-[#fe8204] mb-4" />
      <p className="text-sm font-black uppercase tracking-widest text-gray-500">
        Syncing your Shop account...
      </p>
    </div>
  );
}