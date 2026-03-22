

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import SplashScreen from "../components/layout/SplashScreen";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Toaster } from "sonner";
import { CartProvider } from "../context/CartContext";
import { CartDrawer } from "../components/cart/CartDrawer";
import { AuthProvider } from "../context/AuthContext";
import Script from "next/script";
import { getGlobalSettingsData } from "@/src/lib/shopify";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], 
  variable: "--font-montserrat",
  display: "swap",
});

const almarena = localFont({
  src: [
    { path: "../../public/assets/fonts/Almarena-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/assets/fonts/Almarena-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-almarena",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Core Tattoos",
  description: "Authentic tattoo lifestyle and apparel.",
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getGlobalSettingsData();
  // Define a safe fallback just in case the API completely fails
  const globalData = settings || {
    headerLogo: '/assets/icons/DesktopLogo.svg',
    footerLogo: '/assets/icons/DesktopLogo.svg',
    splashLogo: '/assets/icons/DesktopLogo.svg',
    splashLeftImage: '/assets/icons/butterflys.svg',
    splashRightImage: '/assets/icons/butterfly2s2.svg',
    instagramLink: '#', facebookLink: '#', twitterLink: '#', youtubeLink: '#'
  };
  
  return (
    <html lang="en" className={`${montserrat.variable} ${almarena.variable}`}>
      <body className="antialiased flex flex-col min-h-screen">
        <CartProvider>
          {/* AuthProvider goes immediately inside CartProvider and wraps EVERYTHING else */}
          <AuthProvider>
            
            {/* Passed the fetched data to your components */}
            <SplashScreen 
              logoUrl={globalData.splashLogo} 
              leftImageUrl={globalData.splashLeftImage}
              rightImageUrl={globalData.splashRightImage}
            />
            
            <Header logoUrl={globalData.headerLogo} />
            
            <main className="flex-grow relative z-0">
              {children}
            </main>
            
            <Footer 
              logoUrl={globalData.footerLogo} 
              socialLinks={{
                instagram: globalData.instagramLink,
                facebook: globalData.facebookLink,
                twitter: globalData.twitterLink,
                youtube: globalData.youtubeLink
              }}
            />
            
            <CartDrawer />
            
          </AuthProvider>

          {/* Toaster doesn't need Auth or Cart contexts, but it's fine here */}
          <Toaster position="bottom-right" richColors />

        </CartProvider>

        <Script 
          src="https://cdn.your-messaging-app.com/widget.js" 
          strategy="lazyOnload" 
        />

      </body>
    </html>
  );
}