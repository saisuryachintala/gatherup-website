'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { scrollReveal, staggerContainer } from '@/utils/animations';

const stats = [
    {
        value: '73%',
        description: 'Increase in Tenant participation when programming is systematic.',
    },
    {
        value: 'Reduce Churn',
        description: 'Prove "Let shopping around" frequency of Renewals.',
    },
    {
        value: '+NPS',
        description: 'Measurable lift in tenant satisfaction scores.',
    },
    {
        value: '+NOI',
        description: 'Demonstrated engagement strengthens asset-level reporting.',
    },
];

const advantages = [
    {
        title: 'Leasing differentiation',
        description: 'Prospects tour the building experience, not just the floorplate.',
    },
    {
        title: 'Renewal leverage',
        description: 'Documented engagement shifts cost negotiations to value conversations.',
    },
    {
        title: 'Ownership reporting',
        description: 'Programming becomes reportable asset performance that builds confidence in your team.',
    },
];

export const BusinessAssetSection: React.FC = () => {
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
                            What If We Told You
                        </span>
                    </div>
                    <h2 className="font-sans font-bold text-[#e0f2cc] text-2xl md:text-[32px] md:leading-tight">
                        Engagement is a <span className="font-black">Business Asset</span>, not an option.
                    </h2>
                </motion.div>

                {/* Content: Stats + Advantages */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left: Stats Grid */}
                    <motion.div
                        className="grid grid-cols-2 gap-4 lg:flex-1"
                        variants={staggerContainer}
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="border border-[#a6ff48] rounded-[20px] p-5 flex flex-col gap-2 justify-center"
                                variants={scrollReveal}
                            >
                                <span className="font-sans font-black text-2xl md:text-3xl text-[#a6ff48]">
                                    {stat.value}
                                </span>
                                <p className="font-sans text-sm text-[#bce8e7] leading-normal">
                                    {stat.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right: Advantages */}
                    <motion.div
                        className="border border-[#a6ff48] rounded-[20px] p-6 md:p-8 flex flex-col gap-4 justify-center lg:flex-1"
                        variants={scrollReveal}
                    >
                        <p className="font-sans text-base md:text-lg text-[#e0f2cc] leading-normal">
                            Commercial office buildings no longer compete on location and square footage alone.
                        </p>
                        <div className="flex flex-col gap-4">
                            {advantages.map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="bg-[#a6ff48] rounded-full w-[10px] h-[10px] shrink-0 mt-1.5" />
                                    <div>
                                        <h4 className="font-sans font-bold text-base text-[#a6ff48]">
                                            {item.title}
                                        </h4>
                                        <p className="font-sans text-sm text-[#bce8e7] leading-normal">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};
