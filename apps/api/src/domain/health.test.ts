import { describe, expect, it } from "vitest";
import { buildHealthResponse } from "./health";

describe("buildHealthResponse", () => {
  it("returns ok", () => {
    expect(buildHealthResponse()).toEqual({ ok: true });
  });
});
