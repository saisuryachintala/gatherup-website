'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhyItMattersHero } from '@/components/WhyItMattersHero';
import { WellBeingImperative } from '@/components/WellBeingImperative';
import { WhatsAtStake } from '@/components/WhatsAtStake';
import { BusinessImpact } from '@/components/BusinessImpact';
import { BeyondPerks } from '@/components/BeyondPerks';
import { AtGatherUp } from '@/components/AtGatherUp';
import { CTASection } from '@/components/CTASection';
import { pageLoad } from '@/utils/animations';
import { TenantStatsOption1 } from "@/components/TenantStatsOption1";

export default function WhyItMatters() {
    return (
        <motion.main
            className="min-h-screen bg-white overflow-x-hidden"
            variants={pageLoad}
            initial="hidden"
            animate="visible"
        >
            <Header />
            <WhyItMattersHero />
            <WellBeingImperative />
            <WhatsAtStake />
            <BusinessImpact />
            <BeyondPerks />
            <AtGatherUp />
            <TenantStatsOption1 />
            {/* <BlogPreview /> */}
            <CTASection />
            <Footer />
        </motion.main>
    );
}
