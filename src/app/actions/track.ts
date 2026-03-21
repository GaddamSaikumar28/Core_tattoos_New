
// src/app/actions/track.ts
"use server";

export async function fetchParcelPanelTracking(orderNumber: string, email: string) {
  try {
    // 1. MUST use the exact shop string from your network tab payload
    const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_TRACK_DOMAIN;
    // 2. Construct the exact URL the previous dev used
    const url = `https://pp-proxy.parcelwill.com/api/v2/tracking-info?order=${encodeURIComponent(orderNumber)}&email=${encodeURIComponent(email)}&shop=${shopDomain}&lang=en&country=US`;

    // 3. Spoof the headers from the Next.js backend
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        // FAKE THE ORIGIN AND REFERER SO IT THINKS WE ARE ON THE LIVE SITE
        'Origin': 'https://www.justtattoos.com',
        'Referer': 'https://www.justtattoos.com/',
        // Use a standard browser user-agent to bypass bot protection
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
      cache: 'no-store' // Always fetch fresh data
    });

    // 4. Safely parse the response
    const textData = await response.text();

    // If we still get blocked (e.g., HTML response), catch it gracefully
    if (!textData.startsWith("{")) {
      console.error("ParcelPanel Blocked the request. Response:", textData);
      return { success: false, error: "Tracking service temporarily unavailable." };
    }

    const data = JSON.parse(textData);

    if (data.code !== 200) {
      return { success: false, error: "Could not find tracking info for this order." };
    }

    // Return the successful payload back to your React frontend
    return { success: true, data: data.data };

  } catch (error: any) {
    console.error("Server Action Error:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}