import type { AuthContextProps } from "oidc-react";

let authContext: AuthContextProps | null = null;

export const setAuthContext = (auth: AuthContextProps) => {
	authContext = auth;
};

export const getAuthContext = (): AuthContextProps | null => {
	return authContext;
};

export const getCurrentAccessToken = async (): Promise<string> => {
	if (!authContext) {
		return "";
	}

	return authContext.userData?.access_token ?? "";
};
