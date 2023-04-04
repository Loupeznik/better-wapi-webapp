import { AuthService, models_Login, OpenAPI } from '../api';

const _localAppTokenStorageKey : string = 'jwt'
const _localAppTokenExpirationStorageKey : string = 'jwt_exp'

const getToken = async (credentials?: models_Login) : Promise<boolean> => {
    const localToken = localStorage.getItem(_localAppTokenStorageKey)
    let token

    if (localToken != null && !isTokenExpired())
    {
        token = localToken
    }
    else
    {
        if (credentials == null) 
        {
            return false
        }

        const tokenResult = await AuthService.postAuthToken(credentials)
        console.log("Token result: " + tokenResult)

        if (tokenResult.token != null)
        {
            localStorage.setItem(_localAppTokenStorageKey, tokenResult.token)
            setTokenExpiration(12)

            token = tokenResult.token
        }
    }

    OpenAPI.TOKEN = token
    return true
}

const isTokenExpired = () : boolean => {
    const localTokenExpiration = localStorage.getItem(_localAppTokenExpirationStorageKey)
    return localTokenExpiration === null ? false : Date.now() > Date.parse(localTokenExpiration)
}

const setTokenExpiration = (expiresIn: number) => {
    let currentDate = new Date()
    currentDate.setHours(currentDate.getHours() + expiresIn)

    localStorage.setItem(_localAppTokenExpirationStorageKey, currentDate.toUTCString())
}

const revokeToken = () => {
    localStorage.removeItem(_localAppTokenStorageKey)
    localStorage.removeItem(_localAppTokenExpirationStorageKey)
}

export { getToken, isTokenExpired, setTokenExpiration, revokeToken }
