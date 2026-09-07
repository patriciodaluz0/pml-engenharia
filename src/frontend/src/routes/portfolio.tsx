import { SectionHeading } from "@/components/SectionHeading";
import { Watermark } from "@/components/Watermark";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProjects } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export default function PortfolioPage() {
  const { data: projects = [], isLoading } = useProjects();

  return (
    <div>
      <section className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="Portfólio"
            title="Nossos projetos"
            description="Uma seleção de projetos de engenharia eletrônica que desenvolvemos para diferentes setores."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, i) => `skeleton-${i}`).map((id) => (
              <div
                key={id}
                className="h-80 animate-pulse rounded-xl border border-border bg-muted"
                data-ocid="portfolio.loading"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.slug}
                className="group overflow-hidden border-border bg-card transition-smooth hover:border-accent/50 hover:shadow-elevated"
                data-ocid={`portfolio.card.${project.slug}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Watermark
                    src={project.images[0]}
                    alt={project.title}
                    className="size-full"
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                      {project.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {project.year.toString()}
                    </span>
                  </div>
                  <CardTitle className="font-display text-lg">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                  <Button
                    asChild
                    variant="link"
                    className="w-fit px-0"
                    data-ocid={`portfolio.link.${project.slug}`}
                  >
                    <Link to="/portfolio/$slug" params={{ slug: project.slug }}>
                      Ver detalhes
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
