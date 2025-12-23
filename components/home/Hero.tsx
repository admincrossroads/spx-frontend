"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useContactModal } from "@/lib/contexts/ContactModalContext";

export default function Hero() {
  const { openModal } = useContactModal();
  const images = [
    "/images/Home-heros/hero-1.jpg",
    "/images/Home-heros/hero-2.jpg",
    "/images/Home-heros/hero-3.jpg",
  ];

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
    }),
    center: {
      x: "0%",
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
    }),
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* IMAGE SLIDER */}
      <div className="absolute inset-0 flex">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", duration: 1, ease: "easeInOut" },
            }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt="Hero Background"
              fill
              priority
              className="object-cover"
            />

            {/* DARKEN OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* TEXT BLOCK WITH GLASS EFFECT */}
      <div className="relative z-10 h-full flex items-center justify-center md:justify-start">
        <div className="container mx-auto px-4 w-full">

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="backdrop-blur-md bg-black/30 p-8 rounded-2xl shadow-xl border border-white/10 max-w-2xl mx-auto md:mx-0 text-center md:text-left"
          >
            <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
              Africa-Led Strategy, Research, and Innovation for Systems Change.
            </h1>

            <p className="mt-6 text-md text-white/90">
              SPX partners with governments, funders, and enterprises to design,
              test, and scale solutions that strengthen systems across Africa.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 max-w-sm mx-auto md:mx-0">
              <Button
                size="lg"
                className="bg-white !text-black hover:!text-white hover:bg-black/40 w-full font-semibold"
                style={{ color: '#000000' }}
                onClick={openModal}
              >
                Contact Us
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-white text-white bg-transparent w-full hover:text-black hover:bg-white/40"
                onClick={() => router.push('/projects')}
              >
                Explore Work
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="text-white/80 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.div>

    </section>
  );
}
