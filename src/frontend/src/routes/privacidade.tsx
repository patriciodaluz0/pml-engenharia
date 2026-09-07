import { SectionHeading } from "@/components/SectionHeading";

const sections = [
  {
    title: "1. Informações coletadas",
    content:
      "Coletamos as informações que você fornece voluntariamente ao utilizar o portal, como nome, e-mail e mensagens enviadas pelo formulário de contato. Essas informações são utilizadas exclusivamente para responder às suas solicitações.",
  },
  {
    title: "2. Uso das informações",
    content:
      "As informações fornecidas são utilizadas para atender às suas solicitações, prestar serviços e melhorar a experiência no portal. Não vendemos, alugamos ou compartilhamos os seus dados pessoais com terceiros, exceto quando exigido por lei.",
  },
  {
    title: "3. Proteção de dados",
    content:
      "Adotamos medidas técnicas e organizacionais adequadas para proteger os seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição.",
  },
  {
    title: "4. Cookies e tecnologias",
    content:
      "O portal pode utilizar cookies e tecnologias semelhantes para melhorar a navegação e entender o uso do site. Você pode configurar o seu navegador para recusar cookies, embora isso possa afetar algumas funcionalidades.",
  },
  {
    title: "5. Direitos do titular",
    content:
      "Você pode solicitar acesso, correção ou exclusão dos seus dados pessoais a qualquer momento, entrando em contato pelos canais disponíveis no portal.",
  },
  {
    title: "6. Alterações na política",
    content:
      "Esta política de privacidade pode ser atualizada periodicamente. As alterações serão publicadas nesta página e entrarão em vigor a partir da data de publicação.",
  },
];

export default function PrivacidadePage() {
  return (
    <div>
      <section className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="Legal"
            title="Política de Privacidade"
            description="Como tratamos e protegemos os seus dados pessoais."
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <img
          src="/assets/generated/project-automacao.dim_800x600.jpg"
          alt="Painel de controle industrial monitorando dados em tempo real, ilustrando a proteção e o tratamento seguro das informações"
          className="aspect-[21/9] w-full rounded-xl border border-border object-cover"
          data-ocid="privacidade.image"
        />
        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <div
              key={section.title}
              data-ocid={`privacidade.section.${section.title.split(" ")[1]}`}
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
            data-ocid="privacidade.copyright"
          >
            © 2026 Patrício Mateus da Luz
          </p>
        </div>
      </section>
    </div>
  );
}
