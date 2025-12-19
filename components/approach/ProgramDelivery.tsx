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

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-semibold"
          >
            Program Delivery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-4 max-w-2xl text-lg md:text-xl"
          >
            Delivering integrated development programs across agriculture,
            energy, digital inclusion, climate, and youth livelihoods.
          </motion.p>
        </div>
      </section>

      {/* BLOCK 1 — AGRICULTURE SYSTEMS */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 className="text-3xl font-semibold mb-6">
            Agriculture Program Delivery
          </h2>
          <p className="text-muted-foreground leading-relaxed text-justify">
            SPX designs and delivers agricultural interventions including farmer
            training, agronomy support, market linkage mechanisms, financial
            access initiatives, climate-smart agriculture, and digital tools for
            extension. These programs improve productivity, income, and
            resilience across farming systems.
          </p>
        </div>

        <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/program-agriculture.jpg"
            alt="Agriculture Delivery"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* BLOCK 2 — ENERGY DELIVERY */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center bg-muted/40">

        <div className="relative h-80 rounded-xl overflow-hidden shadow-md order-2 md:order-1">
          <Image
            src="/images/program-energy.jpg"
            alt="Energy Delivery"
            fill
            className="object-cover"
          />
        </div>

        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-semibold mb-6">Clean Energy Deployment</h2>

          <p className="text-muted-foreground leading-relaxed text-justify">
            SPX delivers productive-use energy programs that enable farmers,
            small businesses, cooperatives, and institutions to adopt solar
            irrigation, efficient appliances, renewable energy tools, and other
            clean-energy technologies that expand productivity and improve
            livelihoods.
          </p>
        </div>
      </section>

      {/* BLOCK 3 — YOUTH & ENTERPRISE */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 className="text-3xl font-semibold mb-6">
            Youth Skills & Enterprise Delivery
          </h2>

          <p className="text-muted-foreground leading-relaxed text-justify">
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
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
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
      </section>

    </div>
  );
}
