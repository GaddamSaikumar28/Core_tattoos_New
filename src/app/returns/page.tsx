'use client';

import React from 'react';
import SharedHeroBanner from '@/src/components/layout/SharedHeroBanner';

export default function Returns() {
    return (
        <main className="w-full bg-white text-black overflow-hidden">
            {/* Hero Section */}
            <SharedHeroBanner 
                title="RETURNS & REFUNDS"
                image="/assets/images/ReturnsHero.jpg"
                mobileImage="/assets/images/ReturnsHeroMobile.jpg"
                useMobileImage={true}
                textColor="#FE8204"
            />

            {/* The Quick Truths (Summary Cards) */}
            <section className="container mx-auto px-6 py-20 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Card 1: Timeframe */}
                    <div className="bg-gray-50 p-10 rounded-[2rem] text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <svg className="w-8 h-8 text-[#FE8204]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 tracking-tight">14-Day Window</h3>
                        <p className="text-gray-600 font-medium leading-relaxed">
                            Reach out within 14 days of receiving your order for help with a credit or occasional refund.
                        </p>
                    </div>

                    {/* Card 2: Hygiene Rule */}
                    <div className="bg-gray-50 p-10 rounded-[2rem] text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <svg className="w-8 h-8 text-[#FE8204]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 tracking-tight">Hygiene First</h3>
                        <p className="text-gray-600 font-medium leading-relaxed">
                            For safety and sanitary reasons, we do not accept physical returns of our products.
                        </p>
                    </div>

                    {/* Card 3: Easy Support */}
                    <div className="bg-gray-50 p-10 rounded-[2rem] text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <svg className="w-8 h-8 text-[#FE8204]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 tracking-tight">Simple Process</h3>
                        <p className="text-gray-600 font-medium leading-relaxed">
                            Have an issue? Just email us with photos and your order number. We've got your back.
                        </p>
                    </div>
                </div>
            </section>

            {/* Detailed Policies */}
            <section className="container mx-auto px-6 pb-24 md:pb-32">
                <div className="max-w-5xl mx-auto space-y-20">
                    
                    {/* General Refund Policy */}
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-3xl font-bold tracking-tight sticky top-24">The Policy</h2>
                        </div>
                        <div className="w-full md:w-2/3 text-lg text-gray-600 font-medium leading-relaxed space-y-6">
                            <p>Not all situations unfold as intended, and we understand completely.</p>
                            <p>We are happy to help you with any Just Tattoos products within <strong>14 days</strong> from the day it was received. Although physical product returns are not accepted due to hygienic reasons, assistance can still be provided through a Just Tattoos credit, or occasionally a refund.</p>
                            <p>Refunds requested after 14 days of the received date may still be eligible for a Just Tattoos credit, though we do not accept refunds for orders that are over 90 days old.</p>
                            <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-black text-black text-base mt-4">
                                <p><strong>Note:</strong> Original shipping charges will not be refunded. Just Tattoos may refuse a refund request if we find evidence of abuse.</p>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Defective Products & How to Reach Out */}
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-3xl font-bold tracking-tight sticky top-24">Issues & Defects</h2>
                        </div>
                        <div className="w-full md:w-2/3 text-lg text-gray-600 font-medium leading-relaxed space-y-6">
                            <p>If you run into an issue with applying your tattoo or if the products you got are damaged/defective, reach out to us! It may be eligible for a one-time resend or credit.</p>
                            
                            <h3 className="text-xl font-bold text-black mt-8 mb-4">How to request a refund or credit:</h3>
                            <p>It’s super simple! Send us an email at <a href="mailto:info@justtattoos.com" className="text-black font-bold border-b-2 border-[#FE8204] hover:text-[#FE8204] transition-colors">support@justtattoos.com</a> and include the following:</p>
                            
                            <ul className="bg-gray-50 p-8 rounded-3xl space-y-4 text-black">
                                <li className="flex items-start gap-3">
                                    <span className="text-[#FE8204] mt-1">✔</span>
                                    <span><strong>Your order number</strong></span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#FE8204] mt-1">✔</span>
                                    <span><strong>Clear photos</strong> of each product you’re reaching out about (with the QR code visible; one group photo is fine as long as all codes are clear).</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#FE8204] mt-1">✔</span>
                                    <span><strong>A brief explanation</strong> of the issue, defect, or reason you're hoping to get a refund.</span>
                                </li>
                            </ul>
                            <p className="text-base">Our team will review your request and get back to you with the next steps! 😊</p>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Payment Issues */}
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-3xl font-bold tracking-tight sticky top-24">Payment Issues</h2>
                        </div>
                        <div className="w-full md:w-2/3 text-lg text-gray-600 font-medium leading-relaxed space-y-8">
                            <p>Having trouble checking out? We're sorry to hear that! Keep these 4 things in mind if your payment isn't going through:</p>
                            
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-black font-bold text-xl mb-2">1. Accepted Methods</h4>
                                    <p>Ensure you are using an accepted payment method: <strong>Visa, MasterCard, AMEX, or PayPal</strong>.</p>
                                </div>
                                <div>
                                    <h4 className="text-black font-bold text-xl mb-2">2. Sufficient Balance</h4>
                                    <p>Double-check the funds in your account. Certain prepaid cards (like Visa Pre-Paid Gift cards and Visa Debits) may not work if there isn't sufficient money to cover the total.</p>
                                </div>
                                <div>
                                    <h4 className="text-black font-bold text-xl mb-2">3. Missing CVV Number</h4>
                                    <p>If your card doesn't have a CVV number on the back, your transaction may be unsuccessful.</p>
                                </div>
                                <div>
                                    <h4 className="text-black font-bold text-xl mb-2">4. Billing Address Match</h4>
                                    <p>Check that the Billing Address you entered perfectly matches the one connected to your card. Sometimes autofill programs (like Google Chrome) enter info for another card or format it incorrectly.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Charge Timelines & Cancellations */}
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-3xl font-bold tracking-tight sticky top-24">Charges & Cancellations</h2>
                        </div>
                        <div className="w-full md:w-2/3 text-lg text-gray-600 font-medium leading-relaxed space-y-8">
                            
                            <div>
                                <h3 className="text-2xl font-bold text-black mb-4">When will I be charged?</h3>
                                <p className="mb-4">Your account is automatically charged at the time of purchase. For security reasons, Just Tattoos does not store your credit card information and uses a one-time authorization during checkout.</p>
                                
                                <div className="space-y-4 mt-6 border-l-2 border-gray-200 pl-6">
                                    <div>
                                        <h4 className="text-black font-bold">1. Authorization</h4>
                                        <p className="text-base">Verifies your card is valid and has funds. The period varies by provider.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-black font-bold">2. Capture</h4>
                                        <p className="text-base">Occurs daily at noon. Your charge may appear as “pending” (no interest charged) and may take up to 5 business days to post.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-black font-bold">3. Settlement</h4>
                                        <p className="text-base">Happens 2–3 business days after capture. Your bank confirms the charge and it appears on your statement.</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-base bg-gray-50 p-4 rounded-xl inline-block"><strong>🛒 PayPal®:</strong> Orders placed using PayPal are charged immediately at checkout.</p>
                            </div>

                            <div className="pt-6">
                                <h3 className="text-2xl font-bold text-black mb-4">Canceled Orders</h3>
                                <p>If you cancel an order, your card will be refunded in full. An authorization hold may be placed when you order to verify funds; if canceled, the hold expires according to your bank’s policy (usually within 5 days).</p>
                                <ul className="list-disc pl-5 space-y-2 mt-4 text-base">
                                    <li><strong>Before Capture:</strong> We can void the order, and no charge will be processed.</li>
                                    <li><strong>After Capture / Before Settlement:</strong> We can cancel and issue a refund. This appears after both the charge and refund settle (2–3 business days).</li>
                                    <li><strong>After Settlement:</strong> We can still refund your order, unless it has already shipped (in which case standard return protocols apply).</li>
                                </ul>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}