import { useEffect, useState } from "react";
import { parseAppConfig, type AppConfig } from "../domain/appConfig";
import { rawEnv } from "../infrastructure/env";

/** UI-ready config loading state. */
export type AppConfigState =
  | { status: "loading" }
  | { status: "ready"; config: AppConfig }
  | { status: "error"; message: string };

/** Load and validate app config from the environment. */
export function useAppConfig(): AppConfigState {
  const [state, setState] = useState<AppConfigState>({ status: "loading" });

  useEffect(() => {
    try {
      const config = parseAppConfig(rawEnv);
      setState({ status: "ready", config });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      setState({ status: "error", message });
    }
  }, []);

  return state;
}
