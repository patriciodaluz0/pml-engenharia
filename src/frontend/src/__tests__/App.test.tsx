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

describe("App navigation", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
  });

  it("loads the home page without a blank screen on the default route", async () => {
    renderApp();
    expect(
      await screen.findByRole("heading", {
        name: /Inovação em Engenharia Eletrônica/i,
      }),
    ).toBeInTheDocument();
  });

  it("navigates between the main sections via the header", async () => {
    const user = userEvent.setup();
    renderApp();

    const nav = await screen.findByRole("navigation", {
      name: "Navegação principal",
    });

    await user.click(within(nav).getByRole("link", { name: "Sobre" }));
    expect(
      await screen.findByRole("heading", {
        name: /Engenharia eletrônica com propósito/i,
      }),
    ).toBeInTheDocument();

    await user.click(within(nav).getByRole("link", { name: "Blog" }));
    expect(
      await screen.findByRole("heading", { name: /Artigos e novidades/i }),
    ).toBeInTheDocument();

    await user.click(within(nav).getByRole("link", { name: "Portfólio" }));
    expect(
      await screen.findByRole("heading", { name: /Nossos projetos/i }),
    ).toBeInTheDocument();

    await user.click(within(nav).getByRole("link", { name: "Loja" }));
    expect(
      await screen.findByRole("heading", { name: /Produtos e kits/i }),
    ).toBeInTheDocument();

    await user.click(within(nav).getByRole("link", { name: "Contato" }));
    expect(
      await screen.findByRole("heading", { name: /Fale com a nossa equipe/i }),
    ).toBeInTheDocument();
  });
});
