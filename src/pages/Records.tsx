import { Button, Select, SelectItem, type Selection } from "@heroui/react";
import type { UnknownAction } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { IoMdRefresh } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import type { models_DeleteRowRequestV2 } from "../api";
import type { RootState } from "../app/store";
import { DomainList } from "../components/DomainList";
import { Login } from "../components/Login";
import type { PageWithAuthProps } from "../models/PageWithAuthProps";
import { selectActiveDomains } from "../redux/slices/appSlice";
import { domainSlice } from "../redux/slices/domainSlice";
import { fetchDomains } from "../redux/thunks/domains/fetchDomains";
import { deleteRecord } from "../redux/thunks/records/deleteRecord";
import { fetchRecords } from "../redux/thunks/records/fetchRecords";

export const RecordsPage = ({ auth }: PageWithAuthProps) => {
	const domain = useSelector((state: RootState) => state.domain);
	const activeDomains = useSelector(selectActiveDomains);
	const isUserLoggedIn = useSelector(
		(state: RootState) => state.user.isLoggedIn,
	);
	const dispatch = useDispatch();

	const activeDomain = domain.domain;
	const domainExists = activeDomains.some((d) => d.name === activeDomain);

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

	const handleDomainChange = (keys: Selection) => {
		const selected = Array.from(keys)[0] as string;
		if (selected) {
			dispatch(domainSlice.actions.changeDomain(selected));
		}
	};

	const handleRefreshDomains = () => {
		dispatch(fetchDomains() as unknown as UnknownAction);
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
		<div className="text-center rounded-lg lg:mx-auto mx-4 items-center justify-center my-6 p-2 min-w-full">
			<p>
				{!activeDomain
					? "Select domain to list records"
					: `Listing records for domain ${activeDomain}`}
			</p>
			<div className="flex flex-row items-center gap-2 justify-center mt-2 w-full px-4">
				<Select
					size="lg"
					variant="flat"
					label="Domain"
					placeholder="Select a domain"
					selectedKeys={
						activeDomain && domainExists ? new Set([activeDomain]) : new Set()
					}
					onSelectionChange={handleDomainChange}
					className="w-3/4"
					disallowEmptySelection
				>
					{activeDomains.map((d) => (
						<SelectItem key={d.name || ""} textValue={d.name}>
							{d.name}
						</SelectItem>
					))}
				</Select>
				<Button
					isIconOnly
					size="lg"
					variant="ghost"
					onPress={handleRefreshDomains}
					aria-label="Refresh domains"
				>
					<IoMdRefresh size={24} />
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
		<Login auth={auth} />
	);
};
