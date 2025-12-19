"use client";

import { motion } from "framer-motion";

export default function InnovationHub() {
  const items = [
    { title: "Applied Research", desc: "Pilots, field testing, implementation research." },
    { title: "Enterprise Support", desc: "Supporting ventures tackling systemic bottlenecks." },
    { title: "Digital & Data Tools", desc: "Dashboards, MEL tools, digital systems." },
  ];

  return (
    <section className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-8">SPX Innovation Hub</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((i, idx) => (
            <motion.div
              key={i.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 border border-slate-700 rounded-xl bg-slate-800"
            >
              <h3 className="font-semibold text-sm mb-2">{i.title}</h3>
              <p className="text-slate-300 text-xs">{i.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
