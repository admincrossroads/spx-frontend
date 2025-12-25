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
          src="/images/xtras/image31.webp"
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
            className="mt-4 max-w-3xl text-lg md:text-xl"
          >
            SPX is headquartered in Addis Ababa and works across multiple regions of 
            Ethiopia, adapting its work to fit the needs of local environments.
          </motion.p>
        </div>
      </section>

      {/* SECTION 1 — ETHIOPIA */}
      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Ethiopia: Core Operational Base</h2>
            <p className="text-justify-custom text-muted-foreground mb-6">
              Ethiopia is the center of SPX’s operations. Across the country, we work 
              with various stakeholders to understand and navigate the complexities 
              of the development landscape.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium mb-6">
              {[
                "Farmers & cooperatives",
                "Rural households",
                "Micro-enterprises & youth",
                "Commercial farms",
                "Government entities",
                "Skills development centers",
                "Private-sector actors",
                "Energy installations"
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-justify-custom text-muted-foreground">
              Being based in Ethiopia enables SPX to prototype and scale solutions 
              across diverse geographic and economic contexts—from highland crop 
              systems to off-grid energy markets.
            </p>
          </div>

          {/* IMAGE */}
          <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/images/xtras/image21.webp"
              alt="Core Base"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2 — WORK ACROSS REGIONS */}
      <section className="section-py bg-muted/40">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          {/* IMAGE LEFT */}
          <div className="relative h-80 rounded-xl overflow-hidden shadow-md order-2 md:order-1">
            <Image
              src="/images/xtras/image22.webp"
              alt="Regional Work"
              fill
              className="object-cover"
            />
          </div>

          {/* TEXT RIGHT */}
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-semibold mb-6">Across Regional Systems</h2>
            <p className="text-justify-custom text-muted-foreground">
              SPX implements projects across multiple Ethiopian regions—working
              with farmers, cooperatives, community institutions, youth networks,
              and micro-enterprises. These engagements strengthen agricultural,
              energy, digital, and climate-focused programs at the local level.
            </p>
            <p className="text-justify-custom text-muted-foreground mt-4">
              Through regional delivery networks, SPX is able to rapidly deploy
              training, tools, clean-energy systems, digital platforms, and field
              coordination teams, ensuring that interventions are responsive to
              localized needs.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — COMMUNITIES & LIVELIHOODS */}
      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          {/* TEXT */}
          <div>
            <h2 className="text-3xl font-semibold mb-6">
              Working With People & Communities
            </h2>

            <p className="text-justify-custom text-muted-foreground">
              SPX’s delivery model centers on people: smallholder farmers,
              women-led enterprises, youth groups, local associations, producer
              cooperatives, and emerging businesses. SPX works directly with
              communities to address production challenges, improve market
              linkages, support energy access, and facilitate innovation-driven
              livelihoods.
            </p>

            <p className="text-justify-custom text-muted-foreground mt-4">
              These community-level connections help SPX design interventions that
              are practical, relevant, and aligned with cultural realities—leading
              to durable adoption and lasting impact.
            </p>
          </div>

          {/* IMAGE */}
          <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/images/xtras/image25.webp"
              alt="Community Work"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION 4 — AFRICA FOCUS */}
      <section className="section-py bg-muted/40">
        <div className="main-container">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-semibold mb-6">Africa-Focused Outlook</h2>
              <p className="text-justify-custom text-muted-foreground mb-6">
                While Ethiopia is our base, SPX is committed to playing a meaningful 
                role in the continent’s transformation. Our model and partnerships 
                are designed for regional impact across key development systems.
              </p>
              <div className="space-y-4">
                {[
                  "PUE systems & distributed energy",
                  "Agricultural transformation",
                  "Digital inclusion & innovation",
                  "Youth employment & skills",
                  "Climate & circular economy",
                  "Institutional strengthening & market reforms"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
              <div className="w-full h-full bg-primary/5 flex items-center justify-center p-8 text-center">
                <p className="text-primary font-semibold text-lg italic">
                  "SPX targets regional priorities that align with Africa’s long-term development agenda."
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative h-80 rounded-xl overflow-hidden shadow-md order-2 md:order-1">
              <Image
                src="/images/xtras/image24.webp"
                alt="Remote Engagement"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-semibold mb-6">Remote Engagement & Research</h2>
              <p className="text-justify-custom text-muted-foreground">
                SPX also works beyond Ethiopia, carrying out research and analysis that help 
                explain trends across the continent—including finance and market systems, 
                digital transformation, renewable energy access, agricultural markets, 
                and climate systems.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-semibold mb-6">Building Continental Networks</h2>
              <p className="text-justify-custom text-muted-foreground">
                Through our engagement in many sectors, SPX contributes to emerging Africa-wide 
                networks in clean energy, agriculture, innovation, and media platforms. 
                These networks support our goal of growing into a continental institution.
              </p>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
              <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                <span className="text-primary font-semibold text-lg">Continental Networks</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-6">Why Geography Matters to SPX</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {[
                "Engage communities with sensitivity",
                "Implement field operations effectively",
                "Understand institutional dynamics",
                "Scale innovations in different settings",
                "Insights into program designs",
                "Reflect Africa’s diversity",
                "Support expansion between regions",
                "Foundation for long-term impact"
              ].map((item) => (
                <div key={item} className="p-4 bg-white rounded-lg border shadow-sm flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-sm font-medium leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py text-center">
        <div className="main-container">
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
        </div>
      </section>

    </div>
  );
}
