import { useEffect, useState } from "react"
import { DomainService, models_RecordType, models_SaveRowRequest } from "../api"
import { Login } from "../components/Login"
import { getToken } from "../helpers/SecurityHelpers"

export const CreateRecordPage = () => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false)
    const [domain, setDomain] = useState<string>()
    const [request, setRequest] = useState<models_SaveRowRequest>({
        subdomain: '',
        data: '',
        autocommit: false
    })

    const handleDomainChange = (event: React.ChangeEvent<HTMLInputElement>) => setDomain(event.target.value)
    const handleSubdomainChange = (event: React.ChangeEvent<HTMLInputElement>) => setRequest({ ...request, subdomain: event.target.value })
    const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => setRequest({ ...request, data: event.target.value })
    const handleAutocommitChange = () => setRequest({ ...request, autocommit: !request.autocommit })
    const handleRecordTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => setRequest({ ...request, type: event.target.value as models_RecordType })
    const handleTTLChange = (event: React.ChangeEvent<HTMLInputElement>) => setRequest({ ...request, ttl: parseInt(event.target.value) })

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()

        if (!domain || !request.subdomain || !request.data) {
            return
        }

        await DomainService.postDomainRecord(request, domain)
    }

    useEffect(() => {
        (async () => {
            const result = await getToken();
            setAuthenticated(result);
        })()
    }, [isAuthenticated])

    if (!isAuthenticated) {
        return <Login setAuthenticated={(value: boolean) => setAuthenticated(value)} />
    }

    return (
        <div className="mx-auto p-6 mt-5 bg-slate-900/25 rounded-lg w-2/3 text-white">
            <h1 className="text-center text-3xl font-bold">Create a new record</h1>
            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-lg pb-12 pt-2 px-8 rounded mx-auto">
                <label htmlFor="domain" className="self-start mt-3 text-xs font-semibold">Domain<span className="ml-1 text-red-400">*</span></label>
                <input id="domain" type="text"
                    className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 focus:border-indigo-400 focus:ring-indigo-400 bg-gray-600"
                    onChange={handleDomainChange} required />
                <label htmlFor="subdomain" className="self-start mt-3 text-xs font-semibold">Subdomain<span className="ml-1 text-red-400">*</span></label>
                <input id="subdomain" type="text"
                    className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 focus:border-indigo-400 focus:ring-indigo-400 bg-gray-600"
                    onChange={handleSubdomainChange} required />
                <label htmlFor="data" className="self-start mt-3 text-xs font-semibold">IP Address or Data<span className="ml-1 text-red-400">*</span></label>
                <input id="data" type="text"
                    className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 focus:border-indigo-400 focus:ring-indigo-400 bg-gray-600"
                    onChange={handleDataChange} required />
                <label htmlFor="data" className="self-start mt-3 text-xs font-semibold">TTL</label>
                <input id="data" type="number"
                    className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 focus:border-indigo-400 focus:ring-indigo-400 bg-gray-600"
                    onChange={handleTTLChange} />
                <label htmlFor="type" className="self-start mt-3 text-xs font-semibold">Record Type</label>
                <div className="flex flex-row justify-center">
                    <select id="type" name="type" className="flex mt-2 rounded w-full
                        focus:outline-none focus:ring-2 focus:border-indigo-400 focus:ring-indigo-400 bg-gray-600" onChange={handleRecordTypeChange}>
                        {Object.keys(models_RecordType).map((key) => {
                            return <option key={key} value={key}>{key}</option>
                        })}
                    </select>
                </div>
                <div className="text-left py-2">
                    <input type="checkbox" name="commit" id="commit" aria-label="Commit"
                        className="mr-2 rounded-sm checked:bg-indigo-400 checked:focus:bg-indigo-400 checked:hover:bg-indigo-400"
                        checked={request.autocommit}
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
