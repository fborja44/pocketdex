import { Outlet, useLocation } from 'react-router-dom';
import './css/fonts.css';
import './css/tailwind.css';
import Layout from './Layout';

function App() {
	const { pathname } = useLocation();

	return (
		<Layout>
			<Outlet key={pathname} />
		</Layout>
	);
}

export default App;
