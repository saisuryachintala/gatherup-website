'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { scrollReveal, staggerContainer, downArrowBounce, upArrowBounce } from '@/utils/animations';

export const WhatsAtStake: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
    const negativeStakes = [
        "Low engagement with amenities",
        "Weak sense of community",
        "Higher turnover and shorter stays",
        "Renewal resistance",
        "Undifferentiated buildings competing on price alone"
    ];

    const positiveStakes = [
        "Stronger tenant satisfaction",
        "Longer stays and higher renewal rates",
        "More active, visible amenities",
        "Better online reputation and word-of-mouth reputations",
        "A clear competitive edge in leasing"
    ];

    return (
        <section className="px-2 md:px-4 py-4 md:py-4 bg-[#053d3d]">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={sectionRef}
                    className="text-center mb-12"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.h2
                        variants={scrollReveal}
                        className="text-3xl font-bold text-[#a6ff48] font-display mb-4"
                    >
                        What&apos;s at stake?
                    </motion.h2>
                    <motion.p
                        variants={scrollReveal}
                        className="text-lg text-white leading-relaxed mb-8"
                    >
                        Property well-being is the antidote to disengagement, turnover, and culture.
                    </motion.p>
                    {/* White separator line */}
                    <motion.div
                        variants={scrollReveal}
                        className="w-full max-w-xl mx-auto h-px bg-white/100"
                    ></motion.div>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* Negative Stakes */}
                    <motion.div variants={scrollReveal}>
                        <p className="text-base text-[#a6ff48] mb-4 font-medium">
                            When the tenant experience is passive or overlooked, properties experience:
                        </p>
                        <ul className="space-y-0">
                            {negativeStakes.map((item, i) => (
                                <li key={i}>
                                    <div className="py-3 text-white text-base flex items-center gap-3">
                                        <motion.div
                                            className="relative w-4 h-4 flex-shrink-0"
                                            variants={downArrowBounce}
                                            animate={isInView ? "animate" : ""}
                                        >
                                            <Image
                                                src="/assets/icons/D1.png"
                                                alt="Down"
                                                fill
                                                className="object-contain"
                                            />
                                        </motion.div>
                                        <span>{item}</span>
                                    </div>
                                    {i < negativeStakes.length - 1 && (
                                        <div className="h-px bg-white/30"></div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Positive Stakes */}
                    <motion.div variants={scrollReveal}>
                        <p className="text-base text-[#a6ff48] mb-4 font-medium">
                            When the tenant experience is intentionally activated, properties see:
                        </p>
                        <ul className="space-y-0">
                            {positiveStakes.map((item, i) => (
                                <li key={i}>
                                    <div className="py-3 text-white text-base flex items-center gap-3">
                                        <motion.div
                                            className="relative w-4 h-4 flex-shrink-0"
                                            variants={upArrowBounce}
                                            animate={isInView ? "animate" : ""}
                                        >
                                            <Image
                                                src="/assets/icons/U1.png"
                                                alt="Up"
                                                fill
                                                className="object-contain"
                                            />
                                        </motion.div>
                                        <span>{item}</span>
                                    </div>
                                    {i < positiveStakes.length - 1 && (
                                        <div className="h-px bg-white/30"></div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
