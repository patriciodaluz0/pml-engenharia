import { Watermark } from "@/components/Watermark";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/hooks/useQueries";
import { formatPrice, productCategoryLabel } from "@/lib/utils";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, ShoppingCart } from "lucide-react";

export default function LojaDetailPage() {
  const { slug } = useParams({ from: "/loja/$slug" });
  const { data: product, isLoading } = useProduct(slug);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <div
            className="h-80 animate-pulse rounded-xl bg-muted"
            data-ocid="loja_detail.loading"
          />
          <div className="space-y-3">
            <div className="h-8 w-2/3 animate-pulse rounded bg-muted" />
            <div className="h-4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Produto não encontrado
        </h1>
        <p className="mt-4 text-muted-foreground">
          O produto que você procura não está disponível.
        </p>
        <Button asChild className="mt-8" data-ocid="loja_detail.back">
          <Link to="/loja">
            <ArrowLeft className="size-4" />
            Voltar à loja
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="mb-8 -ml-2"
        data-ocid="loja_detail.back"
      >
        <Link to="/loja">
          <ArrowLeft className="size-4" />
          Voltar à loja
        </Link>
      </Button>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-border">
          <Watermark
            src={product.image}
            alt={product.title}
            className="aspect-[4/3] w-full"
            imgClassName="rounded-xl"
          />
        </div>

        <div className="flex flex-col">
          <Badge
            variant="secondary"
            className="w-fit"
            data-ocid="loja_detail.category"
          >
            {productCategoryLabel(product.category)}
          </Badge>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground">
            {product.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
            <span className="font-display text-2xl font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            <Button asChild data-ocid="loja_detail.cta">
              <Link to="/contato">
                <ShoppingCart className="size-4" />
                Solicitar compra
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
