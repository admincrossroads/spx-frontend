"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ProjectsPreview() {
  const projects = [
    { title: "Solar Irrigation", img: "/images/projects/p1.jpg", tag: "Energy", country: "Kenya" },
    { title: "Youth Jobs Systems", img: "/images/projects/p2.jpg", tag: "Employment", country: "Uganda" },
    { title: "Digital MEL", img: "/images/projects/p3.jpg", tag: "Digital", country: "Regional" },
  ];

  return (
    <section className="container mx-auto px-6">
      <h2 className="text-3xl font-semibold mb-6">Selected Work</h2>

      <div className="overflow-x-auto pb-3">
        <div className="flex gap-6 min-w-full">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[260px] rounded-xl border bg-card overflow-hidden shadow-sm"
            >
              <div className="relative h-40">
                <Image src={p.img} alt={p.title} fill className="object-cover" />
              </div>

              <div className="p-5">
                <p className="text-xs text-primary">{p.tag}</p>
                <h3 className="text-sm font-semibold mt-1">{p.title}</h3>
                <p className="text-[11px] text-muted-foreground mt-2">{p.country}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
