"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function MEL() {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative h-[55vh] w-full">
        <Image
          src="/images/mel-hero.jpg"
          alt="Monitoring, Evaluation & Learning"
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
            Monitoring, Evaluation & Learning
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-4 max-w-2xl text-lg md:text-xl"
          >
            Building data-driven, evidence-based systems that improve
            programs and strengthen development outcomes.
          </motion.p>
        </div>
      </section>

      {/* BLOCK 1 — MEL SYSTEMS */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 className="text-3xl font-semibold mb-6">Field-Driven MEL Systems</h2>
          <p className="text-muted-foreground leading-relaxed text-justify">
            SPX designs MEL systems that gather insights directly from the field
            —ensuring programs remain grounded in lived realities. Through
            digital tools, community engagement, and continuous data collection,
            SPX enables real-time learning.
          </p>
        </div>

        <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/mel-1.jpg"
            alt="MEL Systems"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* BLOCK 2 — LEARNING LOOPS */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center bg-muted/40">

        <div className="relative h-80 rounded-xl overflow-hidden shadow-md order-2 md:order-1">
          <Image
            src="/images/mel-2.jpg"
            alt="Learning Loops"
            fill
            className="object-cover"
          />
        </div>

        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-semibold mb-6">Learning Loops</h2>

          <p className="text-muted-foreground leading-relaxed text-justify">
            SPX incorporates structured learning loops into program cycles—
            turning evidence into adaptive programming, improved delivery, and
            strengthened systems. This enables strategic decision-making based on
            real-time insights.
          </p>
        </div>
      </section>

      {/* BLOCK 3 — DATA & EVIDENCE */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 className="text-3xl font-semibold mb-6">Data-Driven Improvement</h2>

          <p className="text-muted-foreground leading-relaxed text-justify">
            MEL outputs feed back into program design, institutional strengthening,
            research, and strategy—ensuring that SPX and its partners deliver
            interventions that evolve with changing realities and real-world needs.
          </p>
        </div>

        <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/mel-3.jpg"
            alt="Data for Learning"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-semibold mb-4">Explore More From Our Approach</h2>

        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          SPX integrates MEL, research, digital systems, and innovation with
          program delivery to unlock sustainable impact.
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
