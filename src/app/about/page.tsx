'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SharedHeroBanner from '@/src/components/layout/SharedHeroBanner';

export default function AboutUs() {
    return (
        <main className="w-full bg-white text-black overflow-hidden">
            {/* Hero Section */}
            <SharedHeroBanner 
                title="ABOUT US"
                image="/assets/images/AboutUsHero.jpg"
                mobileImage="/assets/images/AboutUsHeroMobile.jpg"
                useMobileImage={true}
                textColor="#FE8204" // Kept your brand color, or change to #FFFFFF / #000000 if preferred
            />

            {/* Intro Section: Every Version of You */}
            <section className="container mx-auto px-6 py-20 md:py-32">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                    <div className="md:w-1/2 space-y-6">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                            Tattoos for Every <br /> Version of You
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
                            Our ultra-realistic temporary tattoos are designed to help you express yourself boldly without the commitment. Whether you're testing a new aesthetic or just having fun, each design lasts up to ten days and blends seamlessly with your skin for an authentic, tattoo-like finish you can wear with confidence.
                        </p>
                    </div>
                    <div className="md:w-1/2 w-full relative h-[400px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl">
                        <Image 
                            src="/assets/images/about-expression.jpg" 
                            alt="Person expressing themselves with ultra-realistic temporary tattoos" 
                            fill 
                            className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* Who We Are Section */}
            <section className="bg-gray-50 py-20 md:py-32">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
                        <div className="md:w-1/2 space-y-8">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                                Who We Are
                            </h2>
                            <p className="text-lg text-gray-600 font-medium leading-relaxed">
                                With a growing catalog of artist-designed creations, our innovative semi-permanent tattoos and freehand tools make it easy to explore new styles without the lifelong commitment.
                            </p>
                            <p className="text-lg text-gray-600 font-medium leading-relaxed">
                                Loved by customers worldwide, <strong>Just Tattoos</strong> offers authentic-looking designs that last up to ten days—giving you the freedom to change your look, play with your style, and express yourself confidently. Discover all the ways you can get inked, and become part of the Just Tattoos community!
                            </p>
                            <div className="pt-4">
                                <Link 
                                    href="/shop" 
                                    className="inline-block bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#FE8204] hover:shadow-lg transition-all duration-300"
                                >
                                    Shop Now
                                </Link>
                            </div>
                        </div>
                        <div className="md:w-1/2 w-full relative h-[450px] md:h-[600px] rounded-3xl overflow-hidden shadow-xl">
                            <Image 
                                src="/assets/images/who-we-are.jpg" 
                                alt="Artist designing temporary tattoo creations" 
                                fill 
                                className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Commitments & Values Section (AODA & Land Acknowledgement) */}
            <section className="container mx-auto px-6 py-20 md:py-32">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Our Commitments</h2>
                    <p className="text-lg text-gray-500 font-medium">Building an inclusive, equitable, and respectful community.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    
                    {/* AODA Card */}
                    <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                        <div className="mb-6 inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 uppercase tracking-wider">AODA</h3>
                        <div className="text-gray-600 font-medium leading-relaxed space-y-4 flex-grow">
                            <p>
                                Just Tattoos is committed to creating a safe, inclusive, and accessible environment for all individuals with disabilities. We ensure that employees, candidates, volunteers, interns, and customers with disabilities are provided equal access to our services and opportunities in a timely, fair, and inclusive manner. 
                            </p>
                            <p>
                                Transparency in communication is a core value at Just Tattoos. Just Tattoos complies with applicable accessibility and human rights standards. We reinforce full inclusion of persons with disabilities across all our services, employment practices, and customer experiences, ensuring that accessibility remains central to our mission.
                            </p>
                        </div>
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <p className="text-sm text-gray-500 font-medium mb-2">Learn more or request accommodations:</p>
                            <a 
                                href="mailto:feedback@justtattoos.com" 
                                className="text-lg font-bold border-b-2 border-black pb-1 hover:text-[#FE8204] hover:border-[#FE8204] transition-colors"
                            >
                                feedback@justtattoos.com
                            </a>
                        </div>
                    </div>

                    {/* Land Acknowledgement Card */}
                    <div className="bg-black text-white p-8 md:p-12 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full">
                        <div className="mb-6 inline-flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 uppercase tracking-wider">Land Acknowledgement</h3>
                        <div className="text-gray-300 font-medium leading-relaxed space-y-4 flex-grow text-sm md:text-base">
                            <p>
                                Just Tattoos is committed to creating inclusive and equitable spaces for all, while amplifying the voices of our employees and the communities we serve. We wish to acknowledge the land on which we operate, recognizing the painful and enduring history of Colonization between Indigenous peoples and their traditional territories.
                            </p>
                            <p>
                                It is essential that we acknowledge we operate on the native land of the Mississaugas of the Credit, Anishnabeg, Chippewa, Haudenosaunee, and Wendat peoples. ‘Toronto’ originates from the Mohawk word ‘Tkaronto,’ meaning ‘the place in the water where the trees are standing.’ We express our gratitude to the Indigenous peoples of this territory and across Turtle Island.
                            </p>
                            <p>
                                We understand this is only one small way to show solidarity and resist systemic oppression. The journey toward reconciliation is ongoing. We also acknowledge and honor all Treaty peoples including those who were brought to this land against their will, specifically, forcibly displaced people of African origin and descent as a result of the Trans-Atlantic Slave Trade and Slavery. We pay homage to those ancestors of African lineage.
                            </p>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}