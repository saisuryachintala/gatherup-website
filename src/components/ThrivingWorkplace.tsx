'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { scrollReveal } from '@/utils/animations';

export const ThrivingWorkplace: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section className="w-full bg-[#F5FAF5] py-10">
            {/* Header Section */}
            <motion.div
                ref={sectionRef}
                className="bg-[#F5FAF5] text-center px-4"
                variants={scrollReveal}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <h2 className="text-[#053d3d] font-bold text-lg mb-2 font-display">
                    Let&apos;s bring your tenant experience to life, together.
                </h2>
                <p className="text-[#053d3d] text-xl font-display">
                    Foster connection, belonging, and engagement through <br /> tailored wellness programs that drive measurable property impact.
                </p>
            </motion.div>
        </section>
    );
};
