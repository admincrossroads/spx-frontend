"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Advisory() {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative h-[55vh] w-full">
        <Image
          src="/images/advisory-hero.jpg"
          alt="Strategic Advisory"
          fill
          className="object-cover brightness-[0.55]"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-semibold"
          >
            Strategic Advisory
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-4 max-w-2xl text-lg md:text-xl"
          >
            Helping institutions, governments, and organizations navigate complex
            development challenges through evidence-driven, Africa-led strategy.
          </motion.p>
        </div>
      </section>

      {/* BLOCK 1 — SYSTEMS-BASED STRATEGY */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">

        {/* TEXT */}
        <div>
          <h2 className="text-3xl font-semibold mb-6">
            Systems-Based Strategy
          </h2>
          <p className="text-muted-foreground text-justify leading-relaxed">
            SPX supports institutions in designing strategies rooted in real-world
            sector dynamics, policy frameworks, market systems, and operational realities.
            Advisory support integrates cross-sector insights from agriculture,
            clean energy, digital ecosystems, and enterprise development—ensuring
            solutions are practical, scalable, and aligned with national priorities.
          </p>
        </div>

        {/* IMAGE */}
        <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/advisory-1.jpg"
            alt="Strategy"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* BLOCK 2 — INSTITUTIONAL ADVISORY */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center bg-muted/40">

        {/* IMAGE LEFT */}
        <div className="relative h-80 rounded-xl overflow-hidden shadow-md order-2 md:order-1">
          <Image
            src="/images/advisory-2.jpg"
            alt="Institutional Advisory"
            fill
            className="object-cover"
          />
        </div>

        {/* TEXT RIGHT */}
        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-semibold mb-6">
            Institutional Strengthening
          </h2>
          <p className="text-muted-foreground text-justify leading-relaxed">
            SPX works with government institutions, cooperatives, enterprises,
            and development actors to strengthen internal systems, planning,
            governance, and operational effectiveness. Advisory services include
            institutional diagnostics, delivery architecture design, and
            coordination support for multi-stakeholder programs.
          </p>
        </div>
      </section>

      {/* BLOCK 3 — MARKET & POLICY */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">

        {/* TEXT */}
        <div>
          <h2 className="text-3xl font-semibold mb-6">Market & Policy Advisory</h2>
          <p className="text-muted-foreground text-justify leading-relaxed">
            SPX provides advisory on market systems, sector competitiveness,
            business enabling environments, and regulatory constraints. This
            ensures that interventions are aligned with both economic incentives
            and government priorities—bridging public–private collaboration
            for effective implementation.
          </p>
        </div>

        {/* IMAGE */}
        <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/advisory-3.jpg"
            alt="Policy"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-semibold mb-4">
          Explore More From Our Approach
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Discover how SPX integrates strategy, research, delivery, innovation,
          and digital tools to drive meaningful development impact.
        </p>

        <Link href="/approach">
          <Button size="lg" className="rounded-full px-10">
            View All Approach Areas
          </Button>
        </Link>
      </section>

    </div>
  );
}
