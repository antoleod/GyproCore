import { describe, expect, it } from "vitest";
import { createSlug, createUniqueSlug } from "./slug";

describe("slug utilities", () => {
  it("normalizes labels into URL-ready slugs", () => {
    expect(createSlug("Comfort Tag Flat")).toBe("comfort-tag-flat");
    expect(createSlug("Preço / São Paulo")).toBe("preco-sao-paulo");
  });

  it("creates unique slugs with numeric suffixes", () => {
    expect(createUniqueSlug("Comfort Tag Flat", ["comfort-tag-flat"])).toBe("comfort-tag-flat-2");
    expect(createUniqueSlug("Comfort Tag Flat", ["comfort-tag-flat", "comfort-tag-flat-2"])).toBe("comfort-tag-flat-3");
  });
});
