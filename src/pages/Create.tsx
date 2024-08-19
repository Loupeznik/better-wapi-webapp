import type { UnknownAction } from '@reduxjs/toolkit';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { models_RecordType } from '../api';
import type { RootState } from '../app/store';
import { FormValidationErrorMessage } from '../components/FormValidationErrorMessage';
import { Login } from '../components/Login';
import type { SaveRecordForm } from '../models/SaveRecordForm';
import { addRecord } from '../redux/thunks/records/addRecord';

export const CreateRecordPage = () => {
	const currentDomain = useSelector((state: RootState) => state.domain.domain);
	const isUserLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SaveRecordForm>();

	const onSubmit: SubmitHandler<SaveRecordForm> = async data => {
		data.request.ttl = data.request.ttl === undefined ? undefined : Number.parseInt(data.request.ttl.toString());

		dispatch(addRecord({ domain: data.domain, subdomain: data.request }) as unknown as UnknownAction);
	};

	return isUserLoggedIn ? (
		<div className="mx-auto p-6 mt-5 rounded-lg w-2/3">
			<h1 className="text-center text-3xl font-bold">Create a new record</h1>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col w-full max-w-lg pb-12 pt-2 px-8 rounded mx-auto"
			>
				<label htmlFor="domain" className="self-start mt-3 text-xs font-semibold">
					Domain<span className="ml-1 text-red-400">*</span>
				</label>
				<input
					id="domain"
					type="text"
					defaultValue={currentDomain}
					className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 focus:border-indigo-400 focus:ring-indigo-400 bg-gray-600"
					{...register('domain', { required: true })}
				/>
				{errors.domain && <FormValidationErrorMessage message="This field is required" />}
				<label htmlFor="subdomain" className="self-start mt-3 text-xs font-semibold">
					Subdomain
				</label>
				<input
					id="subdomain"
					type="text"
					className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 focus:border-indigo-400 focus:ring-indigo-400 bg-gray-600"
					{...register('request.subdomain')}
				/>
				<label htmlFor="data" className="self-start mt-3 text-xs font-semibold">
					IP Address or Data<span className="ml-1 text-red-400">*</span>
				</label>
				<input
					id="data"
					type="text"
					className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 focus:border-indigo-400 focus:ring-indigo-400 bg-gray-600"
					{...register('request.data', { required: true })}
				/>
				{errors.request?.data && <FormValidationErrorMessage message="This field is required" />}
				<label htmlFor="data" className="self-start mt-3 text-xs font-semibold">
					TTL
				</label>
				<input
					id="data"
					type="number"
					className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 focus:border-indigo-400 focus:ring-indigo-400 bg-gray-600"
					{...register('request.ttl', { min: 300, max: 172800 })}
				/>
				{errors.request?.ttl && <FormValidationErrorMessage message="TTL must be between 300 and 172800" />}
				<label htmlFor="type" className="self-start mt-3 text-xs font-semibold">
					Record Type
				</label>
				<div className="flex flex-row justify-center">
					<select
						id="type"
						className="flex mt-2 rounded w-full
                        focus:outline-none focus:ring-2 focus:border-indigo-400 focus:ring-indigo-400 bg-gray-600"
						{...register('request.type')}
					>
						{Object.keys(models_RecordType).map(key => {
							return (
								<option key={key} value={key}>
									{key}
								</option>
							);
						})}
					</select>
				</div>
				<div className="text-left py-2">
					<input
						type="checkbox"
						id="commit"
						aria-label="Commit"
						className="mr-2 rounded-sm checked:bg-indigo-400 checked:focus:bg-indigo-400 checked:hover:bg-indigo-400"
						{...register('request.autocommit')}
					/>
					<label htmlFor="commit" className="text-sm font-semibold">
						Commit
					</label>
				</div>
				<button
					type="submit"
					className="flex items-center justify-center h-12 px-6 mt-2 text-sm font-semibold rounded dark:bg-indigo-400 hover:bg-indigo-800"
				>
					Save
				</button>
				<button
					type="reset"
					className="flex items-center justify-center h-12 px-6 mt-2 text-sm font-semibold rounded dark:bg-red-400 hover:bg-red-800"
				>
					Clear
				</button>
			</form>
		</div>
	) : (
		<Login />
	);
};
