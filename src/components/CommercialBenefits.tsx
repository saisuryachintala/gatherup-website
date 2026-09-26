'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { scrollReveal, staggerContainer } from '@/utils/animations';

export const CommercialBenefits: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section className="bg-[#053d3d] text-white">
            <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                <motion.div
                    ref={sectionRef}
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* Key Benefits Grid with Icons */}
                    <motion.p
                        variants={scrollReveal}
                        className="text-lg md:text-xl text-center leading-relaxed max-w-4xl mx-auto text-white pt-10 pb-10"
                    >
                        GatherUp partners with owners, asset managers, and
                        property teams to design wellness-driven tenant experiences that support:
                    </motion.p>
                    <motion.div
                        className="px-2 md:px-4 grid md:grid-cols-3 gap-8 md:gap-12"
                        variants={staggerContainer}
                    >

                        {/* Leasing & renewals */}
                        <motion.div
                            variants={scrollReveal}
                            className="text-center"
                        >
                            <div className="flex justify-center mb-6">
                                <span className="text-[#a6ff48] -mb-6" style={{ fontFamily: 'Lato', fontWeight: 300, fontSize: '60px' }}>01</span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-3 text-[#a6ff48]">Leasing & Renewals</h3>
                            <p className="text-base md:text-lg leading-relaxed">
                                A more engaging workplace helps your tenants attract and retain tenants, which makes it easier for you to retain occupancy.
                            </p>
                        </motion.div>

                        {/* Tenant satisfaction */}
                        <motion.div
                            variants={scrollReveal}
                            className="text-center"
                        >
                            <div className="flex justify-center mb-6">
                                <span className="text-[#a6ff48] -mb-6" style={{ fontFamily: 'Lato', fontWeight: 300, fontSize: '60px' }}>02</span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-3 text-[#a6ff48]">Tenant Satisfaction</h3>
                            <p className="text-base md:text-lg leading-relaxed">
                                A consistent, well-branded plan gives your building a clear identity and keeps you top of mind when leases are up for renewal.
                            </p>
                        </motion.div>

                        {/* Amenity ROI */}
                        <motion.div
                            variants={scrollReveal}
                            className="text-center"
                        >
                            <div className="flex justify-center mb-6">
                                <span className="text-[#a6ff48] -mb-6" style={{ fontFamily: 'Lato', fontWeight: 300, fontSize: '60px' }}>03</span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-3 text-[#a6ff48]">Amenity ROI</h3>
                            <p className="text-base md:text-lg leading-relaxed">
                                We help you move from &ldquo;nice gym and empty lounge&rdquo; to activated spaces with regular programming, community moments, and measurable engagement.
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

