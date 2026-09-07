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

async function goToBlog(user: ReturnType<typeof userEvent.setup>) {
  const nav = await screen.findByRole("navigation", {
    name: "Navegação principal",
  });
  await user.click(within(nav).getByRole("link", { name: "Blog" }));
}

describe("Blog", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
  });

  it("lists articles and opens a detail page with anti-copy protection", async () => {
    const user = userEvent.setup();
    renderApp();
    await goToBlog(user);

    expect(
      await screen.findByText(/Como Escolher Componentes Eletrônicos/i),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /Ler artigo/i }));

    const article = await screen.findByRole("article");
    expect(article).toBeInTheDocument();
    expect(
      screen.getByText(/Escolher os componentes certos é importante/i),
    ).toBeInTheDocument();

    // Anti-copy: right-click and copy are prevented on the article.
    const contextMenu = new Event("contextmenu", {
      cancelable: true,
      bubbles: true,
    });
    article.dispatchEvent(contextMenu);
    expect(contextMenu.defaultPrevented).toBe(true);

    const copy = new Event("copy", { cancelable: true, bubbles: true });
    article.dispatchEvent(copy);
    expect(copy.defaultPrevented).toBe(true);
  });
});
