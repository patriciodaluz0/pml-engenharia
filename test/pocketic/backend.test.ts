import { PocketIc } from "@dfinity/pic";
import { afterAll, beforeAll, expect, it } from "vitest";

import { idlFactory } from "../../src/frontend/src/declarations/backend.did.js";
import type { _SERVICE } from "../../src/frontend/src/declarations/backend.did";

const PIC_URL = process.env.POCKET_IC_URL ?? "";
const BACKEND_WASM = process.env.BACKEND_WASM ?? "";
// Set only on a converted project: the last pre-EM revision, whose schema this
// app's migration chain replays from. Installing the current wasm onto an empty
// canister there traps IC0503 before any test runs.
const BASELINE_WASM = process.env.BACKEND_WASM_BASELINE;

let pic: PocketIc | undefined;
let actor: _SERVICE;

beforeAll(async () => {
  pic = await PocketIc.create(PIC_URL);
  if (BASELINE_WASM === undefined) {
    ({ actor } = await pic.setupCanister<_SERVICE>({ idlFactory, wasm: BACKEND_WASM }));
    return;
  }
  // `[baseline, current]`, the same install contract the hosted deploy uses for
  // a converted project. The upgrade replays the chain from the legacy schema.
  const installed = await pic.setupCanister<_SERVICE>({ idlFactory, wasm: BASELINE_WASM });
  await pic.upgradeCanister({ canisterId: installed.canisterId, wasm: BACKEND_WASM, arg: new Uint8Array() });
  actor = installed.actor;
});

afterAll(async () => {
  // `?.` because `beforeAll` may not have got that far. A failed
  // `PocketIc.create` otherwise stacks "Cannot read properties of undefined"
  // on top of the real error and buries the one line that explains the run.
  await pic?.tearDown();
});

it("seeds the catalog with projects, products and articles instead of trapping", async () => {
  const projects = await actor.listProjects();
  expect(projects.length).toBeGreaterThan(0);

  const products = await actor.listProducts();
  expect(products.length).toBeGreaterThan(0);

  const articles = await actor.listArticles();
  expect(articles.length).toBeGreaterThan(0);
});

it("resolves a seeded project by slug", async () => {
  const projects = await actor.listProjects();
  const first = projects[0];
  const found = await actor.getProjectBySlug(first.slug);
  expect(found).not.toEqual([]);
  expect(found[0].slug).toBe(first.slug);
});

it("resolves a seeded product by slug", async () => {
  const products = await actor.listProducts();
  const first = products[0];
  const found = await actor.getProductBySlug(first.slug);
  expect(found).not.toEqual([]);
  expect(found[0].slug).toBe(first.slug);
});

it("resolves a seeded article by slug", async () => {
  const articles = await actor.listArticles();
  const first = articles[0];
  const found = await actor.getArticleBySlug(first.slug);
  expect(found).not.toEqual([]);
  expect(found[0].slug).toBe(first.slug);
});

it("answers an empty-state message read instead of trapping", async () => {
  await expect(actor.listMessages()).resolves.toEqual([]);
});

it("round-trips a contact message through the real canister", async () => {
  const id = await actor.submitMessage(
    "Ada",
    "ada@example.com",
    [],
    "Consultoria",
    "Preciso de ajuda com um projeto.",
    { contact: null },
  );
  expect(typeof id).toBe("bigint");

  const messages = await actor.listMessages();
  expect(messages).toContainEqual(
    expect.objectContaining({ id, name: "Ada", email: "ada@example.com" }),
  );

  const detail = await actor.getMessage(id);
  expect(detail).not.toEqual([]);
  expect(detail[0].body).toBe("Preciso de ajuda com um projeto.");
});
