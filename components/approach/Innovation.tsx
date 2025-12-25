"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ImageTextCard from "@/components/ui/image-text-card";

export default function Innovation() {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative h-[55vh] w-full overflow-hidden">
        <Image
          src="/images/xtras/image27.webp"
          alt="Innovation & Enterprise"
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
              Innovation & Enterprise Development
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-4 max-w-3xl mx-auto text-lg md:text-xl"
            >
              Turning science, technology, and enterprise ideas into practical, 
              scalable development solutions through the Spiral Innovation Club.
            </motion.p>
          </div>
        </div>
      </section>

      {/* BLOCK 1 — INCUBATION */}
      <section className="section-py">
        <div className="main-container">
          <ImageTextCard
            image={{
              src: "/images/xtras/image8.webp",
              alt: "Incubation",
            }}
            title="Startup Incubation & Acceleration"
            content={
              <>
                <p>
                  Supporting early-stage enterprises in agritech, energy access, 
                  circular economy, and digital solutions. We help innovators validate 
                  solutions within real-world communities and ecosystems.
                </p>
                <div className="p-6 bg-primary/5 rounded-xl border border-primary/10 mt-4">
                  <h3 className="font-bold text-primary mb-2">Team Experience Integrated</h3>
                  <p className="text-sm text-muted-foreground">
                    SPX's innovation work is enhanced by our experience in establishing 
                    coffee training institutes and spinning off ventures that address 
                    skills and employment gaps.
                  </p>
                </div>
              </>
            }
            imagePosition="right"
            imageSize="medium"
          />
        </div>
      </section>

      {/* BLOCK 2 — APPLIED SCIENCE */}
      <section className="section-py bg-muted/40">
        <div className="main-container">
          <ImageTextCard
            image={{
              src: "/images/focus/image6.webp",
              alt: "Applied Science",
            }}
            title="Applied Science Innovations"
            content={
              <>
                <p>
                  Developing technologies such as microbial solutions for composting 
                  and waste-to-value production. We use science to solve Ethiopia's 
                  development challenges.
                </p>
                <ul className="space-y-3 mt-4">
                  {[
                    "Microbial composting solutions",
                    "Waste-to-value production",
                    "Soil health technologies",
                    "Market testing & piloting"
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

      {/* BLOCK 3 — DIGITAL PLATFORMS */}
      <section className="section-py">
        <div className="main-container">
          <ImageTextCard
            image={{
              src: "/images/xtras/image28.webp",
              alt: "Digital Platforms",
            }}
            title="Digital Platforms"
            content={
              <p>
                Designing solutions that provide smallholders and MSMEs with 
                advisory, market access, and productivity tools. We have extensive 
                experience in developing digital platforms for farmers that move 
                smoothly from insight to execution.
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
        </div>
      </section>

    </div>
  );
}
