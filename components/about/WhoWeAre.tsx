"use client";

import { OptimizedImage } from "@/components/ui/optimized-image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ImageTextCard from "@/components/ui/image-text-card";

export default function WhoWeAre() {
  return (
    <div className="w-full">
      {/* HERO */}
      <section className="relative h-[55vh] w-full overflow-hidden">
        <OptimizedImage
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
        <div className="main-container space-y-16">
          <ImageTextCard
            image={{
              src: "/images/xtras/image9.webp",
              alt: "Team Collaboration",
            }}
            content={
              <>
                <p>
                  SPX is an Africa-focused research, strategy, and implementation firm 
                  working in energy, agriculture, economic transformation and digital 
                  systems. Based in Ethiopia, SPX combines on-the-ground experience with 
                  strong analytics and project execution. We help partners drive 
                  inclusive and sustainable development across the continent.
                </p>
                <p>
                  SPX brings advisory work, applied research, program delivery, 
                  innovation support, and enterprise development together under one roof. 
                  This integrated approach allows SPX to move smoothly from insight to 
                  design to implementation, making sure good ideas turn into real 
                  results on the ground.
                </p>
              </>
            }
            imagePosition="right"
            imageSize="medium"
          />

          {/* Looking Ahead */}
          <div className="border-l-4 pl-6 border-primary">
            <h3 className="text-xl font-semibold mb-4">Looking Ahead</h3>
            <p className="text-justify-custom text-muted-foreground">
              SPX is dedicated to contributing to the next generation of development 
              institutions. Institutions that are technically rigorous, connected 
              to local communities and are built for the long-run. SPX continues to 
              expand its work across energy, agriculture, employment, digital 
              transformation, and climate resilience, partnering with organizations 
              that share its commitment to a more inclusive and sustainable Africa.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py text-center">
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
