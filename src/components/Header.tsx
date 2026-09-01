"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Search, ShoppingCart, Sun, Moon, Terminal, BookOpen, Info, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/useMounted";
import { useCartStore } from "@/store/useCartStore";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const cartItemsCount = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleNavigation = () => {
    setIsMenuOpen(false);
  };


  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      router.push(`/livros?search=${encodeURIComponent(query)}`);
      setIsMenuOpen(false);
    }
  };

  const cartCount = mounted ? cartItemsCount : 0;

  const navLinks = [
    { label: "Catálogo", href: "/livros", icon: BookOpen },
    { label: "Sobre nós", href: "/sobre", icon: Info },
    { label: "Contato", href: "/contato", icon: Mail },
  ];

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="container-custom h-full flex items-center justify-between" />
      </header>
    );
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-200 ${
          isScrolled
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800"
            : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60"
        }`}
        role="banner"
      >
        <div className="container-custom h-full flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo */}
          <Link
            href="/"
            onClick={handleNavigation}
            className="group flex items-center gap-2 text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white rounded-lg focus-visible:ring-2 focus-visible:ring-indigo-500 py-1 transition-transform active:scale-95 shrink-0"
            aria-label="MainBooks - Ir para página inicial"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-mono text-sm font-semibold shadow-sm group-hover:bg-indigo-700 transition-colors shrink-0">
              <Terminal size={18} aria-hidden="true" />
            </div>
            <span className="flex items-center whitespace-nowrap">
              <span>Main</span>
              <span className="text-indigo-600 dark:text-indigo-400">Books</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2 ml-2 shrink-0"
            role="navigation"
            aria-label="Navegação principal"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleNavigation}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-indigo-500 whitespace-nowrap ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 font-semibold"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-sm lg:max-w-md mx-2 lg:mx-6"
            role="search"
            aria-label="Buscar livros"
          >
            <label htmlFor="header-search" className="sr-only">
              Buscar livros técnicos, autores ou tópicos
            </label>
            <div className="relative w-full h-10 flex items-center">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none shrink-0"
                size={16}
                aria-hidden="true"
              />
              <input
                id="header-search"
                type="search"
                placeholder="Buscar livros, autores, temas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full pl-10 pr-9 text-sm bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
                style={{ WebkitAppearance: "none", appearance: "none" }}
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
                  aria-label="Limpar busca"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </form>

          {/* Actions: Theme Toggle, Cart, Mobile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-95 shrink-0"
              aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
            >
              {theme === "dark" ? (
                <Sun size={19} className="text-amber-400" />
              ) : (
                <Moon size={19} className="text-slate-700" />
              )}
            </button>

            {/* Cart Link */}
            <Link
              href="/carrinho"
              onClick={handleNavigation}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-95 shrink-0"
              aria-label={cartCount > 0 ? `Carrinho com ${cartCount} itens` : "Carrinho vazio"}
            >
              <ShoppingCart size={20} aria-hidden="true" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 min-w-5 h-5 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1 shadow-sm"
                  aria-hidden="true"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-95 shrink-0"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-drawer"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer & Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden transition-opacity duration-200"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div
        id="mobile-drawer"
        className={`fixed top-16 left-0 right-0 z-40 md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-[calc(100vh-4rem)] opacity-100 py-4 px-4 overflow-y-auto" : "max-h-0 opacity-0 py-0 px-4 pointer-events-none"
        }`}
        role="navigation"
        aria-label="Menu móvel"
      >
        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="mb-4" role="search">
          <label htmlFor="mobile-search-input" className="sr-only">
            Buscar livros técnicos
          </label>
          <div className="relative w-full h-11 flex items-center">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none shrink-0"
              size={18}
              aria-hidden="true"
            />
            <input
              id="mobile-search-input"
              type="search"
              placeholder="Buscar livros, autores, temas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-full pl-11 pr-4 text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              style={{ WebkitAppearance: "none", appearance: "none" }}
              autoComplete="off"
            />
          </div>
        </form>

        {/* Mobile Nav Links */}
        <ul className="space-y-1" role="list">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon size={18} className="text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
