"use client";

import { motion } from "framer-motion";

export default function Partners() {
  return (
    <section className="main-container">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-semibold mb-8"
      >
        Partners
      </motion.h2>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex gap-10 overflow-hidden py-10 border rounded-2xl bg-muted/20"
      >
        <div className="flex gap-10 animate-[slide_30s_linear_infinite]">
          {Array.from({ length: 10 }).map((_, idx) => (
            <div
              key={idx}
              className="h-12 w-40 bg-slate-300 rounded-lg flex items-center justify-center text-xs font-semibold text-slate-500"
            >
              Partner Logo
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
