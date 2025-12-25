"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Approach() {
  const steps = [
    {
      title: "Understand Systems",
      desc: "Mapping actors, incentives, constraints, and opportunities.",
    },
    {
      title: "Co-Design Solutions",
      desc: "Collaborative strategic design grounded in local realities.",
    },
    {
      title: "Deliver & Adapt",
      desc: "Implementation support and testing in real-world conditions.",
    },
    {
      title: "Measure & Learn",
      desc: "Evidence loops to scale what works.",
    },
  ];

  return (
    <section className="container mx-auto px-6 md:px-6 min-[1300px]:px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        {/* Elegant divider line */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "60px" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="h-[2px] bg-primary mb-6"
        />
        
        <div className="flex justify-between items-end">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Our Approach</h2>

          <Link
            href="/approach/advisory"
            className="flex items-center text-primary hover:text-primary/80 text-sm font-medium transition-colors group"
          >
            Explore All
            <motion.span
              className="inline-block ml-1"
              animate={{ x: [0, 4, 0], y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowUpRight className="h-4 w-4" />
            </motion.span>
          </Link>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="p-8 border rounded-2xl bg-background shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <motion.div
              className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 text-base font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
            >
              {i + 1}
            </motion.div>
            <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
