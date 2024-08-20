import { Card } from '@nextui-org/react';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { OpenAPI } from './api';
import { Navbar } from './components/Navbar';
import loadConfig from './helpers/ConfigHelpers';
import { CreateRecordPage } from './pages/Create';
import { HomePage } from './pages/Home';
import { RecordsPage } from './pages/Records';
import { userSlice } from './redux/slices/userSlice';

function App() {
	loadConfig().then(
		config => {
			OpenAPI.BASE = config.API_BASE_URL;
		},
		error => {
			throw error;
		},
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(userSlice.actions.checkIfLoggedIn());
	}, [dispatch]);

	return (
		<div className="dark text-foreground bg-background min-h-screen">
			<Toaster />
			<Navbar />
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
