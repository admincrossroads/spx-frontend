import "../globals.css";
import { Inter } from "next/font/google";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ContactModalProvider } from "@/components/contact/ContactModalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SPX – Africa-Led Strategy, Research, and Implementation",
  description: "SPX is an Africa-based consulting, research, and implementation firm advancing development through energy access, market systems, innovation, and locally grounded solutions. We work with governments, DFIs, foundations, and the private sector to design and deliver transformative programs across Africa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-white text-slateText"}>
        <ContactModalProvider>
          <NavBar />
          {children}
          <Footer />
        </ContactModalProvider>
      </body>
    </html>
  );
}
