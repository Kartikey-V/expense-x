import GridBackground from './components/GridBackground';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TransactionPage from './pages/TransactionPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';

import { useQuery } from '@apollo/client';
import { GET_AUTHENTICATED_USER } from './graphql/queries/user.query';

function App() {
	const { loading, data } = useQuery(GET_AUTHENTICATED_USER);
	console.log('Authenticated user:', data);
	if (loading) return null;
	return (
		<>
			<GridBackground>
				{data?.authUser && <Header />}
				<Routes>
					<Route
						path="/"
						element={
							data?.authUser ? <HomePage /> : <Navigate to="/login" />
						}></Route>
					<Route
						path="/login"
						element={
							!data?.authUser ? <LoginPage /> : <Navigate to="/" />
						}></Route>
					<Route
						path="/signup"
						element={
							!data?.authUser ? <SignUpPage /> : <Navigate to="/" />
						}></Route>
					<Route
						path="/transaction/:id"
						element={
							data?.authUser ? <TransactionPage /> : <Navigate to="/login" />
						}></Route>
					<Route path="*" element={<NotFoundPage />}></Route>
				</Routes>
				<Toaster />
			</GridBackground>
		</>
	);
}

export default App;
