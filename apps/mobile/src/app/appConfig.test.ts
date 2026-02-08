import { parseAppConfig } from "../domain/appConfig";

describe("parseAppConfig", () => {
  it("parses api base url", () => {
    const config = parseAppConfig({ EXPO_PUBLIC_API_BASE_URL: "https://api.example.com" });
    expect(config.apiBaseUrl).toBe("https://api.example.com");
  });
});
