"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FlagshipBloom() {
  return (
    <section className="container mx-auto px-6 md:px-6 min-[1300px]:px-4 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Elegant divider line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="h-[2px] bg-primary mb-6"
          />
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            BLOOM: Productive Use Energy for Rural Enterprises
          </h2>

          <p className="text-foreground/90 text-lg mb-6 leading-relaxed">
            BLOOM is SPX's flagship initiative supporting productive use
            energy for agriculture and micro-enterprises.
          </p>

          <p className="text-muted-foreground text-md mb-8 leading-relaxed">
            We co-design models with partners and test real market pathways
            to scale impact.
          </p>

          <Link href="/focus-areas/energy">
            <Button 
              size="lg" 
              className="rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Learn More
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-96 rounded-3xl overflow-hidden shadow-xl group"
        >
          <Image
            src="/images/projects/image3.webp"
            alt="BLOOM"
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      </div>
    </section>
  );
}
