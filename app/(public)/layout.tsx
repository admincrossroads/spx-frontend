import "../globals.css";
import { Montserrat } from "next/font/google";
import type { Metadata } from "next";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ContactModalProvider } from "@/components/contact/ContactModalProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://spiralytix.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SPX - Africa-Led Strategy, Research, and Implementation",
    template: "%s | SPX",
  },
  description: "SPX is an Africa-based consulting, research, and implementation firm advancing development through energy access, market systems, innovation, and locally grounded solutions. We work with governments, DFIs, foundations, and the private sector to design and deliver transformative programs across Africa.",
  keywords: [
    "Africa development",
    "consulting firm",
    "energy access",
    "market systems",
    "development consulting",
    "Africa strategy",
    "program implementation",
    "research and evidence",
    "innovation",
    "agriculture development",
    "employment and skills",
    "digital transformation",
    "climate resilience",
    "governance",
  ],
  authors: [{ name: "SPX (Spiralytix)" }],
  creator: "SPX (Spiralytix)",
  publisher: "SPX (Spiralytix)",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/logos/SPX.png", type: "image/png" },
      { url: "/logos/SPX.png", sizes: "32x32", type: "image/png" },
      { url: "/logos/SPX.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/logos/SPX.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/logos/SPX.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "SPX - Spiralytix",
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
    images: ["/images/hero/image1.webp"],
    creator: "@spiralytix",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code", // Add when available
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className + " bg-white text-slateText"}>
        <ContactModalProvider>
          <NavBar />
          {children}
          <Footer />
        </ContactModalProvider>
      </body>
    </html>
  );
}
