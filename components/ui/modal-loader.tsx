"use client";

import { motion } from "framer-motion";
import CogwheelLoader from "./cogwheel-loader";

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
              <CogwheelLoader size="md" />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

