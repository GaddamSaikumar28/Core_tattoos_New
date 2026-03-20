'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <main className="w-full bg-white text-black overflow-hidden selection:bg-[#FE8204] selection:text-white">
            
            {/* Custom Minimalist Hero Section */}
            <header className="bg-gray-50 pt-32 pb-20 md:pt-40 md:pb-28 border-b border-gray-100">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <div className="inline-block px-4 py-1.5 bg-black text-white text-sm font-bold tracking-widest uppercase rounded-full mb-6">
                        Legal
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 uppercase">
                        Privacy Policy
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
                        How we collect, use, and protect your personal information at JustTattoos.
                    </p>
                </div>
            </header>

            {/* Main Content with Sticky Sidebar */}
            <section className="container mx-auto px-6 py-16 md:py-24">
                <div className="flex flex-col lg:flex-row gap-12 xl:gap-24 relative">
                    
                    {/* Sticky Sidebar Navigation (Desktop Only) */}
                    <aside className="hidden lg:block w-1/4 shrink-0">
                        <div className="sticky top-32 space-y-4 border-l-2 border-gray-100 pl-6">
                            <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-6">Contents</h3>
                            <nav className="flex flex-col space-y-3 text-base font-bold text-gray-500">
                                <a href="#overview" className="hover:text-black hover:translate-x-1 transition-all">Overview</a>
                                <a href="#collection" className="hover:text-black hover:translate-x-1 transition-all">1. Info Collected</a>
                                <a href="#usage" className="hover:text-black hover:translate-x-1 transition-all">2. Use of Information</a>
                                <a href="#consent" className="hover:text-black hover:translate-x-1 transition-all">3. Consent & Choices</a>
                                <a href="#management" className="hover:text-black hover:translate-x-1 transition-all">4. Info Management</a>
                                <a href="#payments" className="hover:text-black hover:translate-x-1 transition-all">5. Payment Processing</a>
                                <a href="#third-party" className="hover:text-black hover:translate-x-1 transition-all">6. Third-Party Links</a>
                                <a href="#security" className="hover:text-black hover:translate-x-1 transition-all">7. Security</a>
                                <a href="#cookies" className="hover:text-black hover:translate-x-1 transition-all">8. Cookies</a>
                                <a href="#children" className="hover:text-black hover:translate-x-1 transition-all">9. Children's Privacy</a>
                                <a href="#rights" className="hover:text-[#FE8204] hover:translate-x-1 transition-all">10. U.S. Privacy Rights</a>
                                <a href="#changes" className="hover:text-black hover:translate-x-1 transition-all">11. Policy Changes</a>
                                <a href="#contact" className="hover:text-black hover:translate-x-1 transition-all">Contact Us</a>
                            </nav>
                        </div>
                    </aside>

                    {/* Legal Content */}
                    <article className="w-full lg:w-3/4 max-w-4xl space-y-16 text-lg text-gray-600 font-medium leading-relaxed">
                        
                        {/* Overview */}
                        <div id="overview" className="space-y-6">
                            <h2 className="text-3xl font-bold tracking-tight text-black">Overview</h2>
                            <p>
                                We respect your privacy and are committed to protecting it through our compliance with this Privacy Policy (“Policy”). This Policy describes the types of information we may collect from you or that you may provide (“Personal Information”) on the JustTattoos website (“Website” or “Service”) and any of its related products and services (collectively, “Services”), and our practices for collecting, using, maintaining, protecting, and disclosing that Personal Information.
                            </p>
                            <p>
                                This Policy is a legally binding agreement between you (“User”, “you” or “your”) and JustTattoos (“we”, “us” or “our”). By accessing and using the Website and Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Policy.
                            </p>
                            <div className="bg-gray-50 p-6 rounded-2xl text-black border-l-4 border-black">
                                <strong>Important Note:</strong> This Policy applies only to users located in the <strong>United States</strong> and does not apply to companies or individuals that we do not own, control, employ, or manage.
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Section 1: Collection */}
                        <div id="collection" className="space-y-8">
                            <h2 className="text-3xl font-bold tracking-tight text-black">Section 1: Information Collected</h2>
                            <p>You may browse the Website without providing identifying information. Certain features, however, may require you to provide Personal Information such as your name or email address. We collect information when individuals:</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-2xl hover:shadow-md transition-shadow">
                                    <h4 className="text-black font-bold mb-2 text-xl">1. Make a Purchase</h4>
                                    <p className="text-base">We collect your name, shipping/billing address, email, phone number, and payment details.</p>
                                </div>
                                <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-2xl hover:shadow-md transition-shadow">
                                    <h4 className="text-black font-bold mb-2 text-xl">2. Create an Account</h4>
                                    <p className="text-base">Includes first name, last name, email, optional photo, order history, rewards, and favorites.</p>
                                </div>
                                <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-2xl hover:shadow-md transition-shadow">
                                    <h4 className="text-black font-bold mb-2 text-xl">3. Sign Up for Alerts</h4>
                                    <p className="text-base">With your consent, we collect email/phone numbers to send updates, promotions, and store communications.</p>
                                </div>
                                <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-2xl hover:shadow-md transition-shadow">
                                    <h4 className="text-black font-bold mb-2 text-xl">4. Contact Support</h4>
                                    <p className="text-base">We collect your name, email, phone, addresses, and order number to assist you efficiently.</p>
                                </div>
                                <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-2xl hover:shadow-md transition-shadow">
                                    <h4 className="text-black font-bold mb-2 text-xl">5. Browse the Website</h4>
                                    <p className="text-base">We automatically collect technical data (IP, browser, clicks, pages visited) using cookies and pixels.</p>
                                </div>
                                <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-2xl hover:shadow-md transition-shadow">
                                    <h4 className="text-black font-bold mb-2 text-xl">6. Surveys & Reviews</h4>
                                    <p className="text-base">We may collect name, interests, and preferences if you participate in promotions or reviews.</p>
                                </div>
                            </div>

                            <div className="pt-6 space-y-6">
                                <div>
                                    <h4 className="text-xl font-bold text-black mb-2">Third-Party Advertising & Tracking</h4>
                                    <p>We work with third-party service providers that use cookies and similar technologies to help deliver advertising and measure campaign performance. These providers may collect pseudonymous information related to your activity. You can learn more and opt out at: <br/>
                                    <a href="http://optout.aboutads.info/#!/" target="_blank" rel="noopener noreferrer" className="text-black font-bold border-b-2 border-[#FE8204] hover:text-[#FE8204] transition-colors">optout.aboutads.info</a></p>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-black mb-2">Google Analytics</h4>
                                    <p>We use Google Analytics to understand Website usage and performance. You may opt out using Google’s browser add-on: <br/>
                                    <a href="https://tools.google.com/dlpage/gaoptout/" target="_blank" rel="noopener noreferrer" className="text-black font-bold border-b-2 border-[#FE8204] hover:text-[#FE8204] transition-colors">tools.google.com/dlpage/gaoptout</a></p>
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Section 2: Use of Info */}
                        <div id="usage" className="space-y-6">
                            <h2 className="text-3xl font-bold tracking-tight text-black">Section 2: Use of Information</h2>
                            <p>We use Personal Information to:</p>
                            <ul className="bg-gray-50 p-8 rounded-3xl space-y-3 text-black">
                                <li className="flex items-start gap-3"><span className="text-[#FE8204]">✔</span> Process orders and provide services</li>
                                <li className="flex items-start gap-3"><span className="text-[#FE8204]">✔</span> Communicate order updates</li>
                                <li className="flex items-start gap-3"><span className="text-[#FE8204]">✔</span> Improve Website functionality and user experience</li>
                                <li className="flex items-start gap-3"><span className="text-[#FE8204]">✔</span> Personalize communications and marketing</li>
                                <li className="flex items-start gap-3"><span className="text-[#FE8204]">✔</span> Prevent fraud and abuse</li>
                                <li className="flex items-start gap-3"><span className="text-[#FE8204]">✔</span> Deliver advertising and promotions</li>
                                <li className="flex items-start gap-3"><span className="text-[#FE8204]">✔</span> Comply with legal obligations</li>
                            </ul>
                            <p>Information is retained only as long as reasonably necessary or required by law.</p>
                        </div>

                        {/* Section 3: Consent & Choices */}
                        <div id="consent" className="space-y-6">
                            <h2 className="text-3xl font-bold tracking-tight text-black">Section 3: Consent & Choices</h2>
                            <div className="space-y-4">
                                <p><strong>Cookies:</strong> You may manage cookie preferences using browser settings or the Website’s cookie preference tools (if available).</p>
                                <p><strong>Email:</strong> You may unsubscribe from marketing emails at any time using the link provided in the emails.</p>
                                <p className="bg-black text-white p-4 rounded-xl inline-block"><strong>Text Messages:</strong> Reply <strong>STOP</strong> to opt out of SMS communications. Text messaging consent data is never shared with third parties.</p>
                            </div>
                        </div>

                        {/* Section 4: Management */}
                        <div id="management" className="space-y-6">
                            <h2 className="text-3xl font-bold tracking-tight text-black">Section 4: Information Management</h2>
                            <h4 className="text-xl font-bold text-black mb-2">Disclosure</h4>
                            <p>We may disclose Personal Information to service providers assisting us in operations, to protect rights/safety, to comply with legal obligations, or in connection with business transactions (mergers/acquisitions). Service providers may only use Personal Information to perform services on our behalf.</p>
                            
                            <h4 className="text-xl font-bold text-black mb-2 mt-6">Managing Your Information</h4>
                            <p>You may request access, correction, or deletion of Personal Information by contacting <a href="mailto:support@justtattoos.com" className="text-black font-bold border-b-2 border-[#FE8204] hover:text-[#FE8204] transition-colors">support@justtattoos.com</a>. We may retain certain information as required by law.</p>
                        </div>

                        {/* Section 5 & 6 */}
                        <div id="payments" className="space-y-12">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tight text-black">Section 5: Payment Processing</h2>
                                <p>Payments are processed by third-party payment processors that comply with PCI-DSS security standards. We only share payment data as necessary to process transactions and refunds. Common processors include:</p>
                                <ul className="list-disc pl-5 space-y-2 mt-4 text-base">
                                    <li><strong>Shopify:</strong> <a href="https://www.shopify.com/legal/privacy/customers" target="_blank" rel="noopener noreferrer" className="hover:text-[#FE8204] transition-colors">shopify.com/legal/privacy/customers</a></li>
                                    <li><strong>PayPal:</strong> <a href="https://www.paypal.com/us/legalhub/home" target="_blank" rel="noopener noreferrer" className="hover:text-[#FE8204] transition-colors">paypal.com/us/legalhub/home</a></li>
                                </ul>
                            </div>

                            <div id="third-party" className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tight text-black">Section 6: Third-Party Services</h2>
                                <p>Third-party services may have their own privacy policies. Once you leave our Website or interact with third-party services, this Policy no longer applies.</p>
                            </div>
                        </div>

                        {/* Section 7, 8, 9 */}
                        <div id="security" className="space-y-12">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tight text-black">Section 7: Security</h2>
                                <p>We use reasonable administrative, technical, and physical safeguards to protect Personal Information. However, no system is completely secure. In the event of a data breach, we will notify affected users as required by law.</p>
                            </div>

                            <div id="cookies" className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tight text-black">Section 8: Cookies (Summary)</h2>
                                <p>We use cookies for Website functionality, analytics, performance, personalization, and advertising. Social media cookies may track activity across websites. You may disable cookies through browser settings, though some features may not function properly.</p>
                            </div>

                            <div id="children" className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tight text-black">Section 9: Children's Privacy</h2>
                                <p>Our Website is intended for adults. We do not knowingly collect Personal Information from children under 13. If such data is discovered, it will be deleted promptly in compliance with COPPA.</p>
                            </div>
                        </div>

                        {/* Section 10: U.S. Privacy Rights */}
                        <div id="rights" className="bg-[#FE8204]/10 p-8 md:p-12 rounded-[2rem] space-y-4">
                            <h2 className="text-3xl font-bold tracking-tight text-black">Section 10: U.S. Privacy Rights</h2>
                            <h4 className="text-xl font-bold text-black mb-2">California Privacy Rights (CCPA / CPRA)</h4>
                            <p className="text-black">California residents may have rights to access, correct, delete, and limit the use of their Personal Information. <strong>We do not sell Personal Information.</strong> Requests may be submitted to our support team.</p>
                        </div>

                        {/* Section 11 & Acceptance */}
                        <div id="changes" className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tight text-black">Section 11: Changes to this Policy</h2>
                                <p>We may update this Privacy Policy from time to time. Updates take effect upon posting on the Website.</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-2xl text-black border-l-4 border-black">
                                <strong>Acceptance of this Policy:</strong> By using the Website and Services, you acknowledge that you have read and agree to this Privacy Policy.
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Privacy & Contact Section */}
                        <div id="contact" className="text-center bg-gray-50 p-10 md:p-16 rounded-[2.5rem] space-y-6">
                            <div className="mx-auto w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 shadow-md">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-black">Questions & Contact</h2>
                            <p className="text-lg max-w-2xl mx-auto">
                                If you wish to access, correct, amend, or delete personal information, or have any questions regarding this Privacy Policy, please reach out to us.
                            </p>
                            <div className="pt-4">
                                <a 
                                    href="mailto:support@justtattoos.com" 
                                    className="inline-block bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#FE8204] hover:shadow-lg transition-all duration-300"
                                >
                                    support@justtattoos.com
                                </a>
                            </div>
                        </div>

                    </article>
                </div>
            </section>
        </main>
    );
}