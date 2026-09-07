import App from "@/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createMockActor } from "./mockActor";

const submitMessage = vi.fn(async () => 1n);

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({
    actor: createMockActor({ submitMessage }),
    isFetching: false,
  }),
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

describe("Contato (contact form)", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/contato");
    submitMessage.mockClear();
  });

  it("submits a message and shows a confirmation", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.type(
      await screen.findByLabelText("Nome"),
      "Patrício Mateus da Luz",
    );
    await user.type(screen.getByLabelText("E-mail"), "contato@example.com");
    await user.type(screen.getByLabelText("Assunto"), "Consultoria B2B");
    await user.type(
      screen.getByLabelText("Mensagem"),
      "Preciso de uma consultoria para meu projeto.",
    );

    await user.click(screen.getByRole("button", { name: /Enviar mensagem/i }));

    expect(
      await screen.findByRole("heading", { name: /Mensagem enviada!/i }),
    ).toBeInTheDocument();
    expect(submitMessage).toHaveBeenCalledTimes(1);
    expect(submitMessage).toHaveBeenCalledWith(
      "Patrício Mateus da Luz",
      "contato@example.com",
      null,
      "Consultoria B2B",
      "Preciso de uma consultoria para meu projeto.",
      "contact",
    );
  });

  it("does not submit when required fields are empty", async () => {
    const user = userEvent.setup();
    renderApp();

    await screen.findByLabelText("Nome");
    const submit = screen.getByRole("button", { name: /Enviar mensagem/i });
    expect(submit).toBeDisabled();
    await user.click(submit);
    expect(submitMessage).not.toHaveBeenCalled();
  });
});
