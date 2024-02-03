import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiError, DomainService, models_DeleteRowRequestV2, models_ErrorResponse } from '../../../api';
import toast from 'react-hot-toast';

const typePrefix = 'domain/deleteRecord';

export const deleteRecord = createAsyncThunk(
	typePrefix,
	async (params: { domain: string; request: models_DeleteRowRequestV2; id: number }) => {
		await toast.promise(
			DomainService.deleteV2DomainRecord(params.request, params.domain, params.id).then(
				_ => Promise.resolve(),
				(error: ApiError) =>
					Promise.reject(`Failed to delete record: ${(error.body as models_ErrorResponse).error}`),
			),
			{
				loading: 'Deleting record...',
				success: 'Record deleted successfully!',
				error: (error: string) => error,
			},
		);

		return params.id;
	},
);
