"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useContactModal } from "@/lib/contexts/ContactModalContext"

export default function LeadershipAndTeamPage() {
  const { openModal } = useContactModal()

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
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
          <div className="main-container">
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
              className="mt-4 max-w-2xl mx-auto text-lg md:text-xl"
            >
              SPX’s leadership team combines experience from the private sector, 
              development work, innovation, and hands-on operations.
            </motion.p>
          </div>
        </div>
      </section>

      {/* FOUNDER BLOCK */}
      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Cross-Sector Leadership</h2>
            <p className="text-justify-custom text-muted-foreground">
              SPX’s founder has established and led business across various industries 
              including ecotourism, media, agribusiness, and digital technologies. This 
              mix of experience gives SPX a unique understanding of Ethiopia’s markets, 
              regulatory environment, and institutions, strengthening the firm’s ability 
              to design feasible and scalable interventions.
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
        </div>
      </section>

      {/* SENIOR MANAGEMENT */}
      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-lg overflow-hidden shadow-lg order-2 md:order-1">
            <Image
              src="/images/senior-management.jpg"
              alt="Senior Management"
              fill
              className="object-cover"
            />
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-semibold mb-6">International Expertise</h2>
            <p className="text-justify-custom text-muted-foreground">
              SPX’s senior team brings experience in large scale agricultural 
              operations across Asia and Africa including mechanized farming, biomass 
              energy production and renewable energy systems. This depth of knowledge 
              informs SPX’s work across agriculture, energy, and rural economic development.
            </p>
          </div>
        </div>
      </section>

      {/* TEAM CAPABILITIES GRID */}
      <section className="section-py bg-muted/40 text-center">
        <div className="main-container">
          <h2 className="text-3xl font-semibold mb-6">
            Collective Technical Capability
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-12 text-lg">
            The team at SPX has deep expertise in market systems development, clean energy, 
            agricultural transformation, digital platform development, public-private 
            coordination and applied research. This collective expertise gives the firm 
            the ability to work effectively from policy-level advisory to field-level implementation.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
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
        </div>
      </section>

      {/* INNOVATION SECTION */}
      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">
              Innovation, Science & Digital Specialists
            </h2>
            <p className="text-justify-custom text-muted-foreground">
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
        </div>
      </section>

      {/* FIELD TEAM */}
      <section className="section-py bg-muted/40">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
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
            <p className="text-justify-custom text-muted-foreground">
              SPX’s field team works closely with farmers, cooperatives, youth
              groups, micro-enterprises, and local institutions—ensuring that
              programs are grounded in community realities and implemented with
              sensitivity and practicality.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py text-center">
        <div className="main-container">
          <h2 className="text-3xl font-semibold mb-4">
            Be part of Africa’s next-generation development institution
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Explore opportunities to work with SPX across strategy, research,
            implementation, innovation, and community-driven development.
          </p>

          <Button size="lg" className="rounded-full px-10" onClick={openModal}>
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  )
}
