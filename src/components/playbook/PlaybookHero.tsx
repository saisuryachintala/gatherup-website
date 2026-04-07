'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { scrollReveal, staggerContainer } from '@/utils/animations';

const benefits = [
    'Activate tenant amenities',
    'Gain renewal and leasing advantage',
    'Track tenant engagement performance',
    'Build a repeatable tenant activation system',
];

export const PlaybookHero: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section
            ref={sectionRef}
            className="bg-gradient-to-r from-[#053d3d] to-[rgba(166,255,72,0.05)] px-5 py-12 md:px-10 md:py-12 lg:px-16 xl:px-[120px] 2xl:px-[200px]"
        >
            <motion.div
                className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-12 xl:gap-[100px] items-center"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Left: Title + CTA */}
                <motion.div className="flex flex-col gap-5 lg:shrink-0 lg:max-w-[420px] xl:max-w-[504px]" variants={scrollReveal}>
                    <div className="inline-flex self-start border border-[#a6ff48] rounded-2xl px-4 py-2">
                        <span className="font-sans text-sm text-[#a6ff48] uppercase">
                            Resource
                        </span>
                    </div>

                    <h1 className="font-sans font-black text-[#e0f2cc] text-3xl md:text-[48px] md:leading-[1.04] uppercase">
                        The Tenant<br />
                        Engagement<br />
                        {/* text-[#e0f2cc] */}
                        <span className="text-[#a6ff48]">Playbook</span>
                    </h1>

                    <p className="font-sans text-lg md:text-xl text-white leading-normal">
                        Download our free comprehensive wellness guide and discover how
                        leading properties drive tenant satisfaction, community, and
                        occupancy.
                    </p>

                    <div className="flex flex-col gap-2">
                        <a
                            href="#download"
                            className="inline-flex self-start items-center gap-2 bg-[#a6ff48] text-[#053d3d] font-sans font-bold text-base rounded-3xl pl-6 pr-4 py-3 hover:brightness-110 transition-all"
                        >
                            Download Free Playbook
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#053d3d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </a>
                        <span className="font-sans text-sm text-white">
                            No Credit card required | Instant Download
                        </span>
                    </div>
                </motion.div>

                {/* Right: PDF Preview Card */}
                <motion.div
                    className="border border-[#a6ff48] rounded-[40px] bg-[#053d3d] p-8 md:p-10 flex flex-col justify-between gap-6 flex-1 shadow-[0px_20px_30px_0px_rgba(0,0,0,0.25)] w-full lg:w-auto"
                    variants={scrollReveal}
                >
                    <div className="flex items-center justify-between">
                        <div className="relative w-[160px] md:w-[200px] h-[50px] md:h-[60px]">
                            <Image
                                src="/assets/GatherUp-Lockups/SVG/Lockups_Full Logo_Brand Colours.svg"
                                alt="GatherUp"
                                fill
                                className="object-contain object-left"
                                sizes="200px"
                            />
                        </div>
                        <span className="font-sans text-base text-[#a6ff48] capitalize">
                            Free PDF document
                        </span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div>
                            <h2 className="font-sans font-black text-2xl md:text-4xl text-white capitalize leading-[1.04]">
                                The Tenant Engagement
                            </h2>
                            <h2 className="font-sans font-black text-2xl md:text-4xl text-[#a6ff48] capitalize leading-[1.04]">
                                Playbook
                            </h2>
                        </div>

                        <div className="h-px bg-[#a6ff48]/30 w-full" />

                        <p className="font-sans text-lg md:text-xl text-white leading-normal">
                            How leading properties drive tenant satisfaction, community,
                            and occupancy by:
                        </p>

                        <div className="flex flex-col gap-4">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="bg-[#a6ff48] rounded-full w-[30px] h-[30px] flex items-center justify-center shrink-0">
                                        <span className="font-sans font-bold text-sm text-[#053d3d]">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <span className="font-sans text-lg md:text-xl text-[#a6ff48]">
                                        {benefit}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};
