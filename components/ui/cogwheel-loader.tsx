"use client";

import { useId } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";

interface CogwheelLoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function CogwheelLoader({ size = "md", className = "" }: CogwheelLoaderProps) {
  // Generate unique IDs for gradients to avoid conflicts
  const uniqueId = useId();
  const outerGradientId = `outerGradient-${uniqueId}`;
  const innerGradientId = `innerGradient-${uniqueId}`;
  
  // Base rotation values (continuous)
  const baseOuterRotation = useMotionValue(0);
  const baseInnerRotation = useMotionValue(0);
  
  // Size configurations
  const sizeConfig = {
    sm: {
      container: "w-24 h-24",
      outer: { width: 96, height: 96, viewBox: "0 0 96 96", cx: 48, cy: 48, r: 24, strokeWidth: 6, dashArray: "6 6" },
      inner: { width: 72, height: 72, viewBox: "0 0 72 72", cx: 36, cy: 36, r: 18, strokeWidth: 5, dashArray: "4 4" },
      logo: "w-8 h-8",
      logoPadding: "p-1",
      logoImagePadding: "p-0.5",
      border: "border",
    },
    md: {
      container: "w-32 h-32",
      outer: { width: 128, height: 128, viewBox: "0 0 128 128", cx: 64, cy: 64, r: 32, strokeWidth: 8, dashArray: "10 8" },
      inner: { width: 96, height: 96, viewBox: "0 0 96 96", cx: 48, cy: 48, r: 24, strokeWidth: 6, dashArray: "8 6" },
      logo: "w-10 h-10",
      logoPadding: "p-1.5",
      logoImagePadding: "p-1",
      border: "border",
    },
    lg: {
      container: "w-48 h-48",
      outer: { width: 192, height: 192, viewBox: "0 0 192 192", cx: 96, cy: 96, r: 48, strokeWidth: 14, dashArray: "18 12" },
      inner: { width: 144, height: 144, viewBox: "0 0 144 144", cx: 72, cy: 72, r: 35, strokeWidth: 12, dashArray: "12 9" },
      logo: "w-14 h-14",
      logoPadding: "p-2",
      logoImagePadding: "p-1.5",
      border: "border-2",
    },
  };

  const config = sizeConfig[size];
  
  // Update rotation in animation frame - increased speed slightly
  useAnimationFrame(() => {
    // Increased rotation speed: ~4.8 degrees per second (was 3.6)
    const rotationSpeed = 0.08; // degrees per frame (at 60fps) - increased from 0.06
    baseOuterRotation.set(baseOuterRotation.get() + rotationSpeed);
    baseInnerRotation.set(baseInnerRotation.get() - rotationSpeed);
  });

  return (
    <div className={`relative ${config.container} ${className}`}>
      {/* Outer Cogwheel - Dashed Circle */}
      <motion.svg
        width={config.outer.width}
        height={config.outer.height}
        viewBox={config.outer.viewBox}
        className="absolute inset-0"
        style={{ rotate: baseOuterRotation }}
      >
        <defs>
          <linearGradient id={outerGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <circle
          cx={config.outer.cx}
          cy={config.outer.cy}
          r={config.outer.r}
          fill="none"
          stroke={`url(#${outerGradientId})`}
          strokeWidth={config.outer.strokeWidth}
          strokeDasharray={config.outer.dashArray}
        />
      </motion.svg>

      {/* Inner Cogwheel - Dashed Circle */}
      <motion.svg
        width={config.inner.width}
        height={config.inner.height}
        viewBox={config.inner.viewBox}
        className="absolute inset-0 m-auto"
        style={{ rotate: baseInnerRotation }}
      >
        <defs>
          <linearGradient id={innerGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <circle
          cx={config.inner.cx}
          cy={config.inner.cy}
          r={config.inner.r}
          fill="none"
          stroke={`url(#${innerGradientId})`}
          strokeWidth={config.inner.strokeWidth}
          strokeDasharray={config.inner.dashArray}
        />
      </motion.svg>

      {/* SPX Logo in Center */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className={`relative ${config.logo} bg-background/95 rounded-full ${config.logoPadding} shadow-xl ${config.border} border-primary/20`}>
          <Image
            src="/logos/SPX.png"
            alt="SPX Logo"
            fill
            className={`object-contain ${config.logoImagePadding}`}
          />
        </div>
      </motion.div>
    </div>
  );
}

