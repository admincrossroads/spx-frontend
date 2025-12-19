"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function LeadershipAndTeamPage() {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative h-[60vh] w-full">
        <Image
          src="/images/leadership.jpg"
          alt="SPX Leadership"
          fill
          className="object-cover brightness-[0.55]"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-semibold"
          >
            Leadership & Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-4 max-w-2xl text-lg md:text-xl"
          >
            Combining private-sector insight, development expertise, and
            innovation leadership—anchored in an Africa-led identity.
          </motion.p>
        </div>
      </section>

      {/* FOUNDER BLOCK */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-6">Founding Leadership</h2>
          <p className="text-muted-foreground text-justify leading-relaxed">
            SPX’s founder has led and overseen ventures across Ethiopia’s
            agribusiness, ecotourism, media, digital technology, enterprise
            management, and training systems. This diverse portfolio creates a
            grounded understanding of institutional dynamics, regulatory
            environments, and economic systems—anchoring SPX’s Africa-first approach.
          </p>
        </div>

        <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/images/founder.jpg"
            alt="Founder"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* SENIOR MANAGEMENT */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative h-80 rounded-lg overflow-hidden shadow-lg order-2 md:order-1">
          <Image
            src="/images/senior-management.jpg"
            alt="Senior Management"
            fill
            className="object-cover"
          />
        </div>

        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-semibold mb-6">Senior Management</h2>
          <p className="text-muted-foreground text-justify leading-relaxed">
            SPX’s senior management brings deep technical expertise across large
            commercial farming operations, mechanized agricultural systems,
            biomass energy, renewable energy operations, logistics, and multi-site
            program management—combining international knowledge with local
            operational insight.
          </p>
        </div>
      </section>

      {/* TEAM CAPABILITIES GRID */}
      <section className="py-20 px-6 md:px-16 bg-muted/40">
        <h2 className="text-3xl font-semibold mb-12 text-center">
          Technical Team Capabilities
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            "Applied research & sector analysis",
            "Market systems & value-chain development",
            "Clean energy & productive-use technologies",
            "Agronomy & agricultural advisory",
            "Digital platform design & deployment",
            "Monitoring, evaluation & learning",
            "Circular economy & applied science innovations",
            "Community engagement & field coordination",
            "Enterprise development & incubation"
          ].map((item) => (
            <div
              key={item}
              className="p-6 rounded-xl bg-white shadow hover:shadow-md transition"
            >
              <p className="text-lg font-medium">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INNOVATION SECTION */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-6">
            Innovation, Science & Digital Specialists
          </h2>
          <p className="text-muted-foreground text-justify leading-relaxed">
            Through the Spiral Innovation Club, SPX brings capabilities in applied
            microbiology, waste-to-value technologies, digital agricultural tools,
            innovation management, prototyping, and startup incubation—translating
            scientific and digital ideas into scalable development solutions.
          </p>
        </div>

        <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/images/innovation-team.jpg"
            alt="Innovation Team"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* FIELD TEAM */}
      <section className="py-20 px-6 md:px-16 bg-muted/40 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/images/field-team.jpg"
            alt="Field Team"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6">Field Coordinators</h2>
          <p className="text-muted-foreground text-justify leading-relaxed">
            SPX’s field team works closely with farmers, cooperatives, youth
            groups, micro-enterprises, and local institutions—ensuring that
            programs are grounded in community realities and implemented with
            sensitivity and practicality.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-semibold mb-4">
          Be part of Africa’s next-generation development institution
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Explore opportunities to work with SPX across strategy, research,
          implementation, innovation, and community-driven development.
        </p>

        <Link href="/contact">
          <Button size="lg" className="rounded-full px-10">
            Contact Us
          </Button>
        </Link>
      </section>
    </div>
  )
}
