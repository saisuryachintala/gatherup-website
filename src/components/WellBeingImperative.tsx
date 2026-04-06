'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { scrollReveal, staggerContainer } from '@/utils/animations';

export const WellBeingImperative: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section className="px-2 md:px-4 py-8 md:py-12 bg-[#053d3d]">
            <div className="container mx-auto px-4 text-center max-w-4xl">
                <motion.div
                    ref={sectionRef}
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.p
                        variants={scrollReveal}
                        className="text-2xl md:text-3xl font-bold text-[#a6ff48] mb-6"
                    >
                        It&apos;s more than a perk.<br />
                        <span className="inline-block bg-[#a6ff48] text-[#053d3d] px-4 py-2 mt-2 text-3xl md:text-4xl">
                            It&apos;s a property performance strategy.
                        </span>
                    </motion.p>
                    <motion.p
                        variants={scrollReveal}
                        className="text-lg text-white leading-relaxed"
                    >
                        Properties that invest in <span className="font-bold">connection, activation, and community</span> see stronger satisfaction, higher retention, better renewals, and healthier NOI.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};
