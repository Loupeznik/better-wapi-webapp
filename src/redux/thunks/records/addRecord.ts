import { createAsyncThunk } from '@reduxjs/toolkit';
import { DomainService, models_SaveRowRequest } from '../../../api';

const typePrefix = 'domain/addRecord';

export const addRecord = createAsyncThunk(
	typePrefix,
	async (params: { domain: string; subdomain: models_SaveRowRequest }) => {
		await DomainService.postV1DomainRecord(params.subdomain, params.domain);
	},
);
