import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3001)
});

/** Parsed environment variables for the API. */
export const env = envSchema.parse(process.env);
