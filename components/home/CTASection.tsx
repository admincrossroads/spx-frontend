"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useContactModal } from "@/lib/contexts/ContactModalContext";

export default function CTASection() {
  const { openModal } = useContactModal();

  return (
    <section className="relative section-py overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/cta/cta-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative main-container text-white"
      >
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold mb-6">
            Ready to partner with SPX?
          </h2>
          <p className="text-white/90 text-lg mb-8 leading-relaxed">
            Whether designing a new initiative or strengthening ongoing work,
            SPX supports partners from strategy to delivery.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white !text-black w-full sm:w-[200px] rounded-full font-semibold" onClick={openModal}>
              Contact Us
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white/10 w-full sm:w-[200px] rounded-full font-semibold"
            >
              Download Overview
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
  