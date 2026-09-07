import { Watermark } from "@/components/Watermark";
import { Button } from "@/components/ui/button";
import { useProject } from "@/hooks/useQueries";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Cpu } from "lucide-react";

export default function PortfolioDetailPage() {
  const { slug } = useParams({ from: "/portfolio/$slug" });
  const { data: project, isLoading } = useProject(slug);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div
          className="h-10 w-2/3 animate-pulse rounded bg-muted"
          data-ocid="portfolio_detail.loading"
        />
        <div className="mt-6 h-80 animate-pulse rounded-xl bg-muted" />
        <div className="mt-6 space-y-3">
          <div className="h-4 animate-pulse rounded bg-muted" />
          <div className="h-4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Projeto não encontrado
        </h1>
        <p className="mt-4 text-muted-foreground">
          O projeto que você procura não está disponível.
        </p>
        <Button asChild className="mt-8" data-ocid="portfolio_detail.back">
          <Link to="/portfolio">
            <ArrowLeft className="size-4" />
            Voltar ao portfólio
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <article>
      <section className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="mb-6 -ml-2"
            data-ocid="portfolio_detail.back"
          >
            <Link to="/portfolio">
              <ArrowLeft className="size-4" />
              Voltar ao portfólio
            </Link>
          </Button>
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {project.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <CalendarDays className="size-4" />
              {project.year.toString()}
            </span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {project.title}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Watermark
          src={project.images[0]}
          alt={project.title}
          className="aspect-[16/9] w-full rounded-xl border border-border"
          imgClassName="rounded-xl"
        />
        <div className="prose prose-invert mt-10 max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed">
          {project.description.split("\n\n").map((paragraph, index) => (
            <p key={`${project.slug}-p-${index}`}>{paragraph}</p>
          ))}
        </div>

        {project.specifications.length > 0 ? (
          <div className="mt-10">
            <h2 className="font-display text-xl font-bold text-foreground">
              Especificações técnicas
            </h2>
            <dl className="mt-5 divide-y divide-border overflow-hidden rounded-xl border border-border">
              {project.specifications.map((spec) => (
                <div
                  key={spec.caption}
                  className="flex items-center justify-between gap-4 bg-card px-5 py-4"
                  data-ocid={`portfolio_detail.spec.${spec.caption.toLowerCase().replace(/\s+/g, "_")}`}
                >
                  <dt className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                    <Cpu className="size-4 text-accent" />
                    {spec.caption}
                  </dt>
                  <dd className="text-sm text-muted-foreground">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild data-ocid="portfolio_detail.cta">
            <Link to="/contato">Solicitar projeto semelhante</Link>
          </Button>
          <Button asChild variant="outline" data-ocid="portfolio_detail.all">
            <Link to="/portfolio">Ver outros projetos</Link>
          </Button>
        </div>
      </section>
    </article>
  );
}
