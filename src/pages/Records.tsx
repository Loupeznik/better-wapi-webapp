import type { UnknownAction } from '@reduxjs/toolkit';
import { createRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { models_DeleteRowRequestV2, models_Record } from '../api';
import type { RootState } from '../app/store';
import { Button } from '../components/Button';
import { DomainList } from '../components/DomainList';
import { Login } from '../components/Login';
import { UpdateForm } from '../components/UpdateForm';
import { domainSlice } from '../redux/slices/domainSlice';
import { deleteRecord } from '../redux/thunks/records/deleteRecord';
import { fetchRecords } from '../redux/thunks/records/fetchRecords';

export const RecordsPage = () => {
	const domain = useSelector((state: RootState) => state.domain);
	const isUserLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
	const dispatch = useDispatch();

	const [isUpdateScreenVisible, setUpdateScreenVisible] = useState<boolean>(false);
	const [editedSubdomain, setEditedSubdomain] = useState<models_Record>();

	const domainRef = createRef<HTMLInputElement>();
	const activeDomain = domain.domain;

	useEffect(() => {
		if (domain.shouldFetchRecords) {
			dispatch(fetchRecords(domain.domain) as unknown as UnknownAction);
		}
	}, [domain.shouldFetchRecords, dispatch, domain.domain]);

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

		const confirm = window.confirm(`Are you sure you want to delete DNS record for ${subdomain}?`);

		if (confirm) {
			dispatch(deleteRecord({ domain: domain.domain, request: request, id: id }) as unknown as UnknownAction);
		}
	};

	const handleEditRecord = (subdomain: models_Record) => {
		setEditedSubdomain(subdomain);
		setUpdateScreenVisible(true);
	};

	return isUserLoggedIn ? (
		<div className="text-center rounded-lg w-3/4 mx-auto items-center justify-center my-6 p-4">
			<p>{!activeDomain ? 'Select domain to list records' : `Listing records for domain ${activeDomain}`}</p>
			<div className="flex items-center justify-center space-x-4">
				<input
					type="text"
					className="items-center p-5 w-3/4 mt-2 text-center rounded focus:outline-none focus:ring-2 focus:border-indigo-400 focus:ring-indigo-400 bg-gray-600"
					ref={domainRef}
					id="search"
					defaultValue={activeDomain}
				/>
				<span className="mt-2">
					<Button onClick={handleDomainChange}>Search</Button>
				</span>
			</div>

			<DomainList
				subdomains={domain.subdomains}
				handleEditRecord={handleEditRecord}
				handleDeleteRecord={handleDeleteRecord}
				domain={activeDomain}
				isLoading={domain.isLoading}
			/>

			{isUpdateScreenVisible && activeDomain && editedSubdomain ? (
				<UpdateForm
					domain={activeDomain}
					record={editedSubdomain}
					isVisible={isUpdateScreenVisible}
					setVisible={setUpdateScreenVisible}
				/>
			) : null}
		</div>
	) : (
		<Login />
	);
};
