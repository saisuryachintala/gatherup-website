'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookDemoButton } from './BookDemoButton';
import { scrollReveal, staggerContainer } from '@/utils/animations';

interface CTASectionProps {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
    title = "Ready to turn tenant experience into a property advantage?",
    subtitle = "Let's activate your spaces and your results.",
}) => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section className="px-2 md:px-4 pt-2 pb-8 md:pt-2 md:pb-8 bg-[#f5faf5] text-center">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={sectionRef}
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.h3
                        variants={scrollReveal}
                        className="text-3xl md:text-4xl font-bold text-[#053d3d] mb-4 font-display"
                    >
                        {title}
                    </motion.h3>
                    <motion.p
                        variants={scrollReveal}
                        className="text-xl text-[#053d3d] mb-6"
                    >
                        {subtitle}
                    </motion.p>
                    <motion.div variants={scrollReveal}>
                        <BookDemoButton />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
