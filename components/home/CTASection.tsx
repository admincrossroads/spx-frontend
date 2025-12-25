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
        className="relative container mx-auto px-6 md:px-6 min-[1300px]:px-4 text-white"
      >
        <div className="max-w-3xl">
          {/* Elegant divider line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="h-[2px] bg-white mb-6"
          />
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
            Ready to partner with SPX?
          </h2>
          <p className="text-white/90 text-lg md:text-xl mb-10 leading-relaxed drop-shadow-md">
            Whether designing a new initiative or strengthening ongoing work,
            SPX supports partners from strategy to delivery.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-white !text-black w-full sm:w-[200px] rounded-full font-semibold px-8 py-6 text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300" 
              onClick={openModal}
            >
              Contact Us
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white bg-transparent hover:bg-white/10 w-full sm:w-[200px] rounded-full font-semibold px-8 py-6 text-base transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Download Overview
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
  