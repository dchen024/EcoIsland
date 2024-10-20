import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EcoIsland",
  description:
    "EcoIsland is a sustainable platform designed for Governors Island, NYC, to track the usage of reusable food serviceware, helping reduce waste and foster environmentally friendly practices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="earth.png" />
      </head>
      <body className={cn("bg-background", inter.className)}>{children}</body>
    </html>
  );
}
