import { useAuth } from "oidc-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OpenAPI } from "../api";
import type { RootState } from "../app/store";
import { userSlice } from "../redux/slices/userSlice";
import MainLayout from "./MainLayout";

function OAuthWrapper() {
	const auth = useAuth();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

	useEffect(() => {
		if (auth.userData && !isLoggedIn) {
			OpenAPI.TOKEN = auth.userData.access_token;
			dispatch(userSlice.actions.loginOAuth());
		} else if (!auth.userData && isLoggedIn) {
			dispatch(userSlice.actions.logoutUser());
		}
	}, [auth.userData, isLoggedIn, dispatch]);

	return <MainLayout auth={auth} />;
}

export default OAuthWrapper;
