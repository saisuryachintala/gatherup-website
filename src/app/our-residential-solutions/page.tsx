'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ResidentialHero } from '@/components/ResidentialHero';
import { ResidentialBenefits } from '@/components/ResidentialBenefits';
import { ResidentialServices } from '@/components/ResidentialServices';
import { ResidentialCaseStudy } from '@/components/ResidentialCaseStudy';
import { ResidentialCTASection } from '@/components/ResidentialCTASection';
import { pageLoad } from '@/utils/animations';
import { ResidentialNOI } from '@/components/ResidentialNOI';

export default function ResidentialSolutions() {
    return (
        <motion.main
            className="min-h-screen bg-white overflow-x-hidden"
            variants={pageLoad}
            initial={false}
            animate="visible"
        >
            <Header />
            <ResidentialHero />
            <ResidentialBenefits />
            <ResidentialServices />
            <ResidentialNOI />
            <ResidentialCaseStudy />
            <ResidentialCTASection />
            <Footer />
        </motion.main>
    );
}
