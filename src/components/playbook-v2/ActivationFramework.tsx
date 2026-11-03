'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { scrollReveal, staggerContainer } from '@/utils/animations';

const pillars = [
    {
        title: 'Understand What Tenants Will Show Up For',
        description:
            'Have a simple way to stay in tune with tenant schedules, preferences, and when the building is most active, so you\'re not guessing what/when to offer.',
    },
    {
        title: 'Communicate Strategically',
        description:
            'Use rhythmic touchpoints - both before and after programs - to make sure tenants actually know what to expect and show up everytime.',
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
    //'Why low attendance is always a system problem.',
    'A step-by-step communication plan so more tenants know what\'s going on and actually show up to programs',
    'A detailed checklist to avoid last-minute issues before each activation',
    'A clear 30-day plan so everyone on your team knows what they\'re responsible for',
    //'Simple metrics that make programming an asset-level KPI',
    'A quick way to assess what’s working, what\'s not, and where to focus next'
    // 'A 30-day implementation plan with clear ownership assignments',
    // 'A self-assessment tool to identify your highest-impact 90-day focus',
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
                <motion.div className="flex flex-col gap-3 items-center lg:items-start" variants={scrollReveal}>
                    <div className="inline-flex border border-[#a6ff48] rounded-2xl px-4 py-2">
                        <span className="font-sans text-sm text-[#a6ff48] uppercase tracking-wide">
                            Inside the Playbook
                        </span>
                    </div>
                    <h2 className="font-sans font-bold text-[#e0f2cc] text-2xl md:text-[32px] md:leading-tight text-center lg:text-left">
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
                            The Tenant Engagement Playbook gives you a simple, structured way to plan, promote, and run engagements without having to figure it out from scratch each time.
                        </p>

                        <div className="flex flex-col gap-2">
                            <p className="font-sans text-base md:text-xl text-[#a6ff48] leading-normal">
                                How to find out what your tenants are actually interested in
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
