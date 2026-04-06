import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaInstagram } from 'react-icons/fa6';

export const Footer: React.FC = () => {
    return (
        <div className="border-t border-[#a6ff48] w-full">
            <footer className="bg-primary text-white py-12">
                <div className="container mx-auto max-w-7xl px-4 md:px-8">
                    <div className="px-2 md:px-4 grid md:grid-cols-3 gap-8 mb-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="relative w-52 h-16 md:w-72 md:h-24 lg:w-80 lg:h-28 mb-4">
                                <Image
                                    src="/assets/GatherUp-Lockups/SVG/Lockups_Full_Logo_Slogan_FullBrandColor.svg"
                                    alt="GatherUp Wellness"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <p className="text-white text-lg max-w-md mb-6 font-bold">
                                GatherUp partners with property leaders to turn tenant experiences into measurable property performance.
                            </p>
                            <p className="text-white text-lg max-w-md mb-6">
                                Through strategic amenity activation and community-led well-being programming, we help properties increase tenant satisfaction, strengthen retention, and support long-term NOI.
                            </p>

                            {/* Follow Us */}
                            <div>
                                <h4 className="font-bold text-lg mb-3 text-accent">Follow Us</h4>
                                <div className="flex gap-4">
                                    {/* <a href="#" className="text-gray-300 hover:text-[#a6ff48] transition-colors" aria-label="Facebook">
                                        <FaFacebook className="w-6 h-6" />
                                    </a>
                                    <a href="#" className="text-gray-300 hover:text-[#a6ff48] transition-colors" aria-label="Twitter">
                                        <FaXTwitter className="w-6 h-6" />
                                    </a> */}
                                    <a href="https://www.instagram.com/gatherupwellness" target="_blank" className="text-gray-300 hover:text-[#a6ff48] transition-colors" aria-label="Instagram">
                                        <FaInstagram className="w-6 h-6" />
                                    </a>
                                    <a href="https://www.linkedin.com/company/gatherupwellness/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#a6ff48] transition-colors" aria-label="LinkedIn">
                                        <FaLinkedin className="w-6 h-6" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center text-lg">
                            <ul className="space-y-2 text-white">
                                <li><Link href="/" className="hover:text-[#a6ff48] transition-colors">Home</Link></li>
                                <li>
                                    {/* <Link href="/our-commercial-solutions" className="hover:text-[#a6ff48] transition-colors"> */}
                                    Our Solutions
                                    {/* </Link> */}
                                </li>
                                <ul className="space-y-2 text-white">
                                    <li className="ml-4"><Link href="/our-commercial-solutions" className="hover:text-[#a6ff48] transition-colors">Commercial</Link></li>
                                    <li className="ml-4"><Link href="/our-residential-solutions" className="hover:text-[#a6ff48] transition-colors">Residential</Link></li>
                                </ul>
                                <li><Link href="/why-it-matters" className="hover:text-[#a6ff48] transition-colors">Why it matters</Link></li>
                                <li><Link href="/about-us" className="hover:text-[#a6ff48] transition-colors">About Us</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center font-bold text-sm text-[#a6ff48]">
                        <p>&copy; 2026 Jamin Gluck Wellness, LLC. All rights reserved.</p>
                        <p>Atlanta, GA</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
