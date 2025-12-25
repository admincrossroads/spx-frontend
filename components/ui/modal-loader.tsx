"use client";

import { motion } from "framer-motion";
import SPXLoader from "./loader";

export default function ModalLoader() {
  return (
    <>
      {/* Backdrop with blur */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9998,
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      />
      
      {/* Modal container with loader - centered */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            pointerEvents: 'auto',
          }}
        >
          <div 
            className="bg-background/95 rounded-2xl p-12 shadow-2xl border border-border/50"
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
          <div className="flex items-center justify-center">
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
        </div>
        </motion.div>
      </div>
    </>
  );
}

