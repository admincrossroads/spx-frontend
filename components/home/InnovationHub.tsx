"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function InnovationHub() {
  const items = [
    { title: "Applied Research", desc: "Pilots, field testing, implementation research." },
    { title: "Enterprise Support", desc: "Supporting ventures tackling systemic bottlenecks." },
    { title: "Digital & Data Tools", desc: "Dashboards, MEL tools, digital systems." },
  ];

  return (
    <section className="bg-slate-900 text-white section-py">
      <div className="main-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-8"
        >
          <div>
            <h2 className="text-3xl font-semibold">SPX Innovation Hub</h2>
            <p className="text-slate-400 mt-2">Developing solutions from Africa's challenges</p>
          </div>
          <Link href="/innovation-hub" className="text-slate-300 hover:text-white text-sm flex items-center">
            Explore Hub <ArrowUpRight className="h-4 w-4 ml-1" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((i, idx) => (
            <motion.div
              key={i.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-8 border border-slate-700 rounded-2xl bg-slate-800/50 hover:bg-slate-800 transition-colors"
            >
              <h3 className="font-semibold text-lg mb-3">{i.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{i.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
