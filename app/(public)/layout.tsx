import "../globals.css";
import { Montserrat } from "next/font/google";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ContactModalProvider } from "@/components/contact/ContactModalProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "SPX – Africa-Led Strategy, Research, and Implementation",
  description: "SPX is an Africa-based consulting, research, and implementation firm advancing development through energy access, market systems, innovation, and locally grounded solutions. We work with governments, DFIs, foundations, and the private sector to design and deliver transformative programs across Africa.",
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
