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
    <section className="main-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-end mb-8"
      >
        <h2 className="text-3xl font-semibold">Our Approach</h2>

        <Link
          href="/approach"
          className="flex items-center text-primary text-sm hover:underline"
        >
          Explore All
          <ArrowUpRight className="h-4 w-4 ml-1" />
        </Link>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="p-6 border rounded-xl bg-background shadow-sm"
          >
            <p className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3 text-sm font-bold">
              {i + 1}
            </p>
            <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
