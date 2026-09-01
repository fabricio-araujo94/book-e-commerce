import type { Metadata } from "next";
import { BookOpen, Target, Award, Terminal, Code2, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description: "Conheça a história e o propósito da MainBooks, a livraria especializada em engenharia de software e tecnologia.",
};

export default function AboutPage() {
  return (
    <div className="container-custom py-8 sm:py-14 max-w-4xl space-y-10 sm:space-y-14">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-semibold">
          <Terminal size={13} />
          <span>ABOUT_MAINBOOKS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Nossa Missão é Potencializar Desenvolvedores
        </h1>
        <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Nascemos da convicção de que o verdadeiro domínio da engenharia de software vem da profundidade conceitual encontrada nos grandes clássicos e nas melhores referências mundiais.
        </p>
      </div>

      {/* Values Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3 shadow-sm hover:border-indigo-300 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Target size={22} />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Propósito Claro</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Eliminar o ruído superficial e entregar o conhecimento técnico fundamental que permanece relevante por décadas.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3 shadow-sm hover:border-indigo-300 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <BookOpen size={22} />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Curadoria Rígida</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Cada livro em nosso catálogo é avaliado por profissionais experientes em arquitetura, código limpo e sistemas distribuídos.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3 shadow-sm hover:border-indigo-300 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Award size={22} />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Parcerias Oficiais</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Trabalhamos diretamente com as maiores editoras (Alta Books, Bookman, Addison-Wesley, O&apos;Reilly) para garantir edições autênticas.
          </p>
        </div>
      </div>

      {/* Manifesto Box */}
      <section className="space-y-4 bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
          <Code2 size={16} />
          <span>manifesto.md</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Por que livros físicos no mundo digital?
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Em uma era de tutoriais rápidos de 5 minutos e documentações fragmentadas, o estudo deliberado e profundo de uma obra completa continua sendo o maior diferencial competitivo de engenheiros de software seniores e arquitetos.
          </p>
          <p>
            Um livro técnico clássico não ensina apenas sintaxe que fica obsoleta em 6 meses — ele ensina como modelar domínios complexos, como projetar sistemas resilientes e como escrever código sustentável para os próximos 10 anos.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>Curadoria por desenvolvedores</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>Envio rápido e embalagem reforçada</span>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white text-center space-y-4 shadow-xl">
        <Sparkles size={28} className="mx-auto text-indigo-200" />
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Pronto para elevar seu código?</h2>
        <p className="text-xs sm:text-sm text-indigo-100 max-w-md mx-auto">
          Explore nossa seleção de livros e encontre a próxima obra que vai transformar sua carreira.
        </p>
        <div className="pt-2">
          <Link
            href="/livros"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white text-indigo-900 font-bold text-sm hover:bg-slate-100 active:scale-95 transition-all shadow-md"
          >
            Explorar Catálogo de Livros
          </Link>
        </div>
      </div>
    </div>
  );
}
