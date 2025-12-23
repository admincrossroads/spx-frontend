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

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
          <div className="main-container">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-semibold"
            >
              Research, Data & Evidence
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-4 max-w-2xl mx-auto text-lg md:text-xl"
            >
              Evidence is central to SPX’s work. We conduct applied research that 
              informs decision-making, policy development, and program design.
            </motion.p>
          </div>
        </div>
      </section>

      {/* BLOCK 1 — APPLIED RESEARCH */}
      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Applied Research & Sector Studies</h2>
            <p className="text-justify-custom text-muted-foreground mb-6">
              SPX conducts sector studies and applied research across agriculture, 
              finance, energy, and digital ecosystems. Our work generates evidence 
              rooted in African realities, supporting the design of practical and 
              scalable development programs.
            </p>
            <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
              <h3 className="font-bold text-primary mb-2">Team Experience Integrated</h3>
              <p className="text-sm text-muted-foreground">
                Our team has carried out research on Ethiopia’s banking and financial 
                systems, market transitions, and sector competitiveness.
              </p>
            </div>
          </div>

          <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/images/research-1.jpg"
              alt="Applied Research"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* BLOCK 2 — FIELD ASSESSMENTS */}
      <section className="section-py bg-muted/40">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-xl overflow-hidden shadow-md order-2 md:order-1">
            <Image
              src="/images/research-2.jpg"
              alt="Field Assessments"
              fill
              className="object-cover"
            />
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-semibold mb-6">Field Assessments & Surveys</h2>
            <p className="text-justify-custom text-muted-foreground mb-6">
              We gather insights from communities and enterprises that help shape 
              markets and programs. Our field capabilities include:
            </p>
            <ul className="space-y-3">
              {[
                "Baseline, midline & endline studies",
                "Evaluations & learning analysis",
                "Impact measurement",
                "Market surveys"
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* BLOCK 3 — DATA ANALYTICS */}
      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Data Analytics & Insights</h2>
            <p className="text-justify-custom text-muted-foreground">
              SPX turns raw data into clear, usable insights for partners. We 
              deploy digital tools for data collection, monitoring, and performance 
              tracking, ensuring transparency and real-time learning across 
              development programs.
            </p>
          </div>

          <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/images/research-3.jpg"
              alt="Data Analytics"
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
        </div>
      </section>

    </div>
  );
}
