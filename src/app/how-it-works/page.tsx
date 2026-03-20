'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SharedHeroBanner from '@/src/components/layout/SharedHeroBanner';

const steps = [
    {
        id: 1,
        title: 'Prime',
        description: 'Grab the Primer Wipe and exfoliate the area you wish to place your tattoo for 30 seconds. Wait until it’s fully dry, like, 60 seconds.',
        image: '/assets/images/step-1-prime.jpg',
        alt: 'Person prepping skin with a primer wipe'
    },
    {
        id: 2,
        title: 'Place',
        description: 'Peel off the tattoo backing and place the tattoo on your skin, sticky side down. Find the peelable corner and remove the paper border. Press down to ensure it’s totally adhered. Need a little help? Ask a friend! Then chill for an hour while your ink develops.',
        image: '/assets/images/step-2-place.jpg',
        alt: 'Applying the temporary tattoo to the skin'
    },
    {
        id: 3,
        title: 'Peel',
        description: 'After one hour, peel off the applicator. The ink will initially be blue/green depending on your skin and develop into a blue/black within 24 hours. Now you’re basically your own tattoo artist!',
        image: '/assets/images/step-3-peel.jpg',
        alt: 'Peeling off the tattoo applicator to reveal the design'
    }
];

export default function HowItWorks() {
    return (
        <main className="w-full mt-10 bg-white text-black overflow-hidden">
            {/* Hero Section */}
            <SharedHeroBanner 
                title="HOW IT WORKS"
                image="/assets/images/HowItWorksHero.jpg"
                mobileImage="/assets/images/HowItWorksHeroMobile.jpg"
                useMobileImage={true}
                textColor="#FE8204"
            />

            {/* Intro Header */}
            <section className="container mx-auto px-6 pt-20 pb-10 md:pt-32 md:pb-16 text-center max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 uppercase">
                    Your Ink, Your Way
                </h2>
                <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
                    Achieving an authentic, ultra-realistic look is easy. Follow these three simple steps to apply your design and let your ink develop flawlessly.
                </p>
            </section>

            {/* Steps Section */}
            <section className="container mx-auto px-6 pb-24 md:pb-40">
                <div className="flex flex-col gap-24 md:gap-32">
                    {steps.map((step, index) => {
                        const isEven = index % 2 !== 0;

                        return (
                            <div 
                                key={step.id} 
                                className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 group ${isEven ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Image Container */}
                                <div className="w-full md:w-1/2 relative h-[350px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-100">
                                    <Image 
                                        src={step.image} 
                                        alt={step.alt} 
                                        fill 
                                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>

                                {/* Content Container */}
                                <div className="w-full md:w-1/2 relative flex flex-col justify-center">
                                    {/* Massive Background Number */}
                                    <span className="absolute -top-16 -left-8 md:-top-24 md:-left-12 text-[10rem] md:text-[14rem] font-black text-gray-50 leading-none select-none z-0">
                                        0{step.id}
                                    </span>
                                    
                                    {/* Foreground Text */}
                                    <div className="relative z-10 space-y-6">
                                        <div className="inline-block px-4 py-1.5 bg-black text-white text-sm font-bold tracking-widest uppercase rounded-full mb-2">
                                            Step {step.id}
                                        </div>
                                        <h3 className="text-4xl md:text-6xl font-bold tracking-tight">
                                            {step.title}
                                        </h3>
                                        <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed max-w-lg">
                                            {step.description}
                                        </p>
                                        
                                        <div className="pt-6">
                                            <Link 
                                                href="/collections" 
                                                className="group/btn inline-flex items-center gap-3 border-b-2 border-black pb-2 text-lg font-bold uppercase tracking-wider hover:text-[#FE8204] hover:border-[#FE8204] transition-all duration-300"
                                            >
                                                Shop Tattoos
                                                <svg 
                                                    className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform duration-300" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}