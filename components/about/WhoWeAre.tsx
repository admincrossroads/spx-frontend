"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function WhoWeAre() {
  return (
    <div className="w-full">
      {/* HERO */}
      <section className="relative h-[55vh] w-full">
        <Image
          src="/images/leadership.jpg"
          alt="Who We Are"
          fill
          className="object-cover brightness-[0.55]"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
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
            className="mt-4 max-w-2xl text-lg md:text-xl"
          >
            An Africa-led development institution committed to designing and delivering
            practical solutions that strengthen livelihoods and build resilient systems.
          </motion.p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20 px-6 md:px-16">
        <div className="container mx-auto max-w-6xl">

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* TEXT BLOCK */}
            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-justify">
                SPX is an Africa-led development institution committed to designing 
                and delivering practical solutions that strengthen livelihoods, 
                accelerate economic opportunity, and build resilient systems 
                across the continent. The organization brings together strategy, 
                research, field implementation, and innovation within one integrated 
                model—allowing ideas to move seamlessly from insight to execution 
                and scale.
              </p>

              <p className="text-justify">
                Grounded in Ethiopia and shaped by African leadership and contextual 
                expertise, SPX operates across sectors that define the region's 
                future: energy-enabled development, agriculture and food systems, 
                digital transformation, climate resilience, skills and employment, 
                and applied innovation.
              </p>

              <p className="text-justify">
                SPX works confidently in both policy-level advisory and field-level 
                delivery, combining multidisciplinary technical skills with 
                substantial operational capability. The firm's approach is informed 
                by a deep understanding of African markets, community realities, 
                institutional dynamics, and long-term system pathways.
              </p>
            </div>
            
            {/* IMAGE AND LOOKING AHEAD */}
            <div className="flex flex-col items-center">
              {/* IMAGE PLACEHOLDER */}
              <div className="w-full h-[420px] bg-muted rounded-xl shadow-lg flex items-center justify-center">
                <span className="text-muted-foreground">
                  Image Placeholder (Team / Field Work / Africa Map)
                </span>
              </div>
              {/* Looking Ahead */}
              <div className="border-l-4 pl-4 border-primary mt-6 w-full">
                <h3 className="text-xl font-semibold mb-2">Looking Ahead</h3>
                <p className="text-justify">
                  SPX is committed to contributing to Africa's next generation of 
                  development institutions—locally grounded, technically rigorous, 
                  operationally capable, and future-oriented. The organization 
                  continues to expand its work across energy, agriculture, 
                  employment, digital transformation, and climate resilience, 
                  partnering with organizations that share the vision of a more 
                  inclusive and sustainable Africa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-semibold mb-4">
          Learn More About Our Organization
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Explore our vision, mission, leadership, and Africa-led identity.
        </p>
        <Link href="/about/vision-mission">
          <Button size="lg" className="rounded-full px-10">
            Our Vision & Mission
          </Button>
        </Link>
      </section>
    </div>
  );
}
