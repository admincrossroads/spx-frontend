"use client"

import { useState, useRef } from "react"
import { NAV_ITEMS } from "@/components/NavData"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function NavDesktop({ scrolled }: { scrolled: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpenIndex(index)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenIndex(null), 250)
  }

  return (
    <nav className="flex items-center gap-8 relative">
      {NAV_ITEMS.map((item, index) => (
  <div
    key={item.label}
    className="relative hover:border-b hover:border-b-2 hover:border-b-black-foreground hover:z-10"
    onMouseEnter={() => handleMouseEnter(index)}
    onMouseLeave={handleMouseLeave}
  >
    {/* CONTACT US AS CTA BUTTON */}
    {item.label === "Contact Us" ? (
      <Link
        href={item.href}
        className={cn(
          "px-4 py-2 rounded-full font-medium transition-all shadow-sm",
          scrolled
            ? "bg-primary-foreground text-primary hover:bg-secondary-foreground hover:text-primary"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
      >
        {item.label}
      </Link>
    ) : (
      /* NORMAL NAV ITEM */
      <Link
        href={item.href}
        className={cn(
          "text-sm font-medium transition-colors",
          scrolled
            ? "text-primary-foreground hover:text-secondary-foreground"
            : "text-foreground hover:text-primary"
        )}
      >
        {item.label}
      </Link>
    )}

    {/* SUBMENU (unchanged) */}
    <AnimatePresence>
      {item.submenu.length > 0 && openIndex === index && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn(
            "absolute left-0 top-full mt-3 w-56 rounded-xl border shadow-lg z-50",
            scrolled
              ? "bg-primary text-primary-foreground border-primary-foreground/20"
              : "bg-background text-foreground border-border"
          )}
        >
          <ul className="p-3">
            {item.submenu.map((sub) => (
              <li key={sub.label}>
                <Link
                  href={sub.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-sm transition-colors",
                    scrolled
                      ? "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {sub.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
))}

    </nav>
  )
}
