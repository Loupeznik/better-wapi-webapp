import { Card } from "@nextui-org/react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { OpenAPI } from "./api";
import { Navbar } from "./components/Navbar";
import loadConfig from "./helpers/ConfigHelpers";
import { CreateRecordPage } from "./pages/Create";
import { HomePage } from "./pages/Home";
import { RecordsPage } from "./pages/Records";
import { userSlice } from "./redux/slices/userSlice";
import type { RootState } from "./app/store";
import { UncommitedChangesAlert } from "./components/UncommitedChangesAlert";

function App() {
	loadConfig().then(
		(config) => {
			OpenAPI.BASE = config.API_BASE_URL;
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

	useEffect(() => {
		console.log("hasUncommitedChanges", hasUncommitedChanges);
	}, [hasUncommitedChanges]);

	return (
		<div className="dark text-foreground bg-background min-h-screen">
			<Toaster />
			<Navbar />
			{hasUncommitedChanges === true && (
				<div className="w-1/2 mx-auto">
					<UncommitedChangesAlert />
				</div>
			)}
			<Card className="w-3/4 mx-auto my-4">
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
