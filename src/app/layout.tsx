import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// import SplashScreen from "@/components/layout/SplashScreen";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
import SplashScreen from "../components/layout/SplashScreen";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Toaster } from "sonner";


const montserrat = Montserrat({
  subsets: ["latin"],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${almarena.variable}`}>
      {/* Set the background and text color to the exact client variables */}
      <body className="font-montserrat bg-[var(--color-white)] text-[var(--color-black)] antialiased flex flex-col min-h-screen">
        
        {/* The client-side Splash Screen (prevents homepage flash) */}
        <SplashScreen />

        <Header />
        
        {/* The Next.js App Router replaces <Outlet /> */}
        <main className="flex-grow relative z-0">
          {children}
        </main>
        
        <Footer />
        <Toaster position="bottom-right" richColors />
        
      </body>
    </html>
  );
}