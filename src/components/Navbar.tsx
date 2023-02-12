import { useLocation } from "react-router-dom";
import { NavLink } from "./NavLink"

export const Navbar = () => {
    const pathname  = useLocation();

    return (
        <header className="p-4 dark:bg-stone-800 dark:text-gray-100">
            <div className="container flex justify-between h-16 mx-auto md:justify-center md:space-x-8">
                <ul className="items-stretch hidden space-x-3 md:flex">
                    <NavLink title="Home" link="/" isActive={pathname.pathname == "/" ? true : false} />
                    <NavLink title="Create a DNS record" link="/new" isActive={pathname.pathname == "/new" ? true : false} />
                    <NavLink title="List DNS records" link="/records" isActive={pathname.pathname == "/records" ? true : false} />
                </ul>
            </div>
        </header>
    )
}
