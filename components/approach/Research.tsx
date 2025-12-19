"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Research() {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative h-[55vh] w-full">
        <Image
          src="/images/research-hero.jpg"
          alt="Research & Evidence"
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
            Research & Evidence
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-4 max-w-2xl text-lg md:text-xl"
          >
            Translating field-level insights, data, and applied research into
            actionable, context-driven development solutions.
          </motion.p>
        </div>
      </section>

      {/* BLOCK 1 — APPLIED RESEARCH */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 className="text-3xl font-semibold mb-6">Applied Field Research</h2>
          <p className="text-muted-foreground leading-relaxed text-justify">
            SPX conducts applied research on agricultural systems, clean energy
            adoption, market dynamics, enterprise barriers, climate resilience,
            and community livelihoods—generating evidence rooted in African
            realities. This research supports the design of practical,
            implementable, and scalable development programs.
          </p>
        </div>

        <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/research-1.jpg"
            alt="Field Research"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* BLOCK 2 — MARKET & SECTOR ANALYSIS */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center bg-muted/40">

        <div className="relative h-80 rounded-xl overflow-hidden shadow-md order-2 md:order-1">
          <Image
            src="/images/research-2.jpg"
            alt="Market Assessment"
            fill
            className="object-cover"
          />
        </div>

        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-semibold mb-6">Market & Sector Assessments</h2>
          <p className="text-muted-foreground leading-relaxed text-justify">
            SPX conducts in-depth sector analyses covering agriculture, energy,
            digital ecosystems, skills, and climate systems. Research outputs
            such as value chain studies, opportunity mapping, baseline surveys,
            and adoption assessments equip institutions with actionable evidence.
          </p>
        </div>
      </section>

      {/* BLOCK 3 — DATA SYSTEMS */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 className="text-3xl font-semibold mb-6">Data Systems & Analysis</h2>
          <p className="text-muted-foreground leading-relaxed text-justify">
            SPX deploys digital tools for data collection, monitoring, market
            intelligence, and performance tracking. These systems enhance
            transparency, efficiency, and real-time learning across development
            programs—supporting continuous improvement.
          </p>
        </div>

        <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/research-3.jpg"
            alt="Data Systems"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-semibold mb-4">
          Explore Our Full Approach
        </h2>

        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Learn how SPX integrates advisory, research, delivery, innovation,
          MEL, and digital tools to power sustainable impact.
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
