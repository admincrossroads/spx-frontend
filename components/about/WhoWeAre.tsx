"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function WhoWeAre() {
  return (
    <div className="w-full">
      {/* HERO */}
      <section className="relative h-[55vh] w-full overflow-hidden">
        <Image
          src="/images/about/image4.webp"
          alt="Who We Are"
          fill
          className="object-cover brightness-[0.55]"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
          <div className="main-container">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-semibold"
            >
              Who We Are
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-4 max-w-2xl mx-auto text-lg md:text-xl opacity-90"
            >
              An Africa-led development institution committed to designing and delivering
              practical solutions that strengthen livelihoods and build resilient systems.
            </motion.p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="section-py">
        <div className="main-container">

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* TEXT BLOCK */}
            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-justify-custom">
                SPX is an Africa-focused research, strategy, and implementation firm 
                working in energy, agriculture, economic transformation and digital 
                systems. Based in Ethiopia, SPX combines on-the-ground experience with 
                strong analytics and project execution. We help partners drive 
                inclusive and sustainable development across the continent.
              </p>

              <p className="text-justify-custom">
                SPX brings advisory work, applied research, program delivery, 
                innovation support, and enterprise development together under one roof. 
                This integrated approach allows SPX to move smoothly from insight to 
                design to implementation, making sure good ideas turn into real 
                results on the ground.
              </p>
            </div>
            
            {/* IMAGE AND LOOKING AHEAD */}
            <div className="flex flex-col items-center">
              {/* IMAGE PLACEHOLDER */}
              <div className="relative w-full h-[320px] bg-muted rounded-xl shadow-lg flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/xtras/image9.webp"
                  alt="Team Collaboration"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Looking Ahead */}
              <div className="border-l-4 pl-4 border-primary mt-6 w-full">
                <h3 className="text-xl font-semibold mb-2">Looking Ahead</h3>
                <p className="text-justify-custom">
                  SPX is dedicated to contributing to the next generation of development 
                  institutions. Institutions that are technically rigorous, connected 
                  to local communities and are built for the long-run. SPX continues to 
                  expand its work across energy, agriculture, employment, digital 
                  transformation, and climate resilience, partnering with organizations 
                  that share its commitment to a more inclusive and sustainable Africa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py text-center px-6">
        <div className="main-container">
          <h2 className="text-3xl font-semibold mb-4">
            Learn More About Our Organization
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-lg">
            Explore our vision, mission, leadership, and Africa-led identity.
          </p>
          <Link href="/about/vision-mission">
            <Button size="lg" className="rounded-full px-10">
              Our Vision & Mission
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
