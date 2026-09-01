"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShoppingCart,
  Check,
  ArrowLeft,
  Truck,
  ShieldCheck,
  RotateCcw,
  Copy,
  Terminal,
  FileCode2,
} from "lucide-react";
import { Book } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { BookCard } from "@/components/BookCard";

interface BookDetailClientProps {
  book: Book;
  relatedBooks: Book[];
}

export function BookDetailClient({ book, relatedBooks }: BookDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [copiedIsbn, setCopiedIsbn] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(book, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleCopyIsbn = () => {
    navigator.clipboard.writeText(book.isbn);
    setCopiedIsbn(true);
    setTimeout(() => setCopiedIsbn(false), 2000);
  };

  const discountPercentage = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : null;

  return (
    <div className="container-custom py-6 sm:py-10 space-y-10 sm:space-y-14">
      {/* Navigation Breadcrumbs */}
      <nav aria-label="Navegação estrutural" className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        <Link
          href="/livros"
          className="inline-flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
        >
          <ArrowLeft size={15} />
          <span>Catálogo</span>
        </Link>
        <span className="text-slate-300 dark:text-slate-700">/</span>
        <span className="text-slate-900 dark:text-slate-200 font-semibold line-clamp-1 max-w-[200px] sm:max-w-none">
          {book.title}
        </span>
      </nav>

      {/* Main product overview section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Cover Column (4 cols on lg) */}
        <div className="lg:col-span-5 max-w-sm mx-auto lg:max-w-none w-full">
          <div className="relative aspect-[3/4] w-full bg-slate-100 dark:bg-slate-950 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-xl p-4 flex items-center justify-center">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={book.coverUrl}
                alt={`Capa do livro ${book.title}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Details & Purchase Box (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div>
            {/* Category & Format Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80">
                {book.format}
              </span>
              {book.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-900/40"
                >
                  {cat}
                </span>
              ))}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-2">
              {book.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4 font-mono text-xs sm:text-sm">
              Por <span className="font-semibold text-slate-900 dark:text-slate-100">{book.authors.join(", ")}</span>
            </p>

            {/* Rating Stars & Count */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center text-amber-500">
                <Star size={18} className="fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold ml-1.5 text-slate-900 dark:text-white">
                  {book.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono">
                • {book.ratingsCount} avaliações de desenvolvedores
              </span>
            </div>

            {/* Buy Box Card */}
            <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {book.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
                {book.originalPrice && (
                  <>
                    <span className="text-sm sm:text-base text-slate-400 dark:text-slate-500 line-through font-mono">
                      {book.originalPrice.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40">
                      Economize {discountPercentage}%
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status Pill */}
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-emerald-700 dark:text-emerald-400 font-mono">
                  {book.inStock ? "Em estoque para envio imediato" : "Indisponível"}
                </span>
              </div>

              {/* Quantity Controls & Add to Cart Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                {/* Accessible quantity stepper with min 44x44px buttons */}
                <div className="flex items-center justify-between border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/80 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 rounded-lg disabled:opacity-30 active:scale-95 transition-all text-lg font-bold"
                    aria-label="Diminuir quantidade"
                  >
                    -
                  </button>
                  <span className="px-4 font-mono font-bold text-sm text-slate-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 rounded-lg active:scale-95 transition-all text-lg font-bold"
                    aria-label="Aumentar quantidade"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 h-12 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-[0.98] ${
                    added
                      ? "bg-emerald-600 text-white shadow-md ring-2 ring-emerald-500/20"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
                  }`}
                  aria-label={added ? "Livro adicionado ao carrinho" : `Adicionar ${book.title} ao carrinho`}
                >
                  {added ? (
                    <>
                      <Check size={18} className="animate-in zoom-in-50" />
                      <span>Adicionado ao Carrinho!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      <span>Adicionar ao Carrinho</span>
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                  <span>Entrega rápida</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                  <span>Compra 100% segura</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw size={16} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                  <span>30 dias para troca</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specs Developer Card */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
              <FileCode2 size={15} className="text-indigo-600 dark:text-indigo-400" />
              <span>Ficha Técnica</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] text-slate-400 font-mono block">EDITORA</span>
                <span className="font-bold text-slate-900 dark:text-white line-clamp-1">{book.publisher}</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] text-slate-400 font-mono block">ANO</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">{book.year}</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] text-slate-400 font-mono block">PÁGINAS</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">{book.pages}</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] text-slate-400 font-mono block">ISBN</span>
                <button
                  onClick={handleCopyIsbn}
                  className="inline-flex items-center gap-1 font-bold text-slate-900 dark:text-white font-mono hover:text-indigo-600 transition-colors text-left"
                  title="Copiar ISBN"
                >
                  <span className="line-clamp-1">{book.isbn}</span>
                  {copiedIsbn ? (
                    <Check size={12} className="text-emerald-500 flex-shrink-0" />
                  ) : (
                    <Copy size={12} className="text-slate-400 flex-shrink-0" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Synopsis Section */}
      <section className="space-y-4 pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
          <Terminal size={14} />
          <span>README.md</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Sinopse e Visão Geral
        </h2>
        <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm max-w-4xl">
          <p className="whitespace-pre-line">{book.synopsis}</p>
        </div>
      </section>

      {/* Related Books Section */}
      {relatedBooks.length > 0 && (
        <section className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
              <span>#</span>
              <span>RECOMMENDATIONS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Recomendados para você
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedBooks.map((relBook) => (
              <BookCard key={relBook.id} book={relBook} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

