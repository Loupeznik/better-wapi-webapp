import { useEffect, useState } from "react"
import { Login } from "../components/Login"
import { getCredentialsFromStorage } from "../helpers/SecurityHelpers"

export const RecordsPage = () => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false)

    useEffect(() => {
        setAuthenticated(getCredentialsFromStorage)
    }, [isAuthenticated])

    return (
        !isAuthenticated ? <Login /> : <p>Records page</p>
    )
}
