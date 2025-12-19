"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Employment() {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative h-[55vh]">
        <Image
          src="/images/focus/employment-hero.jpg"
          fill
          className="object-cover brightness-[0.55]"
          alt="Employment & Skills"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6">
          <motion.h1 className="text-4xl md:text-6xl font-semibold">
            Employment & Skills
          </motion.h1>
          <motion.p className="mt-4 max-w-2xl text-lg md:text-xl">
            Equipping young people, workers, and entrepreneurs with the skills and opportunities needed for meaningful employment.
          </motion.p>
        </div>
      </section>

      {/* BLOCKS */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-6">Skills for the Future</h2>
          <p className="text-muted-foreground text-justify">
            SPX conducts research and delivery programs that strengthen technical,
            vocational, digital, and enterprise skills for youth and workers.
            We support institutions and employers to align training to market needs.
          </p>
        </div>
        <div className="relative h-80 rounded-xl overflow-hidden">
          <Image src="/images/focus/employment-1.jpg" fill className="object-cover" alt="" />
        </div>
      </section>

      <section className="py-20 px-6 md:px-16 bg-muted/40 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative h-80 rounded-xl overflow-hidden order-2 md:order-1">
          <Image src="/images/focus/employment-2.jpg" fill className="object-cover" alt="" />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-semibold mb-6">Youth Employment Systems</h2>
          <p className="text-muted-foreground text-justify">
            SPX works across education, enterprise, and labor systems to strengthen
            pathways to employment and self-employment for young people.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-6">Enterprise Growth</h2>
          <p className="text-muted-foreground text-justify">
            SPX supports small and growing businesses through entrepreneurship
            programs, market linkages, enterprise advisory, and digital tools.
          </p>
        </div>
        <div className="relative h-80 rounded-xl overflow-hidden">
          <Image src="/images/focus/employment-3.jpg" fill className="object-cover" alt="" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-semibold">Explore All Focus Areas</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mt-4 mb-8">
          Discover how SPX supports systems change across Africa.
        </p>
        <Link href="/focus-areas">
          <Button size="lg" className="px-10 rounded-full">Back to Focus Areas</Button>
        </Link>
      </section>

    </div>
  );
}
