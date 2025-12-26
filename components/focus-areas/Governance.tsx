"use client";

import { OptimizedImage } from "@/components/ui/optimized-image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Governance() {
  return (
    <div>

      {/* HERO */}
      <section className="relative h-[55vh] w-full overflow-hidden">
        <OptimizedImage
          src="/images/xtras/image30.webp"
          fill
          className="object-cover brightness-[0.55]"
          alt="Governance & Institutions"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
          <div className="main-container">
            <motion.h1 className="text-4xl md:text-6xl font-semibold">
              Governance & Institutional Strengthening
            </motion.h1>
            <motion.p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl">
              Improving the ability of institutions to design, coordinate, and 
              deliver effective programs for sustainable impact.
            </motion.p>
          </div>
        </div>
      </section>

      {/* BLOCK 1 — WORK INCLUDES */}
      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">SPX’s Governance Work</h2>
            <p className="text-justify-custom text-muted-foreground mb-6">
              We work across education, enterprise, and public systems to strengthen 
              the capacity of institutions to deliver on their mandates.
            </p>
            <ul className="space-y-3">
              {[
                "Public sector capacity building",
                "Local governance systems",
                "Policy implementation support",
                "Institutional development",
                "Transparency & accountability"
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
            <OptimizedImage src="/images/xtras/image31.webp" fill className="object-cover" alt="Governance Work" />
          </div>
        </div>
      </section>

      {/* BLOCK 2 — EMBEDDED EXPERIENCE */}
      <section className="section-py bg-muted/40">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-xl overflow-hidden order-2 md:order-1 shadow-md">
            <OptimizedImage src="/images/about/image4.webp" fill className="object-cover" alt="Embedded Experience" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-semibold mb-6">Leadership in Governance</h2>
            <p className="text-justify-custom text-muted-foreground mb-6">
              SPX’s leadership brings decades of experience working with government 
              bodies, public-private systems, and national institutions.
            </p>
            <div className="p-6 bg-white rounded-xl border shadow-sm">
              <p className="text-sm text-muted-foreground">
                Our first-hand understanding of regulatory and institutional 
                constraints allows us to design governance interventions that are 
                both technically sound and politically feasible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Leadership Development</h2>
            <p className="text-justify-custom text-muted-foreground">
              Through advisory, coaching, and systems-focused leadership
              programs, SPX empowers leaders to guide transformation
              across sectors and communities.
            </p>
          </div>
          <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
            <OptimizedImage src="/images/xtras/image12.webp" fill className="object-cover" alt="" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py text-center">
        <div className="main-container">
          <h2 className="text-3xl font-semibold">Explore All Focus Areas</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4 mb-8">
            Learn how SPX strengthens governance systems across Africa.
          </p>
          <Link href="/focus-areas">
            <Button size="lg" className="px-10 rounded-full">Back to Focus Areas</Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
