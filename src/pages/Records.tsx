import { createRef, useEffect, useState } from "react"
import { ApiError, DomainService, models_ErrorResponse, models_Record, models_SaveRowRequest } from "../api"
import { Button } from "../components/Button"
import { Login } from "../components/Login"
import { getCredentialsFromStorage } from "../helpers/SecurityHelpers"
import { FiEdit, FiTrash2 } from "react-icons/fi"

export const RecordsPage = () => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false)
    const [activeDomain, setDomain] = useState<string>()
    const [subdomains, setSubdomains] = useState<models_Record[]>()
    const [searchError, setSearchError] = useState<string>()

    const domainRef = createRef<HTMLInputElement>();

    const handleDomainChange = async () => {
        if (domainRef.current) {
            setDomain(domainRef.current.value)

            await getRecords(domainRef.current.value)
        }
    }

    const handleDeleteRecord = async (subdomain: string) => {
        const record: models_SaveRowRequest = {
            subdomain: subdomain
        }

        if (activeDomain) {
            await DomainService.deleteDomainRecord(record, activeDomain!).then(() => {
                getRecords(activeDomain)
            })
        } 
    }

    useEffect(() => {
        setAuthenticated(getCredentialsFromStorage())
    }, [activeDomain, isAuthenticated])

    const getRecords = async (domain: string) => {
        try {
            const records = await DomainService.getDomainInfo(domain)

            if (searchError) {
                setSearchError('')
            }

            if (records.length > 0) {
                setSubdomains(records)
            }
        } catch (ex) {
            const exception = ex as ApiError
            setSearchError(`Error listing records for ${domain}: ${(exception.body as models_ErrorResponse).error}`)
        }
    }

    const renderList = () => {
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
                                                    <FiEdit className="mx-1 hover:text-yellow-600 cursor-pointer" />
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

    if (!isAuthenticated) {
        return <Login setAuthenticated={(value: boolean) => setAuthenticated(value)} />
    }

    return (
        <div className="text-center bg-slate-900/25 rounded-lg w-3/4 text-white mx-auto items-center justify-center my-6 p-4">
            <p>{!activeDomain ? 'Select domain to list records' : 'Listing records for domain ' + activeDomain}</p>
            <div className="flex items-center justify-center space-x-4">
                <input type="text" className="items-center p-5 w-3/4 mt-2 text-center rounded focus:outline-none focus:ring-2 focus:border-indigo-400 focus:ring-indigo-400 bg-gray-600"
                    ref={domainRef} id="search" />
                <span className="mt-2"><Button onClick={handleDomainChange}>Search</Button></span>
            </div>
            {searchError ? <label htmlFor="search" className="block text-sm font-semibold text-center text-red-600">{searchError}</label> : ''}
            {renderList()}
        </div>
    )
}
