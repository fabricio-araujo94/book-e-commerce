import Link from "next/link";
import { BookCard } from "@/components/BookCard";
import { getAllBooks, getUniqueCategories } from "@/lib/books";
import { BookOpen, ShieldCheck, Truck, ArrowRight, Sparkles, Award, RotateCcw } from "lucide-react";

export default function Home() {
  const books = getAllBooks();
  const featuredBooks = books.filter((b) => b.featured);
  const topRatedBooks = [...books].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const categories = getUniqueCategories();

  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-16 md:py-24 border-b border-gray-200 dark:border-gray-800">
        <div className="container-custom flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary dark:bg-primary/20 text-xs font-semibold">
              <Sparkles size={14} />
              <span>Livraria especializada em tecnologia</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
              Eleve sua carreira com os <span className="text-primary dark:text-red-400">melhores livros</span> técnicos
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
              Curadoria especializada em engenharia de software, arquitetura, boas práticas, cloud, dados e inteligência artificial.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/livros"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-sm"
              >
                Explorar Catálogo
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/livros?sortBy=rating"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-gray-900 dark:text-white"
              >
                Mais Bem Avaliados
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md lg:max-w-none grid grid-cols-2 gap-4">
            {featuredBooks.slice(0, 2).map((book) => (
              <div key={book.id} className="transform hover:-translate-y-1 transition-transform">
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
              <Truck size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Frete Rápido</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Entrega garantida para todo o Brasil</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Compra Segura</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Ambiente 100% protegido</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
              <Award size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Qualidade Editorial</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Edições originais e revisadas</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
              <RotateCcw size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Troca Grátis</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Até 30 dias após o recebimento</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container-custom">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Categorias Populares</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Encontre títulos por área de interesse</p>
          </div>
          <Link
            href="/livros"
            className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1"
          >
            Ver todas <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.slice(0, 6).map((cat) => (
            <Link
              key={cat}
              href={`/livros?categoria=${encodeURIComponent(cat)}`}
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-primary dark:hover:border-primary hover:shadow-sm transition-all text-center group"
            >
              <div className="p-2.5 mb-2 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10 transition-colors">
                <BookOpen size={20} className="text-gray-700 dark:text-gray-300 group-hover:text-primary" />
              </div>
              <span className="text-xs font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">
                {cat}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Books */}
      <section className="container-custom">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Destaques da Semana</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Títulos essenciais selecionados pelos nossos especialistas</p>
          </div>
          <Link
            href="/livros?featured=true"
            className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1"
          >
            Ver todos <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Top Rated Books */}
      <section className="container-custom">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mais Bem Avaliados</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Os favoritos da nossa comunidade de desenvolvedores</p>
          </div>
          <Link
            href="/livros?sortBy=rating"
            className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1"
          >
            Ver todos <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topRatedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}
