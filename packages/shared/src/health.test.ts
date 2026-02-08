import { describe, expect, it } from "vitest";
import { HEALTH_OK } from "./health";

describe("HEALTH_OK", () => {
  it("is ok", () => {
    expect(HEALTH_OK.ok).toBe(true);
  });
});
