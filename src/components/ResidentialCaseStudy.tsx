'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ResidentialCaseStudy: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    const images = [
        {
            src: "/assets/images/IMG_1064.JPG",
            alt: "American Volunteer"
        },
        {
            src: "/assets/images/IMG_1040.JPG",
            alt: "Flowers"
        },
        {
            src: "/assets/images/IMG_1221.JPG",
            alt: "Yellow Door"
        }
    ];

    // Minimum swipe distance (in pixels)
    const minSwipeDistance = 50;

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            goToNext();
        }
        if (isRightSwipe) {
            goToPrevious();
        }
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    // Auto-play functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section className="py-8 md:py-16 bg-[#F5FAF5]">
            {/* Hero Images Carousel */}
            <div className="container mx-auto px-4 md:px-8 max-w-6xl mb-16">
                <div className="px-2 md:px-4 relative">
                    {/* Carousel Container */}
                    <div
                        ref={carouselRef}
                        className="relative overflow-hidden rounded-lg"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* Images Container */}
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className="min-w-full relative h-64 md:h-80 lg:h-96"
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover"
                                        priority={index === 0}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            onClick={goToPrevious}
                            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#053d3d] p-2 rounded-full shadow-lg transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-[#a6ff48]"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#053d3d] p-2 rounded-full shadow-lg transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-[#a6ff48]"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-4">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`transition-all duration-300 rounded-full ${index === currentIndex
                                    ? 'bg-[#053d3d] w-8 h-2'
                                    : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                <div className="px-2 md:px-4 grid md:grid-cols-2 gap-12 mb-16">
                    {/* Left Column */}
                    <div>
                        <div className="border-b border-gray-300 mb-6 text-center md:text-left">
                            <span className="inline-block bg-[#a6ff48] text-[#053d3d] font-bold text-2xl md:text-xl">
                                Case Study
                            </span>
                            <br className="md:hidden" />
                            <span className="md:inline text-[#053d3d] font-bold text-2xl md:text-xl"> 320-Unit Urban Mid-Rise</span>
                            <p className="text-[#053d3d] text-lg mb-4">
                                &ldquo;From Transient to Connected&rdquo;
                            </p>
                        </div>

                        <div className="border-gray-300 pb-2 mb-2 text-center md:text-left">
                            <span className="inline-block text-[#053d3d] font-bold text-2xl md:text-xl">Property</span>
                            <p className="text-[#053d3d] text-base">320-unit mid-rise, high percentage of young professionals</p>
                        </div>

                        <div className="pb-2 mb-2 text-center md:text-left">
                            <span className="inline-block text-[#053d3d] font-bold text-2xl md:text-xl">Location</span>
                            <p className="text-[#053d3d] text-base">Nashville, TN</p>
                        </div>

                        <div className="pb-2 mb-2 text-center md:text-left">
                            <span className="inline-block text-[#053d3d] font-bold text-2xl md:text-xl">Challenge</span>
                            <p className="text-[#053d3d] text-base">
                                Medium turnover in 12–18 months, and reviews stuck around 3.4 stars. Overall no sense of tenant community and brand loyalty.
                            </p>
                        </div>
                    </div>

                    {/* Vertical Divider */}
                    <div className="relative">
                        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-gray-300 -ml-6"></div>

                        {/* Right Column */}
                        <div className="border-b border-gray-300 mb-6 text-center md:text-left">
                            <span className="text-[#053d3d] font-bold text-2xl md:text-xl">What we implemented</span>
                            <p className="text-[#053d3d] text-lg mb-4">
                                (6-month program)
                            </p>
                        </div>

                        <div>
                            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-6 items-center">
                                <span className="text-4xl text-[#053d3d] leading-tight text-center align-top">01</span>
                                <p className="text-[#053d3d] text-base pt-1">
                                    Two community events per month (one wellness-focused, one social)
                                </p>

                                <span className="text-4xl text-[#053d3d] leading-tight text-center align-top">02</span>
                                <p className="text-[#053d3d] text-base pt-1">
                                    Monthly welcome events for new residents and in-person social mixers
                                </p>

                                <span className="text-4xl text-[#053d3d] leading-tight text-center align-top">03</span>
                                <p className="text-[#053d3d] text-base pt-1">
                                    Communications plan across email, text, and lobby screens
                                </p>

                                <span className="text-4xl text-[#053d3d] leading-tight text-center align-top">04</span>
                                <p className="text-[#053d3d] text-base pt-1">
                                    Feedback loop with short resident surveys and comment boards
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div>
                    <h3 className="px-2 md:px-4 text-[#053d3d] font-bold text-2xl md:text-3xl mb-12 text-center">
                        Results after 6 months
                    </h3>

                    <div className="px-2 md:px-4 grid md:grid-cols-3 gap-8 mb-8">
                        <div className="text-center border-b border-gray-300 pb-8 md:border-0 md:pb-0">
                            <div>
                                <p className="text-[#053d3d] text-base mb-2">Increase in resident <br /> satisfaction scores by</p>
                                <div className="text-5xl md:text-6xl font-bold text-[#053d3d] mb-2">~12</div>
                                <p className="text-base">points<br />(internal survey)</p>
                            </div>
                        </div>

                        <div className="text-center border-b border-gray-300 pb-8 md:border-0 md:pb-0">
                            <div>
                                <p className="text-[#053d3d] text-base mb-2">Increase in renewal rate <br /> for expiring leases by </p>
                                <div className="text-5xl md:text-6xl font-bold text-[#053d3d] mb-2">8%</div>
                                <p className="text-base">in the last quarter<br />of the program</p>
                            </div>
                        </div>

                        <div className="text-center">
                            <div>
                                <p className="text-[#053d3d] text-base mb-2">Average online rating<br />improved to</p>
                                <div className="text-5xl md:text-6xl font-bold text-[#053d3d] mb-2">4.2 / 5</div>
                                <p className="text-base">from 3.4 across major<br />review platforms</p>
                            </div>
                        </div>
                    </div>

                    <p className="text-[#053d3d] text-base text-center leading-relaxed max-w-4xl mx-auto">
                        More residents reported <span className="font-bold">&ldquo;I know at least 3 neighbors by name&rdquo;</span> and <span className="font-bold">&ldquo;I feel a sense of community here&rdquo;</span> on follow-up surveys.
                        This is the kind of community and retention shift we aim to achieve with a focused, manageable program.
                    </p>
                </div>
            </div>
        </section>
    );
};
