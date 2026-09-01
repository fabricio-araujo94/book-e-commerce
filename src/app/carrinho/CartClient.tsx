"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  Tag,
  Check,
  Terminal,
} from "lucide-react";
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
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-48" />
          <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const freeShippingThreshold = 150;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 19.9;
  const total = subtotal - discount + shipping;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === "DEV10") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Cupom inválido. Experimente 'DEV10'.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-custom py-16 sm:py-24">
        <div className="max-w-md mx-auto text-center space-y-6 p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-sm">
            <ShoppingBag size={32} />
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-xs font-mono text-slate-400 mb-1">
              <Terminal size={12} />
              <span>cart.length === 0</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Seu carrinho está vazio
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xs mx-auto">
              Nenhum livro técnico adicionado ainda. Explore nossos títulos essenciais para devs!
            </p>
          </div>
          <Link
            href="/livros"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 active:scale-95 transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <span>Explorar Catálogo</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-6 sm:py-10 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
            <Terminal size={14} />
            <span>CHECKOUT_PIPELINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Carrinho de Compras
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline self-start sm:self-auto"
        >
          Esvaziar carrinho
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Items List (8 cols on lg) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          {items.map(({ book, quantity }) => (
            <div
              key={book.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm"
            >
              {/* Product Thumbnail & Details */}
              <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                <div className="relative w-16 h-22 sm:w-20 sm:h-26 bg-slate-100 dark:bg-slate-950 rounded-xl overflow-hidden shrink-0 shadow-sm">
                  <Image
                    src={book.coverUrl}
                    alt={`Capa do livro ${book.title}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mb-1">
                    {book.format}
                  </span>
                  <Link
                    href={`/livros/${book.slug}`}
                    className="block font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-1"
                  >
                    {book.title}
                  </Link>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono text-[11px] line-clamp-1 mb-1">
                    {book.authors.join(", ")}
                  </p>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">
                    {book.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              </div>

              {/* Quantity Controls, Total Price & Remove Button */}
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800/80">
                {/* Stepper with accessible touch targets */}
                <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/80 p-0.5">
                  <button
                    onClick={() => updateQuantity(book.id, quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 rounded-lg text-sm font-bold active:scale-95"
                    aria-label={`Diminuir quantidade de ${book.title}`}
                  >
                    -
                  </button>
                  <span className="px-2.5 font-mono font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(book.id, quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 rounded-lg text-sm font-bold active:scale-95"
                    aria-label={`Aumentar quantidade de ${book.title}`}
                  >
                    +
                  </button>
                </div>

                {/* Subtotal for this book */}
                <div className="text-right min-w-18.7">
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white font-mono">
                    {(book.price * quantity).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => removeItem(book.id)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors focus-visible:ring-2 focus-visible:ring-rose-500"
                  aria-label={`Remover ${book.title} do carrinho`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Link
              href="/livros"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Continuar comprando</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Sticky Card (4-5 cols on lg) */}
        <aside className="lg:col-span-5 xl:col-span-4 sticky top-20">
          <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span>Resumo do Pedido</span>
              <span className="text-xs font-mono font-normal text-slate-400">
                {items.reduce((acc, i) => acc + i.quantity, 0)} itens
              </span>
            </h2>

            {/* Free shipping progress bar */}
            <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/30 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                  <Truck size={14} className="text-indigo-600 dark:text-indigo-400" />
                  {subtotal >= freeShippingThreshold ? "Frete Grátis garantido!" : "Frete Grátis"}
                </span>
                <span className="font-mono font-bold text-indigo-700 dark:text-indigo-400">
                  {freeShippingProgress}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-indigo-200/60 dark:bg-indigo-900/60 overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
              {subtotal < freeShippingThreshold && (
                <p className="text-[11px] text-indigo-700 dark:text-indigo-300 font-medium">
                  Adicione mais{" "}
                  <span className="font-bold font-mono">
                    {(freeShippingThreshold - subtotal).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>{" "}
                  para frete grátis!
                </p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-slate-200">
                  {subtotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>

              {couponApplied && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span className="flex items-center gap-1">
                    <Tag size={13} /> Desconto DEV10 (10%)
                  </span>
                  <span className="font-mono">
                    -
                    {discount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Frete</span>
                <span className="font-mono font-semibold">
                  {shipping === 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
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

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                <span>Total</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">
                  {total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label htmlFor="coupon-input" className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-mono">
                Cupom Promocional
              </label>
              <div className="flex gap-2">
                <input
                  id="coupon-input"
                  type="text"
                  placeholder="Ex: DEV10"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  disabled={couponApplied}
                  className="flex-1 px-3 py-2.5 text-xs font-mono uppercase border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={couponApplied || !coupon.trim()}
                  className="px-4 py-2.5 text-xs font-bold rounded-xl bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 hover:bg-slate-900 dark:hover:bg-white disabled:opacity-40 active:scale-95 transition-all"
                >
                  {couponApplied ? <Check size={14} /> : "Aplicar"}
                </button>
              </div>
              {couponError && <p className="text-xs text-rose-500 font-medium">{couponError}</p>}
              {couponApplied && (
                <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Cupom DEV10 ativado (-10%)</span>
                  <button
                    type="button"
                    onClick={() => {
                      setCouponApplied(false);
                      setCoupon("");
                    }}
                    className="text-rose-500 hover:underline"
                  >
                    Remover
                  </button>
                </div>
              )}
            </form>

            {/* Checkout Action */}
            <button
              onClick={() => alert("Simulação: Pedido finalizado com sucesso!")}
              className="w-full h-12 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-md focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <span>Finalizar Compra</span>
              <ArrowRight size={16} />
            </button>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Checkout seguro com criptografia TLS 256-bit</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
