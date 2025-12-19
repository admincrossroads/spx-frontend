"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FocusAreas() {
  const areas = [
    { title: "Energy for Development", img: "/images/focus/energy.jpg", href: "/focus-areas/energy" },
    { title: "Agriculture & Food Systems", img: "/images/focus/agriculture.jpg", href: "/focus-areas/agriculture" },
    { title: "Employment & Skills", img: "/images/focus/employment.jpg", href: "/focus-areas/employment" },
    { title: "Digital Transformation", img: "/images/focus/digital.jpg", href: "/focus-areas/digital" },
    { title: "Climate & Circular Economy", img: "/images/focus/climate.jpg", href: "/focus-areas/climate" },
    { title: "Governance & Institutions", img: "/images/focus/governance.jpg", href: "/focus-areas/governance" },
  ];

  return (
    <section className="container mx-auto px-6">
      <h2 className="text-3xl font-semibold mb-8">Focus Areas</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {areas.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl overflow-hidden border bg-card cursor-pointer hover:shadow-lg transition"
          >
            <Link href={a.href}>
              <div className="relative h-40">
                <Image src={a.img} alt={a.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-sm">{a.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Learn more →
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
