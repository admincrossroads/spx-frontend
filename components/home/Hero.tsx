"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { OptimizedImage } from "@/components/ui/optimized-image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useContactModal } from "@/lib/contexts/ContactModalContext";

// Animated text component for letter-by-letter reveal
const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(" ");

  return (
    <h1 className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-2">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: wordIndex * 0.05 + charIndex * 0.02,
                ease: "easeOut",
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
};

export default function Hero() {
  const { openModal } = useContactModal();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const images = [
    "/images/hero/image1.webp",
    "/images/hero/image2.webp",
    "/images/hero/image3.webp",
    "/images/hero/image4.webp",
    "/images/hero/image5.webp",
    "/images/hero/image6.webp",
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
      opacity: 0,
    }),
    center: {
      x: "0%",
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-background"
    >
      {/* Hero Images Slider */}
      <div className="absolute inset-0">
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
              opacity: { duration: 0.8 },
            }}
            className="absolute inset-0"
          >
            <OptimizedImage
              src={images[index]}
              alt="Hero Background"
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Backdrop Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background/50" />
      
      {/* Additional overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/50" />

      {/* Split Screen Layout */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 h-full flex items-center"
      >
        {/* Content - Left aligned with navbar */}
        <div className="container mx-auto px-6 md:px-6 min-[1300px]:px-4 w-full">
          <div className="max-w-2xl">
            {/* Elegant divider line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60px" }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="h-[2px] bg-primary mb-8"
            />

            {/* Main Headline */}
            <div className="mb-6">
              <AnimatedText
                text="Africa-Led Strategy, Research, and Innovation for Systems Change."
                className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight drop-shadow-lg"
              />
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-10 drop-shadow-md"
            >
              SPX partners with governments, funders, and enterprises to design,
              test, and scale solutions that strengthen systems across Africa.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                onClick={openModal}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Contact Us
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
                className="group px-8 py-6 text-base font-semibold rounded-full border-2 hover:bg-foreground hover:text-background transition-all duration-300"
              >
                <Link href="/projects">
                  Explore Work
                  <motion.span
                    className="inline-block ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-foreground/60 cursor-pointer hover:text-foreground transition-colors"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.div>
    </section>
  );
}
