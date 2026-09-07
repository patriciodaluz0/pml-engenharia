import { SectionHeading } from "@/components/SectionHeading";
import { Watermark } from "@/components/Watermark";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProducts } from "@/hooks/useQueries";
import { formatPrice, productCategoryLabel } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ShoppingCart } from "lucide-react";

export default function LojaPage() {
  const { data: products = [], isLoading } = useProducts();

  return (
    <div>
      <section className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="Loja"
            title="Produtos e kits"
            description="E-books, guias, arquivos Gerber e firmwares para acelerar o seu projeto eletrônico."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, i) => `skeleton-${i}`).map((id) => (
              <div
                key={id}
                className="h-80 animate-pulse rounded-xl border border-border bg-muted"
                data-ocid="loja.loading"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card
                key={product.slug}
                className="group overflow-hidden border-border bg-card transition-smooth hover:border-accent/50 hover:shadow-elevated"
                data-ocid={`loja.card.${product.slug}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Watermark
                    src={product.image}
                    alt={product.title}
                    className="size-full"
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <CardHeader>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    {productCategoryLabel(product.category)}
                  </span>
                  <CardTitle className="font-display text-lg">
                    {product.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg font-bold text-foreground">
                      {formatPrice(product.price)}
                    </span>
                    <Button
                      asChild
                      size="sm"
                      data-ocid={`loja.link.${product.slug}`}
                    >
                      <Link to="/loja/$slug" params={{ slug: product.slug }}>
                        <ShoppingCart className="size-4" />
                        Ver detalhes
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
