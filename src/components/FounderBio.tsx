'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { scrollReveal, imageLoad, staggerContainer } from '@/utils/animations';
import { FaLinkedin, FaMedium } from 'react-icons/fa6';

export const FounderBio: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section className="pt-40 px-2 md:px-2 pb-12 md:pb-16 lg:pb-20 bg-[#053d3d]">
            <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        ref={sectionRef}
                        className="bg-[#053d3d] rounded-3xl overflow-hidden"
                        variants={staggerContainer}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <div className="grid md:grid-cols-2 gap-0 md:items-stretch">
                            {/* Founder Image */}
                            <motion.div
                                variants={scrollReveal}
                                className="relative w-full aspect-[4/5] md:aspect-auto md:h-full"
                            >
                                <motion.div
                                    className="absolute inset-0 rounded-tl-3xl rounded-tr-3xl md:rounded-tr-none md:rounded-br-none md:rounded-bl-3xl overflow-hidden"
                                    variants={imageLoad}
                                >
                                    <Image
                                        src="/assets/images/founder-hd-4.png"
                                        alt="Jamin Gluck, Founder of GatherUp"
                                        fill
                                        className="object-cover object-center md:object-[center_25%] lg:object-center"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 50vw"
                                        priority
                                    />
                                </motion.div>
                            </motion.div>

                            {/* Bio Text */}
                            <motion.div
                                variants={scrollReveal}
                                className="bg-[#255656] p-8 md:p-12 flex flex-col justify-center space-y-6 text-white"
                            >
                                <h3 className="text-3xl md:text-4xl font-bold font-display">
                                    About <span className="text-[#a6ff48]">Jamin Gluck</span>
                                </h3>

                                <div className="space-y-4 text-white text-base md:text-lg mb-4">
                                    <p>
                                        Jamin Gluck is the founder of GatherUp and a tenant experience strategist focused on helping properties create stronger communities, retain tenants longer, and protect long-term value.
                                    </p>
                                    <p>
                                        Before founding GatherUp, Jamin spent over a decade at Amazon and MongoDB leading large-scale initiatives in fast-moving, performance-driven environments. He saw firsthand what happens when experience is treated as secondary: disengagement, burnout, weak connection, and constant turnover.
                                    </p>
                                    <p>
                                        The lesson was clear. Performance suffers when people don&apos;t feel connected to the places they spend their time.
                                    </p>
                                    <p>
                                        That insight led Jamin to shift from traditional growth roles into community and well-being strategy. He became a certified coach, facilitator, and experience designer, then founded GatherUp to help property owners and operators create environments that actually support satisfaction, retention, and loyalty.
                                    </p>
                                    <p>
                                        Today, Jamin works with property leaders who understand that tenant well-being isn&apos;t a &ldquo;nice-to-have.&rdquo; It&apos;s a practical lever for renewals, occupancy, reputation, and NOI.
                                    </p>
                                    <p className="font-medium text-[#a6ff48]">
                                        GatherUp designs and delivers on-site experiences that activate amenities, strengthen community, and turn buildings into places people want to stay.
                                        Because when tenants feel connected to their building and to each other, retention improves, renewals follow, and performance becomes easier to sustain.
                                    </p>
                                </div>

                                {/* Social Media Icons */}
                                <div className="flex gap-4">
                                    {/* <a href="https://www.facebook.com/benjamin.gluck" target="_blank" className="text-gray-300 hover:text-[#a6ff48] transition-colors" aria-label="Facebook">
                                        <FaFacebook className="w-6 h-6" />
                                    </a>
                                    <a href="https://x.com/thejamingluck" target="_blank" className="text-gray-300 hover:text-[#a6ff48] transition-colors" aria-label="Twitter">
                                        <FaXTwitter className="w-6 h-6" />
                                    </a>
                                    <a href="https://www.instagram.com/jamingluck" target="_blank" className="text-gray-300 hover:text-[#a6ff48] transition-colors" aria-label="Instagram">
                                        <FaInstagram className="w-6 h-6" />
                                    </a> */}
                                    <a href="https://www.linkedin.com/in/jamin-gluck" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#a6ff48] transition-colors" aria-label="LinkedIn">
                                        <FaLinkedin className="w-6 h-6" />
                                    </a>
                                    <a href="https://medium.com/@jamin_65314" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#a6ff48] transition-colors" aria-label="Medium">
                                        <FaMedium className="w-6 h-6" />
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
