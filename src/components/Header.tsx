'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookDemoButton } from './BookDemoButton';
import { ChevronDown, Heart } from 'lucide-react';
import { FAQ_PAGES } from '@/data/activation-menu-faq';
import { useWishlist } from '@/components/activation-menu/WishlistProvider';

export const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
    const [activationDropdownOpen, setActivationDropdownOpen] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(112); // Default to h-28 (7rem = 112px)
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const headerRef = useRef<HTMLElement>(null);
    const pathname = usePathname();
    const { savedSlugs } = useWishlist();

    const isActive = (path: string) => path === '/'
        ? pathname === '/'
        : pathname === path || pathname.startsWith(`${path}/`);
    const isSolutionsActive = () => pathname === '/our-commercial-solutions' || pathname === '/our-residential-solutions';
    const isActivationMenuActive = () => pathname.startsWith('/activation-menu');

    useEffect(() => {
        const frame = window.requestAnimationFrame(() => {
            setIsHeaderVisible(true);
            setMobileMenuOpen(false);
            setSolutionsDropdownOpen(false);
            setActivationDropdownOpen(false);
            setLastScrollY(window.scrollY);
        });

        return () => window.cancelAnimationFrame(frame);
    }, [pathname]);

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
    useEffect(() => {
        // Always show header when mobile menu is open
        if (mobileMenuOpen) {
            return;
        }

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollThreshold = 10; // Minimum scroll distance to trigger hide/show

            // Always show header at the top of the page
            if (currentScrollY < scrollThreshold) {
                setIsHeaderVisible(true);
            } else {
                // Hide when scrolling down, show when scrolling up
                if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
                    // Scrolling down
                    setIsHeaderVisible(false);
                } else if (currentScrollY < lastScrollY) {
                    // Scrolling up
                    setIsHeaderVisible(true);
                }
            }

            setLastScrollY(currentScrollY);
        };

        // Throttle scroll events for better performance
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
    }, [lastScrollY, mobileMenuOpen]);

    return (
        <>
            <header
                ref={headerRef}
                className="fixed top-0 left-0 right-0 z-50 bg-[#053d3d] shadow-md transition-transform duration-300 ease-in-out h-28"
                style={{
                    transform: isHeaderVisible || mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
                }}
            >
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center gap-2 lg:gap-4">
                    <div className="w-full md:w-[65%] flex items-center justify-between gap-4 lg:gap-6 h-full">
                        {/* Logo */}
                        <Link href="/" className="relative w-20 h-20 sm:w-20 sm:h-20 md:w-20 md:h-20 lg:w-20 lg:h-20 flex-shrink-0">
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
                        <nav className="hidden md:flex items-center gap-6 flex-1 justify-left">
                            {/* Home Link */}
                            <Link
                                href="/"
                                className={`transition-all duration-500 ease-in-out ${isActive('/')
                                    ? 'text-[#a6ff48] font-bold'
                                    : 'text-white hover:text-[#a6ff48] font-normal'
                                    }`}
                                style={{
                                    fontSize: '1.05rem',
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
                                    type="button"
                                    aria-expanded={solutionsDropdownOpen}
                                    aria-controls="solutions-dropdown"
                                    className={`transition-all duration-500 ease-in-out ${isSolutionsActive()
                                        ? 'text-[#a6ff48] font-bold'
                                        : 'text-white hover:text-[#a6ff48] font-normal'
                                        }`}
                                    style={{
                                        fontSize: '1.05rem',
                                        transition: 'color 0.5s ease-in-out, font-size 0.5s ease-in-out, font-weight 0.5s ease-in-out, filter 0.5s ease-in-out'
                                    }}
                                    onClick={() => setSolutionsDropdownOpen(true)}
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
                                    <div id="solutions-dropdown" className="absolute top-full left-0 pt-2 w-48 z-50">
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
                            <div className="relative">
                                <button
                                    type="button"
                                    aria-expanded={activationDropdownOpen}
                                    aria-controls="activation-menu-dropdown"
                                    className={`transition-all duration-500 ease-in-out ${isActivationMenuActive()
                                        ? 'text-[#a6ff48] font-bold'
                                        : 'text-white hover:text-[#a6ff48] font-normal'
                                        }`}
                                    style={{
                                        fontSize: '1.05rem',
                                        transition: 'color 0.5s ease-in-out, font-size 0.5s ease-in-out, font-weight 0.5s ease-in-out, filter 0.5s ease-in-out'
                                    }}
                                    onClick={() => setActivationDropdownOpen((open) => !open)}
                                >
                                    Activation Menu
                                    <ChevronDown
                                        aria-hidden="true"
                                        className={`ml-1 inline-block h-4 w-4 transition-transform duration-300 ${activationDropdownOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {activationDropdownOpen && (
                                    <div
                                        id="activation-menu-dropdown"
                                        className="absolute left-0 top-full z-50 w-72 pt-2"
                                    >
                                        <div className="rounded-lg border border-[#a6ff48]/30 bg-[#053d3d] py-2 shadow-lg">
                                            <Link
                                                href="/activation-menu"
                                                className="block px-4 py-3 text-white transition-colors hover:bg-[#3d6e6e]/20 hover:text-[#a6ff48]"
                                                onClick={() => setActivationDropdownOpen(false)}
                                            >
                                                Explore Activations
                                            </Link>
                                            <Link
                                                href="/activation-menu/wishlist"
                                                aria-current={pathname === '/activation-menu/wishlist' ? 'page' : undefined}
                                                className="flex items-center gap-2 px-4 py-3 text-white transition-colors hover:bg-[#3d6e6e]/20 hover:text-[#a6ff48]"
                                                onClick={() => setActivationDropdownOpen(false)}
                                            >
                                                <Heart aria-hidden="true" size={17} />
                                                Wishlist ({savedSlugs.length})
                                            </Link>
                                            {/* <div className="border-t border-[#a6ff48]/30 px-4 pb-1 pt-3 text-xs font-semibold uppercase tracking-widest text-white/70">
                                                FAQ
                                            </div>
                                            {FAQ_PAGES.map((page) => (
                                                <Link
                                                    href={`/activation-menu/faq/${page.slug}`}
                                                    aria-current={pathname === `/activation-menu/faq/${page.slug}` ? 'page' : undefined}
                                                    className="block px-4 py-2 text-sm text-white transition-colors hover:bg-[#3d6e6e]/20 hover:text-[#a6ff48]"
                                                    key={page.slug}
                                                    onClick={() => setActivationDropdownOpen(false)}
                                                >
                                                    {page.title}
                                                </Link>
                                            ))} */}
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
                                    fontSize: '1.05rem',
                                    transition: 'color 1s ease-in-out, font-size 1s ease-in-out, font-weight 1s ease-in-out, filter 1s ease-in-out'
                                }}
                            >
                                Why it Matters
                            </Link>
                            <Link
                                href="/about-us"
                                className={`transition-all duration-500 ease-in-out ${isActive('/about-us')
                                    ? 'text-[#a6ff48] font-bold'
                                    : 'text-white hover:text-[#a6ff48] font-normal'
                                    }`}
                                style={{
                                    fontSize: '1.05rem',
                                    transition: 'color 0.5s ease-in-out, font-size 0.5s ease-in-out, font-weight 0.5s ease-in-out, filter 0.5s ease-in-out'
                                }}
                            >
                                About Us
                            </Link>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-white ml-auto min-h-11 min-w-11 inline-flex items-center justify-center"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-navigation"
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
                    <div className="hidden md:flex pr-4 lg:pr-8">
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
                    <nav id="mobile-navigation" className="md:hidden bg-[#053d3d] border-t border-[#a6ff48]/30 fixed left-0 right-0 z-50 max-h-[calc(100vh-7rem)] overflow-y-auto"
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
                                    type="button"
                                    aria-expanded={solutionsDropdownOpen}
                                    aria-controls="mobile-solutions-dropdown"
                                    className={`w-full min-h-11 text-left py-2 flex items-center justify-between ${isSolutionsActive()
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
                                    <div id="mobile-solutions-dropdown" className="ml-4 mt-2 flex flex-col gap-2">
                                        <Link
                                            href="/our-commercial-solutions"
                                            className={`min-h-11 inline-flex items-center py-2 ${isActive('/our-commercial-solutions')
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
                                            className={`min-h-11 inline-flex items-center py-2 ${isActive('/our-residential-solutions')
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
                            <div>
                                <button
                                    type="button"
                                    className={`w-full min-h-11 py-2 text-left flex items-center justify-between ${isActivationMenuActive()
                                        ? 'text-[#a6ff48]'
                                        : 'text-white hover:text-[#a6ff48] font-normal'
                                        }`}
                                    style={{
                                        fontSize: '1.125rem',
                                        fontWeight: isActivationMenuActive() ? '600' : '400',
                                        transition: 'color 0.5s ease-in-out, font-weight 0.5s ease-in-out, filter 0.5s ease-in-out'
                                    }}
                                    aria-expanded={activationDropdownOpen}
                                    aria-controls="mobile-activation-menu-dropdown"
                                    onClick={() => setActivationDropdownOpen((open) => !open)}
                                >
                                    Activation Menu
                                    <ChevronDown
                                        aria-hidden="true"
                                        className={`h-4 w-4 transition-transform duration-300 ${activationDropdownOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {activationDropdownOpen && (
                                    <div id="mobile-activation-menu-dropdown" className="ml-4 mt-2 flex flex-col gap-1">
                                        <Link
                                            href="/activation-menu"
                                            className={`min-h-11 inline-flex items-center py-2 ${pathname === '/activation-menu' ? 'text-[#a6ff48]' : 'text-white hover:text-[#a6ff48]'}`}
                                            onClick={() => {
                                                setMobileMenuOpen(false);
                                                setActivationDropdownOpen(false);
                                            }}
                                        >
                                            Explore Activations
                                        </Link>
                                        <Link
                                            href="/activation-menu/wishlist"
                                            className={`min-h-11 inline-flex items-center py-2 ${pathname === '/activation-menu/wishlist' ? 'text-[#a6ff48]' : 'text-white hover:text-[#a6ff48]'}`}
                                            onClick={() => {
                                                setMobileMenuOpen(false);
                                                setActivationDropdownOpen(false);
                                            }}
                                        >
                                            Wishlist ({savedSlugs.length})
                                        </Link>
                                        <span className="pt-2 text-xs font-semibold uppercase tracking-widest text-white/70">
                                            FAQ
                                        </span>
                                        {FAQ_PAGES.map((page) => (
                                            <Link
                                                href={`/activation-menu/faq/${page.slug}`}
                                                className={`min-h-11 inline-flex items-center py-2 ${pathname === `/activation-menu/faq/${page.slug}` ? 'text-[#a6ff48]' : 'text-white hover:text-[#a6ff48]'}`}
                                                key={page.slug}
                                                onClick={() => {
                                                    setMobileMenuOpen(false);
                                                    setActivationDropdownOpen(false);
                                                }}
                                            >
                                                {page.title}
                                            </Link>
                                        ))}
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
                                    fontSize: isActive('/why-it-matters') ? '1.125rem' : '1.125rem',
                                    fontWeight: isActive('/why-it-matters') ? '600' : '400',
                                    transition: 'color 0.5s ease-in-out, font-weight 0.5s ease-in-out, filter 0.5s ease-in-out'
                                }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Why it Matters
                            </Link>
                            <Link
                                href="/about-us"
                                className={`py-2 ${isActive('/about-us')
                                    ? 'text-[#a6ff48] '
                                    : 'text-white hover:text-[#a6ff48] font-normal'
                                    }`}
                                style={{
                                    fontSize: isActive('/about-us') ? '1.125rem' : '1.125rem',
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
