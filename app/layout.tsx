import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import PageTransitionLoader from "@/components/loading/PageTransitionLoader";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "SPX",
  description: "SPX Website",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} bg-white text-slateText`}>
        <PageTransitionLoader />
        {children}
      </body>
    </html>
  );
}
