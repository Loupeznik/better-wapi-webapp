import { Link } from "react-router-dom"
import { Button } from "../components/Button"

export const HomePage = () => {
    return (
        <div className="mx-auto p-6 mt-5 bg-slate-900/25 rounded-lg w-2/3 text-white">
            <h1 className="text-center text-3xl font-bold">Better WAPI</h1>
            <p className="mt-2">Better WAPI is a wrapper around the Wedos API (WAPI). Continue by create a new DNS record or listing available records for a certain domain.</p>
            <div className="my-8 flex flex-row flex-auto justify-around w-1/2 mx-auto">
                <Link to="/new"><Button>Create a record</Button></Link>
                <Link to="/records"><Button>List records</Button></Link>
            </div>
        </div>
    )
}
