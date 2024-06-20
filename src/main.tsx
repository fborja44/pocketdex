import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import ErrorPage from './pages/ErrorPage.tsx';
import SpeciesPage from './pages/SpeciesPage.tsx';
import HomePage from './pages/HomePage.tsx';
import SettingsPage from './pages/SettingsPage.tsx';
import store, { persistor } from './redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import AbilityPage from './pages/AbilityPage.tsx';
import ItemPage from './pages/ItemPage.tsx';

const router = createHashRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: '/pokemon',
				element: <SpeciesPage />,
			},
			{
				path: '/settings',
				element: <SettingsPage />,
			},
			{
				path: '/ability',
				element: <AbilityPage />,
			},
			{
				path: '/move',
				element: <ErrorPage />,
			},
			{
				path: '/item',
				element: <ItemPage />,
			},
			{
				path: '/location',
				element: <ErrorPage />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RouterProvider router={router} />
			</PersistGate>
		</ReduxProvider>
	</React.StrictMode>
);
