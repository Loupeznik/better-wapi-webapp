import { ReactElement } from "react"

export const Button = ({ children }: {
    children: ReactElement | string | number | boolean | null | undefined
}) => {
    return (
        <button className="transition duration-700 ease-in-out bg-gray-600 hover:bg-indigo-800 rounded-xl p-5 text-lg">
            {children}
        </button>
    )
}
