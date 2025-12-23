"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ProjectsPreview() {
  const projects = [
    { 
      title: "Solar Irrigation Initiative", 
      img: "/images/projects/p1.jpg", 
      tag: "Energy", 
      country: "Kenya",
      description: "Expanding access to clean energy for agricultural productivity"
    },
    { 
      title: "Youth Jobs Systems", 
      img: "/images/projects/p2.jpg", 
      tag: "Employment", 
      country: "Uganda",
      description: "Building pathways to sustainable employment for young people"
    },
    { 
      title: "Digital MEL Platform", 
      img: "/images/projects/p3.jpg", 
      tag: "Digital", 
      country: "Regional",
      description: "Transforming monitoring and evaluation through digital innovation"
    },
    { 
      title: "Climate Resilience Program", 
      img: "/images/projects/p1.jpg", 
      tag: "Climate", 
      country: "Ethiopia",
      description: "Strengthening community resilience to climate change impacts"
    },
    { 
      title: "Agricultural Innovation Hub", 
      img: "/images/projects/p2.jpg", 
      tag: "Agriculture", 
      country: "Tanzania",
      description: "Supporting smallholder farmers with innovative solutions"
    },
    { 
      title: "Governance Strengthening", 
      img: "/images/projects/p3.jpg", 
      tag: "Governance", 
      country: "Rwanda",
      description: "Enhancing institutional capacity and policy effectiveness"
    },
  ];

  return (
    <section className="main-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h2 className="text-3xl font-semibold">Our Projects</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Impactful initiatives driving development across Africa
          </p>
        </div>
        <Link
          href="/projects"
          className="flex items-center text-primary hover:underline text-sm font-medium"
        >
          View All
          <ArrowUpRight className="h-4 w-4 ml-1" />
        </Link>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="rounded-xl border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="relative h-48 overflow-hidden">
              <Image 
                src={p.img} 
                alt={p.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="absolute top-4 left-4">
                <span className="bg-primary/90 text-primary-foreground text-sm px-3 py-1 rounded-full font-medium">
                  {p.tag}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {p.description}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{p.country}</p>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
