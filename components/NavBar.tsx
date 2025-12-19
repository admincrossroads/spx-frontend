"use client"

import { useEffect, useState } from "react"
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
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-colors duration-300",
        scrolled
          ? "bg-primary text-primary-foreground shadow-md"           
          : "bg-background/70 backdrop-blur-md text-foreground"      
      )}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* LOGO */}
        <a href="/" className="text-2xl font-bold">
          <img 
          src={scrolled ? "/logos/SPX-white.png" : "/logos/SPX.png"}
          className="h-6 w-auto"
          alt="" />
        </a>

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
    </header>
  )
}
