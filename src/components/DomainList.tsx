import { Input, Popover, PopoverContent, PopoverTrigger, Select, SelectItem, Spinner, Switch } from '@nextui-org/react';
import {
	type ColumnDef,
	type ColumnFiltersState,
	type Row,
	type Table,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import {
	FiChevronLeft,
	FiChevronRight,
	FiChevronsDown,
	FiChevronsLeft,
	FiChevronsRight,
	FiChevronsUp,
	FiEdit,
	FiSearch,
	FiTrash2,
} from 'react-icons/fi';
import type { models_Record } from '../api';

type DomainListProps = {
	subdomains: models_Record[] | undefined;
	handleEditRecord: (subdomain: models_Record) => void;
	handleDeleteRecord: (subdomain: string, id: number) => void;
	domain: string | undefined;
	isLoading: boolean;
};

type RecordWithActions = models_Record & {
	actions: JSX.Element;
};

const includesFilterFn = (row: Row<RecordWithActions>, columnId: string, filterValue: string): boolean => {
	const cellValue = row.getValue(columnId) as string;
	return cellValue?.includes(filterValue);
};

export const DomainList = (props: DomainListProps) => {
	const [isDomainExpanded, setIsDomainExpanded] = useState<boolean>(false);
	const allowedRecordTypes = ['A', 'AAAA', 'CNAME'];
	const canShowDomain = (type: string | undefined): boolean =>
		isDomainExpanded && props.domain !== undefined && allowedRecordTypes.some(x => x === type);

	const columnHelper = createColumnHelper<RecordWithActions>();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const columns = useMemo(
		() => [
			columnHelper.accessor('ID', {
				header: 'Record ID',
				enableColumnFilter: false,
			}),
			columnHelper.accessor('name', {
				header: 'Name',
				cell: info => (
					<>
						{info.cell.getValue()}
						{canShowDomain(info.row.getValue('rdtype')) ? `.${props.domain}` : ''}
					</>
				),
				enableColumnFilter: true,
				id: 'name',
				filterFn: includesFilterFn,
			}),
			columnHelper.accessor('ttl', {
				header: 'TTL',
				enableColumnFilter: false,
			}),
			columnHelper.accessor('rdtype', {
				header: 'Record Type',
				enableColumnFilter: false,
			}),
			columnHelper.accessor('rdata', {
				header: 'Data',
				cell: info => {
					const data = info.cell.getValue();
					return data && data.length > 50 ? (
						<Popover placement="left-end">
							<PopoverTrigger>
								<span className="cursor-pointer">{`${data.slice(0, 50)}...`}</span>
							</PopoverTrigger>
							<PopoverContent>
								<span className="text-xs max-w-sm overflow-y-auto text-wrap break-all ">{data}</span>
							</PopoverContent>
						</Popover>
					) : (
						data
					);
				},
				enableColumnFilter: true,
				id: 'rdata',
				filterFn: includesFilterFn,
			}),
			columnHelper.accessor('changed_date', {
				header: 'Updated at',
				enableColumnFilter: false,
			}),
			columnHelper.accessor('author_comment', {
				header: 'Comment',
				enableColumnFilter: false,
			}),
			columnHelper.accessor('actions', {
				header: () => 'Actions',
				cell: info => info.renderValue(),
				enableColumnFilter: false,
			}),
		],
		[props.domain, columnHelper],
	);

	const filterableColumns = useMemo(() => {
		return columns.filter(x => x.enableColumnFilter);
	}, [columns]);

	const [filteringBy, setFilteringBy] = useState<string | undefined>(undefined);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const recordsWithActions = useMemo(() => {
		return props.subdomains?.map(subdomain => {
			const actions = (
				<div className="flex flex-row text-lg justify-center" key={subdomain.ID}>
					<FiEdit
						className="mx-1 hover:text-yellow-600 cursor-pointer"
						onClick={() => props.handleEditRecord(subdomain)}
					/>
					<FiTrash2
						className="mx-1 hover:text-red-600 cursor-pointer"
						onClick={() => props.handleDeleteRecord(subdomain.name as string, Number(subdomain.ID))}
					/>
				</div>
			);
			return { ...subdomain, actions };
		});
	}, [props.subdomains, props.handleEditRecord, props.handleDeleteRecord]);

	const table = useReactTable({
		data: recordsWithActions ?? [],
		columns,
		state: {
			columnFilters,
		},
		initialState: {
			pagination: {
				pageSize: 15,
			},
		},
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	const renderTable = () => {
		return (
			<div className="overflow-x-auto rounded-lg">
				<ColumnFilter
					setFilteringBy={setFilteringBy}
					filteringBy={filteringBy}
					table={table}
					isDomainExpanded={isDomainExpanded}
					setIsDomainExpanded={setIsDomainExpanded}
					filterableColumns={filterableColumns}
				/>
				<table className="min-w-full text-xs mt-4">
					<thead className="dark:bg-gray-700">
						{table.getHeaderGroups().map(headerGroup => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<th key={header.id} colSpan={header.colSpan} className="p-3">
											{header.isPlaceholder ? null : (
												<>
													<div
														{...{
															className: header.column.getCanSort()
																? 'cursor-pointer select-none flex flex-row justify-center gap-2'
																: '',
															onClick: header.column.getToggleSortingHandler(),
														}}
													>
														{flexRender(
															header.column.columnDef.header,
															header.getContext(),
														)}
														{{
															asc: <FiChevronsUp />,
															desc: <FiChevronsDown />,
														}[header.column.getIsSorted() as string] ?? null}
													</div>
												</>
											)}
										</th>
									);
								})}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowCount() > 0 ? (
							table.getRowModel().rows.map(row => {
								return (
									<tr
										key={row.id}
										className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900"
									>
										{row.getVisibleCells().map(cell => {
											return (
												<td key={cell.id} className="p-3">
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</td>
											);
										})}
									</tr>
								);
							})
						) : (
							<tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
								{Array.from(table.getAllColumns()).map((_, index) => (
									<td key={index} className="p-3">
										<p>-</p>
									</td>
								))}
							</tr>
						)}
					</tbody>
				</table>

				<div className="h-2" />
				<div className="flex items-center gap-2 justify-end">
					<button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
						<FiChevronsLeft />
					</button>
					<button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
						<FiChevronLeft />
					</button>
					<button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
						<FiChevronRight />
					</button>
					<button
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						<FiChevronsRight />
					</button>
					<span className="flex items-center gap-1">
						<div>Page</div>
						<strong>
							{`${
								table.getPageCount() > 0 ? table.getState().pagination.pageIndex + 1 : 0
							} of ${table.getPageCount()}`}
						</strong>
					</span>
				</div>
			</div>
		);
	};

	return (
		<div>
			<div className="container p-2 mx-auto sm:p-4">
				<h2 className="mb-4 text-2xl font-semibold leading-tight">Records</h2>
				{props.isLoading ? <Spinner size="lg" /> : renderTable()}
			</div>
		</div>
	);
};

