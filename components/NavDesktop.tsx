"use client"

import { useState, useRef, useEffect } from "react"
import { NAV_ITEMS } from "@/components/NavData"
import Link from "next/link"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"
import { useContactModal } from "@/lib/contexts/ContactModalContext"

// Magnetic navigation item component
const MagneticNavItem = ({ 
  children, 
  className, 
  onMouseEnter, 
  onMouseLeave,
  scrolled 
}: { 
  children: React.ReactNode
  className?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  scrolled: boolean
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 300 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    
    // Magnetic pull effect (stronger when closer)
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)
    const maxDistance = 100
    const strength = Math.max(0, 1 - distance / maxDistance)
    
    x.set(distanceX * strength * 0.3)
    y.set(distanceY * strength * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    onMouseLeave?.()
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {children}
    </motion.div>
  )
}

// Active indicator that follows hover
const ActiveIndicator = ({ 
  hoveredIndex, 
  itemsRef 
}: { 
  hoveredIndex: number | null
  itemsRef: React.RefObject<(HTMLDivElement | null)[]>
}) => {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 })

  useEffect(() => {
    if (hoveredIndex === null || !itemsRef.current?.[hoveredIndex]) {
      setPosition(prev => ({ ...prev, opacity: 0 }))
      return
    }

    const element = itemsRef.current[hoveredIndex]
    if (!element) return
    
    const rect = element.getBoundingClientRect()
    const nav = element.closest('nav')
    if (!nav) return
    
    const navRect = nav.getBoundingClientRect()
    
    setPosition({
      left: rect.left - navRect.left,
      width: rect.width,
      opacity: 1,
    })
  }, [hoveredIndex, itemsRef])

  return (
    <motion.div
      className="absolute bottom-0 h-[2px] bg-foreground rounded-full"
      initial={false}
      animate={position}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ pointerEvents: "none" }}
    />
  )
}

export default function NavDesktop({ scrolled }: { scrolled: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [clickedIndex, setClickedIndex] = useState<number | null>(null) // Track clicked index for tablets
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const { openModal } = useContactModal()
  
  // Detect if device supports hover (not a touch device)
  const [isHoverSupported, setIsHoverSupported] = useState(true)
  
  useEffect(() => {
    // Check if device supports hover
    const mediaQuery = window.matchMedia('(hover: hover)')
    setIsHoverSupported(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => setIsHoverSupported(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Track mouse position for glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleMouseEnter = (index: number) => {
    if (!isHoverSupported) return // Only handle hover on devices that support it
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpenIndex(index)
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    if (!isHoverSupported) return
    timeoutRef.current = setTimeout(() => {
      setOpenIndex(null)
      setHoveredIndex(null)
    }, 250)
  }

  const handleClick = (index: number, item: typeof NAV_ITEMS[0], e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only handle click logic for touch devices (tablets) when item has submenu
    if (!isHoverSupported && item.submenu.length > 0) {
      if (clickedIndex === index && openIndex === index) {
        // Second click - allow navigation (don't prevent default)
        setClickedIndex(null)
        setOpenIndex(null)
        setHoveredIndex(null)
        // Let the Link handle navigation naturally
      } else {
        // First click - open submenu, prevent navigation
        e.preventDefault()
        setClickedIndex(index)
        setOpenIndex(index)
        setHoveredIndex(index)
      }
    }
  }
  
  // Close menu when clicking outside on touch devices
  useEffect(() => {
    if (!isHoverSupported && openIndex !== null) {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (!target.closest(`nav`)) {
          setOpenIndex(null)
          setHoveredIndex(null)
          setClickedIndex(null)
        }
      }
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isHoverSupported, openIndex])

  return (
    <nav className="flex items-center gap-4 min-[1300px]:gap-8 relative">
      {/* Cursor glow effect */}
      {hoveredIndex !== null && (
        <motion.div
          className="pointer-events-none fixed rounded-full bg-primary/10 blur-3xl"
          style={{
            width: 200,
            height: 200,
            x: mousePosition.x - 100,
            y: mousePosition.y - 100,
            zIndex: 0,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Active indicator - exclude contact button */}
      <ActiveIndicator 
        hoveredIndex={hoveredIndex !== null && NAV_ITEMS[hoveredIndex]?.label !== "Contact Us" ? hoveredIndex : null} 
        itemsRef={itemsRef as React.RefObject<(HTMLDivElement | null)[]>}
      />

      {NAV_ITEMS.map((item, index) => (
        <MagneticNavItem
          key={item.label}
          scrolled={scrolled}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          <div
            ref={(el) => {
              itemsRef.current[index] = el
            }}
          >
            {/* CONTACT US AS CTA BUTTON */}
            {item.label === "Contact Us" ? (
              <motion.button
                onClick={openModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-3 py-1.5 min-[1300px]:px-4 min-[1300px]:py-2 rounded-full font-medium transition-all text-[10.5px] min-[1300px]:text-sm relative overflow-hidden",
                  scrolled
                    ? "bg-primary-foreground text-primary hover:bg-secondary-foreground hover:text-primary"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                <span className="relative z-10">{item.label}</span>
                <motion.div
                  className={cn(
                    "absolute inset-0 rounded-full",
                    scrolled ? "bg-primary/20" : "bg-primary-foreground/10"
                  )}
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ) : (
              /* NORMAL NAV ITEM */
              <Link
                href={item.href}
                onClick={(e) => handleClick(index, item, e)}
                className={cn(
                  "text-[13px] min-[1290px]:text-sm font-medium transition-colors relative inline-block",
                  scrolled
                    ? "text-primary-foreground hover:text-secondary-foreground"
                    : "text-foreground/80 hover:text-foreground"
                )}
              >
                {item.label}
                {/* Underline animation - only for hover-supported devices */}
                {isHoverSupported && (
                  <motion.div
                    className={cn(
                      "absolute bottom-0 left-0 h-[2px] rounded-full",
                      scrolled ? "bg-secondary-foreground" : "bg-foreground"
                    )}
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </Link>
            )}

            {/* Enhanced Dropdown Menu */}
            <AnimatePresence>
              {item.submenu.length > 0 && openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ 
                    duration: 0.2, 
                    ease: [0.4, 0, 0.2, 1],
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  className={cn(
                    "absolute left-0 top-full mt-4 w-64 rounded-2xl border shadow-2xl z-50 overflow-hidden backdrop-blur-md",
                    scrolled
                      ? "bg-primary/95 text-primary-foreground border-primary-foreground/20"
                      : "bg-background/95 text-foreground border-border"
                  )}
                >
                  <ul className="p-2">
                    {item.submenu.map((sub, subIndex) => (
                      <li key={sub.label}>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: subIndex * 0.03,
                            duration: 0.2 
                          }}
                        >
                          <Link
                            href={sub.href}
                            className={cn(
                              "block px-4 py-3 rounded-lg text-sm transition-all relative group",
                              scrolled
                                ? "text-primary-foreground/90 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            <span className="relative z-10">{sub.label}</span>
                            <motion.div
                              className={cn(
                                "absolute inset-0 rounded-lg",
                                scrolled 
                                  ? "bg-primary-foreground/5" 
                                  : "bg-primary/5"
                              )}
                              whileHover={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                            />
                          </Link>
                        </motion.div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </MagneticNavItem>
      ))}
    </nav>
  )
}
