import App from "@/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createMockActor } from "./mockActor";

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: createMockActor(), isFetching: false }),
}));

function renderApp() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
}

async function navigateTo(
  user: ReturnType<typeof userEvent.setup>,
  label: string,
) {
  const nav = await screen.findByRole("navigation", {
    name: "Navegação principal",
  });
  await user.click(within(nav).getByRole("link", { name: label }));
}

describe("Relevant image on every page", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
  });

  it("renders at least one relevant image on the home page", async () => {
    renderApp();
    await screen.findByRole("heading", {
      name: /Inovação em Engenharia Eletrônica/i,
    });
    // The hero is a CSS background; the featured project/product cards render
    // real <img> elements once the mocked queries resolve.
    const images = await screen.findAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
    expect(images.some((img) => img.getAttribute("alt")?.length)).toBe(true);
  });

  it("renders at least one relevant image on the Sobre page", async () => {
    const user = userEvent.setup();
    renderApp();
    await navigateTo(user, "Sobre");
    await screen.findByRole("heading", {
      name: /Engenharia eletrônica com propósito/i,
    });
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
    expect(
      images.some((img) => img.getAttribute("alt")?.includes("circuito")),
    ).toBe(true);
  });

  it("renders at least one relevant image on the Blog page", async () => {
    const user = userEvent.setup();
    renderApp();
    await navigateTo(user, "Blog");
    await screen.findByRole("heading", { name: /Artigos e novidades/i });
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
    expect(images.some((img) => img.getAttribute("alt")?.length)).toBe(true);
  });

  it("renders at least one relevant image on the Portfólio page", async () => {
    const user = userEvent.setup();
    renderApp();
    await navigateTo(user, "Portfólio");
    await screen.findByRole("heading", { name: /Nossos projetos/i });
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
    expect(images.some((img) => img.getAttribute("alt")?.length)).toBe(true);
  });

  it("renders at least one relevant image on the Loja page", async () => {
    const user = userEvent.setup();
    renderApp();
    await navigateTo(user, "Loja");
    await screen.findByRole("heading", { name: /Produtos e kits/i });
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
    expect(images.some((img) => img.getAttribute("alt")?.length)).toBe(true);
  });
});
