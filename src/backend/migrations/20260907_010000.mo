import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

module {
  type UserRole = {
    #admin;
    #user;
    #guest;
  };

  type AccessControlState = {
    var adminAssigned : Bool;
    userRoles : Map.Map<Principal, UserRole>;
  };

  type Specification = {
    caption : Text;
    value : Text;
  };

  type Project = {
    id : Nat;
    title : Text;
    slug : Text;
    category : Text;
    summary : Text;
    description : Text;
    specifications : [Specification];
    images : [Text];
    year : Nat;
  };

  type ProductCategory = {
    #ebook;
    #guide;
    #gerber;
    #firmware;
  };

  type Product = {
    id : Nat;
    title : Text;
    slug : Text;
    category : ProductCategory;
    description : Text;
    price : Nat;
    image : Text;
  };

  type Article = {
    id : Nat;
    title : Text;
    slug : Text;
    category : Text;
    summary : Text;
    content : Text;
    publishedAt : Int;
    readTimeMinutes : Nat;
  };

  type MessageType = {
    #contact;
    #b2bConsultancy;
  };

  type MessageStatus = {
    #new;
    #read;
    #archived;
  };

  type Message = {
    id : Nat;
    name : Text;
    email : Text;
    company : ?Text;
    subject : Text;
    body : Text;
    messageType : MessageType;
    status : MessageStatus;
    createdAt : Int;
  };

  type OldActor = {};

  type NewActor = {
    accessControlState : AccessControlState;
    projects : List.List<Project>;
    products : Map.Map<Nat, Product>;
    articles : List.List<Article>;
    messages : Map.Map<Nat, Message>;
    contactState : { var nextMessageId : Nat };
  };

  func project(
    id : Nat,
    title : Text,
    slug : Text,
    category : Text,
    summary : Text,
    description : Text,
    specifications : [Specification],
    images : [Text],
    year : Nat,
  ) : Project {
    { id; title; slug; category; summary; description; specifications; images; year };
  };

  public func migration(_old : OldActor) : NewActor {
    {
      accessControlState = {
        var adminAssigned = false;
        userRoles = Map.empty();
      };
      projects = List.fromArray([
        project(
          1,
          "Plataforma IoT de Monitoramento Industrial",
          "plataforma-iot-monitoramento-industrial",
          "IoT",
          "Sistema de sensoriamento sem fio para monitoramento de máquinas em tempo real.",
          "Desenvolvemos uma plataforma completa de monitoramento industrial baseada em IoT. Nós de sensoriamento sem fio coletam vibração, temperatura e corrente de máquinas, transmitindo os dados para um gateway central e, em seguida, para a nuvem.\n\nO sistema inclui firmware embarcado otimizado para baixo consumo, protocolo de comunicação seguro e um painel de visualização em tempo real. A solução permite manutenção preditiva e redução de paradas não programadas.",
          [
            { caption = "Protocolo"; value = "MQTT" },
            { caption = "Alimentação"; value = "Bateria 3.7V" },
            { caption = "Conectividade"; value = "Wi-Fi / LoRa" },
          ],
          ["/assets/generated/project-iot.dim_800x600.jpg"],
          2026,
        ),
        project(
          2,
          "Painel de Automação Industrial",
          "painel-automacao-industrial",
          "Automação",
          "Painel de controle com IHM touchscreen para automação de linha de produção.",
          "Projetamos e construímos um painel de automação industrial com interface homem-máquina (IHM) touchscreen. O painel integra CLPs, inversores de frequência e sensores em uma arquitetura robusta e de fácil operação.\n\nA interface exibe gráficos de processo em tempo real, alarmes e histórico de produção. O projeto incluiu dimensionamento elétrico, montagem, programação e comissionamento completo no cliente.",
          [
            { caption = "Tensão"; value = "220V CA" },
            { caption = "IHM"; value = "Touchscreen 7\"" },
            { caption = "Protocolo"; value = "Modbus TCP" },
          ],
          ["/assets/generated/project-automacao.dim_800x600.jpg"],
          2025,
        ),
        project(
          3,
          "Dispositivo Wearable de Saúde",
          "dispositivo-wearable-saude",
          "Wearable",
          "Protótipo de dispositivo vestível para monitoramento contínuo de sinais vitais.",
          "Criamos um protótipo de dispositivo wearable para monitoramento contínuo de sinais vitais. A placa flexível integra sensores biométricos, processamento de sinais e conectividade Bluetooth de baixa energia.\n\nO firmware realiza filtragem e processamento dos sinais em tempo real, enviando os dados para um aplicativo móvel. O projeto abrangeu desde a seleção de componentes até a validação de consumo energético e conforto do usuário.",
          [
            { caption = "Conectividade"; value = "BLE 5.0" },
            { caption = "Bateria"; value = "Li-Po 120mAh" },
            { caption = "Sensores"; value = "ECG, SpO2, IMU" },
          ],
          ["/assets/generated/project-wearable.dim_800x600.jpg"],
          2025,
        ),
      ]);
      products = Map.fromArray([
        (
          1,
          {
            id = 1;
            title = "Eletrônica para Makers: Do Zero ao Primeiro Projeto";
            slug = "eletronica-para-makers";
            category = #ebook;
            description = "E-book completo que ensina os fundamentos da eletrônica prática, componentes, leitura de esquemáticos e a construção do seu primeiro projeto funcional.";
            price = 49;
            image = "/assets/generated/produto-kit.dim_800x600.jpg";
          },
        ),
        (
          2,
          {
            id = 2;
            title = "PCB Design com KiCad: Guia Completo";
            slug = "pcb-design-kicad";
            category = #ebook;
            description = "Aprenda a projetar placas de circuito impresso profissionais com o KiCad, do esquemático à fabricação, incluindo boas práticas de roteamento e DFM.";
            price = 79;
            image = "/assets/generated/produto-kit.dim_800x600.jpg";
          },
        ),
        (
          3,
          {
            id = 3;
            title = "Guia de Montagem de Fontes Chaveadas";
            slug = "guia-fontes-chaveadas";
            category = #guide;
            description = "Guia passo a passo para montar e depurar fontes chaveadas, com análise de topologias, escolha de componentes e testes de segurança.";
            price = 39;
            image = "/assets/generated/produto-kit.dim_800x600.jpg";
          },
        ),
        (
          4,
          {
            id = 4;
            title = "Projeto Gerber: Fonte de Alimentação 5V/3A";
            slug = "gerber-fonte-5v-3a";
            category = #gerber;
            description = "Arquivos Gerber prontos para fabricação de uma fonte de alimentação 5V/3A, com esquemático, BOM e instruções de montagem.";
            price = 29;
            image = "/assets/generated/produto-kit.dim_800x600.jpg";
          },
        ),
        (
          5,
          {
            id = 5;
            title = "Placa de Desenvolvimento ESP32 - Arquivos Gerber";
            slug = "gerber-esp32-devboard";
            category = #gerber;
            description = "Arquivos Gerber de uma placa de desenvolvimento ESP32 com USB-C, regulador de tensão e pinos de expansão, prontos para fabricação.";
            price = 59;
            image = "/assets/generated/produto-kit.dim_800x600.jpg";
          },
        ),
        (
          6,
          {
            id = 6;
            title = "Firmware Fonte: Controle de Carga USB-C PD";
            slug = "firmware-usb-c-pd";
            category = #firmware;
            description = "Código-fonte de firmware para controle de carga USB-C Power Delivery, com drivers, protocolo de negociação e exemplos de integração.";
            price = 99;
            image = "/assets/generated/produto-kit.dim_800x600.jpg";
          },
        ),
      ]);
      articles = List.fromArray([
        {
          id = 1;
          title = "Como Escolher Componentes Eletrônicos para Seu Projeto";
          slug = "como-escolher-componentes-eletronicos";
          category = "Eletrônica";
          summary = "Guia prático para selecionar componentes eletrônicos considerando especificações, disponibilidade e custo.";
          content = "Escolher os componentes certos é uma das etapas mais importantes de qualquer projeto eletrônico. Neste artigo, abordamos critérios essenciais como tolerância, potência, tensão máxima e disponibilidade no mercado.\n\nTambém discutimos como equilibrar custo e desempenho, e a importância de consultar datasheets antes de fechar o projeto.";
          publishedAt = 1767225600000000000;
          readTimeMinutes = 8;
        },
        {
          id = 2;
          title = "PCB Design: Boas Práticas de Roteamento";
          slug = "pcb-design-boas-praticas-roteamento";
          category = "PCB";
          summary = "Aprenda as principais boas práticas de roteamento de placas de circuito impresso para evitar problemas de EMI e integridade de sinal.";
          content = "O roteamento de uma PCB vai muito além de conectar os pinos. Neste artigo, exploramos largura de trilhas, planos de terra, vias e o cuidado com sinais de alta frequência.\n\nBoas práticas de roteamento evitam retrabalhos e garantem que a placa funcione de forma confiável na primeira iteração.";
          publishedAt = 1767312000000000000;
          readTimeMinutes = 10;
        },
      ]);
      messages = Map.empty();
      contactState = { var nextMessageId = 0 };
    };
  };
};
