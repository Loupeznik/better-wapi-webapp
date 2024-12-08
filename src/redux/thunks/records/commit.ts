import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ApiError, DomainService } from "../../../api";
import toast from "react-hot-toast";

const typePrefix = "domain/commitChanges";

export const commitChanges = createAsyncThunk(
	typePrefix,
	async (domain: string) => {
		await toast.promise(
			DomainService.postV1DomainCommit(domain).then(
				(_) => Promise.resolve(),
				(error: ApiError) =>
					Promise.reject(`Failed to commit changes: ${error.body.error}`),
			),
			{
				loading: "Commiting changes...",
				success: "Changes commited successfully!",
				error: (error: string) => error,
			},
		);
	},
);
