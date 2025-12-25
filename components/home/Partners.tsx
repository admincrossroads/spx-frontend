"use client";

import { motion } from "framer-motion";

export default function Partners() {
  const partners = Array.from({ length: 10 }).map((_, idx) => ({
    id: idx,
    name: `Partner Logo ${idx + 1}`,
  }));

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section>
      <div className="container mx-auto px-6 md:px-6 min-[1300px]:px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold mb-8"
        >
          Partners
        </motion.h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="marquee-container overflow-hidden py-10 border-y bg-muted/20 w-full"
      >
        <div className="flex gap-10 marquee w-max">
          {duplicatedPartners.map((partner, idx) => (
            <div
              key={`${partner.id}-${idx}`}
              className="h-12 w-40 bg-slate-300 rounded-lg flex items-center justify-center text-xs font-semibold text-slate-500 flex-shrink-0"
            >
              {partner.name}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
