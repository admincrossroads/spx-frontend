"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/cta/cta-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative container mx-auto px-6 max-w-3xl text-white">
        <h2 className="text-3xl font-semibold mb-4">
          Ready to partner with SPX?
        </h2>
        <p className="text-white/90 text-sm mb-6">
          Whether designing a new initiative or strengthening ongoing work,
          SPX supports partners from strategy to delivery.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="bg-white text-black w-full sm:w-[200px]">
            Contact Us
          </Button>
          <Button
            variant="outline"
            className="border-white text-white w-full sm:w-[200px]"
          >
            Download Overview
          </Button>
        </div>
      </div>
    </section>
  );
}
  