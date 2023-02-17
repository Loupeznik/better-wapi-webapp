import { useState } from "react";
import { DomainService, models_Record, models_SaveRowRequest } from "../api";

type UpdateFormProps = {
    record: models_Record,
    domain: string,
    isVisible: boolean
    setVisible: (value: boolean) => void
    onUpdate: () => void
}

export const UpdateForm = ({ record, domain, isVisible, setVisible, onUpdate }: UpdateFormProps) => {
    const [subdomain, setSubdomain] = useState<string>(record.name!)
    const [data, setData] = useState<string>()
    const [autocommit, setAutocommit] = useState<boolean>(false)

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()

        if (!subdomain || !data) {
            return
        }

        const request: models_SaveRowRequest = {
            subdomain: subdomain,
            ip: data,
            autocommit: autocommit
        }

        await DomainService.putDomainRecord(request, domain)
        setVisible(false)
        onUpdate()
    }

    const handleSubdomainChange = (event: React.ChangeEvent<HTMLInputElement>) => setSubdomain(event.target.value)
    const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => setData(event.target.value)
    const handleAutocommitChange = () => setAutocommit(!autocommit)

    return (
        isVisible ?
            <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
                <div className="flex items-end justify-center  px-4 text-center sm:block sm:p-0 align-bottom rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-slate-900 px-6 py-6">
                            <h1 className="text-center text-3xl font-bold">Update record</h1>
                            <form onSubmit={handleSubmit} className="mt-6">
                                <div>
                                    <label htmlFor="subdomain" className="block text-sm font-medium">Subdomain</label>
                                    <input id="subdomain" type="text"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        value={subdomain ?? record.name} onChange={handleSubdomainChange} disabled />
                                </div>
                                <div className="mt-6">
                                    <label htmlFor="data" className="block text-sm font-medium">IP Address or Data</label>
                                    <input id="data" type="text"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-slate-900"
                                        value={data ?? record.rdata} onChange={handleDataChange} />
                                </div>
                                <div className="mt-6">
                                    <label htmlFor="commit" className="inline-flex items-center">
                                        <input type="checkbox" name="commit" id="commit" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" checked={autocommit} onChange={handleAutocommitChange} />
                                        <span className="ml-2 text-sm">Commit</span>
                                    </label>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button type="submit" className="flex items-center justify-center h-12 px-6 text-sm font-semibold rounded dark:bg-indigo-400 hover:bg-indigo-800">
                                        Save
                                    </button>
                                    <button onClick={() => setVisible(false)} className="flex items-center justify-center h-12 px-6 text-sm font-semibold rounded bg-gray-400 hover:bg-gray-600">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div> : null
    )
}
