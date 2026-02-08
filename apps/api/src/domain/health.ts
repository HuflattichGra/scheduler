import type { ApiHealth } from "@focusquadrant/shared";

/** Build a standard health response. */
export function buildHealthResponse(): ApiHealth {
  return { ok: true };
}
