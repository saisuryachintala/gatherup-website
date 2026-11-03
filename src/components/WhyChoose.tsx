'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { scrollReveal, imageLoad, staggerContainer, flipCardTransition, flipCardContainerStyle, flipCardBackfaceStyle, flipCardPerspectiveStyle } from '@/utils/animations';

export const WhyChoose: React.FC = () => {
    const features = [
        {
            icon: "/assets/icons/New Icon Set/Tailored Solutions.svg",
            iconSize: "w-12 h-12",
            title: "Tailored Solutions",
            description: "GatherUp builds connection-centered programs designed for your property's tenants, culture, and goals. Every activation is shaped around the people who live or work in your building."
        },
        {
            icon: "/assets/icons/New Icon Set/Efficiency.svg",
            iconSize: "w-14 h-14",
            title: "Efficiency",
            description: "We streamline everything so your onsite and leasing teams save time while your property sees meaningful results. From concept to execution, we run the full program, scheduling, communication, staffing, and measurement so you can stay focused on operating the building while still delivering a standout tenant experience."
        },
        {
            icon: "/assets/icons/New Icon Set/True Partnership.svg",
            iconSize: "w-18 h-18",
            title: "True Partnership",
            description: "Think of us as an extension of your property team. We support your leasing, marketing, and management teams with consistent programming that builds a vibrant tenant community and supports retention. Our goal is long-term success: stronger relationships, higher satisfaction, and better property performance."
        },
        {
            icon: "/assets/icons/New Icon Set/Clear Communication.svg",
            iconSize: "w-12 h-12",
            title: "Clear Communication",
            description: "You'll always know how programs are performing and the positive impact they're having on your tenants and your property's goals. We keep you updated every step of the way with simple reporting that shows engagement, outcomes, and how the experience is influencing satisfaction and renewals."
        }
    ];

    const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
    const headerInView = useInView(headerRef, { once: true, amount: 0.1 });

    const handleCardFlip = (index: number) => {
        if (!flippedCards.has(index)) {
            setFlippedCards((prev) => new Set(prev).add(index));
        }
    };

    return (
        <section className="bg-[#053d3d] py-10">
            <div className="container mx-auto max-w-7xl px-4 md:px-8">
                {/* Header */}
                <motion.div
                    ref={headerRef}
                    className="text-center mb-16 max-w-3xl mx-auto"
                    variants={scrollReveal}
                    initial="hidden"
                    animate={headerInView ? "visible" : "hidden"}
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-[#a6ff48] mb-6 font-display">
                        Why Choose GatherUp?
                    </h2>
                    <p className="text-white text-base md:text-lg leading-relaxed -mb-12 -mt-4">
                        At GatherUp, we are more than just a service. We are your partner in building a connected, thriving property that promotes long-term business success.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    ref={sectionRef}
                    className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 gap-8 items-stretch"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {features.map((feature, index) => {
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
                                            <div className={`relative ${feature.iconSize}`}>
                                                <Image
                                                    src={feature.icon}
                                                    alt={feature.title}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </motion.div>
                                        <h3 className="text-[#a6ff48] font-bold text-xl mb-4 font-display min-h-[62px] flex items-center justify-center">
                                            {feature.title}
                                        </h3>
                                        {/* <p className="text-white/90 text-lg leading-relaxed flex-1"> */}
                                        <p className="text-white/90 text-base leading-relaxed flex-1">
                                            {feature.description}
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
                                                <div className={`relative ${feature.iconSize}`}></div>
                                            </div>
                                            <h3 className="text-[#a6ff48] font-bold text-xl mb-4 font-display min-h-[62px] flex items-center justify-center">{feature.title}</h3>
                                            <p className="text-white/90 text-base leading-relaxed flex-1">{feature.description}</p>
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
                                                <div className={`relative ${feature.iconSize}`}>
                                                    <Image
                                                        src={feature.icon}
                                                        alt={feature.title}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            </motion.div>
                                            <h3 className="text-[#a6ff48] font-bold text-xl font-display">
                                                {feature.title}
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
                                                <div className={`relative ${feature.iconSize}`}>
                                                    <Image
                                                        src={feature.icon}
                                                        alt={feature.title}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            </motion.div>
                                            <h3 className="text-[#a6ff48] font-bold text-xl mb-4 font-display min-h-[62px] flex items-center justify-center">
                                                {feature.title}
                                            </h3>
                                            {/* <p className="text-white/90 text-lg leading-relaxed flex-1"> */}
                                            <p className="text-white/90 text-base leading-relaxed flex-1">
                                                {feature.description}
                                            </p>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};
