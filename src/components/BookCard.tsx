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
    setTimeout(() => setAdded(false), 1500);
  };

  const discountPercentage = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : null;

  return (
    <div className="group relative flex flex-col justify-between bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">
      <Link href={`/livros/${book.slug}`} className="flex flex-col flex-1 p-4">
        {/* Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 capitalize">
            {book.format}
          </span>
          {discountPercentage && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Cover image */}
        <div className="relative aspect-[2/3] w-full mb-4 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
          <Image
            src={book.coverUrl}
            alt={`Capa do livro ${book.title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 line-clamp-1">
            {book.authors.join(", ")}
          </p>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-primary dark:group-hover:text-primary transition-colors">
            {book.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3 mt-auto">
            <div className="flex items-center text-amber-500">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span className="text-xs font-medium ml-1 text-gray-700 dark:text-gray-300">
                {book.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-gray-400">
              ({book.ratingsCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {book.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            {book.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
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
      <div className="p-4 pt-0">
        <button
          onClick={handleAddToCart}
          className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary ${
            added
              ? "bg-emerald-600 text-white"
              : "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"
          }`}
          aria-label={added ? "Adicionado ao carrinho" : `Adicionar ${book.title} ao carrinho`}
        >
          {added ? (
            <>
              <Check size={16} />
              <span>Adicionado!</span>
            </>
          ) : (
            <>
              <ShoppingCart size={16} />
              <span>Comprar</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
