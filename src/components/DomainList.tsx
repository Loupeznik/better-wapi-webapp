import { FiEdit, FiTrash2 } from "react-icons/fi"
import { models_Record } from "../api"

type DomainListProps = {
    subdomains: models_Record[] | undefined
    handleEditRecord: (subdomain: models_Record) => void
    handleDeleteRecord: (subdomain: string) => void
}

export const DomainList = ({subdomains, handleEditRecord, handleDeleteRecord} : DomainListProps) => {
    return (
        <div>
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
                <h2 className="mb-4 text-2xl font-semibold leading-tight">Records</h2>
                <div className="overflow-x-auto rounded-lg">
                    <table className="min-w-full text-xs">
                        <thead className="dark:bg-gray-700">
                            <tr>
                                <th className="p-3">Record ID</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">TTL</th>
                                <th className="p-3">Record Type</th>
                                <th className="p-3">Data</th>
                                <th className="p-3">Updated at</th>
                                <th className="p-3">Comment</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subdomains?.map(function (subdomain, index) {
                                return (
                                    <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900" key={index}>
                                        <td className="p-3">
                                            <p>{subdomain.ID}</p>
                                        </td>
                                        <td className="p-3">
                                            <p>{subdomain.name}</p>
                                        </td>
                                        <td className="p-3">
                                            <p>{subdomain.ttl}</p>
                                        </td>
                                        <td className="p-3">
                                            <p>{subdomain.rdtype}</p>
                                        </td>
                                        <td className="p-3">
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
                                                <FiEdit className="mx-1 hover:text-yellow-600 cursor-pointer" onClick={() => handleEditRecord(subdomain)} />
                                                <FiTrash2 className="mx-1 hover:text-red-600 cursor-pointer" onClick={() => handleDeleteRecord(subdomain.name!)} />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }) ?? (
                                    <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                                        {Array.from({ length: 8 }).map((_, index) => (
                                            <td key={index} className="p-3">
                                                <p>-</p>
                                            </td>
                                        ))}
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
