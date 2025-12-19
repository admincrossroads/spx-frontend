"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export default function GlobalBackground() {
  const { scrollY } = useScroll()

  // Parallax layers
  const y1 = useTransform(scrollY, [0, 1500], [0, 60])
  const y2 = useTransform(scrollY, [0, 1500], [0, -90])
  const rot = useTransform(scrollY, [0, 1500], [0, 8]) // subtle rotation

  return (
    <div className="global-bg-container pointer-events-none">

      {/* --- GRID (subtle) --- */}
      <div className="global-grid absolute inset-0"></div>

      {/* --- ABSTRACT SHAPES --- */}
      <motion.div className="shape shape-1" style={{ y: y1 }} />
      <motion.div className="shape shape-2" style={{ y: y2 }} />
      <motion.div className="shape shape-3" style={{ y: y1 }} />

      {/* --- SPX BACKGROUND LOGO 1 (HUGE, top-left) --- */}
      {/* <motion.div
        className="absolute top-[20%] left-[20%] opacity-[0.15] scale-[2]"
        style={{ rotate: rot }}
      >
        <Image
          src="/logos/SPX.png"
          alt="Spiralytix Background Logo"
          width={900}
          height={900}
          className="w-[700px] h-auto opacity-40"
        />
      </motion.div> */}

      {/* --- SPX BACKGROUND LOGO 2 (bottom-right) --- */}
      <motion.div
        className="absolute bottom-[-20%] right-[-5%] opacity-[0.04]"
        style={{ y: y2 }}
      >
        <Image
          src="/logos/SPX.png"
          alt="Spiralytix Background Logo"
          width={700}
          height={700}
          className="w-[500px] h-auto opacity-30"
        />
      </motion.div>

    </div>
  )
}
