mixin () {
  public query func getApiDoc() : async Text {
    "# Portal de Projetos Eletrônicos — API do Backend

## Propósito

O backend do portal de projetos eletrônicos expõe quatro domínios de conteúdo
público — **portfólio de projetos**, **loja de produtos digitais**, **blog de
artigos** e **mensagens de contato/consultoria B2B** — além de um sistema de
autenticação e autorização baseado em Internet Identity e uma camada de
consulta estruturada (OQL) sobre os dados persistidos.

## Autenticação e Autorização

O backend usa **Internet Identity** para autenticação e um sistema de controle
de acesso com papéis (`#admin`, `#user`, `#guest`). O primeiro usuário
autenticado a entrar torna-se automaticamente administrador.

- **Métodos que exigem chamador assinado (não anônimo):** nenhum dos métodos de
  conteúdo exige autenticação. Todos os métodos de leitura e o envio de
  mensagens são públicos (incluindo chamadores anônimos). Os métodos de
  autorização (`assignCallerUserRole`, `getCallerUserRole`, `isCallerAdmin`)
  operam sobre o chamador atual; `assignCallerUserRole` exige papel `#admin`.
- **Registro:** o registro acontece quando um chamador entra pela interface
  própria do app (frontend) via Internet Identity. Um principal que nunca fez
  isso é considerado não registrado, mesmo que pertença ao dono do app. Um
  chamador assinado derivado contra uma origem diferente é um principal
  diferente daquele que o frontend registrou.
- **Derivação de identidade:** o frontend fixa uma origem de derivação do
  Internet Identity, publicada em `/.well-known/ii-derivation-origin` quando
  disponível. Um agente que já detém a autorização do Internet Identity do
  usuário deriva o principal correto por app contra essa origem (por exemplo
  `icp identity link web <nome> --app <host>`). Tal delegação age com a
  autoridade total do usuário neste app até expirar.
- **Chamadores anônimos** são tratados como convidados (`#guest`).

## Unidades e Codificações

- **Identificadores:** `Project.id`, `Product.id`, `Article.id` e
  `Message.id` são `Nat` (inteiros não negativos). `Message.id` é atribuído
  sequencialmente no envio.
- **Slugs:** `slug` é uma `Text` única usada para localizar projetos, produtos
  e artigos por URL amigável.
- **Tempos:** `publishedAt` (artigos) e `createdAt` (mensagens) são `Int` em
  **nanossegundos desde a época Unix** (valor de `Time.now()`).
- **Categorias de produto:** `Product.category` é uma variante
  `#ebook | #guide | #gerber | #firmware`.
- **Tipo de mensagem:** `Message.messageType` é `#contact | #b2bConsultancy`.
- **Status de mensagem:** `Message.status` é `#new | #read | #archived`.
- **Campos opcionais:** `Message.company` é `?Text` (`null` quando ausente).
- **Imagens:** `Project.images` é `[Text]` (URLs); `Product.image` é uma `Text`
  (URL).

## Ciclo de Vida e Consulta (Polling)

- **Mensagens:** `submitMessage` cria uma mensagem com `status = #new` e
  `createdAt` no momento do envio. `updateMessageStatus` transiciona o status
  para `#read` ou `#archived`. Não há polling obrigatório; os métodos de leitura
  retornam o estado atual a cada chamada.
- **OQL:** `schema()` descreve as entidades consultáveis e `execute()` executa
  consultas JSON. Consulte `schema()` primeiro para descobrir os campos e
  entidades disponíveis antes de montar uma consulta.

## Segurança de Mutação e Idempotência

- **`submitMessage`** é seguro para repetição no sentido de que cada chamada
  cria uma **nova** mensagem com um novo `id`; não é idempotente — chamadas
  duplicadas geram mensagens duplicadas.
- **`updateMessageStatus`** é idempotente: aplicar o mesmo status repetidamente
  produz o mesmo resultado. Retorna `null` se o `id` não existir.
- **`assignCallerUserRole`** exige papel `#admin`; chamadores não admin são
  rejeitados.
- Nenhum método destrói dados permanentemente; `updateMessageStatus` apenas
  altera o status.

## Erros, Limites e Armadilhas

- **Métodos de leitura** retornam `?T` (`null`) quando o recurso não existe
  (`getProjectBySlug`, `getProduct`, `getProductBySlug`, `getArticle`,
  `getArticleBySlug`, `getMessage`).
- **`updateMessageStatus`** retorna `null` para um `id` inexistente, sem
  lançar erro.
- **Autorização:** chamadas a `assignCallerUserRole` sem papel `#admin`
  lançam um trap (rejeição) — o chamador não consegue ramificar sobre o erro.
- **OQL:** entidades `project`, `product` e `article` são públicas
  (`#public_`); a entidade `message` é `#controllerOnly` — apenas o controlador
  da canister (e o agente de inteligência de dados) a lê, nunca usuários finais.
- **Limites:** os dados são armazenados em coleções na memória da canister;
  não há paginação nos métodos de listagem — listas muito grandes retornam tudo
  de uma vez.
- **Tempos em nanossegundos:** não confunda `publishedAt`/`createdAt` com
  segundos; converta antes de exibir.
"
  };
};
