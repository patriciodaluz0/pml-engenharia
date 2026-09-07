import App from "@/App";
import PrivacidadePage from "@/routes/privacidade";
import TermosPage from "@/routes/termos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
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

describe("Legal pages and copyright", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
  });

  it("shows the copyright in the footer on every page", async () => {
    renderApp();
    await screen.findByRole("heading", {
      name: /Inovação em Engenharia Eletrônica/i,
    });
    expect(
      screen.getByText(/© 2026 Patrício Mateus da Luz/i),
    ).toBeInTheDocument();
  });

  it("renders the Termos de Uso page with its sections and copyright", () => {
    render(<TermosPage />);
    expect(
      screen.getByRole("heading", { name: /Termos de Uso/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/1\. Aceitação dos termos/i)).toBeInTheDocument();
    expect(
      screen.getByText(/© 2026 Patrício Mateus da Luz/i),
    ).toBeInTheDocument();
  });

  it("renders the Política de Privacidade page with its sections and copyright", () => {
    render(<PrivacidadePage />);
    expect(
      screen.getByRole("heading", { name: /Política de Privacidade/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/1\. Informações coletadas/i)).toBeInTheDocument();
    expect(
      screen.getByText(/© 2026 Patrício Mateus da Luz/i),
    ).toBeInTheDocument();
  });
});
