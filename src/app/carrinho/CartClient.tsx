"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useMounted } from "@/hooks/useMounted";
import { useState } from "react";

export function CartClient() {
  const mounted = useMounted();
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  if (!mounted) {
    return (
      <div className="container-custom py-12">
        <div className="animate-pulse space-y-4 max-w-4xl mx-auto">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-48" />
          <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl" />
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 19.9;
  const total = subtotal - discount + shipping;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === "DEV10") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Cupom inválido. Tente 'DEV10'.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-custom py-16">
        <div className="max-w-md mx-auto text-center space-y-6 p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <ShoppingBag size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Seu carrinho está vazio</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Você ainda não adicionou nenhum livro ao seu carrinho.
            </p>
          </div>
          <Link
            href="/livros"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-semibold hover:opacity-90 transition-opacity"
          >
            Explorar Livros
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Carrinho de Compras</h1>
        <button
          onClick={clearCart}
          className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 hover:underline"
        >
          Esvaziar carrinho
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map(({ book, quantity }) => (
            <div
              key={book.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-24 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={book.coverUrl}
                    alt={book.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {book.format}
                  </span>
                  <Link
                    href={`/livros/${book.slug}`}
                    className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary line-clamp-1"
                  >
                    {book.title}
                  </Link>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {book.authors.join(", ")}
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
                    {book.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              </div>

              {/* Quantity Controls & Remove */}
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-800">
                <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg">
                  <button
                    onClick={() => updateQuantity(book.id, quantity - 1)}
                    className="px-2.5 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Diminuir"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-semibold">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(book.id, quantity + 1)}
                    className="px-2.5 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Aumentar"
                  >
                    +
                  </button>
                </div>

                <div className="text-right min-w-[80px]">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {(book.price * quantity).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>

                <button
                  onClick={() => removeItem(book.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Remover item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-4">
            <Link
              href="/livros"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              Continuar comprando
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white pb-4 border-b border-gray-200 dark:border-gray-800">
              Resumo do Pedido
            </h2>

            {/* Subtotal & calculations */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>
                  {subtotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>

              {couponApplied && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Desconto (10% DEV10)</span>
                  <span>
                    -
                    {discount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Truck size={14} /> Frete
                </span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      Grátis
                    </span>
                  ) : (
                    shipping.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  )}
                </span>
              </div>

              {subtotal < 150 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                  Adicione mais{" "}
                  {(150 - subtotal).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}{" "}
                  para ganhar frete grátis!
                </p>
              )}

              <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex justify-between text-base font-extrabold text-gray-900 dark:text-white">
                <span>Total</span>
                <span>
                  {total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </div>

            {/* Coupon Code */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label htmlFor="coupon" className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Cupom de Desconto
              </label>
              <div className="flex gap-2">
                <input
                  id="coupon"
                  type="text"
                  placeholder="Ex: DEV10"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white uppercase placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Aplicar
                </button>
              </div>
              {couponError && <p className="text-xs text-red-500">{couponError}</p>}
              {couponApplied && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  Cupom aplicado com sucesso!
                </p>
              )}
            </form>

            {/* Checkout Button */}
            <button
              onClick={() => alert("Simulação: Compra finalizada com sucesso!")}
              className="w-full py-3.5 px-6 rounded-xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-bold text-base flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-sm"
            >
              Finalizar Pedido
              <ArrowRight size={18} />
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span>Checkout 100% seguro com criptografia SSL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
