import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiError, DomainService, models_SaveRowRequest } from '../../../api';
import toast from 'react-hot-toast';

const typePrefix = 'domain/addRecord';

export const addRecord = createAsyncThunk(
	typePrefix,
	async (params: { domain: string; subdomain: models_SaveRowRequest }) => {
		await DomainService.postV1DomainRecord(params.subdomain, params.domain).then(
			_ => toast.success('Record added successfully!'),
			(error: ApiError) => toast.error(`Failed to create record: ${error.body['error']}`) && Promise.reject(),
		);
	},
);
