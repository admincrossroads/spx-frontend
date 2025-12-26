"use client";

import { motion } from "framer-motion";
import { OptimizedImage } from "@/components/ui/optimized-image";
import Link from "next/link";
import ImageTextCard from "@/components/ui/image-text-card";

export default function Identity() {
  return (
    <div className="w-full">
      {/* HERO HEADER - Added background image */}
      <section className="relative h-[55vh] w-full">
        <OptimizedImage
          src="/images/about/image2.webp"
          alt="Africa-Led Identity"
          fill
          className="object-cover brightness-[0.45]"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="main-container"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              An Africa-Led Institution
            </h1>
            <p className="text-xl opacity-90 leading-relaxed max-w-4xl mx-auto">
              Built for Africa’s priorities, with localized knowledge of the 
              continent’s systems, markets, governance and people.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="main-container space-y-16 mt-16">

        {/* SECTION 1 — AFRICA-LED PRINCIPLE */}
        <ImageTextCard
          image={{
            src: "/images/xtras/image2.webp",
            alt: "Africa-Led Identity",
          }}
          title="Africa-Led at the Core"
          content={
            <>
              <p>
                With a strong focus on realistic solutions, SPX approaches development 
                with an Africa-first view that is shaped by real experience and is 
                grounded in local realities. As global the development landscape shifts, 
                and traditional implementing partners retreat, SPX represents a new 
                generation of Africa-based partners able to deliver with precision 
                and reliability.
              </p>
              <p>
                SPX's identity is founded on the principle that home-grown institutions 
                must lead Africa's growth. Our leadership has strong localized knowledge 
                and vast experience working across Ethiopia's agricultural, energy, 
                and innovation sectors.
              </p>
            </>
          }
          imagePosition="right"
          imageSize="large"
        />

        {/* SECTION 2 — ROOTED IN CONTEXT */}
        <ImageTextCard
          image={{
            src: "/images/xtras/image6.webp",
            alt: "Rooted in Context",
          }}
          title="Rooted in African Realities"
          content={
            <>
              <p>
                SPX's approach is anchored in first-hand understanding of the realities 
                that shape development outcomes in Africa:
              </p>
              <ul className="list-disc pl-6 space-y-3 my-4">
                <li>Community dynamics and social structures</li>
                <li>Market incentives and behavior</li>
                <li>Agricultural production systems</li>
                <li>Political economy considerations</li>
                <li>Cultural norms and adoption patterns</li>
                <li>Regulatory systems and institutional constraints</li>
              </ul>
              <p>
                Rather than interpreting Africa from a distance, SPX engages directly 
                with people, sectors, and systems—designing interventions that work in 
                practice, not just in theory.
              </p>
            </>
          }
          imagePosition="left"
          imageSize="full"
        />

        {/* SECTION 3 — LOCAL INSIGHT + GLOBAL STANDARDS */}
        <ImageTextCard
          image={{
            src: "/images/xtras/image8.webp",
            alt: "Global Standards",
          }}
          title="Local Insight, Global Standards"
          content={
            <>
              <p>
                SPX combines local understanding with international-level analytical, 
                operational, and strategic capability. The organization's leadership 
                has steered complex ventures in:
              </p>
              <ul className="list-disc pl-6 space-y-3 my-4">
                <li>Agribusiness & agricultural operations</li>
                <li>Ecotourism & hospitality</li>
                <li>Media & communications</li>
                <li>Digital technology platforms</li>
                <li>Renewable energy systems</li>
                <li>Skills development & applied science</li>
              </ul>
              <p>
                This blended experience strengthens SPX's ability to bridge African 
                realities with global best practice.
              </p>
            </>
          }
          imagePosition="right"
          imageSize="large"
        />

        {/* WHAT MAKES SPX DISTINCT */}
        <div className="bg-muted/30 p-8 lg:p-12 rounded-2xl border">
          <h2 className="text-3xl font-semibold mb-8 text-center">What Makes SPX Distinct</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Africa-Led Insight",
                desc: "An institution built in Africa, by Africans, for Africa."
              },
              {
                title: "Integrated Model",
                desc: "Strategy + research + implementation + innovation within one organization."
              },
              {
                title: "Operational Depth",
                desc: "Proven ability to work in rural, peri-urban, and hard-to-reach environments."
              },
              {
                title: "Innovation Engine",
                desc: "The Spiral Innovation Club, which incubates African ideas and helps them scale."
              },
              {
                title: "Energy as a Development Enabler",
                desc: "A commitment to using clean energy as a driver of development, agriculture, skills building, and climate resilience."
              },
              {
                title: "Systems Thinking",
                desc: "Approaches that focus on long-term transformation, not just short-term project outputs."
              }
            ].map((item) => (
              <div key={item.title} className="space-y-3">
                <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4 — NETWORKS + ACCESS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-lg leading-relaxed text-justify space-y-4"
        >
          <h2 className="text-3xl font-semibold text-center">
            Trusted Local Networks
          </h2>

          <p className="text-justify-custom">
            SPX’s deep roots in Ethiopia provide strong relationships with farmers, 
            cooperatives, community leaders, public institutions, private-sector actors, 
            skills institutions, innovators, and sector experts. These networks enable 
            SPX to mobilize quickly, coordinate effectively, and deliver programs with 
            local legitimacy.
          </p>
        </motion.div>

        {/* SECTION 5 — CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center pb-12"
        >
          <h3 className="text-2xl font-semibold mb-4">
            Learn How Our Identity Shapes Our Work
          </h3>
          <Link
            href="/approach/advisory"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-all"
          >
            Explore Our Approach
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
