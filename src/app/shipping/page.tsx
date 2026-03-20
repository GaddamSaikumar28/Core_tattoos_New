'use client';

import React from 'react';
import Link from 'next/link';
import SharedHeroBanner from '@/src/components/layout/SharedHeroBanner';

export default function Shipping() {
    return (
        <main className="w-full bg-white text-black overflow-hidden">
            {/* Hero Section */}
            <SharedHeroBanner 
                title="SHIPPING & DELIVERY"
                image="/assets/images/ShippingHero.jpg"
                mobileImage="/assets/images/ShippingHeroMobile.jpg"
                useMobileImage={true}
                textColor="#FE8204"
            />

            {/* Quick Overview Cards */}
            <section className="container mx-auto px-6 py-20 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Card 1: Processing */}
                    <div className="bg-gray-50 p-10 rounded-[2rem] text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <svg className="w-8 h-8 text-[#FE8204]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 tracking-tight">Fast Processing</h3>
                        <p className="text-gray-600 font-medium leading-relaxed">
                            All orders are processed and prepared for dispatch within 24 to 48 hours.
                        </p>
                    </div>

                    {/* Card 2: Destinations */}
                    <div className="bg-gray-50 p-10 rounded-[2rem] text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <svg className="w-8 h-8 text-[#FE8204]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 tracking-tight">Where We Ship</h3>
                        <p className="text-gray-600 font-medium leading-relaxed">
                            We proudly ship our tattoos to all 50 states across the United States of America.
                        </p>
                    </div>

                    {/* Card 3: Tracking */}
                    <div className="bg-gray-50 p-10 rounded-[2rem] text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <svg className="w-8 h-8 text-[#FE8204]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 tracking-tight">Order Tracking</h3>
                        <p className="text-gray-600 font-medium leading-relaxed">
                            Automated tracking details are sent directly to your inbox the moment your order ships.
                        </p>
                    </div>
                </div>
            </section>

            {/* Detailed Shipping Policies */}
            <section className="container mx-auto px-6 pb-24 md:pb-32">
                <div className="max-w-4xl mx-auto space-y-16">
                    
                    {/* Header */}
                    <div className="border-b-2 border-black pb-6">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">
                            Shipping Policy Details
                        </h2>
                    </div>

                    {/* Policy Block 1 */}
                    <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                        <h3 className="w-full md:w-1/3 text-2xl font-bold tracking-tight">Processing Times</h3>
                        <div className="w-full md:w-2/3 text-lg text-gray-600 font-medium leading-relaxed space-y-4">
                            <p>
                                We know you're excited to get your new ink. That’s why all orders are processed within <strong>24 to 48 hours</strong> of being placed (excluding weekends and major holidays). 
                            </p>
                            <p>
                                Orders placed after 12:00 PM EST on Fridays will begin processing the following Monday. You will receive a confirmation email once your order has been successfully placed.
                            </p>
                        </div>
                    </div>

                    {/* Policy Block 2 */}
                    <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                        <h3 className="w-full md:w-1/3 text-2xl font-bold tracking-tight">Tracking & Delivery</h3>
                        <div className="w-full md:w-2/3 text-lg text-gray-600 font-medium leading-relaxed space-y-4">
                            <p>
                                As soon as your order leaves our facility, an automated email containing your tracking details will be sent to the email address provided at checkout. Please allow up to 24 hours for the tracking portal to update with live transit information.
                            </p>
                            <p className="bg-gray-50 p-6 rounded-2xl border-l-4 border-[#FE8204] text-black">
                                <strong>Important Note:</strong> Occasionally, some shipping routes may experience carrier backlogs or regional restrictions outside of our control. We appreciate your patience if your package takes a little longer than expected.
                            </p>
                        </div>
                    </div>

                    {/* Policy Block 3 */}
                    <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                        <h3 className="w-full md:w-1/3 text-2xl font-bold tracking-tight">Rates & Estimates</h3>
                        <div className="w-full md:w-2/3 text-lg text-gray-600 font-medium leading-relaxed space-y-4">
                            <p>
                                Shipping charges for your order will be calculated and displayed securely at checkout. We offer standard and expedited shipping options to ensure you get your temporary tattoos exactly when you need them.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Need Help Footer CTA */}
            <section className="bg-black text-white py-20">
                <div className="container mx-auto px-6 text-center max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Have a question about your shipment?</h2>
                    <p className="text-gray-400 font-medium text-lg mb-8">
                        Our support team is here to help track down your ink or answer any delivery questions.
                    </p>
                    <a 
                        href="mailto:support@justtattoos.com" 
                        className="inline-block bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#FE8204] hover:text-white hover:shadow-lg transition-all duration-300"
                    >
                        Contact Support
                    </a>
                </div>
            </section>
        </main>
    );
}