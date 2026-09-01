"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Search, ShoppingCart, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/useMounted";
import { useCartStore } from "@/store/useCartStore";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const cartItemsCount = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("q")?.toString().trim();
    if (query) {
      router.push(`/livros?search=${encodeURIComponent(query)}`);
      setIsMenuOpen(false);
    }
  };

  const cartCount = mounted ? cartItemsCount : 0;

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-800 transition-all duration-300">
        <div className="container-custom h-full flex items-center justify-between" />
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200 dark:bg-gray-900/95 dark:border-gray-800"
          : "bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-800"
      }`}
      role="banner"
    >
      <div className="container-custom h-full flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 rounded-md px-2 py-1"
          aria-label="DevBooks - Página inicial"
        >
          <span className="text-primary" aria-hidden="true">DevBooks</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Navegação principal">
          <Link
            href="/livros"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 rounded px-2 py-1"
          >
            Catálogo
          </Link>
        </nav>

        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md mx-8"
          role="search"
          aria-label="Buscar livros"
        >
          <label htmlFor="header-search" className="sr-only">
            Buscar livros
          </label>
          <div className="relative w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={18}
              aria-hidden="true"
            />
            <input
              id="header-search"
              name="q"
              type="search"
              placeholder="Buscar livros, autores..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              autoComplete="off"
            />
          </div>
        </form>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
            aria-label={theme === "dark" ? "Alternar para modo claro" : "Alternar para modo escuro"}
            aria-pressed={theme === "dark"}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link
            href="/carrinho"
            className="relative p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
            aria-label={cartCount > 0 ? `Carrinho de compras, ${cartCount} itens` : "Carrinho de compras, vazio"}
          >
            <ShoppingCart size={22} aria-hidden="true" />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 min-w-[18px] h-5 bg-accent text-white text-xs font-semibold rounded-full flex items-center justify-center px-1.5"
                aria-label={`${cartCount} itens no carrinho`}
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100 visible pb-4" : "max-h-0 opacity-0 invisible"
        }`}
        role="navigation"
        aria-label="Menu mobile"
        aria-hidden={!isMenuOpen}
      >
        <div className="px-4 border-t border-gray-200 dark:border-gray-800">
          <form onSubmit={handleSearch} className="mb-4" role="search" aria-label="Buscar livros">
            <label htmlFor="mobile-search" className="sr-only">
              Buscar livros
            </label>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={18}
                aria-hidden="true"
              />
              <input
                id="mobile-search"
                name="q"
                type="search"
                placeholder="Buscar livros, autores..."
                className="w-full pl-10 pr-4 py-3 text-base bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                autoComplete="off"
              />
            </div>
          </form>

          <ul className="space-y-1" role="list">
            <li>
              <Link
                href="/livros"
                className="block px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Catálogo
              </Link>
            </li>
            <li>
              <Link
                href="/sobre"
                className="block px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre nós
              </Link>
            </li>
            <li>
              <Link
                href="/contato"
                className="block px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}