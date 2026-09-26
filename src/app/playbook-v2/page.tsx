'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PlaybookHero } from '@/components/playbook-v2/PlaybookHero';
import { WhatWeDoSection } from '@/components/playbook-v2/WhatWeDoSection';
import { BusinessAssetSection } from '@/components/playbook-v2/BusinessAssetSection';
import { ActivationFramework } from '@/components/playbook-v2/ActivationFramework';
import { DownloadSection } from '@/components/playbook-v2/DownloadSection';
import { pageLoad } from '@/utils/animations';

export default function Playbook() {
    return (
        <motion.main
            className="min-h-screen bg-[#053d3d] overflow-x-hidden"
            variants={pageLoad}
            initial="hidden"
            animate="visible"
        >
            <Header />
            <div className="h-28" />
            <PlaybookHero />
            <WhatWeDoSection />
            {/* <BusinessAssetSection /> */}
            <ActivationFramework />
            <DownloadSection />
            <Footer />
        </motion.main>
    );
}
