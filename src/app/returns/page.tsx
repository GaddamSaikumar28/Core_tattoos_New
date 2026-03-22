

import React from 'react';
import SharedHeroBanner from '@/src/components/layout/SharedHeroBanner';
import { getReturnsPageData } from '@/src/lib/shopify'; // Adjust path if needed

export default async function Returns() {
    let data = null;

    // Production-ready error handling
    try {
        data = await getReturnsPageData('returns-page');
    } catch (error) {
        // Log the error to your server console or an error monitoring service (e.g., Sentry, Datadog)
        console.error('[Returns Page] Failed to fetch metaobject data:', error);
    } finally {
        // Optional: Any tracking, monitoring, or cleanup metrics can be fired here
        // console.log('[Returns Page] Data fetch operation completed.');
    }

    // Graceful fallback if data is completely missing or the fetch failed
    if (!data) {
        return (
            <main className="w-full bg-white text-black min-h-[60vh] flex flex-col items-center justify-center overflow-hidden px-6 text-center">
                <h1 className="text-3xl font-bold mb-4">Content Unavailable</h1>
                <p className="text-gray-600">We are currently unable to load the returns policy. Please refresh the page or try again later.</p>
            </main>
        );
    }

    return (
        <main className="w-full bg-white text-black overflow-hidden">
            {/* Hero Section */}
            <SharedHeroBanner 
                title={data.heroTitle}
                image={data.heroImage}
                mobileImage={data.heroMobileImage}
                useMobileImage={true}
                textColor={data.heroTextColor}
            />

            {/* The Quick Truths (Summary Cards) */}
            <section className="container mx-auto px-6 py-20 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Card 1: Timeframe */}
                    <div className="bg-gray-50 p-10 rounded-[2rem] text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <svg className="w-8 h-8 text-[#FE8204]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 tracking-tight">{data.card1Title}</h3>
                        <p className="text-gray-600 font-medium leading-relaxed">{data.card1Text}</p>
                    </div>

                    {/* Card 2: Hygiene Rule */}
                    <div className="bg-gray-50 p-10 rounded-[2rem] text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <svg className="w-8 h-8 text-[#FE8204]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 tracking-tight">{data.card2Title}</h3>
                        <p className="text-gray-600 font-medium leading-relaxed">{data.card2Text}</p>
                    </div>

                    {/* Card 3: Easy Support */}
                    <div className="bg-gray-50 p-10 rounded-[2rem] text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <svg className="w-8 h-8 text-[#FE8204]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 tracking-tight">{data.card3Title}</h3>
                        <p className="text-gray-600 font-medium leading-relaxed">{data.card3Text}</p>
                    </div>
                </div>
            </section>

            {/* Detailed Policies */}
            <section className="container mx-auto px-6 pb-24 md:pb-32">
                <div className="max-w-5xl mx-auto space-y-20">
                    
                    {/* General Refund Policy */}
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-3xl font-bold tracking-tight sticky top-24">{data.policyTitle}</h2>
                        </div>
                        <div className="w-full md:w-2/3 text-lg text-gray-600 font-medium leading-relaxed space-y-6">
                            <p>{data.policyP1}</p>
                            <p dangerouslySetInnerHTML={{ __html: data.policyP2 }}></p>
                            <p>{data.policyP3}</p>
                            <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-black text-black text-base mt-4">
                                <p dangerouslySetInnerHTML={{ __html: data.policyNote }}></p>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Defective Products & How to Reach Out */}
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-3xl font-bold tracking-tight sticky top-24">{data.issuesTitle}</h2>
                        </div>
                        <div className="w-full md:w-2/3 text-lg text-gray-600 font-medium leading-relaxed space-y-6">
                            <p>{data.issuesIntro}</p>
                            
                            <h3 className="text-xl font-bold text-black mt-8 mb-4">{data.issuesEmailHeading}</h3>
                            <p>{data.issuesEmailText} <a href={`mailto:${data.issuesEmailAddress}`} className="text-black font-bold border-b-2 border-[#FE8204] hover:text-[#FE8204] transition-colors">{data.issuesEmailAddress}</a> and include the following:</p>
                            
                            <ul className="bg-gray-50 p-8 rounded-3xl space-y-4 text-black">
                                <li className="flex items-start gap-3">
                                    <span className="text-[#FE8204] mt-1">✔</span>
                                    <span dangerouslySetInnerHTML={{ __html: data.issuesList1 }}></span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#FE8204] mt-1">✔</span>
                                    <span dangerouslySetInnerHTML={{ __html: data.issuesList2 }}></span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#FE8204] mt-1">✔</span>
                                    <span dangerouslySetInnerHTML={{ __html: data.issuesList3 }}></span>
                                </li>
                            </ul>
                            <p className="text-base">{data.issuesOutro}</p>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Payment Issues */}
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-3xl font-bold tracking-tight sticky top-24">{data.paymentTitle}</h2>
                        </div>
                        <div className="w-full md:w-2/3 text-lg text-gray-600 font-medium leading-relaxed space-y-8">
                            <p>{data.paymentIntro}</p>
                            
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-black font-bold text-xl mb-2">{data.paymentItem1Title}</h4>
                                    <p dangerouslySetInnerHTML={{ __html: data.paymentItem1Text }}></p>
                                </div>
                                <div>
                                    <h4 className="text-black font-bold text-xl mb-2">{data.paymentItem2Title}</h4>
                                    <p>{data.paymentItem2Text}</p>
                                </div>
                                <div>
                                    <h4 className="text-black font-bold text-xl mb-2">{data.paymentItem3Title}</h4>
                                    <p>{data.paymentItem3Text}</p>
                                </div>
                                <div>
                                    <h4 className="text-black font-bold text-xl mb-2">{data.paymentItem4Title}</h4>
                                    <p>{data.paymentItem4Text}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Charge Timelines & Cancellations (Consolidated Metaobjects) */}
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-3xl font-bold tracking-tight sticky top-24">{data.chargesTitle}</h2>
                        </div>
                        <div className="w-full md:w-2/3 text-lg text-gray-600 font-medium leading-relaxed space-y-8">
                            
                            {/* Render Consolidated Block 1 (When will I be charged) */}
                            <div dangerouslySetInnerHTML={{ __html: data.chargesSection1Content }}></div>

                            {/* Render Consolidated Block 2 (Cancellations) */}
                            <div className="pt-6" dangerouslySetInnerHTML={{ __html: data.chargesSection2Content }}></div>

                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}