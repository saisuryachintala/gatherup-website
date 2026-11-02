'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { scrollReveal, imageLoad, staggerContainer } from '@/utils/animations';

export const WhoWeServe: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
    const propertyTypes = [
        {
            name: "Residential\nCommunities",
            icon: "/assets/icons/New Icon Set/Residential Communities.svg"
        },
        {
            name: "Commercial\nOffice Properties",
            icon: "/assets/icons/New Icon Set/Commercial Office Properties.svg"
        },
        {
            name: "Flexible\nWorkspaces",
            icon: "/assets/icons/New Icon Set/Flexible Workspaces.svg"
        },
        {
            name: "Mixed-Use\nDevelopments",
            icon: "/assets/icons/New Icon Set/Mixed-Use Developments.svg"
        }
    ];

    return (
        <section className="px-2 md:px-2 py-12 md:pb-16 lg:pb-20 bg-[#053D3D] text-[#A6FF48]">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={sectionRef}
                    className="max-w-6xl mx-auto"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.h2
                        variants={scrollReveal}
                        className="text-3xl md:text-4xl font-bold text-center mb-8 font-display"
                    >
                        Who We Serve
                    </motion.h2>
                    <motion.p
                        variants={scrollReveal}
                        className="text-center text-lg mb-4 text-[#F5FAF5]"
                    >
                        GatherUp partners with <span className="font-bold">property leaders</span> committed to building engaged, more connected communities.
                    </motion.p>
                    {/* Line separator - matches text width, responsive */}
                    <motion.div
                        variants={scrollReveal}
                        className="flex justify-center mb-4"
                    >
                        <div className="h-px bg-white/30" style={{ width: 'min(80vw, 100ch)' }}></div>
                    </motion.div>
                    <motion.p
                        variants={scrollReveal}
                        className="text-center text-lg mb-4 text-[#F5FAF5]"
                    >
                        Our wellness-driven programs are designed specifically for:
                    </motion.p>

                    {/* Property Types Grid */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                        variants={staggerContainer}
                    >
                        {propertyTypes.map((property, index) => (
                            <motion.div
                                key={index}
                                variants={scrollReveal}
                                className="backdrop-blur-sm text-center transition-colors flex flex-col items-center justify-center"
                            >
                                <motion.div
                                    className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 mb-2 md:mb-3"
                                    variants={imageLoad}
                                >
                                    <Image
                                        src={property.icon}
                                        alt={property.name.replace('\n', ' ')}
                                        fill
                                        className="object-contain text-[#A6FF48]"
                                        sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, 56px"
                                    />
                                </motion.div>
                                <p className="font-bold whitespace-pre-line text-md md:text-xl leading-tight">
                                    {property.name}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.p
                        variants={scrollReveal}
                        className="text-center text-lg max-w-5xl mx-auto text-[#F5FAF5]"
                    >
                        We partner with properties that value the tenant experience: <span className="font-bold">community, connection, and well-being</span>,
                        helping them foster engagement and drive measurable results.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};
