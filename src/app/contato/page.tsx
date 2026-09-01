import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contato & Suporte",
  description: "Fale com nossa equipe de suporte e atendimento ao cliente.",
};

export default function ContactPage() {
  return (
    <div className="container-custom py-12 max-w-4xl space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Fale Conosco</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Dúvidas sobre pedidos, sugestões de livros ou parcerias? Envie-nos uma mensagem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex flex-col items-center text-center space-y-2">
          <Mail className="text-primary" size={24} />
          <h3 className="font-bold text-gray-900 dark:text-white">E-mail</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">contato@devbooks.com.br</p>
        </div>
        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex flex-col items-center text-center space-y-2">
          <Phone className="text-primary" size={24} />
          <h3 className="font-bold text-gray-900 dark:text-white">Telefone</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">+55 (11) 99999-9999</p>
        </div>
        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex flex-col items-center text-center space-y-2">
          <MapPin className="text-primary" size={24} />
          <h3 className="font-bold text-gray-900 dark:text-white">Localização</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Av. Paulista, 1000 - SP</p>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
        <ContactForm />
      </div>
    </div>
  );
}
