"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import SPXLoader from "@/components/ui/loader";
import ModalLoader from "@/components/ui/modal-loader";

export default function PageTransitionLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [targetPath, setTargetPath] = useState<string | null>(null);
  const prevPathnameRef = useRef<string | null>(null);
  const isInitialMount = useRef(true);
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const navigationStartTimeRef = useRef<number | null>(null);
  
  // Check if target is home page
  const isHomePage = targetPath === '/' || (loading && pathname === '/');

  // Clear all timers helper
  const clearAllTimers = () => {
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = null;
    }
  };

  // Intercept link clicks to show loader immediately
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Find the closest link element (handles nested elements inside links)
      const link = target.closest('a');
      
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Skip external links, anchor links, and links that open in new tabs
      if (
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#') ||
        link.target === '_blank' ||
        link.hasAttribute('download')
      ) {
        return;
      }

      // Extract pathname from href (remove hash and query params)
      const hrefPathname = href.split('#')[0].split('?')[0];
      const currentPathname = window.location.pathname;
      
      // Skip if it's the same page path (except home page - always show loader for home)
      if (hrefPathname !== '/' && (hrefPathname === pathname || hrefPathname === currentPathname)) {
        return;
      }

      // Clear any existing timers
      clearAllTimers();

      // Set target path and mark navigation start
      setTargetPath(hrefPathname);
      navigationStartTimeRef.current = Date.now();
      
      // Show loader immediately on click
      setLoading(true);
      
      // Prevent body scroll when loading and scroll to top
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      window.scrollTo(0, 0);
      
      // For hash navigation, set a timer to close loader since pathname won't change
      if (href.includes('#') && hrefPathname === currentPathname) {
        // Same page with hash - close after short delay
        loadingTimerRef.current = setTimeout(() => {
          setLoading(false);
          setTargetPath(null);
          navigationStartTimeRef.current = null;
        }, 800);
      }
    };

    // Add click listener to document
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [pathname]);

  // Restore body scroll when loading ends
  useEffect(() => {
    if (!loading) {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
  }, [loading]);

  // Handle pathname changes - hide loader when navigation completes
  useEffect(() => {
    // Skip on initial mount to avoid showing loader on first page load
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevPathnameRef.current = pathname;
      return;
    }

    // Only handle pathname changes if we're actually navigating
    if (prevPathnameRef.current && prevPathnameRef.current !== pathname) {
      clearAllTimers();

      // If we were loading, calculate minimum display time
      if (loading) {
        const elapsed = navigationStartTimeRef.current 
          ? Date.now() - navigationStartTimeRef.current 
          : 0;
        
        // Minimum display time of 800ms, but if navigation was slow, ensure at least 300ms visible
        const minDisplayTime = Math.max(800 - elapsed, 300);
        
        loadingTimerRef.current = setTimeout(() => {
          setLoading(false);
          setTargetPath(null);
          navigationStartTimeRef.current = null;
          prevPathnameRef.current = pathname;
        }, minDisplayTime);
      } else {
        // Pathname changed but we weren't loading - update ref only
        prevPathnameRef.current = pathname;
      }

      return () => {
        clearAllTimers();
      };
    } else {
      // Same pathname - update ref
      prevPathnameRef.current = pathname;
      
      // If we're loading but pathname didn't change, wait a bit then hide
      if (loading && !targetPath) {
        clearAllTimers();
        loadingTimerRef.current = setTimeout(() => {
          setLoading(false);
          setTargetPath(null);
          navigationStartTimeRef.current = null;
        }, 800);
      }
    }
  }, [pathname, searchParams]);

  // Fallback: Hide loader if it's been showing for too long (10 seconds)
  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => {
        console.warn('Loader timeout - forcing close');
        clearAllTimers();
        setLoading(false);
        setTargetPath(null);
        navigationStartTimeRef.current = null;
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <>
          {isHomePage ? (
            // Full screen loader for home page
            <motion.div
              key="fullscreen-loader"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 z-[9999]"
            >
              <SPXLoader />
            </motion.div>
          ) : (
            // Modal loader for other pages
            <motion.div
              key="modal-loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <ModalLoader />
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
