import { Button, Input } from "@heroui/react";
import type { UnknownAction } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { AuthMode } from "../helpers/ConfigHelpers";
import type { PageWithAuthProps } from "../models/PageWithAuthProps";
import { fetchDomains } from "../redux/thunks/domains/fetchDomains";
import { loginUser } from "../redux/thunks/users/loginUser";

export const Login = ({ auth }: PageWithAuthProps) => {
	const [login, setLogin] = useState<string>();
	const [password, setPassword] = useState<string>();

	const dispatch = useDispatch();
	const authMode = useSelector(
		(state: RootState) => state.app.config?.AUTH_MODE,
	);

	const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setLogin(event.target.value);
	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setPassword(event.target.value);

	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();

		if (login && password) {
			(
				dispatch(
					loginUser({
						credentials: { login, secret: password },
					}) as unknown as UnknownAction,
				) as unknown as Promise<UnknownAction>
			)
				.then((result: UnknownAction) => {
					if (result.type.endsWith("/fulfilled")) {
						dispatch(fetchDomains() as unknown as UnknownAction);
					}
				})
				.catch(() => {});
		}
	};

	return authMode === AuthMode.OAUTH2 ? (
		<div className="mx-auto p-6 my-5 rounded-lg w-2/3 text-center">
			<Button
				variant="ghost"
				onPress={() => auth?.signIn()}
				size="lg"
				color="primary"
			>
				Sign in with Identity Provider
			</Button>
		</div>
	) : (
		<div className="w-full lg:w-1/2 mx-auto text-center">
			<p className="py-4">Login with your Better WAPI credentials</p>
			<form
				className="flex flex-col w-full pb-12 pt-2 px-8 gap-2 rounded mx-auto"
				data-form-type="login"
				onSubmit={handleSubmit}
			>
				<Input
					type="text"
					label="Login"
					variant="flat"
					data-form-type="username"
					onChange={handleLoginChange}
				/>
				<Input
					type="password"
					label="Password"
					variant="flat"
					data-form-type="password"
					onChange={handlePasswordChange}
				/>
				<Button type="submit" data-form-type="action,login" variant="ghost">
					Login
				</Button>
			</form>
		</div>
	);
};
