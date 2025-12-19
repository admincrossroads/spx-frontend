"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import SPXLoader from "@/components/ui/loader"; // <-- your loader

import Hero from "@/components/home/Hero";
import Snapshot from "@/components/home/Snapshot";
import Approach from "@/components/home/Approach";
import FocusAreas from "@/components/home/FocusAreas";
import FlagshipBloom from "@/components/home/FlagshipBloom";
import InnovationHub from "@/components/home/InnovationHub";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import InsightsPreview from "@/components/home/InsightsPreview";
import Partners from "@/components/home/Partners";
import CTASection from "@/components/home/CTASection";
import GlobalBackground from "@/components/background/GlobalBackground";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999]"
          >
            <SPXLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex flex-col gap-20 md:gap-28"
        >
          <GlobalBackground />

          <Hero />
          <Snapshot />
          <Approach />
          <FocusAreas />
          <FlagshipBloom />
          <InnovationHub />
          <ProjectsPreview />
          <InsightsPreview />
          <Partners />
          <CTASection />
        </motion.main>
      )}
    </>
  );
}
