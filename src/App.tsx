import { Spinner } from "@nextui-org/react";
import { AuthProvider, type AuthProviderProps } from "oidc-react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { OpenAPI } from "./api";
import MainLayout from "./components/MainLayout";
import OAuthWrapper from "./components/OAuthWrapper";
import loadConfig, {
	AuthMode,
	getOidcConfig,
	type AppConfig,
} from "./helpers/ConfigHelpers";
import { appSlice } from "./redux/slices/appSlice";
import { userSlice } from "./redux/slices/userSlice";
import { isNoUOrEmptyString } from "./utils";

function App() {
	const dispatch = useDispatch();
	const [appConfig, setAppConfig] = useState<AppConfig | null>(null);
	const [oidcConfig, setOidcConfig] = useState<AuthProviderProps | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const onSignInHook = useCallback(() => {
		dispatch(userSlice.actions.loginOAuth());
	}, [dispatch]);

	const onSignOutHook = useCallback(() => {
		dispatch(userSlice.actions.logoutUser());
	}, [dispatch]);

	useEffect(() => {
		const loadConfiguration = async () => {
			try {
				const config = await loadConfig();
				OpenAPI.BASE = config.API_BASE_URL;
				setAppConfig(config);
				dispatch(appSlice.actions.setConfig(config));

				setOidcConfig(
					config.AUTH_MODE === AuthMode.OAUTH2
						? getOidcConfig(config, onSignInHook, onSignOutHook)
						: null,
				);
			} catch (error) {
				console.error("Failed to load configuration:", error);
			}
		};

		loadConfiguration().then(() => setIsLoading(false));
	}, [dispatch, onSignInHook, onSignOutHook]);

	useEffect(() => {
		if (appConfig && appConfig.AUTH_MODE !== AuthMode.OAUTH2) {
			dispatch(userSlice.actions.checkIfLoggedIn());
		}
	}, [appConfig, dispatch]);

	return isLoading ? (
		<Spinner size="lg" />
	) : (
		<>
			{appConfig?.AUTH_MODE === AuthMode.OAUTH2 &&
			oidcConfig &&
			!isNoUOrEmptyString(oidcConfig.authority) ? (
				<AuthProvider {...oidcConfig}>
					<OAuthWrapper />
				</AuthProvider>
			) : (
				<MainLayout />
			)}
		</>
	);
}

export default App;
