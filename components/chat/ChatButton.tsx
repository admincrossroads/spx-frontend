"use client";

import { useState, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useId } from "react";

interface ChatButtonProps {
  onClick: () => void;
}

export default function ChatButton({ onClick }: ChatButtonProps) {
  const uniqueId = useId();
  const outerGradientId = `chat-outerGradient-${uniqueId}`;
  const innerGradientId = `chat-innerGradient-${uniqueId}`;
  
  // Base rotation values (continuous)
  const baseOuterRotation = useMotionValue(0);
  const baseInnerRotation = useMotionValue(0);
  
  // Text toggle state
  const [displayText, setDisplayText] = useState("SPX");
  
  // Toggle text every 5 seconds (slower transition)
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText((prev) => (prev === "SPX" ? "CHAT" : "SPX"));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Update rotation in animation frame
  useAnimationFrame(() => {
    // Rotation speed: ~4.8 degrees per second (same as loader)
    const rotationSpeed = 0.08; // degrees per frame (at 60fps)
    baseOuterRotation.set(baseOuterRotation.get() + rotationSpeed);
    baseInnerRotation.set(baseInnerRotation.get() - rotationSpeed);
  });

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 pointer-events-auto cursor-pointer hover:scale-105 transition-transform duration-200"
      aria-label="Open chat"
    >
      <div className="relative w-32 h-32">
        {/* Outer Cogwheel - Dashed Circle - Matching loader md size */}
        <motion.svg
          width="128"
          height="128"
          viewBox="0 0 128 128"
          className="absolute inset-0"
          style={{ 
            rotate: baseOuterRotation
          }}
        >
          <defs>
            <linearGradient id={outerGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <circle
            cx="64"
            cy="64"
            r="32"
            fill="none"
            stroke={`url(#${outerGradientId})`}
            strokeWidth="8"
            strokeDasharray="10 8"
          />
        </motion.svg>

        {/* Inner Cogwheel - Dashed Circle - Matching loader md size */}
        <motion.svg
          width="96"
          height="96"
          viewBox="0 0 96 96"
          className="absolute inset-0 m-auto"
          style={{ 
            rotate: baseInnerRotation
          }}
        >
          <defs>
            <linearGradient id={innerGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <circle
            cx="48"
            cy="48"
            r="24"
            fill="none"
            stroke={`url(#${innerGradientId})`}
            strokeWidth="6"
            strokeDasharray="8 6"
          />
        </motion.svg>

        {/* Text in Center - Fixed, not rotating - Same size as SPX logo in loader */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div
            key={displayText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative w-10 h-10 bg-background/95 rounded-full p-1.5 shadow-xl border border-primary/20 flex items-center justify-center"
          >
            <span className="text-[10px] font-bold text-primary leading-none">
              {displayText}
            </span>
          </motion.div>
        </div>
      </div>
    </button>
  );
}

