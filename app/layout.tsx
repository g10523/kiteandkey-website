import "./globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Julius_Sans_One } from "next/font/google"; // Import Julius
import PublicLayoutWrapper from "../components/PublicLayoutWrapper";

export const metadata: Metadata = {
  title: "Kite & Key Academy",
  description:
    "Calm, consistent learning mentorship for Years 5–10 in Maths, English and Science.",
  icons: {
    icon: '/logo.jpg',
  },
};

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const julius = Julius_Sans_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-julius",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${cormorant.variable}
          ${inter.variable}
          ${julius.variable}
          font-inter
          min-h-screen
          antialiased
          text-[#3F3A52]
        `}
      >
        <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
      </body>
    </html>
  );
}
