"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function WhereWeWork() {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative h-[55vh] w-full">
        <Image
          src="/images/where-we-work-hero.jpg"
          alt="Where We Work"
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
            Where We Work
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-4 max-w-2xl text-lg md:text-xl"
          >
            SPX works across Ethiopia’s agricultural systems, energy landscapes,
            communities, and emerging innovation ecosystems.
          </motion.p>
        </div>
      </section>

      {/* SECTION 1 — ETHIOPIAN ROOTS */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">
        
        {/* TEXT */}
        <div>
          <h2 className="text-3xl font-semibold mb-6">Rooted in Ethiopia</h2>
          <p className="text-muted-foreground leading-relaxed text-justify">
            SPX’s work is anchored in Ethiopia, where the organization’s
            leadership, field teams, and technical programs are deeply embedded
            within local agricultural, economic, and community systems. This
            grounding gives SPX a strong understanding of sector realities,
            adoption behaviors, institutional dynamics, market barriers, and
            the constraints shaping development outcomes.
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed text-justify">
            Being based in Ethiopia also enables SPX to prototype and scale
            solutions across diverse geographic, cultural, and economic contexts—
            from highland crop systems to lowland value chains, from off-grid
            energy markets to urban innovation ecosystems.
          </p>
        </div>

        {/* IMAGE */}
        <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/ethiopia-map.jpg"
            alt="Map of Ethiopia"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* SECTION 2 — WORK ACROSS REGIONS */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center bg-muted/40">

        {/* IMAGE LEFT */}
        <div className="relative h-80 rounded-xl overflow-hidden shadow-md order-2 md:order-1">
          <Image
            src="/images/regions.jpg"
            alt="Regional Work"
            fill
            className="object-cover"
          />
        </div>

        {/* TEXT RIGHT */}
        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-semibold mb-6">Across Regional Systems</h2>
          <p className="text-muted-foreground leading-relaxed text-justify">
            SPX implements projects across multiple Ethiopian regions—working
            with farmers, cooperatives, community institutions, youth networks,
            and micro-enterprises. These engagements strengthen agricultural,
            energy, digital, and climate-focused programs at the local level.
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed text-justify">
            Through regional delivery networks, SPX is able to rapidly deploy
            training, tools, clean-energy systems, digital platforms, and field
            coordination teams, ensuring that interventions are responsive to
            localized needs.
          </p>
        </div>
      </section>

      {/* SECTION 3 — COMMUNITIES & LIVELIHOODS */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">

        {/* TEXT */}
        <div>
          <h2 className="text-3xl font-semibold mb-6">
            Working With People & Communities
          </h2>

          <p className="text-muted-foreground leading-relaxed text-justify">
            SPX’s delivery model centers on people: smallholder farmers,
            women-led enterprises, youth groups, local associations, producer
            cooperatives, and emerging businesses. SPX works directly with
            communities to address production challenges, improve market
            linkages, support energy access, and facilitate innovation-driven
            livelihoods.
          </p>

          <p className="text-muted-foreground mt-4 leading-relaxed text-justify">
            These community-level connections help SPX design interventions that
            are practical, relevant, and aligned with cultural realities—leading
            to durable adoption and lasting impact.
          </p>
        </div>

        {/* IMAGE */}
        <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/community-work.jpg"
            alt="Community Work"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* SECTION 4 — SECTOR SYSTEMS */}
      <section className="py-20 px-6 md:px-16 bg-muted/40">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Sectors Where SPX Operates
        </h2>

        <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed text-justify mb-10">
          SPX operates within Ethiopia’s most critical development systems,
          focusing on agriculture, energy, climate resilience, digital inclusion,
          research, applied science, and youth skills. These sectors represent
          the backbone of rural and urban livelihoods, making them essential
          entry points for integrated impact.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            "Agriculture & Food Systems",
            "Clean Energy & Productive Use",
            "Digital Inclusion & Market Platforms",
            "Climate Resilience & Circular Economy",
            "Youth Skills & Enterprise Development",
            "Research, Science & Innovation",
          ].map((sector) => (
            <div
              key={sector}
              className="p-6 rounded-xl bg-white shadow hover:shadow-md transition text-center"
            >
              <p className="text-lg font-medium">{sector}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-semibold mb-4">
          Explore Our Focus Areas
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Learn more about the sectors where SPX designs and delivers integrated,
          Africa-led development solutions.
        </p>

        <Link href="/focus-areas">
          <Button size="lg" className="rounded-full px-10">
            View Focus Areas
          </Button>
        </Link>
      </section>

    </div>
  );
}
