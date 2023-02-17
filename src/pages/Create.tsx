import { useEffect, useState } from "react"
import { DomainService, models_SaveRowRequest } from "../api"
import { Login } from "../components/Login"
import { getCredentialsFromStorage } from "../helpers/SecurityHelpers"

export const CreateRecordPage = () => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false)
    const [domain, setDomain] = useState<string>()
    const [subdomain, setSubdomain] = useState<string>()
    const [data, setData] = useState<string>()
    const [autocommit, setAutocommit] = useState<boolean>(false)

    const handleDomainChange = (event: React.ChangeEvent<HTMLInputElement>) => setDomain(event.target.value)
    const handleSubdomainChange = (event: React.ChangeEvent<HTMLInputElement>) => setSubdomain(event.target.value)
    const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => setData(event.target.value)
    const handleAutocommitChange = () => setAutocommit(!autocommit)

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()

        if (!domain || !subdomain || !data) {
            return
        }

        const record: models_SaveRowRequest = {
            subdomain: subdomain,
            ip: data,
            autocommit: autocommit
        }

        await DomainService.postDomainRecord(record, domain)
    }

    useEffect(() => {
        setAuthenticated(getCredentialsFromStorage)
    }, [isAuthenticated])

    if (!isAuthenticated) {
        return <Login setAuthenticated={(value: boolean) => setAuthenticated(value)} />
    }

    return (
        <div className="mx-auto p-6 mt-5 bg-slate-900/25 rounded-lg w-2/3 text-white">
            <h1 className="text-center text-3xl font-bold">Create a new record</h1>
            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-lg pb-12 pt-2 px-8 rounded mx-auto">
                <label htmlFor="domain" className="self-start mt-3 text-xs font-semibold">Domain</label>
                <input id="domain" type="text"
                    className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 focus:border-indigo-400 focus:ring-indigo-400 bg-gray-600"
                    onChange={handleDomainChange} />
                <label htmlFor="subdomain" className="self-start mt-3 text-xs font-semibold">Subdomain</label>
                <input id="subdomain" type="text"
                    className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 focus:border-indigo-400 focus:ring-indigo-400 bg-gray-600"
                    onChange={handleSubdomainChange} />
                <label htmlFor="data" className="self-start mt-3 text-xs font-semibold">IP Address or Data</label>
                <input id="data" type="text"
                    className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 focus:border-indigo-400 focus:ring-indigo-400 bg-gray-600"
                    onChange={handleDataChange} />
                <div className="text-left py-2">
                    <input type="checkbox" name="commit" id="commit" aria-label="Commit"
                        className="mr-2 rounded-sm checked:bg-indigo-400 checked:focus:bg-indigo-400 checked:hover:bg-indigo-400"
                        checked={autocommit}
                        onChange={handleAutocommitChange} />
                    <label htmlFor="commit" className="text-sm font-semibold">Commit</label>
                </div>
                <button type="submit" className="flex items-center justify-center h-12 px-6 mt-2 text-sm font-semibold rounded dark:bg-indigo-400 hover:bg-indigo-800">
                    Save
                </button>
            </form>
        </div>
    )
}
