import "@testing-library/jest-dom/vitest";
import { configure } from "@testing-library/react";
import { vi } from "vitest";

// Generated components use `data-ocid` as their test id attribute.
configure({ testIdAttribute: "data-ocid" });

// `backend.ts` re-exports `ExternalBlob` from @caffeineai/object-storage, whose
// dist/index.js imports an internal `./blob` subpath that Node's strict ESM
// resolution cannot reach through the pnpm store. The value is only used as a
// type in the app's own code, so a stub keeps the import from failing the suite.
vi.mock("@caffeineai/object-storage", () => ({
  ExternalBlob: class ExternalBlob {},
}));
