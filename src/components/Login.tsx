import { useState } from "react"
import { getToken } from "../helpers/SecurityHelpers"


export const Login = ({ setAuthenticated }: {
    setAuthenticated: (value: boolean) => void
}) => {
    const [login, setLogin] = useState<string>()
    const [password, setPassword] = useState<string>()

    const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => setLogin(event.target.value)
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()

        if (login && password) {
            const result = await getToken({
                login: login,
                secret: password,
            })
            setAuthenticated(result)
        }
    }

    return (
        <div className="text-center bg-slate-900/25 rounded-lg w-1/2 text-white mx-auto items-center justify-center my-6">
            <p className="mx-auto py-4">Login with your Better WAPI credentials</p>
            <form className="flex flex-col w-full max-w-lg pb-12 pt-2 px-8 rounded mx-auto" data-form-type="login" onSubmit={handleSubmit}>
                <label htmlFor="username" className="self-start text-xs font-semibold">Login</label>
                <input id="username" type="text" className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 focus:border-indigo-400 focus:ring-indigo-400 bg-gray-600" data-form-type="username" onChange={handleLoginChange} />
                <label htmlFor="password" className="self-start mt-3 text-xs font-semibold">Password</label>
                <input id="password" type="password" className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 bg-gray-600 focus:border-indigo-400 focus:ring-indigo-400" data-form-type="password" onChange={handlePasswordChange} />
                <button type="submit" className="flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded dark:bg-indigo-400 hover:bg-indigo-800" data-form-type="action,login">Login</button>
            </form>
        </div>
    )
}
