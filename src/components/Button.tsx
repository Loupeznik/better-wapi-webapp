import { MouseEventHandler, ReactElement } from 'react';

type ButtonProps = {
	children: ReactElement | string | number | boolean | null | undefined;
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({ children, onClick }: ButtonProps) => {
	return (
		<button
			className="transition duration-700 ease-in-out bg-gray-600 hover:bg-indigo-800 rounded-xl p-5 text-lg"
			onClick={onClick}
		>
			{children}
		</button>
	);
};
