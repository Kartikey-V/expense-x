import GridBackground from './components/GridBackground';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TransactionPage from './pages/TransactionPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';

function App() {
	const authUser = true;
	return (
		<>
			<GridBackground>
				{authUser && <Header />}
				<Routes>
					<Route path="/" element={<HomePage />}></Route>
					<Route path="/login" element={<LoginPage />}></Route>
					<Route path="/signup" element={<SignUpPage />}></Route>
					<Route path="/transaction/:id" element={<TransactionPage />}></Route>
					<Route path="*" element={<NotFoundPage />}></Route>
				</Routes>
			</GridBackground>
		</>
	);
}

export default App;
