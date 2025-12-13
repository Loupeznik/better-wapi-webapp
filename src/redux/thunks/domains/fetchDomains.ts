import { createAsyncThunk } from "@reduxjs/toolkit";
import { DomainsService, type models_Domain } from "../../../api";

const typePrefix = "app/fetchDomains";

export const fetchDomains = createAsyncThunk(
	typePrefix,
	async (): Promise<models_Domain[]> => {
		const result = await DomainsService.getV2Domains();
		return result;
	},
);
