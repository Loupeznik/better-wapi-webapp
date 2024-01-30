import { createAsyncThunk } from '@reduxjs/toolkit';
import { DomainService, models_DeleteRowRequestV2, models_SaveRowRequest } from '../../../api';

const typePrefix = 'domain/deleteRecord';

export const deleteRecord = createAsyncThunk(
	typePrefix,
	async (params: { domain: string; request: models_DeleteRowRequestV2; id: number }) => {
		await DomainService.deleteV2DomainRecord(params.request, params.domain, params.id);
	},
);
