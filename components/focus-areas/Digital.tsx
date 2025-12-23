"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function DigitalFA() {
  return (
    <div>

      {/* HERO */}
      <section className="relative h-[55vh]">
        <Image
          src="/images/focus/digital-hero.jpg"
          fill
          className="object-cover brightness-[0.55]"
          alt="Digital Transformation"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
          <div className="main-container">
            <motion.h1 className="text-4xl md:text-6xl font-semibold">
              Digital Transformation
            </motion.h1>
            <motion.p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl">
              Advancing digital ecosystems, tools, and capabilities to accelerate development outcomes.
            </motion.p>
          </div>
        </div>
      </section>

      {/* BLOCKS */}
      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Digital Ecosystems</h2>
            <p className="text-justify-custom text-muted-foreground">
              SPX strengthens digital public infrastructure, data systems, and
              technology adoption across institutions, enterprises, and communities.
            </p>
          </div>
          <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
            <Image src="/images/focus/digital-1.jpg" fill className="object-cover" alt="" />
          </div>
        </div>
      </section>

      <section className="section-py bg-muted/40">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-xl overflow-hidden order-2 md:order-1 shadow-md">
            <Image src="/images/focus/digital-2.jpg" fill className="object-cover" alt="" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-semibold mb-6">Tech for Development</h2>
            <p className="text-justify-custom text-muted-foreground">
              From digital agriculture to e-learning systems and market platforms,
              SPX supports the deployment of tools that close gaps and boost outcomes.
            </p>
          </div>
        </div>
      </section>

      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Data & Innovation</h2>
            <p className="text-justify-custom text-muted-foreground">
              SPX strengthens data capacity, digital literacy, and innovation
              practices across institutions and enterprises—supporting
              evidence-driven decision-making.
            </p>
          </div>
          <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
            <Image src="/images/focus/digital-3.jpg" fill className="object-cover" alt="" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py text-center">
        <div className="main-container">
          <h2 className="text-3xl font-semibold">Explore All Focus Areas</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4 mb-8">
            Learn how SPX advances digital transformation across the continent.
          </p>
          <Link href="/focus-areas">
            <Button size="lg" className="px-10 rounded-full">Back to Focus Areas</Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
