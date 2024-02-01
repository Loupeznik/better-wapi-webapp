interface AppConfig {
	API_BASE_URL: string;
}

async function loadConfig(): Promise<AppConfig> {
	const response = await fetch('/config.json');
	const config: AppConfig = await response.json();
	return config;
}

export default loadConfig;
