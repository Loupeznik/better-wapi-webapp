import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiError, DomainService, models_SaveRowRequestV2 } from '../../../api';
import toast from 'react-hot-toast';

const typePrefix = 'domain/updateRecord';

export const updateRecord = createAsyncThunk(
	typePrefix,
	async (params: { domain: string; subdomain: models_SaveRowRequestV2; id: number }) => {
		console.log(params);
		await DomainService.putV2DomainRecord(params.subdomain, params.domain, params.id).then(
			_ => toast.success('Record updated successfully!'),
			(error: ApiError) => toast.error(`Failed to update record: ${error.body['error']}`) && Promise.reject(),
		);
	},
);
