import {
  type Article,
  type ArticleSummary,
  type Backend,
  MessageType,
  type Product,
  type ProductSummary,
  type Project,
} from "@/backend";
import type { ContactMessage } from "./types";

/**
 * Camada de acesso a dados do portal.
 *
 * Cada função recebe a instância do actor (obtida via useActor(createActor))
 * e chama diretamente os métodos do backend. Os retornos espelham o contrato
 * exposto em backend.d.ts.
 */

export function listArticles(actor: Backend): Promise<ArticleSummary[]> {
  return actor.listArticles();
}

export function getArticleBySlug(
  actor: Backend,
  slug: string,
): Promise<Article | null> {
  return actor.getArticleBySlug(slug);
}

export function listProjects(actor: Backend): Promise<Project[]> {
  return actor.listProjects();
}

export function getProjectBySlug(
  actor: Backend,
  slug: string,
): Promise<Project | null> {
  return actor.getProjectBySlug(slug);
}

export function listProducts(actor: Backend): Promise<ProductSummary[]> {
  return actor.listProducts();
}

export function getProductBySlug(
  actor: Backend,
  slug: string,
): Promise<Product | null> {
  return actor.getProductBySlug(slug);
}

export function submitMessage(
  actor: Backend,
  message: ContactMessage,
): Promise<bigint> {
  return actor.submitMessage(
    message.name,
    message.email,
    message.company ?? null,
    message.subject,
    message.message,
    MessageType.contact,
  );
}
