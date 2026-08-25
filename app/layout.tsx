import type { Metadata } from "next";
import { DM_Mono, Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ruhi Home Care | Detergent, Soap & Disinfectant in Nepal",
  description:
    "Shop thoughtful detergent, soap and surface disinfectant from Ruhi Home Care. Easy doorstep delivery across Nepal with cash on delivery.",
  keywords: [
    "detergent Nepal",
    "soap Nepal",
    "surface disinfectant",
    "Ruhi Home Care",
    "cleaning products Nepal",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${plusJakarta.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
