'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { scrollReveal, staggerContainer } from '@/utils/animations';

const capabilities = [
    {
        title: 'Strategic Activation Design',
        description:
            'We design tenant programming & calendar tailored to your building\'s profile, and data, and clearly articulated engagement goals.',
    },
    {
        title: 'Multi-Touch Communication',
        description:
            'We build and deploy structured communication cadences across every channel to confirm that no touch point is left unfinished.',
    },
    {
        title: 'Performance Measurement',
        description:
            'We track attendance, impact data, and satisfaction to deliver a clear performance readability that turns activation into an asset-level KPI.',
    },
    {
        title: 'True Partnership Model',
        description:
            'Our team handles scheduling, communication, staffing, and reporting so your property team stays focused on core property trust.',
    },
    {
        title: 'Repeatable Systems',
        description:
            'We install the operating disciplines, signal capture, scheduling flows that make tenant activation scalable on the clockwork.',
    },
    {
        title: 'Wellness Programming',
        description:
            'From fitness activations to community building experiences, every program is designed to strengthen community and differentiate the tenant experience.',
    },
];

export const WhatWeDoSection: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section
            ref={sectionRef}
            className="bg-[#053d3d] px-5 py-12 md:px-10 md:py-16 lg:px-[120px] xl:px-[200px]"
        >
            <motion.div
                className="max-w-7xl mx-auto flex flex-col gap-8"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Badge + Heading */}
                <motion.div className="flex flex-col gap-3" variants={scrollReveal}>
                    <div className="inline-flex self-start border border-[#a6ff48] rounded-2xl px-4 py-2">
                        <span className="font-sans text-sm text-[#a6ff48] uppercase tracking-wide">
                            What Do We Do?
                        </span>
                    </div>
                    <h2 className="font-sans font-bold text-white text-2xl md:text-[32px] md:leading-tight">
                        Wellness that <span className="font-black uppercase">Transforms</span> properties
                    </h2>
                    <p className="font-sans text-base md:text-lg text-[#bce8e7] leading-normal max-w-3xl">
                        GatherUp designs and delivers tenant engagement programming that turns your amenity spaces
                        from a line item into a measurable competitive advantage.
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
                            className="border border-[#a6ff48] rounded-[20px] p-6 flex flex-col gap-2"
                            variants={scrollReveal}
                        >
                            <h3 className="font-sans font-bold text-lg text-white">
                                {item.title}
                            </h3>
                            <p className="font-sans text-sm text-[#bce8e7] leading-normal">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};
