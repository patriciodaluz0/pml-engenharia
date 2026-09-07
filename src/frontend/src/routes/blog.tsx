import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useArticles } from "@/hooks/useQueries";
import { articleImage, formatDate, formatReadTime } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";

export default function BlogPage() {
  const { data: articles = [], isLoading } = useArticles();

  return (
    <div>
      <section className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="Blog"
            title="Artigos e novidades"
            description="Conteúdo técnico sobre engenharia eletrônica, IoT, automação e desenvolvimento de produtos."
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
                data-ocid="blog.loading"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Card
                key={article.slug}
                className="group overflow-hidden border-border bg-card transition-smooth hover:border-accent/50 hover:shadow-elevated"
                data-ocid={`blog.card.${article.slug}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-subtle">
                  <img
                    src={articleImage(article.slug, article.category)}
                    alt={article.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-background/80 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-accent backdrop-blur">
                    {article.category}
                  </span>
                </div>
                <CardHeader>
                  <CardTitle className="font-display text-lg leading-snug">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {article.summary}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" />
                      {formatDate(article.publishedAt)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      {formatReadTime(article.readTimeMinutes)} de leitura
                    </span>
                  </div>
                  <Button
                    asChild
                    variant="link"
                    className="w-fit px-0"
                    data-ocid={`blog.link.${article.slug}`}
                  >
                    <Link to="/blog/$slug" params={{ slug: article.slug }}>
                      Ler artigo
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
