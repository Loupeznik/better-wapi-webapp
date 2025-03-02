import { Card } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import type { RootState } from "../app/store";
import type { PageWithAuthProps } from "../models/PageWithAuthProps";
import { CreateRecordPage } from "../pages/Create";
import { HomePage } from "../pages/Home";
import { RecordsPage } from "../pages/Records";
import { Navbar } from "./Navbar";
import { UncommitedChangesAlert } from "./UncommitedChangesAlert";

function MainLayout({ auth }: PageWithAuthProps) {
	const hasUncommitedChanges = useSelector(
		(state: RootState) => state.domain.hasUncommitedData,
	);

	return (
		<div className="dark text-foreground bg-background min-h-screen">
			<Toaster />
			<Navbar auth={auth} />
			{hasUncommitedChanges === true && (
				<div className="w-1/2 mx-auto">
					<UncommitedChangesAlert />
				</div>
			)}
			<Card className="lg:w-3/4 lg:mx-auto my-4 mx-4">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/new" element={<CreateRecordPage auth={auth} />} />
					<Route path="/records" element={<RecordsPage auth={auth} />} />
				</Routes>
			</Card>
		</div>
	);
}

export default MainLayout;
