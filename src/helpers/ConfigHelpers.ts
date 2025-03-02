import type { AuthProviderProps } from "oidc-react";
import { OpenAPI } from "../api";

export enum AuthMode {
	BASIC = "basic",
	INTERNAL_JWT = "internal-jwt",
	OAUTH2 = "oauth2",
}

export interface AppConfig {
	API_BASE_URL: string;
	AUTH_MODE: AuthMode;
	OAUTH2_AUTHORITY: string;
	OAUTH2_CLIENT_ID: string;
	OAUTH2_REDIRECT_URI: string;
}

export const getOidcConfig = (
	config: AppConfig,
	onSignInHook: () => void,
	onSignOutHook: () => void,
): AuthProviderProps => {
	if (config.AUTH_MODE !== AuthMode.OAUTH2) {
		return {};
	}

	return {
		authority: config.OAUTH2_AUTHORITY,
		clientId: config.OAUTH2_CLIENT_ID,
		responseType: "code",
		redirectUri: config.OAUTH2_REDIRECT_URI,
		scope: "openid profile email",
		postLogoutRedirectUri: window.location.origin,
		onSignIn: (user) => {
			OpenAPI.TOKEN = user?.access_token;
			onSignInHook();
			window.history.replaceState(
				{},
				document.title,
				window.location.origin + window.location.pathname,
			);
		},
		onSignOut: () => onSignOutHook(),
		autoSignIn: false,
		automaticSilentRenew: true,
	} satisfies AuthProviderProps;
};

async function loadConfig(): Promise<AppConfig> {
	const response = await fetch(
		process.env.NODE_ENV === "development"
			? "/config.development.json"
			: "/config.json",
	);
	const config: AppConfig = await response.json();
	return config;
}

export default loadConfig;
