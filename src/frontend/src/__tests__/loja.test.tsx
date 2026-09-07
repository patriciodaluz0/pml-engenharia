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

async function goToLoja(user: ReturnType<typeof userEvent.setup>) {
  const nav = await screen.findByRole("navigation", {
    name: "Navegação principal",
  });
  await user.click(within(nav).getByRole("link", { name: "Loja" }));
}

describe("Loja (store)", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
  });

  it("lists infoproducts with prices and navigable product pages", async () => {
    const user = userEvent.setup();
    renderApp();
    await goToLoja(user);

    expect(
      await screen.findByText(/Eletrônica para Makers/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/PCB Design com KiCad/i)).toBeInTheDocument();

    // Prices are rendered for each product.
    expect(screen.getByText("R$ 49,00")).toBeInTheDocument();
    expect(screen.getByText("R$ 79,00")).toBeInTheDocument();

    // Navigate to a product detail page.
    await user.click(screen.getAllByRole("link", { name: /Ver detalhes/i })[0]);
    expect(
      await screen.findByText(/Eletrônica para Makers/i),
    ).toBeInTheDocument();
    expect(screen.getByText("R$ 49,00")).toBeInTheDocument();
  });

  it("shows the watermark on product images", async () => {
    const user = userEvent.setup();
    renderApp();
    await goToLoja(user);
    await screen.findByText(/Eletrônica para Makers/i);

    const watermarks = screen.getAllByTestId("watermark");
    expect(watermarks.length).toBeGreaterThan(0);
    expect(
      screen.getAllByText("Patrício M. da Luz - Engenharia Eletrônica").length,
    ).toBeGreaterThan(0);
  });
});
