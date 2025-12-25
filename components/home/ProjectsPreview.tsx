"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ProjectsPreview() {
  const projects = [
    { 
      title: "Solar Irrigation Initiative", 
      img: "/images/projects/image3.webp", 
      tag: "Energy", 
      country: "Kenya",
      description: "Expanding access to clean energy for agricultural productivity"
    },
    { 
      title: "Youth Jobs Systems", 
      img: "/images/xtras/image11.webp", 
      tag: "Employment", 
      country: "Uganda",
      description: "Building pathways to sustainable employment for young people"
    },
    { 
      title: "Digital MEL Platform", 
      img: "/images/xtras/image36.webp", 
      tag: "Digital", 
      country: "Regional",
      description: "Transforming monitoring and evaluation through digital innovation"
    },
    { 
      title: "Climate Resilience Program", 
      img: "/images/xtras/image39.webp", 
      tag: "Climate", 
      country: "Ethiopia",
      description: "Strengthening community resilience to climate change impacts"
    },
    { 
      title: "Agricultural Innovation Hub", 
      img: "/images/xtras/image42.webp", 
      tag: "Agriculture", 
      country: "Tanzania",
      description: "Supporting smallholder farmers with innovative solutions"
    },
    { 
      title: "Governance Strengthening", 
      img: "/images/xtras/image16.webp", 
      tag: "Governance", 
      country: "Rwanda",
      description: "Enhancing institutional capacity and policy effectiveness"
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
        
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Our Projects</h2>
            <p className="text-lg text-muted-foreground">
              Impactful initiatives driving development across Africa
            </p>
          </div>
          <Link
            href="/projects"
            className="flex items-center text-primary hover:text-primary/80 text-sm font-medium transition-colors group"
          >
            View All
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

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="rounded-2xl border bg-card overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
            whileHover={{ y: -4 }}
          >
            <div className="relative h-48 overflow-hidden">
              <Image 
                src={p.img} 
                alt={p.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 left-4">
                <span className="bg-primary/90 text-primary-foreground text-sm px-3 py-1 rounded-full font-medium shadow-lg">
                  {p.tag}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                {p.description}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground font-medium">{p.country}</p>
                <motion.div
                  animate={{ x: [0, 4, 0], y: [0, -4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
