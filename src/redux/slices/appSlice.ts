import { createSlice } from "@reduxjs/toolkit";
import type { AppConfig } from "../../helpers/ConfigHelpers";

type AppState = {
	isLoading: boolean;
	config?: AppConfig;
};

const initialState: AppState = {
	isLoading: false,
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setConfig: (
			state,
			action: {
				type: string;
				payload: AppConfig;
			},
		) => {
			state.config = action.payload;
		},
	},
});
