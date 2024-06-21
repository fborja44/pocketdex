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
import MovePage from './pages/MovePage.tsx';
import PCPage from './pages/PCPage.tsx';
import Layout from './Layout.tsx';
import {
	abilityLoader,
	itemLoader,
	moveLoader,
	pokemonLoader,
} from './router/loaders.ts';

const router = createHashRouter([
	{
		path: '/',
		element: <App />,
		errorElement: (
			<Layout>
				<ErrorPage />
			</Layout>
		),
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: '/pokemon/:id',
				element: <SpeciesPage />,
				loader: pokemonLoader,
				errorElement: <ErrorPage />,
			},
			{
				path: '/ability/:id',
				element: <AbilityPage />,
				loader: abilityLoader,
				errorElement: <ErrorPage />,
			},
			{
				path: '/move/:id',
				element: <MovePage />,
				loader: moveLoader,
				errorElement: <ErrorPage />,
			},
			{
				path: '/item/:id',
				element: <ItemPage />,
				loader: itemLoader,
				errorElement: <ErrorPage />,
			},
			{
				path: '/pc',
				element: <PCPage />,
			},
			{
				path: '/settings/:id',
				element: <SettingsPage />,
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
