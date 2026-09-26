'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { scrollReveal, staggerContainer } from '@/utils/animations';

export const BeyondPerks: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section className="px-2 md:px-4 py-4 md:py-8 bg-[#f5faf5]">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <motion.div
                    ref={sectionRef}
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.h3
                        variants={scrollReveal}
                        className="text-3xl md:text-4xl font-bold text-[#053d3d] mb-4 font-display"
                    >
                        Beyond Amenities, This Is <span className="bg-[#a6ff48] text-[#053d3d] py-1 inline-block">Strategy</span>
                    </motion.h3>
                    <motion.p
                        variants={scrollReveal}
                        className="text-lg md:text-lg text-[#053d3d] leading-relaxed mb-1"
                    >
                        Most properties already have gyms, lounges, rooftops, or shared spaces.
                    </motion.p>
                    <motion.p
                        variants={scrollReveal}
                        className="text-lg md:text-lg text-[#053d3d] leading-relaxed mb-1"
                    >
                        The problem isn&apos;t <span className="font-bold">what you built</span>. It&apos;s <span className="font-bold">how you activate</span>.
                    </motion.p>
                    <motion.p
                        variants={scrollReveal}
                        className="text-lg md:text-lg text-[#053d3d] leading-relaxed mb-1"
                    >
                        Static amenities don&apos;t create loyalty. Occasional events don&apos;t create value.
                    </motion.p>
                    <motion.p
                        variants={scrollReveal}
                        className="text-lg md:text-lg text-[#053d3d] leading-relaxed mb-1"
                    >
                        Tenant well-being requires a <span className="font-bold">repeatable activation strategy</span> that turns spaces into experiences and buildings into places people want to stay.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};
