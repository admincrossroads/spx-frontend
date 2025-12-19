"use client"

import Link from "next/link"
import { NAV_ITEMS } from "@/components/NavData"
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background mt-20 xl:px-20">

      {/* TOP SECTION */}
      <div className="
        container mx-auto py-16 
        grid grid-cols-1 md:grid-cols-4 gap-12
        text-center md:text-left
      ">

        {/* LOGO + ABOUT */}
        <div className="col-span-1 flex flex-col items-center md:items-start gap-4">
          <Link href="/" className="text-3xl font-bold text-primary">
            <img src="/logos/SPX.png" alt="SPX logo" className="h-24" />
          </Link>

          <p className="
            text-sm text-muted-foreground leading-relaxed 
            max-w-xs md:max-w-sm 
            text-center md:text-left
          ">
            Africa-led strategy, research, implementation, and innovation 
            across energy, agriculture, digital transformation, climate, 
            and economic systems.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-4 justify-center md:justify-start">
            <Link href="https://linkedin.com" target="_blank">
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="https://youtube.com" target="_blank">
              <Youtube className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </div>

          {/* PRIVACY (only visible on mobile) */}
          <div className="mt-6 md:hidden">
            <Link 
              href="/privacy" 
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* NAV SECTIONS - HIDDEN ON MOBILE */}
        <div className="col-span-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-7 gap-10 hidden md:grid">

          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              <p className="font-semibold mb-3 text-foreground">{item.label}</p>

              <ul className="flex flex-col gap-2">
                {item.submenu.length > 0 ? (
                  item.submenu.map((sub) => (
                    <li key={sub.label}>
                      <Link
                        href={sub.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Visit {item.label}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}

        </div>

      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="border-t py-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
          
          <p className="text-sm text-muted-foreground text-center">
            © 2026 SPX. All rights reserved.
          </p>

          {/* PRIVACY (visible on desktop only) */}
          <p className="hidden md:block">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>

    </footer>
  )
}
