"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Climate() {
  return (
    <div>

      {/* HERO */}
      <section className="relative h-[55vh]">
        <Image
          src="/images/focus/climate-hero.jpg"
          fill
          className="object-cover brightness-[0.55]"
          alt="Climate & Circular Economy"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6">
          <motion.h1 className="text-4xl md:text-6xl font-semibold">
            Climate & Circular Economy
          </motion.h1>
          <motion.p className="mt-4 max-w-2xl text-lg md:text-xl">
            Accelerating climate resilience, adaptation, and circular systems for sustainable development.
          </motion.p>
        </div>
      </section>

      {/* BLOCKS */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-6">Climate Resilience</h2>
          <p className="text-muted-foreground text-justify">
            SPX strengthens community resilience through climate-smart agriculture,
            early warning systems, water management, and adaptive livelihood strategies.
          </p>
        </div>
        <div className="relative h-80 rounded-xl overflow-hidden">
          <Image src="/images/focus/climate-1.jpg" fill className="object-cover" alt="" />
        </div>
      </section>

      <section className="py-20 px-6 md:px-16 bg-muted/40 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative h-80 rounded-xl overflow-hidden order-2 md:order-1">
          <Image src="/images/focus/climate-2.jpg" fill className="object-cover" alt="" />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-semibold mb-6">Circular Economy</h2>
          <p className="text-muted-foreground text-justify">
            SPX promotes recycling systems, waste-to-value models, and
            environmentally sustainable enterprise practices across sectors.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-6">Green Enterprises</h2>
          <p className="text-muted-foreground text-justify">
            Through business support, innovation, and financing pathways,
            SPX helps climate-focused enterprises grow and scale impact.
          </p>
        </div>
        <div className="relative h-80 rounded-xl overflow-hidden">
          <Image src="/images/focus/climate-3.jpg" fill className="object-cover" alt="" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-semibold">Explore All Focus Areas</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mt-4 mb-8">
          Discover how SPX drives climate resilience and sustainability.
        </p>
        <Link href="/focus-areas">
          <Button size="lg" className="px-10 rounded-full">Back to Focus Areas</Button>
        </Link>
      </section>

    </div>
  );
}
