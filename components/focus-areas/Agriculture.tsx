"use client";

import { OptimizedImage } from "@/components/ui/optimized-image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ImageTextCard from "@/components/ui/image-text-card";

export default function Agriculture() {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative h-[55vh] w-full overflow-hidden">
        <OptimizedImage
          src="/images/focus/image6.webp"
          fill
          className="object-cover brightness-[0.55]"
          alt="Agriculture & Food Systems"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
          <div className="main-container">
            <motion.h1 className="text-4xl md:text-6xl font-semibold">
              Agriculture & Food Systems
            </motion.h1>
            <motion.p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl">
              Improving production, quality, and market access across rural value 
              chains through integrated Africa-led solutions.
            </motion.p>
          </div>
        </div>
      </section>

      {/* BLOCK 1 — WORK INCLUDES */}
      <section className="section-py">
        <div className="main-container">
          <ImageTextCard
            image={{
              src: "/images/focus/image11.webp",
              alt: "Agriculture Work",
            }}
            title="SPX's Agriculture Work"
            content={
              <>
                <p>
                  We support various actors in the agriculture value chain, including 
                  farmers, cooperatives, and agribusinesses, to improve production 
                  and market systems.
                </p>
                <ul className="space-y-3 mt-4">
                  {[
                    "Value chain development (Coffee & Horticulture)",
                    "Farmer productivity & extension services",
                    "Market access & trade solutions",
                    "Agribusiness support & advisory",
                    "Climate-smart agriculture"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
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

      {/* BLOCK 2 — EMBEDDED EXPERIENCE */}
      <section className="section-py bg-muted/40">
        <div className="main-container">
          <ImageTextCard
            image={{
              src: "/images/focus/image5.webp",
              alt: "Embedded Experience",
            }}
            title="Embedded Experience"
            content={
              <>
                <p>
                  Our agricultural capability is reinforced by years of direct involvement 
                  in Ethiopia's pivotal sectors and on-the-ground implementation.
                </p>
                <div className="space-y-3 mt-4">
                  {[
                    "Digital platforms for free extension advice",
                    "Composting innovations (Waste-to-Value)",
                    "Operational advisory for commercial farms",
                    "Coffee training institute for value-addition"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border">
                      <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </>
            }
            imagePosition="left"
            imageSize="medium"
          />
        </div>
      </section>

      {/* BLOCK 3 */}
      <section className="section-py">
        <div className="main-container">
          <ImageTextCard
            image={{
              src: "/images/focus/image4.webp",
              alt: "Agri-Enterprise Development",
            }}
            title="Agri-Enterprise Development"
            content={
              <p>
                Through business support, market development, and technology adoption,
                SPX helps small and growing agribusinesses scale sustainably. Our work
                connects local enterprises to financing, training, and digital tools.
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
          <h2 className="text-3xl font-semibold">Explore All Focus Areas</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4 mb-8">
            See how SPX strengthens systems across Africa’s development priorities.
          </p>
          <Link href="/focus-areas">
            <Button size="lg" className="px-10 rounded-full">Back to Focus Areas</Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
