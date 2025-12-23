"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ProgramDelivery() {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative h-[55vh] w-full">
        <Image
          src="/images/program-delivery-hero.jpg"
          alt="Program Delivery"
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
              Program Delivery & Field Operations
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-4 max-w-3xl mx-auto text-lg md:text-xl"
            >
              Implementing complex programs in rural and peri-urban environments 
              through stakeholder engagement, logistics, and localized delivery.
            </motion.p>
          </div>
        </div>
      </section>

      {/* BLOCK 1 — COMMUNITY ENGAGEMENT */}
      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">
              Stakeholder & Community Engagement
            </h2>
            <p className="text-justify-custom text-muted-foreground mb-6">
              Working closely with rural households, cooperatives, and local 
              institutions to ensure programs are contextually appropriate. Our 
              strength lies in coordinating multi-stakeholder initiatives and 
              facilitating public–private collaboration.
            </p>
            <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
              <h3 className="font-bold text-primary mb-2">Team Experience Integrated</h3>
              <p className="text-sm text-muted-foreground">
                Our team includes leaders with experience running large-scale 
                operations and coordinating complex field activities across Ethiopia.
              </p>
            </div>
          </div>

          <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/images/program-agriculture.jpg"
              alt="Community Engagement"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* BLOCK 2 — OPERATIONAL LOGISTICS */}
      <section className="section-py bg-muted/40">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-xl overflow-hidden shadow-md order-2 md:order-1">
            <Image
              src="/images/program-energy.jpg"
              alt="Operational Logistics"
              fill
              className="object-cover"
            />
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-semibold mb-6">Operational Logistics & Scale</h2>
            <p className="text-justify-custom text-muted-foreground mb-6">
              We manage large-scale implementation involving procurement, mobilization, 
              and technical installations across multiple sites.
            </p>
            <ul className="space-y-3">
              {[
                "Value chain interventions (Coffee & Horticulture)",
                "Multi-site project management (Bloom Initiative)",
                "Technical demonstrations & installations",
                "Field monitoring & verification"
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

      {/* BLOCK 3 — YOUTH & ENTERPRISE */}
      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">
              Youth Skills & Enterprise Delivery
            </h2>

            <p className="text-justify-custom text-muted-foreground">
              SPX designs training pathways and enterprise incubation programs that
              equip youth with practical skills across agritech, digital tools,
              renewable energy, and small business development—strengthening local
              economies and employment outcomes.
            </p>
          </div>

          <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/images/program-youth.jpg"
              alt="Youth Programs"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py text-center">
        <div className="main-container">
          <h2 className="text-3xl font-semibold mb-4">Explore Our Approach</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            See how SPX integrates advisory, research, innovation, MEL, and digital
            systems into program delivery.
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
