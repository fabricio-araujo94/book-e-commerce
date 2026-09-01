import Link from "next/link";
import { BookCard } from "@/components/BookCard";
import { getAllBooks, getUniqueCategories } from "@/lib/books";
import {
  Code2,
  Database,
  Shield,
  Cpu,
  Cloud,
  Layers,
  Sparkles,
  ArrowRight,
  Truck,
  ShieldCheck,
  Award,
  RotateCcw,
  Terminal,
} from "lucide-react";

export default function Home() {
  const books = getAllBooks();
  const featuredBooks = books.filter((b) => b.featured);
  const topRatedBooks = [...books].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const categories = getUniqueCategories();

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "programação":
      case "boas práticas":
      case "refatoração":
        return Code2;
      case "banco de dados":
      case "modelagem de domínio":
        return Database;
      case "segurança":
        return Shield;
      case "inteligência artificial":
        return Cpu;
      case "devops":
      case "devops & cloud":
        return Cloud;
      default:
        return Layers;
    }
  };

  return (
    <div className="flex flex-col gap-10 sm:gap-14 md:gap-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-slate-50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950 py-12 sm:py-16 md:py-24 border-b border-slate-200/80 dark:border-slate-800/80">
        {/* Subtle background glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-indigo-500/5 dark:bg-indigo-500/10 blur-3xl pointer-events-none -z-10" />

        <div className="container-custom flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Hero Left Content */}
          <div className="flex-1 space-y-4 sm:space-y-6 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 text-xs font-semibold font-mono tracking-tight shadow-sm">
              <Terminal size={14} className="text-indigo-600 dark:text-indigo-400" />
              <span>A Livraria dos Devs</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Eleve sua arquitetura com os{" "}
              <span className="bg-linear-to-r from-indigo-600 via-indigo-500 to-rose-500 bg-clip-text text-transparent">
                melhores livros
              </span>{" "}
              técnicos
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Curadoria de alto nível em engenharia de software, Clean Code, DDD, microsserviços, DevOps e inteligência artificial.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/livros"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 active:scale-95 transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                <span>Explorar Todo o Catálogo</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/livros?sortBy=rating"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <Sparkles size={15} className="text-amber-500" />
                <span>Mais Bem Avaliados</span>
              </Link>
            </div>
          </div>

          {/* Hero Right Showcase (Responsive: 1 on mobile, 2 on tablet/desktop) */}
          <div className="flex-1 w-full max-w-sm sm:max-w-md lg:max-w-lg">
            <div className="relative p-2 sm:p-4 rounded-3xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-xl">
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200/80 dark:border-slate-800/80 mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[11px] font-mono text-slate-400">destaques.json</span>
              </div>

              {/* Grid: 1 col on mobile, 2 col on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {featuredBooks.slice(0, 2).map((book, idx) => (
                  <div
                    key={book.id}
                    className={`${idx > 0 ? "hidden sm:block" : "block"} transform hover:-translate-y-1 transition-transform`}
                  >
                    <BookCard book={book} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Truck size={20} />
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Frete Rápido</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">Envio para todo Brasil</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Compra Segura</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">Checkout criptografado</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Award size={20} />
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">100% Original</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">Direto das editoras</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <RotateCcw size={20} />
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Troca Grátis</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">30 dias para devolução</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container-custom">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
              <span>#</span>
              <span>TOPICS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Categorias Populares
            </h2>
          </div>
          <Link
            href="/livros"
            className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center gap-1 group"
          >
            <span>Ver todas</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
          {categories.slice(0, 6).map((cat) => {
            const Icon = getCategoryIcon(cat);
            return (
              <Link
                key={cat}
                href={`/livros?categoria=${encodeURIComponent(cat)}`}
                className="group flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-500/60 dark:hover:border-indigo-500/60 hover:shadow-md transition-all text-center focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <div className="w-10 h-10 mb-2 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all text-slate-600 dark:text-slate-300 shadow-sm">
                  <Icon size={20} />
                </div>
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                  {cat}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="container-custom">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
              <span>#</span>
              <span>CURATED</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Destaques da Semana
            </h2>
          </div>
          <Link
            href="/livros"
            className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center gap-1 group"
          >
            <span>Ver catálogo</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Top Rated Books Section */}
      <section className="container-custom">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-500 font-semibold mb-1">
              <Sparkles size={13} />
              <span>COMMUNITY_FAVORITES</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Mais Bem Avaliados
            </h2>
          </div>
          <Link
            href="/livros?sortBy=rating"
            className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center gap-1 group"
          >
            <span>Ver ranking</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {topRatedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}
