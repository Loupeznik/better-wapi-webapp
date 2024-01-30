import { createRef, useEffect, useState } from 'react';
import { ApiError, DomainService, models_DeleteRowRequestV2, models_ErrorResponse, models_Record } from '../api';
import { Button } from '../components/Button';
import { Login } from '../components/Login';
import { getToken } from '../helpers/SecurityHelpers';
import { UpdateForm } from '../components/UpdateForm';
import { DomainList } from '../components/DomainList';
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { fetchRecords } from '../redux/thunks/records/fetchRecords';

export const RecordsPage = () => {
	const [activeDomain, setDomain] = useState<string>();
	const [isUpdateScreenVisible, setUpdateScreenVisible] = useState<boolean>(false);
	const [editedSubdomain, setEditedSubdomain] = useState<models_Record>();
	const [isDomainExpanded, setIsDomainExpanded] = useState<boolean>(false);

	const domain = useSelector((state: RootState) => state.domain);
	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	const domainRef = createRef<HTMLInputElement>();

	const handleDomainChange = async () => {
		if (domainRef.current) {
			const domain = domainRef.current.value;
			setDomain(domain);

			dispatch(fetchRecords(domain) as any);
			saveLatestDomain(domain);
		}
	};

	const handleDeleteRecord = async (subdomain: string, id: number) => {
		const request: models_DeleteRowRequestV2 = {
			autocommit: false,
		};

		const confirm = window.confirm(`Are you sure you want to delete DNS record for ${subdomain}?`);

		if (activeDomain && confirm) {
			await DomainService.deleteV2DomainRecord(request, activeDomain!, id).then(
				onFulfilled => {
					toast.success(`Record for ${subdomain} deleted successfully`);
					dispatch(fetchRecords(activeDomain) as any);
				},
				onRejected => {
					const exception = onRejected as ApiError;
					toast.error(
						`Failed to delete record for ${subdomain}: ${(exception.body as models_ErrorResponse).error}`,
					);
				},
			);
		}
	};

	const handleEditRecord = (subdomain: models_Record) => {
		setEditedSubdomain(subdomain);
		setUpdateScreenVisible(true);
	};

	const saveLatestDomain = (domain: string) => localStorage.setItem('lastDomain', domain);

	return user.isLoggedIn ? (
		<div className="text-center bg-slate-900/25 rounded-lg w-3/4 text-white mx-auto items-center justify-center my-6 p-4">
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
			{domain.error ? (
				<label htmlFor="search" className="block text-sm font-semibold text-center text-red-600">
					{domain.error}
				</label>
			) : (
				''
			)}
			{!domain.isLoading ? (
				<DomainList
					subdomains={domain.subdomains}
					handleEditRecord={handleEditRecord}
					handleDeleteRecord={handleDeleteRecord}
					isDomainExpanded={isDomainExpanded}
					setIsDomainExpanded={setIsDomainExpanded}
					domain={activeDomain}
				/>
			) : (
				<p className="text-center text-red-600">Loading</p>
			)}

			{isUpdateScreenVisible && activeDomain && editedSubdomain ? (
				<UpdateForm
					domain={activeDomain}
					record={editedSubdomain}
					isVisible={isUpdateScreenVisible}
					setVisible={setUpdateScreenVisible}
					onUpdate={() => dispatch(fetchRecords(activeDomain) as any)}
				/>
			) : null}
		</div>
	) : (
		<Login />
	);
};
