import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.tsx';
import SpeciesPage from './pages/SpeciesPage.tsx';
import HomePage from './pages/HomePage.tsx';
import SettingsPage from './pages/SettingsPage.tsx';

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
				element: <ErrorPage />,
			},
			{
				path: '/move',
				element: <ErrorPage />,
			},
			{
				path: '/item',
				element: <ErrorPage />,
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
		<RouterProvider router={router} />
	</React.StrictMode>
);
