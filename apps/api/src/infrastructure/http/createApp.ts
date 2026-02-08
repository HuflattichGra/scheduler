import express from "express";
import { buildHealthResponse } from "../../domain/health";

/** Create an Express app instance. */
export function createApp(): express.Express {
  const app = express();

  app.get("/healthz", (_req, res) => {
    res.json(buildHealthResponse());
  });

  app.use((_req, res) => {
    res.status(404).json({ error: "not_found" });
  });

  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    res.status(500).json({ error: "internal_error" });
  });

  return app;
}
