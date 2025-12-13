import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
	type ApiError,
	DomainService,
	type models_SaveRowRequest,
} from "../../../api";

const typePrefix = "domain/addRecord";

export const addRecord = createAsyncThunk(
	typePrefix,
	async (params: { domain: string; subdomain: models_SaveRowRequest }) => {
		await toast.promise(
			DomainService.postV1DomainRecord(params.subdomain, params.domain).then(
				(_) => Promise.resolve(),
				(error: ApiError) =>
					Promise.reject(`Failed to create record: ${error.body.error}`),
			),
			{
				loading: "Adding record...",
				success: "Record added successfully!",
				error: (error: string) => error,
			},
		);
	},
);
