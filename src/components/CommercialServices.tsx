'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { scrollReveal, imageLoad, staggerContainer, flipCardTransition, flipCardContainerStyle, flipCardBackfaceStyle, flipCardPerspectiveStyle } from '@/utils/animations';

export const CommercialServices: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
    const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

    const handleCardFlip = (index: number) => {
        if (!flippedCards.has(index)) {
            setFlippedCards((prev) => new Set(prev).add(index));
        }
    };

    const servicesIcons = [
        {
            title: "Amenity Activation & Calendars",
            description: "Weekly or monthly wellness and community touchpoints in spaces you already have.",
            iconSrc: "/assets/icons/New Icon Set/Amenity Activation & Calendars.svg",
            iconAlt: "Heart",
            iconSize: "w-20 h-20 mb-4"
        },
        {
            title: "Workplace Wellbeing Sessions",
            description: "Short, practical sessions that support focus, mental health, and energy for tenant teams.",
            iconSrc: "/assets/icons/New Icon Set/Workplace Wellbeing Sessions.svg",
            iconAlt: "Lotus",
            iconSize: "w-20 h-20 mb-4"
        },
        {
            title: "Strategy & Measurement",
            description: "Simple frameworks for communications, feedback, and a set of KPIs tied back to retention and NOI.",
            iconSrc: "/assets/icons/New Icon Set/Strategy & Measurement.svg",
            iconAlt: "Flowers",
            iconSize: "w-20 h-20 mb-4"
        }
    ];

    return (
        <section className="py-16 md:py-20 bg-[#053d3d]">
            <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                <motion.div
                    ref={sectionRef}
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.p
                        variants={scrollReveal}
                        className="text-lg md:text-xl text-white mb-12 leading-relaxed text-center max-w-5xl mx-auto"
                    >
                        You bring the building and the tenants. We bring a wellness and community engine that makes the most of what you&apos;ve already built.
                    </motion.p>

                    {/* Feature Cards */}
                    <motion.div
                        className="px-2 md:px-4 grid md:grid-cols-3 lg:grid-cols-3 md:gap-4 gap-8 max-w-6xl mx-auto items-stretch"
                        variants={staggerContainer}
                    >
                        {servicesIcons.map((item, index) => {
                            const isFlipped = flippedCards.has(index);

                            return (
                                <motion.div
                                    key={index}
                                    variants={scrollReveal}
                                    className="relative h-full"
                                >
                                    {/* Mobile/Tablet: Simple card without flip - icon, title, and description */}
                                    <div className="lg:hidden h-full">
                                        <div className="bg-[#3d6e6e]/30 border border-[#a6ff48]/30 rounded-2xl p-8 flex flex-col items-center text-center h-full overflow-hidden">
                                            <motion.div
                                                className="flex items-center justify-center h-20"
                                                variants={imageLoad}
                                                initial="hidden"
                                                animate={isInView ? "visible" : "hidden"}
                                            >
                                                <div className={`relative ${item.iconSize}`}>
                                                    <Image
                                                        src={item.iconSrc}
                                                        alt={item.iconAlt}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            </motion.div>
                                            <h3 className="text-[#a6ff48] font-bold text-xl mb-4 font-display min-h-[62px] flex items-center justify-center">
                                                {item.title}
                                            </h3>
                                            <p className="text-white/90 text-base leading-relaxed flex-1">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Desktop: Flip card with transition */}
                                    <div
                                        className="hidden lg:block relative cursor-pointer h-full"
                                        style={flipCardPerspectiveStyle}
                                        onClick={() => handleCardFlip(index)}
                                        onMouseEnter={() => handleCardFlip(index)}
                                    >
                                        {/* Height placeholder - matches front card content with description */}
                                        <div className="opacity-0 pointer-events-none h-full">
                                            <div className="bg-[#3d6e6e]/30 border border-[#a6ff48]/30 rounded-2xl p-8 flex flex-col items-center text-center h-full overflow-hidden">
                                                <div className="flex items-center justify-center h-20">
                                                    <div className={`relative ${item.iconSize}`}></div>
                                                </div>
                                                <h3 className="text-[#a6ff48] font-bold text-xl mb-4 font-display min-h-[62px] flex items-center justify-center">{item.title}</h3>
                                                <p className="text-white/90 text-base leading-relaxed flex-1">{item.description}</p>
                                            </div>
                                        </div>

                                        {/* Flip container */}
                                        <motion.div
                                            className="absolute inset-0 w-full h-full"
                                            initial={{ rotateY: 180 }}
                                            animate={{
                                                rotateY: isFlipped ? 0 : 180,
                                            }}
                                            transition={flipCardTransition}
                                            style={flipCardContainerStyle}
                                        >
                                            {/* Back of card (shown initially) - icon and title only, centered */}
                                            <motion.div
                                                className="absolute inset-0 w-full h-full bg-[#3d6e6e]/30 border border-[#a6ff48]/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center backface-hidden overflow-hidden"
                                                style={{
                                                    ...flipCardBackfaceStyle,
                                                    transform: 'rotateY(180deg)',
                                                }}
                                            >
                                                <motion.div
                                                    className="flex items-center justify-center h-20"
                                                    variants={imageLoad}
                                                    initial="hidden"
                                                    animate={!isFlipped ? "visible" : "hidden"}
                                                >
                                                    <div className={`relative ${item.iconSize}`}>
                                                        <Image
                                                            src={item.iconSrc}
                                                            alt={item.iconAlt}
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                </motion.div>
                                                <h3 className="text-[#a6ff48] font-bold text-xl font-display">
                                                    {item.title}
                                                </h3>
                                            </motion.div>

                                            {/* Front of card (shown after flip) - icon, title, and full description */}
                                            <motion.div
                                                className="absolute inset-0 w-full h-full bg-[#3d6e6e]/30 border border-[#a6ff48]/30 rounded-2xl p-8 flex flex-col items-center text-center backface-hidden overflow-hidden"
                                                style={flipCardBackfaceStyle}
                                            >
                                                <motion.div
                                                    className="flex items-center justify-center h-20"
                                                    variants={imageLoad}
                                                    initial="hidden"
                                                    animate={isFlipped ? "visible" : "hidden"}
                                                >
                                                    <div className={`relative ${item.iconSize}`}>
                                                        <Image
                                                            src={item.iconSrc}
                                                            alt={item.iconAlt}
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                </motion.div>
                                                <h3 className="text-[#a6ff48] font-bold text-xl mb-4 font-display min-h-[62px] flex items-center justify-center">
                                                    {item.title}
                                                </h3>
                                                <p className="text-white/90 text-base leading-relaxed flex-1">
                                                    {item.description}
                                                </p>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

