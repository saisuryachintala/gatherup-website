'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { BookDemoButton } from './BookDemoButton';
import { scrollReveal, imageLoad, staggerContainer } from '@/utils/animations';

export const PowerOfTenant: React.FC = () => {
    const headerRef = useRef(null);
    const contentRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true, amount: 0.1 });
    const contentInView = useInView(contentRef, { once: true, amount: 0.1 });

    return (
        <section className="w-full bg-[#F5FAF5]">
            {/* Header Section */}
            <motion.div
                ref={headerRef}
                className="py-6 md:py-8 lg:py-12 text-center px-4"
                variants={scrollReveal}
                initial="hidden"
                animate={headerInView ? "visible" : "hidden"}
            >
                <h3 className="text-[#053d3d] font-bold text-lg mb-2 font-display">
                    Unleash the
                </h3>
                <h1 className="text-4xl md:text-6xl font-bold text-[#053d3d] mb-2 font-display">
                    Power of Tenant Well-Being
                </h1>
                <h3 className="text-[#053d3d] font-bold text-xl font-display">
                    for Property Growth
                </h3>
            </motion.div>

            {/* Image Section */}
            <div className="relative w-full h-[500px] md:h-[700px]">
                {/* Mobile Image */}
                <motion.div
                    className="absolute inset-0 md:hidden"
                    variants={imageLoad}
                    initial="hidden"
                    animate={contentInView ? "visible" : "hidden"}
                >
                    <Image
                        src="/assets/images/home-page-2.jpg"
                        alt="Outdoor Yoga Class"
                        fill
                        className="object-cover object-left object-bottom"
                        priority
                    />
                </motion.div>
                {/* Desktop Image */}
                <motion.div
                    className="absolute inset-0 hidden md:block"
                    variants={imageLoad}
                    initial="hidden"
                    animate={contentInView ? "visible" : "hidden"}
                >
                    <Image
                        src="/assets/images/home-page-2.jpg"
                        alt="Outdoor Yoga Class"
                        fill
                        className="object-cover object-bottom"
                        priority
                    />
                </motion.div>
                {/* Overlay for text readability */}
                {/* <div className="absolute inset-0 bg-black/20"></div> */}

                {/* Overlay Content */}
                <motion.div
                    ref={contentRef}
                    className="absolute top-auto bottom-16 md:top-24 md:bottom-auto left-0 right-0 flex justify-center md:justify-end md:pr-32 md:-translate-x-[150px]"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={contentInView ? "visible" : "hidden"}
                >
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-3 text-center md:text-left">
                        {/* Logo */}
                        <motion.div
                            variants={imageLoad}
                            className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 relative flex-shrink-0 md:-mr-8 md:-mt-6"
                        >
                            <Image
                                src="/assets/icons/Lockups_Symbol_Fresh Green Transparent Background.png"
                                alt="GatherUp Symbol"
                                fill
                                className="object-contain"
                            />
                        </motion.div>

                        {/* Text and Button Column - next to logo */}
                        <motion.div
                            variants={scrollReveal}
                            className="flex flex-col items-center md:items-start gap-3"
                        >
                            {/* Heading */}
                            <p className="text-2xl md:text-2xl lg:text-3xl font-bold text-white font-display leading-[1.05]">
                                Tenant Wellness that Works.
                            </p>

                            {/* Subtitle */}
                            <p className="text-[#a6ff48] font-bold text-base md:text-lg font-display -mt-4">
                                Belonging. Well-Being. Business Impact.
                            </p>

                            {/* Book a Demo Button - below texts, aligned with texts */}
                            <div className="flex justify-center md:justify-star mt-2">
                                <BookDemoButton />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
