"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Energy() {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative h-[55vh] w-full">
        <Image
          src="/images/focus/energy-hero.jpg"
          alt="Energy for Development"
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
            Energy for Development
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-4 max-w-2xl text-lg md:text-xl"
          >
            Expanding access to clean, productive-use energy solutions that
            power agriculture, small enterprises, and community livelihoods.
          </motion.p>
        </div>
      </section>

      {/* BLOCK 1 */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-6">Productive Use Energy</h2>
          <p className="text-muted-foreground text-justify leading-relaxed">
            SPX supports the deployment of productive-use energy systems—solar
            irrigation, cold storage, efficient machinery, and renewable-powered
            tools that strengthen agricultural value chains and rural enterprises.
            Through field partnerships and community-led delivery, SPX helps
            producers and SMEs adopt energy solutions that increase productivity
            and resilience.
          </p>
        </div>

        <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/focus/energy-1.jpg"
            alt="Solar Irrigation"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* BLOCK 2 */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center bg-muted/40">
        <div className="relative h-80 rounded-xl overflow-hidden shadow-md order-2 md:order-1">
          <Image
            src="/images/focus/energy-2.jpg"
            alt="Energy Access"
            fill
            className="object-cover"
          />
        </div>

        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-semibold mb-6">Energy Access & Inclusion</h2>
          <p className="text-muted-foreground text-justify leading-relaxed">
            SPX designs strategies that improve energy access for underserved
            communities—bridging affordability, distribution, financing, and
            training gaps. We partner with cooperatives, local governments, and
            enterprises to ensure energy systems reach the last mile.
          </p>
        </div>
      </section>

      {/* BLOCK 3 */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-6">
            Energy for Agriculture & Enterprises
          </h2>
          <p className="text-muted-foreground text-justify leading-relaxed">
            Clean energy drives agricultural productivity and rural enterprise
            growth. SPX integrates energy access with market development,
            institutional strengthening, and technical training—ensuring systems
            are sustainable and economically viable.
          </p>
        </div>

        <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/focus/energy-3.jpg"
            alt="Energy for Enterprises"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-semibold mb-4">
          Explore All Focus Areas
        </h2>

        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Discover how SPX strengthens systems across agriculture, energy,
          climate, digital ecosystems, governance, and livelihoods.
        </p>

        <Link href="/focus-areas">
          <Button size="lg" className="rounded-full px-10">
            View All Focus Areas
          </Button>
        </Link>
      </section>

    </div>
  );
}
