import { FiEdit, FiMaximize2, FiMinimize2, FiTrash2 } from 'react-icons/fi';
import { models_Record } from '../api';
import { Radio } from 'react-loader-spinner';

type DomainListProps = {
	subdomains: models_Record[] | undefined;
	handleEditRecord: (subdomain: models_Record) => void;
	handleDeleteRecord: (subdomain: string, id: number) => void;
	isDomainExpanded: boolean;
	setIsDomainExpanded: (isDomainExpanded: boolean) => void;
	domain: string | undefined;
	isLoading: boolean;
};

export const DomainList = (props: DomainListProps) => {
	const allowedRecordTypes = ['A', 'AAAA', 'CNAME'];
	const canShowDomain = (type: string | undefined): boolean =>
		props.isDomainExpanded && props.domain !== undefined && allowedRecordTypes.some(x => x == type);

	const renderTableContents = () => {
		return (
			<>
				{props.subdomains?.map(function (subdomain, index) {
					return (
						<tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900" key={index}>
							<td className="p-3">
								<p>{subdomain.ID}</p>
							</td>
							<td className="p-3">
								<p>
									{subdomain.name}
									{canShowDomain(subdomain.rdtype) ? '.' + props.domain : ''}
								</p>
							</td>
							<td className="p-3">
								<p>{subdomain.ttl}</p>
							</td>
							<td className="p-3">
								<p>{subdomain.rdtype}</p>
							</td>
							<td className="p-3 max-w-sm truncate">
								<p>{subdomain.rdata}</p>
							</td>
							<td className="p-3">
								<p>{subdomain.changed_date}</p>
							</td>
							<td className="p-3">
								<p>{subdomain.author_comment}</p>
							</td>
							<td className="p-3">
								<div className="flex flex-row text-lg justify-center">
									<FiEdit
										className="mx-1 hover:text-yellow-600 cursor-pointer"
										onClick={() => props.handleEditRecord(subdomain)}
									/>
									<FiTrash2
										className="mx-1 hover:text-red-600 cursor-pointer"
										onClick={() => props.handleDeleteRecord(subdomain.name!, Number(subdomain.ID))}
									/>
								</div>
							</td>
						</tr>
					);
				})}
				{props.subdomains?.length === 0 && (
					<tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
						{Array.from({ length: 8 }).map((_, index) => (
							<td key={index} className="p-3">
								<p>-</p>
							</td>
						))}
					</tr>
				)}
			</>
		);
	};

	return (
		<div>
			<div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
				<h2 className="mb-4 text-2xl font-semibold leading-tight">Records</h2>
				<div className="overflow-x-auto rounded-lg">
					<table className="min-w-full text-xs">
						<thead className="dark:bg-gray-700">
							<tr>
								<th className="p-3">Record ID</th>
								<th className="p-3">
									<div className="flex flex-row justify-center place-items-center">
										Name
										{!props.isDomainExpanded ? (
											<FiMaximize2
												className="ml-2 cursor-pointer hover:text-yellow-200"
												onClick={() => props.setIsDomainExpanded(true)}
												title="Show domain name"
											/>
										) : (
											<FiMinimize2
												className="ml-2 cursor-pointer hover:text-red-200"
												onClick={() => props.setIsDomainExpanded(false)}
												title="Hide domain name"
											/>
										)}
									</div>
								</th>
								<th className="p-3">TTL</th>
								<th className="p-3">Record Type</th>
								<th className="p-3">Data</th>
								<th className="p-3">Updated at</th>
								<th className="p-3">Comment</th>
								<th className="p-3">Actions</th>
							</tr>
						</thead>
						<tbody>
							{!props.isLoading ? (
								renderTableContents()
							) : (
								<tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900 ">
									{Array.from({ length: 8 }).map((_, index) => (
										<td key={index} className="p-3">
											<Radio wrapperClass="h-6 w-6 mx-auto" height={20} width={20} />
										</td>
									))}
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
