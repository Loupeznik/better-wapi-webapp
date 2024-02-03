type FormValidationErrorMessageProps = {
	message: string;
};

export const FormValidationErrorMessage = (props: FormValidationErrorMessageProps) => {
	return <div className="text-red-400 my-1 text-xs">{props.message}</div>;
};
