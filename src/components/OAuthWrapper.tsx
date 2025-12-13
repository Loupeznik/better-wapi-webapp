import type { UnknownAction } from "@reduxjs/toolkit";
import { useAuth } from "oidc-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { setAuthContext } from "../helpers/OAuthTokenManager";
import { userSlice } from "../redux/slices/userSlice";
import { fetchDomains } from "../redux/thunks/domains/fetchDomains";
import MainLayout from "./MainLayout";

function OAuthWrapper() {
	const auth = useAuth();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

	useEffect(() => {
		setAuthContext(auth);
	}, [auth]);

	useEffect(() => {
		if (auth.userData && !isLoggedIn) {
			dispatch(userSlice.actions.loginOAuth());
			dispatch(fetchDomains() as unknown as UnknownAction);
		} else if (!auth.userData && isLoggedIn) {
			dispatch(userSlice.actions.logoutUser());
		}
	}, [auth.userData, isLoggedIn, dispatch]);

	return <MainLayout auth={auth} />;
}

export default OAuthWrapper;
