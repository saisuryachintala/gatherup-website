'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { scrollReveal, staggerContainer } from '@/utils/animations';

const pillars = [
    {
        title: 'Tenant Signal Discipline',
        description:
            'Systematically capture tenant preferences, schedules, and in-office patterns to align programming with actual demand',
    },
    {
        title: 'Communication Consistency',
        description:
            'Deploy a multi-touch cadence. Calendar holds, day-before reminders, proximity pushes, and post-event social proof to anticipation and attendance.',
    },
    {
        title: 'Frictionless Delivery',
        description:
            'Eliminate operational barriers with a 72-hour readiness standard so tenants experience seamless, professional execution every single time.',
    },
    {
        title: 'Performance & Review Rhythm',
        description:
            'Track, review, and refine activation performance to build a compounding engagement asset that is visible to ownership and leasing teams.',
    },
];

const learnings = [
    'Why low attendance is always a system problem.',
    'How to run a quarterly tenant pulse survey in under 2 minutes',
    'The 3-touch activation rhythm that eliminates guesswork',
    'The 72-hour readiness checklist for flawless execution',
    'Simple metrics that make programming an asset-level KPI',
    'How engagement data strengthens leasing tours and renewal conversations',
    'A 30-day implementation plan with clear ownership assignments',
    'A self-assessment tool to identify your highest-impact 90-day focus',
];

export const ActivationFramework: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section
            ref={sectionRef}
            className="bg-[#053d3d] px-5 py-12 md:px-10 md:py-[50px] lg:px-16 xl:px-[120px] 2xl:px-[200px]"
        >
            <motion.div
                className="max-w-7xl mx-auto flex flex-col gap-4"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Badge + Heading */}
                <motion.div className="flex flex-col gap-2" variants={scrollReveal}>
                    <div className="inline-flex self-start border border-[#a6ff48] rounded-2xl px-4 py-2">
                        <span className="font-sans text-sm text-[#a6ff48] uppercase tracking-wide">
                            Inside the Playbook
                        </span>
                    </div>
                    <h2 className="font-sans font-bold text-[#e0f2cc] text-2xl md:text-[32px] md:leading-tight">
                        A Four-Pillar{' '}
                        <span className="text-[#a6ff48]">Activation Framework.</span>
                    </h2>
                </motion.div>

                {/* Two-column content */}
                <div className="flex flex-col lg:flex-row gap-4 flex-1">
                    {/* Left: Playbook description card */}
                    <motion.div
                        className="bg-[#3d6e6e]/30 border border-[#a6ff48]/30 rounded-2xl px-6 py-5 md:px-10 md:py-5 flex flex-col gap-4 justify-center lg:flex-1"
                        variants={scrollReveal}
                    >
                        <p className="font-sans text-base md:text-xl text-[#e0f2cc] leading-normal">
                            The Tenant Engagement Playbook introduces the same operating
                            system used by high-performing properties to turn engagement
                            from occasional programming into a repeatable performance
                            asset.
                        </p>

                        <div className="flex flex-col gap-2">
                            <p className="font-sans text-base md:text-xl text-[#a6ff48] leading-normal">
                                What will you learn with this Playbook?
                            </p>
                            <ul className="flex flex-col gap-2">
                                {learnings.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex gap-1.5 items-start"
                                    >
                                        <span className="font-sans font-bold text-sm text-[#a6ff48] shrink-0 leading-normal">
                                            -
                                        </span>
                                        <span className="font-sans text-sm text-[#bce8e7] leading-normal">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Right: Four pillar cards */}
                    <motion.div
                        className="flex flex-col gap-4 lg:flex-1"
                        variants={staggerContainer}
                    >
                        {pillars.map((pillar, index) => (
                            <motion.div
                                key={index}
                                className="bg-[#3d6e6e]/30 border border-[#a6ff48]/30 rounded-2xl p-5 flex flex-col justify-center flex-1"
                                variants={scrollReveal}
                            >
                                <h3 className="font-sans font-bold text-xl text-[#e0f2cc]">
                                    {pillar.title}
                                </h3>
                                <p className="font-sans text-sm text-[#bce8e7] leading-normal">
                                    {pillar.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};
