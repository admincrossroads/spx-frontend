"use client";

import { motion } from "framer-motion";

export default function Snapshot() {
  const stats = [
    { value: "10+", label: "Countries", detail: "Active across East & West Africa." },
    { value: "40+", label: "Programs", detail: "Across energy, agriculture & youth." },
    { value: "200+", label: "Partners", detail: "Governments, funders & enterprises." },
  ];

  return (
    <section className="container mx-auto px-6">
      <h2 className="text-3xl font-semibold mb-8">Snapshot of SPX</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 border rounded-xl bg-card shadow-sm"
          >
            <p className="text-4xl font-bold text-primary">{s.value}</p>
            <p className="text-sm font-medium mt-2">{s.label}</p>
            <p className="text-xs text-muted-foreground mt-2">{s.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
