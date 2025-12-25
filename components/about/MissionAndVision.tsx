"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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

      <div className="main-container space-y-24 mt-20">

        {/* VISION SECTION */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative w-full h-[380px] bg-muted rounded-xl overflow-hidden"
          >
            <Image
              src="/images/xtras/image5.webp"
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

            <p className="text-justify-custom">
              SPX envisions an Africa where people, institutions, and markets thrive 
              through inclusive growth, clean energy access, resilient food systems, 
              and innovation-driven economic transformation.
            </p>
            <p className="text-justify-custom">
              The firm seeks to contribute to a continent shaped by African leadership, 
              strengthened by evidence, and powered by solutions that are practical, 
              scalable, and grounded in local realities.
            </p>
            <p className="text-justify-custom">
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

            <p className="text-justify-custom">
              SPX’s mission is to design and deliver integrated development 
              solutions that unlock opportunity, strengthen livelihoods, and 
              build resilient systems across Africa.
            </p>

            <ul className="space-y-4 list-decimal pl-6">
              <li>
                <strong>Applying Africa-led insight to development challenges</strong> : 
                Leveraging contextual understanding, local networks, and industry 
                experience to design solutions that are relevant, feasible, and sustainable.
              </li>

              <li>
                <strong>Integrating strategy, research, implementation, and innovation</strong> :  
                Creating a comprehensive development model that combines evidence, 
                design, field delivery, learning, and scale.
              </li>

              <li>
                <strong>Positioning clean energy as a driver of economic transformation</strong> : 
                Supporting households, farmers, and enterprises to adopt energy-powered 
                solutions that increase productivity and resilience.
              </li>

              <li>
                <strong>Strengthening agriculture and food systems</strong> : 
                Improving productivity, quality, and market access across rural value 
                chains through advisory and digital tools.
              </li>

              <li>
                <strong>Expanding opportunities for youth and communities</strong> :  
                Developing skills, entrepreneurship pathways, and sector-specific 
                training that increase employment and income.
              </li>

              <li>
                <strong>Advancing digital inclusion and market transparency</strong> :  
                Deploying digital platforms that connect farmers, MSMEs, and 
                institutions to information, markets, finance, and opportunities.
              </li>

              <li>
                <strong>Supporting climate resilience and circular economy models</strong> :  
                Promoting sustainable practices, waste-to-value innovations, and 
                environmentally sustainable systems.
              </li>

              <li>
                <strong>Strengthening institutions and governance systems</strong> : 
                Building the capacity of public and private institutions to deliver 
                and scale development initiatives.
              </li>
            </ul>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative w-full h-[420px] bg-muted rounded-xl overflow-hidden"
          >
            <Image
              src="/images/about/image1.webp"
              alt="Mission Image"
              fill
              className="object-cover opacity-90"
            />
          </motion.div>
        </div>

        {/* GUIDING PRINCIPLES */}
        <div className="bg-muted/30 p-12 rounded-2xl border">
          <h2 className="text-3xl font-semibold mb-8 text-center">What Guides SPX</h2>
          <div className="grid md:grid-cols-3 gap-8">
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">SPX’s Long-Term Aspiration</h2>
            <p className="text-lg text-muted-foreground">
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
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative w-full h-[300px] bg-muted rounded-xl overflow-hidden grayscale">
            <Image
              src="/images/xtras/image4.webp"
              alt="Long Term Aspiration"
              fill
              className="object-cover opacity-80"
            />
          </div>
        </div>

        {/* CTA BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center pb-20"
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
