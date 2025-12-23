"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FlagshipBloom() {
  return (
    <section className="main-container">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-6">
            BLOOM: Productive Use Energy for Rural Enterprises
          </h2>

          <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
            BLOOM is SPX’s flagship initiative supporting productive use
            energy for agriculture and micro-enterprises.
          </p>

          <p className="text-muted-foreground text-md mb-8 leading-relaxed">
            We co-design models with partners and test real market pathways
            to scale impact.
          </p>

          <Link href="/focus-areas/energy">
            <Button size="lg" className="rounded-full px-8">Learn More</Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-80 rounded-3xl overflow-hidden shadow-lg"
        >
          <Image
            src="/images/flagship/bloom.jpg"
            alt="BLOOM"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
