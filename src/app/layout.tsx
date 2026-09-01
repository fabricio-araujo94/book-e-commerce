import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Livraria MainBooks",
    template: "%s | MainBooks",
  },
  description: "Sua livraria online de livros técnicos e de programação",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Livraria MainBooks",
    description: "Sua livraria online de livros técnicos e de programação",
    locale: "pt_BR",
    siteName: "MainBooks",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1a2e",
  width: "device-width",
  initialScale: 1,
};

function HeaderFallback() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-800">
      <div className="container-custom h-full flex items-center justify-between" />
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://via.placeholder.com" />
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-primary"
          >
            Pular para o conteúdo principal
          </a>
          <Suspense fallback={<HeaderFallback />}>
            <Header />
          </Suspense>
          <main id="main-content" className="flex-1 pt-16" role="main">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
