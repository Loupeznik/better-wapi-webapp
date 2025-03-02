import {
	Button,
	Checkbox,
	Input,
	Select,
	SelectItem,
	Textarea,
} from "@nextui-org/react";
import type { UnknownAction } from "@reduxjs/toolkit";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { models_RecordType } from "../api";
import type { RootState } from "../app/store";
import { Login } from "../components/Login";
import type { PageWithAuthProps } from "../models/PageWithAuthProps";
import type { SaveRecordForm } from "../models/SaveRecordForm";
import { addRecord } from "../redux/thunks/records/addRecord";

export const CreateRecordPage = ({ auth }: PageWithAuthProps) => {
	const currentDomain = useSelector((state: RootState) => state.domain.domain);
	const isUserLoggedIn = useSelector(
		(state: RootState) => state.user.isLoggedIn,
	);
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SaveRecordForm>();

	const onSubmit: SubmitHandler<SaveRecordForm> = async (data) => {
		data.request.ttl =
			data.request.ttl === undefined
				? undefined
				: Number.parseInt(data.request.ttl.toString());

		dispatch(
			addRecord({
				domain: data.domain,
				subdomain: data.request,
			}) as unknown as UnknownAction,
		);
	};

	return isUserLoggedIn ? (
		<div className="mx-auto p-6 mt-5 rounded-lg lg:w-2/3">
			<h1 className="text-center text-3xl font-bold">Create a new record</h1>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col w-full max-w-lg pb-12 pt-2 px-8 rounded mx-auto gap-4"
			>
				<Input
					type="text"
					label="Domain"
					defaultValue={currentDomain}
					{...register("domain", { required: true })}
					isInvalid={!!errors.domain}
					errorMessage={errors.domain?.message}
					isRequired
				/>
				<Input
					type="text"
					label="Subdomain"
					{...register("request.subdomain")}
					isInvalid={!!errors.request?.subdomain}
					errorMessage={errors.request?.subdomain?.message}
				/>
				<Textarea
					type="text"
					label="Data or IP address"
					{...register("request.data", { required: true })}
					isInvalid={!!errors.request?.data}
					errorMessage={errors.request?.data?.message}
					isRequired
				/>
				<Input
					label="TTL"
					type="number"
					{...register("request.ttl", { min: 300, max: 172800 })}
					isInvalid={!!errors.request?.ttl}
					errorMessage={errors.request?.ttl?.message}
					isRequired
				/>
				<Select
					label="Type"
					{...register("request.type")}
					isRequired
					isInvalid={!!errors.request?.type}
				>
					{Object.keys(models_RecordType).map((key) => {
						return (
							<SelectItem key={key} value={key}>
								{key}
							</SelectItem>
						);
					})}
				</Select>
				<Checkbox
					type="checkbox"
					aria-label="Commit"
					{...register("request.autocommit")}
				>
					Commit
				</Checkbox>
				<Button type="submit" size="lg" color="primary">
					Save
				</Button>
				<Button type="reset" size="lg" color="danger">
					Clear
				</Button>
			</form>
		</div>
	) : (
		<Login auth={auth} />
	);
};
