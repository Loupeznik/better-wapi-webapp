import { createAsyncThunk } from '@reduxjs/toolkit';
import { DomainService } from '../../../api';

const typePrefix = 'domain/fetchRecords';

export const fetchRecords = createAsyncThunk(typePrefix, async (domain: string) => {
	const subdomains = await DomainService.getV1DomainInfo(domain);
	return { domain, subdomains };
});
