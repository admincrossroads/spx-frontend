"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import NavDesktop from "./NavDesktop"
import NavMobile from "./NavMobile"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80) // threshold before switching
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-primary text-primary-foreground shadow-lg backdrop-blur-md"           
          : "bg-background/70 backdrop-blur-md text-foreground"      
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4 md:px-6 min-[1300px]:px-4">
        {/* LOGO */}
        <motion.a 
          href="/" 
          className="text-2xl font-bold relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.img 
            src={scrolled ? "/logos/SPX-white.png" : "/logos/SPX.png"}
            className="h-10 w-auto"
            alt="SPX Logo"
            key={scrolled ? "white" : "colored"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.a>

        {/* DESKTOP */}
        <nav className="hidden lg:block">
          {/* cast to any to satisfy TS when the NavDesktop component lacks a prop type */}
          <NavDesktop {...({ scrolled } as any)} />
        </nav>

        {/* MOBILE */}
        <div className="lg:hidden">
          {/* cast to any to satisfy TS when the NavMobile component lacks a prop type */}
          <NavMobile {...({ scrolled } as any)} />
        </div>
      </div>
    </motion.header>
  )
}
