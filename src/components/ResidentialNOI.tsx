'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { scrollReveal, imageLoad, staggerContainer } from '@/utils/animations';

export const ResidentialNOI: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section className="px-2 md:px-4 py-3 md:py-4 bg-[#053d3d]">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    ref={sectionRef}
                    className="grid md:grid-cols-2 gap-8 items-center py-4"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* Left Column - Text Content */}
                    <motion.div
                        className="text-center md:text-left"
                        variants={scrollReveal}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-[#a6ff48] mb-4 font-display">The GatherUp Impact</h2>
                        <p className="text-lg text-white mb-4">
                            GatherUp creates a positive impact cycle that starts with people and ends with performance. By activating onsite experiences and meaningful community moments, residents feel more connected, supported, and satisfied in their living environment.
                        </p>
                        <p className="text-lg text-white mb-4">
                            When residents are happier and more connected, renewals increase, turnover drops, and vacancy friction decreases. The result is a healthier NOI through intentional experiences that turn everyday living into a reason to stay.
                        </p>
                        <p className="text-xl text-[#a6ff48] font-bold mb-4 mt-4">
                            GatherUp helps properties turn resident engagement into a measurable business advantage.
                        </p>
                    </motion.div>

                    {/* Right Column - Image */}
                    <motion.div
                        className="relative"
                        variants={imageLoad}
                    >
                        <div className="relative w-full min-h-[300px] h-[400px] md:h-[550px] rounded-2xl overflow-hidden bg-[#053d3d]">
                            <Image
                                src="/assets/images/at-gatherup-noi-no-bg.png"
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
