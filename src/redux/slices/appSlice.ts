import { createSlice } from "@reduxjs/toolkit";
import type { models_Domain } from "../../api";
import type { RootState } from "../../app/store";
import type { AppConfig } from "../../helpers/ConfigHelpers";
import { fetchDomains } from "../thunks/domains/fetchDomains";

type AppState = {
	isLoading: boolean;
	config?: AppConfig;
	domains: models_Domain[];
	domainsLoading: boolean;
	domainsError?: string;
};

const initialState: AppState = {
	isLoading: false,
	domains: [],
	domainsLoading: false,
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchDomains.pending, (state) => {
				state.domainsLoading = true;
				state.domainsError = undefined;
			})
			.addCase(fetchDomains.rejected, (state) => {
				state.domainsLoading = false;
				state.domainsError = "Failed to fetch domains";
			})
			.addCase(fetchDomains.fulfilled, (state, action) => {
				state.domainsLoading = false;
				state.domains = action.payload;
				state.domainsError = undefined;
			});
	},
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

export const selectActiveDomains = (state: RootState): models_Domain[] =>
	state.app.domains.filter((d) => d.status === "active");
