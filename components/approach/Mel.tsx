"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ImageTextCard from "@/components/ui/image-text-card";

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
        <div className="main-container">
          <ImageTextCard
            image={{
              src: "/images/xtras/image38.webp",
              alt: "MEL Capabilities",
            }}
            title="MEL Capabilities"
            content={
              <>
                <p>
                  We build data-driven systems that ensure programs remain grounded in 
                  field realities. Our structured learning loops turn evidence into 
                  adaptive programming and improved delivery.
                </p>
                <ul className="space-y-3 mt-4">
                  {[
                    "Results frameworks & theory of change",
                    "Performance monitoring systems",
                    "Impact measurement & qualitative assessments",
                    "Data dashboard development"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border">
                      <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            }
            imagePosition="right"
            imageSize="medium"
          />
        </div>
      </section>

      {/* BLOCK 2 — LEARNING LOOPS */}
      <section className="section-py bg-muted/40">
        <div className="main-container">
          <ImageTextCard
            image={{
              src: "/images/xtras/image26.webp",
              alt: "Learning Loops",
            }}
            title="Learning Loops"
            content={
              <p>
                SPX incorporates structured learning loops into program cycles— 
                turning evidence into adaptive programming, improved delivery, and
                strengthened systems. This enables strategic decision-making based on
                real-time insights.
              </p>
            }
            imagePosition="left"
            imageSize="medium"
          />
        </div>
      </section>

      {/* BLOCK 3 — DATA & EVIDENCE */}
      <section className="section-py">
        <div className="main-container">
          <ImageTextCard
            image={{
              src: "/images/xtras/image27.webp",
              alt: "Data for Learning",
            }}
            title="Data-Driven Improvement"
            content={
              <p>
                MEL outputs feed back into program design, institutional strengthening,
                research, and strategy—ensuring that SPX and its partners deliver
                interventions that evolve with changing realities and real-world needs.
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
      </section> */}

    </div>
  );
}
