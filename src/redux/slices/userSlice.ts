import { createSlice } from "@reduxjs/toolkit";
import { OpenAPI } from "../../api";
import {
	getTokenExpiration,
	isTokenExpired,
	revokeToken,
} from "../../helpers/SecurityHelpers";
import { loginUser } from "../thunks/users/loginUser";

type UserState = {
	isLoggedIn: boolean;
	token?: string;
	tokenExpiration?: Date;
	isLoading: boolean;
	error?: string;
};

const initialState: UserState = {
	token: localStorage.getItem("jwt") ?? undefined,
	isLoggedIn: false,
	isLoading: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginUser.rejected, (state) => {
				state.isLoading = false;
				state.error = "Failed to login";
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.token = action.payload;
				state.tokenExpiration = getTokenExpiration(12);
				state.isLoggedIn = true;
			});
	},
	reducers: {
		logoutUser: (state) => {
			state.isLoggedIn = false;
			state.token = undefined;
			state.tokenExpiration = undefined;
			revokeToken();
		},
		loginOAuth: (state) => {
			state.isLoggedIn = true;
		},
		checkIfLoggedIn: (state) => {
			const isLoggedIn = state.token !== undefined && !isTokenExpired();
			state.isLoggedIn = isLoggedIn;

			if (isLoggedIn) {
				OpenAPI.TOKEN = state.token;
			}
		},
	},
});
