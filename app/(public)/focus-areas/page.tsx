import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function FocusAreas() {
  const areas = [
    { label: "Energy for Development", href: "/focus-areas/energy", img: "/images/focus/energy-hero.jpg" },
    { label: "Agriculture & Food Systems", href: "/focus-areas/agriculture", img: "/images/focus/agri-hero.jpg" },
    { label: "Employment & Skills", href: "/focus-areas/employment", img: "/images/focus/employment-hero.jpg" },
    { label: "Digital Transformation", href: "/focus-areas/digital", img: "/images/focus/digital-hero.jpg" },
    { label: "Climate & Circular Economy", href: "/focus-areas/climate", img: "/images/focus/climate-hero.jpg" },
    { label: "Governance & Institutions", href: "/focus-areas/governance", img: "/images/focus/governance-hero.jpg" },
  ];

  return (
    <div className="main-container section-py">
      <h1 className="text-4xl md:text-6xl font-semibold text-center mb-10">
        Focus Areas
      </h1>

      <p className="max-w-3xl mx-auto text-center text-muted-foreground text-lg mb-16">
        SPX strengthens systems across critical development sectors—energy, agriculture,
        employment, digital ecosystems, climate resilience, and governance—ensuring
        locally-led solutions and measurable impact.
      </p>

      <div className="grid md:grid-cols-3 gap-10">
        {areas.map((area) => (
          <Link key={area.href} href={area.href}>
            <div className="group cursor-pointer rounded-xl overflow-hidden shadow hover:shadow-lg transition">
              <div className="relative h-48">
                <Image
                  src={area.img}
                  alt={area.label}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold group-hover:text-primary transition">
                  {area.label}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
