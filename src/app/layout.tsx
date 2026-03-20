// // import type { Metadata } from "next";
// // import { Montserrat } from "next/font/google";
// // import localFont from "next/font/local";
// // import "./globals.css";

// // // import SplashScreen from "@/components/layout/SplashScreen";
// // // import Header from "@/components/layout/Header";
// // // import Footer from "@/components/layout/Footer";
// // import SplashScreen from "../components/layout/SplashScreen";
// // import Header from "../components/layout/Header";
// // import Footer from "../components/layout/Footer";
// // import { Toaster } from "sonner";
// // import { CartProvider } from "../context/CartContext";
// // import { CartDrawer } from "../components/cart/CartDrawer";

// // const montserrat = Montserrat({
// //   subsets: ["latin"],
// //   variable: "--font-montserrat",
// //   display: "swap",
// // });

// // const almarena = localFont({
// //   src: [
// //     { path: "../../public/assets/fonts/Almarena-Regular.otf", weight: "400", style: "normal" },
// //     { path: "../../public/assets/fonts/Almarena-Bold.otf", weight: "700", style: "normal" },
// //   ],
// //   variable: "--font-almarena",
// //   display: "swap",
// // });

// // export const metadata: Metadata = {
// //   title: "Core Tattoos",
// //   description: "Authentic tattoo lifestyle and apparel.",
// // };

// // export default function RootLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <html lang="en" className={`${montserrat.variable} ${almarena.variable}`}>
// //       {/* Set the background and text color to the exact client variables */}
// //       <body className="font-montserrat bg-[var(--color-white)] text-[var(--color-black)] antialiased flex flex-col min-h-screen">
// //         <CartProvider>
// //         {/* The client-side Splash Screen (prevents homepage flash) */}
// //         <SplashScreen />

// //         <Header />
        
// //         {/* The Next.js App Router replaces <Outlet /> */}
// //         <main className="flex-grow relative z-0">
// //           {children}
// //         </main>
        
// //         <Footer />
// //         <CartDrawer />
// //         <Toaster position="bottom-right" richColors />
// //         </CartProvider>
// //       </body>
// //     </html>
// //   );
// // }

// import type { Metadata } from "next";
// import { Montserrat } from "next/font/google";
// import localFont from "next/font/local";
// import "./globals.css";

// import SplashScreen from "../components/layout/SplashScreen";
// import Header from "../components/layout/Header";
// import Footer from "../components/layout/Footer";
// import { Toaster } from "sonner";
// import { CartProvider } from "../context/CartContext";
// import { CartDrawer } from "../components/cart/CartDrawer";
// import { AuthProvider } from "../context/AuthContext";
// // 1. ADD WEIGHTS: Without explicitly listing weights, 
// // Tailwind might struggle to render 'Medium' (500) or 'Bold' (700) correctly.
// const montserrat = Montserrat({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"], 
//   variable: "--font-montserrat",
//   display: "swap",
// });

// const almarena = localFont({
//   src: [
//     { path: "../../public/assets/fonts/Almarena-Regular.otf", weight: "400", style: "normal" },
//     { path: "../../public/assets/fonts/Almarena-Bold.otf", weight: "700", style: "normal" },
//   ],
//   variable: "--font-almarena",
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: "Core Tattoos",
//   description: "Authentic tattoo lifestyle and apparel.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className={`${montserrat.variable} ${almarena.variable}`}>
//       {/* 2. SIMPLIFY BODY CLASS: 
//           Since we set font-family in globals.css @layer base, 
//           we don't need 'font-montserrat' here. 
//           This avoids conflict with any 'font-almarena' tags you use later. */}
//       <body className="antialiased flex flex-col min-h-screen">
//         <CartProvider>
//           <SplashScreen />
//           <AuthProvider>
//           <Header />
          
//           <main className="flex-grow relative z-0">
//             {children}
//           </main>
          
//           <Footer />
//           </AuthProvider>
//           <CartDrawer />

//           <Toaster position="bottom-right" richColors />
//         </CartProvider>
//       </body>
//     </html>
//   );
// }


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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${almarena.variable}`}>
      <body className="antialiased flex flex-col min-h-screen">
        <CartProvider>
          {/* AuthProvider goes immediately inside CartProvider and wraps EVERYTHING else */}
          <AuthProvider>
            
            <SplashScreen />
            <Header />
            
            <main className="flex-grow relative z-0">
              {children}
            </main>
            
            <Footer />
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