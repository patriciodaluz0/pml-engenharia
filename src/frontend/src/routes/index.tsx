import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProducts, useProjects } from "@/hooks/useQueries";
import { formatPrice, productCategoryLabel } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Cpu, Factory, Radio, Wrench } from "lucide-react";

const services = [
  {
    icon: Cpu,
    title: "Projeto de PCB",
    description:
      "Desenvolvimento de placas de circuito impresso do esquemático à fabricação, com foco em qualidade e confiabilidade.",
  },
  {
    icon: Factory,
    title: "Automação Industrial",
    description:
      "Soluções de automação para linhas de produção, painéis de controle e integração de sistemas.",
  },
  {
    icon: Radio,
    title: "Internet das Coisas",
    description:
      "Sistemas IoT com sensoriamento sem fio, conectividade e monitoramento em tempo real.",
  },
  {
    icon: Wrench,
    title: "Desenvolvimento de Produtos",
    description:
      "Do conceito ao produto final: prototipagem, firmware e validação para lançamento no mercado.",
  },
];

export default function HomePage() {
  const { data: projects = [], isLoading: projectsLoading } = useProjects();
  const { data: products = [], isLoading: productsLoading } = useProducts();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url(/assets/generated/hero-circuit.dim_1600x900.jpg)",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
        <div
          className="trace-grid absolute inset-0 opacity-40"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" />
            Engenharia Eletrônica
          </span>
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Inovação em Engenharia Eletrônica:{" "}
            <span className="text-gradient-primary">
              Do Conceito à Realidade
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Projetamos e desenvolvemos soluções eletrônicas de alto nível —
            placas de circuito, automação industrial e produtos IoT — para
            transformar suas ideias em produtos reais e confiáveis.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" data-ocid="home.hero_cta">
              <Link to="/portfolio">
                Ver Projetos
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              data-ocid="home.hero_cta_secondary"
            >
              <Link to="/contato">Solicitar Orçamento</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Serviços"
          title="Soluções completas em engenharia"
          description="Da concepção à produção, oferecemos um portfólio completo de serviços de engenharia eletrônica para atender às necessidades do seu projeto."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group border-border bg-card/60 transition-smooth hover:border-accent/50 hover:shadow-elevated"
              data-ocid={`home.service.${service.title.toLowerCase().replace(/\s+/g, "_")}`}
            >
              <CardHeader>
                <span className="flex size-11 items-center justify-center rounded-lg bg-accent/10 text-accent transition-smooth group-hover:bg-accent group-hover:text-accent-foreground">
                  <service.icon className="size-5" />
                </span>
                <CardTitle className="mt-4 font-display text-lg">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Portfólio"
            title="Projetos em destaque"
            description="Conheça alguns dos projetos de engenharia eletrônica que desenvolvemos recentemente."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {projectsLoading
              ? Array.from({ length: 3 }, (_, i) => `skeleton-${i}`).map(
                  (id) => (
                    <div
                      key={id}
                      className="h-80 animate-pulse rounded-xl border border-border bg-muted"
                      data-ocid="home.project.loading"
                    />
                  ),
                )
              : projects.map((project) => (
                  <Card
                    key={project.slug}
                    className="group overflow-hidden border-border bg-card transition-smooth hover:border-accent/50 hover:shadow-elevated"
                    data-ocid={`home.project.${project.slug}`}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                      <CardDescription className="leading-relaxed">
                        {project.summary}
                      </CardDescription>
                      <Button
                        asChild
                        variant="link"
                        className="w-fit px-0"
                        data-ocid={`home.project.link.${project.slug}`}
                      >
                        <Link
                          to="/portfolio/$slug"
                          params={{ slug: project.slug }}
                        >
                          Ver projeto
                          <ArrowRight className="size-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" data-ocid="home.projects_all">
              <Link to="/portfolio">Ver todos os projetos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Loja"
          title="Produtos e kits"
          description="Componentes, módulos e kits de desenvolvimento prontos para acelerar o seu projeto."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productsLoading
            ? Array.from({ length: 3 }, (_, i) => `skeleton-${i}`).map((id) => (
                <div
                  key={id}
                  className="h-80 animate-pulse rounded-xl border border-border bg-muted"
                  data-ocid="home.product.loading"
                />
              ))
            : products.map((product) => (
                <Card
                  key={product.slug}
                  className="group overflow-hidden border-border bg-card transition-smooth hover:border-accent/50 hover:shadow-elevated"
                  data-ocid={`home.product.${product.slug}`}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                    <CardDescription className="leading-relaxed">
                      {product.description}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-bold text-foreground">
                        {formatPrice(product.price)}
                      </span>
                      <Button
                        asChild
                        size="sm"
                        data-ocid={`home.product.link.${product.slug}`}
                      >
                        <Link to="/loja/$slug" params={{ slug: product.slug }}>
                          Ver detalhes
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tem um projeto em mente?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Fale com a nossa equipe e descubra como podemos transformar a sua
            ideia em um produto eletrônico de alta qualidade.
          </p>
          <Button asChild size="lg" className="mt-8" data-ocid="home.cta">
            <Link to="/contato">
              Entrar em contato
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
