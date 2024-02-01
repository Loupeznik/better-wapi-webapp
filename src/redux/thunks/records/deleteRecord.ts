import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiError, DomainService, models_DeleteRowRequestV2, models_ErrorResponse } from '../../../api';
import toast from 'react-hot-toast';

const typePrefix = 'domain/deleteRecord';

export const deleteRecord = createAsyncThunk(
	typePrefix,
	async (params: { domain: string; request: models_DeleteRowRequestV2; id: number }) => {
		await DomainService.deleteV2DomainRecord(params.request, params.domain, params.id).then(
			onFulfilled => {
				toast.success(`Record deleted successfully`);
			},
			onRejected => {
				const exception = onRejected as ApiError;
				toast.error(`Failed to delete record: ${(exception.body as models_ErrorResponse).error}`);
				return Promise.reject();
			},
		);

		return params.id;
	},
);
