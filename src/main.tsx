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
import LoadingPage from './pages/LoadingPage.tsx';
import { PokemonClient } from 'pokenode-ts';

const dex = new PokemonClient();

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
				path: '/pokemon/:id',
				element: <SpeciesPage />,
				loader: async ({ params }) => {
					const id = params.id;
					if (!id) return null;
					return await dex.getPokemonByName(id);
				},
				errorElement: <LoadingPage />,
			},
			{
				path: '/settings/:id',
				element: <SettingsPage />,
			},
			{
				path: '/ability/:id',
				element: <AbilityPage />,
			},
			{
				path: '/move/:id',
				element: <MovePage />,
			},
			{
				path: '/item/:id',
				element: <ItemPage />,
			},
			{
				path: '/pc',
				element: <PCPage />,
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
