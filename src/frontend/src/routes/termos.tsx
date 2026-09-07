import { SectionHeading } from "@/components/SectionHeading";

const sections = [
  {
    title: "1. Aceitação dos termos",
    content:
      "Ao acessar e utilizar o portal da PML Engenharia Eletrônica, você concorda com os termos e condições descritos neste documento. Caso não concorde com qualquer parte destes termos, recomendamos que não utilize os nossos serviços.",
  },
  {
    title: "2. Uso do conteúdo",
    content:
      "Todo o conteúdo disponibilizado neste portal — incluindo textos, imagens, projetos e materiais técnicos — é de propriedade de Patrício Mateus da Luz e está protegido por leis de direitos autorais. É proibida a reprodução, distribuição ou utilização do conteúdo sem autorização prévia e por escrito.",
  },
  {
    title: "3. Propriedade intelectual",
    content:
      "Os projetos, produtos e soluções apresentados neste portal são resultado de trabalho intelectual protegido. A utilização de qualquer material para fins comerciais, fabricação em massa ou reprodução não autorizada é expressamente proibida.",
  },
  {
    title: "4. Serviços prestados",
    content:
      "A PML Engenharia Eletrônica presta serviços de projeto de circuitos eletrônicos, automação industrial, desenvolvimento de firmware e consultoria em engenharia. Os prazos, escopos e condições de cada projeto são definidos em contrato específico.",
  },
  {
    title: "5. Limitação de responsabilidade",
    content:
      "A PML Engenharia Eletrônica envidará esforços para manter as informações do portal precisas e atualizadas, porém não garante a ausência de erros. O uso das informações e serviços é de responsabilidade do usuário.",
  },
  {
    title: "6. Alterações nos termos",
    content:
      "Estes termos podem ser atualizados periodicamente. As alterações entrarão em vigor a partir da publicação nesta página. Recomendamos a revisão periódica deste documento.",
  },
];

export default function TermosPage() {
  return (
    <div>
      <section className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="Legal"
            title="Termos de Uso"
            description="Condições gerais de utilização do portal PML Engenharia Eletrônica."
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <img
          src="/assets/generated/hero-circuit.dim_1600x900.jpg"
          alt="Placa de circuito eletrônico, ilustrando a proteção da propriedade intelectual dos projetos"
          className="aspect-[21/9] w-full rounded-xl border border-border object-cover"
          data-ocid="termos.image"
        />
        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <div
              key={section.title}
              data-ocid={`termos.section.${section.title.split(" ")[1]}`}
            >
              <h2 className="font-display text-lg font-bold text-foreground">
                {section.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {section.content}
              </p>
            </div>
          ))}
          <p className="border-t border-border pt-6 text-xs text-muted-foreground">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}.
          </p>
          <p
            className="border-t border-border pt-6 text-xs font-medium text-foreground/70"
            data-ocid="termos.copyright"
          >
            © 2026 Patrício Mateus da Luz
          </p>
        </div>
      </section>
    </div>
  );
}
