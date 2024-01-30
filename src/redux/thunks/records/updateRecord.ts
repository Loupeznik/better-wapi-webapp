import { createAsyncThunk } from '@reduxjs/toolkit';
import { DomainService, models_SaveRowRequestV2 } from '../../../api';

const typePrefix = 'domain/updateRecord';

export const updateRecord = createAsyncThunk(
	typePrefix,
	async (params: { domain: string; subdomain: models_SaveRowRequestV2; id: number }) => {
		const { domain, subdomain, id } = params;
		await DomainService.putV2DomainRecord(subdomain, domain, id);
	},
);
