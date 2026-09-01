"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { Book } from "@/types";
import { useCartStore } from "@/store/useCartStore";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(book, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const discountPercentage = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : null;

  return (
    <div className="group relative flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all duration-300">
      <Link href={`/livros/${book.slug}`} className="flex flex-col flex-1 p-3.5 sm:p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-2xl">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-1.5 mb-2.5">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold font-mono uppercase tracking-wide bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
            {book.format}
          </span>
          {discountPercentage ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40">
              -{discountPercentage}%
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              estoque
            </span>
          )}
        </div>

        {/* Cover image container */}
        <div className="relative aspect-3/4 w-full mb-3.5 bg-slate-100 dark:bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center shadow-inner">
          <Image
            src={book.coverUrl}
            alt={`Capa do livro ${book.title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 line-clamp-1 font-mono text-[11px]">
            {book.authors.join(", ")}
          </p>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 line-clamp-2 mb-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {book.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3 mt-auto">
            <div className="flex items-center text-amber-500">
              <Star size={13} className="fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold ml-1 text-slate-800 dark:text-slate-200">
                {book.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
              ({book.ratingsCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
            <span className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
              {book.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            {book.originalPrice && (
              <span className="text-xs text-slate-400 dark:text-slate-500 line-through font-mono">
                {book.originalPrice.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Action button */}
      <div className="p-3.5 sm:p-4 pt-0">
        <button
          onClick={handleAddToCart}
          className={`w-full h-10 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-[0.98] ${
            added
              ? "bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/20"
              : "bg-slate-900 text-white hover:bg-indigo-600 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-indigo-500 dark:hover:text-white shadow-sm"
          }`}
          aria-label={added ? "Adicionado ao carrinho" : `Comprar livro ${book.title}`}
        >
          {added ? (
            <>
              <Check size={16} className="animate-in zoom-in-50" />
              <span>Adicionado!</span>
            </>
          ) : (
            <>
              <ShoppingCart size={15} />
              <span>Adicionar ao Carrinho</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
