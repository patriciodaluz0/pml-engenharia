import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitMessage } from "@/hooks/useQueries";
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

const contactInfo = [
  {
    icon: Mail,
    label: "E-mail",
    value: "contato@pmlengenharia.com.br",
  },
  {
    icon: Phone,
    label: "Telefone",
    value: "+55 (11) 4000-0000",
  },
  {
    icon: MapPin,
    label: "Localização",
    value: "São Paulo, SP — Brasil",
  },
];

export default function ContatoPage() {
  const submitMessage = useSubmitMessage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const canSubmit =
    name.trim() !== "" && email.trim() !== "" && message.trim() !== "";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    const captured = { name, email, subject, message };
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    submitMessage.mutate(captured, {
      onSuccess: () => setSent(true),
      onError: () => {
        setName((current) => (current === "" ? captured.name : current));
        setEmail((current) => (current === "" ? captured.email : current));
        setSubject((current) => (current === "" ? captured.subject : current));
        setMessage((current) => (current === "" ? captured.message : current));
      },
    });
  }

  return (
    <div>
      <section className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="Contato"
            title="Fale com a nossa equipe"
            description="Conte-nos sobre o seu projeto. Retornaremos o mais breve possível."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-border">
          <img
            src="/assets/generated/project-iot.dim_800x600.jpg"
            alt="Dispositivo IoT conectado a um painel de monitoramento, representando os projetos que nossa equipe pode desenvolver para você"
            className="aspect-[21/9] w-full object-cover"
            data-ocid="contato.image"
          />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="font-display text-xl font-bold text-foreground">
              Informações de contato
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Prefere falar diretamente? Utilize um dos canais abaixo para
              entrar em contato com a nossa equipe.
            </p>
            <ul className="mt-8 space-y-6">
              {contactInfo.map((item) => (
                <li
                  key={item.label}
                  className="flex items-start gap-4"
                  data-ocid={`contato.info.${item.label.toLowerCase()}`}
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <item.icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {item.value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            {sent ? (
              <div
                className="flex flex-col items-center rounded-xl border border-success/40 bg-success/10 px-6 py-16 text-center"
                data-ocid="contato.success"
              >
                <CheckCircle2 className="size-12 text-success" />
                <h2 className="mt-4 font-display text-2xl font-bold text-foreground">
                  Mensagem enviada!
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Obrigado pelo contato. Nossa equipe retornará em breve para
                  dar continuidade ao seu projeto.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-6"
                  onClick={() => setSent(false)}
                  data-ocid="contato.send_another"
                >
                  Enviar outra mensagem
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-xl border border-border bg-card p-6 sm:p-8"
                data-ocid="contato.form"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Seu nome completo"
                      required
                      data-ocid="contato.input.name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="seu@email.com"
                      required
                      data-ocid="contato.input.email"
                    />
                  </div>
                </div>
                <div className="mt-5 space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    placeholder="Assunto da mensagem"
                    data-ocid="contato.input.subject"
                  />
                </div>
                <div className="mt-5 space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Descreva o seu projeto ou a sua dúvida"
                    rows={6}
                    required
                    data-ocid="contato.input.message"
                  />
                </div>
                {submitMessage.isError ? (
                  <p
                    className="mt-4 text-sm text-destructive"
                    data-ocid="contato.error"
                  >
                    Não foi possível enviar a mensagem. Tente novamente.
                  </p>
                ) : null}
                <Button
                  type="submit"
                  size="lg"
                  className="mt-6 w-full sm:w-auto"
                  disabled={!canSubmit || submitMessage.isPending}
                  data-ocid="contato.submit"
                >
                  {submitMessage.isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Send className="size-4" />
                  )}
                  Enviar mensagem
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
