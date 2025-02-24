import { Card } from "@nextui-org/react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { OpenAPI } from "./api";
import type { RootState } from "./app/store";
import { Navbar } from "./components/Navbar";
import { UncommitedChangesAlert } from "./components/UncommitedChangesAlert";
import loadConfig, { type AuthMode } from "./helpers/ConfigHelpers";
import { CreateRecordPage } from "./pages/Create";
import { HomePage } from "./pages/Home";
import { RecordsPage } from "./pages/Records";
import { userSlice } from "./redux/slices/userSlice";

function App() {
	let authMode: AuthMode;

	loadConfig().then(
		(config) => {
			OpenAPI.BASE = config.API_BASE_URL;
			authMode = config.AUTH_MODE;
		},
		(error) => {
			throw error;
		},
	);

	const dispatch = useDispatch();
	const hasUncommitedChanges = useSelector(
		(state: RootState) => state.domain.hasUncommitedData,
	);

	useEffect(() => {
		dispatch(userSlice.actions.checkIfLoggedIn());
	}, [dispatch]);

	return (
		<div className="dark text-foreground bg-background min-h-screen">
			<Toaster />
			<Navbar />
			{hasUncommitedChanges === true && (
				<div className="w-1/2 mx-auto">
					<UncommitedChangesAlert />
				</div>
			)}
			<Card className="lg:w-3/4 lg:mx-auto my-4 mx-4">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/new" element={<CreateRecordPage />} />
					<Route path="/records" element={<RecordsPage />} />
				</Routes>
			</Card>
		</div>
	);
}

export default App;
