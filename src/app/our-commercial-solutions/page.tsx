'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CommercialHero } from '@/components/CommercialHero';
import { CommercialBenefits } from '@/components/CommercialBenefits';
import { CommercialServices } from '@/components/CommercialServices';
import { CaseStudy } from '@/components/CaseStudy';
import { CTASection } from '@/components/CTASection';
import { pageLoad } from '@/utils/animations';

export default function CommercialSolutions() {
    return (
        <motion.main
            className="min-h-screen bg-white overflow-x-hidden"
            variants={pageLoad}
            initial={false}
            animate="visible"
        >
            <Header />
            <CommercialHero />
            <CommercialBenefits />
            <CommercialServices />
            <CaseStudy />
            <CTASection />
            <Footer />
        </motion.main>
    );
}
