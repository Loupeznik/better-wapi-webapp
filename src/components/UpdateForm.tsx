import type { UnknownAction } from '@reduxjs/toolkit';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import type { models_Record, models_SaveRowRequest } from '../api';
import { updateRecord } from '../redux/thunks/records/updateRecord';

type UpdateFormProps = {
	record: models_Record;
	domain: string;
	isVisible: boolean;
	setVisible: (value: boolean) => void;
};

type UpdateRecordForm = {
	subdomain: string;
	data: string;
	ttl: number;
	autocommit: boolean;
};

export const UpdateForm = ({ record, domain, isVisible, setVisible }: UpdateFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdateRecordForm>({
		defaultValues: {
			subdomain: record.name,
			data: record.rdata,
			ttl: Number.parseInt(record.ttl ? record.ttl : '0'),
			autocommit: false,
		},
	});

	const dispatch = useDispatch();

	const onSubmit: SubmitHandler<UpdateRecordForm> = async data => {
		data.ttl = Number.parseInt(data.ttl.toString());

		const request: models_SaveRowRequest = {
			subdomain: data.subdomain || '',
			data: data.data,
			autocommit: data.autocommit,
			ttl: data.ttl,
		};

		dispatch(updateRecord({ domain, subdomain: request, id: Number(record.ID) }) as unknown as UnknownAction);
		setVisible(false);
	};

	return isVisible ? (
		<div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
			<div className="flex items-end justify-center  px-4 text-center sm:block sm:p-0 align-bottom rounded-lg overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
				<div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
					<div className="bg-slate-900 px-6 py-6">
						<h1 className="text-center text-3xl font-bold">Update record</h1>
						<form onSubmit={handleSubmit(onSubmit)} className="mt-6">
							<div>
								<label htmlFor="subdomain" className="block text-sm font-medium">
									Subdomain
								</label>
								<input
									id="subdomain"
									type="text"
									className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
									{...register('subdomain')}
									disabled
								/>
							</div>
							<div className="mt-6">
								<label htmlFor="data" className="block text-sm font-medium">
									IP Address or Data
								</label>
								<input
									id="data"
									type="text"
									className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-slate-900"
									{...register('data')}
								/>
							</div>
							<div className="mt-6">
								<label htmlFor="ttl" className="block text-sm font-medium">
									TTL
								</label>
								<input
									id="ttl"
									type="number"
									className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-slate-900"
									{...register('ttl', { min: 300, max: 172800 })}
								/>
							</div>
							<div className="mt-6">
								<label htmlFor="commit" className="inline-flex items-center">
									<input
										type="checkbox"
										id="commit"
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
										{...register('autocommit')}
									/>
									<span className="ml-2 text-sm">Commit</span>
								</label>
							</div>
							<div className="flex justify-between mt-4">
								<button
									type="submit"
									className="flex items-center justify-center h-12 px-6 text-sm font-semibold rounded dark:bg-indigo-400 hover:bg-indigo-800"
								>
									Save
								</button>
								<button
									onClick={() => setVisible(false)}
									className="flex items-center justify-center h-12 px-6 text-sm font-semibold rounded bg-gray-400 hover:bg-gray-600"
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	) : null;
};
