'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { scrollReveal, imageLoad, staggerContainer } from '@/utils/animations';
import { useRef } from 'react';

export const WhyGatherUp: React.FC = () => {
    const features = [
        {
            title: "Boost Engagement",
            description: "Drive participation with interactive programming designed to energize your community.",
            icon: "/assets/icons/New Icon Set/Boost Engagement.svg"
        },
        {
            title: "Increase Retention",
            description: "Reduce turnover by cultivating a strong sense of belonging through events.",
            icon: "/assets/icons/New Icon Set/Increase Retention.svg"
        },
        {
            title: "Strengthen Culture & Foster Belonging",
            description: "Strengthen tenant dynamics and reduce turnover with custom community-building initiatives.",
            icon: "/assets/icons/New Icon Set/Strengthen Culture & Foster Belonging.svg"
        }
    ];

    const headerRef = useRef(null);
    const contentRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true, amount: 0.1 });
    const contentInView = useInView(contentRef, { once: true, amount: 0.1 });

    return (
        <section className="w-full">
            {/* Header Section */}
            <motion.div
                ref={headerRef}
                className="bg-[#053d3d] py-12 text-center px-4"
                variants={scrollReveal}
                initial="hidden"
                animate={headerInView ? "visible" : "hidden"}
            >
                <p className="text-4xl md:text-5xl font-bold text-white font-display">
                    Happier Tenants,
                </p>
                <p className="pt-4 text-4xl md:text-5xl font-bold text-[#a6ff48]">Better Business Outcomes</p>
            </motion.div>

            {/* Content Section */}
            <div className="bg-[#F5FAF5] py-12 md:py-16">
                <div className="mx-auto max-w-7xl px-4 md:px-8">
                    <motion.div
                        ref={contentRef}
                        className="grid md:grid-cols-2 gap-12 items-center"
                        variants={staggerContainer}
                        initial="hidden"
                        animate={contentInView ? "visible" : "hidden"}
                    >
                        {/* Left Column: Text */}
                        <motion.div className="space-y-6" variants={scrollReveal}>
                            <h3 className="text-2xl md:text-3xl font-bold text-[#053d3d] font-display">
                                The Power of GatherUp
                            </h3>
                            <div className="text-lg space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    Most property teams know that wellness matters, but few have the time, data, or expertise to turn it into a measurable strategy.
                                </p>
                                <div className="h-0.25 w-64 md:w-128 bg-[#053d3d]/40 rounded-full mb-6 mx-auto"></div>
                                <p>
                                    <span className="italic">That&apos;s where we come in.</span>
                                </p>
                                <p>
                                    GatherUp designs and delivers wellness programming that drives engagement, boosts retention, and improves property performance.
                                </p>
                            </div>
                        </motion.div>

                        {/* Right Column: Cards */}
                        <motion.div className="space-y-6" variants={staggerContainer}>
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    variants={scrollReveal}
                                    className="bg-[#053d3d] rounded-xl p-6 flex items-center gap-4 shadow-lg text-white"
                                >
                                    {/* Icon */}
                                    <motion.div
                                        className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-white/10 rounded-lg flex items-center justify-center p-2 md:p-3"
                                        variants={imageLoad}
                                    >
                                        <Image
                                            src={feature.icon}
                                            alt={feature.title}
                                            width={112}
                                            height={112}
                                            className="object-contain w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24"
                                        />
                                    </motion.div>

                                    <div>
                                        <h4 className="text-[#a6ff48] font-bold text-lg mb-2 font-display">
                                            {feature.title}
                                        </h4>
                                        <p className="text-white/90 text-base leading-relaxed -mt-2">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
