"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Advisory() {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative h-[55vh] w-full overflow-hidden">
        <Image
          src="/images/about/image5.webp"
          alt="Strategic Advisory"
          fill
          className="object-cover brightness-[0.55]"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white pt-12">
          <div className="main-container">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-semibold"
            >
              Strategic Advisory & Systems Design
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-4 max-w-3xl mx-auto text-lg md:text-xl"
            >
              Supporting governments, development actors, and private-sector 
              institutions with system-level analysis and transformation strategies.
            </motion.p>
          </div>
        </div>
      </section>

      {/* BLOCK 1 — MSD */}
      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">
              Market Systems Development (MSD)
            </h2>
            <p className="text-justify-custom text-muted-foreground mb-6">
              Designing interventions that strengthen value chains, support market 
              linkages, and improve economic opportunity for farmers, MSMEs, and youth.
            </p>
            <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
              <h3 className="font-bold text-primary mb-2">Team Experience Integrated</h3>
              <p className="text-sm text-muted-foreground">
                SPX’s advisory work is strengthened by leaders who have run large 
                private-sector operations, managed commercial farms, and led national institutions.
              </p>
            </div>
          </div>

          <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/images/focus/image8.webp"
              alt="Market Systems"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* BLOCK 2 — POLICY & REGULATORY */}
      <section className="section-py bg-muted/40">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-xl overflow-hidden shadow-md order-2 md:order-1">
            <Image
              src="/images/xtras/image12.webp"
              alt="Policy & Regulatory"
              fill
              className="object-cover"
            />
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-semibold mb-6">
              Policy & Regulatory Support
            </h2>
            <p className="text-justify-custom text-muted-foreground">
              Providing structured analysis and recommendations that help 
              institutions shape policies aligned with inclusive and sustainable 
              development. We support strategies across agriculture, energy-enabled 
              livelihoods, and digital inclusion.
            </p>
          </div>
        </div>
      </section>

      {/* BLOCK 3 — INSTITUTIONAL STRENGTHENING */}
      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Institutional Strengthening</h2>
            <p className="text-justify-custom text-muted-foreground">
              Strengthening the capabilities of public and private institutions 
              through systems design, process optimization, and performance 
              frameworks. This ensures interventions are aligned with both economic 
              incentives and government priorities.
            </p>
          </div>

          <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/images/xtras/image9.webp"
              alt="Institutional Strengthening"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py text-center">
        <div className="main-container">
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
        </div>
      </section>

    </div>
  );
}
