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
      <div className="container mx-auto px-6 md:px-6 min-[1300px]:px-4">
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
            className="h-[2px] bg-white mb-6"
          />
          
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-3">SPX Innovation Hub</h2>
              <p className="text-slate-300 text-lg">Developing solutions from Africa's challenges</p>
            </div>
            <Link href="/innovation" className="text-slate-300 hover:text-white text-sm font-medium transition-colors flex items-center group">
              Explore Hub
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

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((i, idx) => (
            <motion.div
              key={i.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-8 border border-slate-700 rounded-2xl bg-slate-800/50 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
              whileHover={{ y: -4 }}
            >
              <h3 className="font-semibold text-xl mb-3 group-hover:text-white transition-colors">{i.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{i.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
