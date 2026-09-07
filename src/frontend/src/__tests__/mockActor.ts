import {
  type Article,
  type ArticleSummary,
  type Backend,
  type Product,
  ProductCategory,
  type ProductSummary,
  type Project,
} from "@/backend";

export const mockProjects: Project[] = [
  {
    id: 1n,
    title: "Plataforma IoT de Monitoramento Industrial",
    slug: "plataforma-iot-monitoramento-industrial",
    category: "IoT",
    summary: "Sistema de sensoriamento sem fio para monitoramento de máquinas.",
    description: "Descrição do projeto IoT.\n\nSegundo parágrafo.",
    specifications: [
      { caption: "Protocolo", value: "MQTT" },
      { caption: "Alimentação", value: "Bateria 3.7V" },
    ],
    images: ["/assets/generated/project-iot.dim_800x600.jpg"],
    year: 2026n,
  },
];

export const mockProducts: ProductSummary[] = [
  {
    id: 1n,
    title: "Eletrônica para Makers",
    slug: "eletronica-para-makers",
    description: "E-book completo de eletrônica prática.",
    category: ProductCategory.ebook,
    image: "/assets/generated/produto-kit.dim_800x600.jpg",
    price: 49n,
  },
  {
    id: 2n,
    title: "PCB Design com KiCad",
    slug: "pcb-design-kicad",
    description: "Guia completo de projeto de placas.",
    category: ProductCategory.guide,
    image: "/assets/generated/produto-kit.dim_800x600.jpg",
    price: 79n,
  },
];

export const mockProductDetail: Product = {
  id: 1n,
  title: "Eletrônica para Makers",
  slug: "eletronica-para-makers",
  description: "E-book completo de eletrônica prática.",
  category: ProductCategory.ebook,
  image: "/assets/generated/produto-kit.dim_800x600.jpg",
  price: 49n,
};

export const mockArticles: ArticleSummary[] = [
  {
    id: 1n,
    title: "Como Escolher Componentes Eletrônicos",
    slug: "como-escolher-componentes-eletronicos",
    category: "Eletrônica",
    summary: "Guia prático para selecionar componentes.",
    publishedAt: 1767225600000000000n,
    readTimeMinutes: 8n,
  },
];

export const mockArticleDetail: Article = {
  id: 1n,
  title: "Como Escolher Componentes Eletrônicos",
  slug: "como-escolher-componentes-eletronicos",
  category: "Eletrônica",
  summary: "Guia prático para selecionar componentes.",
  content: "Escolher os componentes certos é importante.\n\nSegundo parágrafo.",
  publishedAt: 1767225600000000000n,
  readTimeMinutes: 8n,
};

export interface MockActorOverrides {
  listProducts?: () => Promise<ProductSummary[]>;
  getProductBySlug?: (slug: string) => Promise<Product | null>;
  listProjects?: () => Promise<Project[]>;
  getProjectBySlug?: (slug: string) => Promise<Project | null>;
  listArticles?: () => Promise<ArticleSummary[]>;
  getArticleBySlug?: (slug: string) => Promise<Article | null>;
  submitMessage?: (...args: unknown[]) => Promise<bigint>;
}

export function createMockActor(overrides: MockActorOverrides = {}): Backend {
  return {
    listProducts: overrides.listProducts ?? (async () => mockProducts),
    getProductBySlug:
      overrides.getProductBySlug ??
      (async (slug: string) =>
        mockProducts.find((p) => p.slug === slug) ?? null),
    listProjects: overrides.listProjects ?? (async () => mockProjects),
    getProjectBySlug:
      overrides.getProjectBySlug ??
      (async (slug: string) =>
        mockProjects.find((p) => p.slug === slug) ?? null),
    listArticles: overrides.listArticles ?? (async () => mockArticles),
    getArticleBySlug:
      overrides.getArticleBySlug ??
      (async (slug: string) =>
        mockArticleDetail.slug === slug ? mockArticleDetail : null),
    submitMessage: overrides.submitMessage ?? (async () => 1n),
  } as unknown as Backend;
}
