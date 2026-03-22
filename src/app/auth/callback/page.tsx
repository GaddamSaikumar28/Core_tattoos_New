
"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";

const TOKEN_KEY = "shopify_customer_token";

// 1. The internal logic component
function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("accessToken") || searchParams.get("token");

    if (token) {
      Cookies.set(TOKEN_KEY, token, { expires: 14 });
      router.push("/account");
    } else {
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

// 2. The main page component providing the Suspense boundary
export default function AuthCallbackPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-10 h-10 animate-spin text-[#fe8204]" />
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}