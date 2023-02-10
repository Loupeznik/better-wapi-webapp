import secureLocalStorage from "react-secure-storage"

export class SecurityHelpers {
    private _storageKey = "basic_credentials"

    public getCredentialsFromStorage() : string {
        return secureLocalStorage.getItem(this._storageKey) as string
    }

    public saveCredentialsToStorage(login : string, password : string) : boolean {
        if (login == "" || password == "") {
            return false
        }

        const b64encoded = btoa(login + ":" + password)
        secureLocalStorage.setItem(this._storageKey, b64encoded)
        return true
    }
}
