import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { CircuitBoard, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Início", to: "/" },
  { label: "Sobre", to: "/sobre" },
  { label: "Blog", to: "/blog" },
  { label: "Portfólio", to: "/portfolio" },
  { label: "Loja", to: "/loja" },
  { label: "Contato", to: "/contato" },
] as const;

export function Header() {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          data-ocid="header.brand"
        >
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
        </Link>

        {!isMobile ? (
          <nav
            className="flex items-center gap-1"
            aria-label="Navegação principal"
            data-ocid="header.nav"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:bg-accent hover:text-accent-foreground [&.active]:bg-accent [&.active]:text-accent-foreground"
                activeOptions={{ exact: link.to === "/" }}
                data-ocid={`header.link.${link.to === "/" ? "inicio" : link.to.slice(1)}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ) : null}

        <div className="flex items-center gap-2">
          {!isMobile ? (
            <Button asChild size="sm" data-ocid="header.cta">
              <Link to="/contato">Solicitar Orçamento</Link>
            </Button>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setMenuOpen((open) => !open)}
              data-ocid="header.menu_toggle"
            >
              {menuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </Button>
          )}
        </div>
      </div>

      {isMobile && menuOpen ? (
        <nav
          className="border-t border-border bg-card px-4 py-3"
          aria-label="Navegação móvel"
          data-ocid="header.mobile_nav"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-smooth hover:bg-accent hover:text-accent-foreground",
                  "[&.active]:bg-accent [&.active]:text-accent-foreground",
                )}
                activeOptions={{ exact: link.to === "/" }}
                data-ocid={`header.mobile_link.${link.to === "/" ? "inicio" : link.to.slice(1)}`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              size="sm"
              className="mt-2"
              data-ocid="header.mobile_cta"
            >
              <Link to="/contato" onClick={() => setMenuOpen(false)}>
                Solicitar Orçamento
              </Link>
            </Button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
