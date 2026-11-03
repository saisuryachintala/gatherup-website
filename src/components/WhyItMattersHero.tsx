'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp, imageLoad, staggerContainer } from '@/utils/animations';

export const WhyItMattersHero: React.FC = () => {
    return (
        <section className="relative min-h-[600px] md:min-h-[650px] flex items-center overflow-hidden bg-[#F5FAF5]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                {/* Portrait image for mobile devices */}
                <motion.div
                    className="absolute inset-0 md:hidden"
                    variants={imageLoad}
                    initial="hidden"
                    animate="visible"
                >
                    <Image
                        src="/assets/images/IMG_1736_v2.png"
                        alt="Employee Well-Being"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </motion.div>
                {/* Landscape image for tablet and desktop */}
                <motion.div
                    className="absolute inset-0 hidden md:block"
                    variants={imageLoad}
                    initial="hidden"
                    animate="visible"
                >
                    <Image
                        src="/assets/images/IMG_1736.JPG"
                        alt="Employee Well-Being"
                        fill
                        className="object-cover object-[39%_61%]"
                        priority
                    />
                </motion.div>
                {/* Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/25"></div>
            </div>

            {/* Content */}
            <div className="container mx-auto max-w-7xl px-4 md:px-8 relative z-10 py-12 md:py-20">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >

                    {/* <span className="inline-block bg-[#a6ff48] text-[#053d3d] px-4 py-2 mt-2 text-3xl md:text-4xl"> */}
                    {/* Why does Tenant<br />
                        Well-Being Matter? */}
                    {/* </span> */}
                    <motion.div
                        variants={fadeInUp}
                        className="w-full text-3xl sm:text-4xl sm:mt-4 mt-12 md:text-5xl lg:text-5xl xl:text-5xl font-bold text-white leading-tight drop-shadow-lg"
                    >
                        <div className="inline-block px-2 md:px-8 shadow-xl bg-[#053d3d]">
                            <p className="font-bold text-[#A6FF48] leading-relaxed">
                                Why Does Tenant
                            </p>
                            <p className="font-bold text-[#A6FF48] leading-relaxed">
                                Engagement Matter?
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
