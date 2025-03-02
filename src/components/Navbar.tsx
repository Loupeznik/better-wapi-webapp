import {
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Link,
	NavbarContent,
	NavbarItem,
	Navbar as NextNavbar,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useLocation } from "react-router-dom";
import type { RootState } from "../app/store";
import type { PageWithAuthProps } from "../models/PageWithAuthProps";

export const Navbar = ({ auth }: PageWithAuthProps) => {
	const pathname = useLocation();
	const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

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
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
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
			{auth !== undefined && isLoggedIn && (
				<NavbarContent as="div" justify="end">
					<Dropdown placement="bottom-end">
						<DropdownTrigger>
							<Avatar
								isBordered
								as="button"
								className="transition-transform"
								color="secondary"
								name={auth.userData?.profile?.name}
								size="sm"
								src={auth.userData?.profile?.picture ?? undefined}
							/>
						</DropdownTrigger>
						<DropdownMenu variant="flat">
							<DropdownItem key="profile" className="h-14 gap-2" isReadOnly>
								<p className="font-semibold">Signed in as</p>
								<p className="font-semibold">
									{auth.userData?.profile?.name ??
										auth.userData?.profile?.email}
								</p>
							</DropdownItem>
							<DropdownItem
								key="logout"
								color="danger"
								onPress={() => auth.signOut()}
							>
								Log Out
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</NavbarContent>
			)}
		</NextNavbar>
	);
};
