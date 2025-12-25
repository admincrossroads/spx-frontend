"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import SPXLoader from "@/components/ui/loader";
import ModalLoader from "@/components/ui/modal-loader";

export default function PageTransitionLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [targetPath, setTargetPath] = useState<string | null>(null);
  const prevPathnameRef = useRef<string | null>(null);
  const isInitialMount = useRef(true);
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Check if target is home page - check targetPath (where we're going) or new pathname
  const isHomePage = targetPath === '/' || (loading && pathname === '/');

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

      // Set target path to determine loader style (use pathname without hash)
      setTargetPath(hrefPathname);
      
      // Show loader immediately on click
      setLoading(true);
      
      // Prevent body scroll when loading and scroll to top
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      window.scrollTo(0, 0);
      
      // Clear any existing timer
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }
      
      // For hash navigation, set a timer to close loader since pathname won't change
      if (href.includes('#') && hrefPathname === currentPathname) {
        // Same page with hash - close after short delay
        loadingTimerRef.current = setTimeout(() => {
          setLoading(false);
          setTargetPath(null);
        }, 800); // Shorter delay for hash navigation
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

  // Listen for page load to close loader (handles hash navigation)
  useEffect(() => {
    if (loading) {
      const handleLoad = () => {
        // Small delay to ensure page is fully rendered
        setTimeout(() => {
          if (loadingTimerRef.current) {
            clearTimeout(loadingTimerRef.current);
          }
          loadingTimerRef.current = setTimeout(() => {
            setLoading(false);
            setTargetPath(null);
          }, 500); // Short delay after page load
        }, 100);
      };

      // If page is already loaded
      if (document.readyState === 'complete') {
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
      }
    }
  }, [loading]);

  // Handle pathname changes (fallback and to hide loader)
  useEffect(() => {
    // Skip on initial mount to avoid showing loader on first page load
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevPathnameRef.current = pathname;
      return;
    }

    // If pathname changed and we're loading, hide loader after minimum duration
    if (prevPathnameRef.current && prevPathnameRef.current !== pathname) {
      // Clear any existing timer
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }

      // Update target path if not already set (use new pathname)
      if (!targetPath) {
        setTargetPath(pathname);
      }

      // Ensure loader is shown (in case click handler didn't catch it)
      setLoading(true);
      
      // Hide loader after a minimum duration (for smooth animation)
      loadingTimerRef.current = setTimeout(() => {
        setLoading(false);
        setTargetPath(null);
        prevPathnameRef.current = pathname;
      }, 1500); // Minimum 1.5 seconds for loader animation

      return () => {
        if (loadingTimerRef.current) {
          clearTimeout(loadingTimerRef.current);
        }
      };
    } else if (loading && prevPathnameRef.current === pathname) {
      // Handle case where pathname didn't change but we're loading (hash navigation)
      // Check if we're actually on the target page
      if (targetPath && targetPath === pathname) {
        // Clear any existing timer
        if (loadingTimerRef.current) {
          clearTimeout(loadingTimerRef.current);
        }
        
        // Hide loader after a minimum duration
        loadingTimerRef.current = setTimeout(() => {
          setLoading(false);
          setTargetPath(null);
        }, 1500);
        
        return () => {
          if (loadingTimerRef.current) {
            clearTimeout(loadingTimerRef.current);
          }
        };
      }
    } else {
      prevPathnameRef.current = pathname;
    }
  }, [pathname]);

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
              transition={{ duration: 0.8, ease: "easeInOut" }}
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
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ModalLoader />
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}

