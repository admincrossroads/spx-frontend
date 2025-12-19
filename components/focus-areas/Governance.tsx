"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Governance() {
  return (
    <div>

      {/* HERO */}
      <section className="relative h-[55vh]">
        <Image
          src="/images/focus/governance-hero.jpg"
          fill
          className="object-cover brightness-[0.55]"
          alt="Governance & Institutions"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6">
          <motion.h1 className="text-4xl md:text-6xl font-semibold">
            Governance & Institutions
          </motion.h1>
          <motion.p className="mt-4 max-w-2xl text-lg md:text-xl">
            Strengthening leadership, accountability, and institutional systems that enable sustainable development.
          </motion.p>
        </div>
      </section>

      {/* BLOCKS */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-6">Institutional Strengthening</h2>
          <p className="text-muted-foreground text-justify">
            SPX supports public, private, and civil society institutions
            through capacity building, systems design, policy analysis,
            and organizational transformation.
          </p>
        </div>
        <div className="relative h-80 rounded-xl overflow-hidden">
          <Image src="/images/focus/governance-1.jpg" fill className="object-cover" alt="" />
        </div>
      </section>

      <section className="py-20 px-6 md:px-16 bg-muted/40 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative h-80 rounded-xl overflow-hidden order-2 md:order-1">
          <Image src="/images/focus/governance-2.jpg" fill className="object-cover" alt="" />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-semibold mb-6">Accountability & Systems</h2>
          <p className="text-muted-foreground text-justify">
            We help leaders and institutions improve planning, monitoring,
            resource allocation, transparency, and the delivery of public services.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-6">Leadership Development</h2>
          <p className="text-muted-foreground text-justify">
            Through advisory, coaching, and systems-focused leadership
            programs, SPX empowers leaders to guide transformation
            across sectors and communities.
          </p>
        </div>
        <div className="relative h-80 rounded-xl overflow-hidden">
          <Image src="/images/focus/governance-3.jpg" fill className="object-cover" alt="" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-semibold">Explore All Focus Areas</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mt-4 mb-8">
          Learn how SPX strengthens governance systems across Africa.
        </p>
        <Link href="/focus-areas">
          <Button size="lg" className="px-10 rounded-full">Back to Focus Areas</Button>
        </Link>
      </section>

    </div>
  );
}
