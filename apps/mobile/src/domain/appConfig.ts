import { z } from "zod";

const appConfigSchema = z.object({
  apiBaseUrl: z.string().url()
});

/** App runtime config shape. */
export type AppConfig = z.infer<typeof appConfigSchema>;

/** Parse app config from raw env values. */
export function parseAppConfig(raw: Record<string, string | undefined>): AppConfig {
  return appConfigSchema.parse({
    apiBaseUrl: raw.EXPO_PUBLIC_API_BASE_URL
  });
}
