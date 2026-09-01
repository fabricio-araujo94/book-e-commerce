"use client";

import { useState, useMemo, useEffect } from "react";
import { Book, BookFormat } from "@/types";
import { BookCard } from "@/components/BookCard";
import { Filter, SlidersHorizontal, X, Search, RotateCcw, ArrowUpDown, Terminal } from "lucide-react";

interface CatalogClientProps {
  initialBooks: Book[];
  categories: string[];
  initialCategory?: string;
  initialSearch?: string;
  initialSortBy?: string;
}

export function CatalogClient({
  initialBooks,
  categories,
  initialCategory,
  initialSearch,
  initialSortBy = "relevance",
}: CatalogClientProps) {
  const [search, setSearch] = useState(initialSearch || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || "all");
  const [selectedFormat, setSelectedFormat] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>(initialSortBy);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Lock body scroll when mobile filter is open
  useEffect(() => {
    if (mobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFilterOpen]);

  const filteredBooks = useMemo(() => {
    let result = [...initialBooks];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.authors.some((a) => a.toLowerCase().includes(q)) ||
          b.synopsis.toLowerCase().includes(q) ||
          b.isbn.toLowerCase().includes(q)
      );
    }

    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter((b) => b.categories.includes(selectedCategory));
    }

    if (selectedFormat && selectedFormat !== "all") {
      result = result.filter((b) => b.format === (selectedFormat as BookFormat));
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => b.year - a.year);
        break;
      case "relevance":
      default:
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
        break;
    }

    return result;
  }, [initialBooks, search, selectedCategory, selectedFormat, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setSelectedFormat("all");
    setSortBy("relevance");
  };

  const hasActiveFilters =
    search !== "" || selectedCategory !== "all" || selectedFormat !== "all";

  return (
    <div className="container-custom py-6 sm:py-10">
      {/* Header & Controls Bar */}
      <div className="flex flex-col gap-4 mb-6 sm:mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
              <Terminal size={14} />
              <span>CATALOG_QUERY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Catálogo de Livros
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Encontrados <span className="font-semibold text-slate-900 dark:text-white font-mono">{filteredBooks.length}</span> de{" "}
              <span className="font-mono">{initialBooks.length}</span> títulos técnicos
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Mobile filter trigger */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <SlidersHorizontal size={15} />
              <span>Filtros {hasActiveFilters && "•"}</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 flex-1 sm:flex-initial">
              <div className="relative w-full sm:w-auto">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ArrowUpDown size={14} />
                </div>
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto pl-8 pr-8 py-2.5 text-xs sm:text-sm font-medium border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm cursor-pointer"
                  aria-label="Ordenar resultados"
                >
                  <option value="relevance">Relevância</option>
                  <option value="rating">Melhores Avaliações</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="newest">Ano de Lançamento</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">filtros:</span>
            {search && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/50 font-mono">
                busca: &ldquo;{search}&rdquo;
                <button
                  onClick={() => setSearch("")}
                  className="hover:text-rose-500 p-0.5 rounded focus-visible:ring-1 focus-visible:ring-indigo-500"
                  aria-label="Remover filtro de busca"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/50 font-mono">
                cat: {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="hover:text-rose-500 p-0.5 rounded focus-visible:ring-1 focus-visible:ring-indigo-500"
                  aria-label="Remover filtro de categoria"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedFormat !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/50 font-mono">
                formato: {selectedFormat}
                <button
                  onClick={() => setSelectedFormat("all")}
                  className="hover:text-rose-500 p-0.5 rounded focus-visible:ring-1 focus-visible:ring-indigo-500"
                  aria-label="Remover filtro de formato"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 hover:underline ml-1 font-semibold"
            >
              <RotateCcw size={11} />
              <span>Limpar todos</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
        {/* Sidebar Filters Desktop */}
        <aside
          className="hidden md:block w-60 lg:w-64 flex-shrink-0 space-y-6 sticky top-20 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm"
          aria-label="Filtros do catálogo"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 font-mono uppercase tracking-wider">
              <Filter size={15} className="text-indigo-600 dark:text-indigo-400" />
              <span>Filtros</span>
            </h2>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:underline"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Search Filter */}
          <div>
            <label
              htmlFor="desktop-search"
              className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2 font-mono"
            >
              Buscar no catálogo
            </label>
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                id="desktop-search"
                type="text"
                placeholder="Título, autor, ISBN..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-8 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  aria-label="Limpar campo de busca"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2 font-mono">
              Categorias
            </label>
            <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition-all flex items-center justify-between ${
                  selectedCategory === "all"
                    ? "bg-indigo-600 text-white font-bold shadow-sm"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <span>Todas</span>
                <span className="font-mono text-[10px] opacity-80">{initialBooks.length}</span>
              </button>
              {categories.map((cat) => {
                const count = initialBooks.filter((b) => b.categories.includes(cat)).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition-all flex items-center justify-between ${
                      selectedCategory === cat
                        ? "bg-indigo-600 text-white font-bold shadow-sm"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span className="line-clamp-1">{cat}</span>
                    <span className="font-mono text-[10px] opacity-80">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Format Filter */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2 font-mono">
              Formato
            </label>
            <div className="space-y-1">
              {["all", "capa dura", "brochura", "e-book"].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded-lg capitalize transition-all ${
                    selectedFormat === fmt
                      ? "bg-indigo-600 text-white font-bold shadow-sm"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {fmt === "all" ? "Todos os formatos" : fmt}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile Filters Drawer Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-xs sm:max-w-sm bg-white dark:bg-slate-900 h-full p-5 overflow-y-auto flex flex-col justify-between ml-auto shadow-2xl animate-in slide-in-from-right duration-300">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 font-mono">
                    <Filter size={16} className="text-indigo-600" />
                    FILTROS
                  </h3>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800"
                    aria-label="Fechar filtros"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Mobile Search */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 font-mono">
                    Buscar
                  </label>
                  <input
                    type="text"
                    placeholder="Título, autor..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                {/* Mobile Category */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 font-mono">
                    Categoria
                  </label>
                  <div className="space-y-1 max-h-52 overflow-y-auto">
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={`w-full text-left px-3 py-2 text-xs rounded-lg ${
                        selectedCategory === "all"
                          ? "bg-indigo-600 text-white font-bold"
                          : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      Todas as categorias
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 text-xs rounded-lg ${
                          selectedCategory === cat
                            ? "bg-indigo-600 text-white font-bold"
                            : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Format */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 font-mono">
                    Formato
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {["all", "capa dura", "brochura", "e-book"].map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setSelectedFormat(fmt)}
                        className={`px-3 py-2 text-xs rounded-lg capitalize text-center ${
                          selectedFormat === fmt
                            ? "bg-indigo-600 text-white font-bold"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {fmt === "all" ? "Todos" : fmt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex gap-2">
                <button
                  onClick={clearFilters}
                  className="px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Limpar
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                >
                  Ver Resultados ({filteredBooks.length})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Books Grid & Results */}
        <main className="flex-1 w-full">
          {filteredBooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 flex items-center justify-center mb-3">
                <Terminal size={24} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1">
                404: Nenhum livro encontrado
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-sm font-mono text-[11px]">
                grep: zero matches for your filter query.
              </p>
              <button
                onClick={clearFilters}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all shadow-sm"
              >
                Resetar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

