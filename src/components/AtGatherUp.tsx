'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { scrollReveal, imageLoad, staggerContainer } from '@/utils/animations';

export const AtGatherUp: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
    const beliefs = [
        "The tenant experience drives retention",
        "Community reduces turnover",
        "Activated spaces outperform passive amenities"
    ];

    return (
        <section className="px-2 md:px-4 py-3 md:py-4 bg-[#053d3d]">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    ref={sectionRef}
                    className="grid md:grid-cols-2 gap-4 md:gap-8 items-center py-4"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* Left Column - Text Content */}
                    <motion.div
                        className="text-left"
                        variants={scrollReveal}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-[#a6ff48] mb-4 font-display">At GatherUp</h2>
                        <p className="text-lg text-white mb-4">
                            We help residential, commercial, and mixed-use properties turn well-being into measurable performance.
                        </p>
                        <p className="text-lg text-white mb-4">
                            We believe that:
                        </p>
                        <div className="space-y-3 mb-6">
                            {beliefs.map((belief, index) => (
                                <div key={index} className="flex items-start gap-3 text-lg text-white">
                                    <span className="text-[#a6ff48] flex-shrink-0">✓</span>
                                    <span>{belief}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-lg font-semibold text-white leading-relaxed">
                            This isn&apos;t feel-good programming.
                        </p>
                        <p className="text-lg font-semibold text-white leading-relaxed">
                            It&apos;s a property strategy executed on-site.
                        </p>
                    </motion.div>

                    {/* Right Column - Image */}
                    <motion.div
                        className="relative"
                        variants={imageLoad}
                    >
                        <div className="relative w-full min-h-[360px] h-[480px] md:h-[660px] rounded-2xl overflow-hidden bg-[#053d3d]">
                            <Image
                                src="/assets/images/at-gatherup-illustration-v4-no-bg.png"
                                alt="GatherUp Team"
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
