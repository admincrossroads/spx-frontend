"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Agriculture() {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative h-[55vh]">
        <Image
          src="/images/focus/agri-hero.jpg"
          fill
          className="object-cover brightness-[0.55]"
          alt="Agriculture & Food Systems"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6">
          <motion.h1 className="text-4xl md:text-6xl font-semibold">
            Agriculture & Food Systems
          </motion.h1>
          <motion.p className="mt-4 max-w-2xl text-lg md:text-xl">
            Building resilient, productive, and market-linked agricultural systems through research, delivery, and enterprise development.
          </motion.p>
        </div>
      </section>

      {/* BLOCK 1 */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-6">Agricultural Productivity</h2>
          <p className="text-muted-foreground text-justify leading-relaxed">
            SPX supports farmers, cooperatives, and agribusinesses to adopt
            improved practices—soil health, regenerative agriculture, mechanization,
            water management, and sustainable inputs. Through field research and
            community-led pilots, we strengthen productivity and local resilience.
          </p>
        </div>
        <div className="relative h-80 rounded-xl overflow-hidden">
          <Image src="/images/focus/agri-1.jpg" fill className="object-cover" alt="" />
        </div>
      </section>

      {/* BLOCK 2 */}
      <section className="py-20 px-6 md:px-16 bg-muted/40 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative h-80 rounded-xl overflow-hidden order-2 md:order-1">
          <Image src="/images/focus/agri-2.jpg" fill className="object-cover" alt="" />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-semibold mb-6">Food Systems & Markets</h2>
          <p className="text-muted-foreground text-justify leading-relaxed">
            SPX strengthens value chains from production to processing and market
            access. We collaborate with enterprises, buyers, and cooperatives to
            build fair, efficient, and climate-resilient food systems.
          </p>
        </div>
      </section>

      {/* BLOCK 3 */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-6">Agri-Enterprise Development</h2>
          <p className="text-muted-foreground text-justify leading-relaxed">
            Through business support, market development, and technology adoption,
            SPX helps small and growing agribusinesses scale sustainably. Our work
            connects local enterprises to financing, training, and digital tools.
          </p>
        </div>
        <div className="relative h-80 rounded-xl overflow-hidden">
          <Image src="/images/focus/agri-3.jpg" fill className="object-cover" alt="" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-semibold">Explore All Focus Areas</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mt-4 mb-8">
          See how SPX strengthens systems across Africa’s development priorities.
        </p>
        <Link href="/focus-areas">
          <Button size="lg" className="px-10 rounded-full">Back to Focus Areas</Button>
        </Link>
      </section>

    </div>
  );
}
