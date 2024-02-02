import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiError, DomainService } from '../../../api';
import toast from 'react-hot-toast';

const typePrefix = 'domain/fetchRecords';

export const fetchRecords = createAsyncThunk(typePrefix, async (domain: string) => {
	let subdomains = await DomainService.getV1DomainInfo(domain).then(
		result => result,
		(error: ApiError) => {
			toast.error(`Failed to fetch subdomains: ${error.body['error']}`);
			return [];
		},
	);

	return { domain, subdomains };
});
