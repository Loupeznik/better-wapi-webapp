import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { models_Record, models_SaveRowRequest } from '../../api';
import { fetchRecords } from '../thunks/records/fetchRecords';
import { addRecord } from '../thunks/records/addRecord';
import { updateRecord } from '../thunks/records/updateRecord';
import { deleteRecord } from '../thunks/records/deleteRecord';

type DomainState = {
	domain: string;
	subdomains: models_Record[];
	isLoading: boolean;
	error?: string;
	shouldFetchRecords: boolean;
};

const initialState: DomainState = {
	domain: localStorage.getItem('lastDomain') ?? '',
	subdomains: [],
	isLoading: false,
	shouldFetchRecords: false,
};

export const domainSlice = createSlice({
	name: 'domain',
	initialState,
	extraReducers: builder => {
		builder
			.addCase(fetchRecords.pending, state => {
				state.isLoading = true;
				state.shouldFetchRecords = false;
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
					state.shouldFetchRecords = false;
				},
			)
			.addCase(addRecord.pending, state => {
				state.isLoading = true;
			})
			.addCase(addRecord.rejected, state => {
				state.isLoading = false;
				state.error = 'Failed to add subdomain';
			})
			.addCase(addRecord.fulfilled, state => {
				state.isLoading = false;
				state.error = undefined;
				state.shouldFetchRecords = true;
			})
			.addCase(updateRecord.pending, state => {
				console.log('pending');
				state.isLoading = true;
			})
			.addCase(updateRecord.rejected, state => {
				console.log('rejected');
				state.isLoading = false;
				state.error = 'Failed to update subdomain';
			})
			.addCase(updateRecord.fulfilled, state => {
				state.isLoading = false;
				state.error = undefined;
				state.shouldFetchRecords = true;
			})
			.addCase(deleteRecord.pending, state => {
				state.isLoading = true;
			})
			.addCase(deleteRecord.rejected, state => {
				state.isLoading = false;
				state.error = 'Failed to delete subdomain';
			})
			.addCase(deleteRecord.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = undefined;
				state.subdomains = state.subdomains.filter(subdomain => subdomain.ID !== String(action.payload));
				state.shouldFetchRecords = true;
			});
	},
	reducers: {
		changeDomain: (state, action: PayloadAction<string>) => {
			state.domain = action.payload;
			state.shouldFetchRecords = true;
			localStorage.setItem('lastDomain', action.payload);
		},
	},
});
