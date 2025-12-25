"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ImageTextCard from "@/components/ui/image-text-card";

export default function VisionAndMission() {
  return (
    <div className="w-full">
      {/* HERO HEADER */}
      <section className="relative h-[55vh] w-full overflow-hidden">
        <Image
          src="/images/about/image8.webp"
          alt="Vision & Mission"
          fill
          className="object-cover brightness-[0.45]"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="main-container"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Vision & Mission
            </h1>
            <p className="text-xl opacity-90 leading-relaxed max-w-3xl mx-auto">
              The philosophical and strategic foundation of SPX.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="main-container space-y-16 mt-16">

        {/* VISION SECTION */}
        <ImageTextCard
          image={{
            src: "/images/xtras/image5.webp",
            alt: "Vision Image",
          }}
          title="Our Vision"
          content={
            <>
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
            </>
          }
          imagePosition="left"
          imageSize="large"
        />

        {/* MISSION SECTION */}
        <ImageTextCard
          image={{
            src: "/images/about/image1.webp",
            alt: "Mission Image",
          }}
          title="Our Mission"
          content={
            <>
              <p>
                SPX's mission is to design and deliver integrated development 
                solutions that unlock opportunity, strengthen livelihoods, and 
                build resilient systems across Africa.
              </p>
              <ul className="space-y-4 list-decimal pl-6 my-4">
                <li>
                Applying Africa-led insight to development challenges : 
                  Leveraging contextual understanding, local networks, and industry 
                  experience to design solutions that are relevant, feasible, and sustainable.
                </li>
                <li>
                  Integrating strategy, research, implementation, and innovation :  
                  Creating a comprehensive development model that combines evidence, 
                  design, field delivery, learning, and scale.
                </li>
                <li>
                  Positioning clean energy as a driver of economic transformation : 
                  Supporting households, farmers, and enterprises to adopt energy-powered 
                  solutions that increase productivity and resilience.
                </li>
                <li>
                  Strengthening agriculture and food systems : 
                  Improving productivity, quality, and market access across rural value 
                  chains through advisory and digital tools.
                </li>
                <li>
                  Expanding opportunities for youth and communities :  
                  Developing skills, entrepreneurship pathways, and sector-specific 
                  training that increase employment and income.
                </li>
                <li>
                  Advancing digital inclusion and market transparency :  
                  Deploying digital platforms that connect farmers, MSMEs, and 
                  institutions to information, markets, finance, and opportunities.
                </li>
                <li>
                  Supporting climate resilience and circular economy models : 
                  Promoting sustainable practices, waste-to-value innovations, and 
                  environmentally sustainable systems.
                </li>
                <li>
                  Strengthening institutions and governance systems : 
                  Building the capacity of public and private institutions to deliver 
                  and scale development initiatives.
                </li>
              </ul>
            </>
          }
          imagePosition="bottom"
          imageSize="full"
        />

        {/* GUIDING PRINCIPLES */}
        <div className="bg-muted/30 p-8 lg:p-12 rounded-2xl border">
          <h2 className="text-3xl font-semibold mb-6 text-center">What Guides SPX</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Africa First</h3>
              <p className="text-muted-foreground text-justify-custom">
                African institutions must lead Africa’s development. SPX reflects 
                this principle through leadership, talent, innovation, and contextual insight.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Integration Over Fragmentation</h3>
              <p className="text-muted-foreground text-justify-custom">
                Complex challenges require integrated solutions. SPX brings advisory, 
                analytics, operations, and innovation into a single platform.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Practicality and Scalability</h3>
              <p className="text-muted-foreground text-justify-custom">
                Solutions must be practical and scalable. SPX designs solutions 
                that are practical, measurable, and built for the long-run.
              </p>
            </div>
          </div>
        </div>

        {/* LONG TERM ASPIRATION */}
        <ImageTextCard
          image={{
            src: "/images/xtras/image4.webp",
            alt: "Long Term Aspiration",
          }}
          title="SPX's Long-Term Aspiration"
          content={
            <>
              <p className="text-lg mb-4">
                SPX seeks to grow as a trusted partner capable of:
              </p>
              <ul className="space-y-3 list-none">
                {[
                  "Influencing development policy",
                  "Delivering multi-country programs",
                  "Incubating new enterprises",
                  "Advancing scientific and digital innovations",
                  "Producing high-quality research",
                  "Contributing to global development dialogue"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          }
          imagePosition="right"
          imageSize="medium"
          imageClassName="grayscale opacity-80"
        />

        {/* CTA BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center pb-12"
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
    </div>
  );
}
