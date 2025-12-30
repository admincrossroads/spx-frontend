import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Suspense } from "react";
import PageTransitionLoader from "@/components/loading/PageTransitionLoader";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import ChatWidget from "@/components/chat/ChatWidget";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap", // Prevent layout shift during font load
  preload: true,
});

const siteUrl = "https://spxafrica.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SPX - Africa-Led Strategy, Research, and Implementation",
    template: "%s | SPX",
  },
  description: "SPX is an Africa-based consulting, research, and implementation firm advancing development through energy access, market systems, innovation, and locally grounded solutions.",
  keywords: [
    "Africa development",
    "consulting firm",
    "energy access",
    "market systems",
    "development consulting",
    "Africa strategy",
    "program implementation",
  ],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/logos/favicon.png", type: "image/png" },
      { url: "/logos/SPX-white.png", sizes: "32x32", type: "image/png" },
      { url: "/logos/SPX-white.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/logos/SPX-white.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/logos/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "SPX",
    title: "SPX - Africa-Led Strategy, Research, and Implementation",
    description: "SPX is an Africa-based consulting, research, and implementation firm advancing development through energy access, market systems, innovation, and locally grounded solutions.",
    images: [
      {
        url: "/images/hero/image1.webp",
        width: 1200,
        height: 630,
        alt: "SPX - Africa-Led Strategy, Research, and Implementation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SPX - Africa-Led Strategy, Research, and Implementation",
    description: "SPX is an Africa-based consulting, research, and implementation firm advancing development through energy access, market systems, innovation, and locally grounded solutions.",
    images: ["/logos/SPX-white.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${montserrat.className} bg-white text-slateText`}
        suppressHydrationWarning
      >
        <QueryProvider>
          <Suspense fallback={null}>
            <PageTransitionLoader />
          </Suspense>
          {children}
          <ChatWidget />
        </QueryProvider>
      </body>
    </html>
  );
}
