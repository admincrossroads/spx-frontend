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
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
          <div className="main-container">
            <motion.h1 className="text-4xl md:text-6xl font-semibold">
              Employment, Skills & Livelihoods
            </motion.h1>
            <motion.p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl">
              Supporting the development of human capital across Ethiopia’s 
              agriculture, energy, and digital sectors.
            </motion.p>
          </div>
        </div>
      </section>

      {/* BLOCK 1 — WORK INCLUDES */}
      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Human Capital Development</h2>
            <p className="text-justify-custom text-muted-foreground mb-6">
              We focus on strengthening technical, vocational, and entrepreneurship 
              skills to increase employment and income outcomes.
            </p>
            <ul className="space-y-3">
              {[
                "Youth employment & agritech",
                "Workforce development & TVET",
                "Coffee sector professional training",
                "Entrepreneurship & MSME support",
                "Labour market coordination"
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
            <Image src="/images/focus/employment-1.jpg" fill className="object-cover" alt="Skills Development" />
          </div>
        </div>
      </section>

      {/* BLOCK 2 — EMBEDDED EXPERIENCE */}
      <section className="section-py bg-muted/40">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-xl overflow-hidden order-2 md:order-1 shadow-md">
            <Image src="/images/focus/employment-2.jpg" fill className="object-cover" alt="Embedded Experience" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-semibold mb-6">Leadership in Skills</h2>
            <p className="text-justify-custom text-muted-foreground mb-6">
              With decades of experience in enterprise development and training, 
              SPX’s leadership plays a key role in strengthening sector skills in Ethiopia.
            </p>
            <div className="p-6 bg-white rounded-xl border shadow-sm">
              <p className="text-sm text-muted-foreground">
                We have successfully established international-standard training 
                institutes in specialized sectors such as coffee roasting, cupping, 
                and barista skills—supporting human capital growth and higher value 
                market entry.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Enterprise Growth</h2>
            <p className="text-justify-custom text-muted-foreground">
              SPX supports small and growing businesses through entrepreneurship
              programs, market linkages, enterprise advisory, and digital tools.
            </p>
          </div>
          <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
            <Image src="/images/focus/employment-3.jpg" fill className="object-cover" alt="" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py text-center">
        <div className="main-container">
          <h2 className="text-3xl font-semibold">Explore All Focus Areas</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4 mb-8">
            Discover how SPX supports systems change across Africa.
          </p>
          <Link href="/focus-areas">
            <Button size="lg" className="px-10 rounded-full">Back to Focus Areas</Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
