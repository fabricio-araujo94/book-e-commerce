"use client";

import { useState } from "react";
import { Send, CheckCircle2, Terminal } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="p-8 sm:p-10 text-center space-y-4 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-3xl border border-emerald-200 dark:border-emerald-800 animate-in zoom-in-95 duration-200">
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 size={28} />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Mensagem Enviada com Sucesso!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
            Obrigado pelo contato! Nossa equipe de suporte técnico responderá em até 1 dia útil.
          </p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline pt-2 inline-block"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-400">
        <Terminal size={14} className="text-indigo-600" />
        <span>message_payload.json</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
            Nome Completo <span className="text-rose-500">*</span>
          </label>
          <input
            id="name"
            required
            type="text"
            placeholder="Linus Torvalds"
            className="w-full px-3.5 py-2.5 text-sm border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
            E-mail Profissional <span className="text-rose-500">*</span>
          </label>
          <input
            id="email"
            required
            type="email"
            placeholder="dev@empresa.com"
            className="w-full px-3.5 py-2.5 text-sm border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
          Assunto <span className="text-rose-500">*</span>
        </label>
        <input
          id="subject"
          required
          type="text"
          placeholder="Ex: Dúvida sobre entrega ou sugestão de título"
          className="w-full px-3.5 py-2.5 text-sm border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
          Mensagem <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={4}
          placeholder="Escreva sua mensagem com o máximo de detalhes..."
          className="w-full px-3.5 py-2.5 text-sm border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto px-7 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-95 disabled:opacity-50 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        <Send size={15} />
        <span>{loading ? "Enviando..." : "Enviar Mensagem"}</span>
      </button>
    </form>
  );
}

