import { Button } from "@/components/ui/button";
import { useArticle } from "@/hooks/useQueries";
import { articleImage, formatDate, formatReadTime } from "@/lib/utils";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";

export default function BlogDetailPage() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const { data: article, isLoading } = useArticle(slug);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div
          className="h-10 w-2/3 animate-pulse rounded bg-muted"
          data-ocid="blog_detail.loading"
        />
        <div className="mt-6 h-72 animate-pulse rounded-xl bg-muted" />
        <div className="mt-6 space-y-3">
          <div className="h-4 animate-pulse rounded bg-muted" />
          <div className="h-4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Artigo não encontrado
        </h1>
        <p className="mt-4 text-muted-foreground">
          O artigo que você procura não está disponível.
        </p>
        <Button asChild className="mt-8" data-ocid="blog_detail.back">
          <Link to="/blog">
            <ArrowLeft className="size-4" />
            Voltar ao blog
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <article
      onContextMenu={(event) => event.preventDefault()}
      onCopy={(event) => event.preventDefault()}
    >
      <section className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="mb-6 -ml-2"
            data-ocid="blog_detail.back"
          >
            <Link to="/blog">
              <ArrowLeft className="size-4" />
              Voltar ao blog
            </Link>
          </Button>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {article.category}
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {article.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4" />
              {formatReadTime(article.readTimeMinutes)} de leitura
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <img
          src={articleImage(article.slug, article.category)}
          alt={article.title}
          className="aspect-[16/9] w-full rounded-xl border border-border object-cover"
          data-ocid="blog_detail.image"
        />
        <div className="prose prose-invert mt-10 max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed">
          {article.content.split("\n\n").map((paragraph, index) => (
            <p key={`${article.slug}-p-${index}`}>{paragraph}</p>
          ))}
        </div>
      </section>
    </article>
  );
}
