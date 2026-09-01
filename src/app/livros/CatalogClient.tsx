"use client";

import { useState, useMemo } from "react";
import { Book, BookFormat } from "@/types";
import { BookCard } from "@/components/BookCard";
import { Filter, SlidersHorizontal, X } from "lucide-react";

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

  const filteredBooks = useMemo(() => {
    let result = [...initialBooks];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.authors.some((a) => a.toLowerCase().includes(q)) ||
          b.synopsis.toLowerCase().includes(q)
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
    <div className="container-custom py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Catálogo de Livros</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Exibindo {filteredBooks.length} de {initialBooks.length} títulos disponíveis
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <SlidersHorizontal size={16} />
            Filtros
          </button>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-by" className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
              Ordenar por:
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="relevance">Relevância</option>
              <option value="rating">Melhor Avaliados</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="newest">Lançamentos</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters Desktop */}
        <aside className="hidden md:block w-64 flex-shrink-0 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Filter size={18} /> Filtros
            </h2>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-primary dark:text-red-400 hover:underline"
              >
                Limpar todos
              </button>
            )}
          </div>

          {/* Search */}
          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider block mb-2">
              Buscar
            </label>
            <input
              type="text"
              placeholder="Título, autor, assunto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Categories */}
          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider block mb-2">
              Categoria
            </label>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
                  selectedCategory === "all"
                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-medium"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                Todas as categorias
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
                    selectedCategory === cat
                      ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Formats */}
          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider block mb-2">
              Formato
            </label>
            <div className="space-y-1">
              {["all", "capa dura", "brochura", "e-book"].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`w-full text-left px-3 py-1.5 text-sm rounded-md capitalize transition-colors ${
                    selectedFormat === fmt
                      ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {fmt === "all" ? "Todos os formatos" : fmt}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile Filters Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex bg-black/50 md:hidden">
            <div className="w-4/5 max-w-sm bg-white dark:bg-gray-900 h-full p-6 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Filtros</h3>
                <button onClick={() => setMobileFilterOpen(false)} aria-label="Fechar filtros">
                  <X size={20} />
                </button>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider block mb-2">
                  Buscar
                </label>
                <input
                  type="text"
                  placeholder="Título, autor..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider block mb-2">
                  Categoria
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setMobileFilterOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Todas as categorias
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setMobileFilterOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-2.5 rounded-lg bg-primary text-white font-medium"
                >
                  Ver Resultados
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Books Grid */}
        <div className="flex-1">
          {filteredBooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 dark:bg-gray-900 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                Nenhum livro encontrado
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-sm">
                Tente ajustar os filtros ou termos da sua busca para encontrar o que procura.
              </p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-900 text-white dark:bg-white dark:text-gray-900"
              >
                Limpar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
