import type { UnknownAction } from "@reduxjs/toolkit";
import { createRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { models_DeleteRowRequestV2 } from "../api";
import type { RootState } from "../app/store";
import { DomainList } from "../components/DomainList";
import { Login } from "../components/Login";
import { domainSlice } from "../redux/slices/domainSlice";
import { deleteRecord } from "../redux/thunks/records/deleteRecord";
import { fetchRecords } from "../redux/thunks/records/fetchRecords";
import { Button, Input } from "@nextui-org/react";

export const RecordsPage = () => {
	const domain = useSelector((state: RootState) => state.domain);
	const isUserLoggedIn = useSelector(
		(state: RootState) => state.user.isLoggedIn,
	);
	const dispatch = useDispatch();

	const domainRef = createRef<HTMLInputElement>();
	const activeDomain = domain.domain;

	useEffect(() => {
		if (domain.shouldFetchRecords) {
			dispatch(fetchRecords(domain.domain) as unknown as UnknownAction);
		}
	}, [domain.shouldFetchRecords, dispatch, domain.domain]);

	useEffect(() => {
		if (
			activeDomain &&
			isUserLoggedIn &&
			domain.subdomains.length === 0 &&
			domain.error === undefined &&
			!domain.shouldFetchRecords
		) {
			dispatch(fetchRecords(activeDomain) as unknown as UnknownAction);
		}
	}, [
		activeDomain,
		dispatch,
		domain.subdomains.length,
		domain.error,
		isUserLoggedIn,
		domain.shouldFetchRecords,
	]);

	const handleDomainChange = async () => {
		if (domainRef.current) {
			const domain = domainRef.current.value;
			dispatch(domainSlice.actions.changeDomain(domain));
		}
	};

	const handleDeleteRecord = async (subdomain: string, id: number) => {
		const request: models_DeleteRowRequestV2 = {
			autocommit: false,
		};

		const confirm = window.confirm(
			`Are you sure you want to delete DNS record for ${subdomain}?`,
		);

		if (confirm) {
			dispatch(
				deleteRecord({
					domain: domain.domain,
					request: request,
					id: id,
				}) as unknown as UnknownAction,
			);
		}
	};

	return isUserLoggedIn ? (
		<div className="text-center rounded-lg lg:mx-auto mx-4 items-center justify-center my-6 p-4 min-w-full">
			<p>
				{!activeDomain
					? "Select domain to list records"
					: `Listing records for domain ${activeDomain}`}
			</p>
			<div className="flex flex-col lg:flex-row items-center gap-2 justify-center space-x-4 mt-2">
				<Input
					size="lg"
					type="text"
					id="search"
					ref={domainRef}
					defaultValue={activeDomain}
					onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
						if (event.key === "Enter") {
							handleDomainChange();
						}
					}}
				/>
				<Button size="lg" variant="ghost" onPress={handleDomainChange}>
					Search
				</Button>
			</div>

			<DomainList
				subdomains={domain.subdomains}
				handleDeleteRecord={handleDeleteRecord}
				domain={activeDomain}
				isLoading={domain.isLoading}
			/>
		</div>
	) : (
		<Login />
	);
};
