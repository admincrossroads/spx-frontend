"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function PartnersAndAlliances() {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative h-[55vh] w-full">
        <Image
          src="/images/partners.jpg"
          alt="Partners & Alliances"
          fill
          className="object-cover brightness-[0.65]"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-semibold"
          >
            Partners & Alliances
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-4 max-w-2xl text-lg md:text-xl"
          >
            Collaboration is at the heart of SPX’s work — bringing together
            governments, private-sector actors, research institutions, and
            community organizations to deliver scalable development outcomes.
          </motion.p>
        </div>
      </section>

      {/* SECTION 1 — INSTITUTIONAL PARTNERS */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">

        {/* TEXT */}
        <div>
          <h2 className="text-3xl font-semibold mb-6">Institutional Partnerships</h2>
          <p className="text-muted-foreground leading-relaxed text-justify">
            SPX maintains strong relationships with national and regional
            government institutions, enabling alignment with policy priorities,
            coordination across sectors, and smooth implementation of
            development initiatives. These partnerships strengthen SPX’s
            ability to work within existing systems and support public-sector
            capacity, planning, and delivery.
          </p>
        </div>

        {/* IMAGE */}
        <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/institutional-partners.jpg"
            alt="Government Partnerships"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* SECTION 2 — PRIVATE-SECTOR ALLIANCES */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">

        {/* IMAGE LEFT */}
        <div className="relative h-80 rounded-xl overflow-hidden shadow-md order-2 md:order-1">
          <Image
            src="/images/private-sector.jpg"
            alt="Private Sector Alliances"
            fill
            className="object-cover"
          />
        </div>

        {/* TEXT RIGHT */}
        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-semibold mb-6">Private-Sector Alliances</h2>
          <p className="text-muted-foreground leading-relaxed text-justify">
            SPX collaborates with agribusinesses, renewable energy companies,
            technology firms, commercial farms, cooperatives, and enterprises
            across Ethiopia. These alliances bring market expertise,
            innovation pathways, and operational know-how that enhance the
            effectiveness and scalability of SPX’s programs in agriculture,
            energy, and digital systems.
          </p>
        </div>
      </section>

      {/* SECTION 3 — COMMUNITY & GRASSROOTS PARTNERS */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center bg-muted/40">
        
        {/* TEXT */}
        <div>
          <h2 className="text-3xl font-semibold mb-6">Community Partners</h2>
          <p className="text-muted-foreground leading-relaxed text-justify">
            At the grassroots level, SPX works closely with farmers,
            cooperatives, youth groups, women-led enterprises, and local
            institutions. These community partnerships ensure that programs
            are grounded in lived realities and that innovation, training,
            and market tools are accessible to the people who need them most.
          </p>
        </div>

        {/* IMAGE */}
        <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/community-partners.jpg"
            alt="Community Partners"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* SECTION 4 — RESEARCH, SCIENCE & INNOVATION PARTNERS */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">

        {/* IMAGE */}
        <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/research-partners.jpg"
            alt="Research and Innovation Partners"
            fill
            className="object-cover"
          />
        </div>

        {/* TEXT */}
        <div>
          <h2 className="text-3xl font-semibold mb-6">
            Research & Innovation Collaborators
          </h2>
          <p className="text-muted-foreground leading-relaxed text-justify">
            SPX partners with universities, applied science labs, innovation
            hubs, and technical institutions to develop context-driven
            research, digital tools, scientific solutions, and prototype
            technologies. Through the Spiral Innovation Club, SPX works with
            innovators in applied microbiology, digital agriculture, climate
            solutions, and circular economy initiatives.
          </p>
        </div>
      </section>

      {/* SECTION 5 — DEVELOPMENT & DONOR PARTNERS */}
      <section className="py-20 px-6 md:px-16 bg-muted/40">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Development Partners
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed text-justify">
          SPX collaborates with development organizations, foundations, and
          donors to co-design integrated programs, support innovation
          pipelines, accelerate productive-use energy solutions, and scale
          agricultural and digital systems. These alliances enable SPX to
          deliver evidence-driven, practical, and high-impact work across
          Africa’s development landscape.
        </p>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-semibold mb-4">
          Partner with SPX
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          SPX works with ambitious partners committed to Africa’s future.
          Explore how we can collaborate across agriculture, energy, digital
          innovation, climate resilience, and youth livelihoods.
        </p>

        <Link href="/contact">
          <Button size="lg" className="rounded-full px-10">
            Contact Us
          </Button>
        </Link>
      </section>

    </div>
  );
}
