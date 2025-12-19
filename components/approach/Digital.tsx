"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Digital() {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative h-[55vh] w-full">
        <Image
          src="/images/digital-hero.jpg"
          alt="Digital Transformation"
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
            Digital Transformation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-4 max-w-2xl text-lg md:text-xl"
          >
            Leveraging digital tools, data systems, and technology platforms
            to strengthen markets, communities, and institutions.
          </motion.p>
        </div>
      </section>

      {/* BLOCK 1 — DIGITAL SYSTEMS */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 className="text-3xl font-semibold mb-6">Digital Solutions</h2>
          <p className="text-muted-foreground leading-relaxed text-justify">
            SPX develops digital platforms that support farmers, producer
            organizations, and small enterprises with information flows,
            advisory tools, early-warning signals, and market connections.
          </p>
        </div>

        <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/digital-1.jpg"
            alt="Digital Systems"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* BLOCK 2 — DATA & INSIGHTS */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center bg-muted/40">

        <div className="relative h-80 rounded-xl overflow-hidden shadow-md order-2 md:order-1">
          <Image
            src="/images/digital-2.jpg"
            alt="Data & Insights"
            fill
            className="object-cover"
          />
        </div>

        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-semibold mb-6">
            Data & Market Intelligence
          </h2>

          <p className="text-muted-foreground leading-relaxed text-justify">
            SPX uses digital tools to collect, analyze, and visualize data—
            enhancing decision-making, monitoring, and transparency across
            development programs and market systems.
          </p>
        </div>
      </section>

      {/* BLOCK 3 — DIGITAL INCLUSION */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 className="text-3xl font-semibold mb-6">Digital Inclusion</h2>

          <p className="text-muted-foreground leading-relaxed text-justify">
            SPX supports youth, cooperatives, and small enterprises to access
            digital skills and tools, enabling them to participate in modern
            markets and strengthen their economic opportunities.
          </p>
        </div>

        <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/digital-3.jpg"
            alt="Digital Inclusion"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-semibold mb-4">See Our Full Approach</h2>

        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Discover how SPX combines advisory, research, delivery, innovation,
          MEL, and digital systems to build integrated solutions across Africa.
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
