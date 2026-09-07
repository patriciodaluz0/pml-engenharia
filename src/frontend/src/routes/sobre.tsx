import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, Cpu, Lightbulb, ShieldCheck } from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Inovação",
    description:
      "Buscamos sempre as soluções mais modernas e eficientes para cada desafio de engenharia.",
  },
  {
    icon: ShieldCheck,
    title: "Qualidade",
    description:
      "Cada projeto passa por rigorosa validação para garantir confiabilidade e durabilidade.",
  },
  {
    icon: Award,
    title: "Compromisso",
    description:
      "Atendimento próximo e transparente, do primeiro contato à entrega final do projeto.",
  },
];

export default function SobrePage() {
  return (
    <div>
      <section className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="Sobre nós"
            title="Engenharia eletrônica com propósito"
            description="Conheça a PML Engenharia Eletrônica e a história por trás dos nossos projetos."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-border">
          <img
            src="/assets/generated/hero-circuit.dim_1600x900.jpg"
            alt="Placa de circuito eletrônico com trilhas douradas, representando a engenharia de precisão da PML"
            className="aspect-[21/9] w-full object-cover"
            data-ocid="sobre.image"
          />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Do conceito à realidade
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                A PML Engenharia Eletrônica nasceu da paixão por tecnologia e
                pela engenharia de precisão. Fundada por Patrício Mateus da Luz,
                a empresa reúne experiência em projeto de circuitos eletrônicos,
                desenvolvimento de firmware e automação industrial.
              </p>
              <p>
                Nosso compromisso é transformar ideias em produtos reais e
                funcionais. Trabalhamos lado a lado com nossos clientes em cada
                etapa — da especificação inicial à fabricação e validação —
                garantindo que cada solução atenda com excelência às
                necessidades do projeto.
              </p>
              <p>
                Atendemos desde startups em fase de prototipagem até indústrias
                que buscam modernizar seus processos com automação e Internet
                das Coisas.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild data-ocid="sobre.cta">
                <Link to="/contato">
                  Fale conosco
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" data-ocid="sobre.portfolio">
                <Link to="/portfolio">Ver portfólio</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="border-border bg-card/60" data-ocid="sobre.stat.1">
              <CardHeader>
                <span className="flex size-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Cpu className="size-5" />
                </span>
                <CardTitle className="mt-4 font-display text-4xl font-bold">
                  +50
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Projetos de engenharia eletrônica entregues
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card/60" data-ocid="sobre.stat.2">
              <CardHeader>
                <span className="flex size-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Award className="size-5" />
                </span>
                <CardTitle className="mt-4 font-display text-4xl font-bold">
                  +10
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Anos de experiência em engenharia
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Valores"
            title="O que nos move"
            description="Princípios que guiam cada projeto e cada decisão da nossa equipe."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <Card
                key={value.title}
                className="border-border bg-card/60 transition-smooth hover:border-accent/50 hover:shadow-elevated"
                data-ocid={`sobre.value.${value.title.toLowerCase()}`}
              >
                <CardHeader>
                  <span className="flex size-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <value.icon className="size-5" />
                  </span>
                  <CardTitle className="mt-4 font-display text-lg">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
