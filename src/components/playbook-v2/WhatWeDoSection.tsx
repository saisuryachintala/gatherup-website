'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { scrollReveal, staggerContainer } from '@/utils/animations';

const capabilities = [
    {
        title: 'Strategic Activation Design',
        description:
            'We design tenant programming & calendars tailored to your building\'s profile, and data, and clearly articulated engagement goals.',
    },
    {
        title: 'Consistent Communication',
        description:
            'We spoon feed you the messaging and reminders so more tenants actually show up—without you having to chase them.',
    },
    {
        title: 'Reporting',
        description:
            'We track attendance, and satisfaction to deliver a clear performance readability that turns activation into an asset-level KPI.',
    },
    {
        title: 'True Partnership Model',
        description:
            'Our team handles scheduling, communication, staffing, and reporting so your property team stays focused on core property trust.',
    },
    {
        title: 'A Repeatable Way to Run Things',
        description:
            'We give you a clear structure for how engagement works, so it remains consistent, not reactive.',
    },
    {
        title: 'Programs Tenants Actually Attend & Like',
        description:
            'Everything is planned around when tenants are in the building and what they\'ll show up for.',
    },
];

export const WhatWeDoSection: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section ref={sectionRef}>
            {/* <div className="w-full bg-[#053d3d] py-12 md:py-16 text-center px-5 md:px-10">
                <p className="text-lg sm:text-2xl md:text-4xl font-bold text-[#e0f2cc] font-display">
                    Most tenant amenities go unused.
                </p>
                <p className="pt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-[#a6ff48]">
                    This playbook shows you how to change that.
                </p>
            </div> */}

            <div className="bg-[#053d3d] px-5 py-12 md:px-10 md:py-16 lg:px-16 xl:px-[120px] 2xl:px-[200px]">
            <motion.div
                className="max-w-7xl mx-auto flex flex-col gap-8"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Badge + Heading */}
                <motion.div className="flex flex-col gap-3 items-center lg:items-start" variants={scrollReveal}>
                    <div className="inline-flex border border-[#a6ff48] rounded-2xl px-4 py-2">
                        <span className="font-sans text-sm text-[#a6ff48] uppercase tracking-wide">
                            What Do We Do?
                        </span>
                    </div>
                    <h2 className="font-sans font-bold text-[#e0f2cc] text-2xl md:text-[32px] md:leading-tight text-center lg:text-left">
                        Experiences that <span className="text-[#a6ff48] uppercase">Transforms</span> properties
                    </h2>
                    <p className="font-sans text-[#e0f2cc] md:text-lg text-[#bce8e7] leading-normal max-w-3xl text-center lg:text-left">
                        GatherUp helps teams design and deliver tenant experiences in a way that's organized, consistent, and never a headache.
                    </p>
                </motion.div>

                {/* 6 Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    variants={staggerContainer}
                >
                    {capabilities.map((item, index) => (
                        <motion.div
                            key={index}
                            className="bg-[#3d6e6e]/30 border border-[#a6ff48]/30 rounded-2xl p-6 flex flex-col gap-2"
                            variants={scrollReveal}
                        >
                            <h3 className="font-sans font-bold text-lg text-[#e0f2cc]">
                                {item.title}
                            </h3>
                            <p className="font-sans text-sm text-[#bce8e7] leading-normal">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
            </div>
        </section>
    );
};
