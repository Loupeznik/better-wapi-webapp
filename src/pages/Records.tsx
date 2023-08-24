import { createRef, useEffect, useState } from "react"
import { ApiError, DomainService, models_DeleteRowRequest, models_ErrorResponse, models_Record, models_SaveRowRequest } from "../api"
import { Button } from "../components/Button"
import { Login } from "../components/Login"
import { getToken } from "../helpers/SecurityHelpers"
import { UpdateForm } from "../components/UpdateForm"
import { DomainList } from "../components/DomainList"
import { Toaster, toast } from "react-hot-toast"

export const RecordsPage = () => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false)
    const [activeDomain, setDomain] = useState<string>()
    const [subdomains, setSubdomains] = useState<models_Record[]>()
    const [searchError, setSearchError] = useState<string>()
    const [isUpdateScreenVisible, setUpdateScreenVisible] = useState<boolean>(false)
    const [editedSubdomain, setEditedSubdomain] = useState<models_Record>()
    const [isDomainExpanded, setIsDomainExpanded] = useState<boolean>(false)

    const domainRef = createRef<HTMLInputElement>();

    const handleDomainChange = async () => {
        if (domainRef.current) {
            const domain = domainRef.current.value
            setDomain(domain)

            await getRecords(domain)
            saveLatestDomain(domain)
        }
    }

    const handleDeleteRecord = async (subdomain: string) => {
        const record: models_DeleteRowRequest = {
            subdomain: subdomain,
            autocommit: false
        }

        const confirm = window.confirm(`Are you sure you want to delete DNS record for ${subdomain}?`)

        if (activeDomain && confirm) {
            await DomainService.deleteDomainRecord(record, activeDomain!).then(onFulfilled => {
                toast.success(`Record for ${subdomain} deleted successfully`)
                getRecords(activeDomain)
            }, onRejected => {
                const exception = onRejected as ApiError
                toast.error(`Failed to delete record for ${subdomain}: ${(exception.body as models_ErrorResponse).error}`)
            })
        }
    }

    const handleEditRecord = (subdomain: models_Record) => {
        setEditedSubdomain(subdomain)
        setUpdateScreenVisible(true)
    }

    useEffect(() => {
        (async () => {
            const result = await getToken();
            setAuthenticated(result);
        })()
    }, [activeDomain, isAuthenticated])

    useEffect(() => {
        const latestDomain = getLatestDomain()
        if (latestDomain && isAuthenticated) {
            getRecords(latestDomain)
        }
    }, [isAuthenticated])

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

    const saveLatestDomain = (domain: string) => localStorage.setItem('lastDomain', domain)

    const getLatestDomain = () => {
        const lastDomain = localStorage.getItem('lastDomain')

        if (lastDomain) {
            setDomain(lastDomain)
        }

        return lastDomain
    }

    if (!isAuthenticated) {
        return <Login setAuthenticated={(value: boolean) => setAuthenticated(value)} />
    }

    return (
        <div className="text-center bg-slate-900/25 rounded-lg w-3/4 text-white mx-auto items-center justify-center my-6 p-4">
            <Toaster />
            <p>{!activeDomain ?
                'Select domain to list records' :
                `Listing records for domain ${activeDomain}`}
            </p>
            <div className="flex items-center justify-center space-x-4">
                <input type="text" className="items-center p-5 w-3/4 mt-2 text-center rounded focus:outline-none focus:ring-2 focus:border-indigo-400 focus:ring-indigo-400 bg-gray-600"
                    ref={domainRef} id="search" defaultValue={activeDomain} />
                <span className="mt-2"><Button onClick={handleDomainChange}>Search</Button></span>
            </div>
            {searchError ? <label htmlFor="search" className="block text-sm font-semibold text-center text-red-600">{searchError}</label> : ''}
            <DomainList subdomains={subdomains} handleEditRecord={handleEditRecord} handleDeleteRecord={handleDeleteRecord} 
                isDomainExpanded={isDomainExpanded} setIsDomainExpanded={setIsDomainExpanded} domain={activeDomain} />
            {isUpdateScreenVisible && activeDomain && editedSubdomain ?
                <UpdateForm domain={activeDomain} record={editedSubdomain}
                    isVisible={isUpdateScreenVisible} setVisible={setUpdateScreenVisible}
                    onUpdate={async () => await getRecords(activeDomain)} /> :
                null}
        </div>
    )
}
