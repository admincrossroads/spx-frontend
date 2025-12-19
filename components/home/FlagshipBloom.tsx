"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function FlagshipBloom() {
  return (
    <section className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-semibold mb-4">
            BLOOM: Productive Use Energy for Rural Enterprises
          </h2>

          <p className="text-muted-foreground text-sm mb-4">
            BLOOM is SPX’s flagship initiative supporting productive use
            energy for agriculture and micro-enterprises.
          </p>

          <p className="text-muted-foreground text-xs mb-6">
            We co-design models with partners and test real market pathways
            to scale impact.
          </p>

          <Button>Learn More</Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="relative h-64 rounded-3xl overflow-hidden"
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
