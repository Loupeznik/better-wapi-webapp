import secureLocalStorage from "react-secure-storage"
import { OpenAPI } from "../api"

export class SecurityHelpers {
    private _loginKey = "login"
    private _passwordKey = "password"

    public getCredentialsFromStorage() : boolean {
        const login = secureLocalStorage.getItem(this._loginKey) as string
        const password = secureLocalStorage.getItem(this._passwordKey) as string

        if (login == "" || password == "") {
            return false
        }

        OpenAPI.USERNAME = login
        OpenAPI.PASSWORD = password

        return true
    }

    public saveCredentialsToStorage(login : string, password : string) : boolean {
        if (login == "" || password == "") {
            return false
        }

        secureLocalStorage.setItem(this._loginKey, login)
        secureLocalStorage.setItem(this._passwordKey, password)
        return true
    }
}
