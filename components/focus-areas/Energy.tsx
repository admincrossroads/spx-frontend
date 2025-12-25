"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Energy() {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative h-[55vh] w-full overflow-hidden">
        <Image
          src="/images/xtras/image36.webp"
          alt="Energy for Development"
          fill
          className="object-cover brightness-[0.55]"
          priority
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
          <div className="main-container">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-semibold"
            >
              Energy for Development
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-4 max-w-3xl mx-auto text-lg md:text-xl"
            >
              Energy lies at the heart of SPX’s development thesis—serving as a key 
              enabler of economic opportunity, productive capacity, and climate resilience.
            </motion.p>
          </div>
        </div>
      </section>

      {/* BLOCK 1 — WHAT WE DO */}
      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">SPX’s Energy Work</h2>
            <p className="text-justify-custom text-muted-foreground mb-6">
              We implement initiatives that integrate clean energy technologies with 
              agriculture, micro-enterprise development, and rural livelihoods.
            </p>
            <ul className="space-y-3">
              {[
                "Productive Use of Energy (PUE)",
                "Distributed renewable solutions",
                "Energy for agriculture & MSMEs",
                "Off-grid & mini-grid applications",
                "Energy & climate resilience"
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/images/xtras/image5.webp"
              alt="Energy Work"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* BLOCK 2 — BLOOM PROJECT */}
      <section className="section-py bg-muted/40">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-xl overflow-hidden shadow-md order-2 md:order-1">
            <Image
              src="/images/projects/image3.webp"
              alt="Bloom Project"
              fill
              className="object-cover"
            />
          </div>

          <div className="order-1 md:order-2">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
              FLAGSHIP INITIATIVE
            </div>
            <h2 className="text-3xl font-semibold mb-6">The Bloom Project</h2>
            <p className="text-justify-custom text-muted-foreground">
              The Bloom Project is a multi-stakeholder program designed to integrate 
              clean energy, PUE technologies, and circular economy innovations to 
              support rural livelihoods. Bloom demonstrates SPX’s ability to deliver 
              energy-focused, context-appropriate projects that connect agriculture, 
              climate, and community needs.
            </p>
          </div>
        </div>
      </section>

      {/* BLOCK 3 */}
      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">
              Energy for Agriculture & Enterprises
            </h2>
            <p className="text-justify-custom text-muted-foreground">
              Clean energy drives agricultural productivity and rural enterprise
              growth. SPX integrates energy access with market development,
              institutional strengthening, and technical training—ensuring systems
              are sustainable and economically viable.
            </p>
          </div>

          <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/images/hero/image6.webp"
              alt="Energy for Enterprises"
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
            Explore All Focus Areas
          </h2>

          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Discover how SPX strengthens systems across agriculture, energy,
            climate, digital ecosystems, governance, and livelihoods.
          </p>

          <Link href="/focus-areas">
            <Button size="lg" className="rounded-full px-10">
              View All Focus Areas
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
