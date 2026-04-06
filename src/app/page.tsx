'use client';

import { motion } from 'framer-motion';
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WhyGatherUp } from "@/components/WhyGatherUp";
import { WhyChoose } from "@/components/WhyChoose";
import { PowerOfTenant } from "@/components/PowerOfTenant";
import { ThrivingWorkplace } from "@/components/ThrivingWorkplace";
import { Footer } from "@/components/Footer";
import { Testimonial } from "@/components/Testimonial";
import { ScrollingLogos } from "@/components/ScrollingLogos";
import { pageLoad } from "@/utils/animations";
import { WhoWeServe } from '@/components/WhoWeServe';

export default function Home() {
  return (
    <motion.main
      className="min-h-screen bg-white overflow-x-hidden"
      variants={pageLoad}
      initial="hidden"
      animate="visible"
    >
      <Header />
      <Hero />
      <WhyGatherUp />
      {/* <ImpactCalculator/> */}
      {/* <OurMission /> */}
      <WhoWeServe />
      <ScrollingLogos />
      <WhyChoose />
      <PowerOfTenant />
      <ThrivingWorkplace />
      <Testimonial />
      <Footer />
    </motion.main>
  );
}
