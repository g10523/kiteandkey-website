import "./globals.css";
import type { Metadata } from "next";
import { Julius_Sans_One } from "next/font/google";
import PublicLayoutWrapper from "../components/PublicLayoutWrapper";

export const metadata: Metadata = {
  title: "Kite & Key Academy",
  description:
    "Calm, consistent learning mentorship for Years 5–10 in Maths, English and Science.",
  icons: {
    icon: '/logo.jpg',
  },
};

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
          ${julius.variable}
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
