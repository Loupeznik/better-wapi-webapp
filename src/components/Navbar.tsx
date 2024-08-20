import { useLocation } from 'react-router-dom';
import { NavLink } from './NavLink';

export const Navbar = () => {
	const pathname = useLocation();

	return (
		<header className="p-4">
			<div className="container flex justify-between h-16 mx-auto md:justify-center md:space-x-8">
				<ul className="items-stretch hidden space-x-3 md:flex">
					<NavLink title="Home" link="/" isActive={pathname.pathname === '/'} />
					<NavLink title="Create a DNS record" link="/new" isActive={pathname.pathname === '/new'} />
					<NavLink title="List DNS records" link="/records" isActive={pathname.pathname === '/records'} />
				</ul>
			</div>
		</header>
	);
};
