"use client"

import Link from "next/link"
import { NAV_ITEMS } from "@/components/NavData"
// Import only the icons we need to reduce bundle size
import { FaLinkedinIn } from "react-icons/fa6"
import { FaXTwitter } from "react-icons/fa6"
import { FaYoutube } from "react-icons/fa6"
import { useContactModal } from "@/lib/contexts/ContactModalContext"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const { openModal } = useContactModal()

  return (
    <footer className="border-t bg-background mt-20">

      {/* TOP SECTION */}
      <div className="
        container mx-auto px-6 md:px-6 min-[1300px]:px-4 py-16 
        grid grid-cols-1 md:grid-cols-4 gap-12
        text-center md:text-left
      ">

        {/* LOGO + ABOUT */}
        <div className="col-span-1 flex flex-col items-center md:items-start gap-4">
          <Link href="/" className="text-3xl font-bold text-primary">
            <img 
              src="/logos/SPX.png" 
              alt="SPX logo" 
              className="h-24 w-auto" 
              width={96}
              height={96}
              loading="eager"
              decoding="async"
            />
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
              <FaLinkedinIn className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <FaXTwitter className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="https://youtube.com" target="_blank">
              <FaYoutube className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
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

        {/* NAV SECTIONS */}
        <div className="col-span-1 md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">

            {NAV_ITEMS.filter(item => ["About SPX", "Insights"].includes(item.label)).map((item) => (
              <div key={item.label} className="hidden md:block">
                <p className="font-semibold mb-3 text-foreground">{item.label}</p>

                <ul className="flex flex-col gap-2">
                  {item.submenu.map((sub) => (
                    <li key={sub.label}>
                      <Link
                        href={sub.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* CONTACT US SECTION - ALWAYS VISIBLE */}
            <div className="flex flex-col items-center md:items-start">
              <p className="font-semibold mb-3 text-foreground hidden md:block">Contact Us</p>
              <Button 
                onClick={openModal}
                className="rounded-full px-8 bg-primary text-white hover:bg-primary/90 w-fit mx-auto md:mx-0"
              >
                Get in Touch
              </Button>
              <p className="text-xs text-muted-foreground mt-4 max-w-[200px] text-center md:text-left">
                Have a project or inquiry? Our team is ready to collaborate.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="border-t py-6">
        <div className="container mx-auto px-6 md:px-6 min-[1300px]:px-4 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
          
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
