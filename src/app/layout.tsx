import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Livraria DevBooks",
  description: "Sua livraria online de livros técnicos e de programação",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Livraria DevBooks",
    description: "Sua livraria online de livros técnicos e de programação",
    locale: "pt_BR",
    siteName: "DevBooks",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1a2e",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
