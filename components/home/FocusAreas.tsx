"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FocusAreas() {
  const areas = [
    { title: "Energy for Development", img: "/images/xtras/image36.webp", href: "/focus-areas/energy" },
    { title: "Agriculture & Food Systems", img: "/images/focus/image6.webp", href: "/focus-areas/agriculture" },
    { title: "Employment & Skills", img: "/images/approach/image2.webp", href: "/focus-areas/employment" },
    { title: "Digital Transformation", img: "/images/approach/image5.webp", href: "/focus-areas/digital" },
    { title: "Climate & Circular Economy", img: "/images/xtras/image17.webp", href: "/focus-areas/climate" },
    { title: "Governance & Institutions", img: "/images/xtras/image30.webp", href: "/focus-areas/governance" },
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
        
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">Focus Areas</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {areas.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="rounded-2xl overflow-hidden border bg-card cursor-pointer hover:shadow-xl transition-all duration-300 group"
            whileHover={{ y: -4 }}
          >
            <Link href={a.href}>
              <div className="relative h-56 overflow-hidden">
                <Image 
                  src={a.img} 
                  alt={a.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/50 transition-colors" />
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{a.title}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
                  Learn more
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
