import { createRef, useEffect, useState } from "react"
import { DomainService, models_Record } from "../api"
import { Button } from "../components/Button"
import { Login } from "../components/Login"
import { getCredentialsFromStorage } from "../helpers/SecurityHelpers"

export const RecordsPage = () => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false)
    const [activeDomain, setDomain] = useState<String>()
    const [subdomains, setSubdomains] = useState<models_Record[]>()

    const domainRef = createRef<HTMLInputElement>();

    const handleDomainChange = async () => {
        if (domainRef.current) {
            setDomain(domainRef.current.value)

            await getRecords(domainRef.current.value)
        }        
    }

    useEffect(() => {
        setAuthenticated(getCredentialsFromStorage)
    }, [activeDomain])

    const getRecords = async (domain: string) => {
        let records = await DomainService.getDomainInfo(domain)

        if (records.length > 0) {
            setSubdomains(records)
        }
    }

    const renderSearch = () => {
        return (
            <div className="text-center bg-slate-900/25 rounded-lg w-3/4 text-white mx-auto items-center justify-center my-6 p-4">
                <p>Select domain to list records</p>
                <div className="flex items-center justify-center space-x-4">
                    <input type="text" className="items-center p-5 w-3/4 mt-2 text-center rounded focus:outline-none focus:ring-2 focus:border-indigo-400 focus:ring-indigo-400 bg-gray-600"
                        ref={domainRef} />

                    <span className="mt-2"><Button onClick={handleDomainChange}>Search</Button></span>
                </div>
            </div>
        )
    }

    const renderList = () => {
        return (
            <div>
                <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
                    <h2 className="mb-4 text-2xl font-semibold leading-tight">Records</h2>
                    <div className="overflow-x-auto">
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
                                        </tr>
                                    )
                                }) ?? (
                                        <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                                            <td className="p-3">
                                                <p>-</p>
                                            </td>
                                            <td className="p-3">
                                                <p>-</p>
                                            </td>
                                            <td className="p-3">
                                                <p>-</p>
                                            </td>
                                            <td className="p-3">
                                                <p>-</p>
                                            </td>
                                            <td className="p-3">
                                                <p>-</p>
                                            </td>
                                            <td className="p-3">
                                                <p>-</p>
                                            </td>
                                            <td className="p-3">
                                                <p>-</p>
                                            </td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

    return (
        !isAuthenticated ? <Login /> : <div className="text-center bg-slate-900/25 rounded-lg w-3/4 text-white mx-auto items-center justify-center my-6 p-4">
            <p>{!activeDomain ? 'Select domain to list records' : 'Listing records for domain ' + activeDomain}</p>
            <div className="flex items-center justify-center space-x-4">
                <input type="text" className="items-center p-5 w-3/4 mt-2 text-center rounded focus:outline-none focus:ring-2 focus:border-indigo-400 focus:ring-indigo-400 bg-gray-600"
                    ref={domainRef} />
                <span className="mt-2"><Button onClick={handleDomainChange}>Search</Button></span>
            </div>
            {renderList()}
        </div>
    )
}
