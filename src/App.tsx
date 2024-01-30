import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { CreateRecordPage } from './pages/Create';
import { HomePage } from './pages/Home';
import { RecordsPage } from './pages/Records';
import loadConfig from './helpers/ConfigHelpers';
import { OpenAPI } from './api';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
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
	}, []);

	return (
		<div className="bg-stone-800">
			<Toaster />
			<Navbar />
			<div>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/new" element={<CreateRecordPage />} />
					<Route path="/records" element={<RecordsPage />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
