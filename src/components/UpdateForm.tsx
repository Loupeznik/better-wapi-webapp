import {
	Button,
	Checkbox,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Textarea,
	useDisclosure,
} from "@nextui-org/react";
import type { UnknownAction } from "@reduxjs/toolkit";
import { type SubmitHandler, useForm } from "react-hook-form";
import { FiEdit } from "react-icons/fi";
import { useDispatch } from "react-redux";
import type { models_Record, models_SaveRowRequest } from "../api";
import { updateRecord } from "../redux/thunks/records/updateRecord";

type UpdateFormProps = {
	record: models_Record;
	domain: string;
};

type UpdateRecordForm = {
	subdomain: string;
	data: string;
	ttl: number;
	autocommit: boolean;
};

export const UpdateForm = ({ record, domain }: UpdateFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdateRecordForm>({
		defaultValues: {
			subdomain: record.name,
			data: record.rdata,
			ttl: Number.parseInt(record.ttl ? record.ttl : "0"),
			autocommit: false,
		},
	});

	const dispatch = useDispatch();
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

	const onSubmit: SubmitHandler<UpdateRecordForm> = async (data) => {
		data.ttl = Number.parseInt(data.ttl.toString());

		const request: models_SaveRowRequest = {
			subdomain: data.subdomain || "",
			data: data.data,
			autocommit: data.autocommit,
			ttl: data.ttl,
			type: record.rdtype as models_SaveRowRequest["type"],
		};

		dispatch(
			updateRecord({
				domain,
				subdomain: request,
				id: Number(record.ID),
			}) as unknown as UnknownAction,
		);
		onClose();
	};

	return (
		<>
			<FiEdit
				onClick={onOpen}
				className="mx-1 hover:text-yellow-600 cursor-pointer"
			/>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Update record
							</ModalHeader>
							<ModalBody>
								<form
									onSubmit={handleSubmit(onSubmit)}
									className="mt-6 flex flex-col gap-4"
								>
									<Input
										size="md"
										type="text"
										label="Subdomain"
										{...register("subdomain")}
										disabled
									/>
									<Textarea
										label="Data"
										{...register("data")}
										isInvalid={!!errors.data}
										errorMessage={errors.data?.message}
									/>
									<Input
										size="md"
										type="number"
										label="TTL"
										{...register("ttl", { min: 300, max: 172800 })}
										isInvalid={!!errors.ttl}
										errorMessage={errors.ttl?.message}
									/>
									<Checkbox size="md" {...register("autocommit")}>
										Commit
									</Checkbox>
									<div className="flex justify-between mt-4">
										<Button size="md" color="primary" type="submit">
											Save
										</Button>
										<Button size="md" color="danger" onClick={onClose}>
											Cancel
										</Button>
									</div>
								</form>
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};
