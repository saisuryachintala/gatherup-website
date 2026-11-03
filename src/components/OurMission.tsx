'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { scrollReveal, imageLoad, staggerContainer } from '@/utils/animations';

export const OurMission: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section className="bg-[#E7F9DB] w-full px-2 md:px-2 overflow-hidden">
            {/* Mission Section */}
            <div className=" bg-[#E7F9DB] py-20 md:py-24">
                <div className="mx-auto max-w-7xl px-4 md:px-8">
                    <motion.div
                        ref={sectionRef}
                        className="grid md:grid-cols-2 gap-4 items-end -mt-12"
                        variants={staggerContainer}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {/* Left Column: Text */}
                        <motion.div className="space-y-6 flex flex-col justify-center" variants={scrollReveal}>
                            <h3 className="text-[#053D3D] font-bold text-xl md:text-2xl font-display tracking-wide">
                                Our Mission
                            </h3>
                            <p className="text-[#053D3D] text-base md:text-lg leading-relaxed">
                                GatherUp partners with property leaders to <span className="text-[#053D3D] font-bold">turn wellness and community engagement into measurable business impact.</span>
                            </p>
                            <p className="text-[#053D3D] text-base md:text-lg leading-relaxed">
                                Through evidence-based strategies and holistic programming, we help elevate the tenant experience, strengthen loyalty, and drive long-term property performance.
                            </p>
                        </motion.div>

                        {/* Right Column: Illustration */}
                        <motion.div
                            className="flex justify-center md:justify-end items-end overflow-visible"
                            variants={imageLoad}
                        >
                            <div className="relative flex items-end overflow-visible w-full md:w-auto">
                                <Image
                                    src="/assets/images/gatherup-illustration.png"
                                    alt="GatherUp Illustration"
                                    width={900}
                                    height={1000}
                                    className="ml-12 -mb-24 w-full max-w-[90vw] sm:max-w-[500px] md:max-w-[550px] lg:max-w-[650px] xl:max-w-[750px] 2xl:max-w-[850px] h-auto object-contain md:scale-110 lg:scale-115 origin-bottom"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
