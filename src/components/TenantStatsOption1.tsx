'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { scrollReveal, staggerContainer } from '@/utils/animations';

export const TenantStatsOption1: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    const stats = [
        {
            number: "70%+",
            description: "of tenants say experience and community influence their decision to renew, not just rent price",
            source: "JLL tenant experience research",
            icon: (
                <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            number: "2-3x",
            description: "higher engagement and loyalty in properties that prioritize tenant well-being compared to low well-being environments",
            source: "Harvard Business Review",
            icon: (
                <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            )
        },
        {
            number: "80%",
            description: "of consumers say experience matters as much as price when choosing where to live or work",
            source: "PwC Experience is Everything report",
            icon: (
                <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    ];

    return (
        <motion.section
            ref={sectionRef}
            className="px-2 md:px-4 py-16 md:py-20 bg-[#F5FAF5]"
            variants={scrollReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-[#053d3d] mb-12 md:mb-16 text-center"
                    variants={scrollReveal}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    The Impact of Tenant Engagement
                </motion.h2>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-lg shadow-lg p-6 md:p-8 border-t-4 border-[#a6ff48] transition-shadow duration-300"
                            variants={scrollReveal}
                        >
                            <div className="flex flex-col items-center text-center h-full">
                                <div className="text-[#a6ff48] mb-4">
                                    {stat.icon}
                                </div>
                                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#053d3d] mb-4">
                                    {stat.number}
                                </div>
                                <p className="text-[#053d3d] text-base md:text-lg mb-6 flex-grow">
                                    {stat.description}
                                </p>
                                <p className="text-sm text-gray-600 italic">
                                    *{stat.source}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
};
