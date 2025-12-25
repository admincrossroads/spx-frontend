"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useContactModal } from "@/lib/contexts/ContactModalContext";

export default function PartnersAndAlliances() {
  const { openModal } = useContactModal();

  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative h-[55vh] w-full">
        <Image
          src="/images/about/image3.webp"
          alt="Partners & Alliances"
          fill
          className="object-cover brightness-[0.65]"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
          <div className="main-container">
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
              className="mt-4 max-w-3xl mx-auto text-lg md:text-xl"
            >
              SPX works with organizations that share a commitment to inclusive and 
              sustainable development in Africa. Its partnerships span the public 
              sector, private sector, development community, research institutions, 
              and innovation ecosystems.
            </motion.p>
          </div>
        </div>
      </section>

      {/* SECTION 1 — DEVELOPMENT PARTNERS */}
      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Development Partnerships</h2>
            <p className="text-justify-custom text-muted-foreground mb-6">
              SPX collaborates with international development programs and global 
              initiatives to design, test, and deliver solutions that are 
              evidence-based and responsive to real needs.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium">
              {[
                "Clean energy access",
                "Agricultural transformation",
                "Youth employment & skills",
                "Digital inclusion",
                "Climate resilience",
                "Business development",
                "Innovation & applied science",
                "Market systems development"
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/images/xtras/image12.webp"
              alt="Development Partnerships"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2 — PUBLIC SECTOR */}
      <section className="section-py bg-muted/40">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-xl overflow-hidden shadow-md order-2 md:order-1">
            <Image
              src="/images/xtras/image15.webp"
              alt="Public Sector Collaboration"
              fill
              className="object-cover"
            />
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-semibold mb-6">Public Sector Collaboration</h2>
            <p className="text-justify-custom text-muted-foreground mb-6">
              We work closely with national and local institutions across Ethiopia 
              to support policy implementation, institutional capacity building, 
              and grassroots program delivery.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium">
              {[
                "Policy implementation",
                "Institutional building",
                "Local governance",
                "Grassroots delivery",
                "Technical advisory",
                "Market & sector development",
                "Renewable energy systems"
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 3 — PRIVATE SECTOR */}
      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Private-Sector Engagement</h2>
            <p className="text-justify-custom text-muted-foreground mb-6">
              SPX collaborates with companies to understand market incentives, 
              value-chain dynamics, and investment opportunities, creating solutions 
              that are both viable and scalable.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium">
              {[
                "Agriculture & agribusiness",
                "Energy & renewables",
                "Digital technology",
                "Media & communications",
                "Commercial farming",
                "Supply chain & logistics",
                "Market development & trade"
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/images/xtras/image10.webp"
              alt="Private Sector Engagement"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION 4 — ACADEMIC & RESEARCH */}
      <section className="section-py bg-muted/40">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-xl overflow-hidden shadow-md order-2 md:order-1">
            <Image
              src="/images/about/image6.webp"
              alt="Academic & Research Collaboration"
              fill
              className="object-cover"
            />
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-semibold mb-6">Academic & Research Collaboration</h2>
            <p className="text-justify-custom text-muted-foreground mb-6">
              We engage with research institutions and technical organizations to 
              gain the evidence and perspective required to develop meaningful solutions.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium">
              {[
                "Applied science",
                "Microbiology & compost",
                "Climate-smart agriculture",
                "Digital ecosystems",
                "Financial sector analysis",
                "Policy analysis",
                "Pilot design & evaluation"
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 5 — INNOVATION ECOSYSTEM */}
      <section className="section-py">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Innovation Ecosystem Participation</h2>
            <p className="text-justify-custom text-muted-foreground mb-6">
              SPX engages in Africa’s innovation ecosystem through the Spiral 
              Innovation Club, supporting start-ups and advancing digital tools.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium">
              {[
                "Supporting start-ups",
                "Innovation challenges",
                "Facilitating market testing",
                "Advancing digital tools",
                "Entrepreneurs & youth engagement"
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/images/xtras/image8.webp"
              alt="Innovation Ecosystem"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION 6 — MEDIA & DIALOGUE */}
      <section className="section-py bg-muted/40">
        <div className="main-container grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-xl overflow-hidden shadow-md order-2 md:order-1">
            <Image
              src="/images/about/image5.webp"
              alt="Media & Dialogue"
              fill
              className="object-cover"
            />
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-semibold mb-6">Media & Dialogue Platforms</h2>
            <p className="text-justify-custom text-muted-foreground mb-6">
              We collaborate on platforms that enhance dialogue on the economy, 
              elevating national conversations on development priorities.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium">
              {[
                "Economic dialogue",
                "Public policy discussions",
                "Industry engagements",
                "Thought leadership",
                "Televised panel discussions",
                "Business intelligence"
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WHY PARTNERSHIPS MATTER */}
      <section className="section-py">
        <div className="main-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-8">Why Partnerships Matter to SPX</h2>
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              {[
                "Deliver comprehensive solutions",
                "Mobilize resources and networks",
                "Coordinate multi-stakeholder programs",
                "Engage with communities meaningfully",
                "Produce high-quality research",
                "Strengthen public and private institutions",
                "Scale impactful innovations",
                "Contribute to national development agendas"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border">
                  <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py text-center">
        <div className="main-container">
          <h2 className="text-3xl font-semibold mb-4">
            Partner with SPX
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            SPX works with ambitious partners committed to Africa’s future.
            Explore how we can collaborate across agriculture, energy, digital
            innovation, climate resilience, and youth livelihoods.
          </p>

          <Button size="lg" className="rounded-full px-10" onClick={openModal}>
            Contact Us
          </Button>
        </div>
      </section>

    </div>
  );
}
