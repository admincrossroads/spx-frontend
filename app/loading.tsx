"use client";

import { useEffect, useState } from "react";
import SPXLoader from "@/components/ui/loader";

export default function Loading() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Minimum duration for loader (in ms) - reduced to avoid conflicts
    const timeout = setTimeout(() => setReady(true), 500);

    return () => clearTimeout(timeout);
  }, []);

  // Show loader until delay finishes
  if (!ready) return <SPXLoader />;

  // Once delay ends, return null (Next.js will swap in real page)
  return null;
}
