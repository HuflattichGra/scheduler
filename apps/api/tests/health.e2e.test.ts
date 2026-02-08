import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/infrastructure/http/createApp";

describe("GET /healthz", () => {
  it("returns ok", async () => {
    const app = createApp();
    const response = await request(app).get("/healthz");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });
});
