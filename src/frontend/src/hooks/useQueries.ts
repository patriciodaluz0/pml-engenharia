import { createActor } from "@/backend";
import {
  getArticleBySlug,
  getProductBySlug,
  getProjectBySlug,
  listArticles,
  listProducts,
  listProjects,
  submitMessage,
} from "@/lib/api";
import type { ContactMessage } from "@/lib/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useArticles() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      if (!actor) return [];
      return listArticles(actor);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useArticle(slug: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["articles", slug],
    queryFn: async () => {
      if (!actor) return null;
      return getArticleBySlug(actor, slug);
    },
    enabled: !!actor && !isFetching && !!slug,
  });
}

export function useProjects() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      return listProjects(actor);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProject(slug: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["projects", slug],
    queryFn: async () => {
      if (!actor) return null;
      return getProjectBySlug(actor, slug);
    },
    enabled: !!actor && !isFetching && !!slug,
  });
}

export function useProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return listProducts(actor);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProduct(slug: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["products", slug],
    queryFn: async () => {
      if (!actor) return null;
      return getProductBySlug(actor, slug);
    },
    enabled: !!actor && !isFetching && !!slug,
  });
}

export function useSubmitMessage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (message: ContactMessage) => {
      if (!actor) throw new Error("Backend is not ready");
      return submitMessage(actor, message);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
}
