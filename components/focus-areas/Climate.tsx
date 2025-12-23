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
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
          <div className="main-container">
            <motion.h1 className="text-4xl md:text-6xl font-semibold">
              Climate, Environment & Circular Economy
            </motion.h1>
            <motion.p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl">
              Building climate resilience into energy, agriculture, and enterprise 
              programs through sustainable, Africa-led solutions.
            </motion.p>
          </div>
        </div>
      </section>

      {/* BLOCK 1 — WORK INCLUDES */}
      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">SPX’s Climate Work</h2>
            <p className="text-justify-custom text-muted-foreground mb-6">
              We integrate climate resilience across all our pillars, using 
              technology and innovation to reduce vulnerability and promote 
              sustainability.
            </p>
            <ul className="space-y-3">
              {[
                "Climate adaptation & resilience",
                "Circular economy (Waste-to-Value)",
                "Green enterprise development",
                "Natural resource management"
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
            <Image src="/images/focus/climate-1.jpg" fill className="object-cover" alt="Climate Work" />
          </div>
        </div>
      </section>

      {/* BLOCK 2 — EMBEDDED EXPERIENCE */}
      <section className="section-py bg-muted/40">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-xl overflow-hidden order-2 md:order-1 shadow-md">
            <Image src="/images/focus/climate-2.jpg" fill className="object-cover" alt="Embedded Experience" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-semibold mb-6">Climate-First Integration</h2>
            <p className="text-justify-custom text-muted-foreground mb-6">
              SPX’s composting and energy-enabled agriculture initiatives place 
              climate resilience at the center of its programs.
            </p>
            <div className="p-6 bg-white rounded-xl border shadow-sm">
              <p className="text-sm text-muted-foreground">
                By converting agricultural waste into nutrient-rich compost and 
                promoting distributed renewables, we help communities build 
                resilience while reducing environmental impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Green Enterprises</h2>
            <p className="text-justify-custom text-muted-foreground">
              Through business support, innovation, and financing pathways,
              SPX helps climate-focused enterprises grow and scale impact.
            </p>
          </div>
          <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
            <Image src="/images/focus/climate-3.jpg" fill className="object-cover" alt="" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py text-center">
        <div className="main-container">
          <h2 className="text-3xl font-semibold">Explore All Focus Areas</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4 mb-8">
            Discover how SPX drives climate resilience and sustainability.
          </p>
          <Link href="/focus-areas">
            <Button size="lg" className="px-10 rounded-full">Back to Focus Areas</Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
