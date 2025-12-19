"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function VisionAndMission() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 lg:px-12 space-y-24">

        {/* HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Vision & Mission
          </h1>
          <p className="text-lg text-muted-foreground">
            The philosophical and strategic foundation of SPX.
          </p>
        </motion.div>

        {/* VISION SECTION */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full h-[380px] bg-muted rounded-xl relative overflow-hidden"
          >
            {/* Replace with shutterstock image */}
            <Image
              src="/images/placeholder-vision.jpg"
              alt="Vision Image"
              fill
              className="object-cover opacity-90"
            />
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg leading-relaxed text-justify"
          >
            <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>

            <p>
              SPX envisions an Africa where people, institutions, and markets thrive 
              through inclusive growth, clean energy access, resilient food systems, 
              and innovation-driven economic transformation.
            </p>
            <p>
              The firm seeks to contribute to a continent shaped by African leadership, 
              strengthened by evidence, and powered by solutions that are practical, 
              scalable, and grounded in local realities.
            </p>
            <p>
              SPX aims to be a leading Africa-based development institution—bridging 
              strategy, research, implementation, and innovation—to drive sustainable 
              impact across the region.
            </p>
          </motion.div>
        </div>

        {/* MISSION SECTION */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* TEXT FIRST */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg leading-relaxed text-justify"
          >
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>

            <p>
              SPX’s mission is to design and deliver integrated development 
              solutions that unlock opportunity, strengthen livelihoods, and 
              build resilient systems across Africa.
            </p>

            <ul className="space-y-4 list-disc pl-6">
              <li>
                Applying Africa-led insight to development challenges — leveraging 
                contextual understanding and lived experience to ensure that 
                interventions are relevant and sustainable.
              </li>

              <li>
                Integrating strategy, research, implementation, and innovation 
                into a full-stack development model that moves from evidence → 
                design → field delivery → learning → scale.
              </li>

              <li>
                Positioning clean energy as a driver of economic transformation, 
                supporting households, farmers, and enterprises to adopt 
                energy-powered solutions.
              </li>

              <li>
                Strengthening agriculture and food systems through advisory, 
                digital tools, training, and applied science.
              </li>

              <li>
                Expanding opportunities for youth and communities through skills 
                development, entrepreneurship pathways, and training.
              </li>

              <li>
                Advancing digital inclusion and market transparency by deploying 
                tools that connect farmers and MSMEs to knowledge, markets, 
                finance, and opportunities.
              </li>

              <li>
                Supporting climate resilience and circular economy models through 
                waste-to-value innovations and sustainable practices.
              </li>

              <li>
                Strengthening institutions and governance systems to improve the 
                design, coordination, and delivery of development initiatives.
              </li>
            </ul>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full h-[420px] bg-muted rounded-xl relative overflow-hidden"
          >
            <Image
              src="/images/placeholder-mission.jpg"
              alt="Mission Image"
              fill
              className="object-cover opacity-90"
            />
          </motion.div>
        </div>

        {/* CTA BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <h3 className="text-2xl font-semibold mb-4">
            Learn More About Our Work
          </h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
            Explore how our vision and mission translate into energy, agriculture, digital, 
            climate, and skills programs across Africa.
          </p>
          <Link
            href="/focus-areas"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-all"
          >
            Explore Our Focus Areas
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
