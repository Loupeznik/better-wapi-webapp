import Cookies from "js-cookie"
import { OpenAPI } from "../api"

const getCredentialsFromStorage = (): boolean => {
    if (OpenAPI.USERNAME && OpenAPI.PASSWORD) {
        return true
    }

    const login = Cookies.get("login")
    const password = Cookies.get("password")

    if (!login || !password) {
        return false
    }

    OpenAPI.USERNAME = login
    OpenAPI.PASSWORD = password

    return true
}

const saveCredentialsToStorage = (login: string, password: string): boolean => {
    if (!login || !password) {
        return false
    }

    Cookies.set("login", login, { expires: 1 })
    Cookies.set("password", password, { expires: 1 })

    return true
}

export { getCredentialsFromStorage, saveCredentialsToStorage }
