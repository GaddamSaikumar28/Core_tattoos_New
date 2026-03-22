
import React from "react";
import { getHelpCenterPageData } from "@/src/lib/shopify"; // Update path if needed
// import HelpCenterClient from "@/src/components/help/HelpCenterClient";
import FaqSection from "@/src/components/home/FaqSection";
import HelpCenterClient from "./HelpCenterClient";
export default async function HelpCenterPage() {
  // Be sure to match your exact Shopify handle
  const data = await getHelpCenterPageData("help-center-page");

  if (!data) {
    return <div className="p-20 text-center">Loading Help Center...</div>;
  }

  return (
    <div className="min-h-screen mt-20 bg-white">
      {/* The interactive form and top content */}
      <HelpCenterClient data={data} />
      
      {/* The Server-side FAQ section safely rendered at the bottom */}
      <FaqSection />
    </div>
  );
}