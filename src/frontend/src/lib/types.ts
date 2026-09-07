export type {
  Article,
  ArticleSummary,
  Product,
  ProductSummary,
  Project,
  Specification,
} from "@/backend";

export interface ContactMessage {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}
