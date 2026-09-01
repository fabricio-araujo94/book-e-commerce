import type { Metadata } from "next";
import { BookOpen, Target, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description: "Conheça a história e o propósito da DevBooks, a livraria especializada em desenvolvimento e tecnologia.",
};

export default function AboutPage() {
  return (
    <div className="container-custom py-12 max-w-4xl space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Sobre a DevBooks</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Nascemos da paixão pela engenharia de software e pelo conhecimento profundo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3">
          <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
            <Target size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Missão</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Capacitar desenvolvedores e arquitetos de software com as melhores obras técnicas do mundo.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3">
          <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
            <BookOpen size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Curadoria</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Seleção criteriosa dos livros mais impactantes de computação, design patterns e cloud.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3">
          <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
            <Award size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Excelência</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Parcerias oficiais com as maiores editoras nacionais e internacionais.
          </p>
        </div>
      </div>

      <section className="space-y-4 bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Nossa História</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Fundada por desenvolvedores apaixonados por tecnologia, a DevBooks foi criada para preencher uma lacuna: um espaço onde a comunidade de tecnologia pudesse encontrar títulos de altíssima qualidade editorial, traduzidos e originais, sem complicação e com foco total no leitor técnico.
        </p>
      </section>
    </div>
  );
}
