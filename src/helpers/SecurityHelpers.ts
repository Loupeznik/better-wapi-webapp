import { AuthService, OpenAPI, type models_Login } from '../api';

const _localAppTokenStorageKey: string = 'jwt';
const _localAppTokenExpirationStorageKey: string = 'jwt_exp';

const getToken = async (credentials?: models_Login): Promise<{ success: boolean; token?: string }> => {
	const localToken = localStorage.getItem(_localAppTokenStorageKey);
	let token = '';

	if (localToken != null && !isTokenExpired()) {
		token = localToken;
	} else {
		if (credentials == null) {
			return { success: false };
		}

		const tokenResult = await AuthService.postAuthToken(credentials);

		if (tokenResult.token != null) {
			localStorage.setItem(_localAppTokenStorageKey, tokenResult.token);
			setTokenExpiration(12);

			token = tokenResult.token;
		}
	}

	OpenAPI.TOKEN = token;
	return { success: true, token: token };
};

const isTokenExpired = (): boolean => {
	const localTokenExpiration = localStorage.getItem(_localAppTokenExpirationStorageKey);
	return localTokenExpiration === null ? false : Date.now() > Date.parse(localTokenExpiration);
};

const setTokenExpiration = (expiresIn: number) => {
	const expiration = getTokenExpiration(expiresIn);

	localStorage.setItem(_localAppTokenExpirationStorageKey, expiration.toUTCString());
};

const getTokenExpiration = (expiresIn: number): Date => {
	const expirationDate = new Date();
	expirationDate.setHours(expirationDate.getHours() + expiresIn);

	return expirationDate;
};

const revokeToken = () => {
	localStorage.removeItem(_localAppTokenStorageKey);
	localStorage.removeItem(_localAppTokenExpirationStorageKey);
};

export { getToken, getTokenExpiration, isTokenExpired, revokeToken, setTokenExpiration };
