import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SharedHeroBanner from '@/src/components/layout/SharedHeroBanner';
import { getAboutPageData } from '@/src/lib/shopify'; // Adjust path if your index.ts is elsewhere

export default async function AboutUs() {
    // Fetch dynamic content from Shopify. 
    // IMPORTANT: Make sure 'about-page' exactly matches the handle of the entry you created in Shopify Admin!
    const content = await getAboutPageData('about-page-dxkfa8ev'); 

    // Fallback if the fetch fails or you forgot to publish the metaobject
    if (!content) return <div className="p-20 text-center">Loading About Us content...</div>;

    return (
        <main className="w-full bg-white text-black overflow-hidden">
            {/* Hero Section */}
            <SharedHeroBanner 
                title={content.heroTitle}
                image={content.heroImage}
                mobileImage={content.heroImage}
                useMobileImage={true}
                textColor="#FE8204"
            />

            {/* Intro Section: Every Version of You */}
            <section className="container mx-auto px-6 py-20 md:py-32">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                    <div className="md:w-1/2 space-y-6">
                        {/* whitespace-pre-line makes your Shopify line breaks render properly! */}
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight whitespace-pre-line">
                            {content.introHeading}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed whitespace-pre-line">
                            {content.introParagraph}
                        </p>
                    </div>
                    <div className="md:w-1/2 w-full relative h-[400px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl">
                        <Image 
                            src={content.introImage} 
                            alt={content.introHeading.replace('\n', ' ')} 
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
                                {content.whoWeAreHeading}
                            </h2>
                            <p className="text-lg text-gray-600 font-medium leading-relaxed whitespace-pre-line">
                                {content.whoWeAreParagraph1}
                            </p>
                            <p className="text-lg text-gray-600 font-medium leading-relaxed whitespace-pre-line">
                                {content.whoWeAreParagraph2}
                            </p>
                            <div className="pt-4">
                                <Link 
                                    href="/shop" 
                                    className="inline-block bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#FE8204] hover:shadow-lg transition-all duration-300"
                                >
                                    {content.whoWeAreButtonText}
                                </Link>
                            </div>
                        </div>
                        <div className="md:w-1/2 w-full relative h-[450px] md:h-[600px] rounded-3xl overflow-hidden shadow-xl">
                            <Image 
                                src={content.whoWeAreImage} 
                                alt={content.whoWeAreHeading} 
                                fill 
                                className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Commitments & Values Section */}
            <section className="container mx-auto px-6 py-20 md:py-32">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{content.commitmentsTitle}</h2>
                    <p className="text-lg text-gray-500 font-medium">{content.commitmentsSubtitle}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    
                    {/* AODA Card */}
                    <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                        <div className="mb-6 inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 uppercase tracking-wider">{content.aodaTitle}</h3>
                        <div className="text-gray-600 font-medium leading-relaxed space-y-4 flex-grow whitespace-pre-line">
                            <p>{content.aodaParagraph1}</p>
                            <p>{content.aodaParagraph2}</p>
                        </div>
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <p className="text-sm text-gray-500 font-medium mb-2">{content.aodaContactLabel}</p>
                            <a 
                                href={`mailto:${content.aodaEmail}`} 
                                className="text-lg font-bold border-b-2 border-black pb-1 hover:text-[#FE8204] hover:border-[#FE8204] transition-colors"
                            >
                                {content.aodaEmail}
                            </a>
                        </div>
                    </div>

                    {/* Land Acknowledgement Card */}
                    <div className="bg-black text-white p-8 md:p-12 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full">
                        <div className="mb-6 inline-flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 uppercase tracking-wider">{content.landAckTitle}</h3>
                        <div className="text-gray-300 font-medium leading-relaxed space-y-4 flex-grow text-sm md:text-base whitespace-pre-line">
                            <p>{content.landAckParagraph1}</p>
                            <p>{content.landAckParagraph2}</p>
                            <p>{content.landAckParagraph3}</p>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}