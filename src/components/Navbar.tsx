import { NavLink } from "./NavLink"

export const Navbar = () => {
    return (
        <header className="p-4 dark:bg-stone-800 dark:text-gray-100">
            <div className="container flex justify-between h-16 mx-auto md:justify-center md:space-x-8">
                <ul className="items-stretch hidden space-x-3 md:flex">
                    <NavLink title="Home" link="/" isActive={true} />
                    <NavLink title="Create a DNS record" link="/new" isActive={false} />
                    <NavLink title="List DNS records" link="/records" isActive={false} />
                </ul>
            </div>
        </header>
    )
}
