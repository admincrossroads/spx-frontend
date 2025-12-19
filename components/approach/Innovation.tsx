"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Innovation() {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative h-[55vh] w-full">
        <Image
          src="/images/innovation-hero.jpg"
          alt="Innovation & Enterprise"
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
            Innovation & Enterprise
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-4 max-w-2xl text-lg md:text-xl"
          >
            Turning science, technology, and enterprise ideas into practical,
            scalable development solutions.
          </motion.p>
        </div>
      </section>

      {/* BLOCK 1 — INNOVATION LAB */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 className="text-3xl font-semibold mb-6">Spiral Innovation Club</h2>

          <p className="text-muted-foreground leading-relaxed text-justify">
            SPX’s innovation arm engages scientists, digital specialists,
            technologists, agronomists, and entrepreneurs to develop applied
            solutions for agriculture, clean energy, climate resilience, and
            circular economy sectors. The Innovation Club supports ideation,
            prototyping, field testing, and early-stage enterprise development.
          </p>
        </div>

        <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/innovation-1.jpg"
            alt="Innovation Lab"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* BLOCK 2 — APPLIED SCIENCE */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center bg-muted/40">

        <div className="relative h-80 rounded-xl overflow-hidden shadow-md order-2 md:order-1">
          <Image
            src="/images/innovation-2.jpg"
            alt="Applied Science"
            fill
            className="object-cover"
          />
        </div>

        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-semibold mb-6">Applied Science & R&D</h2>

          <p className="text-muted-foreground leading-relaxed text-justify">
            The Innovation Club explores scientific opportunities in applied
            microbiology, soil health solutions, waste-to-value technologies,
            ecological systems, and renewable energy innovation—using hands-on
            experimentation to drive Africa-based R&D.
          </p>
        </div>
      </section>

      {/* BLOCK 3 — DIGITAL & ENTERPRISE */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 className="text-3xl font-semibold mb-6">
            Digital & Enterprise Solutions
          </h2>

          <p className="text-muted-foreground leading-relaxed text-justify">
            SPX develops digital agriculture tools, informational platforms,
            and market systems that support producers, cooperatives, and
            enterprises. The team also incubates early-stage businesses and
            supports innovators with training, prototyping resources, and
            market pathways.
          </p>
        </div>

        <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/innovation-3.jpg"
            alt="Digital Tools"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-semibold mb-4">Explore All Approach Areas</h2>

        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          SPX integrates innovation, research, program delivery, and digital systems
          to build scalable development solutions across Africa.
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
