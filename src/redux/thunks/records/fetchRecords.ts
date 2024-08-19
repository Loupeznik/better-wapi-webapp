import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { type ApiError, DomainService } from '../../../api';

const typePrefix = 'domain/fetchRecords';

export const fetchRecords = createAsyncThunk(typePrefix, async (domain: string) => {
	const subdomains = await DomainService.getV1DomainInfo(domain).then(
		result => result,
		(error: ApiError) => {
			toast.error(`Failed to fetch subdomains: ${error.body.error}`);
			return [];
		},
	);

	return { domain, subdomains };
});
