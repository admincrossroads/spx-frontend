"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Identity() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 lg:px-12 space-y-24">

        {/* INTRO HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Africa-Led Identity
          </h1>
          <p className="text-lg text-muted-foreground">
            The SPX Difference — grounded in African leadership, insight, and real-world experience.
          </p>
        </motion.div>

        {/* SECTION 1 — AFRICA-LED PRINCIPLE */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg text-justify leading-relaxed"
          >
            <h2 className="text-3xl font-semibold">Africa-Led at the Core</h2>

            <p>
              SPX is founded on the principle that Africa’s development must be led 
              by institutions that understand the continent’s systems from within. 
              SPX’s identity is shaped by African leadership, local insight, and 
              the lived experience of working across the agricultural, business, 
              energy, and innovation landscapes of Ethiopia.
            </p>

            <p>
              This Africa-led foundation enables SPX to design solutions that are 
              contextually grounded, operationally feasible, and aligned with 
              long-term national and regional priorities.
            </p>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full h-[380px] rounded-xl bg-muted relative overflow-hidden"
          >
            <Image
              src="/images/identity-context.jpg"
              alt="Africa-Led Identity"
              fill
              className="object-cover opacity-90"
            />
          </motion.div>
        </div>

        {/* SECTION 2 — ROOTED IN CONTEXT */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* IMAGE LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full h-[420px] rounded-xl bg-muted relative overflow-hidden"
          >
            <Image
              src="/images/identity-rooted.jpg"
              alt="Rooted in Context"
              fill
              className="object-cover opacity-90"
            />
          </motion.div>

          {/* TEXT RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg leading-relaxed text-justify"
          >
            <h2 className="text-3xl font-semibold">Rooted in African Realities</h2>

            <p>
              SPX’s approach is anchored in first-hand understanding of the realities 
              that shape development outcomes in Africa:
            </p>

            <ul className="list-disc pl-6 space-y-3">
              <li>Community dynamics and social structures</li>
              <li>Market incentives and behavior</li>
              <li>Agricultural production systems</li>
              <li>Political economy considerations</li>
              <li>Cultural norms and adoption patterns</li>
              <li>Regulatory systems and institutional constraints</li>
            </ul>

            <p>
              Rather than interpreting Africa from a distance, SPX engages directly 
              with people, sectors, and systems—designing interventions that work in 
              practice, not just in theory.
            </p>
          </motion.div>
        </div>

        {/* SECTION 3 — LOCAL INSIGHT + GLOBAL STANDARDS */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg text-justify leading-relaxed"
          >
            <h2 className="text-3xl font-semibold">Local Insight, Global Standards</h2>

            <p>
              SPX combines local understanding with international-level analytical, 
              operational, and strategic capability. The organization’s leadership 
              has steered complex ventures in:
            </p>

            <ul className="list-disc pl-6 space-y-3">
              <li>Agribusiness & agricultural operations</li>
              <li>Ecotourism & hospitality</li>
              <li>Media & communications</li>
              <li>Digital technology platforms</li>
              <li>Renewable energy systems</li>
              <li>Skills development & applied science</li>
            </ul>

            <p>
              This blended experience strengthens SPX’s ability to bridge African 
              realities with global best practice.
            </p>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full h-[380px] rounded-xl bg-muted relative overflow-hidden"
          >
            <Image
              src="/images/identity-global.jpg"
              alt="Global Standards"
              fill
              className="object-cover opacity-90"
            />
          </motion.div>
        </div>

        {/* SECTION 4 — NETWORKS + ACCESS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-lg leading-relaxed text-justify space-y-6"
        >
          <h2 className="text-3xl font-semibold text-center">
            Trusted Local Networks
          </h2>

          <p>
            SPX’s deep roots in Ethiopia provide strong relationships with farmers, 
            cooperatives, community leaders, public institutions, private-sector actors, 
            skills institutions, innovators, and sector experts. These networks enable 
            SPX to mobilize quickly, coordinate effectively, and deliver programs with 
            local legitimacy.
          </p>
        </motion.div>

        {/* SECTION 5 — CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-semibold mb-4">
            Learn How Our Identity Shapes Our Work
          </h3>
          <Link
            href="/our-approach"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-all"
          >
            Explore Our Approach
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
