'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { scrollReveal, staggerContainer } from '@/utils/animations';

export const ResidentialBenefits: React.FC = () => {
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
                        Residents don&apos;t just renew apartments, they renew how it feels to live in your building.
                        GatherUp works with owners, REITs, and property managers to turn under-used amenities into a steady source of connection, well-being, and renewal intent:
                    </motion.p>
                    <motion.div
                        className="px-2 md:px-4 grid md:grid-cols-3 gap-8 md:gap-12"
                        variants={staggerContainer}
                    >
                        {/* Higher renewal rates */}
                        <motion.div
                            variants={scrollReveal}
                            className="text-center"
                        >
                            <div className="flex justify-center mb-6">
                                <span className="text-[#a6ff48] -mb-6" style={{ fontFamily: 'Lato', fontWeight: 300, fontSize: '60px' }}>01</span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-3 text-[#a6ff48]">Higher Renewal Rates</h3>
                            <p className="text-base md:text-lg leading-relaxed">
                                When residents have real relationships and routines in the building, they stay longer and are more willing to accept rent increases.
                            </p>
                        </motion.div>

                        {/* Better reviews & referrals */}
                        <motion.div
                            variants={scrollReveal}
                            className="text-center"
                        >
                            <div className="flex justify-center mb-6">
                                <span className="text-[#a6ff48] -mb-6" style={{ fontFamily: 'Lato', fontWeight: 300, fontSize: '60px' }}>02</span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-3 text-[#a6ff48]">Better Reviews & Referrals</h3>
                            <p className="text-base md:text-lg leading-relaxed">
                                Thoughtful wellness and community experiences show up in how residents talk about your building online and to friends.
                            </p>
                        </motion.div>

                        {/* Stronger sense of community */}
                        <motion.div
                            variants={scrollReveal}
                            className="text-center"
                        >
                            <div className="flex justify-center mb-6">
                                <span className="text-[#a6ff48] -mb-6" style={{ fontFamily: 'Lato', fontWeight: 300, fontSize: '60px' }}>03</span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-3 text-[#a6ff48]">Connected Communities</h3>
                            <p className="text-base md:text-lg leading-relaxed">
                                Regular, low-lift touchpoints make your property feel safe, connected, and cared for. This is especially important for urban, young professional, and family communities.
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
