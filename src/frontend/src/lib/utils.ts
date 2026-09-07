import { ProductCategory } from "@/backend";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function timestampToDate(timestamp: bigint): Date | null {
  const date = new Date(Number(timestamp / 1_000_000n));
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDate(timestamp: bigint): string {
  const date = timestampToDate(timestamp);
  if (!date) return "Data indisponível";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatReadTime(minutes: bigint): string {
  return `${minutes.toString()} min`;
}

export function articleImage(slug: string, category: string): string {
  const haystack = `${slug} ${category}`.toLowerCase();
  if (haystack.includes("solda") || haystack.includes("componente")) {
    return "/assets/generated/blog-solda.dim_800x600.jpg";
  }
  if (haystack.includes("iot") || haystack.includes("internet")) {
    return "/assets/generated/blog-iot.dim_800x600.jpg";
  }
  return "/assets/generated/blog-solda.dim_800x600.jpg";
}

export function formatPrice(price: bigint): string {
  return `R$ ${price.toString()},00`;
}

export function productCategoryLabel(category: ProductCategory): string {
  switch (category) {
    case ProductCategory.ebook:
      return "E-book";
    case ProductCategory.firmware:
      return "Firmware";
    case ProductCategory.guide:
      return "Guia";
    case ProductCategory.gerber:
      return "Gerber";
    default:
      return category;
  }
}
