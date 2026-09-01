import type { Metadata } from "next";
import { Mail, Phone, MapPin, Terminal } from "lucide-react";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contato & Suporte",
  description: "Fale com nossa equipe técnica de suporte e atendimento ao cliente.",
};

export default function ContactPage() {
  return (
    <div className="container-custom py-8 sm:py-14 max-w-4xl space-y-8 sm:space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-semibold">
          <Terminal size={13} />
          <span>CONTACT_US</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Fale Conosco
        </h1>
        <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          Dúvidas sobre pedidos, sugestões de novos títulos técnicos ou parcerias? Envie-nos uma mensagem.
        </p>
      </div>

      {/* Direct contact channels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col items-center text-center space-y-2 shadow-sm hover:border-indigo-300 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Mail size={20} />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">E-mail</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">contato@mainbooks.com.br</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col items-center text-center space-y-2 shadow-sm hover:border-indigo-300 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Phone size={20} />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Telefone / WhatsApp</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">+55 (85) 99999-9999</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col items-center text-center space-y-2 shadow-sm hover:border-indigo-300 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <MapPin size={20} />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Localização</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Av. José Bastos, 1000 - CE</p>
        </div>
      </div>

      {/* Form Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <ContactForm />
      </div>
    </div>
  );
}
