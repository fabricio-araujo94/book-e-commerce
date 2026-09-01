import Link from "next/link";
import { Mail, MapPin, Phone, Terminal, Heart } from "lucide-react";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function YoutubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    sobre: [
      { label: "Nossa história", href: "/sobre" },
      { label: "Manifesto Tech", href: "/sobre#manifesto" },
      { label: "Contato & Suporte", href: "/contato" },
    ],
    ajuda: [
      { label: "Catálogo Geral", href: "/livros" },
      { label: "Mais Bem Avaliados", href: "/livros?sortBy=rating" },
      { label: "Lançamentos", href: "/livros?sortBy=newest" },
    ],
    categorias: [
      { label: "Programação", href: "/livros?categoria=Programação" },
      { label: "Arquitetura de Software", href: "/livros?categoria=Arquitetura%20de%20Software" },
      { label: "Boas Práticas", href: "/livros?categoria=Boas%20Práticas" },
      { label: "Refatoração", href: "/livros?categoria=Refatoração" },
    ],
    contato: {
      email: "contato@mainbooks.com.br",
      phone: "+55 (85) 99999-9999",
      address: "Av. José Bastos, 1000 - Fortaleza/CE",
    },
    social: [
      { label: "GitHub", href: "https://github.com", icon: GithubIcon },
      { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
      { label: "Twitter", href: "https://twitter.com", icon: TwitterIcon },
      { label: "YouTube", href: "https://youtube.com", icon: YoutubeIcon },
    ],
  };

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 text-slate-600 dark:text-slate-400" role="contentinfo">
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Column (2 cols on lg) */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white"
              aria-label="MainBooks - Ir para página inicial"
            >
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-mono text-xs">
                <Terminal size={16} />
              </div>
              <span>
                Main<span className="text-indigo-600 dark:text-indigo-400">Books</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Sua livraria online especializada em livros técnicos, arquitetura e engenharia de software. Curadoria rigorosa para desenvolvedores que buscam maestria.
            </p>

            {/* Social icons */}
            <div className="pt-2">
              <span className="sr-only">Redes sociais</span>
              <ul className="flex items-center gap-2" role="list">
                {footerLinks.social.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-500"
                        aria-label={`Seguir MainBooks no ${item.label}`}
                      >
                        <Icon size={16} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Links: Sobre */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
              Institucional
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm" role="list">
              {footerLinks.sobre.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Explorar */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
              Explorar
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm" role="list">
              {footerLinks.ajuda.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Contato */}
          <div className="col-span-2 sm:col-span-1 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
              Atendimento
            </h3>
            <address className="not-italic space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                <a
                  href={`mailto:${footerLinks.contato.email}`}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-mono text-xs"
                >
                  {footerLinks.contato.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                <a
                  href={`tel:${footerLinks.contato.phone.replace(/\D/g, "")}`}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-mono text-xs"
                >
                  {footerLinks.contato.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <MapPin size={14} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>{footerLinks.contato.address}</span>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="mt-12 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p className="flex items-center gap-1 text-center sm:text-left">
            <span>© {currentYear} MainBooks. Feito com</span>
            <Heart size={12} className="text-rose-500 fill-rose-500 inline" />
            <span>para desenvolvedores.</span>
          </p>
          <div className="flex items-center gap-4 text-xs">
            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
              v1.0.0
            </span>
            <span className="text-slate-400">•</span>
            <span>Todos os direitos reservados</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
