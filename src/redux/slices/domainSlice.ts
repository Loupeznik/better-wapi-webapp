import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { models_Record } from '../../api';
import { fetchRecords } from '../thunks/records/fetchRecords';

type DomainState = {
	domain: string;
	subdomains: models_Record[];
	isLoading: boolean;
	error?: string;
};

const initialState: DomainState = {
	domain: localStorage.getItem('lastDomain') ?? '',
	subdomains: [],
	isLoading: false,
};

export const domainSlice = createSlice({
	name: 'domain',
	initialState,
	extraReducers: builder => {
		builder
			.addCase(fetchRecords.pending, state => {
				state.isLoading = true;
			})
			.addCase(fetchRecords.rejected, state => {
				state.isLoading = false;
				state.error = 'Failed to fetch subdomains';
			})
			.addCase(
				fetchRecords.fulfilled,
				(state, action: PayloadAction<{ domain: string; subdomains: models_Record[] }>) => {
					state.isLoading = false;
					state.domain = action.payload.domain;
					state.subdomains = action.payload.subdomains;
					state.error = undefined;
				},
			);
	},
	reducers: {},
});
