import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Plastisphere — Global Microplastics Research Hub",
  description:
    "Track the latest microplastics and nanoplastics research. AI-generated summaries from peer-reviewed papers, reviewed by scientists.",
  openGraph: {
    title: "Plastisphere — Global Microplastics Research Hub",
    description:
      "Track the latest microplastics and nanoplastics research. AI-generated summaries from peer-reviewed papers.",
    siteName: "Plastisphere",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plastisphere — Global Microplastics Research Hub",
    description:
      "Track the latest microplastics and nanoplastics research. AI-generated summaries from peer-reviewed papers.",
  },
  metadataBase: new URL("https://plastisphere.com"),
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
