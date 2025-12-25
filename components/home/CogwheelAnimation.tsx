"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";
import Image from "next/image";

export default function CogwheelAnimation() {
  const { scrollYProgress } = useScroll();
  
  // Base slow rotation values (continuous)
  const baseOuterRotation = useMotionValue(0);
  const baseInnerRotation = useMotionValue(0);
  
  // Scroll-based rotation (speeds up/down based on scroll)
  const scrollOuterRotation = useTransform(scrollYProgress, [0, 1], [0, 1080]); // 3 full rotations
  const scrollInnerRotation = useTransform(scrollYProgress, [0, 1], [0, -1080]); // 3 full rotations counter-clockwise
  
  // Add spring physics for smooth inertia effect on scroll rotation
  const scrollOuterSpring = useSpring(scrollOuterRotation, {
    stiffness: 50,
    damping: 30,
    mass: 1,
  });
  const scrollInnerSpring = useSpring(scrollInnerRotation, {
    stiffness: 50,
    damping: 30,
    mass: 1,
  });
  
  // Combined rotation values
  const outerRotation = useMotionValue(0);
  const innerRotation = useMotionValue(0);
  
  // Update combined rotation in animation frame
  useAnimationFrame(() => {
    // Slow base rotation: ~3.6 degrees per second
    const rotationSpeed = 0.06; // degrees per frame (at 60fps)
    baseOuterRotation.set(baseOuterRotation.get() + rotationSpeed);
    baseInnerRotation.set(baseInnerRotation.get() - rotationSpeed);
    
    // Combine base rotation with scroll rotation
    outerRotation.set(baseOuterRotation.get() + scrollOuterSpring.get());
    innerRotation.set(baseInnerRotation.get() + scrollInnerSpring.get());
  });

  return (
    <div className="fixed pointer-events-none z-50">
      {/* Desktop: Bottom Center */}
      <div className="hidden lg:block fixed bottom-8 left-1/2 -translate-x-1/2">
        <div className="relative w-48 h-48">
          {/* Outer Cogwheel - Dashed Circle */}
          <motion.svg
            width="192"
            height="192"
            viewBox="0 0 192 192"
            className="absolute inset-0"
            style={{ rotate: outerRotation }}
          >
            <defs>
              <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <circle
              cx="96"
              cy="96"
              r="48"
              fill="none"
              stroke="url(#outerGradient)"
              strokeWidth="14"
              strokeDasharray="18 12"
            />
          </motion.svg>

          {/* Inner Cogwheel - Dashed Circle */}
          <motion.svg
            width="144"
            height="144"
            viewBox="0 0 144 144"
            className="absolute inset-0 m-auto"
            style={{ rotate: innerRotation }}
          >
            <defs>
              <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <circle
              cx="72"
              cy="72"
              r="35"
              fill="none"
              stroke="url(#innerGradient)"
              strokeWidth="12"
              strokeDasharray="12 9"
            />
          </motion.svg>

          {/* SPX Logo in Center */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-14 h-14 bg-background/95 rounded-full p-2 shadow-xl border-2 border-primary/20">
              <Image
                src="/logos/SPX.png"
                alt="SPX Logo"
                fill
                className="object-contain p-1.5"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile: Bottom Center */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2">
        <div className="relative w-24 h-24">
          {/* Outer Cogwheel - Dashed Circle */}
          <motion.svg
            width="96"
            height="96"
            viewBox="0 0 96 96"
            className="absolute inset-0"
            style={{ rotate: outerRotation }}
          >
            <defs>
              <linearGradient id="outerGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <circle
              cx="48"
              cy="48"
              r="24"
              fill="none"
              stroke="url(#outerGradientMobile)"
              strokeWidth="6"
              strokeDasharray="6 6"
            />
          </motion.svg>

          {/* Inner Cogwheel - Dashed Circle */}
          <motion.svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            className="absolute inset-0 m-auto"
            style={{ rotate: innerRotation }}
          >
            <defs>
              <linearGradient id="innerGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <circle
              cx="36"
              cy="36"
              r="18"
              fill="none"
              stroke="url(#innerGradientMobile)"
              strokeWidth="5"
              strokeDasharray="4 4"
            />
          </motion.svg>

          {/* SPX Logo in Center */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-8 h-8 bg-background/95 rounded-full p-1 shadow-lg border border-primary/20">
              <Image
                src="/logos/SPX.png"
                alt="SPX Logo"
                fill
                className="object-contain p-0.5"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

