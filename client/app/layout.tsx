import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeSwitch from "./ThemeSwitch";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alberto Soutullo",
  description: "Alberto's portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <ThemeSwitch>
          {children}
        </ThemeSwitch>
      </body>
    </html>
  );
}
