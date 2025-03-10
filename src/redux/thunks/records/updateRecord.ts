import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
	type ApiError,
	DomainService,
	type models_SaveRowRequestV2,
} from "../../../api";

const typePrefix = "domain/updateRecord";

export const updateRecord = createAsyncThunk(
	typePrefix,
	async (params: {
		domain: string;
		subdomain: models_SaveRowRequestV2;
		id: number;
	}) => {
		await toast.promise(
			DomainService.putV2DomainRecord(
				params.subdomain,
				params.domain,
				params.id,
			).then(
				(_) => Promise.resolve(),
				(error: ApiError) =>
					Promise.reject(`Failed to update record: ${error.body.error}`),
			),
			{
				loading: "Updating record...",
				success: "Record updated successfully!",
				error: (error: string) => error,
			},
		);
	},
);
