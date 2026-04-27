'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookDemoButton } from './BookDemoButton';

export const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(112); // Default to h-28 (7rem = 112px)
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const lastScrollYRef = useRef(0);
    const headerRef = useRef<HTMLElement>(null);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;
    const isSolutionsActive = () => pathname === '/our-commercial-solutions' || pathname === '/our-residential-solutions';

    // Measure header height dynamically
    useEffect(() => {
        const updateHeaderHeight = () => {
            if (headerRef.current) {
                setHeaderHeight(headerRef.current.offsetHeight);
            }
        };

        // Initial measurement
        updateHeaderHeight();

        // Update on window resize
        window.addEventListener('resize', updateHeaderHeight);
        return () => window.removeEventListener('resize', updateHeaderHeight);
    }, []);

    // Prevent body scrolling when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            // Save the current scroll position
            const scrollY = window.scrollY;
            // Apply styles to prevent scrolling
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';

            return () => {
                // Restore scrolling when menu closes
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflow = '';
                // Restore scroll position
                window.scrollTo(0, scrollY);
            };
        }
    }, [mobileMenuOpen]);

    // Floating header scroll detection
    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        const scrollThreshold = 10;

        if (currentScrollY < scrollThreshold) {
            setIsHeaderVisible(true);
        } else if (currentScrollY > lastScrollYRef.current && currentScrollY > scrollThreshold) {
            setIsHeaderVisible(false);
        } else if (currentScrollY < lastScrollYRef.current) {
            setIsHeaderVisible(true);
        }

        lastScrollYRef.current = currentScrollY;
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) return;

        let ticking = false;
        const throttledHandleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', throttledHandleScroll, { passive: true });
        return () => window.removeEventListener('scroll', throttledHandleScroll);
    }, [mobileMenuOpen, handleScroll]);

    return (
        <>
            <header
                ref={headerRef}
                className="fixed top-0 left-0 right-0 z-50 bg-[#053d3d] shadow-md transition-transform duration-300 ease-in-out h-28"
                style={{
                    transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)',
                }}
            >
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
                    <div className="w-full md:w-auto flex items-center justify-between gap-3 lg:gap-6 h-full">
                        {/* Logo */}
                        <Link href="/" className="relative w-20 h-20 md:w-16 md:h-16 lg:w-20 lg:h-20 flex-shrink-0">
                            <Image
                                src="/assets/GatherUp-Lockups/PNG/Lockups_Symbol_Fresh_Green_Transparent_Background_v2.png"
                                alt="GatherUp Wellness"
                                fill
                                sizes="80px"
                                className="object-contain"
                                priority
                            />
                        </Link>

                        {/* Navigation Links */}
                        <nav className="hidden md:flex items-center gap-4 lg:gap-5 xl:gap-6 whitespace-nowrap text-[0.85rem] lg:text-[1rem] xl:text-[1.05rem]">
                            {/* Home Link */}
                            <Link
                                href="/"
                                className={`transition-all duration-500 ease-in-out ${isActive('/')
                                    ? 'text-[#a6ff48] font-bold'
                                    : 'text-white hover:text-[#a6ff48] font-normal'
                                    }`}
                                style={{
                                    transition: 'color 0.5s ease-in-out, font-size 0.5s ease-in-out, font-weight 0.5s ease-in-out, filter 0.5s ease-in-out'
                                }}
                            >
                                Home
                            </Link>
                            {/* Our Solutions Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => setSolutionsDropdownOpen(true)}
                                onMouseLeave={() => setSolutionsDropdownOpen(false)}
                            >
                                <button
                                    className={`transition-all duration-500 ease-in-out ${isSolutionsActive()
                                        ? 'text-[#a6ff48] font-bold'
                                        : 'text-white hover:text-[#a6ff48] font-normal'
                                        }`}
                                    style={{
                                        transition: 'color 0.5s ease-in-out, font-size 0.5s ease-in-out, font-weight 0.5s ease-in-out, filter 0.5s ease-in-out'
                                    }}
                                >
                                    Our Solutions
                                    <svg
                                        className={`inline-block ml-1 w-4 h-4 transition-transform duration-300 ${solutionsDropdownOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {solutionsDropdownOpen && (
                                    <div className="absolute top-full left-0 pt-2 w-48 z-50">
                                        <div className="bg-[#053d3d] border border-[#a6ff48]/30 rounded-lg shadow-lg">
                                            <Link
                                                href="/our-commercial-solutions"
                                                className={`block px-4 py-3 transition-colors ${isActive('/our-commercial-solutions')
                                                    ? 'text-[#a6ff48] font-bold bg-[#3d6e6e]/30'
                                                    : 'text-white hover:text-[#a6ff48] hover:bg-[#3d6e6e]/20'
                                                    }`}
                                                onClick={() => setSolutionsDropdownOpen(false)}
                                            >
                                                Commercial
                                            </Link>
                                            <Link
                                                href="/our-residential-solutions"
                                                className={`block px-4 py-3 transition-colors rounded-b-lg ${isActive('/our-residential-solutions')
                                                    ? 'text-[#a6ff48] font-bold bg-[#3d6e6e]/30'
                                                    : 'text-white hover:text-[#a6ff48] hover:bg-[#3d6e6e]/20'
                                                    }`}
                                                onClick={() => setSolutionsDropdownOpen(false)}
                                            >
                                                Residential
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Link
                                href="/why-it-matters"
                                className={`transition-all duration-500 ease-in-out ${isActive('/why-it-matters')
                                    ? 'text-[#a6ff48] font-bold'
                                    : 'text-white hover:text-[#a6ff48] font-normal'
                                    }`}
                                style={{
                                    transition: 'color 0.5s ease-in-out, font-size 0.5s ease-in-out, font-weight 0.5s ease-in-out, filter 0.5s ease-in-out'
                                }}
                            >
                                Why it Matters
                            </Link>
                            <Link
                                href="/playbook"
                                className={`transition-all duration-500 ease-in-out ${isActive('/playbook')
                                    ? 'text-[#a6ff48] font-bold'
                                    : 'text-white hover:text-[#a6ff48] font-normal'
                                    }`}
                                style={{
                                    transition: 'color 0.5s ease-in-out, font-size 0.5s ease-in-out, font-weight 0.5s ease-in-out, filter 0.5s ease-in-out'
                                }}
                            >
                                Playbook
                            </Link>
                            <Link
                                href="/playbook-v2"
                                className={`transition-all duration-500 ease-in-out ${isActive('/playbook-v2')
                                    ? 'text-[#a6ff48] font-bold'
                                    : 'text-white hover:text-[#a6ff48] font-normal'
                                    }`}
                                style={{
                                    transition: 'color 0.5s ease-in-out, font-size 0.5s ease-in-out, font-weight 0.5s ease-in-out, filter 0.5s ease-in-out'
                                }}
                            >
                                Playbook v2
                            </Link>
                            <Link
                                href="/about-us"
                                className={`transition-all duration-500 ease-in-out ${isActive('/about-us')
                                    ? 'text-[#a6ff48] font-bold'
                                    : 'text-white hover:text-[#a6ff48] font-normal'
                                    }`}
                                style={{
                                    transition: 'color 0.5s ease-in-out, font-size 0.5s ease-in-out, font-weight 0.5s ease-in-out, filter 0.5s ease-in-out'
                                }}
                            >
                                About Us
                            </Link>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-white ml-auto"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Book a Demo Button - Outside constrained container */}
                    <div className="hidden md:flex flex-shrink-0">
                        <BookDemoButton />
                    </div>
                </div>
                <div className="border-t border-[#a6ff48] w-full" />
            </header>

            {/* Mobile Menu Overlay and Menu - Outside header to avoid transform issues */}
            {mobileMenuOpen && (
                <>
                    {/* Overlay Backdrop */}
                    <div
                        className="fixed inset-x-0 bottom-0 bg-black/70 z-40 md:hidden"
                        style={{ top: `${headerHeight}px` }}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-hidden="true"
                    />
                    {/* Mobile Menu */}
                    <nav className="md:hidden bg-[#053d3d] border-t border-[#a6ff48]/30 fixed left-0 right-0 z-50"
                        style={{ top: `${headerHeight}px` }}>
                        <div className="container mx-auto max-w-7xl px-6 py-4 flex flex-col gap-4">
                            <Link
                                href="/"
                                className={`py-2 ${isActive('/')
                                    ? 'text-[#a6ff48] '
                                    : 'text-white hover:text-[#a6ff48] font-normal'
                                    }`}
                                style={{
                                    fontSize: '1.125rem',
                                    fontWeight: isActive('/') ? '600' : '400',
                                    transition: 'color 0.5s ease-in-out, font-weight 0.5s ease-in-out, filter 0.5s ease-in-out'
                                }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <div>
                                <button
                                    className={`w-full text-left py-2 flex items-center justify-between ${isSolutionsActive()
                                        ? 'text-[#a6ff48] '
                                        : 'text-white hover:text-[#a6ff48] font-normal'
                                        }`}
                                    style={{
                                        fontSize: '1.125rem',
                                        fontWeight: isSolutionsActive() ? '600' : '400',
                                        transition: 'color 0.5s ease-in-out, font-weight 0.5s ease-in-out, filter 0.5s ease-in-out'
                                    }}
                                    onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
                                >
                                    Our Solutions
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-300 ${solutionsDropdownOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {solutionsDropdownOpen && (
                                    <div className="ml-4 mt-2 flex flex-col gap-2">
                                        <Link
                                            href="/our-commercial-solutions"
                                            className={`py-2 ${isActive('/our-commercial-solutions')
                                                ? 'text-[#a6ff48] '
                                                : 'text-white hover:text-[#a6ff48] font-normal'
                                                }`}
                                            style={{
                                                fontSize: '1rem',
                                                fontWeight: isActive('/our-commercial-solutions') ? '600' : '400',
                                                transition: 'color 0.5s ease-in-out, font-weight 0.5s ease-in-out, filter 0.5s ease-in-out'
                                            }}
                                            onClick={() => {
                                                setMobileMenuOpen(false);
                                                setSolutionsDropdownOpen(false);
                                            }}
                                        >
                                            Commercial
                                        </Link>
                                        <Link
                                            href="/our-residential-solutions"
                                            className={`py-2 ${isActive('/our-residential-solutions')
                                                ? 'text-[#a6ff48] '
                                                : 'text-white hover:text-[#a6ff48] font-normal'
                                                }`}
                                            style={{
                                                fontSize: '1rem',
                                                fontWeight: isActive('/our-residential-solutions') ? '600' : '400',
                                                transition: 'color 0.5s ease-in-out, font-weight 0.5s ease-in-out, filter 0.5s ease-in-out'
                                            }}
                                            onClick={() => {
                                                setMobileMenuOpen(false);
                                                setSolutionsDropdownOpen(false);
                                            }}
                                        >
                                            Residential
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <Link
                                href="/why-it-matters"
                                className={`py-2 ${isActive('/why-it-matters')
                                    ? 'text-[#a6ff48] '
                                    : 'text-white hover:text-[#a6ff48] font-normal'
                                    }`}
                                style={{
                                    fontSize: '1.125rem',
                                    fontWeight: isActive('/why-it-matters') ? '600' : '400',
                                    transition: 'color 0.5s ease-in-out, font-weight 0.5s ease-in-out, filter 0.5s ease-in-out'
                                }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Why it Matters
                            </Link>
                            <Link
                                href="/playbook"
                                className={`py-2 ${isActive('/playbook')
                                    ? 'text-[#a6ff48] '
                                    : 'text-white hover:text-[#a6ff48] font-normal'
                                    }`}
                                style={{
                                    fontSize: '1.125rem',
                                    fontWeight: isActive('/playbook') ? '600' : '400',
                                    transition: 'color 0.5s ease-in-out, font-weight 0.5s ease-in-out, filter 0.5s ease-in-out'
                                }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Playbook
                            </Link>
                            <Link
                                href="/playbook-v2"
                                className={`py-2 ${isActive('/playbook-v2')
                                    ? 'text-[#a6ff48] '
                                    : 'text-white hover:text-[#a6ff48] font-normal'
                                    }`}
                                style={{
                                    fontSize: '1.125rem',
                                    fontWeight: isActive('/playbook') ? '600' : '400',
                                    transition: 'color 0.5s ease-in-out, font-weight 0.5s ease-in-out, filter 0.5s ease-in-out'
                                }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Playbook v2
                            </Link>
                            <Link
                                href="/about-us"
                                className={`py-2 ${isActive('/about-us')
                                    ? 'text-[#a6ff48] '
                                    : 'text-white hover:text-[#a6ff48] font-normal'
                                    }`}
                                style={{
                                    fontSize: '1.125rem',
                                    fontWeight: isActive('/about-us') ? '600' : '400',
                                    transition: 'color 0.5s ease-in-out, font-weight 0.5s ease-in-out, filter 0.5s ease-in-out'
                                }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About Us
                            </Link>
                            <BookDemoButton
                                className="justify-center mt-2"
                                onClick={() => setMobileMenuOpen(false)}
                            />
                        </div>
                    </nav>
                </>
            )}
        </>
    );
};
