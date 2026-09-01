import Link from "next/link";
import { Mail, MapPin, Phone, MessageSquare, Code2, Globe, Play } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    sobre: [
      { label: "Nossa história", href: "/sobre" },
      { label: "Equipe", href: "/sobre#equipe" },
      { label: "Carreiras", href: "/carreiras" },
      { label: "Imprensa", href: "/imprensa" },
      { label: "Sustentabilidade", href: "/sustentabilidade" },
    ],
    ajuda: [
      { label: "Central de ajuda", href: "/ajuda" },
      { label: "Frete e entrega", href: "/ajuda#frete" },
      { label: "Trocas e devoluções", href: "/ajuda#trocas" },
      { label: "Formas de pagamento", href: "/ajuda#pagamento" },
      { label: "Perguntas frequentes", href: "/ajuda#faq" },
    ],
    categorias: [
      { label: "Programação", href: "/livros?categoria=Programação" },
      { label: "Arquitetura de Software", href: "/livros?categoria=Arquitetura%20de%20Software" },
      { label: "DevOps & Cloud", href: "/livros?categoria=DevOps" },
      { label: "Banco de Dados", href: "/livros?categoria=Banco%20de%20Dados" },
      { label: "Inteligência Artificial", href: "/livros?categoria=Inteligência%20Artificial" },
      { label: "Segurança", href: "/livros?categoria=Segurança" },
    ],
    contato: {
      email: "contato@devbooks.com.br",
      phone: "+55 (11) 99999-9999",
      address: "Av. Paulista, 1000 - São Paulo/SP",
    },
    social: [
      { label: "LinkedIn", href: "https://linkedin.com/company/devbooks", icon: MessageSquare },
      { label: "GitHub", href: "https://github.com/devbooks", icon: Code2 },
      { label: "Twitter", href: "https://twitter.com/devbooks", icon: Globe },
      { label: "YouTube", href: "https://youtube.com/devbooks", icon: Play },
    ],
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800" role="contentinfo">
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white" aria-label="DevBooks - Página inicial">
              <span className="text-primary" aria-hidden="true">DevBooks</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              Sua livraria especializada em livros técnicos e de programação. Curadoria seleta para desenvolvedores que buscam excelência.
            </p>
            <nav aria-label="Redes sociais">
              <ul className="flex gap-4" role="list">
                {footerLinks.social.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
                      aria-label={`DevBooks no ${social.label}`}
                    >
                      <social.icon size={20} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <nav aria-label="Sobre a DevBooks">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Sobre</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.sobre.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Ajuda e suporte">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Ajuda</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.ajuda.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Categorias de livros">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Categorias</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.categorias.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div aria-label="Informações de contato">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Contato</h3>
            <address className="not-italic space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-start gap-3">
                <Mail className="text-primary mt-0.5 flex-shrink-0" size={18} aria-hidden="true" />
                <a
                  href={`mailto:${footerLinks.contato.email}`}
                  className="hover:text-primary dark:hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 rounded"
                >
                  {footerLinks.contato.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-primary mt-0.5 flex-shrink-0" size={18} aria-hidden="true" />
                <a
                  href={`tel:${footerLinks.contato.phone.replace(/\D/g, "")}`}
                  className="hover:text-primary dark:hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 rounded"
                >
                  {footerLinks.contato.phone}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-primary mt-0.5 flex-shrink-0" size={18} aria-hidden="true" />
                <span>{footerLinks.contato.address}</span>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
              © {currentYear} DevBooks. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <Link
                href="/privacidade"
                className="hover:text-primary dark:hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 rounded"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/termos"
                className="hover:text-primary dark:hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 rounded"
              >
                Termos de Uso
              </Link>
              <Link
                href="/cookies"
                className="hover:text-primary dark:hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 rounded"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}