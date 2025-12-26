"use client";

import { OptimizedImage } from "@/components/ui/optimized-image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ImageTextCard from "@/components/ui/image-text-card";

export default function Research() {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative h-[55vh] w-full overflow-hidden">
        <OptimizedImage
          src="/images/xtras/image12.webp"
          alt="Research & Evidence"
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
        <div className="main-container">
          <ImageTextCard
            image={{
              src: "/images/about/image6.webp",
              alt: "Applied Research",
            }}
            title="Applied Research & Sector Studies"
            content={
              <>
                <p>
                  SPX conducts sector studies and applied research across agriculture, 
                  finance, energy, and digital ecosystems. Our work generates evidence 
                  rooted in African realities, supporting the design of practical and 
                  scalable development programs.
                </p>
                <div className="p-6 bg-primary/5 rounded-xl border border-primary/10 mt-4">
                  <h3 className="font-bold text-primary mb-2">Team Experience Integrated</h3>
                  <p className="text-sm text-muted-foreground">
                    Our team has carried out research on Ethiopia's banking and financial 
                    systems, market transitions, and sector competitiveness.
                  </p>
                </div>
              </>
            }
            imagePosition="right"
            imageSize="medium"
          />
        </div>
      </section>

      {/* BLOCK 2 — FIELD ASSESSMENTS */}
      <section className="section-py bg-muted/40">
        <div className="main-container">
          <ImageTextCard
            image={{
              src: "/images/about/image7.webp",
              alt: "Field Assessments",
            }}
            title="Field Assessments & Surveys"
            content={
              <>
                <p>
                  We gather insights from communities and enterprises that help shape 
                  markets and programs. Our field capabilities include:
                </p>
                <ul className="space-y-3 mt-4">
                  {[
                    "Baseline, midline & endline studies",
                    "Evaluations & learning analysis",
                    "Impact measurement",
                    "Market surveys"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            }
            imagePosition="left"
            imageSize="medium"
          />
        </div>
      </section>

      {/* BLOCK 3 — DATA ANALYTICS */}
      <section className="section-py">
        <div className="main-container">
          <ImageTextCard
            image={{
              src: "/images/approach/image5.webp",
              alt: "Data Analytics",
            }}
            title="Data Analytics & Insights"
            content={
              <p>
                SPX turns raw data into clear, usable insights for partners. We 
                deploy digital tools for data collection, monitoring, and performance 
                tracking, ensuring transparency and real-time learning across 
                development programs.
              </p>
            }
            imagePosition="right"
            imageSize="medium"
          />
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
