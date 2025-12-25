"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function MEL() {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative h-[55vh] w-full overflow-hidden">
        <Image
          src="/images/xtras/image28.webp"
          alt="Monitoring, Evaluation & Learning"
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
              Monitoring, Evaluation & Learning
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-4 max-w-3xl mx-auto text-lg md:text-xl"
            >
              SPX embeds monitoring, evaluation and learning into all of its projects 
              to understand what works, what needs improvement, and how to scale up.
            </motion.p>
          </div>
        </div>
      </section>

      {/* BLOCK 1 — CAPABILITIES */}
      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">MEL Capabilities</h2>
            <p className="text-justify-custom text-muted-foreground mb-6">
              We build data-driven systems that ensure programs remain grounded in 
              field realities. Our structured learning loops turn evidence into 
              adaptive programming and improved delivery.
            </p>
            <ul className="space-y-4">
              {[
                "Results frameworks & theory of change",
                "Performance monitoring systems",
                "Impact measurement & qualitative assessments",
                "Data dashboard development"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border">
                  <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </ul>
          </div>

          <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/images/xtras/image38.webp"
              alt="MEL Capabilities"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* BLOCK 2 — LEARNING LOOPS */}
      <section className="section-py bg-muted/40">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-xl overflow-hidden shadow-md order-2 md:order-1">
            <Image
              src="/images/xtras/image26.webp"
              alt="Learning Loops"
              fill
              className="object-cover"
            />
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-semibold mb-6">Learning Loops</h2>

            <p className="text-justify-custom text-muted-foreground">
              SPX incorporates structured learning loops into program cycles—
              turning evidence into adaptive programming, improved delivery, and
              strengthened systems. This enables strategic decision-making based on
              real-time insights.
            </p>
          </div>
        </div>
      </section>

      {/* BLOCK 3 — DATA & EVIDENCE */}
      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Data-Driven Improvement</h2>

            <p className="text-justify-custom text-muted-foreground">
              MEL outputs feed back into program design, institutional strengthening,
              research, and strategy—ensuring that SPX and its partners deliver
              interventions that evolve with changing realities and real-world needs.
            </p>
          </div>

          <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/images/xtras/image27.webp"
              alt="Data for Learning"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py text-center">
        <div className="main-container">
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
        </div>
      </section>

    </div>
  );
}
