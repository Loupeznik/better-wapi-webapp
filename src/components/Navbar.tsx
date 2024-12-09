import { useLocation } from "react-router-dom";
import {
	Link,
	NavbarContent,
	NavbarItem,
	Navbar as NextNavbar,
} from "@nextui-org/react";
import { Link as RouterLink } from "react-router-dom";

export const Navbar = () => {
	const pathname = useLocation();

	const navItems = [
		{ label: "Home", path: "/", isActive: pathname.pathname === "/" },
		{
			label: "Create a DNS record",
			path: "/new",
			isActive: pathname.pathname === "/new",
		},
		{
			label: "List DNS records",
			path: "/records",
			isActive: pathname.pathname === "/records",
		},
	];

	return (
		<NextNavbar>
			<NavbarContent className="flex mx-auto" justify="center">
				{navItems.map((item) => (
					<NavbarItem key={item.label} isActive={item.isActive}>
						<Link
							color={item.isActive ? "primary" : "foreground"}
							as={RouterLink}
							to={item.path}
						>
							{item.label}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>
		</NextNavbar>
	);
};
