'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FounderBio } from '@/components/FounderBio';
import { GatherUp5DApproach } from '@/components/GatherUp5DApproach';
import { OurMission } from '@/components/OurMission';
import { pageLoad } from '@/utils/animations';

export default function AboutUs() {
    return (
        <motion.main
            className="min-h-screen bg-white overflow-x-hidden"
            variants={pageLoad}
            initial="hidden"
            animate="visible"
        >
            <Header />
            <FounderBio />
            {/* <WhoWeServe /> */}
            <OurMission />
            <GatherUp5DApproach />
            <Footer />
        </motion.main>
    );
}
