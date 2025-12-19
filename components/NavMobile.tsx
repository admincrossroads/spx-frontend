"use client"

import { NAV_ITEMS } from "@/components/NavData"
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Menu, ChevronDown } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useContactModal } from "@/lib/contexts/ContactModalContext"

export default function NavMobile({ scrolled }: { scrolled: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { openModal } = useContactModal()

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button>
          <Menu
            className={cn(
              "w-6 h-6 transition-colors",
              scrolled ? "text-primary-foreground" : "text-foreground"
            )}
          />
        </button>
      </SheetTrigger>

      <AnimatePresence>
        {isOpen && (
          <SheetContent
            side="right"
            className={cn(
              "p-0 w-80 overflow-hidden",
              scrolled
                ? "bg-primary text-primary-foreground"
                : "bg-background text-foreground"
            )}
          >
            <VisuallyHidden>
              <SheetTitle>Mobile Navigation Menu</SheetTitle>
              <SheetDescription>
                Expand or collapse menu items to navigate the SPX website.
              </SheetDescription>
            </VisuallyHidden>

            <motion.div
              key="mobile-menu-panel"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 80 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="p-6 flex flex-col h-full"
            >
              {/* NAV ITEMS */}
              <nav className="flex flex-col gap-4 mt-12 flex-grow">

                {NAV_ITEMS.filter(item => item.label !== "Contact Us").map((item, index) => (
                  <div key={item.label}>

                    {/* MAIN MENU BUTTON */}
                    <button
                      onClick={() => toggle(index)}
                      className={cn(
                        "flex justify-between items-center w-full text-left text-lg font-medium",
                        scrolled
                          ? "text-primary-foreground"
                          : "text-foreground"
                      )}
                    >
                      {item.label}

                      {item.submenu.length > 0 && (
                        <motion.div
                          animate={{ rotate: openIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown
                            className={cn(
                              "w-5 h-5",
                              scrolled
                                ? "text-primary-foreground"
                                : "text-foreground"
                            )}
                          />
                        </motion.div>
                      )}
                    </button>

                    {/* SUBMENU */}
                    <AnimatePresence>
                      {openIndex === index && item.submenu.length > 0 && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="pl-4 flex flex-col gap-2 overflow-hidden"
                        >
                          {item.submenu.map((sub) => (
                            <li key={sub.label}>
                              <Link
                                href={sub.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                  "text-sm block py-1 transition-colors",
                                  scrolled
                                    ? "text-primary-foreground/80 hover:text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                                )}
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>

                  </div>
                ))}

              </nav>

              {/* CTA BUTTON — ALWAYS STAYS AT THE BOTTOM */}
              <div className="mt-8">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    openModal();
                  }}
                  className={cn(
                    "w-full block text-center px-4 py-3 rounded-full font-semibold transition-all shadow-md",
                    scrolled
                      ? "bg-primary-foreground text-primary hover:bg-secondary-foreground hover:text-primary"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  Contact Us
                </button>
              </div>

            </motion.div>
          </SheetContent>
        )}
      </AnimatePresence>
    </Sheet>
  )
}
