"use client";

import { motion } from "framer-motion";

export default function SPXLoader() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <div className="relative w-32 h-32 flex items-center justify-center">

        {/* CIRCLE ANIMATION */}
        <motion.svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          className="absolute"
        >
          <motion.circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="#000000"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.svg>

        {/* SPX TEXT */}
        <motion.div
          className="text-3xl font-bold text-foreground"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.6,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          SPX
        </motion.div>

      </div>
    </div>
  );
}
