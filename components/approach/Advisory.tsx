"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ImageTextCard from "@/components/ui/image-text-card";

export default function Advisory() {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative h-[55vh] w-full overflow-hidden">
        <Image
          src="/images/about/image5.webp"
          alt="Strategic Advisory"
          fill
          className="object-cover brightness-[0.55]"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white pt-12">
          <div className="main-container">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-semibold"
            >
              Strategic Advisory & Systems Design
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-4 max-w-3xl mx-auto text-lg md:text-xl"
            >
              Supporting governments, development actors, and private-sector 
              institutions with system-level analysis and transformation strategies.
            </motion.p>
          </div>
        </div>
      </section>

      {/* BLOCK 1 — MSD */}
      <section className="section-py">
        <div className="main-container">
          <ImageTextCard
            image={{
              src: "/images/focus/image1.webp",
              alt: "Market Systems",
            }}
            title="Market Systems Development (MSD)"
            content={
              <>
                <p>
                  Designing interventions that strengthen value chains, support market 
                  linkages, and improve economic opportunity for farmers, MSMEs, and youth.
                </p>
                <div className="p-6 bg-primary/5 rounded-xl border border-primary/10 mt-4">
                  <h3 className="font-bold text-primary mb-2">Team Experience Integrated</h3>
                  <p className="text-sm text-muted-foreground">
                    SPX's advisory work is strengthened by leaders who have run large 
                    private-sector operations, managed commercial farms, and led national institutions.
                  </p>
                </div>
              </>
            }
            imagePosition="right"
            imageSize="medium"
          />
        </div>
      </section>

      {/* BLOCK 2 — POLICY & REGULATORY */}
      <section className="section-py bg-muted/40">
        <div className="main-container">
          <ImageTextCard
            image={{
              src: "/images/xtras/image31.webp",
              alt: "Policy & Regulatory",
            }}
            title="Policy & Regulatory Support"
            content={
              <p>
                Providing structured analysis and recommendations that help 
                institutions shape policies aligned with inclusive and sustainable 
                development. We support strategies across agriculture, energy-enabled 
                livelihoods, and digital inclusion.
              </p>
            }
            imagePosition="left"
            imageSize="medium"
          />
        </div>
      </section>

      {/* BLOCK 3 — INSTITUTIONAL STRENGTHENING */}
      <section className="section-py">
        <div className="main-container">
          <ImageTextCard
            image={{
              src: "/images/xtras/image13.webp",
              alt: "Institutional Strengthening",
            }}
            title="Institutional Strengthening"
            content={
              <p>
                Strengthening the capabilities of public and private institutions 
                through systems design, process optimization, and performance 
                frameworks. This ensures interventions are aligned with both economic 
                incentives and government priorities.
              </p>
            }
            imagePosition="right"
            imageSize="medium"
          />
        </div>
      </section>

      {/* CTA */}
      {/* <section className="section-py text-center">
        <div className="main-container">
          <h2 className="text-3xl font-semibold mb-4">
            Explore More From Our Approach
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Discover how SPX integrates strategy, research, delivery, innovation,
            and digital tools to drive meaningful development impact.
          </p>

          <Link href="/approach">
            <Button size="lg" className="rounded-full px-10">
              View All Approach Areas
            </Button>
          </Link>
        </div>
      </section> */}

    </div>
  );
}
