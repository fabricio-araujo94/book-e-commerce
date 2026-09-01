"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-8 text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800">
        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 size={24} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Mensagem Enviada!</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
          Obrigado pelo contato! Nossa equipe responderá em até 1 dia útil.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
            Nome Completo
          </label>
          <input
            id="name"
            required
            type="text"
            placeholder="Seu nome"
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
            E-mail
          </label>
          <input
            id="email"
            required
            type="email"
            placeholder="seu@email.com"
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
          Assunto
        </label>
        <input
          id="subject"
          required
          type="text"
          placeholder="Sobre o que você quer falar?"
          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
          Mensagem
        </label>
        <textarea
          id="message"
          required
          rows={4}
          placeholder="Digite sua mensagem aqui..."
          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
      >
        <Send size={16} />
        Enviar Mensagem
      </button>
    </form>
  );
}
