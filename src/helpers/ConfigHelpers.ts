export enum AuthMode {
  BASIC = "basic",
  INTERNAL_JWT = "internal-jwt",
  OAUTH2 = "oauth2",
}

interface AppConfig {
  API_BASE_URL: string;
  AUTH_MODE: AuthMode;
}

async function loadConfig(): Promise<AppConfig> {
  const response = await fetch("/config.json");
  const config: AppConfig = await response.json();
  return config;
}

export default loadConfig;
