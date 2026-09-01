"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Check, ArrowLeft, Truck, ShieldCheck, BookCheck } from "lucide-react";
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
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(book, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discountPercentage = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : null;

  return (
    <div className="container-custom py-8 space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/livros"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
        >
          <ArrowLeft size={16} />
          Voltar para o catálogo
        </Link>
      </div>

      {/* Main product section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {/* Cover */}
        <div className="md:col-span-5 lg:col-span-4">
          <div className="relative aspect-[2/3] w-full bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
            <Image
              src={book.coverUrl}
              alt={`Capa do livro ${book.title}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Details & Buy Box */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                {book.format}
              </span>
              {book.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-red-300"
                >
                  {cat}
                </span>
              ))}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
              {book.title}
            </h1>

            <p className="text-base text-gray-600 dark:text-gray-400 mb-4">
              Por <span className="font-semibold text-gray-900 dark:text-white">{book.authors.join(", ")}</span>
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center text-amber-500">
                <Star size={18} className="fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold ml-1.5 text-gray-900 dark:text-white">
                  {book.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                • {book.ratingsCount} avaliações de clientes
              </span>
            </div>

            {/* Price Box */}
            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  {book.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
                {book.originalPrice && (
                  <>
                    <span className="text-base text-gray-400 line-through">
                      {book.originalPrice.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400">
                      Economize {discountPercentage}%
                    </span>
                  </>
                )}
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 text-sm">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="font-medium text-emerald-700 dark:text-emerald-400">
                  {book.inStock ? "Em estoque - Envio imediato" : "Indisponível"}
                </span>
              </div>

              {/* Add to cart controls */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
                    aria-label="Diminuir quantidade"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label="Aumentar quantidade"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 w-full sm:w-auto py-3 px-6 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary ${
                    added
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                  }`}
                >
                  {added ? (
                    <>
                      <Check size={18} />
                      Adicionado ao Carrinho!
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      Adicionar ao Carrinho
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-primary" />
                  <span>Entrega para todo o Brasil</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-primary" />
                  <span>Pagamento 100% Seguro</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs">
            <div>
              <span className="text-gray-400 block">Editora</span>
              <span className="font-semibold text-gray-900 dark:text-white">{book.publisher}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Ano</span>
              <span className="font-semibold text-gray-900 dark:text-white">{book.year}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Páginas</span>
              <span className="font-semibold text-gray-900 dark:text-white">{book.pages}</span>
            </div>
            <div>
              <span className="text-gray-400 block">ISBN</span>
              <span className="font-semibold text-gray-900 dark:text-white">{book.isbn}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Synopsis */}
      <section className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <BookCheck size={20} className="text-primary" />
          Sinopse do Livro
        </h2>
        <div className="text-base text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <p>{book.synopsis}</p>
        </div>
      </section>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Quem comprou este livro também comprou
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedBooks.map((relBook) => (
              <BookCard key={relBook.id} book={relBook} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
