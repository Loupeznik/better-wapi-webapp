import { Button, Checkbox, Input, Textarea } from '@nextui-org/react';
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
						<form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
							<Input size="md" type="text" label="Subdomain" {...register('subdomain')} disabled />
							<Textarea
								label="Data"
								{...register('data')}
								isInvalid={!!errors.data}
								errorMessage={errors.data?.message}
							/>
							<Input
								size="md"
								type="number"
								label="TTL"
								{...register('ttl', { min: 300, max: 172800 })}
								isInvalid={!!errors.ttl}
								errorMessage={errors.ttl?.message}
							/>
							<Checkbox size="md" {...register('autocommit')}>
								Commit
							</Checkbox>
							<div className="flex justify-between mt-4">
								<Button size="md" color="primary" type="submit">
									Save
								</Button>
								<Button size="md" onClick={() => setVisible(false)}>
									Cancel
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	) : null;
};