const ColumnFilter = ({
	setFilteringBy,
	filteringBy,
	table,
	filterableColumns,
	isDomainExpanded,
	setIsDomainExpanded,
}: {
	setFilteringBy: (value: string) => void;
	filteringBy: string | undefined;
	table: Table<{
		actions: JSX.Element;
		ID?: string;
		author_comment?: string;
		changed_date?: string;
		name?: string;
		rdata?: string;
		rdtype?: string;
		ttl?: string;
	}>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	filterableColumns: ColumnDef<RecordWithActions, any>[];
	isDomainExpanded: boolean;
	setIsDomainExpanded: (value: boolean) => void;
}) => {
	return (
		<div className="flex flex-row my-2 gap-8">
			<div className="flex flex-row gap-2 w-full">
				<FilterDropdown setFilteringBy={setFilteringBy} filterableColumns={filterableColumns} />
				<Input
					type="text"
					size="lg"
					startContent={<FiSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
					onChange={e =>
						filteringBy !== undefined && table.getColumn(filteringBy)?.setFilterValue(e.target.value)
					}
				/>
			</div>
			<Switch
				className="w-full"
				size="lg"
				isSelected={isDomainExpanded}
				onValueChange={() => setIsDomainExpanded(!isDomainExpanded)}
			>
				Show domain
			</Switch>
		</div>
	);
};

const FilterDropdown = ({
	setFilteringBy,
	filterableColumns,
}: {
	setFilteringBy: (value: string) => void;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	filterableColumns: ColumnDef<RecordWithActions, any>[];
}) => {
	return (
		<Select
			label="Select column for filtering"
			className="max-w-xs"
			size="sm"
			onChange={e => setFilteringBy(e.target.value)}
		>
			{filterableColumns.map(x => (
				<SelectItem key={x.id as string}>{x.header as string}</SelectItem>
			))}
		</Select>
	);
};
