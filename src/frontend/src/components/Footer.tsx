import { Link } from "@tanstack/react-router";
import { CircuitBoard, Github, Instagram, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin },
  { label: "GitHub", href: "https://www.github.com", icon: Github },
  { label: "Instagram", href: "https://www.instagram.com", icon: Instagram },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
                <CircuitBoard className="size-5" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-display text-sm font-bold tracking-tight text-foreground">
                  PML Engenharia
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Eletrônica
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Engenharia eletrônica de alto nível: projeto de PCB, automação
              industrial, IoT e desenvolvimento de produtos eletrônicos — do
              conceito à realidade.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-foreground">
              Navegação
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { label: "Sobre", to: "/sobre" },
                { label: "Blog", to: "/blog" },
                { label: "Portfólio", to: "/portfolio" },
                { label: "Loja", to: "/loja" },
                { label: "Contato", to: "/contato" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground transition-smooth hover:text-accent"
                    data-ocid={`footer.link.${link.to.slice(1)}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-foreground">
              Legal
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  to="/termos"
                  className="text-muted-foreground transition-smooth hover:text-accent"
                  data-ocid="footer.link.termos"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  to="/privacidade"
                  className="text-muted-foreground transition-smooth hover:text-accent"
                  data-ocid="footer.link.privacidade"
                >
                  Política de Privacidade
                </Link>
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-smooth hover:border-accent hover:text-accent"
                  data-ocid={`footer.social.${social.label.toLowerCase()}`}
                >
                  <social.icon className="size-4" />
                </a>
              ))}
              <a
                href="mailto:contato@pmlengenharia.com.br"
                aria-label="Enviar e-mail"
                className="flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-smooth hover:border-accent hover:text-accent"
                data-ocid="footer.social.email"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground">
            © {year} Patrício Mateus da Luz. Todos os direitos reservados.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-muted-foreground transition-smooth hover:text-accent"
            data-ocid="footer.attribution"
          >
            © {year}. Built with love using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
